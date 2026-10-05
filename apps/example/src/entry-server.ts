import { renderDocument, renderToString, serializeData, type RenderMode } from 'zerodep-js-ssr';
import { App } from './App.js';
import { TaskBoard } from './tasks/TaskBoard.js';
import type { TaskPage } from './tasks/schema.js';
import { _createRouter, _createMemoryHistory } from 'zerodep-use/router';
import { routes } from './workspace/routes.js';
import { Workspace } from './workspace/App.js';

export function render(template: string, mode: RenderMode): Promise<string> {
  return renderDocument({ template, mode, render: () => renderToString(App, { props: { mode } }) });
}

export function renderTasks(
  template: string,
  mode: RenderMode,
  initial: TaskPage,
): Promise<string> {
  const marker = '<!--task-data-->';
  const index = template.indexOf(marker);
  if (index < 0 || index !== template.lastIndexOf(marker))
    throw new Error('任务页面需要唯一的初始化数据位置。');
  return renderDocument({
    template: template.replace(marker, () => serializeData(initial)),
    mode,
    render: () => renderToString(TaskBoard, { props: { initial, mode } }),
  });
}

export async function renderWorkspace(
  template: string,
  mode: RenderMode,
  url: string,
  signal?: AbortSignal,
) {
  const router = _createRouter(routes, { history: _createMemoryHistory(url) });
  const abort = () => router.dispose();
  signal?.addEventListener('abort', abort, { once: true });
  try {
    signal?.throwIfAborted();
    const result = mode === 'ssr' ? await router.resolve() : undefined;
    if (result?.status === 'error') throw result.error;
    if (result?.status === 'committed' && result.redirect)
      return { html: '', status: result.redirect.status, redirect: result.state.location.href };
    const initial = mode === 'ssr' ? router.dehydrate() : null;
    const marker = '<!--route-data-->';
    if (template.indexOf(marker) < 0 || template.indexOf(marker) !== template.lastIndexOf(marker))
      throw new Error('路由页面需要唯一的初始化数据位置。');
    const html = await renderDocument({
      template: template.replace(marker, () => serializeData(initial)),
      mode,
      render: () => renderToString(Workspace, { props: { router } }),
    });
    return { html, status: mode === 'ssr' ? router.state.statusCode : 200, redirect: undefined };
  } finally {
    signal?.removeEventListener('abort', abort);
    router.dispose();
  }
}
