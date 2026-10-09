import { Css, WidthCss, type CssString } from '../../src/index.js';
import type { Property } from 'csstype';

const s = new Css();
s.animationPlayState.raw('running');
s.animationPlayState.raw('arbitrary-css-value');
s.animationPlayState.running satisfies string;
s.width.raw(0);
s.width.min(0, '10px');
s.opacity.max(0.25, 1);
s.fontWeight.clamp(100, 400, 900);
s.animationDuration.min('100ms', '1s');
// @ts-expect-error 宽度数学值仍需要明确单位，0 除外
s.width.min(12);
// @ts-expect-error 动画时长不接受无单位数值
s.animationDuration.min(0);
// @ts-expect-error animation-play-state 不接受数字
s.animationPlayState.raw(1);
// @ts-expect-error 颜色不接受裸数字
s.color.raw(1);
// @ts-expect-error 公共格式化实现不作为业务 API 暴露
s.width.declaration('1px');

class ProjectWidth extends WidthCss {
  readonly _md = this.rem(48);
  override raw(value: Property.Width | CssString): string {
    return super.raw(value);
  }
}
new ProjectWidth()._md satisfies string;
