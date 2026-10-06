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
import { compilerPath } from './binary.js';

export interface SourceDocument {
  uri: string;
  languageId: string;
  text: string;
}
export interface LanguageInfo {
  capabilities: Record<string, unknown>;
  serverInfo: { name: string; version: string };
}

export class NativeLanguageService {
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
  onChanges: (files: Map<string, 'create' | 'update' | 'delete'>) => void = () => {};

  constructor(root: string) {
    this.root = root;
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
      clientInfo: { name: 'zerodep-native-workspace', version: '1' },
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
    await this.installWatchers();
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
        if (this.ignored(String(name), file)) return;
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
      if (entry.isSymbolicLink() || this.ignored(entry.name, path)) continue;
      if (entry.isDirectory()) await this.trackDirectory(path, created);
      else if (created && /\.(?:[cm]?[jt]sx?|json|yaml)$/.test(path))
        this.changes.set(path, 'create');
    }
  }
  private ignored(name: string, path: string): boolean {
    return (
      [
        'node_modules',
        '.git',
        '.codex',
        '.data',
        'coverage',
        'test-results',
        'playwright-report',
      ].includes(name) || /[/\\]native-[^/\\]+[/\\]typescript$/.test(path)
    );
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
    if (!document) {
      await this.flush();
      return this.connection.sendRequest<T>(method, params);
    }
    // 文档请求独立开关缓冲区，其他客户端的内存文本不进入这个请求。
    const operation = this.queue
      .catch(() => {})
      .then(async () => {
        await this.flush();
        await this.connection.sendNotification('textDocument/didOpen', {
          textDocument: { ...document, version: 1 },
        });
        try {
          return await this.connection.sendRequest<T>(method, params);
        } finally {
          await this.connection.sendNotification('textDocument/didClose', {
            textDocument: { uri: document.uri },
          });
        }
      });
    this.queue = operation;
    return operation;
  }

  private stopWatching(): void {
    clearTimeout(this.timer);
    for (const watcher of this.watchers) watcher.close();
    this.watchers = [];
  }
  async close(): Promise<void> {
    this.closed = true;
    this.stopWatching();
    await this.queue.catch(() => {});
    const exited = new Promise<void>((done) => {
      if (this.child.exitCode !== null || this.child.signalCode !== null) done();
      else this.child.once('exit', () => done());
    });
    const timer = setTimeout(() => this.child.kill(), 1000);
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
