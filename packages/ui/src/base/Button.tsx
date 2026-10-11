import { _component, _derived, type JSX, type Renderable } from 'zerodep-js';
import { css, bx, type CssValue } from 'zerodep-js-css';
import type { UiTheme } from '../provider/theme/theme.js';
import type { RippleProps } from './Ripple.js';
import type { SlotProps } from '../utils/slot-props.js';
import { ButtonBase } from './ButtonBase.js';
import { ButtonContent, type DecorationProps } from './ButtonContent.js';
import { _resolveSlotProps } from '../utils/slot-props.js';
import { useCss } from '../provider/context.js';

export type ButtonVariant = 'solid' | 'outline' | 'text';
export interface ButtonState {
  readonly variant: ButtonVariant;
  /** 调用方显式禁用，不包含 loading。 */
  readonly disabled: boolean;
  readonly loading: boolean;
  /** disabled || loading，用于判断当前能否激活。 */
  readonly unavailable: boolean;
}

type Decoration = 'aria-hidden' | 'aria-label' | 'aria-labelledby' | 'role';
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

export type ButtonProps = Omit<
  JSX.IntrinsicElements['button'],
  'size' | 'color' | 'children' | 'aria-busy'
> &
  ActionProps<ButtonState> &
  ButtonContentInput;

export const Button = _component(
  ({
    variant = 'solid',
    size,
    color,
    backgroundColor,
    borderColor,
    disabled = false,
    loading = false,
    ripple = true,
    icon,
    startIcon,
    endIcon,
    children,
    slotSpinner,
    slotRipple,
    'aria-pressed': ariaPressed,
    class: className,
    ...rest
  }: ButtonProps) => {
    const s = useCss();
    const state = _derived(
      Object.freeze({ variant, disabled, loading, unavailable: disabled || loading }),
    );

    return (
      <ButtonBase
        {...rest}
        size={size}
        disabled={state.unavailable}
        ripple={ripple}
        aria-busy={loading || undefined}
        aria-pressed={ariaPressed}
        data-ui-action=""
        class={[
          css(() => {
            const iconOnly = icon !== undefined;
            const pressed = ariaPressed === true || ariaPressed === 'true';
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
            // 与 ButtonGroup 的 0.0625em 接缝协议一致。
            s.borderWidth('0.0625em');
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
          }),
          className,
        ]}
        slotRipple={_resolveSlotProps(slotRipple, state)}
      >
        <ButtonContent
          loading={loading}
          icon={icon}
          startIcon={startIcon}
          endIcon={endIcon}
          spinnerProps={_resolveSlotProps(slotSpinner, state)}
        >
          {children}
        </ButtonContent>
      </ButtonBase>
    );
  },
);
