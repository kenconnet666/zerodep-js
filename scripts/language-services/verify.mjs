import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { parse } from 'smol-toml';
import { root } from './environment.mjs';
import { connectMcp } from './mcp-client.mjs';
import { service, closeService } from './language-client.mjs';
import { removeProbes } from './probe-files.mjs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { relative } from 'node:path';

const config = parse(await readFile(resolve(root, '.codex/config.toml'), 'utf8'));
const registered = config.mcp_servers?.zerodep_js_lsp;
assert(registered, 'Run pnpm lsp:setup first.');
assert.equal(resolve(registered.cwd), root);
let log = '';
const client = await connectMcp(registered, 'zerodep-js-lsp-verification', (data) => {
  log = (log + data).slice(-8000);
});
const created = new Set();
const id = '__lsp_' + randomUUID().replaceAll('-', '');
const base = 'packages/core/src/' + id;
const shared = base + '_shared.ts';
// 同名 .ts 会使 .tsx 被项目文件发现规则排除，探针必须使用不同文件名。
const files = [base + '_typescript.ts', base + '_tsx.tsx', 'apps/example/src/' + id + '_app.tsx'];

async function save(file, text) {
  await writeFile(resolve(root, file), text, {
    encoding: 'utf8',
    flag: created.has(file) ? 'w' : 'wx',
  });
  created.add(file);
}
async function call(name, args) {
  const response = await client.request('tools/call', { name, arguments: args });
  assert(!response.isError, response.content?.[0]?.text);
  return JSON.parse(response.content[0].text);
}
async function point(filePath, needle, offset = 0) {
  const text = await readFile(resolve(root, filePath), 'utf8');
  const index = text.indexOf(needle);
  assert(index >= 0, 'Missing probe text: ' + needle);
  const before = text.slice(0, index + offset);
  return {
    filePath,
    line: before.split('\n').length,
    column: before.length - before.lastIndexOf('\n'),
  };
}
function fixture(file, valid) {
  const importPath = file.startsWith('apps/')
    ? '../../../packages/core/src/' + id + '_shared.js'
    : './' + id + '_shared.js';
  const lines = [
    `import { tokens, pixels } from '${importPath}';`,
    `const count: number = ${valid ? '1' : "'wrong'"};`,
    `const tone = tokens.${valid ? 'primary' : 'missing'};`,
    `const width = pixels(${valid ? '12' : "'bad'"});`,
    'export const output = count.toFixed() + tone + width;',
  ];

  if (file.endsWith('.tsx')) {
    lines.push(
      'declare global { namespace JSX { interface Element {} interface IntrinsicElements { span: { children?: string }; } interface ElementChildrenAttribute { children: {}; } } }',
      'export const view = <span>{output}</span>;',
    );
  }
  return lines.join('\n') + '\n';
}
const dependency = (valid) =>
  `export const tokens = { primary: 'red' } as const;\nexport function pixels(value: number): ${valid ? 'string' : 'number'} { return ${valid ? 'value + "px"' : 'value'}; }\n`;

