import { spawn } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { mkdir, open, readFile, stat, unlink } from 'node:fs/promises';
import { connect, type Socket } from 'node:net';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import {
  createMessageConnection,
  SocketMessageReader,
  SocketMessageWriter,
  type MessageConnection,
} from 'vscode-jsonrpc/node';
import { compilerPath } from './binary.js';
import { CompileError } from './types.js';
import { servicePolicy } from './service-policy.js';
import type { WorkspaceRequest, WorkspaceResponse } from './protocol.js';

export function workspaceRoot(directory: string): string {
  const initial = realpathSync.native(resolve(directory));
  if (!statSync(initial).isDirectory()) throw new Error('原生工具工作目录必须是现有目录。');
  let current = initial;
  for (;;) {
    if (existsSync(join(current, 'pnpm-workspace.yaml')) || existsSync(join(current, '.git')))
      return current;
    const parent = dirname(current);
    if (parent === current) return initial;
    current = parent;
  }
}

export function serviceAddress(root: string): { endpoint: string; server: string; lock: string } {
  const dist = resolve(import.meta.dirname, '../dist');
  const server = join(dist, 'server.js');
  const hash = createHash('sha256').update(
    process.platform === 'win32' ? root.toLowerCase() : root,
  );
  hash.update(readFileSync(resolve(dirname(compilerPath()), '../zerodep-build.json')));
  hash.update(readFileSync(resolve(dist, '../package.json')));
  hash.update(JSON.stringify(servicePolicy()));
  for (const name of readdirSync(dist)
    .filter((name) => name.endsWith('.js'))
    .sort())
    hash.update(readFileSync(join(dist, name)));
  const id = hash.digest('hex').slice(0, 24);
  return {
    endpoint:
      process.platform === 'win32'
        ? String.raw`\\.\pipe\zerodep-native-${id}`
        : join(tmpdir(), 'zerodep-native', id + '.sock'),
    server,
    lock: join(tmpdir(), 'zerodep-native', id + '.lock'),
  };
}

