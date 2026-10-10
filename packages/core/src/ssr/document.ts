export type RenderMode = 'csr' | 'ssr';
import { headData } from '../runtime/head.js';
import type { RenderResult } from './render.js';

export interface DocumentOptions {
  template: string;
  mode: RenderMode;
  render: () => string | RenderResult | Promise<string | RenderResult>;
}

/** 文档级组合入口；render 的 HTML 必须由可信的渲染器生成。 */
export async function renderDocument({ template, mode, render }: DocumentOptions): Promise<string> {
  if (mode !== 'csr' && mode !== 'ssr') throw new TypeError('Unknown render mode.');
  for (const marker of ['<!--app-html-->', '__RENDER_MODE__']) {
    const index = template.indexOf(marker);
    if (index < 0 || index !== template.lastIndexOf(marker)) {
      throw new Error(`The document template must contain exactly one ${marker} marker.`);
    }
  }

  const result = mode === 'ssr' ? await render() : '';
  const html = typeof result === 'string' ? result : result?.html;
  if (typeof html !== 'string') throw new TypeError('The server renderer must return HTML text.');
  const head = typeof result === 'string' ? {} : headData(result.head);
  const escape = (value: string) =>
    value.replace(
      /[&<>"\r]/g,
      (character) =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\r': '&#13;' })[character]!,
    );
  const tags =
    (head.title === undefined ? '' : `<title data-zj-head="title">${escape(head.title)}</title>`) +
    (head.description === undefined
      ? ''
      : `<meta data-zj-head="description" name="description" content="${escape(head.description)}">`);
  const marker = '<!--app-head-->';
  const position = template.indexOf(marker);
  if ((tags && position < 0) || (position >= 0 && position !== template.lastIndexOf(marker)))
    throw new Error('页面元信息需要唯一的 <!--app-head--> 位置。');
  const values: Record<string, string> = {
    [marker]: tags,
    __RENDER_MODE__: mode,
    '<!--app-html-->': html,
  };
  // 一次替换，正文或标题中出现模板标记时不得再次解释。
  return template.replace(
    /<!--app-head-->|__RENDER_MODE__|<!--app-html-->/g,
    (key) => values[key]!,
  );
}
