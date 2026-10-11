import type { UiTheme } from '../provider/theme/theme.js';
import { _component, _derived, type JSX } from 'zerodep-js';
import { css, type CssValue, bx } from 'zerodep-js-css';
import { useCss } from '../provider/context.js';
import { Ripple, type RippleProps } from './Ripple.js';
import { _resolveSlotProps, type SlotProps } from '../utils/slot-props.js';
export interface ButtonBaseState {
  readonly disabled: boolean;
}
export type ButtonBaseProps = Omit<JSX.IntrinsicElements['button'], 'size'> & {
  /** 组件根字号基准；内部 em 尺寸随之变化，省略时继承，不设置固定高度。 */
  size?: CssValue<'fontSize', UiTheme>;
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
    size,
    slotRipple,
    class: className,
    children,
    onClick,
    ...rest
  }: ButtonBaseProps) => {
    const s = useCss();
    const state = _derived(
      Object.freeze({
        disabled: Boolean(disabled),
      }),
    );
    const rippleProps = _derived.by(() => _resolveSlotProps(slotRipple, state));
    const style = _derived([
      css(() => {
        s.position('relative');
        s.display('inline-flex');
        s.alignItems('center');
        s.justifyContent('center');
        s.font('inherit');
        s.fontSize(bx(size));
        s.color('inherit');
        s.backgroundColor('transparent');
        s.border('0');
        s.padding(0);
        s.cursor('pointer');
        s.select('&:disabled', () => {
          s.cursor('not-allowed');
          s.opacity('_disabled');
        });
        s.select('&[hidden]', () => {
          s.display('none');
        });
        s.select('&:focus-visible', () => {
          s.outlineStyle('solid');
          s.outlineWidth('0.125em');
          s.outlineOffset('0.125em');
          s.outlineColor('_focus');
        });
      }),
      className,
    ]);
    return (
      <button
        {...rest}
        type={type}
        disabled={disabled}
        onClick={(event) => {
          if (!disabled && !event.currentTarget.matches(':disabled')) onClick?.(event);
        }}
        class={style}
      >
        {children}
        {ripple && <Ripple {...rippleProps} disabled={Boolean(disabled)} />}
      </button>
    );
  },
);
