import { css, type Css, type CssClass, type CssValue, bx } from 'zerodep-js-css';
import type { UiTheme } from '../provider/theme/theme.js';
import type { ButtonVariant } from './Button.js';

/** 标准按钮边框厚度，单位 em；ButtonGroup 使用相同数值重叠接缝。 */
export const buttonBorderWidth = 0.0625;
export interface ButtonStyleOptions {
  variant: ButtonVariant;
  iconOnly?: boolean | undefined;
  pressed?: boolean | undefined;
  color?: CssValue<'color', UiTheme>;
  backgroundColor?: CssValue<'backgroundColor', UiTheme>;
  borderColor?: CssValue<'borderColor', UiTheme>;
}

/** 四类控件共用几何与相连协议；颜色变化只更新安全的元素变量。 */
export function _buttonStyle(s: Css<UiTheme>, options: ButtonStyleOptions): CssClass {
  const { variant, iconOnly, pressed, color, backgroundColor, borderColor } = options;
  const filled = variant === 'solid' || pressed;
  return css(() => {
    s.boxSizing('border-box');
    s.position('relative');
    s.display('inline-flex');
    s.alignItems('center');
    s.justifyContent('center');
    s.verticalAlign('middle');
    s.font('inherit');
    s.lineHeight(1.25);
    s.fontWeight('_medium');
    s.textDecoration('none');
    s.textAlign('center');
    s.whiteSpace('normal');
    s.overflowWrap('anywhere');
    s.flexShrink(0);
    s.minInlineSize(0);
    s.minBlockSize('2.625em');
    s.paddingBlock(bx(`${iconOnly ? 0 : 0.625}em`));
    s.paddingInline(bx(`${iconOnly ? 0 : 1}em`));
    if (iconOnly) {
      s.inlineSize('2.625em');
    }
    s.borderStyle('solid');
    s.borderWidth(bx(`${buttonBorderWidth}em`));
    s.borderRadius('0.5em');
    s.color(bx(color ?? (filled ? '_onPrimary' : '_primary')));
    s.backgroundColor(bx(backgroundColor ?? (filled ? '_primary' : 'transparent')));
    s.borderColor(bx(borderColor ?? (variant === 'outline' ? '_primary' : 'transparent')));
    s.cursor('pointer');
    s.select('&[hidden]', () => {
      s.display('none');
    });
    s.select('&:disabled, &[aria-disabled="true"]', () => {
      s.cursor('not-allowed');
      s.opacity('_disabled');
    });
    s.select('@media (hover: hover)', () => {
      s.select('&:not(:disabled):not([aria-disabled="true"]):hover', () => {
        s.filter('brightness(0.92)');
      });
    });
    s.select('&:not(:disabled):not([aria-disabled="true"]):active', () => {
      s.filter('brightness(0.84)');
    });
    s.select('&:focus-visible', () => {
      s.outlineStyle('solid');
      s.outlineWidth('0.125em');
      s.outlineOffset('0.125em');
      s.outlineColor('_focus');
    });
    if (pressed) {
      s.boxShadow('inset 0 0 0 0.0625em currentColor');
    }
    s.select('@media (forced-colors: active)', () => {
      s.borderColor('ButtonText');
      s.select('&:focus-visible', () => {
        s.outlineColor('Highlight');
      });
      s.select('&[aria-pressed="true"]', () => {
        s.backgroundColor('Highlight');
        s.color('HighlightText');
      });
      s.select('&:disabled, &[aria-disabled="true"]', () => {
        s.color('GrayText');
        s.opacity(1);
      });
    });
  });
}
