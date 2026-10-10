export * from './generated/author.js';
export type { CssString } from './generated/base.js';
export type { CssInput, CssSelector, CssValue } from './util/author.js';
export {
  className,
  createServerCssHost,
  serializeCssRules,
  type CssRule,
  type ServerCssHost,
} from './runtime/rules.js';
export { createCssContext } from './runtime/context.js';

// 唯一公开入口；Vite 按 browser 字段选择浏览器宿主，类型始终沿用同一份声明。
export { css, _mergeClasses, keyframes, globalCss, withCssHost } from './runtime/server.js';
export {
  hydrateCss,
  configureCss,
  disposeCss,
  cssStats,
  type BrowserCssOptions,
} from './runtime/browser.js';

// 编译器生成的调用也走包根；应用通常直接使用 css()。
export { cssBinding, cssKeyword, cssResult, cssProps, type CssProps } from './runtime/bindings.js';
