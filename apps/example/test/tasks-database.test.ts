import { afterEach, expect, it } from 'vitest';
import { mkdtemp, realpath, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { TasksDatabase, TaskFailure } from '../server/tasks-database.ts';
import { titleSchema, updateSchema } from '../src/tasks/schema.js';

const databases: TasksDatabase[] = [];
function open(filename = ':memory:') {
  const database = new TasksDatabase(filename);
  databases.push(database);
  return database;
}
afterEach(() => {
  for (const database of databases.splice(0)) database.close();
});

async function withFile(run: (filename: string) => void | Promise<void>): Promise<void> {
  const temporary = await realpath(tmpdir());
  const directory = await mkdtemp(resolve(temporary, 'zerodep-tasks-'));
  const owned = relative(temporary, directory);
  expect(owned.startsWith('zerodep-tasks-') && !owned.includes(sep) && !isAbsolute(owned)).toBe(
    true,
  );
  try {
    await run(resolve(directory, 'tasks.sqlite'));
  } finally {
    for (const database of databases.splice(0)) database.close();
    await rm(directory, { recursive: true });
  }
}

it('真实增删改查、筛选与 revision 冲突不丢失数据', () => {
  const database = open();
  const task = database.create('中文 task 100%');
  expect(database.list({ query: 'TASK 100%', filter: 'open' }).tasks).toEqual([task]);
  const updated = database.update(task.id, { revision: task.revision, completed: true });
  expect(updated.revision).toBe(2);
  expect(database.list({ query: '', filter: 'open' }).tasks).toEqual([]);
  expect(database.list({ query: '', filter: 'done' }).tasks).toEqual([updated]);
  try {
    database.update(task.id, { revision: 1, title: '过期覆盖' });
    expect.fail('过期写入应当拒绝');
  } catch (error) {
    expect(error).toBeInstanceOf(TaskFailure);
    expect((error as TaskFailure).status).toBe(409);
    expect((error as TaskFailure).current).toEqual(updated);
  }
  expect(() => database.delete(task.id, 1)).toThrow('其他页面更新');
  expect(database.get(task.id)).toEqual(updated);
  database.delete(task.id, updated.revision);
  expect(() => database.get(task.id)).toThrow('不存在');
});

it('重新打开文件保留数据，第二个连接仍遵守并发版本', async () => {
  await withFile((filename) => {
    const first = open(filename);
    const task = first.create('应当保留');
    first.close();
    const second = open(filename);
    const third = open(filename);
    expect(second.get(task.id)).toEqual(task);
    second.update(task.id, { revision: 1, title: '新内容' });
    expect(() => third.update(task.id, { revision: 1, title: '过期内容' })).toThrow('其他页面更新');
    expect(third.get(task.id).title).toBe('新内容');
  });
});

it('标题与更新输入有明确边界', () => {
  const database = open();
  expect(titleSchema.parse('  合法 🚀  ')).toBe('合法 🚀');
  for (const title of ['', 'x'.repeat(161), 'a\0b', '\ud800'])
    expect(titleSchema.safeParse(title).success).toBe(false);
  expect(() => database.create('a\0b')).toThrow();
  expect(database.list({ query: '', filter: 'all' }).tasks).toEqual([]);
  expect(updateSchema.safeParse({ revision: 1 }).success).toBe(false);
  expect(updateSchema.safeParse({ revision: 1, title: '任务', unknown: true }).success).toBe(false);
});

it('不接管已经用于其他数据的文件', async () => {
  await withFile((filename) => {
    const foreign = new DatabaseSync(filename);
    try {
      foreign.exec(
        "CREATE TABLE unrelated(value TEXT); INSERT INTO unrelated VALUES ('保留的数据');",
      );
    } finally {
      foreign.close();
    }
    expect(() => open(filename)).toThrow('已用于其他数据');
    const check = new DatabaseSync(filename);
    try {
      expect(check.prepare('SELECT value FROM unrelated').all()).toEqual([{ value: '保留的数据' }]);
      expect(check.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()).toEqual([
        { name: 'unrelated' },
      ]);
      expect(check.prepare('PRAGMA application_id').get()?.application_id).toBe(0);
    } finally {
      check.close();
    }
  });
});
