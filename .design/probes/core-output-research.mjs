// 用隔离安装的 TS6 与仓库定制 TS7 对照 core 输出，全程不覆盖源码或 dist。
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { parse } from '@babel/parser';
import { API } from 'typescript/unstable/async';
import { compilerPath } from '../../packages/native/dist/binary.js';

const root = resolve(import.meta.dirname, '../..');
const ts = createRequire(resolve(process.argv[2]))('typescript');
assert.equal(ts.version, '6.0.3');
const key = (file) => resolve(file).toLowerCase();
const target = resolve(root, 'packages/core/src/dev/runtime.ts');
const source = readFileSync(target, 'utf8');
const before = 'const component = defineComponent((props: Props) => {';
assert.equal(source.split(before).length, 2);
const overlay = source.replace(
  before,
  'const component: AnyComponent = defineComponent((props: Props) => {',
);
const dist = resolve(root, 'packages/core/dist');
const outputs6 = new Map();

function traditionalProgram(project, files, emit) {
  const configPath = resolve(root, project, 'tsconfig.json');
  const raw = ts.readConfigFile(configPath, ts.sys.readFile);
  assert.equal(raw.error, undefined);
  const config = ts.parseJsonConfigFileContent(
    raw.config,
    ts.sys,
    resolve(root, project),
    undefined,
    configPath,
  );
  assert.equal(config.errors.length, 0);
  const options = {
    ...config.options,
    noEmit: !emit,
    composite: false,
    incremental: false,
    tsBuildInfoFile: undefined,
    declaration: emit,
    declarationMap: false,
    sourceMap: false,
  };
  const host = ts.createCompilerHost(options);
  const original = host.getSourceFile.bind(host);
  host.getSourceFile = (file, version, ...rest) =>
    files.has(key(file))
      ? ts.createSourceFile(file, files.get(key(file)), version, true)
      : original(file, version, ...rest);
  host.writeFile = (file, text) => outputs6.set(resolve(file), text);
  const program = ts.createProgram(config.fileNames, options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.equal(
    diagnostics.length,
    0,
    ts.formatDiagnostics(diagnostics, {
      getCurrentDirectory: () => root,
      getCanonicalFileName: (s) => s,
      getNewLine: () => '\n',
    }),
  );
  if (emit) assert.equal(program.emit().emitSkipped, false);
  return diagnostics.length;
}

const diagnosticCount6 = traditionalProgram(
  'packages/core',
  new Map([[key(target), overlay]]),
  true,
);
console.log('TS6 core 检查和内存输出完成。');
const api = new API({ cwd: root, tsserverPath: compilerPath() });
const snapshots = [];
async function nativeProgram(project, files, emit) {
  const config = await api.parseConfigFile(resolve(root, project, 'tsconfig.json'));
  assert.equal(config.errors.length, 0);
  const options = {
    ...config.options,
    noEmit: !emit,
    composite: false,
    incremental: false,
    declaration: emit,
    declarationMap: false,
    sourceMap: false,
  };
  delete options.tsBuildInfoFile;
  const snapshot = await api.createSnapshot({
    ensurePrograms: true,
    fileSystem: { kind: 'layer', files },
    createPrograms: [{ rootFiles: config.fileNames, compilerOptions: options }],
  });
  snapshots.push(snapshot);
  const program = snapshot.operation.createdPrograms[0];
  const diagnostics = [
    ...(await program.getSyntacticDiagnostics()),
    ...(await program.getSemanticDiagnostics()),
  ];
  assert.equal(diagnostics.length, 0, JSON.stringify(diagnostics));
  return program;
}

try {
  const program = await nativeProgram('packages/core', { [target]: overlay }, true);
  const emitted = await program.emitToString();
  assert.equal(emitted.emitSkipped, false);
  assert.equal(emitted.diagnostics.length, 0);
  const outputs7 = new Map([...emitted.outputFiles].map(([file, data]) => [key(file), data.text]));
  const ignored = new Set([
    'start',
    'end',
    'loc',
    'extra',
    'comments',
    'leadingComments',
    'trailingComments',
    'innerComments',
    'errors',
    'tokens',
  ]);
  const shape = (text, dts) =>
    JSON.stringify(
      parse(text, {
        sourceType: 'module',
        plugins: dts ? ['typescript'] : [],
        attachComment: false,
      }),
      (name, value) => (ignored.has(name) ? undefined : value),
    );
  const details = [...outputs6].map(([file, text6]) => {
    const text7 = outputs7.get(key(file));
    const dts = file.endsWith('.d.ts');
    return {
      file: relative(dist, file).replaceAll('\\', '/'),
      kind: dts ? 'declaration' : 'javascript',
      existsInNative: text7 !== undefined,
      textEqual:
        text7 !== undefined && text6.replaceAll('\r\n', '\n') === text7.replaceAll('\r\n', '\n'),
      astEqual: text7 !== undefined && shape(text6, dts) === shape(text7, dts),
    };
  });
  console.log(
    `输出对比完成：${details.filter((item) => item.textEqual).length}/${details.length} 文本相同，${details.filter((item) => item.astEqual).length}/${details.length} AST 相同。`,
  );
  const declarations = [...outputs6].filter(([file]) => file.endsWith('.d.ts'));
  const hostDiagnostics = traditionalProgram(
    'apps/hosts',
    new Map(declarations.map(([file, text]) => [key(file), text])),
    false,
  );
  console.log('TS6 宿主消费 core 声明检查完成。');
  await nativeProgram('apps/example', Object.fromEntries(declarations), false);
  const result = {
    typescript6: ts.version,
    nativeBinary: relative(root, compilerPath()).replaceAll('\\', '/'),
    coreSourceOverlay: 'const component: AnyComponent = defineComponent(...)',
    sourceFilesModified: false,
    options: {
      target: 'ES2023',
      module: 'Preserve',
      declaration: true,
      sourceMap: false,
      declarationMap: false,
    },
    diagnostics: { ts6: diagnosticCount6, ts7: 0 },
    outputCounts: { ts6: outputs6.size, ts7: outputs7.size },
    equalText: details.filter((item) => item.textEqual).length,
    equalAst: details.filter((item) => item.astEqual).length,
    consumersOfTs6Declarations: [
      { project: 'apps/hosts', compiler: 'TS6', diagnostics: hostDiagnostics },
      { project: 'apps/example', compiler: 'custom TS7', diagnostics: 0 },
    ],
    limitations: [
      'Comparison excludes source maps and declaration maps.',
      'AST comparison ignores comments, locations and literal spelling metadata; runtime and browser tests remain separate.',
    ],
    details,
  };
  writeFileSync(
    resolve(root, '.design/probes/core-output-results.json'),
    JSON.stringify(result, null, 2) + '\n',
  );
  console.log(
    JSON.stringify(
      { ...result, details: details.filter((item) => !item.textEqual || !item.astEqual) },
      null,
      2,
    ),
  );
} finally {
  for (const snapshot of snapshots) await snapshot.dispose();
  await api.close();
}
