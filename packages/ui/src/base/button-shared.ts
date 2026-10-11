import type { UiTheme } from '../provider/theme/theme.js';
import { bx, type Css, type CssValue } from 'zerodep-js-css';
import type { Renderable } from 'zerodep-js';
import type { IconProps } from './Icon.js';
import type { RippleProps } from './Ripple.js';
import type { SlotProps } from '../utils/slot-props.js';
export type ButtonVariant = 'solid' | 'outline' | 'text';
export interface ButtonState {
  readonly variant: ButtonVariant;
  /** 调用方显式禁用，不包含 loading。 */
  readonly disabled: boolean;
  readonly loading: boolean;
  /** disabled || loading，用于判断当前能否激活。 */
  readonly unavailable: boolean;
}
/** 标准按钮边框厚度，单位 em；ButtonGroup 使用相同数值重叠接缝。 */
export const buttonBorderWidth = 0.0625;

type Decoration = 'aria-hidden' | 'aria-label' | 'aria-labelledby' | 'role';
export type DecorationProps = Omit<IconProps, 'icon' | 'children' | Decoration> & {
  [K in Decoration]?: never;
};
export type AccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: string | undefined }
  | { 'aria-labelledby': string; 'aria-label'?: string | undefined };

export interface ActionProps<S> {
  /** 外观变体，不改变原生元素语义或字号。 */
  variant?: ButtonVariant | undefined;
  /** CSS 字号，省略时继承；内部几何尺寸按 em 缩放。 */
  size?: CssValue<'fontSize', UiTheme>;
  /** 前景色；与 backgroundColor 分开，不自动推算对比文字色。 */
  color?: CssValue<'color', UiTheme>;
  backgroundColor?: CssValue<'backgroundColor', UiTheme>;
  borderColor?: CssValue<'borderColor', UiTheme>;
  disabled?: boolean | undefined;
  /** 外部拥有加载状态；加载时禁用激活并保持内容占位。 */
  loading?: boolean | undefined;
  /** 仅关闭按压视觉；关闭后仍有 focus-visible 轮廓。 */
  ripple?: boolean | undefined;
  slotSpinner?: SlotProps<DecorationProps, S> | undefined;
  slotRipple?:
    | SlotProps<
        Omit<RippleProps, 'disabled' | 'children' | Decoration> & { [K in Decoration]?: never },
        S
      >
    | undefined;
}
/** 图标是调用方创建的装饰内容，按钮只负责区域布局，不依赖图标库。 */
export interface LabelProps {
  children?: Renderable;
  startIcon?: Renderable;
  endIcon?: Renderable;
}
/** 显式 icon 模式保留名称约束，不通过扫描 children 猜测纯图标按钮。 */
export type ButtonContentInput =
  | (LabelProps & { icon?: never })
  | (AccessibleName & { icon: Renderable; children?: never; startIcon?: never; endIcon?: never });

// 仅在当前 css 回调中写入声明，供 button/a 两种原生根复用；不导出为包根 API。
type Appearance = Pick<ActionProps<ButtonState>, 'color' | 'backgroundColor' | 'borderColor'> & {
  variant: ButtonVariant;
  iconOnly?: boolean;
  pressed?: boolean;
};
export function _buttonAppearance(
  s: Css<UiTheme>,
  { variant, iconOnly = false, pressed = false, color, backgroundColor, borderColor }: Appearance,
): void {
  const filled = variant === 'solid' || pressed;
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
}
