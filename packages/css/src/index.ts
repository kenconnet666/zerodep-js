export * from './generated/author.js';
export * from './generated/keywords.js';
export type { CssString, CssSelector, CssValue } from './util/author.js';
export {
  bx,
  type CssBinding,
  type CssAnimation,
  type CssProgram as CssClass,
  type PropertyInput as CssInput,
} from './runtime/program.js';
export {
  createServerCssHost,
  serializeCssRules,
  type CssRule,
  type ServerCssHost,
} from './runtime/rules.js';
export { createCssContext } from './runtime/context.js';

// 唯一公开入口；Vite 按 browser 字段选择浏览器宿主，类型始终沿用同一份声明。
export { css, keyframes, globalCss, withCssHost, _themeStyle } from './runtime/server.js';
export {
  hydrateCss,
  configureCss,
  disposeCss,
  cssStats,
  type BrowserCssOptions,
} from './runtime/browser.js';
