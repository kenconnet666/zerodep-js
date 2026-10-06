import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { once } from 'node:events';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { pathToFileURL } from 'node:url';

// 每轮使用独立进程；热循环不包含进程启动和源码读取。
const [mode, fixture] = process.argv.slice(2);
const root = resolve(import.meta.dirname, '../..');
const sources = [
  'apps/example/src/examples/AuthoringExample.tsx',
  'apps/example/src/tasks/TaskBoard.tsx',
  'apps/example/src/workspace/Pages.tsx',
  'apps/example/src/App.tsx',
];
const files = await Promise.all(
  sources.map(async (file) => [resolve(root, file), await readFile(resolve(root, file), 'utf8')]),
);
const execute = promisify(execFile);
const ready = once(process, 'message');
process.send({ ready: true });
await ready;
const started = performance.now();
const compiler = await import(pathToFileURL(resolve(root, 'packages/native/dist/index.js')).href);
let session;
let result;
try {
  if (mode === 'cold' || mode === 'warm' || mode === 'memory') {
    const batch = () =>
      files.reduce(
        (bytes, [filename, source]) =>
          bytes + Buffer.byteLength(compiler.compile(source, filename).code),
        0,
      );
    const firstBytes = batch();
    result = { milliseconds: performance.now() - started, bytes: firstBytes, files: files.length };
    if (mode !== 'cold') {
      for (let i = 0; i < 3; i++) batch();
      const samples = [];
      for (let i = 0; i < (mode === 'memory' ? 40 : 20); i++) {
        const start = performance.now();
        assert.equal(batch(), firstBytes);
        samples.push(performance.now() - start);
      }
      result = { ...result, samples };
    }
  } else if (mode === 'project' || mode === 'memory-project') {
    const outDir = resolve(fixture, 'output');
    await execute(
      compiler.compilerPath(),
      ['-p', resolve(fixture, 'tsconfig.json'), '--outDir', outDir],
      { windowsHide: true },
    );
    const milliseconds = performance.now() - started;
    const outputFiles = (await readdir(outDir, { recursive: true, withFileTypes: true })).filter(
      (item) => item.isFile(),
    );
    const bytes = (
      await Promise.all(outputFiles.map((item) => readFile(resolve(item.parentPath, item.name))))
    ).reduce((sum, buffer) => sum + buffer.length, 0);
    result = { milliseconds, bytes, files: outputFiles.length };
    assert(outputFiles.some((item) => item.name === 'AuthoringExample.d.ts'));
    assert(outputFiles.some((item) => item.name === 'AuthoringExample.js'));
  } else if (mode === 'incremental') {
    const [filename, source] = files[0];
    session = compiler.createCompiler({
      root: resolve(root, 'apps/example'),
      project: 'tsconfig.json',
      check: true,
    });
    await session.compile(source, filename);
    const samples = [];
    let bytes = 0;
    for (let i = 0; i < 8; i++) {
      // 实际改变语句使 SourceFile 失效，不以相同文本命中结果缓存。
      const text = source + '\nexport const benchmarkEdit = ' + i + ';\n';
      const start = performance.now();
      const output = await session.compile(text, filename);
      if (i >= 2) samples.push(performance.now() - start);
      assert(output.code.includes('benchmarkEdit'));
      bytes = Buffer.byteLength(output.code);
    }
    result = { samples, bytes, files: 1 };
  } else throw new Error('未知基准场景：' + mode);
  process.send({ result });
  if (mode.startsWith('memory')) await once(process, 'message');
} catch (error) {
  process.send({ error: error.stack, stdout: error.stdout, stderr: error.stderr });
  process.exitCode = 1;
} finally {
  await session?.close();
  compiler.closeCompiler();
  process.disconnect();
}
