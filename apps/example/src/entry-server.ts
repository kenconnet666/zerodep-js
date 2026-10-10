import {
  renderDocument,
  _render,
  serializeData,
  type RenderMode,
  type DocumentOptions,
} from 'zerodep-js';
import { App } from './App.js';
import { TaskBoard } from './tasks/TaskBoard.js';
import type { TaskPage } from './tasks/schema.js';
import { createServerCssHost, withCssHost, serializeCssRules } from 'zerodep-js-css';

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
