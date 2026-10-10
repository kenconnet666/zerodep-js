export * from './generated/author.js';
export type { CssString } from './generated/base.js';
export type { CssRule, CssInput } from './runtime/registry.js';
export type { CssSelector } from './author/selectors.js';
export type { CssValue } from './author/value-types.js';
export { className } from './runtime/names.js';
export { createCssContext } from './theme/context.js';

// 唯一公开入口；Vite 按 browser 字段选择浏览器宿主，类型始终沿用同一份声明。
export { css, _mergeClasses, keyframes, globalCss, withCssHost } from './runtime/server.js';
export {
  hydrateCss,
  configureCss,
  disposeCss,
  cssStats,
  type BrowserCssOptions,
} from './runtime/browser.js';
export { createServerCssHost, type ServerCssHost } from './runtime/collector.js';
export { serializeCssRules } from './runtime/serialization.js';

// 编译器生成的调用也走包根；应用通常直接使用 css()。
export { cssBinding, cssKeyword, cssResult, cssProps, type CssProps } from './bindings.js';
