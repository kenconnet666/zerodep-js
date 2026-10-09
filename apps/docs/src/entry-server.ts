import { renderToString } from 'zerodep-js-ssr';
import { createServerCssHost, serializeCssRules, withCssHost } from 'zerodep-js-css/server';
import { App } from './App.js';

/** 由应用组合页面与 CSS 标签；每次渲染独立宿主，Provider 不操作全局文档。 */
export function render() {
  const host = createServerCssHost();
  const html = withCssHost(host, () => renderToString(App));
  const { cssText, manifest } = serializeCssRules(host.rules());
  const styles = `<style data-zerodep-css>${cssText}</style><script type="application/json" data-zerodep-css>${manifest}</script>`;
  return { html, styles };
}
