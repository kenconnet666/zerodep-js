import type { Style, StyleObject, ClassValue } from 'zerodep-js';

const generated: ClassValue = { class: 'generated', style: '--zj-color:red;' };
export const composedClass = <div class={generated} />;
export const composedAlias = <div className={generated} />;
export const composedSvg = <svg className={generated} />;
// @ts-expect-error 样式结果的值必须是 CSS 字符串。
export const invalidClass = <div class={{ class: 'invalid', style: 1 }} />;

export const style: StyleObject = {
  margin: '1rem',
  marginLeft: 0,
  opacity: 0.5,
  WebkitTransform: 'translateX(1px)',
  webkitTransform: 'none',
  '-webkit-transform': 'none',
  cssFloat: 'left',
  '--空间': 1,
  '--🚀': 'var(--空间)',
  'anchor-name': '--menu',
  containerType: 'inline-size',
  color: null,
  display: false,
};
export const serializedStyle: Style = 'color:red !important';
export const conditionalStyle = <div style={false} />;
export const inlineStyle = <svg style={{ strokeWidth: 2, '--color': 'red' }} />;
// @ts-expect-error 不向 CSS 长度隐式补单位。
export const missingUnit: StyleObject = { margin: 12 };
// @ts-expect-error 属性名保留提示，不开放任意拼写。
export const typo: StyleObject = { backgroundColour: 'red' };
// @ts-expect-error cssText 属于 DOM 接口，不是 CSS 属性。
export const cssText: StyleObject = { cssText: 'color:red' };
// @ts-expect-error 对象值不是字符串化协议。
export const object: StyleObject = { '--x': { color: 'red' } };
