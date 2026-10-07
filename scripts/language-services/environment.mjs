import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, realpathSync } from 'node:fs';
import { compilerPath } from '../../packages/compiler/dist/typescript.js';

export const directory = dirname(fileURLToPath(import.meta.url));
export const root = realpathSync.native(resolve(process.argv[2] ?? resolve(directory, '../..')));
export const requireProject = createRequire(resolve(root, 'package.json'));

export function serviceConfig() {
  const manifest = JSON.parse(
    readFileSync(requireProject.resolve('typescript/package.json'), 'utf8'),
  );
  if (!manifest.version.startsWith('7.1.'))
    throw new Error('语言服务需要项目固定的选定 TypeScript 7.1。');
  return {
    bin: compilerPath(),
    args: ['--lsp', '--stdio'],
  };
}
