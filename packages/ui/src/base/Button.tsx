import { _component, _derived, type JSX } from 'zerodep-js';
import { css, bx, type Css } from 'zerodep-js-css';
import type { UiTheme } from '../provider/theme/theme.js';
import { ButtonBase } from './ButtonBase.js';
import { ButtonContent } from './ButtonContent.js';
import {
  buttonBorderWidth,
  type ActionProps,
  type ButtonState,
  type ButtonContentInput,
  type ButtonVariant,
} from './button-props.js';
import { _resolveSlotProps } from '../utils/slot-props.js';
import { useCss } from '../provider/context.js';

export type ButtonProps = Omit<
  JSX.IntrinsicElements['button'],
  'size' | 'color' | 'children' | 'aria-busy'
> &
  ActionProps<ButtonState> &
  ButtonContentInput;

export const Button = _component(
  ({
    variant = 'solid',
    size,
    color,
    backgroundColor,
    borderColor,
    disabled = false,
    loading = false,
    ripple = true,
    icon,
    startIcon,
    endIcon,
    children,
    slotSpinner,
    slotRipple,
    'aria-pressed': ariaPressed,
    class: className,
    ...rest
  }: ButtonProps) => {
    const s = useCss();
    const state = _derived(
      Object.freeze({ variant, disabled, loading, unavailable: disabled || loading }),
    );
    const appearance = css(() => {
      _buttonAppearance(s, {
        variant,
        iconOnly: icon !== undefined,
        pressed: ariaPressed === true || ariaPressed === 'true',
        color,
        backgroundColor,
        borderColor,
      });
    });
    return (
      <ButtonBase
        {...rest}
        size={size}
        disabled={state.unavailable}
        ripple={ripple}
        aria-busy={loading || undefined}
        aria-pressed={ariaPressed}
        data-ui-action=""
        class={[appearance, className]}
        slotRipple={_resolveSlotProps(slotRipple, state)}
      >
        <ButtonContent
          loading={loading}
          icon={icon}
          startIcon={startIcon}
          endIcon={endIcon}
          spinnerProps={_resolveSlotProps(slotSpinner, state)}
        >
          {children}
        </ButtonContent>
      </ButtonBase>
    );
  },
);

// 仅在当前 css 回调中写入声明，供 button/a 两种原生根复用；不导出为包根 API。
type Appearance = Pick<ActionProps<ButtonState>, 'color' | 'backgroundColor' | 'borderColor'> & {
  variant: ButtonVariant;
  iconOnly?: boolean;
  pressed?: boolean;
};
export function _buttonAppearance(
  s: Css<UiTheme>,
  { variant, iconOnly = false, pressed = false, color, backgroundColor, borderColor }: Appearance,
): void {
  const filled = variant === 'solid' || pressed;
  s.boxSizing('border-box');
  s.position('relative');
  s.display('inline-flex');
  s.alignItems('center');
  s.justifyContent('center');
  s.verticalAlign('middle');
  s.font('inherit');
  s.lineHeight(1.25);
  s.fontWeight('_medium');
  s.textDecoration('none');
  s.textAlign('center');
  s.whiteSpace('normal');
  s.overflowWrap('anywhere');
  s.flexShrink(0);
  s.minInlineSize(0);
  s.minBlockSize('2.625em');
  s.paddingBlock(bx(`${iconOnly ? 0 : 0.625}em`));
  s.paddingInline(bx(`${iconOnly ? 0 : 1}em`));
  if (iconOnly) {
    s.inlineSize('2.625em');
  }
  s.borderStyle('solid');
  s.borderWidth(bx(`${buttonBorderWidth}em`));
  s.borderRadius('0.5em');
  s.color(bx(color ?? (filled ? '_onPrimary' : '_primary')));
  s.backgroundColor(bx(backgroundColor ?? (filled ? '_primary' : 'transparent')));
  s.borderColor(bx(borderColor ?? (variant === 'outline' ? '_primary' : 'transparent')));
  s.cursor('pointer');
  s.select('&[hidden]', () => {
    s.display('none');
  });
  s.select('&:disabled, &[aria-disabled="true"]', () => {
    s.cursor('not-allowed');
    s.opacity('_disabled');
  });
  s.select('@media (hover: hover)', () => {
    s.select('&:not(:disabled):not([aria-disabled="true"]):hover', () => {
      s.filter('brightness(0.92)');
    });
  });
  s.select('&:not(:disabled):not([aria-disabled="true"]):active', () => {
    s.filter('brightness(0.84)');
  });
  s.select('&:focus-visible', () => {
    s.outlineStyle('solid');
    s.outlineWidth('0.125em');
    s.outlineOffset('0.125em');
    s.outlineColor('_focus');
  });
  if (pressed) {
    s.boxShadow('inset 0 0 0 0.0625em currentColor');
  }
  s.select('@media (forced-colors: active)', () => {
    s.borderColor('ButtonText');
    s.select('&:focus-visible', () => {
      s.outlineColor('Highlight');
    });
    s.select('&[aria-pressed="true"]', () => {
      s.backgroundColor('Highlight');
      s.color('HighlightText');
    });
    s.select('&:disabled, &[aria-disabled="true"]', () => {
      s.color('GrayText');
      s.opacity(1);
    });
  });
}
