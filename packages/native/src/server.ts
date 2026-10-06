import { createServer, type Socket } from 'node:net';
import { randomUUID } from 'node:crypto';
import {
  createMessageConnection,
  SocketMessageReader,
  SocketMessageWriter,
} from 'vscode-jsonrpc/node';
import { NativeWorkspace } from './workspace.js';
import type { WorkspaceRequest, WorkspaceResponse } from './protocol.js';
import { CompileError } from './types.js';
import { servicePolicy } from './service-policy.js';

const [root, endpoint] = process.argv.slice(2);
if (!root || !endpoint) throw new Error('原生服务需要项目目录和本机 IPC 地址。');
const connections = new Set<Socket>();
const policy = servicePolicy();
let requests = 0;
let workspace: NativeWorkspace | undefined;
let idle: ReturnType<typeof setTimeout> | undefined;
let closing = false;
let stopping = false;
const server = createServer((stream) => {
  if (closing || stopping) {
    stream.destroy();
    return;
  }
  clearTimeout(idle);
  connections.add(stream);
  const owner = randomUUID();
  const connection = createMessageConnection(
    new SocketMessageReader(stream),
    new SocketMessageWriter(stream),
  );
  connection.onRequest(
    'workspace',
    async (request: WorkspaceRequest): Promise<WorkspaceResponse> => {
      try {
        if (closing || stopping) throw new Error('原生服务正在停止。');
        if (request.action === 'stop') {
          if (!request.force && (connections.size > 1 || requests > 0))
            throw new Error('其他客户端或请求正在使用此服务；关闭它们后重试，或显式使用 --force。');
          // 先确认停止请求；客户端等待此 PID 退出，强制清理也不会丢失回复。
          stopping = true;
          setTimeout(() => {
            void close().catch(() => {});
          }, 50);
          return { result: { serverPid: process.pid } };
        }
        requests++;
        try {
          if (!workspace) {
            workspace = new NativeWorkspace(root);
            workspace.language.child.once('exit', () => {
              if (!closing) void close().catch(() => {});
            });
          }
          const result = await workspace.execute(owner, request);
          return {
            result:
              request.action === 'stats'
                ? { ...(result as object), clients: connections.size }
                : result,
          };
        } finally {
          requests--;
        }
      } catch (error) {
        return {
          error: {
            message: error instanceof Error ? error.message : String(error),
            ...(error instanceof CompileError ? { diagnostics: error.diagnostics } : {}),
          },
        };
      }
    },
  );
  connection.listen();
  stream.on('close', () => {
    connection.dispose();
    connections.delete(stream);
    void workspace?.release(owner).catch(() => {});
    scheduleClose();
  });
});

function scheduleClose(): void {
  if (!connections.size && !closing) {
    clearTimeout(idle);
    idle = setTimeout(() => {
      void close().catch(() => {});
    }, policy.idleTimeoutMs);
  }
}
async function close(): Promise<void> {
  if (closing) return;
  closing = true;
  clearTimeout(idle);
  server.close();
  for (const stream of connections) stream.destroy();
  // 无客户端时，取消遗留工作有上限；不能因一个原生请求失联长期保留后台进程。
  const forced = setTimeout(() => {
    workspace?.language.child.kill();
    process.exit(0);
  }, 5000);
  try {
    await workspace?.close();
  } finally {
    clearTimeout(forced);
  }
}

server.on('error', (error: NodeJS.ErrnoException) => {
  // 客户端持有跨进程启动锁；失败方不能删除其他服务的新 socket。
  process.exit(error.code === 'EADDRINUSE' ? 0 : 1);
});
server.listen(endpoint, scheduleClose);
for (const signal of ['SIGINT', 'SIGTERM'] as const)
  process.on(signal, () => {
    void close();
  });
