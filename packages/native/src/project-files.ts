import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import type { RawCompilerOptions } from 'typescript/unstable/async';

export function canonical(file: string): string {
  return process.platform === 'win32' ? resolve(file).toLowerCase() : resolve(file);
}

export async function stamp(file: string, content = false): Promise<string> {
  try {
    const info = await stat(file, { bigint: true });
    const metadata = `${info.mtimeNs}:${info.ctimeNs}:${info.size}:${info.ino}`;
    return content && info.isFile()
      ? metadata +
          ':' +
          createHash('sha256')
            .update(await readFile(file))
            .digest('hex')
      : metadata;
  } catch (error) {
    if (['ENOENT', 'ENOTDIR'].includes((error as NodeJS.ErrnoException).code ?? ''))
      return 'missing';
    throw error;
  }
}

export async function changedFiles(stamps: Map<string, string>): Promise<string[]> {
  const current = await Promise.all(
    [...stamps].map(async ([file, previous]) => {
      const fields = previous.split(':');
      const current = await stamp(file);
      if (current === fields.slice(0, 4).join(':')) return undefined;
      const next = current.split(':');
      // pnpm 建立/删除硬链接会更新共享文件的 ctime。只有该字段变化时，
      // 用内容确认它是否仍相同；保留 inode、mtime、目录变化的失效语义。
      if (fields[4] && next[0] === fields[0] && next[2] === fields[2] && next[3] === fields[3]) {
        const verified = await stamp(file, true);
        if (verified.split(':')[4] === fields[4]) {
          stamps.set(file, verified);
          return undefined;
        }
      }
      return file;
    }),
  );
  return current.filter((file): file is string => file !== undefined);
}

export async function dependencyStamps(files: Iterable<string>): Promise<Map<string, string>> {
  const dependencies = new Set([...files].map(canonical));
  const directories = new Set<string>();
  for (const file of dependencies) {
    for (let directory = dirname(file); ; directory = dirname(directory)) {
      if (directories.has(directory)) break;
      directories.add(directory);
      if (dirname(directory) === directory) break;
    }
  }
  // 包元数据和安装变化不依赖 node_modules 的监听事件。
  for (const directory of directories) {
    dependencies.add(resolve(directory, 'package.json'));
    dependencies.add(resolve(directory, 'node_modules'));
    for (const lock of ['pnpm-lock.yaml', 'package-lock.json', 'yarn.lock'])
      dependencies.add(resolve(directory, lock));
  }
  return new Map(
    await Promise.all(
      [...dependencies].map(async (file) => [file, await stamp(file, true)] as const),
    ),
  );
}

export function projectOptions(options: RawCompilerOptions): RawCompilerOptions {
  // synthetic Program 的 cwd 属于服务；继承的 paths 则相对于定义它的配置目录。
  if (!options.paths || !options.pathsBasePath) return options;
  return {
    ...options,
    paths: Object.fromEntries(
      Object.entries(options.paths).map(([name, paths]) => [
        name,
        paths.map((path) => resolve(options.baseUrl ?? options.pathsBasePath!, path)),
      ]),
    ),
  };
}
