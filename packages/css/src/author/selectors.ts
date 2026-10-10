import { joinFragments, type CssInput } from './fragments.js';

import { selectorShortcuts } from './selector-shortcuts.js';

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
