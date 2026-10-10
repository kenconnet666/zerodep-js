import { _component, _derived, type JSX } from 'zerodep-js';
import { _mergeClasses } from 'zerodep-js-css';
import type { LucideIconData } from '@lucide/icons';
import type { ButtonState } from './Button.js';
import { ButtonBase } from './ButtonBase.js';
import { ButtonContent } from './ButtonContent.js';
import { _buttonStyle } from './button-style.js';
import type { AccessibleName, ActionProps, DecorationProps, LabelProps } from './button-props.js';
import { _resolveSlotProps, type SlotProps } from '../utils/slot-props.js';
import { useCss } from '../provider/context.js';

export interface ToggleButtonState extends ButtonState {
  readonly pressed: boolean;
}
export type ToggleButtonProps = Omit<
  JSX.IntrinsicElements['button'],
  'size' | 'color' | 'children' | 'aria-busy' | 'aria-pressed' | 'type'
> &
  ActionProps<ToggleButtonState> & {
    /** 父级拥有的持续选中状态，可使用 bind:pressed。 */
    pressed: boolean;
    /** 请求切换；父级不接受时仍显示原 pressed。 */
    onPressedChange: (pressed: boolean) => void;
    type?: never;
  } & (
    | (LabelProps<ToggleButtonState> & { icon?: never; slotIcon?: never })
    | (AccessibleName & {
        icon: LucideIconData;
        children?: never;
        startIcon?: never;
        endIcon?: never;
        slotStartIcon?: never;
        slotEndIcon?: never;
        slotText?: never;
        slotIcon?: SlotProps<DecorationProps, ToggleButtonState> | undefined;
      })
  );

/** 仅请求状态更新，始终由父级 pressed 决定实际选中，不另建乐观状态。 */
export const ToggleButton = _component(
  ({
    pressed,
    onPressedChange,
    onClick,
    icon,
    children,
    startIcon,
    endIcon,
    variant = 'outline',
    disabled = false,
    loading = false,
    color,
    backgroundColor,
    borderColor,
    slotIcon,
    slotStartIcon,
    slotEndIcon,
    slotText,
    slotSpinner,
    slotRipple,
    class: className,
    ...rest
  }: ToggleButtonProps) => {
    const s = useCss();
    const state = _derived(
      Object.freeze({ variant, disabled, loading, unavailable: disabled || loading, pressed }),
    );
    const style = _derived(
      _buttonStyle(s, {
        variant,
        pressed,
        color,
        backgroundColor,
        borderColor,
        iconOnly: Boolean(icon),
      }),
    );
    const activate: NonNullable<JSX.IntrinsicElements['button']['onClick']> = (event) => {
      if (state.unavailable || event.currentTarget.matches(':disabled')) return;
      onClick?.(event);
      if (!event.defaultPrevented && !state.unavailable) onPressedChange(!pressed);
    };
    return (
      <ButtonBase
        {...rest}
        disabled={state.unavailable}
        type="button"
        aria-pressed={pressed}
        aria-busy={loading || undefined}
        data-ui-action=""
        onClick={activate}
        class={_mergeClasses(style, className)}
        slotRipple={_resolveSlotProps(slotRipple, state)}
      >
        <ButtonContent
          loading={loading}
          icon={icon}
          startIcon={startIcon}
          endIcon={endIcon}
          iconProps={_resolveSlotProps(slotIcon, state)}
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
