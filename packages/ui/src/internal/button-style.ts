import { css, Css, cssBinding, cssResult, type CssProps, type CssValue } from 'zerodep-js-css';
import type { UiTheme } from '../provider/theme/theme.js';
import type { ButtonVariant } from '../base/Button.js';

export interface ButtonStyleOptions {
  variant: ButtonVariant;
  iconOnly?: boolean | undefined;
  pressed?: boolean | undefined;
  color?: CssValue<'color', UiTheme>;
  backgroundColor?: CssValue<'backgroundColor', UiTheme>;
  borderColor?: CssValue<'borderColor', UiTheme>;
}

const literalColors = new Css();

/** 先由主题作者解析关键字，再复用 CSS 的保守转换；特殊值仍返回完整声明。 */
function colorBinding(
  property: 'color' | 'background-color' | 'border-color',
  declaration: string,
) {
  const prefix = property + ':';
  if (!declaration.startsWith(prefix) || !declaration.endsWith(';')) return declaration;
  const value = declaration.slice(prefix.length, -1);
  const member =
    property === 'background-color'
      ? 'backgroundColor'
      : property === 'border-color'
        ? 'borderColor'
        : 'color';
  return cssBinding(literalColors, member, 'raw', () => value, `--zj-button-${property}`);
}

/** 四类控件共用几何与相连协议；颜色变化只更新安全的元素变量。 */
export function buttonStyle(s: Css<UiTheme>, options: ButtonStyleOptions): CssProps {
  const { variant, iconOnly, pressed, color, backgroundColor, borderColor } = options;
  const filled = variant === 'solid' || pressed;
  return cssResult(css, [
    '--zj-action-border:0.0625em;',
    s.boxSizing.borderBox,
    s.position.relative,
    s.display.inlineFlex,
    s.alignItems.center,
    s.justifyContent.center,
    s.verticalAlign.middle,
    s.font.inherit,
    s.lineHeight.raw(1.25),
    s.fontWeight._medium,
    s.textDecoration.none,
    s.textAlign.center,
    s.whiteSpace.normal,
    s.overflowWrap.anywhere,
    s.flexShrink.raw(0),
    s.minInlineSize.raw(0),
    s.minBlockSize.em(2.625),
    s.paddingBlock.em(iconOnly ? 0 : 0.625),
    s.paddingInline.em(iconOnly ? 0 : 1),
    iconOnly && s.inlineSize.em(2.625),
    s.borderStyle.solid,
    s.borderWidth.raw('var(--zj-action-border)'),
    s.borderRadius.em(0.5),
    colorBinding('color', s.color.raw(color ?? (filled ? '_onPrimary' : '_primary'))),
    colorBinding(
      'background-color',
      s.backgroundColor.raw(backgroundColor ?? (filled ? '_primary' : 'transparent')),
    ),
    colorBinding(
      'border-color',
      s.borderColor.raw(borderColor ?? (variant === 'outline' ? '_primary' : 'transparent')),
    ),
    s.cursor.pointer,
    s._selector('&[hidden]', s.display.none),
    s._selector('&:disabled, &[aria-disabled="true"]', s.cursor.default, s.opacity._disabled),
    s._selector(
      '@media (hover: hover)',
      s._selector(
        '&:not(:disabled):not([aria-disabled="true"]):hover',
        s.filter.raw('brightness(0.92)'),
      ),
    ),
    s._selector(
      '&:not(:disabled):not([aria-disabled="true"]):active',
      s.filter.raw('brightness(0.84)'),
    ),
    s._focusVisible(
      s.outlineStyle.solid,
      s.outlineWidth.em(0.125),
      s.outlineOffset.em(0.125),
      s.outlineColor._focus,
    ),
    pressed && s.boxShadow.raw('inset 0 0 0 0.0625em currentColor'),
    s._selector(
      '@media (forced-colors: active)',
      s.borderColor.raw('ButtonText'),
      s._focusVisible(s.outlineColor.raw('Highlight')),
      s._selector(
        '&[aria-pressed="true"]',
        s.backgroundColor.raw('Highlight'),
        s.color.raw('HighlightText'),
      ),
      s._selector('&:disabled, &[aria-disabled="true"]', s.color.raw('GrayText'), s.opacity.raw(1)),
    ),
  ]);
}
