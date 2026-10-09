import {
  ColorCss,
  ColorKeywords,
  WidthCss,
  Css,
  SystemKeywords,
  systemKeywords,
} from '../../src/index.js';

class ProjectColor extends ColorCss {
  protected override readonly name = 'outline-color';
  override readonly red: string = 'color:#123456;';
  readonly _brand: string = 'color:#654321;';
  override raw(value: string): string {
    return this.declaration(value);
  }
}
class ProjectValues extends ColorKeywords {
  override readonly red: string = '#123456';
}
class ProjectTheme extends SystemKeywords {
  override readonly color = { ...systemKeywords.color, _brand: '#123456' };
}
const color = new ProjectColor();
color.red satisfies string;
color._brand satisfies string;
new ProjectValues().red satisfies string;
new Css(new ProjectTheme()).color._brand satisfies string;
new WidthCss().px(12) satisfies string;
// @ts-expect-error 没有把关键字改为任意字符串索引。
color.notAKeyword satisfies string;
// @ts-expect-error 颜色作者不具有长度方法。
color.px(12);
// @ts-expect-error 单位方法仍要求数值。
new WidthCss().px('12');
// @ts-expect-error 默认成员仍只读。
new ColorCss().red = 'red';
