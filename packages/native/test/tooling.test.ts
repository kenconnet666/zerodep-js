import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { pathToFileURL } from 'node:url';
import { expect, it } from 'vitest';
import { NativeTools, applyTextEdits, fileEdits, writeEdits } from '../src/tools.js';
import { createCompiler } from '../src/session.js';
import { compilerPath } from '../src/binary.js';

async function fixture() {
  const root = await mkdtemp(resolve('apps/example/.native-tools-'));
  await writeFile(
    resolve(root, 'tsconfig.json'),
    JSON.stringify({
      extends: '../tsconfig.json',
      compilerOptions: { types: ['node'], noEmit: true, declaration: true, outDir: './out' },
      include: ['*.ts', '*.tsx'],
    }),
  );
  return root;
}
async function cleanup(root: string) {
  assert.equal(dirname(root), resolve('apps/example'));
  await rm(root, { recursive: true, force: true });
}

it('Go 类型规则共享检查入口，区分浮动 Promise、同步回调和有限联合遗漏', async () => {
  const root = await fixture();
  const tools = new NativeTools(root);
  const file = resolve(root, 'rules.ts');
  try {
    await writeFile(
      file,
      `export {}; declare function work(): Promise<void>; work(); [1].forEach(async () => { await work(); }); export function missing(value: 'a' | 'b') { switch(value) { case 'a': return 1; } }`,
    );
    expect((await tools.check(['tsconfig.json'], { lint: false })).diagnostics).toEqual([]);
    const result = await tools.check(['tsconfig.json'], { lint: true });
    expect(result.complete).toBe(true);
    expect(result.diagnostics.map((item) => item.code).sort()).toEqual([
      'ZJ2001',
      'ZJ2002',
      'ZJ2003',
    ]);
    await writeFile(
      file,
      `export {}; declare function work(): Promise<void>; void work(); work().catch(() => {}); work().then(() => {}, () => {}); let pending:Promise<void>; pending=work(); export async function awaited() { await pending; await work(); return work(); } [1].forEach(() => { void work(); }); export function exhaustive(value: 'a' | 'b') { switch(value) { case 'a': return 1; case 'b': return 2; } }`,
    );
    const compiler = createCompiler({ root });
    compiler.invalidate(file);
    await compiler.compile(await readFile(file, 'utf8'), file);
    await compiler.close();
    expect((await tools.check(['tsconfig.json'], { lint: true })).diagnostics).toEqual([]);
  } finally {
    await tools.close();
    await cleanup(root);
  }
}, 60000);

it('磁盘修改、增加根文件和删除依赖目录不会命中旧检查结果，构建可失败后恢复', async () => {
  const root = await fixture();
  const tools = new NativeTools(root);
  const config = resolve(root, 'tsconfig.json');
  const file = resolve(root, 'entry.ts');
  const dependency = resolve(root, 'dependency');
  try {
    await writeFile(
      config,
      JSON.stringify({
        extends: '../tsconfig.json',
        compilerOptions: { noEmit: false, composite: true, rootDir: '.', outDir: './out' },
        include: ['*.ts', 'dependency/*.ts'],
      }),
    );
    await mkdir(dependency);
    await writeFile(resolve(dependency, 'value.ts'), 'export const value=1;');
    await writeFile(
      file,
      "import {value} from './dependency/value.js'; export const entry:number=value;",
    );
    expect((await tools.check(['tsconfig.json'])).diagnostics).toEqual([]);
    expect((await tools.check(['tsconfig.json'])).cached).toBe(true);
    expect((await tools.build('tsconfig.json')).status).toBe(0);
    await writeFile(
      file,
      "import {value} from './dependency/value.js'; export const entry:string=value;",
    );
    expect((await tools.check(['tsconfig.json'])).diagnostics.map((item) => item.code)).toContain(
      'TS2322',
    );
    expect((await tools.build('tsconfig.json')).status).not.toBe(0);
    await writeFile(
      file,
      "import {value} from './dependency/value.js'; export const entry:number=value;",
    );
    expect((await tools.build('tsconfig.json')).status).toBe(0);
    await writeFile(resolve(root, 'added.ts'), 'export const broken:number="no";');
    expect((await tools.check(['tsconfig.json'])).diagnostics.map((item) => item.code)).toContain(
      'TS2322',
    );
    await rm(resolve(root, 'added.ts'));
    await rm(dependency, { recursive: true });
    expect((await tools.check(['tsconfig.json'])).diagnostics.map((item) => item.code)).toContain(
      'TS2307',
    );
    await mkdir(dependency);
    await writeFile(resolve(dependency, 'value.ts'), 'export const value=2;');
    expect((await tools.check(['tsconfig.json'])).diagnostics).toEqual([]);
  } finally {
    await tools.close();
    await cleanup(root);
  }
}, 60000);

