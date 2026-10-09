import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';

/** 二进制由微软官方 TypeScript 平台包提供，框架不构建或分发自己的 SDK。 */
export function compilerPath(): string {
  const require = createRequire(import.meta.url);
  const sdk = require.resolve('typescript/package.json');
  const sdkRequire = createRequire(sdk);
  const platform = sdkRequire.resolve(
    `@typescript/typescript-${process.platform}-${process.arch}/package.json`,
  );
  return resolve(dirname(platform), 'lib', process.platform === 'win32' ? 'tsc.exe' : 'tsc');
}
