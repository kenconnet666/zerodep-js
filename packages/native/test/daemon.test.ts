import {
  mkdtemp,
  mkdir,
  link,
  readFile,
  readdir,
  rmdir,
  stat,
  unlink,
  utimes,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { API } from 'typescript/unstable/async';
import { expect, it } from 'vitest';
import { NativeTools } from '../src/tools.js';
import { createCompiler } from '../src/session.js';
import { compilerPath } from '../src/binary.js';
import { ProjectCompiler } from '../src/project.js';
import { servicePolicy } from '../src/service-policy.js';
import { CheckCache } from '../src/check-cache.js';
import { changedFiles, dependencyStamps } from '../src/project-files.js';

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'zerodep-daemon-test-'));
  await writeFile(
    join(root, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        target: 'ES2023',
        module: 'Preserve',
        strict: true,
        types: [],
        declaration: true,
        outDir: './out',
        tsBuildInfoFile: './user.tsbuildinfo',
      },
      include: ['*.ts'],
    }),
  );
  await writeFile(join(root, 'entry.ts'), 'export const value: number = 1;');
  return root;
}

async function removeFixture(root: string) {
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory() && !entry.isSymbolicLink()) await removeFixture(path);
    else await unlink(path);
  }
  await rmdir(root);
}

