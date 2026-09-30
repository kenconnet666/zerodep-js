import { renderDocument, renderToString, type RenderMode } from '@zerodep-js/ssr';
import { App } from './App.js';

export function render(template: string, mode: RenderMode): Promise<string> {
  return renderDocument({ template, mode, render: () => renderToString(App, { props: { mode } }) });
}
