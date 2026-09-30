import assert from 'node:assert/strict';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { parse } from 'smol-toml';
import { requireProject, root } from './environment.mjs';

const { Client } = requireProject('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = requireProject('@modelcontextprotocol/sdk/client/stdio.js');
const config = parse(await readFile(resolve(root, '.codex/config.toml'), 'utf8'));
const registered = config.mcp_servers?.zerodep_js_lsp;
assert(registered, 'Run pnpm lsp:setup first.');
assert.equal(resolve(registered.cwd), root);
const client = new Client({ name: 'zerodep-js-lsp-verification', version: '1' });
const transport = new StdioClientTransport({
  command: registered.command,
  args: registered.args,
  cwd: registered.cwd,
  stderr: 'pipe',
});
let log = '';
transport.stderr?.on('data', (data) => {
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
  const response = await client.callTool({ name, arguments: args }, undefined, { timeout: 90000 });
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
  await client.connect(transport, { timeout: 60000 });
  assert.deepEqual((await client.listTools()).tools.map((tool) => tool.name).sort(), [
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
  const denied = await client.callTool({
    name: 'diagnostics',
    arguments: { filePath: '../solid/package.json' },
  });
  assert(denied.isError, 'Paths outside the workspace must be rejected.');
  const frameworkFile = 'apps/example/src/' + id + '_framework.tsx';
  for (const valid of [false, true]) {
    await save(
      frameworkFile,
      `import { component } from '@zerodep-js/core';\nexport const Probe = component(({ value }: { value: number }) => { ${valid ? '' : 'value++;'} return <span>{value}</span>; });\n`,
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
  const core = await call('diagnostics', { filePath: 'packages/core/src/index.ts' });
  assert(core.complete && core.errors === 0, JSON.stringify(core));
  console.log(
    'Native TypeScript ' +
      core.server.version +
      ': dependency refresh, workspace isolation, and core diagnostics passed.',
  );
  console.log('Restart Codex to verify native MCP tool exposure in a fresh session.');
} finally {
  await client.close();
  await transport.close();
  for (const file of created) await unlink(resolve(root, file));
  if (log) process.stderr.write(log);
}
