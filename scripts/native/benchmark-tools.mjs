import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { promisify } from 'node:util';
import { NativeTools, compilerPath } from '../../packages/native/dist/index.js';

const root = resolve(import.meta.dirname, '../..');
const project = resolve(root, 'apps/example/tsconfig.json');
const run = promisify(execFile);
const milliseconds = async (action) => {
  const start = performance.now();
  const result = await action();
  return { milliseconds: Number((performance.now() - start).toFixed(2)), result };
};
const independent = [];
for (let sample = 0; sample < 3; sample++) {
  const time = await milliseconds(() =>
    run(compilerPath(), ['-p', project, '--noEmit'], {
      cwd: root,
      windowsHide: true,
      maxBuffer: 4 * 1024 * 1024,
    }),
  );
  independent.push(time.milliseconds);
  console.log(`独立 Go 检查 ${sample + 1}: ${time.milliseconds} ms`);
}
const tools = new NativeTools(root);
const shared = [];
let stats;
try {
  for (let sample = 0; sample < 3; sample++) {
    const time = await milliseconds(() => tools.check([project]));
    assert(time.result.complete && time.result.diagnostics.length === 0);
    shared.push({ milliseconds: time.milliseconds, cached: time.result.cached });
    console.log(`共享服务检查 ${sample + 1}: ${time.milliseconds} ms，缓存=${time.result.cached}`);
  }
  stats = await tools.stats();
} finally {
  await tools.close();
}
const report = {
  measuredAt: new Date().toISOString(),
  node: process.version,
  platform: process.platform + '-' + process.arch,
  sdk: JSON.parse(
    await readFile(resolve(dirname(compilerPath()), '../zerodep-build.json'), 'utf8'),
  ),
  workload: 'apps/example: 类型、框架诊断及配置中的 Go lint；所有输入未变化，不包含 emit/打包。',
  limitations:
    '独立检查每次启动 Go；共享服务首次含 Node/Go 启动，后续含配置与依赖指纹复核。未清空 OS 缓存；结果缓存收益不是增量编辑或解析器速度。',
  independent,
  shared,
  stats,
};
await mkdir(resolve(root, 'reports'), { recursive: true });
await writeFile(
  resolve(root, 'reports/native-tooling-performance.json'),
  JSON.stringify(report, null, 2) + '\n',
);
