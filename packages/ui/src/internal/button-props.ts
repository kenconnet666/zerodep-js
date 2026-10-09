import type { CssValue } from 'zerodep-js-css';
import type { LucideIconData } from '@lucide/icons';
import type { Renderable } from 'zerodep-js';
import type { IconProps } from '../base/Icon.js';
import type { TextProps } from '../base/Text.js';
import type { RippleProps } from '../base/Ripple.js';
import type { SlotProps } from '../utils/slot-props.js';
import type { ButtonVariant } from '../base/Button.js';

type Decoration = 'aria-hidden' | 'aria-label' | 'aria-labelledby' | 'role';
export type DecorationProps = Omit<IconProps, 'icon' | 'children' | Decoration> & {
  [K in Decoration]?: never;
};
export type AccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: string | undefined }
  | { 'aria-labelledby': string; 'aria-label'?: string | undefined };

export interface ActionProps<S> {
  /** 外观变体，不改变原生元素语义或字号。 */
  variant?: ButtonVariant | undefined;
  /** CSS 字号，省略时继承；内部几何尺寸按 em 缩放。 */
  size?: CssValue<'fontSize'>;
  /** 前景色；与 backgroundColor 分开，不自动推算对比文字色。 */
  color?: CssValue<'color'>;
  backgroundColor?: CssValue<'backgroundColor'>;
  borderColor?: CssValue<'borderColor'>;
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
export interface LabelProps<S> {
  /** 非交互标签内容，不嵌套链接或其他交互控件。 */
  children?: Renderable;
  /** 文字起始侧图标，遵循 RTL 方向。 */
  startIcon?: LucideIconData | undefined;
  /** 文字结束侧图标，遵循 RTL 方向。 */
  endIcon?: LucideIconData | undefined;
  slotStartIcon?: SlotProps<DecorationProps, S> | undefined;
  slotEndIcon?: SlotProps<DecorationProps, S> | undefined;
  slotText?:
    | SlotProps<Omit<TextProps, 'as' | 'children' | 'aria-hidden'> & { 'aria-hidden'?: never }, S>
    | undefined;
}
