import { _component, type JSX } from 'zerodep-js';
import { Button } from './Button.js';
import { _resolveSlotProps } from '../utils/slot-props.js';
import type { ActionProps, ButtonState, ButtonContentInput } from './Button.js';
export interface ToggleButtonState extends ButtonState {
  readonly pressed: boolean;
}
export type ToggleButtonProps = Omit<
  JSX.IntrinsicElements['button'],
  'size' | 'color' | 'children' | 'aria-busy' | 'aria-pressed' | 'type'
> &
  ActionProps<ToggleButtonState> &
  ButtonContentInput & {
    /** 父级拥有选中状态，可使用 bind:pressed。 */
    pressed: boolean;
    onPressedChange: (pressed: boolean) => void;
    type?: never;
  };
/** 只请求更新；取消事件、禁用或父级拒绝写回时不改变显示状态。 */
export const ToggleButton = _component(
  ({
    pressed,
    onPressedChange,
    onClick,
    variant = 'outline',
    disabled = false,
    loading = false,
    slotRipple,
    slotSpinner,
    ...rest
  }: ToggleButtonProps) => (
    <Button
      {...rest}
      variant={variant}
      disabled={disabled}
      loading={loading}
      type="button"
      aria-pressed={pressed}
      slotRipple={(state) => _resolveSlotProps(slotRipple, { ...state, pressed }) ?? {}}
      slotSpinner={(state) => _resolveSlotProps(slotSpinner, { ...state, pressed }) ?? {}}
      onClick={(event) => {
        if (disabled || loading || event.currentTarget.matches(':disabled')) return;
        onClick?.(event);
        if (!event.defaultPrevented && !disabled && !loading) onPressedChange(!pressed);
      }}
    />
  ),
);
