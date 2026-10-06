import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { once } from 'node:events';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { promisify } from 'node:util';
import { pathToFileURL } from 'node:url';

// 每轮由独立 Node 进程运行；不预加载另一种后端，不把进程启动算进热循环。
const [backend, mode, fixture] = process.argv.slice(2);
const root = resolve(import.meta.dirname, '../..');
const sources = [
  'apps/example/src/examples/AuthoringExample.tsx',
  'apps/example/src/tasks/TaskBoard.tsx',
  'apps/example/src/workspace/Pages.tsx',
  'apps/hosts/src/page/SharedPage.tsx',
];
const files = await Promise.all(
  sources.map(async (file) => [resolve(root, file), await readFile(resolve(root, file), 'utf8')]),
);
const execute = promisify(execFile);
const ready = once(process, 'message');
process.send({ ready: true });
await ready;
const started = performance.now();
const compiler = await import(
  pathToFileURL(
    resolve(root, `packages/${backend === 'native' ? 'native' : 'compiler'}/dist/index.js`),
  ).href
);
let session;
let api;
let snapshot;
let result;
const diagnostics = (items) => assert.equal(items.length, 0, JSON.stringify(items));
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
    const config = resolve(fixture, 'tsconfig.json');
    const outDir = resolve(fixture, 'output');
    const args = ['-p', config, '--outDir', outDir];
    if (backend === 'native') await execute(compiler.compilerPath(), args, { windowsHide: true });
    else {
      await execute(
        process.execPath,
        [resolve(root, 'node_modules/typescript/bin/tsc'), ...args, '--emitDeclarationOnly'],
        { windowsHide: true },
      );
      const visit = async (directory) => {
        for (const item of await readdir(directory, { withFileTypes: true })) {
          const filename = resolve(directory, item.name);
          if (item.isDirectory()) await visit(filename);
          else if (/\.tsx?$/.test(item.name) && !item.name.endsWith('.d.ts')) {
            const output = resolve(
              outDir,
              relative(resolve(root, 'apps/example/src'), filename).replace(/\.tsx?$/, '.js'),
            );
            const compiled = compiler.compile(await readFile(filename, 'utf8'), filename);
            await mkdir(dirname(output), { recursive: true });
            await writeFile(
              output,
              compiled.code + '\n//# sourceMappingURL=' + item.name.replace(/\.tsx?$/, '.js.map'),
            );
            await writeFile(output + '.map', JSON.stringify(compiled.map));
          }
        }
      };
      await visit(resolve(root, 'apps/example/src'));
    }
    const milliseconds = performance.now() - started;
    const entries = await readdir(outDir, { recursive: true, withFileTypes: true });
    const outputFiles = entries.filter((item) => item.isFile());
    const bytes = (
      await Promise.all(outputFiles.map((item) => readFile(resolve(item.parentPath, item.name))))
    ).reduce((sum, buffer) => sum + buffer.length, 0);
    result = { milliseconds, bytes, files: outputFiles.length };
    assert(outputFiles.some((item) => item.name === 'AuthoringExample.d.ts'));
    assert(outputFiles.some((item) => item.name === 'AuthoringExample.js'));
  } else if (mode === 'incremental') {
    // 两侧保留同一个 TS7 Program；基线只让 TS 检查，Babel 独立转换 JS。
    const { API } = await import('typescript/unstable/async');
    const [filename, source] = files[0];
    const project = resolve(root, 'apps/example/tsconfig.json');
    let programId;
    if (backend === 'native')
      session = compiler.createCompiler({
        root: resolve(root, 'apps/example'),
        project,
        check: true,
      });
    else {
      api = new API({ cwd: root });
      const config = await api.parseConfigFile(project);
      diagnostics(config.errors);
      snapshot = await api.createSnapshot({
        ensurePrograms: true,
        createPrograms: [{ rootFiles: config.fileNames, compilerOptions: config.options }],
      });
      programId = snapshot.operation.createdPrograms[0].id;
    }
    const compile = async (text) => {
      if (session) return session.compile(text, filename);
      const previous = snapshot;
      snapshot = await previous.update({
        ensurePrograms: true,
        fileSystem: { kind: 'layer', files: { [filename]: text } },
        fileNotifications: { changed: [filename] },
      });
      await previous.dispose();
      const program = snapshot.getProgram(programId);
      diagnostics(await program.getSyntacticDiagnostics(filename));
      diagnostics(await program.getSemanticDiagnostics(filename));
      return compiler.compile(text, filename);
    };
    await compile(source);
    const samples = [];
    let bytes = 0;
    for (let i = 0; i < 8; i++) {
      // 实际新增语句，强制 SourceFile 失效；不以相同文本命中结果缓存。
      const text = source + '\nexport const benchmarkEdit = ' + i + ';\n';
      const start = performance.now();
      const output = await compile(text);
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
  await api?.close();
  compiler.closeCompiler?.();
  process.disconnect();
}
