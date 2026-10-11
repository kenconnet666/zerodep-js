import { _component, _derived, type NativeProps, element } from 'zerodep-js';
import { css, bx } from 'zerodep-js-css';
import { ButtonContent } from './ButtonContent.js';
import { Ripple } from './Ripple.js';
import type { ActionProps, ButtonState, LabelProps } from './Button.js';
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

    return (
      <HtmlAnchor
        {...rest}
        href={state.unavailable ? undefined : href}
        role={state.unavailable ? 'link' : role}
        tabIndex={state.unavailable ? -1 : tabIndex}
        aria-disabled={state.unavailable || undefined}
        aria-busy={loading || undefined}
        data-ui-action=""
        class={[
          css(() => {
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
            s.paddingBlock('0.625em');
            s.paddingInline('1em');
            s.borderStyle('solid');
            // 与 ButtonGroup 的 0.0625em 接缝协议一致。
            s.borderWidth('0.0625em');
            s.borderRadius('0.5em');
            s.color('_primary').backgroundColor('transparent').borderColor('transparent');
            switch (variant) {
              case 'solid':
                s.color('_onPrimary').backgroundColor('_primary');
                break;
              case 'outline':
                s.borderColor('_primary');
                break;
              case 'text':
                break;
            }
            // 显式配色最后覆盖；空值不擦掉变体和状态默认值。
            s.color(bx(color ?? undefined));
            s.backgroundColor(bx(backgroundColor ?? undefined));
            s.borderColor(bx(borderColor ?? undefined));
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
            s.fontSize(bx(size));
          }),
          className,
        ]}
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
