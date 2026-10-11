import { _component, type JSX, type Renderable } from 'zerodep-js';
import { Button } from './Button.js';
import type { AccessibleName, ActionProps, ButtonState } from './button-shared.js';
export type IconButtonProps = Omit<
  JSX.IntrinsicElements['button'],
  'size' | 'color' | 'children' | 'aria-busy'
> &
  ActionProps<ButtonState> &
  AccessibleName & {
    icon: Renderable;
    children?: never;
    startIcon?: never;
    endIcon?: never;
  };
/** 纯图标只增加名称约束与默认变体，其余实现复用 Button。 */
export const IconButton = _component(({ variant = 'text', ...rest }: IconButtonProps) => (
  <Button {...rest} variant={variant} />
));
