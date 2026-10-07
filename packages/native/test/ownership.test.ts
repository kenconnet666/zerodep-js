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
import { API } from 'typescript/unstable/async';
import { expect, it } from 'vitest';
import { NativeTools } from '../src/tools.js';
import { NativeWorkspace } from '../src/workspace.js';
import { compilerPath } from '../src/binary.js';
import { ProjectCompiler } from '../src/project.js';
import { canonical, changedFiles, dependencyStamps, stamp } from '../src/project-files.js';

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'zerodep-owned-test-'));
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

it('每个工具宿主独占 Go 子进程，close 立即回收且不影响其他宿主', async () => {
  const root = await fixture();
  const first = new NativeWorkspace(root);
  const other = new NativeWorkspace(root);
  const alive = (pid: number) => {
    try {
      process.kill(pid, 0);
      return true;
    } catch {
      return false;
    }
  };
  try {
    await Promise.all([first.request({ action: 'info' }), other.request({ action: 'info' })]);
    const one = first.language.child.pid!;
    const two = other.language.child.pid!;
    expect(one).not.toBe(two);
    await first.close();
    expect(alive(one)).toBe(false);
    expect(alive(two)).toBe(true);
    await expect(first.request({ action: 'info' })).rejects.toThrow('已关闭');
    await other.request({ action: 'check', projects: [join(root, 'tsconfig.json')] });
    process.kill(two);
    await expect.poll(() => alive(two)).toBe(false);
    await expect(
      other.request({ action: 'check', projects: [join(root, 'tsconfig.json')] }),
    ).rejects.toThrow();
    const replacement = new NativeWorkspace(root);
    try {
      await replacement.request({ action: 'info' });
    } finally {
      await replacement.close();
    }
  } finally {
    await first.close();
    await other.close();
    await removeFixture(root);
  }
}, 20000);

it('完整检查不输出文件，依赖错误与时间戳回退均失效，修复后恢复', async () => {
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
    expect((await tools.check(['tsconfig.json'])).complete).toBe(true);
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

it('时间戳与长度无法区分的源码更新仍通过内容检测到', async () => {
  const root = await fixture();
  try {
    const file = join(root, 'entry.ts');
    const stamps = await dependencyStamps([file]);
    const key = canonical(file);
    const previousHash = stamps.get(key)!.split(':')[4]!;
    await writeFile(file, 'export const value: number = 2;');
    // 确定性模拟文件系统的元数据粒度不足，而不是靠等待时间戳变化让用例通过。
    stamps.set(key, (await stamp(file)) + ':' + previousHash);
    expect(await changedFiles(stamps)).toEqual([key]);
  } finally {
    await removeFixture(root);
  }
});

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
    await tools.close();
    await removeFixture(root);
  }
}, 20000);
