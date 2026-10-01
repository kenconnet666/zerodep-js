import { z } from 'zod';

const singleLine = z
  .string()
  .trim()
  // oxlint-disable-next-line no-control-regex -- 明确拒绝这些字符，避免 SQLite 与文本传输采用不同解释。
  .regex(/^[^\u0000-\u001f\u007f\uD800-\uDFFF]*$/u, '不能包含控制字符或无效的 Unicode 字符');
export const titleSchema = singleLine.min(1, '请输入任务标题').max(160, '任务标题最多 160 个字符');
export const filterSchema = z.enum(['all', 'open', 'done']);
export const querySchema = z.strictObject({
  query: singleLine.max(120, '搜索内容最多 120 个字符').default(''),
  filter: filterSchema.default('all'),
});
export const taskSchema = z.strictObject({
  id: z.uuid(),
  title: titleSchema,
  completed: z.boolean(),
  revision: z.number().int().min(1),
  updatedAt: z.number().int().nonnegative(),
});
export const pageSchema = querySchema.extend({ tasks: z.array(taskSchema) });
export const createSchema = z.strictObject({ title: titleSchema });
export const updateSchema = z
  .strictObject({
    revision: z.number().int().min(1),
    title: titleSchema.optional(),
    completed: z.boolean().optional(),
  })
  .refine(
    (value) => value.title !== undefined || value.completed !== undefined,
    '至少修改一项内容',
  );
export const deleteSchema = z.strictObject({ revision: z.number().int().min(1) });
export const errorSchema = z.object({ error: z.string(), current: taskSchema.optional() });

export type Task = z.infer<typeof taskSchema>;
export type TaskQuery = z.infer<typeof querySchema>;
export type TaskPage = z.infer<typeof pageSchema>;
export type TaskFilter = z.infer<typeof filterSchema>;
export type TaskUpdate = z.infer<typeof updateSchema>;
