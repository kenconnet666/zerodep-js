import { ruleText, type CssRule } from './registry.js';

/** 只处理 HTML raw-text 边界，声明的解析与层叠仍由浏览器负责。 */
export function serializeStyleRules(rules: readonly CssRule[]): string {
  return rules
    .map(ruleText)
    .join('')
    .replace(/<\/style/gi, (value) => '<\\/' + value.slice(2))
    .replace(/\r\n?/g, '\n')
    .replace(/\0/g, '\uFFFD');
}

export function serializeCssRules(rules: readonly CssRule[], options: { nonce?: string } = {}) {
  const nonce = options.nonce?.replace(
    /[&"<>]/g,
    (value) => ({ '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' })[value]!,
  );
  return {
    cssText: serializeStyleRules(rules),
    manifest: JSON.stringify(rules).replace(/</g, '\\u003c'),
    nonceAttribute: nonce === undefined ? '' : ` nonce="${nonce}"`,
  };
}