try {
  await save(shared, dependency(true));
  for (const file of files) await save(file, fixture(file, false));
  assert.deepEqual((await client.request('tools/list')).tools.map((tool) => tool.name).sort(), [
    'completions',
    'definitions',
    'diagnostics',
    'hover',
    'references',
  ]);
  for (const filePath of files) {
    for (const valid of [false, true, false, true]) {
      await save(filePath, fixture(filePath, valid));
      const report = await call('diagnostics', { filePath });
      assert(report.complete);
      assert(report.server.version.startsWith('7.'));
      if (valid) assert.equal(report.errors, 0, JSON.stringify(report));
      else
        for (const code of [2322, 2339, 2345]) {
          assert(
            report.diagnostics.some((item) => Number(item.code) === code),
            JSON.stringify(report),
          );
        }
    }
    const position = await point(filePath, 'pixels(12)');
    assert(JSON.stringify((await call('hover', position)).contents).includes('number'));
    assert(
      (await call('definitions', position)).items.some((item) =>
        item.filePath.includes(id + '_shared'),
      ),
    );
    assert((await call('references', await point(filePath, 'count.toFixed'))).total >= 2);
    const completions = await call('completions', {
      ...(await point(filePath, 'tokens.primary', 7)),
      prefix: 'pri',
      resolveLimit: 1,
    });
    assert(completions.items.some((item) => item.label === 'primary'));
    console.log('TS7 diagnostic refresh and semantic tools passed: ' + filePath.slice(-3));
  }

  // 依赖文件未作为查询目标打开，也必须影响消费文件的下一次诊断。
  await save(
    files[0],
    `import { pixels } from './${id}_shared.js';\nexport const width: string = pixels(12);\n`,
  );
  for (const valid of [true, false, true]) {
    await save(shared, dependency(valid));
    const report = await call('diagnostics', { filePath: files[0] });
    if (valid) assert.equal(report.errors, 0, JSON.stringify(report));
    else
      assert(
        report.diagnostics.some((item) => Number(item.code) === 2322),
        JSON.stringify(report),
      );
  }
  const denied = await client.request('tools/call', {
    name: 'diagnostics',
    arguments: { filePath: '../solid/package.json' },
  });
  assert(denied.isError, 'Paths outside the workspace must be rejected.');
  const frameworkFile = 'apps/example/src/' + id + '_framework.tsx';
  for (const valid of [false, true]) {
    await save(
      frameworkFile,
      `import { _component } from 'zerodep-js';\nexport const Probe = _component(({ value }: { value: number }) => { ${valid ? '' : 'value++;'} return <span>{value}</span>; });\n`,
    );
    const report = await call('diagnostics', { filePath: frameworkFile });
    assert(report.framework.complete);
    if (valid) assert.equal(report.errors, 0, JSON.stringify(report));
    else
      assert(
        report.diagnostics.some((item) => item.source === 'zerodep-js' && item.code === 'ZJ1203'),
        JSON.stringify(report),
      );
  }
  console.log('框架诊断与原生类型诊断的错误/修复循环通过。');

  // 合法属性不代表一定能补全：直接询问原生 TS7，不在 MCP 中补造候选。
  const bindingFile = 'apps/example/src/' + id + '_bindings.tsx';
  await save(
    bindingFile,
    `import { _component, _state } from 'zerodep-js';
export const BindingProbe = _component(() => {
  let text = _state('');
  return <input bind />;
});
`,
  );
  const bindingCompletions = await call('completions', {
    ...(await point(bindingFile, 'bind />', 4)),
    prefix: 'bind',
    resolveLimit: 3,
  });
  assert.deepEqual(bindingCompletions.items.map((item) => item.insertText).sort(), [
    'bind:checked',
    'bind:value',
    'bind:valueAsNumber',
  ]);
  assert(
    bindingCompletions.items.every((item) => item.detail && item.documentation),
    '绑定候选需要同时提供类型和使用说明。',
  );
  await save(
    bindingFile,
    (await readFile(resolve(root, bindingFile), 'utf8')).replace(
      '<input bind />',
      '<input bind:value={text} />',
    ),
  );
  const bindingReport = await call('diagnostics', { filePath: bindingFile });
  assert(bindingReport.complete && bindingReport.errors === 0, JSON.stringify(bindingReport));
  console.log('TS7 JSX 绑定补全通过：三个原生输入候选、类型、说明和完整写法。');

  // 必须命中源属性本身，非空结果或跳到框架的条件类型都不算导航成功。
  let navigationChecks = 0;
  async function definitionAt(file, needle, offset, targetFile, targetNeedle) {
    const report = await call('definitions', await point(file, needle, offset));
    const expected = await point(targetFile, targetNeedle);
    assert.equal(report.total, 1, JSON.stringify(report));
    const actual = report.items[0];
    assert.equal(relative(root, actual.filePath).replaceAll('\\', '/'), targetFile);
    assert.deepEqual(actual.range.start, { line: expected.line, column: expected.column });
    navigationChecks++;
  }
  const authoring = 'apps/example/src/examples/AuthoringExample.tsx';
  const jsxTypes = 'packages/core/src/jsx-runtime.ts';
  for (const offset of [1, 6]) {
    for (const [needle, declaration] of [
      ['bind:value={text}', "'bind:value'?: string | null"],
      ['bind:checked={checked}', "'bind:checked'?: boolean"],
      ['bind:valueAsNumber={amount}', "'bind:valueAsNumber'?: number"],
      ['bind:value={selected}', "'bind:value'?: string | readonly"],
    ])
      await definitionAt(authoring, needle, offset, jsxTypes, declaration);
    await definitionAt(authoring, 'bind:value={custom}', offset, authoring, 'value: string;');
  }
  const bindingDefinition = 'apps/example/src/' + id + '_binding_definition.tsx';
  await save(
    bindingDefinition,
    `import { _component } from 'zerodep-js';
export interface OptionalProps {
  readonly value?: string;
  onValueChange: (value: string | undefined) => void;
}
export const OptionalField = _component((props: OptionalProps) => <span>{props.value}</span>);
export interface GenericProps<T> { value: T; onValueChange: (value: T) => void }
export const GenericField = _component(<T,>(props: GenericProps<T>) => <span>{String(props.value)}</span>);
`,
  );
  await save(
    bindingFile,
    `import { _component, _state } from 'zerodep-js';
import { OptionalField, GenericField } from './${id}_binding_definition.js';
export const BindingProbe = _component(() => {
  let optional = _state<string>();
  let text = _state('');
  return <><OptionalField bind:value={optional} /><GenericField<string> bind:value={text} /></>;
});
`,
  );
  const navigationReport = await call('diagnostics', { filePath: bindingFile });
  assert(
    navigationReport.complete && navigationReport.errors === 0,
    JSON.stringify(navigationReport),
  );
  for (const offset of [1, 6]) {
    await definitionAt(
      bindingFile,
      'bind:value={optional}',
      offset,
      bindingDefinition,
      'value?: string',
    );
    await definitionAt(bindingFile, 'bind:value={text}', offset, bindingDefinition, 'value: T;');
  }
  console.log(
    `TS7 绑定导航通过：${navigationChecks} 个位置准确命中原生、组件及跨文件可选/泛型源属性。`,
  );

  // 使用标准 LSP 重命名协议，只把编辑应用到本次创建的探针，绝不改动真实源码。
  const definition = 'apps/example/src/' + id + '_rename.tsx';
  const consumer = 'apps/example/src/' + id + '_consumer.tsx';
  await save(
    definition,
    `import { _component, _state } from 'zerodep-js';
export const RenameCounter = _component(({ step = 1 }: {step?: number;}) => {
  let count = _state(0);
  return <button onClick={() => {count += step;}}>{count}</button>;
});
`,
  );
  await save(
    consumer,
    `import { RenameCounter } from './${id}_rename.js';\nexport const view = <RenameCounter step={2} />;\n`,
  );
  const language = await service('typescript');
  assert(language.capabilities.renameProvider, 'TS7 服务需要提供标准重命名能力。');
  async function rename(needle, newName) {
    const location = await point(definition, needle);
    const doc = {
      uri: pathToFileURL(resolve(root, definition)).href,
      languageId: 'typescriptreact',
      text: await readFile(resolve(root, definition), 'utf8'),
    };
    const edit = await language.run(doc, () =>
      language.request('textDocument/rename', {
        textDocument: { uri: doc.uri },
        position: { line: location.line - 1, character: location.column - 1 },
        newName,
      }),
    );
    assert(edit, '重命名没有返回编辑结果。');
    const updates = edit.changes
      ? Object.entries(edit.changes)
      : (edit.documentChanges ?? []).map((change) => [change.textDocument.uri, change.edits]);
    assert(updates.length > 0);
    for (const [uri, edits] of updates) {
      const file = relative(root, fileURLToPath(uri)).replaceAll('\\', '/');
      assert(created.has(file), '拒绝把重命名编辑应用到探针之外：' + file);
      let text = await readFile(resolve(root, file), 'utf8');
      const lines = text.split('\n');
      const offset = (position) =>
        lines.slice(0, position.line).reduce((sum, line) => sum + line.length + 1, 0) +
        position.character;
      const replacements = edits
        .map((edit) => ({
          start: offset(edit.range.start),
          end: offset(edit.range.end),
          text: edit.newText,
        }))
        .sort((a, b) => b.start - a.start);
      for (const edit of replacements)
        text = text.slice(0, edit.start) + edit.text + text.slice(edit.end);
      await save(file, text);
    }
  }
  await rename('count =', 'quantity');
  const renamedState = await readFile(resolve(root, definition), 'utf8');
  assert(!/\bcount\b/.test(renamedState));
  assert.equal(renamedState.match(/\bquantity\b/g)?.length, 3);
  await rename('RenameCounter =', 'RenamedCounter');
  const renamedConsumer = await readFile(resolve(root, consumer), 'utf8');
  assert(
    renamedConsumer.includes('import { RenamedCounter }') &&
      renamedConsumer.includes('<RenamedCounter'),
  );
  for (const filePath of [definition, consumer]) {
    const report = await call('diagnostics', { filePath });
    assert(
      report.complete && report.framework.complete && report.errors === 0,
      JSON.stringify(report),
    );
  }
  console.log('标准 TS7 重命名通过：响应式变量、组件导出、跨文件导入和 JSX 引用。');
  const core = await call('diagnostics', { filePath: 'packages/core/src/index.ts' });
  assert(core.complete && core.errors === 0, JSON.stringify(core));
  console.log(
    'Native TypeScript ' +
      core.server.version +
      ': dependency refresh, workspace isolation, and core diagnostics passed.',
  );
  console.log('独立服务验证完成；若桌面 MCP 进程已运行，脚本缓存需在新会话中另行核对。');
} finally {
  await closeService();
  await client.close();
  await removeProbes([...created].map((file) => resolve(root, file)));
  if (log) process.stderr.write(log);
}
