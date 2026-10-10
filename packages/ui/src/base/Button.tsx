import { _component, _derived, styleText, type JSX } from 'zerodep-js';
import { _mergeClasses } from 'zerodep-js-css';
import { ButtonBase } from './ButtonBase.js';
import { ButtonContent } from '../internal/ButtonContent.js';
import { buttonStyle } from '../internal/button-style.js';
import type { ActionProps, LabelProps } from '../internal/button-props.js';
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
export type ButtonProps = Omit<
  JSX.IntrinsicElements['button'],
  'size' | 'color' | 'children' | 'aria-busy'
> &
  ActionProps<ButtonState> &
  LabelProps<ButtonState>;

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
    startIcon,
    endIcon,
    slotStartIcon,
    slotEndIcon,
    slotText,
    slotSpinner,
    slotRipple,
    class: className,
    style: customStyle,
    children,
    ...rest
  }: ButtonProps) => {
    const s = useCss();
    const state = _derived(
      Object.freeze({ variant, disabled, loading, unavailable: disabled || loading }),
    );
    const style = _derived(buttonStyle(s, { variant, color, backgroundColor, borderColor }));
    return (
      <ButtonBase
        {...rest}
        size={size}
        disabled={state.unavailable}
        ripple={ripple}
        aria-busy={loading || undefined}
        data-ui-action=""
        style={[style.style, styleText(customStyle)].filter(Boolean).join(';')}
        class={_mergeClasses(style.class, className)}
        slotRipple={_resolveSlotProps(slotRipple, state)}
      >
        <ButtonContent
          loading={loading}
          startIcon={startIcon}
          endIcon={endIcon}
          startProps={_resolveSlotProps(slotStartIcon, state)}
          endProps={_resolveSlotProps(slotEndIcon, state)}
          textProps={_resolveSlotProps(slotText, state)}
          spinnerProps={_resolveSlotProps(slotSpinner, state)}
        >
          {children}
        </ButtonContent>
      </ButtonBase>
    );
  },
);
