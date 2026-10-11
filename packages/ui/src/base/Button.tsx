import { _component, _derived, type JSX } from 'zerodep-js';
import { css } from 'zerodep-js-css';
import { ButtonBase } from './ButtonBase.js';
import { ButtonContent } from './ButtonContent.js';
import {
  _buttonAppearance,
  type ActionProps,
  type ButtonState,
  type ButtonContentInput,
} from './button-shared.js';
import { _resolveSlotProps } from '../utils/slot-props.js';
import { useCss } from '../provider/context.js';

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
    const appearance = css(() => {
      _buttonAppearance(s, {
        variant,
        iconOnly: icon !== undefined,
        pressed: ariaPressed === true || ariaPressed === 'true',
        color,
        backgroundColor,
        borderColor,
      });
    });
    return (
      <ButtonBase
        {...rest}
        size={size}
        disabled={state.unavailable}
        ripple={ripple}
        aria-busy={loading || undefined}
        aria-pressed={ariaPressed}
        data-ui-action=""
        class={[appearance, className]}
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
