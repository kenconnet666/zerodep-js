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
        // 布局：inline 只决定容器在父级中的排版，direction/wrap 决定内部主轴和换行。
        s.display(bx(inline ? 'inline-flex' : 'flex'))
          .flexDirection(bx(direction))
          .flexWrap(bx(wrap));

        // 间距：先给统一 gap，再允许行/列单独覆盖；undefined 保留前面的默认值。
        s.gap(bx(gap)).rowGap(bx(rowGap)).columnGap(bx(columnGap));

        // 对齐分别作用于交叉轴和主轴；轴向随 direction 变化，不固定等同于水平/垂直。
        s.alignItems(bx(alignItems)).justifyContent(bx(justifyContent));

        // 字号作为子孙 em 尺寸的基准；未传入时继承父级。
        s.fontSize(bx(size));

        // 作者设置了 display，仍需显式让原生 hidden 属性退出布局。
        s.select('&[hidden]', () => {
          s.display('none');
        });

        // 等分仅作用于直接元素子项；清除固有最小尺寸，避免长内容阻止分配。
        // 纵向等分仍要求外部提供可分配的容器高度，不在这里猜测高度。
        if (equal) {
          s.select('& > *', () => {
            s.flex('1 1 0').minInlineSize(0).minBlockSize(0);
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
