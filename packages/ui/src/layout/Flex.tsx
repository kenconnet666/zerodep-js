import type { UiTheme } from '../provider/theme/theme.js';
import { _component, _derived, _effect, _state, type JSX } from 'zerodep-js';
import { css, _mergeClasses, type CssValue } from 'zerodep-js-css';
import { useCss } from '../provider/context.js';
import { warnAttachedChildren } from '../internal/attached.js';

interface FlexCommon extends Omit<JSX.IntrinsicElements['div'], 'size'> {
  direction?: 'row' | 'column' | undefined;
  inline?: boolean | undefined;
  justifyContent?: CssValue<'justifyContent', UiTheme>;
  size?: CssValue<'fontSize', UiTheme>;
  /** 直接元素子项沿主轴等分；纵向需要可分配的容器高度。 */
  equal?: boolean | undefined;
}
export type FlexProps = FlexCommon &
  (
    | {
        attached?: false | undefined;
        wrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | undefined;
        gap?: CssValue<'gap', UiTheme>;
        rowGap?: CssValue<'rowGap', UiTheme>;
        columnGap?: CssValue<'columnGap', UiTheme>;
        alignItems?: CssValue<'alignItems', UiTheme>;
      }
    | {
        /** 相连模式只影响直接兼容控件，保留外侧圆角，接触侧无圆角且边框重叠。 */
        attached: true;
        wrap?: 'nowrap' | undefined;
        gap?: 0 | '0' | undefined;
        rowGap?: 0 | '0' | undefined;
        columnGap?: 0 | '0' | undefined;
        alignItems?: 'stretch' | undefined;
      }
  );

const item = '[data-ui-action]:not([hidden])';
const afterFirst = `& > ${item}:not(:nth-child(1 of ${item}))`;
const beforeLast = `& > ${item}:not(:nth-last-child(1 of ${item}))`;

/** 仅负责布局，保留子项 DOM、原生 Tab 顺序和各自的状态所有权。 */
export const Flex = _component(
  ({
    direction = 'row',
    inline = false,
    attached = false,
    wrap,
    gap,
    rowGap,
    columnGap,
    alignItems,
    justifyContent,
    size,
    equal = false,
    class: className,
    children,
    ...rest
  }: FlexProps) => {
    const s = useCss();
    let container = _state<HTMLDivElement | undefined>(undefined);
    _effect(() => {
      const node = container;
      if (!node || !attached) return;
      return warnAttachedChildren(
        node,
        'Flex attached 只支持带 data-ui-action 标记的直接控件；不会穿透 wrapper 或修改普通内容。',
      );
    });
    const layout = _derived.by(() => {
      // JS 消费与动态参数也遵循同一契约，不静默覆盖相互矛盾的意图。
      if (
        attached &&
        ((wrap !== undefined && wrap !== 'nowrap') ||
          (alignItems !== undefined && alignItems !== 'stretch') ||
          [gap, rowGap, columnGap].some(
            (value) => value !== undefined && value !== 0 && value !== '0',
          ))
      )
        throw new Error('Flex attached 只允许 gap=0、wrap=nowrap、alignItems=stretch。');
      return {
        gap: attached ? 0 : (gap ?? '0.5em'),
        wrap: attached ? 'nowrap' : (wrap ?? 'wrap'),
        align: attached ? 'stretch' : (alignItems ?? 'center'),
      };
    });
    const style = css(
      s.display.raw(inline ? 'inline-flex' : 'flex'),
      s.flexDirection.raw(direction),
      s.flexWrap.raw(layout.wrap),
      s.gap.raw(layout.gap),
      s.rowGap.raw(rowGap),
      s.columnGap.raw(columnGap),
      s.alignItems.raw(layout.align),
      s.justifyContent.raw(justifyContent),
      s.fontSize.raw(size),
      s._selector('&[hidden]', s.display.none),
      equal &&
        s._selector('& > *', s.flex.raw('1 1 0'), s.minInlineSize.raw(0), s.minBlockSize.raw(0)),
      attached && s.isolation.isolate,
      attached &&
        (direction === 'row'
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
            )),
      attached &&
        (direction === 'row'
          ? s._selector(beforeLast, s.borderStartEndRadius.raw(0), s.borderEndEndRadius.raw(0))
          : s._selector(beforeLast, s.borderEndStartRadius.raw(0), s.borderEndEndRadius.raw(0))),
      attached && s._selector(`& > ${item}:hover`, s.zIndex.raw(1)),
      attached && s._selector(`& > ${item}[aria-pressed="true"]`, s.zIndex.raw(2)),
      attached && s._selector(`& > ${item}:focus-visible`, s.zIndex.raw(3)),
    );
    return (
      <div
        {...rest}
        bind:this={container}
        data-ui-attached={attached || undefined}
        class={_mergeClasses(style, className)}
      >
        {children}
      </div>
    );
  },
);
