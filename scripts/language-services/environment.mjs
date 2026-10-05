import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, realpathSync } from 'node:fs';
import { createHash } from 'node:crypto';

export const directory = dirname(fileURLToPath(import.meta.url));
export const root = realpathSync.native(resolve(process.argv[2] ?? resolve(directory, '../..')));
export const requireProject = createRequire(resolve(root, 'package.json'));

export function serviceConfig() {
  const target = JSON.parse(readFileSync(resolve(directory, 'typescript-target.json'), 'utf8'));
  const packageRoot = resolve(root, '.codex/typescript-sdk');
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf8'));
    const metadata = JSON.parse(readFileSync(resolve(packageRoot, 'zerodep-build.json'), 'utf8'));
    const patchHash = createHash('sha256')
      .update(readFileSync(resolve(root, target.patch)))
      .digest('hex');
    if (
      manifest.version !== `${target.version}+zerodep.${target.revision}` ||
      metadata.commit !== target.commit ||
      metadata.patchHash !== patchHash ||
      metadata.platform !== process.platform ||
      metadata.arch !== process.arch
    )
      throw new Error('SDK 与当前补丁或平台不一致');
  } catch (error) {
    throw new Error(
      '请先运行 pnpm typescript:build --source <TypeScript 仓库>，生成项目原生 SDK。',
      { cause: error },
    );
  }
  return {
    bin: process.execPath,
    args: [resolve(packageRoot, manifest.bin.tsc), '--lsp', '--stdio'],
  };
}
