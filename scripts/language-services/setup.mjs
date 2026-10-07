import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parse } from 'smol-toml';
import { root, serviceConfig } from './environment.mjs';

if (process.versions.node.split('.')[0] !== '24') throw new Error('Node 24 is required.');
serviceConfig();
const path = resolve(root, '.codex/config.toml');
const template = await readFile(resolve(root, '.codex/config.example.toml'), 'utf8');
const block = template
  .replace('__NODE__', JSON.stringify(process.execPath.replaceAll('\\', '/')))
  .replace('__ROOT__', JSON.stringify(root.replaceAll('\\', '/')));
const managed = /# BEGIN ZERODEP JS LANGUAGE SERVICES[\s\S]*?# END ZERODEP JS LANGUAGE SERVICES/u;
const existing = await readFile(path, 'utf8').catch((error) => {
  if (error.code === 'ENOENT') return '';
  throw error;
});
const parsed = parse(existing);
if (!managed.test(existing) && parsed.mcp_servers?.zerodep_js_lsp) {
  throw new Error('An unmanaged zerodep_js_lsp configuration already exists.');
}
const next = managed.test(existing)
  ? existing.replace(managed, () => block.trimEnd())
  : existing.trimEnd() + (existing ? '\n\n' : '') + block;
parse(next);
await writeFile(path, next);
const editor = resolve(root, '.codex/lsp4ij');
await mkdir(editor, { recursive: true });
const node = process.execPath.replaceAll('\\', '/');
const server = resolve(root, 'packages/compiler/bin/language-server.mjs').replaceAll('\\', '/');
await writeFile(
  resolve(editor, 'template.json'),
  JSON.stringify(
    {
      id: 'zerodep-js',
      name: 'Zerodep TS7.1',
      programArgs: { default: `"${node}" "${server}" --stdio` },
      fileTypeMappings: [
        {
          fileType: { name: 'TypeScript', patterns: ['*.ts', '*.mts', '*.cts'] },
          languageId: 'typescript',
        },
        {
          fileType: { name: 'TypeScript-React', patterns: ['*.tsx'] },
          languageId: 'typescriptreact',
        },
        {
          fileType: { name: 'JavaScript', patterns: ['*.js', '*.mjs', '*.cjs'] },
          languageId: 'javascript',
        },
        {
          fileType: { name: 'JavaScript-React', patterns: ['*.jsx'] },
          languageId: 'javascriptreact',
        },
      ],
    },
    null,
    2,
  ) + '\n',
);
await writeFile(
  resolve(editor, 'initializationOptions.json'),
  JSON.stringify({ projectRoot: root }, null, 2) + '\n',
);
await writeFile(
  resolve(editor, 'clientSettings.json'),
  JSON.stringify({ format: { enabled: false } }, null, 2) + '\n',
);
console.log(
  'Generated project-local zerodep_js_lsp configuration. Run pnpm lsp:verify before reload.',
);
console.log('LSP4IJ 导入模板：' + editor + '；实际 IDE 接入需单独验证。');
