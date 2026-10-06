import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { WorkspaceClient } from './client.js';
import { canonicalPath } from './paths.js';
import type { CompilerSessionOptions } from './protocol.js';
import type { CompileOptions, CompileResult } from './types.js';

export type { CompilerSessionOptions } from './protocol.js';

/** 客户端只释放自己的连接与内存快照，共享服务由最后一个使用者退出后回收。 */
export class CompilerSession {
  readonly root: string;
  private readonly options: CompilerSessionOptions;
  private readonly client: WorkspaceClient;
  private readonly id = randomUUID();
  private queue: Promise<unknown> = Promise.resolve();
  private closed = false;
  private closing: Promise<void> | undefined;

  constructor(options: CompilerSessionOptions = {}) {
    this.options = options;
    this.root = canonicalPath(options.root ?? '.');
    this.client = new WorkspaceClient(this.root);
  }
  compile(source: string, file: string, options: CompileOptions = {}): Promise<CompileResult> {
    if (this.closed) return Promise.reject(new Error('原生编译服务已关闭。'));
    const pending = this.queue
      .catch(() => {})
      .then(() =>
        this.client.request<CompileResult>({
          action: 'compile',
          id: this.id,
          settings: { ...this.options, root: this.root },
          source,
          filename: canonicalPath(resolve(this.root, file)),
          options,
        }),
      );
    this.queue = pending;
    return pending;
  }
  invalidate(file: string, event: 'create' | 'update' | 'delete' = 'update'): void {
    if (this.closed) return;
    this.queue = this.queue
      .catch(() => {})
      .then(() =>
        this.client.request({
          action: 'invalidate',
          id: this.id,
          filename: canonicalPath(resolve(this.root, file)),
          event,
        }),
      );
    // 失联会在下一次编译时建立新服务；无后续请求的 watcher 也不能留下未处理的 rejection。
    void this.queue.catch(() => {});
  }
  close(): Promise<void> {
    return (this.closing ??= this.finishClose());
  }
  private async finishClose(): Promise<void> {
    this.closed = true;
    await this.queue.catch(() => {});
    await this.client.close();
  }
}

export function createCompiler(options: CompilerSessionOptions = {}): CompilerSession {
  return new CompilerSession(options);
}
