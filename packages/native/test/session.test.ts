import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { expect, it } from 'vitest';
import { compilerPath, createCompiler } from '../src/index.js';
import { API } from 'typescript/unstable/async';
import { ProjectCompiler } from '../src/project.js';

const execute = promisify(execFile);
const example = resolve('apps/example');
const valid = `import { _state } from 'zerodep-js';
import { initial } from './input.js';
let count = _state<number>(initial);
export function read() { return count; }
export function increment() { return count++; }
`;

async function fixture() {
  const root = await mkdtemp(resolve(example, '.native-check-'));
  await writeFile(
    resolve(root, 'tsconfig.json'),
    JSON.stringify({
      extends: '../tsconfig.json',
      include: ['*.ts'],
      compilerOptions: {
        rootDir: '.',
        outDir: './out',
        noEmit: false,
        declaration: true,
        declarationMap: true,
        sourceMap: true,
        noEmitOnError: true,
      },
    }),
  );
  await writeFile(resolve(root, 'input.ts'), 'export const initial = 1;');
  await writeFile(resolve(root, 'main.ts'), valid);
  return root;
}

it('同一项目支持错误修复、依赖失效、串行快照和关闭', async () => {
  const root = await fixture();
  const compiler = createCompiler({ root, project: 'tsconfig.json' });
  const file = resolve(root, 'main.ts');
  try {
    const first = await compiler.compile(valid, file);
    expect(first.code).toContain('.state(initial)');
    expect(first.code).toContain('return count.read()');
    expect(first.map?.sources).toEqual([file]);
    await expect(
      compiler.compile(valid.replace('_state<number>', '_state<string>'), file),
    ).rejects.toThrow('TS2345');
    expect((await compiler.compile(valid, file)).code).toBe(first.code);
    const dependency = resolve(root, 'input.ts');
    await writeFile(dependency, 'export const initial = "wrong";');
    compiler.invalidate(dependency);
    await expect(compiler.compile(valid, file)).rejects.toThrow('TS2345');
    await writeFile(dependency, 'export const initial = 2;');
    compiler.invalidate(dependency);
    const [one, two] = await Promise.all([
      compiler.compile(valid.replace('return count;', 'return count + 1;'), file),
      compiler.compile(valid.replace('return count;', 'return count + 2;'), file),
    ]);
    expect(one.code).toContain('count.read() + 1');
    expect(two.code).toContain('count.read() + 2');
    await rm(dependency);
    compiler.invalidate(dependency, 'delete');
    await expect(compiler.compile(valid, file)).rejects.toThrow('TS2307');
    await writeFile(dependency, 'export const initial = 3;');
    compiler.invalidate(dependency, 'create');
    expect((await compiler.compile(valid, file)).code).toBe(first.code);
    await compiler.close();
    await expect(compiler.compile(valid, file)).rejects.toThrow('已关闭');
  } finally {
    await compiler.close();
    await rm(root, { recursive: true, force: true });
  }
}, 30000);

it('迟到的相同内容通知保留编译缓存，显式失效仍执行检查', async () => {
  const root = await fixture();
  const api = new API({ tsserverPath: compilerPath() });
  const compiler = new ProjectCompiler(api, { root });
  const file = resolve(root, 'main.ts');
  try {
    const first = await compiler.compile(valid, file);
    const checks = compiler.stats.semanticChecks;
    compiler.invalidate(file, 'create', true);
    compiler.invalidate(resolve(root, 'tsconfig.json'), 'create', true);
    compiler.invalidate(resolve(root, '../unrelated-project/package.json'), 'delete', true);
    expect((await compiler.compile(valid, file)).code).toBe(first.code);
    expect(compiler.stats.outputCacheHits).toBe(1);
    expect(compiler.stats.semanticChecks).toBe(checks);
    compiler.invalidate(file);
    await compiler.compile(valid, file);
    expect(compiler.stats.semanticChecks).toBe(checks + 1);
  } finally {
    await compiler.close();
    await api.close();
    await rm(root, { recursive: true, force: true });
  }
}, 30000);

it('新增与删除全局声明文件会刷新编译项目根文件列表', async () => {
  const root = await fixture();
  const compiler = createCompiler({ root });
  const file = resolve(root, 'main.ts');
  const ambient = resolve(root, 'ambient.d.ts');
  const source = 'export const value:number=injectedValue;';
  try {
    await writeFile(file, source);
    await expect(compiler.compile(source, file)).rejects.toThrow('TS2304');
    await writeFile(ambient, 'export {}; declare global { const injectedValue:number; }');
    compiler.invalidate(ambient, 'create');
    expect((await compiler.compile(source, file)).code).toContain('injectedValue');
    await rm(ambient);
    compiler.invalidate(ambient, 'delete');
    await expect(compiler.compile(source, file)).rejects.toThrow('TS2304');
  } finally {
    await compiler.close();
    await rm(root, { recursive: true, force: true });
  }
}, 30000);

it('原生 CLI 同时输出 JS/声明/映射，noEmit 仍报告框架错误', async () => {
  const root = await fixture();
  try {
    await execute(compilerPath(), ['-p', resolve(root, 'tsconfig.json')], { windowsHide: true });
    const js = await readFile(resolve(root, 'out/main.js'), 'utf8');
    expect(js).toContain('count.read()');
    expect(await readFile(resolve(root, 'out/main.d.ts'), 'utf8')).toContain('read(): number');
    for (const name of ['main.js.map', 'main.d.ts.map']) {
      const map = JSON.parse(await readFile(resolve(root, 'out', name), 'utf8'));
      assert(
        map.mappings.length > 0 && map.sources.some((source: string) => source.endsWith('main.ts')),
      );
    }
    await writeFile(resolve(root, 'main.ts'), valid.replace('let count', 'const count'));
    await expect(
      execute(compilerPath(), ['-p', resolve(root, 'tsconfig.json'), '--noEmit'], {
        windowsHide: true,
      }),
    ).rejects.toMatchObject({ stdout: expect.stringContaining('ZJ1005') });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}, 30000);