function policy(values: Record<string, string>): () => void {
  const previous = new Map(Object.keys(values).map((key) => [key, process.env[key]]));
  Object.assign(process.env, values);
  return () => {
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
}

it('常驻连接跨越旧空闲周期，重连复用编译缓存，停止不影响正在使用的客户端', async () => {
  const restore = policy({ ZERODEP_IDLE_TIMEOUT_MS: '10000' });
  const root = await fixture();
  const first = new NativeTools(root);
  const next = new NativeTools(root);
  const a = createCompiler({ root });
  const b = createCompiler({ root });
  try {
    const file = join(root, 'entry.ts');
    const source = await readFile(file, 'utf8');
    await a.compile(source, file);
    await first.check(['tsconfig.json']);
    const before = await first.stats();
    await a.close();
    await first.close();
    await delay(1800);
    await b.compile(source, file);
    const after = await next.stats();
    expect(after.serverPid).toBe(before.serverPid);
    expect(after.compilerPid).toBe(before.compilerPid);
    expect(after.outputCacheHits).toBeGreaterThan(before.outputCacheHits);
    expect((await next.check(['tsconfig.json'])).cached).toBe(true);
    await expect(next.stop()).rejects.toThrow('其他客户端');
    await b.close();
    await expect
      .poll(
        () =>
          next.stop().then(
            () => true,
            () => false,
          ),
        { timeout: 3000 },
      )
      .toBe(true);
  } finally {
    await a.close();
    await b.close();
    await next.stop({ force: true }).catch(() => {});
    await first.close();
    await next.close();
    restore();
    await removeFixture(root);
  }
}, 20000);

it('增量检查不输出文件，依赖错误与时间戳回退均失效，修复后恢复', async () => {
  const root = await fixture();
  const tools = new NativeTools(root);
  try {
    const input = join(root, 'input.ts');
    await writeFile(input, 'export const input = 1;');
    await writeFile(
      join(root, 'entry.ts'),
      'import {input} from "./input"; export const value: number = input;',
    );
    await writeFile(join(root, 'user.tsbuildinfo'), '用户原有缓存');
    expect((await tools.check(['tsconfig.json'])).diagnostics).toEqual([]);
    expect((await tools.check(['tsconfig.json'])).cached).toBe(true);
    const before = await stat(input);
    await writeFile(input, 'export const input = "错误";');
    await utimes(input, before.atime, before.mtime);
    const broken = await tools.check(['tsconfig.json']);
    expect(broken.complete).toBe(true);
    expect(broken.diagnostics.map((item) => item.code)).toContain('TS2322');
    await writeFile(input, 'export const input = 2;');
    expect((await tools.check(['tsconfig.json'])).diagnostics).toEqual([]);
    await writeFile(join(root, 'extra.ts'), 'export const extra: number = "错误";');
    expect((await tools.check(['tsconfig.json'])).diagnostics.map((item) => item.code)).toContain(
      'TS2322',
    );
    await unlink(join(root, 'extra.ts'));
    expect((await tools.check(['tsconfig.json'])).diagnostics).toEqual([]);
    expect(await readFile(join(root, 'user.tsbuildinfo'), 'utf8')).toBe('用户原有缓存');
    expect((await readdir(root)).sort()).toEqual([
      'entry.ts',
      'input.ts',
      'tsconfig.json',
      'user.tsbuildinfo',
    ]);
  } finally {
    await tools.stop({ force: true }).catch(() => {});
    await tools.close();
    await removeFixture(root);
  }
}, 20000);

it('无监听器时仍检测依赖变更，继承 paths 相对于定义目录，虚拟文本独立保留', async () => {
  const root = await fixture();
  const child = join(root, 'child');
  await mkdir(child);
  await writeFile(
    join(root, 'base.json'),
    JSON.stringify({
      compilerOptions: {
        target: 'ES2023',
        module: 'Preserve',
        strict: true,
        types: [],
        paths: { '@input': ['./input.ts'] },
      },
    }),
  );
  await writeFile(
    join(child, 'tsconfig.json'),
    JSON.stringify({ extends: '../base.json', include: ['*.ts'] }),
  );
  await writeFile(join(root, 'input.ts'), 'export const input = 1;');
  const file = join(child, 'main.ts');
  const source = 'import {input} from "@input"; export const value: number = input;';
  await writeFile(file, source);
  const api = new API({ tsserverPath: compilerPath(), cwd: child });
  const engine = new ProjectCompiler(api, { root: child });
  try {
    expect((await engine.compile(source, file)).code).toContain('value');
    await writeFile(join(root, 'input.ts'), 'export const input = "错误";');
    await expect(engine.compile(source, file)).rejects.toThrow('TS2322');
    await writeFile(join(root, 'input.ts'), 'export const input = 2;');
    expect((await engine.compile(source, file)).code).toContain('value');
    const virtual = source.replace('number = input', 'number = input + 10');
    expect((await engine.compile(virtual, file)).code).toContain('+ 10');
    await writeFile(join(root, 'input.ts'), 'export const input = 3;');
    expect((await engine.compile(virtual, file)).code).toContain('+ 10');
    expect(await readFile(file, 'utf8')).toBe(source);
  } finally {
    await engine.close();
    await api.close();
    await removeFixture(root);
  }
}, 20000);

it('空闲编译缓存按数量与时间回收，活动客户端继续使用同一服务', async () => {
  const restore = policy({ ZERODEP_MAX_IDLE_PROJECTS: '1', ZERODEP_CACHE_TIMEOUT_MS: '300' });
  const root = await fixture();
  const tools = new NativeTools(root);
  try {
    const file = join(root, 'entry.ts');
    for (const project of ['tsconfig.json', 'other.json']) {
      if (project === 'other.json')
        await writeFile(join(root, project), await readFile(join(root, 'tsconfig.json')));
      const compiler = createCompiler({ root, project });
      try {
        await compiler.compile(await readFile(file, 'utf8'), file);
      } finally {
        await compiler.close();
      }
    }
    const before = await tools.stats();
    expect(before.idleProjects).toBeLessThanOrEqual(1);
    await expect.poll(async () => (await tools.stats()).sharedProjects, { timeout: 3000 }).toBe(0);
    expect((await tools.stats()).serverPid).toBe(before.serverPid);
  } finally {
    await tools.stop({ force: true }).catch(() => {});
    await tools.close();
    restore();
    await removeFixture(root);
  }
}, 20000);

it('服务策略拒绝无效数值', () => {
  const restore = policy({ ZERODEP_IDLE_TIMEOUT_MS: '-1' });
  try {
    expect(() => servicePolicy()).toThrow('ZERODEP_IDLE_TIMEOUT_MS');
  } finally {
    restore();
  }
});

it('硬链接元数据变化不冒充源码修改，内容变化仍使缓存失效', async () => {
  const root = await fixture();
  try {
    const file = join(root, 'entry.ts');
    const stamps = await dependencyStamps([file]);
    const alias = join(root, 'copy.ts');
    await link(file, alias);
    expect(await changedFiles(stamps)).toEqual([]);
    await unlink(alias);
    expect(await changedFiles(stamps)).toEqual([]);
    await writeFile(file, 'export const value: number = 2;');
    expect(await changedFiles(stamps)).toHaveLength(1);
  } finally {
    await removeFixture(root);
  }
});

it('损坏的服务增量缓存会重建，关闭后删除本服务缓存', async () => {
  const root = await fixture();
  const api = new API({ tsserverPath: compilerPath(), cwd: root });
  const cache = new CheckCache();
  const prefix = `zerodep-check-${process.pid}-`;
  const before = new Set(await readdir(tmpdir()));
  let directory = '';
  try {
    expect(
      (await cache.check(api, root, join(root, 'tsconfig.json'), undefined, false)).status,
    ).toBe(0);
    expect(
      (await cache.check(api, root, join(root, 'tsconfig.json'), undefined, false)).statistics
        .ProjectsBuilt,
    ).toBe(0);
    const added = (await readdir(tmpdir())).filter(
      (name) => name.startsWith(prefix) && !before.has(name),
    );
    expect(added).toHaveLength(1);
    directory = join(tmpdir(), added[0]!);
    for (const file of await readdir(directory)) await writeFile(join(directory, file), '损坏缓存');
    await writeFile(join(root, 'entry.ts'), 'export const value: number = "错误";');
    const result = await cache.check(api, root, join(root, 'tsconfig.json'), undefined, false);
    expect(result.diagnostics?.map((item) => item.code)).toContain(2322);
  } finally {
    await cache.close();
    await api.close();
    await removeFixture(root);
  }
  expect(await stat(directory).catch(() => undefined)).toBeUndefined();
}, 20000);

it('引用项目保留完整诊断且检查不改变引用输出', async () => {
  const root = await fixture();
  const tools = new NativeTools(root);
  try {
    await mkdir(join(root, 'lib'));
    await writeFile(
      join(root, 'lib/tsconfig.json'),
      JSON.stringify({
        compilerOptions: { composite: true, types: [], outDir: './out' },
        files: ['input.ts'],
      }),
    );
    await writeFile(join(root, 'lib/input.ts'), 'export const input = 1;');
    expect((await tools.build('lib/tsconfig.json')).status).toBe(0);
    const declaration = await readFile(join(root, 'lib/out/input.d.ts'), 'utf8');
    await writeFile(
      join(root, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          target: 'ES2023',
          module: 'Preserve',
          strict: true,
          types: [],
          outDir: './out',
        },
        references: [{ path: './lib' }],
        files: ['entry.ts'],
      }),
    );
    await writeFile(
      join(root, 'entry.ts'),
      'import {input} from "./lib/input"; export const value: number = input;',
    );
    expect((await tools.check(['tsconfig.json'])).diagnostics).toEqual([]);
    await writeFile(
      join(root, 'entry.ts'),
      'import {input} from "./lib/input"; export const value: string = input;',
    );
    expect((await tools.check(['tsconfig.json'])).diagnostics.map((item) => item.code)).toContain(
      'TS2322',
    );
    expect(await readFile(join(root, 'lib/out/input.d.ts'), 'utf8')).toBe(declaration);
    expect(await stat(join(root, 'out')).catch(() => undefined)).toBeUndefined();
  } finally {
    await tools.stop({ force: true }).catch(() => {});
    await tools.close();
    await removeFixture(root);
  }
}, 20000);
