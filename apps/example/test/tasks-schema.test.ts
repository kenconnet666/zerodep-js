import { expect, it } from 'vitest';
import {
  createSchema,
  deleteSchema,
  errorSchema,
  idSchema,
  pageSchema,
  querySchema,
  taskSchema,
  updateSchema,
  ValidationError,
} from '../src/tasks/schema.js';

const task = {
  id: 'b7468d2b-2daa-4606-983b-e03822d2e334',
  title: '任务 🚀',
  completed: false,
  revision: 1,
  updatedAt: 0,
};

it('请求和响应共享规范化后的数据与明确类型', () => {
  expect(querySchema.parse({})).toEqual({ query: '', filter: 'all' });
  expect(querySchema.parse({ query: '  任务  ', filter: 'done' })).toEqual({
    query: '任务',
    filter: 'done',
  });
  expect(createSchema.parse({ title: '  任务 🚀  ' })).toEqual({ title: task.title });
  expect(taskSchema.parse(task)).toEqual(task);
  expect(pageSchema.parse({ tasks: [task] })).toEqual({ query: '', filter: 'all', tasks: [task] });
  expect(updateSchema.parse({ revision: 1, completed: false })).toEqual({
    revision: 1,
    completed: false,
  });
  expect(deleteSchema.parse({ revision: 1 })).toEqual({ revision: 1 });
});

it('拒绝错误结构、额外字段与无效查询，且不把 null 当默认值', () => {
  for (const input of [
    null,
    [],
    'query',
    { query: null },
    { filter: null },
    { filter: 'other' },
    { query: 'x'.repeat(121) },
    { query: 'a\0b' },
    { extra: true },
  ])
    expect(() => querySchema.parse(input)).toThrow(ValidationError);
  for (const input of [{}, { title: null }, { title: '任务', completed: true }])
    expect(createSchema.safeParse(input).success).toBe(false);
});

it('任务响应和并发版本拒绝隐式转换、非安全整数及缺失字段', () => {
  for (const invalid of [0, -1, 1.5, Infinity, NaN, Number.MAX_SAFE_INTEGER + 1, '1']) {
    expect(updateSchema.safeParse({ revision: invalid, completed: true }).success).toBe(false);
    expect(deleteSchema.safeParse({ revision: invalid }).success).toBe(false);
  }
  for (const input of [
    { ...task, id: 'not-a-uuid' },
    { ...task, completed: 1 },
    { ...task, updatedAt: -1 },
    { ...task, extra: true },
    { ...task, title: undefined },
  ])
    expect(taskSchema.safeParse(input).success).toBe(false);
  expect(pageSchema.safeParse({ tasks: [task, null] }).success).toBe(false);
  expect(pageSchema.safeParse({ tasks: {} }).success).toBe(false);
  expect(updateSchema.safeParse({ revision: 1, title: undefined }).success).toBe(false);
  expect(updateSchema.safeParse({ revision: 1, completed: 'false' }).success).toBe(false);
});

it('冲突响应校验当前数据，普通错误允许服务端附带说明字段', () => {
  expect(errorSchema.parse({ error: '版本冲突', current: task, trace: 'server' })).toEqual({
    error: '版本冲突',
    current: task,
  });
  expect(errorSchema.safeParse({ error: 400 }).success).toBe(false);
  expect(errorSchema.safeParse({ error: '错误', current: null }).success).toBe(false);
  expect(idSchema.parse('00000000-0000-0000-0000-000000000000')).toBe(
    '00000000-0000-0000-0000-000000000000',
  );
  expect(idSchema.safeParse('b7468d2b-2daa-4606-083b-e03822d2e334').success).toBe(false);
});
