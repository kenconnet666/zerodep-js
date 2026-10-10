import type {
  TextProps,
  ButtonBaseProps,
  RippleProps,
  SlotProps,
  ProviderProps,
  ElementSize,
  UiTheme,
} from '../src/index.js';
import type { CssValue } from 'zerodep-js-css';

const text: TextProps = { as: 'h2', color: '_primary', weight: 500, size: '1.25rem' };
const color: CssValue<'color', UiTheme> = '_primary';
const button: ButtonBaseProps = {
  size: '_md',
  slotRipple: (state) => ({ color: state.disabled ? '_disabled' : '_primary' }),
};
const ripple: SlotProps<RippleProps, { disabled: boolean }> = (state) => ({
  disabled: state.disabled,
});
// @ts-expect-error 文字标签不接受任意交互元素。
const invalidTag: TextProps = { as: 'button' };
// @ts-expect-error 底座拥有 disabled，Ripple slot 不能覆盖它。
const invalidSlot: ButtonBaseProps = { slotRipple: { disabled: false } };
// @ts-expect-error 不再提供统一的 slotProps 入口。
const legacySlot: ButtonBaseProps = { slotProps: { ripple: { color: '_primary' } } };
// @ts-expect-error 颜色不接受裸数字。
const invalidColor: CssValue<'color', UiTheme> = 5;
// @ts-expect-error size 是 CSS 字号，不把裸数字隐式转换为像素。
const invalidSize: ButtonBaseProps = { size: 16 };
const fluid: ProviderProps = { size: 'clamp(1rem, 2vw, 2rem)' };
const measured: ElementSize = { inlineSize: 20, blockSize: 40 };
// @ts-expect-error 测量结果使用只读 CSS 像素。
measured.inlineSize = 30;
void [
  text,
  color,
  button,
  ripple,
  invalidTag,
  invalidSlot,
  legacySlot,
  invalidColor,
  invalidSize,
  fluid,
  measured,
];
