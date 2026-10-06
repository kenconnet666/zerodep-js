import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const filename = process.platform === 'win32' ? 'tsc.exe' : 'tsc';

/** SDK 路径既供 CLI/API 使用，也可在 IDE 中选择其父级平台包目录。 */
export function compilerPath(): string {
  const packageName = `zerodep-js-native-${process.platform}-${process.arch}`;
  try {
    const root = dirname(require.resolve(packageName + '/package.json'));
    const binary = resolve(root, 'typescript/lib', filename);
    if (existsSync(binary)) return binary;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'MODULE_NOT_FOUND') throw error;
  }
  throw new Error(
    `原生编译器未安装：${packageName}。源码工作区请先运行 pnpm compiler:native:build。`,
  );
}
