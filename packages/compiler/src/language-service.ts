import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import { existsSync, realpathSync, watch, type FSWatcher } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  createMessageConnection,
  StreamMessageReader,
  StreamMessageWriter,
  type MessageConnection,
} from 'vscode-jsonrpc/node';
import { compilerPath } from './typescript.js';
import { API } from 'typescript/unstable/async';

export interface SourceDocument {
  uri: string;
  languageId: string;
  text: string;
}
export interface LanguageInfo {
  capabilities: Record<string, unknown>;
  serverInfo: { name: string; version: string };
}

export class TypeScriptService {
  readonly root: string;
  readonly child: ChildProcessWithoutNullStreams;
  readonly connection: MessageConnection;
  readonly changes = new Map<string, 'create' | 'update' | 'delete'>();
  readonly ready: Promise<LanguageInfo>;
  private watchers: FSWatcher[] = [];
  private readonly watched = new Set<string>();
  private readonly scanPending = new Set<string>();
  private scanning: Promise<void> = Promise.resolve();
  private timer: ReturnType<typeof setTimeout> | undefined;
  private queue: Promise<unknown> = Promise.resolve();
  private flushing: Promise<void> = Promise.resolve();
  private closed = false;
  private closing: Promise<void> | undefined;
  private api: Promise<API<true>> | undefined;
  private readonly watchFiles: boolean;
  private readonly documents = new Map<string, SourceDocument>();
  private version = 0;
  onChanges: (files: Map<string, 'create' | 'update' | 'delete'>) => void = () => {};

  constructor(root: string, watchFiles = true) {
    this.root = root;
    this.watchFiles = watchFiles;
    this.child = spawn(compilerPath(), ['--lsp', '--stdio'], {
      cwd: root,
      stdio: 'pipe',
      windowsHide: true,
    });
    this.connection = createMessageConnection(
      new StreamMessageReader(this.child.stdout),
      new StreamMessageWriter(this.child.stdin),
    );
    this.child.stderr.on('data', () => {});
    this.child.on('error', () => this.connection.dispose());
    this.child.on('exit', () => {
      this.connection.dispose();
      this.stopWatching();
      void this.api?.then((api) => api.client.close()).catch(() => {});
    });
    this.child.stdout.once('end', () => {
      void this.api?.then((api) => api.client.close()).catch(() => {});
    });
    this.connection.onRequest('workspace/configuration', ({ items }: { items: unknown[] }) =>
      items.map(() => ({})),
    );
    for (const method of [
      'client/registerCapability',
      'client/unregisterCapability',
      'window/workDoneProgress/create',
      'workspace/diagnostic/refresh',
    ])
      this.connection.onRequest(method, () => null);
    this.connection.onRequest('workspace/applyEdit', () => ({
      applied: false,
      failureReason: 'Edits must be applied by their owner.',
    }));
    this.connection.listen();
    this.ready = this.initialize();
  }

  private async initialize(): Promise<LanguageInfo> {
    const info = await this.connection.sendRequest<LanguageInfo>('initialize', {
      processId: process.pid,
      clientInfo: { name: 'zerodep-typescript-workspace', version: '1' },
      rootUri: pathToFileURL(this.root).href,
      workspaceFolders: [{ name: 'zerodep', uri: pathToFileURL(this.root).href }],
      capabilities: {
        workspace: { configuration: true },
        textDocument: {
          diagnostic: {},
          hover: { contentFormat: ['markdown', 'plaintext'] },
          definition: { linkSupport: true },
          completion: {
            completionItem: {
              documentationFormat: ['markdown', 'plaintext'],
              resolveSupport: { properties: ['documentation', 'detail', 'additionalTextEdits'] },
            },
          },
        },
      },
    });
    await this.connection.sendNotification('initialized', {});
    if (this.watchFiles) await this.installWatchers();
    return info;
  }

