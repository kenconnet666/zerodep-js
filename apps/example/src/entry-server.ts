import { renderDocument, renderToString, serializeData, type RenderMode } from '@zerodep-js/ssr';
import { App } from './App.js';
import { TaskBoard } from './tasks/TaskBoard.js';
import type { TaskPage } from './tasks/schema.js';

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
