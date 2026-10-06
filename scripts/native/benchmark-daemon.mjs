import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, readdir, rmdir, unlink, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { promisify } from 'node:util';
import { NativeTools, compilerPath, createCompiler } from '../../packages/native/dist/index.js';

const root = resolve(import.meta.dirname, '../..');
const folder = await mkdtemp(resolve(root, 'apps/example/.native-daemon-benchmark-'));
const file = resolve(folder, 'entry.tsx');
const config = resolve(folder, 'tsconfig.json');
const run = promisify(execFile);
const samples = [];
let tools;
let compiler;
async function measure(name, action) {
  const start = performance.now();
  const result = await action();
  const milliseconds = Number((performance.now() - start).toFixed(2));
  samples.push({ name, milliseconds });
  console.log(`${name}: ${milliseconds} ms`);
  return result;
}
async function check(name, error) {
  const result = await measure(name, () => tools.check([config]));
  assert(result.complete, JSON.stringify(result));
  if (error) assert(result.diagnostics.some((item) => item.code === error));
  else assert.deepEqual(result.diagnostics, []);
}
async function remove(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory() && !entry.isSymbolicLink()) await remove(path);
    else await unlink(path);
  }
  await rmdir(directory);
}
try {
  // 隔离本次测量的服务，保留真实示例的 TSX/框架声明配置。
  await writeFile(resolve(folder, 'pnpm-workspace.yaml'), 'packages: []\n');
  await writeFile(
    config,
    JSON.stringify({ extends: '../tsconfig.json', include: ['*.ts', '*.tsx'] }),
  );
  await writeFile(file, 'export const value = 1;');
  for (let i = 0; i < 3; i++)
    await measure('空 TSX 独立冷检查', () =>
      run(compilerPath(), ['-p', config, '--noEmit'], { cwd: folder, windowsHide: true }),
    );
  tools = new NativeTools(folder);
  await check('空 TSX 服务首次检查');
  await check('空 TSX 无变化检查');
  for (let i = 0; i < 3; i++) {
    await writeFile(file, `export const value = ${i + 2};`);
    await check('空 TSX 常量修改检查');
  }
  const before = await tools.stats();
  await tools.close();
  tools = new NativeTools(folder);
  await check('新客户端无变化检查');
  assert.equal((await tools.stats()).compilerPid, before.compilerPid);
  const input = resolve(folder, 'input.ts');
  await writeFile(input, 'export const input = 1;');
  await writeFile(file, 'import { input } from "./input"; export const value: number = input;');
  await check('增加依赖图首次检查');
  for (let i = 0; i < 3; i++) {
    await writeFile(input, `export const input = ${i + 2};`);
    await check('依赖值修改检查');
  }
  await writeFile(input, 'export const input = "错误";');
  await check('依赖类型错误检查', 'TS2322');
  await writeFile(input, 'export const input = 5;');
  await check('依赖类型修复检查');
  await writeFile(resolve(folder, 'global.d.ts'), 'declare const daemonGlobal: number;');
  await writeFile(file, 'export const value: number = daemonGlobal;');
  await check('增加全局声明首次检查');
  await writeFile(resolve(folder, 'global.d.ts'), 'declare const daemonGlobal: string;');
  await check('全局声明变更检查', 'TS2322');
  const jsx = (index) =>
    `import { _component } from 'zerodep-js'; export const Example = _component(({label}: {label: string}) => <div title="${index}">{label}</div>);`;
  await writeFile(file, jsx(0));
  await check('真实 JSX 首次检查');
  for (let i = 0; i < 3; i++) {
    await writeFile(file, jsx(i + 1));
    await check('真实 JSX 修改检查');
  }
  compiler = createCompiler({ root: folder });
  await measure('JSX 单文件首次检查加输出', () => compiler.compile(jsx(3), file));
  for (let i = 0; i < 3; i++) {
    await writeFile(file, jsx(i + 4));
    await measure('JSX 单文件修改检查加输出', () => compiler.compile(jsx(i + 4), file));
  }
  const report = {
    measuredAt: new Date().toISOString(),
    node: process.version,
    platform: process.platform + '-' + process.arch,
    adapterHash: createHash('sha256')
      .update(
        Buffer.concat(
          await Promise.all(
            (await readdir(resolve(root, 'packages/native/dist')))
              .filter((name) => name.endsWith('.js'))
              .sort()
              .map((name) => readFile(resolve(root, 'packages/native/dist', name))),
          ),
        ),
      )
      .digest('hex'),
    sdk: JSON.parse(
      await readFile(resolve(dirname(compilerPath()), '../zerodep-build.json'), 'utf8'),
    ),
    workload:
      '继承 apps/example 完整 TSX/框架类型配置；冷检查、修改与错误恢复均实际执行，未裁剪 JSX 声明。',
    limitations:
      '同机顺序测量，未清空 OS 文件缓存。单文件检查加输出不替代整个项目诊断；声明变化可能触发完整重检。',
    samples,
    stats: await tools.stats(),
  };
  await mkdir(resolve(root, 'reports'), { recursive: true });
  await writeFile(
    resolve(root, 'reports/native-daemon-performance.json'),
    JSON.stringify(report, null, 2) + '\n',
  );
} finally {
  await compiler?.close();
  await tools?.stop({ force: true }).catch(() => {});
  await tools?.close();
  await remove(folder);
}
