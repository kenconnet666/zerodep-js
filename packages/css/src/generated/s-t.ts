// 由 scripts/generate-css-author.mjs 从 csstype@3.2.3 生成；请勿手改。
// 来源许可见 packages/css/THIRD_PARTY_NOTICES.md。
import type { Property } from 'csstype';
import { CssProperty, LengthCssProperty, type CssString } from './base.js';
import { initializeKeywordDeclarations } from '../util/keywords.js';
import type { KeywordDeclarations, KeywordValuesOf } from '../util/keywords.js';
// 关键字是实例上的声明字符串；系统实例按属性链惰性创建并共享。
import { noneKeywords } from './keyword-sets.js';

/**
 * scale 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScaleKeywords = KeywordValuesOf<typeof noneKeywords, Property.Scale | CssString>;
/**
 * 创建 scale 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScaleKeywords()
 */
export const ScaleKeywords = class ScaleKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => ScaleKeywords;

/**
 * scale 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScaleCssRuntime extends CssProperty {
  /**
   * 创建 scale 属性作者；普通使用通过 s.scale 取得共享实例。
   * @example
   * class CustomScaleCss extends ScaleCss {}
   */
  constructor() {
    super('scale');
    initializeKeywordDeclarations(this, 'scale', noneKeywords);
  }
  /**
   * 原样生成 scale 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scale:value;，undefined 返回空字符串。
   * @example
   * s.scale.raw('inherit') // scale:inherit;
   */
  raw(value: Property.Scale | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 X 和 Y 缩放的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scale.percent(1)
   */
  percent(value1: number): string;
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 X 缩放的数值，自动附加 %。
   * @param value2 Y 缩放的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scale.percent(1, 2)
   */
  percent(value1: number, value2: number): string;
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 X 缩放的数值，自动附加 %。
   * @param value2 Y 缩放的数值，自动附加 %。
   * @param value3 Z 缩放的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scale.percent(1, 2, 3)
   */
  percent(value1: number, value2: number, value3: number): string;
  percent(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}%`).join(' '));
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scale.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scale.min('var(--first)', 'var(--second)')
   */
  min(value: Property.Scale | CssString, ...others: (Property.Scale | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scale.max('var(--first)', 'var(--second)')
   */
  max(value: Property.Scale | CssString, ...others: (Property.Scale | CssString)[]): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scale.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Scale | CssString,
    preferred: Property.Scale | CssString,
    maximum: Property.Scale | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scale 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScaleCss = ScaleCssRuntime & KeywordDeclarations<ScaleKeywords>;
/**
 * 独立设置元素的缩放比例。（scale）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scale
 */
export const ScaleCss = ScaleCssRuntime as new () => ScaleCss;
import { scrollBehaviorKeywords } from './keyword-sets.js';

/**
 * scroll-behavior 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollBehaviorKeywords = KeywordValuesOf<
  typeof scrollBehaviorKeywords,
  Property.ScrollBehavior | CssString
>;
/**
 * 创建 scroll-behavior 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollBehaviorKeywords()
 */
export const ScrollBehaviorKeywords = class ScrollBehaviorKeywords {
  constructor() {
    Object.assign(this, scrollBehaviorKeywords);
  }
} as new () => ScrollBehaviorKeywords;

/**
 * scroll-behavior 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollBehaviorCssRuntime extends CssProperty {
  /**
   * 创建 scroll-behavior 属性作者；普通使用通过 s.scrollBehavior 取得共享实例。
   * @example
   * class CustomScrollBehaviorCss extends ScrollBehaviorCss {}
   */
  constructor() {
    super('scroll-behavior');
    initializeKeywordDeclarations(this, 'scroll-behavior', scrollBehaviorKeywords);
  }
  /**
   * 原样生成 scroll-behavior 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-behavior:value;，undefined 返回空字符串。
   * @example
   * s.scrollBehavior.raw('inherit') // scroll-behavior:inherit;
   */
  raw(value: Property.ScrollBehavior | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * scroll-behavior 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollBehaviorCss = ScrollBehaviorCssRuntime &
  KeywordDeclarations<ScrollBehaviorKeywords>;
/**
 * 设置由导航或滚动 API 触发的滚动采用即时还是平滑方式。（scroll-behavior）
 *
 * 主要影响导航和滚动 API 触发的滚动，不会把所有用户滚动强制变成动画。
 *
 * 适用场景：锚点跳转或程序化滚动；应同时考虑减少动态效果的用户偏好。
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @example
 * s.scrollBehavior.smooth
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-behavior
 */
export const ScrollBehaviorCss = ScrollBehaviorCssRuntime as new () => ScrollBehaviorCss;
import { scrollInitialTargetKeywords } from './keyword-sets.js';

/**
 * scroll-initial-target 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollInitialTargetKeywords = KeywordValuesOf<
  typeof scrollInitialTargetKeywords,
  Property.ScrollInitialTarget | CssString
>;
/**
 * 创建 scroll-initial-target 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollInitialTargetKeywords()
 */
export const ScrollInitialTargetKeywords = class ScrollInitialTargetKeywords {
  constructor() {
    Object.assign(this, scrollInitialTargetKeywords);
  }
} as new () => ScrollInitialTargetKeywords;

/**
 * scroll-initial-target 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollInitialTargetCssRuntime extends CssProperty {
  /**
   * 创建 scroll-initial-target 属性作者；普通使用通过 s.scrollInitialTarget 取得共享实例。
   * @example
   * class CustomScrollInitialTargetCss extends ScrollInitialTargetCss {}
   */
  constructor() {
    super('scroll-initial-target');
    initializeKeywordDeclarations(this, 'scroll-initial-target', scrollInitialTargetKeywords);
  }
  /**
   * 原样生成 scroll-initial-target 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-initial-target:value;，undefined 返回空字符串。
   * @example
   * s.scrollInitialTarget.raw('inherit') // scroll-initial-target:inherit;
   */
  raw(value: Property.ScrollInitialTarget | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * scroll-initial-target 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollInitialTargetCss = ScrollInitialTargetCssRuntime &
  KeywordDeclarations<ScrollInitialTargetKeywords>;
/**
 * 将元素声明为祖先滚动容器首次呈现时的候选滚动吸附目标。（scroll-initial-target）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-initial-target
 */
export const ScrollInitialTargetCss =
  ScrollInitialTargetCssRuntime as new () => ScrollInitialTargetCss;
import { globalKeywords } from './keyword-sets.js';

/**
 * scroll-margin 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollMarginKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMargin | CssString
>;
/**
 * 创建 scroll-margin 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollMarginKeywords()
 */
export const ScrollMarginKeywords = class ScrollMarginKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollMarginKeywords;

/**
 * scroll-margin 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollMarginCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-margin 属性作者；普通使用通过 s.scrollMargin 取得共享实例。
   * @example
   * class CustomScrollMarginCss extends ScrollMarginCss {}
   */
  constructor() {
    super('scroll-margin');
    initializeKeywordDeclarations(this, 'scroll-margin', globalKeywords);
  }
  /**
   * 原样生成 scroll-margin 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-margin:value;，undefined 返回空字符串。
   * @example
   * s.scrollMargin.raw('inherit') // scroll-margin:inherit;
   */
  raw(value: Property.ScrollMargin | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.px(1)
   */
  px(value1: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 px。
   * @param value2 左、右的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.px(1, 2)
   */
  px(value1: number, value2: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 px。
   * @param value2 左、右的数值，自动附加 px。
   * @param value3 下的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.px(1, 2, 3)
   */
  px(value1: number, value2: number, value3: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 px。
   * @param value2 右的数值，自动附加 px。
   * @param value3 下的数值，自动附加 px。
   * @param value4 左的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.px(1, 2, 3, 4)
   */
  px(value1: number, value2: number, value3: number, value4: number): string;
  override px(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}px`).join(' '));
  }
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cm(1)
   */
  cm(value1: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cm。
   * @param value2 左、右的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cm(1, 2)
   */
  cm(value1: number, value2: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cm。
   * @param value2 左、右的数值，自动附加 cm。
   * @param value3 下的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cm(1, 2, 3)
   */
  cm(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cm。
   * @param value2 右的数值，自动附加 cm。
   * @param value3 下的数值，自动附加 cm。
   * @param value4 左的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cm(1, 2, 3, 4)
   */
  cm(value1: number, value2: number, value3: number, value4: number): string;
  override cm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cm`).join(' '));
  }
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.mm(1)
   */
  mm(value1: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 mm。
   * @param value2 左、右的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.mm(1, 2)
   */
  mm(value1: number, value2: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 mm。
   * @param value2 左、右的数值，自动附加 mm。
   * @param value3 下的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.mm(1, 2, 3)
   */
  mm(value1: number, value2: number, value3: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 mm。
   * @param value2 右的数值，自动附加 mm。
   * @param value3 下的数值，自动附加 mm。
   * @param value4 左的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.mm(1, 2, 3, 4)
   */
  mm(value1: number, value2: number, value3: number, value4: number): string;
  override mm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}mm`).join(' '));
  }
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.q(1)
   */
  q(value1: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 q。
   * @param value2 左、右的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.q(1, 2)
   */
  q(value1: number, value2: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 q。
   * @param value2 左、右的数值，自动附加 q。
   * @param value3 下的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.q(1, 2, 3)
   */
  q(value1: number, value2: number, value3: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 q。
   * @param value2 右的数值，自动附加 q。
   * @param value3 下的数值，自动附加 q。
   * @param value4 左的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.q(1, 2, 3, 4)
   */
  q(value1: number, value2: number, value3: number, value4: number): string;
  override q(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}q`).join(' '));
  }
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.in(1)
   */
  in(value1: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 in。
   * @param value2 左、右的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.in(1, 2)
   */
  in(value1: number, value2: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 in。
   * @param value2 左、右的数值，自动附加 in。
   * @param value3 下的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.in(1, 2, 3)
   */
  in(value1: number, value2: number, value3: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 in。
   * @param value2 右的数值，自动附加 in。
   * @param value3 下的数值，自动附加 in。
   * @param value4 左的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.in(1, 2, 3, 4)
   */
  in(value1: number, value2: number, value3: number, value4: number): string;
  override in(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}in`).join(' '));
  }
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.pt(1)
   */
  pt(value1: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 pt。
   * @param value2 左、右的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.pt(1, 2)
   */
  pt(value1: number, value2: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 pt。
   * @param value2 左、右的数值，自动附加 pt。
   * @param value3 下的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.pt(1, 2, 3)
   */
  pt(value1: number, value2: number, value3: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 pt。
   * @param value2 右的数值，自动附加 pt。
   * @param value3 下的数值，自动附加 pt。
   * @param value4 左的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.pt(1, 2, 3, 4)
   */
  pt(value1: number, value2: number, value3: number, value4: number): string;
  override pt(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pt`).join(' '));
  }
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.pc(1)
   */
  pc(value1: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 pc。
   * @param value2 左、右的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.pc(1, 2)
   */
  pc(value1: number, value2: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 pc。
   * @param value2 左、右的数值，自动附加 pc。
   * @param value3 下的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.pc(1, 2, 3)
   */
  pc(value1: number, value2: number, value3: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 pc。
   * @param value2 右的数值，自动附加 pc。
   * @param value3 下的数值，自动附加 pc。
   * @param value4 左的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.pc(1, 2, 3, 4)
   */
  pc(value1: number, value2: number, value3: number, value4: number): string;
  override pc(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pc`).join(' '));
  }
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.em(1)
   */
  em(value1: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 em。
   * @param value2 左、右的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.em(1, 2)
   */
  em(value1: number, value2: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 em。
   * @param value2 左、右的数值，自动附加 em。
   * @param value3 下的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.em(1, 2, 3)
   */
  em(value1: number, value2: number, value3: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 em。
   * @param value2 右的数值，自动附加 em。
   * @param value3 下的数值，自动附加 em。
   * @param value4 左的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.em(1, 2, 3, 4)
   */
  em(value1: number, value2: number, value3: number, value4: number): string;
  override em(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}em`).join(' '));
  }
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rem(1)
   */
  rem(value1: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rem。
   * @param value2 左、右的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rem(1, 2)
   */
  rem(value1: number, value2: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rem。
   * @param value2 左、右的数值，自动附加 rem。
   * @param value3 下的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rem(1, 2, 3)
   */
  rem(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rem。
   * @param value2 右的数值，自动附加 rem。
   * @param value3 下的数值，自动附加 rem。
   * @param value4 左的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rem(1, 2, 3, 4)
   */
  rem(value1: number, value2: number, value3: number, value4: number): string;
  override rem(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rem`).join(' '));
  }
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ex(1)
   */
  ex(value1: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 ex。
   * @param value2 左、右的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ex(1, 2)
   */
  ex(value1: number, value2: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ex。
   * @param value2 左、右的数值，自动附加 ex。
   * @param value3 下的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ex(1, 2, 3)
   */
  ex(value1: number, value2: number, value3: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ex。
   * @param value2 右的数值，自动附加 ex。
   * @param value3 下的数值，自动附加 ex。
   * @param value4 左的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ex(1, 2, 3, 4)
   */
  ex(value1: number, value2: number, value3: number, value4: number): string;
  override ex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ex`).join(' '));
  }
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rex(1)
   */
  rex(value1: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rex。
   * @param value2 左、右的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rex(1, 2)
   */
  rex(value1: number, value2: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rex。
   * @param value2 左、右的数值，自动附加 rex。
   * @param value3 下的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rex(1, 2, 3)
   */
  rex(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rex。
   * @param value2 右的数值，自动附加 rex。
   * @param value3 下的数值，自动附加 rex。
   * @param value4 左的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rex(1, 2, 3, 4)
   */
  rex(value1: number, value2: number, value3: number, value4: number): string;
  override rex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rex`).join(' '));
  }
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ch(1)
   */
  ch(value1: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 ch。
   * @param value2 左、右的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ch(1, 2)
   */
  ch(value1: number, value2: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ch。
   * @param value2 左、右的数值，自动附加 ch。
   * @param value3 下的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ch(1, 2, 3)
   */
  ch(value1: number, value2: number, value3: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ch。
   * @param value2 右的数值，自动附加 ch。
   * @param value3 下的数值，自动附加 ch。
   * @param value4 左的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ch(1, 2, 3, 4)
   */
  ch(value1: number, value2: number, value3: number, value4: number): string;
  override ch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ch`).join(' '));
  }
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rch(1)
   */
  rch(value1: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rch。
   * @param value2 左、右的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rch(1, 2)
   */
  rch(value1: number, value2: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rch。
   * @param value2 左、右的数值，自动附加 rch。
   * @param value3 下的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rch(1, 2, 3)
   */
  rch(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rch。
   * @param value2 右的数值，自动附加 rch。
   * @param value3 下的数值，自动附加 rch。
   * @param value4 左的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rch(1, 2, 3, 4)
   */
  rch(value1: number, value2: number, value3: number, value4: number): string;
  override rch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rch`).join(' '));
  }
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cap(1)
   */
  cap(value1: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cap。
   * @param value2 左、右的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cap(1, 2)
   */
  cap(value1: number, value2: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cap。
   * @param value2 左、右的数值，自动附加 cap。
   * @param value3 下的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cap(1, 2, 3)
   */
  cap(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cap。
   * @param value2 右的数值，自动附加 cap。
   * @param value3 下的数值，自动附加 cap。
   * @param value4 左的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cap(1, 2, 3, 4)
   */
  cap(value1: number, value2: number, value3: number, value4: number): string;
  override cap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cap`).join(' '));
  }
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rcap(1)
   */
  rcap(value1: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rcap。
   * @param value2 左、右的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rcap(1, 2)
   */
  rcap(value1: number, value2: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rcap。
   * @param value2 左、右的数值，自动附加 rcap。
   * @param value3 下的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rcap(1, 2, 3)
   */
  rcap(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rcap。
   * @param value2 右的数值，自动附加 rcap。
   * @param value3 下的数值，自动附加 rcap。
   * @param value4 左的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rcap(1, 2, 3, 4)
   */
  rcap(value1: number, value2: number, value3: number, value4: number): string;
  override rcap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rcap`).join(' '));
  }
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ic(1)
   */
  ic(value1: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 ic。
   * @param value2 左、右的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ic(1, 2)
   */
  ic(value1: number, value2: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ic。
   * @param value2 左、右的数值，自动附加 ic。
   * @param value3 下的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ic(1, 2, 3)
   */
  ic(value1: number, value2: number, value3: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ic。
   * @param value2 右的数值，自动附加 ic。
   * @param value3 下的数值，自动附加 ic。
   * @param value4 左的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ic(1, 2, 3, 4)
   */
  ic(value1: number, value2: number, value3: number, value4: number): string;
  override ic(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ic`).join(' '));
  }
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ric(1)
   */
  ric(value1: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 ric。
   * @param value2 左、右的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ric(1, 2)
   */
  ric(value1: number, value2: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ric。
   * @param value2 左、右的数值，自动附加 ric。
   * @param value3 下的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ric(1, 2, 3)
   */
  ric(value1: number, value2: number, value3: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ric。
   * @param value2 右的数值，自动附加 ric。
   * @param value3 下的数值，自动附加 ric。
   * @param value4 左的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.ric(1, 2, 3, 4)
   */
  ric(value1: number, value2: number, value3: number, value4: number): string;
  override ric(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ric`).join(' '));
  }
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lh(1)
   */
  lh(value1: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lh。
   * @param value2 左、右的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lh(1, 2)
   */
  lh(value1: number, value2: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lh。
   * @param value2 左、右的数值，自动附加 lh。
   * @param value3 下的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lh(1, 2, 3)
   */
  lh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lh。
   * @param value2 右的数值，自动附加 lh。
   * @param value3 下的数值，自动附加 lh。
   * @param value4 左的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lh(1, 2, 3, 4)
   */
  lh(value1: number, value2: number, value3: number, value4: number): string;
  override lh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lh`).join(' '));
  }
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rlh(1)
   */
  rlh(value1: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rlh。
   * @param value2 左、右的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rlh(1, 2)
   */
  rlh(value1: number, value2: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rlh。
   * @param value2 左、右的数值，自动附加 rlh。
   * @param value3 下的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rlh(1, 2, 3)
   */
  rlh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rlh。
   * @param value2 右的数值，自动附加 rlh。
   * @param value3 下的数值，自动附加 rlh。
   * @param value4 左的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.rlh(1, 2, 3, 4)
   */
  rlh(value1: number, value2: number, value3: number, value4: number): string;
  override rlh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rlh`).join(' '));
  }
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vw(1)
   */
  vw(value1: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vw。
   * @param value2 左、右的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vw(1, 2)
   */
  vw(value1: number, value2: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vw。
   * @param value2 左、右的数值，自动附加 vw。
   * @param value3 下的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vw(1, 2, 3)
   */
  vw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vw。
   * @param value2 右的数值，自动附加 vw。
   * @param value3 下的数值，自动附加 vw。
   * @param value4 左的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vw(1, 2, 3, 4)
   */
  vw(value1: number, value2: number, value3: number, value4: number): string;
  override vw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vw`).join(' '));
  }
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vh(1)
   */
  vh(value1: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vh。
   * @param value2 左、右的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vh(1, 2)
   */
  vh(value1: number, value2: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vh。
   * @param value2 左、右的数值，自动附加 vh。
   * @param value3 下的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vh(1, 2, 3)
   */
  vh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vh。
   * @param value2 右的数值，自动附加 vh。
   * @param value3 下的数值，自动附加 vh。
   * @param value4 左的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vh(1, 2, 3, 4)
   */
  vh(value1: number, value2: number, value3: number, value4: number): string;
  override vh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vh`).join(' '));
  }
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vi(1)
   */
  vi(value1: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vi。
   * @param value2 左、右的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vi(1, 2)
   */
  vi(value1: number, value2: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vi。
   * @param value2 左、右的数值，自动附加 vi。
   * @param value3 下的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vi(1, 2, 3)
   */
  vi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vi。
   * @param value2 右的数值，自动附加 vi。
   * @param value3 下的数值，自动附加 vi。
   * @param value4 左的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vi(1, 2, 3, 4)
   */
  vi(value1: number, value2: number, value3: number, value4: number): string;
  override vi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vi`).join(' '));
  }
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vb(1)
   */
  vb(value1: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vb。
   * @param value2 左、右的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vb(1, 2)
   */
  vb(value1: number, value2: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vb。
   * @param value2 左、右的数值，自动附加 vb。
   * @param value3 下的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vb(1, 2, 3)
   */
  vb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vb。
   * @param value2 右的数值，自动附加 vb。
   * @param value3 下的数值，自动附加 vb。
   * @param value4 左的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vb(1, 2, 3, 4)
   */
  vb(value1: number, value2: number, value3: number, value4: number): string;
  override vb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vb`).join(' '));
  }
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vmin(1)
   */
  vmin(value1: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vmin。
   * @param value2 左、右的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vmin(1, 2)
   */
  vmin(value1: number, value2: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vmin。
   * @param value2 左、右的数值，自动附加 vmin。
   * @param value3 下的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vmin(1, 2, 3)
   */
  vmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vmin。
   * @param value2 右的数值，自动附加 vmin。
   * @param value3 下的数值，自动附加 vmin。
   * @param value4 左的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vmin(1, 2, 3, 4)
   */
  vmin(value1: number, value2: number, value3: number, value4: number): string;
  override vmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmin`).join(' '));
  }
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vmax(1)
   */
  vmax(value1: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vmax。
   * @param value2 左、右的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vmax(1, 2)
   */
  vmax(value1: number, value2: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vmax。
   * @param value2 左、右的数值，自动附加 vmax。
   * @param value3 下的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vmax(1, 2, 3)
   */
  vmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vmax。
   * @param value2 右的数值，自动附加 vmax。
   * @param value3 下的数值，自动附加 vmax。
   * @param value4 左的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.vmax(1, 2, 3, 4)
   */
  vmax(value1: number, value2: number, value3: number, value4: number): string;
  override vmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmax`).join(' '));
  }
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svw(1)
   */
  svw(value1: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svw。
   * @param value2 左、右的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svw(1, 2)
   */
  svw(value1: number, value2: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svw。
   * @param value2 左、右的数值，自动附加 svw。
   * @param value3 下的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svw(1, 2, 3)
   */
  svw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svw。
   * @param value2 右的数值，自动附加 svw。
   * @param value3 下的数值，自动附加 svw。
   * @param value4 左的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svw(1, 2, 3, 4)
   */
  svw(value1: number, value2: number, value3: number, value4: number): string;
  override svw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svw`).join(' '));
  }
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svh(1)
   */
  svh(value1: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svh。
   * @param value2 左、右的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svh(1, 2)
   */
  svh(value1: number, value2: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svh。
   * @param value2 左、右的数值，自动附加 svh。
   * @param value3 下的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svh(1, 2, 3)
   */
  svh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svh。
   * @param value2 右的数值，自动附加 svh。
   * @param value3 下的数值，自动附加 svh。
   * @param value4 左的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svh(1, 2, 3, 4)
   */
  svh(value1: number, value2: number, value3: number, value4: number): string;
  override svh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svh`).join(' '));
  }
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svi(1)
   */
  svi(value1: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svi。
   * @param value2 左、右的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svi(1, 2)
   */
  svi(value1: number, value2: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svi。
   * @param value2 左、右的数值，自动附加 svi。
   * @param value3 下的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svi(1, 2, 3)
   */
  svi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svi。
   * @param value2 右的数值，自动附加 svi。
   * @param value3 下的数值，自动附加 svi。
   * @param value4 左的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svi(1, 2, 3, 4)
   */
  svi(value1: number, value2: number, value3: number, value4: number): string;
  override svi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svi`).join(' '));
  }
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svb(1)
   */
  svb(value1: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svb。
   * @param value2 左、右的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svb(1, 2)
   */
  svb(value1: number, value2: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svb。
   * @param value2 左、右的数值，自动附加 svb。
   * @param value3 下的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svb(1, 2, 3)
   */
  svb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svb。
   * @param value2 右的数值，自动附加 svb。
   * @param value3 下的数值，自动附加 svb。
   * @param value4 左的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svb(1, 2, 3, 4)
   */
  svb(value1: number, value2: number, value3: number, value4: number): string;
  override svb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svb`).join(' '));
  }
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svmin(1)
   */
  svmin(value1: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svmin。
   * @param value2 左、右的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svmin(1, 2)
   */
  svmin(value1: number, value2: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svmin。
   * @param value2 左、右的数值，自动附加 svmin。
   * @param value3 下的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svmin(1, 2, 3)
   */
  svmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svmin。
   * @param value2 右的数值，自动附加 svmin。
   * @param value3 下的数值，自动附加 svmin。
   * @param value4 左的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svmin(1, 2, 3, 4)
   */
  svmin(value1: number, value2: number, value3: number, value4: number): string;
  override svmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmin`).join(' '));
  }
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svmax(1)
   */
  svmax(value1: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svmax。
   * @param value2 左、右的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svmax(1, 2)
   */
  svmax(value1: number, value2: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svmax。
   * @param value2 左、右的数值，自动附加 svmax。
   * @param value3 下的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svmax(1, 2, 3)
   */
  svmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svmax。
   * @param value2 右的数值，自动附加 svmax。
   * @param value3 下的数值，自动附加 svmax。
   * @param value4 左的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.svmax(1, 2, 3, 4)
   */
  svmax(value1: number, value2: number, value3: number, value4: number): string;
  override svmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmax`).join(' '));
  }
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvw(1)
   */
  lvw(value1: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvw。
   * @param value2 左、右的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvw(1, 2)
   */
  lvw(value1: number, value2: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvw。
   * @param value2 左、右的数值，自动附加 lvw。
   * @param value3 下的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvw(1, 2, 3)
   */
  lvw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvw。
   * @param value2 右的数值，自动附加 lvw。
   * @param value3 下的数值，自动附加 lvw。
   * @param value4 左的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvw(1, 2, 3, 4)
   */
  lvw(value1: number, value2: number, value3: number, value4: number): string;
  override lvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvw`).join(' '));
  }
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvh(1)
   */
  lvh(value1: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvh。
   * @param value2 左、右的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvh(1, 2)
   */
  lvh(value1: number, value2: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvh。
   * @param value2 左、右的数值，自动附加 lvh。
   * @param value3 下的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvh(1, 2, 3)
   */
  lvh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvh。
   * @param value2 右的数值，自动附加 lvh。
   * @param value3 下的数值，自动附加 lvh。
   * @param value4 左的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvh(1, 2, 3, 4)
   */
  lvh(value1: number, value2: number, value3: number, value4: number): string;
  override lvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvh`).join(' '));
  }
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvi(1)
   */
  lvi(value1: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvi。
   * @param value2 左、右的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvi(1, 2)
   */
  lvi(value1: number, value2: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvi。
   * @param value2 左、右的数值，自动附加 lvi。
   * @param value3 下的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvi(1, 2, 3)
   */
  lvi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvi。
   * @param value2 右的数值，自动附加 lvi。
   * @param value3 下的数值，自动附加 lvi。
   * @param value4 左的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvi(1, 2, 3, 4)
   */
  lvi(value1: number, value2: number, value3: number, value4: number): string;
  override lvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvi`).join(' '));
  }
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvb(1)
   */
  lvb(value1: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvb。
   * @param value2 左、右的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvb(1, 2)
   */
  lvb(value1: number, value2: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvb。
   * @param value2 左、右的数值，自动附加 lvb。
   * @param value3 下的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvb(1, 2, 3)
   */
  lvb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvb。
   * @param value2 右的数值，自动附加 lvb。
   * @param value3 下的数值，自动附加 lvb。
   * @param value4 左的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvb(1, 2, 3, 4)
   */
  lvb(value1: number, value2: number, value3: number, value4: number): string;
  override lvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvb`).join(' '));
  }
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvmin(1)
   */
  lvmin(value1: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvmin。
   * @param value2 左、右的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvmin(1, 2)
   */
  lvmin(value1: number, value2: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvmin。
   * @param value2 左、右的数值，自动附加 lvmin。
   * @param value3 下的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvmin(1, 2, 3)
   */
  lvmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvmin。
   * @param value2 右的数值，自动附加 lvmin。
   * @param value3 下的数值，自动附加 lvmin。
   * @param value4 左的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvmin(1, 2, 3, 4)
   */
  lvmin(value1: number, value2: number, value3: number, value4: number): string;
  override lvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmin`).join(' '));
  }
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvmax(1)
   */
  lvmax(value1: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvmax。
   * @param value2 左、右的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvmax(1, 2)
   */
  lvmax(value1: number, value2: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvmax。
   * @param value2 左、右的数值，自动附加 lvmax。
   * @param value3 下的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvmax(1, 2, 3)
   */
  lvmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvmax。
   * @param value2 右的数值，自动附加 lvmax。
   * @param value3 下的数值，自动附加 lvmax。
   * @param value4 左的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.lvmax(1, 2, 3, 4)
   */
  lvmax(value1: number, value2: number, value3: number, value4: number): string;
  override lvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmax`).join(' '));
  }
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvw(1)
   */
  dvw(value1: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvw。
   * @param value2 左、右的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvw(1, 2)
   */
  dvw(value1: number, value2: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvw。
   * @param value2 左、右的数值，自动附加 dvw。
   * @param value3 下的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvw(1, 2, 3)
   */
  dvw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvw。
   * @param value2 右的数值，自动附加 dvw。
   * @param value3 下的数值，自动附加 dvw。
   * @param value4 左的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvw(1, 2, 3, 4)
   */
  dvw(value1: number, value2: number, value3: number, value4: number): string;
  override dvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvw`).join(' '));
  }
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvh(1)
   */
  dvh(value1: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvh。
   * @param value2 左、右的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvh(1, 2)
   */
  dvh(value1: number, value2: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvh。
   * @param value2 左、右的数值，自动附加 dvh。
   * @param value3 下的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvh(1, 2, 3)
   */
  dvh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvh。
   * @param value2 右的数值，自动附加 dvh。
   * @param value3 下的数值，自动附加 dvh。
   * @param value4 左的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvh(1, 2, 3, 4)
   */
  dvh(value1: number, value2: number, value3: number, value4: number): string;
  override dvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvh`).join(' '));
  }
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvi(1)
   */
  dvi(value1: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvi。
   * @param value2 左、右的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvi(1, 2)
   */
  dvi(value1: number, value2: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvi。
   * @param value2 左、右的数值，自动附加 dvi。
   * @param value3 下的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvi(1, 2, 3)
   */
  dvi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvi。
   * @param value2 右的数值，自动附加 dvi。
   * @param value3 下的数值，自动附加 dvi。
   * @param value4 左的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvi(1, 2, 3, 4)
   */
  dvi(value1: number, value2: number, value3: number, value4: number): string;
  override dvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvi`).join(' '));
  }
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvb(1)
   */
  dvb(value1: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvb。
   * @param value2 左、右的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvb(1, 2)
   */
  dvb(value1: number, value2: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvb。
   * @param value2 左、右的数值，自动附加 dvb。
   * @param value3 下的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvb(1, 2, 3)
   */
  dvb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvb。
   * @param value2 右的数值，自动附加 dvb。
   * @param value3 下的数值，自动附加 dvb。
   * @param value4 左的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvb(1, 2, 3, 4)
   */
  dvb(value1: number, value2: number, value3: number, value4: number): string;
  override dvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvb`).join(' '));
  }
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvmin(1)
   */
  dvmin(value1: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvmin。
   * @param value2 左、右的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvmin(1, 2)
   */
  dvmin(value1: number, value2: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvmin。
   * @param value2 左、右的数值，自动附加 dvmin。
   * @param value3 下的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvmin(1, 2, 3)
   */
  dvmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvmin。
   * @param value2 右的数值，自动附加 dvmin。
   * @param value3 下的数值，自动附加 dvmin。
   * @param value4 左的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvmin(1, 2, 3, 4)
   */
  dvmin(value1: number, value2: number, value3: number, value4: number): string;
  override dvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmin`).join(' '));
  }
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvmax(1)
   */
  dvmax(value1: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvmax。
   * @param value2 左、右的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvmax(1, 2)
   */
  dvmax(value1: number, value2: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvmax。
   * @param value2 左、右的数值，自动附加 dvmax。
   * @param value3 下的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvmax(1, 2, 3)
   */
  dvmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvmax。
   * @param value2 右的数值，自动附加 dvmax。
   * @param value3 下的数值，自动附加 dvmax。
   * @param value4 左的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.dvmax(1, 2, 3, 4)
   */
  dvmax(value1: number, value2: number, value3: number, value4: number): string;
  override dvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmax`).join(' '));
  }
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqw(1)
   */
  cqw(value1: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqw。
   * @param value2 左、右的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqw(1, 2)
   */
  cqw(value1: number, value2: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqw。
   * @param value2 左、右的数值，自动附加 cqw。
   * @param value3 下的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqw(1, 2, 3)
   */
  cqw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqw。
   * @param value2 右的数值，自动附加 cqw。
   * @param value3 下的数值，自动附加 cqw。
   * @param value4 左的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqw(1, 2, 3, 4)
   */
  cqw(value1: number, value2: number, value3: number, value4: number): string;
  override cqw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqw`).join(' '));
  }
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqh(1)
   */
  cqh(value1: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqh。
   * @param value2 左、右的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqh(1, 2)
   */
  cqh(value1: number, value2: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqh。
   * @param value2 左、右的数值，自动附加 cqh。
   * @param value3 下的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqh(1, 2, 3)
   */
  cqh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqh。
   * @param value2 右的数值，自动附加 cqh。
   * @param value3 下的数值，自动附加 cqh。
   * @param value4 左的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqh(1, 2, 3, 4)
   */
  cqh(value1: number, value2: number, value3: number, value4: number): string;
  override cqh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqh`).join(' '));
  }
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqi(1)
   */
  cqi(value1: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqi。
   * @param value2 左、右的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqi(1, 2)
   */
  cqi(value1: number, value2: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqi。
   * @param value2 左、右的数值，自动附加 cqi。
   * @param value3 下的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqi(1, 2, 3)
   */
  cqi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqi。
   * @param value2 右的数值，自动附加 cqi。
   * @param value3 下的数值，自动附加 cqi。
   * @param value4 左的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqi(1, 2, 3, 4)
   */
  cqi(value1: number, value2: number, value3: number, value4: number): string;
  override cqi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqi`).join(' '));
  }
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqb(1)
   */
  cqb(value1: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqb。
   * @param value2 左、右的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqb(1, 2)
   */
  cqb(value1: number, value2: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqb。
   * @param value2 左、右的数值，自动附加 cqb。
   * @param value3 下的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqb(1, 2, 3)
   */
  cqb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqb。
   * @param value2 右的数值，自动附加 cqb。
   * @param value3 下的数值，自动附加 cqb。
   * @param value4 左的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqb(1, 2, 3, 4)
   */
  cqb(value1: number, value2: number, value3: number, value4: number): string;
  override cqb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqb`).join(' '));
  }
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqmin(1)
   */
  cqmin(value1: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqmin。
   * @param value2 左、右的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqmin(1, 2)
   */
  cqmin(value1: number, value2: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqmin。
   * @param value2 左、右的数值，自动附加 cqmin。
   * @param value3 下的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqmin(1, 2, 3)
   */
  cqmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqmin。
   * @param value2 右的数值，自动附加 cqmin。
   * @param value3 下的数值，自动附加 cqmin。
   * @param value4 左的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqmin(1, 2, 3, 4)
   */
  cqmin(value1: number, value2: number, value3: number, value4: number): string;
  override cqmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmin`).join(' '));
  }
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqmax(1)
   */
  cqmax(value1: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqmax。
   * @param value2 左、右的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqmax(1, 2)
   */
  cqmax(value1: number, value2: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqmax。
   * @param value2 左、右的数值，自动附加 cqmax。
   * @param value3 下的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqmax(1, 2, 3)
   */
  cqmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqmax。
   * @param value2 右的数值，自动附加 cqmax。
   * @param value3 下的数值，自动附加 cqmax。
   * @param value4 左的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMargin.cqmax(1, 2, 3, 4)
   */
  cqmax(value1: number, value2: number, value3: number, value4: number): string;
  override cqmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmax`).join(' '));
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollMargin.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollMargin.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMargin | CssString,
    ...others: (Property.ScrollMargin | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollMargin.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMargin | CssString,
    ...others: (Property.ScrollMargin | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollMargin.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMargin | CssString,
    preferred: Property.ScrollMargin | CssString,
    maximum: Property.ScrollMargin | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-margin 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollMarginCss = ScrollMarginCssRuntime & KeywordDeclarations<ScrollMarginKeywords>;
/**
 * 设置元素滚动目标区域的四边外扩距离，不改变普通布局外边距。（scroll-margin）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
 */
export const ScrollMarginCss = ScrollMarginCssRuntime as new () => ScrollMarginCss;

/**
 * scroll-margin-block 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollMarginBlockKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMarginBlock | CssString
>;
/**
 * 创建 scroll-margin-block 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollMarginBlockKeywords()
 */
export const ScrollMarginBlockKeywords = class ScrollMarginBlockKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollMarginBlockKeywords;

/**
 * scroll-margin-block 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollMarginBlockCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-margin-block 属性作者；普通使用通过 s.scrollMarginBlock 取得共享实例。
   * @example
   * class CustomScrollMarginBlockCss extends ScrollMarginBlockCss {}
   */
  constructor() {
    super('scroll-margin-block');
    initializeKeywordDeclarations(this, 'scroll-margin-block', globalKeywords);
  }
  /**
   * 原样生成 scroll-margin-block 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-margin-block:value;，undefined 返回空字符串。
   * @example
   * s.scrollMarginBlock.raw('inherit') // scroll-margin-block:inherit;
   */
  raw(value: Property.ScrollMarginBlock | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.px(1)
   */
  px(value1: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 px。
   * @param value2 逻辑块轴结束侧的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.px(1, 2)
   */
  px(value1: number, value2: number): string;
  override px(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}px`).join(' '));
  }
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cm(1)
   */
  cm(value1: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cm。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cm(1, 2)
   */
  cm(value1: number, value2: number): string;
  override cm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cm`).join(' '));
  }
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.mm(1)
   */
  mm(value1: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 mm。
   * @param value2 逻辑块轴结束侧的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.mm(1, 2)
   */
  mm(value1: number, value2: number): string;
  override mm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}mm`).join(' '));
  }
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.q(1)
   */
  q(value1: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 q。
   * @param value2 逻辑块轴结束侧的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.q(1, 2)
   */
  q(value1: number, value2: number): string;
  override q(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}q`).join(' '));
  }
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.in(1)
   */
  in(value1: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 in。
   * @param value2 逻辑块轴结束侧的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.in(1, 2)
   */
  in(value1: number, value2: number): string;
  override in(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}in`).join(' '));
  }
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.pt(1)
   */
  pt(value1: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 pt。
   * @param value2 逻辑块轴结束侧的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.pt(1, 2)
   */
  pt(value1: number, value2: number): string;
  override pt(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pt`).join(' '));
  }
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.pc(1)
   */
  pc(value1: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 pc。
   * @param value2 逻辑块轴结束侧的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.pc(1, 2)
   */
  pc(value1: number, value2: number): string;
  override pc(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pc`).join(' '));
  }
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.em(1)
   */
  em(value1: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 em。
   * @param value2 逻辑块轴结束侧的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.em(1, 2)
   */
  em(value1: number, value2: number): string;
  override em(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}em`).join(' '));
  }
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.rem(1)
   */
  rem(value1: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 rem。
   * @param value2 逻辑块轴结束侧的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.rem(1, 2)
   */
  rem(value1: number, value2: number): string;
  override rem(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rem`).join(' '));
  }
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.ex(1)
   */
  ex(value1: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 ex。
   * @param value2 逻辑块轴结束侧的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.ex(1, 2)
   */
  ex(value1: number, value2: number): string;
  override ex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ex`).join(' '));
  }
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.rex(1)
   */
  rex(value1: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 rex。
   * @param value2 逻辑块轴结束侧的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.rex(1, 2)
   */
  rex(value1: number, value2: number): string;
  override rex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rex`).join(' '));
  }
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.ch(1)
   */
  ch(value1: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 ch。
   * @param value2 逻辑块轴结束侧的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.ch(1, 2)
   */
  ch(value1: number, value2: number): string;
  override ch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ch`).join(' '));
  }
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.rch(1)
   */
  rch(value1: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 rch。
   * @param value2 逻辑块轴结束侧的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.rch(1, 2)
   */
  rch(value1: number, value2: number): string;
  override rch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rch`).join(' '));
  }
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cap(1)
   */
  cap(value1: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cap。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cap(1, 2)
   */
  cap(value1: number, value2: number): string;
  override cap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cap`).join(' '));
  }
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.rcap(1)
   */
  rcap(value1: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 rcap。
   * @param value2 逻辑块轴结束侧的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.rcap(1, 2)
   */
  rcap(value1: number, value2: number): string;
  override rcap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rcap`).join(' '));
  }
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.ic(1)
   */
  ic(value1: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 ic。
   * @param value2 逻辑块轴结束侧的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.ic(1, 2)
   */
  ic(value1: number, value2: number): string;
  override ic(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ic`).join(' '));
  }
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.ric(1)
   */
  ric(value1: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 ric。
   * @param value2 逻辑块轴结束侧的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.ric(1, 2)
   */
  ric(value1: number, value2: number): string;
  override ric(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ric`).join(' '));
  }
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.lh(1)
   */
  lh(value1: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 lh。
   * @param value2 逻辑块轴结束侧的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.lh(1, 2)
   */
  lh(value1: number, value2: number): string;
  override lh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lh`).join(' '));
  }
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.rlh(1)
   */
  rlh(value1: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 rlh。
   * @param value2 逻辑块轴结束侧的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.rlh(1, 2)
   */
  rlh(value1: number, value2: number): string;
  override rlh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rlh`).join(' '));
  }
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.vw(1)
   */
  vw(value1: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 vw。
   * @param value2 逻辑块轴结束侧的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.vw(1, 2)
   */
  vw(value1: number, value2: number): string;
  override vw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vw`).join(' '));
  }
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.vh(1)
   */
  vh(value1: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 vh。
   * @param value2 逻辑块轴结束侧的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.vh(1, 2)
   */
  vh(value1: number, value2: number): string;
  override vh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vh`).join(' '));
  }
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.vi(1)
   */
  vi(value1: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 vi。
   * @param value2 逻辑块轴结束侧的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.vi(1, 2)
   */
  vi(value1: number, value2: number): string;
  override vi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vi`).join(' '));
  }
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.vb(1)
   */
  vb(value1: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 vb。
   * @param value2 逻辑块轴结束侧的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.vb(1, 2)
   */
  vb(value1: number, value2: number): string;
  override vb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vb`).join(' '));
  }
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.vmin(1)
   */
  vmin(value1: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 vmin。
   * @param value2 逻辑块轴结束侧的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.vmin(1, 2)
   */
  vmin(value1: number, value2: number): string;
  override vmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmin`).join(' '));
  }
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.vmax(1)
   */
  vmax(value1: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 vmax。
   * @param value2 逻辑块轴结束侧的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.vmax(1, 2)
   */
  vmax(value1: number, value2: number): string;
  override vmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmax`).join(' '));
  }
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.svw(1)
   */
  svw(value1: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 svw。
   * @param value2 逻辑块轴结束侧的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.svw(1, 2)
   */
  svw(value1: number, value2: number): string;
  override svw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svw`).join(' '));
  }
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.svh(1)
   */
  svh(value1: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 svh。
   * @param value2 逻辑块轴结束侧的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.svh(1, 2)
   */
  svh(value1: number, value2: number): string;
  override svh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svh`).join(' '));
  }
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.svi(1)
   */
  svi(value1: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 svi。
   * @param value2 逻辑块轴结束侧的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.svi(1, 2)
   */
  svi(value1: number, value2: number): string;
  override svi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svi`).join(' '));
  }
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.svb(1)
   */
  svb(value1: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 svb。
   * @param value2 逻辑块轴结束侧的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.svb(1, 2)
   */
  svb(value1: number, value2: number): string;
  override svb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svb`).join(' '));
  }
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.svmin(1)
   */
  svmin(value1: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 svmin。
   * @param value2 逻辑块轴结束侧的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.svmin(1, 2)
   */
  svmin(value1: number, value2: number): string;
  override svmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmin`).join(' '));
  }
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.svmax(1)
   */
  svmax(value1: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 svmax。
   * @param value2 逻辑块轴结束侧的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.svmax(1, 2)
   */
  svmax(value1: number, value2: number): string;
  override svmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmax`).join(' '));
  }
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.lvw(1)
   */
  lvw(value1: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 lvw。
   * @param value2 逻辑块轴结束侧的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.lvw(1, 2)
   */
  lvw(value1: number, value2: number): string;
  override lvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvw`).join(' '));
  }
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.lvh(1)
   */
  lvh(value1: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 lvh。
   * @param value2 逻辑块轴结束侧的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.lvh(1, 2)
   */
  lvh(value1: number, value2: number): string;
  override lvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvh`).join(' '));
  }
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.lvi(1)
   */
  lvi(value1: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 lvi。
   * @param value2 逻辑块轴结束侧的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.lvi(1, 2)
   */
  lvi(value1: number, value2: number): string;
  override lvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvi`).join(' '));
  }
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.lvb(1)
   */
  lvb(value1: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 lvb。
   * @param value2 逻辑块轴结束侧的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.lvb(1, 2)
   */
  lvb(value1: number, value2: number): string;
  override lvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvb`).join(' '));
  }
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.lvmin(1)
   */
  lvmin(value1: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 lvmin。
   * @param value2 逻辑块轴结束侧的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.lvmin(1, 2)
   */
  lvmin(value1: number, value2: number): string;
  override lvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmin`).join(' '));
  }
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.lvmax(1)
   */
  lvmax(value1: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 lvmax。
   * @param value2 逻辑块轴结束侧的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.lvmax(1, 2)
   */
  lvmax(value1: number, value2: number): string;
  override lvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmax`).join(' '));
  }
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.dvw(1)
   */
  dvw(value1: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 dvw。
   * @param value2 逻辑块轴结束侧的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.dvw(1, 2)
   */
  dvw(value1: number, value2: number): string;
  override dvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvw`).join(' '));
  }
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.dvh(1)
   */
  dvh(value1: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 dvh。
   * @param value2 逻辑块轴结束侧的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.dvh(1, 2)
   */
  dvh(value1: number, value2: number): string;
  override dvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvh`).join(' '));
  }
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.dvi(1)
   */
  dvi(value1: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 dvi。
   * @param value2 逻辑块轴结束侧的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.dvi(1, 2)
   */
  dvi(value1: number, value2: number): string;
  override dvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvi`).join(' '));
  }
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.dvb(1)
   */
  dvb(value1: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 dvb。
   * @param value2 逻辑块轴结束侧的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.dvb(1, 2)
   */
  dvb(value1: number, value2: number): string;
  override dvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvb`).join(' '));
  }
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.dvmin(1)
   */
  dvmin(value1: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 dvmin。
   * @param value2 逻辑块轴结束侧的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.dvmin(1, 2)
   */
  dvmin(value1: number, value2: number): string;
  override dvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmin`).join(' '));
  }
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.dvmax(1)
   */
  dvmax(value1: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 dvmax。
   * @param value2 逻辑块轴结束侧的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.dvmax(1, 2)
   */
  dvmax(value1: number, value2: number): string;
  override dvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmax`).join(' '));
  }
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cqw(1)
   */
  cqw(value1: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cqw。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cqw(1, 2)
   */
  cqw(value1: number, value2: number): string;
  override cqw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqw`).join(' '));
  }
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cqh(1)
   */
  cqh(value1: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cqh。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cqh(1, 2)
   */
  cqh(value1: number, value2: number): string;
  override cqh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqh`).join(' '));
  }
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cqi(1)
   */
  cqi(value1: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cqi。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cqi(1, 2)
   */
  cqi(value1: number, value2: number): string;
  override cqi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqi`).join(' '));
  }
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cqb(1)
   */
  cqb(value1: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cqb。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cqb(1, 2)
   */
  cqb(value1: number, value2: number): string;
  override cqb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqb`).join(' '));
  }
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cqmin(1)
   */
  cqmin(value1: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cqmin。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cqmin(1, 2)
   */
  cqmin(value1: number, value2: number): string;
  override cqmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmin`).join(' '));
  }
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cqmax(1)
   */
  cqmax(value1: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cqmax。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginBlock.cqmax(1, 2)
   */
  cqmax(value1: number, value2: number): string;
  override cqmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmax`).join(' '));
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollMarginBlock.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollMarginBlock.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMarginBlock | CssString,
    ...others: (Property.ScrollMarginBlock | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollMarginBlock.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMarginBlock | CssString,
    ...others: (Property.ScrollMarginBlock | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollMarginBlock.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMarginBlock | CssString,
    preferred: Property.ScrollMarginBlock | CssString,
    maximum: Property.ScrollMarginBlock | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-margin-block 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollMarginBlockCss = ScrollMarginBlockCssRuntime &
  KeywordDeclarations<ScrollMarginBlockKeywords>;
/**
 * 设置滚动目标区域在逻辑块轴两侧的外扩距离。（scroll-margin-block）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block
 */
export const ScrollMarginBlockCss = ScrollMarginBlockCssRuntime as new () => ScrollMarginBlockCss;

/**
 * scroll-margin-block-end 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollMarginBlockEndKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMarginBlockEnd | CssString
>;
/**
 * 创建 scroll-margin-block-end 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollMarginBlockEndKeywords()
 */
export const ScrollMarginBlockEndKeywords = class ScrollMarginBlockEndKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollMarginBlockEndKeywords;

/**
 * scroll-margin-block-end 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollMarginBlockEndCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-margin-block-end 属性作者；普通使用通过 s.scrollMarginBlockEnd 取得共享实例。
   * @example
   * class CustomScrollMarginBlockEndCss extends ScrollMarginBlockEndCss {}
   */
  constructor() {
    super('scroll-margin-block-end');
    initializeKeywordDeclarations(this, 'scroll-margin-block-end', globalKeywords);
  }
  /**
   * 原样生成 scroll-margin-block-end 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-margin-block-end:value;，undefined 返回空字符串。
   * @example
   * s.scrollMarginBlockEnd.raw('inherit') // scroll-margin-block-end:inherit;
   */
  raw(value: Property.ScrollMarginBlockEnd | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollMarginBlockEnd.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollMarginBlockEnd.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMarginBlockEnd | CssString,
    ...others: (Property.ScrollMarginBlockEnd | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollMarginBlockEnd.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMarginBlockEnd | CssString,
    ...others: (Property.ScrollMarginBlockEnd | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollMarginBlockEnd.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMarginBlockEnd | CssString,
    preferred: Property.ScrollMarginBlockEnd | CssString,
    maximum: Property.ScrollMarginBlockEnd | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-margin-block-end 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollMarginBlockEndCss = ScrollMarginBlockEndCssRuntime &
  KeywordDeclarations<ScrollMarginBlockEndKeywords>;
/**
 * 设置滚动目标区域在逻辑块轴结束侧的外扩距离。（scroll-margin-block-end）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-end
 */
export const ScrollMarginBlockEndCss =
  ScrollMarginBlockEndCssRuntime as new () => ScrollMarginBlockEndCss;

/**
 * scroll-margin-block-start 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollMarginBlockStartKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMarginBlockStart | CssString
>;
/**
 * 创建 scroll-margin-block-start 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollMarginBlockStartKeywords()
 */
export const ScrollMarginBlockStartKeywords = class ScrollMarginBlockStartKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollMarginBlockStartKeywords;

/**
 * scroll-margin-block-start 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollMarginBlockStartCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-margin-block-start 属性作者；普通使用通过 s.scrollMarginBlockStart 取得共享实例。
   * @example
   * class CustomScrollMarginBlockStartCss extends ScrollMarginBlockStartCss {}
   */
  constructor() {
    super('scroll-margin-block-start');
    initializeKeywordDeclarations(this, 'scroll-margin-block-start', globalKeywords);
  }
  /**
   * 原样生成 scroll-margin-block-start 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-margin-block-start:value;，undefined 返回空字符串。
   * @example
   * s.scrollMarginBlockStart.raw('inherit') // scroll-margin-block-start:inherit;
   */
  raw(value: Property.ScrollMarginBlockStart | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollMarginBlockStart.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollMarginBlockStart.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMarginBlockStart | CssString,
    ...others: (Property.ScrollMarginBlockStart | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollMarginBlockStart.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMarginBlockStart | CssString,
    ...others: (Property.ScrollMarginBlockStart | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollMarginBlockStart.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMarginBlockStart | CssString,
    preferred: Property.ScrollMarginBlockStart | CssString,
    maximum: Property.ScrollMarginBlockStart | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-margin-block-start 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollMarginBlockStartCss = ScrollMarginBlockStartCssRuntime &
  KeywordDeclarations<ScrollMarginBlockStartKeywords>;
/**
 * 设置滚动目标区域在逻辑块轴起始侧的外扩距离。（scroll-margin-block-start）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-block-start
 */
export const ScrollMarginBlockStartCss =
  ScrollMarginBlockStartCssRuntime as new () => ScrollMarginBlockStartCss;

/**
 * scroll-margin-bottom 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollMarginBottomKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMarginBottom | CssString
>;
/**
 * 创建 scroll-margin-bottom 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollMarginBottomKeywords()
 */
export const ScrollMarginBottomKeywords = class ScrollMarginBottomKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollMarginBottomKeywords;

/**
 * scroll-margin-bottom 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollMarginBottomCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-margin-bottom 属性作者；普通使用通过 s.scrollMarginBottom 取得共享实例。
   * @example
   * class CustomScrollMarginBottomCss extends ScrollMarginBottomCss {}
   */
  constructor() {
    super('scroll-margin-bottom');
    initializeKeywordDeclarations(this, 'scroll-margin-bottom', globalKeywords);
  }
  /**
   * 原样生成 scroll-margin-bottom 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-margin-bottom:value;，undefined 返回空字符串。
   * @example
   * s.scrollMarginBottom.raw('inherit') // scroll-margin-bottom:inherit;
   */
  raw(value: Property.ScrollMarginBottom | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollMarginBottom.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollMarginBottom.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMarginBottom | CssString,
    ...others: (Property.ScrollMarginBottom | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollMarginBottom.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMarginBottom | CssString,
    ...others: (Property.ScrollMarginBottom | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollMarginBottom.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMarginBottom | CssString,
    preferred: Property.ScrollMarginBottom | CssString,
    maximum: Property.ScrollMarginBottom | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-margin-bottom 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollMarginBottomCss = ScrollMarginBottomCssRuntime &
  KeywordDeclarations<ScrollMarginBottomKeywords>;
/**
 * 设置滚动目标区域下侧的外扩距离。（scroll-margin-bottom）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
 */
export const ScrollMarginBottomCss =
  ScrollMarginBottomCssRuntime as new () => ScrollMarginBottomCss;

/**
 * scroll-margin-inline 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollMarginInlineKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMarginInline | CssString
>;
/**
 * 创建 scroll-margin-inline 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollMarginInlineKeywords()
 */
export const ScrollMarginInlineKeywords = class ScrollMarginInlineKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollMarginInlineKeywords;

/**
 * scroll-margin-inline 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollMarginInlineCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-margin-inline 属性作者；普通使用通过 s.scrollMarginInline 取得共享实例。
   * @example
   * class CustomScrollMarginInlineCss extends ScrollMarginInlineCss {}
   */
  constructor() {
    super('scroll-margin-inline');
    initializeKeywordDeclarations(this, 'scroll-margin-inline', globalKeywords);
  }
  /**
   * 原样生成 scroll-margin-inline 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-margin-inline:value;，undefined 返回空字符串。
   * @example
   * s.scrollMarginInline.raw('inherit') // scroll-margin-inline:inherit;
   */
  raw(value: Property.ScrollMarginInline | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.px(1)
   */
  px(value1: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 px。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.px(1, 2)
   */
  px(value1: number, value2: number): string;
  override px(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}px`).join(' '));
  }
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cm(1)
   */
  cm(value1: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cm。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cm(1, 2)
   */
  cm(value1: number, value2: number): string;
  override cm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cm`).join(' '));
  }
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.mm(1)
   */
  mm(value1: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 mm。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.mm(1, 2)
   */
  mm(value1: number, value2: number): string;
  override mm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}mm`).join(' '));
  }
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.q(1)
   */
  q(value1: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 q。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.q(1, 2)
   */
  q(value1: number, value2: number): string;
  override q(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}q`).join(' '));
  }
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.in(1)
   */
  in(value1: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 in。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.in(1, 2)
   */
  in(value1: number, value2: number): string;
  override in(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}in`).join(' '));
  }
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.pt(1)
   */
  pt(value1: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 pt。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.pt(1, 2)
   */
  pt(value1: number, value2: number): string;
  override pt(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pt`).join(' '));
  }
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.pc(1)
   */
  pc(value1: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 pc。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.pc(1, 2)
   */
  pc(value1: number, value2: number): string;
  override pc(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pc`).join(' '));
  }
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.em(1)
   */
  em(value1: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 em。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.em(1, 2)
   */
  em(value1: number, value2: number): string;
  override em(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}em`).join(' '));
  }
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.rem(1)
   */
  rem(value1: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 rem。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.rem(1, 2)
   */
  rem(value1: number, value2: number): string;
  override rem(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rem`).join(' '));
  }
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.ex(1)
   */
  ex(value1: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 ex。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.ex(1, 2)
   */
  ex(value1: number, value2: number): string;
  override ex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ex`).join(' '));
  }
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.rex(1)
   */
  rex(value1: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 rex。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.rex(1, 2)
   */
  rex(value1: number, value2: number): string;
  override rex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rex`).join(' '));
  }
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.ch(1)
   */
  ch(value1: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 ch。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.ch(1, 2)
   */
  ch(value1: number, value2: number): string;
  override ch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ch`).join(' '));
  }
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.rch(1)
   */
  rch(value1: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 rch。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.rch(1, 2)
   */
  rch(value1: number, value2: number): string;
  override rch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rch`).join(' '));
  }
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cap(1)
   */
  cap(value1: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cap。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cap(1, 2)
   */
  cap(value1: number, value2: number): string;
  override cap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cap`).join(' '));
  }
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.rcap(1)
   */
  rcap(value1: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 rcap。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.rcap(1, 2)
   */
  rcap(value1: number, value2: number): string;
  override rcap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rcap`).join(' '));
  }
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.ic(1)
   */
  ic(value1: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 ic。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.ic(1, 2)
   */
  ic(value1: number, value2: number): string;
  override ic(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ic`).join(' '));
  }
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.ric(1)
   */
  ric(value1: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 ric。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.ric(1, 2)
   */
  ric(value1: number, value2: number): string;
  override ric(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ric`).join(' '));
  }
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.lh(1)
   */
  lh(value1: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 lh。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.lh(1, 2)
   */
  lh(value1: number, value2: number): string;
  override lh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lh`).join(' '));
  }
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.rlh(1)
   */
  rlh(value1: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 rlh。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.rlh(1, 2)
   */
  rlh(value1: number, value2: number): string;
  override rlh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rlh`).join(' '));
  }
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.vw(1)
   */
  vw(value1: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 vw。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.vw(1, 2)
   */
  vw(value1: number, value2: number): string;
  override vw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vw`).join(' '));
  }
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.vh(1)
   */
  vh(value1: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 vh。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.vh(1, 2)
   */
  vh(value1: number, value2: number): string;
  override vh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vh`).join(' '));
  }
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.vi(1)
   */
  vi(value1: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 vi。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.vi(1, 2)
   */
  vi(value1: number, value2: number): string;
  override vi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vi`).join(' '));
  }
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.vb(1)
   */
  vb(value1: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 vb。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.vb(1, 2)
   */
  vb(value1: number, value2: number): string;
  override vb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vb`).join(' '));
  }
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.vmin(1)
   */
  vmin(value1: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 vmin。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.vmin(1, 2)
   */
  vmin(value1: number, value2: number): string;
  override vmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmin`).join(' '));
  }
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.vmax(1)
   */
  vmax(value1: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 vmax。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.vmax(1, 2)
   */
  vmax(value1: number, value2: number): string;
  override vmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmax`).join(' '));
  }
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.svw(1)
   */
  svw(value1: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 svw。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.svw(1, 2)
   */
  svw(value1: number, value2: number): string;
  override svw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svw`).join(' '));
  }
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.svh(1)
   */
  svh(value1: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 svh。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.svh(1, 2)
   */
  svh(value1: number, value2: number): string;
  override svh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svh`).join(' '));
  }
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.svi(1)
   */
  svi(value1: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 svi。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.svi(1, 2)
   */
  svi(value1: number, value2: number): string;
  override svi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svi`).join(' '));
  }
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.svb(1)
   */
  svb(value1: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 svb。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.svb(1, 2)
   */
  svb(value1: number, value2: number): string;
  override svb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svb`).join(' '));
  }
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.svmin(1)
   */
  svmin(value1: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 svmin。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.svmin(1, 2)
   */
  svmin(value1: number, value2: number): string;
  override svmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmin`).join(' '));
  }
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.svmax(1)
   */
  svmax(value1: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 svmax。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.svmax(1, 2)
   */
  svmax(value1: number, value2: number): string;
  override svmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmax`).join(' '));
  }
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.lvw(1)
   */
  lvw(value1: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 lvw。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.lvw(1, 2)
   */
  lvw(value1: number, value2: number): string;
  override lvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvw`).join(' '));
  }
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.lvh(1)
   */
  lvh(value1: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 lvh。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.lvh(1, 2)
   */
  lvh(value1: number, value2: number): string;
  override lvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvh`).join(' '));
  }
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.lvi(1)
   */
  lvi(value1: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 lvi。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.lvi(1, 2)
   */
  lvi(value1: number, value2: number): string;
  override lvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvi`).join(' '));
  }
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.lvb(1)
   */
  lvb(value1: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 lvb。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.lvb(1, 2)
   */
  lvb(value1: number, value2: number): string;
  override lvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvb`).join(' '));
  }
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.lvmin(1)
   */
  lvmin(value1: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 lvmin。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.lvmin(1, 2)
   */
  lvmin(value1: number, value2: number): string;
  override lvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmin`).join(' '));
  }
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.lvmax(1)
   */
  lvmax(value1: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 lvmax。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.lvmax(1, 2)
   */
  lvmax(value1: number, value2: number): string;
  override lvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmax`).join(' '));
  }
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.dvw(1)
   */
  dvw(value1: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 dvw。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.dvw(1, 2)
   */
  dvw(value1: number, value2: number): string;
  override dvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvw`).join(' '));
  }
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.dvh(1)
   */
  dvh(value1: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 dvh。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.dvh(1, 2)
   */
  dvh(value1: number, value2: number): string;
  override dvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvh`).join(' '));
  }
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.dvi(1)
   */
  dvi(value1: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 dvi。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.dvi(1, 2)
   */
  dvi(value1: number, value2: number): string;
  override dvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvi`).join(' '));
  }
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.dvb(1)
   */
  dvb(value1: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 dvb。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.dvb(1, 2)
   */
  dvb(value1: number, value2: number): string;
  override dvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvb`).join(' '));
  }
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.dvmin(1)
   */
  dvmin(value1: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 dvmin。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.dvmin(1, 2)
   */
  dvmin(value1: number, value2: number): string;
  override dvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmin`).join(' '));
  }
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.dvmax(1)
   */
  dvmax(value1: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 dvmax。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.dvmax(1, 2)
   */
  dvmax(value1: number, value2: number): string;
  override dvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmax`).join(' '));
  }
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cqw(1)
   */
  cqw(value1: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cqw。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cqw(1, 2)
   */
  cqw(value1: number, value2: number): string;
  override cqw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqw`).join(' '));
  }
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cqh(1)
   */
  cqh(value1: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cqh。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cqh(1, 2)
   */
  cqh(value1: number, value2: number): string;
  override cqh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqh`).join(' '));
  }
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cqi(1)
   */
  cqi(value1: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cqi。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cqi(1, 2)
   */
  cqi(value1: number, value2: number): string;
  override cqi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqi`).join(' '));
  }
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cqb(1)
   */
  cqb(value1: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cqb。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cqb(1, 2)
   */
  cqb(value1: number, value2: number): string;
  override cqb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqb`).join(' '));
  }
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cqmin(1)
   */
  cqmin(value1: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cqmin。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cqmin(1, 2)
   */
  cqmin(value1: number, value2: number): string;
  override cqmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmin`).join(' '));
  }
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cqmax(1)
   */
  cqmax(value1: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cqmax。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollMarginInline.cqmax(1, 2)
   */
  cqmax(value1: number, value2: number): string;
  override cqmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmax`).join(' '));
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollMarginInline.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollMarginInline.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMarginInline | CssString,
    ...others: (Property.ScrollMarginInline | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollMarginInline.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMarginInline | CssString,
    ...others: (Property.ScrollMarginInline | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollMarginInline.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMarginInline | CssString,
    preferred: Property.ScrollMarginInline | CssString,
    maximum: Property.ScrollMarginInline | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-margin-inline 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollMarginInlineCss = ScrollMarginInlineCssRuntime &
  KeywordDeclarations<ScrollMarginInlineKeywords>;
/**
 * 设置滚动目标区域在逻辑行内轴两侧的外扩距离。（scroll-margin-inline）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline
 */
export const ScrollMarginInlineCss =
  ScrollMarginInlineCssRuntime as new () => ScrollMarginInlineCss;

/**
 * scroll-margin-inline-end 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollMarginInlineEndKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMarginInlineEnd | CssString
>;
/**
 * 创建 scroll-margin-inline-end 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollMarginInlineEndKeywords()
 */
export const ScrollMarginInlineEndKeywords = class ScrollMarginInlineEndKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollMarginInlineEndKeywords;

/**
 * scroll-margin-inline-end 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollMarginInlineEndCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-margin-inline-end 属性作者；普通使用通过 s.scrollMarginInlineEnd 取得共享实例。
   * @example
   * class CustomScrollMarginInlineEndCss extends ScrollMarginInlineEndCss {}
   */
  constructor() {
    super('scroll-margin-inline-end');
    initializeKeywordDeclarations(this, 'scroll-margin-inline-end', globalKeywords);
  }
  /**
   * 原样生成 scroll-margin-inline-end 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-margin-inline-end:value;，undefined 返回空字符串。
   * @example
   * s.scrollMarginInlineEnd.raw('inherit') // scroll-margin-inline-end:inherit;
   */
  raw(value: Property.ScrollMarginInlineEnd | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollMarginInlineEnd.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollMarginInlineEnd.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMarginInlineEnd | CssString,
    ...others: (Property.ScrollMarginInlineEnd | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollMarginInlineEnd.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMarginInlineEnd | CssString,
    ...others: (Property.ScrollMarginInlineEnd | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollMarginInlineEnd.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMarginInlineEnd | CssString,
    preferred: Property.ScrollMarginInlineEnd | CssString,
    maximum: Property.ScrollMarginInlineEnd | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-margin-inline-end 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollMarginInlineEndCss = ScrollMarginInlineEndCssRuntime &
  KeywordDeclarations<ScrollMarginInlineEndKeywords>;
/**
 * 设置滚动目标区域在逻辑行内轴结束侧的外扩距离。（scroll-margin-inline-end）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-end
 */
export const ScrollMarginInlineEndCss =
  ScrollMarginInlineEndCssRuntime as new () => ScrollMarginInlineEndCss;

/**
 * scroll-margin-inline-start 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollMarginInlineStartKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMarginInlineStart | CssString
>;
/**
 * 创建 scroll-margin-inline-start 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollMarginInlineStartKeywords()
 */
export const ScrollMarginInlineStartKeywords = class ScrollMarginInlineStartKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollMarginInlineStartKeywords;

/**
 * scroll-margin-inline-start 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollMarginInlineStartCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-margin-inline-start 属性作者；普通使用通过 s.scrollMarginInlineStart 取得共享实例。
   * @example
   * class CustomScrollMarginInlineStartCss extends ScrollMarginInlineStartCss {}
   */
  constructor() {
    super('scroll-margin-inline-start');
    initializeKeywordDeclarations(this, 'scroll-margin-inline-start', globalKeywords);
  }
  /**
   * 原样生成 scroll-margin-inline-start 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-margin-inline-start:value;，undefined 返回空字符串。
   * @example
   * s.scrollMarginInlineStart.raw('inherit') // scroll-margin-inline-start:inherit;
   */
  raw(value: Property.ScrollMarginInlineStart | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollMarginInlineStart.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollMarginInlineStart.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMarginInlineStart | CssString,
    ...others: (Property.ScrollMarginInlineStart | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollMarginInlineStart.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMarginInlineStart | CssString,
    ...others: (Property.ScrollMarginInlineStart | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollMarginInlineStart.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMarginInlineStart | CssString,
    preferred: Property.ScrollMarginInlineStart | CssString,
    maximum: Property.ScrollMarginInlineStart | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-margin-inline-start 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollMarginInlineStartCss = ScrollMarginInlineStartCssRuntime &
  KeywordDeclarations<ScrollMarginInlineStartKeywords>;
/**
 * 设置滚动目标区域在逻辑行内轴起始侧的外扩距离。（scroll-margin-inline-start）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-inline-start
 */
export const ScrollMarginInlineStartCss =
  ScrollMarginInlineStartCssRuntime as new () => ScrollMarginInlineStartCss;

/**
 * scroll-margin-left 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollMarginLeftKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMarginLeft | CssString
>;
/**
 * 创建 scroll-margin-left 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollMarginLeftKeywords()
 */
export const ScrollMarginLeftKeywords = class ScrollMarginLeftKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollMarginLeftKeywords;

/**
 * scroll-margin-left 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollMarginLeftCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-margin-left 属性作者；普通使用通过 s.scrollMarginLeft 取得共享实例。
   * @example
   * class CustomScrollMarginLeftCss extends ScrollMarginLeftCss {}
   */
  constructor() {
    super('scroll-margin-left');
    initializeKeywordDeclarations(this, 'scroll-margin-left', globalKeywords);
  }
  /**
   * 原样生成 scroll-margin-left 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-margin-left:value;，undefined 返回空字符串。
   * @example
   * s.scrollMarginLeft.raw('inherit') // scroll-margin-left:inherit;
   */
  raw(value: Property.ScrollMarginLeft | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollMarginLeft.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollMarginLeft.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMarginLeft | CssString,
    ...others: (Property.ScrollMarginLeft | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollMarginLeft.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMarginLeft | CssString,
    ...others: (Property.ScrollMarginLeft | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollMarginLeft.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMarginLeft | CssString,
    preferred: Property.ScrollMarginLeft | CssString,
    maximum: Property.ScrollMarginLeft | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-margin-left 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollMarginLeftCss = ScrollMarginLeftCssRuntime &
  KeywordDeclarations<ScrollMarginLeftKeywords>;
/**
 * 设置滚动目标区域左侧的外扩距离。（scroll-margin-left）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
 */
export const ScrollMarginLeftCss = ScrollMarginLeftCssRuntime as new () => ScrollMarginLeftCss;

/**
 * scroll-margin-right 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollMarginRightKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMarginRight | CssString
>;
/**
 * 创建 scroll-margin-right 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollMarginRightKeywords()
 */
export const ScrollMarginRightKeywords = class ScrollMarginRightKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollMarginRightKeywords;

/**
 * scroll-margin-right 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollMarginRightCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-margin-right 属性作者；普通使用通过 s.scrollMarginRight 取得共享实例。
   * @example
   * class CustomScrollMarginRightCss extends ScrollMarginRightCss {}
   */
  constructor() {
    super('scroll-margin-right');
    initializeKeywordDeclarations(this, 'scroll-margin-right', globalKeywords);
  }
  /**
   * 原样生成 scroll-margin-right 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-margin-right:value;，undefined 返回空字符串。
   * @example
   * s.scrollMarginRight.raw('inherit') // scroll-margin-right:inherit;
   */
  raw(value: Property.ScrollMarginRight | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollMarginRight.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollMarginRight.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMarginRight | CssString,
    ...others: (Property.ScrollMarginRight | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollMarginRight.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMarginRight | CssString,
    ...others: (Property.ScrollMarginRight | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollMarginRight.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMarginRight | CssString,
    preferred: Property.ScrollMarginRight | CssString,
    maximum: Property.ScrollMarginRight | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-margin-right 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollMarginRightCss = ScrollMarginRightCssRuntime &
  KeywordDeclarations<ScrollMarginRightKeywords>;
/**
 * 设置滚动目标区域右侧的外扩距离。（scroll-margin-right）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
 */
export const ScrollMarginRightCss = ScrollMarginRightCssRuntime as new () => ScrollMarginRightCss;

/**
 * scroll-margin-top 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollMarginTopKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMarginTop | CssString
>;
/**
 * 创建 scroll-margin-top 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollMarginTopKeywords()
 */
export const ScrollMarginTopKeywords = class ScrollMarginTopKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollMarginTopKeywords;

/**
 * scroll-margin-top 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollMarginTopCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-margin-top 属性作者；普通使用通过 s.scrollMarginTop 取得共享实例。
   * @example
   * class CustomScrollMarginTopCss extends ScrollMarginTopCss {}
   */
  constructor() {
    super('scroll-margin-top');
    initializeKeywordDeclarations(this, 'scroll-margin-top', globalKeywords);
  }
  /**
   * 原样生成 scroll-margin-top 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-margin-top:value;，undefined 返回空字符串。
   * @example
   * s.scrollMarginTop.raw('inherit') // scroll-margin-top:inherit;
   */
  raw(value: Property.ScrollMarginTop | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollMarginTop.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollMarginTop.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMarginTop | CssString,
    ...others: (Property.ScrollMarginTop | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollMarginTop.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMarginTop | CssString,
    ...others: (Property.ScrollMarginTop | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollMarginTop.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMarginTop | CssString,
    preferred: Property.ScrollMarginTop | CssString,
    maximum: Property.ScrollMarginTop | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-margin-top 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollMarginTopCss = ScrollMarginTopCssRuntime &
  KeywordDeclarations<ScrollMarginTopKeywords>;
/**
 * 设置滚动目标区域上侧的外扩距离。（scroll-margin-top）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
 */
export const ScrollMarginTopCss = ScrollMarginTopCssRuntime as new () => ScrollMarginTopCss;
import { autoKeywords } from './keyword-sets.js';

/**
 * scroll-padding 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollPaddingKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ScrollPadding | CssString
>;
/**
 * 创建 scroll-padding 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollPaddingKeywords()
 */
export const ScrollPaddingKeywords = class ScrollPaddingKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ScrollPaddingKeywords;

/**
 * scroll-padding 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollPaddingCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-padding 属性作者；普通使用通过 s.scrollPadding 取得共享实例。
   * @example
   * class CustomScrollPaddingCss extends ScrollPaddingCss {}
   */
  constructor() {
    super('scroll-padding');
    initializeKeywordDeclarations(this, 'scroll-padding', autoKeywords);
  }
  /**
   * 原样生成 scroll-padding 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-padding:value;，undefined 返回空字符串。
   * @example
   * s.scrollPadding.raw('inherit') // scroll-padding:inherit;
   */
  raw(value: Property.ScrollPadding | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.px(1)
   */
  px(value1: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 px。
   * @param value2 左、右的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.px(1, 2)
   */
  px(value1: number, value2: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 px。
   * @param value2 左、右的数值，自动附加 px。
   * @param value3 下的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.px(1, 2, 3)
   */
  px(value1: number, value2: number, value3: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 px。
   * @param value2 右的数值，自动附加 px。
   * @param value3 下的数值，自动附加 px。
   * @param value4 左的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.px(1, 2, 3, 4)
   */
  px(value1: number, value2: number, value3: number, value4: number): string;
  override px(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}px`).join(' '));
  }
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cm(1)
   */
  cm(value1: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cm。
   * @param value2 左、右的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cm(1, 2)
   */
  cm(value1: number, value2: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cm。
   * @param value2 左、右的数值，自动附加 cm。
   * @param value3 下的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cm(1, 2, 3)
   */
  cm(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cm。
   * @param value2 右的数值，自动附加 cm。
   * @param value3 下的数值，自动附加 cm。
   * @param value4 左的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cm(1, 2, 3, 4)
   */
  cm(value1: number, value2: number, value3: number, value4: number): string;
  override cm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cm`).join(' '));
  }
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.mm(1)
   */
  mm(value1: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 mm。
   * @param value2 左、右的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.mm(1, 2)
   */
  mm(value1: number, value2: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 mm。
   * @param value2 左、右的数值，自动附加 mm。
   * @param value3 下的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.mm(1, 2, 3)
   */
  mm(value1: number, value2: number, value3: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 mm。
   * @param value2 右的数值，自动附加 mm。
   * @param value3 下的数值，自动附加 mm。
   * @param value4 左的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.mm(1, 2, 3, 4)
   */
  mm(value1: number, value2: number, value3: number, value4: number): string;
  override mm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}mm`).join(' '));
  }
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.q(1)
   */
  q(value1: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 q。
   * @param value2 左、右的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.q(1, 2)
   */
  q(value1: number, value2: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 q。
   * @param value2 左、右的数值，自动附加 q。
   * @param value3 下的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.q(1, 2, 3)
   */
  q(value1: number, value2: number, value3: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 q。
   * @param value2 右的数值，自动附加 q。
   * @param value3 下的数值，自动附加 q。
   * @param value4 左的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.q(1, 2, 3, 4)
   */
  q(value1: number, value2: number, value3: number, value4: number): string;
  override q(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}q`).join(' '));
  }
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.in(1)
   */
  in(value1: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 in。
   * @param value2 左、右的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.in(1, 2)
   */
  in(value1: number, value2: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 in。
   * @param value2 左、右的数值，自动附加 in。
   * @param value3 下的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.in(1, 2, 3)
   */
  in(value1: number, value2: number, value3: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 in。
   * @param value2 右的数值，自动附加 in。
   * @param value3 下的数值，自动附加 in。
   * @param value4 左的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.in(1, 2, 3, 4)
   */
  in(value1: number, value2: number, value3: number, value4: number): string;
  override in(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}in`).join(' '));
  }
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.pt(1)
   */
  pt(value1: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 pt。
   * @param value2 左、右的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.pt(1, 2)
   */
  pt(value1: number, value2: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 pt。
   * @param value2 左、右的数值，自动附加 pt。
   * @param value3 下的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.pt(1, 2, 3)
   */
  pt(value1: number, value2: number, value3: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 pt。
   * @param value2 右的数值，自动附加 pt。
   * @param value3 下的数值，自动附加 pt。
   * @param value4 左的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.pt(1, 2, 3, 4)
   */
  pt(value1: number, value2: number, value3: number, value4: number): string;
  override pt(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pt`).join(' '));
  }
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.pc(1)
   */
  pc(value1: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 pc。
   * @param value2 左、右的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.pc(1, 2)
   */
  pc(value1: number, value2: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 pc。
   * @param value2 左、右的数值，自动附加 pc。
   * @param value3 下的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.pc(1, 2, 3)
   */
  pc(value1: number, value2: number, value3: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 pc。
   * @param value2 右的数值，自动附加 pc。
   * @param value3 下的数值，自动附加 pc。
   * @param value4 左的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.pc(1, 2, 3, 4)
   */
  pc(value1: number, value2: number, value3: number, value4: number): string;
  override pc(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pc`).join(' '));
  }
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.em(1)
   */
  em(value1: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 em。
   * @param value2 左、右的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.em(1, 2)
   */
  em(value1: number, value2: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 em。
   * @param value2 左、右的数值，自动附加 em。
   * @param value3 下的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.em(1, 2, 3)
   */
  em(value1: number, value2: number, value3: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 em。
   * @param value2 右的数值，自动附加 em。
   * @param value3 下的数值，自动附加 em。
   * @param value4 左的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.em(1, 2, 3, 4)
   */
  em(value1: number, value2: number, value3: number, value4: number): string;
  override em(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}em`).join(' '));
  }
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rem(1)
   */
  rem(value1: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rem。
   * @param value2 左、右的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rem(1, 2)
   */
  rem(value1: number, value2: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rem。
   * @param value2 左、右的数值，自动附加 rem。
   * @param value3 下的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rem(1, 2, 3)
   */
  rem(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rem。
   * @param value2 右的数值，自动附加 rem。
   * @param value3 下的数值，自动附加 rem。
   * @param value4 左的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rem(1, 2, 3, 4)
   */
  rem(value1: number, value2: number, value3: number, value4: number): string;
  override rem(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rem`).join(' '));
  }
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ex(1)
   */
  ex(value1: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 ex。
   * @param value2 左、右的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ex(1, 2)
   */
  ex(value1: number, value2: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ex。
   * @param value2 左、右的数值，自动附加 ex。
   * @param value3 下的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ex(1, 2, 3)
   */
  ex(value1: number, value2: number, value3: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ex。
   * @param value2 右的数值，自动附加 ex。
   * @param value3 下的数值，自动附加 ex。
   * @param value4 左的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ex(1, 2, 3, 4)
   */
  ex(value1: number, value2: number, value3: number, value4: number): string;
  override ex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ex`).join(' '));
  }
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rex(1)
   */
  rex(value1: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rex。
   * @param value2 左、右的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rex(1, 2)
   */
  rex(value1: number, value2: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rex。
   * @param value2 左、右的数值，自动附加 rex。
   * @param value3 下的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rex(1, 2, 3)
   */
  rex(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rex。
   * @param value2 右的数值，自动附加 rex。
   * @param value3 下的数值，自动附加 rex。
   * @param value4 左的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rex(1, 2, 3, 4)
   */
  rex(value1: number, value2: number, value3: number, value4: number): string;
  override rex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rex`).join(' '));
  }
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ch(1)
   */
  ch(value1: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 ch。
   * @param value2 左、右的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ch(1, 2)
   */
  ch(value1: number, value2: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ch。
   * @param value2 左、右的数值，自动附加 ch。
   * @param value3 下的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ch(1, 2, 3)
   */
  ch(value1: number, value2: number, value3: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ch。
   * @param value2 右的数值，自动附加 ch。
   * @param value3 下的数值，自动附加 ch。
   * @param value4 左的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ch(1, 2, 3, 4)
   */
  ch(value1: number, value2: number, value3: number, value4: number): string;
  override ch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ch`).join(' '));
  }
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rch(1)
   */
  rch(value1: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rch。
   * @param value2 左、右的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rch(1, 2)
   */
  rch(value1: number, value2: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rch。
   * @param value2 左、右的数值，自动附加 rch。
   * @param value3 下的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rch(1, 2, 3)
   */
  rch(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rch。
   * @param value2 右的数值，自动附加 rch。
   * @param value3 下的数值，自动附加 rch。
   * @param value4 左的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rch(1, 2, 3, 4)
   */
  rch(value1: number, value2: number, value3: number, value4: number): string;
  override rch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rch`).join(' '));
  }
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cap(1)
   */
  cap(value1: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cap。
   * @param value2 左、右的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cap(1, 2)
   */
  cap(value1: number, value2: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cap。
   * @param value2 左、右的数值，自动附加 cap。
   * @param value3 下的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cap(1, 2, 3)
   */
  cap(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cap。
   * @param value2 右的数值，自动附加 cap。
   * @param value3 下的数值，自动附加 cap。
   * @param value4 左的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cap(1, 2, 3, 4)
   */
  cap(value1: number, value2: number, value3: number, value4: number): string;
  override cap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cap`).join(' '));
  }
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rcap(1)
   */
  rcap(value1: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rcap。
   * @param value2 左、右的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rcap(1, 2)
   */
  rcap(value1: number, value2: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rcap。
   * @param value2 左、右的数值，自动附加 rcap。
   * @param value3 下的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rcap(1, 2, 3)
   */
  rcap(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rcap。
   * @param value2 右的数值，自动附加 rcap。
   * @param value3 下的数值，自动附加 rcap。
   * @param value4 左的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rcap(1, 2, 3, 4)
   */
  rcap(value1: number, value2: number, value3: number, value4: number): string;
  override rcap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rcap`).join(' '));
  }
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ic(1)
   */
  ic(value1: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 ic。
   * @param value2 左、右的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ic(1, 2)
   */
  ic(value1: number, value2: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ic。
   * @param value2 左、右的数值，自动附加 ic。
   * @param value3 下的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ic(1, 2, 3)
   */
  ic(value1: number, value2: number, value3: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ic。
   * @param value2 右的数值，自动附加 ic。
   * @param value3 下的数值，自动附加 ic。
   * @param value4 左的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ic(1, 2, 3, 4)
   */
  ic(value1: number, value2: number, value3: number, value4: number): string;
  override ic(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ic`).join(' '));
  }
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ric(1)
   */
  ric(value1: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 ric。
   * @param value2 左、右的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ric(1, 2)
   */
  ric(value1: number, value2: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ric。
   * @param value2 左、右的数值，自动附加 ric。
   * @param value3 下的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ric(1, 2, 3)
   */
  ric(value1: number, value2: number, value3: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ric。
   * @param value2 右的数值，自动附加 ric。
   * @param value3 下的数值，自动附加 ric。
   * @param value4 左的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.ric(1, 2, 3, 4)
   */
  ric(value1: number, value2: number, value3: number, value4: number): string;
  override ric(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ric`).join(' '));
  }
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lh(1)
   */
  lh(value1: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lh。
   * @param value2 左、右的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lh(1, 2)
   */
  lh(value1: number, value2: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lh。
   * @param value2 左、右的数值，自动附加 lh。
   * @param value3 下的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lh(1, 2, 3)
   */
  lh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lh。
   * @param value2 右的数值，自动附加 lh。
   * @param value3 下的数值，自动附加 lh。
   * @param value4 左的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lh(1, 2, 3, 4)
   */
  lh(value1: number, value2: number, value3: number, value4: number): string;
  override lh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lh`).join(' '));
  }
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rlh(1)
   */
  rlh(value1: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rlh。
   * @param value2 左、右的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rlh(1, 2)
   */
  rlh(value1: number, value2: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rlh。
   * @param value2 左、右的数值，自动附加 rlh。
   * @param value3 下的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rlh(1, 2, 3)
   */
  rlh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rlh。
   * @param value2 右的数值，自动附加 rlh。
   * @param value3 下的数值，自动附加 rlh。
   * @param value4 左的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.rlh(1, 2, 3, 4)
   */
  rlh(value1: number, value2: number, value3: number, value4: number): string;
  override rlh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rlh`).join(' '));
  }
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vw(1)
   */
  vw(value1: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vw。
   * @param value2 左、右的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vw(1, 2)
   */
  vw(value1: number, value2: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vw。
   * @param value2 左、右的数值，自动附加 vw。
   * @param value3 下的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vw(1, 2, 3)
   */
  vw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vw。
   * @param value2 右的数值，自动附加 vw。
   * @param value3 下的数值，自动附加 vw。
   * @param value4 左的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vw(1, 2, 3, 4)
   */
  vw(value1: number, value2: number, value3: number, value4: number): string;
  override vw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vw`).join(' '));
  }
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vh(1)
   */
  vh(value1: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vh。
   * @param value2 左、右的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vh(1, 2)
   */
  vh(value1: number, value2: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vh。
   * @param value2 左、右的数值，自动附加 vh。
   * @param value3 下的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vh(1, 2, 3)
   */
  vh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vh。
   * @param value2 右的数值，自动附加 vh。
   * @param value3 下的数值，自动附加 vh。
   * @param value4 左的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vh(1, 2, 3, 4)
   */
  vh(value1: number, value2: number, value3: number, value4: number): string;
  override vh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vh`).join(' '));
  }
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vi(1)
   */
  vi(value1: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vi。
   * @param value2 左、右的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vi(1, 2)
   */
  vi(value1: number, value2: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vi。
   * @param value2 左、右的数值，自动附加 vi。
   * @param value3 下的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vi(1, 2, 3)
   */
  vi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vi。
   * @param value2 右的数值，自动附加 vi。
   * @param value3 下的数值，自动附加 vi。
   * @param value4 左的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vi(1, 2, 3, 4)
   */
  vi(value1: number, value2: number, value3: number, value4: number): string;
  override vi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vi`).join(' '));
  }
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vb(1)
   */
  vb(value1: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vb。
   * @param value2 左、右的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vb(1, 2)
   */
  vb(value1: number, value2: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vb。
   * @param value2 左、右的数值，自动附加 vb。
   * @param value3 下的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vb(1, 2, 3)
   */
  vb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vb。
   * @param value2 右的数值，自动附加 vb。
   * @param value3 下的数值，自动附加 vb。
   * @param value4 左的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vb(1, 2, 3, 4)
   */
  vb(value1: number, value2: number, value3: number, value4: number): string;
  override vb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vb`).join(' '));
  }
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vmin(1)
   */
  vmin(value1: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vmin。
   * @param value2 左、右的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vmin(1, 2)
   */
  vmin(value1: number, value2: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vmin。
   * @param value2 左、右的数值，自动附加 vmin。
   * @param value3 下的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vmin(1, 2, 3)
   */
  vmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vmin。
   * @param value2 右的数值，自动附加 vmin。
   * @param value3 下的数值，自动附加 vmin。
   * @param value4 左的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vmin(1, 2, 3, 4)
   */
  vmin(value1: number, value2: number, value3: number, value4: number): string;
  override vmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmin`).join(' '));
  }
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vmax(1)
   */
  vmax(value1: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vmax。
   * @param value2 左、右的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vmax(1, 2)
   */
  vmax(value1: number, value2: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vmax。
   * @param value2 左、右的数值，自动附加 vmax。
   * @param value3 下的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vmax(1, 2, 3)
   */
  vmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vmax。
   * @param value2 右的数值，自动附加 vmax。
   * @param value3 下的数值，自动附加 vmax。
   * @param value4 左的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.vmax(1, 2, 3, 4)
   */
  vmax(value1: number, value2: number, value3: number, value4: number): string;
  override vmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmax`).join(' '));
  }
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svw(1)
   */
  svw(value1: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svw。
   * @param value2 左、右的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svw(1, 2)
   */
  svw(value1: number, value2: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svw。
   * @param value2 左、右的数值，自动附加 svw。
   * @param value3 下的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svw(1, 2, 3)
   */
  svw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svw。
   * @param value2 右的数值，自动附加 svw。
   * @param value3 下的数值，自动附加 svw。
   * @param value4 左的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svw(1, 2, 3, 4)
   */
  svw(value1: number, value2: number, value3: number, value4: number): string;
  override svw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svw`).join(' '));
  }
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svh(1)
   */
  svh(value1: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svh。
   * @param value2 左、右的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svh(1, 2)
   */
  svh(value1: number, value2: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svh。
   * @param value2 左、右的数值，自动附加 svh。
   * @param value3 下的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svh(1, 2, 3)
   */
  svh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svh。
   * @param value2 右的数值，自动附加 svh。
   * @param value3 下的数值，自动附加 svh。
   * @param value4 左的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svh(1, 2, 3, 4)
   */
  svh(value1: number, value2: number, value3: number, value4: number): string;
  override svh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svh`).join(' '));
  }
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svi(1)
   */
  svi(value1: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svi。
   * @param value2 左、右的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svi(1, 2)
   */
  svi(value1: number, value2: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svi。
   * @param value2 左、右的数值，自动附加 svi。
   * @param value3 下的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svi(1, 2, 3)
   */
  svi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svi。
   * @param value2 右的数值，自动附加 svi。
   * @param value3 下的数值，自动附加 svi。
   * @param value4 左的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svi(1, 2, 3, 4)
   */
  svi(value1: number, value2: number, value3: number, value4: number): string;
  override svi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svi`).join(' '));
  }
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svb(1)
   */
  svb(value1: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svb。
   * @param value2 左、右的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svb(1, 2)
   */
  svb(value1: number, value2: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svb。
   * @param value2 左、右的数值，自动附加 svb。
   * @param value3 下的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svb(1, 2, 3)
   */
  svb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svb。
   * @param value2 右的数值，自动附加 svb。
   * @param value3 下的数值，自动附加 svb。
   * @param value4 左的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svb(1, 2, 3, 4)
   */
  svb(value1: number, value2: number, value3: number, value4: number): string;
  override svb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svb`).join(' '));
  }
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svmin(1)
   */
  svmin(value1: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svmin。
   * @param value2 左、右的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svmin(1, 2)
   */
  svmin(value1: number, value2: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svmin。
   * @param value2 左、右的数值，自动附加 svmin。
   * @param value3 下的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svmin(1, 2, 3)
   */
  svmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svmin。
   * @param value2 右的数值，自动附加 svmin。
   * @param value3 下的数值，自动附加 svmin。
   * @param value4 左的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svmin(1, 2, 3, 4)
   */
  svmin(value1: number, value2: number, value3: number, value4: number): string;
  override svmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmin`).join(' '));
  }
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svmax(1)
   */
  svmax(value1: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svmax。
   * @param value2 左、右的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svmax(1, 2)
   */
  svmax(value1: number, value2: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svmax。
   * @param value2 左、右的数值，自动附加 svmax。
   * @param value3 下的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svmax(1, 2, 3)
   */
  svmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svmax。
   * @param value2 右的数值，自动附加 svmax。
   * @param value3 下的数值，自动附加 svmax。
   * @param value4 左的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.svmax(1, 2, 3, 4)
   */
  svmax(value1: number, value2: number, value3: number, value4: number): string;
  override svmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmax`).join(' '));
  }
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvw(1)
   */
  lvw(value1: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvw。
   * @param value2 左、右的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvw(1, 2)
   */
  lvw(value1: number, value2: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvw。
   * @param value2 左、右的数值，自动附加 lvw。
   * @param value3 下的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvw(1, 2, 3)
   */
  lvw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvw。
   * @param value2 右的数值，自动附加 lvw。
   * @param value3 下的数值，自动附加 lvw。
   * @param value4 左的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvw(1, 2, 3, 4)
   */
  lvw(value1: number, value2: number, value3: number, value4: number): string;
  override lvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvw`).join(' '));
  }
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvh(1)
   */
  lvh(value1: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvh。
   * @param value2 左、右的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvh(1, 2)
   */
  lvh(value1: number, value2: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvh。
   * @param value2 左、右的数值，自动附加 lvh。
   * @param value3 下的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvh(1, 2, 3)
   */
  lvh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvh。
   * @param value2 右的数值，自动附加 lvh。
   * @param value3 下的数值，自动附加 lvh。
   * @param value4 左的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvh(1, 2, 3, 4)
   */
  lvh(value1: number, value2: number, value3: number, value4: number): string;
  override lvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvh`).join(' '));
  }
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvi(1)
   */
  lvi(value1: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvi。
   * @param value2 左、右的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvi(1, 2)
   */
  lvi(value1: number, value2: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvi。
   * @param value2 左、右的数值，自动附加 lvi。
   * @param value3 下的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvi(1, 2, 3)
   */
  lvi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvi。
   * @param value2 右的数值，自动附加 lvi。
   * @param value3 下的数值，自动附加 lvi。
   * @param value4 左的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvi(1, 2, 3, 4)
   */
  lvi(value1: number, value2: number, value3: number, value4: number): string;
  override lvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvi`).join(' '));
  }
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvb(1)
   */
  lvb(value1: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvb。
   * @param value2 左、右的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvb(1, 2)
   */
  lvb(value1: number, value2: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvb。
   * @param value2 左、右的数值，自动附加 lvb。
   * @param value3 下的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvb(1, 2, 3)
   */
  lvb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvb。
   * @param value2 右的数值，自动附加 lvb。
   * @param value3 下的数值，自动附加 lvb。
   * @param value4 左的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvb(1, 2, 3, 4)
   */
  lvb(value1: number, value2: number, value3: number, value4: number): string;
  override lvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvb`).join(' '));
  }
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvmin(1)
   */
  lvmin(value1: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvmin。
   * @param value2 左、右的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvmin(1, 2)
   */
  lvmin(value1: number, value2: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvmin。
   * @param value2 左、右的数值，自动附加 lvmin。
   * @param value3 下的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvmin(1, 2, 3)
   */
  lvmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvmin。
   * @param value2 右的数值，自动附加 lvmin。
   * @param value3 下的数值，自动附加 lvmin。
   * @param value4 左的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvmin(1, 2, 3, 4)
   */
  lvmin(value1: number, value2: number, value3: number, value4: number): string;
  override lvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmin`).join(' '));
  }
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvmax(1)
   */
  lvmax(value1: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvmax。
   * @param value2 左、右的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvmax(1, 2)
   */
  lvmax(value1: number, value2: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvmax。
   * @param value2 左、右的数值，自动附加 lvmax。
   * @param value3 下的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvmax(1, 2, 3)
   */
  lvmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvmax。
   * @param value2 右的数值，自动附加 lvmax。
   * @param value3 下的数值，自动附加 lvmax。
   * @param value4 左的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.lvmax(1, 2, 3, 4)
   */
  lvmax(value1: number, value2: number, value3: number, value4: number): string;
  override lvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmax`).join(' '));
  }
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvw(1)
   */
  dvw(value1: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvw。
   * @param value2 左、右的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvw(1, 2)
   */
  dvw(value1: number, value2: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvw。
   * @param value2 左、右的数值，自动附加 dvw。
   * @param value3 下的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvw(1, 2, 3)
   */
  dvw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvw。
   * @param value2 右的数值，自动附加 dvw。
   * @param value3 下的数值，自动附加 dvw。
   * @param value4 左的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvw(1, 2, 3, 4)
   */
  dvw(value1: number, value2: number, value3: number, value4: number): string;
  override dvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvw`).join(' '));
  }
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvh(1)
   */
  dvh(value1: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvh。
   * @param value2 左、右的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvh(1, 2)
   */
  dvh(value1: number, value2: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvh。
   * @param value2 左、右的数值，自动附加 dvh。
   * @param value3 下的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvh(1, 2, 3)
   */
  dvh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvh。
   * @param value2 右的数值，自动附加 dvh。
   * @param value3 下的数值，自动附加 dvh。
   * @param value4 左的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvh(1, 2, 3, 4)
   */
  dvh(value1: number, value2: number, value3: number, value4: number): string;
  override dvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvh`).join(' '));
  }
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvi(1)
   */
  dvi(value1: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvi。
   * @param value2 左、右的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvi(1, 2)
   */
  dvi(value1: number, value2: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvi。
   * @param value2 左、右的数值，自动附加 dvi。
   * @param value3 下的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvi(1, 2, 3)
   */
  dvi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvi。
   * @param value2 右的数值，自动附加 dvi。
   * @param value3 下的数值，自动附加 dvi。
   * @param value4 左的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvi(1, 2, 3, 4)
   */
  dvi(value1: number, value2: number, value3: number, value4: number): string;
  override dvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvi`).join(' '));
  }
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvb(1)
   */
  dvb(value1: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvb。
   * @param value2 左、右的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvb(1, 2)
   */
  dvb(value1: number, value2: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvb。
   * @param value2 左、右的数值，自动附加 dvb。
   * @param value3 下的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvb(1, 2, 3)
   */
  dvb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvb。
   * @param value2 右的数值，自动附加 dvb。
   * @param value3 下的数值，自动附加 dvb。
   * @param value4 左的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvb(1, 2, 3, 4)
   */
  dvb(value1: number, value2: number, value3: number, value4: number): string;
  override dvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvb`).join(' '));
  }
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvmin(1)
   */
  dvmin(value1: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvmin。
   * @param value2 左、右的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvmin(1, 2)
   */
  dvmin(value1: number, value2: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvmin。
   * @param value2 左、右的数值，自动附加 dvmin。
   * @param value3 下的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvmin(1, 2, 3)
   */
  dvmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvmin。
   * @param value2 右的数值，自动附加 dvmin。
   * @param value3 下的数值，自动附加 dvmin。
   * @param value4 左的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvmin(1, 2, 3, 4)
   */
  dvmin(value1: number, value2: number, value3: number, value4: number): string;
  override dvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmin`).join(' '));
  }
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvmax(1)
   */
  dvmax(value1: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvmax。
   * @param value2 左、右的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvmax(1, 2)
   */
  dvmax(value1: number, value2: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvmax。
   * @param value2 左、右的数值，自动附加 dvmax。
   * @param value3 下的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvmax(1, 2, 3)
   */
  dvmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvmax。
   * @param value2 右的数值，自动附加 dvmax。
   * @param value3 下的数值，自动附加 dvmax。
   * @param value4 左的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.dvmax(1, 2, 3, 4)
   */
  dvmax(value1: number, value2: number, value3: number, value4: number): string;
  override dvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmax`).join(' '));
  }
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqw(1)
   */
  cqw(value1: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqw。
   * @param value2 左、右的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqw(1, 2)
   */
  cqw(value1: number, value2: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqw。
   * @param value2 左、右的数值，自动附加 cqw。
   * @param value3 下的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqw(1, 2, 3)
   */
  cqw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqw。
   * @param value2 右的数值，自动附加 cqw。
   * @param value3 下的数值，自动附加 cqw。
   * @param value4 左的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqw(1, 2, 3, 4)
   */
  cqw(value1: number, value2: number, value3: number, value4: number): string;
  override cqw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqw`).join(' '));
  }
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqh(1)
   */
  cqh(value1: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqh。
   * @param value2 左、右的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqh(1, 2)
   */
  cqh(value1: number, value2: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqh。
   * @param value2 左、右的数值，自动附加 cqh。
   * @param value3 下的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqh(1, 2, 3)
   */
  cqh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqh。
   * @param value2 右的数值，自动附加 cqh。
   * @param value3 下的数值，自动附加 cqh。
   * @param value4 左的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqh(1, 2, 3, 4)
   */
  cqh(value1: number, value2: number, value3: number, value4: number): string;
  override cqh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqh`).join(' '));
  }
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqi(1)
   */
  cqi(value1: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqi。
   * @param value2 左、右的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqi(1, 2)
   */
  cqi(value1: number, value2: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqi。
   * @param value2 左、右的数值，自动附加 cqi。
   * @param value3 下的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqi(1, 2, 3)
   */
  cqi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqi。
   * @param value2 右的数值，自动附加 cqi。
   * @param value3 下的数值，自动附加 cqi。
   * @param value4 左的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqi(1, 2, 3, 4)
   */
  cqi(value1: number, value2: number, value3: number, value4: number): string;
  override cqi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqi`).join(' '));
  }
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqb(1)
   */
  cqb(value1: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqb。
   * @param value2 左、右的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqb(1, 2)
   */
  cqb(value1: number, value2: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqb。
   * @param value2 左、右的数值，自动附加 cqb。
   * @param value3 下的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqb(1, 2, 3)
   */
  cqb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqb。
   * @param value2 右的数值，自动附加 cqb。
   * @param value3 下的数值，自动附加 cqb。
   * @param value4 左的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqb(1, 2, 3, 4)
   */
  cqb(value1: number, value2: number, value3: number, value4: number): string;
  override cqb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqb`).join(' '));
  }
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqmin(1)
   */
  cqmin(value1: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqmin。
   * @param value2 左、右的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqmin(1, 2)
   */
  cqmin(value1: number, value2: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqmin。
   * @param value2 左、右的数值，自动附加 cqmin。
   * @param value3 下的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqmin(1, 2, 3)
   */
  cqmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqmin。
   * @param value2 右的数值，自动附加 cqmin。
   * @param value3 下的数值，自动附加 cqmin。
   * @param value4 左的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqmin(1, 2, 3, 4)
   */
  cqmin(value1: number, value2: number, value3: number, value4: number): string;
  override cqmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmin`).join(' '));
  }
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqmax(1)
   */
  cqmax(value1: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqmax。
   * @param value2 左、右的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqmax(1, 2)
   */
  cqmax(value1: number, value2: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqmax。
   * @param value2 左、右的数值，自动附加 cqmax。
   * @param value3 下的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqmax(1, 2, 3)
   */
  cqmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqmax。
   * @param value2 右的数值，自动附加 cqmax。
   * @param value3 下的数值，自动附加 cqmax。
   * @param value4 左的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.cqmax(1, 2, 3, 4)
   */
  cqmax(value1: number, value2: number, value3: number, value4: number): string;
  override cqmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmax`).join(' '));
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.percent(1)
   */
  percent(value1: number): string;
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 %。
   * @param value2 左、右的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.percent(1, 2)
   */
  percent(value1: number, value2: number): string;
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 %。
   * @param value2 左、右的数值，自动附加 %。
   * @param value3 下的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.percent(1, 2, 3)
   */
  percent(value1: number, value2: number, value3: number): string;
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 %。
   * @param value2 右的数值，自动附加 %。
   * @param value3 下的数值，自动附加 %。
   * @param value4 左的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPadding.percent(1, 2, 3, 4)
   */
  percent(value1: number, value2: number, value3: number, value4: number): string;
  percent(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}%`).join(' '));
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollPadding.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollPadding.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollPadding | CssString,
    ...others: (Property.ScrollPadding | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollPadding.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollPadding | CssString,
    ...others: (Property.ScrollPadding | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollPadding.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollPadding | CssString,
    preferred: Property.ScrollPadding | CssString,
    maximum: Property.ScrollPadding | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-padding 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollPaddingCss = ScrollPaddingCssRuntime & KeywordDeclarations<ScrollPaddingKeywords>;
/**
 * 设置滚动容器最佳可视区域的四边内缩距离。（scroll-padding）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding
 */
export const ScrollPaddingCss = ScrollPaddingCssRuntime as new () => ScrollPaddingCss;

/**
 * scroll-padding-block 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollPaddingBlockKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ScrollPaddingBlock | CssString
>;
/**
 * 创建 scroll-padding-block 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollPaddingBlockKeywords()
 */
export const ScrollPaddingBlockKeywords = class ScrollPaddingBlockKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ScrollPaddingBlockKeywords;

/**
 * scroll-padding-block 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollPaddingBlockCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-padding-block 属性作者；普通使用通过 s.scrollPaddingBlock 取得共享实例。
   * @example
   * class CustomScrollPaddingBlockCss extends ScrollPaddingBlockCss {}
   */
  constructor() {
    super('scroll-padding-block');
    initializeKeywordDeclarations(this, 'scroll-padding-block', autoKeywords);
  }
  /**
   * 原样生成 scroll-padding-block 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-padding-block:value;，undefined 返回空字符串。
   * @example
   * s.scrollPaddingBlock.raw('inherit') // scroll-padding-block:inherit;
   */
  raw(value: Property.ScrollPaddingBlock | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.px(1)
   */
  px(value1: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 px。
   * @param value2 逻辑块轴结束侧的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.px(1, 2)
   */
  px(value1: number, value2: number): string;
  override px(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}px`).join(' '));
  }
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cm(1)
   */
  cm(value1: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cm。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cm(1, 2)
   */
  cm(value1: number, value2: number): string;
  override cm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cm`).join(' '));
  }
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.mm(1)
   */
  mm(value1: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 mm。
   * @param value2 逻辑块轴结束侧的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.mm(1, 2)
   */
  mm(value1: number, value2: number): string;
  override mm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}mm`).join(' '));
  }
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.q(1)
   */
  q(value1: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 q。
   * @param value2 逻辑块轴结束侧的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.q(1, 2)
   */
  q(value1: number, value2: number): string;
  override q(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}q`).join(' '));
  }
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.in(1)
   */
  in(value1: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 in。
   * @param value2 逻辑块轴结束侧的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.in(1, 2)
   */
  in(value1: number, value2: number): string;
  override in(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}in`).join(' '));
  }
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.pt(1)
   */
  pt(value1: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 pt。
   * @param value2 逻辑块轴结束侧的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.pt(1, 2)
   */
  pt(value1: number, value2: number): string;
  override pt(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pt`).join(' '));
  }
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.pc(1)
   */
  pc(value1: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 pc。
   * @param value2 逻辑块轴结束侧的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.pc(1, 2)
   */
  pc(value1: number, value2: number): string;
  override pc(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pc`).join(' '));
  }
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.em(1)
   */
  em(value1: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 em。
   * @param value2 逻辑块轴结束侧的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.em(1, 2)
   */
  em(value1: number, value2: number): string;
  override em(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}em`).join(' '));
  }
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.rem(1)
   */
  rem(value1: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 rem。
   * @param value2 逻辑块轴结束侧的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.rem(1, 2)
   */
  rem(value1: number, value2: number): string;
  override rem(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rem`).join(' '));
  }
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.ex(1)
   */
  ex(value1: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 ex。
   * @param value2 逻辑块轴结束侧的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.ex(1, 2)
   */
  ex(value1: number, value2: number): string;
  override ex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ex`).join(' '));
  }
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.rex(1)
   */
  rex(value1: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 rex。
   * @param value2 逻辑块轴结束侧的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.rex(1, 2)
   */
  rex(value1: number, value2: number): string;
  override rex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rex`).join(' '));
  }
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.ch(1)
   */
  ch(value1: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 ch。
   * @param value2 逻辑块轴结束侧的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.ch(1, 2)
   */
  ch(value1: number, value2: number): string;
  override ch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ch`).join(' '));
  }
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.rch(1)
   */
  rch(value1: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 rch。
   * @param value2 逻辑块轴结束侧的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.rch(1, 2)
   */
  rch(value1: number, value2: number): string;
  override rch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rch`).join(' '));
  }
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cap(1)
   */
  cap(value1: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cap。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cap(1, 2)
   */
  cap(value1: number, value2: number): string;
  override cap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cap`).join(' '));
  }
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.rcap(1)
   */
  rcap(value1: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 rcap。
   * @param value2 逻辑块轴结束侧的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.rcap(1, 2)
   */
  rcap(value1: number, value2: number): string;
  override rcap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rcap`).join(' '));
  }
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.ic(1)
   */
  ic(value1: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 ic。
   * @param value2 逻辑块轴结束侧的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.ic(1, 2)
   */
  ic(value1: number, value2: number): string;
  override ic(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ic`).join(' '));
  }
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.ric(1)
   */
  ric(value1: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 ric。
   * @param value2 逻辑块轴结束侧的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.ric(1, 2)
   */
  ric(value1: number, value2: number): string;
  override ric(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ric`).join(' '));
  }
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.lh(1)
   */
  lh(value1: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 lh。
   * @param value2 逻辑块轴结束侧的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.lh(1, 2)
   */
  lh(value1: number, value2: number): string;
  override lh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lh`).join(' '));
  }
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.rlh(1)
   */
  rlh(value1: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 rlh。
   * @param value2 逻辑块轴结束侧的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.rlh(1, 2)
   */
  rlh(value1: number, value2: number): string;
  override rlh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rlh`).join(' '));
  }
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.vw(1)
   */
  vw(value1: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 vw。
   * @param value2 逻辑块轴结束侧的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.vw(1, 2)
   */
  vw(value1: number, value2: number): string;
  override vw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vw`).join(' '));
  }
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.vh(1)
   */
  vh(value1: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 vh。
   * @param value2 逻辑块轴结束侧的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.vh(1, 2)
   */
  vh(value1: number, value2: number): string;
  override vh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vh`).join(' '));
  }
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.vi(1)
   */
  vi(value1: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 vi。
   * @param value2 逻辑块轴结束侧的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.vi(1, 2)
   */
  vi(value1: number, value2: number): string;
  override vi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vi`).join(' '));
  }
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.vb(1)
   */
  vb(value1: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 vb。
   * @param value2 逻辑块轴结束侧的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.vb(1, 2)
   */
  vb(value1: number, value2: number): string;
  override vb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vb`).join(' '));
  }
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.vmin(1)
   */
  vmin(value1: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 vmin。
   * @param value2 逻辑块轴结束侧的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.vmin(1, 2)
   */
  vmin(value1: number, value2: number): string;
  override vmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmin`).join(' '));
  }
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.vmax(1)
   */
  vmax(value1: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 vmax。
   * @param value2 逻辑块轴结束侧的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.vmax(1, 2)
   */
  vmax(value1: number, value2: number): string;
  override vmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmax`).join(' '));
  }
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.svw(1)
   */
  svw(value1: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 svw。
   * @param value2 逻辑块轴结束侧的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.svw(1, 2)
   */
  svw(value1: number, value2: number): string;
  override svw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svw`).join(' '));
  }
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.svh(1)
   */
  svh(value1: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 svh。
   * @param value2 逻辑块轴结束侧的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.svh(1, 2)
   */
  svh(value1: number, value2: number): string;
  override svh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svh`).join(' '));
  }
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.svi(1)
   */
  svi(value1: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 svi。
   * @param value2 逻辑块轴结束侧的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.svi(1, 2)
   */
  svi(value1: number, value2: number): string;
  override svi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svi`).join(' '));
  }
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.svb(1)
   */
  svb(value1: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 svb。
   * @param value2 逻辑块轴结束侧的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.svb(1, 2)
   */
  svb(value1: number, value2: number): string;
  override svb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svb`).join(' '));
  }
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.svmin(1)
   */
  svmin(value1: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 svmin。
   * @param value2 逻辑块轴结束侧的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.svmin(1, 2)
   */
  svmin(value1: number, value2: number): string;
  override svmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmin`).join(' '));
  }
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.svmax(1)
   */
  svmax(value1: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 svmax。
   * @param value2 逻辑块轴结束侧的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.svmax(1, 2)
   */
  svmax(value1: number, value2: number): string;
  override svmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmax`).join(' '));
  }
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.lvw(1)
   */
  lvw(value1: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 lvw。
   * @param value2 逻辑块轴结束侧的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.lvw(1, 2)
   */
  lvw(value1: number, value2: number): string;
  override lvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvw`).join(' '));
  }
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.lvh(1)
   */
  lvh(value1: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 lvh。
   * @param value2 逻辑块轴结束侧的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.lvh(1, 2)
   */
  lvh(value1: number, value2: number): string;
  override lvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvh`).join(' '));
  }
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.lvi(1)
   */
  lvi(value1: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 lvi。
   * @param value2 逻辑块轴结束侧的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.lvi(1, 2)
   */
  lvi(value1: number, value2: number): string;
  override lvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvi`).join(' '));
  }
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.lvb(1)
   */
  lvb(value1: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 lvb。
   * @param value2 逻辑块轴结束侧的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.lvb(1, 2)
   */
  lvb(value1: number, value2: number): string;
  override lvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvb`).join(' '));
  }
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.lvmin(1)
   */
  lvmin(value1: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 lvmin。
   * @param value2 逻辑块轴结束侧的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.lvmin(1, 2)
   */
  lvmin(value1: number, value2: number): string;
  override lvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmin`).join(' '));
  }
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.lvmax(1)
   */
  lvmax(value1: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 lvmax。
   * @param value2 逻辑块轴结束侧的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.lvmax(1, 2)
   */
  lvmax(value1: number, value2: number): string;
  override lvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmax`).join(' '));
  }
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.dvw(1)
   */
  dvw(value1: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 dvw。
   * @param value2 逻辑块轴结束侧的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.dvw(1, 2)
   */
  dvw(value1: number, value2: number): string;
  override dvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvw`).join(' '));
  }
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.dvh(1)
   */
  dvh(value1: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 dvh。
   * @param value2 逻辑块轴结束侧的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.dvh(1, 2)
   */
  dvh(value1: number, value2: number): string;
  override dvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvh`).join(' '));
  }
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.dvi(1)
   */
  dvi(value1: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 dvi。
   * @param value2 逻辑块轴结束侧的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.dvi(1, 2)
   */
  dvi(value1: number, value2: number): string;
  override dvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvi`).join(' '));
  }
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.dvb(1)
   */
  dvb(value1: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 dvb。
   * @param value2 逻辑块轴结束侧的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.dvb(1, 2)
   */
  dvb(value1: number, value2: number): string;
  override dvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvb`).join(' '));
  }
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.dvmin(1)
   */
  dvmin(value1: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 dvmin。
   * @param value2 逻辑块轴结束侧的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.dvmin(1, 2)
   */
  dvmin(value1: number, value2: number): string;
  override dvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmin`).join(' '));
  }
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.dvmax(1)
   */
  dvmax(value1: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 dvmax。
   * @param value2 逻辑块轴结束侧的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.dvmax(1, 2)
   */
  dvmax(value1: number, value2: number): string;
  override dvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmax`).join(' '));
  }
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cqw(1)
   */
  cqw(value1: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cqw。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cqw(1, 2)
   */
  cqw(value1: number, value2: number): string;
  override cqw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqw`).join(' '));
  }
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cqh(1)
   */
  cqh(value1: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cqh。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cqh(1, 2)
   */
  cqh(value1: number, value2: number): string;
  override cqh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqh`).join(' '));
  }
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cqi(1)
   */
  cqi(value1: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cqi。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cqi(1, 2)
   */
  cqi(value1: number, value2: number): string;
  override cqi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqi`).join(' '));
  }
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cqb(1)
   */
  cqb(value1: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cqb。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cqb(1, 2)
   */
  cqb(value1: number, value2: number): string;
  override cqb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqb`).join(' '));
  }
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cqmin(1)
   */
  cqmin(value1: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cqmin。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cqmin(1, 2)
   */
  cqmin(value1: number, value2: number): string;
  override cqmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmin`).join(' '));
  }
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cqmax(1)
   */
  cqmax(value1: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 cqmax。
   * @param value2 逻辑块轴结束侧的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.cqmax(1, 2)
   */
  cqmax(value1: number, value2: number): string;
  override cqmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmax`).join(' '));
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.percent(1)
   */
  percent(value1: number): string;
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴起始侧的数值，自动附加 %。
   * @param value2 逻辑块轴结束侧的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlock.percent(1, 2)
   */
  percent(value1: number, value2: number): string;
  percent(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}%`).join(' '));
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollPaddingBlock.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollPaddingBlock.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollPaddingBlock | CssString,
    ...others: (Property.ScrollPaddingBlock | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollPaddingBlock.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollPaddingBlock | CssString,
    ...others: (Property.ScrollPaddingBlock | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollPaddingBlock.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollPaddingBlock | CssString,
    preferred: Property.ScrollPaddingBlock | CssString,
    maximum: Property.ScrollPaddingBlock | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-padding-block 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollPaddingBlockCss = ScrollPaddingBlockCssRuntime &
  KeywordDeclarations<ScrollPaddingBlockKeywords>;
/**
 * 设置滚动容器最佳可视区域在逻辑块轴两侧的内缩距离。（scroll-padding-block）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block
 */
export const ScrollPaddingBlockCss =
  ScrollPaddingBlockCssRuntime as new () => ScrollPaddingBlockCss;

/**
 * scroll-padding-block-end 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollPaddingBlockEndKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ScrollPaddingBlockEnd | CssString
>;
/**
 * 创建 scroll-padding-block-end 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollPaddingBlockEndKeywords()
 */
export const ScrollPaddingBlockEndKeywords = class ScrollPaddingBlockEndKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ScrollPaddingBlockEndKeywords;

/**
 * scroll-padding-block-end 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollPaddingBlockEndCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-padding-block-end 属性作者；普通使用通过 s.scrollPaddingBlockEnd 取得共享实例。
   * @example
   * class CustomScrollPaddingBlockEndCss extends ScrollPaddingBlockEndCss {}
   */
  constructor() {
    super('scroll-padding-block-end');
    initializeKeywordDeclarations(this, 'scroll-padding-block-end', autoKeywords);
  }
  /**
   * 原样生成 scroll-padding-block-end 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-padding-block-end:value;，undefined 返回空字符串。
   * @example
   * s.scrollPaddingBlockEnd.raw('inherit') // scroll-padding-block-end:inherit;
   */
  raw(value: Property.ScrollPaddingBlockEnd | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlockEnd.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollPaddingBlockEnd.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollPaddingBlockEnd.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollPaddingBlockEnd | CssString,
    ...others: (Property.ScrollPaddingBlockEnd | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollPaddingBlockEnd.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollPaddingBlockEnd | CssString,
    ...others: (Property.ScrollPaddingBlockEnd | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollPaddingBlockEnd.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollPaddingBlockEnd | CssString,
    preferred: Property.ScrollPaddingBlockEnd | CssString,
    maximum: Property.ScrollPaddingBlockEnd | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-padding-block-end 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollPaddingBlockEndCss = ScrollPaddingBlockEndCssRuntime &
  KeywordDeclarations<ScrollPaddingBlockEndKeywords>;
/**
 * 设置滚动容器最佳可视区域在逻辑块轴结束侧的内缩距离。（scroll-padding-block-end）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-end
 */
export const ScrollPaddingBlockEndCss =
  ScrollPaddingBlockEndCssRuntime as new () => ScrollPaddingBlockEndCss;

/**
 * scroll-padding-block-start 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollPaddingBlockStartKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ScrollPaddingBlockStart | CssString
>;
/**
 * 创建 scroll-padding-block-start 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollPaddingBlockStartKeywords()
 */
export const ScrollPaddingBlockStartKeywords = class ScrollPaddingBlockStartKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ScrollPaddingBlockStartKeywords;

/**
 * scroll-padding-block-start 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollPaddingBlockStartCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-padding-block-start 属性作者；普通使用通过 s.scrollPaddingBlockStart 取得共享实例。
   * @example
   * class CustomScrollPaddingBlockStartCss extends ScrollPaddingBlockStartCss {}
   */
  constructor() {
    super('scroll-padding-block-start');
    initializeKeywordDeclarations(this, 'scroll-padding-block-start', autoKeywords);
  }
  /**
   * 原样生成 scroll-padding-block-start 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-padding-block-start:value;，undefined 返回空字符串。
   * @example
   * s.scrollPaddingBlockStart.raw('inherit') // scroll-padding-block-start:inherit;
   */
  raw(value: Property.ScrollPaddingBlockStart | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBlockStart.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollPaddingBlockStart.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollPaddingBlockStart.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollPaddingBlockStart | CssString,
    ...others: (Property.ScrollPaddingBlockStart | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollPaddingBlockStart.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollPaddingBlockStart | CssString,
    ...others: (Property.ScrollPaddingBlockStart | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollPaddingBlockStart.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollPaddingBlockStart | CssString,
    preferred: Property.ScrollPaddingBlockStart | CssString,
    maximum: Property.ScrollPaddingBlockStart | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-padding-block-start 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollPaddingBlockStartCss = ScrollPaddingBlockStartCssRuntime &
  KeywordDeclarations<ScrollPaddingBlockStartKeywords>;
/**
 * 设置滚动容器最佳可视区域在逻辑块轴起始侧的内缩距离。（scroll-padding-block-start）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-block-start
 */
export const ScrollPaddingBlockStartCss =
  ScrollPaddingBlockStartCssRuntime as new () => ScrollPaddingBlockStartCss;

/**
 * scroll-padding-bottom 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollPaddingBottomKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ScrollPaddingBottom | CssString
>;
/**
 * 创建 scroll-padding-bottom 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollPaddingBottomKeywords()
 */
export const ScrollPaddingBottomKeywords = class ScrollPaddingBottomKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ScrollPaddingBottomKeywords;

/**
 * scroll-padding-bottom 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollPaddingBottomCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-padding-bottom 属性作者；普通使用通过 s.scrollPaddingBottom 取得共享实例。
   * @example
   * class CustomScrollPaddingBottomCss extends ScrollPaddingBottomCss {}
   */
  constructor() {
    super('scroll-padding-bottom');
    initializeKeywordDeclarations(this, 'scroll-padding-bottom', autoKeywords);
  }
  /**
   * 原样生成 scroll-padding-bottom 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-padding-bottom:value;，undefined 返回空字符串。
   * @example
   * s.scrollPaddingBottom.raw('inherit') // scroll-padding-bottom:inherit;
   */
  raw(value: Property.ScrollPaddingBottom | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingBottom.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollPaddingBottom.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollPaddingBottom.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollPaddingBottom | CssString,
    ...others: (Property.ScrollPaddingBottom | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollPaddingBottom.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollPaddingBottom | CssString,
    ...others: (Property.ScrollPaddingBottom | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollPaddingBottom.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollPaddingBottom | CssString,
    preferred: Property.ScrollPaddingBottom | CssString,
    maximum: Property.ScrollPaddingBottom | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-padding-bottom 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollPaddingBottomCss = ScrollPaddingBottomCssRuntime &
  KeywordDeclarations<ScrollPaddingBottomKeywords>;
/**
 * 设置滚动容器最佳可视区域下侧的内缩距离。（scroll-padding-bottom）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-bottom
 */
export const ScrollPaddingBottomCss =
  ScrollPaddingBottomCssRuntime as new () => ScrollPaddingBottomCss;

/**
 * scroll-padding-inline 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollPaddingInlineKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ScrollPaddingInline | CssString
>;
/**
 * 创建 scroll-padding-inline 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollPaddingInlineKeywords()
 */
export const ScrollPaddingInlineKeywords = class ScrollPaddingInlineKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ScrollPaddingInlineKeywords;

/**
 * scroll-padding-inline 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollPaddingInlineCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-padding-inline 属性作者；普通使用通过 s.scrollPaddingInline 取得共享实例。
   * @example
   * class CustomScrollPaddingInlineCss extends ScrollPaddingInlineCss {}
   */
  constructor() {
    super('scroll-padding-inline');
    initializeKeywordDeclarations(this, 'scroll-padding-inline', autoKeywords);
  }
  /**
   * 原样生成 scroll-padding-inline 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-padding-inline:value;，undefined 返回空字符串。
   * @example
   * s.scrollPaddingInline.raw('inherit') // scroll-padding-inline:inherit;
   */
  raw(value: Property.ScrollPaddingInline | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.px(1)
   */
  px(value1: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 px。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.px(1, 2)
   */
  px(value1: number, value2: number): string;
  override px(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}px`).join(' '));
  }
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cm(1)
   */
  cm(value1: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cm。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cm(1, 2)
   */
  cm(value1: number, value2: number): string;
  override cm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cm`).join(' '));
  }
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.mm(1)
   */
  mm(value1: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 mm。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.mm(1, 2)
   */
  mm(value1: number, value2: number): string;
  override mm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}mm`).join(' '));
  }
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.q(1)
   */
  q(value1: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 q。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.q(1, 2)
   */
  q(value1: number, value2: number): string;
  override q(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}q`).join(' '));
  }
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.in(1)
   */
  in(value1: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 in。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.in(1, 2)
   */
  in(value1: number, value2: number): string;
  override in(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}in`).join(' '));
  }
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.pt(1)
   */
  pt(value1: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 pt。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.pt(1, 2)
   */
  pt(value1: number, value2: number): string;
  override pt(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pt`).join(' '));
  }
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.pc(1)
   */
  pc(value1: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 pc。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.pc(1, 2)
   */
  pc(value1: number, value2: number): string;
  override pc(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pc`).join(' '));
  }
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.em(1)
   */
  em(value1: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 em。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.em(1, 2)
   */
  em(value1: number, value2: number): string;
  override em(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}em`).join(' '));
  }
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.rem(1)
   */
  rem(value1: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 rem。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.rem(1, 2)
   */
  rem(value1: number, value2: number): string;
  override rem(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rem`).join(' '));
  }
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.ex(1)
   */
  ex(value1: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 ex。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.ex(1, 2)
   */
  ex(value1: number, value2: number): string;
  override ex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ex`).join(' '));
  }
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.rex(1)
   */
  rex(value1: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 rex。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.rex(1, 2)
   */
  rex(value1: number, value2: number): string;
  override rex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rex`).join(' '));
  }
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.ch(1)
   */
  ch(value1: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 ch。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.ch(1, 2)
   */
  ch(value1: number, value2: number): string;
  override ch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ch`).join(' '));
  }
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.rch(1)
   */
  rch(value1: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 rch。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.rch(1, 2)
   */
  rch(value1: number, value2: number): string;
  override rch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rch`).join(' '));
  }
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cap(1)
   */
  cap(value1: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cap。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cap(1, 2)
   */
  cap(value1: number, value2: number): string;
  override cap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cap`).join(' '));
  }
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.rcap(1)
   */
  rcap(value1: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 rcap。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.rcap(1, 2)
   */
  rcap(value1: number, value2: number): string;
  override rcap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rcap`).join(' '));
  }
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.ic(1)
   */
  ic(value1: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 ic。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.ic(1, 2)
   */
  ic(value1: number, value2: number): string;
  override ic(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ic`).join(' '));
  }
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.ric(1)
   */
  ric(value1: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 ric。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.ric(1, 2)
   */
  ric(value1: number, value2: number): string;
  override ric(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ric`).join(' '));
  }
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.lh(1)
   */
  lh(value1: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 lh。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.lh(1, 2)
   */
  lh(value1: number, value2: number): string;
  override lh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lh`).join(' '));
  }
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.rlh(1)
   */
  rlh(value1: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 rlh。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.rlh(1, 2)
   */
  rlh(value1: number, value2: number): string;
  override rlh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rlh`).join(' '));
  }
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.vw(1)
   */
  vw(value1: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 vw。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.vw(1, 2)
   */
  vw(value1: number, value2: number): string;
  override vw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vw`).join(' '));
  }
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.vh(1)
   */
  vh(value1: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 vh。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.vh(1, 2)
   */
  vh(value1: number, value2: number): string;
  override vh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vh`).join(' '));
  }
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.vi(1)
   */
  vi(value1: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 vi。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.vi(1, 2)
   */
  vi(value1: number, value2: number): string;
  override vi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vi`).join(' '));
  }
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.vb(1)
   */
  vb(value1: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 vb。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.vb(1, 2)
   */
  vb(value1: number, value2: number): string;
  override vb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vb`).join(' '));
  }
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.vmin(1)
   */
  vmin(value1: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 vmin。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.vmin(1, 2)
   */
  vmin(value1: number, value2: number): string;
  override vmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmin`).join(' '));
  }
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.vmax(1)
   */
  vmax(value1: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 vmax。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.vmax(1, 2)
   */
  vmax(value1: number, value2: number): string;
  override vmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmax`).join(' '));
  }
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.svw(1)
   */
  svw(value1: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 svw。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.svw(1, 2)
   */
  svw(value1: number, value2: number): string;
  override svw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svw`).join(' '));
  }
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.svh(1)
   */
  svh(value1: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 svh。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.svh(1, 2)
   */
  svh(value1: number, value2: number): string;
  override svh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svh`).join(' '));
  }
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.svi(1)
   */
  svi(value1: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 svi。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.svi(1, 2)
   */
  svi(value1: number, value2: number): string;
  override svi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svi`).join(' '));
  }
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.svb(1)
   */
  svb(value1: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 svb。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.svb(1, 2)
   */
  svb(value1: number, value2: number): string;
  override svb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svb`).join(' '));
  }
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.svmin(1)
   */
  svmin(value1: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 svmin。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.svmin(1, 2)
   */
  svmin(value1: number, value2: number): string;
  override svmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmin`).join(' '));
  }
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.svmax(1)
   */
  svmax(value1: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 svmax。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.svmax(1, 2)
   */
  svmax(value1: number, value2: number): string;
  override svmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmax`).join(' '));
  }
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.lvw(1)
   */
  lvw(value1: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 lvw。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.lvw(1, 2)
   */
  lvw(value1: number, value2: number): string;
  override lvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvw`).join(' '));
  }
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.lvh(1)
   */
  lvh(value1: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 lvh。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.lvh(1, 2)
   */
  lvh(value1: number, value2: number): string;
  override lvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvh`).join(' '));
  }
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.lvi(1)
   */
  lvi(value1: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 lvi。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.lvi(1, 2)
   */
  lvi(value1: number, value2: number): string;
  override lvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvi`).join(' '));
  }
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.lvb(1)
   */
  lvb(value1: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 lvb。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.lvb(1, 2)
   */
  lvb(value1: number, value2: number): string;
  override lvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvb`).join(' '));
  }
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.lvmin(1)
   */
  lvmin(value1: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 lvmin。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.lvmin(1, 2)
   */
  lvmin(value1: number, value2: number): string;
  override lvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmin`).join(' '));
  }
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.lvmax(1)
   */
  lvmax(value1: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 lvmax。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.lvmax(1, 2)
   */
  lvmax(value1: number, value2: number): string;
  override lvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmax`).join(' '));
  }
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.dvw(1)
   */
  dvw(value1: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 dvw。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.dvw(1, 2)
   */
  dvw(value1: number, value2: number): string;
  override dvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvw`).join(' '));
  }
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.dvh(1)
   */
  dvh(value1: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 dvh。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.dvh(1, 2)
   */
  dvh(value1: number, value2: number): string;
  override dvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvh`).join(' '));
  }
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.dvi(1)
   */
  dvi(value1: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 dvi。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.dvi(1, 2)
   */
  dvi(value1: number, value2: number): string;
  override dvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvi`).join(' '));
  }
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.dvb(1)
   */
  dvb(value1: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 dvb。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.dvb(1, 2)
   */
  dvb(value1: number, value2: number): string;
  override dvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvb`).join(' '));
  }
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.dvmin(1)
   */
  dvmin(value1: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 dvmin。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.dvmin(1, 2)
   */
  dvmin(value1: number, value2: number): string;
  override dvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmin`).join(' '));
  }
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.dvmax(1)
   */
  dvmax(value1: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 dvmax。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.dvmax(1, 2)
   */
  dvmax(value1: number, value2: number): string;
  override dvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmax`).join(' '));
  }
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cqw(1)
   */
  cqw(value1: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cqw。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cqw(1, 2)
   */
  cqw(value1: number, value2: number): string;
  override cqw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqw`).join(' '));
  }
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cqh(1)
   */
  cqh(value1: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cqh。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cqh(1, 2)
   */
  cqh(value1: number, value2: number): string;
  override cqh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqh`).join(' '));
  }
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cqi(1)
   */
  cqi(value1: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cqi。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cqi(1, 2)
   */
  cqi(value1: number, value2: number): string;
  override cqi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqi`).join(' '));
  }
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cqb(1)
   */
  cqb(value1: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cqb。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cqb(1, 2)
   */
  cqb(value1: number, value2: number): string;
  override cqb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqb`).join(' '));
  }
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cqmin(1)
   */
  cqmin(value1: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cqmin。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cqmin(1, 2)
   */
  cqmin(value1: number, value2: number): string;
  override cqmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmin`).join(' '));
  }
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cqmax(1)
   */
  cqmax(value1: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 cqmax。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.cqmax(1, 2)
   */
  cqmax(value1: number, value2: number): string;
  override cqmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmax`).join(' '));
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.percent(1)
   */
  percent(value1: number): string;
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴起始侧的数值，自动附加 %。
   * @param value2 逻辑行内轴结束侧的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInline.percent(1, 2)
   */
  percent(value1: number, value2: number): string;
  percent(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}%`).join(' '));
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollPaddingInline.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollPaddingInline.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollPaddingInline | CssString,
    ...others: (Property.ScrollPaddingInline | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollPaddingInline.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollPaddingInline | CssString,
    ...others: (Property.ScrollPaddingInline | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollPaddingInline.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollPaddingInline | CssString,
    preferred: Property.ScrollPaddingInline | CssString,
    maximum: Property.ScrollPaddingInline | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-padding-inline 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollPaddingInlineCss = ScrollPaddingInlineCssRuntime &
  KeywordDeclarations<ScrollPaddingInlineKeywords>;
/**
 * 设置滚动容器最佳可视区域在逻辑行内轴两侧的内缩距离。（scroll-padding-inline）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline
 */
export const ScrollPaddingInlineCss =
  ScrollPaddingInlineCssRuntime as new () => ScrollPaddingInlineCss;

/**
 * scroll-padding-inline-end 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollPaddingInlineEndKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ScrollPaddingInlineEnd | CssString
>;
/**
 * 创建 scroll-padding-inline-end 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollPaddingInlineEndKeywords()
 */
export const ScrollPaddingInlineEndKeywords = class ScrollPaddingInlineEndKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ScrollPaddingInlineEndKeywords;

/**
 * scroll-padding-inline-end 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollPaddingInlineEndCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-padding-inline-end 属性作者；普通使用通过 s.scrollPaddingInlineEnd 取得共享实例。
   * @example
   * class CustomScrollPaddingInlineEndCss extends ScrollPaddingInlineEndCss {}
   */
  constructor() {
    super('scroll-padding-inline-end');
    initializeKeywordDeclarations(this, 'scroll-padding-inline-end', autoKeywords);
  }
  /**
   * 原样生成 scroll-padding-inline-end 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-padding-inline-end:value;，undefined 返回空字符串。
   * @example
   * s.scrollPaddingInlineEnd.raw('inherit') // scroll-padding-inline-end:inherit;
   */
  raw(value: Property.ScrollPaddingInlineEnd | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInlineEnd.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollPaddingInlineEnd.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollPaddingInlineEnd.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollPaddingInlineEnd | CssString,
    ...others: (Property.ScrollPaddingInlineEnd | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollPaddingInlineEnd.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollPaddingInlineEnd | CssString,
    ...others: (Property.ScrollPaddingInlineEnd | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollPaddingInlineEnd.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollPaddingInlineEnd | CssString,
    preferred: Property.ScrollPaddingInlineEnd | CssString,
    maximum: Property.ScrollPaddingInlineEnd | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-padding-inline-end 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollPaddingInlineEndCss = ScrollPaddingInlineEndCssRuntime &
  KeywordDeclarations<ScrollPaddingInlineEndKeywords>;
/**
 * 设置滚动容器最佳可视区域在逻辑行内轴结束侧的内缩距离。（scroll-padding-inline-end）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-end
 */
export const ScrollPaddingInlineEndCss =
  ScrollPaddingInlineEndCssRuntime as new () => ScrollPaddingInlineEndCss;

/**
 * scroll-padding-inline-start 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollPaddingInlineStartKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ScrollPaddingInlineStart | CssString
>;
/**
 * 创建 scroll-padding-inline-start 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollPaddingInlineStartKeywords()
 */
export const ScrollPaddingInlineStartKeywords = class ScrollPaddingInlineStartKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ScrollPaddingInlineStartKeywords;

/**
 * scroll-padding-inline-start 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollPaddingInlineStartCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-padding-inline-start 属性作者；普通使用通过 s.scrollPaddingInlineStart 取得共享实例。
   * @example
   * class CustomScrollPaddingInlineStartCss extends ScrollPaddingInlineStartCss {}
   */
  constructor() {
    super('scroll-padding-inline-start');
    initializeKeywordDeclarations(this, 'scroll-padding-inline-start', autoKeywords);
  }
  /**
   * 原样生成 scroll-padding-inline-start 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-padding-inline-start:value;，undefined 返回空字符串。
   * @example
   * s.scrollPaddingInlineStart.raw('inherit') // scroll-padding-inline-start:inherit;
   */
  raw(value: Property.ScrollPaddingInlineStart | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingInlineStart.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollPaddingInlineStart.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollPaddingInlineStart.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollPaddingInlineStart | CssString,
    ...others: (Property.ScrollPaddingInlineStart | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollPaddingInlineStart.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollPaddingInlineStart | CssString,
    ...others: (Property.ScrollPaddingInlineStart | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollPaddingInlineStart.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollPaddingInlineStart | CssString,
    preferred: Property.ScrollPaddingInlineStart | CssString,
    maximum: Property.ScrollPaddingInlineStart | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-padding-inline-start 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollPaddingInlineStartCss = ScrollPaddingInlineStartCssRuntime &
  KeywordDeclarations<ScrollPaddingInlineStartKeywords>;
/**
 * 设置滚动容器最佳可视区域在逻辑行内轴起始侧的内缩距离。（scroll-padding-inline-start）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-inline-start
 */
export const ScrollPaddingInlineStartCss =
  ScrollPaddingInlineStartCssRuntime as new () => ScrollPaddingInlineStartCss;

/**
 * scroll-padding-left 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollPaddingLeftKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ScrollPaddingLeft | CssString
>;
/**
 * 创建 scroll-padding-left 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollPaddingLeftKeywords()
 */
export const ScrollPaddingLeftKeywords = class ScrollPaddingLeftKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ScrollPaddingLeftKeywords;

/**
 * scroll-padding-left 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollPaddingLeftCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-padding-left 属性作者；普通使用通过 s.scrollPaddingLeft 取得共享实例。
   * @example
   * class CustomScrollPaddingLeftCss extends ScrollPaddingLeftCss {}
   */
  constructor() {
    super('scroll-padding-left');
    initializeKeywordDeclarations(this, 'scroll-padding-left', autoKeywords);
  }
  /**
   * 原样生成 scroll-padding-left 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-padding-left:value;，undefined 返回空字符串。
   * @example
   * s.scrollPaddingLeft.raw('inherit') // scroll-padding-left:inherit;
   */
  raw(value: Property.ScrollPaddingLeft | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingLeft.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollPaddingLeft.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollPaddingLeft.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollPaddingLeft | CssString,
    ...others: (Property.ScrollPaddingLeft | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollPaddingLeft.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollPaddingLeft | CssString,
    ...others: (Property.ScrollPaddingLeft | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollPaddingLeft.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollPaddingLeft | CssString,
    preferred: Property.ScrollPaddingLeft | CssString,
    maximum: Property.ScrollPaddingLeft | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-padding-left 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollPaddingLeftCss = ScrollPaddingLeftCssRuntime &
  KeywordDeclarations<ScrollPaddingLeftKeywords>;
/**
 * 设置滚动容器最佳可视区域左侧的内缩距离。（scroll-padding-left）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-left
 */
export const ScrollPaddingLeftCss = ScrollPaddingLeftCssRuntime as new () => ScrollPaddingLeftCss;

/**
 * scroll-padding-right 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollPaddingRightKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ScrollPaddingRight | CssString
>;
/**
 * 创建 scroll-padding-right 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollPaddingRightKeywords()
 */
export const ScrollPaddingRightKeywords = class ScrollPaddingRightKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ScrollPaddingRightKeywords;

/**
 * scroll-padding-right 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollPaddingRightCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-padding-right 属性作者；普通使用通过 s.scrollPaddingRight 取得共享实例。
   * @example
   * class CustomScrollPaddingRightCss extends ScrollPaddingRightCss {}
   */
  constructor() {
    super('scroll-padding-right');
    initializeKeywordDeclarations(this, 'scroll-padding-right', autoKeywords);
  }
  /**
   * 原样生成 scroll-padding-right 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-padding-right:value;，undefined 返回空字符串。
   * @example
   * s.scrollPaddingRight.raw('inherit') // scroll-padding-right:inherit;
   */
  raw(value: Property.ScrollPaddingRight | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingRight.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollPaddingRight.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollPaddingRight.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollPaddingRight | CssString,
    ...others: (Property.ScrollPaddingRight | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollPaddingRight.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollPaddingRight | CssString,
    ...others: (Property.ScrollPaddingRight | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollPaddingRight.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollPaddingRight | CssString,
    preferred: Property.ScrollPaddingRight | CssString,
    maximum: Property.ScrollPaddingRight | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-padding-right 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollPaddingRightCss = ScrollPaddingRightCssRuntime &
  KeywordDeclarations<ScrollPaddingRightKeywords>;
/**
 * 设置滚动容器最佳可视区域右侧的内缩距离。（scroll-padding-right）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-right
 */
export const ScrollPaddingRightCss =
  ScrollPaddingRightCssRuntime as new () => ScrollPaddingRightCss;

/**
 * scroll-padding-top 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollPaddingTopKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ScrollPaddingTop | CssString
>;
/**
 * 创建 scroll-padding-top 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollPaddingTopKeywords()
 */
export const ScrollPaddingTopKeywords = class ScrollPaddingTopKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ScrollPaddingTopKeywords;

/**
 * scroll-padding-top 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollPaddingTopCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-padding-top 属性作者；普通使用通过 s.scrollPaddingTop 取得共享实例。
   * @example
   * class CustomScrollPaddingTopCss extends ScrollPaddingTopCss {}
   */
  constructor() {
    super('scroll-padding-top');
    initializeKeywordDeclarations(this, 'scroll-padding-top', autoKeywords);
  }
  /**
   * 原样生成 scroll-padding-top 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-padding-top:value;，undefined 返回空字符串。
   * @example
   * s.scrollPaddingTop.raw('inherit') // scroll-padding-top:inherit;
   */
  raw(value: Property.ScrollPaddingTop | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollPaddingTop.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollPaddingTop.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollPaddingTop.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollPaddingTop | CssString,
    ...others: (Property.ScrollPaddingTop | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollPaddingTop.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollPaddingTop | CssString,
    ...others: (Property.ScrollPaddingTop | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollPaddingTop.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollPaddingTop | CssString,
    preferred: Property.ScrollPaddingTop | CssString,
    maximum: Property.ScrollPaddingTop | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-padding-top 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollPaddingTopCss = ScrollPaddingTopCssRuntime &
  KeywordDeclarations<ScrollPaddingTopKeywords>;
/**
 * 设置滚动容器最佳可视区域上侧的内缩距离。（scroll-padding-top）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-padding-top
 */
export const ScrollPaddingTopCss = ScrollPaddingTopCssRuntime as new () => ScrollPaddingTopCss;
import { scrollSnapAlignKeywords } from './keyword-sets.js';

/**
 * scroll-snap-align 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollSnapAlignKeywords = KeywordValuesOf<
  typeof scrollSnapAlignKeywords,
  Property.ScrollSnapAlign | CssString
>;
/**
 * 创建 scroll-snap-align 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollSnapAlignKeywords()
 */
export const ScrollSnapAlignKeywords = class ScrollSnapAlignKeywords {
  constructor() {
    Object.assign(this, scrollSnapAlignKeywords);
  }
} as new () => ScrollSnapAlignKeywords;

/**
 * scroll-snap-align 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollSnapAlignCssRuntime extends CssProperty {
  /**
   * 创建 scroll-snap-align 属性作者；普通使用通过 s.scrollSnapAlign 取得共享实例。
   * @example
   * class CustomScrollSnapAlignCss extends ScrollSnapAlignCss {}
   */
  constructor() {
    super('scroll-snap-align');
    initializeKeywordDeclarations(this, 'scroll-snap-align', scrollSnapAlignKeywords);
  }
  /**
   * 原样生成 scroll-snap-align 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-snap-align:value;，undefined 返回空字符串。
   * @example
   * s.scrollSnapAlign.raw('inherit') // scroll-snap-align:inherit;
   */
  raw(value: Property.ScrollSnapAlign | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * scroll-snap-align 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollSnapAlignCss = ScrollSnapAlignCssRuntime &
  KeywordDeclarations<ScrollSnapAlignKeywords>;
/**
 * 设置元素作为滚动吸附目标时在块轴和行内轴上的对齐位置。（scroll-snap-align）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-align
 */
export const ScrollSnapAlignCss = ScrollSnapAlignCssRuntime as new () => ScrollSnapAlignCss;

/**
 * scroll-snap-margin 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollSnapMarginKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMargin | CssString
>;
/**
 * 创建 scroll-snap-margin 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollSnapMarginKeywords()
 */
export const ScrollSnapMarginKeywords = class ScrollSnapMarginKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollSnapMarginKeywords;

/**
 * scroll-snap-margin 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollSnapMarginCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-snap-margin 属性作者；普通使用通过 s.scrollSnapMargin 取得共享实例。
   * @example
   * class CustomScrollSnapMarginCss extends ScrollSnapMarginCss {}
   */
  constructor() {
    super('scroll-snap-margin');
    initializeKeywordDeclarations(this, 'scroll-snap-margin', globalKeywords);
  }
  /**
   * 原样生成 scroll-snap-margin 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-snap-margin:value;，undefined 返回空字符串。
   * @example
   * s.scrollSnapMargin.raw('inherit') // scroll-snap-margin:inherit;
   */
  raw(value: Property.ScrollMargin | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.px(1)
   */
  px(value1: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 px。
   * @param value2 左、右的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.px(1, 2)
   */
  px(value1: number, value2: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 px。
   * @param value2 左、右的数值，自动附加 px。
   * @param value3 下的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.px(1, 2, 3)
   */
  px(value1: number, value2: number, value3: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 px。
   * @param value2 右的数值，自动附加 px。
   * @param value3 下的数值，自动附加 px。
   * @param value4 左的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.px(1, 2, 3, 4)
   */
  px(value1: number, value2: number, value3: number, value4: number): string;
  override px(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}px`).join(' '));
  }
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cm(1)
   */
  cm(value1: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cm。
   * @param value2 左、右的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cm(1, 2)
   */
  cm(value1: number, value2: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cm。
   * @param value2 左、右的数值，自动附加 cm。
   * @param value3 下的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cm(1, 2, 3)
   */
  cm(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cm。
   * @param value2 右的数值，自动附加 cm。
   * @param value3 下的数值，自动附加 cm。
   * @param value4 左的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cm(1, 2, 3, 4)
   */
  cm(value1: number, value2: number, value3: number, value4: number): string;
  override cm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cm`).join(' '));
  }
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.mm(1)
   */
  mm(value1: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 mm。
   * @param value2 左、右的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.mm(1, 2)
   */
  mm(value1: number, value2: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 mm。
   * @param value2 左、右的数值，自动附加 mm。
   * @param value3 下的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.mm(1, 2, 3)
   */
  mm(value1: number, value2: number, value3: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 mm。
   * @param value2 右的数值，自动附加 mm。
   * @param value3 下的数值，自动附加 mm。
   * @param value4 左的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.mm(1, 2, 3, 4)
   */
  mm(value1: number, value2: number, value3: number, value4: number): string;
  override mm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}mm`).join(' '));
  }
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.q(1)
   */
  q(value1: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 q。
   * @param value2 左、右的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.q(1, 2)
   */
  q(value1: number, value2: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 q。
   * @param value2 左、右的数值，自动附加 q。
   * @param value3 下的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.q(1, 2, 3)
   */
  q(value1: number, value2: number, value3: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 q。
   * @param value2 右的数值，自动附加 q。
   * @param value3 下的数值，自动附加 q。
   * @param value4 左的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.q(1, 2, 3, 4)
   */
  q(value1: number, value2: number, value3: number, value4: number): string;
  override q(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}q`).join(' '));
  }
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.in(1)
   */
  in(value1: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 in。
   * @param value2 左、右的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.in(1, 2)
   */
  in(value1: number, value2: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 in。
   * @param value2 左、右的数值，自动附加 in。
   * @param value3 下的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.in(1, 2, 3)
   */
  in(value1: number, value2: number, value3: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 in。
   * @param value2 右的数值，自动附加 in。
   * @param value3 下的数值，自动附加 in。
   * @param value4 左的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.in(1, 2, 3, 4)
   */
  in(value1: number, value2: number, value3: number, value4: number): string;
  override in(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}in`).join(' '));
  }
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.pt(1)
   */
  pt(value1: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 pt。
   * @param value2 左、右的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.pt(1, 2)
   */
  pt(value1: number, value2: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 pt。
   * @param value2 左、右的数值，自动附加 pt。
   * @param value3 下的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.pt(1, 2, 3)
   */
  pt(value1: number, value2: number, value3: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 pt。
   * @param value2 右的数值，自动附加 pt。
   * @param value3 下的数值，自动附加 pt。
   * @param value4 左的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.pt(1, 2, 3, 4)
   */
  pt(value1: number, value2: number, value3: number, value4: number): string;
  override pt(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pt`).join(' '));
  }
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.pc(1)
   */
  pc(value1: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 pc。
   * @param value2 左、右的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.pc(1, 2)
   */
  pc(value1: number, value2: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 pc。
   * @param value2 左、右的数值，自动附加 pc。
   * @param value3 下的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.pc(1, 2, 3)
   */
  pc(value1: number, value2: number, value3: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 pc。
   * @param value2 右的数值，自动附加 pc。
   * @param value3 下的数值，自动附加 pc。
   * @param value4 左的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.pc(1, 2, 3, 4)
   */
  pc(value1: number, value2: number, value3: number, value4: number): string;
  override pc(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pc`).join(' '));
  }
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.em(1)
   */
  em(value1: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 em。
   * @param value2 左、右的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.em(1, 2)
   */
  em(value1: number, value2: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 em。
   * @param value2 左、右的数值，自动附加 em。
   * @param value3 下的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.em(1, 2, 3)
   */
  em(value1: number, value2: number, value3: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 em。
   * @param value2 右的数值，自动附加 em。
   * @param value3 下的数值，自动附加 em。
   * @param value4 左的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.em(1, 2, 3, 4)
   */
  em(value1: number, value2: number, value3: number, value4: number): string;
  override em(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}em`).join(' '));
  }
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rem(1)
   */
  rem(value1: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rem。
   * @param value2 左、右的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rem(1, 2)
   */
  rem(value1: number, value2: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rem。
   * @param value2 左、右的数值，自动附加 rem。
   * @param value3 下的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rem(1, 2, 3)
   */
  rem(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rem。
   * @param value2 右的数值，自动附加 rem。
   * @param value3 下的数值，自动附加 rem。
   * @param value4 左的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rem(1, 2, 3, 4)
   */
  rem(value1: number, value2: number, value3: number, value4: number): string;
  override rem(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rem`).join(' '));
  }
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ex(1)
   */
  ex(value1: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 ex。
   * @param value2 左、右的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ex(1, 2)
   */
  ex(value1: number, value2: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ex。
   * @param value2 左、右的数值，自动附加 ex。
   * @param value3 下的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ex(1, 2, 3)
   */
  ex(value1: number, value2: number, value3: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ex。
   * @param value2 右的数值，自动附加 ex。
   * @param value3 下的数值，自动附加 ex。
   * @param value4 左的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ex(1, 2, 3, 4)
   */
  ex(value1: number, value2: number, value3: number, value4: number): string;
  override ex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ex`).join(' '));
  }
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rex(1)
   */
  rex(value1: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rex。
   * @param value2 左、右的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rex(1, 2)
   */
  rex(value1: number, value2: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rex。
   * @param value2 左、右的数值，自动附加 rex。
   * @param value3 下的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rex(1, 2, 3)
   */
  rex(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rex。
   * @param value2 右的数值，自动附加 rex。
   * @param value3 下的数值，自动附加 rex。
   * @param value4 左的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rex(1, 2, 3, 4)
   */
  rex(value1: number, value2: number, value3: number, value4: number): string;
  override rex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rex`).join(' '));
  }
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ch(1)
   */
  ch(value1: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 ch。
   * @param value2 左、右的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ch(1, 2)
   */
  ch(value1: number, value2: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ch。
   * @param value2 左、右的数值，自动附加 ch。
   * @param value3 下的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ch(1, 2, 3)
   */
  ch(value1: number, value2: number, value3: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ch。
   * @param value2 右的数值，自动附加 ch。
   * @param value3 下的数值，自动附加 ch。
   * @param value4 左的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ch(1, 2, 3, 4)
   */
  ch(value1: number, value2: number, value3: number, value4: number): string;
  override ch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ch`).join(' '));
  }
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rch(1)
   */
  rch(value1: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rch。
   * @param value2 左、右的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rch(1, 2)
   */
  rch(value1: number, value2: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rch。
   * @param value2 左、右的数值，自动附加 rch。
   * @param value3 下的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rch(1, 2, 3)
   */
  rch(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rch。
   * @param value2 右的数值，自动附加 rch。
   * @param value3 下的数值，自动附加 rch。
   * @param value4 左的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rch(1, 2, 3, 4)
   */
  rch(value1: number, value2: number, value3: number, value4: number): string;
  override rch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rch`).join(' '));
  }
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cap(1)
   */
  cap(value1: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cap。
   * @param value2 左、右的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cap(1, 2)
   */
  cap(value1: number, value2: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cap。
   * @param value2 左、右的数值，自动附加 cap。
   * @param value3 下的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cap(1, 2, 3)
   */
  cap(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cap。
   * @param value2 右的数值，自动附加 cap。
   * @param value3 下的数值，自动附加 cap。
   * @param value4 左的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cap(1, 2, 3, 4)
   */
  cap(value1: number, value2: number, value3: number, value4: number): string;
  override cap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cap`).join(' '));
  }
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rcap(1)
   */
  rcap(value1: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rcap。
   * @param value2 左、右的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rcap(1, 2)
   */
  rcap(value1: number, value2: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rcap。
   * @param value2 左、右的数值，自动附加 rcap。
   * @param value3 下的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rcap(1, 2, 3)
   */
  rcap(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rcap。
   * @param value2 右的数值，自动附加 rcap。
   * @param value3 下的数值，自动附加 rcap。
   * @param value4 左的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rcap(1, 2, 3, 4)
   */
  rcap(value1: number, value2: number, value3: number, value4: number): string;
  override rcap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rcap`).join(' '));
  }
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ic(1)
   */
  ic(value1: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 ic。
   * @param value2 左、右的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ic(1, 2)
   */
  ic(value1: number, value2: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ic。
   * @param value2 左、右的数值，自动附加 ic。
   * @param value3 下的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ic(1, 2, 3)
   */
  ic(value1: number, value2: number, value3: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ic。
   * @param value2 右的数值，自动附加 ic。
   * @param value3 下的数值，自动附加 ic。
   * @param value4 左的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ic(1, 2, 3, 4)
   */
  ic(value1: number, value2: number, value3: number, value4: number): string;
  override ic(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ic`).join(' '));
  }
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ric(1)
   */
  ric(value1: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 ric。
   * @param value2 左、右的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ric(1, 2)
   */
  ric(value1: number, value2: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ric。
   * @param value2 左、右的数值，自动附加 ric。
   * @param value3 下的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ric(1, 2, 3)
   */
  ric(value1: number, value2: number, value3: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 ric。
   * @param value2 右的数值，自动附加 ric。
   * @param value3 下的数值，自动附加 ric。
   * @param value4 左的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.ric(1, 2, 3, 4)
   */
  ric(value1: number, value2: number, value3: number, value4: number): string;
  override ric(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ric`).join(' '));
  }
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lh(1)
   */
  lh(value1: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lh。
   * @param value2 左、右的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lh(1, 2)
   */
  lh(value1: number, value2: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lh。
   * @param value2 左、右的数值，自动附加 lh。
   * @param value3 下的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lh(1, 2, 3)
   */
  lh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lh。
   * @param value2 右的数值，自动附加 lh。
   * @param value3 下的数值，自动附加 lh。
   * @param value4 左的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lh(1, 2, 3, 4)
   */
  lh(value1: number, value2: number, value3: number, value4: number): string;
  override lh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lh`).join(' '));
  }
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rlh(1)
   */
  rlh(value1: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 rlh。
   * @param value2 左、右的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rlh(1, 2)
   */
  rlh(value1: number, value2: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rlh。
   * @param value2 左、右的数值，自动附加 rlh。
   * @param value3 下的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rlh(1, 2, 3)
   */
  rlh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 rlh。
   * @param value2 右的数值，自动附加 rlh。
   * @param value3 下的数值，自动附加 rlh。
   * @param value4 左的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.rlh(1, 2, 3, 4)
   */
  rlh(value1: number, value2: number, value3: number, value4: number): string;
  override rlh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rlh`).join(' '));
  }
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vw(1)
   */
  vw(value1: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vw。
   * @param value2 左、右的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vw(1, 2)
   */
  vw(value1: number, value2: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vw。
   * @param value2 左、右的数值，自动附加 vw。
   * @param value3 下的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vw(1, 2, 3)
   */
  vw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vw。
   * @param value2 右的数值，自动附加 vw。
   * @param value3 下的数值，自动附加 vw。
   * @param value4 左的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vw(1, 2, 3, 4)
   */
  vw(value1: number, value2: number, value3: number, value4: number): string;
  override vw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vw`).join(' '));
  }
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vh(1)
   */
  vh(value1: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vh。
   * @param value2 左、右的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vh(1, 2)
   */
  vh(value1: number, value2: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vh。
   * @param value2 左、右的数值，自动附加 vh。
   * @param value3 下的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vh(1, 2, 3)
   */
  vh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vh。
   * @param value2 右的数值，自动附加 vh。
   * @param value3 下的数值，自动附加 vh。
   * @param value4 左的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vh(1, 2, 3, 4)
   */
  vh(value1: number, value2: number, value3: number, value4: number): string;
  override vh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vh`).join(' '));
  }
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vi(1)
   */
  vi(value1: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vi。
   * @param value2 左、右的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vi(1, 2)
   */
  vi(value1: number, value2: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vi。
   * @param value2 左、右的数值，自动附加 vi。
   * @param value3 下的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vi(1, 2, 3)
   */
  vi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vi。
   * @param value2 右的数值，自动附加 vi。
   * @param value3 下的数值，自动附加 vi。
   * @param value4 左的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vi(1, 2, 3, 4)
   */
  vi(value1: number, value2: number, value3: number, value4: number): string;
  override vi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vi`).join(' '));
  }
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vb(1)
   */
  vb(value1: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vb。
   * @param value2 左、右的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vb(1, 2)
   */
  vb(value1: number, value2: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vb。
   * @param value2 左、右的数值，自动附加 vb。
   * @param value3 下的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vb(1, 2, 3)
   */
  vb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vb。
   * @param value2 右的数值，自动附加 vb。
   * @param value3 下的数值，自动附加 vb。
   * @param value4 左的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vb(1, 2, 3, 4)
   */
  vb(value1: number, value2: number, value3: number, value4: number): string;
  override vb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vb`).join(' '));
  }
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vmin(1)
   */
  vmin(value1: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vmin。
   * @param value2 左、右的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vmin(1, 2)
   */
  vmin(value1: number, value2: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vmin。
   * @param value2 左、右的数值，自动附加 vmin。
   * @param value3 下的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vmin(1, 2, 3)
   */
  vmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vmin。
   * @param value2 右的数值，自动附加 vmin。
   * @param value3 下的数值，自动附加 vmin。
   * @param value4 左的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vmin(1, 2, 3, 4)
   */
  vmin(value1: number, value2: number, value3: number, value4: number): string;
  override vmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmin`).join(' '));
  }
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vmax(1)
   */
  vmax(value1: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 vmax。
   * @param value2 左、右的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vmax(1, 2)
   */
  vmax(value1: number, value2: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vmax。
   * @param value2 左、右的数值，自动附加 vmax。
   * @param value3 下的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vmax(1, 2, 3)
   */
  vmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 vmax。
   * @param value2 右的数值，自动附加 vmax。
   * @param value3 下的数值，自动附加 vmax。
   * @param value4 左的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.vmax(1, 2, 3, 4)
   */
  vmax(value1: number, value2: number, value3: number, value4: number): string;
  override vmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmax`).join(' '));
  }
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svw(1)
   */
  svw(value1: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svw。
   * @param value2 左、右的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svw(1, 2)
   */
  svw(value1: number, value2: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svw。
   * @param value2 左、右的数值，自动附加 svw。
   * @param value3 下的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svw(1, 2, 3)
   */
  svw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svw。
   * @param value2 右的数值，自动附加 svw。
   * @param value3 下的数值，自动附加 svw。
   * @param value4 左的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svw(1, 2, 3, 4)
   */
  svw(value1: number, value2: number, value3: number, value4: number): string;
  override svw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svw`).join(' '));
  }
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svh(1)
   */
  svh(value1: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svh。
   * @param value2 左、右的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svh(1, 2)
   */
  svh(value1: number, value2: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svh。
   * @param value2 左、右的数值，自动附加 svh。
   * @param value3 下的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svh(1, 2, 3)
   */
  svh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svh。
   * @param value2 右的数值，自动附加 svh。
   * @param value3 下的数值，自动附加 svh。
   * @param value4 左的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svh(1, 2, 3, 4)
   */
  svh(value1: number, value2: number, value3: number, value4: number): string;
  override svh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svh`).join(' '));
  }
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svi(1)
   */
  svi(value1: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svi。
   * @param value2 左、右的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svi(1, 2)
   */
  svi(value1: number, value2: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svi。
   * @param value2 左、右的数值，自动附加 svi。
   * @param value3 下的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svi(1, 2, 3)
   */
  svi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svi。
   * @param value2 右的数值，自动附加 svi。
   * @param value3 下的数值，自动附加 svi。
   * @param value4 左的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svi(1, 2, 3, 4)
   */
  svi(value1: number, value2: number, value3: number, value4: number): string;
  override svi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svi`).join(' '));
  }
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svb(1)
   */
  svb(value1: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svb。
   * @param value2 左、右的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svb(1, 2)
   */
  svb(value1: number, value2: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svb。
   * @param value2 左、右的数值，自动附加 svb。
   * @param value3 下的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svb(1, 2, 3)
   */
  svb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svb。
   * @param value2 右的数值，自动附加 svb。
   * @param value3 下的数值，自动附加 svb。
   * @param value4 左的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svb(1, 2, 3, 4)
   */
  svb(value1: number, value2: number, value3: number, value4: number): string;
  override svb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svb`).join(' '));
  }
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svmin(1)
   */
  svmin(value1: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svmin。
   * @param value2 左、右的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svmin(1, 2)
   */
  svmin(value1: number, value2: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svmin。
   * @param value2 左、右的数值，自动附加 svmin。
   * @param value3 下的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svmin(1, 2, 3)
   */
  svmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svmin。
   * @param value2 右的数值，自动附加 svmin。
   * @param value3 下的数值，自动附加 svmin。
   * @param value4 左的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svmin(1, 2, 3, 4)
   */
  svmin(value1: number, value2: number, value3: number, value4: number): string;
  override svmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmin`).join(' '));
  }
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svmax(1)
   */
  svmax(value1: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 svmax。
   * @param value2 左、右的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svmax(1, 2)
   */
  svmax(value1: number, value2: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svmax。
   * @param value2 左、右的数值，自动附加 svmax。
   * @param value3 下的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svmax(1, 2, 3)
   */
  svmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 svmax。
   * @param value2 右的数值，自动附加 svmax。
   * @param value3 下的数值，自动附加 svmax。
   * @param value4 左的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.svmax(1, 2, 3, 4)
   */
  svmax(value1: number, value2: number, value3: number, value4: number): string;
  override svmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmax`).join(' '));
  }
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvw(1)
   */
  lvw(value1: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvw。
   * @param value2 左、右的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvw(1, 2)
   */
  lvw(value1: number, value2: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvw。
   * @param value2 左、右的数值，自动附加 lvw。
   * @param value3 下的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvw(1, 2, 3)
   */
  lvw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvw。
   * @param value2 右的数值，自动附加 lvw。
   * @param value3 下的数值，自动附加 lvw。
   * @param value4 左的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvw(1, 2, 3, 4)
   */
  lvw(value1: number, value2: number, value3: number, value4: number): string;
  override lvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvw`).join(' '));
  }
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvh(1)
   */
  lvh(value1: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvh。
   * @param value2 左、右的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvh(1, 2)
   */
  lvh(value1: number, value2: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvh。
   * @param value2 左、右的数值，自动附加 lvh。
   * @param value3 下的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvh(1, 2, 3)
   */
  lvh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvh。
   * @param value2 右的数值，自动附加 lvh。
   * @param value3 下的数值，自动附加 lvh。
   * @param value4 左的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvh(1, 2, 3, 4)
   */
  lvh(value1: number, value2: number, value3: number, value4: number): string;
  override lvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvh`).join(' '));
  }
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvi(1)
   */
  lvi(value1: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvi。
   * @param value2 左、右的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvi(1, 2)
   */
  lvi(value1: number, value2: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvi。
   * @param value2 左、右的数值，自动附加 lvi。
   * @param value3 下的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvi(1, 2, 3)
   */
  lvi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvi。
   * @param value2 右的数值，自动附加 lvi。
   * @param value3 下的数值，自动附加 lvi。
   * @param value4 左的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvi(1, 2, 3, 4)
   */
  lvi(value1: number, value2: number, value3: number, value4: number): string;
  override lvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvi`).join(' '));
  }
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvb(1)
   */
  lvb(value1: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvb。
   * @param value2 左、右的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvb(1, 2)
   */
  lvb(value1: number, value2: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvb。
   * @param value2 左、右的数值，自动附加 lvb。
   * @param value3 下的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvb(1, 2, 3)
   */
  lvb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvb。
   * @param value2 右的数值，自动附加 lvb。
   * @param value3 下的数值，自动附加 lvb。
   * @param value4 左的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvb(1, 2, 3, 4)
   */
  lvb(value1: number, value2: number, value3: number, value4: number): string;
  override lvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvb`).join(' '));
  }
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvmin(1)
   */
  lvmin(value1: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvmin。
   * @param value2 左、右的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvmin(1, 2)
   */
  lvmin(value1: number, value2: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvmin。
   * @param value2 左、右的数值，自动附加 lvmin。
   * @param value3 下的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvmin(1, 2, 3)
   */
  lvmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvmin。
   * @param value2 右的数值，自动附加 lvmin。
   * @param value3 下的数值，自动附加 lvmin。
   * @param value4 左的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvmin(1, 2, 3, 4)
   */
  lvmin(value1: number, value2: number, value3: number, value4: number): string;
  override lvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmin`).join(' '));
  }
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvmax(1)
   */
  lvmax(value1: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 lvmax。
   * @param value2 左、右的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvmax(1, 2)
   */
  lvmax(value1: number, value2: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvmax。
   * @param value2 左、右的数值，自动附加 lvmax。
   * @param value3 下的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvmax(1, 2, 3)
   */
  lvmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 lvmax。
   * @param value2 右的数值，自动附加 lvmax。
   * @param value3 下的数值，自动附加 lvmax。
   * @param value4 左的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.lvmax(1, 2, 3, 4)
   */
  lvmax(value1: number, value2: number, value3: number, value4: number): string;
  override lvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmax`).join(' '));
  }
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvw(1)
   */
  dvw(value1: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvw。
   * @param value2 左、右的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvw(1, 2)
   */
  dvw(value1: number, value2: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvw。
   * @param value2 左、右的数值，自动附加 dvw。
   * @param value3 下的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvw(1, 2, 3)
   */
  dvw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvw。
   * @param value2 右的数值，自动附加 dvw。
   * @param value3 下的数值，自动附加 dvw。
   * @param value4 左的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvw(1, 2, 3, 4)
   */
  dvw(value1: number, value2: number, value3: number, value4: number): string;
  override dvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvw`).join(' '));
  }
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvh(1)
   */
  dvh(value1: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvh。
   * @param value2 左、右的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvh(1, 2)
   */
  dvh(value1: number, value2: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvh。
   * @param value2 左、右的数值，自动附加 dvh。
   * @param value3 下的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvh(1, 2, 3)
   */
  dvh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvh。
   * @param value2 右的数值，自动附加 dvh。
   * @param value3 下的数值，自动附加 dvh。
   * @param value4 左的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvh(1, 2, 3, 4)
   */
  dvh(value1: number, value2: number, value3: number, value4: number): string;
  override dvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvh`).join(' '));
  }
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvi(1)
   */
  dvi(value1: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvi。
   * @param value2 左、右的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvi(1, 2)
   */
  dvi(value1: number, value2: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvi。
   * @param value2 左、右的数值，自动附加 dvi。
   * @param value3 下的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvi(1, 2, 3)
   */
  dvi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvi。
   * @param value2 右的数值，自动附加 dvi。
   * @param value3 下的数值，自动附加 dvi。
   * @param value4 左的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvi(1, 2, 3, 4)
   */
  dvi(value1: number, value2: number, value3: number, value4: number): string;
  override dvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvi`).join(' '));
  }
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvb(1)
   */
  dvb(value1: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvb。
   * @param value2 左、右的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvb(1, 2)
   */
  dvb(value1: number, value2: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvb。
   * @param value2 左、右的数值，自动附加 dvb。
   * @param value3 下的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvb(1, 2, 3)
   */
  dvb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvb。
   * @param value2 右的数值，自动附加 dvb。
   * @param value3 下的数值，自动附加 dvb。
   * @param value4 左的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvb(1, 2, 3, 4)
   */
  dvb(value1: number, value2: number, value3: number, value4: number): string;
  override dvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvb`).join(' '));
  }
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvmin(1)
   */
  dvmin(value1: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvmin。
   * @param value2 左、右的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvmin(1, 2)
   */
  dvmin(value1: number, value2: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvmin。
   * @param value2 左、右的数值，自动附加 dvmin。
   * @param value3 下的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvmin(1, 2, 3)
   */
  dvmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvmin。
   * @param value2 右的数值，自动附加 dvmin。
   * @param value3 下的数值，自动附加 dvmin。
   * @param value4 左的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvmin(1, 2, 3, 4)
   */
  dvmin(value1: number, value2: number, value3: number, value4: number): string;
  override dvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmin`).join(' '));
  }
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvmax(1)
   */
  dvmax(value1: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 dvmax。
   * @param value2 左、右的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvmax(1, 2)
   */
  dvmax(value1: number, value2: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvmax。
   * @param value2 左、右的数值，自动附加 dvmax。
   * @param value3 下的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvmax(1, 2, 3)
   */
  dvmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 dvmax。
   * @param value2 右的数值，自动附加 dvmax。
   * @param value3 下的数值，自动附加 dvmax。
   * @param value4 左的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.dvmax(1, 2, 3, 4)
   */
  dvmax(value1: number, value2: number, value3: number, value4: number): string;
  override dvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmax`).join(' '));
  }
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqw(1)
   */
  cqw(value1: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqw。
   * @param value2 左、右的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqw(1, 2)
   */
  cqw(value1: number, value2: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqw。
   * @param value2 左、右的数值，自动附加 cqw。
   * @param value3 下的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqw(1, 2, 3)
   */
  cqw(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqw。
   * @param value2 右的数值，自动附加 cqw。
   * @param value3 下的数值，自动附加 cqw。
   * @param value4 左的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqw(1, 2, 3, 4)
   */
  cqw(value1: number, value2: number, value3: number, value4: number): string;
  override cqw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqw`).join(' '));
  }
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqh(1)
   */
  cqh(value1: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqh。
   * @param value2 左、右的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqh(1, 2)
   */
  cqh(value1: number, value2: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqh。
   * @param value2 左、右的数值，自动附加 cqh。
   * @param value3 下的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqh(1, 2, 3)
   */
  cqh(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqh。
   * @param value2 右的数值，自动附加 cqh。
   * @param value3 下的数值，自动附加 cqh。
   * @param value4 左的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqh(1, 2, 3, 4)
   */
  cqh(value1: number, value2: number, value3: number, value4: number): string;
  override cqh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqh`).join(' '));
  }
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqi(1)
   */
  cqi(value1: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqi。
   * @param value2 左、右的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqi(1, 2)
   */
  cqi(value1: number, value2: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqi。
   * @param value2 左、右的数值，自动附加 cqi。
   * @param value3 下的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqi(1, 2, 3)
   */
  cqi(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqi。
   * @param value2 右的数值，自动附加 cqi。
   * @param value3 下的数值，自动附加 cqi。
   * @param value4 左的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqi(1, 2, 3, 4)
   */
  cqi(value1: number, value2: number, value3: number, value4: number): string;
  override cqi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqi`).join(' '));
  }
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqb(1)
   */
  cqb(value1: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqb。
   * @param value2 左、右的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqb(1, 2)
   */
  cqb(value1: number, value2: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqb。
   * @param value2 左、右的数值，自动附加 cqb。
   * @param value3 下的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqb(1, 2, 3)
   */
  cqb(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqb。
   * @param value2 右的数值，自动附加 cqb。
   * @param value3 下的数值，自动附加 cqb。
   * @param value4 左的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqb(1, 2, 3, 4)
   */
  cqb(value1: number, value2: number, value3: number, value4: number): string;
  override cqb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqb`).join(' '));
  }
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqmin(1)
   */
  cqmin(value1: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqmin。
   * @param value2 左、右的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqmin(1, 2)
   */
  cqmin(value1: number, value2: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqmin。
   * @param value2 左、右的数值，自动附加 cqmin。
   * @param value3 下的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqmin(1, 2, 3)
   */
  cqmin(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqmin。
   * @param value2 右的数值，自动附加 cqmin。
   * @param value3 下的数值，自动附加 cqmin。
   * @param value4 左的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqmin(1, 2, 3, 4)
   */
  cqmin(value1: number, value2: number, value3: number, value4: number): string;
  override cqmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmin`).join(' '));
  }
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqmax(1)
   */
  cqmax(value1: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上、下的数值，自动附加 cqmax。
   * @param value2 左、右的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqmax(1, 2)
   */
  cqmax(value1: number, value2: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqmax。
   * @param value2 左、右的数值，自动附加 cqmax。
   * @param value3 下的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqmax(1, 2, 3)
   */
  cqmax(value1: number, value2: number, value3: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 上的数值，自动附加 cqmax。
   * @param value2 右的数值，自动附加 cqmax。
   * @param value3 下的数值，自动附加 cqmax。
   * @param value4 左的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.scrollSnapMargin.cqmax(1, 2, 3, 4)
   */
  cqmax(value1: number, value2: number, value3: number, value4: number): string;
  override cqmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmax`).join(' '));
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollSnapMargin.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollSnapMargin.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMargin | CssString,
    ...others: (Property.ScrollMargin | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollSnapMargin.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMargin | CssString,
    ...others: (Property.ScrollMargin | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollSnapMargin.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMargin | CssString,
    preferred: Property.ScrollMargin | CssString,
    maximum: Property.ScrollMargin | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-snap-margin 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollSnapMarginCss = ScrollSnapMarginCssRuntime &
  KeywordDeclarations<ScrollSnapMarginKeywords>;
/**
 * 设置滚动吸附区域外扩的旧名称；新代码使用 scroll-margin。（scroll-snap-margin）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin
 */
export const ScrollSnapMarginCss = ScrollSnapMarginCssRuntime as new () => ScrollSnapMarginCss;

/**
 * scroll-snap-margin-bottom 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollSnapMarginBottomKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMarginBottom | CssString
>;
/**
 * 创建 scroll-snap-margin-bottom 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollSnapMarginBottomKeywords()
 */
export const ScrollSnapMarginBottomKeywords = class ScrollSnapMarginBottomKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollSnapMarginBottomKeywords;

/**
 * scroll-snap-margin-bottom 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollSnapMarginBottomCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-snap-margin-bottom 属性作者；普通使用通过 s.scrollSnapMarginBottom 取得共享实例。
   * @example
   * class CustomScrollSnapMarginBottomCss extends ScrollSnapMarginBottomCss {}
   */
  constructor() {
    super('scroll-snap-margin-bottom');
    initializeKeywordDeclarations(this, 'scroll-snap-margin-bottom', globalKeywords);
  }
  /**
   * 原样生成 scroll-snap-margin-bottom 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-snap-margin-bottom:value;，undefined 返回空字符串。
   * @example
   * s.scrollSnapMarginBottom.raw('inherit') // scroll-snap-margin-bottom:inherit;
   */
  raw(value: Property.ScrollMarginBottom | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollSnapMarginBottom.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollSnapMarginBottom.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMarginBottom | CssString,
    ...others: (Property.ScrollMarginBottom | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollSnapMarginBottom.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMarginBottom | CssString,
    ...others: (Property.ScrollMarginBottom | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollSnapMarginBottom.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMarginBottom | CssString,
    preferred: Property.ScrollMarginBottom | CssString,
    maximum: Property.ScrollMarginBottom | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-snap-margin-bottom 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollSnapMarginBottomCss = ScrollSnapMarginBottomCssRuntime &
  KeywordDeclarations<ScrollSnapMarginBottomKeywords>;
/**
 * 设置滚动吸附区域下侧外扩的旧名称；新代码使用 scroll-margin-bottom。（scroll-snap-margin-bottom）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-bottom
 */
export const ScrollSnapMarginBottomCss =
  ScrollSnapMarginBottomCssRuntime as new () => ScrollSnapMarginBottomCss;

/**
 * scroll-snap-margin-left 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollSnapMarginLeftKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMarginLeft | CssString
>;
/**
 * 创建 scroll-snap-margin-left 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollSnapMarginLeftKeywords()
 */
export const ScrollSnapMarginLeftKeywords = class ScrollSnapMarginLeftKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollSnapMarginLeftKeywords;

/**
 * scroll-snap-margin-left 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollSnapMarginLeftCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-snap-margin-left 属性作者；普通使用通过 s.scrollSnapMarginLeft 取得共享实例。
   * @example
   * class CustomScrollSnapMarginLeftCss extends ScrollSnapMarginLeftCss {}
   */
  constructor() {
    super('scroll-snap-margin-left');
    initializeKeywordDeclarations(this, 'scroll-snap-margin-left', globalKeywords);
  }
  /**
   * 原样生成 scroll-snap-margin-left 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-snap-margin-left:value;，undefined 返回空字符串。
   * @example
   * s.scrollSnapMarginLeft.raw('inherit') // scroll-snap-margin-left:inherit;
   */
  raw(value: Property.ScrollMarginLeft | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollSnapMarginLeft.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollSnapMarginLeft.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMarginLeft | CssString,
    ...others: (Property.ScrollMarginLeft | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollSnapMarginLeft.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMarginLeft | CssString,
    ...others: (Property.ScrollMarginLeft | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollSnapMarginLeft.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMarginLeft | CssString,
    preferred: Property.ScrollMarginLeft | CssString,
    maximum: Property.ScrollMarginLeft | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-snap-margin-left 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollSnapMarginLeftCss = ScrollSnapMarginLeftCssRuntime &
  KeywordDeclarations<ScrollSnapMarginLeftKeywords>;
/**
 * 设置滚动吸附区域左侧外扩的旧名称；新代码使用 scroll-margin-left。（scroll-snap-margin-left）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-left
 */
export const ScrollSnapMarginLeftCss =
  ScrollSnapMarginLeftCssRuntime as new () => ScrollSnapMarginLeftCss;

/**
 * scroll-snap-margin-right 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollSnapMarginRightKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMarginRight | CssString
>;
/**
 * 创建 scroll-snap-margin-right 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollSnapMarginRightKeywords()
 */
export const ScrollSnapMarginRightKeywords = class ScrollSnapMarginRightKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollSnapMarginRightKeywords;

/**
 * scroll-snap-margin-right 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollSnapMarginRightCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-snap-margin-right 属性作者；普通使用通过 s.scrollSnapMarginRight 取得共享实例。
   * @example
   * class CustomScrollSnapMarginRightCss extends ScrollSnapMarginRightCss {}
   */
  constructor() {
    super('scroll-snap-margin-right');
    initializeKeywordDeclarations(this, 'scroll-snap-margin-right', globalKeywords);
  }
  /**
   * 原样生成 scroll-snap-margin-right 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-snap-margin-right:value;，undefined 返回空字符串。
   * @example
   * s.scrollSnapMarginRight.raw('inherit') // scroll-snap-margin-right:inherit;
   */
  raw(value: Property.ScrollMarginRight | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollSnapMarginRight.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollSnapMarginRight.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMarginRight | CssString,
    ...others: (Property.ScrollMarginRight | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollSnapMarginRight.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMarginRight | CssString,
    ...others: (Property.ScrollMarginRight | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollSnapMarginRight.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMarginRight | CssString,
    preferred: Property.ScrollMarginRight | CssString,
    maximum: Property.ScrollMarginRight | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-snap-margin-right 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollSnapMarginRightCss = ScrollSnapMarginRightCssRuntime &
  KeywordDeclarations<ScrollSnapMarginRightKeywords>;
/**
 * 设置滚动吸附区域右侧外扩的旧名称；新代码使用 scroll-margin-right。（scroll-snap-margin-right）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-right
 */
export const ScrollSnapMarginRightCss =
  ScrollSnapMarginRightCssRuntime as new () => ScrollSnapMarginRightCss;

/**
 * scroll-snap-margin-top 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollSnapMarginTopKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ScrollMarginTop | CssString
>;
/**
 * 创建 scroll-snap-margin-top 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollSnapMarginTopKeywords()
 */
export const ScrollSnapMarginTopKeywords = class ScrollSnapMarginTopKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ScrollSnapMarginTopKeywords;

/**
 * scroll-snap-margin-top 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollSnapMarginTopCssRuntime extends LengthCssProperty {
  /**
   * 创建 scroll-snap-margin-top 属性作者；普通使用通过 s.scrollSnapMarginTop 取得共享实例。
   * @example
   * class CustomScrollSnapMarginTopCss extends ScrollSnapMarginTopCss {}
   */
  constructor() {
    super('scroll-snap-margin-top');
    initializeKeywordDeclarations(this, 'scroll-snap-margin-top', globalKeywords);
  }
  /**
   * 原样生成 scroll-snap-margin-top 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-snap-margin-top:value;，undefined 返回空字符串。
   * @example
   * s.scrollSnapMarginTop.raw('inherit') // scroll-snap-margin-top:inherit;
   */
  raw(value: Property.ScrollMarginTop | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.scrollSnapMarginTop.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.scrollSnapMarginTop.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ScrollMarginTop | CssString,
    ...others: (Property.ScrollMarginTop | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.scrollSnapMarginTop.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ScrollMarginTop | CssString,
    ...others: (Property.ScrollMarginTop | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.scrollSnapMarginTop.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ScrollMarginTop | CssString,
    preferred: Property.ScrollMarginTop | CssString,
    maximum: Property.ScrollMarginTop | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * scroll-snap-margin-top 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollSnapMarginTopCss = ScrollSnapMarginTopCssRuntime &
  KeywordDeclarations<ScrollSnapMarginTopKeywords>;
/**
 * 设置滚动吸附区域上侧外扩的旧名称；新代码使用 scroll-margin-top。（scroll-snap-margin-top）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-margin-top
 */
export const ScrollSnapMarginTopCss =
  ScrollSnapMarginTopCssRuntime as new () => ScrollSnapMarginTopCss;
import { scrollSnapStopKeywords } from './keyword-sets.js';

/**
 * scroll-snap-stop 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollSnapStopKeywords = KeywordValuesOf<
  typeof scrollSnapStopKeywords,
  Property.ScrollSnapStop | CssString
>;
/**
 * 创建 scroll-snap-stop 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollSnapStopKeywords()
 */
export const ScrollSnapStopKeywords = class ScrollSnapStopKeywords {
  constructor() {
    Object.assign(this, scrollSnapStopKeywords);
  }
} as new () => ScrollSnapStopKeywords;

/**
 * scroll-snap-stop 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollSnapStopCssRuntime extends CssProperty {
  /**
   * 创建 scroll-snap-stop 属性作者；普通使用通过 s.scrollSnapStop 取得共享实例。
   * @example
   * class CustomScrollSnapStopCss extends ScrollSnapStopCss {}
   */
  constructor() {
    super('scroll-snap-stop');
    initializeKeywordDeclarations(this, 'scroll-snap-stop', scrollSnapStopKeywords);
  }
  /**
   * 原样生成 scroll-snap-stop 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-snap-stop:value;，undefined 返回空字符串。
   * @example
   * s.scrollSnapStop.raw('inherit') // scroll-snap-stop:inherit;
   */
  raw(value: Property.ScrollSnapStop | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * scroll-snap-stop 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollSnapStopCss = ScrollSnapStopCssRuntime &
  KeywordDeclarations<ScrollSnapStopKeywords>;
/**
 * 设置滚动时是否允许越过该元素的吸附位置。（scroll-snap-stop）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-stop
 */
export const ScrollSnapStopCss = ScrollSnapStopCssRuntime as new () => ScrollSnapStopCss;
import { scrollSnapTypeKeywords } from './keyword-sets.js';

/**
 * scroll-snap-type 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollSnapTypeKeywords = KeywordValuesOf<
  typeof scrollSnapTypeKeywords,
  Property.ScrollSnapType | CssString
>;
/**
 * 创建 scroll-snap-type 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollSnapTypeKeywords()
 */
export const ScrollSnapTypeKeywords = class ScrollSnapTypeKeywords {
  constructor() {
    Object.assign(this, scrollSnapTypeKeywords);
  }
} as new () => ScrollSnapTypeKeywords;

/**
 * scroll-snap-type 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollSnapTypeCssRuntime extends CssProperty {
  /**
   * 创建 scroll-snap-type 属性作者；普通使用通过 s.scrollSnapType 取得共享实例。
   * @example
   * class CustomScrollSnapTypeCss extends ScrollSnapTypeCss {}
   */
  constructor() {
    super('scroll-snap-type');
    initializeKeywordDeclarations(this, 'scroll-snap-type', scrollSnapTypeKeywords);
  }
  /**
   * 原样生成 scroll-snap-type 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-snap-type:value;，undefined 返回空字符串。
   * @example
   * s.scrollSnapType.raw('inherit') // scroll-snap-type:inherit;
   */
  raw(value: Property.ScrollSnapType | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * scroll-snap-type 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollSnapTypeCss = ScrollSnapTypeCssRuntime &
  KeywordDeclarations<ScrollSnapTypeKeywords>;
/**
 * 设置滚动容器的吸附轴和吸附强度。（scroll-snap-type）
 *
 * 轴和吸附强度的组合通过 raw 写入，例如 x mandatory；单独声明轴时省略的强度按 CSS 规则处理。
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @example
 * s.scrollSnapType.raw('x mandatory') // scroll-snap-type:x mandatory;
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-snap-type
 */
export const ScrollSnapTypeCss = ScrollSnapTypeCssRuntime as new () => ScrollSnapTypeCss;

/**
 * scroll-timeline 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollTimelineKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.ScrollTimeline | CssString
>;
/**
 * 创建 scroll-timeline 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollTimelineKeywords()
 */
export const ScrollTimelineKeywords = class ScrollTimelineKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => ScrollTimelineKeywords;

/**
 * scroll-timeline 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollTimelineCssRuntime extends CssProperty {
  /**
   * 创建 scroll-timeline 属性作者；普通使用通过 s.scrollTimeline 取得共享实例。
   * @example
   * class CustomScrollTimelineCss extends ScrollTimelineCss {}
   */
  constructor() {
    super('scroll-timeline');
    initializeKeywordDeclarations(this, 'scroll-timeline', noneKeywords);
  }
  /**
   * 原样生成 scroll-timeline 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-timeline:value;，undefined 返回空字符串。
   * @example
   * s.scrollTimeline.raw('inherit') // scroll-timeline:inherit;
   */
  raw(value: Property.ScrollTimeline | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * scroll-timeline 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollTimelineCss = ScrollTimelineCssRuntime &
  KeywordDeclarations<ScrollTimelineKeywords>;
/**
 * 同时声明滚动进度时间线的名称和轴。（scroll-timeline）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline
 */
export const ScrollTimelineCss = ScrollTimelineCssRuntime as new () => ScrollTimelineCss;
import { scrollTimelineAxisKeywords } from './keyword-sets.js';

/**
 * scroll-timeline-axis 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollTimelineAxisKeywords = KeywordValuesOf<
  typeof scrollTimelineAxisKeywords,
  Property.ScrollTimelineAxis | CssString
>;
/**
 * 创建 scroll-timeline-axis 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollTimelineAxisKeywords()
 */
export const ScrollTimelineAxisKeywords = class ScrollTimelineAxisKeywords {
  constructor() {
    Object.assign(this, scrollTimelineAxisKeywords);
  }
} as new () => ScrollTimelineAxisKeywords;

/**
 * scroll-timeline-axis 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollTimelineAxisCssRuntime extends CssProperty {
  /**
   * 创建 scroll-timeline-axis 属性作者；普通使用通过 s.scrollTimelineAxis 取得共享实例。
   * @example
   * class CustomScrollTimelineAxisCss extends ScrollTimelineAxisCss {}
   */
  constructor() {
    super('scroll-timeline-axis');
    initializeKeywordDeclarations(this, 'scroll-timeline-axis', scrollTimelineAxisKeywords);
  }
  /**
   * 原样生成 scroll-timeline-axis 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-timeline-axis:value;，undefined 返回空字符串。
   * @example
   * s.scrollTimelineAxis.raw('inherit') // scroll-timeline-axis:inherit;
   */
  raw(value: Property.ScrollTimelineAxis | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * scroll-timeline-axis 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollTimelineAxisCss = ScrollTimelineAxisCssRuntime &
  KeywordDeclarations<ScrollTimelineAxisKeywords>;
/**
 * 设置滚动进度时间线所观察的滚动轴。（scroll-timeline-axis）
 *
 * CSS 初始值：`block`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-axis
 */
export const ScrollTimelineAxisCss =
  ScrollTimelineAxisCssRuntime as new () => ScrollTimelineAxisCss;

/**
 * scroll-timeline-name 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollTimelineNameKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.ScrollTimelineName | CssString
>;
/**
 * 创建 scroll-timeline-name 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollTimelineNameKeywords()
 */
export const ScrollTimelineNameKeywords = class ScrollTimelineNameKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => ScrollTimelineNameKeywords;

/**
 * scroll-timeline-name 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollTimelineNameCssRuntime extends CssProperty {
  /**
   * 创建 scroll-timeline-name 属性作者；普通使用通过 s.scrollTimelineName 取得共享实例。
   * @example
   * class CustomScrollTimelineNameCss extends ScrollTimelineNameCss {}
   */
  constructor() {
    super('scroll-timeline-name');
    initializeKeywordDeclarations(this, 'scroll-timeline-name', noneKeywords);
  }
  /**
   * 原样生成 scroll-timeline-name 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scroll-timeline-name:value;，undefined 返回空字符串。
   * @example
   * s.scrollTimelineName.raw('inherit') // scroll-timeline-name:inherit;
   */
  raw(value: Property.ScrollTimelineName | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * scroll-timeline-name 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollTimelineNameCss = ScrollTimelineNameCssRuntime &
  KeywordDeclarations<ScrollTimelineNameKeywords>;
/**
 * 声明基于当前容器滚动进度的时间线名称。（scroll-timeline-name）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scroll-timeline-name
 */
export const ScrollTimelineNameCss =
  ScrollTimelineNameCssRuntime as new () => ScrollTimelineNameCss;

/**
 * scrollbar-color 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollbarColorKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ScrollbarColor | CssString
>;
/**
 * 创建 scrollbar-color 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollbarColorKeywords()
 */
export const ScrollbarColorKeywords = class ScrollbarColorKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ScrollbarColorKeywords;

/**
 * scrollbar-color 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollbarColorCssRuntime extends CssProperty {
  /**
   * 创建 scrollbar-color 属性作者；普通使用通过 s.scrollbarColor 取得共享实例。
   * @example
   * class CustomScrollbarColorCss extends ScrollbarColorCss {}
   */
  constructor() {
    super('scrollbar-color');
    initializeKeywordDeclarations(this, 'scrollbar-color', autoKeywords);
  }
  /**
   * 原样生成 scrollbar-color 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scrollbar-color:value;，undefined 返回空字符串。
   * @example
   * s.scrollbarColor.raw('inherit') // scrollbar-color:inherit;
   */
  raw(value: Property.ScrollbarColor | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * scrollbar-color 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollbarColorCss = ScrollbarColorCssRuntime &
  KeywordDeclarations<ScrollbarColorKeywords>;
/**
 * 设置滚动条滑块和轨道的颜色。（scrollbar-color）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-color
 */
export const ScrollbarColorCss = ScrollbarColorCssRuntime as new () => ScrollbarColorCss;
import { scrollbarGutterKeywords } from './keyword-sets.js';

/**
 * scrollbar-gutter 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollbarGutterKeywords = KeywordValuesOf<
  typeof scrollbarGutterKeywords,
  Property.ScrollbarGutter | CssString
>;
/**
 * 创建 scrollbar-gutter 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollbarGutterKeywords()
 */
export const ScrollbarGutterKeywords = class ScrollbarGutterKeywords {
  constructor() {
    Object.assign(this, scrollbarGutterKeywords);
  }
} as new () => ScrollbarGutterKeywords;

/**
 * scrollbar-gutter 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollbarGutterCssRuntime extends CssProperty {
  /**
   * 创建 scrollbar-gutter 属性作者；普通使用通过 s.scrollbarGutter 取得共享实例。
   * @example
   * class CustomScrollbarGutterCss extends ScrollbarGutterCss {}
   */
  constructor() {
    super('scrollbar-gutter');
    initializeKeywordDeclarations(this, 'scrollbar-gutter', scrollbarGutterKeywords);
  }
  /**
   * 原样生成 scrollbar-gutter 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scrollbar-gutter:value;，undefined 返回空字符串。
   * @example
   * s.scrollbarGutter.raw('inherit') // scrollbar-gutter:inherit;
   */
  raw(value: Property.ScrollbarGutter | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * scrollbar-gutter 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollbarGutterCss = ScrollbarGutterCssRuntime &
  KeywordDeclarations<ScrollbarGutterKeywords>;
/**
 * 设置是否预留滚动条槽位，以减少滚动条出现时的布局变化。（scrollbar-gutter）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-gutter
 */
export const ScrollbarGutterCss = ScrollbarGutterCssRuntime as new () => ScrollbarGutterCss;
import { scrollbarWidthKeywords } from './keyword-sets.js';

/**
 * scrollbar-width 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ScrollbarWidthKeywords = KeywordValuesOf<
  typeof scrollbarWidthKeywords,
  Property.ScrollbarWidth | CssString
>;
/**
 * 创建 scrollbar-width 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ScrollbarWidthKeywords()
 */
export const ScrollbarWidthKeywords = class ScrollbarWidthKeywords {
  constructor() {
    Object.assign(this, scrollbarWidthKeywords);
  }
} as new () => ScrollbarWidthKeywords;

/**
 * scrollbar-width 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ScrollbarWidthCssRuntime extends CssProperty {
  /**
   * 创建 scrollbar-width 属性作者；普通使用通过 s.scrollbarWidth 取得共享实例。
   * @example
   * class CustomScrollbarWidthCss extends ScrollbarWidthCss {}
   */
  constructor() {
    super('scrollbar-width');
    initializeKeywordDeclarations(this, 'scrollbar-width', scrollbarWidthKeywords);
  }
  /**
   * 原样生成 scrollbar-width 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 scrollbar-width:value;，undefined 返回空字符串。
   * @example
   * s.scrollbarWidth.raw('inherit') // scrollbar-width:inherit;
   */
  raw(value: Property.ScrollbarWidth | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * scrollbar-width 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ScrollbarWidthCss = ScrollbarWidthCssRuntime &
  KeywordDeclarations<ScrollbarWidthKeywords>;
/**
 * 设置滚动条采用正常、较细或隐藏的外观。（scrollbar-width）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/scrollbar-width
 */
export const ScrollbarWidthCss = ScrollbarWidthCssRuntime as new () => ScrollbarWidthCss;

/**
 * shape-image-threshold 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ShapeImageThresholdKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ShapeImageThreshold | CssString
>;
/**
 * 创建 shape-image-threshold 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ShapeImageThresholdKeywords()
 */
export const ShapeImageThresholdKeywords = class ShapeImageThresholdKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ShapeImageThresholdKeywords;

/**
 * shape-image-threshold 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ShapeImageThresholdCssRuntime extends CssProperty {
  /**
   * 创建 shape-image-threshold 属性作者；普通使用通过 s.shapeImageThreshold 取得共享实例。
   * @example
   * class CustomShapeImageThresholdCss extends ShapeImageThresholdCss {}
   */
  constructor() {
    super('shape-image-threshold');
    initializeKeywordDeclarations(this, 'shape-image-threshold', globalKeywords);
  }
  /**
   * 原样生成 shape-image-threshold 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 shape-image-threshold:value;，undefined 返回空字符串。
   * @example
   * s.shapeImageThreshold.raw('inherit') // shape-image-threshold:inherit;
   */
  raw(value: Property.ShapeImageThreshold | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.shapeImageThreshold.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.shapeImageThreshold.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.shapeImageThreshold.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ShapeImageThreshold | CssString,
    ...others: (Property.ShapeImageThreshold | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.shapeImageThreshold.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ShapeImageThreshold | CssString,
    ...others: (Property.ShapeImageThreshold | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.shapeImageThreshold.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ShapeImageThreshold | CssString,
    preferred: Property.ShapeImageThreshold | CssString,
    maximum: Property.ShapeImageThreshold | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * shape-image-threshold 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ShapeImageThresholdCss = ShapeImageThresholdCssRuntime &
  KeywordDeclarations<ShapeImageThresholdKeywords>;
/**
 * 设置从图像 alpha 信息提取环绕形状时的阈值。（shape-image-threshold）
 *
 * CSS 初始值：`0.0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-image-threshold
 */
export const ShapeImageThresholdCss =
  ShapeImageThresholdCssRuntime as new () => ShapeImageThresholdCss;

/**
 * shape-margin 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ShapeMarginKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.ShapeMargin | CssString
>;
/**
 * 创建 shape-margin 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ShapeMarginKeywords()
 */
export const ShapeMarginKeywords = class ShapeMarginKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => ShapeMarginKeywords;

/**
 * shape-margin 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ShapeMarginCssRuntime extends LengthCssProperty {
  /**
   * 创建 shape-margin 属性作者；普通使用通过 s.shapeMargin 取得共享实例。
   * @example
   * class CustomShapeMarginCss extends ShapeMarginCss {}
   */
  constructor() {
    super('shape-margin');
    initializeKeywordDeclarations(this, 'shape-margin', globalKeywords);
  }
  /**
   * 原样生成 shape-margin 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 shape-margin:value;，undefined 返回空字符串。
   * @example
   * s.shapeMargin.raw('inherit') // shape-margin:inherit;
   */
  raw(value: Property.ShapeMargin | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.shapeMargin.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.shapeMargin.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.shapeMargin.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ShapeMargin | CssString,
    ...others: (Property.ShapeMargin | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.shapeMargin.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ShapeMargin | CssString,
    ...others: (Property.ShapeMargin | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.shapeMargin.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ShapeMargin | CssString,
    preferred: Property.ShapeMargin | CssString,
    maximum: Property.ShapeMargin | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * shape-margin 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ShapeMarginCss = ShapeMarginCssRuntime & KeywordDeclarations<ShapeMarginKeywords>;
/**
 * 设置文字环绕形状之外的额外间距。（shape-margin）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-margin
 */
export const ShapeMarginCss = ShapeMarginCssRuntime as new () => ShapeMarginCss;
import { shapeOutsideKeywords } from './keyword-sets.js';

/**
 * shape-outside 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ShapeOutsideKeywords = KeywordValuesOf<
  typeof shapeOutsideKeywords,
  Property.ShapeOutside | CssString
>;
/**
 * 创建 shape-outside 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ShapeOutsideKeywords()
 */
export const ShapeOutsideKeywords = class ShapeOutsideKeywords {
  constructor() {
    Object.assign(this, shapeOutsideKeywords);
  }
} as new () => ShapeOutsideKeywords;

/**
 * shape-outside 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ShapeOutsideCssRuntime extends CssProperty {
  /**
   * 创建 shape-outside 属性作者；普通使用通过 s.shapeOutside 取得共享实例。
   * @example
   * class CustomShapeOutsideCss extends ShapeOutsideCss {}
   */
  constructor() {
    super('shape-outside');
    initializeKeywordDeclarations(this, 'shape-outside', shapeOutsideKeywords);
  }
  /**
   * 原样生成 shape-outside 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 shape-outside:value;，undefined 返回空字符串。
   * @example
   * s.shapeOutside.raw('inherit') // shape-outside:inherit;
   */
  raw(value: Property.ShapeOutside | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * shape-outside 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ShapeOutsideCss = ShapeOutsideCssRuntime & KeywordDeclarations<ShapeOutsideKeywords>;
/**
 * 设置浮动元素周围行内内容所环绕的形状。（shape-outside）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-outside
 */
export const ShapeOutsideCss = ShapeOutsideCssRuntime as new () => ShapeOutsideCss;
import { shapeRenderingKeywords } from './keyword-sets.js';

/**
 * shape-rendering 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ShapeRenderingKeywords = KeywordValuesOf<
  typeof shapeRenderingKeywords,
  Property.ShapeRendering | CssString
>;
/**
 * 创建 shape-rendering 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ShapeRenderingKeywords()
 */
export const ShapeRenderingKeywords = class ShapeRenderingKeywords {
  constructor() {
    Object.assign(this, shapeRenderingKeywords);
  }
} as new () => ShapeRenderingKeywords;

/**
 * shape-rendering 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ShapeRenderingCssRuntime extends CssProperty {
  /**
   * 创建 shape-rendering 属性作者；普通使用通过 s.shapeRendering 取得共享实例。
   * @example
   * class CustomShapeRenderingCss extends ShapeRenderingCss {}
   */
  constructor() {
    super('shape-rendering');
    initializeKeywordDeclarations(this, 'shape-rendering', shapeRenderingKeywords);
  }
  /**
   * 原样生成 shape-rendering 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 shape-rendering:value;，undefined 返回空字符串。
   * @example
   * s.shapeRendering.raw('inherit') // shape-rendering:inherit;
   */
  raw(value: Property.ShapeRendering | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * shape-rendering 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ShapeRenderingCss = ShapeRenderingCssRuntime &
  KeywordDeclarations<ShapeRenderingKeywords>;
/**
 * 向 SVG 渲染器提供图形绘制精度与速度的偏好。（shape-rendering）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/shape-rendering
 */
export const ShapeRenderingCss = ShapeRenderingCssRuntime as new () => ShapeRenderingCss;
import { speakAsKeywords } from './keyword-sets.js';

/**
 * speak-as 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type SpeakAsKeywords = KeywordValuesOf<typeof speakAsKeywords, Property.SpeakAs | CssString>;
/**
 * 创建 speak-as 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new SpeakAsKeywords()
 */
export const SpeakAsKeywords = class SpeakAsKeywords {
  constructor() {
    Object.assign(this, speakAsKeywords);
  }
} as new () => SpeakAsKeywords;

/**
 * speak-as 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class SpeakAsCssRuntime extends CssProperty {
  /**
   * 创建 speak-as 属性作者；普通使用通过 s.speakAs 取得共享实例。
   * @example
   * class CustomSpeakAsCss extends SpeakAsCss {}
   */
  constructor() {
    super('speak-as');
    initializeKeywordDeclarations(this, 'speak-as', speakAsKeywords);
  }
  /**
   * 原样生成 speak-as 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 speak-as:value;，undefined 返回空字符串。
   * @example
   * s.speakAs.raw('inherit') // speak-as:inherit;
   */
  raw(value: Property.SpeakAs | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * speak-as 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type SpeakAsCss = SpeakAsCssRuntime & KeywordDeclarations<SpeakAsKeywords>;
/**
 * 设置语音呈现时文字、数字和标点的朗读方式；使用前核对语音媒体支持。（speak-as）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/speak-as
 */
export const SpeakAsCss = SpeakAsCssRuntime as new () => SpeakAsCss;
import { colorKeywords } from './keyword-sets.js';

/**
 * stop-color 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type StopColorKeywords = KeywordValuesOf<
  typeof colorKeywords,
  Property.StopColor | CssString
>;
/**
 * 创建 stop-color 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new StopColorKeywords()
 */
export const StopColorKeywords = class StopColorKeywords {
  constructor() {
    Object.assign(this, colorKeywords);
  }
} as new () => StopColorKeywords;

/**
 * stop-color 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class StopColorCssRuntime extends CssProperty {
  /**
   * 创建 stop-color 属性作者；普通使用通过 s.stopColor 取得共享实例。
   * @example
   * class CustomStopColorCss extends StopColorCss {}
   */
  constructor() {
    super('stop-color');
    initializeKeywordDeclarations(this, 'stop-color', colorKeywords);
  }
  /**
   * 原样生成 stop-color 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 stop-color:value;，undefined 返回空字符串。
   * @example
   * s.stopColor.raw('inherit') // stop-color:inherit;
   */
  raw(value: Property.StopColor | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 用现代空格分隔语法生成 RGB 颜色声明。
   *
   * 字符串原样输出；库不截断通道或校验 CSS。
   * @param red 红通道，数值通常为 0–255，或带百分比/变量的 CSS 字符串。
   * @param green 绿通道，数值通常为 0–255，或 CSS 字符串。
   * @param blue 蓝通道，数值通常为 0–255，或 CSS 字符串。
   * @param alpha 可选透明度，数值通常为 0–1，或百分比/变量字符串；0 不会被省略。
   * @returns 当前属性的完整声明，不是可嵌套的颜色值。
   * @example
   * s.stopColor.rgb(255, 0, 0, 0.5)
   */
  rgb(
    red: number | CssString,
    green: number | CssString,
    blue: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(`rgb(${red} ${green} ${blue}${alpha === undefined ? '' : ` / ${alpha}`})`);
  }
  /**
   * 生成 HSL 颜色声明，数值饱和度和明度自动添加百分号。
   * @param hue 色相；无单位数值按度解释，也可传带角度单位的字符串。
   * @param saturation 饱和度，数值 100 表示 100%；字符串保留原单位。
   * @param lightness 明度，数值 50 表示 50%；字符串保留原单位。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；数值不做截断。
   * @example
   * s.stopColor.hsl(210, 50, 40, 0.8)
   */
  hsl(
    hue: number | CssString,
    saturation: number | CssString,
    lightness: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(
      `hsl(${hue} ${typeof saturation === 'number' ? saturation + '%' : saturation} ${typeof lightness === 'number' ? lightness + '%' : lightness}${alpha === undefined ? '' : ` / ${alpha}`})`,
    );
  }
  /**
   * 生成 OKLCH 颜色声明，通道按原生 CSS 语法输出。
   * @param lightness 感知明度，数值通常为 0–1；也可传百分比字符串。
   * @param chroma 色度，0 表示无彩色；可呈现范围随明度、色相和设备变化。
   * @param hue 色相，数值按度解释，也可传角度或变量字符串。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；不自动添加百分号或裁切色域。
   * @example
   * s.stopColor.oklch(0.7, 0.15, 250)
   */
  oklch(
    lightness: number | CssString,
    chroma: number | CssString,
    hue: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(
      `oklch(${lightness} ${chroma} ${hue}${alpha === undefined ? '' : ` / ${alpha}`})`,
    );
  }
  /**
   * 生成 OKLab 颜色声明，通道按原生 CSS 语法输出。
   * @param lightness 感知明度，数值通常为 0–1；也可传百分比字符串。
   * @param a 绿到红的色轴，负值偏绿、正值偏红。
   * @param b 蓝到黄的色轴，负值偏蓝、正值偏黄。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；不截断通道数值。
   * @example
   * s.stopColor.oklab(0.7, 0.1, -0.1)
   */
  oklab(
    lightness: number | CssString,
    a: number | CssString,
    b: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(`oklab(${lightness} ${a} ${b}${alpha === undefined ? '' : ` / ${alpha}`})`);
  }
}
/**
 * stop-color 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type StopColorCss = StopColorCssRuntime & KeywordDeclarations<StopColorKeywords>;
/**
 * 设置 SVG 渐变 stop 节点的颜色。（stop-color）
 *
 * CSS 初始值：`black`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-color
 */
export const StopColorCss = StopColorCssRuntime as new () => StopColorCss;

/**
 * stop-opacity 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type StopOpacityKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.StopOpacity | CssString
>;
/**
 * 创建 stop-opacity 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new StopOpacityKeywords()
 */
export const StopOpacityKeywords = class StopOpacityKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => StopOpacityKeywords;

/**
 * stop-opacity 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class StopOpacityCssRuntime extends CssProperty {
  /**
   * 创建 stop-opacity 属性作者；普通使用通过 s.stopOpacity 取得共享实例。
   * @example
   * class CustomStopOpacityCss extends StopOpacityCss {}
   */
  constructor() {
    super('stop-opacity');
    initializeKeywordDeclarations(this, 'stop-opacity', globalKeywords);
  }
  /**
   * 原样生成 stop-opacity 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 stop-opacity:value;，undefined 返回空字符串。
   * @example
   * s.stopOpacity.raw('inherit') // stop-opacity:inherit;
   */
  raw(value: Property.StopOpacity | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.stopOpacity.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.stopOpacity.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.StopOpacity | CssString,
    ...others: (Property.StopOpacity | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.stopOpacity.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.StopOpacity | CssString,
    ...others: (Property.StopOpacity | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.stopOpacity.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.StopOpacity | CssString,
    preferred: Property.StopOpacity | CssString,
    maximum: Property.StopOpacity | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * stop-opacity 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type StopOpacityCss = StopOpacityCssRuntime & KeywordDeclarations<StopOpacityKeywords>;
/**
 * 设置 SVG 渐变 stop 节点的不透明度。（stop-opacity）
 *
 * CSS 初始值：`black`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stop-opacity
 */
export const StopOpacityCss = StopOpacityCssRuntime as new () => StopOpacityCss;
import { fillKeywords } from './keyword-sets.js';

/**
 * stroke 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type StrokeKeywords = KeywordValuesOf<typeof fillKeywords, Property.Stroke | CssString>;
/**
 * 创建 stroke 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new StrokeKeywords()
 */
export const StrokeKeywords = class StrokeKeywords {
  constructor() {
    Object.assign(this, fillKeywords);
  }
} as new () => StrokeKeywords;

/**
 * stroke 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class StrokeCssRuntime extends CssProperty {
  /**
   * 创建 stroke 属性作者；普通使用通过 s.stroke 取得共享实例。
   * @example
   * class CustomStrokeCss extends StrokeCss {}
   */
  constructor() {
    super('stroke');
    initializeKeywordDeclarations(this, 'stroke', fillKeywords);
  }
  /**
   * 原样生成 stroke 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 stroke:value;，undefined 返回空字符串。
   * @example
   * s.stroke.raw('inherit') // stroke:inherit;
   */
  raw(value: Property.Stroke | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 用现代空格分隔语法生成 RGB 颜色声明。
   *
   * 字符串原样输出；库不截断通道或校验 CSS。
   * @param red 红通道，数值通常为 0–255，或带百分比/变量的 CSS 字符串。
   * @param green 绿通道，数值通常为 0–255，或 CSS 字符串。
   * @param blue 蓝通道，数值通常为 0–255，或 CSS 字符串。
   * @param alpha 可选透明度，数值通常为 0–1，或百分比/变量字符串；0 不会被省略。
   * @returns 当前属性的完整声明，不是可嵌套的颜色值。
   * @example
   * s.stroke.rgb(255, 0, 0, 0.5)
   */
  rgb(
    red: number | CssString,
    green: number | CssString,
    blue: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(`rgb(${red} ${green} ${blue}${alpha === undefined ? '' : ` / ${alpha}`})`);
  }
  /**
   * 生成 HSL 颜色声明，数值饱和度和明度自动添加百分号。
   * @param hue 色相；无单位数值按度解释，也可传带角度单位的字符串。
   * @param saturation 饱和度，数值 100 表示 100%；字符串保留原单位。
   * @param lightness 明度，数值 50 表示 50%；字符串保留原单位。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；数值不做截断。
   * @example
   * s.stroke.hsl(210, 50, 40, 0.8)
   */
  hsl(
    hue: number | CssString,
    saturation: number | CssString,
    lightness: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(
      `hsl(${hue} ${typeof saturation === 'number' ? saturation + '%' : saturation} ${typeof lightness === 'number' ? lightness + '%' : lightness}${alpha === undefined ? '' : ` / ${alpha}`})`,
    );
  }
  /**
   * 生成 OKLCH 颜色声明，通道按原生 CSS 语法输出。
   * @param lightness 感知明度，数值通常为 0–1；也可传百分比字符串。
   * @param chroma 色度，0 表示无彩色；可呈现范围随明度、色相和设备变化。
   * @param hue 色相，数值按度解释，也可传角度或变量字符串。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；不自动添加百分号或裁切色域。
   * @example
   * s.stroke.oklch(0.7, 0.15, 250)
   */
  oklch(
    lightness: number | CssString,
    chroma: number | CssString,
    hue: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(
      `oklch(${lightness} ${chroma} ${hue}${alpha === undefined ? '' : ` / ${alpha}`})`,
    );
  }
  /**
   * 生成 OKLab 颜色声明，通道按原生 CSS 语法输出。
   * @param lightness 感知明度，数值通常为 0–1；也可传百分比字符串。
   * @param a 绿到红的色轴，负值偏绿、正值偏红。
   * @param b 蓝到黄的色轴，负值偏蓝、正值偏黄。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；不截断通道数值。
   * @example
   * s.stroke.oklab(0.7, 0.1, -0.1)
   */
  oklab(
    lightness: number | CssString,
    a: number | CssString,
    b: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(`oklab(${lightness} ${a} ${b}${alpha === undefined ? '' : ` / ${alpha}`})`);
  }
}
/**
 * stroke 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type StrokeCss = StrokeCssRuntime & KeywordDeclarations<StrokeKeywords>;
/**
 * 设置 SVG 图形轮廓的描边绘制方式。（stroke）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke
 */
export const StrokeCss = StrokeCssRuntime as new () => StrokeCss;

/**
 * stroke-color 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type StrokeColorKeywords = KeywordValuesOf<
  typeof colorKeywords,
  Property.StrokeColor | CssString
>;
/**
 * 创建 stroke-color 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new StrokeColorKeywords()
 */
export const StrokeColorKeywords = class StrokeColorKeywords {
  constructor() {
    Object.assign(this, colorKeywords);
  }
} as new () => StrokeColorKeywords;

/**
 * stroke-color 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class StrokeColorCssRuntime extends CssProperty {
  /**
   * 创建 stroke-color 属性作者；普通使用通过 s.strokeColor 取得共享实例。
   * @example
   * class CustomStrokeColorCss extends StrokeColorCss {}
   */
  constructor() {
    super('stroke-color');
    initializeKeywordDeclarations(this, 'stroke-color', colorKeywords);
  }
  /**
   * 原样生成 stroke-color 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 stroke-color:value;，undefined 返回空字符串。
   * @example
   * s.strokeColor.raw('inherit') // stroke-color:inherit;
   */
  raw(value: Property.StrokeColor | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 用现代空格分隔语法生成 RGB 颜色声明。
   *
   * 字符串原样输出；库不截断通道或校验 CSS。
   * @param red 红通道，数值通常为 0–255，或带百分比/变量的 CSS 字符串。
   * @param green 绿通道，数值通常为 0–255，或 CSS 字符串。
   * @param blue 蓝通道，数值通常为 0–255，或 CSS 字符串。
   * @param alpha 可选透明度，数值通常为 0–1，或百分比/变量字符串；0 不会被省略。
   * @returns 当前属性的完整声明，不是可嵌套的颜色值。
   * @example
   * s.strokeColor.rgb(255, 0, 0, 0.5)
   */
  rgb(
    red: number | CssString,
    green: number | CssString,
    blue: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(`rgb(${red} ${green} ${blue}${alpha === undefined ? '' : ` / ${alpha}`})`);
  }
  /**
   * 生成 HSL 颜色声明，数值饱和度和明度自动添加百分号。
   * @param hue 色相；无单位数值按度解释，也可传带角度单位的字符串。
   * @param saturation 饱和度，数值 100 表示 100%；字符串保留原单位。
   * @param lightness 明度，数值 50 表示 50%；字符串保留原单位。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；数值不做截断。
   * @example
   * s.strokeColor.hsl(210, 50, 40, 0.8)
   */
  hsl(
    hue: number | CssString,
    saturation: number | CssString,
    lightness: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(
      `hsl(${hue} ${typeof saturation === 'number' ? saturation + '%' : saturation} ${typeof lightness === 'number' ? lightness + '%' : lightness}${alpha === undefined ? '' : ` / ${alpha}`})`,
    );
  }
  /**
   * 生成 OKLCH 颜色声明，通道按原生 CSS 语法输出。
   * @param lightness 感知明度，数值通常为 0–1；也可传百分比字符串。
   * @param chroma 色度，0 表示无彩色；可呈现范围随明度、色相和设备变化。
   * @param hue 色相，数值按度解释，也可传角度或变量字符串。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；不自动添加百分号或裁切色域。
   * @example
   * s.strokeColor.oklch(0.7, 0.15, 250)
   */
  oklch(
    lightness: number | CssString,
    chroma: number | CssString,
    hue: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(
      `oklch(${lightness} ${chroma} ${hue}${alpha === undefined ? '' : ` / ${alpha}`})`,
    );
  }
  /**
   * 生成 OKLab 颜色声明，通道按原生 CSS 语法输出。
   * @param lightness 感知明度，数值通常为 0–1；也可传百分比字符串。
   * @param a 绿到红的色轴，负值偏绿、正值偏红。
   * @param b 蓝到黄的色轴，负值偏蓝、正值偏黄。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；不截断通道数值。
   * @example
   * s.strokeColor.oklab(0.7, 0.1, -0.1)
   */
  oklab(
    lightness: number | CssString,
    a: number | CssString,
    b: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(`oklab(${lightness} ${a} ${b}${alpha === undefined ? '' : ` / ${alpha}`})`);
  }
}
/**
 * stroke-color 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type StrokeColorCss = StrokeColorCssRuntime & KeywordDeclarations<StrokeColorKeywords>;
/**
 * 设置描边颜色的扩展属性；常规 SVG 优先使用 stroke 并核对支持情况。（stroke-color）
 *
 * CSS 初始值：`transparent`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-color
 */
export const StrokeColorCss = StrokeColorCssRuntime as new () => StrokeColorCss;

/**
 * stroke-dasharray 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type StrokeDasharrayKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.StrokeDasharray | CssString
>;
/**
 * 创建 stroke-dasharray 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new StrokeDasharrayKeywords()
 */
export const StrokeDasharrayKeywords = class StrokeDasharrayKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => StrokeDasharrayKeywords;

/**
 * stroke-dasharray 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class StrokeDasharrayCssRuntime extends LengthCssProperty {
  /**
   * 创建 stroke-dasharray 属性作者；普通使用通过 s.strokeDasharray 取得共享实例。
   * @example
   * class CustomStrokeDasharrayCss extends StrokeDasharrayCss {}
   */
  constructor() {
    super('stroke-dasharray');
    initializeKeywordDeclarations(this, 'stroke-dasharray', noneKeywords);
  }
  /**
   * 原样生成 stroke-dasharray 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 stroke-dasharray:value;，undefined 返回空字符串。
   * @example
   * s.strokeDasharray.raw('inherit') // stroke-dasharray:inherit;
   */
  raw(value: Property.StrokeDasharray | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.strokeDasharray.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.strokeDasharray.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.StrokeDasharray | CssString,
    ...others: (Property.StrokeDasharray | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.strokeDasharray.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.StrokeDasharray | CssString,
    ...others: (Property.StrokeDasharray | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.strokeDasharray.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.StrokeDasharray | CssString,
    preferred: Property.StrokeDasharray | CssString,
    maximum: Property.StrokeDasharray | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * stroke-dasharray 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type StrokeDasharrayCss = StrokeDasharrayCssRuntime &
  KeywordDeclarations<StrokeDasharrayKeywords>;
/**
 * 设置 SVG 描边虚线中线段与空隙的长度序列。（stroke-dasharray）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dasharray
 */
export const StrokeDasharrayCss = StrokeDasharrayCssRuntime as new () => StrokeDasharrayCss;

/**
 * stroke-dashoffset 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type StrokeDashoffsetKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.StrokeDashoffset | CssString
>;
/**
 * 创建 stroke-dashoffset 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new StrokeDashoffsetKeywords()
 */
export const StrokeDashoffsetKeywords = class StrokeDashoffsetKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => StrokeDashoffsetKeywords;

/**
 * stroke-dashoffset 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class StrokeDashoffsetCssRuntime extends LengthCssProperty {
  /**
   * 创建 stroke-dashoffset 属性作者；普通使用通过 s.strokeDashoffset 取得共享实例。
   * @example
   * class CustomStrokeDashoffsetCss extends StrokeDashoffsetCss {}
   */
  constructor() {
    super('stroke-dashoffset');
    initializeKeywordDeclarations(this, 'stroke-dashoffset', globalKeywords);
  }
  /**
   * 原样生成 stroke-dashoffset 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 stroke-dashoffset:value;，undefined 返回空字符串。
   * @example
   * s.strokeDashoffset.raw('inherit') // stroke-dashoffset:inherit;
   */
  raw(value: Property.StrokeDashoffset | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.strokeDashoffset.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.strokeDashoffset.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.strokeDashoffset.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.StrokeDashoffset | CssString,
    ...others: (Property.StrokeDashoffset | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.strokeDashoffset.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.StrokeDashoffset | CssString,
    ...others: (Property.StrokeDashoffset | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.strokeDashoffset.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.StrokeDashoffset | CssString,
    preferred: Property.StrokeDashoffset | CssString,
    maximum: Property.StrokeDashoffset | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * stroke-dashoffset 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type StrokeDashoffsetCss = StrokeDashoffsetCssRuntime &
  KeywordDeclarations<StrokeDashoffsetKeywords>;
/**
 * 设置 SVG 虚线描边相对于路径起点的偏移。（stroke-dashoffset）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-dashoffset
 */
export const StrokeDashoffsetCss = StrokeDashoffsetCssRuntime as new () => StrokeDashoffsetCss;
import { strokeLinecapKeywords } from './keyword-sets.js';

/**
 * stroke-linecap 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type StrokeLinecapKeywords = KeywordValuesOf<
  typeof strokeLinecapKeywords,
  Property.StrokeLinecap | CssString
>;
/**
 * 创建 stroke-linecap 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new StrokeLinecapKeywords()
 */
export const StrokeLinecapKeywords = class StrokeLinecapKeywords {
  constructor() {
    Object.assign(this, strokeLinecapKeywords);
  }
} as new () => StrokeLinecapKeywords;

/**
 * stroke-linecap 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class StrokeLinecapCssRuntime extends CssProperty {
  /**
   * 创建 stroke-linecap 属性作者；普通使用通过 s.strokeLinecap 取得共享实例。
   * @example
   * class CustomStrokeLinecapCss extends StrokeLinecapCss {}
   */
  constructor() {
    super('stroke-linecap');
    initializeKeywordDeclarations(this, 'stroke-linecap', strokeLinecapKeywords);
  }
  /**
   * 原样生成 stroke-linecap 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 stroke-linecap:value;，undefined 返回空字符串。
   * @example
   * s.strokeLinecap.raw('inherit') // stroke-linecap:inherit;
   */
  raw(value: Property.StrokeLinecap | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * stroke-linecap 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type StrokeLinecapCss = StrokeLinecapCssRuntime & KeywordDeclarations<StrokeLinecapKeywords>;
/**
 * 设置开放 SVG 子路径端点的描边形状。（stroke-linecap）
 *
 * CSS 初始值：`butt`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linecap
 */
export const StrokeLinecapCss = StrokeLinecapCssRuntime as new () => StrokeLinecapCss;
import { strokeLinejoinKeywords } from './keyword-sets.js';

/**
 * stroke-linejoin 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type StrokeLinejoinKeywords = KeywordValuesOf<
  typeof strokeLinejoinKeywords,
  Property.StrokeLinejoin | CssString
>;
/**
 * 创建 stroke-linejoin 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new StrokeLinejoinKeywords()
 */
export const StrokeLinejoinKeywords = class StrokeLinejoinKeywords {
  constructor() {
    Object.assign(this, strokeLinejoinKeywords);
  }
} as new () => StrokeLinejoinKeywords;

/**
 * stroke-linejoin 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class StrokeLinejoinCssRuntime extends CssProperty {
  /**
   * 创建 stroke-linejoin 属性作者；普通使用通过 s.strokeLinejoin 取得共享实例。
   * @example
   * class CustomStrokeLinejoinCss extends StrokeLinejoinCss {}
   */
  constructor() {
    super('stroke-linejoin');
    initializeKeywordDeclarations(this, 'stroke-linejoin', strokeLinejoinKeywords);
  }
  /**
   * 原样生成 stroke-linejoin 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 stroke-linejoin:value;，undefined 返回空字符串。
   * @example
   * s.strokeLinejoin.raw('inherit') // stroke-linejoin:inherit;
   */
  raw(value: Property.StrokeLinejoin | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * stroke-linejoin 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type StrokeLinejoinCss = StrokeLinejoinCssRuntime &
  KeywordDeclarations<StrokeLinejoinKeywords>;
/**
 * 设置 SVG 路径转角处描边的连接形状。（stroke-linejoin）
 *
 * CSS 初始值：`miter`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-linejoin
 */
export const StrokeLinejoinCss = StrokeLinejoinCssRuntime as new () => StrokeLinejoinCss;

/**
 * stroke-miterlimit 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type StrokeMiterlimitKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.StrokeMiterlimit | CssString
>;
/**
 * 创建 stroke-miterlimit 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new StrokeMiterlimitKeywords()
 */
export const StrokeMiterlimitKeywords = class StrokeMiterlimitKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => StrokeMiterlimitKeywords;

/**
 * stroke-miterlimit 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class StrokeMiterlimitCssRuntime extends CssProperty {
  /**
   * 创建 stroke-miterlimit 属性作者；普通使用通过 s.strokeMiterlimit 取得共享实例。
   * @example
   * class CustomStrokeMiterlimitCss extends StrokeMiterlimitCss {}
   */
  constructor() {
    super('stroke-miterlimit');
    initializeKeywordDeclarations(this, 'stroke-miterlimit', globalKeywords);
  }
  /**
   * 原样生成 stroke-miterlimit 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 stroke-miterlimit:value;，undefined 返回空字符串。
   * @example
   * s.strokeMiterlimit.raw('inherit') // stroke-miterlimit:inherit;
   */
  raw(value: Property.StrokeMiterlimit | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.strokeMiterlimit.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.strokeMiterlimit.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.StrokeMiterlimit | CssString,
    ...others: (Property.StrokeMiterlimit | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.strokeMiterlimit.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.StrokeMiterlimit | CssString,
    ...others: (Property.StrokeMiterlimit | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.strokeMiterlimit.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.StrokeMiterlimit | CssString,
    preferred: Property.StrokeMiterlimit | CssString,
    maximum: Property.StrokeMiterlimit | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * stroke-miterlimit 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type StrokeMiterlimitCss = StrokeMiterlimitCssRuntime &
  KeywordDeclarations<StrokeMiterlimitKeywords>;
/**
 * 限制尖角连接的延伸比例，超过阈值时改变连接形状。（stroke-miterlimit）
 *
 * CSS 初始值：`4`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-miterlimit
 */
export const StrokeMiterlimitCss = StrokeMiterlimitCssRuntime as new () => StrokeMiterlimitCss;

/**
 * stroke-opacity 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type StrokeOpacityKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.StrokeOpacity | CssString
>;
/**
 * 创建 stroke-opacity 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new StrokeOpacityKeywords()
 */
export const StrokeOpacityKeywords = class StrokeOpacityKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => StrokeOpacityKeywords;

/**
 * stroke-opacity 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class StrokeOpacityCssRuntime extends CssProperty {
  /**
   * 创建 stroke-opacity 属性作者；普通使用通过 s.strokeOpacity 取得共享实例。
   * @example
   * class CustomStrokeOpacityCss extends StrokeOpacityCss {}
   */
  constructor() {
    super('stroke-opacity');
    initializeKeywordDeclarations(this, 'stroke-opacity', globalKeywords);
  }
  /**
   * 原样生成 stroke-opacity 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 stroke-opacity:value;，undefined 返回空字符串。
   * @example
   * s.strokeOpacity.raw('inherit') // stroke-opacity:inherit;
   */
  raw(value: Property.StrokeOpacity | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.strokeOpacity.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.strokeOpacity.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.StrokeOpacity | CssString,
    ...others: (Property.StrokeOpacity | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.strokeOpacity.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.StrokeOpacity | CssString,
    ...others: (Property.StrokeOpacity | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.strokeOpacity.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.StrokeOpacity | CssString,
    preferred: Property.StrokeOpacity | CssString,
    maximum: Property.StrokeOpacity | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * stroke-opacity 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type StrokeOpacityCss = StrokeOpacityCssRuntime & KeywordDeclarations<StrokeOpacityKeywords>;
/**
 * 设置 SVG 描边的不透明度，不影响填充。（stroke-opacity）
 *
 * CSS 初始值：`1`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-opacity
 */
export const StrokeOpacityCss = StrokeOpacityCssRuntime as new () => StrokeOpacityCss;

/**
 * stroke-width 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type StrokeWidthKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.StrokeWidth | CssString
>;
/**
 * 创建 stroke-width 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new StrokeWidthKeywords()
 */
export const StrokeWidthKeywords = class StrokeWidthKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => StrokeWidthKeywords;

/**
 * stroke-width 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class StrokeWidthCssRuntime extends LengthCssProperty {
  /**
   * 创建 stroke-width 属性作者；普通使用通过 s.strokeWidth 取得共享实例。
   * @example
   * class CustomStrokeWidthCss extends StrokeWidthCss {}
   */
  constructor() {
    super('stroke-width');
    initializeKeywordDeclarations(this, 'stroke-width', globalKeywords);
  }
  /**
   * 原样生成 stroke-width 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 stroke-width:value;，undefined 返回空字符串。
   * @example
   * s.strokeWidth.raw('inherit') // stroke-width:inherit;
   */
  raw(value: Property.StrokeWidth | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.strokeWidth.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.strokeWidth.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.strokeWidth.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.StrokeWidth | CssString,
    ...others: (Property.StrokeWidth | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.strokeWidth.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.StrokeWidth | CssString,
    ...others: (Property.StrokeWidth | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.strokeWidth.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.StrokeWidth | CssString,
    preferred: Property.StrokeWidth | CssString,
    maximum: Property.StrokeWidth | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * stroke-width 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type StrokeWidthCss = StrokeWidthCssRuntime & KeywordDeclarations<StrokeWidthKeywords>;
/**
 * 设置 SVG 描边宽度。（stroke-width）
 *
 * CSS 初始值：`1px`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/stroke-width
 */
export const StrokeWidthCss = StrokeWidthCssRuntime as new () => StrokeWidthCss;

/**
 * tab-size 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TabSizeKeywords = KeywordValuesOf<typeof globalKeywords, Property.TabSize | CssString>;
/**
 * 创建 tab-size 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TabSizeKeywords()
 */
export const TabSizeKeywords = class TabSizeKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => TabSizeKeywords;

/**
 * tab-size 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TabSizeCssRuntime extends LengthCssProperty {
  /**
   * 创建 tab-size 属性作者；普通使用通过 s.tabSize 取得共享实例。
   * @example
   * class CustomTabSizeCss extends TabSizeCss {}
   */
  constructor() {
    super('tab-size');
    initializeKeywordDeclarations(this, 'tab-size', globalKeywords);
  }
  /**
   * 原样生成 tab-size 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 tab-size:value;，undefined 返回空字符串。
   * @example
   * s.tabSize.raw('inherit') // tab-size:inherit;
   */
  raw(value: Property.TabSize | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.tabSize.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.tabSize.min('var(--first)', 'var(--second)')
   */
  min(value: Property.TabSize | CssString, ...others: (Property.TabSize | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.tabSize.max('var(--first)', 'var(--second)')
   */
  max(value: Property.TabSize | CssString, ...others: (Property.TabSize | CssString)[]): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.tabSize.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.TabSize | CssString,
    preferred: Property.TabSize | CssString,
    maximum: Property.TabSize | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * tab-size 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TabSizeCss = TabSizeCssRuntime & KeywordDeclarations<TabSizeKeywords>;
/**
 * 设置保留制表符时每个制表位的宽度。（tab-size）
 *
 * CSS 初始值：`8`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/tab-size
 */
export const TabSizeCss = TabSizeCssRuntime as new () => TabSizeCss;
import { tableLayoutKeywords } from './keyword-sets.js';

/**
 * table-layout 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TableLayoutKeywords = KeywordValuesOf<
  typeof tableLayoutKeywords,
  Property.TableLayout | CssString
>;
/**
 * 创建 table-layout 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TableLayoutKeywords()
 */
export const TableLayoutKeywords = class TableLayoutKeywords {
  constructor() {
    Object.assign(this, tableLayoutKeywords);
  }
} as new () => TableLayoutKeywords;

/**
 * table-layout 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TableLayoutCssRuntime extends CssProperty {
  /**
   * 创建 table-layout 属性作者；普通使用通过 s.tableLayout 取得共享实例。
   * @example
   * class CustomTableLayoutCss extends TableLayoutCss {}
   */
  constructor() {
    super('table-layout');
    initializeKeywordDeclarations(this, 'table-layout', tableLayoutKeywords);
  }
  /**
   * 原样生成 table-layout 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 table-layout:value;，undefined 返回空字符串。
   * @example
   * s.tableLayout.raw('inherit') // table-layout:inherit;
   */
  raw(value: Property.TableLayout | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * table-layout 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TableLayoutCss = TableLayoutCssRuntime & KeywordDeclarations<TableLayoutKeywords>;
/**
 * 设置表格列宽采用自动还是固定布局算法。（table-layout）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/table-layout
 */
export const TableLayoutCss = TableLayoutCssRuntime as new () => TableLayoutCss;
import { textAlignKeywords } from './keyword-sets.js';

/**
 * text-align 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextAlignKeywords = KeywordValuesOf<
  typeof textAlignKeywords,
  Property.TextAlign | CssString
>;
/**
 * 创建 text-align 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextAlignKeywords()
 */
export const TextAlignKeywords = class TextAlignKeywords {
  constructor() {
    Object.assign(this, textAlignKeywords);
  }
} as new () => TextAlignKeywords;

/**
 * text-align 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextAlignCssRuntime extends CssProperty {
  /**
   * 创建 text-align 属性作者；普通使用通过 s.textAlign 取得共享实例。
   * @example
   * class CustomTextAlignCss extends TextAlignCss {}
   */
  constructor() {
    super('text-align');
    initializeKeywordDeclarations(this, 'text-align', textAlignKeywords);
  }
  /**
   * 原样生成 text-align 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-align:value;，undefined 返回空字符串。
   * @example
   * s.textAlign.raw('inherit') // text-align:inherit;
   */
  raw(value: Property.TextAlign | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-align 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextAlignCss = TextAlignCssRuntime & KeywordDeclarations<TextAlignKeywords>;
/**
 * 设置块容器中行内内容的水平或逻辑方向对齐。（text-align）
 *
 * 控制块容器中的行内内容，不是块盒自身的位置，也不是 Flex/Grid 项目的对齐。
 *
 * 常用值：
 * - `start`：按当前书写方向的行内起始侧对齐。
 * - `end`：按当前书写方向的行内结束侧对齐。
 * - `center`：将行内内容在行盒中居中，不会让块盒自身居中。
 * - `justify`：调整行内间距使文字两端对齐；最后一行通常由 text-align-last 控制。
 *
 * 适用场景：正文、标题和表格单元格中的文本对齐。
 *
 * CSS 初始值：`start`（不同于浏览器默认样式表）。
 * @example
 * s.textAlign.start
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align
 */
export const TextAlignCss = TextAlignCssRuntime as new () => TextAlignCss;
import { textAlignLastKeywords } from './keyword-sets.js';

/**
 * text-align-last 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextAlignLastKeywords = KeywordValuesOf<
  typeof textAlignLastKeywords,
  Property.TextAlignLast | CssString
>;
/**
 * 创建 text-align-last 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextAlignLastKeywords()
 */
export const TextAlignLastKeywords = class TextAlignLastKeywords {
  constructor() {
    Object.assign(this, textAlignLastKeywords);
  }
} as new () => TextAlignLastKeywords;

/**
 * text-align-last 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextAlignLastCssRuntime extends CssProperty {
  /**
   * 创建 text-align-last 属性作者；普通使用通过 s.textAlignLast 取得共享实例。
   * @example
   * class CustomTextAlignLastCss extends TextAlignLastCss {}
   */
  constructor() {
    super('text-align-last');
    initializeKeywordDeclarations(this, 'text-align-last', textAlignLastKeywords);
  }
  /**
   * 原样生成 text-align-last 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-align-last:value;，undefined 返回空字符串。
   * @example
   * s.textAlignLast.raw('inherit') // text-align-last:inherit;
   */
  raw(value: Property.TextAlignLast | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-align-last 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextAlignLastCss = TextAlignLastCssRuntime & KeywordDeclarations<TextAlignLastKeywords>;
/**
 * 设置段落最后一行或强制换行前一行的对齐方式。（text-align-last）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-align-last
 */
export const TextAlignLastCss = TextAlignLastCssRuntime as new () => TextAlignLastCss;
import { textAnchorKeywords } from './keyword-sets.js';

/**
 * text-anchor 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextAnchorKeywords = KeywordValuesOf<
  typeof textAnchorKeywords,
  Property.TextAnchor | CssString
>;
/**
 * 创建 text-anchor 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextAnchorKeywords()
 */
export const TextAnchorKeywords = class TextAnchorKeywords {
  constructor() {
    Object.assign(this, textAnchorKeywords);
  }
} as new () => TextAnchorKeywords;

/**
 * text-anchor 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextAnchorCssRuntime extends CssProperty {
  /**
   * 创建 text-anchor 属性作者；普通使用通过 s.textAnchor 取得共享实例。
   * @example
   * class CustomTextAnchorCss extends TextAnchorCss {}
   */
  constructor() {
    super('text-anchor');
    initializeKeywordDeclarations(this, 'text-anchor', textAnchorKeywords);
  }
  /**
   * 原样生成 text-anchor 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-anchor:value;，undefined 返回空字符串。
   * @example
   * s.textAnchor.raw('inherit') // text-anchor:inherit;
   */
  raw(value: Property.TextAnchor | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-anchor 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextAnchorCss = TextAnchorCssRuntime & KeywordDeclarations<TextAnchorKeywords>;
/**
 * 设置 SVG 文本片段相对于定位点的锚定方式。（text-anchor）
 *
 * CSS 初始值：`start`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-anchor
 */
export const TextAnchorCss = TextAnchorCssRuntime as new () => TextAnchorCss;
import { textAutospaceKeywords } from './keyword-sets.js';

/**
 * text-autospace 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextAutospaceKeywords = KeywordValuesOf<
  typeof textAutospaceKeywords,
  Property.TextAutospace | CssString
>;
/**
 * 创建 text-autospace 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextAutospaceKeywords()
 */
export const TextAutospaceKeywords = class TextAutospaceKeywords {
  constructor() {
    Object.assign(this, textAutospaceKeywords);
  }
} as new () => TextAutospaceKeywords;

/**
 * text-autospace 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextAutospaceCssRuntime extends CssProperty {
  /**
   * 创建 text-autospace 属性作者；普通使用通过 s.textAutospace 取得共享实例。
   * @example
   * class CustomTextAutospaceCss extends TextAutospaceCss {}
   */
  constructor() {
    super('text-autospace');
    initializeKeywordDeclarations(this, 'text-autospace', textAutospaceKeywords);
  }
  /**
   * 原样生成 text-autospace 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-autospace:value;，undefined 返回空字符串。
   * @example
   * s.textAutospace.raw('inherit') // text-autospace:inherit;
   */
  raw(value: Property.TextAutospace | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-autospace 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextAutospaceCss = TextAutospaceCssRuntime & KeywordDeclarations<TextAutospaceKeywords>;
/**
 * 设置中西文、数字等不同文字系统之间的自动间距。（text-autospace）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-autospace
 */
export const TextAutospaceCss = TextAutospaceCssRuntime as new () => TextAutospaceCss;
import { textBoxKeywords } from './keyword-sets.js';

/**
 * text-box 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextBoxKeywords = KeywordValuesOf<typeof textBoxKeywords, Property.TextBox | CssString>;
/**
 * 创建 text-box 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextBoxKeywords()
 */
export const TextBoxKeywords = class TextBoxKeywords {
  constructor() {
    Object.assign(this, textBoxKeywords);
  }
} as new () => TextBoxKeywords;

/**
 * text-box 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextBoxCssRuntime extends CssProperty {
  /**
   * 创建 text-box 属性作者；普通使用通过 s.textBox 取得共享实例。
   * @example
   * class CustomTextBoxCss extends TextBoxCss {}
   */
  constructor() {
    super('text-box');
    initializeKeywordDeclarations(this, 'text-box', textBoxKeywords);
  }
  /**
   * 原样生成 text-box 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-box:value;，undefined 返回空字符串。
   * @example
   * s.textBox.raw('inherit') // text-box:inherit;
   */
  raw(value: Property.TextBox | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-box 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextBoxCss = TextBoxCssRuntime & KeywordDeclarations<TextBoxKeywords>;
/**
 * 同时设置文本盒边缘参照及首尾空白裁减。（text-box）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box
 */
export const TextBoxCss = TextBoxCssRuntime as new () => TextBoxCss;
import { textBoxEdgeKeywords } from './keyword-sets.js';

/**
 * text-box-edge 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextBoxEdgeKeywords = KeywordValuesOf<
  typeof textBoxEdgeKeywords,
  Property.TextBoxEdge | CssString
>;
/**
 * 创建 text-box-edge 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextBoxEdgeKeywords()
 */
export const TextBoxEdgeKeywords = class TextBoxEdgeKeywords {
  constructor() {
    Object.assign(this, textBoxEdgeKeywords);
  }
} as new () => TextBoxEdgeKeywords;

/**
 * text-box-edge 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextBoxEdgeCssRuntime extends CssProperty {
  /**
   * 创建 text-box-edge 属性作者；普通使用通过 s.textBoxEdge 取得共享实例。
   * @example
   * class CustomTextBoxEdgeCss extends TextBoxEdgeCss {}
   */
  constructor() {
    super('text-box-edge');
    initializeKeywordDeclarations(this, 'text-box-edge', textBoxEdgeKeywords);
  }
  /**
   * 原样生成 text-box-edge 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-box-edge:value;，undefined 返回空字符串。
   * @example
   * s.textBoxEdge.raw('inherit') // text-box-edge:inherit;
   */
  raw(value: Property.TextBoxEdge | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-box-edge 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextBoxEdgeCss = TextBoxEdgeCssRuntime & KeywordDeclarations<TextBoxEdgeKeywords>;
/**
 * 选择文本盒裁减或对齐使用的字体边缘度量。（text-box-edge）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-edge
 */
export const TextBoxEdgeCss = TextBoxEdgeCssRuntime as new () => TextBoxEdgeCss;
import { textBoxTrimKeywords } from './keyword-sets.js';

/**
 * text-box-trim 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextBoxTrimKeywords = KeywordValuesOf<
  typeof textBoxTrimKeywords,
  Property.TextBoxTrim | CssString
>;
/**
 * 创建 text-box-trim 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextBoxTrimKeywords()
 */
export const TextBoxTrimKeywords = class TextBoxTrimKeywords {
  constructor() {
    Object.assign(this, textBoxTrimKeywords);
  }
} as new () => TextBoxTrimKeywords;

/**
 * text-box-trim 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextBoxTrimCssRuntime extends CssProperty {
  /**
   * 创建 text-box-trim 属性作者；普通使用通过 s.textBoxTrim 取得共享实例。
   * @example
   * class CustomTextBoxTrimCss extends TextBoxTrimCss {}
   */
  constructor() {
    super('text-box-trim');
    initializeKeywordDeclarations(this, 'text-box-trim', textBoxTrimKeywords);
  }
  /**
   * 原样生成 text-box-trim 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-box-trim:value;，undefined 返回空字符串。
   * @example
   * s.textBoxTrim.raw('inherit') // text-box-trim:inherit;
   */
  raw(value: Property.TextBoxTrim | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-box-trim 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextBoxTrimCss = TextBoxTrimCssRuntime & KeywordDeclarations<TextBoxTrimKeywords>;
/**
 * 裁减文本块开头或结尾的额外行高空白。（text-box-trim）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-box-trim
 */
export const TextBoxTrimCss = TextBoxTrimCssRuntime as new () => TextBoxTrimCss;
import { textCombineUprightKeywords } from './keyword-sets.js';

/**
 * text-combine-upright 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextCombineUprightKeywords = KeywordValuesOf<
  typeof textCombineUprightKeywords,
  Property.TextCombineUpright | CssString
>;
/**
 * 创建 text-combine-upright 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextCombineUprightKeywords()
 */
export const TextCombineUprightKeywords = class TextCombineUprightKeywords {
  constructor() {
    Object.assign(this, textCombineUprightKeywords);
  }
} as new () => TextCombineUprightKeywords;

/**
 * text-combine-upright 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextCombineUprightCssRuntime extends CssProperty {
  /**
   * 创建 text-combine-upright 属性作者；普通使用通过 s.textCombineUpright 取得共享实例。
   * @example
   * class CustomTextCombineUprightCss extends TextCombineUprightCss {}
   */
  constructor() {
    super('text-combine-upright');
    initializeKeywordDeclarations(this, 'text-combine-upright', textCombineUprightKeywords);
  }
  /**
   * 原样生成 text-combine-upright 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-combine-upright:value;，undefined 返回空字符串。
   * @example
   * s.textCombineUpright.raw('inherit') // text-combine-upright:inherit;
   */
  raw(value: Property.TextCombineUpright | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-combine-upright 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextCombineUprightCss = TextCombineUprightCssRuntime &
  KeywordDeclarations<TextCombineUprightKeywords>;
/**
 * 设置竖排文字中多个字符是否合成为一个横排字形单元。（text-combine-upright）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-combine-upright
 */
export const TextCombineUprightCss =
  TextCombineUprightCssRuntime as new () => TextCombineUprightCss;
import { textDecorationKeywords } from './keyword-sets.js';

/**
 * text-decoration 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextDecorationKeywords = KeywordValuesOf<
  typeof textDecorationKeywords,
  Property.TextDecoration | CssString
>;
/**
 * 创建 text-decoration 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextDecorationKeywords()
 */
export const TextDecorationKeywords = class TextDecorationKeywords {
  constructor() {
    Object.assign(this, textDecorationKeywords);
  }
} as new () => TextDecorationKeywords;

/**
 * text-decoration 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextDecorationCssRuntime extends LengthCssProperty {
  /**
   * 创建 text-decoration 属性作者；普通使用通过 s.textDecoration 取得共享实例。
   * @example
   * class CustomTextDecorationCss extends TextDecorationCss {}
   */
  constructor() {
    super('text-decoration');
    initializeKeywordDeclarations(this, 'text-decoration', textDecorationKeywords);
  }
  /**
   * 原样生成 text-decoration 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-decoration:value;，undefined 返回空字符串。
   * @example
   * s.textDecoration.raw('inherit') // text-decoration:inherit;
   */
  raw(value: Property.TextDecoration | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 用现代空格分隔语法生成 RGB 颜色声明。
   *
   * 字符串原样输出；库不截断通道或校验 CSS。
   * @param red 红通道，数值通常为 0–255，或带百分比/变量的 CSS 字符串。
   * @param green 绿通道，数值通常为 0–255，或 CSS 字符串。
   * @param blue 蓝通道，数值通常为 0–255，或 CSS 字符串。
   * @param alpha 可选透明度，数值通常为 0–1，或百分比/变量字符串；0 不会被省略。
   * @returns 当前属性的完整声明，不是可嵌套的颜色值。
   * @example
   * s.textDecoration.rgb(255, 0, 0, 0.5)
   */
  rgb(
    red: number | CssString,
    green: number | CssString,
    blue: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(`rgb(${red} ${green} ${blue}${alpha === undefined ? '' : ` / ${alpha}`})`);
  }
  /**
   * 生成 HSL 颜色声明，数值饱和度和明度自动添加百分号。
   * @param hue 色相；无单位数值按度解释，也可传带角度单位的字符串。
   * @param saturation 饱和度，数值 100 表示 100%；字符串保留原单位。
   * @param lightness 明度，数值 50 表示 50%；字符串保留原单位。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；数值不做截断。
   * @example
   * s.textDecoration.hsl(210, 50, 40, 0.8)
   */
  hsl(
    hue: number | CssString,
    saturation: number | CssString,
    lightness: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(
      `hsl(${hue} ${typeof saturation === 'number' ? saturation + '%' : saturation} ${typeof lightness === 'number' ? lightness + '%' : lightness}${alpha === undefined ? '' : ` / ${alpha}`})`,
    );
  }
  /**
   * 生成 OKLCH 颜色声明，通道按原生 CSS 语法输出。
   * @param lightness 感知明度，数值通常为 0–1；也可传百分比字符串。
   * @param chroma 色度，0 表示无彩色；可呈现范围随明度、色相和设备变化。
   * @param hue 色相，数值按度解释，也可传角度或变量字符串。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；不自动添加百分号或裁切色域。
   * @example
   * s.textDecoration.oklch(0.7, 0.15, 250)
   */
  oklch(
    lightness: number | CssString,
    chroma: number | CssString,
    hue: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(
      `oklch(${lightness} ${chroma} ${hue}${alpha === undefined ? '' : ` / ${alpha}`})`,
    );
  }
  /**
   * 生成 OKLab 颜色声明，通道按原生 CSS 语法输出。
   * @param lightness 感知明度，数值通常为 0–1；也可传百分比字符串。
   * @param a 绿到红的色轴，负值偏绿、正值偏红。
   * @param b 蓝到黄的色轴，负值偏蓝、正值偏黄。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；不截断通道数值。
   * @example
   * s.textDecoration.oklab(0.7, 0.1, -0.1)
   */
  oklab(
    lightness: number | CssString,
    a: number | CssString,
    b: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(`oklab(${lightness} ${a} ${b}${alpha === undefined ? '' : ` / ${alpha}`})`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.textDecoration.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.textDecoration.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.TextDecoration | CssString,
    ...others: (Property.TextDecoration | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.textDecoration.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.TextDecoration | CssString,
    ...others: (Property.TextDecoration | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.textDecoration.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.TextDecoration | CssString,
    preferred: Property.TextDecoration | CssString,
    maximum: Property.TextDecoration | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * text-decoration 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextDecorationCss = TextDecorationCssRuntime &
  KeywordDeclarations<TextDecorationKeywords>;
/**
 * 集中设置文本装饰线的位置、线型、颜色及粗细。（text-decoration）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration
 */
export const TextDecorationCss = TextDecorationCssRuntime as new () => TextDecorationCss;

/**
 * text-decoration-color 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextDecorationColorKeywords = KeywordValuesOf<
  typeof colorKeywords,
  Property.TextDecorationColor | CssString
>;
/**
 * 创建 text-decoration-color 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextDecorationColorKeywords()
 */
export const TextDecorationColorKeywords = class TextDecorationColorKeywords {
  constructor() {
    Object.assign(this, colorKeywords);
  }
} as new () => TextDecorationColorKeywords;

/**
 * text-decoration-color 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextDecorationColorCssRuntime extends CssProperty {
  /**
   * 创建 text-decoration-color 属性作者；普通使用通过 s.textDecorationColor 取得共享实例。
   * @example
   * class CustomTextDecorationColorCss extends TextDecorationColorCss {}
   */
  constructor() {
    super('text-decoration-color');
    initializeKeywordDeclarations(this, 'text-decoration-color', colorKeywords);
  }
  /**
   * 原样生成 text-decoration-color 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-decoration-color:value;，undefined 返回空字符串。
   * @example
   * s.textDecorationColor.raw('inherit') // text-decoration-color:inherit;
   */
  raw(value: Property.TextDecorationColor | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 用现代空格分隔语法生成 RGB 颜色声明。
   *
   * 字符串原样输出；库不截断通道或校验 CSS。
   * @param red 红通道，数值通常为 0–255，或带百分比/变量的 CSS 字符串。
   * @param green 绿通道，数值通常为 0–255，或 CSS 字符串。
   * @param blue 蓝通道，数值通常为 0–255，或 CSS 字符串。
   * @param alpha 可选透明度，数值通常为 0–1，或百分比/变量字符串；0 不会被省略。
   * @returns 当前属性的完整声明，不是可嵌套的颜色值。
   * @example
   * s.textDecorationColor.rgb(255, 0, 0, 0.5)
   */
  rgb(
    red: number | CssString,
    green: number | CssString,
    blue: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(`rgb(${red} ${green} ${blue}${alpha === undefined ? '' : ` / ${alpha}`})`);
  }
  /**
   * 生成 HSL 颜色声明，数值饱和度和明度自动添加百分号。
   * @param hue 色相；无单位数值按度解释，也可传带角度单位的字符串。
   * @param saturation 饱和度，数值 100 表示 100%；字符串保留原单位。
   * @param lightness 明度，数值 50 表示 50%；字符串保留原单位。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；数值不做截断。
   * @example
   * s.textDecorationColor.hsl(210, 50, 40, 0.8)
   */
  hsl(
    hue: number | CssString,
    saturation: number | CssString,
    lightness: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(
      `hsl(${hue} ${typeof saturation === 'number' ? saturation + '%' : saturation} ${typeof lightness === 'number' ? lightness + '%' : lightness}${alpha === undefined ? '' : ` / ${alpha}`})`,
    );
  }
  /**
   * 生成 OKLCH 颜色声明，通道按原生 CSS 语法输出。
   * @param lightness 感知明度，数值通常为 0–1；也可传百分比字符串。
   * @param chroma 色度，0 表示无彩色；可呈现范围随明度、色相和设备变化。
   * @param hue 色相，数值按度解释，也可传角度或变量字符串。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；不自动添加百分号或裁切色域。
   * @example
   * s.textDecorationColor.oklch(0.7, 0.15, 250)
   */
  oklch(
    lightness: number | CssString,
    chroma: number | CssString,
    hue: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(
      `oklch(${lightness} ${chroma} ${hue}${alpha === undefined ? '' : ` / ${alpha}`})`,
    );
  }
  /**
   * 生成 OKLab 颜色声明，通道按原生 CSS 语法输出。
   * @param lightness 感知明度，数值通常为 0–1；也可传百分比字符串。
   * @param a 绿到红的色轴，负值偏绿、正值偏红。
   * @param b 蓝到黄的色轴，负值偏蓝、正值偏黄。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；不截断通道数值。
   * @example
   * s.textDecorationColor.oklab(0.7, 0.1, -0.1)
   */
  oklab(
    lightness: number | CssString,
    a: number | CssString,
    b: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(`oklab(${lightness} ${a} ${b}${alpha === undefined ? '' : ` / ${alpha}`})`);
  }
}
/**
 * text-decoration-color 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextDecorationColorCss = TextDecorationColorCssRuntime &
  KeywordDeclarations<TextDecorationColorKeywords>;
/**
 * 设置文本装饰线颜色。（text-decoration-color）
 *
 * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-color
 */
export const TextDecorationColorCss =
  TextDecorationColorCssRuntime as new () => TextDecorationColorCss;
import { textDecorationLineKeywords } from './keyword-sets.js';

/**
 * text-decoration-line 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextDecorationLineKeywords = KeywordValuesOf<
  typeof textDecorationLineKeywords,
  Property.TextDecorationLine | CssString
>;
/**
 * 创建 text-decoration-line 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextDecorationLineKeywords()
 */
export const TextDecorationLineKeywords = class TextDecorationLineKeywords {
  constructor() {
    Object.assign(this, textDecorationLineKeywords);
  }
} as new () => TextDecorationLineKeywords;

/**
 * text-decoration-line 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextDecorationLineCssRuntime extends CssProperty {
  /**
   * 创建 text-decoration-line 属性作者；普通使用通过 s.textDecorationLine 取得共享实例。
   * @example
   * class CustomTextDecorationLineCss extends TextDecorationLineCss {}
   */
  constructor() {
    super('text-decoration-line');
    initializeKeywordDeclarations(this, 'text-decoration-line', textDecorationLineKeywords);
  }
  /**
   * 原样生成 text-decoration-line 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-decoration-line:value;，undefined 返回空字符串。
   * @example
   * s.textDecorationLine.raw('inherit') // text-decoration-line:inherit;
   */
  raw(value: Property.TextDecorationLine | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-decoration-line 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextDecorationLineCss = TextDecorationLineCssRuntime &
  KeywordDeclarations<TextDecorationLineKeywords>;
/**
 * 设置下划线、上划线或删除线等装饰线位置。（text-decoration-line）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-line
 */
export const TextDecorationLineCss =
  TextDecorationLineCssRuntime as new () => TextDecorationLineCss;
import { textDecorationSkipKeywords } from './keyword-sets.js';

/**
 * text-decoration-skip 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextDecorationSkipKeywords = KeywordValuesOf<
  typeof textDecorationSkipKeywords,
  Property.TextDecorationSkip | CssString
>;
/**
 * 创建 text-decoration-skip 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextDecorationSkipKeywords()
 */
export const TextDecorationSkipKeywords = class TextDecorationSkipKeywords {
  constructor() {
    Object.assign(this, textDecorationSkipKeywords);
  }
} as new () => TextDecorationSkipKeywords;

/**
 * text-decoration-skip 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextDecorationSkipCssRuntime extends CssProperty {
  /**
   * 创建 text-decoration-skip 属性作者；普通使用通过 s.textDecorationSkip 取得共享实例。
   * @example
   * class CustomTextDecorationSkipCss extends TextDecorationSkipCss {}
   */
  constructor() {
    super('text-decoration-skip');
    initializeKeywordDeclarations(this, 'text-decoration-skip', textDecorationSkipKeywords);
  }
  /**
   * 原样生成 text-decoration-skip 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-decoration-skip:value;，undefined 返回空字符串。
   * @example
   * s.textDecorationSkip.raw('inherit') // text-decoration-skip:inherit;
   */
  raw(value: Property.TextDecorationSkip | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-decoration-skip 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextDecorationSkipCss = TextDecorationSkipCssRuntime &
  KeywordDeclarations<TextDecorationSkipKeywords>;
/**
 * 设置文本装饰线跳过哪些内容；具体语法需核对支持情况。（text-decoration-skip）
 *
 * CSS 初始值：`objects`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip
 */
export const TextDecorationSkipCss =
  TextDecorationSkipCssRuntime as new () => TextDecorationSkipCss;
import { textDecorationSkipInkKeywords } from './keyword-sets.js';

/**
 * text-decoration-skip-ink 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextDecorationSkipInkKeywords = KeywordValuesOf<
  typeof textDecorationSkipInkKeywords,
  Property.TextDecorationSkipInk | CssString
>;
/**
 * 创建 text-decoration-skip-ink 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextDecorationSkipInkKeywords()
 */
export const TextDecorationSkipInkKeywords = class TextDecorationSkipInkKeywords {
  constructor() {
    Object.assign(this, textDecorationSkipInkKeywords);
  }
} as new () => TextDecorationSkipInkKeywords;

/**
 * text-decoration-skip-ink 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextDecorationSkipInkCssRuntime extends CssProperty {
  /**
   * 创建 text-decoration-skip-ink 属性作者；普通使用通过 s.textDecorationSkipInk 取得共享实例。
   * @example
   * class CustomTextDecorationSkipInkCss extends TextDecorationSkipInkCss {}
   */
  constructor() {
    super('text-decoration-skip-ink');
    initializeKeywordDeclarations(this, 'text-decoration-skip-ink', textDecorationSkipInkKeywords);
  }
  /**
   * 原样生成 text-decoration-skip-ink 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-decoration-skip-ink:value;，undefined 返回空字符串。
   * @example
   * s.textDecorationSkipInk.raw('inherit') // text-decoration-skip-ink:inherit;
   */
  raw(value: Property.TextDecorationSkipInk | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-decoration-skip-ink 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextDecorationSkipInkCss = TextDecorationSkipInkCssRuntime &
  KeywordDeclarations<TextDecorationSkipInkKeywords>;
/**
 * 设置装饰线是否避让字形的笔画。（text-decoration-skip-ink）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-skip-ink
 */
export const TextDecorationSkipInkCss =
  TextDecorationSkipInkCssRuntime as new () => TextDecorationSkipInkCss;
import { textDecorationStyleKeywords } from './keyword-sets.js';

/**
 * text-decoration-style 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextDecorationStyleKeywords = KeywordValuesOf<
  typeof textDecorationStyleKeywords,
  Property.TextDecorationStyle | CssString
>;
/**
 * 创建 text-decoration-style 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextDecorationStyleKeywords()
 */
export const TextDecorationStyleKeywords = class TextDecorationStyleKeywords {
  constructor() {
    Object.assign(this, textDecorationStyleKeywords);
  }
} as new () => TextDecorationStyleKeywords;

/**
 * text-decoration-style 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextDecorationStyleCssRuntime extends CssProperty {
  /**
   * 创建 text-decoration-style 属性作者；普通使用通过 s.textDecorationStyle 取得共享实例。
   * @example
   * class CustomTextDecorationStyleCss extends TextDecorationStyleCss {}
   */
  constructor() {
    super('text-decoration-style');
    initializeKeywordDeclarations(this, 'text-decoration-style', textDecorationStyleKeywords);
  }
  /**
   * 原样生成 text-decoration-style 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-decoration-style:value;，undefined 返回空字符串。
   * @example
   * s.textDecorationStyle.raw('inherit') // text-decoration-style:inherit;
   */
  raw(value: Property.TextDecorationStyle | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-decoration-style 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextDecorationStyleCss = TextDecorationStyleCssRuntime &
  KeywordDeclarations<TextDecorationStyleKeywords>;
/**
 * 设置文本装饰线的实线、波浪线等线型。（text-decoration-style）
 *
 * CSS 初始值：`solid`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-style
 */
export const TextDecorationStyleCss =
  TextDecorationStyleCssRuntime as new () => TextDecorationStyleCss;
import { textDecorationThicknessKeywords } from './keyword-sets.js';

/**
 * text-decoration-thickness 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextDecorationThicknessKeywords = KeywordValuesOf<
  typeof textDecorationThicknessKeywords,
  Property.TextDecorationThickness | CssString
>;
/**
 * 创建 text-decoration-thickness 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextDecorationThicknessKeywords()
 */
export const TextDecorationThicknessKeywords = class TextDecorationThicknessKeywords {
  constructor() {
    Object.assign(this, textDecorationThicknessKeywords);
  }
} as new () => TextDecorationThicknessKeywords;

/**
 * text-decoration-thickness 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextDecorationThicknessCssRuntime extends LengthCssProperty {
  /**
   * 创建 text-decoration-thickness 属性作者；普通使用通过 s.textDecorationThickness 取得共享实例。
   * @example
   * class CustomTextDecorationThicknessCss extends TextDecorationThicknessCss {}
   */
  constructor() {
    super('text-decoration-thickness');
    initializeKeywordDeclarations(
      this,
      'text-decoration-thickness',
      textDecorationThicknessKeywords,
    );
  }
  /**
   * 原样生成 text-decoration-thickness 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-decoration-thickness:value;，undefined 返回空字符串。
   * @example
   * s.textDecorationThickness.raw('inherit') // text-decoration-thickness:inherit;
   */
  raw(value: Property.TextDecorationThickness | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.textDecorationThickness.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.textDecorationThickness.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.textDecorationThickness.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.TextDecorationThickness | CssString,
    ...others: (Property.TextDecorationThickness | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.textDecorationThickness.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.TextDecorationThickness | CssString,
    ...others: (Property.TextDecorationThickness | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.textDecorationThickness.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.TextDecorationThickness | CssString,
    preferred: Property.TextDecorationThickness | CssString,
    maximum: Property.TextDecorationThickness | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * text-decoration-thickness 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextDecorationThicknessCss = TextDecorationThicknessCssRuntime &
  KeywordDeclarations<TextDecorationThicknessKeywords>;
/**
 * 设置文本装饰线粗细。（text-decoration-thickness）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-decoration-thickness
 */
export const TextDecorationThicknessCss =
  TextDecorationThicknessCssRuntime as new () => TextDecorationThicknessCss;
import { textEmphasisKeywords } from './keyword-sets.js';

/**
 * text-emphasis 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextEmphasisKeywords = KeywordValuesOf<
  typeof textEmphasisKeywords,
  Property.TextEmphasis | CssString
>;
/**
 * 创建 text-emphasis 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextEmphasisKeywords()
 */
export const TextEmphasisKeywords = class TextEmphasisKeywords {
  constructor() {
    Object.assign(this, textEmphasisKeywords);
  }
} as new () => TextEmphasisKeywords;

/**
 * text-emphasis 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextEmphasisCssRuntime extends CssProperty {
  /**
   * 创建 text-emphasis 属性作者；普通使用通过 s.textEmphasis 取得共享实例。
   * @example
   * class CustomTextEmphasisCss extends TextEmphasisCss {}
   */
  constructor() {
    super('text-emphasis');
    initializeKeywordDeclarations(this, 'text-emphasis', textEmphasisKeywords);
  }
  /**
   * 原样生成 text-emphasis 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-emphasis:value;，undefined 返回空字符串。
   * @example
   * s.textEmphasis.raw('inherit') // text-emphasis:inherit;
   */
  raw(value: Property.TextEmphasis | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 用现代空格分隔语法生成 RGB 颜色声明。
   *
   * 字符串原样输出；库不截断通道或校验 CSS。
   * @param red 红通道，数值通常为 0–255，或带百分比/变量的 CSS 字符串。
   * @param green 绿通道，数值通常为 0–255，或 CSS 字符串。
   * @param blue 蓝通道，数值通常为 0–255，或 CSS 字符串。
   * @param alpha 可选透明度，数值通常为 0–1，或百分比/变量字符串；0 不会被省略。
   * @returns 当前属性的完整声明，不是可嵌套的颜色值。
   * @example
   * s.textEmphasis.rgb(255, 0, 0, 0.5)
   */
  rgb(
    red: number | CssString,
    green: number | CssString,
    blue: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(`rgb(${red} ${green} ${blue}${alpha === undefined ? '' : ` / ${alpha}`})`);
  }
  /**
   * 生成 HSL 颜色声明，数值饱和度和明度自动添加百分号。
   * @param hue 色相；无单位数值按度解释，也可传带角度单位的字符串。
   * @param saturation 饱和度，数值 100 表示 100%；字符串保留原单位。
   * @param lightness 明度，数值 50 表示 50%；字符串保留原单位。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；数值不做截断。
   * @example
   * s.textEmphasis.hsl(210, 50, 40, 0.8)
   */
  hsl(
    hue: number | CssString,
    saturation: number | CssString,
    lightness: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(
      `hsl(${hue} ${typeof saturation === 'number' ? saturation + '%' : saturation} ${typeof lightness === 'number' ? lightness + '%' : lightness}${alpha === undefined ? '' : ` / ${alpha}`})`,
    );
  }
  /**
   * 生成 OKLCH 颜色声明，通道按原生 CSS 语法输出。
   * @param lightness 感知明度，数值通常为 0–1；也可传百分比字符串。
   * @param chroma 色度，0 表示无彩色；可呈现范围随明度、色相和设备变化。
   * @param hue 色相，数值按度解释，也可传角度或变量字符串。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；不自动添加百分号或裁切色域。
   * @example
   * s.textEmphasis.oklch(0.7, 0.15, 250)
   */
  oklch(
    lightness: number | CssString,
    chroma: number | CssString,
    hue: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(
      `oklch(${lightness} ${chroma} ${hue}${alpha === undefined ? '' : ` / ${alpha}`})`,
    );
  }
  /**
   * 生成 OKLab 颜色声明，通道按原生 CSS 语法输出。
   * @param lightness 感知明度，数值通常为 0–1；也可传百分比字符串。
   * @param a 绿到红的色轴，负值偏绿、正值偏红。
   * @param b 蓝到黄的色轴，负值偏蓝、正值偏黄。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；不截断通道数值。
   * @example
   * s.textEmphasis.oklab(0.7, 0.1, -0.1)
   */
  oklab(
    lightness: number | CssString,
    a: number | CssString,
    b: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(`oklab(${lightness} ${a} ${b}${alpha === undefined ? '' : ` / ${alpha}`})`);
  }
}
/**
 * text-emphasis 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextEmphasisCss = TextEmphasisCssRuntime & KeywordDeclarations<TextEmphasisKeywords>;
/**
 * 同时设置文字着重号的样式和颜色。（text-emphasis）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis
 */
export const TextEmphasisCss = TextEmphasisCssRuntime as new () => TextEmphasisCss;

/**
 * text-emphasis-color 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextEmphasisColorKeywords = KeywordValuesOf<
  typeof colorKeywords,
  Property.TextEmphasisColor | CssString
>;
/**
 * 创建 text-emphasis-color 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextEmphasisColorKeywords()
 */
export const TextEmphasisColorKeywords = class TextEmphasisColorKeywords {
  constructor() {
    Object.assign(this, colorKeywords);
  }
} as new () => TextEmphasisColorKeywords;

/**
 * text-emphasis-color 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextEmphasisColorCssRuntime extends CssProperty {
  /**
   * 创建 text-emphasis-color 属性作者；普通使用通过 s.textEmphasisColor 取得共享实例。
   * @example
   * class CustomTextEmphasisColorCss extends TextEmphasisColorCss {}
   */
  constructor() {
    super('text-emphasis-color');
    initializeKeywordDeclarations(this, 'text-emphasis-color', colorKeywords);
  }
  /**
   * 原样生成 text-emphasis-color 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-emphasis-color:value;，undefined 返回空字符串。
   * @example
   * s.textEmphasisColor.raw('inherit') // text-emphasis-color:inherit;
   */
  raw(value: Property.TextEmphasisColor | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 用现代空格分隔语法生成 RGB 颜色声明。
   *
   * 字符串原样输出；库不截断通道或校验 CSS。
   * @param red 红通道，数值通常为 0–255，或带百分比/变量的 CSS 字符串。
   * @param green 绿通道，数值通常为 0–255，或 CSS 字符串。
   * @param blue 蓝通道，数值通常为 0–255，或 CSS 字符串。
   * @param alpha 可选透明度，数值通常为 0–1，或百分比/变量字符串；0 不会被省略。
   * @returns 当前属性的完整声明，不是可嵌套的颜色值。
   * @example
   * s.textEmphasisColor.rgb(255, 0, 0, 0.5)
   */
  rgb(
    red: number | CssString,
    green: number | CssString,
    blue: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(`rgb(${red} ${green} ${blue}${alpha === undefined ? '' : ` / ${alpha}`})`);
  }
  /**
   * 生成 HSL 颜色声明，数值饱和度和明度自动添加百分号。
   * @param hue 色相；无单位数值按度解释，也可传带角度单位的字符串。
   * @param saturation 饱和度，数值 100 表示 100%；字符串保留原单位。
   * @param lightness 明度，数值 50 表示 50%；字符串保留原单位。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；数值不做截断。
   * @example
   * s.textEmphasisColor.hsl(210, 50, 40, 0.8)
   */
  hsl(
    hue: number | CssString,
    saturation: number | CssString,
    lightness: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(
      `hsl(${hue} ${typeof saturation === 'number' ? saturation + '%' : saturation} ${typeof lightness === 'number' ? lightness + '%' : lightness}${alpha === undefined ? '' : ` / ${alpha}`})`,
    );
  }
  /**
   * 生成 OKLCH 颜色声明，通道按原生 CSS 语法输出。
   * @param lightness 感知明度，数值通常为 0–1；也可传百分比字符串。
   * @param chroma 色度，0 表示无彩色；可呈现范围随明度、色相和设备变化。
   * @param hue 色相，数值按度解释，也可传角度或变量字符串。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；不自动添加百分号或裁切色域。
   * @example
   * s.textEmphasisColor.oklch(0.7, 0.15, 250)
   */
  oklch(
    lightness: number | CssString,
    chroma: number | CssString,
    hue: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(
      `oklch(${lightness} ${chroma} ${hue}${alpha === undefined ? '' : ` / ${alpha}`})`,
    );
  }
  /**
   * 生成 OKLab 颜色声明，通道按原生 CSS 语法输出。
   * @param lightness 感知明度，数值通常为 0–1；也可传百分比字符串。
   * @param a 绿到红的色轴，负值偏绿、正值偏红。
   * @param b 蓝到黄的色轴，负值偏蓝、正值偏黄。
   * @param alpha 可选透明度，通常为 0–1 或 CSS 百分比/变量字符串。
   * @returns 当前属性的完整声明；不截断通道数值。
   * @example
   * s.textEmphasisColor.oklab(0.7, 0.1, -0.1)
   */
  oklab(
    lightness: number | CssString,
    a: number | CssString,
    b: number | CssString,
    alpha?: number | CssString,
  ): string {
    return this.raw(`oklab(${lightness} ${a} ${b}${alpha === undefined ? '' : ` / ${alpha}`})`);
  }
}
/**
 * text-emphasis-color 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextEmphasisColorCss = TextEmphasisColorCssRuntime &
  KeywordDeclarations<TextEmphasisColorKeywords>;
/**
 * 设置文字着重号颜色。（text-emphasis-color）
 *
 * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-color
 */
export const TextEmphasisColorCss = TextEmphasisColorCssRuntime as new () => TextEmphasisColorCss;
import { textEmphasisPositionKeywords } from './keyword-sets.js';

/**
 * text-emphasis-position 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextEmphasisPositionKeywords = KeywordValuesOf<
  typeof textEmphasisPositionKeywords,
  Property.TextEmphasisPosition | CssString
>;
/**
 * 创建 text-emphasis-position 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextEmphasisPositionKeywords()
 */
export const TextEmphasisPositionKeywords = class TextEmphasisPositionKeywords {
  constructor() {
    Object.assign(this, textEmphasisPositionKeywords);
  }
} as new () => TextEmphasisPositionKeywords;

/**
 * text-emphasis-position 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextEmphasisPositionCssRuntime extends CssProperty {
  /**
   * 创建 text-emphasis-position 属性作者；普通使用通过 s.textEmphasisPosition 取得共享实例。
   * @example
   * class CustomTextEmphasisPositionCss extends TextEmphasisPositionCss {}
   */
  constructor() {
    super('text-emphasis-position');
    initializeKeywordDeclarations(this, 'text-emphasis-position', textEmphasisPositionKeywords);
  }
  /**
   * 原样生成 text-emphasis-position 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-emphasis-position:value;，undefined 返回空字符串。
   * @example
   * s.textEmphasisPosition.raw('inherit') // text-emphasis-position:inherit;
   */
  raw(value: Property.TextEmphasisPosition | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-emphasis-position 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextEmphasisPositionCss = TextEmphasisPositionCssRuntime &
  KeywordDeclarations<TextEmphasisPositionKeywords>;
/**
 * 设置文字着重号位于文字的哪一侧。（text-emphasis-position）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-position
 */
export const TextEmphasisPositionCss =
  TextEmphasisPositionCssRuntime as new () => TextEmphasisPositionCss;
import { textEmphasisStyleKeywords } from './keyword-sets.js';

/**
 * text-emphasis-style 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextEmphasisStyleKeywords = KeywordValuesOf<
  typeof textEmphasisStyleKeywords,
  Property.TextEmphasisStyle | CssString
>;
/**
 * 创建 text-emphasis-style 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextEmphasisStyleKeywords()
 */
export const TextEmphasisStyleKeywords = class TextEmphasisStyleKeywords {
  constructor() {
    Object.assign(this, textEmphasisStyleKeywords);
  }
} as new () => TextEmphasisStyleKeywords;

/**
 * text-emphasis-style 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextEmphasisStyleCssRuntime extends CssProperty {
  /**
   * 创建 text-emphasis-style 属性作者；普通使用通过 s.textEmphasisStyle 取得共享实例。
   * @example
   * class CustomTextEmphasisStyleCss extends TextEmphasisStyleCss {}
   */
  constructor() {
    super('text-emphasis-style');
    initializeKeywordDeclarations(this, 'text-emphasis-style', textEmphasisStyleKeywords);
  }
  /**
   * 原样生成 text-emphasis-style 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-emphasis-style:value;，undefined 返回空字符串。
   * @example
   * s.textEmphasisStyle.raw('inherit') // text-emphasis-style:inherit;
   */
  raw(value: Property.TextEmphasisStyle | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-emphasis-style 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextEmphasisStyleCss = TextEmphasisStyleCssRuntime &
  KeywordDeclarations<TextEmphasisStyleKeywords>;
/**
 * 设置文字着重号的形状和填充方式。（text-emphasis-style）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-emphasis-style
 */
export const TextEmphasisStyleCss = TextEmphasisStyleCssRuntime as new () => TextEmphasisStyleCss;

/**
 * text-indent 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextIndentKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.TextIndent | CssString
>;
/**
 * 创建 text-indent 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextIndentKeywords()
 */
export const TextIndentKeywords = class TextIndentKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => TextIndentKeywords;

/**
 * text-indent 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextIndentCssRuntime extends LengthCssProperty {
  /**
   * 创建 text-indent 属性作者；普通使用通过 s.textIndent 取得共享实例。
   * @example
   * class CustomTextIndentCss extends TextIndentCss {}
   */
  constructor() {
    super('text-indent');
    initializeKeywordDeclarations(this, 'text-indent', globalKeywords);
  }
  /**
   * 原样生成 text-indent 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-indent:value;，undefined 返回空字符串。
   * @example
   * s.textIndent.raw('inherit') // text-indent:inherit;
   */
  raw(value: Property.TextIndent | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.textIndent.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.textIndent.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.textIndent.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.TextIndent | CssString,
    ...others: (Property.TextIndent | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.textIndent.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.TextIndent | CssString,
    ...others: (Property.TextIndent | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.textIndent.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.TextIndent | CssString,
    preferred: Property.TextIndent | CssString,
    maximum: Property.TextIndent | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * text-indent 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextIndentCss = TextIndentCssRuntime & KeywordDeclarations<TextIndentKeywords>;
/**
 * 设置文本行的缩进距离。（text-indent）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-indent
 */
export const TextIndentCss = TextIndentCssRuntime as new () => TextIndentCss;
import { textJustifyKeywords } from './keyword-sets.js';

/**
 * text-justify 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextJustifyKeywords = KeywordValuesOf<
  typeof textJustifyKeywords,
  Property.TextJustify | CssString
>;
/**
 * 创建 text-justify 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextJustifyKeywords()
 */
export const TextJustifyKeywords = class TextJustifyKeywords {
  constructor() {
    Object.assign(this, textJustifyKeywords);
  }
} as new () => TextJustifyKeywords;

/**
 * text-justify 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextJustifyCssRuntime extends CssProperty {
  /**
   * 创建 text-justify 属性作者；普通使用通过 s.textJustify 取得共享实例。
   * @example
   * class CustomTextJustifyCss extends TextJustifyCss {}
   */
  constructor() {
    super('text-justify');
    initializeKeywordDeclarations(this, 'text-justify', textJustifyKeywords);
  }
  /**
   * 原样生成 text-justify 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-justify:value;，undefined 返回空字符串。
   * @example
   * s.textJustify.raw('inherit') // text-justify:inherit;
   */
  raw(value: Property.TextJustify | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-justify 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextJustifyCss = TextJustifyCssRuntime & KeywordDeclarations<TextJustifyKeywords>;
/**
 * 设置两端对齐时增加间距的算法。（text-justify）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-justify
 */
export const TextJustifyCss = TextJustifyCssRuntime as new () => TextJustifyCss;
import { textOrientationKeywords } from './keyword-sets.js';

/**
 * text-orientation 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextOrientationKeywords = KeywordValuesOf<
  typeof textOrientationKeywords,
  Property.TextOrientation | CssString
>;
/**
 * 创建 text-orientation 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextOrientationKeywords()
 */
export const TextOrientationKeywords = class TextOrientationKeywords {
  constructor() {
    Object.assign(this, textOrientationKeywords);
  }
} as new () => TextOrientationKeywords;

/**
 * text-orientation 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextOrientationCssRuntime extends CssProperty {
  /**
   * 创建 text-orientation 属性作者；普通使用通过 s.textOrientation 取得共享实例。
   * @example
   * class CustomTextOrientationCss extends TextOrientationCss {}
   */
  constructor() {
    super('text-orientation');
    initializeKeywordDeclarations(this, 'text-orientation', textOrientationKeywords);
  }
  /**
   * 原样生成 text-orientation 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-orientation:value;，undefined 返回空字符串。
   * @example
   * s.textOrientation.raw('inherit') // text-orientation:inherit;
   */
  raw(value: Property.TextOrientation | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-orientation 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextOrientationCss = TextOrientationCssRuntime &
  KeywordDeclarations<TextOrientationKeywords>;
/**
 * 设置竖排模式下字符的方向。（text-orientation）
 *
 * CSS 初始值：`mixed`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-orientation
 */
export const TextOrientationCss = TextOrientationCssRuntime as new () => TextOrientationCss;
import { textOverflowKeywords } from './keyword-sets.js';

/**
 * text-overflow 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextOverflowKeywords = KeywordValuesOf<
  typeof textOverflowKeywords,
  Property.TextOverflow | CssString
>;
/**
 * 创建 text-overflow 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextOverflowKeywords()
 */
export const TextOverflowKeywords = class TextOverflowKeywords {
  constructor() {
    Object.assign(this, textOverflowKeywords);
  }
} as new () => TextOverflowKeywords;

/**
 * text-overflow 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextOverflowCssRuntime extends CssProperty {
  /**
   * 创建 text-overflow 属性作者；普通使用通过 s.textOverflow 取得共享实例。
   * @example
   * class CustomTextOverflowCss extends TextOverflowCss {}
   */
  constructor() {
    super('text-overflow');
    initializeKeywordDeclarations(this, 'text-overflow', textOverflowKeywords);
  }
  /**
   * 原样生成 text-overflow 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-overflow:value;，undefined 返回空字符串。
   * @example
   * s.textOverflow.raw('inherit') // text-overflow:inherit;
   */
  raw(value: Property.TextOverflow | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-overflow 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextOverflowCss = TextOverflowCssRuntime & KeywordDeclarations<TextOverflowKeywords>;
/**
 * 设置被裁剪的行内溢出文本如何提示，例如显示省略号。（text-overflow）
 *
 * 本属性不自行制造溢出。单行省略通常还需要受限宽度、overflow:hidden 和 white-space:nowrap。
 *
 * 常用值：
 * - `ellipsis`：用省略号提示被裁剪的行内溢出；还需要限制尺寸并配置溢出规则。
 * - `clip`：直接裁剪溢出文本，不添加省略标记。
 *
 * 适用场景：受限宽度中的单行标题或标签。多行截断需要单独的布局和截行方案。
 *
 * CSS 初始值：`clip`（不同于浏览器默认样式表）。
 * @example
 * css(s.maxWidth.rem(12), s.whiteSpace.nowrap, s.overflow.hidden, s.textOverflow.ellipsis)
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-overflow
 */
export const TextOverflowCss = TextOverflowCssRuntime as new () => TextOverflowCss;
import { textRenderingKeywords } from './keyword-sets.js';

/**
 * text-rendering 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextRenderingKeywords = KeywordValuesOf<
  typeof textRenderingKeywords,
  Property.TextRendering | CssString
>;
/**
 * 创建 text-rendering 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextRenderingKeywords()
 */
export const TextRenderingKeywords = class TextRenderingKeywords {
  constructor() {
    Object.assign(this, textRenderingKeywords);
  }
} as new () => TextRenderingKeywords;

/**
 * text-rendering 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextRenderingCssRuntime extends CssProperty {
  /**
   * 创建 text-rendering 属性作者；普通使用通过 s.textRendering 取得共享实例。
   * @example
   * class CustomTextRenderingCss extends TextRenderingCss {}
   */
  constructor() {
    super('text-rendering');
    initializeKeywordDeclarations(this, 'text-rendering', textRenderingKeywords);
  }
  /**
   * 原样生成 text-rendering 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-rendering:value;，undefined 返回空字符串。
   * @example
   * s.textRendering.raw('inherit') // text-rendering:inherit;
   */
  raw(value: Property.TextRendering | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-rendering 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextRenderingCss = TextRenderingCssRuntime & KeywordDeclarations<TextRenderingKeywords>;
/**
 * 向渲染器提供文本速度、可读性或几何精度的偏好。（text-rendering）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-rendering
 */
export const TextRenderingCss = TextRenderingCssRuntime as new () => TextRenderingCss;

/**
 * text-shadow 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextShadowKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.TextShadow | CssString
>;
/**
 * 创建 text-shadow 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextShadowKeywords()
 */
export const TextShadowKeywords = class TextShadowKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => TextShadowKeywords;

/**
 * text-shadow 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextShadowCssRuntime extends CssProperty {
  /**
   * 创建 text-shadow 属性作者；普通使用通过 s.textShadow 取得共享实例。
   * @example
   * class CustomTextShadowCss extends TextShadowCss {}
   */
  constructor() {
    super('text-shadow');
    initializeKeywordDeclarations(this, 'text-shadow', noneKeywords);
  }
  /**
   * 原样生成 text-shadow 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-shadow:value;，undefined 返回空字符串。
   * @example
   * s.textShadow.raw('inherit') // text-shadow:inherit;
   */
  raw(value: Property.TextShadow | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-shadow 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextShadowCss = TextShadowCssRuntime & KeywordDeclarations<TextShadowKeywords>;
/**
 * 设置文字及其装饰的阴影，可叠加多层。（text-shadow）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-shadow
 */
export const TextShadowCss = TextShadowCssRuntime as new () => TextShadowCss;
import { autoNoneKeywords } from './keyword-sets.js';

/**
 * text-size-adjust 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextSizeAdjustKeywords = KeywordValuesOf<
  typeof autoNoneKeywords,
  Property.TextSizeAdjust | CssString
>;
/**
 * 创建 text-size-adjust 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextSizeAdjustKeywords()
 */
export const TextSizeAdjustKeywords = class TextSizeAdjustKeywords {
  constructor() {
    Object.assign(this, autoNoneKeywords);
  }
} as new () => TextSizeAdjustKeywords;

/**
 * text-size-adjust 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextSizeAdjustCssRuntime extends CssProperty {
  /**
   * 创建 text-size-adjust 属性作者；普通使用通过 s.textSizeAdjust 取得共享实例。
   * @example
   * class CustomTextSizeAdjustCss extends TextSizeAdjustCss {}
   */
  constructor() {
    super('text-size-adjust');
    initializeKeywordDeclarations(this, 'text-size-adjust', autoNoneKeywords);
  }
  /**
   * 原样生成 text-size-adjust 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-size-adjust:value;，undefined 返回空字符串。
   * @example
   * s.textSizeAdjust.raw('inherit') // text-size-adjust:inherit;
   */
  raw(value: Property.TextSizeAdjust | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.textSizeAdjust.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.textSizeAdjust.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.textSizeAdjust.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.TextSizeAdjust | CssString,
    ...others: (Property.TextSizeAdjust | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.textSizeAdjust.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.TextSizeAdjust | CssString,
    ...others: (Property.TextSizeAdjust | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.textSizeAdjust.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.TextSizeAdjust | CssString,
    preferred: Property.TextSizeAdjust | CssString,
    maximum: Property.TextSizeAdjust | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * text-size-adjust 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextSizeAdjustCss = TextSizeAdjustCssRuntime &
  KeywordDeclarations<TextSizeAdjustKeywords>;
/**
 * 控制移动浏览器为提升可读性而进行的文字自动放大。（text-size-adjust）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-size-adjust
 */
export const TextSizeAdjustCss = TextSizeAdjustCssRuntime as new () => TextSizeAdjustCss;
import { textSpacingTrimKeywords } from './keyword-sets.js';

/**
 * text-spacing-trim 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextSpacingTrimKeywords = KeywordValuesOf<
  typeof textSpacingTrimKeywords,
  Property.TextSpacingTrim | CssString
>;
/**
 * 创建 text-spacing-trim 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextSpacingTrimKeywords()
 */
export const TextSpacingTrimKeywords = class TextSpacingTrimKeywords {
  constructor() {
    Object.assign(this, textSpacingTrimKeywords);
  }
} as new () => TextSpacingTrimKeywords;

/**
 * text-spacing-trim 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextSpacingTrimCssRuntime extends CssProperty {
  /**
   * 创建 text-spacing-trim 属性作者；普通使用通过 s.textSpacingTrim 取得共享实例。
   * @example
   * class CustomTextSpacingTrimCss extends TextSpacingTrimCss {}
   */
  constructor() {
    super('text-spacing-trim');
    initializeKeywordDeclarations(this, 'text-spacing-trim', textSpacingTrimKeywords);
  }
  /**
   * 原样生成 text-spacing-trim 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-spacing-trim:value;，undefined 返回空字符串。
   * @example
   * s.textSpacingTrim.raw('inherit') // text-spacing-trim:inherit;
   */
  raw(value: Property.TextSpacingTrim | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-spacing-trim 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextSpacingTrimCss = TextSpacingTrimCssRuntime &
  KeywordDeclarations<TextSpacingTrimKeywords>;
/**
 * 设置东亚文字标点等字符周围空白的裁减。（text-spacing-trim）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-spacing-trim
 */
export const TextSpacingTrimCss = TextSpacingTrimCssRuntime as new () => TextSpacingTrimCss;
import { textTransformKeywords } from './keyword-sets.js';

/**
 * text-transform 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextTransformKeywords = KeywordValuesOf<
  typeof textTransformKeywords,
  Property.TextTransform | CssString
>;
/**
 * 创建 text-transform 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextTransformKeywords()
 */
export const TextTransformKeywords = class TextTransformKeywords {
  constructor() {
    Object.assign(this, textTransformKeywords);
  }
} as new () => TextTransformKeywords;

/**
 * text-transform 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextTransformCssRuntime extends CssProperty {
  /**
   * 创建 text-transform 属性作者；普通使用通过 s.textTransform 取得共享实例。
   * @example
   * class CustomTextTransformCss extends TextTransformCss {}
   */
  constructor() {
    super('text-transform');
    initializeKeywordDeclarations(this, 'text-transform', textTransformKeywords);
  }
  /**
   * 原样生成 text-transform 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-transform:value;，undefined 返回空字符串。
   * @example
   * s.textTransform.raw('inherit') // text-transform:inherit;
   */
  raw(value: Property.TextTransform | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-transform 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextTransformCss = TextTransformCssRuntime & KeywordDeclarations<TextTransformKeywords>;
/**
 * 设置文字显示时的大小写、全角或其他字形转换。（text-transform）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-transform
 */
export const TextTransformCss = TextTransformCssRuntime as new () => TextTransformCss;

/**
 * text-underline-offset 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextUnderlineOffsetKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.TextUnderlineOffset | CssString
>;
/**
 * 创建 text-underline-offset 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextUnderlineOffsetKeywords()
 */
export const TextUnderlineOffsetKeywords = class TextUnderlineOffsetKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => TextUnderlineOffsetKeywords;

/**
 * text-underline-offset 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextUnderlineOffsetCssRuntime extends LengthCssProperty {
  /**
   * 创建 text-underline-offset 属性作者；普通使用通过 s.textUnderlineOffset 取得共享实例。
   * @example
   * class CustomTextUnderlineOffsetCss extends TextUnderlineOffsetCss {}
   */
  constructor() {
    super('text-underline-offset');
    initializeKeywordDeclarations(this, 'text-underline-offset', autoKeywords);
  }
  /**
   * 原样生成 text-underline-offset 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-underline-offset:value;，undefined 返回空字符串。
   * @example
   * s.textUnderlineOffset.raw('inherit') // text-underline-offset:inherit;
   */
  raw(value: Property.TextUnderlineOffset | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.textUnderlineOffset.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.textUnderlineOffset.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.textUnderlineOffset.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.TextUnderlineOffset | CssString,
    ...others: (Property.TextUnderlineOffset | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.textUnderlineOffset.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.TextUnderlineOffset | CssString,
    ...others: (Property.TextUnderlineOffset | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.textUnderlineOffset.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.TextUnderlineOffset | CssString,
    preferred: Property.TextUnderlineOffset | CssString,
    maximum: Property.TextUnderlineOffset | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * text-underline-offset 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextUnderlineOffsetCss = TextUnderlineOffsetCssRuntime &
  KeywordDeclarations<TextUnderlineOffsetKeywords>;
/**
 * 设置下划线相对于默认位置的偏移。（text-underline-offset）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-offset
 */
export const TextUnderlineOffsetCss =
  TextUnderlineOffsetCssRuntime as new () => TextUnderlineOffsetCss;
import { textUnderlinePositionKeywords } from './keyword-sets.js';

/**
 * text-underline-position 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextUnderlinePositionKeywords = KeywordValuesOf<
  typeof textUnderlinePositionKeywords,
  Property.TextUnderlinePosition | CssString
>;
/**
 * 创建 text-underline-position 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextUnderlinePositionKeywords()
 */
export const TextUnderlinePositionKeywords = class TextUnderlinePositionKeywords {
  constructor() {
    Object.assign(this, textUnderlinePositionKeywords);
  }
} as new () => TextUnderlinePositionKeywords;

/**
 * text-underline-position 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextUnderlinePositionCssRuntime extends CssProperty {
  /**
   * 创建 text-underline-position 属性作者；普通使用通过 s.textUnderlinePosition 取得共享实例。
   * @example
   * class CustomTextUnderlinePositionCss extends TextUnderlinePositionCss {}
   */
  constructor() {
    super('text-underline-position');
    initializeKeywordDeclarations(this, 'text-underline-position', textUnderlinePositionKeywords);
  }
  /**
   * 原样生成 text-underline-position 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-underline-position:value;，undefined 返回空字符串。
   * @example
   * s.textUnderlinePosition.raw('inherit') // text-underline-position:inherit;
   */
  raw(value: Property.TextUnderlinePosition | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-underline-position 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextUnderlinePositionCss = TextUnderlinePositionCssRuntime &
  KeywordDeclarations<TextUnderlinePositionKeywords>;
/**
 * 设置下划线相对于文字基线或竖排文字的放置方式。（text-underline-position）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-underline-position
 */
export const TextUnderlinePositionCss =
  TextUnderlinePositionCssRuntime as new () => TextUnderlinePositionCss;
import { textWrapKeywords } from './keyword-sets.js';

/**
 * text-wrap 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextWrapKeywords = KeywordValuesOf<
  typeof textWrapKeywords,
  Property.TextWrap | CssString
>;
/**
 * 创建 text-wrap 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextWrapKeywords()
 */
export const TextWrapKeywords = class TextWrapKeywords {
  constructor() {
    Object.assign(this, textWrapKeywords);
  }
} as new () => TextWrapKeywords;

/**
 * text-wrap 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextWrapCssRuntime extends CssProperty {
  /**
   * 创建 text-wrap 属性作者；普通使用通过 s.textWrap 取得共享实例。
   * @example
   * class CustomTextWrapCss extends TextWrapCss {}
   */
  constructor() {
    super('text-wrap');
    initializeKeywordDeclarations(this, 'text-wrap', textWrapKeywords);
  }
  /**
   * 原样生成 text-wrap 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-wrap:value;，undefined 返回空字符串。
   * @example
   * s.textWrap.raw('inherit') // text-wrap:inherit;
   */
  raw(value: Property.TextWrap | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-wrap 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextWrapCss = TextWrapCssRuntime & KeywordDeclarations<TextWrapKeywords>;
/**
 * 同时设置文本是否换行及换行策略。（text-wrap）
 *
 * CSS 初始值：`wrap`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap
 */
export const TextWrapCss = TextWrapCssRuntime as new () => TextWrapCss;
import { textWrapModeKeywords } from './keyword-sets.js';

/**
 * text-wrap-mode 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextWrapModeKeywords = KeywordValuesOf<
  typeof textWrapModeKeywords,
  Property.TextWrapMode | CssString
>;
/**
 * 创建 text-wrap-mode 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextWrapModeKeywords()
 */
export const TextWrapModeKeywords = class TextWrapModeKeywords {
  constructor() {
    Object.assign(this, textWrapModeKeywords);
  }
} as new () => TextWrapModeKeywords;

/**
 * text-wrap-mode 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextWrapModeCssRuntime extends CssProperty {
  /**
   * 创建 text-wrap-mode 属性作者；普通使用通过 s.textWrapMode 取得共享实例。
   * @example
   * class CustomTextWrapModeCss extends TextWrapModeCss {}
   */
  constructor() {
    super('text-wrap-mode');
    initializeKeywordDeclarations(this, 'text-wrap-mode', textWrapModeKeywords);
  }
  /**
   * 原样生成 text-wrap-mode 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-wrap-mode:value;，undefined 返回空字符串。
   * @example
   * s.textWrapMode.raw('inherit') // text-wrap-mode:inherit;
   */
  raw(value: Property.TextWrapMode | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-wrap-mode 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextWrapModeCss = TextWrapModeCssRuntime & KeywordDeclarations<TextWrapModeKeywords>;
/**
 * 设置文本是否允许软换行。（text-wrap-mode）
 *
 * CSS 初始值：`wrap`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-mode
 */
export const TextWrapModeCss = TextWrapModeCssRuntime as new () => TextWrapModeCss;
import { textWrapStyleKeywords } from './keyword-sets.js';

/**
 * text-wrap-style 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TextWrapStyleKeywords = KeywordValuesOf<
  typeof textWrapStyleKeywords,
  Property.TextWrapStyle | CssString
>;
/**
 * 创建 text-wrap-style 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TextWrapStyleKeywords()
 */
export const TextWrapStyleKeywords = class TextWrapStyleKeywords {
  constructor() {
    Object.assign(this, textWrapStyleKeywords);
  }
} as new () => TextWrapStyleKeywords;

/**
 * text-wrap-style 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TextWrapStyleCssRuntime extends CssProperty {
  /**
   * 创建 text-wrap-style 属性作者；普通使用通过 s.textWrapStyle 取得共享实例。
   * @example
   * class CustomTextWrapStyleCss extends TextWrapStyleCss {}
   */
  constructor() {
    super('text-wrap-style');
    initializeKeywordDeclarations(this, 'text-wrap-style', textWrapStyleKeywords);
  }
  /**
   * 原样生成 text-wrap-style 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 text-wrap-style:value;，undefined 返回空字符串。
   * @example
   * s.textWrapStyle.raw('inherit') // text-wrap-style:inherit;
   */
  raw(value: Property.TextWrapStyle | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * text-wrap-style 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TextWrapStyleCss = TextWrapStyleCssRuntime & KeywordDeclarations<TextWrapStyleKeywords>;
/**
 * 设置文本换行的排版策略，例如平衡各行长度。（text-wrap-style）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/text-wrap-style
 */
export const TextWrapStyleCss = TextWrapStyleCssRuntime as new () => TextWrapStyleCss;

/**
 * timeline-scope 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TimelineScopeKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.TimelineScope | CssString
>;
/**
 * 创建 timeline-scope 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TimelineScopeKeywords()
 */
export const TimelineScopeKeywords = class TimelineScopeKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => TimelineScopeKeywords;

/**
 * timeline-scope 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TimelineScopeCssRuntime extends CssProperty {
  /**
   * 创建 timeline-scope 属性作者；普通使用通过 s.timelineScope 取得共享实例。
   * @example
   * class CustomTimelineScopeCss extends TimelineScopeCss {}
   */
  constructor() {
    super('timeline-scope');
    initializeKeywordDeclarations(this, 'timeline-scope', noneKeywords);
  }
  /**
   * 原样生成 timeline-scope 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 timeline-scope:value;，undefined 返回空字符串。
   * @example
   * s.timelineScope.raw('inherit') // timeline-scope:inherit;
   */
  raw(value: Property.TimelineScope | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * timeline-scope 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TimelineScopeCss = TimelineScopeCssRuntime & KeywordDeclarations<TimelineScopeKeywords>;
/**
 * 扩大命名动画时间线的可引用作用域。（timeline-scope）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/timeline-scope
 */
export const TimelineScopeCss = TimelineScopeCssRuntime as new () => TimelineScopeCss;

/**
 * top 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TopKeywords = KeywordValuesOf<typeof autoKeywords, Property.Top | CssString>;
/**
 * 创建 top 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TopKeywords()
 */
export const TopKeywords = class TopKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => TopKeywords;

/**
 * top 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TopCssRuntime extends LengthCssProperty {
  /**
   * 创建 top 属性作者；普通使用通过 s.top 取得共享实例。
   * @example
   * class CustomTopCss extends TopCss {}
   */
  constructor() {
    super('top');
    initializeKeywordDeclarations(this, 'top', autoKeywords);
  }
  /**
   * 原样生成 top 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 top:value;，undefined 返回空字符串。
   * @example
   * s.top.raw('inherit') // top:inherit;
   */
  raw(value: Property.Top | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.top.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.top.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.top.min('var(--first)', 'var(--second)')
   */
  min(value: Property.Top | CssString, ...others: (Property.Top | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.top.max('var(--first)', 'var(--second)')
   */
  max(value: Property.Top | CssString, ...others: (Property.Top | CssString)[]): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.top.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Top | CssString,
    preferred: Property.Top | CssString,
    maximum: Property.Top | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * top 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TopCss = TopCssRuntime & KeywordDeclarations<TopKeywords>;
/**
 * 设置定位元素相对于其定位参照的上侧偏移。（top）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/top
 */
export const TopCss = TopCssRuntime as new () => TopCss;
import { touchActionKeywords } from './keyword-sets.js';

/**
 * touch-action 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TouchActionKeywords = KeywordValuesOf<
  typeof touchActionKeywords,
  Property.TouchAction | CssString
>;
/**
 * 创建 touch-action 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TouchActionKeywords()
 */
export const TouchActionKeywords = class TouchActionKeywords {
  constructor() {
    Object.assign(this, touchActionKeywords);
  }
} as new () => TouchActionKeywords;

/**
 * touch-action 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TouchActionCssRuntime extends CssProperty {
  /**
   * 创建 touch-action 属性作者；普通使用通过 s.touchAction 取得共享实例。
   * @example
   * class CustomTouchActionCss extends TouchActionCss {}
   */
  constructor() {
    super('touch-action');
    initializeKeywordDeclarations(this, 'touch-action', touchActionKeywords);
  }
  /**
   * 原样生成 touch-action 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 touch-action:value;，undefined 返回空字符串。
   * @example
   * s.touchAction.raw('inherit') // touch-action:inherit;
   */
  raw(value: Property.TouchAction | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * touch-action 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TouchActionCss = TouchActionCssRuntime & KeywordDeclarations<TouchActionKeywords>;
/**
 * 声明浏览器可以处理的触摸平移与缩放手势。（touch-action）
 *
 * 描述浏览器可接管的触摸手势，手势开始后再修改通常不会改变当前手势的处理。
 *
 * 常用值：
 * - `manipulation`：允许平移和连续缩放，通常禁用双击缩放等额外手势。
 * - `pan-x`：允许浏览器处理水平单指平移。
 * - `pan-y`：允许浏览器处理垂直单指平移。
 * - `none`：禁用浏览器在该区域处理的平移和缩放手势，可能影响用户缩放可访问性。
 *
 * 适用场景：拖拽控件与页面滚动之间分配触摸方向；保留用户所需的缩放能力。
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @example
 * s.touchAction.panY
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/touch-action
 */
export const TouchActionCss = TouchActionCssRuntime as new () => TouchActionCss;

/**
 * transform 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TransformKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.Transform | CssString
>;
/**
 * 创建 transform 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TransformKeywords()
 */
export const TransformKeywords = class TransformKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => TransformKeywords;

/**
 * transform 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TransformCssRuntime extends CssProperty {
  /**
   * 创建 transform 属性作者；普通使用通过 s.transform 取得共享实例。
   * @example
   * class CustomTransformCss extends TransformCss {}
   */
  constructor() {
    super('transform');
    initializeKeywordDeclarations(this, 'transform', noneKeywords);
  }
  /**
   * 原样生成 transform 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 transform:value;，undefined 返回空字符串。
   * @example
   * s.transform.raw('inherit') // transform:inherit;
   */
  raw(value: Property.Transform | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * transform 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TransformCss = TransformCssRuntime & KeywordDeclarations<TransformKeywords>;
/**
 * 按顺序组合平移、旋转、缩放等二维或三维变换。（transform）
 *
 * 多个变换的顺序会影响结果。变换通常不改变元素在普通文档流中预留的尺寸。
 *
 * 适用场景：平移、旋转和缩放的视觉效果；需要改变普通流占位时应调整布局属性。
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @example
 * s.transform.raw('translateX(8px) scale(1.05)')
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform
 */
export const TransformCss = TransformCssRuntime as new () => TransformCss;
import { transformBoxKeywords } from './keyword-sets.js';

/**
 * transform-box 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TransformBoxKeywords = KeywordValuesOf<
  typeof transformBoxKeywords,
  Property.TransformBox | CssString
>;
/**
 * 创建 transform-box 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TransformBoxKeywords()
 */
export const TransformBoxKeywords = class TransformBoxKeywords {
  constructor() {
    Object.assign(this, transformBoxKeywords);
  }
} as new () => TransformBoxKeywords;

/**
 * transform-box 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TransformBoxCssRuntime extends CssProperty {
  /**
   * 创建 transform-box 属性作者；普通使用通过 s.transformBox 取得共享实例。
   * @example
   * class CustomTransformBoxCss extends TransformBoxCss {}
   */
  constructor() {
    super('transform-box');
    initializeKeywordDeclarations(this, 'transform-box', transformBoxKeywords);
  }
  /**
   * 原样生成 transform-box 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 transform-box:value;，undefined 返回空字符串。
   * @example
   * s.transformBox.raw('inherit') // transform-box:inherit;
   */
  raw(value: Property.TransformBox | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * transform-box 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TransformBoxCss = TransformBoxCssRuntime & KeywordDeclarations<TransformBoxKeywords>;
/**
 * 设置变换及其原点所依据的参照盒。（transform-box）
 *
 * CSS 初始值：`view-box`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-box
 */
export const TransformBoxCss = TransformBoxCssRuntime as new () => TransformBoxCss;
import { backgroundPositionKeywords } from './keyword-sets.js';

/**
 * transform-origin 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TransformOriginKeywords = KeywordValuesOf<
  typeof backgroundPositionKeywords,
  Property.TransformOrigin | CssString
>;
/**
 * 创建 transform-origin 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TransformOriginKeywords()
 */
export const TransformOriginKeywords = class TransformOriginKeywords {
  constructor() {
    Object.assign(this, backgroundPositionKeywords);
  }
} as new () => TransformOriginKeywords;

/**
 * transform-origin 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TransformOriginCssRuntime extends LengthCssProperty {
  /**
   * 创建 transform-origin 属性作者；普通使用通过 s.transformOrigin 取得共享实例。
   * @example
   * class CustomTransformOriginCss extends TransformOriginCss {}
   */
  constructor() {
    super('transform-origin');
    initializeKeywordDeclarations(this, 'transform-origin', backgroundPositionKeywords);
  }
  /**
   * 原样生成 transform-origin 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 transform-origin:value;，undefined 返回空字符串。
   * @example
   * s.transformOrigin.raw('inherit') // transform-origin:inherit;
   */
  raw(value: Property.TransformOrigin | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.transformOrigin.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.transformOrigin.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.transformOrigin.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.TransformOrigin | CssString,
    ...others: (Property.TransformOrigin | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.transformOrigin.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.TransformOrigin | CssString,
    ...others: (Property.TransformOrigin | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.transformOrigin.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.TransformOrigin | CssString,
    preferred: Property.TransformOrigin | CssString,
    maximum: Property.TransformOrigin | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * transform-origin 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TransformOriginCss = TransformOriginCssRuntime &
  KeywordDeclarations<TransformOriginKeywords>;
/**
 * 设置元素变换的原点。（transform-origin）
 *
 * CSS 初始值：`50% 50% 0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-origin
 */
export const TransformOriginCss = TransformOriginCssRuntime as new () => TransformOriginCss;
import { transformStyleKeywords } from './keyword-sets.js';

/**
 * transform-style 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TransformStyleKeywords = KeywordValuesOf<
  typeof transformStyleKeywords,
  Property.TransformStyle | CssString
>;
/**
 * 创建 transform-style 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TransformStyleKeywords()
 */
export const TransformStyleKeywords = class TransformStyleKeywords {
  constructor() {
    Object.assign(this, transformStyleKeywords);
  }
} as new () => TransformStyleKeywords;

/**
 * transform-style 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TransformStyleCssRuntime extends CssProperty {
  /**
   * 创建 transform-style 属性作者；普通使用通过 s.transformStyle 取得共享实例。
   * @example
   * class CustomTransformStyleCss extends TransformStyleCss {}
   */
  constructor() {
    super('transform-style');
    initializeKeywordDeclarations(this, 'transform-style', transformStyleKeywords);
  }
  /**
   * 原样生成 transform-style 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 transform-style:value;，undefined 返回空字符串。
   * @example
   * s.transformStyle.raw('inherit') // transform-style:inherit;
   */
  raw(value: Property.TransformStyle | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * transform-style 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TransformStyleCss = TransformStyleCssRuntime &
  KeywordDeclarations<TransformStyleKeywords>;
/**
 * 控制子元素的三维位置保留在三维空间还是展平。（transform-style）
 *
 * CSS 初始值：`flat`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transform-style
 */
export const TransformStyleCss = TransformStyleCssRuntime as new () => TransformStyleCss;
import { transitionKeywords } from './keyword-sets.js';

/**
 * transition 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TransitionKeywords = KeywordValuesOf<
  typeof transitionKeywords,
  Property.Transition | CssString
>;
/**
 * 创建 transition 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TransitionKeywords()
 */
export const TransitionKeywords = class TransitionKeywords {
  constructor() {
    Object.assign(this, transitionKeywords);
  }
} as new () => TransitionKeywords;

/**
 * transition 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TransitionCssRuntime extends CssProperty {
  /**
   * 创建 transition 属性作者；普通使用通过 s.transition 取得共享实例。
   * @example
   * class CustomTransitionCss extends TransitionCss {}
   */
  constructor() {
    super('transition');
    initializeKeywordDeclarations(this, 'transition', transitionKeywords);
  }
  /**
   * 原样生成 transition 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 transition:value;，undefined 返回空字符串。
   * @example
   * s.transition.raw('inherit') // transition:inherit;
   */
  raw(value: Property.Transition | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 ms 单位生成完整属性声明。毫秒，1000ms 等于 1s。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 ms。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.transition.ms(1)
   */
  ms(value: number): string {
    return this.declaration(`${value}ms`);
  }
  /**
   * 使用 s 单位生成完整属性声明。秒，1s 等于 1000ms。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 s。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.transition.s(1)
   */
  s(value: number): string {
    return this.declaration(`${value}s`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.transition.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.transition.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.Transition | CssString,
    ...others: (Property.Transition | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.transition.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.Transition | CssString,
    ...others: (Property.Transition | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.transition.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Transition | CssString,
    preferred: Property.Transition | CssString,
    maximum: Property.Transition | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * transition 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TransitionCss = TransitionCssRuntime & KeywordDeclarations<TransitionKeywords>;
/**
 * 集中设置属性变化过渡的目标、时长、缓动、延迟和行为。（transition）
 *
 * 只对属性变化创建过渡；不会自动触发变化。建议明确列出目标属性，避免 all 意外过渡布局变化。
 *
 * 适用场景：悬停、选中和展开状态之间的平滑变化。
 * @example
 * s.transition.raw('opacity 160ms ease')
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition
 */
export const TransitionCss = TransitionCssRuntime as new () => TransitionCss;
import { transitionBehaviorKeywords } from './keyword-sets.js';

/**
 * transition-behavior 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TransitionBehaviorKeywords = KeywordValuesOf<
  typeof transitionBehaviorKeywords,
  Property.TransitionBehavior | CssString
>;
/**
 * 创建 transition-behavior 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TransitionBehaviorKeywords()
 */
export const TransitionBehaviorKeywords = class TransitionBehaviorKeywords {
  constructor() {
    Object.assign(this, transitionBehaviorKeywords);
  }
} as new () => TransitionBehaviorKeywords;

/**
 * transition-behavior 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TransitionBehaviorCssRuntime extends CssProperty {
  /**
   * 创建 transition-behavior 属性作者；普通使用通过 s.transitionBehavior 取得共享实例。
   * @example
   * class CustomTransitionBehaviorCss extends TransitionBehaviorCss {}
   */
  constructor() {
    super('transition-behavior');
    initializeKeywordDeclarations(this, 'transition-behavior', transitionBehaviorKeywords);
  }
  /**
   * 原样生成 transition-behavior 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 transition-behavior:value;，undefined 返回空字符串。
   * @example
   * s.transitionBehavior.raw('inherit') // transition-behavior:inherit;
   */
  raw(value: Property.TransitionBehavior | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * transition-behavior 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TransitionBehaviorCss = TransitionBehaviorCssRuntime &
  KeywordDeclarations<TransitionBehaviorKeywords>;
/**
 * 控制离散属性是否可以启动 CSS 过渡。（transition-behavior）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-behavior
 */
export const TransitionBehaviorCss =
  TransitionBehaviorCssRuntime as new () => TransitionBehaviorCss;

/**
 * transition-delay 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TransitionDelayKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.TransitionDelay | CssString
>;
/**
 * 创建 transition-delay 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TransitionDelayKeywords()
 */
export const TransitionDelayKeywords = class TransitionDelayKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => TransitionDelayKeywords;

/**
 * transition-delay 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TransitionDelayCssRuntime extends CssProperty {
  /**
   * 创建 transition-delay 属性作者；普通使用通过 s.transitionDelay 取得共享实例。
   * @example
   * class CustomTransitionDelayCss extends TransitionDelayCss {}
   */
  constructor() {
    super('transition-delay');
    initializeKeywordDeclarations(this, 'transition-delay', globalKeywords);
  }
  /**
   * 原样生成 transition-delay 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 transition-delay:value;，undefined 返回空字符串。
   * @example
   * s.transitionDelay.raw('inherit') // transition-delay:inherit;
   */
  raw(value: Property.TransitionDelay | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 ms 单位生成完整属性声明。毫秒，1000ms 等于 1s。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 ms。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.transitionDelay.ms(1)
   */
  ms(value: number): string {
    return this.declaration(`${value}ms`);
  }
  /**
   * 使用 s 单位生成完整属性声明。秒，1s 等于 1000ms。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 s。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.transitionDelay.s(1)
   */
  s(value: number): string {
    return this.declaration(`${value}s`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.transitionDelay.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.transitionDelay.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.TransitionDelay | CssString,
    ...others: (Property.TransitionDelay | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.transitionDelay.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.TransitionDelay | CssString,
    ...others: (Property.TransitionDelay | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.transitionDelay.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.TransitionDelay | CssString,
    preferred: Property.TransitionDelay | CssString,
    maximum: Property.TransitionDelay | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * transition-delay 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TransitionDelayCss = TransitionDelayCssRuntime &
  KeywordDeclarations<TransitionDelayKeywords>;
/**
 * 设置属性变化后开始过渡的延迟。（transition-delay）
 *
 * CSS 初始值：`0s`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-delay
 */
export const TransitionDelayCss = TransitionDelayCssRuntime as new () => TransitionDelayCss;

/**
 * transition-duration 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TransitionDurationKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.TransitionDuration | CssString
>;
/**
 * 创建 transition-duration 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TransitionDurationKeywords()
 */
export const TransitionDurationKeywords = class TransitionDurationKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => TransitionDurationKeywords;

/**
 * transition-duration 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TransitionDurationCssRuntime extends CssProperty {
  /**
   * 创建 transition-duration 属性作者；普通使用通过 s.transitionDuration 取得共享实例。
   * @example
   * class CustomTransitionDurationCss extends TransitionDurationCss {}
   */
  constructor() {
    super('transition-duration');
    initializeKeywordDeclarations(this, 'transition-duration', globalKeywords);
  }
  /**
   * 原样生成 transition-duration 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 transition-duration:value;，undefined 返回空字符串。
   * @example
   * s.transitionDuration.raw('inherit') // transition-duration:inherit;
   */
  raw(value: Property.TransitionDuration | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 ms 单位生成完整属性声明。毫秒，1000ms 等于 1s。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 ms。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.transitionDuration.ms(1)
   */
  ms(value: number): string {
    return this.declaration(`${value}ms`);
  }
  /**
   * 使用 s 单位生成完整属性声明。秒，1s 等于 1000ms。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 s。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.transitionDuration.s(1)
   */
  s(value: number): string {
    return this.declaration(`${value}s`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.transitionDuration.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.transitionDuration.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.TransitionDuration | CssString,
    ...others: (Property.TransitionDuration | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.transitionDuration.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.TransitionDuration | CssString,
    ...others: (Property.TransitionDuration | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.transitionDuration.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.TransitionDuration | CssString,
    preferred: Property.TransitionDuration | CssString,
    maximum: Property.TransitionDuration | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * transition-duration 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TransitionDurationCss = TransitionDurationCssRuntime &
  KeywordDeclarations<TransitionDurationKeywords>;
/**
 * 设置过渡从开始到完成的时长。（transition-duration）
 *
 * CSS 初始值：`0s`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-duration
 */
export const TransitionDurationCss =
  TransitionDurationCssRuntime as new () => TransitionDurationCss;
import { anchorScopeKeywords } from './keyword-sets.js';

/**
 * transition-property 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TransitionPropertyKeywords = KeywordValuesOf<
  typeof anchorScopeKeywords,
  Property.TransitionProperty | CssString
>;
/**
 * 创建 transition-property 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TransitionPropertyKeywords()
 */
export const TransitionPropertyKeywords = class TransitionPropertyKeywords {
  constructor() {
    Object.assign(this, anchorScopeKeywords);
  }
} as new () => TransitionPropertyKeywords;

/**
 * transition-property 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TransitionPropertyCssRuntime extends CssProperty {
  /**
   * 创建 transition-property 属性作者；普通使用通过 s.transitionProperty 取得共享实例。
   * @example
   * class CustomTransitionPropertyCss extends TransitionPropertyCss {}
   */
  constructor() {
    super('transition-property');
    initializeKeywordDeclarations(this, 'transition-property', anchorScopeKeywords);
  }
  /**
   * 原样生成 transition-property 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 transition-property:value;，undefined 返回空字符串。
   * @example
   * s.transitionProperty.raw('inherit') // transition-property:inherit;
   */
  raw(value: Property.TransitionProperty | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * transition-property 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TransitionPropertyCss = TransitionPropertyCssRuntime &
  KeywordDeclarations<TransitionPropertyKeywords>;
/**
 * 指定发生变化时需要过渡的 CSS 属性。（transition-property）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-property
 */
export const TransitionPropertyCss =
  TransitionPropertyCssRuntime as new () => TransitionPropertyCss;
import { animationTimingFunctionKeywords } from './keyword-sets.js';

/**
 * transition-timing-function 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TransitionTimingFunctionKeywords = KeywordValuesOf<
  typeof animationTimingFunctionKeywords,
  Property.TransitionTimingFunction | CssString
>;
/**
 * 创建 transition-timing-function 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TransitionTimingFunctionKeywords()
 */
export const TransitionTimingFunctionKeywords = class TransitionTimingFunctionKeywords {
  constructor() {
    Object.assign(this, animationTimingFunctionKeywords);
  }
} as new () => TransitionTimingFunctionKeywords;

/**
 * transition-timing-function 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TransitionTimingFunctionCssRuntime extends CssProperty {
  /**
   * 创建 transition-timing-function 属性作者；普通使用通过 s.transitionTimingFunction 取得共享实例。
   * @example
   * class CustomTransitionTimingFunctionCss extends TransitionTimingFunctionCss {}
   */
  constructor() {
    super('transition-timing-function');
    initializeKeywordDeclarations(
      this,
      'transition-timing-function',
      animationTimingFunctionKeywords,
    );
  }
  /**
   * 原样生成 transition-timing-function 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 transition-timing-function:value;，undefined 返回空字符串。
   * @example
   * s.transitionTimingFunction.raw('inherit') // transition-timing-function:inherit;
   */
  raw(value: Property.TransitionTimingFunction | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * transition-timing-function 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TransitionTimingFunctionCss = TransitionTimingFunctionCssRuntime &
  KeywordDeclarations<TransitionTimingFunctionKeywords>;
/**
 * 设置过渡进度变化的缓动函数。（transition-timing-function）
 *
 * CSS 初始值：`ease`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/transition-timing-function
 */
export const TransitionTimingFunctionCss =
  TransitionTimingFunctionCssRuntime as new () => TransitionTimingFunctionCss;

/**
 * translate 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type TranslateKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.Translate | CssString
>;
/**
 * 创建 translate 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new TranslateKeywords()
 */
export const TranslateKeywords = class TranslateKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => TranslateKeywords;

/**
 * translate 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class TranslateCssRuntime extends LengthCssProperty {
  /**
   * 创建 translate 属性作者；普通使用通过 s.translate 取得共享实例。
   * @example
   * class CustomTranslateCss extends TranslateCss {}
   */
  constructor() {
    super('translate');
    initializeKeywordDeclarations(this, 'translate', noneKeywords);
  }
  /**
   * 原样生成 translate 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 translate:value;，undefined 返回空字符串。
   * @example
   * s.translate.raw('inherit') // translate:inherit;
   */
  raw(value: Property.Translate | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.translate.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.translate.calc('var(--value) * 2')
   */
  calc(expression: string): string {
    return this.raw(`calc(${expression})`);
  }
  /**
   * 生成 CSS min()，从同维度的候选值中选择最小值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 min(...) 的完整属性声明。
   * @example
   * s.translate.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.Translate | CssString,
    ...others: (Property.Translate | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.translate.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.Translate | CssString,
    ...others: (Property.Translate | CssString)[]
  ): string {
    return this.raw(`max(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS clamp()，将首选值约束在下限和上限之间。
   *
   * 参数是裸 CSS 值，不是 s.width.px(...) 等方法返回的完整声明。变量的值和维度由浏览器验证。
   * @param minimum 下限 CSS 值；下限大于上限时以下限为准。
   * @param preferred 首选 CSS 值，常用响应式长度或表达式。
   * @param maximum 上限 CSS 值，须与其他参数维度兼容。
   * @returns 包含 clamp(...) 的完整属性声明。
   * @example
   * s.translate.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Translate | CssString,
    preferred: Property.Translate | CssString,
    maximum: Property.Translate | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * translate 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type TranslateCss = TranslateCssRuntime & KeywordDeclarations<TranslateKeywords>;
/**
 * 独立设置元素在二维或三维空间中的平移。（translate）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/translate
 */
export const TranslateCss = TranslateCssRuntime as new () => TranslateCss;
