import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { realpathSync } from 'node:fs';

export const directory = dirname(fileURLToPath(import.meta.url));
export const root = realpathSync.native(resolve(process.argv[2] ?? resolve(directory, '../..')));
export const requireProject = createRequire(resolve(root, 'package.json'));

export function serviceConfig() {
  const manifest = requireProject('typescript/package.json');
  if (!manifest.version.startsWith('7.')) throw new Error('TypeScript 7 is required.');
  const packageRoot = dirname(requireProject.resolve('typescript/package.json'));
  return {
    bin: process.execPath,
    args: [resolve(packageRoot, manifest.bin.tsc), '--lsp', '--stdio'],
  };
}
