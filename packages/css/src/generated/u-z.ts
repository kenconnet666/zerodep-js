// 由 scripts/generate-css-author.mjs 从 csstype@3.2.3 生成；请勿手改。
// 来源许可见 packages/css/THIRD_PARTY_NOTICES.md。
import type { Property } from 'csstype';
import { CssProperty, LengthCssProperty, type CssString } from './base.js';
import { initializeKeywordDeclarations } from '../theme/keyword-data.js';
import type { KeywordDeclarations, KeywordValuesOf } from '../theme/keyword-source.js';
// 关键字是实例上的声明字符串；系统实例按属性链惰性创建并共享。
import { unicodeBidiKeywords } from './keyword-sets.js';

/**
 * unicode-bidi 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type UnicodeBidiKeywords = KeywordValuesOf<
  typeof unicodeBidiKeywords,
  Property.UnicodeBidi | CssString
>;
/**
 * 创建 unicode-bidi 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new UnicodeBidiKeywords()
 */
export const UnicodeBidiKeywords = class UnicodeBidiKeywords {
  constructor() {
    Object.assign(this, unicodeBidiKeywords);
  }
} as new () => UnicodeBidiKeywords;

/**
 * unicode-bidi 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class UnicodeBidiCssRuntime extends CssProperty {
  /**
   * 创建 unicode-bidi 属性作者；普通使用通过 s.unicodeBidi 取得共享实例。
   * @example
   * class CustomUnicodeBidiCss extends UnicodeBidiCss {}
   */
  constructor() {
    super('unicode-bidi');
    initializeKeywordDeclarations(this, 'unicode-bidi', unicodeBidiKeywords);
  }
  /**
   * 原样生成 unicode-bidi 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 unicode-bidi:value;，undefined 返回空字符串。
   * @example
   * s.unicodeBidi.raw('inherit') // unicode-bidi:inherit;
   */
  raw(value: Property.UnicodeBidi | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * unicode-bidi 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type UnicodeBidiCss = UnicodeBidiCssRuntime & KeywordDeclarations<UnicodeBidiKeywords>;
/**
 * 设置元素如何参与 Unicode 双向文本算法，通常与 direction 配合。（unicode-bidi）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/unicode-bidi
 */
export const UnicodeBidiCss = UnicodeBidiCssRuntime as new () => UnicodeBidiCss;
import { userSelectKeywords } from './keyword-sets.js';

/**
 * user-select 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type UserSelectKeywords = KeywordValuesOf<
  typeof userSelectKeywords,
  Property.UserSelect | CssString
>;
/**
 * 创建 user-select 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new UserSelectKeywords()
 */
export const UserSelectKeywords = class UserSelectKeywords {
  constructor() {
    Object.assign(this, userSelectKeywords);
  }
} as new () => UserSelectKeywords;

/**
 * user-select 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class UserSelectCssRuntime extends CssProperty {
  /**
   * 创建 user-select 属性作者；普通使用通过 s.userSelect 取得共享实例。
   * @example
   * class CustomUserSelectCss extends UserSelectCss {}
   */
  constructor() {
    super('user-select');
    initializeKeywordDeclarations(this, 'user-select', userSelectKeywords);
  }
  /**
   * 原样生成 user-select 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 user-select:value;，undefined 返回空字符串。
   * @example
   * s.userSelect.raw('inherit') // user-select:inherit;
   */
  raw(value: Property.UserSelect | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * user-select 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type UserSelectCss = UserSelectCssRuntime & KeywordDeclarations<UserSelectKeywords>;
/**
 * 设置用户是否可以选取元素中的文本。（user-select）
 *
 * 常用值：
 * - `auto`：由父级与元素上下文决定使用的选取行为。
 * - `text`：允许文本选取。
 * - `none`：阻止常规文本选取，不是内容保护或访问控制。
 * - `all`：将元素内容作为整体选取单元。
 *
 * 适用场景：调整拖拽控件中的文本选取，或让代码片段整段选中。
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @example
 * s.userSelect.all
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/user-select
 */
export const UserSelectCss = UserSelectCssRuntime as new () => UserSelectCss;
import { vectorEffectKeywords } from './keyword-sets.js';

/**
 * vector-effect 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type VectorEffectKeywords = KeywordValuesOf<
  typeof vectorEffectKeywords,
  Property.VectorEffect | CssString
>;
/**
 * 创建 vector-effect 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new VectorEffectKeywords()
 */
export const VectorEffectKeywords = class VectorEffectKeywords {
  constructor() {
    Object.assign(this, vectorEffectKeywords);
  }
} as new () => VectorEffectKeywords;

/**
 * vector-effect 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class VectorEffectCssRuntime extends CssProperty {
  /**
   * 创建 vector-effect 属性作者；普通使用通过 s.vectorEffect 取得共享实例。
   * @example
   * class CustomVectorEffectCss extends VectorEffectCss {}
   */
  constructor() {
    super('vector-effect');
    initializeKeywordDeclarations(this, 'vector-effect', vectorEffectKeywords);
  }
  /**
   * 原样生成 vector-effect 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 vector-effect:value;，undefined 返回空字符串。
   * @example
   * s.vectorEffect.raw('inherit') // vector-effect:inherit;
   */
  raw(value: Property.VectorEffect | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * vector-effect 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type VectorEffectCss = VectorEffectCssRuntime & KeywordDeclarations<VectorEffectKeywords>;
/**
 * 设置 SVG 图形变换时对描边等矢量效果的处理。（vector-effect）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vector-effect
 */
export const VectorEffectCss = VectorEffectCssRuntime as new () => VectorEffectCss;
import { verticalAlignKeywords } from './keyword-sets.js';

/**
 * vertical-align 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type VerticalAlignKeywords = KeywordValuesOf<
  typeof verticalAlignKeywords,
  Property.VerticalAlign | CssString
>;
/**
 * 创建 vertical-align 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new VerticalAlignKeywords()
 */
export const VerticalAlignKeywords = class VerticalAlignKeywords {
  constructor() {
    Object.assign(this, verticalAlignKeywords);
  }
} as new () => VerticalAlignKeywords;

/**
 * vertical-align 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class VerticalAlignCssRuntime extends LengthCssProperty {
  /**
   * 创建 vertical-align 属性作者；普通使用通过 s.verticalAlign 取得共享实例。
   * @example
   * class CustomVerticalAlignCss extends VerticalAlignCss {}
   */
  constructor() {
    super('vertical-align');
    initializeKeywordDeclarations(this, 'vertical-align', verticalAlignKeywords);
  }
  /**
   * 原样生成 vertical-align 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 vertical-align:value;，undefined 返回空字符串。
   * @example
   * s.verticalAlign.raw('inherit') // vertical-align:inherit;
   */
  raw(value: Property.VerticalAlign | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.verticalAlign.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.verticalAlign.calc('var(--value) * 2')
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
   * s.verticalAlign.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.VerticalAlign | CssString,
    ...others: (Property.VerticalAlign | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.verticalAlign.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.VerticalAlign | CssString,
    ...others: (Property.VerticalAlign | CssString)[]
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
   * s.verticalAlign.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.VerticalAlign | CssString,
    preferred: Property.VerticalAlign | CssString,
    maximum: Property.VerticalAlign | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * vertical-align 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type VerticalAlignCss = VerticalAlignCssRuntime & KeywordDeclarations<VerticalAlignKeywords>;
/**
 * 设置行内级盒子或表格单元格的垂直对齐，不用于普通块盒居中。（vertical-align）
 *
 * CSS 初始值：`baseline`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/vertical-align
 */
export const VerticalAlignCss = VerticalAlignCssRuntime as new () => VerticalAlignCss;
import { noneKeywords } from './keyword-sets.js';

/**
 * view-timeline 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ViewTimelineKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.ViewTimeline | CssString
>;
/**
 * 创建 view-timeline 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ViewTimelineKeywords()
 */
export const ViewTimelineKeywords = class ViewTimelineKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => ViewTimelineKeywords;

/**
 * view-timeline 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ViewTimelineCssRuntime extends CssProperty {
  /**
   * 创建 view-timeline 属性作者；普通使用通过 s.viewTimeline 取得共享实例。
   * @example
   * class CustomViewTimelineCss extends ViewTimelineCss {}
   */
  constructor() {
    super('view-timeline');
    initializeKeywordDeclarations(this, 'view-timeline', noneKeywords);
  }
  /**
   * 原样生成 view-timeline 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 view-timeline:value;，undefined 返回空字符串。
   * @example
   * s.viewTimeline.raw('inherit') // view-timeline:inherit;
   */
  raw(value: Property.ViewTimeline | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * view-timeline 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ViewTimelineCss = ViewTimelineCssRuntime & KeywordDeclarations<ViewTimelineKeywords>;
/**
 * 同时声明基于元素可见进度的时间线名称与轴。（view-timeline）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline
 */
export const ViewTimelineCss = ViewTimelineCssRuntime as new () => ViewTimelineCss;
import { scrollTimelineAxisKeywords } from './keyword-sets.js';

/**
 * view-timeline-axis 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ViewTimelineAxisKeywords = KeywordValuesOf<
  typeof scrollTimelineAxisKeywords,
  Property.ViewTimelineAxis | CssString
>;
/**
 * 创建 view-timeline-axis 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ViewTimelineAxisKeywords()
 */
export const ViewTimelineAxisKeywords = class ViewTimelineAxisKeywords {
  constructor() {
    Object.assign(this, scrollTimelineAxisKeywords);
  }
} as new () => ViewTimelineAxisKeywords;

/**
 * view-timeline-axis 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ViewTimelineAxisCssRuntime extends CssProperty {
  /**
   * 创建 view-timeline-axis 属性作者；普通使用通过 s.viewTimelineAxis 取得共享实例。
   * @example
   * class CustomViewTimelineAxisCss extends ViewTimelineAxisCss {}
   */
  constructor() {
    super('view-timeline-axis');
    initializeKeywordDeclarations(this, 'view-timeline-axis', scrollTimelineAxisKeywords);
  }
  /**
   * 原样生成 view-timeline-axis 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 view-timeline-axis:value;，undefined 返回空字符串。
   * @example
   * s.viewTimelineAxis.raw('inherit') // view-timeline-axis:inherit;
   */
  raw(value: Property.ViewTimelineAxis | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * view-timeline-axis 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ViewTimelineAxisCss = ViewTimelineAxisCssRuntime &
  KeywordDeclarations<ViewTimelineAxisKeywords>;
/**
 * 设置可见进度时间线所观察的滚动轴。（view-timeline-axis）
 *
 * CSS 初始值：`block`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-axis
 */
export const ViewTimelineAxisCss = ViewTimelineAxisCssRuntime as new () => ViewTimelineAxisCss;
import { autoKeywords } from './keyword-sets.js';

/**
 * view-timeline-inset 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ViewTimelineInsetKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ViewTimelineInset | CssString
>;
/**
 * 创建 view-timeline-inset 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ViewTimelineInsetKeywords()
 */
export const ViewTimelineInsetKeywords = class ViewTimelineInsetKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ViewTimelineInsetKeywords;

/**
 * view-timeline-inset 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ViewTimelineInsetCssRuntime extends LengthCssProperty {
  /**
   * 创建 view-timeline-inset 属性作者；普通使用通过 s.viewTimelineInset 取得共享实例。
   * @example
   * class CustomViewTimelineInsetCss extends ViewTimelineInsetCss {}
   */
  constructor() {
    super('view-timeline-inset');
    initializeKeywordDeclarations(this, 'view-timeline-inset', autoKeywords);
  }
  /**
   * 原样生成 view-timeline-inset 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 view-timeline-inset:value;，undefined 返回空字符串。
   * @example
   * s.viewTimelineInset.raw('inherit') // view-timeline-inset:inherit;
   */
  raw(value: Property.ViewTimelineInset | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.px(1)
   */
  px(value1: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 px。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.px(1, 2)
   */
  px(value1: number, value2: number): string;
  override px(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}px`).join(' '));
  }
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cm(1)
   */
  cm(value1: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 cm。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cm(1, 2)
   */
  cm(value1: number, value2: number): string;
  override cm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cm`).join(' '));
  }
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.mm(1)
   */
  mm(value1: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 mm。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.mm(1, 2)
   */
  mm(value1: number, value2: number): string;
  override mm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}mm`).join(' '));
  }
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.q(1)
   */
  q(value1: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 q。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.q(1, 2)
   */
  q(value1: number, value2: number): string;
  override q(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}q`).join(' '));
  }
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.in(1)
   */
  in(value1: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 in。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.in(1, 2)
   */
  in(value1: number, value2: number): string;
  override in(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}in`).join(' '));
  }
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.pt(1)
   */
  pt(value1: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 pt。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.pt(1, 2)
   */
  pt(value1: number, value2: number): string;
  override pt(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pt`).join(' '));
  }
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.pc(1)
   */
  pc(value1: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 pc。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.pc(1, 2)
   */
  pc(value1: number, value2: number): string;
  override pc(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pc`).join(' '));
  }
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.em(1)
   */
  em(value1: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 em。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.em(1, 2)
   */
  em(value1: number, value2: number): string;
  override em(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}em`).join(' '));
  }
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.rem(1)
   */
  rem(value1: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 rem。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.rem(1, 2)
   */
  rem(value1: number, value2: number): string;
  override rem(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rem`).join(' '));
  }
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.ex(1)
   */
  ex(value1: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 ex。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.ex(1, 2)
   */
  ex(value1: number, value2: number): string;
  override ex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ex`).join(' '));
  }
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.rex(1)
   */
  rex(value1: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 rex。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.rex(1, 2)
   */
  rex(value1: number, value2: number): string;
  override rex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rex`).join(' '));
  }
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.ch(1)
   */
  ch(value1: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 ch。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.ch(1, 2)
   */
  ch(value1: number, value2: number): string;
  override ch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ch`).join(' '));
  }
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.rch(1)
   */
  rch(value1: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 rch。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.rch(1, 2)
   */
  rch(value1: number, value2: number): string;
  override rch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rch`).join(' '));
  }
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cap(1)
   */
  cap(value1: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 cap。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cap(1, 2)
   */
  cap(value1: number, value2: number): string;
  override cap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cap`).join(' '));
  }
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.rcap(1)
   */
  rcap(value1: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 rcap。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.rcap(1, 2)
   */
  rcap(value1: number, value2: number): string;
  override rcap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rcap`).join(' '));
  }
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.ic(1)
   */
  ic(value1: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 ic。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.ic(1, 2)
   */
  ic(value1: number, value2: number): string;
  override ic(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ic`).join(' '));
  }
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.ric(1)
   */
  ric(value1: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 ric。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.ric(1, 2)
   */
  ric(value1: number, value2: number): string;
  override ric(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ric`).join(' '));
  }
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.lh(1)
   */
  lh(value1: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 lh。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.lh(1, 2)
   */
  lh(value1: number, value2: number): string;
  override lh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lh`).join(' '));
  }
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.rlh(1)
   */
  rlh(value1: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 rlh。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.rlh(1, 2)
   */
  rlh(value1: number, value2: number): string;
  override rlh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rlh`).join(' '));
  }
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.vw(1)
   */
  vw(value1: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 vw。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.vw(1, 2)
   */
  vw(value1: number, value2: number): string;
  override vw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vw`).join(' '));
  }
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.vh(1)
   */
  vh(value1: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 vh。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.vh(1, 2)
   */
  vh(value1: number, value2: number): string;
  override vh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vh`).join(' '));
  }
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.vi(1)
   */
  vi(value1: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 vi。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.vi(1, 2)
   */
  vi(value1: number, value2: number): string;
  override vi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vi`).join(' '));
  }
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.vb(1)
   */
  vb(value1: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 vb。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.vb(1, 2)
   */
  vb(value1: number, value2: number): string;
  override vb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vb`).join(' '));
  }
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.vmin(1)
   */
  vmin(value1: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 vmin。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.vmin(1, 2)
   */
  vmin(value1: number, value2: number): string;
  override vmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmin`).join(' '));
  }
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.vmax(1)
   */
  vmax(value1: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 vmax。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.vmax(1, 2)
   */
  vmax(value1: number, value2: number): string;
  override vmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmax`).join(' '));
  }
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.svw(1)
   */
  svw(value1: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 svw。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.svw(1, 2)
   */
  svw(value1: number, value2: number): string;
  override svw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svw`).join(' '));
  }
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.svh(1)
   */
  svh(value1: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 svh。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.svh(1, 2)
   */
  svh(value1: number, value2: number): string;
  override svh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svh`).join(' '));
  }
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.svi(1)
   */
  svi(value1: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 svi。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.svi(1, 2)
   */
  svi(value1: number, value2: number): string;
  override svi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svi`).join(' '));
  }
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.svb(1)
   */
  svb(value1: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 svb。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.svb(1, 2)
   */
  svb(value1: number, value2: number): string;
  override svb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svb`).join(' '));
  }
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.svmin(1)
   */
  svmin(value1: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 svmin。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.svmin(1, 2)
   */
  svmin(value1: number, value2: number): string;
  override svmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmin`).join(' '));
  }
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.svmax(1)
   */
  svmax(value1: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 svmax。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.svmax(1, 2)
   */
  svmax(value1: number, value2: number): string;
  override svmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmax`).join(' '));
  }
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.lvw(1)
   */
  lvw(value1: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 lvw。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.lvw(1, 2)
   */
  lvw(value1: number, value2: number): string;
  override lvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvw`).join(' '));
  }
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.lvh(1)
   */
  lvh(value1: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 lvh。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.lvh(1, 2)
   */
  lvh(value1: number, value2: number): string;
  override lvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvh`).join(' '));
  }
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.lvi(1)
   */
  lvi(value1: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 lvi。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.lvi(1, 2)
   */
  lvi(value1: number, value2: number): string;
  override lvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvi`).join(' '));
  }
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.lvb(1)
   */
  lvb(value1: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 lvb。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.lvb(1, 2)
   */
  lvb(value1: number, value2: number): string;
  override lvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvb`).join(' '));
  }
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.lvmin(1)
   */
  lvmin(value1: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 lvmin。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.lvmin(1, 2)
   */
  lvmin(value1: number, value2: number): string;
  override lvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmin`).join(' '));
  }
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.lvmax(1)
   */
  lvmax(value1: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 lvmax。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.lvmax(1, 2)
   */
  lvmax(value1: number, value2: number): string;
  override lvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmax`).join(' '));
  }
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.dvw(1)
   */
  dvw(value1: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 dvw。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.dvw(1, 2)
   */
  dvw(value1: number, value2: number): string;
  override dvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvw`).join(' '));
  }
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.dvh(1)
   */
  dvh(value1: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 dvh。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.dvh(1, 2)
   */
  dvh(value1: number, value2: number): string;
  override dvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvh`).join(' '));
  }
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.dvi(1)
   */
  dvi(value1: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 dvi。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.dvi(1, 2)
   */
  dvi(value1: number, value2: number): string;
  override dvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvi`).join(' '));
  }
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.dvb(1)
   */
  dvb(value1: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 dvb。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.dvb(1, 2)
   */
  dvb(value1: number, value2: number): string;
  override dvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvb`).join(' '));
  }
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.dvmin(1)
   */
  dvmin(value1: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 dvmin。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.dvmin(1, 2)
   */
  dvmin(value1: number, value2: number): string;
  override dvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmin`).join(' '));
  }
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.dvmax(1)
   */
  dvmax(value1: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 dvmax。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.dvmax(1, 2)
   */
  dvmax(value1: number, value2: number): string;
  override dvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmax`).join(' '));
  }
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cqw(1)
   */
  cqw(value1: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 cqw。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cqw(1, 2)
   */
  cqw(value1: number, value2: number): string;
  override cqw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqw`).join(' '));
  }
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cqh(1)
   */
  cqh(value1: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 cqh。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cqh(1, 2)
   */
  cqh(value1: number, value2: number): string;
  override cqh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqh`).join(' '));
  }
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cqi(1)
   */
  cqi(value1: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 cqi。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cqi(1, 2)
   */
  cqi(value1: number, value2: number): string;
  override cqi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqi`).join(' '));
  }
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cqb(1)
   */
  cqb(value1: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 cqb。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cqb(1, 2)
   */
  cqb(value1: number, value2: number): string;
  override cqb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqb`).join(' '));
  }
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cqmin(1)
   */
  cqmin(value1: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 cqmin。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cqmin(1, 2)
   */
  cqmin(value1: number, value2: number): string;
  override cqmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmin`).join(' '));
  }
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cqmax(1)
   */
  cqmax(value1: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 cqmax。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.cqmax(1, 2)
   */
  cqmax(value1: number, value2: number): string;
  override cqmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmax`).join(' '));
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩与时间线可见范围结束侧内缩的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.percent(1)
   */
  percent(value1: number): string;
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 时间线可见范围起始侧内缩的数值，自动附加 %。
   * @param value2 时间线可见范围结束侧内缩的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.viewTimelineInset.percent(1, 2)
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
   * s.viewTimelineInset.calc('var(--value) * 2')
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
   * s.viewTimelineInset.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ViewTimelineInset | CssString,
    ...others: (Property.ViewTimelineInset | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.viewTimelineInset.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ViewTimelineInset | CssString,
    ...others: (Property.ViewTimelineInset | CssString)[]
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
   * s.viewTimelineInset.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ViewTimelineInset | CssString,
    preferred: Property.ViewTimelineInset | CssString,
    maximum: Property.ViewTimelineInset | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * view-timeline-inset 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ViewTimelineInsetCss = ViewTimelineInsetCssRuntime &
  KeywordDeclarations<ViewTimelineInsetKeywords>;
/**
 * 设置可见进度时间线使用的滚动视口内缩范围。（view-timeline-inset）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-inset
 */
export const ViewTimelineInsetCss = ViewTimelineInsetCssRuntime as new () => ViewTimelineInsetCss;

/**
 * view-timeline-name 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ViewTimelineNameKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.ViewTimelineName | CssString
>;
/**
 * 创建 view-timeline-name 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ViewTimelineNameKeywords()
 */
export const ViewTimelineNameKeywords = class ViewTimelineNameKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => ViewTimelineNameKeywords;

/**
 * view-timeline-name 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ViewTimelineNameCssRuntime extends CssProperty {
  /**
   * 创建 view-timeline-name 属性作者；普通使用通过 s.viewTimelineName 取得共享实例。
   * @example
   * class CustomViewTimelineNameCss extends ViewTimelineNameCss {}
   */
  constructor() {
    super('view-timeline-name');
    initializeKeywordDeclarations(this, 'view-timeline-name', noneKeywords);
  }
  /**
   * 原样生成 view-timeline-name 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 view-timeline-name:value;，undefined 返回空字符串。
   * @example
   * s.viewTimelineName.raw('inherit') // view-timeline-name:inherit;
   */
  raw(value: Property.ViewTimelineName | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * view-timeline-name 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ViewTimelineNameCss = ViewTimelineNameCssRuntime &
  KeywordDeclarations<ViewTimelineNameKeywords>;
/**
 * 声明基于元素进入和离开滚动视口的时间线名称。（view-timeline-name）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-timeline-name
 */
export const ViewTimelineNameCss = ViewTimelineNameCssRuntime as new () => ViewTimelineNameCss;

/**
 * view-transition-class 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ViewTransitionClassKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.ViewTransitionClass | CssString
>;
/**
 * 创建 view-transition-class 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ViewTransitionClassKeywords()
 */
export const ViewTransitionClassKeywords = class ViewTransitionClassKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => ViewTransitionClassKeywords;

/**
 * view-transition-class 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ViewTransitionClassCssRuntime extends CssProperty {
  /**
   * 创建 view-transition-class 属性作者；普通使用通过 s.viewTransitionClass 取得共享实例。
   * @example
   * class CustomViewTransitionClassCss extends ViewTransitionClassCss {}
   */
  constructor() {
    super('view-transition-class');
    initializeKeywordDeclarations(this, 'view-transition-class', noneKeywords);
  }
  /**
   * 原样生成 view-transition-class 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 view-transition-class:value;，undefined 返回空字符串。
   * @example
   * s.viewTransitionClass.raw('inherit') // view-transition-class:inherit;
   */
  raw(value: Property.ViewTransitionClass | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * view-transition-class 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ViewTransitionClassCss = ViewTransitionClassCssRuntime &
  KeywordDeclarations<ViewTransitionClassKeywords>;
/**
 * 为视图过渡的快照伪元素分组，以便共用样式。（view-transition-class）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-class
 */
export const ViewTransitionClassCss =
  ViewTransitionClassCssRuntime as new () => ViewTransitionClassCss;
import { viewTransitionNameKeywords } from './keyword-sets.js';

/**
 * view-transition-name 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ViewTransitionNameKeywords = KeywordValuesOf<
  typeof viewTransitionNameKeywords,
  Property.ViewTransitionName | CssString
>;
/**
 * 创建 view-transition-name 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ViewTransitionNameKeywords()
 */
export const ViewTransitionNameKeywords = class ViewTransitionNameKeywords {
  constructor() {
    Object.assign(this, viewTransitionNameKeywords);
  }
} as new () => ViewTransitionNameKeywords;

/**
 * view-transition-name 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ViewTransitionNameCssRuntime extends CssProperty {
  /**
   * 创建 view-transition-name 属性作者；普通使用通过 s.viewTransitionName 取得共享实例。
   * @example
   * class CustomViewTransitionNameCss extends ViewTransitionNameCss {}
   */
  constructor() {
    super('view-transition-name');
    initializeKeywordDeclarations(this, 'view-transition-name', viewTransitionNameKeywords);
  }
  /**
   * 原样生成 view-transition-name 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 view-transition-name:value;，undefined 返回空字符串。
   * @example
   * s.viewTransitionName.raw('inherit') // view-transition-name:inherit;
   */
  raw(value: Property.ViewTransitionName | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * view-transition-name 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ViewTransitionNameCss = ViewTransitionNameCssRuntime &
  KeywordDeclarations<ViewTransitionNameKeywords>;
/**
 * 为视图过渡中的元素命名，以匹配前后状态的快照。（view-transition-name）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/view-transition-name
 */
export const ViewTransitionNameCss =
  ViewTransitionNameCssRuntime as new () => ViewTransitionNameCss;
import { visibilityKeywords } from './keyword-sets.js';

/**
 * visibility 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type VisibilityKeywords = KeywordValuesOf<
  typeof visibilityKeywords,
  Property.Visibility | CssString
>;
/**
 * 创建 visibility 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new VisibilityKeywords()
 */
export const VisibilityKeywords = class VisibilityKeywords {
  constructor() {
    Object.assign(this, visibilityKeywords);
  }
} as new () => VisibilityKeywords;

/**
 * visibility 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class VisibilityCssRuntime extends CssProperty {
  /**
   * 创建 visibility 属性作者；普通使用通过 s.visibility 取得共享实例。
   * @example
   * class CustomVisibilityCss extends VisibilityCss {}
   */
  constructor() {
    super('visibility');
    initializeKeywordDeclarations(this, 'visibility', visibilityKeywords);
  }
  /**
   * 原样生成 visibility 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 visibility:value;，undefined 返回空字符串。
   * @example
   * s.visibility.raw('inherit') // visibility:inherit;
   */
  raw(value: Property.Visibility | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * visibility 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type VisibilityCss = VisibilityCssRuntime & KeywordDeclarations<VisibilityKeywords>;
/**
 * 设置元素是否可见；隐藏通常保留布局空间。（visibility）
 *
 * 常用值：
 * - `visible`：正常显示元素。
 * - `hidden`：隐藏绘制但通常保留布局空间；后代可显式恢复 visible。
 * - `collapse`：对表格行列等特定布局有折叠语义，其他场景通常类似 hidden；应核对具体布局行为。
 *
 * 适用场景：需要隐藏内容但通常保留其布局占位的场景。
 *
 * CSS 初始值：`visible`（不同于浏览器默认样式表）。
 * @example
 * s.visibility.hidden
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/visibility
 */
export const VisibilityCss = VisibilityCssRuntime as new () => VisibilityCss;
import { whiteSpaceKeywords } from './keyword-sets.js';

/**
 * white-space 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type WhiteSpaceKeywords = KeywordValuesOf<
  typeof whiteSpaceKeywords,
  Property.WhiteSpace | CssString
>;
/**
 * 创建 white-space 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new WhiteSpaceKeywords()
 */
export const WhiteSpaceKeywords = class WhiteSpaceKeywords {
  constructor() {
    Object.assign(this, whiteSpaceKeywords);
  }
} as new () => WhiteSpaceKeywords;

/**
 * white-space 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class WhiteSpaceCssRuntime extends CssProperty {
  /**
   * 创建 white-space 属性作者；普通使用通过 s.whiteSpace 取得共享实例。
   * @example
   * class CustomWhiteSpaceCss extends WhiteSpaceCss {}
   */
  constructor() {
    super('white-space');
    initializeKeywordDeclarations(this, 'white-space', whiteSpaceKeywords);
  }
  /**
   * 原样生成 white-space 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 white-space:value;，undefined 返回空字符串。
   * @example
   * s.whiteSpace.raw('inherit') // white-space:inherit;
   */
  raw(value: Property.WhiteSpace | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * white-space 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type WhiteSpaceCss = WhiteSpaceCssRuntime & KeywordDeclarations<WhiteSpaceKeywords>;
/**
 * 设置空白折叠和换行处理方式。（white-space）
 *
 * 同时影响空白折叠和软换行。它不负责给溢出内容添加省略号。
 *
 * 常用值：
 * - `normal`：折叠连续空白和源换行，允许软换行。
 * - `nowrap`：折叠空白并禁止软换行；不会自行生成省略号。
 * - `pre`：保留空白和源换行，不进行普通软换行。
 * - `pre-wrap`：保留空白和源换行，同时允许软换行。
 * - `pre-line`：折叠空格等空白但保留源换行，同时允许软换行。
 * - `break-spaces`：保留空白并允许在保留的空格后换行；行末空格占据空间。
 *
 * 适用场景：单行标签、保留换行的用户文本和代码片段。
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @example
 * s.whiteSpace.preWrap
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space
 */
export const WhiteSpaceCss = WhiteSpaceCssRuntime as new () => WhiteSpaceCss;
import { whiteSpaceCollapseKeywords } from './keyword-sets.js';

/**
 * white-space-collapse 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type WhiteSpaceCollapseKeywords = KeywordValuesOf<
  typeof whiteSpaceCollapseKeywords,
  Property.WhiteSpaceCollapse | CssString
>;
/**
 * 创建 white-space-collapse 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new WhiteSpaceCollapseKeywords()
 */
export const WhiteSpaceCollapseKeywords = class WhiteSpaceCollapseKeywords {
  constructor() {
    Object.assign(this, whiteSpaceCollapseKeywords);
  }
} as new () => WhiteSpaceCollapseKeywords;

/**
 * white-space-collapse 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class WhiteSpaceCollapseCssRuntime extends CssProperty {
  /**
   * 创建 white-space-collapse 属性作者；普通使用通过 s.whiteSpaceCollapse 取得共享实例。
   * @example
   * class CustomWhiteSpaceCollapseCss extends WhiteSpaceCollapseCss {}
   */
  constructor() {
    super('white-space-collapse');
    initializeKeywordDeclarations(this, 'white-space-collapse', whiteSpaceCollapseKeywords);
  }
  /**
   * 原样生成 white-space-collapse 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 white-space-collapse:value;，undefined 返回空字符串。
   * @example
   * s.whiteSpaceCollapse.raw('inherit') // white-space-collapse:inherit;
   */
  raw(value: Property.WhiteSpaceCollapse | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * white-space-collapse 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type WhiteSpaceCollapseCss = WhiteSpaceCollapseCssRuntime &
  KeywordDeclarations<WhiteSpaceCollapseKeywords>;
/**
 * 设置空格、制表符和换行符如何折叠或保留。（white-space-collapse）
 *
 * CSS 初始值：`collapse`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/white-space-collapse
 */
export const WhiteSpaceCollapseCss =
  WhiteSpaceCollapseCssRuntime as new () => WhiteSpaceCollapseCss;
import { globalKeywords } from './keyword-sets.js';

/**
 * widows 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type WidowsKeywords = KeywordValuesOf<typeof globalKeywords, Property.Widows | CssString>;
/**
 * 创建 widows 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new WidowsKeywords()
 */
export const WidowsKeywords = class WidowsKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => WidowsKeywords;

/**
 * widows 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class WidowsCssRuntime extends CssProperty {
  /**
   * 创建 widows 属性作者；普通使用通过 s.widows 取得共享实例。
   * @example
   * class CustomWidowsCss extends WidowsCss {}
   */
  constructor() {
    super('widows');
    initializeKeywordDeclarations(this, 'widows', globalKeywords);
  }
  /**
   * 原样生成 widows 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 widows:value;，undefined 返回空字符串。
   * @example
   * s.widows.raw('inherit') // widows:inherit;
   */
  raw(value: Property.Widows | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.widows.calc('var(--value) * 2')
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
   * s.widows.min('var(--first)', 'var(--second)')
   */
  min(value: Property.Widows | CssString, ...others: (Property.Widows | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.widows.max('var(--first)', 'var(--second)')
   */
  max(value: Property.Widows | CssString, ...others: (Property.Widows | CssString)[]): string {
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
   * s.widows.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Widows | CssString,
    preferred: Property.Widows | CssString,
    maximum: Property.Widows | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * widows 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type WidowsCss = WidowsCssRuntime & KeywordDeclarations<WidowsKeywords>;
/**
 * 设置分页或分栏断点后需保留的最少行数。（widows）
 *
 * CSS 初始值：`2`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/widows
 */
export const WidowsCss = WidowsCssRuntime as new () => WidowsCss;
import { widthKeywords } from './keyword-sets.js';

/**
 * width 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type WidthKeywords = KeywordValuesOf<typeof widthKeywords, Property.Width | CssString>;
/**
 * 创建 width 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new WidthKeywords()
 */
export const WidthKeywords = class WidthKeywords {
  constructor() {
    Object.assign(this, widthKeywords);
  }
} as new () => WidthKeywords;

/**
 * width 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class WidthCssRuntime extends LengthCssProperty {
  /**
   * 创建 width 属性作者；普通使用通过 s.width 取得共享实例。
   * @example
   * class CustomWidthCss extends WidthCss {}
   */
  constructor() {
    super('width');
    initializeKeywordDeclarations(this, 'width', widthKeywords);
  }
  /**
   * 原样生成 width 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 width:value;，undefined 返回空字符串。
   * @example
   * s.width.raw('inherit') // width:inherit;
   */
  raw(value: Property.Width | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.width.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.width.calc('100% - 2rem')
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
   * s.width.min('100%', '40rem')
   */
  min(value: Property.Width | CssString, ...others: (Property.Width | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.width.max('100%', '40rem')
   */
  max(value: Property.Width | CssString, ...others: (Property.Width | CssString)[]): string {
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
   * s.width.clamp('12rem', '50vw', '40rem')
   */
  clamp(
    minimum: Property.Width | CssString,
    preferred: Property.Width | CssString,
    maximum: Property.Width | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * width 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type WidthCss = WidthCssRuntime & KeywordDeclarations<WidthKeywords>;
/**
 * 设置元素的物理宽度，盒子范围受 box-sizing 影响。（width）
 *
 * 百分比依据包含块解析；auto、内部尺寸和最小/最大约束共同决定最终使用尺寸。
 *
 * 常用值：
 * - `auto`：让布局算法决定尺寸，不保证等于父元素尺寸。
 * - `min-content`：采用内容的最小内部尺寸，文字会考虑可用的软换行机会。
 * - `max-content`：采用内容的最大内部尺寸，通常不进行软换行。
 * - `fit-content`：在最小和最大内部尺寸之间按可用空间夹取尺寸。
 *
 * 适用场景：控制物理宽度；支持书写模式的布局可优先考虑 inline-size。
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @example
 * s.width.rem(20) // width:20rem;
 * @example
 * s.width.clamp('12rem', '50vw', '40rem') // width:clamp(12rem, 50vw, 40rem);
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/width
 */
export const WidthCss = WidthCssRuntime as new () => WidthCss;
import { willChangeKeywords } from './keyword-sets.js';

/**
 * will-change 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type WillChangeKeywords = KeywordValuesOf<
  typeof willChangeKeywords,
  Property.WillChange | CssString
>;
/**
 * 创建 will-change 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new WillChangeKeywords()
 */
export const WillChangeKeywords = class WillChangeKeywords {
  constructor() {
    Object.assign(this, willChangeKeywords);
  }
} as new () => WillChangeKeywords;

/**
 * will-change 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class WillChangeCssRuntime extends CssProperty {
  /**
   * 创建 will-change 属性作者；普通使用通过 s.willChange 取得共享实例。
   * @example
   * class CustomWillChangeCss extends WillChangeCss {}
   */
  constructor() {
    super('will-change');
    initializeKeywordDeclarations(this, 'will-change', willChangeKeywords);
  }
  /**
   * 原样生成 will-change 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 will-change:value;，undefined 返回空字符串。
   * @example
   * s.willChange.raw('inherit') // will-change:inherit;
   */
  raw(value: Property.WillChange | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * will-change 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type WillChangeCss = WillChangeCssRuntime & KeywordDeclarations<WillChangeKeywords>;
/**
 * 提前告知浏览器可能发生变化的属性，便于准备优化资源。（will-change）
 *
 * 仅对即将发生的变化短期使用；长期或大量声明可能占用额外资源，并提前改变层叠上下文。
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/will-change
 */
export const WillChangeCss = WillChangeCssRuntime as new () => WillChangeCss;
import { wordBreakKeywords } from './keyword-sets.js';

/**
 * word-break 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type WordBreakKeywords = KeywordValuesOf<
  typeof wordBreakKeywords,
  Property.WordBreak | CssString
>;
/**
 * 创建 word-break 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new WordBreakKeywords()
 */
export const WordBreakKeywords = class WordBreakKeywords {
  constructor() {
    Object.assign(this, wordBreakKeywords);
  }
} as new () => WordBreakKeywords;

/**
 * word-break 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class WordBreakCssRuntime extends CssProperty {
  /**
   * 创建 word-break 属性作者；普通使用通过 s.wordBreak 取得共享实例。
   * @example
   * class CustomWordBreakCss extends WordBreakCss {}
   */
  constructor() {
    super('word-break');
    initializeKeywordDeclarations(this, 'word-break', wordBreakKeywords);
  }
  /**
   * 原样生成 word-break 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 word-break:value;，undefined 返回空字符串。
   * @example
   * s.wordBreak.raw('inherit') // word-break:inherit;
   */
  raw(value: Property.WordBreak | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * word-break 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type WordBreakCss = WordBreakCssRuntime & KeywordDeclarations<WordBreakKeywords>;
/**
 * 设置单词内部或文字之间的断行规则。（word-break）
 *
 * 按字符和语言控制断行。仅需避免超长单词溢出时，通常先考虑 overflow-wrap。
 *
 * 常用值：
 * - `normal`：按语言的默认断行规则处理。
 * - `break-all`：允许在更多字符间断行以防溢出，可能拆开普通单词。
 * - `keep-all`：限制中日韩文字内部断行，其他文字仍按正常规则处理。
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @example
 * s.wordBreak.normal
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-break
 */
export const WordBreakCss = WordBreakCssRuntime as new () => WordBreakCss;
import { normalKeywords } from './keyword-sets.js';

/**
 * word-spacing 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type WordSpacingKeywords = KeywordValuesOf<
  typeof normalKeywords,
  Property.WordSpacing | CssString
>;
/**
 * 创建 word-spacing 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new WordSpacingKeywords()
 */
export const WordSpacingKeywords = class WordSpacingKeywords {
  constructor() {
    Object.assign(this, normalKeywords);
  }
} as new () => WordSpacingKeywords;

/**
 * word-spacing 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class WordSpacingCssRuntime extends LengthCssProperty {
  /**
   * 创建 word-spacing 属性作者；普通使用通过 s.wordSpacing 取得共享实例。
   * @example
   * class CustomWordSpacingCss extends WordSpacingCss {}
   */
  constructor() {
    super('word-spacing');
    initializeKeywordDeclarations(this, 'word-spacing', normalKeywords);
  }
  /**
   * 原样生成 word-spacing 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 word-spacing:value;，undefined 返回空字符串。
   * @example
   * s.wordSpacing.raw('inherit') // word-spacing:inherit;
   */
  raw(value: Property.WordSpacing | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.wordSpacing.calc('var(--value) * 2')
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
   * s.wordSpacing.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.WordSpacing | CssString,
    ...others: (Property.WordSpacing | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.wordSpacing.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.WordSpacing | CssString,
    ...others: (Property.WordSpacing | CssString)[]
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
   * s.wordSpacing.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.WordSpacing | CssString,
    preferred: Property.WordSpacing | CssString,
    maximum: Property.WordSpacing | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * word-spacing 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type WordSpacingCss = WordSpacingCssRuntime & KeywordDeclarations<WordSpacingKeywords>;
/**
 * 设置单词或词间分隔符的额外间距。（word-spacing）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-spacing
 */
export const WordSpacingCss = WordSpacingCssRuntime as new () => WordSpacingCss;
import { wordWrapKeywords } from './keyword-sets.js';

/**
 * word-wrap 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type WordWrapKeywords = KeywordValuesOf<
  typeof wordWrapKeywords,
  Property.WordWrap | CssString
>;
/**
 * 创建 word-wrap 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new WordWrapKeywords()
 */
export const WordWrapKeywords = class WordWrapKeywords {
  constructor() {
    Object.assign(this, wordWrapKeywords);
  }
} as new () => WordWrapKeywords;

/**
 * word-wrap 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class WordWrapCssRuntime extends CssProperty {
  /**
   * 创建 word-wrap 属性作者；普通使用通过 s.wordWrap 取得共享实例。
   * @example
   * class CustomWordWrapCss extends WordWrapCss {}
   */
  constructor() {
    super('word-wrap');
    initializeKeywordDeclarations(this, 'word-wrap', wordWrapKeywords);
  }
  /**
   * 原样生成 word-wrap 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 word-wrap:value;，undefined 返回空字符串。
   * @example
   * s.wordWrap.raw('inherit') // word-wrap:inherit;
   */
  raw(value: Property.WordWrap | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * word-wrap 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type WordWrapCss = WordWrapCssRuntime & KeywordDeclarations<WordWrapKeywords>;
/**
 * 设置长文本的额外换行行为；是 overflow-wrap 的兼容名称。（word-wrap）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/word-wrap
 */
export const WordWrapCss = WordWrapCssRuntime as new () => WordWrapCss;
import { writingModeKeywords } from './keyword-sets.js';

/**
 * writing-mode 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type WritingModeKeywords = KeywordValuesOf<
  typeof writingModeKeywords,
  Property.WritingMode | CssString
>;
/**
 * 创建 writing-mode 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new WritingModeKeywords()
 */
export const WritingModeKeywords = class WritingModeKeywords {
  constructor() {
    Object.assign(this, writingModeKeywords);
  }
} as new () => WritingModeKeywords;

/**
 * writing-mode 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class WritingModeCssRuntime extends CssProperty {
  /**
   * 创建 writing-mode 属性作者；普通使用通过 s.writingMode 取得共享实例。
   * @example
   * class CustomWritingModeCss extends WritingModeCss {}
   */
  constructor() {
    super('writing-mode');
    initializeKeywordDeclarations(this, 'writing-mode', writingModeKeywords);
  }
  /**
   * 原样生成 writing-mode 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 writing-mode:value;，undefined 返回空字符串。
   * @example
   * s.writingMode.raw('inherit') // writing-mode:inherit;
   */
  raw(value: Property.WritingMode | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * writing-mode 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type WritingModeCss = WritingModeCssRuntime & KeywordDeclarations<WritingModeKeywords>;
/**
 * 设置水平或竖直书写模式，以及行和块的推进方向。（writing-mode）
 *
 * CSS 初始值：`horizontal-tb`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/writing-mode
 */
export const WritingModeCss = WritingModeCssRuntime as new () => WritingModeCss;

/**
 * x 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type XKeywords = KeywordValuesOf<typeof globalKeywords, Property.X | CssString>;
/**
 * 创建 x 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new XKeywords()
 */
export const XKeywords = class XKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => XKeywords;

/**
 * x 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class XCssRuntime extends LengthCssProperty {
  /**
   * 创建 x 属性作者；普通使用通过 s.x 取得共享实例。
   * @example
   * class CustomXCss extends XCss {}
   */
  constructor() {
    super('x');
    initializeKeywordDeclarations(this, 'x', globalKeywords);
  }
  /**
   * 原样生成 x 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 x:value;，undefined 返回空字符串。
   * @example
   * s.x.raw('inherit') // x:inherit;
   */
  raw(value: Property.X | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.x.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.x.calc('var(--value) * 2')
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
   * s.x.min('var(--first)', 'var(--second)')
   */
  min(value: Property.X | CssString, ...others: (Property.X | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.x.max('var(--first)', 'var(--second)')
   */
  max(value: Property.X | CssString, ...others: (Property.X | CssString)[]): string {
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
   * s.x.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.X | CssString,
    preferred: Property.X | CssString,
    maximum: Property.X | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * x 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type XCss = XCssRuntime & KeywordDeclarations<XKeywords>;
/**
 * 设置适用 SVG 元素的水平几何坐标。（x）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/x
 */
export const XCss = XCssRuntime as new () => XCss;

/**
 * y 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type YKeywords = KeywordValuesOf<typeof globalKeywords, Property.Y | CssString>;
/**
 * 创建 y 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new YKeywords()
 */
export const YKeywords = class YKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => YKeywords;

/**
 * y 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class YCssRuntime extends LengthCssProperty {
  /**
   * 创建 y 属性作者；普通使用通过 s.y 取得共享实例。
   * @example
   * class CustomYCss extends YCss {}
   */
  constructor() {
    super('y');
    initializeKeywordDeclarations(this, 'y', globalKeywords);
  }
  /**
   * 原样生成 y 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 y:value;，undefined 返回空字符串。
   * @example
   * s.y.raw('inherit') // y:inherit;
   */
  raw(value: Property.Y | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.y.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.y.calc('var(--value) * 2')
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
   * s.y.min('var(--first)', 'var(--second)')
   */
  min(value: Property.Y | CssString, ...others: (Property.Y | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.y.max('var(--first)', 'var(--second)')
   */
  max(value: Property.Y | CssString, ...others: (Property.Y | CssString)[]): string {
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
   * s.y.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Y | CssString,
    preferred: Property.Y | CssString,
    maximum: Property.Y | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * y 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type YCss = YCssRuntime & KeywordDeclarations<YKeywords>;
/**
 * 设置适用 SVG 元素的垂直几何坐标。（y）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/y
 */
export const YCss = YCssRuntime as new () => YCss;

/**
 * z-index 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ZIndexKeywords = KeywordValuesOf<typeof autoKeywords, Property.ZIndex | CssString>;
/**
 * 创建 z-index 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ZIndexKeywords()
 */
export const ZIndexKeywords = class ZIndexKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ZIndexKeywords;

/**
 * z-index 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ZIndexCssRuntime extends CssProperty {
  /**
   * 创建 z-index 属性作者；普通使用通过 s.zIndex 取得共享实例。
   * @example
   * class CustomZIndexCss extends ZIndexCss {}
   */
  constructor() {
    super('z-index');
    initializeKeywordDeclarations(this, 'z-index', autoKeywords);
  }
  /**
   * 原样生成 z-index 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 z-index:value;，undefined 返回空字符串。
   * @example
   * s.zIndex.raw('inherit') // z-index:inherit;
   */
  raw(value: Property.ZIndex | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.zIndex.calc('var(--value) * 2')
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
   * s.zIndex.min('var(--first)', 'var(--second)')
   */
  min(value: Property.ZIndex | CssString, ...others: (Property.ZIndex | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.zIndex.max('var(--first)', 'var(--second)')
   */
  max(value: Property.ZIndex | CssString, ...others: (Property.ZIndex | CssString)[]): string {
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
   * s.zIndex.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ZIndex | CssString,
    preferred: Property.ZIndex | CssString,
    maximum: Property.ZIndex | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * z-index 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ZIndexCss = ZIndexCssRuntime & KeywordDeclarations<ZIndexKeywords>;
/**
 * 设置元素在所属层叠上下文中的层叠级别。（z-index）
 *
 * 数值只在所属层叠上下文内比较；更大的数值不保证盖过其他层叠上下文。Flex/Grid 项目也可以使用 z-index。
 *
 * 适用场景：控制同一层叠上下文中的浮层顺序，排查遮挡时先确认祖先层叠上下文。
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @example
 * css(s.position.relative, s.zIndex.raw(1))
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/z-index
 */
export const ZIndexCss = ZIndexCssRuntime as new () => ZIndexCss;
import { zoomKeywords } from './keyword-sets.js';

/**
 * zoom 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ZoomKeywords = KeywordValuesOf<typeof zoomKeywords, Property.Zoom | CssString>;
/**
 * 创建 zoom 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ZoomKeywords()
 */
export const ZoomKeywords = class ZoomKeywords {
  constructor() {
    Object.assign(this, zoomKeywords);
  }
} as new () => ZoomKeywords;

/**
 * zoom 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ZoomCssRuntime extends CssProperty {
  /**
   * 创建 zoom 属性作者；普通使用通过 s.zoom 取得共享实例。
   * @example
   * class CustomZoomCss extends ZoomCss {}
   */
  constructor() {
    super('zoom');
    initializeKeywordDeclarations(this, 'zoom', zoomKeywords);
  }
  /**
   * 原样生成 zoom 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 zoom:value;，undefined 返回空字符串。
   * @example
   * s.zoom.raw('inherit') // zoom:inherit;
   */
  raw(value: Property.Zoom | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.zoom.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.zoom.calc('var(--value) * 2')
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
   * s.zoom.min('var(--first)', 'var(--second)')
   */
  min(value: Property.Zoom | CssString, ...others: (Property.Zoom | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.zoom.max('var(--first)', 'var(--second)')
   */
  max(value: Property.Zoom | CssString, ...others: (Property.Zoom | CssString)[]): string {
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
   * s.zoom.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Zoom | CssString,
    preferred: Property.Zoom | CssString,
    maximum: Property.Zoom | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * zoom 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ZoomCss = ZoomCssRuntime & KeywordDeclarations<ZoomKeywords>;
/**
 * 设置元素及其布局的缩放比例，与 transform:scale 的布局行为不同。（zoom）
 *
 * CSS 初始值：`1`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/zoom
 */
export const ZoomCss = ZoomCssRuntime as new () => ZoomCss;