  private async installWatchers(): Promise<void> {
    await this.trackDirectory(this.root);
  }
  private async trackDirectory(folder: string, created = false): Promise<void> {
    if (this.closed || this.watched.has(folder)) return;
    this.watched.add(folder);
    try {
      const watcher = watch(realpathSync.native(folder), { recursive: false }, (event, name) => {
        if (!name) return;
        // Windows 在目录被删时会返回带长路径前缀的自身路径；立即释放句柄，避免重复 rename/扫描。
        const text = String(name);
        const prefix = String.fromCharCode(92, 92, 63, 92);
        const file = resolve(folder, text.startsWith(prefix) ? text.slice(prefix.length) : text);
        if (
          !existsSync(folder) ||
          (event === 'rename' && file.toLowerCase() === folder.toLowerCase())
        ) {
          watcher.close();
          this.watched.delete(folder);
          return;
        }
        if (this.ignored(String(name))) return;
        if (event === 'rename' && !this.scanPending.has(file)) {
          this.scanPending.add(file);
          this.scanning = this.scanning.then(async () => {
            try {
              if ((await stat(file).catch(() => undefined))?.isDirectory())
                await this.trackDirectory(file, true);
            } finally {
              this.scanPending.delete(file);
            }
          });
        }
        if (!/\.(?:[cm]?[jt]sx?|json|yaml)$/.test(file)) return;
        this.changes.set(
          file,
          !existsSync(file) ? 'delete' : event === 'rename' ? 'create' : 'update',
        );
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          void this.flush().catch(() => {});
        }, 40);
      });
      watcher.on('error', () => watcher.close());
      watcher.on('close', () => {
        this.watched.delete(folder);
        this.watchers = this.watchers.filter((item) => item !== watcher);
      });
      this.watchers.push(watcher);
    } catch (error) {
      this.watched.delete(folder);
      if (!['ENOENT', 'EPERM'].includes((error as NodeJS.ErrnoException).code ?? '')) throw error;
      return;
    }
    for (const entry of await readdir(folder, { withFileTypes: true }).catch(() => [])) {
      const path = resolve(folder, entry.name);
      if (entry.isSymbolicLink() || this.ignored(entry.name)) continue;
      if (entry.isDirectory()) await this.trackDirectory(path, created);
      else if (created && /\.(?:[cm]?[jt]sx?|json|yaml)$/.test(path))
        this.changes.set(path, 'create');
    }
  }
  private ignored(name: string): boolean {
    return [
      'node_modules',
      '.git',
      '.codex',
      '.data',
      'coverage',
      'test-results',
      'playwright-report',
    ].includes(name);
  }

  async flush(): Promise<void> {
    clearTimeout(this.timer);
    this.flushing = this.flushing.then(async () => {
      await this.scanning;
      if (this.closed || !this.changes.size) return;
      const changes = new Map(this.changes);
      this.changes.clear();
      this.onChanges(changes);
      await this.connection.sendNotification('workspace/didChangeWatchedFiles', {
        changes: [...changes].map(([file, kind]) => ({
          uri: pathToFileURL(file).href,
          type: kind === 'delete' ? 3 : kind === 'create' ? 1 : 2,
        })),
      });
    });
    return this.flushing;
  }

  async request<T>(method: string, params: unknown, document?: SourceDocument): Promise<T> {
    await this.ready;
    this.assertAlive();
    if (!document) {
      await this.flush();
      return this.connection.sendRequest<T>(method, params);
    }
    return this.withDocument(document, () => this.connection.sendRequest<T>(method, params));
  }

  async withDocument<T>(document: SourceDocument, action: () => Promise<T>): Promise<T> {
    await this.ready;
    this.assertAlive();
    // MCP 使用临时文档；编辑器已有缓冲区时临时投影，结束后恢复原文，保留其他未保存文件。
    const operation = this.queue
      .catch(() => {})
      .then(async () => {
        await this.flush();
        const original = this.documents.get(document.uri);
        await this.sendDocument(document, Boolean(original));
        try {
          return await action();
        } finally {
          if (original) await this.sendDocument(original, true);
          else
            await this.connection.sendNotification('textDocument/didClose', {
              textDocument: { uri: document.uri },
            });
        }
      });
    this.queue = operation;
    return operation;
  }

  private async sendDocument(document: SourceDocument, opened: boolean): Promise<void> {
    const version = ++this.version;
    if (opened)
      await this.connection.sendNotification('textDocument/didChange', {
        textDocument: { uri: document.uri, version },
        contentChanges: [{ text: document.text }],
      });
    else
      await this.connection.sendNotification('textDocument/didOpen', {
        textDocument: { ...document, version },
      });
  }

  /** 编辑器缓冲区由连接拥有；临时请求不得关闭或覆盖其他文件的未保存内容。 */
  setDocument(document: SourceDocument): Promise<void> {
    const operation = this.queue
      .catch(() => {})
      .then(async () => {
        await this.ready;
        this.assertAlive();
        await this.sendDocument(document, this.documents.has(document.uri));
        this.documents.set(document.uri, document);
      });
    this.queue = operation;
    return operation;
  }

  removeDocument(uri: string): Promise<void> {
    const operation = this.queue
      .catch(() => {})
      .then(async () => {
        if (!this.documents.has(uri)) return;
        await this.connection.sendNotification('textDocument/didClose', { textDocument: { uri } });
        this.documents.delete(uri);
      });
    this.queue = operation;
    return operation;
  }

  getDocument(uri: string): SourceDocument | undefined {
    return this.documents.get(uri);
  }

  private stopWatching(): void {
    clearTimeout(this.timer);
    for (const watcher of this.watchers) watcher.close();
    this.watchers = [];
  }
  assertAlive(): void {
    try {
      if (
        this.child.exitCode !== null ||
        this.child.signalCode !== null ||
        this.child.stdout.readableEnded ||
        !this.child.pid
      )
        throw new Error('exited');
      // 外部终止可能先于 Node 的 exit 事件；此时不能继续向已关闭的 API 管道写请求。
      process.kill(this.child.pid, 0);
    } catch {
      throw new Error('原生编译器已退出，请重新创建会话。');
    }
  }
  openAPI(): Promise<API<true>> {
    return (this.api ??= this.request<{ pipe: string }>('custom/initializeAPISession', {}).then(
      ({ pipe }) => API.fromLSPConnection({ pipe }),
    ));
  }
  close(): Promise<void> {
    return (this.closing ??= this.finishClose());
  }
  private async finishClose(): Promise<void> {
    this.closed = true;
    this.stopWatching();
    const timer = setTimeout(() => this.child.kill(), 1000);
    await this.queue.catch(() => {});
    await this.api?.then((api) => api.close()).catch(() => {});
    const exited = new Promise<void>((done) => {
      if (this.child.exitCode !== null || this.child.signalCode !== null) done();
      else this.child.once('exit', () => done());
    });
    try {
      await this.connection.sendRequest('shutdown', null);
      await this.connection.sendNotification('exit', null);
    } catch {
      this.child.kill();
    } finally {
      clearTimeout(timer);
      this.connection.dispose();
      if (this.child.exitCode === null) this.child.kill();
      await exited;
    }
  }
}
