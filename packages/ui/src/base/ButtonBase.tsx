import { _component, _derived, type JSX } from 'zerodep-js';
import { css, _mergeClasses } from 'zerodep-js-css';
import { useCss } from '../provider/context.js';
import { Ripple, type RippleProps } from './Ripple.js';
import { _resolveSlotProps, type SlotProps } from '../utils/slot-props.js';

export interface ButtonBaseState {
  readonly disabled: boolean;
}
export type ButtonBaseProps = JSX.IntrinsicElements['button'] & {
  ripple?: boolean | undefined;
  /** 转发给 Ripple 的属性或状态回调；disabled 仍由按钮拥有。 */
  slotRipple?: SlotProps<Omit<RippleProps, 'disabled' | 'children'>, ButtonBaseState> | undefined;
};

/** 原生按钮底座；业务 click、表单提交语义和焦点均保留浏览器行为。 */
export const ButtonBase = _component(
  ({
    type = 'button',
    disabled = false,
    ripple = true,
    slotRipple,
    class: className,
    children,
    onClick,
    ...rest
  }: ButtonBaseProps) => {
    const s = useCss();
    const state = _derived(Object.freeze({ disabled: Boolean(disabled) }));
    const rippleProps = _derived.by(() => _resolveSlotProps(slotRipple, state));
    const style = css(
      s.position.relative,
      s.display.inlineFlex,
      s.alignItems.center,
      s.justifyContent.center,
      s.font.inherit,
      s.color.inherit,
      s.backgroundColor.transparent,
      s.border.raw('0'),
      s.padding.px(0),
      s.cursor.raw(disabled ? 'default' : 'pointer'),
      s.opacity.raw(disabled ? s.keywords.opacity._disabled : undefined),
      s._focusVisible(
        s.outlineStyle.solid,
        s.outlineWidth.px(2),
        s.outlineOffset.px(2),
        s.outlineColor._focus,
      ),
    );
    return (
      <button
        {...rest}
        type={type}
        disabled={disabled}
        onClick={(event) => {
          if (!disabled) onClick?.(event);
        }}
        class={_mergeClasses(style, className)}
      >
        {children}
        {ripple && <Ripple {...rippleProps} disabled={Boolean(disabled)} />}
      </button>
    );
  },
);