it('单文件修复不能丢弃其他文件操作，编辑拒绝半个 Unicode、越界和重叠范围', () => {
  const range = (start: number, end: number) => ({
    start: { line: 0, character: start },
    end: { line: 0, character: end },
  });
  expect(() =>
    fileEdits('one.ts', [
      {
        title: '跨文件',
        edit: {
          changes: {
            [pathToFileURL(resolve('two.ts')).href]: [{ range: range(0, 0), newText: 'x' }],
          },
        },
      },
    ]),
  ).toThrow('其他文件');
  expect(() => fileEdits('one.ts', [{ title: '命令修复' }])).toThrow('完整的工作区');
  expect(() => applyTextEdits('🚀', [{ range: range(1, 2), newText: '' }])).toThrow('Unicode');
  expect(() => applyTextEdits('abc', [{ range: range(0, 4), newText: '' }])).toThrow('超出');
  expect(() =>
    applyTextEdits('abc', [
      { range: range(0, 2), newText: '' },
      { range: range(1, 3), newText: '' },
    ]),
  ).toThrow('重叠');
  expect(
    applyTextEdits('abc\r\ndef', [
      {
        range: { start: { line: 1, character: 0 }, end: { line: 1, character: 3 } },
        newText: 'ok',
      },
    ]),
  ).toBe('abc\r\nok');
});

it('两个客户端复用 Go 进程与磁盘编译缓存，内存覆盖不污染另一客户端', async () => {
  const root = await fixture();
  const file = resolve(root, 'state.ts');
  const tools = new NativeTools(root);
  const other = new NativeTools(root);
  const a = createCompiler({ root });
  const b = createCompiler({ root });
  const source = `import {_state} from 'zerodep-js'; let count=_state(1); export function read(){ return count; }`;
  try {
    await writeFile(file, source);
    const [one, two] = await Promise.all([tools.stats(), other.stats()]);
    expect(one.compilerPid).toBe(two.compilerPid);
    expect(one.serverPid).toBe(two.serverPid);
    const first = await a.compile(source, file);
    const before = await tools.stats();
    expect((await b.compile(source, file)).code).toBe(first.code);
    const after = await tools.stats();
    expect(after.outputCacheHits).toBeGreaterThan(before.outputCacheHits);
    expect(after.semanticChecks).toBe(before.semanticChecks);
    expect((await a.compile(source.replace('_state(1)', '_state(2)'), file)).code).toContain(
      '.state(2)',
    );
    expect((await b.compile(source, file)).code).toContain('.state(1)');
    await a.close();
    expect((await b.compile(source, file)).code).toBe(first.code);
    const check = await tools.check(['tsconfig.json']);
    expect(check.diagnostics).toEqual([]);
    expect((await other.check(['tsconfig.json'])).cached).toBe(true);
  } finally {
    await a.close();
    await b.close();
    await tools.close();
    await other.close();
    await cleanup(root);
  }
}, 60000);

