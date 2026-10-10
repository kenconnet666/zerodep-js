import type { UiTheme } from '../provider/theme/theme.js';
import { _component, type JSX } from 'zerodep-js';
import { css, _mergeClasses, type CssValue } from 'zerodep-js-css';
import { useCss } from '../provider/context.js';

export interface FlexProps extends Omit<JSX.IntrinsicElements['div'], 'size'> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | undefined;
  inline?: boolean | undefined;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | undefined;
  gap?: CssValue<'gap', UiTheme>;
  rowGap?: CssValue<'rowGap', UiTheme>;
  columnGap?: CssValue<'columnGap', UiTheme>;
  alignItems?: CssValue<'alignItems', UiTheme>;
  justifyContent?: CssValue<'justifyContent', UiTheme>;
  size?: CssValue<'fontSize', UiTheme>;
  /** 直接元素子项沿主轴等分；纵向需要可分配的容器高度。 */
  equal?: boolean | undefined;
}

/** 普通一维布局，不管理子项外观或交互。 */
export const Flex = _component(
  ({
    direction = 'row',
    inline = false,
    wrap = 'wrap',
    gap = '0.5em',
    rowGap,
    columnGap,
    alignItems = 'center',
    justifyContent,
    size,
    equal = false,
    class: className,
    children,
    ...rest
  }: FlexProps) => {
    const s = useCss();
    const style = css(
      s.display.raw(inline ? 'inline-flex' : 'flex'),
      s.flexDirection.raw(direction),
      s.flexWrap.raw(wrap),
      s.gap.raw(gap),
      s.rowGap.raw(rowGap),
      s.columnGap.raw(columnGap),
      s.alignItems.raw(alignItems),
      s.justifyContent.raw(justifyContent),
      s.fontSize.raw(size),
      s._selector('&[hidden]', s.display.none),
      equal &&
        s._selector('& > *', s.flex.raw('1 1 0'), s.minInlineSize.raw(0), s.minBlockSize.raw(0)),
    );
    return (
      <div {...rest} class={_mergeClasses(style, className)}>
        {children}
      </div>
    );
  },
);
