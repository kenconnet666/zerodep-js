import {
  pageSchema,
  taskSchema,
  errorSchema,
  ValidationError,
  type Task,
  type TaskQuery,
  type TaskUpdate,
} from './schema.js';

export class ApiFailure extends Error {
  readonly status: number;
  readonly current: Task | undefined;
  constructor(status: number, message: string, current?: Task) {
    super(message);
    this.status = status;
    this.current = current;
  }
}

async function request<T>(
  path: string,
  options: RequestInit,
  parse: (input: unknown) => T,
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, options);
  } catch (error) {
    if (options.signal?.aborted) throw error;
    throw new Error('网络请求未完成，请检查连接并刷新核对。', { cause: error });
  }
  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const failure = errorSchema.safeParse(data);
    throw new ApiFailure(
      response.status,
      failure.success ? failure.data.error : `请求失败（HTTP ${response.status}），请稍后重试。`,
      failure.success ? failure.data.current : undefined,
    );
  }
  try {
    return parse(data);
  } catch (error) {
    if (!(error instanceof ValidationError)) throw error;
    throw new Error('服务器返回的数据格式不正确，请刷新重试。', { cause: error });
  }
}

function write(method: string, data: unknown, signal: AbortSignal): RequestInit {
  return {
    method,
    signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
}

export function listTasks(query: TaskQuery, signal: AbortSignal) {
  const search = new URLSearchParams({ q: query.query, filter: query.filter });
  return request(`/api/tasks?${search}`, { signal, cache: 'no-store' }, pageSchema.parse);
}
export function createTask(title: string, signal: AbortSignal) {
  return request('/api/tasks', write('POST', { title }, signal), taskSchema.parse);
}
export function updateTask(id: string, data: TaskUpdate, signal: AbortSignal) {
  return request(
    `/api/tasks/${encodeURIComponent(id)}`,
    write('PATCH', data, signal),
    taskSchema.parse,
  );
}
export async function deleteTask(id: string, revision: number, signal: AbortSignal): Promise<void> {
  await request(
    `/api/tasks/${encodeURIComponent(id)}`,
    write('DELETE', { revision }, signal),
    (input) => {
      if (input !== null) throw new ValidationError('删除响应应为空。');
    },
  );
}
