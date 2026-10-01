import { DatabaseSync, type StatementSync, type SQLOutputValue } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { randomUUID } from 'node:crypto';
import {
  taskSchema,
  titleSchema,
  updateSchema,
  querySchema,
  type Task,
  type TaskPage,
  type TaskQuery,
  type TaskUpdate,
} from '../src/tasks/schema.ts';

export class TaskFailure extends Error {
  readonly status: number;
  readonly current: Task | undefined;
  constructor(status: number, message: string, current?: Task) {
    super(message);
    this.status = status;
    this.current = current;
  }
}

function task(row: Record<string, SQLOutputValue> | undefined): Task | undefined {
  if (!row) return undefined;
  const parsed = taskSchema.safeParse({ ...row, completed: row.completed === 1 });
  if (!parsed.success) throw new Error('任务数据库包含无法读取的数据。', { cause: parsed.error });
  return parsed.data;
}

/** 一份数据库属于此示例服务；服务器退出时关闭，不随请求创建连接。 */
export class TasksDatabase {
  private readonly database: DatabaseSync;
  private readonly statements: Record<
    'get' | 'list' | 'create' | 'update' | 'delete',
    StatementSync
  >;
  private closed = false;

  constructor(filename: string) {
    if (filename !== ':memory:') mkdirSync(dirname(filename), { recursive: true });
    this.database = new DatabaseSync(filename, { timeout: 1000 });
    try {
      const application = this.database.prepare('PRAGMA application_id').get()?.application_id;
      const version = this.database.prepare('PRAGMA user_version').get()?.user_version;
      const identity = 0x5a4a5453;
      if (application === 0 && version === 0) {
        const existing = this.database
          .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
          .get();
        if (existing) throw new Error('任务数据库文件已用于其他数据，请指定独立文件。');
        this.database.exec(`
          BEGIN IMMEDIATE;
          CREATE TABLE tasks (
            id TEXT PRIMARY KEY NOT NULL,
            title TEXT NOT NULL CHECK(length(title) BETWEEN 1 AND 160),
            completed INTEGER NOT NULL CHECK(completed IN (0, 1)),
            revision INTEGER NOT NULL CHECK(revision > 0),
            updated_at INTEGER NOT NULL
          ) STRICT;
          CREATE INDEX tasks_order ON tasks(completed, updated_at DESC, id);
          PRAGMA application_id = ${identity};
          PRAGMA user_version = 1;
          COMMIT;
        `);
      } else if (application !== identity || version !== 1) {
        throw new Error('任务数据库格式不受当前示例支持，未修改已有数据。');
      }
      this.database.exec('PRAGMA journal_mode = WAL;');
      const fields = 'id, title, completed, revision, updated_at AS updatedAt';
      this.statements = {
        get: this.database.prepare(`SELECT ${fields} FROM tasks WHERE id = ?`),
        list: this.database.prepare(
          `SELECT ${fields} FROM tasks WHERE instr(lower(title), lower(?)) > 0 AND (? = 'all' OR completed = ?) ORDER BY completed, updated_at DESC, id`,
        ),
        create: this.database.prepare(
          `INSERT INTO tasks VALUES (?, ?, 0, 1, ?) RETURNING ${fields}`,
        ),
        update: this.database.prepare(
          `UPDATE tasks SET title = ?, completed = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ? RETURNING ${fields}`,
        ),
        delete: this.database.prepare('DELETE FROM tasks WHERE id = ? AND revision = ?'),
      };
    } catch (error) {
      this.database.close();
      throw error;
    }
  }

  list(query: TaskQuery): TaskPage {
    query = querySchema.parse(query);
    const rows = this.statements.list.all(
      query.query,
      query.filter,
      Number(query.filter === 'done'),
    );
    return { ...query, tasks: rows.map((row) => task(row)!) };
  }

  create(title: string): Task {
    title = titleSchema.parse(title);
    return task(this.statements.create.get(randomUUID(), title, Date.now()))!;
  }

  update(id: string, input: TaskUpdate): Task {
    input = updateSchema.parse(input);
    const current = this.get(id);
    const updated = task(
      this.statements.update.get(
        input.title ?? current.title,
        Number(input.completed ?? current.completed),
        Date.now(),
        id,
        input.revision,
      ),
    );
    if (!updated) this.conflict(id);
    return updated!;
  }

  delete(id: string, revision: number): void {
    if (!this.statements.delete.run(id, revision).changes) this.conflict(id);
  }

  get(id: string): Task {
    const found = task(this.statements.get.get(id));
    if (!found) throw new TaskFailure(404, '这项任务已不存在，请刷新列表。');
    return found;
  }

  private conflict(id: string): never {
    throw new TaskFailure(
      409,
      '这项任务已在其他页面更新。已保留你的草稿，请核对最新内容后重试。',
      this.get(id),
    );
  }

  close(): void {
    if (this.closed) return;
    this.closed = true;
    this.database.close();
  }
}
