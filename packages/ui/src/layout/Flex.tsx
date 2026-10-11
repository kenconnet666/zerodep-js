import type { UiTheme } from '../provider/theme/theme.js';
import { _component, type JSX, _derived } from 'zerodep-js';
import { css, type CssValue, bx } from 'zerodep-js-css';
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
    const style = _derived([
      css(() => {
        s.display(bx(inline ? 'inline-flex' : 'flex'));
        s.flexDirection(bx(direction));
        s.flexWrap(bx(wrap));
        s.gap(bx(gap));
        s.rowGap(bx(rowGap));
        s.columnGap(bx(columnGap));
        s.alignItems(bx(alignItems));
        s.justifyContent(bx(justifyContent));
        s.fontSize(bx(size));
        s.select('&[hidden]', () => {
          s.display('none');
        });
        if (equal) {
          s.select('& > *', () => {
            s.flex('1 1 0');
            s.minInlineSize(0);
            s.minBlockSize(0);
          });
        }
      }),
      className,
    ]);
    return (
      <div {...rest} class={style}>
        {children}
      </div>
    );
  },
);
