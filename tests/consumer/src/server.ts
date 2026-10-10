import { _render, renderDocument, type RenderMode } from 'zerodep-js';
import { App } from './App.js';
import { createServerCssHost, withCssHost, serializeCssRules } from 'zerodep-js-css';

export function render(title: string) {
  const host = createServerCssHost();
  const result = withCssHost(host, () => _render(App, { props: { title } }));
  const { cssText, manifest } = serializeCssRules(host.rules());
  return {
    ...result,
    styles: `<style data-zerodep-css>${cssText}</style><script type="application/json" data-zerodep-css>${manifest}</script>`,
  };
}

export async function page(template: string, mode: RenderMode, title: string): Promise<string> {
  const result = mode === 'ssr' ? render(title) : { html: '', head: {}, styles: '' };
  const html = await renderDocument({ template, mode, render: () => result });
  return html.replace('</head>', () => `${result.styles}</head>`);
}
