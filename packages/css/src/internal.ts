import { derived, props, styleText, type Props } from 'zerodep-js/internal';

export { method as cssBinding, keyword as cssKeyword, css as cssResult } from './implicit.js';
import type { CssProps } from './implicit.js';

/** CSS 库算声明和值，框架负责派生、JSX 属性覆盖与 style 序列化。 */
export function cssProps(original: Props, calculate: () => CssProps): Props {
  const result = derived(calculate);
  return props([
    () => original,
    {
      class: () => result.read().class,
      style: () => [styleText(original.style), result.read().style].filter(Boolean).join(';'),
    },
  ]);
}
