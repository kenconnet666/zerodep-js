import {
  component,
  $state,
  $derived,
  For,
  getAbortSignal,
  snapshot,
  effect,
  type Renderable,
} from 'zerodep-js';
import { Link, Outlet, useRoute, useRouter, onBeforeLeave } from 'zerodep-js/router';
import { persistLocal } from 'zerodep-js/storage';
import { ApiFailure, updateTask } from '../tasks/api.js';
import { titleSchema } from '../tasks/schema.js';
import { routes } from './routes.js';
import './workspace.css';

export const WorkspaceLayout = component((): Renderable => {
  const router = useRouter();
  let label = $state('我的任务');
  return (
    <div class="workspace">
      <header>
        <p>zerodep-js / 应用扩展示例</p>
        <h1>任务空间</h1>
        <nav aria-label="空间导航">
          <Link to={routes.tasks} activeClass="active">
            任务列表
          </Link>
          <Link to={routes.preferences} activeClass="active" preload>
            偏好设置
          </Link>
          <a href="/tasks">完整任务工作台</a>
          <a href="/">框架示例</a>
        </nav>
        <label>
          空间名称
          <input
            aria-label="空间名称"
            value={label}
            onInput={(event) => {
              label = event.currentTarget.value;
            }}
          />
        </label>
        <output data-layout-name>{label}</output>
        <p class="status" role="status">
          {router.pending ? '页面正在加载…' : '页面已就绪'}
        </p>
      </header>
      <div class="route-content">
        <Outlet />
      </div>
      <footer>
        <button onClick={() => router.go(-1)}>后退</button>
        <button onClick={() => router.go(1)}>前进</button>
        <a href="/workspace/tasks?render=ssr">SSR</a>
        <a href="/workspace/tasks?render=csr">CSR</a>
        <a href="/workspace?render=csr&history=hash#/workspace/tasks">Hash</a>
      </footer>
    </div>
  );
});

export const TaskList = component((): Renderable => {
  const route = useRoute(routes.tasks);
  const router = useRouter();
  let query = $state(route.search.query);
  let previousQuery = route.search.query;
  effect(() => {
    const next = route.search.query;
    // 首轮保留接管前的输入；之后浏览器历史改变查询时跟随已提交 URL。
    if (next !== previousQuery) {
      previousQuery = next;
      query = next;
    }
  });
  return (
    <section aria-label="任务列表">
      <h2 tabIndex={-1} data-route-focus>
        任务列表
      </h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void router.setSearch({ q: query || null });
        }}
      >
        <label>
          查找任务
          <input
            aria-label="查找任务"
            value={query}
            onInput={(event) => {
              query = event.currentTarget.value;
            }}
          />
        </label>
        <button>搜索</button>
      </form>
      <p data-task-query>当前查询：{route.search.query || '全部'}</p>
      <p>
        <Link to={routes.tasks} search={{ filter: 'open' }}>
          未完成任务
        </Link>{' '}
        / <Link to={routes.tasks}>全部任务</Link>
      </p>
      <ul>
        <For
          each={route.data?.tasks ?? []}
          keyBy={(task) => task.id}
          fallback={<li>没有找到任务，可先到工作台创建。</li>}
        >
          {(task) => (
            <li>
              <Link to={routes.task} params={{ id: task.id }} preload>
                {task.title}
              </Link>
              <span>{task.completed ? '已完成' : '进行中'}</span>
            </li>
          )}
        </For>
      </ul>
      <a href="/tasks">创建或管理任务</a>
    </section>
  );
});

export const TaskDetail = component((): Renderable => {
  const route = useRoute(routes.task);
  const router = useRouter();
  const task = snapshot(route.data!);
  let title = $state(task.title);
  let savedTitle = $state(task.title);
  let revision = $state(task.revision);
  let saving = $state(false);
  let message = $state('');
  const dirty = $derived(title !== savedTitle);
  const signal = getAbortSignal();
  const draft = persistLocal(
    `zerodep.example.task-title:${task.id}`,
    {
      read: () => (title === savedTitle ? null : title),
      write: (value) => {
        title = value ?? savedTitle;
      },
    },
    {
      writeDelay: 150,
      validate: (value) => {
        if (value !== null && typeof value !== 'string') throw new Error('草稿应为文本。');
        return value;
      },
    },
  );
  onBeforeLeave(() => !dirty || window.confirm('标题尚未提交，确定离开吗？草稿会保留。'));

  async function save() {
    const entered = title;
    const parsed = titleSchema.safeParse(title);
    if (!parsed.success) {
      message = parsed.error.issues[0]?.message ?? '标题无效。';
      return;
    }
    saving = true;
    message = '';
    try {
      const saved = await updateTask(task.id, { title: parsed.data, revision }, signal);
      if (signal.aborted) return;
      savedTitle = saved.title;
      // 请求发出后继续输入的内容仍是新草稿，不能被较早的提交结果覆盖。
      if (title === entered) title = saved.title;
      revision = saved.revision;
      if (title === saved.title) draft.remove();
      else draft.flush();
      router.invalidate(routes.tasks);
      router.invalidate(routes.task);
      message = '标题已保存';
    } catch (error) {
      if (signal.aborted) return;
      message = error instanceof Error ? error.message : '保存失败';
      if (error instanceof ApiFailure && error.current) {
        revision = error.current.revision;
        message += ` 服务端当前标题：${error.current.title}`;
      }
    } finally {
      if (!signal.aborted) saving = false;
    }
  }
  return (
    <section aria-label="任务详情">
      <h2 tabIndex={-1} data-route-focus>
        任务详情
      </h2>
      <p data-task-id>{task.id}</p>
      <label>
        任务标题
        <input
          aria-label="任务标题"
          value={title}
          onInput={(event) => {
            title = event.currentTarget.value;
          }}
        />
      </label>
      <p data-dirty>{dirty ? '有未提交的修改' : '已与服务端同步'}</p>
      <button disabled={saving || !dirty} onClick={() => void save()}>
        保存标题
      </button>
      <button
        onClick={() => {
          title = savedTitle;
        }}
      >
        放弃当前修改
      </button>
      <p role="status">{message}</p>
      {draft.error !== undefined ? <p role="alert">草稿保存失败，请及时提交。</p> : null}
      <Link to={routes.tasks}>返回列表</Link>
    </section>
  );
});
