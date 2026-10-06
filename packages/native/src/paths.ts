import { existsSync, realpathSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';

/** 统一 Windows 短路径和链接；尚未写入的编辑器文档保留其相对尾部。 */
export function canonicalPath(input: string): string {
  let current = resolve(input);
  const tail: string[] = [];
  while (!existsSync(current)) {
    const parent = dirname(current);
    if (parent === current) throw new Error('路径根目录不存在：' + input);
    tail.unshift(basename(current));
    current = parent;
  }
  return resolve(realpathSync.native(current), ...tail);
}
