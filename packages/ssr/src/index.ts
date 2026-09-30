export type RenderMode = 'csr' | 'ssr';
export { renderToString } from './render.js';
export { serializeData } from './data.js';
export type { RenderOptions } from './render.js';

export interface DocumentOptions {
  template: string;
  mode: RenderMode;
  render: () => string | Promise<string>;
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

  const html = mode === 'ssr' ? await render() : '';
  if (typeof html !== 'string') throw new TypeError('The server renderer must return HTML text.');

  return template.replace('__RENDER_MODE__', mode).replace('<!--app-html-->', () => html);
}
