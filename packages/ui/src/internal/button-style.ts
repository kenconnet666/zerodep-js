import { css, type Css, type CssValue } from 'zerodep-js-css';
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

/** 四类控件共用几何与相连协议；不在主题中加入按钮专用 token。 */
export function buttonStyle(s: Css<UiTheme>, options: ButtonStyleOptions): string {
  const { variant, iconOnly, pressed, color, backgroundColor, borderColor } = options;
  const filled = variant === 'solid' || pressed;
  return css(
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
    s.color.raw(color ?? (filled ? '_onPrimary' : '_primary')),
    s.backgroundColor.raw(backgroundColor ?? (filled ? '_primary' : 'transparent')),
    s.borderColor.raw(borderColor ?? (variant === 'outline' ? '_primary' : 'transparent')),
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
  );
}
