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
  variant?: ButtonVariant | undefined;
  size?: CssValue<'fontSize'>;
  color?: CssValue<'color'>;
  backgroundColor?: CssValue<'backgroundColor'>;
  borderColor?: CssValue<'borderColor'>;
  disabled?: boolean | undefined;
  loading?: boolean | undefined;
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
  children?: Renderable;
  startIcon?: LucideIconData | undefined;
  endIcon?: LucideIconData | undefined;
  slotStartIcon?: SlotProps<DecorationProps, S> | undefined;
  slotEndIcon?: SlotProps<DecorationProps, S> | undefined;
  slotText?:
    | SlotProps<Omit<TextProps, 'as' | 'children' | 'aria-hidden'> & { 'aria-hidden'?: never }, S>
    | undefined;
}
