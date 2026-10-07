import { renderToString } from 'zerodep-js-ssr';
import { App } from './App.js';
import { createServerCssHost, withCssHost, serializeCssRules } from 'zerodep-css/server';

export function render(title: string) {
  const host = createServerCssHost();
  const html = withCssHost(host, () => renderToString(App, { props: { title } }));
  const { cssText, manifest } = serializeCssRules(host.rules());
  return {
    html,
    styles: `<style data-zerodep-css>${cssText}</style><script type="application/json" data-zerodep-css>${manifest}</script>`,
  };
}
