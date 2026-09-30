import { renderDocument, type RenderMode } from '@zerodep-js/ssr';
import { renderExample } from './view.js';

export function render(template: string, mode: RenderMode): Promise<string> {
  return renderDocument({ template, mode, render: () => renderExample(mode) });
}
