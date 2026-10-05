import {
  _defineRoute,
  _defineRoutes,
  RouteError,
  type LoadContext,
  type RouteComponent,
} from 'zerodep-use/router';
import { pageSchema, querySchema, type TaskQuery, type TaskPage } from '../tasks/schema.js';
import { WorkspaceLayout, TaskList, TaskDetail } from './Pages.js';

function parseSearch(search: URLSearchParams): TaskQuery {
  const result = querySchema.safeParse({
    query: search.get('q') ?? '',
    filter: search.get('filter') ?? 'all',
  });
  if (!result.success) throw new RouteError(400, '任务查询参数无效。');
  return result.data;
}

async function list(
  { url, signal }: Pick<LoadContext, 'url' | 'signal'>,
  query: TaskQuery,
): Promise<TaskPage> {
  const endpoint = new URL('/api/tasks', url);
  endpoint.search = new URLSearchParams({ q: query.query, filter: query.filter }).toString();
  const response = await fetch(endpoint, { signal, cache: 'no-store' });
  if (!response.ok) throw new RouteError(response.status, '任务加载失败，请重试。');
  return pageSchema.parse(await response.json());
}

// 路由表可以共享；加载与历史状态始终属于每次创建的 router。
export const routes = _defineRoutes({
  layout: { path: '/workspace', component: WorkspaceLayout },
  home: { path: '/workspace', parent: 'layout', redirect: '/workspace/tasks' },
  tasks: _defineRoute('/workspace/tasks', {
    parent: 'layout',
    component: TaskList,
    parseSearch,
    load: (context) => list(context, context.search),
    validateData: (data) => pageSchema.parse(data),
  }),
  task: _defineRoute('/workspace/tasks/:id', {
    parent: 'layout',
    component: TaskDetail,
    key: ({ params }) => params.id,
    load: async (context) => {
      const page = await list(context, { query: '', filter: 'all' });
      const task = page.tasks.find((item) => item.id === context.params.id);
      if (!task) throw new RouteError(404, '任务不存在或已删除。');
      return task;
    },
  }),
  preferences: {
    path: '/workspace/preferences',
    parent: 'layout',
    lazy: async (): Promise<RouteComponent> => (await import('./Preferences.js')).default,
  },
});
