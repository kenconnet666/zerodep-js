import { _component, _state, _derived, _onCleanup } from 'zerodep-js';
import { titleSchema, type Task } from './schema.js';

type Props = {
  task: Task;
  disabled?: boolean;
  onSave: (id: string, title: string, revision: number) => Promise<Task>;
  onToggle: (id: string, completed: boolean, revision: number) => Promise<Task>;
  onDelete: (id: string, revision: number) => Promise<void>;
};

export const TaskItem = _component(
  ({ task, disabled = false, onSave, onToggle, onDelete }: Props) => {
    let draft = _state(task.title);
    let pending = _state(false);
    let failure = _state('');
    let optimisticCompleted = _state<boolean | undefined>(undefined);
    const dirty = _derived(draft !== task.title);
    let alive = true;
    _onCleanup(() => {
      alive = false;
    });

    async function save(event: SubmitEvent) {
      event.preventDefault();
      if (pending || disabled) return;
      const parsed = titleSchema.safeParse(draft);
      if (!parsed.success) {
        failure = parsed.error.issues[0]!.message;
        return;
      }
      const submitted = draft;
      pending = true;
      failure = '';
      try {
        const saved = await onSave(task.id, parsed.data, task.revision);
        // 请求期间允许继续编辑，较早的保存结果不能清掉后来的草稿。
        if (alive && draft === submitted) draft = saved.title;
      } catch (error) {
        if (alive) failure = error instanceof Error ? error.message : '保存失败，请重试。';
      } finally {
        if (alive) pending = false;
      }
    }

    async function toggle(completed: boolean) {
      if (pending || disabled) return;
      optimisticCompleted = completed;
      pending = true;
      failure = '';
      try {
        await onToggle(task.id, completed, task.revision);
      } catch (error) {
        if (alive) failure = error instanceof Error ? error.message : '更新失败，请重试。';
      } finally {
        if (alive) {
          pending = false;
          optimisticCompleted = undefined;
        }
      }
    }

    async function remove() {
      if (pending || disabled) return;
      pending = true;
      failure = '';
      try {
        await onDelete(task.id, task.revision);
      } catch (error) {
        if (alive) failure = error instanceof Error ? error.message : '删除失败，请重试。';
      } finally {
        if (alive) pending = false;
      }
    }

    return (
      <li class={task.completed ? 'task-row is-complete' : 'task-row'} data-task-id={task.id}>
        <input
          class="task-check"
          type="checkbox"
          aria-label={`完成：${task.title}`}
          checked={optimisticCompleted ?? task.completed}
          disabled={disabled || pending}
          onChange={(event) => {
            void toggle(event.currentTarget.checked);
          }}
        />

        <div class="task-content">
          <form onSubmit={save} class="task-edit">
            <label class="sr-only" for={`task-${task.id}`}>
              编辑：{task.title}
            </label>
            <input
              id={`task-${task.id}`}
              data-task-draft
              value={draft}
              maxLength={160}
              autoComplete="off"
              onInput={(event) => (draft = event.currentTarget.value)}
            />

            <button type="submit" disabled={disabled || pending || !dirty}>
              保存
            </button>
            <button
              type="button"
              class="quiet"
              disabled={disabled || pending}
              onClick={() => {
                void remove();
              }}
            >
              删除
            </button>
          </form>
          <div class="task-meta">
            <span>
              {pending
                ? '正在保存…'
                : dirty
                  ? '有未保存的修改'
                  : task.completed
                    ? '已完成'
                    : '待处理'}
            </span>
            {dirty && (
              <button
                type="button"
                class="text-button"
                disabled={pending}
                onClick={() => {
                  draft = task.title;
                  failure = '';
                }}
              >
                恢复服务器内容
              </button>
            )}
          </div>
          {failure && (
            <p role="alert" class="task-error">
              {failure}
              <span class="server-title">服务器内容：{task.title}</span>
            </p>
          )}
        </div>
      </li>
    );
  },
);
