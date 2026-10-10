import { _component, _effect, _state, type JSX } from 'zerodep-js';
import { css, _mergeClasses, type CssValue } from 'zerodep-js-css';
import { useCss } from '../provider/context.js';
import type { UiTheme } from '../provider/theme/theme.js';

export interface ButtonGroupProps extends Omit<JSX.IntrinsicElements['div'], 'size'> {
  /** 只支持一维相连，容器不换行。 */
  direction?: 'row' | 'column' | undefined;
  inline?: boolean | undefined;
  size?: CssValue<'fontSize', UiTheme>;
  /** 直接按钮沿主轴等分；纵向需要可分配的容器高度。 */
  equal?: boolean | undefined;
}

const item = '[data-ui-action]:not([hidden])';
const afterFirst = `& > ${item}:not(:nth-child(1 of ${item}))`;
const beforeLast = `& > ${item}:not(:nth-last-child(1 of ${item}))`;

/** 只组合直接按钮的外观，保留各自状态、原生 Tab 顺序与焦点。 */
export const ButtonGroup = _component(
  ({
    direction = 'row',
    inline = false,
    size,
    equal = false,
    role = 'group',
    class: className,
    children,
    ...rest
  }: ButtonGroupProps) => {
    const s = useCss();
    let container = _state<HTMLDivElement | undefined>(undefined);
    _effect(() => {
      const node = container;
      if (!node) return;
      let active = true;
      node.ownerDocument.defaultView!.queueMicrotask(() => {
        if (!active) return;
        if (
          Array.from(node.childNodes).some((child) => {
            if (child.nodeType === 3) return Boolean(child.textContent?.trim());
            if (child.nodeType !== 1) return false;
            const element = child as Element;
            return !element.hasAttribute('data-ui-action') && !element.hasAttribute('hidden');
          })
        )
          console.warn('ButtonGroup 只支持带 data-ui-action 标记的直接按钮，不穿透 wrapper。');
      });
      return () => {
        active = false;
      };
    });
    const style = css(
      s.display.raw(inline ? 'inline-flex' : 'flex'),
      s.flexDirection.raw(direction),
      s.flexWrap.nowrap,
      s.gap.raw(0),
      s.alignItems.stretch,
      s.fontSize.raw(size),
      s.isolation.isolate,
      s._selector('&[hidden]', s.display.none),
      equal &&
        s._selector(
          `& > ${item}`,
          s.flex.raw('1 1 0'),
          s.minInlineSize.raw(0),
          s.minBlockSize.raw(0),
        ),
      direction === 'row'
        ? s._selector(
            afterFirst,
            s.borderStartStartRadius.raw(0),
            s.borderEndStartRadius.raw(0),
            s.marginInlineStart.raw('calc(-1 * var(--zj-action-border, 0.0625em))'),
          )
        : s._selector(
            afterFirst,
            s.borderStartStartRadius.raw(0),
            s.borderStartEndRadius.raw(0),
            s.marginBlockStart.raw('calc(-1 * var(--zj-action-border, 0.0625em))'),
          ),
      direction === 'row'
        ? s._selector(beforeLast, s.borderStartEndRadius.raw(0), s.borderEndEndRadius.raw(0))
        : s._selector(beforeLast, s.borderEndStartRadius.raw(0), s.borderEndEndRadius.raw(0)),
      // 禁用过滤不增加优先级，继续由后面的 pressed/focus-visible 覆盖 hover。
      s._selector(
        `& > ${item}:where(:not(:disabled):not([aria-disabled="true"])):hover`,
        s.zIndex.raw(1),
      ),
      s._selector(`& > ${item}[aria-pressed="true"]`, s.zIndex.raw(2)),
      s._selector(`& > ${item}:focus-visible`, s.zIndex.raw(3)),
    );
    return (
      <div {...rest} role={role} bind:this={container} class={_mergeClasses(style, className)}>
        {children}
      </div>
    );
  },
);
