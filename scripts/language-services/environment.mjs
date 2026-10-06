import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, realpathSync } from 'node:fs';
import { nativeInputs } from '../native/inputs.mjs';

export const directory = dirname(fileURLToPath(import.meta.url));
export const root = realpathSync.native(resolve(process.argv[2] ?? resolve(directory, '../..')));
export const requireProject = createRequire(resolve(root, 'package.json'));

export function serviceConfig() {
  const { target, sourceHash, version } = nativeInputs(root);
  const platform = `${process.platform}-${process.arch}`;
  const packageRoot = resolve(root, `packages/native-${platform}/typescript`);
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf8'));
    const metadata = JSON.parse(readFileSync(resolve(packageRoot, 'zerodep-build.json'), 'utf8'));
    if (
      manifest.version !== version ||
      metadata.commit !== target.commit ||
      metadata.sourceHash !== sourceHash ||
      metadata.platform !== platform
    )
      throw new Error('SDK 与当前补丁或平台不一致');
  } catch (error) {
    throw new Error(
      '请先运行 pnpm compiler:native:build --source <TypeScript 仓库>，生成项目原生编译器。',
      { cause: error },
    );
  }
  return {
    bin: resolve(packageRoot, 'lib', process.platform === 'win32' ? 'tsc.exe' : 'tsc'),
    args: ['--lsp', '--stdio'],
  };
}
