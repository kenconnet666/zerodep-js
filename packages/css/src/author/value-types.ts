import type { KeywordValues, SystemKeywords } from '../generated/keywords.js';

/** 属性作者的输入类型，包含主题关键字、原始 CSS 值和 undefined 省略语义。 */
export type CssValue<K extends keyof KeywordValues, T extends SystemKeywords = SystemKeywords> =
  KeywordValues[K] | (keyof T[K] & `_${string}`) | undefined;
