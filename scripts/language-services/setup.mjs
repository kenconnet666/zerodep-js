import { readFile, writeFile } from 'node:fs/promises';
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
console.log(
  'Generated project-local zerodep_js_lsp configuration. Run pnpm lsp:verify before reload.',
);
