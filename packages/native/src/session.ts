import { resolve } from 'node:path';
import { NativeLanguageService } from './language-service.js';
import { ProjectCompiler } from './project.js';
import { canonicalPath } from './paths.js';
import type { CompileOptions, CompileResult, CompilerSessionOptions } from './types.js';

export type { CompilerSessionOptions } from './types.js';

/** 编译器只由当前构建/开发宿主持有，关闭会话即释放 Go 进程。 */
export class CompilerSession {
  readonly root: string;
  private readonly language: NativeLanguageService;
  private readonly engine: Promise<ProjectCompiler>;
  private queue: Promise<unknown> = Promise.resolve();
  private closed = false;
  private closing: Promise<void> | undefined;

  constructor(options: CompilerSessionOptions = {}) {
    this.root = canonicalPath(options.root ?? '.');
    this.language = new NativeLanguageService(this.root, false);
    this.engine = this.language
      .openAPI()
      .then((api) => new ProjectCompiler(api, { ...options, root: this.root }));
    void this.engine.catch(() => {});
  }
  compile(source: string, file: string, options: CompileOptions = {}): Promise<CompileResult> {
    if (this.closed) return Promise.reject(new Error('原生编译服务已关闭。'));
    const operation = this.queue
      .catch(() => {})
      .then(async () => {
        const engine = await this.engine;
        this.language.assertAlive();
        return engine.compile(source, canonicalPath(resolve(this.root, file)), options);
      });
    this.queue = operation;
    return operation;
  }
  invalidate(file: string, event: 'create' | 'update' | 'delete' = 'update'): void {
    if (this.closed) return;
    this.queue = this.queue
      .catch(() => {})
      .then(async () =>
        (await this.engine).invalidate(canonicalPath(resolve(this.root, file)), event),
      );
    void this.queue.catch(() => {});
  }
  close(): Promise<void> {
    return (this.closing ??= this.finishClose());
  }
  private async finishClose(): Promise<void> {
    this.closed = true;
    const timer = setTimeout(() => this.language.child.kill(), 5000);
    try {
      await this.queue.catch(() => {});
      await this.engine.then((engine) => engine.close()).catch(() => {});
    } finally {
      try {
        await this.language.close();
      } finally {
        clearTimeout(timer);
      }
    }
  }
}

export function createCompiler(options: CompilerSessionOptions = {}): CompilerSession {
  return new CompilerSession(options);
}
