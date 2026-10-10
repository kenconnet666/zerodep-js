import { _component, _derived, styleText, type JSX } from 'zerodep-js';
import { _mergeClasses } from 'zerodep-js-css';
import type { LucideIconData } from '@lucide/icons';
import type { ButtonState } from './Button.js';
import { ButtonBase } from './ButtonBase.js';
import { ButtonContent } from '../internal/ButtonContent.js';
import { buttonStyle } from '../internal/button-style.js';
import type { AccessibleName, ActionProps, DecorationProps } from '../internal/button-props.js';
import { _resolveSlotProps, type SlotProps } from '../utils/slot-props.js';
import { useCss } from '../provider/context.js';

export type IconButtonProps = Omit<
  JSX.IntrinsicElements['button'],
  'size' | 'color' | 'children' | 'aria-busy'
> &
  ActionProps<ButtonState> &
  AccessibleName & {
    icon: LucideIconData;
    children?: never;
    slotIcon?: SlotProps<DecorationProps, ButtonState> | undefined;
  };

export const IconButton = _component(
  ({
    icon,
    variant = 'text',
    size,
    color,
    backgroundColor,
    borderColor,
    disabled = false,
    loading = false,
    ripple = true,
    slotIcon,
    slotSpinner,
    slotRipple,
    class: className,
    style: customStyle,
    children: _children,
    ...rest
  }: IconButtonProps) => {
    const s = useCss();
    const state = _derived(
      Object.freeze({ variant, disabled, loading, unavailable: disabled || loading }),
    );
    const style = _derived(
      buttonStyle(s, { variant, color, backgroundColor, borderColor, iconOnly: true }),
    );
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
          icon={icon}
          iconProps={_resolveSlotProps(slotIcon, state)}
          spinnerProps={_resolveSlotProps(slotSpinner, state)}
        />
      </ButtonBase>
    );
  },
);
