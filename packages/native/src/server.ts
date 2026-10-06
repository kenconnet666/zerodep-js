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

const [root, endpoint] = process.argv.slice(2);
if (!root || !endpoint) throw new Error('原生服务需要项目目录和本机 IPC 地址。');
const connections = new Set<Socket>();
let workspace: NativeWorkspace | undefined;
let idle: ReturnType<typeof setTimeout> | undefined;
let closing = false;
const server = createServer((stream) => {
  if (closing) {
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
    void workspace
      ?.release(owner)
      .catch(() => {})
      .finally(scheduleClose);
    if (!workspace) scheduleClose();
  });
});

function scheduleClose(): void {
  if (!connections.size && !closing) {
    clearTimeout(idle);
    idle = setTimeout(() => {
      void close().catch(() => {});
    }, 1500);
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
