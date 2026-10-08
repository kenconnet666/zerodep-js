import { _component, _state, _derived, _effect, _getAbortSignal, For } from 'zerodep-js';
import type { RenderMode } from 'zerodep-js-ssr';
import { _persistLocal } from 'zerodep-use/storage';
import { ApiFailure, listTasks, createTask, updateTask, deleteTask } from './api.js';
import {
  titleSchema,
  type Task,
  type TaskPage,
  type TaskFilter,
  type TaskUpdate,
} from './schema.js';
import { TaskItem } from './TaskItem.js';
import './tasks.css';

type Props = { initial?: TaskPage; mode?: RenderMode; embedded?: boolean };

export const TaskBoard = _component(({ initial, mode = 'csr', embedded = false }: Props) => {
  const start = initial;
  let tasks = _state<Task[]>(start?.tasks ?? []);
  let search = _state(start?.query ?? '');
  let filter = _state<TaskFilter>(start?.filter ?? 'all');
  let newTitle = _state('');
  const draftStorage = _persistLocal(
    'zerodep.example.task-draft',
    {
      read: () => newTitle,
      write: (value) => {
        newTitle = value;
      },
    },
    {
      writeDelay: 150,
      validate(value) {
        if (typeof value !== 'string') throw new Error('保存的草稿格式无效');
        return value;
      },
    },
  );
  let loading = _state(false);
  let creating = _state(false);
  let ready = _state(false);
  let loadError = _state('');
  let createError = _state('');
  let notice = _state('');
  const query = _derived(search.trim());
  const completed = _derived(tasks.filter((task) => task.completed).length);
  const lifetime = _getAbortSignal();
  let request: AbortController | undefined;
  let first = true;
  _effect(() => {
    ready = true;
  });

  function cancelQuery(): void {
    request?.abort();
    loading = false;
    loadError = '';
  }

  async function load(q = query, selected = filter, owner = lifetime): Promise<void> {
    if (owner.aborted) return;
    request?.abort();
    request = new AbortController();
    // 生命周期信号处理卸载/条件变化；本次请求的控制器供手动刷新和冲突处理取消。
    const signal = AbortSignal.any([owner, request.signal]);
    loading = true;
    loadError = '';
    try {
      const result = await listTasks({ query: q, filter: selected }, signal);
      // 即使传输层忽略取消，也不能让旧结果覆盖新查询或冲突草稿。
      if (!signal.aborted) tasks = result.tasks;
    } catch (error) {
      if (!signal.aborted)
        loadError = error instanceof Error ? error.message : '查询失败，请重试。';
    } finally {
      if (!signal.aborted) loading = false;
    }
  }

  _effect(() => {
    const q = query;
    const selected = filter;
    if (!embedded) {
      const url = new URL(location.href);
      if (q) url.searchParams.set('q', q);
      else url.searchParams.delete('q');
      if (selected !== 'all') url.searchParams.set('filter', selected);
      else url.searchParams.delete('filter');
      history.replaceState(null, '', url);
    }
    if (first) {
      first = false;
      if (start && q === start.query && selected === start.filter) return;
    }
    void load(q, selected, _getAbortSignal());
  });

  function merge(saved: Task) {
    tasks = tasks.map((task) =>
      task.id === saved.id && task.revision <= saved.revision ? saved : task,
    );
  }

  function preserveConflict(error: unknown): void {
    if (lifetime.aborted || !(error instanceof ApiFailure) || !error.current) return;
    // 冲突中的新标题可能不再匹配搜索；立即重查会删除这一行并丢掉尚未确认的草稿。
    cancelQuery();
    merge(error.current);
    notice = '检测到冲突，请先核对未保存的内容';
  }

  async function change(
    id: string,
    revision: number,
    patch: Omit<TaskUpdate, 'revision'>,
  ): Promise<Task> {
    try {
      const saved = await updateTask(id, { ...patch, revision }, lifetime);
      if (!lifetime.aborted) {
        cancelQuery();
        merge(saved);
        notice = '任务已保存';
        await load();
      }
      return saved;
    } catch (error) {
      preserveConflict(error);
      throw error;
    }
  }

  async function remove(id: string, revision: number): Promise<void> {
    try {
      await deleteTask(id, revision, lifetime);
      if (!lifetime.aborted) {
        cancelQuery();
        tasks = tasks.filter((task) => task.id !== id);
        notice = '任务已删除';
        await load();
      }
    } catch (error) {
      preserveConflict(error);
      throw error;
    }
  }

  async function add(event: SubmitEvent) {
    event.preventDefault();
    if (creating) return;
    const parsed = titleSchema.safeParse(newTitle);
    if (!parsed.success) {
      createError = parsed.error.message;
      return;
    }
    const submitted = newTitle;
    creating = true;
    createError = '';
    try {
      await createTask(parsed.data, lifetime);
      if (!lifetime.aborted) {
        if (newTitle === submitted) newTitle = '';
        notice = '任务已添加';
        await load();
      }
    } catch (error) {
      if (!lifetime.aborted)
        createError = error instanceof Error ? error.message : '添加失败，请重试。';
    } finally {
      if (!lifetime.aborted) creating = false;
    }
  }

  function modeUrl(next: RenderMode): string {
    return `/tasks?${new URLSearchParams({ render: next, q: query, filter })}`;
  }

  return (
    <section class="task-board" data-task-board>
      <header class="task-header">
        <div>
          <p class="task-eyebrow">ZERODEP · DAILY TASKS</p>
          {embedded ? <h2>任务工作台</h2> : <h1>任务工作台</h1>}
          <p class="task-description">把想法记下来，一件一件完成。</p>
        </div>
        {!embedded && (
          <nav class="task-nav" aria-label="任务页面导航">
            <a href="/">框架用例</a>
            <a href={modeUrl('ssr')} aria-current={mode === 'ssr' ? 'page' : undefined}>
              SSR
            </a>
            <a href={modeUrl('csr')} aria-current={mode === 'csr' ? 'page' : undefined}>
              CSR
            </a>
          </nav>
        )}
      </header>
      <form
        class="task-create"
        onSubmit={(event) => {
          void add(event);
        }}
      >
        <label class="sr-only" for={embedded ? 'embedded-new-task' : 'new-task'}>
          新任务
        </label>
        <input
          id={embedded ? 'embedded-new-task' : 'new-task'}
          placeholder="接下来想完成什么？"
          value={newTitle}
          maxLength={160}
          autoComplete="off"
          onInput={(event) => (newTitle = event.currentTarget.value)}
        />

        <button type="submit" disabled={!ready || creating}>
          {creating ? '添加中…' : '添加任务'}
        </button>
      </form>
      {draftStorage.error !== undefined && (
        <p class="task-error" data-draft-storage-error>
          草稿暂时无法保存到此浏览器，输入内容仍保留。
        </p>
      )}
      {createError && (
        <p role="alert" class="task-error">
          {createError}
        </p>
      )}
      <div class="task-toolbar">
        <label>
          搜索
          <input
            type="search"
            aria-label="搜索任务"
            placeholder="搜索标题"
            value={search}
            maxLength={120}
            onInput={(event) => (search = event.currentTarget.value)}
          />
        </label>
        <label>
          状态
          <select
            aria-label="任务状态"
            value={filter}
            onChange={(event) => {
              const value = event.currentTarget.value;
              if (value === 'all' || value === 'open' || value === 'done') filter = value;
            }}
          >
            <option value="all">全部</option>
            <option value="open">待处理</option>
            <option value="done">已完成</option>
          </select>
        </label>
        <button
          type="button"
          class="quiet"
          disabled={!ready || loading}
          onClick={() => {
            void load();
          }}
        >
          刷新列表
        </button>
      </div>
      <div class="task-summary">
        <span>
          当前显示 <strong data-task-count>{tasks.length}</strong> 项 · 已完成 {completed} 项
        </span>
        <span role="status" data-task-status>
          {loading ? '正在同步…' : loadError ? '同步失败' : notice || '已同步'}
        </span>
      </div>
      {loadError && (
        <div class="task-error" role="alert">
          {loadError}
          <button
            type="button"
            onClick={() => {
              void load();
            }}
          >
            重试查询
          </button>
        </div>
      )}
      <ul class="task-list" aria-busy={loading}>
        <For
          each={tasks}
          keyBy={(task) => task.id}
          fallback={
            <li class="task-empty">
              {loading
                ? '正在读取任务…'
                : loadError
                  ? '暂时无法读取任务，请重试。'
                  : query || filter !== 'all'
                    ? '没有符合条件的任务'
                    : '还没有任务，添加第一项吧。'}
            </li>
          }
        >
          {(task) => (
            <TaskItem
              task={task}
              disabled={!ready || loading}
              onSave={(id, title, revision) => change(id, revision, { title })}
              onToggle={(id, completed, revision) => change(id, revision, { completed })}
              onDelete={remove}
            />
          )}
        </For>
      </ul>
      <noscript>
        <p class="task-description">启用 JavaScript 后可以编辑任务；当前列表来自服务端。</p>
      </noscript>
    </section>
  );
});
