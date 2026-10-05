import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  createSchema,
  updateSchema,
  deleteSchema,
  querySchema,
  idSchema,
  ValidationError,
  type TaskQuery,
} from '../src/tasks/schema.ts';
import { TaskFailure, type TasksDatabase } from './tasks-database.ts';

export function taskQuery(url: URL): TaskQuery {
  const parsed = querySchema.safeParse({
    query: url.searchParams.get('q') ?? '',
    filter: url.searchParams.get('filter') ?? 'all',
  });
  if (!parsed.success) throw new TaskFailure(400, parsed.error.message);
  return parsed.data;
}

function json(response: ServerResponse, status: number, value?: unknown): void {
  if (response.destroyed || response.writableEnded) return;
  const body = value === undefined ? '' : JSON.stringify(value);
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(body);
}

async function body(request: IncomingMessage, response: ServerResponse): Promise<unknown> {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers['content-type'] ?? ''))
    throw new TaskFailure(415, '请使用 JSON 请求。');
  const chunks: Buffer[] = [];
  let size = 0;
  // 保留响应能力；超限后关闭连接，不让异步迭代器先销毁 socket 而丢失 413。
  for await (const chunk of request.iterator({ destroyOnReturn: false })) {
    const bytes = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += bytes.length;
    if (size > 16_384) {
      response.setHeader('Connection', 'close');
      request.resume();
      throw new TaskFailure(413, '请求内容过大。');
    }
    chunks.push(bytes);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
  } catch {
    throw new TaskFailure(400, 'JSON 格式不正确。');
  }
}

export async function handleTasksApi(
  request: IncomingMessage,
  response: ServerResponse,
  url: URL,
  database: TasksDatabase,
): Promise<void> {
  try {
    const collection = url.pathname === '/api/tasks';
    const method = request.method ?? 'GET';
    const allowed = collection ? ['GET', 'HEAD', 'POST'] : ['PATCH', 'DELETE'];
    if (!allowed.includes(method)) {
      response.setHeader('Allow', allowed.join(', '));
      throw new TaskFailure(405, '请求方法不受支持。');
    }
    if (method === 'GET' || method === 'HEAD') {
      json(response, 200, database.list(taskQuery(url)));
      return;
    }
    const origin = request.headers.origin;
    if (origin && origin !== new URL(`http://${request.headers.host}`).origin)
      throw new TaskFailure(403, '写入请求必须来自同一站点。');
    const input = await body(request, response);
    if (collection) {
      const data = createSchema.parse(input);
      json(response, 201, database.create(data.title));
      return;
    }
    const id = idSchema.parse(url.pathname.slice('/api/tasks/'.length));
    if (method === 'PATCH') json(response, 200, database.update(id, updateSchema.parse(input)));
    else {
      database.delete(id, deleteSchema.parse(input).revision);
      json(response, 204);
    }
  } catch (error) {
    if (error instanceof TaskFailure)
      json(response, error.status, { error: error.message, current: error.current });
    else if (error instanceof ValidationError) json(response, 400, { error: error.message });
    else throw error;
  }
}
