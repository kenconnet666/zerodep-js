import { ColorCss, Css, WidthCss } from '../../src';

class ThemeWidthCss extends WidthCss {
  readonly _md = this.raw('48rem');
}

class ThemeColorCss extends ColorCss {
  readonly brand = this.raw('rebeccapurple');
}

class ThemeCss extends Css {
  override readonly width = new ThemeWidthCss();
  override readonly color = new ThemeColorCss();
}

class AppWidthCss extends ThemeWidthCss {
  readonly _sidebar = this.raw('18rem');
}

class AppCss extends ThemeCss {
  override readonly width = new AppWidthCss();
}

const s = new AppCss();
s.width._md satisfies string;
s.width._sidebar satisfies string;
s.width.raw('20px') satisfies string;
s.width.auto satisfies string;
s.width.px(20) satisfies string;
s.padding.px(8, 16) satisfies string;
s.gap.px(8, 12) satisfies string;
s.display.flex satisfies string;
s.justifyContent.spaceBetween satisfies string;
s.borderRadius.px(8) satisfies string;
s.gridTemplateColumns.raw('1fr 2fr') satisfies string;
s.fill.red satisfies string;
s.d.raw('path("M0 0")') satisfies string;
s.opacity.raw(0.5) satisfies string;
s.color.brand satisfies string;
s.color.red satisfies string;
// @ts-expect-error opacity 不接受长度单位
s.opacity.px(0.5);
// @ts-expect-error 普通属性只接受一个 px 参数
s.width.px(8, 16);
// @ts-expect-error width.raw 的非零数字应明确选择单位
s.width.raw(24);
// @ts-expect-error 时间属性不是长度属性
s.animationDuration.px(200);
