import { _component, _derived, type NativeProps } from 'zerodep-js';
import { element } from 'zerodep-js/internal';
import { css, _mergeClasses } from 'zerodep-js-css';
import type { ButtonState } from './Button.js';
import { Ripple } from './Ripple.js';
import { ButtonContent } from '../internal/ButtonContent.js';
import { buttonStyle } from '../internal/button-style.js';
import type { ActionProps, LabelProps } from '../internal/button-props.js';
import { _resolveSlotProps } from '../utils/slot-props.js';
import { useCss } from '../provider/context.js';

export interface LinkButtonProps
  extends
    Omit<
      NativeProps<HTMLAnchorElement>,
      'size' | 'color' | 'children' | 'href' | 'aria-busy' | 'aria-disabled'
    >,
    ActionProps<ButtonState>,
    LabelProps<ButtonState> {
  href: string;
}

// JSX 的 a 同时覆盖 HTML/SVG/MathML；这里明确 HTML 契约，并原样保留活跃 props。
const HtmlAnchor = _component((props: NativeProps<HTMLAnchorElement>) => element('a', props));

/** 导航始终由原生 a 执行；不可用时真实移除 href，SSR 也不暴露可激活链接。 */
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
    slotStartIcon,
    slotEndIcon,
    slotText,
    slotSpinner,
    slotRipple,
    onClick,
    onAuxClick,
    tabIndex,
    role,
    class: className,
    children,
    ...rest
  }: LinkButtonProps) => {
    const s = useCss();
    const state = _derived(
      Object.freeze({ variant, disabled, loading, unavailable: disabled || loading }),
    );
    const appearance = _derived(buttonStyle(s, { variant, color, backgroundColor, borderColor }));
    const font = css(s.fontSize.raw(size));
    return (
      <HtmlAnchor
        {...rest}
        href={state.unavailable ? undefined : href}
        role={state.unavailable ? 'link' : role}
        tabIndex={state.unavailable ? -1 : tabIndex}
        aria-disabled={state.unavailable || undefined}
        aria-busy={loading || undefined}
        data-ui-action=""
        class={_mergeClasses(appearance, font, className)}
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
          startProps={_resolveSlotProps(slotStartIcon, state)}
          endProps={_resolveSlotProps(slotEndIcon, state)}
          textProps={_resolveSlotProps(slotText, state)}
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