it('原生编辑保留 bind 与 Unicode，修复只命中错误状态，拒绝过期文本', async () => {
  const root = await fixture();
  const tools = new NativeTools(root);
  const file = resolve(root, 'edit.tsx');
  try {
    await writeFile(
      file,
      `import {_state,_snapshot} from 'zerodep-js';\nconst 文本="🚀"; const first=_state(1); const second=_state(2); second++; export const view=<input bind:value={文本}/>;`,
    );
    const fixes = await tools.actions(file);
    const action = fixes.actions.find((item) => item.title.includes('改为 let'));
    expect(action).toBeTruthy();
    const result = { file, original: fixes.document.text, edits: fileEdits(file, [action!]) };
    const fixed = applyTextEdits(result.original, result.edits);
    expect(fixed).toContain('const first=');
    expect(fixed).toContain('let second=');
    await writeEdits(result);
    const imports = await tools.imports(file);
    await writeEdits(imports);
    expect(await readFile(file, 'utf8')).not.toContain('_snapshot');
    const format = await tools.format(file);
    expect(applyTextEdits(format.original, format.edits)).toContain('bind:value={文本}');
    await writeFile(file, format.original + '\n// 已有新的编辑\n');
    await expect(writeEdits(format)).rejects.toThrow('文件已变化');
  } finally {
    await tools.close();
    await cleanup(root);
  }
}, 60000);

