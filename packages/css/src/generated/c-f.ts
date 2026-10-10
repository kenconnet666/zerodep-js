// 由 scripts/generate-css-author.mjs 从 csstype@3.2.3 生成；请勿手改。
// 来源许可见 packages/css/THIRD_PARTY_NOTICES.md。
import type { Property } from 'csstype';
import { CssProperty, LengthCssProperty, type CssString } from './base.js';
import { initializeKeywordDeclarations } from '../theme/keyword-data.js';
import type { KeywordDeclarations, KeywordValuesOf } from '../theme/keyword-source.js';
// 关键字是实例上的声明字符串；系统实例按属性链惰性创建并共享。
import { captionSideKeywords } from './keyword-sets.js';

/**
 * caption-side 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type CaptionSideKeywords = KeywordValuesOf<
  typeof captionSideKeywords,
  Property.CaptionSide | CssString
>;
/**
 * 创建 caption-side 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new CaptionSideKeywords()
 */
export const CaptionSideKeywords = class CaptionSideKeywords {
  constructor() {
    Object.assign(this, captionSideKeywords);
  }
} as new () => CaptionSideKeywords;

/**
 * caption-side 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class CaptionSideCssRuntime extends CssProperty {
  /**
   * 创建 caption-side 属性作者；普通使用通过 s.captionSide 取得共享实例。
   * @example
   * class CustomCaptionSideCss extends CaptionSideCss {}
   */
  constructor() {
    super('caption-side');
    initializeKeywordDeclarations(this, 'caption-side', captionSideKeywords);
  }
  /**
   * 原样生成 caption-side 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 caption-side:value;，undefined 返回空字符串。
   * @example
   * s.captionSide.raw('inherit') // caption-side:inherit;
   */
  raw(value: Property.CaptionSide | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * caption-side 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type CaptionSideCss = CaptionSideCssRuntime & KeywordDeclarations<CaptionSideKeywords>;
/**
 * 设置表格标题相对于表格的放置侧。（caption-side）
 *
 * CSS 初始值：`top`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caption-side
 */
export const CaptionSideCss = CaptionSideCssRuntime as new () => CaptionSideCss;
import { caretKeywords } from './keyword-sets.js';

/**
 * caret 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type CaretKeywords = KeywordValuesOf<typeof caretKeywords, Property.Caret | CssString>;
/**
 * 创建 caret 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new CaretKeywords()
 */
export const CaretKeywords = class CaretKeywords {
  constructor() {
    Object.assign(this, caretKeywords);
  }
} as new () => CaretKeywords;

/**
 * caret 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class CaretCssRuntime extends CssProperty {
  /**
   * 创建 caret 属性作者；普通使用通过 s.caret 取得共享实例。
   * @example
   * class CustomCaretCss extends CaretCss {}
   */
  constructor() {
    super('caret');
    initializeKeywordDeclarations(this, 'caret', caretKeywords);
  }
  /**
   * 原样生成 caret 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 caret:value;，undefined 返回空字符串。
   * @example
   * s.caret.raw('inherit') // caret:inherit;
   */
  raw(value: Property.Caret | CssString | undefined): string {
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
   * s.caret.rgb(255, 0, 0, 0.5)
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
   * s.caret.hsl(210, 50, 40, 0.8)
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
   * s.caret.oklch(0.7, 0.15, 250)
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
   * s.caret.oklab(0.7, 0.1, -0.1)
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
 * caret 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type CaretCss = CaretCssRuntime & KeywordDeclarations<CaretKeywords>;
/**
 * 集中设置文本插入光标的颜色和形状。（caret）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret
 */
export const CaretCss = CaretCssRuntime as new () => CaretCss;
import { accentColorKeywords } from './keyword-sets.js';

/**
 * caret-color 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type CaretColorKeywords = KeywordValuesOf<
  typeof accentColorKeywords,
  Property.CaretColor | CssString
>;
/**
 * 创建 caret-color 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new CaretColorKeywords()
 */
export const CaretColorKeywords = class CaretColorKeywords {
  constructor() {
    Object.assign(this, accentColorKeywords);
  }
} as new () => CaretColorKeywords;

/**
 * caret-color 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class CaretColorCssRuntime extends CssProperty {
  /**
   * 创建 caret-color 属性作者；普通使用通过 s.caretColor 取得共享实例。
   * @example
   * class CustomCaretColorCss extends CaretColorCss {}
   */
  constructor() {
    super('caret-color');
    initializeKeywordDeclarations(this, 'caret-color', accentColorKeywords);
  }
  /**
   * 原样生成 caret-color 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 caret-color:value;，undefined 返回空字符串。
   * @example
   * s.caretColor.raw('inherit') // caret-color:inherit;
   */
  raw(value: Property.CaretColor | CssString | undefined): string {
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
   * s.caretColor.rgb(255, 0, 0, 0.5)
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
   * s.caretColor.hsl(210, 50, 40, 0.8)
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
   * s.caretColor.oklch(0.7, 0.15, 250)
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
   * s.caretColor.oklab(0.7, 0.1, -0.1)
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
 * caret-color 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type CaretColorCss = CaretColorCssRuntime & KeywordDeclarations<CaretColorKeywords>;
/**
 * 设置可编辑内容中的文本插入光标颜色。（caret-color）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-color
 */
export const CaretColorCss = CaretColorCssRuntime as new () => CaretColorCss;
import { caretShapeKeywords } from './keyword-sets.js';

/**
 * caret-shape 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type CaretShapeKeywords = KeywordValuesOf<
  typeof caretShapeKeywords,
  Property.CaretShape | CssString
>;
/**
 * 创建 caret-shape 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new CaretShapeKeywords()
 */
export const CaretShapeKeywords = class CaretShapeKeywords {
  constructor() {
    Object.assign(this, caretShapeKeywords);
  }
} as new () => CaretShapeKeywords;

/**
 * caret-shape 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class CaretShapeCssRuntime extends CssProperty {
  /**
   * 创建 caret-shape 属性作者；普通使用通过 s.caretShape 取得共享实例。
   * @example
   * class CustomCaretShapeCss extends CaretShapeCss {}
   */
  constructor() {
    super('caret-shape');
    initializeKeywordDeclarations(this, 'caret-shape', caretShapeKeywords);
  }
  /**
   * 原样生成 caret-shape 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 caret-shape:value;，undefined 返回空字符串。
   * @example
   * s.caretShape.raw('inherit') // caret-shape:inherit;
   */
  raw(value: Property.CaretShape | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * caret-shape 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type CaretShapeCss = CaretShapeCssRuntime & KeywordDeclarations<CaretShapeKeywords>;
/**
 * 设置文本插入光标的形状。（caret-shape）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/caret-shape
 */
export const CaretShapeCss = CaretShapeCssRuntime as new () => CaretShapeCss;
import { clearKeywords } from './keyword-sets.js';

/**
 * clear 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ClearKeywords = KeywordValuesOf<typeof clearKeywords, Property.Clear | CssString>;
/**
 * 创建 clear 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ClearKeywords()
 */
export const ClearKeywords = class ClearKeywords {
  constructor() {
    Object.assign(this, clearKeywords);
  }
} as new () => ClearKeywords;

/**
 * clear 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ClearCssRuntime extends CssProperty {
  /**
   * 创建 clear 属性作者；普通使用通过 s.clear 取得共享实例。
   * @example
   * class CustomClearCss extends ClearCss {}
   */
  constructor() {
    super('clear');
    initializeKeywordDeclarations(this, 'clear', clearKeywords);
  }
  /**
   * 原样生成 clear 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 clear:value;，undefined 返回空字符串。
   * @example
   * s.clear.raw('inherit') // clear:inherit;
   */
  raw(value: Property.Clear | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * clear 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ClearCss = ClearCssRuntime & KeywordDeclarations<ClearKeywords>;
/**
 * 要求元素避让指定侧的前置浮动元素。（clear）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clear
 */
export const ClearCss = ClearCssRuntime as new () => ClearCss;
import { autoKeywords } from './keyword-sets.js';

/**
 * clip 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ClipKeywords = KeywordValuesOf<typeof autoKeywords, Property.Clip | CssString>;
/**
 * 创建 clip 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ClipKeywords()
 */
export const ClipKeywords = class ClipKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ClipKeywords;

/**
 * clip 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ClipCssRuntime extends CssProperty {
  /**
   * 创建 clip 属性作者；普通使用通过 s.clip 取得共享实例。
   * @example
   * class CustomClipCss extends ClipCss {}
   */
  constructor() {
    super('clip');
    initializeKeywordDeclarations(this, 'clip', autoKeywords);
  }
  /**
   * 原样生成 clip 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 clip:value;，undefined 返回空字符串。
   * @example
   * s.clip.raw('inherit') // clip:inherit;
   */
  raw(value: Property.Clip | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * clip 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ClipCss = ClipCssRuntime & KeywordDeclarations<ClipKeywords>;
/**
 * 使用旧式矩形裁剪绝对定位元素；新代码优先考虑 clip-path。（clip）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip
 */
export const ClipCss = ClipCssRuntime as new () => ClipCss;
import { clipPathKeywords } from './keyword-sets.js';

/**
 * clip-path 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ClipPathKeywords = KeywordValuesOf<
  typeof clipPathKeywords,
  Property.ClipPath | CssString
>;
/**
 * 创建 clip-path 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ClipPathKeywords()
 */
export const ClipPathKeywords = class ClipPathKeywords {
  constructor() {
    Object.assign(this, clipPathKeywords);
  }
} as new () => ClipPathKeywords;

/**
 * clip-path 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ClipPathCssRuntime extends CssProperty {
  /**
   * 创建 clip-path 属性作者；普通使用通过 s.clipPath 取得共享实例。
   * @example
   * class CustomClipPathCss extends ClipPathCss {}
   */
  constructor() {
    super('clip-path');
    initializeKeywordDeclarations(this, 'clip-path', clipPathKeywords);
  }
  /**
   * 原样生成 clip-path 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 clip-path:value;，undefined 返回空字符串。
   * @example
   * s.clipPath.raw('inherit') // clip-path:inherit;
   */
  raw(value: Property.ClipPath | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * clip-path 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ClipPathCss = ClipPathCssRuntime & KeywordDeclarations<ClipPathKeywords>;
/**
 * 通过基本形状、路径或引用裁剪元素的可见区域。（clip-path）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-path
 */
export const ClipPathCss = ClipPathCssRuntime as new () => ClipPathCss;
import { clipRuleKeywords } from './keyword-sets.js';

/**
 * clip-rule 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ClipRuleKeywords = KeywordValuesOf<
  typeof clipRuleKeywords,
  Property.ClipRule | CssString
>;
/**
 * 创建 clip-rule 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ClipRuleKeywords()
 */
export const ClipRuleKeywords = class ClipRuleKeywords {
  constructor() {
    Object.assign(this, clipRuleKeywords);
  }
} as new () => ClipRuleKeywords;

/**
 * clip-rule 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ClipRuleCssRuntime extends CssProperty {
  /**
   * 创建 clip-rule 属性作者；普通使用通过 s.clipRule 取得共享实例。
   * @example
   * class CustomClipRuleCss extends ClipRuleCss {}
   */
  constructor() {
    super('clip-rule');
    initializeKeywordDeclarations(this, 'clip-rule', clipRuleKeywords);
  }
  /**
   * 原样生成 clip-rule 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 clip-rule:value;，undefined 返回空字符串。
   * @example
   * s.clipRule.raw('inherit') // clip-rule:inherit;
   */
  raw(value: Property.ClipRule | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * clip-rule 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ClipRuleCss = ClipRuleCssRuntime & KeywordDeclarations<ClipRuleKeywords>;
/**
 * 设置 SVG 裁剪路径判断内部区域所用的填充规则。（clip-rule）
 *
 * CSS 初始值：`nonzero`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/clip-rule
 */
export const ClipRuleCss = ClipRuleCssRuntime as new () => ClipRuleCss;
import { colorKeywords } from './keyword-sets.js';

/**
 * color 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColorKeywords = KeywordValuesOf<typeof colorKeywords, Property.Color | CssString>;
/**
 * 创建 color 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColorKeywords()
 */
export const ColorKeywords = class ColorKeywords {
  constructor() {
    Object.assign(this, colorKeywords);
  }
} as new () => ColorKeywords;

/**
 * color 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColorCssRuntime extends CssProperty {
  /**
   * 创建 color 属性作者；普通使用通过 s.color 取得共享实例。
   * @example
   * class CustomColorCss extends ColorCss {}
   */
  constructor() {
    super('color');
    initializeKeywordDeclarations(this, 'color', colorKeywords);
  }
  /**
   * 原样生成 color 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 color:value;，undefined 返回空字符串。
   * @example
   * s.color.raw('inherit') // color:inherit;
   */
  raw(value: Property.Color | CssString | undefined): string {
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
   * s.color.rgb(255, 0, 0, 0.5)
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
   * s.color.hsl(210, 50, 40, 0.8)
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
   * s.color.oklch(0.7, 0.15, 250)
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
   * s.color.oklab(0.7, 0.1, -0.1)
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
 * color 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColorCss = ColorCssRuntime & KeywordDeclarations<ColorKeywords>;
/**
 * 设置文字前景色，同时作为 currentColor 的来源。（color）
 *
 * 改变文字和 currentColor 的来源，不会自动改变背景。颜色函数方法返回完整 color 声明。
 *
 * CSS 初始值：`canvastext`（不同于浏览器默认样式表）。
 * @example
 * s.color.rgb(255, 0, 0, 0.5) // color:rgb(255 0 0 / 0.5);
 * @example
 * s.color.oklch(0.7, 0.15, 250) // color:oklch(0.7 0.15 250);
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color
 */
export const ColorCss = ColorCssRuntime as new () => ColorCss;
import { colorAdjustKeywords } from './keyword-sets.js';

/**
 * color-adjust 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColorAdjustKeywords = KeywordValuesOf<
  typeof colorAdjustKeywords,
  Property.PrintColorAdjust | CssString
>;
/**
 * 创建 color-adjust 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColorAdjustKeywords()
 */
export const ColorAdjustKeywords = class ColorAdjustKeywords {
  constructor() {
    Object.assign(this, colorAdjustKeywords);
  }
} as new () => ColorAdjustKeywords;

/**
 * color-adjust 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColorAdjustCssRuntime extends CssProperty {
  /**
   * 创建 color-adjust 属性作者；普通使用通过 s.colorAdjust 取得共享实例。
   * @example
   * class CustomColorAdjustCss extends ColorAdjustCss {}
   */
  constructor() {
    super('color-adjust');
    initializeKeywordDeclarations(this, 'color-adjust', colorAdjustKeywords);
  }
  /**
   * 原样生成 color-adjust 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 color-adjust:value;，undefined 返回空字符串。
   * @example
   * s.colorAdjust.raw('inherit') // color-adjust:inherit;
   */
  raw(value: Property.PrintColorAdjust | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * color-adjust 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColorAdjustCss = ColorAdjustCssRuntime & KeywordDeclarations<ColorAdjustKeywords>;
/**
 * 控制输出设备对颜色的自动调整；这是 print-color-adjust 的旧名称。（color-adjust）
 *
 * CSS 初始值：`economy`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/print-color-adjust
 */
export const ColorAdjustCss = ColorAdjustCssRuntime as new () => ColorAdjustCss;
import { colorInterpolationKeywords } from './keyword-sets.js';

/**
 * color-interpolation 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColorInterpolationKeywords = KeywordValuesOf<
  typeof colorInterpolationKeywords,
  Property.ColorInterpolation | CssString
>;
/**
 * 创建 color-interpolation 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColorInterpolationKeywords()
 */
export const ColorInterpolationKeywords = class ColorInterpolationKeywords {
  constructor() {
    Object.assign(this, colorInterpolationKeywords);
  }
} as new () => ColorInterpolationKeywords;

/**
 * color-interpolation 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColorInterpolationCssRuntime extends CssProperty {
  /**
   * 创建 color-interpolation 属性作者；普通使用通过 s.colorInterpolation 取得共享实例。
   * @example
   * class CustomColorInterpolationCss extends ColorInterpolationCss {}
   */
  constructor() {
    super('color-interpolation');
    initializeKeywordDeclarations(this, 'color-interpolation', colorInterpolationKeywords);
  }
  /**
   * 原样生成 color-interpolation 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 color-interpolation:value;，undefined 返回空字符串。
   * @example
   * s.colorInterpolation.raw('inherit') // color-interpolation:inherit;
   */
  raw(value: Property.ColorInterpolation | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * color-interpolation 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColorInterpolationCss = ColorInterpolationCssRuntime &
  KeywordDeclarations<ColorInterpolationKeywords>;
/**
 * 设置 SVG 图形颜色插值所用的色彩空间。（color-interpolation）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation
 */
export const ColorInterpolationCss =
  ColorInterpolationCssRuntime as new () => ColorInterpolationCss;

/**
 * color-interpolation-filters 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColorInterpolationFiltersKeywords = KeywordValuesOf<
  typeof colorInterpolationKeywords,
  Property.ColorInterpolationFilters | CssString
>;
/**
 * 创建 color-interpolation-filters 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColorInterpolationFiltersKeywords()
 */
export const ColorInterpolationFiltersKeywords = class ColorInterpolationFiltersKeywords {
  constructor() {
    Object.assign(this, colorInterpolationKeywords);
  }
} as new () => ColorInterpolationFiltersKeywords;

/**
 * color-interpolation-filters 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColorInterpolationFiltersCssRuntime extends CssProperty {
  /**
   * 创建 color-interpolation-filters 属性作者；普通使用通过 s.colorInterpolationFilters 取得共享实例。
   * @example
   * class CustomColorInterpolationFiltersCss extends ColorInterpolationFiltersCss {}
   */
  constructor() {
    super('color-interpolation-filters');
    initializeKeywordDeclarations(this, 'color-interpolation-filters', colorInterpolationKeywords);
  }
  /**
   * 原样生成 color-interpolation-filters 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 color-interpolation-filters:value;，undefined 返回空字符串。
   * @example
   * s.colorInterpolationFilters.raw('inherit') // color-interpolation-filters:inherit;
   */
  raw(value: Property.ColorInterpolationFilters | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * color-interpolation-filters 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColorInterpolationFiltersCss = ColorInterpolationFiltersCssRuntime &
  KeywordDeclarations<ColorInterpolationFiltersKeywords>;
/**
 * 设置 SVG 滤镜效果进行颜色计算时所用的色彩空间。（color-interpolation-filters）
 *
 * CSS 初始值：`linearRGB`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-interpolation-filters
 */
export const ColorInterpolationFiltersCss =
  ColorInterpolationFiltersCssRuntime as new () => ColorInterpolationFiltersCss;
import { colorRenderingKeywords } from './keyword-sets.js';

/**
 * color-rendering 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColorRenderingKeywords = KeywordValuesOf<
  typeof colorRenderingKeywords,
  Property.ColorRendering | CssString
>;
/**
 * 创建 color-rendering 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColorRenderingKeywords()
 */
export const ColorRenderingKeywords = class ColorRenderingKeywords {
  constructor() {
    Object.assign(this, colorRenderingKeywords);
  }
} as new () => ColorRenderingKeywords;

/**
 * color-rendering 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColorRenderingCssRuntime extends CssProperty {
  /**
   * 创建 color-rendering 属性作者；普通使用通过 s.colorRendering 取得共享实例。
   * @example
   * class CustomColorRenderingCss extends ColorRenderingCss {}
   */
  constructor() {
    super('color-rendering');
    initializeKeywordDeclarations(this, 'color-rendering', colorRenderingKeywords);
  }
  /**
   * 原样生成 color-rendering 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 color-rendering:value;，undefined 返回空字符串。
   * @example
   * s.colorRendering.raw('inherit') // color-rendering:inherit;
   */
  raw(value: Property.ColorRendering | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * color-rendering 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColorRenderingCss = ColorRenderingCssRuntime &
  KeywordDeclarations<ColorRenderingKeywords>;
/**
 * 向 SVG 渲染器提供颜色绘制质量与速度之间的偏好。（color-rendering）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-rendering
 */
export const ColorRenderingCss = ColorRenderingCssRuntime as new () => ColorRenderingCss;
import { colorSchemeKeywords } from './keyword-sets.js';

/**
 * color-scheme 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColorSchemeKeywords = KeywordValuesOf<
  typeof colorSchemeKeywords,
  Property.ColorScheme | CssString
>;
/**
 * 创建 color-scheme 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColorSchemeKeywords()
 */
export const ColorSchemeKeywords = class ColorSchemeKeywords {
  constructor() {
    Object.assign(this, colorSchemeKeywords);
  }
} as new () => ColorSchemeKeywords;

/**
 * color-scheme 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColorSchemeCssRuntime extends CssProperty {
  /**
   * 创建 color-scheme 属性作者；普通使用通过 s.colorScheme 取得共享实例。
   * @example
   * class CustomColorSchemeCss extends ColorSchemeCss {}
   */
  constructor() {
    super('color-scheme');
    initializeKeywordDeclarations(this, 'color-scheme', colorSchemeKeywords);
  }
  /**
   * 原样生成 color-scheme 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 color-scheme:value;，undefined 返回空字符串。
   * @example
   * s.colorScheme.raw('inherit') // color-scheme:inherit;
   */
  raw(value: Property.ColorScheme | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * color-scheme 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColorSchemeCss = ColorSchemeCssRuntime & KeywordDeclarations<ColorSchemeKeywords>;
/**
 * 声明元素支持的配色方案，影响原生控件、滚动条等浏览器绘制内容。（color-scheme）
 *
 * 声明支持的方案不等于为应用生成主题颜色；文字、背景和业务 token 仍需自行定义。
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-scheme
 */
export const ColorSchemeCss = ColorSchemeCssRuntime as new () => ColorSchemeCss;

/**
 * column-count 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColumnCountKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ColumnCount | CssString
>;
/**
 * 创建 column-count 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColumnCountKeywords()
 */
export const ColumnCountKeywords = class ColumnCountKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ColumnCountKeywords;

/**
 * column-count 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColumnCountCssRuntime extends CssProperty {
  /**
   * 创建 column-count 属性作者；普通使用通过 s.columnCount 取得共享实例。
   * @example
   * class CustomColumnCountCss extends ColumnCountCss {}
   */
  constructor() {
    super('column-count');
    initializeKeywordDeclarations(this, 'column-count', autoKeywords);
  }
  /**
   * 原样生成 column-count 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 column-count:value;，undefined 返回空字符串。
   * @example
   * s.columnCount.raw('inherit') // column-count:inherit;
   */
  raw(value: Property.ColumnCount | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.columnCount.calc('var(--value) * 2')
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
   * s.columnCount.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ColumnCount | CssString,
    ...others: (Property.ColumnCount | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.columnCount.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ColumnCount | CssString,
    ...others: (Property.ColumnCount | CssString)[]
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
   * s.columnCount.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ColumnCount | CssString,
    preferred: Property.ColumnCount | CssString,
    maximum: Property.ColumnCount | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * column-count 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColumnCountCss = ColumnCountCssRuntime & KeywordDeclarations<ColumnCountKeywords>;
/**
 * 设置多栏布局的目标栏数。（column-count）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-count
 */
export const ColumnCountCss = ColumnCountCssRuntime as new () => ColumnCountCss;
import { columnFillKeywords } from './keyword-sets.js';

/**
 * column-fill 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColumnFillKeywords = KeywordValuesOf<
  typeof columnFillKeywords,
  Property.ColumnFill | CssString
>;
/**
 * 创建 column-fill 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColumnFillKeywords()
 */
export const ColumnFillKeywords = class ColumnFillKeywords {
  constructor() {
    Object.assign(this, columnFillKeywords);
  }
} as new () => ColumnFillKeywords;

/**
 * column-fill 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColumnFillCssRuntime extends CssProperty {
  /**
   * 创建 column-fill 属性作者；普通使用通过 s.columnFill 取得共享实例。
   * @example
   * class CustomColumnFillCss extends ColumnFillCss {}
   */
  constructor() {
    super('column-fill');
    initializeKeywordDeclarations(this, 'column-fill', columnFillKeywords);
  }
  /**
   * 原样生成 column-fill 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 column-fill:value;，undefined 返回空字符串。
   * @example
   * s.columnFill.raw('inherit') // column-fill:inherit;
   */
  raw(value: Property.ColumnFill | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * column-fill 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColumnFillCss = ColumnFillCssRuntime & KeywordDeclarations<ColumnFillKeywords>;
/**
 * 设置多栏内容顺序填充还是尽量均衡栏高。（column-fill）
 *
 * CSS 初始值：`balance`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-fill
 */
export const ColumnFillCss = ColumnFillCssRuntime as new () => ColumnFillCss;
import { normalKeywords } from './keyword-sets.js';

/**
 * column-gap 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColumnGapKeywords = KeywordValuesOf<
  typeof normalKeywords,
  Property.ColumnGap | CssString
>;
/**
 * 创建 column-gap 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColumnGapKeywords()
 */
export const ColumnGapKeywords = class ColumnGapKeywords {
  constructor() {
    Object.assign(this, normalKeywords);
  }
} as new () => ColumnGapKeywords;

/**
 * column-gap 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColumnGapCssRuntime extends LengthCssProperty {
  /**
   * 创建 column-gap 属性作者；普通使用通过 s.columnGap 取得共享实例。
   * @example
   * class CustomColumnGapCss extends ColumnGapCss {}
   */
  constructor() {
    super('column-gap');
    initializeKeywordDeclarations(this, 'column-gap', normalKeywords);
  }
  /**
   * 原样生成 column-gap 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 column-gap:value;，undefined 返回空字符串。
   * @example
   * s.columnGap.raw('inherit') // column-gap:inherit;
   */
  raw(value: Property.ColumnGap | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.columnGap.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.columnGap.calc('var(--value) * 2')
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
   * s.columnGap.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ColumnGap | CssString,
    ...others: (Property.ColumnGap | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.columnGap.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ColumnGap | CssString,
    ...others: (Property.ColumnGap | CssString)[]
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
   * s.columnGap.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ColumnGap | CssString,
    preferred: Property.ColumnGap | CssString,
    maximum: Property.ColumnGap | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * column-gap 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColumnGapCss = ColumnGapCssRuntime & KeywordDeclarations<ColumnGapKeywords>;
/**
 * 设置布局中相邻列之间的间距。（column-gap）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-gap
 */
export const ColumnGapCss = ColumnGapCssRuntime as new () => ColumnGapCss;
import { borderKeywords } from './keyword-sets.js';

/**
 * column-rule 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColumnRuleKeywords = KeywordValuesOf<
  typeof borderKeywords,
  Property.ColumnRule | CssString
>;
/**
 * 创建 column-rule 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColumnRuleKeywords()
 */
export const ColumnRuleKeywords = class ColumnRuleKeywords {
  constructor() {
    Object.assign(this, borderKeywords);
  }
} as new () => ColumnRuleKeywords;

/**
 * column-rule 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColumnRuleCssRuntime extends LengthCssProperty {
  /**
   * 创建 column-rule 属性作者；普通使用通过 s.columnRule 取得共享实例。
   * @example
   * class CustomColumnRuleCss extends ColumnRuleCss {}
   */
  constructor() {
    super('column-rule');
    initializeKeywordDeclarations(this, 'column-rule', borderKeywords);
  }
  /**
   * 原样生成 column-rule 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 column-rule:value;，undefined 返回空字符串。
   * @example
   * s.columnRule.raw('inherit') // column-rule:inherit;
   */
  raw(value: Property.ColumnRule | CssString | undefined): string {
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
   * s.columnRule.rgb(255, 0, 0, 0.5)
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
   * s.columnRule.hsl(210, 50, 40, 0.8)
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
   * s.columnRule.oklch(0.7, 0.15, 250)
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
   * s.columnRule.oklab(0.7, 0.1, -0.1)
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
   * s.columnRule.calc('var(--value) * 2')
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
   * s.columnRule.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ColumnRule | CssString,
    ...others: (Property.ColumnRule | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.columnRule.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ColumnRule | CssString,
    ...others: (Property.ColumnRule | CssString)[]
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
   * s.columnRule.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ColumnRule | CssString,
    preferred: Property.ColumnRule | CssString,
    maximum: Property.ColumnRule | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * column-rule 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColumnRuleCss = ColumnRuleCssRuntime & KeywordDeclarations<ColumnRuleKeywords>;
/**
 * 设置多栏之间分隔线的宽度、线型和颜色。（column-rule）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule
 */
export const ColumnRuleCss = ColumnRuleCssRuntime as new () => ColumnRuleCss;

/**
 * column-rule-color 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColumnRuleColorKeywords = KeywordValuesOf<
  typeof colorKeywords,
  Property.ColumnRuleColor | CssString
>;
/**
 * 创建 column-rule-color 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColumnRuleColorKeywords()
 */
export const ColumnRuleColorKeywords = class ColumnRuleColorKeywords {
  constructor() {
    Object.assign(this, colorKeywords);
  }
} as new () => ColumnRuleColorKeywords;

/**
 * column-rule-color 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColumnRuleColorCssRuntime extends CssProperty {
  /**
   * 创建 column-rule-color 属性作者；普通使用通过 s.columnRuleColor 取得共享实例。
   * @example
   * class CustomColumnRuleColorCss extends ColumnRuleColorCss {}
   */
  constructor() {
    super('column-rule-color');
    initializeKeywordDeclarations(this, 'column-rule-color', colorKeywords);
  }
  /**
   * 原样生成 column-rule-color 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 column-rule-color:value;，undefined 返回空字符串。
   * @example
   * s.columnRuleColor.raw('inherit') // column-rule-color:inherit;
   */
  raw(value: Property.ColumnRuleColor | CssString | undefined): string {
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
   * s.columnRuleColor.rgb(255, 0, 0, 0.5)
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
   * s.columnRuleColor.hsl(210, 50, 40, 0.8)
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
   * s.columnRuleColor.oklch(0.7, 0.15, 250)
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
   * s.columnRuleColor.oklab(0.7, 0.1, -0.1)
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
 * column-rule-color 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColumnRuleColorCss = ColumnRuleColorCssRuntime &
  KeywordDeclarations<ColumnRuleColorKeywords>;
/**
 * 设置多栏分隔线的颜色。（column-rule-color）
 *
 * CSS 初始值：`currentcolor`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-color
 */
export const ColumnRuleColorCss = ColumnRuleColorCssRuntime as new () => ColumnRuleColorCss;
import { borderBlockEndStyleKeywords } from './keyword-sets.js';

/**
 * column-rule-style 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColumnRuleStyleKeywords = KeywordValuesOf<
  typeof borderBlockEndStyleKeywords,
  Property.ColumnRuleStyle | CssString
>;
/**
 * 创建 column-rule-style 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColumnRuleStyleKeywords()
 */
export const ColumnRuleStyleKeywords = class ColumnRuleStyleKeywords {
  constructor() {
    Object.assign(this, borderBlockEndStyleKeywords);
  }
} as new () => ColumnRuleStyleKeywords;

/**
 * column-rule-style 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColumnRuleStyleCssRuntime extends CssProperty {
  /**
   * 创建 column-rule-style 属性作者；普通使用通过 s.columnRuleStyle 取得共享实例。
   * @example
   * class CustomColumnRuleStyleCss extends ColumnRuleStyleCss {}
   */
  constructor() {
    super('column-rule-style');
    initializeKeywordDeclarations(this, 'column-rule-style', borderBlockEndStyleKeywords);
  }
  /**
   * 原样生成 column-rule-style 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 column-rule-style:value;，undefined 返回空字符串。
   * @example
   * s.columnRuleStyle.raw('inherit') // column-rule-style:inherit;
   */
  raw(value: Property.ColumnRuleStyle | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * column-rule-style 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColumnRuleStyleCss = ColumnRuleStyleCssRuntime &
  KeywordDeclarations<ColumnRuleStyleKeywords>;
/**
 * 设置多栏分隔线的线型。（column-rule-style）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-style
 */
export const ColumnRuleStyleCss = ColumnRuleStyleCssRuntime as new () => ColumnRuleStyleCss;
import { borderWidthKeywords } from './keyword-sets.js';

/**
 * column-rule-width 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColumnRuleWidthKeywords = KeywordValuesOf<
  typeof borderWidthKeywords,
  Property.ColumnRuleWidth | CssString
>;
/**
 * 创建 column-rule-width 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColumnRuleWidthKeywords()
 */
export const ColumnRuleWidthKeywords = class ColumnRuleWidthKeywords {
  constructor() {
    Object.assign(this, borderWidthKeywords);
  }
} as new () => ColumnRuleWidthKeywords;

/**
 * column-rule-width 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColumnRuleWidthCssRuntime extends LengthCssProperty {
  /**
   * 创建 column-rule-width 属性作者；普通使用通过 s.columnRuleWidth 取得共享实例。
   * @example
   * class CustomColumnRuleWidthCss extends ColumnRuleWidthCss {}
   */
  constructor() {
    super('column-rule-width');
    initializeKeywordDeclarations(this, 'column-rule-width', borderWidthKeywords);
  }
  /**
   * 原样生成 column-rule-width 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 column-rule-width:value;，undefined 返回空字符串。
   * @example
   * s.columnRuleWidth.raw('inherit') // column-rule-width:inherit;
   */
  raw(value: Property.ColumnRuleWidth | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.columnRuleWidth.calc('var(--value) * 2')
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
   * s.columnRuleWidth.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ColumnRuleWidth | CssString,
    ...others: (Property.ColumnRuleWidth | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.columnRuleWidth.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ColumnRuleWidth | CssString,
    ...others: (Property.ColumnRuleWidth | CssString)[]
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
   * s.columnRuleWidth.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ColumnRuleWidth | CssString,
    preferred: Property.ColumnRuleWidth | CssString,
    maximum: Property.ColumnRuleWidth | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * column-rule-width 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColumnRuleWidthCss = ColumnRuleWidthCssRuntime &
  KeywordDeclarations<ColumnRuleWidthKeywords>;
/**
 * 设置多栏分隔线的宽度。（column-rule-width）
 *
 * CSS 初始值：`medium`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-rule-width
 */
export const ColumnRuleWidthCss = ColumnRuleWidthCssRuntime as new () => ColumnRuleWidthCss;
import { anchorScopeKeywords } from './keyword-sets.js';

/**
 * column-span 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColumnSpanKeywords = KeywordValuesOf<
  typeof anchorScopeKeywords,
  Property.ColumnSpan | CssString
>;
/**
 * 创建 column-span 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColumnSpanKeywords()
 */
export const ColumnSpanKeywords = class ColumnSpanKeywords {
  constructor() {
    Object.assign(this, anchorScopeKeywords);
  }
} as new () => ColumnSpanKeywords;

/**
 * column-span 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColumnSpanCssRuntime extends CssProperty {
  /**
   * 创建 column-span 属性作者；普通使用通过 s.columnSpan 取得共享实例。
   * @example
   * class CustomColumnSpanCss extends ColumnSpanCss {}
   */
  constructor() {
    super('column-span');
    initializeKeywordDeclarations(this, 'column-span', anchorScopeKeywords);
  }
  /**
   * 原样生成 column-span 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 column-span:value;，undefined 返回空字符串。
   * @example
   * s.columnSpan.raw('inherit') // column-span:inherit;
   */
  raw(value: Property.ColumnSpan | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * column-span 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColumnSpanCss = ColumnSpanCssRuntime & KeywordDeclarations<ColumnSpanKeywords>;
/**
 * 设置多栏布局中的元素是否跨越所有栏。（column-span）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-span
 */
export const ColumnSpanCss = ColumnSpanCssRuntime as new () => ColumnSpanCss;

/**
 * column-width 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColumnWidthKeywords = KeywordValuesOf<
  typeof autoKeywords,
  Property.ColumnWidth | CssString
>;
/**
 * 创建 column-width 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColumnWidthKeywords()
 */
export const ColumnWidthKeywords = class ColumnWidthKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ColumnWidthKeywords;

/**
 * column-width 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColumnWidthCssRuntime extends LengthCssProperty {
  /**
   * 创建 column-width 属性作者；普通使用通过 s.columnWidth 取得共享实例。
   * @example
   * class CustomColumnWidthCss extends ColumnWidthCss {}
   */
  constructor() {
    super('column-width');
    initializeKeywordDeclarations(this, 'column-width', autoKeywords);
  }
  /**
   * 原样生成 column-width 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 column-width:value;，undefined 返回空字符串。
   * @example
   * s.columnWidth.raw('inherit') // column-width:inherit;
   */
  raw(value: Property.ColumnWidth | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.columnWidth.calc('var(--value) * 2')
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
   * s.columnWidth.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ColumnWidth | CssString,
    ...others: (Property.ColumnWidth | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.columnWidth.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ColumnWidth | CssString,
    ...others: (Property.ColumnWidth | CssString)[]
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
   * s.columnWidth.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ColumnWidth | CssString,
    preferred: Property.ColumnWidth | CssString,
    maximum: Property.ColumnWidth | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * column-width 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColumnWidthCss = ColumnWidthCssRuntime & KeywordDeclarations<ColumnWidthKeywords>;
/**
 * 设置多栏布局的首选栏宽，实际栏宽由容器空间决定。（column-width）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/column-width
 */
export const ColumnWidthCss = ColumnWidthCssRuntime as new () => ColumnWidthCss;

/**
 * columns 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ColumnsKeywords = KeywordValuesOf<typeof autoKeywords, Property.Columns | CssString>;
/**
 * 创建 columns 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ColumnsKeywords()
 */
export const ColumnsKeywords = class ColumnsKeywords {
  constructor() {
    Object.assign(this, autoKeywords);
  }
} as new () => ColumnsKeywords;

/**
 * columns 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ColumnsCssRuntime extends LengthCssProperty {
  /**
   * 创建 columns 属性作者；普通使用通过 s.columns 取得共享实例。
   * @example
   * class CustomColumnsCss extends ColumnsCss {}
   */
  constructor() {
    super('columns');
    initializeKeywordDeclarations(this, 'columns', autoKeywords);
  }
  /**
   * 原样生成 columns 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 columns:value;，undefined 返回空字符串。
   * @example
   * s.columns.raw('inherit') // columns:inherit;
   */
  raw(value: Property.Columns | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.columns.calc('var(--value) * 2')
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
   * s.columns.min('var(--first)', 'var(--second)')
   */
  min(value: Property.Columns | CssString, ...others: (Property.Columns | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.columns.max('var(--first)', 'var(--second)')
   */
  max(value: Property.Columns | CssString, ...others: (Property.Columns | CssString)[]): string {
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
   * s.columns.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Columns | CssString,
    preferred: Property.Columns | CssString,
    maximum: Property.Columns | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * columns 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ColumnsCss = ColumnsCssRuntime & KeywordDeclarations<ColumnsKeywords>;
/**
 * 同时设置多栏布局的首选栏宽和目标栏数。（columns）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/columns
 */
export const ColumnsCss = ColumnsCssRuntime as new () => ColumnsCss;
import { containKeywords } from './keyword-sets.js';

/**
 * contain 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ContainKeywords = KeywordValuesOf<typeof containKeywords, Property.Contain | CssString>;
/**
 * 创建 contain 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ContainKeywords()
 */
export const ContainKeywords = class ContainKeywords {
  constructor() {
    Object.assign(this, containKeywords);
  }
} as new () => ContainKeywords;

/**
 * contain 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ContainCssRuntime extends CssProperty {
  /**
   * 创建 contain 属性作者；普通使用通过 s.contain 取得共享实例。
   * @example
   * class CustomContainCss extends ContainCss {}
   */
  constructor() {
    super('contain');
    initializeKeywordDeclarations(this, 'contain', containKeywords);
  }
  /**
   * 原样生成 contain 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 contain:value;，undefined 返回空字符串。
   * @example
   * s.contain.raw('inherit') // contain:inherit;
   */
  raw(value: Property.Contain | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * contain 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ContainCss = ContainCssRuntime & KeywordDeclarations<ContainKeywords>;
/**
 * 声明尺寸、布局、绘制或样式隔离，限制子树对外部的影响。（contain）
 *
 * 不同隔离类型会改变布局和绘制语义，不能仅当作无副作用的性能开关。
 *
 * 常用值：
 * - `content`：组合 layout、style 和 paint 隔离，不包含 size 隔离。
 * - `strict`：组合 size、layout、style 和 paint 隔离；尺寸隔离可能影响自动尺寸。
 * - `size`：计算盒子尺寸时不依赖后代内容，通常需要显式或替代内部尺寸。
 * - `paint`：将后代绘制限制在隔离边界内。
 * - `style`：隔离计数器等特定样式副作用，不会阻止普通 CSS 继承或选择器匹配。
 *
 * 适用场景：边界明确且尺寸、溢出行为经过验证的独立区域。
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @example
 * s.contain.content
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain
 */
export const ContainCss = ContainCssRuntime as new () => ContainCss;
import { noneKeywords } from './keyword-sets.js';

/**
 * contain-intrinsic-block-size 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ContainIntrinsicBlockSizeKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.ContainIntrinsicBlockSize | CssString
>;
/**
 * 创建 contain-intrinsic-block-size 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ContainIntrinsicBlockSizeKeywords()
 */
export const ContainIntrinsicBlockSizeKeywords = class ContainIntrinsicBlockSizeKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => ContainIntrinsicBlockSizeKeywords;

/**
 * contain-intrinsic-block-size 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ContainIntrinsicBlockSizeCssRuntime extends LengthCssProperty {
  /**
   * 创建 contain-intrinsic-block-size 属性作者；普通使用通过 s.containIntrinsicBlockSize 取得共享实例。
   * @example
   * class CustomContainIntrinsicBlockSizeCss extends ContainIntrinsicBlockSizeCss {}
   */
  constructor() {
    super('contain-intrinsic-block-size');
    initializeKeywordDeclarations(this, 'contain-intrinsic-block-size', noneKeywords);
  }
  /**
   * 原样生成 contain-intrinsic-block-size 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 contain-intrinsic-block-size:value;，undefined 返回空字符串。
   * @example
   * s.containIntrinsicBlockSize.raw('inherit') // contain-intrinsic-block-size:inherit;
   */
  raw(value: Property.ContainIntrinsicBlockSize | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.containIntrinsicBlockSize.calc('var(--value) * 2')
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
   * s.containIntrinsicBlockSize.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ContainIntrinsicBlockSize | CssString,
    ...others: (Property.ContainIntrinsicBlockSize | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.containIntrinsicBlockSize.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ContainIntrinsicBlockSize | CssString,
    ...others: (Property.ContainIntrinsicBlockSize | CssString)[]
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
   * s.containIntrinsicBlockSize.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ContainIntrinsicBlockSize | CssString,
    preferred: Property.ContainIntrinsicBlockSize | CssString,
    maximum: Property.ContainIntrinsicBlockSize | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * contain-intrinsic-block-size 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ContainIntrinsicBlockSizeCss = ContainIntrinsicBlockSizeCssRuntime &
  KeywordDeclarations<ContainIntrinsicBlockSizeKeywords>;
/**
 * 设置块轴尺寸隔离或跳过内容渲染时使用的替代内部尺寸。（contain-intrinsic-block-size）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-block-size
 */
export const ContainIntrinsicBlockSizeCss =
  ContainIntrinsicBlockSizeCssRuntime as new () => ContainIntrinsicBlockSizeCss;

/**
 * contain-intrinsic-height 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ContainIntrinsicHeightKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.ContainIntrinsicHeight | CssString
>;
/**
 * 创建 contain-intrinsic-height 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ContainIntrinsicHeightKeywords()
 */
export const ContainIntrinsicHeightKeywords = class ContainIntrinsicHeightKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => ContainIntrinsicHeightKeywords;

/**
 * contain-intrinsic-height 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ContainIntrinsicHeightCssRuntime extends LengthCssProperty {
  /**
   * 创建 contain-intrinsic-height 属性作者；普通使用通过 s.containIntrinsicHeight 取得共享实例。
   * @example
   * class CustomContainIntrinsicHeightCss extends ContainIntrinsicHeightCss {}
   */
  constructor() {
    super('contain-intrinsic-height');
    initializeKeywordDeclarations(this, 'contain-intrinsic-height', noneKeywords);
  }
  /**
   * 原样生成 contain-intrinsic-height 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 contain-intrinsic-height:value;，undefined 返回空字符串。
   * @example
   * s.containIntrinsicHeight.raw('inherit') // contain-intrinsic-height:inherit;
   */
  raw(value: Property.ContainIntrinsicHeight | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.containIntrinsicHeight.calc('var(--value) * 2')
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
   * s.containIntrinsicHeight.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ContainIntrinsicHeight | CssString,
    ...others: (Property.ContainIntrinsicHeight | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.containIntrinsicHeight.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ContainIntrinsicHeight | CssString,
    ...others: (Property.ContainIntrinsicHeight | CssString)[]
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
   * s.containIntrinsicHeight.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ContainIntrinsicHeight | CssString,
    preferred: Property.ContainIntrinsicHeight | CssString,
    maximum: Property.ContainIntrinsicHeight | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * contain-intrinsic-height 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ContainIntrinsicHeightCss = ContainIntrinsicHeightCssRuntime &
  KeywordDeclarations<ContainIntrinsicHeightKeywords>;
/**
 * 设置高度隔离或跳过内容渲染时使用的替代内部高度。（contain-intrinsic-height）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-height
 */
export const ContainIntrinsicHeightCss =
  ContainIntrinsicHeightCssRuntime as new () => ContainIntrinsicHeightCss;

/**
 * contain-intrinsic-inline-size 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ContainIntrinsicInlineSizeKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.ContainIntrinsicInlineSize | CssString
>;
/**
 * 创建 contain-intrinsic-inline-size 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ContainIntrinsicInlineSizeKeywords()
 */
export const ContainIntrinsicInlineSizeKeywords = class ContainIntrinsicInlineSizeKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => ContainIntrinsicInlineSizeKeywords;

/**
 * contain-intrinsic-inline-size 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ContainIntrinsicInlineSizeCssRuntime extends LengthCssProperty {
  /**
   * 创建 contain-intrinsic-inline-size 属性作者；普通使用通过 s.containIntrinsicInlineSize 取得共享实例。
   * @example
   * class CustomContainIntrinsicInlineSizeCss extends ContainIntrinsicInlineSizeCss {}
   */
  constructor() {
    super('contain-intrinsic-inline-size');
    initializeKeywordDeclarations(this, 'contain-intrinsic-inline-size', noneKeywords);
  }
  /**
   * 原样生成 contain-intrinsic-inline-size 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 contain-intrinsic-inline-size:value;，undefined 返回空字符串。
   * @example
   * s.containIntrinsicInlineSize.raw('inherit') // contain-intrinsic-inline-size:inherit;
   */
  raw(value: Property.ContainIntrinsicInlineSize | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.containIntrinsicInlineSize.calc('var(--value) * 2')
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
   * s.containIntrinsicInlineSize.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ContainIntrinsicInlineSize | CssString,
    ...others: (Property.ContainIntrinsicInlineSize | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.containIntrinsicInlineSize.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ContainIntrinsicInlineSize | CssString,
    ...others: (Property.ContainIntrinsicInlineSize | CssString)[]
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
   * s.containIntrinsicInlineSize.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ContainIntrinsicInlineSize | CssString,
    preferred: Property.ContainIntrinsicInlineSize | CssString,
    maximum: Property.ContainIntrinsicInlineSize | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * contain-intrinsic-inline-size 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ContainIntrinsicInlineSizeCss = ContainIntrinsicInlineSizeCssRuntime &
  KeywordDeclarations<ContainIntrinsicInlineSizeKeywords>;
/**
 * 设置行内轴尺寸隔离或跳过内容渲染时使用的替代内部尺寸。（contain-intrinsic-inline-size）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-inline-size
 */
export const ContainIntrinsicInlineSizeCss =
  ContainIntrinsicInlineSizeCssRuntime as new () => ContainIntrinsicInlineSizeCss;

/**
 * contain-intrinsic-size 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ContainIntrinsicSizeKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.ContainIntrinsicSize | CssString
>;
/**
 * 创建 contain-intrinsic-size 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ContainIntrinsicSizeKeywords()
 */
export const ContainIntrinsicSizeKeywords = class ContainIntrinsicSizeKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => ContainIntrinsicSizeKeywords;

/**
 * contain-intrinsic-size 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ContainIntrinsicSizeCssRuntime extends LengthCssProperty {
  /**
   * 创建 contain-intrinsic-size 属性作者；普通使用通过 s.containIntrinsicSize 取得共享实例。
   * @example
   * class CustomContainIntrinsicSizeCss extends ContainIntrinsicSizeCss {}
   */
  constructor() {
    super('contain-intrinsic-size');
    initializeKeywordDeclarations(this, 'contain-intrinsic-size', noneKeywords);
  }
  /**
   * 原样生成 contain-intrinsic-size 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 contain-intrinsic-size:value;，undefined 返回空字符串。
   * @example
   * s.containIntrinsicSize.raw('inherit') // contain-intrinsic-size:inherit;
   */
  raw(value: Property.ContainIntrinsicSize | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.px(1)
   */
  px(value1: number): string;
  /**
   * 使用 px 单位生成完整属性声明。CSS 像素，不等同于设备物理像素。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 px。
   * @param value2 替代内部高度的数值，自动附加 px。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.px(1, 2)
   */
  px(value1: number, value2: number): string;
  override px(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}px`).join(' '));
  }
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cm(1)
   */
  cm(value1: number): string;
  /**
   * 使用 cm 单位生成完整属性声明。厘米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 cm。
   * @param value2 替代内部高度的数值，自动附加 cm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cm(1, 2)
   */
  cm(value1: number, value2: number): string;
  override cm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cm`).join(' '));
  }
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.mm(1)
   */
  mm(value1: number): string;
  /**
   * 使用 mm 单位生成完整属性声明。毫米；CSS 绝对单位按固定比例换算。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 mm。
   * @param value2 替代内部高度的数值，自动附加 mm。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.mm(1, 2)
   */
  mm(value1: number, value2: number): string;
  override mm(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}mm`).join(' '));
  }
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.q(1)
   */
  q(value1: number): string;
  /**
   * 使用 q 单位生成完整属性声明。四分之一毫米。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 q。
   * @param value2 替代内部高度的数值，自动附加 q。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.q(1, 2)
   */
  q(value1: number, value2: number): string;
  override q(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}q`).join(' '));
  }
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.in(1)
   */
  in(value1: number): string;
  /**
   * 使用 in 单位生成完整属性声明。英寸，1in 等于 96 CSS px。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 in。
   * @param value2 替代内部高度的数值，自动附加 in。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.in(1, 2)
   */
  in(value1: number, value2: number): string;
  override in(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}in`).join(' '));
  }
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.pt(1)
   */
  pt(value1: number): string;
  /**
   * 使用 pt 单位生成完整属性声明。点，1pt 等于 1/72in。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 pt。
   * @param value2 替代内部高度的数值，自动附加 pt。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.pt(1, 2)
   */
  pt(value1: number, value2: number): string;
  override pt(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pt`).join(' '));
  }
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.pc(1)
   */
  pc(value1: number): string;
  /**
   * 使用 pc 单位生成完整属性声明。派卡，1pc 等于 12pt。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 pc。
   * @param value2 替代内部高度的数值，自动附加 pc。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.pc(1, 2)
   */
  pc(value1: number, value2: number): string;
  override pc(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}pc`).join(' '));
  }
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.em(1)
   */
  em(value1: number): string;
  /**
   * 使用 em 单位生成完整属性声明。通常相对于当前元素字号；用于 font-size 时相对于继承字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 em。
   * @param value2 替代内部高度的数值，自动附加 em。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.em(1, 2)
   */
  em(value1: number, value2: number): string;
  override em(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}em`).join(' '));
  }
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.rem(1)
   */
  rem(value1: number): string;
  /**
   * 使用 rem 单位生成完整属性声明。相对于根元素字号；用于根元素 font-size 时依据初始字号。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 rem。
   * @param value2 替代内部高度的数值，自动附加 rem。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.rem(1, 2)
   */
  rem(value1: number, value2: number): string;
  override rem(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rem`).join(' '));
  }
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.ex(1)
   */
  ex(value1: number): string;
  /**
   * 使用 ex 单位生成完整属性声明。相对于当前字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 ex。
   * @param value2 替代内部高度的数值，自动附加 ex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.ex(1, 2)
   */
  ex(value1: number, value2: number): string;
  override ex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ex`).join(' '));
  }
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.rex(1)
   */
  rex(value1: number): string;
  /**
   * 使用 rex 单位生成完整属性声明。相对于根元素字体的小写 x 高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 rex。
   * @param value2 替代内部高度的数值，自动附加 rex。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.rex(1, 2)
   */
  rex(value1: number, value2: number): string;
  override rex(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rex`).join(' '));
  }
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.ch(1)
   */
  ch(value1: number): string;
  /**
   * 使用 ch 单位生成完整属性声明。相对于当前字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 ch。
   * @param value2 替代内部高度的数值，自动附加 ch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.ch(1, 2)
   */
  ch(value1: number, value2: number): string;
  override ch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ch`).join(' '));
  }
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.rch(1)
   */
  rch(value1: number): string;
  /**
   * 使用 rch 单位生成完整属性声明。相对于根元素字体数字 0 的字形前进宽度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 rch。
   * @param value2 替代内部高度的数值，自动附加 rch。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.rch(1, 2)
   */
  rch(value1: number, value2: number): string;
  override rch(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rch`).join(' '));
  }
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cap(1)
   */
  cap(value1: number): string;
  /**
   * 使用 cap 单位生成完整属性声明。相对于当前字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 cap。
   * @param value2 替代内部高度的数值，自动附加 cap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cap(1, 2)
   */
  cap(value1: number, value2: number): string;
  override cap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cap`).join(' '));
  }
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.rcap(1)
   */
  rcap(value1: number): string;
  /**
   * 使用 rcap 单位生成完整属性声明。相对于根元素字体的大写字母高度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 rcap。
   * @param value2 替代内部高度的数值，自动附加 rcap。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.rcap(1, 2)
   */
  rcap(value1: number, value2: number): string;
  override rcap(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rcap`).join(' '));
  }
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.ic(1)
   */
  ic(value1: number): string;
  /**
   * 使用 ic 单位生成完整属性声明。相对于当前字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 ic。
   * @param value2 替代内部高度的数值，自动附加 ic。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.ic(1, 2)
   */
  ic(value1: number, value2: number): string;
  override ic(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ic`).join(' '));
  }
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.ric(1)
   */
  ric(value1: number): string;
  /**
   * 使用 ric 单位生成完整属性声明。相对于根元素字体水字形的前进尺度。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 ric。
   * @param value2 替代内部高度的数值，自动附加 ric。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.ric(1, 2)
   */
  ric(value1: number, value2: number): string;
  override ric(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}ric`).join(' '));
  }
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.lh(1)
   */
  lh(value1: number): string;
  /**
   * 使用 lh 单位生成完整属性声明。相对于当前元素的行高；用于行高自身等场景按 CSS 规则解析。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 lh。
   * @param value2 替代内部高度的数值，自动附加 lh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.lh(1, 2)
   */
  lh(value1: number, value2: number): string;
  override lh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lh`).join(' '));
  }
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.rlh(1)
   */
  rlh(value1: number): string;
  /**
   * 使用 rlh 单位生成完整属性声明。相对于根元素的行高。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 rlh。
   * @param value2 替代内部高度的数值，自动附加 rlh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.rlh(1, 2)
   */
  rlh(value1: number, value2: number): string;
  override rlh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}rlh`).join(' '));
  }
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.vw(1)
   */
  vw(value1: number): string;
  /**
   * 使用 vw 单位生成完整属性声明。大视口（默认视口单位）宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 vw。
   * @param value2 替代内部高度的数值，自动附加 vw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.vw(1, 2)
   */
  vw(value1: number, value2: number): string;
  override vw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vw`).join(' '));
  }
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.vh(1)
   */
  vh(value1: number): string;
  /**
   * 使用 vh 单位生成完整属性声明。大视口（默认视口单位）高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 vh。
   * @param value2 替代内部高度的数值，自动附加 vh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.vh(1, 2)
   */
  vh(value1: number, value2: number): string;
  override vh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vh`).join(' '));
  }
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.vi(1)
   */
  vi(value1: number): string;
  /**
   * 使用 vi 单位生成完整属性声明。大视口（默认视口单位）行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 vi。
   * @param value2 替代内部高度的数值，自动附加 vi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.vi(1, 2)
   */
  vi(value1: number, value2: number): string;
  override vi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vi`).join(' '));
  }
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.vb(1)
   */
  vb(value1: number): string;
  /**
   * 使用 vb 单位生成完整属性声明。大视口（默认视口单位）块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 vb。
   * @param value2 替代内部高度的数值，自动附加 vb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.vb(1, 2)
   */
  vb(value1: number, value2: number): string;
  override vb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vb`).join(' '));
  }
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.vmin(1)
   */
  vmin(value1: number): string;
  /**
   * 使用 vmin 单位生成完整属性声明。大视口（默认视口单位）宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 vmin。
   * @param value2 替代内部高度的数值，自动附加 vmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.vmin(1, 2)
   */
  vmin(value1: number, value2: number): string;
  override vmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmin`).join(' '));
  }
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.vmax(1)
   */
  vmax(value1: number): string;
  /**
   * 使用 vmax 单位生成完整属性声明。大视口（默认视口单位）宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 vmax。
   * @param value2 替代内部高度的数值，自动附加 vmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.vmax(1, 2)
   */
  vmax(value1: number, value2: number): string;
  override vmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}vmax`).join(' '));
  }
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.svw(1)
   */
  svw(value1: number): string;
  /**
   * 使用 svw 单位生成完整属性声明。小视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 svw。
   * @param value2 替代内部高度的数值，自动附加 svw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.svw(1, 2)
   */
  svw(value1: number, value2: number): string;
  override svw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svw`).join(' '));
  }
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.svh(1)
   */
  svh(value1: number): string;
  /**
   * 使用 svh 单位生成完整属性声明。小视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 svh。
   * @param value2 替代内部高度的数值，自动附加 svh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.svh(1, 2)
   */
  svh(value1: number, value2: number): string;
  override svh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svh`).join(' '));
  }
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.svi(1)
   */
  svi(value1: number): string;
  /**
   * 使用 svi 单位生成完整属性声明。小视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 svi。
   * @param value2 替代内部高度的数值，自动附加 svi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.svi(1, 2)
   */
  svi(value1: number, value2: number): string;
  override svi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svi`).join(' '));
  }
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.svb(1)
   */
  svb(value1: number): string;
  /**
   * 使用 svb 单位生成完整属性声明。小视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 svb。
   * @param value2 替代内部高度的数值，自动附加 svb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.svb(1, 2)
   */
  svb(value1: number, value2: number): string;
  override svb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svb`).join(' '));
  }
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.svmin(1)
   */
  svmin(value1: number): string;
  /**
   * 使用 svmin 单位生成完整属性声明。小视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 svmin。
   * @param value2 替代内部高度的数值，自动附加 svmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.svmin(1, 2)
   */
  svmin(value1: number, value2: number): string;
  override svmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmin`).join(' '));
  }
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.svmax(1)
   */
  svmax(value1: number): string;
  /**
   * 使用 svmax 单位生成完整属性声明。小视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 svmax。
   * @param value2 替代内部高度的数值，自动附加 svmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.svmax(1, 2)
   */
  svmax(value1: number, value2: number): string;
  override svmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}svmax`).join(' '));
  }
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.lvw(1)
   */
  lvw(value1: number): string;
  /**
   * 使用 lvw 单位生成完整属性声明。大视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 lvw。
   * @param value2 替代内部高度的数值，自动附加 lvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.lvw(1, 2)
   */
  lvw(value1: number, value2: number): string;
  override lvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvw`).join(' '));
  }
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.lvh(1)
   */
  lvh(value1: number): string;
  /**
   * 使用 lvh 单位生成完整属性声明。大视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 lvh。
   * @param value2 替代内部高度的数值，自动附加 lvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.lvh(1, 2)
   */
  lvh(value1: number, value2: number): string;
  override lvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvh`).join(' '));
  }
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.lvi(1)
   */
  lvi(value1: number): string;
  /**
   * 使用 lvi 单位生成完整属性声明。大视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 lvi。
   * @param value2 替代内部高度的数值，自动附加 lvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.lvi(1, 2)
   */
  lvi(value1: number, value2: number): string;
  override lvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvi`).join(' '));
  }
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.lvb(1)
   */
  lvb(value1: number): string;
  /**
   * 使用 lvb 单位生成完整属性声明。大视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 lvb。
   * @param value2 替代内部高度的数值，自动附加 lvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.lvb(1, 2)
   */
  lvb(value1: number, value2: number): string;
  override lvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvb`).join(' '));
  }
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.lvmin(1)
   */
  lvmin(value1: number): string;
  /**
   * 使用 lvmin 单位生成完整属性声明。大视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 lvmin。
   * @param value2 替代内部高度的数值，自动附加 lvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.lvmin(1, 2)
   */
  lvmin(value1: number, value2: number): string;
  override lvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmin`).join(' '));
  }
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.lvmax(1)
   */
  lvmax(value1: number): string;
  /**
   * 使用 lvmax 单位生成完整属性声明。大视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 lvmax。
   * @param value2 替代内部高度的数值，自动附加 lvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.lvmax(1, 2)
   */
  lvmax(value1: number, value2: number): string;
  override lvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}lvmax`).join(' '));
  }
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.dvw(1)
   */
  dvw(value1: number): string;
  /**
   * 使用 dvw 单位生成完整属性声明。动态视口宽度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 dvw。
   * @param value2 替代内部高度的数值，自动附加 dvw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.dvw(1, 2)
   */
  dvw(value1: number, value2: number): string;
  override dvw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvw`).join(' '));
  }
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.dvh(1)
   */
  dvh(value1: number): string;
  /**
   * 使用 dvh 单位生成完整属性声明。动态视口高度的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 dvh。
   * @param value2 替代内部高度的数值，自动附加 dvh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.dvh(1, 2)
   */
  dvh(value1: number, value2: number): string;
  override dvh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvh`).join(' '));
  }
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.dvi(1)
   */
  dvi(value1: number): string;
  /**
   * 使用 dvi 单位生成完整属性声明。动态视口行内轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 dvi。
   * @param value2 替代内部高度的数值，自动附加 dvi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.dvi(1, 2)
   */
  dvi(value1: number, value2: number): string;
  override dvi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvi`).join(' '));
  }
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.dvb(1)
   */
  dvb(value1: number): string;
  /**
   * 使用 dvb 单位生成完整属性声明。动态视口块轴尺寸的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 dvb。
   * @param value2 替代内部高度的数值，自动附加 dvb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.dvb(1, 2)
   */
  dvb(value1: number, value2: number): string;
  override dvb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvb`).join(' '));
  }
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.dvmin(1)
   */
  dvmin(value1: number): string;
  /**
   * 使用 dvmin 单位生成完整属性声明。动态视口宽高中的较小值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 dvmin。
   * @param value2 替代内部高度的数值，自动附加 dvmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.dvmin(1, 2)
   */
  dvmin(value1: number, value2: number): string;
  override dvmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmin`).join(' '));
  }
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.dvmax(1)
   */
  dvmax(value1: number): string;
  /**
   * 使用 dvmax 单位生成完整属性声明。动态视口宽高中的较大值的 1%。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 dvmax。
   * @param value2 替代内部高度的数值，自动附加 dvmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.dvmax(1, 2)
   */
  dvmax(value1: number, value2: number): string;
  override dvmax(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}dvmax`).join(' '));
  }
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cqw(1)
   */
  cqw(value1: number): string;
  /**
   * 使用 cqw 单位生成完整属性声明。符合条件的查询容器宽度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 cqw。
   * @param value2 替代内部高度的数值，自动附加 cqw。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cqw(1, 2)
   */
  cqw(value1: number, value2: number): string;
  override cqw(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqw`).join(' '));
  }
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cqh(1)
   */
  cqh(value1: number): string;
  /**
   * 使用 cqh 单位生成完整属性声明。符合条件的查询容器高度的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 cqh。
   * @param value2 替代内部高度的数值，自动附加 cqh。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cqh(1, 2)
   */
  cqh(value1: number, value2: number): string;
  override cqh(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqh`).join(' '));
  }
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cqi(1)
   */
  cqi(value1: number): string;
  /**
   * 使用 cqi 单位生成完整属性声明。符合条件的查询容器行内轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 cqi。
   * @param value2 替代内部高度的数值，自动附加 cqi。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cqi(1, 2)
   */
  cqi(value1: number, value2: number): string;
  override cqi(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqi`).join(' '));
  }
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cqb(1)
   */
  cqb(value1: number): string;
  /**
   * 使用 cqb 单位生成完整属性声明。符合条件的查询容器块轴尺寸的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 cqb。
   * @param value2 替代内部高度的数值，自动附加 cqb。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cqb(1, 2)
   */
  cqb(value1: number, value2: number): string;
  override cqb(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqb`).join(' '));
  }
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cqmin(1)
   */
  cqmin(value1: number): string;
  /**
   * 使用 cqmin 单位生成完整属性声明。符合条件的查询容器宽高中的较小值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 cqmin。
   * @param value2 替代内部高度的数值，自动附加 cqmin。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cqmin(1, 2)
   */
  cqmin(value1: number, value2: number): string;
  override cqmin(...values: number[]): string {
    return this.declaration(values.map((value) => `${value}cqmin`).join(' '));
  }
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度与替代内部高度的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cqmax(1)
   */
  cqmax(value1: number): string;
  /**
   * 使用 cqmax 单位生成完整属性声明。符合条件的查询容器宽高中的较大值的 1%；无合适容器时按小视口规则回退。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value1 替代内部宽度的数值，自动附加 cqmax。
   * @param value2 替代内部高度的数值，自动附加 cqmax。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.containIntrinsicSize.cqmax(1, 2)
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
   * s.containIntrinsicSize.calc('var(--value) * 2')
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
   * s.containIntrinsicSize.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ContainIntrinsicSize | CssString,
    ...others: (Property.ContainIntrinsicSize | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.containIntrinsicSize.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ContainIntrinsicSize | CssString,
    ...others: (Property.ContainIntrinsicSize | CssString)[]
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
   * s.containIntrinsicSize.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ContainIntrinsicSize | CssString,
    preferred: Property.ContainIntrinsicSize | CssString,
    maximum: Property.ContainIntrinsicSize | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * contain-intrinsic-size 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ContainIntrinsicSizeCss = ContainIntrinsicSizeCssRuntime &
  KeywordDeclarations<ContainIntrinsicSizeKeywords>;
/**
 * 集中设置尺寸隔离时使用的替代内部宽高。（contain-intrinsic-size）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-size
 */
export const ContainIntrinsicSizeCss =
  ContainIntrinsicSizeCssRuntime as new () => ContainIntrinsicSizeCss;

/**
 * contain-intrinsic-width 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ContainIntrinsicWidthKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.ContainIntrinsicWidth | CssString
>;
/**
 * 创建 contain-intrinsic-width 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ContainIntrinsicWidthKeywords()
 */
export const ContainIntrinsicWidthKeywords = class ContainIntrinsicWidthKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => ContainIntrinsicWidthKeywords;

/**
 * contain-intrinsic-width 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ContainIntrinsicWidthCssRuntime extends LengthCssProperty {
  /**
   * 创建 contain-intrinsic-width 属性作者；普通使用通过 s.containIntrinsicWidth 取得共享实例。
   * @example
   * class CustomContainIntrinsicWidthCss extends ContainIntrinsicWidthCss {}
   */
  constructor() {
    super('contain-intrinsic-width');
    initializeKeywordDeclarations(this, 'contain-intrinsic-width', noneKeywords);
  }
  /**
   * 原样生成 contain-intrinsic-width 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 contain-intrinsic-width:value;，undefined 返回空字符串。
   * @example
   * s.containIntrinsicWidth.raw('inherit') // contain-intrinsic-width:inherit;
   */
  raw(value: Property.ContainIntrinsicWidth | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.containIntrinsicWidth.calc('var(--value) * 2')
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
   * s.containIntrinsicWidth.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.ContainIntrinsicWidth | CssString,
    ...others: (Property.ContainIntrinsicWidth | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.containIntrinsicWidth.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.ContainIntrinsicWidth | CssString,
    ...others: (Property.ContainIntrinsicWidth | CssString)[]
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
   * s.containIntrinsicWidth.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.ContainIntrinsicWidth | CssString,
    preferred: Property.ContainIntrinsicWidth | CssString,
    maximum: Property.ContainIntrinsicWidth | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * contain-intrinsic-width 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ContainIntrinsicWidthCss = ContainIntrinsicWidthCssRuntime &
  KeywordDeclarations<ContainIntrinsicWidthKeywords>;
/**
 * 设置宽度隔离或跳过内容渲染时使用的替代内部宽度。（contain-intrinsic-width）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/contain-intrinsic-width
 */
export const ContainIntrinsicWidthCss =
  ContainIntrinsicWidthCssRuntime as new () => ContainIntrinsicWidthCss;

/**
 * container 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ContainerKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.Container | CssString
>;
/**
 * 创建 container 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ContainerKeywords()
 */
export const ContainerKeywords = class ContainerKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => ContainerKeywords;

/**
 * container 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ContainerCssRuntime extends CssProperty {
  /**
   * 创建 container 属性作者；普通使用通过 s.container 取得共享实例。
   * @example
   * class CustomContainerCss extends ContainerCss {}
   */
  constructor() {
    super('container');
    initializeKeywordDeclarations(this, 'container', noneKeywords);
  }
  /**
   * 原样生成 container 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 container:value;，undefined 返回空字符串。
   * @example
   * s.container.raw('inherit') // container:inherit;
   */
  raw(value: Property.Container | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * container 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ContainerCss = ContainerCssRuntime & KeywordDeclarations<ContainerKeywords>;
/**
 * 同时声明查询容器的名称和类型。（container）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container
 */
export const ContainerCss = ContainerCssRuntime as new () => ContainerCss;

/**
 * container-name 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ContainerNameKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.ContainerName | CssString
>;
/**
 * 创建 container-name 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ContainerNameKeywords()
 */
export const ContainerNameKeywords = class ContainerNameKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => ContainerNameKeywords;

/**
 * container-name 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ContainerNameCssRuntime extends CssProperty {
  /**
   * 创建 container-name 属性作者；普通使用通过 s.containerName 取得共享实例。
   * @example
   * class CustomContainerNameCss extends ContainerNameCss {}
   */
  constructor() {
    super('container-name');
    initializeKeywordDeclarations(this, 'container-name', noneKeywords);
  }
  /**
   * 原样生成 container-name 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 container-name:value;，undefined 返回空字符串。
   * @example
   * s.containerName.raw('inherit') // container-name:inherit;
   */
  raw(value: Property.ContainerName | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * container-name 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ContainerNameCss = ContainerNameCssRuntime & KeywordDeclarations<ContainerNameKeywords>;
/**
 * 为查询容器命名，供 @container 条件规则选择。（container-name）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-name
 */
export const ContainerNameCss = ContainerNameCssRuntime as new () => ContainerNameCss;
import { containerTypeKeywords } from './keyword-sets.js';

/**
 * container-type 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ContainerTypeKeywords = KeywordValuesOf<
  typeof containerTypeKeywords,
  Property.ContainerType | CssString
>;
/**
 * 创建 container-type 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ContainerTypeKeywords()
 */
export const ContainerTypeKeywords = class ContainerTypeKeywords {
  constructor() {
    Object.assign(this, containerTypeKeywords);
  }
} as new () => ContainerTypeKeywords;

/**
 * container-type 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ContainerTypeCssRuntime extends CssProperty {
  /**
   * 创建 container-type 属性作者；普通使用通过 s.containerType 取得共享实例。
   * @example
   * class CustomContainerTypeCss extends ContainerTypeCss {}
   */
  constructor() {
    super('container-type');
    initializeKeywordDeclarations(this, 'container-type', containerTypeKeywords);
  }
  /**
   * 原样生成 container-type 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 container-type:value;，undefined 返回空字符串。
   * @example
   * s.containerType.raw('inherit') // container-type:inherit;
   */
  raw(value: Property.ContainerType | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * container-type 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ContainerTypeCss = ContainerTypeCssRuntime & KeywordDeclarations<ContainerTypeKeywords>;
/**
 * 建立指定类型的查询容器，并施加所需的隔离行为。（container-type）
 *
 * 建立尺寸查询容器会同时引入必要的隔离语义；容器本身的样式通常由祖先查询容器决定。
 *
 * 常用值：
 * - `normal`：不建立尺寸查询容器；仍可用于支持的样式查询。
 * - `inline-size`：建立行内轴尺寸查询容器，不同时隔离块轴尺寸。
 * - `size`：建立两个轴的尺寸查询容器，内容不再直接决定其隔离尺寸。
 *
 * 适用场景：让组件按所在容器尺寸响应，而不是只按视口响应。
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @example
 * s.containerType.inlineSize
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/container-type
 */
export const ContainerTypeCss = ContainerTypeCssRuntime as new () => ContainerTypeCss;
import { contentKeywords } from './keyword-sets.js';

/**
 * content 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ContentKeywords = KeywordValuesOf<typeof contentKeywords, Property.Content | CssString>;
/**
 * 创建 content 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ContentKeywords()
 */
export const ContentKeywords = class ContentKeywords {
  constructor() {
    Object.assign(this, contentKeywords);
  }
} as new () => ContentKeywords;

/**
 * content 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ContentCssRuntime extends CssProperty {
  /**
   * 创建 content 属性作者；普通使用通过 s.content 取得共享实例。
   * @example
   * class CustomContentCss extends ContentCss {}
   */
  constructor() {
    super('content');
    initializeKeywordDeclarations(this, 'content', contentKeywords);
  }
  /**
   * 原样生成 content 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 content:value;，undefined 返回空字符串。
   * @example
   * s.content.raw('inherit') // content:inherit;
   */
  raw(value: Property.Content | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * content 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ContentCss = ContentCssRuntime & KeywordDeclarations<ContentKeywords>;
/**
 * 设置生成内容、替换内容或伪元素的内容。（content）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content
 */
export const ContentCss = ContentCssRuntime as new () => ContentCss;
import { contentVisibilityKeywords } from './keyword-sets.js';

/**
 * content-visibility 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ContentVisibilityKeywords = KeywordValuesOf<
  typeof contentVisibilityKeywords,
  Property.ContentVisibility | CssString
>;
/**
 * 创建 content-visibility 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ContentVisibilityKeywords()
 */
export const ContentVisibilityKeywords = class ContentVisibilityKeywords {
  constructor() {
    Object.assign(this, contentVisibilityKeywords);
  }
} as new () => ContentVisibilityKeywords;

/**
 * content-visibility 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ContentVisibilityCssRuntime extends CssProperty {
  /**
   * 创建 content-visibility 属性作者；普通使用通过 s.contentVisibility 取得共享实例。
   * @example
   * class CustomContentVisibilityCss extends ContentVisibilityCss {}
   */
  constructor() {
    super('content-visibility');
    initializeKeywordDeclarations(this, 'content-visibility', contentVisibilityKeywords);
  }
  /**
   * 原样生成 content-visibility 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 content-visibility:value;，undefined 返回空字符串。
   * @example
   * s.contentVisibility.raw('inherit') // content-visibility:inherit;
   */
  raw(value: Property.ContentVisibility | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * content-visibility 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ContentVisibilityCss = ContentVisibilityCssRuntime &
  KeywordDeclarations<ContentVisibilityKeywords>;
/**
 * 控制是否渲染元素内容，并允许浏览器跳过暂时不可见的子树。（content-visibility）
 *
 * 允许跳过子树渲染；跳过时的占位尺寸可由 contain-intrinsic-size 提供。
 *
 * 常用值：
 * - `visible`：正常渲染内容，不由此属性跳过子树。
 * - `auto`：允许浏览器跳过与用户暂不相关的内容渲染，仍需维护布局和可访问性语义。
 * - `hidden`：跳过内容渲染，行为不同于只隐藏绘制的 visibility:hidden。
 *
 * 适用场景：页面中较长、暂时位于视口外的独立内容区域。
 *
 * CSS 初始值：`visible`（不同于浏览器默认样式表）。
 * @example
 * s.contentVisibility.auto
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/content-visibility
 */
export const ContentVisibilityCss = ContentVisibilityCssRuntime as new () => ContentVisibilityCss;

/**
 * counter-increment 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type CounterIncrementKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.CounterIncrement | CssString
>;
/**
 * 创建 counter-increment 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new CounterIncrementKeywords()
 */
export const CounterIncrementKeywords = class CounterIncrementKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => CounterIncrementKeywords;

/**
 * counter-increment 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class CounterIncrementCssRuntime extends CssProperty {
  /**
   * 创建 counter-increment 属性作者；普通使用通过 s.counterIncrement 取得共享实例。
   * @example
   * class CustomCounterIncrementCss extends CounterIncrementCss {}
   */
  constructor() {
    super('counter-increment');
    initializeKeywordDeclarations(this, 'counter-increment', noneKeywords);
  }
  /**
   * 原样生成 counter-increment 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 counter-increment:value;，undefined 返回空字符串。
   * @example
   * s.counterIncrement.raw('inherit') // counter-increment:inherit;
   */
  raw(value: Property.CounterIncrement | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * counter-increment 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type CounterIncrementCss = CounterIncrementCssRuntime &
  KeywordDeclarations<CounterIncrementKeywords>;
/**
 * 增加或减少指定 CSS 计数器的值。（counter-increment）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-increment
 */
export const CounterIncrementCss = CounterIncrementCssRuntime as new () => CounterIncrementCss;

/**
 * counter-reset 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type CounterResetKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.CounterReset | CssString
>;
/**
 * 创建 counter-reset 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new CounterResetKeywords()
 */
export const CounterResetKeywords = class CounterResetKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => CounterResetKeywords;

/**
 * counter-reset 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class CounterResetCssRuntime extends CssProperty {
  /**
   * 创建 counter-reset 属性作者；普通使用通过 s.counterReset 取得共享实例。
   * @example
   * class CustomCounterResetCss extends CounterResetCss {}
   */
  constructor() {
    super('counter-reset');
    initializeKeywordDeclarations(this, 'counter-reset', noneKeywords);
  }
  /**
   * 原样生成 counter-reset 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 counter-reset:value;，undefined 返回空字符串。
   * @example
   * s.counterReset.raw('inherit') // counter-reset:inherit;
   */
  raw(value: Property.CounterReset | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * counter-reset 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type CounterResetCss = CounterResetCssRuntime & KeywordDeclarations<CounterResetKeywords>;
/**
 * 创建或重置 CSS 计数器。（counter-reset）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-reset
 */
export const CounterResetCss = CounterResetCssRuntime as new () => CounterResetCss;

/**
 * counter-set 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type CounterSetKeywords = KeywordValuesOf<
  typeof noneKeywords,
  Property.CounterSet | CssString
>;
/**
 * 创建 counter-set 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new CounterSetKeywords()
 */
export const CounterSetKeywords = class CounterSetKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => CounterSetKeywords;

/**
 * counter-set 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class CounterSetCssRuntime extends CssProperty {
  /**
   * 创建 counter-set 属性作者；普通使用通过 s.counterSet 取得共享实例。
   * @example
   * class CustomCounterSetCss extends CounterSetCss {}
   */
  constructor() {
    super('counter-set');
    initializeKeywordDeclarations(this, 'counter-set', noneKeywords);
  }
  /**
   * 原样生成 counter-set 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 counter-set:value;，undefined 返回空字符串。
   * @example
   * s.counterSet.raw('inherit') // counter-set:inherit;
   */
  raw(value: Property.CounterSet | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * counter-set 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type CounterSetCss = CounterSetCssRuntime & KeywordDeclarations<CounterSetKeywords>;
/**
 * 设置已有 CSS 计数器的值，必要时创建计数器。（counter-set）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/counter-set
 */
export const CounterSetCss = CounterSetCssRuntime as new () => CounterSetCss;
import { cursorKeywords } from './keyword-sets.js';

/**
 * cursor 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type CursorKeywords = KeywordValuesOf<typeof cursorKeywords, Property.Cursor | CssString>;
/**
 * 创建 cursor 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new CursorKeywords()
 */
export const CursorKeywords = class CursorKeywords {
  constructor() {
    Object.assign(this, cursorKeywords);
  }
} as new () => CursorKeywords;

/**
 * cursor 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class CursorCssRuntime extends CssProperty {
  /**
   * 创建 cursor 属性作者；普通使用通过 s.cursor 取得共享实例。
   * @example
   * class CustomCursorCss extends CursorCss {}
   */
  constructor() {
    super('cursor');
    initializeKeywordDeclarations(this, 'cursor', cursorKeywords);
  }
  /**
   * 原样生成 cursor 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 cursor:value;，undefined 返回空字符串。
   * @example
   * s.cursor.raw('inherit') // cursor:inherit;
   */
  raw(value: Property.Cursor | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * cursor 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type CursorCss = CursorCssRuntime & KeywordDeclarations<CursorKeywords>;
/**
 * 设置指针位于元素上方时显示的光标。（cursor）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cursor
 */
export const CursorCss = CursorCssRuntime as new () => CursorCss;
import { globalKeywords } from './keyword-sets.js';

/**
 * cx 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type CxKeywords = KeywordValuesOf<typeof globalKeywords, Property.Cx | CssString>;
/**
 * 创建 cx 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new CxKeywords()
 */
export const CxKeywords = class CxKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => CxKeywords;

/**
 * cx 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class CxCssRuntime extends LengthCssProperty {
  /**
   * 创建 cx 属性作者；普通使用通过 s.cx 取得共享实例。
   * @example
   * class CustomCxCss extends CxCss {}
   */
  constructor() {
    super('cx');
    initializeKeywordDeclarations(this, 'cx', globalKeywords);
  }
  /**
   * 原样生成 cx 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 cx:value;，undefined 返回空字符串。
   * @example
   * s.cx.raw('inherit') // cx:inherit;
   */
  raw(value: Property.Cx | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.cx.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.cx.calc('var(--value) * 2')
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
   * s.cx.min('var(--first)', 'var(--second)')
   */
  min(value: Property.Cx | CssString, ...others: (Property.Cx | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.cx.max('var(--first)', 'var(--second)')
   */
  max(value: Property.Cx | CssString, ...others: (Property.Cx | CssString)[]): string {
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
   * s.cx.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Cx | CssString,
    preferred: Property.Cx | CssString,
    maximum: Property.Cx | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * cx 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type CxCss = CxCssRuntime & KeywordDeclarations<CxKeywords>;
/**
 * 设置 SVG 圆或椭圆中心的横坐标。（cx）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cx
 */
export const CxCss = CxCssRuntime as new () => CxCss;

/**
 * cy 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type CyKeywords = KeywordValuesOf<typeof globalKeywords, Property.Cy | CssString>;
/**
 * 创建 cy 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new CyKeywords()
 */
export const CyKeywords = class CyKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => CyKeywords;

/**
 * cy 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class CyCssRuntime extends LengthCssProperty {
  /**
   * 创建 cy 属性作者；普通使用通过 s.cy 取得共享实例。
   * @example
   * class CustomCyCss extends CyCss {}
   */
  constructor() {
    super('cy');
    initializeKeywordDeclarations(this, 'cy', globalKeywords);
  }
  /**
   * 原样生成 cy 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 cy:value;，undefined 返回空字符串。
   * @example
   * s.cy.raw('inherit') // cy:inherit;
   */
  raw(value: Property.Cy | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.cy.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.cy.calc('var(--value) * 2')
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
   * s.cy.min('var(--first)', 'var(--second)')
   */
  min(value: Property.Cy | CssString, ...others: (Property.Cy | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.cy.max('var(--first)', 'var(--second)')
   */
  max(value: Property.Cy | CssString, ...others: (Property.Cy | CssString)[]): string {
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
   * s.cy.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Cy | CssString,
    preferred: Property.Cy | CssString,
    maximum: Property.Cy | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * cy 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type CyCss = CyCssRuntime & KeywordDeclarations<CyKeywords>;
/**
 * 设置 SVG 圆或椭圆中心的纵坐标。（cy）
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/cy
 */
export const CyCss = CyCssRuntime as new () => CyCss;

/**
 * d 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type DKeywords = KeywordValuesOf<typeof noneKeywords, Property.D | CssString>;
/**
 * 创建 d 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new DKeywords()
 */
export const DKeywords = class DKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => DKeywords;

/**
 * d 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class DCssRuntime extends CssProperty {
  /**
   * 创建 d 属性作者；普通使用通过 s.d 取得共享实例。
   * @example
   * class CustomDCss extends DCss {}
   */
  constructor() {
    super('d');
    initializeKeywordDeclarations(this, 'd', noneKeywords);
  }
  /**
   * 原样生成 d 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 d:value;，undefined 返回空字符串。
   * @example
   * s.d.raw('inherit') // d:inherit;
   */
  raw(value: Property.D | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * d 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type DCss = DCssRuntime & KeywordDeclarations<DKeywords>;
/**
 * 设置 SVG path 元素的路径数据。（d）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/d
 */
export const DCss = DCssRuntime as new () => DCss;
import { directionKeywords } from './keyword-sets.js';

/**
 * direction 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type DirectionKeywords = KeywordValuesOf<
  typeof directionKeywords,
  Property.Direction | CssString
>;
/**
 * 创建 direction 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new DirectionKeywords()
 */
export const DirectionKeywords = class DirectionKeywords {
  constructor() {
    Object.assign(this, directionKeywords);
  }
} as new () => DirectionKeywords;

/**
 * direction 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class DirectionCssRuntime extends CssProperty {
  /**
   * 创建 direction 属性作者；普通使用通过 s.direction 取得共享实例。
   * @example
   * class CustomDirectionCss extends DirectionCss {}
   */
  constructor() {
    super('direction');
    initializeKeywordDeclarations(this, 'direction', directionKeywords);
  }
  /**
   * 原样生成 direction 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 direction:value;，undefined 返回空字符串。
   * @example
   * s.direction.raw('inherit') // direction:inherit;
   */
  raw(value: Property.Direction | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * direction 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type DirectionCss = DirectionCssRuntime & KeywordDeclarations<DirectionKeywords>;
/**
 * 设置文本基本方向，参与双向文本及部分布局计算。（direction）
 *
 * CSS 初始值：`ltr`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/direction
 */
export const DirectionCss = DirectionCssRuntime as new () => DirectionCss;
import { displayKeywords } from './keyword-sets.js';

/**
 * display 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type DisplayKeywords = KeywordValuesOf<typeof displayKeywords, Property.Display | CssString>;
/**
 * 创建 display 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new DisplayKeywords()
 */
export const DisplayKeywords = class DisplayKeywords {
  constructor() {
    Object.assign(this, displayKeywords);
  }
} as new () => DisplayKeywords;

/**
 * display 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class DisplayCssRuntime extends CssProperty {
  /**
   * 创建 display 属性作者；普通使用通过 s.display 取得共享实例。
   * @example
   * class CustomDisplayCss extends DisplayCss {}
   */
  constructor() {
    super('display');
    initializeKeywordDeclarations(this, 'display', displayKeywords);
  }
  /**
   * 原样生成 display 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 display:value;，undefined 返回空字符串。
   * @example
   * s.display.raw('inherit') // display:inherit;
   */
  raw(value: Property.Display | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * display 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type DisplayCss = DisplayCssRuntime & KeywordDeclarations<DisplayKeywords>;
/**
 * 决定元素是否生成布局盒子，以及元素自身和内部内容如何排版。（display）
 *
 * 外部显示类型决定元素自身以块级还是行内级方式参与周围布局；内部布局方式决定内容使用普通流、Flex 或 Grid 等布局。此属性不继承；例如 div 通常由浏览器默认样式设置为 block。
 *
 * 常用值：
 * - `block`：生成块级盒子，内部默认采用普通流布局。
 * - `inline`：生成行内盒子，参与行内排版；普通非替换行内盒子的宽高不按块盒规则应用。
 * - `flex`：生成块级弹性容器，直接子元素参与 Flex 布局。
 * - `inline-flex`：创建行内级的 Flex 容器。
 * - `grid`：生成块级网格容器，直接子元素参与 Grid 布局。
 * - `none`：不生成元素及其后代的布局盒子，通常也从可访问性树中移除。
 *
 * 适用场景：选择容器的布局方式；具体对齐、间距和换行由对应布局属性控制。
 *
 * CSS 初始值：`inline`（不同于浏览器默认样式表）。
 * @example
 * css(s.display.flex, s.alignItems.center, s.gap.rem(0.5))
 * @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/display
 */
export const DisplayCss = DisplayCssRuntime as new () => DisplayCss;
import { dominantBaselineKeywords } from './keyword-sets.js';

/**
 * dominant-baseline 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type DominantBaselineKeywords = KeywordValuesOf<
  typeof dominantBaselineKeywords,
  Property.DominantBaseline | CssString
>;
/**
 * 创建 dominant-baseline 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new DominantBaselineKeywords()
 */
export const DominantBaselineKeywords = class DominantBaselineKeywords {
  constructor() {
    Object.assign(this, dominantBaselineKeywords);
  }
} as new () => DominantBaselineKeywords;

/**
 * dominant-baseline 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class DominantBaselineCssRuntime extends CssProperty {
  /**
   * 创建 dominant-baseline 属性作者；普通使用通过 s.dominantBaseline 取得共享实例。
   * @example
   * class CustomDominantBaselineCss extends DominantBaselineCss {}
   */
  constructor() {
    super('dominant-baseline');
    initializeKeywordDeclarations(this, 'dominant-baseline', dominantBaselineKeywords);
  }
  /**
   * 原样生成 dominant-baseline 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 dominant-baseline:value;，undefined 返回空字符串。
   * @example
   * s.dominantBaseline.raw('inherit') // dominant-baseline:inherit;
   */
  raw(value: Property.DominantBaseline | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * dominant-baseline 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type DominantBaselineCss = DominantBaselineCssRuntime &
  KeywordDeclarations<DominantBaselineKeywords>;
/**
 * 选择 SVG 文本布局的主导基线及基线表。（dominant-baseline）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/dominant-baseline
 */
export const DominantBaselineCss = DominantBaselineCssRuntime as new () => DominantBaselineCss;
import { emptyCellsKeywords } from './keyword-sets.js';

/**
 * empty-cells 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type EmptyCellsKeywords = KeywordValuesOf<
  typeof emptyCellsKeywords,
  Property.EmptyCells | CssString
>;
/**
 * 创建 empty-cells 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new EmptyCellsKeywords()
 */
export const EmptyCellsKeywords = class EmptyCellsKeywords {
  constructor() {
    Object.assign(this, emptyCellsKeywords);
  }
} as new () => EmptyCellsKeywords;

/**
 * empty-cells 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class EmptyCellsCssRuntime extends CssProperty {
  /**
   * 创建 empty-cells 属性作者；普通使用通过 s.emptyCells 取得共享实例。
   * @example
   * class CustomEmptyCellsCss extends EmptyCellsCss {}
   */
  constructor() {
    super('empty-cells');
    initializeKeywordDeclarations(this, 'empty-cells', emptyCellsKeywords);
  }
  /**
   * 原样生成 empty-cells 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 empty-cells:value;，undefined 返回空字符串。
   * @example
   * s.emptyCells.raw('inherit') // empty-cells:inherit;
   */
  raw(value: Property.EmptyCells | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * empty-cells 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type EmptyCellsCss = EmptyCellsCssRuntime & KeywordDeclarations<EmptyCellsKeywords>;
/**
 * 控制分离边框表格中空单元格的边框和背景是否绘制。（empty-cells）
 *
 * CSS 初始值：`show`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/empty-cells
 */
export const EmptyCellsCss = EmptyCellsCssRuntime as new () => EmptyCellsCss;
import { fieldSizingKeywords } from './keyword-sets.js';

/**
 * field-sizing 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FieldSizingKeywords = KeywordValuesOf<
  typeof fieldSizingKeywords,
  Property.FieldSizing | CssString
>;
/**
 * 创建 field-sizing 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FieldSizingKeywords()
 */
export const FieldSizingKeywords = class FieldSizingKeywords {
  constructor() {
    Object.assign(this, fieldSizingKeywords);
  }
} as new () => FieldSizingKeywords;

/**
 * field-sizing 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FieldSizingCssRuntime extends CssProperty {
  /**
   * 创建 field-sizing 属性作者；普通使用通过 s.fieldSizing 取得共享实例。
   * @example
   * class CustomFieldSizingCss extends FieldSizingCss {}
   */
  constructor() {
    super('field-sizing');
    initializeKeywordDeclarations(this, 'field-sizing', fieldSizingKeywords);
  }
  /**
   * 原样生成 field-sizing 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 field-sizing:value;，undefined 返回空字符串。
   * @example
   * s.fieldSizing.raw('inherit') // field-sizing:inherit;
   */
  raw(value: Property.FieldSizing | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * field-sizing 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FieldSizingCss = FieldSizingCssRuntime & KeywordDeclarations<FieldSizingKeywords>;
/**
 * 控制表单控件采用固定默认尺寸还是根据内容调整尺寸。（field-sizing）
 *
 * CSS 初始值：`fixed`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/field-sizing
 */
export const FieldSizingCss = FieldSizingCssRuntime as new () => FieldSizingCss;
import { fillKeywords } from './keyword-sets.js';

/**
 * fill 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FillKeywords = KeywordValuesOf<typeof fillKeywords, Property.Fill | CssString>;
/**
 * 创建 fill 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FillKeywords()
 */
export const FillKeywords = class FillKeywords {
  constructor() {
    Object.assign(this, fillKeywords);
  }
} as new () => FillKeywords;

/**
 * fill 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FillCssRuntime extends CssProperty {
  /**
   * 创建 fill 属性作者；普通使用通过 s.fill 取得共享实例。
   * @example
   * class CustomFillCss extends FillCss {}
   */
  constructor() {
    super('fill');
    initializeKeywordDeclarations(this, 'fill', fillKeywords);
  }
  /**
   * 原样生成 fill 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 fill:value;，undefined 返回空字符串。
   * @example
   * s.fill.raw('inherit') // fill:inherit;
   */
  raw(value: Property.Fill | CssString | undefined): string {
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
   * s.fill.rgb(255, 0, 0, 0.5)
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
   * s.fill.hsl(210, 50, 40, 0.8)
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
   * s.fill.oklch(0.7, 0.15, 250)
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
   * s.fill.oklab(0.7, 0.1, -0.1)
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
 * fill 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FillCss = FillCssRuntime & KeywordDeclarations<FillKeywords>;
/**
 * 设置 SVG 图形内部的填充绘制方式。（fill）
 *
 * CSS 初始值：`black`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill
 */
export const FillCss = FillCssRuntime as new () => FillCss;

/**
 * fill-opacity 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FillOpacityKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.FillOpacity | CssString
>;
/**
 * 创建 fill-opacity 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FillOpacityKeywords()
 */
export const FillOpacityKeywords = class FillOpacityKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => FillOpacityKeywords;

/**
 * fill-opacity 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FillOpacityCssRuntime extends CssProperty {
  /**
   * 创建 fill-opacity 属性作者；普通使用通过 s.fillOpacity 取得共享实例。
   * @example
   * class CustomFillOpacityCss extends FillOpacityCss {}
   */
  constructor() {
    super('fill-opacity');
    initializeKeywordDeclarations(this, 'fill-opacity', globalKeywords);
  }
  /**
   * 原样生成 fill-opacity 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 fill-opacity:value;，undefined 返回空字符串。
   * @example
   * s.fillOpacity.raw('inherit') // fill-opacity:inherit;
   */
  raw(value: Property.FillOpacity | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.fillOpacity.calc('var(--value) * 2')
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
   * s.fillOpacity.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.FillOpacity | CssString,
    ...others: (Property.FillOpacity | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.fillOpacity.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.FillOpacity | CssString,
    ...others: (Property.FillOpacity | CssString)[]
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
   * s.fillOpacity.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.FillOpacity | CssString,
    preferred: Property.FillOpacity | CssString,
    maximum: Property.FillOpacity | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * fill-opacity 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FillOpacityCss = FillOpacityCssRuntime & KeywordDeclarations<FillOpacityKeywords>;
/**
 * 设置 SVG 填充的不透明度，不影响描边。（fill-opacity）
 *
 * CSS 初始值：`1`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-opacity
 */
export const FillOpacityCss = FillOpacityCssRuntime as new () => FillOpacityCss;
import { fillRuleKeywords } from './keyword-sets.js';

/**
 * fill-rule 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FillRuleKeywords = KeywordValuesOf<
  typeof fillRuleKeywords,
  Property.FillRule | CssString
>;
/**
 * 创建 fill-rule 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FillRuleKeywords()
 */
export const FillRuleKeywords = class FillRuleKeywords {
  constructor() {
    Object.assign(this, fillRuleKeywords);
  }
} as new () => FillRuleKeywords;

/**
 * fill-rule 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FillRuleCssRuntime extends CssProperty {
  /**
   * 创建 fill-rule 属性作者；普通使用通过 s.fillRule 取得共享实例。
   * @example
   * class CustomFillRuleCss extends FillRuleCss {}
   */
  constructor() {
    super('fill-rule');
    initializeKeywordDeclarations(this, 'fill-rule', fillRuleKeywords);
  }
  /**
   * 原样生成 fill-rule 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 fill-rule:value;，undefined 返回空字符串。
   * @example
   * s.fillRule.raw('inherit') // fill-rule:inherit;
   */
  raw(value: Property.FillRule | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * fill-rule 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FillRuleCss = FillRuleCssRuntime & KeywordDeclarations<FillRuleKeywords>;
/**
 * 设置复杂 SVG 路径的内部区域判定规则。（fill-rule）
 *
 * CSS 初始值：`nonzero`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/fill-rule
 */
export const FillRuleCss = FillRuleCssRuntime as new () => FillRuleCss;

/**
 * filter 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FilterKeywords = KeywordValuesOf<typeof noneKeywords, Property.Filter | CssString>;
/**
 * 创建 filter 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FilterKeywords()
 */
export const FilterKeywords = class FilterKeywords {
  constructor() {
    Object.assign(this, noneKeywords);
  }
} as new () => FilterKeywords;

/**
 * filter 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FilterCssRuntime extends CssProperty {
  /**
   * 创建 filter 属性作者；普通使用通过 s.filter 取得共享实例。
   * @example
   * class CustomFilterCss extends FilterCss {}
   */
  constructor() {
    super('filter');
    initializeKeywordDeclarations(this, 'filter', noneKeywords);
  }
  /**
   * 原样生成 filter 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 filter:value;，undefined 返回空字符串。
   * @example
   * s.filter.raw('inherit') // filter:inherit;
   */
  raw(value: Property.Filter | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * filter 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FilterCss = FilterCssRuntime & KeywordDeclarations<FilterKeywords>;
/**
 * 对元素的最终图像应用模糊、亮度等滤镜。（filter）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/filter
 */
export const FilterCss = FilterCssRuntime as new () => FilterCss;
import { flexKeywords } from './keyword-sets.js';

/**
 * flex 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FlexKeywords = KeywordValuesOf<typeof flexKeywords, Property.Flex | CssString>;
/**
 * 创建 flex 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FlexKeywords()
 */
export const FlexKeywords = class FlexKeywords {
  constructor() {
    Object.assign(this, flexKeywords);
  }
} as new () => FlexKeywords;

/**
 * flex 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FlexCssRuntime extends LengthCssProperty {
  /**
   * 创建 flex 属性作者；普通使用通过 s.flex 取得共享实例。
   * @example
   * class CustomFlexCss extends FlexCss {}
   */
  constructor() {
    super('flex');
    initializeKeywordDeclarations(this, 'flex', flexKeywords);
  }
  /**
   * 原样生成 flex 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 flex:value;，undefined 返回空字符串。
   * @example
   * s.flex.raw('inherit') // flex:inherit;
   */
  raw(value: Property.Flex | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.flex.calc('var(--value) * 2')
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
   * s.flex.min('var(--first)', 'var(--second)')
   */
  min(value: Property.Flex | CssString, ...others: (Property.Flex | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.flex.max('var(--first)', 'var(--second)')
   */
  max(value: Property.Flex | CssString, ...others: (Property.Flex | CssString)[]): string {
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
   * s.flex.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.Flex | CssString,
    preferred: Property.Flex | CssString,
    maximum: Property.Flex | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * flex 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FlexCss = FlexCssRuntime & KeywordDeclarations<FlexKeywords>;
/**
 * 集中设置弹性项目的增长系数、收缩系数和基础尺寸。（flex）
 *
 * 依次对应 flex-grow、flex-shrink、flex-basis。作用于弹性项目，应先由父容器建立 Flex 布局。
 *
 * 常用值：
 * - `auto`：等价于 1 1 auto：可增长、可收缩，基础尺寸由主尺寸属性或内容决定。
 * - `none`：等价于 0 0 auto：不增长也不收缩，保留自动基础尺寸。
 *
 * 适用场景：分配弹性布局中的剩余空间，或让项目保持自身尺寸。
 * @example
 * s.flex.raw('1 1 0%')
 * @example
 * s.flex.none
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex
 */
export const FlexCss = FlexCssRuntime as new () => FlexCss;
import { flexBasisKeywords } from './keyword-sets.js';

/**
 * flex-basis 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FlexBasisKeywords = KeywordValuesOf<
  typeof flexBasisKeywords,
  Property.FlexBasis | CssString
>;
/**
 * 创建 flex-basis 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FlexBasisKeywords()
 */
export const FlexBasisKeywords = class FlexBasisKeywords {
  constructor() {
    Object.assign(this, flexBasisKeywords);
  }
} as new () => FlexBasisKeywords;

/**
 * flex-basis 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FlexBasisCssRuntime extends LengthCssProperty {
  /**
   * 创建 flex-basis 属性作者；普通使用通过 s.flexBasis 取得共享实例。
   * @example
   * class CustomFlexBasisCss extends FlexBasisCss {}
   */
  constructor() {
    super('flex-basis');
    initializeKeywordDeclarations(this, 'flex-basis', flexBasisKeywords);
  }
  /**
   * 原样生成 flex-basis 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 flex-basis:value;，undefined 返回空字符串。
   * @example
   * s.flexBasis.raw('inherit') // flex-basis:inherit;
   */
  raw(value: Property.FlexBasis | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.flexBasis.calc('var(--value) * 2')
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
   * s.flexBasis.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.FlexBasis | CssString,
    ...others: (Property.FlexBasis | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.flexBasis.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.FlexBasis | CssString,
    ...others: (Property.FlexBasis | CssString)[]
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
   * s.flexBasis.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.FlexBasis | CssString,
    preferred: Property.FlexBasis | CssString,
    maximum: Property.FlexBasis | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * flex-basis 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FlexBasisCss = FlexBasisCssRuntime & KeywordDeclarations<FlexBasisKeywords>;
/**
 * 设置弹性项目分配剩余空间之前的主轴基础尺寸。（flex-basis）
 *
 * 在剩余空间分配前确定项目的主轴基础尺寸；设置为 auto 时先参考对应的 width/height。
 *
 * 常用值：
 * - `auto`：先参考主轴对应的 width 或 height；该值也为 auto 时由内容决定。
 * - `content`：按内容确定基础尺寸，而不直接使用 width 或 height 作为基础尺寸。
 *
 * 适用场景：为侧栏、内容区或重复项目指定弹性分配的起始尺寸。
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @example
 * s.flexBasis.rem(16)
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-basis
 */
export const FlexBasisCss = FlexBasisCssRuntime as new () => FlexBasisCss;
import { flexDirectionKeywords } from './keyword-sets.js';

/**
 * flex-direction 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FlexDirectionKeywords = KeywordValuesOf<
  typeof flexDirectionKeywords,
  Property.FlexDirection | CssString
>;
/**
 * 创建 flex-direction 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FlexDirectionKeywords()
 */
export const FlexDirectionKeywords = class FlexDirectionKeywords {
  constructor() {
    Object.assign(this, flexDirectionKeywords);
  }
} as new () => FlexDirectionKeywords;

/**
 * flex-direction 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FlexDirectionCssRuntime extends CssProperty {
  /**
   * 创建 flex-direction 属性作者；普通使用通过 s.flexDirection 取得共享实例。
   * @example
   * class CustomFlexDirectionCss extends FlexDirectionCss {}
   */
  constructor() {
    super('flex-direction');
    initializeKeywordDeclarations(this, 'flex-direction', flexDirectionKeywords);
  }
  /**
   * 原样生成 flex-direction 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 flex-direction:value;，undefined 返回空字符串。
   * @example
   * s.flexDirection.raw('inherit') // flex-direction:inherit;
   */
  raw(value: Property.FlexDirection | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * flex-direction 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FlexDirectionCss = FlexDirectionCssRuntime & KeywordDeclarations<FlexDirectionKeywords>;
/**
 * 设置弹性容器的主轴方向及项目排列方向。（flex-direction）
 *
 * row 沿行内轴，column 沿块轴；不能始终按“水平/垂直”理解。反转只改变视觉排列，不改变 DOM 顺序。
 *
 * 常用值：
 * - `row`：主轴沿行内方向排列；不一定是从左到右，取决于书写方向。
 * - `column`：主轴沿块方向排列；水平书写时通常从上到下。
 * - `row-reverse`：反转行内方向的视觉排列，不改变 DOM 顺序。
 * - `column-reverse`：反转块方向的视觉排列，不改变 DOM 顺序。
 *
 * CSS 初始值：`row`（不同于浏览器默认样式表）。
 * @example
 * css(s.display.flex, s.flexDirection.column, s.gap.rem(1))
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-direction
 */
export const FlexDirectionCss = FlexDirectionCssRuntime as new () => FlexDirectionCss;
import { flexFlowKeywords } from './keyword-sets.js';

/**
 * flex-flow 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FlexFlowKeywords = KeywordValuesOf<
  typeof flexFlowKeywords,
  Property.FlexFlow | CssString
>;
/**
 * 创建 flex-flow 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FlexFlowKeywords()
 */
export const FlexFlowKeywords = class FlexFlowKeywords {
  constructor() {
    Object.assign(this, flexFlowKeywords);
  }
} as new () => FlexFlowKeywords;

/**
 * flex-flow 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FlexFlowCssRuntime extends CssProperty {
  /**
   * 创建 flex-flow 属性作者；普通使用通过 s.flexFlow 取得共享实例。
   * @example
   * class CustomFlexFlowCss extends FlexFlowCss {}
   */
  constructor() {
    super('flex-flow');
    initializeKeywordDeclarations(this, 'flex-flow', flexFlowKeywords);
  }
  /**
   * 原样生成 flex-flow 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 flex-flow:value;，undefined 返回空字符串。
   * @example
   * s.flexFlow.raw('inherit') // flex-flow:inherit;
   */
  raw(value: Property.FlexFlow | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * flex-flow 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FlexFlowCss = FlexFlowCssRuntime & KeywordDeclarations<FlexFlowKeywords>;
/**
 * 同时设置弹性布局的主轴方向和换行方式。（flex-flow）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-flow
 */
export const FlexFlowCss = FlexFlowCssRuntime as new () => FlexFlowCss;

/**
 * flex-grow 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FlexGrowKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.FlexGrow | CssString
>;
/**
 * 创建 flex-grow 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FlexGrowKeywords()
 */
export const FlexGrowKeywords = class FlexGrowKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => FlexGrowKeywords;

/**
 * flex-grow 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FlexGrowCssRuntime extends CssProperty {
  /**
   * 创建 flex-grow 属性作者；普通使用通过 s.flexGrow 取得共享实例。
   * @example
   * class CustomFlexGrowCss extends FlexGrowCss {}
   */
  constructor() {
    super('flex-grow');
    initializeKeywordDeclarations(this, 'flex-grow', globalKeywords);
  }
  /**
   * 原样生成 flex-grow 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 flex-grow:value;，undefined 返回空字符串。
   * @example
   * s.flexGrow.raw('inherit') // flex-grow:inherit;
   */
  raw(value: Property.FlexGrow | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.flexGrow.calc('var(--value) * 2')
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
   * s.flexGrow.min('var(--first)', 'var(--second)')
   */
  min(value: Property.FlexGrow | CssString, ...others: (Property.FlexGrow | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.flexGrow.max('var(--first)', 'var(--second)')
   */
  max(value: Property.FlexGrow | CssString, ...others: (Property.FlexGrow | CssString)[]): string {
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
   * s.flexGrow.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.FlexGrow | CssString,
    preferred: Property.FlexGrow | CssString,
    maximum: Property.FlexGrow | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * flex-grow 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FlexGrowCss = FlexGrowCssRuntime & KeywordDeclarations<FlexGrowKeywords>;
/**
 * 设置弹性项目分配正剩余空间时的增长系数。（flex-grow）
 *
 * 数值是分配正剩余空间的相对权重，不是最终宽度百分比。只有容器存在剩余空间时才发挥作用。
 *
 * 适用场景：让主内容区填充工具栏或行布局的剩余空间。
 *
 * CSS 初始值：`0`（不同于浏览器默认样式表）。
 * @example
 * s.flexGrow.raw(1)
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-grow
 */
export const FlexGrowCss = FlexGrowCssRuntime as new () => FlexGrowCss;

/**
 * flex-shrink 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FlexShrinkKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.FlexShrink | CssString
>;
/**
 * 创建 flex-shrink 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FlexShrinkKeywords()
 */
export const FlexShrinkKeywords = class FlexShrinkKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => FlexShrinkKeywords;

/**
 * flex-shrink 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FlexShrinkCssRuntime extends CssProperty {
  /**
   * 创建 flex-shrink 属性作者；普通使用通过 s.flexShrink 取得共享实例。
   * @example
   * class CustomFlexShrinkCss extends FlexShrinkCss {}
   */
  constructor() {
    super('flex-shrink');
    initializeKeywordDeclarations(this, 'flex-shrink', globalKeywords);
  }
  /**
   * 原样生成 flex-shrink 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 flex-shrink:value;，undefined 返回空字符串。
   * @example
   * s.flexShrink.raw('inherit') // flex-shrink:inherit;
   */
  raw(value: Property.FlexShrink | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.flexShrink.calc('var(--value) * 2')
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
   * s.flexShrink.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.FlexShrink | CssString,
    ...others: (Property.FlexShrink | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.flexShrink.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.FlexShrink | CssString,
    ...others: (Property.FlexShrink | CssString)[]
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
   * s.flexShrink.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.FlexShrink | CssString,
    preferred: Property.FlexShrink | CssString,
    maximum: Property.FlexShrink | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * flex-shrink 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FlexShrinkCss = FlexShrinkCssRuntime & KeywordDeclarations<FlexShrinkKeywords>;
/**
 * 设置弹性项目空间不足时的收缩系数。（flex-shrink）
 *
 * 实际收缩还与 flex-basis 成比例；自动最小尺寸可能阻止项目继续缩小。
 *
 * 适用场景：控制空间不足时是否允许缩小；设置为 0 可避免图标或固定控件收缩。
 *
 * CSS 初始值：`1`（不同于浏览器默认样式表）。
 * @example
 * s.flexShrink.raw(0)
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-shrink
 */
export const FlexShrinkCss = FlexShrinkCssRuntime as new () => FlexShrinkCss;
import { flexWrapKeywords } from './keyword-sets.js';

/**
 * flex-wrap 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FlexWrapKeywords = KeywordValuesOf<
  typeof flexWrapKeywords,
  Property.FlexWrap | CssString
>;
/**
 * 创建 flex-wrap 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FlexWrapKeywords()
 */
export const FlexWrapKeywords = class FlexWrapKeywords {
  constructor() {
    Object.assign(this, flexWrapKeywords);
  }
} as new () => FlexWrapKeywords;

/**
 * flex-wrap 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FlexWrapCssRuntime extends CssProperty {
  /**
   * 创建 flex-wrap 属性作者；普通使用通过 s.flexWrap 取得共享实例。
   * @example
   * class CustomFlexWrapCss extends FlexWrapCss {}
   */
  constructor() {
    super('flex-wrap');
    initializeKeywordDeclarations(this, 'flex-wrap', flexWrapKeywords);
  }
  /**
   * 原样生成 flex-wrap 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 flex-wrap:value;，undefined 返回空字符串。
   * @example
   * s.flexWrap.raw('inherit') // flex-wrap:inherit;
   */
  raw(value: Property.FlexWrap | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * flex-wrap 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FlexWrapCss = FlexWrapCssRuntime & KeywordDeclarations<FlexWrapKeywords>;
/**
 * 设置弹性项目是否换行，以及多行的排列方向。（flex-wrap）
 *
 * 常用值：
 * - `nowrap`：保持单行；项目仍可能收缩或溢出。
 * - `wrap`：空间不足时形成多行，沿交叉轴正常方向排列。
 * - `wrap-reverse`：允许换行并反转交叉轴上各行的排列方向。
 *
 * 适用场景：标签、按钮等项目不足一行时允许分行。
 *
 * CSS 初始值：`nowrap`（不同于浏览器默认样式表）。
 * @example
 * css(s.display.flex, s.flexWrap.wrap, s.gap.rem(0.5))
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flex-wrap
 */
export const FlexWrapCss = FlexWrapCssRuntime as new () => FlexWrapCss;
import { floatKeywords } from './keyword-sets.js';

/**
 * float 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FloatKeywords = KeywordValuesOf<typeof floatKeywords, Property.Float | CssString>;
/**
 * 创建 float 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FloatKeywords()
 */
export const FloatKeywords = class FloatKeywords {
  constructor() {
    Object.assign(this, floatKeywords);
  }
} as new () => FloatKeywords;

/**
 * float 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FloatCssRuntime extends CssProperty {
  /**
   * 创建 float 属性作者；普通使用通过 s.float 取得共享实例。
   * @example
   * class CustomFloatCss extends FloatCss {}
   */
  constructor() {
    super('float');
    initializeKeywordDeclarations(this, 'float', floatKeywords);
  }
  /**
   * 原样生成 float 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 float:value;，undefined 返回空字符串。
   * @example
   * s.float.raw('inherit') // float:inherit;
   */
  raw(value: Property.Float | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * float 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FloatCss = FloatCssRuntime & KeywordDeclarations<FloatKeywords>;
/**
 * 将元素浮动到指定侧，使相邻行内内容围绕它排列。（float）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/float
 */
export const FloatCss = FloatCssRuntime as new () => FloatCss;

/**
 * flood-color 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FloodColorKeywords = KeywordValuesOf<
  typeof colorKeywords,
  Property.FloodColor | CssString
>;
/**
 * 创建 flood-color 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FloodColorKeywords()
 */
export const FloodColorKeywords = class FloodColorKeywords {
  constructor() {
    Object.assign(this, colorKeywords);
  }
} as new () => FloodColorKeywords;

/**
 * flood-color 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FloodColorCssRuntime extends CssProperty {
  /**
   * 创建 flood-color 属性作者；普通使用通过 s.floodColor 取得共享实例。
   * @example
   * class CustomFloodColorCss extends FloodColorCss {}
   */
  constructor() {
    super('flood-color');
    initializeKeywordDeclarations(this, 'flood-color', colorKeywords);
  }
  /**
   * 原样生成 flood-color 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 flood-color:value;，undefined 返回空字符串。
   * @example
   * s.floodColor.raw('inherit') // flood-color:inherit;
   */
  raw(value: Property.FloodColor | CssString | undefined): string {
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
   * s.floodColor.rgb(255, 0, 0, 0.5)
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
   * s.floodColor.hsl(210, 50, 40, 0.8)
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
   * s.floodColor.oklch(0.7, 0.15, 250)
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
   * s.floodColor.oklab(0.7, 0.1, -0.1)
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
 * flood-color 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FloodColorCss = FloodColorCssRuntime & KeywordDeclarations<FloodColorKeywords>;
/**
 * 设置 SVG feFlood 或相关滤镜的洪泛颜色。（flood-color）
 *
 * CSS 初始值：`black`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-color
 */
export const FloodColorCss = FloodColorCssRuntime as new () => FloodColorCss;

/**
 * flood-opacity 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FloodOpacityKeywords = KeywordValuesOf<
  typeof globalKeywords,
  Property.FloodOpacity | CssString
>;
/**
 * 创建 flood-opacity 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FloodOpacityKeywords()
 */
export const FloodOpacityKeywords = class FloodOpacityKeywords {
  constructor() {
    Object.assign(this, globalKeywords);
  }
} as new () => FloodOpacityKeywords;

/**
 * flood-opacity 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FloodOpacityCssRuntime extends CssProperty {
  /**
   * 创建 flood-opacity 属性作者；普通使用通过 s.floodOpacity 取得共享实例。
   * @example
   * class CustomFloodOpacityCss extends FloodOpacityCss {}
   */
  constructor() {
    super('flood-opacity');
    initializeKeywordDeclarations(this, 'flood-opacity', globalKeywords);
  }
  /**
   * 原样生成 flood-opacity 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 flood-opacity:value;，undefined 返回空字符串。
   * @example
   * s.floodOpacity.raw('inherit') // flood-opacity:inherit;
   */
  raw(value: Property.FloodOpacity | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.floodOpacity.calc('var(--value) * 2')
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
   * s.floodOpacity.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.FloodOpacity | CssString,
    ...others: (Property.FloodOpacity | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.floodOpacity.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.FloodOpacity | CssString,
    ...others: (Property.FloodOpacity | CssString)[]
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
   * s.floodOpacity.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.FloodOpacity | CssString,
    preferred: Property.FloodOpacity | CssString,
    maximum: Property.FloodOpacity | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * flood-opacity 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FloodOpacityCss = FloodOpacityCssRuntime & KeywordDeclarations<FloodOpacityKeywords>;
/**
 * 设置 SVG 洪泛滤镜颜色的不透明度。（flood-opacity）
 *
 * CSS 初始值：`black`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/flood-opacity
 */
export const FloodOpacityCss = FloodOpacityCssRuntime as new () => FloodOpacityCss;
import { fontKeywords } from './keyword-sets.js';

/**
 * font 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontKeywords = KeywordValuesOf<typeof fontKeywords, Property.Font | CssString>;
/**
 * 创建 font 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontKeywords()
 */
export const FontKeywords = class FontKeywords {
  constructor() {
    Object.assign(this, fontKeywords);
  }
} as new () => FontKeywords;

/**
 * font 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontCssRuntime extends CssProperty {
  /**
   * 创建 font 属性作者；普通使用通过 s.font 取得共享实例。
   * @example
   * class CustomFontCss extends FontCss {}
   */
  constructor() {
    super('font');
    initializeKeywordDeclarations(this, 'font', fontKeywords);
  }
  /**
   * 原样生成 font 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font:value;，undefined 返回空字符串。
   * @example
   * s.font.raw('inherit') // font:inherit;
   */
  raw(value: Property.Font | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontCss = FontCssRuntime & KeywordDeclarations<FontKeywords>;
/**
 * 集中设置字体样式、粗细、大小、行高和字体族等信息。（font）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font
 */
export const FontCss = FontCssRuntime as new () => FontCss;
import { fontFamilyKeywords } from './keyword-sets.js';

/**
 * font-family 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontFamilyKeywords = KeywordValuesOf<
  typeof fontFamilyKeywords,
  Property.FontFamily | CssString
>;
/**
 * 创建 font-family 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontFamilyKeywords()
 */
export const FontFamilyKeywords = class FontFamilyKeywords {
  constructor() {
    Object.assign(this, fontFamilyKeywords);
  }
} as new () => FontFamilyKeywords;

/**
 * font-family 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontFamilyCssRuntime extends CssProperty {
  /**
   * 创建 font-family 属性作者；普通使用通过 s.fontFamily 取得共享实例。
   * @example
   * class CustomFontFamilyCss extends FontFamilyCss {}
   */
  constructor() {
    super('font-family');
    initializeKeywordDeclarations(this, 'font-family', fontFamilyKeywords);
  }
  /**
   * 原样生成 font-family 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-family:value;，undefined 返回空字符串。
   * @example
   * s.fontFamily.raw('inherit') // font-family:inherit;
   */
  raw(value: Property.FontFamily | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-family 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontFamilyCss = FontFamilyCssRuntime & KeywordDeclarations<FontFamilyKeywords>;
/**
 * 设置按优先级排列的字体族及通用字体回退。（font-family）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-family
 */
export const FontFamilyCss = FontFamilyCssRuntime as new () => FontFamilyCss;

/**
 * font-feature-settings 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontFeatureSettingsKeywords = KeywordValuesOf<
  typeof normalKeywords,
  Property.FontFeatureSettings | CssString
>;
/**
 * 创建 font-feature-settings 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontFeatureSettingsKeywords()
 */
export const FontFeatureSettingsKeywords = class FontFeatureSettingsKeywords {
  constructor() {
    Object.assign(this, normalKeywords);
  }
} as new () => FontFeatureSettingsKeywords;

/**
 * font-feature-settings 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontFeatureSettingsCssRuntime extends CssProperty {
  /**
   * 创建 font-feature-settings 属性作者；普通使用通过 s.fontFeatureSettings 取得共享实例。
   * @example
   * class CustomFontFeatureSettingsCss extends FontFeatureSettingsCss {}
   */
  constructor() {
    super('font-feature-settings');
    initializeKeywordDeclarations(this, 'font-feature-settings', normalKeywords);
  }
  /**
   * 原样生成 font-feature-settings 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-feature-settings:value;，undefined 返回空字符串。
   * @example
   * s.fontFeatureSettings.raw('inherit') // font-feature-settings:inherit;
   */
  raw(value: Property.FontFeatureSettings | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-feature-settings 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontFeatureSettingsCss = FontFeatureSettingsCssRuntime &
  KeywordDeclarations<FontFeatureSettingsKeywords>;
/**
 * 通过 OpenType 特性标签控制字体的底层排版功能。（font-feature-settings）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-feature-settings
 */
export const FontFeatureSettingsCss =
  FontFeatureSettingsCssRuntime as new () => FontFeatureSettingsCss;
import { fontKerningKeywords } from './keyword-sets.js';

/**
 * font-kerning 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontKerningKeywords = KeywordValuesOf<
  typeof fontKerningKeywords,
  Property.FontKerning | CssString
>;
/**
 * 创建 font-kerning 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontKerningKeywords()
 */
export const FontKerningKeywords = class FontKerningKeywords {
  constructor() {
    Object.assign(this, fontKerningKeywords);
  }
} as new () => FontKerningKeywords;

/**
 * font-kerning 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontKerningCssRuntime extends CssProperty {
  /**
   * 创建 font-kerning 属性作者；普通使用通过 s.fontKerning 取得共享实例。
   * @example
   * class CustomFontKerningCss extends FontKerningCss {}
   */
  constructor() {
    super('font-kerning');
    initializeKeywordDeclarations(this, 'font-kerning', fontKerningKeywords);
  }
  /**
   * 原样生成 font-kerning 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-kerning:value;，undefined 返回空字符串。
   * @example
   * s.fontKerning.raw('inherit') // font-kerning:inherit;
   */
  raw(value: Property.FontKerning | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-kerning 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontKerningCss = FontKerningCssRuntime & KeywordDeclarations<FontKerningKeywords>;
/**
 * 设置是否应用字体提供的字偶间距调整。（font-kerning）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-kerning
 */
export const FontKerningCss = FontKerningCssRuntime as new () => FontKerningCss;

/**
 * font-language-override 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontLanguageOverrideKeywords = KeywordValuesOf<
  typeof normalKeywords,
  Property.FontLanguageOverride | CssString
>;
/**
 * 创建 font-language-override 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontLanguageOverrideKeywords()
 */
export const FontLanguageOverrideKeywords = class FontLanguageOverrideKeywords {
  constructor() {
    Object.assign(this, normalKeywords);
  }
} as new () => FontLanguageOverrideKeywords;

/**
 * font-language-override 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontLanguageOverrideCssRuntime extends CssProperty {
  /**
   * 创建 font-language-override 属性作者；普通使用通过 s.fontLanguageOverride 取得共享实例。
   * @example
   * class CustomFontLanguageOverrideCss extends FontLanguageOverrideCss {}
   */
  constructor() {
    super('font-language-override');
    initializeKeywordDeclarations(this, 'font-language-override', normalKeywords);
  }
  /**
   * 原样生成 font-language-override 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-language-override:value;，undefined 返回空字符串。
   * @example
   * s.fontLanguageOverride.raw('inherit') // font-language-override:inherit;
   */
  raw(value: Property.FontLanguageOverride | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-language-override 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontLanguageOverrideCss = FontLanguageOverrideCssRuntime &
  KeywordDeclarations<FontLanguageOverrideKeywords>;
/**
 * 覆盖字体排版使用的语言系统标签，不改变文本实际语言。（font-language-override）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-language-override
 */
export const FontLanguageOverrideCss =
  FontLanguageOverrideCssRuntime as new () => FontLanguageOverrideCss;
import { autoNoneKeywords } from './keyword-sets.js';

/**
 * font-optical-sizing 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontOpticalSizingKeywords = KeywordValuesOf<
  typeof autoNoneKeywords,
  Property.FontOpticalSizing | CssString
>;
/**
 * 创建 font-optical-sizing 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontOpticalSizingKeywords()
 */
export const FontOpticalSizingKeywords = class FontOpticalSizingKeywords {
  constructor() {
    Object.assign(this, autoNoneKeywords);
  }
} as new () => FontOpticalSizingKeywords;

/**
 * font-optical-sizing 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontOpticalSizingCssRuntime extends CssProperty {
  /**
   * 创建 font-optical-sizing 属性作者；普通使用通过 s.fontOpticalSizing 取得共享实例。
   * @example
   * class CustomFontOpticalSizingCss extends FontOpticalSizingCss {}
   */
  constructor() {
    super('font-optical-sizing');
    initializeKeywordDeclarations(this, 'font-optical-sizing', autoNoneKeywords);
  }
  /**
   * 原样生成 font-optical-sizing 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-optical-sizing:value;，undefined 返回空字符串。
   * @example
   * s.fontOpticalSizing.raw('inherit') // font-optical-sizing:inherit;
   */
  raw(value: Property.FontOpticalSizing | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-optical-sizing 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontOpticalSizingCss = FontOpticalSizingCssRuntime &
  KeywordDeclarations<FontOpticalSizingKeywords>;
/**
 * 控制支持光学尺寸轴的字体是否按字号优化字形。（font-optical-sizing）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-optical-sizing
 */
export const FontOpticalSizingCss = FontOpticalSizingCssRuntime as new () => FontOpticalSizingCss;

/**
 * font-palette 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontPaletteKeywords = KeywordValuesOf<
  typeof colorSchemeKeywords,
  Property.FontPalette | CssString
>;
/**
 * 创建 font-palette 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontPaletteKeywords()
 */
export const FontPaletteKeywords = class FontPaletteKeywords {
  constructor() {
    Object.assign(this, colorSchemeKeywords);
  }
} as new () => FontPaletteKeywords;

/**
 * font-palette 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontPaletteCssRuntime extends CssProperty {
  /**
   * 创建 font-palette 属性作者；普通使用通过 s.fontPalette 取得共享实例。
   * @example
   * class CustomFontPaletteCss extends FontPaletteCss {}
   */
  constructor() {
    super('font-palette');
    initializeKeywordDeclarations(this, 'font-palette', colorSchemeKeywords);
  }
  /**
   * 原样生成 font-palette 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-palette:value;，undefined 返回空字符串。
   * @example
   * s.fontPalette.raw('inherit') // font-palette:inherit;
   */
  raw(value: Property.FontPalette | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-palette 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontPaletteCss = FontPaletteCssRuntime & KeywordDeclarations<FontPaletteKeywords>;
/**
 * 选择或覆盖彩色字体使用的调色板。（font-palette）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-palette
 */
export const FontPaletteCss = FontPaletteCssRuntime as new () => FontPaletteCss;
import { fontSizeKeywords } from './keyword-sets.js';

/**
 * font-size 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontSizeKeywords = KeywordValuesOf<
  typeof fontSizeKeywords,
  Property.FontSize | CssString
>;
/**
 * 创建 font-size 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontSizeKeywords()
 */
export const FontSizeKeywords = class FontSizeKeywords {
  constructor() {
    Object.assign(this, fontSizeKeywords);
  }
} as new () => FontSizeKeywords;

/**
 * font-size 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontSizeCssRuntime extends LengthCssProperty {
  /**
   * 创建 font-size 属性作者；普通使用通过 s.fontSize 取得共享实例。
   * @example
   * class CustomFontSizeCss extends FontSizeCss {}
   */
  constructor() {
    super('font-size');
    initializeKeywordDeclarations(this, 'font-size', fontSizeKeywords);
  }
  /**
   * 原样生成 font-size 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-size:value;，undefined 返回空字符串。
   * @example
   * s.fontSize.raw('inherit') // font-size:inherit;
   */
  raw(value: Property.FontSize | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.fontSize.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.fontSize.calc('var(--value) * 2')
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
   * s.fontSize.min('var(--first)', 'var(--second)')
   */
  min(value: Property.FontSize | CssString, ...others: (Property.FontSize | CssString)[]): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.fontSize.max('var(--first)', 'var(--second)')
   */
  max(value: Property.FontSize | CssString, ...others: (Property.FontSize | CssString)[]): string {
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
   * s.fontSize.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.FontSize | CssString,
    preferred: Property.FontSize | CssString,
    maximum: Property.FontSize | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * font-size 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontSizeCss = FontSizeCssRuntime & KeywordDeclarations<FontSizeKeywords>;
/**
 * 设置字体大小，也影响 em 等相对单位的计算。（font-size）
 *
 * 改变字形大小，并影响 em 等相对长度；行盒高度还由 line-height 决定。
 *
 * 适用场景：建立文字层级，根字号相对尺寸可用 rem 表达。
 *
 * CSS 初始值：`medium`（不同于浏览器默认样式表）。
 * @example
 * css(s.fontSize.rem(1), s.lineHeight.raw(1.5))
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size
 */
export const FontSizeCss = FontSizeCssRuntime as new () => FontSizeCss;
import { fontSizeAdjustKeywords } from './keyword-sets.js';

/**
 * font-size-adjust 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontSizeAdjustKeywords = KeywordValuesOf<
  typeof fontSizeAdjustKeywords,
  Property.FontSizeAdjust | CssString
>;
/**
 * 创建 font-size-adjust 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontSizeAdjustKeywords()
 */
export const FontSizeAdjustKeywords = class FontSizeAdjustKeywords {
  constructor() {
    Object.assign(this, fontSizeAdjustKeywords);
  }
} as new () => FontSizeAdjustKeywords;

/**
 * font-size-adjust 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontSizeAdjustCssRuntime extends CssProperty {
  /**
   * 创建 font-size-adjust 属性作者；普通使用通过 s.fontSizeAdjust 取得共享实例。
   * @example
   * class CustomFontSizeAdjustCss extends FontSizeAdjustCss {}
   */
  constructor() {
    super('font-size-adjust');
    initializeKeywordDeclarations(this, 'font-size-adjust', fontSizeAdjustKeywords);
  }
  /**
   * 原样生成 font-size-adjust 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-size-adjust:value;，undefined 返回空字符串。
   * @example
   * s.fontSizeAdjust.raw('inherit') // font-size-adjust:inherit;
   */
  raw(value: Property.FontSizeAdjust | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.fontSizeAdjust.calc('var(--value) * 2')
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
   * s.fontSizeAdjust.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.FontSizeAdjust | CssString,
    ...others: (Property.FontSizeAdjust | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.fontSizeAdjust.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.FontSizeAdjust | CssString,
    ...others: (Property.FontSizeAdjust | CssString)[]
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
   * s.fontSizeAdjust.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.FontSizeAdjust | CssString,
    preferred: Property.FontSizeAdjust | CssString,
    maximum: Property.FontSizeAdjust | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * font-size-adjust 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontSizeAdjustCss = FontSizeAdjustCssRuntime &
  KeywordDeclarations<FontSizeAdjustKeywords>;
/**
 * 按字体特征尺寸调整字号，减少字体回退造成的视觉变化。（font-size-adjust）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-size-adjust
 */
export const FontSizeAdjustCss = FontSizeAdjustCssRuntime as new () => FontSizeAdjustCss;
import { fontSmoothKeywords } from './keyword-sets.js';

/**
 * font-smooth 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontSmoothKeywords = KeywordValuesOf<
  typeof fontSmoothKeywords,
  Property.FontSmooth | CssString
>;
/**
 * 创建 font-smooth 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontSmoothKeywords()
 */
export const FontSmoothKeywords = class FontSmoothKeywords {
  constructor() {
    Object.assign(this, fontSmoothKeywords);
  }
} as new () => FontSmoothKeywords;

/**
 * font-smooth 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontSmoothCssRuntime extends LengthCssProperty {
  /**
   * 创建 font-smooth 属性作者；普通使用通过 s.fontSmooth 取得共享实例。
   * @example
   * class CustomFontSmoothCss extends FontSmoothCss {}
   */
  constructor() {
    super('font-smooth');
    initializeKeywordDeclarations(this, 'font-smooth', fontSmoothKeywords);
  }
  /**
   * 原样生成 font-smooth 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-smooth:value;，undefined 返回空字符串。
   * @example
   * s.fontSmooth.raw('inherit') // font-smooth:inherit;
   */
  raw(value: Property.FontSmooth | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.fontSmooth.calc('var(--value) * 2')
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
   * s.fontSmooth.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.FontSmooth | CssString,
    ...others: (Property.FontSmooth | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.fontSmooth.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.FontSmooth | CssString,
    ...others: (Property.FontSmooth | CssString)[]
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
   * s.fontSmooth.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.FontSmooth | CssString,
    preferred: Property.FontSmooth | CssString,
    maximum: Property.FontSmooth | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * font-smooth 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontSmoothCss = FontSmoothCssRuntime & KeywordDeclarations<FontSmoothKeywords>;
/**
 * 控制字体平滑的非标准属性；使用前核对目标浏览器。（font-smooth）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-smooth
 */
export const FontSmoothCss = FontSmoothCssRuntime as new () => FontSmoothCss;
import { fontStretchKeywords } from './keyword-sets.js';

/**
 * font-stretch 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontStretchKeywords = KeywordValuesOf<
  typeof fontStretchKeywords,
  Property.FontStretch | CssString
>;
/**
 * 创建 font-stretch 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontStretchKeywords()
 */
export const FontStretchKeywords = class FontStretchKeywords {
  constructor() {
    Object.assign(this, fontStretchKeywords);
  }
} as new () => FontStretchKeywords;

/**
 * font-stretch 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontStretchCssRuntime extends CssProperty {
  /**
   * 创建 font-stretch 属性作者；普通使用通过 s.fontStretch 取得共享实例。
   * @example
   * class CustomFontStretchCss extends FontStretchCss {}
   */
  constructor() {
    super('font-stretch');
    initializeKeywordDeclarations(this, 'font-stretch', fontStretchKeywords);
  }
  /**
   * 原样生成 font-stretch 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-stretch:value;，undefined 返回空字符串。
   * @example
   * s.fontStretch.raw('inherit') // font-stretch:inherit;
   */
  raw(value: Property.FontStretch | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-stretch 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontStretchCss = FontStretchCssRuntime & KeywordDeclarations<FontStretchKeywords>;
/**
 * 选择字体的宽窄字面；font-width 是其较新的名称。（font-stretch）
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-stretch
 */
export const FontStretchCss = FontStretchCssRuntime as new () => FontStretchCss;
import { fontStyleKeywords } from './keyword-sets.js';

/**
 * font-style 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontStyleKeywords = KeywordValuesOf<
  typeof fontStyleKeywords,
  Property.FontStyle | CssString
>;
/**
 * 创建 font-style 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontStyleKeywords()
 */
export const FontStyleKeywords = class FontStyleKeywords {
  constructor() {
    Object.assign(this, fontStyleKeywords);
  }
} as new () => FontStyleKeywords;

/**
 * font-style 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontStyleCssRuntime extends CssProperty {
  /**
   * 创建 font-style 属性作者；普通使用通过 s.fontStyle 取得共享实例。
   * @example
   * class CustomFontStyleCss extends FontStyleCss {}
   */
  constructor() {
    super('font-style');
    initializeKeywordDeclarations(this, 'font-style', fontStyleKeywords);
  }
  /**
   * 原样生成 font-style 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-style:value;，undefined 返回空字符串。
   * @example
   * s.fontStyle.raw('inherit') // font-style:inherit;
   */
  raw(value: Property.FontStyle | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 deg 单位生成完整属性声明。角度，360deg 为一周。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 deg。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.fontStyle.deg(1)
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
   * s.fontStyle.grad(1)
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
   * s.fontStyle.rad(1)
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
   * s.fontStyle.turn(1)
   */
  turn(value: number): string {
    return this.declaration(`${value}turn`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.fontStyle.calc('var(--value) * 2')
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
   * s.fontStyle.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.FontStyle | CssString,
    ...others: (Property.FontStyle | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.fontStyle.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.FontStyle | CssString,
    ...others: (Property.FontStyle | CssString)[]
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
   * s.fontStyle.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.FontStyle | CssString,
    preferred: Property.FontStyle | CssString,
    maximum: Property.FontStyle | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * font-style 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontStyleCss = FontStyleCssRuntime & KeywordDeclarations<FontStyleKeywords>;
/**
 * 选择正常、斜体或倾斜字体样式。（font-style）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-style
 */
export const FontStyleCss = FontStyleCssRuntime as new () => FontStyleCss;
import { fontSynthesisKeywords } from './keyword-sets.js';

/**
 * font-synthesis 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontSynthesisKeywords = KeywordValuesOf<
  typeof fontSynthesisKeywords,
  Property.FontSynthesis | CssString
>;
/**
 * 创建 font-synthesis 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontSynthesisKeywords()
 */
export const FontSynthesisKeywords = class FontSynthesisKeywords {
  constructor() {
    Object.assign(this, fontSynthesisKeywords);
  }
} as new () => FontSynthesisKeywords;

/**
 * font-synthesis 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontSynthesisCssRuntime extends CssProperty {
  /**
   * 创建 font-synthesis 属性作者；普通使用通过 s.fontSynthesis 取得共享实例。
   * @example
   * class CustomFontSynthesisCss extends FontSynthesisCss {}
   */
  constructor() {
    super('font-synthesis');
    initializeKeywordDeclarations(this, 'font-synthesis', fontSynthesisKeywords);
  }
  /**
   * 原样生成 font-synthesis 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-synthesis:value;，undefined 返回空字符串。
   * @example
   * s.fontSynthesis.raw('inherit') // font-synthesis:inherit;
   */
  raw(value: Property.FontSynthesis | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-synthesis 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontSynthesisCss = FontSynthesisCssRuntime & KeywordDeclarations<FontSynthesisKeywords>;
/**
 * 控制缺少真实字体字形时浏览器可否合成粗体、斜体等样式。（font-synthesis）
 *
 * CSS 初始值：`weight style small-caps position `（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis
 */
export const FontSynthesisCss = FontSynthesisCssRuntime as new () => FontSynthesisCss;

/**
 * font-synthesis-position 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontSynthesisPositionKeywords = KeywordValuesOf<
  typeof autoNoneKeywords,
  Property.FontSynthesisPosition | CssString
>;
/**
 * 创建 font-synthesis-position 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontSynthesisPositionKeywords()
 */
export const FontSynthesisPositionKeywords = class FontSynthesisPositionKeywords {
  constructor() {
    Object.assign(this, autoNoneKeywords);
  }
} as new () => FontSynthesisPositionKeywords;

/**
 * font-synthesis-position 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontSynthesisPositionCssRuntime extends CssProperty {
  /**
   * 创建 font-synthesis-position 属性作者；普通使用通过 s.fontSynthesisPosition 取得共享实例。
   * @example
   * class CustomFontSynthesisPositionCss extends FontSynthesisPositionCss {}
   */
  constructor() {
    super('font-synthesis-position');
    initializeKeywordDeclarations(this, 'font-synthesis-position', autoNoneKeywords);
  }
  /**
   * 原样生成 font-synthesis-position 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-synthesis-position:value;，undefined 返回空字符串。
   * @example
   * s.fontSynthesisPosition.raw('inherit') // font-synthesis-position:inherit;
   */
  raw(value: Property.FontSynthesisPosition | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-synthesis-position 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontSynthesisPositionCss = FontSynthesisPositionCssRuntime &
  KeywordDeclarations<FontSynthesisPositionKeywords>;
/**
 * 控制浏览器是否可以合成上标和下标字形。（font-synthesis-position）
 *
 * CSS 初始值：`none`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-position
 */
export const FontSynthesisPositionCss =
  FontSynthesisPositionCssRuntime as new () => FontSynthesisPositionCss;

/**
 * font-synthesis-small-caps 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontSynthesisSmallCapsKeywords = KeywordValuesOf<
  typeof autoNoneKeywords,
  Property.FontSynthesisSmallCaps | CssString
>;
/**
 * 创建 font-synthesis-small-caps 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontSynthesisSmallCapsKeywords()
 */
export const FontSynthesisSmallCapsKeywords = class FontSynthesisSmallCapsKeywords {
  constructor() {
    Object.assign(this, autoNoneKeywords);
  }
} as new () => FontSynthesisSmallCapsKeywords;

/**
 * font-synthesis-small-caps 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontSynthesisSmallCapsCssRuntime extends CssProperty {
  /**
   * 创建 font-synthesis-small-caps 属性作者；普通使用通过 s.fontSynthesisSmallCaps 取得共享实例。
   * @example
   * class CustomFontSynthesisSmallCapsCss extends FontSynthesisSmallCapsCss {}
   */
  constructor() {
    super('font-synthesis-small-caps');
    initializeKeywordDeclarations(this, 'font-synthesis-small-caps', autoNoneKeywords);
  }
  /**
   * 原样生成 font-synthesis-small-caps 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-synthesis-small-caps:value;，undefined 返回空字符串。
   * @example
   * s.fontSynthesisSmallCaps.raw('inherit') // font-synthesis-small-caps:inherit;
   */
  raw(value: Property.FontSynthesisSmallCaps | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-synthesis-small-caps 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontSynthesisSmallCapsCss = FontSynthesisSmallCapsCssRuntime &
  KeywordDeclarations<FontSynthesisSmallCapsKeywords>;
/**
 * 控制浏览器是否可以合成小型大写字形。（font-synthesis-small-caps）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-small-caps
 */
export const FontSynthesisSmallCapsCss =
  FontSynthesisSmallCapsCssRuntime as new () => FontSynthesisSmallCapsCss;

/**
 * font-synthesis-style 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontSynthesisStyleKeywords = KeywordValuesOf<
  typeof autoNoneKeywords,
  Property.FontSynthesisStyle | CssString
>;
/**
 * 创建 font-synthesis-style 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontSynthesisStyleKeywords()
 */
export const FontSynthesisStyleKeywords = class FontSynthesisStyleKeywords {
  constructor() {
    Object.assign(this, autoNoneKeywords);
  }
} as new () => FontSynthesisStyleKeywords;

/**
 * font-synthesis-style 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontSynthesisStyleCssRuntime extends CssProperty {
  /**
   * 创建 font-synthesis-style 属性作者；普通使用通过 s.fontSynthesisStyle 取得共享实例。
   * @example
   * class CustomFontSynthesisStyleCss extends FontSynthesisStyleCss {}
   */
  constructor() {
    super('font-synthesis-style');
    initializeKeywordDeclarations(this, 'font-synthesis-style', autoNoneKeywords);
  }
  /**
   * 原样生成 font-synthesis-style 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-synthesis-style:value;，undefined 返回空字符串。
   * @example
   * s.fontSynthesisStyle.raw('inherit') // font-synthesis-style:inherit;
   */
  raw(value: Property.FontSynthesisStyle | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-synthesis-style 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontSynthesisStyleCss = FontSynthesisStyleCssRuntime &
  KeywordDeclarations<FontSynthesisStyleKeywords>;
/**
 * 控制浏览器是否可以合成倾斜字体。（font-synthesis-style）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-style
 */
export const FontSynthesisStyleCss =
  FontSynthesisStyleCssRuntime as new () => FontSynthesisStyleCss;

/**
 * font-synthesis-weight 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontSynthesisWeightKeywords = KeywordValuesOf<
  typeof autoNoneKeywords,
  Property.FontSynthesisWeight | CssString
>;
/**
 * 创建 font-synthesis-weight 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontSynthesisWeightKeywords()
 */
export const FontSynthesisWeightKeywords = class FontSynthesisWeightKeywords {
  constructor() {
    Object.assign(this, autoNoneKeywords);
  }
} as new () => FontSynthesisWeightKeywords;

/**
 * font-synthesis-weight 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontSynthesisWeightCssRuntime extends CssProperty {
  /**
   * 创建 font-synthesis-weight 属性作者；普通使用通过 s.fontSynthesisWeight 取得共享实例。
   * @example
   * class CustomFontSynthesisWeightCss extends FontSynthesisWeightCss {}
   */
  constructor() {
    super('font-synthesis-weight');
    initializeKeywordDeclarations(this, 'font-synthesis-weight', autoNoneKeywords);
  }
  /**
   * 原样生成 font-synthesis-weight 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-synthesis-weight:value;，undefined 返回空字符串。
   * @example
   * s.fontSynthesisWeight.raw('inherit') // font-synthesis-weight:inherit;
   */
  raw(value: Property.FontSynthesisWeight | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-synthesis-weight 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontSynthesisWeightCss = FontSynthesisWeightCssRuntime &
  KeywordDeclarations<FontSynthesisWeightKeywords>;
/**
 * 控制浏览器是否可以合成加粗字体。（font-synthesis-weight）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-synthesis-weight
 */
export const FontSynthesisWeightCss =
  FontSynthesisWeightCssRuntime as new () => FontSynthesisWeightCss;
import { fontVariantKeywords } from './keyword-sets.js';

/**
 * font-variant 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontVariantKeywords = KeywordValuesOf<
  typeof fontVariantKeywords,
  Property.FontVariant | CssString
>;
/**
 * 创建 font-variant 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontVariantKeywords()
 */
export const FontVariantKeywords = class FontVariantKeywords {
  constructor() {
    Object.assign(this, fontVariantKeywords);
  }
} as new () => FontVariantKeywords;

/**
 * font-variant 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontVariantCssRuntime extends CssProperty {
  /**
   * 创建 font-variant 属性作者；普通使用通过 s.fontVariant 取得共享实例。
   * @example
   * class CustomFontVariantCss extends FontVariantCss {}
   */
  constructor() {
    super('font-variant');
    initializeKeywordDeclarations(this, 'font-variant', fontVariantKeywords);
  }
  /**
   * 原样生成 font-variant 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-variant:value;，undefined 返回空字符串。
   * @example
   * s.fontVariant.raw('inherit') // font-variant:inherit;
   */
  raw(value: Property.FontVariant | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-variant 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontVariantCss = FontVariantCssRuntime & KeywordDeclarations<FontVariantKeywords>;
/**
 * 集中设置字体的连字、大小写、数字及其他变体。（font-variant）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant
 */
export const FontVariantCss = FontVariantCssRuntime as new () => FontVariantCss;
import { fontVariantAlternatesKeywords } from './keyword-sets.js';

/**
 * font-variant-alternates 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontVariantAlternatesKeywords = KeywordValuesOf<
  typeof fontVariantAlternatesKeywords,
  Property.FontVariantAlternates | CssString
>;
/**
 * 创建 font-variant-alternates 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontVariantAlternatesKeywords()
 */
export const FontVariantAlternatesKeywords = class FontVariantAlternatesKeywords {
  constructor() {
    Object.assign(this, fontVariantAlternatesKeywords);
  }
} as new () => FontVariantAlternatesKeywords;

/**
 * font-variant-alternates 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontVariantAlternatesCssRuntime extends CssProperty {
  /**
   * 创建 font-variant-alternates 属性作者；普通使用通过 s.fontVariantAlternates 取得共享实例。
   * @example
   * class CustomFontVariantAlternatesCss extends FontVariantAlternatesCss {}
   */
  constructor() {
    super('font-variant-alternates');
    initializeKeywordDeclarations(this, 'font-variant-alternates', fontVariantAlternatesKeywords);
  }
  /**
   * 原样生成 font-variant-alternates 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-variant-alternates:value;，undefined 返回空字符串。
   * @example
   * s.fontVariantAlternates.raw('inherit') // font-variant-alternates:inherit;
   */
  raw(value: Property.FontVariantAlternates | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-variant-alternates 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontVariantAlternatesCss = FontVariantAlternatesCssRuntime &
  KeywordDeclarations<FontVariantAlternatesKeywords>;
/**
 * 选择字体提供的替代字形。（font-variant-alternates）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-alternates
 */
export const FontVariantAlternatesCss =
  FontVariantAlternatesCssRuntime as new () => FontVariantAlternatesCss;
import { fontVariantCapsKeywords } from './keyword-sets.js';

/**
 * font-variant-caps 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontVariantCapsKeywords = KeywordValuesOf<
  typeof fontVariantCapsKeywords,
  Property.FontVariantCaps | CssString
>;
/**
 * 创建 font-variant-caps 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontVariantCapsKeywords()
 */
export const FontVariantCapsKeywords = class FontVariantCapsKeywords {
  constructor() {
    Object.assign(this, fontVariantCapsKeywords);
  }
} as new () => FontVariantCapsKeywords;

/**
 * font-variant-caps 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontVariantCapsCssRuntime extends CssProperty {
  /**
   * 创建 font-variant-caps 属性作者；普通使用通过 s.fontVariantCaps 取得共享实例。
   * @example
   * class CustomFontVariantCapsCss extends FontVariantCapsCss {}
   */
  constructor() {
    super('font-variant-caps');
    initializeKeywordDeclarations(this, 'font-variant-caps', fontVariantCapsKeywords);
  }
  /**
   * 原样生成 font-variant-caps 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-variant-caps:value;，undefined 返回空字符串。
   * @example
   * s.fontVariantCaps.raw('inherit') // font-variant-caps:inherit;
   */
  raw(value: Property.FontVariantCaps | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-variant-caps 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontVariantCapsCss = FontVariantCapsCssRuntime &
  KeywordDeclarations<FontVariantCapsKeywords>;
/**
 * 设置小型大写等大小写字形变体。（font-variant-caps）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-caps
 */
export const FontVariantCapsCss = FontVariantCapsCssRuntime as new () => FontVariantCapsCss;
import { fontVariantEastAsianKeywords } from './keyword-sets.js';

/**
 * font-variant-east-asian 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontVariantEastAsianKeywords = KeywordValuesOf<
  typeof fontVariantEastAsianKeywords,
  Property.FontVariantEastAsian | CssString
>;
/**
 * 创建 font-variant-east-asian 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontVariantEastAsianKeywords()
 */
export const FontVariantEastAsianKeywords = class FontVariantEastAsianKeywords {
  constructor() {
    Object.assign(this, fontVariantEastAsianKeywords);
  }
} as new () => FontVariantEastAsianKeywords;

/**
 * font-variant-east-asian 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontVariantEastAsianCssRuntime extends CssProperty {
  /**
   * 创建 font-variant-east-asian 属性作者；普通使用通过 s.fontVariantEastAsian 取得共享实例。
   * @example
   * class CustomFontVariantEastAsianCss extends FontVariantEastAsianCss {}
   */
  constructor() {
    super('font-variant-east-asian');
    initializeKeywordDeclarations(this, 'font-variant-east-asian', fontVariantEastAsianKeywords);
  }
  /**
   * 原样生成 font-variant-east-asian 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-variant-east-asian:value;，undefined 返回空字符串。
   * @example
   * s.fontVariantEastAsian.raw('inherit') // font-variant-east-asian:inherit;
   */
  raw(value: Property.FontVariantEastAsian | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-variant-east-asian 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontVariantEastAsianCss = FontVariantEastAsianCssRuntime &
  KeywordDeclarations<FontVariantEastAsianKeywords>;
/**
 * 设置东亚文字字形及宽度变体。（font-variant-east-asian）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-east-asian
 */
export const FontVariantEastAsianCss =
  FontVariantEastAsianCssRuntime as new () => FontVariantEastAsianCss;
import { fontVariantEmojiKeywords } from './keyword-sets.js';

/**
 * font-variant-emoji 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontVariantEmojiKeywords = KeywordValuesOf<
  typeof fontVariantEmojiKeywords,
  Property.FontVariantEmoji | CssString
>;
/**
 * 创建 font-variant-emoji 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontVariantEmojiKeywords()
 */
export const FontVariantEmojiKeywords = class FontVariantEmojiKeywords {
  constructor() {
    Object.assign(this, fontVariantEmojiKeywords);
  }
} as new () => FontVariantEmojiKeywords;

/**
 * font-variant-emoji 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontVariantEmojiCssRuntime extends CssProperty {
  /**
   * 创建 font-variant-emoji 属性作者；普通使用通过 s.fontVariantEmoji 取得共享实例。
   * @example
   * class CustomFontVariantEmojiCss extends FontVariantEmojiCss {}
   */
  constructor() {
    super('font-variant-emoji');
    initializeKeywordDeclarations(this, 'font-variant-emoji', fontVariantEmojiKeywords);
  }
  /**
   * 原样生成 font-variant-emoji 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-variant-emoji:value;，undefined 返回空字符串。
   * @example
   * s.fontVariantEmoji.raw('inherit') // font-variant-emoji:inherit;
   */
  raw(value: Property.FontVariantEmoji | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-variant-emoji 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontVariantEmojiCss = FontVariantEmojiCssRuntime &
  KeywordDeclarations<FontVariantEmojiKeywords>;
/**
 * 设置字符优先采用文本字形还是 emoji 字形。（font-variant-emoji）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-emoji
 */
export const FontVariantEmojiCss = FontVariantEmojiCssRuntime as new () => FontVariantEmojiCss;
import { fontVariantLigaturesKeywords } from './keyword-sets.js';

/**
 * font-variant-ligatures 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontVariantLigaturesKeywords = KeywordValuesOf<
  typeof fontVariantLigaturesKeywords,
  Property.FontVariantLigatures | CssString
>;
/**
 * 创建 font-variant-ligatures 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontVariantLigaturesKeywords()
 */
export const FontVariantLigaturesKeywords = class FontVariantLigaturesKeywords {
  constructor() {
    Object.assign(this, fontVariantLigaturesKeywords);
  }
} as new () => FontVariantLigaturesKeywords;

/**
 * font-variant-ligatures 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontVariantLigaturesCssRuntime extends CssProperty {
  /**
   * 创建 font-variant-ligatures 属性作者；普通使用通过 s.fontVariantLigatures 取得共享实例。
   * @example
   * class CustomFontVariantLigaturesCss extends FontVariantLigaturesCss {}
   */
  constructor() {
    super('font-variant-ligatures');
    initializeKeywordDeclarations(this, 'font-variant-ligatures', fontVariantLigaturesKeywords);
  }
  /**
   * 原样生成 font-variant-ligatures 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-variant-ligatures:value;，undefined 返回空字符串。
   * @example
   * s.fontVariantLigatures.raw('inherit') // font-variant-ligatures:inherit;
   */
  raw(value: Property.FontVariantLigatures | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-variant-ligatures 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontVariantLigaturesCss = FontVariantLigaturesCssRuntime &
  KeywordDeclarations<FontVariantLigaturesKeywords>;
/**
 * 设置字体连字的启用方式。（font-variant-ligatures）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-ligatures
 */
export const FontVariantLigaturesCss =
  FontVariantLigaturesCssRuntime as new () => FontVariantLigaturesCss;
import { fontVariantNumericKeywords } from './keyword-sets.js';

/**
 * font-variant-numeric 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontVariantNumericKeywords = KeywordValuesOf<
  typeof fontVariantNumericKeywords,
  Property.FontVariantNumeric | CssString
>;
/**
 * 创建 font-variant-numeric 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontVariantNumericKeywords()
 */
export const FontVariantNumericKeywords = class FontVariantNumericKeywords {
  constructor() {
    Object.assign(this, fontVariantNumericKeywords);
  }
} as new () => FontVariantNumericKeywords;

/**
 * font-variant-numeric 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontVariantNumericCssRuntime extends CssProperty {
  /**
   * 创建 font-variant-numeric 属性作者；普通使用通过 s.fontVariantNumeric 取得共享实例。
   * @example
   * class CustomFontVariantNumericCss extends FontVariantNumericCss {}
   */
  constructor() {
    super('font-variant-numeric');
    initializeKeywordDeclarations(this, 'font-variant-numeric', fontVariantNumericKeywords);
  }
  /**
   * 原样生成 font-variant-numeric 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-variant-numeric:value;，undefined 返回空字符串。
   * @example
   * s.fontVariantNumeric.raw('inherit') // font-variant-numeric:inherit;
   */
  raw(value: Property.FontVariantNumeric | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-variant-numeric 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontVariantNumericCss = FontVariantNumericCssRuntime &
  KeywordDeclarations<FontVariantNumericKeywords>;
/**
 * 设置数字的等宽、比例、分数及其他排版变体。（font-variant-numeric）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-numeric
 */
export const FontVariantNumericCss =
  FontVariantNumericCssRuntime as new () => FontVariantNumericCss;
import { fontVariantPositionKeywords } from './keyword-sets.js';

/**
 * font-variant-position 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontVariantPositionKeywords = KeywordValuesOf<
  typeof fontVariantPositionKeywords,
  Property.FontVariantPosition | CssString
>;
/**
 * 创建 font-variant-position 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontVariantPositionKeywords()
 */
export const FontVariantPositionKeywords = class FontVariantPositionKeywords {
  constructor() {
    Object.assign(this, fontVariantPositionKeywords);
  }
} as new () => FontVariantPositionKeywords;

/**
 * font-variant-position 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontVariantPositionCssRuntime extends CssProperty {
  /**
   * 创建 font-variant-position 属性作者；普通使用通过 s.fontVariantPosition 取得共享实例。
   * @example
   * class CustomFontVariantPositionCss extends FontVariantPositionCss {}
   */
  constructor() {
    super('font-variant-position');
    initializeKeywordDeclarations(this, 'font-variant-position', fontVariantPositionKeywords);
  }
  /**
   * 原样生成 font-variant-position 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-variant-position:value;，undefined 返回空字符串。
   * @example
   * s.fontVariantPosition.raw('inherit') // font-variant-position:inherit;
   */
  raw(value: Property.FontVariantPosition | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-variant-position 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontVariantPositionCss = FontVariantPositionCssRuntime &
  KeywordDeclarations<FontVariantPositionKeywords>;
/**
 * 选择字体提供的上标或下标字形。（font-variant-position）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variant-position
 */
export const FontVariantPositionCss =
  FontVariantPositionCssRuntime as new () => FontVariantPositionCss;

/**
 * font-variation-settings 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontVariationSettingsKeywords = KeywordValuesOf<
  typeof normalKeywords,
  Property.FontVariationSettings | CssString
>;
/**
 * 创建 font-variation-settings 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontVariationSettingsKeywords()
 */
export const FontVariationSettingsKeywords = class FontVariationSettingsKeywords {
  constructor() {
    Object.assign(this, normalKeywords);
  }
} as new () => FontVariationSettingsKeywords;

/**
 * font-variation-settings 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontVariationSettingsCssRuntime extends CssProperty {
  /**
   * 创建 font-variation-settings 属性作者；普通使用通过 s.fontVariationSettings 取得共享实例。
   * @example
   * class CustomFontVariationSettingsCss extends FontVariationSettingsCss {}
   */
  constructor() {
    super('font-variation-settings');
    initializeKeywordDeclarations(this, 'font-variation-settings', normalKeywords);
  }
  /**
   * 原样生成 font-variation-settings 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-variation-settings:value;，undefined 返回空字符串。
   * @example
   * s.fontVariationSettings.raw('inherit') // font-variation-settings:inherit;
   */
  raw(value: Property.FontVariationSettings | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * font-variation-settings 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontVariationSettingsCss = FontVariationSettingsCssRuntime &
  KeywordDeclarations<FontVariationSettingsKeywords>;
/**
 * 直接设置可变字体各个轴的数值。（font-variation-settings）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-variation-settings
 */
export const FontVariationSettingsCss =
  FontVariationSettingsCssRuntime as new () => FontVariationSettingsCss;
import { fontWeightKeywords } from './keyword-sets.js';

/**
 * font-weight 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontWeightKeywords = KeywordValuesOf<
  typeof fontWeightKeywords,
  Property.FontWeight | CssString
>;
/**
 * 创建 font-weight 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontWeightKeywords()
 */
export const FontWeightKeywords = class FontWeightKeywords {
  constructor() {
    Object.assign(this, fontWeightKeywords);
  }
} as new () => FontWeightKeywords;

/**
 * font-weight 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontWeightCssRuntime extends CssProperty {
  /**
   * 创建 font-weight 属性作者；普通使用通过 s.fontWeight 取得共享实例。
   * @example
   * class CustomFontWeightCss extends FontWeightCss {}
   */
  constructor() {
    super('font-weight');
    initializeKeywordDeclarations(this, 'font-weight', fontWeightKeywords);
  }
  /**
   * 原样生成 font-weight 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-weight:value;，undefined 返回空字符串。
   * @example
   * s.fontWeight.raw('inherit') // font-weight:inherit;
   */
  raw(value: Property.FontWeight | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.fontWeight.calc('var(--value) * 2')
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
   * s.fontWeight.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.FontWeight | CssString,
    ...others: (Property.FontWeight | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.fontWeight.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.FontWeight | CssString,
    ...others: (Property.FontWeight | CssString)[]
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
   * s.fontWeight.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.FontWeight | CssString,
    preferred: Property.FontWeight | CssString,
    maximum: Property.FontWeight | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * font-weight 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontWeightCss = FontWeightCssRuntime & KeywordDeclarations<FontWeightKeywords>;
/**
 * 设置字体粗细，实际可用字重取决于字体。（font-weight）
 *
 * 最终字形取决于已加载字体和可用字重；变量字体可支持连续的字重范围。
 *
 * 常用值：
 * - `normal`：正常字重，等价于数值 400。
 * - `bold`：粗体字重，等价于数值 700。
 * - `bolder`：相对于继承字重选择更粗的字重，不是简单加一个固定数值。
 * - `lighter`：相对于继承字重选择更细的字重，不是简单减一个固定数值。
 *
 * 适用场景：正文、强调文字和标题的视觉层级。
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @example
 * s.fontWeight.raw(600)
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-weight
 */
export const FontWeightCss = FontWeightCssRuntime as new () => FontWeightCss;

/**
 * font-width 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type FontWidthKeywords = KeywordValuesOf<
  typeof fontStretchKeywords,
  Property.FontWidth | CssString
>;
/**
 * 创建 font-width 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new FontWidthKeywords()
 */
export const FontWidthKeywords = class FontWidthKeywords {
  constructor() {
    Object.assign(this, fontStretchKeywords);
  }
} as new () => FontWidthKeywords;

/**
 * font-width 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class FontWidthCssRuntime extends CssProperty {
  /**
   * 创建 font-width 属性作者；普通使用通过 s.fontWidth 取得共享实例。
   * @example
   * class CustomFontWidthCss extends FontWidthCss {}
   */
  constructor() {
    super('font-width');
    initializeKeywordDeclarations(this, 'font-width', fontStretchKeywords);
  }
  /**
   * 原样生成 font-width 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 font-width:value;，undefined 返回空字符串。
   * @example
   * s.fontWidth.raw('inherit') // font-width:inherit;
   */
  raw(value: Property.FontWidth | CssString | undefined): string {
    return this.declaration(value);
  }
  /**
   * 使用 % 单位生成完整属性声明。百分比，100 表示 100%；参照对象由具体属性决定。
   *
   * 不做数值范围或 CSS 语法校验；负值、百分比及维度是否合法由具体属性和浏览器决定。
   * @param value 属性值的数值，自动附加 %。
   * @returns 当前属性的完整声明字符串，不是可传入其他方法的裸 CSS 值。
   * @example
   * s.fontWidth.percent(1)
   */
  percent(value: number): string {
    return this.declaration(`${value}%`);
  }
  /**
   * 将数学表达式放入 CSS calc()，由浏览器计算。
   * @param expression 不含外层 calc() 的表达式；非零长度须带单位，加减号两侧保留空格。
   * @returns 包含 calc(...) 的完整属性声明，不会在 JavaScript 中求值。
   * @example
   * s.fontWidth.calc('var(--value) * 2')
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
   * s.fontWidth.min('var(--first)', 'var(--second)')
   */
  min(
    value: Property.FontWidth | CssString,
    ...others: (Property.FontWidth | CssString)[]
  ): string {
    return this.raw(`min(${[value, ...others].join(', ')})`);
  }
  /**
   * 生成 CSS max()，从同维度的候选值中选择最大值。
   * @param value 第一个 CSS 值；长度应带单位，不能传完整属性声明。
   * @param others 其余同维度的 CSS 值；变量必须解析为当前属性允许的值。
   * @returns 包含 max(...) 的完整属性声明。
   * @example
   * s.fontWidth.max('var(--first)', 'var(--second)')
   */
  max(
    value: Property.FontWidth | CssString,
    ...others: (Property.FontWidth | CssString)[]
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
   * s.fontWidth.clamp('var(--minimum)', 'var(--preferred)', 'var(--maximum)')
   */
  clamp(
    minimum: Property.FontWidth | CssString,
    preferred: Property.FontWidth | CssString,
    maximum: Property.FontWidth | CssString,
  ): string {
    return this.raw(`clamp(${[minimum, preferred, maximum].join(', ')})`);
  }
}
/**
 * font-width 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type FontWidthCss = FontWidthCssRuntime & KeywordDeclarations<FontWidthKeywords>;
/**
 * 选择字体的宽窄字面，不是通过变换拉伸元素。（font-width）
 *
 * CSS 初始值：`normal`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/font-width
 */
export const FontWidthCss = FontWidthCssRuntime as new () => FontWidthCss;
import { forcedColorAdjustKeywords } from './keyword-sets.js';

/**
 * forced-color-adjust 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。
 */
export type ForcedColorAdjustKeywords = KeywordValuesOf<
  typeof forcedColorAdjustKeywords,
  Property.ForcedColorAdjust | CssString
>;
/**
 * 创建 forced-color-adjust 的可继承关键字对象；每个实例独立，成员保留语义说明。
 * @example
 * new ForcedColorAdjustKeywords()
 */
export const ForcedColorAdjustKeywords = class ForcedColorAdjustKeywords {
  constructor() {
    Object.assign(this, forcedColorAdjustKeywords);
  }
} as new () => ForcedColorAdjustKeywords;

/**
 * forced-color-adjust 作者的运行时方法；公共成员类型由原始关键字定义映射。
 */
class ForcedColorAdjustCssRuntime extends CssProperty {
  /**
   * 创建 forced-color-adjust 属性作者；普通使用通过 s.forcedColorAdjust 取得共享实例。
   * @example
   * class CustomForcedColorAdjustCss extends ForcedColorAdjustCss {}
   */
  constructor() {
    super('forced-color-adjust');
    initializeKeywordDeclarations(this, 'forced-color-adjust', forcedColorAdjustKeywords);
  }
  /**
   * 原样生成 forced-color-adjust 声明，保留关键字补全并接受自定义 CSS 值。
   *
   * 不做 CSS 语法校验或转义。多个值、函数或变量可写在同一个字符串中。
   * @param value 裸 CSS 属性值；undefined 省略声明。不包含属性名或末尾分号，数字不自动添加单位。
   * @returns 完整声明字符串，形如 forced-color-adjust:value;，undefined 返回空字符串。
   * @example
   * s.forcedColorAdjust.raw('inherit') // forced-color-adjust:inherit;
   */
  raw(value: Property.ForcedColorAdjust | CssString | undefined): string {
    return this.declaration(value);
  }
}
/**
 * forced-color-adjust 属性作者；关键字读取为完整声明字符串，保留中文说明。
 */
export type ForcedColorAdjustCss = ForcedColorAdjustCssRuntime &
  KeywordDeclarations<ForcedColorAdjustKeywords>;
/**
 * 控制元素是否参与系统强制颜色模式的自动替换。（forced-color-adjust）
 *
 * CSS 初始值：`auto`（不同于浏览器默认样式表）。
 * @see https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/forced-color-adjust
 */
export const ForcedColorAdjustCss = ForcedColorAdjustCssRuntime as new () => ForcedColorAdjustCss;
