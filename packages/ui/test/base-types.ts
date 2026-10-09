import type { TextProps, ButtonBaseProps, RippleProps, SlotProps } from '../src/index.js';
import type { CssValue } from 'zerodep-js-css';

const text: TextProps = { as: 'h2', color: '_primary', weight: 500, size: '1.25rem' };
const color: CssValue<'color'> = '_primary';
const button: ButtonBaseProps = {
  slotProps: { ripple: (state) => ({ color: state.disabled ? '_disabled' : '_primary' }) },
};
const ripple: SlotProps<RippleProps, { disabled: boolean }> = (state) => ({
  disabled: state.disabled,
});
// @ts-expect-error 文字标签不接受任意交互元素。
const invalidTag: TextProps = { as: 'button' };
// @ts-expect-error 底座拥有 disabled，Ripple slot 不能覆盖它。
const invalidSlot: ButtonBaseProps = { slotProps: { ripple: { disabled: false } } };
// @ts-expect-error 颜色不接受裸数字。
const invalidColor: CssValue<'color'> = 5;
void [text, color, button, ripple, invalidTag, invalidSlot, invalidColor];