it('Go 元数据区分 type-only 导入，声明与公开类型变化进入 API 报告', async () => {
  const root = await fixture();
  const tools = new NativeTools(root);
  const file = resolve(root, 'api.ts');
  try {
    await writeFile(
      file,
      `import type {ReadStream} from 'node:fs';\nexport type File=ReadStream;\nexport type Choice='a'|'b';\nexport function read(value:Choice){return value;}\n`,
    );
    expect(await tools.boundaries([file], { browser: true })).toEqual([]);
    const info = await tools.inspect(file);
    expect(info.imports[0]?.typeOnly).toBe(true);
    expect(info.exports.find((item) => item.name === 'Choice')?.type).toMatch(
      /["']a["'].*\|.*["']b["']/,
    );
    const report = await tools.apiReport('tsconfig.json', [file]);
    expect(Object.keys(report.declarations)).not.toHaveLength(0);
    const inspect = tools.inspect.bind(tools);
    tools.inspect = async (...args) => {
      const info = await inspect(...args);
      await writeFile(file, `export const changed = 1;`);
      return info;
    };
    await expect(tools.apiReport('tsconfig.json', [file])).rejects.toThrow(
      '生成 API 报告期间发生变化',
    );
    tools.inspect = inspect;
    await writeFile(
      file,
      `const 文本='🚀';\nvoid 文本;\nimport {readFileSync} from 'node:fs';\nexport const read=readFileSync;\n`,
    );
    const bad = await tools.boundaries([file], { browser: true });
    expect(bad).toMatchObject([{ code: 'ZJ2101', line: 3 }]);
    await writeFile(
      file,
      `import {} from 'node:fs';\nexport {type ReadStream} from 'node:fs';\nvoid import('node:fs', {with:{type:'json'}});`,
    );
    expect((await tools.boundaries([file], { browser: true })).map((item) => item.line)).toEqual([
      1, 3,
    ]);
  } finally {
    await tools.close();
    await cleanup(root);
  }
}, 60000);

it('并发启动只有一个服务，关闭一个客户端不影响其他客户端，最后退出回收进程', async () => {
  const temporary = await realpath(tmpdir());
  const root = await mkdtemp(resolve(temporary, 'zerodep-workspace-'));
  const clients = Array.from({ length: 6 }, () => new NativeTools(root));
  const previous = process.env.NODE_OPTIONS;
  let serverPid = 0,
    compilerPid = 0;
  const alive = (pid: number) => {
    try {
      process.kill(pid, 0);
      return true;
    } catch {
      return false;
    }
  };
  try {
    // 工具后台进程不能继承调用方的测试/调试加载器。
    process.env.NODE_OPTIONS = '--require=zerodep-missing-parent-hook';
    const states = await Promise.all(clients.map((client) => client.stats()));
    expect(new Set(states.map((state) => state.serverPid)).size).toBe(1);
    expect(new Set(states.map((state) => state.compilerPid)).size).toBe(1);
    serverPid = states[0]!.serverPid;
    compilerPid = states[0]!.compilerPid;
    await Promise.all(clients.slice(0, -1).map((client) => client.close()));
    expect((await clients.at(-1)!.stats()).serverPid).toBe(serverPid);
    await clients.at(-1)!.close();
    await expect.poll(() => alive(serverPid), { timeout: 5000 }).toBe(false);
    await expect.poll(() => alive(compilerPid), { timeout: 5000 }).toBe(false);
  } finally {
    if (previous === undefined) delete process.env.NODE_OPTIONS;
    else process.env.NODE_OPTIONS = previous;
    await Promise.all(clients.map((client) => client.close()));
    for (const pid of [serverPid, compilerPid]) if (pid && alive(pid)) process.kill(pid);
    assert.equal(dirname(root), temporary);
    await rm(root, { recursive: true, force: true });
  }
}, 30000);

it('原生进程异常退出后客户端可重连，旧连接不会保留死进程', async () => {
  const temporary = await realpath(tmpdir());
  const root = await mkdtemp(resolve(temporary, 'zerodep-reconnect-'));
  const tools = new NativeTools(root);
  try {
    const before = await tools.stats();
    process.kill(before.compilerPid);
    await expect
      .poll(
        async () => {
          try {
            const after = await tools.stats();
            return after.compilerPid !== before.compilerPid && after.serverPid !== before.serverPid;
          } catch {
            return false;
          }
        },
        { timeout: 10000, interval: 100 },
      )
      .toBe(true);
  } finally {
    await tools.close();
    assert.equal(dirname(root), temporary);
    // close 释放客户端租约，最后一个连接断开后的空闲退出最多需要约 1.5 秒。
    await rm(root, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
  }
}, 20000);

it('lint 开关使增量诊断失效，any case 不能冒充穷尽，未检查 JS 仍有框架诊断', async () => {
  const root = await fixture();
  const tools = new NativeTools(root);
  const config = resolve(root, 'tsconfig.json');
  const run = promisify(execFile);
  const save = (lint: boolean) =>
    writeFile(
      config,
      JSON.stringify({
        extends: '../tsconfig.json',
        compilerOptions: {
          noEmit: false,
          declaration: true,
          incremental: true,
          outDir: './out',
          tsBuildInfoFile: './out/cache',
          zerodepLint: lint,
        },
        include: ['rules.ts'],
      }),
    );
  try {
    await writeFile(
      resolve(root, 'rules.ts'),
      `export {}; declare function work(): Promise<void>; work();`,
    );
    await save(false);
    await run(compilerPath(), ['-b', config], { windowsHide: true });
    await save(true);
    expect((await tools.check(['tsconfig.json'])).diagnostics.map((item) => item.code)).toContain(
      'ZJ2001',
    );
    await expect(run(compilerPath(), ['-b', config], { windowsHide: true })).rejects.toMatchObject({
      stdout: expect.stringContaining('ZJ2001'),
    });
    await save(false);
    await run(compilerPath(), ['-b', config], { windowsHide: true });
    await writeFile(
      resolve(root, 'rules.ts'),
      `declare const other:any; export function choose(value:'a'|'b'){switch(value){case other:return 1;}}`,
    );
    expect(
      (await tools.check(['tsconfig.json'], { lint: true })).diagnostics.map((item) => item.code),
    ).toContain('ZJ2003');
    await writeFile(
      config,
      JSON.stringify({
        extends: '../tsconfig.json',
        compilerOptions: { allowJs: true, checkJs: false, noEmit: true },
        include: ['plain.js'],
      }),
    );
    await writeFile(
      resolve(root, 'plain.js'),
      `import {_state} from 'zerodep-js'; const value=_state(0); value++;`,
    );
    const compiler = createCompiler({ root });
    compiler.invalidate(config);
    await compiler.close();
    const report = await tools.check(['tsconfig.json']);
    expect(report.diagnostics.map((item) => item.code)).toContain('ZJ1005');
  } finally {
    await tools.close();
    await cleanup(root);
  }
}, 60000);
