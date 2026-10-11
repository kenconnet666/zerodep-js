import type { KeywordValues, SystemKeywords } from '../generated/keywords.js';
/** 保留系统关键字补全，同时接收完整 CSS 字符串。 */
export type CssString = string & {};
/** 常见项提供补全，任意原生选择器、@ 规则和动画帧均可直接输入。 */
export type CssSelector =
  | '&:hover'
  | '&:active'
  | '&:focus-visible'
  | '&:disabled'
  | '&::before'
  | '&::after'
  | '& > *'
  | '& > :first-child'
  | '& > :last-child'
  | '@media (prefers-color-scheme: dark)'
  | '@media (prefers-reduced-motion: reduce)'
  | '@supports (display: grid)'
  | 'from'
  | 'to'
  | (string & {});

/** 属性作者的输入类型，包含主题关键字、原始 CSS 值和 undefined 省略语义。 */
export type CssValue<K extends keyof KeywordValues, T extends SystemKeywords = SystemKeywords> =
  KeywordValues[K] | (keyof T[K] & `_${string}`) | undefined;
