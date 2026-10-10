// 由 scripts/generate-css-author.mjs 从 csstype@3.2.3 生成；请勿手改。
// 来源许可见 packages/css/THIRD_PARTY_NOTICES.md。
import type { Property } from 'csstype';
import { CssProperty, LengthCssProperty, type CssString } from './base.js';
import { initializeKeywordDeclarations } from '../theme/keyword-data.js';
import type { KeywordDeclarations, KeywordValuesOf } from '../theme/keyword-source.js';
// 关键字是实例上的声明字符串；系统实例按属性链惰性创建并共享。
import { globalKeywords } from './keyword-sets.js';

/**
 * padding 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PaddingKeywords = KeywordValuesOf<typeof globalKeywords, Property.Padding | CssString>;
/**
 * 创建 padding 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PaddingKeywords()
 */
export const PaddingKeywords = class PaddingKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => PaddingKeywords;

/**
 * padding 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PaddingCssRuntime extends LengthCssProperty {
  /**
   * 创建 padding 属性作者；普通使用通过 s.padding 取得共享实例。
   * @example
   * class CustomPaddingCss extends PaddingCss {}
   */
  constructor() {
    super('padding');
    initializeKeywordDeclarations(this, 'padding', globalKeywords);
  }
  /**
   * 原样生成 padding 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 padding:value;，undefined 返回空字符串。
   * @example
   * s.padding.raw('inherit') // padding:inherit;
   */
  raw(value: Property.Padding | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 四边的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.padding.px(1)
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
   * s.padding.px(1, 2)
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
   * s.padding.px(1, 2, 3)
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
   * s.padding.px(1, 2, 3, 4)
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
   * s.padding.cm(1)
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
   * s.padding.cm(1, 2)
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
   * s.padding.cm(1, 2, 3)
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
   * s.padding.cm(1, 2, 3, 4)
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
   * s.padding.mm(1)
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
   * s.padding.mm(1, 2)
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
   * s.padding.mm(1, 2, 3)
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
   * s.padding.mm(1, 2, 3, 4)
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
   * s.padding.q(1)
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
   * s.padding.q(1, 2)
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
   * s.padding.q(1, 2, 3)
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
   * s.padding.q(1, 2, 3, 4)
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
   * s.padding.in(1)
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
   * s.padding.in(1, 2)
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
   * s.padding.in(1, 2, 3)
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
   * s.padding.in(1, 2, 3, 4)
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
   * s.padding.pt(1)
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
   * s.padding.pt(1, 2)
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
   * s.padding.pt(1, 2, 3)
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
   * s.padding.pt(1, 2, 3, 4)
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
   * s.padding.pc(1)
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
   * s.padding.pc(1, 2)
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
   * s.padding.pc(1, 2, 3)
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
   * s.padding.pc(1, 2, 3, 4)
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
   * s.padding.em(1)
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
   * s.padding.em(1, 2)
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
   * s.padding.em(1, 2, 3)
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
   * s.padding.em(1, 2, 3, 4)
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
   * s.padding.rem(1)
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
   * s.padding.rem(1, 2)
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
   * s.padding.rem(1, 2, 3)
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
   * s.padding.rem(1, 2, 3, 4)
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
   * s.padding.ex(1)
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
   * s.padding.ex(1, 2)
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
   * s.padding.ex(1, 2, 3)
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
   * s.padding.ex(1, 2, 3, 4)
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
   * s.padding.rex(1)
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
   * s.padding.rex(1, 2)
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
   * s.padding.rex(1, 2, 3)
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
   * s.padding.rex(1, 2, 3, 4)
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
   * s.padding.ch(1)
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
   * s.padding.ch(1, 2)
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
   * s.padding.ch(1, 2, 3)
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
   * s.padding.ch(1, 2, 3, 4)
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
   * s.padding.rch(1)
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
   * s.padding.rch(1, 2)
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
   * s.padding.rch(1, 2, 3)
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
   * s.padding.rch(1, 2, 3, 4)
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
   * s.padding.cap(1)
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
   * s.padding.cap(1, 2)
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
   * s.padding.cap(1, 2, 3)
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
   * s.padding.cap(1, 2, 3, 4)
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
   * s.padding.rcap(1)
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
   * s.padding.rcap(1, 2)
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
   * s.padding.rcap(1, 2, 3)
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
   * s.padding.rcap(1, 2, 3, 4)
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
   * s.padding.ic(1)
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
   * s.padding.ic(1, 2)
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
   * s.padding.ic(1, 2, 3)
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
   * s.padding.ic(1, 2, 3, 4)
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
   * s.padding.ric(1)
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
   * s.padding.ric(1, 2)
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
   * s.padding.ric(1, 2, 3)
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
   * s.padding.ric(1, 2, 3, 4)
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
   * s.padding.lh(1)
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
   * s.padding.lh(1, 2)
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
   * s.padding.lh(1, 2, 3)
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
   * s.padding.lh(1, 2, 3, 4)
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
   * s.padding.rlh(1)
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
   * s.padding.rlh(1, 2)
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
   * s.padding.rlh(1, 2, 3)
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
   * s.padding.rlh(1, 2, 3, 4)
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
   * s.padding.vw(1)
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
   * s.padding.vw(1, 2)
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
   * s.padding.vw(1, 2, 3)
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
   * s.padding.vw(1, 2, 3, 4)
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
   * s.padding.vh(1)
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
   * s.padding.vh(1, 2)
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
   * s.padding.vh(1, 2, 3)
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
   * s.padding.vh(1, 2, 3, 4)
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
   * s.padding.vi(1)
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
   * s.padding.vi(1, 2)
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
   * s.padding.vi(1, 2, 3)
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
   * s.padding.vi(1, 2, 3, 4)
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
   * s.padding.vb(1)
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
   * s.padding.vb(1, 2)
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
   * s.padding.vb(1, 2, 3)
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
   * s.padding.vb(1, 2, 3, 4)
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
   * s.padding.vmin(1)
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
   * s.padding.vmin(1, 2)
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
   * s.padding.vmin(1, 2, 3)
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
   * s.padding.vmin(1, 2, 3, 4)
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
   * s.padding.vmax(1)
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
   * s.padding.vmax(1, 2)
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
   * s.padding.vmax(1, 2, 3)
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
   * s.padding.vmax(1, 2, 3, 4)
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
   * s.padding.svw(1)
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
   * s.padding.svw(1, 2)
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
   * s.padding.svw(1, 2, 3)
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
   * s.padding.svw(1, 2, 3, 4)
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
   * s.padding.svh(1)
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
   * s.padding.svh(1, 2)
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
   * s.padding.svh(1, 2, 3)
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
   * s.padding.svh(1, 2, 3, 4)
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
   * s.padding.svi(1)
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
   * s.padding.svi(1, 2)
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
   * s.padding.svi(1, 2, 3)
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
   * s.padding.svi(1, 2, 3, 4)
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
   * s.padding.svb(1)
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
   * s.padding.svb(1, 2)
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
   * s.padding.svb(1, 2, 3)
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
   * s.padding.svb(1, 2, 3, 4)
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
   * s.padding.svmin(1)
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
   * s.padding.svmin(1, 2)
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
   * s.padding.svmin(1, 2, 3)
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
   * s.padding.svmin(1, 2, 3, 4)
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
   * s.padding.svmax(1)
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
   * s.padding.svmax(1, 2)
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
   * s.padding.svmax(1, 2, 3)
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
   * s.padding.svmax(1, 2, 3, 4)
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
   * s.padding.lvw(1)
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
   * s.padding.lvw(1, 2)
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
   * s.padding.lvw(1, 2, 3)
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
   * s.padding.lvw(1, 2, 3, 4)
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
   * s.padding.lvh(1)
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
   * s.padding.lvh(1, 2)
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
   * s.padding.lvh(1, 2, 3)
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
   * s.padding.lvh(1, 2, 3, 4)
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
   * s.padding.lvi(1)
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
   * s.padding.lvi(1, 2)
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
   * s.padding.lvi(1, 2, 3)
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
   * s.padding.lvi(1, 2, 3, 4)
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
   * s.padding.lvb(1)
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
   * s.padding.lvb(1, 2)
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
   * s.padding.lvb(1, 2, 3)
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
   * s.padding.lvb(1, 2, 3, 4)
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
   * s.padding.lvmin(1)
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
   * s.padding.lvmin(1, 2)
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
   * s.padding.lvmin(1, 2, 3)
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
   * s.padding.lvmin(1, 2, 3, 4)
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
   * s.padding.lvmax(1)
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
   * s.padding.lvmax(1, 2)
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
   * s.padding.lvmax(1, 2, 3)
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
   * s.padding.lvmax(1, 2, 3, 4)
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
   * s.padding.dvw(1)
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
   * s.padding.dvw(1, 2)
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
   * s.padding.dvw(1, 2, 3)
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
   * s.padding.dvw(1, 2, 3, 4)
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
   * s.padding.dvh(1)
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
   * s.padding.dvh(1, 2)
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
   * s.padding.dvh(1, 2, 3)
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
   * s.padding.dvh(1, 2, 3, 4)
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
   * s.padding.dvi(1)
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
   * s.padding.dvi(1, 2)
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
   * s.padding.dvi(1, 2, 3)
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
   * s.padding.dvi(1, 2, 3, 4)
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
   * s.padding.dvb(1)
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
   * s.padding.dvb(1, 2)
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
   * s.padding.dvb(1, 2, 3)
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
   * s.padding.dvb(1, 2, 3, 4)
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
   * s.padding.dvmin(1)
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
   * s.padding.dvmin(1, 2)
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
   * s.padding.dvmin(1, 2, 3)
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
   * s.padding.dvmin(1, 2, 3, 4)
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
   * s.padding.dvmax(1)
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
   * s.padding.dvmax(1, 2)
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
   * s.padding.dvmax(1, 2, 3)
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
   * s.padding.dvmax(1, 2, 3, 4)
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
   * s.padding.cqw(1)
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
   * s.padding.cqw(1, 2)
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
   * s.padding.cqw(1, 2, 3)
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
   * s.padding.cqw(1, 2, 3, 4)
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
   * s.padding.cqh(1)
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
   * s.padding.cqh(1, 2)
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
   * s.padding.cqh(1, 2, 3)
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
   * s.padding.cqh(1, 2, 3, 4)
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
   * s.padding.cqi(1)
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
   * s.padding.cqi(1, 2)
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
   * s.padding.cqi(1, 2, 3)
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
   * s.padding.cqi(1, 2, 3, 4)
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
   * s.padding.cqb(1)
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
   * s.padding.cqb(1, 2)
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
   * s.padding.cqb(1, 2, 3)
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
   * s.padding.cqb(1, 2, 3, 4)
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
   * s.padding.cqmin(1)
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
   * s.padding.cqmin(1, 2)
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
   * s.padding.cqmin(1, 2, 3)
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
   * s.padding.cqmin(1, 2, 3, 4)
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
   * s.padding.cqmax(1)
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
   * s.padding.cqmax(1, 2)
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
   * s.padding.cqmax(1, 2, 3)
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
   * s.padding.cqmax(1, 2, 3, 4)
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
   * s.padding.percent(1)
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
   * s.padding.percent(1, 2)
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
   * s.padding.percent(1, 2, 3)
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
   * s.padding.percent(1, 2, 3, 4)
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
   * s.padding.calc('var(--value) * 2')
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
   * s.padding.min('var(--first)', 'var(--second)')
   */
  min(value: Property.Padding | CssString, ...others: (Property.Padding | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.padding.max('var(--first)', 'var(--second)')
   */
  max(value: Property.Padding | CssString, ...others: (Property.Padding | CssString)[]): string {
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
   * s.padding.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Padding | CssString,
    preferred: Property.Padding | CssString,
    maximum: Property.Padding | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * padding 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PaddingCss = PaddingCssRuntime & KeywordDeclarations<PaddingKeywords>;
/**
 * 设置内容与边框之间的四边内边距，不接受负值。（padding）
 *
 * 1/2/3/4 个值依次表示：四边；上下/左右；上/左右/下；上/右/下/左。不能使用负值或 auto。
 *
 * 适用场景：控制文字或子元素与组件边框之间的留白。
 * @example
 * s.padding.rem(0.5, 1) // padding:0.5rem 1rem;
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding
 */
export const PaddingCss = PaddingCssRuntime as new () => PaddingCss;

/**
 * padding-block 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PaddingBlockKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.PaddingBlock | CssString
>;
/**
 * 创建 padding-block 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PaddingBlockKeywords()
 */
export const PaddingBlockKeywords = class PaddingBlockKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => PaddingBlockKeywords;

/**
 * padding-block 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PaddingBlockCssRuntime extends LengthCssProperty {
  /**
   * 创建 padding-block 属性作者；普通使用通过 s.paddingBlock 取得共享实例。
   * @example
   * class CustomPaddingBlockCss extends PaddingBlockCss {}
   */
  constructor() {
    super('padding-block');
    initializeKeywordDeclarations(this, 'padding-block', globalKeywords);
  }
  /**
   * 原样生成 padding-block 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 padding-block:value;，undefined 返回空字符串。
   * @example
   * s.paddingBlock.raw('inherit') // padding-block:inherit;
   */
  raw(value: Property.PaddingBlock | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑块轴两侧的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.paddingBlock.px(1)
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
   * s.paddingBlock.px(1, 2)
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
   * s.paddingBlock.cm(1)
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
   * s.paddingBlock.cm(1, 2)
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
   * s.paddingBlock.mm(1)
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
   * s.paddingBlock.mm(1, 2)
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
   * s.paddingBlock.q(1)
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
   * s.paddingBlock.q(1, 2)
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
   * s.paddingBlock.in(1)
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
   * s.paddingBlock.in(1, 2)
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
   * s.paddingBlock.pt(1)
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
   * s.paddingBlock.pt(1, 2)
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
   * s.paddingBlock.pc(1)
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
   * s.paddingBlock.pc(1, 2)
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
   * s.paddingBlock.em(1)
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
   * s.paddingBlock.em(1, 2)
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
   * s.paddingBlock.rem(1)
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
   * s.paddingBlock.rem(1, 2)
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
   * s.paddingBlock.ex(1)
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
   * s.paddingBlock.ex(1, 2)
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
   * s.paddingBlock.rex(1)
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
   * s.paddingBlock.rex(1, 2)
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
   * s.paddingBlock.ch(1)
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
   * s.paddingBlock.ch(1, 2)
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
   * s.paddingBlock.rch(1)
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
   * s.paddingBlock.rch(1, 2)
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
   * s.paddingBlock.cap(1)
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
   * s.paddingBlock.cap(1, 2)
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
   * s.paddingBlock.rcap(1)
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
   * s.paddingBlock.rcap(1, 2)
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
   * s.paddingBlock.ic(1)
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
   * s.paddingBlock.ic(1, 2)
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
   * s.paddingBlock.ric(1)
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
   * s.paddingBlock.ric(1, 2)
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
   * s.paddingBlock.lh(1)
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
   * s.paddingBlock.lh(1, 2)
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
   * s.paddingBlock.rlh(1)
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
   * s.paddingBlock.rlh(1, 2)
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
   * s.paddingBlock.vw(1)
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
   * s.paddingBlock.vw(1, 2)
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
   * s.paddingBlock.vh(1)
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
   * s.paddingBlock.vh(1, 2)
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
   * s.paddingBlock.vi(1)
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
   * s.paddingBlock.vi(1, 2)
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
   * s.paddingBlock.vb(1)
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
   * s.paddingBlock.vb(1, 2)
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
   * s.paddingBlock.vmin(1)
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
   * s.paddingBlock.vmin(1, 2)
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
   * s.paddingBlock.vmax(1)
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
   * s.paddingBlock.vmax(1, 2)
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
   * s.paddingBlock.svw(1)
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
   * s.paddingBlock.svw(1, 2)
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
   * s.paddingBlock.svh(1)
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
   * s.paddingBlock.svh(1, 2)
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
   * s.paddingBlock.svi(1)
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
   * s.paddingBlock.svi(1, 2)
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
   * s.paddingBlock.svb(1)
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
   * s.paddingBlock.svb(1, 2)
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
   * s.paddingBlock.svmin(1)
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
   * s.paddingBlock.svmin(1, 2)
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
   * s.paddingBlock.svmax(1)
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
   * s.paddingBlock.svmax(1, 2)
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
   * s.paddingBlock.lvw(1)
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
   * s.paddingBlock.lvw(1, 2)
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
   * s.paddingBlock.lvh(1)
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
   * s.paddingBlock.lvh(1, 2)
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
   * s.paddingBlock.lvi(1)
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
   * s.paddingBlock.lvi(1, 2)
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
   * s.paddingBlock.lvb(1)
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
   * s.paddingBlock.lvb(1, 2)
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
   * s.paddingBlock.lvmin(1)
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
   * s.paddingBlock.lvmin(1, 2)
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
   * s.paddingBlock.lvmax(1)
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
   * s.paddingBlock.lvmax(1, 2)
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
   * s.paddingBlock.dvw(1)
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
   * s.paddingBlock.dvw(1, 2)
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
   * s.paddingBlock.dvh(1)
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
   * s.paddingBlock.dvh(1, 2)
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
   * s.paddingBlock.dvi(1)
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
   * s.paddingBlock.dvi(1, 2)
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
   * s.paddingBlock.dvb(1)
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
   * s.paddingBlock.dvb(1, 2)
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
   * s.paddingBlock.dvmin(1)
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
   * s.paddingBlock.dvmin(1, 2)
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
   * s.paddingBlock.dvmax(1)
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
   * s.paddingBlock.dvmax(1, 2)
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
   * s.paddingBlock.cqw(1)
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
   * s.paddingBlock.cqw(1, 2)
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
   * s.paddingBlock.cqh(1)
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
   * s.paddingBlock.cqh(1, 2)
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
   * s.paddingBlock.cqi(1)
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
   * s.paddingBlock.cqi(1, 2)
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
   * s.paddingBlock.cqb(1)
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
   * s.paddingBlock.cqb(1, 2)
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
   * s.paddingBlock.cqmin(1)
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
   * s.paddingBlock.cqmin(1, 2)
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
   * s.paddingBlock.cqmax(1)
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
   * s.paddingBlock.cqmax(1, 2)
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
   * s.paddingBlock.percent(1)
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
   * s.paddingBlock.percent(1, 2)
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
   * s.paddingBlock.calc('var(--value) * 2')
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
   * s.paddingBlock.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.PaddingBlock | CssString,
    ...others: (Property.PaddingBlock | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.paddingBlock.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.PaddingBlock | CssString,
    ...others: (Property.PaddingBlock | CssString)[]
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
   * s.paddingBlock.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.PaddingBlock | CssString,
    preferred: Property.PaddingBlock | CssString,
    maximum: Property.PaddingBlock | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * padding-block 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PaddingBlockCss = PaddingBlockCssRuntime & KeywordDeclarations<PaddingBlockKeywords>;
/**
 * 设置逻辑块轴起始侧和结束侧的内边距。（padding-block）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block
 */
export const PaddingBlockCss = PaddingBlockCssRuntime as new () => PaddingBlockCss;

/**
 * padding-block-end 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PaddingBlockEndKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.PaddingBlockEnd | CssString
>;
/**
 * 创建 padding-block-end 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PaddingBlockEndKeywords()
 */
export const PaddingBlockEndKeywords = class PaddingBlockEndKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => PaddingBlockEndKeywords;

/**
 * padding-block-end 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PaddingBlockEndCssRuntime extends LengthCssProperty {
  /**
   * 创建 padding-block-end 属性作者；普通使用通过 s.paddingBlockEnd 取得共享实例。
   * @example
   * class CustomPaddingBlockEndCss extends PaddingBlockEndCss {}
   */
  constructor() {
    super('padding-block-end');
    initializeKeywordDeclarations(this, 'padding-block-end', globalKeywords);
  }
  /**
   * 原样生成 padding-block-end 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 padding-block-end:value;，undefined 返回空字符串。
   * @example
   * s.paddingBlockEnd.raw('inherit') // padding-block-end:inherit;
   */
  raw(value: Property.PaddingBlockEnd | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.paddingBlockEnd.calc('var(--value) * 2')
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
   * s.paddingBlockEnd.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.PaddingBlockEnd | CssString,
    ...others: (Property.PaddingBlockEnd | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.paddingBlockEnd.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.PaddingBlockEnd | CssString,
    ...others: (Property.PaddingBlockEnd | CssString)[]
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
   * s.paddingBlockEnd.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.PaddingBlockEnd | CssString,
    preferred: Property.PaddingBlockEnd | CssString,
    maximum: Property.PaddingBlockEnd | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * padding-block-end 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PaddingBlockEndCss = PaddingBlockEndCssRuntime &
  KeywordDeclarations<PaddingBlockEndKeywords>;
/**
 * 设置逻辑块轴结束侧的内边距。（padding-block-end）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-end
 */
export const PaddingBlockEndCss = PaddingBlockEndCssRuntime as new () => PaddingBlockEndCss;

/**
 * padding-block-start 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PaddingBlockStartKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.PaddingBlockStart | CssString
>;
/**
 * 创建 padding-block-start 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PaddingBlockStartKeywords()
 */
export const PaddingBlockStartKeywords = class PaddingBlockStartKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => PaddingBlockStartKeywords;

/**
 * padding-block-start 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PaddingBlockStartCssRuntime extends LengthCssProperty {
  /**
   * 创建 padding-block-start 属性作者；普通使用通过 s.paddingBlockStart 取得共享实例。
   * @example
   * class CustomPaddingBlockStartCss extends PaddingBlockStartCss {}
   */
  constructor() {
    super('padding-block-start');
    initializeKeywordDeclarations(this, 'padding-block-start', globalKeywords);
  }
  /**
   * 原样生成 padding-block-start 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 padding-block-start:value;，undefined 返回空字符串。
   * @example
   * s.paddingBlockStart.raw('inherit') // padding-block-start:inherit;
   */
  raw(value: Property.PaddingBlockStart | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.paddingBlockStart.calc('var(--value) * 2')
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
   * s.paddingBlockStart.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.PaddingBlockStart | CssString,
    ...others: (Property.PaddingBlockStart | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.paddingBlockStart.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.PaddingBlockStart | CssString,
    ...others: (Property.PaddingBlockStart | CssString)[]
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
   * s.paddingBlockStart.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.PaddingBlockStart | CssString,
    preferred: Property.PaddingBlockStart | CssString,
    maximum: Property.PaddingBlockStart | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * padding-block-start 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PaddingBlockStartCss = PaddingBlockStartCssRuntime &
  KeywordDeclarations<PaddingBlockStartKeywords>;
/**
 * 设置逻辑块轴起始侧的内边距。（padding-block-start）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-block-start
 */
export const PaddingBlockStartCss = PaddingBlockStartCssRuntime as new () => PaddingBlockStartCss;

/**
 * padding-bottom 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PaddingBottomKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.PaddingBottom | CssString
>;
/**
 * 创建 padding-bottom 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PaddingBottomKeywords()
 */
export const PaddingBottomKeywords = class PaddingBottomKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => PaddingBottomKeywords;

/**
 * padding-bottom 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PaddingBottomCssRuntime extends LengthCssProperty {
  /**
   * 创建 padding-bottom 属性作者；普通使用通过 s.paddingBottom 取得共享实例。
   * @example
   * class CustomPaddingBottomCss extends PaddingBottomCss {}
   */
  constructor() {
    super('padding-bottom');
    initializeKeywordDeclarations(this, 'padding-bottom', globalKeywords);
  }
  /**
   * 原样生成 padding-bottom 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 padding-bottom:value;，undefined 返回空字符串。
   * @example
   * s.paddingBottom.raw('inherit') // padding-bottom:inherit;
   */
  raw(value: Property.PaddingBottom | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.paddingBottom.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.paddingBottom.calc('var(--value) * 2')
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
   * s.paddingBottom.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.PaddingBottom | CssString,
    ...others: (Property.PaddingBottom | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.paddingBottom.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.PaddingBottom | CssString,
    ...others: (Property.PaddingBottom | CssString)[]
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
   * s.paddingBottom.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.PaddingBottom | CssString,
    preferred: Property.PaddingBottom | CssString,
    maximum: Property.PaddingBottom | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * padding-bottom 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PaddingBottomCss = PaddingBottomCssRuntime & KeywordDeclarations<PaddingBottomKeywords>;
/**
 * 设置下内边距。（padding-bottom）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-bottom
 */
export const PaddingBottomCss = PaddingBottomCssRuntime as new () => PaddingBottomCss;

/**
 * padding-inline 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PaddingInlineKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.PaddingInline | CssString
>;
/**
 * 创建 padding-inline 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PaddingInlineKeywords()
 */
export const PaddingInlineKeywords = class PaddingInlineKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => PaddingInlineKeywords;

/**
 * padding-inline 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PaddingInlineCssRuntime extends LengthCssProperty {
  /**
   * 创建 padding-inline 属性作者；普通使用通过 s.paddingInline 取得共享实例。
   * @example
   * class CustomPaddingInlineCss extends PaddingInlineCss {}
   */
  constructor() {
    super('padding-inline');
    initializeKeywordDeclarations(this, 'padding-inline', globalKeywords);
  }
  /**
   * 原样生成 padding-inline 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 padding-inline:value;，undefined 返回空字符串。
   * @example
   * s.paddingInline.raw('inherit') // padding-inline:inherit;
   */
  raw(value: Property.PaddingInline | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 逻辑行内轴两侧的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.paddingInline.px(1)
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
   * s.paddingInline.px(1, 2)
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
   * s.paddingInline.cm(1)
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
   * s.paddingInline.cm(1, 2)
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
   * s.paddingInline.mm(1)
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
   * s.paddingInline.mm(1, 2)
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
   * s.paddingInline.q(1)
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
   * s.paddingInline.q(1, 2)
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
   * s.paddingInline.in(1)
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
   * s.paddingInline.in(1, 2)
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
   * s.paddingInline.pt(1)
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
   * s.paddingInline.pt(1, 2)
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
   * s.paddingInline.pc(1)
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
   * s.paddingInline.pc(1, 2)
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
   * s.paddingInline.em(1)
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
   * s.paddingInline.em(1, 2)
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
   * s.paddingInline.rem(1)
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
   * s.paddingInline.rem(1, 2)
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
   * s.paddingInline.ex(1)
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
   * s.paddingInline.ex(1, 2)
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
   * s.paddingInline.rex(1)
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
   * s.paddingInline.rex(1, 2)
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
   * s.paddingInline.ch(1)
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
   * s.paddingInline.ch(1, 2)
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
   * s.paddingInline.rch(1)
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
   * s.paddingInline.rch(1, 2)
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
   * s.paddingInline.cap(1)
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
   * s.paddingInline.cap(1, 2)
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
   * s.paddingInline.rcap(1)
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
   * s.paddingInline.rcap(1, 2)
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
   * s.paddingInline.ic(1)
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
   * s.paddingInline.ic(1, 2)
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
   * s.paddingInline.ric(1)
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
   * s.paddingInline.ric(1, 2)
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
   * s.paddingInline.lh(1)
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
   * s.paddingInline.lh(1, 2)
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
   * s.paddingInline.rlh(1)
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
   * s.paddingInline.rlh(1, 2)
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
   * s.paddingInline.vw(1)
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
   * s.paddingInline.vw(1, 2)
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
   * s.paddingInline.vh(1)
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
   * s.paddingInline.vh(1, 2)
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
   * s.paddingInline.vi(1)
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
   * s.paddingInline.vi(1, 2)
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
   * s.paddingInline.vb(1)
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
   * s.paddingInline.vb(1, 2)
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
   * s.paddingInline.vmin(1)
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
   * s.paddingInline.vmin(1, 2)
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
   * s.paddingInline.vmax(1)
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
   * s.paddingInline.vmax(1, 2)
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
   * s.paddingInline.svw(1)
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
   * s.paddingInline.svw(1, 2)
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
   * s.paddingInline.svh(1)
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
   * s.paddingInline.svh(1, 2)
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
   * s.paddingInline.svi(1)
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
   * s.paddingInline.svi(1, 2)
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
   * s.paddingInline.svb(1)
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
   * s.paddingInline.svb(1, 2)
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
   * s.paddingInline.svmin(1)
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
   * s.paddingInline.svmin(1, 2)
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
   * s.paddingInline.svmax(1)
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
   * s.paddingInline.svmax(1, 2)
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
   * s.paddingInline.lvw(1)
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
   * s.paddingInline.lvw(1, 2)
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
   * s.paddingInline.lvh(1)
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
   * s.paddingInline.lvh(1, 2)
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
   * s.paddingInline.lvi(1)
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
   * s.paddingInline.lvi(1, 2)
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
   * s.paddingInline.lvb(1)
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
   * s.paddingInline.lvb(1, 2)
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
   * s.paddingInline.lvmin(1)
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
   * s.paddingInline.lvmin(1, 2)
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
   * s.paddingInline.lvmax(1)
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
   * s.paddingInline.lvmax(1, 2)
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
   * s.paddingInline.dvw(1)
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
   * s.paddingInline.dvw(1, 2)
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
   * s.paddingInline.dvh(1)
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
   * s.paddingInline.dvh(1, 2)
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
   * s.paddingInline.dvi(1)
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
   * s.paddingInline.dvi(1, 2)
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
   * s.paddingInline.dvb(1)
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
   * s.paddingInline.dvb(1, 2)
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
   * s.paddingInline.dvmin(1)
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
   * s.paddingInline.dvmin(1, 2)
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
   * s.paddingInline.dvmax(1)
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
   * s.paddingInline.dvmax(1, 2)
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
   * s.paddingInline.cqw(1)
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
   * s.paddingInline.cqw(1, 2)
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
   * s.paddingInline.cqh(1)
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
   * s.paddingInline.cqh(1, 2)
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
   * s.paddingInline.cqi(1)
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
   * s.paddingInline.cqi(1, 2)
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
   * s.paddingInline.cqb(1)
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
   * s.paddingInline.cqb(1, 2)
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
   * s.paddingInline.cqmin(1)
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
   * s.paddingInline.cqmin(1, 2)
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
   * s.paddingInline.cqmax(1)
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
   * s.paddingInline.cqmax(1, 2)
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
   * s.paddingInline.percent(1)
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
   * s.paddingInline.percent(1, 2)
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
   * s.paddingInline.calc('var(--value) * 2')
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
   * s.paddingInline.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.PaddingInline | CssString,
    ...others: (Property.PaddingInline | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.paddingInline.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.PaddingInline | CssString,
    ...others: (Property.PaddingInline | CssString)[]
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
   * s.paddingInline.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.PaddingInline | CssString,
    preferred: Property.PaddingInline | CssString,
    maximum: Property.PaddingInline | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * padding-inline 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PaddingInlineCss = PaddingInlineCssRuntime & KeywordDeclarations<PaddingInlineKeywords>;
/**
 * 设置逻辑行内轴起始侧和结束侧的内边距。（padding-inline）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline
 */
export const PaddingInlineCss = PaddingInlineCssRuntime as new () => PaddingInlineCss;

/**
 * padding-inline-end 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PaddingInlineEndKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.PaddingInlineEnd | CssString
>;
/**
 * 创建 padding-inline-end 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PaddingInlineEndKeywords()
 */
export const PaddingInlineEndKeywords = class PaddingInlineEndKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => PaddingInlineEndKeywords;

/**
 * padding-inline-end 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PaddingInlineEndCssRuntime extends LengthCssProperty {
  /**
   * 创建 padding-inline-end 属性作者；普通使用通过 s.paddingInlineEnd 取得共享实例。
   * @example
   * class CustomPaddingInlineEndCss extends PaddingInlineEndCss {}
   */
  constructor() {
    super('padding-inline-end');
    initializeKeywordDeclarations(this, 'padding-inline-end', globalKeywords);
  }
  /**
   * 原样生成 padding-inline-end 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 padding-inline-end:value;，undefined 返回空字符串。
   * @example
   * s.paddingInlineEnd.raw('inherit') // padding-inline-end:inherit;
   */
  raw(value: Property.PaddingInlineEnd | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.paddingInlineEnd.calc('var(--value) * 2')
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
   * s.paddingInlineEnd.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.PaddingInlineEnd | CssString,
    ...others: (Property.PaddingInlineEnd | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.paddingInlineEnd.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.PaddingInlineEnd | CssString,
    ...others: (Property.PaddingInlineEnd | CssString)[]
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
   * s.paddingInlineEnd.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.PaddingInlineEnd | CssString,
    preferred: Property.PaddingInlineEnd | CssString,
    maximum: Property.PaddingInlineEnd | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * padding-inline-end 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PaddingInlineEndCss = PaddingInlineEndCssRuntime &
  KeywordDeclarations<PaddingInlineEndKeywords>;
/**
 * 设置逻辑行内轴结束侧的内边距。（padding-inline-end）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-end
 */
export const PaddingInlineEndCss = PaddingInlineEndCssRuntime as new () => PaddingInlineEndCss;

/**
 * padding-inline-start 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PaddingInlineStartKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.PaddingInlineStart | CssString
>;
/**
 * 创建 padding-inline-start 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PaddingInlineStartKeywords()
 */
export const PaddingInlineStartKeywords = class PaddingInlineStartKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => PaddingInlineStartKeywords;

/**
 * padding-inline-start 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PaddingInlineStartCssRuntime extends LengthCssProperty {
  /**
   * 创建 padding-inline-start 属性作者；普通使用通过 s.paddingInlineStart 取得共享实例。
   * @example
   * class CustomPaddingInlineStartCss extends PaddingInlineStartCss {}
   */
  constructor() {
    super('padding-inline-start');
    initializeKeywordDeclarations(this, 'padding-inline-start', globalKeywords);
  }
  /**
   * 原样生成 padding-inline-start 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 padding-inline-start:value;，undefined 返回空字符串。
   * @example
   * s.paddingInlineStart.raw('inherit') // padding-inline-start:inherit;
   */
  raw(value: Property.PaddingInlineStart | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.paddingInlineStart.calc('var(--value) * 2')
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
   * s.paddingInlineStart.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.PaddingInlineStart | CssString,
    ...others: (Property.PaddingInlineStart | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.paddingInlineStart.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.PaddingInlineStart | CssString,
    ...others: (Property.PaddingInlineStart | CssString)[]
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
   * s.paddingInlineStart.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.PaddingInlineStart | CssString,
    preferred: Property.PaddingInlineStart | CssString,
    maximum: Property.PaddingInlineStart | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * padding-inline-start 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PaddingInlineStartCss = PaddingInlineStartCssRuntime &
  KeywordDeclarations<PaddingInlineStartKeywords>;
/**
 * 设置逻辑行内轴起始侧的内边距。（padding-inline-start）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-inline-start
 */
export const PaddingInlineStartCss =
  PaddingInlineStartCssRuntime as new () => PaddingInlineStartCss;

/**
 * padding-left 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PaddingLeftKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.PaddingLeft | CssString
>;
/**
 * 创建 padding-left 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PaddingLeftKeywords()
 */
export const PaddingLeftKeywords = class PaddingLeftKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => PaddingLeftKeywords;

/**
 * padding-left 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PaddingLeftCssRuntime extends LengthCssProperty {
  /**
   * 创建 padding-left 属性作者；普通使用通过 s.paddingLeft 取得共享实例。
   * @example
   * class CustomPaddingLeftCss extends PaddingLeftCss {}
   */
  constructor() {
    super('padding-left');
    initializeKeywordDeclarations(this, 'padding-left', globalKeywords);
  }
  /**
   * 原样生成 padding-left 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 padding-left:value;，undefined 返回空字符串。
   * @example
   * s.paddingLeft.raw('inherit') // padding-left:inherit;
   */
  raw(value: Property.PaddingLeft | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.paddingLeft.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.paddingLeft.calc('var(--value) * 2')
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
   * s.paddingLeft.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.PaddingLeft | CssString,
    ...others: (Property.PaddingLeft | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.paddingLeft.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.PaddingLeft | CssString,
    ...others: (Property.PaddingLeft | CssString)[]
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
   * s.paddingLeft.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.PaddingLeft | CssString,
    preferred: Property.PaddingLeft | CssString,
    maximum: Property.PaddingLeft | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * padding-left 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PaddingLeftCss = PaddingLeftCssRuntime & KeywordDeclarations<PaddingLeftKeywords>;
/**
 * 设置左内边距。（padding-left）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-left
 */
export const PaddingLeftCss = PaddingLeftCssRuntime as new () => PaddingLeftCss;

/**
 * padding-right 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PaddingRightKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.PaddingRight | CssString
>;
/**
 * 创建 padding-right 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PaddingRightKeywords()
 */
export const PaddingRightKeywords = class PaddingRightKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => PaddingRightKeywords;

/**
 * padding-right 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PaddingRightCssRuntime extends LengthCssProperty {
  /**
   * 创建 padding-right 属性作者；普通使用通过 s.paddingRight 取得共享实例。
   * @example
   * class CustomPaddingRightCss extends PaddingRightCss {}
   */
  constructor() {
    super('padding-right');
    initializeKeywordDeclarations(this, 'padding-right', globalKeywords);
  }
  /**
   * 原样生成 padding-right 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 padding-right:value;，undefined 返回空字符串。
   * @example
   * s.paddingRight.raw('inherit') // padding-right:inherit;
   */
  raw(value: Property.PaddingRight | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.paddingRight.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.paddingRight.calc('var(--value) * 2')
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
   * s.paddingRight.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.PaddingRight | CssString,
    ...others: (Property.PaddingRight | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.paddingRight.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.PaddingRight | CssString,
    ...others: (Property.PaddingRight | CssString)[]
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
   * s.paddingRight.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.PaddingRight | CssString,
    preferred: Property.PaddingRight | CssString,
    maximum: Property.PaddingRight | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * padding-right 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PaddingRightCss = PaddingRightCssRuntime & KeywordDeclarations<PaddingRightKeywords>;
/**
 * 设置右内边距。（padding-right）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-right
 */
export const PaddingRightCss = PaddingRightCssRuntime as new () => PaddingRightCss;

/**
 * padding-top 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PaddingTopKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.PaddingTop | CssString
>;
/**
 * 创建 padding-top 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PaddingTopKeywords()
 */
export const PaddingTopKeywords = class PaddingTopKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => PaddingTopKeywords;

/**
 * padding-top 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PaddingTopCssRuntime extends LengthCssProperty {
  /**
   * 创建 padding-top 属性作者；普通使用通过 s.paddingTop 取得共享实例。
   * @example
   * class CustomPaddingTopCss extends PaddingTopCss {}
   */
  constructor() {
    super('padding-top');
    initializeKeywordDeclarations(this, 'padding-top', globalKeywords);
  }
  /**
   * 原样生成 padding-top 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 padding-top:value;，undefined 返回空字符串。
   * @example
   * s.paddingTop.raw('inherit') // padding-top:inherit;
   */
  raw(value: Property.PaddingTop | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.paddingTop.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.paddingTop.calc('var(--value) * 2')
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
   * s.paddingTop.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.PaddingTop | CssString,
    ...others: (Property.PaddingTop | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.paddingTop.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.PaddingTop | CssString,
    ...others: (Property.PaddingTop | CssString)[]
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
   * s.paddingTop.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.PaddingTop | CssString,
    preferred: Property.PaddingTop | CssString,
    maximum: Property.PaddingTop | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * padding-top 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PaddingTopCss = PaddingTopCssRuntime & KeywordDeclarations<PaddingTopKeywords>;
/**
 * 设置上内边距。（padding-top）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/padding-top
 */
export const PaddingTopCss = PaddingTopCssRuntime as new () => PaddingTopCss;
import { autoKeywords } from './keyword-sets.js';

/**
 * page 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PageKeywords = KeywordValuesOf<typeof autoKeywords, Property.Page | CssString>;
/**
 * 创建 page 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PageKeywords()
 */
export const PageKeywords = class PageKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => PageKeywords;

/**
 * page 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PageCssRuntime extends CssProperty {
  /**
   * 创建 page 属性作者；普通使用通过 s.page 取得共享实例。
   * @example
   * class CustomPageCss extends PageCss {}
   */
  constructor() {
    super('page');
    initializeKeywordDeclarations(this, 'page', autoKeywords);
  }
  /**
   * 原样生成 page 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 page:value;，undefined 返回空字符串。
   * @example
   * s.page.raw('inherit') // page:inherit;
   */
  raw(value: Property.Page | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * page 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PageCss = PageCssRuntime & KeywordDeclarations<PageKeywords>;
/**
 * 选择分页媒体中使用的命名页面类型。（page）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/page
 */
export const PageCss = PageCssRuntime as new () => PageCss;
import { paintOrderKeywords } from './keyword-sets.js';

/**
 * paint-order 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PaintOrderKeywords = KeywordValuesOf<
  typeof paintOrderKeywords,
  Property.PaintOrder | CssString
>;
/**
 * 创建 paint-order 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PaintOrderKeywords()
 */
export const PaintOrderKeywords = class PaintOrderKeywords {
  constructor() {
    Object.assign(this, paintOrderKeywords);
  }
} as new () => PaintOrderKeywords;

/**
 * paint-order 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PaintOrderCssRuntime extends CssProperty {
  /**
   * 创建 paint-order 属性作者；普通使用通过 s.paintOrder 取得共享实例。
   * @example
   * class CustomPaintOrderCss extends PaintOrderCss {}
   */
  constructor() {
    super('paint-order');
    initializeKeywordDeclarations(this, 'paint-order', paintOrderKeywords);
  }
  /**
   * 原样生成 paint-order 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 paint-order:value;，undefined 返回空字符串。
   * @example
   * s.paintOrder.raw('inherit') // paint-order:inherit;
   */
  raw(value: Property.PaintOrder | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * paint-order 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PaintOrderCss = PaintOrderCssRuntime & KeywordDeclarations<PaintOrderKeywords>;
/**
 * 设置 SVG 填充、描边和标记的绘制先后顺序。（paint-order）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/paint-order
 */
export const PaintOrderCss = PaintOrderCssRuntime as new () => PaintOrderCss;
import { noneKeywords } from './keyword-sets.js';

/**
 * perspective 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PerspectiveKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.Perspective | CssString
>;
/**
 * 创建 perspective 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PerspectiveKeywords()
 */
export const PerspectiveKeywords = class PerspectiveKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => PerspectiveKeywords;

/**
 * perspective 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PerspectiveCssRuntime extends LengthCssProperty {
  /**
   * 创建 perspective 属性作者；普通使用通过 s.perspective 取得共享实例。
   * @example
   * class CustomPerspectiveCss extends PerspectiveCss {}
   */
  constructor() {
    super('perspective');
    initializeKeywordDeclarations(this, 'perspective', noneKeywords);
  }
  /**
   * 原样生成 perspective 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 perspective:value;，undefined 返回空字符串。
   * @example
   * s.perspective.raw('inherit') // perspective:inherit;
   */
  raw(value: Property.Perspective | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.perspective.calc('var(--value) * 2')
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
   * s.perspective.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.Perspective | CssString,
    ...others: (Property.Perspective | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.perspective.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.Perspective | CssString,
    ...others: (Property.Perspective | CssString)[]
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
   * s.perspective.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Perspective | CssString,
    preferred: Property.Perspective | CssString,
    maximum: Property.Perspective | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * perspective 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PerspectiveCss = PerspectiveCssRuntime & KeywordDeclarations<PerspectiveKeywords>;
/**
 * 设置观察子元素三维变换时的透视距离。（perspective）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective
 */
export const PerspectiveCss = PerspectiveCssRuntime as new () => PerspectiveCss;
import { backgroundPositionKeywords } from './keyword-sets.js';

/**
 * perspective-origin 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PerspectiveOriginKeywords = KeywordValuesOf<
  typeof backgroundPositionKeywords,
  Property.PerspectiveOrigin | CssString
>;
/**
 * 创建 perspective-origin 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PerspectiveOriginKeywords()
 */
export const PerspectiveOriginKeywords = class PerspectiveOriginKeywords {
  constructor() {
    Object.assign(this, backgroundPositionKeywords);
  }
} as new () => PerspectiveOriginKeywords;

/**
 * perspective-origin 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PerspectiveOriginCssRuntime extends LengthCssProperty {
  /**
   * 创建 perspective-origin 属性作者；普通使用通过 s.perspectiveOrigin 取得共享实例。
   * @example
   * class CustomPerspectiveOriginCss extends PerspectiveOriginCss {}
   */
  constructor() {
    super('perspective-origin');
    initializeKeywordDeclarations(this, 'perspective-origin', backgroundPositionKeywords);
  }
  /**
   * 原样生成 perspective-origin 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 perspective-origin:value;，undefined 返回空字符串。
   * @example
   * s.perspectiveOrigin.raw('inherit') // perspective-origin:inherit;
   */
  raw(value: Property.PerspectiveOrigin | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.perspectiveOrigin.calc('var(--value) * 2')
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
   * s.perspectiveOrigin.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.PerspectiveOrigin | CssString,
    ...others: (Property.PerspectiveOrigin | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.perspectiveOrigin.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.PerspectiveOrigin | CssString,
    ...others: (Property.PerspectiveOrigin | CssString)[]
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
   * s.perspectiveOrigin.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.PerspectiveOrigin | CssString,
    preferred: Property.PerspectiveOrigin | CssString,
    maximum: Property.PerspectiveOrigin | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * perspective-origin 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PerspectiveOriginCss = PerspectiveOriginCssRuntime &
  KeywordDeclarations<PerspectiveOriginKeywords>;
/**
 * 设置三维透视的观察原点。（perspective-origin）
 *
 * CSS 初始值：`50% 50%`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/perspective-origin
 */
export const PerspectiveOriginCss = PerspectiveOriginCssRuntime as new () => PerspectiveOriginCss;
import { alignContentKeywords } from './keyword-sets.js';

/**
 * place-content 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PlaceContentKeywords = KeywordValuesOf<
  typeof alignContentKeywords,
  Property.PlaceContent | CssString
>;
/**
 * 创建 place-content 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PlaceContentKeywords()
 */
export const PlaceContentKeywords = class PlaceContentKeywords {
  constructor() {
    Object.assign(this, alignContentKeywords);
  }
} as new () => PlaceContentKeywords;

/**
 * place-content 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PlaceContentCssRuntime extends CssProperty {
  /**
   * 创建 place-content 属性作者；普通使用通过 s.placeContent 取得共享实例。
   * @example
   * class CustomPlaceContentCss extends PlaceContentCss {}
   */
  constructor() {
    super('place-content');
    initializeKeywordDeclarations(this, 'place-content', alignContentKeywords);
  }
  /**
   * 原样生成 place-content 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 place-content:value;，undefined 返回空字符串。
   * @example
   * s.placeContent.raw('inherit') // place-content:inherit;
   */
  raw(value: Property.PlaceContent | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * place-content 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PlaceContentCss = PlaceContentCssRuntime & KeywordDeclarations<PlaceContentKeywords>;
/**
 * 同时设置 align-content 与 justify-content。（place-content）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-content
 */
export const PlaceContentCss = PlaceContentCssRuntime as new () => PlaceContentCss;
import { placeItemsKeywords } from './keyword-sets.js';

/**
 * place-items 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PlaceItemsKeywords = KeywordValuesOf<
  typeof placeItemsKeywords,
  Property.PlaceItems | CssString
>;
/**
 * 创建 place-items 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PlaceItemsKeywords()
 */
export const PlaceItemsKeywords = class PlaceItemsKeywords {
  constructor() {
    Object.assign(this, placeItemsKeywords);
  }
} as new () => PlaceItemsKeywords;

/**
 * place-items 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PlaceItemsCssRuntime extends CssProperty {
  /**
   * 创建 place-items 属性作者；普通使用通过 s.placeItems 取得共享实例。
   * @example
   * class CustomPlaceItemsCss extends PlaceItemsCss {}
   */
  constructor() {
    super('place-items');
    initializeKeywordDeclarations(this, 'place-items', placeItemsKeywords);
  }
  /**
   * 原样生成 place-items 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 place-items:value;，undefined 返回空字符串。
   * @example
   * s.placeItems.raw('inherit') // place-items:inherit;
   */
  raw(value: Property.PlaceItems | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * place-items 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PlaceItemsCss = PlaceItemsCssRuntime & KeywordDeclarations<PlaceItemsKeywords>;
/**
 * 同时设置 align-items 与 justify-items。（place-items）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-items
 */
export const PlaceItemsCss = PlaceItemsCssRuntime as new () => PlaceItemsCss;
import { placeSelfKeywords } from './keyword-sets.js';

/**
 * place-self 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PlaceSelfKeywords = KeywordValuesOf<
  typeof placeSelfKeywords,
  Property.PlaceSelf | CssString
>;
/**
 * 创建 place-self 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PlaceSelfKeywords()
 */
export const PlaceSelfKeywords = class PlaceSelfKeywords {
  constructor() {
    Object.assign(this, placeSelfKeywords);
  }
} as new () => PlaceSelfKeywords;

/**
 * place-self 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PlaceSelfCssRuntime extends CssProperty {
  /**
   * 创建 place-self 属性作者；普通使用通过 s.placeSelf 取得共享实例。
   * @example
   * class CustomPlaceSelfCss extends PlaceSelfCss {}
   */
  constructor() {
    super('place-self');
    initializeKeywordDeclarations(this, 'place-self', placeSelfKeywords);
  }
  /**
   * 原样生成 place-self 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 place-self:value;，undefined 返回空字符串。
   * @example
   * s.placeSelf.raw('inherit') // place-self:inherit;
   */
  raw(value: Property.PlaceSelf | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * place-self 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PlaceSelfCss = PlaceSelfCssRuntime & KeywordDeclarations<PlaceSelfKeywords>;
/**
 * 同时设置 align-self 与 justify-self。（place-self）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/place-self
 */
export const PlaceSelfCss = PlaceSelfCssRuntime as new () => PlaceSelfCss;
import { pointerEventsKeywords } from './keyword-sets.js';

/**
 * pointer-events 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PointerEventsKeywords = KeywordValuesOf<
  typeof pointerEventsKeywords,
  Property.PointerEvents | CssString
>;
/**
 * 创建 pointer-events 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PointerEventsKeywords()
 */
export const PointerEventsKeywords = class PointerEventsKeywords {
  constructor() {
    Object.assign(this, pointerEventsKeywords);
  }
} as new () => PointerEventsKeywords;

/**
 * pointer-events 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PointerEventsCssRuntime extends CssProperty {
  /**
   * 创建 pointer-events 属性作者；普通使用通过 s.pointerEvents 取得共享实例。
   * @example
   * class CustomPointerEventsCss extends PointerEventsCss {}
   */
  constructor() {
    super('pointer-events');
    initializeKeywordDeclarations(this, 'pointer-events', pointerEventsKeywords);
  }
  /**
   * 原样生成 pointer-events 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 pointer-events:value;，undefined 返回空字符串。
   * @example
   * s.pointerEvents.raw('inherit') // pointer-events:inherit;
   */
  raw(value: Property.PointerEvents | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * pointer-events 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PointerEventsCss = PointerEventsCssRuntime & KeywordDeclarations<PointerEventsKeywords>;
/**
 * 设置元素何时可以成为指针命中目标；SVG 还支持按填充和描边命中。（pointer-events）
 *
 * 控制指针命中，不等同于原生 disabled，也不会单独阻止键盘交互。
 *
 * 常用值：
 * - `auto`：采用当前元素类型的默认命中规则。
 * - `none`：元素本身不成为指针命中目标；不等于禁用，仍可能通过 Tab 获焦，后代也可恢复命中。
 *
 * 适用场景：允许指针穿过装饰层；可交互控件的禁用应同时处理行为和语义。
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @example
 * s.pointerEvents.none
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/pointer-events
 */
export const PointerEventsCss = PointerEventsCssRuntime as new () => PointerEventsCss;
import { positionKeywords } from './keyword-sets.js';

/**
 * position 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PositionKeywords = KeywordValuesOf<
  typeof positionKeywords,
  Property.Position | CssString
>;
/**
 * 创建 position 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PositionKeywords()
 */
export const PositionKeywords = class PositionKeywords {
  constructor() {
    Object.assign(this, positionKeywords);
  }
} as new () => PositionKeywords;

/**
 * position 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PositionCssRuntime extends CssProperty {
  /**
   * 创建 position 属性作者；普通使用通过 s.position 取得共享实例。
   * @example
   * class CustomPositionCss extends PositionCss {}
   */
  constructor() {
    super('position');
    initializeKeywordDeclarations(this, 'position', positionKeywords);
  }
  /**
   * 原样生成 position 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 position:value;，undefined 返回空字符串。
   * @example
   * s.position.raw('inherit') // position:inherit;
   */
  raw(value: Property.Position | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * position 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PositionCss = PositionCssRuntime & KeywordDeclarations<PositionKeywords>;
/**
 * 设置元素的定位方式，并决定偏移属性如何参与布局。（position）
 *
 * 偏移通常通过 top/right/bottom/left 或逻辑 inset 属性设置。fixed 和 absolute 的包含块也可能由 transform 等属性建立。
 *
 * 常用值：
 * - `static`：参与普通文档流，top/right/bottom/left 等定位偏移不生效。
 * - `relative`：保留普通流中的原位置，再按偏移移动绘制位置；不会为偏移后的区域重新排版。
 * - `absolute`：脱离普通文档流，按包含块定位；包含块通常由定位祖先或 transform 等属性建立。
 * - `fixed`：脱离普通流，通常相对视口固定；某些祖先属性会建立不同的包含块。
 * - `sticky`：保留流内位置，在滚动范围内按 inset 约束吸附。对应轴至少一个 inset 须非 auto，并受滚动祖先和包含块限制。
 *
 * 适用场景：建立定位参照、覆盖层、固定区域或滚动吸附内容。
 *
 * CSS 初始值：`static`（不同于浏览器默认样式表）。
 * @example
 * css(s.position.sticky, s.top.px(0))
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position
 */
export const PositionCss = PositionCssRuntime as new () => PositionCss;

/**
 * position-anchor 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PositionAnchorKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.PositionAnchor | CssString
>;
/**
 * 创建 position-anchor 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PositionAnchorKeywords()
 */
export const PositionAnchorKeywords = class PositionAnchorKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => PositionAnchorKeywords;

/**
 * position-anchor 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PositionAnchorCssRuntime extends CssProperty {
  /**
   * 创建 position-anchor 属性作者；普通使用通过 s.positionAnchor 取得共享实例。
   * @example
   * class CustomPositionAnchorCss extends PositionAnchorCss {}
   */
  constructor() {
    super('position-anchor');
    initializeKeywordDeclarations(this, 'position-anchor', autoKeywords);
  }
  /**
   * 原样生成 position-anchor 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 position-anchor:value;，undefined 返回空字符串。
   * @example
   * s.positionAnchor.raw('inherit') // position-anchor:inherit;
   */
  raw(value: Property.PositionAnchor | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * position-anchor 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PositionAnchorCss = PositionAnchorCssRuntime &
  KeywordDeclarations<PositionAnchorKeywords>;
/**
 * 选择绝对定位元素使用的默认锚点。（position-anchor）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-anchor
 */
export const PositionAnchorCss = PositionAnchorCssRuntime as new () => PositionAnchorCss;
import { positionAreaKeywords } from './keyword-sets.js';

/**
 * position-area 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PositionAreaKeywords = KeywordValuesOf<
  typeof positionAreaKeywords,
  Property.PositionArea | CssString
>;
/**
 * 创建 position-area 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PositionAreaKeywords()
 */
export const PositionAreaKeywords = class PositionAreaKeywords {
  constructor() {
    Object.assign(this, positionAreaKeywords);
  }
} as new () => PositionAreaKeywords;

/**
 * position-area 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PositionAreaCssRuntime extends CssProperty {
  /**
   * 创建 position-area 属性作者；普通使用通过 s.positionArea 取得共享实例。
   * @example
   * class CustomPositionAreaCss extends PositionAreaCss {}
   */
  constructor() {
    super('position-area');
    initializeKeywordDeclarations(this, 'position-area', positionAreaKeywords);
  }
  /**
   * 原样生成 position-area 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 position-area:value;，undefined 返回空字符串。
   * @example
   * s.positionArea.raw('inherit') // position-area:inherit;
   */
  raw(value: Property.PositionArea | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * position-area 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PositionAreaCss = PositionAreaCssRuntime & KeywordDeclarations<PositionAreaKeywords>;
/**
 * 选择相对于锚点的定位区域。（position-area）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-area
 */
export const PositionAreaCss = PositionAreaCssRuntime as new () => PositionAreaCss;
import { positionTryKeywords } from './keyword-sets.js';

/**
 * position-try 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PositionTryKeywords = KeywordValuesOf<
  typeof positionTryKeywords,
  Property.PositionTry | CssString
>;
/**
 * 创建 position-try 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PositionTryKeywords()
 */
export const PositionTryKeywords = class PositionTryKeywords {
  constructor() {
    Object.assign(this, positionTryKeywords);
  }
} as new () => PositionTryKeywords;

/**
 * position-try 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PositionTryCssRuntime extends CssProperty {
  /**
   * 创建 position-try 属性作者；普通使用通过 s.positionTry 取得共享实例。
   * @example
   * class CustomPositionTryCss extends PositionTryCss {}
   */
  constructor() {
    super('position-try');
    initializeKeywordDeclarations(this, 'position-try', positionTryKeywords);
  }
  /**
   * 原样生成 position-try 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 position-try:value;，undefined 返回空字符串。
   * @example
   * s.positionTry.raw('inherit') // position-try:inherit;
   */
  raw(value: Property.PositionTry | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * position-try 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PositionTryCss = PositionTryCssRuntime & KeywordDeclarations<PositionTryKeywords>;
/**
 * 同时设置锚点定位的候选回退方式及尝试顺序。（position-try）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try
 */
export const PositionTryCss = PositionTryCssRuntime as new () => PositionTryCss;

/**
 * position-try-fallbacks 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PositionTryFallbacksKeywords = KeywordValuesOf<
  typeof positionTryKeywords,
  Property.PositionTryFallbacks | CssString
>;
/**
 * 创建 position-try-fallbacks 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PositionTryFallbacksKeywords()
 */
export const PositionTryFallbacksKeywords = class PositionTryFallbacksKeywords {
  constructor() {
    Object.assign(this, positionTryKeywords);
  }
} as new () => PositionTryFallbacksKeywords;

/**
 * position-try-fallbacks 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PositionTryFallbacksCssRuntime extends CssProperty {
  /**
   * 创建 position-try-fallbacks 属性作者；普通使用通过 s.positionTryFallbacks 取得共享实例。
   * @example
   * class CustomPositionTryFallbacksCss extends PositionTryFallbacksCss {}
   */
  constructor() {
    super('position-try-fallbacks');
    initializeKeywordDeclarations(this, 'position-try-fallbacks', positionTryKeywords);
  }
  /**
   * 原样生成 position-try-fallbacks 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 position-try-fallbacks:value;，undefined 返回空字符串。
   * @example
   * s.positionTryFallbacks.raw('inherit') // position-try-fallbacks:inherit;
   */
  raw(value: Property.PositionTryFallbacks | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * position-try-fallbacks 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PositionTryFallbacksCss = PositionTryFallbacksCssRuntime &
  KeywordDeclarations<PositionTryFallbacksKeywords>;
/**
 * 设置锚点定位溢出时尝试的替代位置。（position-try-fallbacks）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-fallbacks
 */
export const PositionTryFallbacksCss =
  PositionTryFallbacksCssRuntime as new () => PositionTryFallbacksCss;
import { positionTryOrderKeywords } from './keyword-sets.js';

/**
 * position-try-order 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PositionTryOrderKeywords = KeywordValuesOf<
  typeof positionTryOrderKeywords,
  Property.PositionTryOrder | CssString
>;
/**
 * 创建 position-try-order 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PositionTryOrderKeywords()
 */
export const PositionTryOrderKeywords = class PositionTryOrderKeywords {
  constructor() {
    Object.assign(this, positionTryOrderKeywords);
  }
} as new () => PositionTryOrderKeywords;

/**
 * position-try-order 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PositionTryOrderCssRuntime extends CssProperty {
  /**
   * 创建 position-try-order 属性作者；普通使用通过 s.positionTryOrder 取得共享实例。
   * @example
   * class CustomPositionTryOrderCss extends PositionTryOrderCss {}
   */
  constructor() {
    super('position-try-order');
    initializeKeywordDeclarations(this, 'position-try-order', positionTryOrderKeywords);
  }
  /**
   * 原样生成 position-try-order 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 position-try-order:value;，undefined 返回空字符串。
   * @example
   * s.positionTryOrder.raw('inherit') // position-try-order:inherit;
   */
  raw(value: Property.PositionTryOrder | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * position-try-order 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PositionTryOrderCss = PositionTryOrderCssRuntime &
  KeywordDeclarations<PositionTryOrderKeywords>;
/**
 * 设置锚点定位候选方案的尝试顺序。（position-try-order）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-try-order
 */
export const PositionTryOrderCss = PositionTryOrderCssRuntime as new () => PositionTryOrderCss;
import { positionVisibilityKeywords } from './keyword-sets.js';

/**
 * position-visibility 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PositionVisibilityKeywords = KeywordValuesOf<
  typeof positionVisibilityKeywords,
  Property.PositionVisibility | CssString
>;
/**
 * 创建 position-visibility 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PositionVisibilityKeywords()
 */
export const PositionVisibilityKeywords = class PositionVisibilityKeywords {
  constructor() {
    Object.assign(this, positionVisibilityKeywords);
  }
} as new () => PositionVisibilityKeywords;

/**
 * position-visibility 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PositionVisibilityCssRuntime extends CssProperty {
  /**
   * 创建 position-visibility 属性作者；普通使用通过 s.positionVisibility 取得共享实例。
   * @example
   * class CustomPositionVisibilityCss extends PositionVisibilityCss {}
   */
  constructor() {
    super('position-visibility');
    initializeKeywordDeclarations(this, 'position-visibility', positionVisibilityKeywords);
  }
  /**
   * 原样生成 position-visibility 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 position-visibility:value;，undefined 返回空字符串。
   * @example
   * s.positionVisibility.raw('inherit') // position-visibility:inherit;
   */
  raw(value: Property.PositionVisibility | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * position-visibility 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PositionVisibilityCss = PositionVisibilityCssRuntime &
  KeywordDeclarations<PositionVisibilityKeywords>;
/**
 * 设置锚点定位元素根据锚点可见性和溢出情况是否显示。（position-visibility）
 *
 * CSS 初始值：`anchors-visible`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/position-visibility
 */
export const PositionVisibilityCss =
  PositionVisibilityCssRuntime as new () => PositionVisibilityCss;
import { colorAdjustKeywords } from './keyword-sets.js';

/**
 * print-color-adjust 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type PrintColorAdjustKeywords = KeywordValuesOf<
  typeof colorAdjustKeywords,
  Property.PrintColorAdjust | CssString
>;
/**
 * 创建 print-color-adjust 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new PrintColorAdjustKeywords()
 */
export const PrintColorAdjustKeywords = class PrintColorAdjustKeywords {
  constructor() {
    Object.assign(this, colorAdjustKeywords);
  }
} as new () => PrintColorAdjustKeywords;

/**
 * print-color-adjust 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class PrintColorAdjustCssRuntime extends CssProperty {
  /**
   * 创建 print-color-adjust 属性作者；普通使用通过 s.printColorAdjust 取得共享实例。
   * @example
   * class CustomPrintColorAdjustCss extends PrintColorAdjustCss {}
   */
  constructor() {
    super('print-color-adjust');
    initializeKeywordDeclarations(this, 'print-color-adjust', colorAdjustKeywords);
  }
  /**
   * 原样生成 print-color-adjust 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 print-color-adjust:value;，undefined 返回空字符串。
   * @example
   * s.printColorAdjust.raw('inherit') // print-color-adjust:inherit;
   */
  raw(value: Property.PrintColorAdjust | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * print-color-adjust 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type PrintColorAdjustCss = PrintColorAdjustCssRuntime &
  KeywordDeclarations<PrintColorAdjustKeywords>;
/**
 * 设置打印时浏览器是否可以为节墨或可读性调整颜色。（print-color-adjust）
 *
 * CSS 初始值：`economy`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
 */
export const PrintColorAdjustCss = PrintColorAdjustCssRuntime as new () => PrintColorAdjustCss;
import { autoNoneKeywords } from './keyword-sets.js';

/**
 * quotes 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type QuotesKeywords = KeywordValuesOf<typeof autoNoneKeywords, Property.Quotes | CssString>;
/**
 * 创建 quotes 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new QuotesKeywords()
 */
export const QuotesKeywords = class QuotesKeywords {
  constructor() {
    Object.assign(this, autoNoneKeywords);
  }
} as new () => QuotesKeywords;

/**
 * quotes 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class QuotesCssRuntime extends CssProperty {
  /**
   * 创建 quotes 属性作者；普通使用通过 s.quotes 取得共享实例。
   * @example
   * class CustomQuotesCss extends QuotesCss {}
   */
  constructor() {
    super('quotes');
    initializeKeywordDeclarations(this, 'quotes', autoNoneKeywords);
  }
  /**
   * 原样生成 quotes 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 quotes:value;，undefined 返回空字符串。
   * @example
   * s.quotes.raw('inherit') // quotes:inherit;
   */
  raw(value: Property.Quotes | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * quotes 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type QuotesCss = QuotesCssRuntime & KeywordDeclarations<QuotesKeywords>;
/**
 * 设置生成引号所用的开闭字符对。（quotes）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/quotes
 */
export const QuotesCss = QuotesCssRuntime as new () => QuotesCss;

/**
 * r 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type RKeywords = KeywordValuesOf<typeof globalKeywords, Property.R | CssString>;
/**
 * 创建 r 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new RKeywords()
 */
export const RKeywords = class RKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => RKeywords;

/**
 * r 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class RCssRuntime extends LengthCssProperty {
  /**
   * 创建 r 属性作者；普通使用通过 s.r 取得共享实例。
   * @example
   * class CustomRCss extends RCss {}
   */
  constructor() {
    super('r');
    initializeKeywordDeclarations(this, 'r', globalKeywords);
  }
  /**
   * 原样生成 r 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 r:value;，undefined 返回空字符串。
   * @example
   * s.r.raw('inherit') // r:inherit;
   */
  raw(value: Property.R | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.r.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.r.calc('var(--value) * 2')
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
   * s.r.min('var(--first)', 'var(--second)')
   */
  min(value: Property.R | CssString, ...others: (Property.R | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.r.max('var(--first)', 'var(--second)')
   */
  max(value: Property.R | CssString, ...others: (Property.R | CssString)[]): string {
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
   * s.r.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.R | CssString,
    preferred: Property.R | CssString,
    maximum: Property.R | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * r 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type RCss = RCssRuntime & KeywordDeclarations<RKeywords>;
/**
 * 设置 SVG 圆的半径。（r）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/r
 */
export const RCss = RCssRuntime as new () => RCss;
import { resizeKeywords } from './keyword-sets.js';

/**
 * resize 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ResizeKeywords = KeywordValuesOf<typeof resizeKeywords, Property.Resize | CssString>;
/**
 * 创建 resize 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ResizeKeywords()
 */
export const ResizeKeywords = class ResizeKeywords {
  constructor() {
    Object.assign(this, resizeKeywords);
  }
} as new () => ResizeKeywords;

/**
 * resize 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ResizeCssRuntime extends CssProperty {
  /**
   * 创建 resize 属性作者；普通使用通过 s.resize 取得共享实例。
   * @example
   * class CustomResizeCss extends ResizeCss {}
   */
  constructor() {
    super('resize');
    initializeKeywordDeclarations(this, 'resize', resizeKeywords);
  }
  /**
   * 原样生成 resize 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 resize:value;，undefined 返回空字符串。
   * @example
   * s.resize.raw('inherit') // resize:inherit;
   */
  raw(value: Property.Resize | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * resize 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ResizeCss = ResizeCssRuntime & KeywordDeclarations<ResizeKeywords>;
/**
 * 设置用户是否能调整元素尺寸以及可调整的方向。（resize）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/resize
 */
export const ResizeCss = ResizeCssRuntime as new () => ResizeCss;

/**
 * right 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type RightKeywords = KeywordValuesOf<typeof autoKeywords, Property.Right | CssString>;
/**
 * 创建 right 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new RightKeywords()
 */
export const RightKeywords = class RightKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => RightKeywords;

/**
 * right 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class RightCssRuntime extends LengthCssProperty {
  /**
   * 创建 right 属性作者；普通使用通过 s.right 取得共享实例。
   * @example
   * class CustomRightCss extends RightCss {}
   */
  constructor() {
    super('right');
    initializeKeywordDeclarations(this, 'right', autoKeywords);
  }
  /**
   * 原样生成 right 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 right:value;，undefined 返回空字符串。
   * @example
   * s.right.raw('inherit') // right:inherit;
   */
  raw(value: Property.Right | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.right.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.right.calc('var(--value) * 2')
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
   * s.right.min('var(--first)', 'var(--second)')
   */
  min(value: Property.Right | CssString, ...others: (Property.Right | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.right.max('var(--first)', 'var(--second)')
   */
  max(value: Property.Right | CssString, ...others: (Property.Right | CssString)[]): string {
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
   * s.right.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Right | CssString,
    preferred: Property.Right | CssString,
    maximum: Property.Right | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * right 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type RightCss = RightCssRuntime & KeywordDeclarations<RightKeywords>;
/**
 * 设置定位元素相对于其定位参照的右侧偏移。（right）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/right
 */
export const RightCss = RightCssRuntime as new () => RightCss;

/**
 * rotate 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type RotateKeywords = KeywordValuesOf<typeof noneKeywords, Property.Rotate | CssString>;
/**
 * 创建 rotate 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new RotateKeywords()
 */
export const RotateKeywords = class RotateKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => RotateKeywords;

/**
 * rotate 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class RotateCssRuntime extends CssProperty {
  /**
   * 创建 rotate 属性作者；普通使用通过 s.rotate 取得共享实例。
   * @example
   * class CustomRotateCss extends RotateCss {}
   */
  constructor() {
    super('rotate');
    initializeKeywordDeclarations(this, 'rotate', noneKeywords);
  }
  /**
   * 原样生成 rotate 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 rotate:value;，undefined 返回空字符串。
   * @example
   * s.rotate.raw('inherit') // rotate:inherit;
   */
  raw(value: Property.Rotate | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 deg 单位生成完整属性声明。角度，360deg 为一周。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 deg。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.rotate.deg(1)
   */
  deg(value: number): string {
    return this.declaration(`${value}deg`);
  }
  /**
   * 使用 grad 单位生成完整属性声明。百分度，400grad 为一周。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 grad。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.rotate.grad(1)
   */
  grad(value: number): string {
    return this.declaration(`${value}grad`);
  }
  /**
   * 使用 rad 单位生成完整属性声明。弧度，2πrad 为一周。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 rad。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.rotate.rad(1)
   */
  rad(value: number): string {
    return this.declaration(`${value}rad`);
  }
  /**
   * 使用 turn 单位生成完整属性声明。周数，1turn 为一周。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 turn。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.rotate.turn(1)
   */
  turn(value: number): string {
    return this.declaration(`${value}turn`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.rotate.calc('var(--value) * 2')
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
   * s.rotate.min('var(--first)', 'var(--second)')
   */
  min(value: Property.Rotate | CssString, ...others: (Property.Rotate | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.rotate.max('var(--first)', 'var(--second)')
   */
  max(value: Property.Rotate | CssString, ...others: (Property.Rotate | CssString)[]): string {
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
   * s.rotate.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Rotate | CssString,
    preferred: Property.Rotate | CssString,
    maximum: Property.Rotate | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * rotate 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type RotateCss = RotateCssRuntime & KeywordDeclarations<RotateKeywords>;
/**
 * 独立设置元素旋转，不必重写 transform 中的其他变换。（rotate）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rotate
 */
export const RotateCss = RotateCssRuntime as new () => RotateCss;
import { normalKeywords } from './keyword-sets.js';

/**
 * row-gap 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type RowGapKeywords = KeywordValuesOf<typeof normalKeywords, Property.RowGap | CssString>;
/**
 * 创建 row-gap 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new RowGapKeywords()
 */
export const RowGapKeywords = class RowGapKeywords {
  constructor() {
    Object.assign(this, normalKeywords);
  }
} as new () => RowGapKeywords;

/**
 * row-gap 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class RowGapCssRuntime extends LengthCssProperty {
  /**
   * 创建 row-gap 属性作者；普通使用通过 s.rowGap 取得共享实例。
   * @example
   * class CustomRowGapCss extends RowGapCss {}
   */
  constructor() {
    super('row-gap');
    initializeKeywordDeclarations(this, 'row-gap', normalKeywords);
  }
  /**
   * 原样生成 row-gap 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 row-gap:value;，undefined 返回空字符串。
   * @example
   * s.rowGap.raw('inherit') // row-gap:inherit;
   */
  raw(value: Property.RowGap | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.rowGap.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.rowGap.calc('var(--value) * 2')
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
   * s.rowGap.min('var(--first)', 'var(--second)')
   */
  min(value: Property.RowGap | CssString, ...others: (Property.RowGap | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.rowGap.max('var(--first)', 'var(--second)')
   */
  max(value: Property.RowGap | CssString, ...others: (Property.RowGap | CssString)[]): string {
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
   * s.rowGap.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.RowGap | CssString,
    preferred: Property.RowGap | CssString,
    maximum: Property.RowGap | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * row-gap 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type RowGapCss = RowGapCssRuntime & KeywordDeclarations<RowGapKeywords>;
/**
 * 设置布局中相邻行之间的间距。（row-gap）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/row-gap
 */
export const RowGapCss = RowGapCssRuntime as new () => RowGapCss;
import { rubyAlignKeywords } from './keyword-sets.js';

/**
 * ruby-align 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type RubyAlignKeywords = KeywordValuesOf<
  typeof rubyAlignKeywords,
  Property.RubyAlign | CssString
>;
/**
 * 创建 ruby-align 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new RubyAlignKeywords()
 */
export const RubyAlignKeywords = class RubyAlignKeywords {
  constructor() {
    Object.assign(this, rubyAlignKeywords);
  }
} as new () => RubyAlignKeywords;

/**
 * ruby-align 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class RubyAlignCssRuntime extends CssProperty {
  /**
   * 创建 ruby-align 属性作者；普通使用通过 s.rubyAlign 取得共享实例。
   * @example
   * class CustomRubyAlignCss extends RubyAlignCss {}
   */
  constructor() {
    super('ruby-align');
    initializeKeywordDeclarations(this, 'ruby-align', rubyAlignKeywords);
  }
  /**
   * 原样生成 ruby-align 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 ruby-align:value;，undefined 返回空字符串。
   * @example
   * s.rubyAlign.raw('inherit') // ruby-align:inherit;
   */
  raw(value: Property.RubyAlign | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * ruby-align 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type RubyAlignCss = RubyAlignCssRuntime & KeywordDeclarations<RubyAlignKeywords>;
/**
 * 设置注音文字与基底文字之间剩余空间的分配方式。（ruby-align）
 *
 * CSS 初始值：`space-around`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-align
 */
export const RubyAlignCss = RubyAlignCssRuntime as new () => RubyAlignCss;
import { rubyMergeKeywords } from './keyword-sets.js';

/**
 * ruby-merge 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type RubyMergeKeywords = KeywordValuesOf<
  typeof rubyMergeKeywords,
  Property.RubyMerge | CssString
>;
/**
 * 创建 ruby-merge 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new RubyMergeKeywords()
 */
export const RubyMergeKeywords = class RubyMergeKeywords {
  constructor() {
    Object.assign(this, rubyMergeKeywords);
  }
} as new () => RubyMergeKeywords;

/**
 * ruby-merge 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class RubyMergeCssRuntime extends CssProperty {
  /**
   * 创建 ruby-merge 属性作者；普通使用通过 s.rubyMerge 取得共享实例。
   * @example
   * class CustomRubyMergeCss extends RubyMergeCss {}
   */
  constructor() {
    super('ruby-merge');
    initializeKeywordDeclarations(this, 'ruby-merge', rubyMergeKeywords);
  }
  /**
   * 原样生成 ruby-merge 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 ruby-merge:value;，undefined 返回空字符串。
   * @example
   * s.rubyMerge.raw('inherit') // ruby-merge:inherit;
   */
  raw(value: Property.RubyMerge | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * ruby-merge 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type RubyMergeCss = RubyMergeCssRuntime & KeywordDeclarations<RubyMergeKeywords>;
/**
 * 设置相邻注音容器的合并方式；使用前核对目标浏览器。（ruby-merge）
 *
 * CSS 初始值：`separate`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-merge
 */
export const RubyMergeCss = RubyMergeCssRuntime as new () => RubyMergeCss;

/**
 * ruby-overhang 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type RubyOverhangKeywords = KeywordValuesOf<
  typeof autoNoneKeywords,
  Property.RubyOverhang | CssString
>;
/**
 * 创建 ruby-overhang 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new RubyOverhangKeywords()
 */
export const RubyOverhangKeywords = class RubyOverhangKeywords {
  constructor() {
    Object.assign(this, autoNoneKeywords);
  }
} as new () => RubyOverhangKeywords;

/**
 * ruby-overhang 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class RubyOverhangCssRuntime extends CssProperty {
  /**
   * 创建 ruby-overhang 属性作者；普通使用通过 s.rubyOverhang 取得共享实例。
   * @example
   * class CustomRubyOverhangCss extends RubyOverhangCss {}
   */
  constructor() {
    super('ruby-overhang');
    initializeKeywordDeclarations(this, 'ruby-overhang', autoNoneKeywords);
  }
  /**
   * 原样生成 ruby-overhang 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 ruby-overhang:value;，undefined 返回空字符串。
   * @example
   * s.rubyOverhang.raw('inherit') // ruby-overhang:inherit;
   */
  raw(value: Property.RubyOverhang | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * ruby-overhang 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type RubyOverhangCss = RubyOverhangCssRuntime & KeywordDeclarations<RubyOverhangKeywords>;
/**
 * 控制注音文字是否可以悬伸到相邻文本上方。（ruby-overhang）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-overhang
 */
export const RubyOverhangCss = RubyOverhangCssRuntime as new () => RubyOverhangCss;
import { rubyPositionKeywords } from './keyword-sets.js';

/**
 * ruby-position 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type RubyPositionKeywords = KeywordValuesOf<
  typeof rubyPositionKeywords,
  Property.RubyPosition | CssString
>;
/**
 * 创建 ruby-position 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new RubyPositionKeywords()
 */
export const RubyPositionKeywords = class RubyPositionKeywords {
  constructor() {
    Object.assign(this, rubyPositionKeywords);
  }
} as new () => RubyPositionKeywords;

/**
 * ruby-position 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class RubyPositionCssRuntime extends CssProperty {
  /**
   * 创建 ruby-position 属性作者；普通使用通过 s.rubyPosition 取得共享实例。
   * @example
   * class CustomRubyPositionCss extends RubyPositionCss {}
   */
  constructor() {
    super('ruby-position');
    initializeKeywordDeclarations(this, 'ruby-position', rubyPositionKeywords);
  }
  /**
   * 原样生成 ruby-position 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 ruby-position:value;，undefined 返回空字符串。
   * @example
   * s.rubyPosition.raw('inherit') // ruby-position:inherit;
   */
  raw(value: Property.RubyPosition | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * ruby-position 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type RubyPositionCss = RubyPositionCssRuntime & KeywordDeclarations<RubyPositionKeywords>;
/**
 * 设置注音文字相对于基底文字的位置。（ruby-position）
 *
 * CSS 初始值：`alternate`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ruby-position
 */
export const RubyPositionCss = RubyPositionCssRuntime as new () => RubyPositionCss;

/**
 * rx 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type RxKeywords = KeywordValuesOf<typeof globalKeywords, Property.Rx | CssString>;
/**
 * 创建 rx 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new RxKeywords()
 */
export const RxKeywords = class RxKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => RxKeywords;

/**
 * rx 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class RxCssRuntime extends LengthCssProperty {
  /**
   * 创建 rx 属性作者；普通使用通过 s.rx 取得共享实例。
   * @example
   * class CustomRxCss extends RxCss {}
   */
  constructor() {
    super('rx');
    initializeKeywordDeclarations(this, 'rx', globalKeywords);
  }
  /**
   * 原样生成 rx 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 rx:value;，undefined 返回空字符串。
   * @example
   * s.rx.raw('inherit') // rx:inherit;
   */
  raw(value: Property.Rx | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.rx.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.rx.calc('var(--value) * 2')
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
   * s.rx.min('var(--first)', 'var(--second)')
   */
  min(value: Property.Rx | CssString, ...others: (Property.Rx | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.rx.max('var(--first)', 'var(--second)')
   */
  max(value: Property.Rx | CssString, ...others: (Property.Rx | CssString)[]): string {
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
   * s.rx.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Rx | CssString,
    preferred: Property.Rx | CssString,
    maximum: Property.Rx | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * rx 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type RxCss = RxCssRuntime & KeywordDeclarations<RxKeywords>;
/**
 * 设置 SVG 椭圆的水平半径，或矩形的水平圆角半径。（rx）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/rx
 */
export const RxCss = RxCssRuntime as new () => RxCss;

/**
 * ry 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type RyKeywords = KeywordValuesOf<typeof globalKeywords, Property.Ry | CssString>;
/**
 * 创建 ry 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new RyKeywords()
 */
export const RyKeywords = class RyKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => RyKeywords;

/**
 * ry 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class RyCssRuntime extends LengthCssProperty {
  /**
   * 创建 ry 属性作者；普通使用通过 s.ry 取得共享实例。
   * @example
   * class CustomRyCss extends RyCss {}
   */
  constructor() {
    super('ry');
    initializeKeywordDeclarations(this, 'ry', globalKeywords);
  }
  /**
   * 原样生成 ry 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 ry:value;，undefined 返回空字符串。
   * @example
   * s.ry.raw('inherit') // ry:inherit;
   */
  raw(value: Property.Ry | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.ry.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.ry.calc('var(--value) * 2')
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
   * s.ry.min('var(--first)', 'var(--second)')
   */
  min(value: Property.Ry | CssString, ...others: (Property.Ry | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.ry.max('var(--first)', 'var(--second)')
   */
  max(value: Property.Ry | CssString, ...others: (Property.Ry | CssString)[]): string {
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
   * s.ry.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Ry | CssString,
    preferred: Property.Ry | CssString,
    maximum: Property.Ry | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * ry 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type RyCss = RyCssRuntime & KeywordDeclarations<RyKeywords>;
/**
 * 设置 SVG 椭圆的垂直半径，或矩形的垂直圆角半径。（ry）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/ry
 */
export const RyCss = RyCssRuntime as new () => RyCss;
