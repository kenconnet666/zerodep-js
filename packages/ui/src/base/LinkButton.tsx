import { _component, _derived, type NativeProps, element } from 'zerodep-js';
import { css, bx } from 'zerodep-js-css';
import { ButtonContent } from './ButtonContent.js';
import { Ripple } from './Ripple.js';
import {
  _buttonAppearance,
  type ActionProps,
  type ButtonState,
  type LabelProps,
} from './button-shared.js';
import { _resolveSlotProps } from '../utils/slot-props.js';
import { useCss } from '../provider/context.js';
export interface LinkButtonProps
  extends
    Omit<
      NativeProps<HTMLAnchorElement>,
      'size' | 'color' | 'children' | 'href' | 'aria-busy' | 'aria-disabled'
    >,
    ActionProps<ButtonState>,
    LabelProps {
  href: string;
}
// JSX 的 a 同时覆盖多个命名空间；保持明确的 HTML 事件/ref 类型。
const HtmlAnchor = _component((props: NativeProps<HTMLAnchorElement>) => element('a', props));
/** 链接保留原生导航，不可用时真实移除 href。 */
export const LinkButton = _component(
  ({
    href,
    variant = 'outline',
    size,
    color,
    backgroundColor,
    borderColor,
    disabled = false,
    loading = false,
    ripple = true,
    startIcon,
    endIcon,
    children,
    slotSpinner,
    slotRipple,
    onClick,
    onAuxClick,
    tabIndex,
    role,
    class: className,
    ...rest
  }: LinkButtonProps) => {
    const s = useCss();
    const state = _derived(
      Object.freeze({ variant, disabled, loading, unavailable: disabled || loading }),
    );
    const appearance = css(() => {
      _buttonAppearance(s, { variant, color, backgroundColor, borderColor });
      s.fontSize(bx(size));
    });
    return (
      <HtmlAnchor
        {...rest}
        href={state.unavailable ? undefined : href}
        role={state.unavailable ? 'link' : role}
        tabIndex={state.unavailable ? -1 : tabIndex}
        aria-disabled={state.unavailable || undefined}
        aria-busy={loading || undefined}
        data-ui-action=""
        class={[appearance, className]}
        onClick={(event) => {
          if (state.unavailable) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
        onAuxClick={(event) => {
          if (state.unavailable) {
            event.preventDefault();
            return;
          }
          onAuxClick?.(event);
        }}
      >
        <ButtonContent
          loading={loading}
          startIcon={startIcon}
          endIcon={endIcon}
          spinnerProps={_resolveSlotProps(slotSpinner, state)}
        >
          {children}
        </ButtonContent>
        {ripple && (
          <Ripple {..._resolveSlotProps(slotRipple, state)} disabled={state.unavailable} />
        )}
      </HtmlAnchor>
    );
  },
);
