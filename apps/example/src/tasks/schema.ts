export interface Task {
  id: string;
  title: string;
  completed: boolean;
  revision: number;
  updatedAt: number;
}

export type TaskFilter = 'all' | 'open' | 'done';
export interface TaskQuery {
  query: string;
  filter: TaskFilter;
}
export interface TaskPage extends TaskQuery {
  tasks: Task[];
}
export interface TaskUpdate {
  revision: number;
  title?: string;
  completed?: boolean;
}

export class ValidationError extends Error {
  override name = 'ValidationError';
}

// 页面、HTTP 和持久化入口共享校验结果；其他异常继续向外传播。
function schema<T>(parse: (input: unknown) => T) {
  return {
    parse,
    safeParse(input: unknown) {
      try {
        return { success: true as const, data: parse(input) };
      } catch (error) {
        if (!(error instanceof ValidationError)) throw error;
        return { success: false as const, error };
      }
    },
  };
}

function object(input: unknown, keys?: readonly string[]): Record<string, unknown> {
  if (input === null || typeof input !== 'object' || Array.isArray(input))
    throw new ValidationError('请输入对象。');
  if (keys && Object.keys(input).some((key) => !keys.includes(key)))
    throw new ValidationError('包含不支持的字段。');
  return input as Record<string, unknown>;
}

function text(input: unknown): string {
  if (typeof input !== 'string') throw new ValidationError('请输入字符串。');
  return input;
}

function singleLine(input: unknown, maximum: number): string {
  const value = text(input).trim();
  // Unicode 模式保留完整代理对，拒绝控制字符和孤立代理项。
  // oxlint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f\uD800-\uDFFF]/u.test(value))
    throw new ValidationError('不能包含控制字符或无效的 Unicode 字符');
  if (value.length > maximum) throw new ValidationError(`内容最多 ${maximum} 个字符`);
  return value;
}

function integer(input: unknown, minimum: number): number {
  if (typeof input !== 'number' || !Number.isSafeInteger(input) || input < minimum)
    throw new ValidationError(`请输入不小于 ${minimum} 的安全整数。`);
  return input;
}

function boolean(input: unknown): boolean {
  if (typeof input !== 'boolean') throw new ValidationError('请输入布尔值。');
  return input;
}

export const idSchema = schema((input): string => {
  const value = text(input);
  // UUID 版本 1–8，以及标准 nil/max UUID；与数据库生成的 UUID 使用同一文本形式。
  if (
    !/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/iu.test(
      value,
    )
  )
    throw new ValidationError('任务 ID 无效。');
  return value;
});

export const titleSchema = schema((input): string => {
  const value = singleLine(input, 160);
  if (!value) throw new ValidationError('请输入任务标题');
  return value;
});

export const filterSchema = schema((input): TaskFilter => {
  if (input !== 'all' && input !== 'open' && input !== 'done')
    throw new ValidationError('任务筛选条件无效。');
  return input;
});

function query(input: Record<string, unknown>): TaskQuery {
  return {
    query: singleLine(input.query === undefined ? '' : input.query, 120),
    filter: filterSchema.parse(input.filter === undefined ? 'all' : input.filter),
  };
}

export const querySchema = schema((input): TaskQuery => query(object(input, ['query', 'filter'])));

export const taskSchema = schema((input): Task => {
  const value = object(input, ['id', 'title', 'completed', 'revision', 'updatedAt']);
  return {
    id: idSchema.parse(value.id),
    title: titleSchema.parse(value.title),
    completed: boolean(value.completed),
    revision: integer(value.revision, 1),
    updatedAt: integer(value.updatedAt, 0),
  };
});

export const pageSchema = schema((input): TaskPage => {
  const value = object(input, ['query', 'filter', 'tasks']);
  if (!Array.isArray(value.tasks)) throw new ValidationError('任务列表必须是数组。');
  return { ...query(value), tasks: value.tasks.map(taskSchema.parse) };
});

export const createSchema = schema((input) => {
  const value = object(input, ['title']);
  return { title: titleSchema.parse(value.title) };
});

export const updateSchema = schema((input): TaskUpdate => {
  const value = object(input, ['revision', 'title', 'completed']);
  const result: TaskUpdate = { revision: integer(value.revision, 1) };
  if (value.title !== undefined) result.title = titleSchema.parse(value.title);
  if (value.completed !== undefined) result.completed = boolean(value.completed);
  if (result.title === undefined && result.completed === undefined)
    throw new ValidationError('至少修改一项内容');
  return result;
});

export const deleteSchema = schema((input) => {
  const value = object(input, ['revision']);
  return { revision: integer(value.revision, 1) };
});

export const errorSchema = schema((input): { error: string; current?: Task } => {
  const value = object(input);
  return {
    error: text(value.error),
    ...(value.current === undefined ? {} : { current: taskSchema.parse(value.current) }),
  };
});