async function startupLock(file: string): Promise<() => Promise<void>> {
  await mkdir(dirname(file), { recursive: true, mode: 0o700 });
  const lease = JSON.stringify({ pid: process.pid, token: randomUUID() });
  for (let i = 0; i < 200; i++) {
    try {
      const handle = await open(file, 'wx', 0o600);
      try {
        await handle.writeFile(lease);
      } finally {
        await handle.close();
      }
      return async () => {
        if ((await readFile(file, 'utf8').catch(() => '')) === lease)
          await unlink(file).catch(() => {});
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
      const content = await readFile(file, 'utf8').catch(() => '');
      let owner = 0;
      try {
        owner = Number(JSON.parse(content).pid);
      } catch {
        /* 启动者可能在写入期间退出。 */
      }
      let alive = owner > 0;
      if (alive) {
        try {
          process.kill(owner, 0);
        } catch (failure) {
          alive = (failure as NodeJS.ErrnoException).code !== 'ESRCH';
        }
      }
      const metadata = await stat(file).catch(() => undefined);
      if (!metadata) continue;
      const age = Date.now() - metadata.mtimeMs;
      const stale = (!alive && age > 1000) || age > 15000;
      if (stale && (await readFile(file, 'utf8').catch(() => '')) === content)
        await unlink(file).catch(() => {});
      else await new Promise((done) => setTimeout(done, 50));
    }
  }
  throw new Error('等待原生服务启动锁超时。');
}

function socket(endpoint: string): Promise<Socket> {
  return new Promise((resolve, reject) => {
    const stream = connect(endpoint);
    const fail = (error: Error) => {
      stream.destroy();
      reject(error);
    };
    stream.once('error', fail);
    stream.once('connect', () => {
      stream.off('error', fail);
      resolve(stream);
    });
  });
}

export class WorkspaceClient {
  readonly root: string;
  private connection: MessageConnection | undefined;
  private stream: Socket | undefined;
  private connecting: Promise<MessageConnection> | undefined;
  private closed = false;
  readonly id = randomUUID();

  constructor(root = process.cwd()) {
    this.root = workspaceRoot(root);
  }

  private async open(): Promise<MessageConnection> {
    if (this.closed) throw new Error('原生工具连接已关闭。');
    const { endpoint, server, lock } = serviceAddress(this.root);
    let stream: Socket | undefined;
    try {
      stream = await socket(endpoint);
    } catch (error) {
      if (!['ENOENT', 'ECONNREFUSED'].includes((error as NodeJS.ErrnoException).code ?? ''))
        throw error;
      const release = await startupLock(lock);
      try {
        try {
          stream = await socket(endpoint);
        } catch (failure) {
          if (!['ENOENT', 'ECONNREFUSED'].includes((failure as NodeJS.ErrnoException).code ?? ''))
            throw failure;
          if (process.platform !== 'win32')
            await unlink(endpoint).catch((problem: NodeJS.ErrnoException) => {
              if (problem.code !== 'ENOENT') throw problem;
            });
        }
        if (!stream) {
          // 后台工具不是 Vitest/调试器的子工作者，不能继承父进程的注入入口或 IPC 描述符。
          const env = { ...process.env };
          for (const name of Object.keys(env))
            if (
              name === 'NODE_OPTIONS' ||
              name.startsWith('VITEST') ||
              name.startsWith('NODE_CHANNEL_') ||
              ['NPM_TOKEN', 'NODE_AUTH_TOKEN', 'GITHUB_TOKEN', 'GH_TOKEN'].includes(name)
            )
              delete env[name];
          const child = spawn(process.execPath, [server, this.root, endpoint], {
            detached: true,
            stdio: 'ignore',
            windowsHide: true,
            env,
          });
          child.unref();
          let launchError: Error | undefined;
          child.once('error', (error) => {
            launchError = error;
          });
          let failure: unknown = error;
          for (let i = 0; i < 100; i++) {
            if (launchError) throw launchError;
            await new Promise((done) => setTimeout(done, 50));
            try {
              stream = await socket(endpoint);
              break;
            } catch (next) {
              failure = next;
            }
          }
          if (!stream) throw failure;
        }
      } finally {
        await release();
      }
    }
    if (this.closed) {
      stream.destroy();
      throw new Error('原生工具连接已关闭。');
    }
    this.stream = stream;
    const connection = createMessageConnection(
      new SocketMessageReader(stream),
      new SocketMessageWriter(stream),
    );
    connection.listen();
    this.connection = connection;
    stream.on('close', () => {
      if (this.connection === connection) {
        connection.dispose();
        this.connection = undefined;
        this.connecting = undefined;
        this.stream = undefined;
      }
    });
    return connection;
  }

  async request<T>(request: WorkspaceRequest): Promise<T> {
    const connection = await (this.connecting ??= this.open().catch((error) => {
      this.connecting = undefined;
      throw error;
    }));
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let response: WorkspaceResponse;
    try {
      response = await Promise.race([
        connection.sendRequest<WorkspaceResponse>('workspace', request),
        new Promise<never>((_, reject) => {
          timeout = setTimeout(
            () => {
              this.stream?.destroy();
              reject(new Error('原生工具请求超时：' + request.action));
            },
            request.action === 'info' || request.action === 'stats' ? 10000 : 90000,
          );
        }),
      ]);
    } finally {
      clearTimeout(timeout);
    }
    if (response.error) {
      if (response.error.diagnostics) throw new CompileError(response.error.diagnostics);
      throw new Error(response.error.message);
    }
    return response.result as T;
  }

  async close(): Promise<void> {
    this.closed = true;
    await this.connecting?.catch(() => {});
    this.connection?.dispose();
    this.stream?.destroy();
  }
}
