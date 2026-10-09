import { systemKeywords } from 'zerodep-js-css';
import type { UiTheme, UiColors } from 'zerodep-js-css';

// 定义导航不能以收窄为默认字面量或放宽成 any 为代价。
const border: UiTheme['borderWidth'] = {
  ...systemKeywords.borderWidth,
  _thin: '3px',
  _thick: '0.25rem',
};
const font: UiTheme['fontWeight'] = {
  ...systemKeywords.fontWeight,
  _normal: 350,
  _medium: 450,
  _semibold: 650,
  _bold: 750,
};
border._thin satisfies string | number;
font._normal satisfies string | number;
// @ts-expect-error 主题成员仍为只读。
border._thin = '4px';
// @ts-expect-error 不放开任意关键字名称。
border._unknown satisfies string;
// @ts-expect-error CSS 关键字值不能是函数。
const invalid: UiColors['_primary'] = () => 'red';
void invalid;
