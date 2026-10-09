import type { KeywordValues } from '../generated/keywords.js';

// 显式成员让 TypeScript 保留定义位置和文档；Record<字符串联合, V> 会丢失这些来源。
// 属性值沿用 CSS 原始值类型，不能收窄为亮色主题的默认字面量。

export interface UiColors {
  /** 页面背景色。 */
  readonly _background: KeywordValues['color'];
  /** 卡片与容器表面颜色。 */
  readonly _surface: KeywordValues['color'];
  /** 容器悬停时的表面颜色。 */
  readonly _surfaceHover: KeywordValues['color'];
  /** 主要文字颜色。 */
  readonly _text: KeywordValues['color'];
  /** 次要文字颜色。 */
  readonly _muted: KeywordValues['color'];
  /** 边框颜色。 */
  readonly _border: KeywordValues['color'];
  /** 分隔线颜色。 */
  readonly _divider: KeywordValues['color'];
  /** 键盘焦点提示颜色。 */
  readonly _focus: KeywordValues['color'];
  /** 主操作颜色。 */
  readonly _primary: KeywordValues['color'];
  /** 主操作悬停颜色。 */
  readonly _primaryHover: KeywordValues['color'];
  /** 主操作按下颜色。 */
  readonly _primaryPressed: KeywordValues['color'];
  /** 主操作背景上的文字与图标颜色。 */
  readonly _onPrimary: KeywordValues['color'];
  /** 成功状态颜色。 */
  readonly _success: KeywordValues['color'];
  /** 警告状态颜色。 */
  readonly _warning: KeywordValues['color'];
  /** 错误状态颜色。 */
  readonly _error: KeywordValues['color'];
  /** 禁用文字与图标颜色。 */
  readonly _disabled: KeywordValues['color'];
  /** 禁用控件表面颜色。 */
  readonly _disabledSurface: KeywordValues['color'];
}

export interface FontFamilyTokens {
  /** 无衬线字体，默认使用系统界面字体。 */
  readonly _sans: KeywordValues['fontFamily'];
  /** 等宽字体，用于代码与固定宽度文本。 */
  readonly _mono: KeywordValues['fontFamily'];
}

export interface FontSizeTokens {
  /** 极小字号，默认 0.75rem。 */
  readonly _xs: KeywordValues['fontSize'];
  /** 小字号，默认 0.875rem。 */
  readonly _sm: KeywordValues['fontSize'];
  /** 正文字号，默认 1rem。 */
  readonly _md: KeywordValues['fontSize'];
  /** 大字号，默认 1.125rem。 */
  readonly _lg: KeywordValues['fontSize'];
  /** 特大字号，默认 1.5rem。 */
  readonly _xl: KeywordValues['fontSize'];
}

export interface FontWeightTokens {
  /** 常规字重，默认 400。 */
  readonly _normal: KeywordValues['fontWeight'];
  /** 中等字重，默认 500。 */
  readonly _medium: KeywordValues['fontWeight'];
  /** 半粗字重，默认 600。 */
  readonly _semibold: KeywordValues['fontWeight'];
  /** 粗体字重，默认 700。 */
  readonly _bold: KeywordValues['fontWeight'];
}

export interface LineHeightTokens {
  /** 紧凑行高，默认字号的 1.25 倍。 */
  readonly _tight: KeywordValues['lineHeight'];
  /** 常规行高，默认字号的 1.5 倍。 */
  readonly _normal: KeywordValues['lineHeight'];
  /** 宽松行高，默认字号的 1.75 倍。 */
  readonly _relaxed: KeywordValues['lineHeight'];
}

export interface HeightTokens {
  /** 小控件高度，默认 1.75rem。 */
  readonly _sm: KeywordValues['height'];
  /** 常规控件高度，默认 2.25rem。 */
  readonly _md: KeywordValues['height'];
  /** 大控件高度，默认 2.75rem。 */
  readonly _lg: KeywordValues['height'];
}

export interface SpacingTokens<V> {
  /** 极小间距，默认 0.25rem。 */
  readonly _xs: V;
  /** 小间距，默认 0.5rem。 */
  readonly _sm: V;
  /** 常规间距，默认 1rem。 */
  readonly _md: V;
  /** 大间距，默认 1.5rem。 */
  readonly _lg: V;
  /** 特大间距，默认 2rem。 */
  readonly _xl: V;
}

export interface BorderRadiusTokens {
  /** 小圆角，默认 0.25rem。 */
  readonly _sm: KeywordValues['borderRadius'];
  /** 常规圆角，默认 0.5rem。 */
  readonly _md: KeywordValues['borderRadius'];
  /** 大圆角，默认 0.75rem。 */
  readonly _lg: KeywordValues['borderRadius'];
  /** 胶囊圆角，默认 9999px。 */
  readonly _full: KeywordValues['borderRadius'];
}

export interface BorderWidthTokens {
  /** 细边框，默认 1px。 */
  readonly _thin: KeywordValues['borderWidth'];
  /** 粗边框，默认 2px。 */
  readonly _thick: KeywordValues['borderWidth'];
}

export interface OpacityTokens {
  /** 禁用状态透明度，默认 0.5。 */
  readonly _disabled: KeywordValues['opacity'];
}

export interface DurationTokens<V> {
  /** 快速动效时长，默认 120ms。 */
  readonly _fast: V;
  /** 常规动效时长，默认 200ms。 */
  readonly _normal: V;
  /** 缓慢动效时长，默认 300ms。 */
  readonly _slow: V;
}

export interface TimingFunctionTokens {
  /** 标准缓动曲线，默认 ease。 */
  readonly _standard: KeywordValues['transitionTimingFunction'];
}

export interface BoxShadowTokens {
  /** 小阴影：下移 1px、模糊 3px；颜色随亮暗主题变化。 */
  readonly _sm: KeywordValues['boxShadow'];
  /** 常规阴影：下移 4px、模糊 12px；颜色随亮暗主题变化。 */
  readonly _md: KeywordValues['boxShadow'];
  /** 大阴影：下移 12px、模糊 32px；颜色随亮暗主题变化。 */
  readonly _lg: KeywordValues['boxShadow'];
}
