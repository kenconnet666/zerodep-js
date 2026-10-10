import type { KeywordValues, SystemKeywords } from '../generated/keywords.js';

/** 原生声明片段；条件空项省略，只读数组按顺序展开。 */
export type CssInput = string | false | null | undefined | readonly CssInput[];

/** 选择器、动画、全局块共用；只有 css() 会另外解析本宿主的样式类。 */
export function joinFragments(parts: readonly CssInput[]): string {
  let body = '';
  for (const part of parts) {
    if (typeof part === 'string') body += part;
    else if (part) body += joinFragments(part);
  }
  return body;
}

/** 生成器与绑定编译器共用，快捷方法的命名和选择器只维护一份。 */
export const selectorShortcuts = {
  _hover: '&:hover',
  _active: '&:active',
  _focus: '&:focus',
  _focusVisible: '&:focus-visible',
  _focusWithin: '&:focus-within',
  _disabled: '&:disabled',
  _checked: '&:checked',
  _before: '&::before',
  _after: '&::after',
  _placeholder: '&::placeholder',
} as const;

/** 常见项提供补全，任意原生选择器、@ 规则和动画帧均可直接输入。 */
export type CssSelector =
  | (typeof selectorShortcuts)[keyof typeof selectorShortcuts]
  | '& > *'
  | '& > :first-child'
  | '& > :last-child'
  | '@media (prefers-color-scheme: dark)'
  | '@media (prefers-reduced-motion: reduce)'
  | '@supports (display: grid)'
  | 'from'
  | 'to'
  | (string & {});

/** 只组合声明，不读取宿主或把样式类展开；类名组合属于外层 css。 */
export function selectorRule(selector: CssSelector, parts: readonly CssInput[]): string {
  return `${selector}{${joinFragments(parts)}}`;
}

/** 属性作者的输入类型，包含主题关键字、原始 CSS 值和 undefined 省略语义。 */
export type CssValue<K extends keyof KeywordValues, T extends SystemKeywords = SystemKeywords> =
  KeywordValues[K] | (keyof T[K] & `_${string}`) | undefined;
