import {
  renderDocument,
  _render,
  serializeData,
  type RenderMode,
  type DocumentOptions,
} from 'zerodep-js-ssr';
import { App } from './App.js';
import { TaskBoard } from './tasks/TaskBoard.js';
import type { TaskPage } from './tasks/schema.js';
import { _createRouter, _createMemoryHistory } from 'zerodep-use/router';
import { routes } from './workspace/routes.js';
import { Workspace } from './workspace/App.js';
import { createServerCssHost, withCssHost, serializeCssRules } from 'zerodep-css/server';

async function renderPage(options: DocumentOptions): Promise<string> {
  const host = createServerCssHost();
  return withCssHost(host, async () => {
    const html = await renderDocument(options);
    if (options.mode !== 'ssr' || host.rules().length === 0) return html;
    // 先完成组件渲染，再收集请求内样式；复用 CSS 库的 HTML/JSON 安全序列化。
    const { cssText, manifest } = serializeCssRules(host.rules());
    return html.replace(
      '</head>',
      () =>
        `<style data-zerodep-css>${cssText}</style><script type="application/json" data-zerodep-css>${manifest}</script></head>`,
    );
  });
}

export function render(template: string, mode: RenderMode): Promise<string> {
  return renderPage({ template, mode, render: () => _render(App, { props: { mode } }) });
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
  return renderPage({
    template: template.replace(marker, () => serializeData(initial)),
    mode,
    render: () => _render(TaskBoard, { props: { initial, mode } }),
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
    const html = await renderPage({
      template: template.replace(marker, () => serializeData(initial)),
      mode,
      render: () => _render(Workspace, { props: { router } }),
    });
    return { html, status: mode === 'ssr' ? router.state.statusCode : 200, redirect: undefined };
  } finally {
    signal?.removeEventListener('abort', abort);
    router.dispose();
  }
}
