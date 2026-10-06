import { mkdtemp, readdir, rmdir, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { API, RawCompilerOptions } from 'typescript/unstable/async';
import { createBuilder } from './build.js';

/** 只保存服务自己的 noEmit 增量信息，不接触项目的 build info 或输出目录。 */
export class CheckCache {
  private directory: string | undefined;
  private sequence = 0;
  private readonly files = new Map<string, string>();

  async check(api: API, root: string, project: string, lint: boolean | undefined, force: boolean) {
    const key = project + ':' + lint;
    let file = this.files.get(key);
    this.files.delete(key);
    if (!file) {
      if (!this.directory) {
        await clearAbandonedCaches();
        this.directory = await mkdtemp(join(tmpdir(), `zerodep-check-${process.pid}-`));
      }
      file = join(this.directory, `${++this.sequence}.tsbuildinfo`);
    }
    this.files.set(key, file);
    // -b --force 只保证调度，内部仍可能读取旧增量版本；失效时直接丢弃自有缓存。
    if (force) await unlink(file).catch(ignoreMissing);
    if (this.files.size > 16) {
      const oldest = this.files.keys().next().value!;
      await unlink(this.files.get(oldest)!).catch(ignoreMissing);
      this.files.delete(oldest);
    }
    const options: RawCompilerOptions = {
      noEmit: true,
      incremental: true,
      emitDeclarationOnly: false,
      tsBuildInfoFile: file,
      ...(lint === undefined ? {} : { zerodepLint: lint }),
    };
    const builder = await createBuilder(api, root, project, options, force);
    try {
      return await builder.build();
    } finally {
      await builder.dispose();
    }
  }

  async close(): Promise<void> {
    for (const file of this.files.values()) await unlink(file).catch(ignoreMissing);
    this.files.clear();
    if (this.directory) await rmdir(this.directory).catch(ignoreMissing);
  }
}

function ignoreMissing(error: NodeJS.ErrnoException): void {
  if (error.code !== 'ENOENT') throw error;
}

async function clearAbandonedCaches(): Promise<void> {
  for (const entry of await readdir(tmpdir(), { withFileTypes: true })) {
    const match = /^zerodep-check-(\d+)-[\w-]+$/.exec(entry.name);
    if (!match || !entry.isDirectory() || entry.isSymbolicLink()) continue;
    try {
      process.kill(Number(match[1]), 0);
      continue;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ESRCH') continue;
    }
    const directory = join(tmpdir(), entry.name);
    try {
      const files = await readdir(directory, { withFileTypes: true });
      if (files.some((file) => !file.isFile() || !/^\d+\.tsbuildinfo$/.test(file.name))) continue;
      for (const file of files) await unlink(join(directory, file.name));
      await rmdir(directory);
    } catch {
      // 另一个服务可能正在回收同一旧目录；无权限的其他用户缓存也不影响本次检查。
    }
  }
}
