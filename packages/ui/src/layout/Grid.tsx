import type { UiTheme } from '../provider/theme/theme.js';
import { _component, _derived, type JSX } from 'zerodep-js';
import { css, type CssValue, bx } from 'zerodep-js-css';
import { useCss } from '../provider/context.js';
export interface GridProps extends Omit<JSX.IntrinsicElements['div'], 'size'> {
  inline?: boolean | undefined;
  size?: CssValue<'fontSize', UiTheme>;
  /** 正整数为等宽列，字符串采用原生 CSS 轨道定义；默认 1 列。 */
  columns?: number | Exclude<CssValue<'gridTemplateColumns', UiTheme>, number>;
  rows?: CssValue<'gridTemplateRows', UiTheme>;
  areas?: CssValue<'gridTemplateAreas', UiTheme>;
  autoRows?: CssValue<'gridAutoRows', UiTheme>;
  autoColumns?: CssValue<'gridAutoColumns', UiTheme>;
  autoFlow?: CssValue<'gridAutoFlow', UiTheme>;
  gap?: CssValue<'gap', UiTheme>;
  rowGap?: CssValue<'rowGap', UiTheme>;
  columnGap?: CssValue<'columnGap', UiTheme>;
  alignItems?: CssValue<'alignItems', UiTheme>;
  justifyItems?: CssValue<'justifyItems', UiTheme>;
  alignContent?: CssValue<'alignContent', UiTheme>;
  justifyContent?: CssValue<'justifyContent', UiTheme>;
}

/** 普通二维布局，子项可使用原生 CSS 跨格、区域和自动放置。 */
export const Grid = _component(
  ({
    columns,
    rows,
    areas,
    autoRows,
    autoColumns,
    autoFlow,
    inline = false,
    size,
    gap = '0.5em',
    rowGap,
    columnGap,
    alignItems = 'stretch',
    justifyItems = 'stretch',
    alignContent,
    justifyContent,
    class: className,
    children,
    ...rest
  }: GridProps) => {
    const s = useCss();
    const tracks = _derived.by(() => {
      const value = columns ?? 1;
      if (typeof value !== 'number') return value;
      if (!Number.isSafeInteger(value) || value < 1)
        throw new Error('Grid columns 数字必须是正安全整数。');
      return `repeat(${value}, minmax(0, 1fr))`;
    });
    const style = _derived([
      css(() => {
        // 容器排版：inline 影响外部流布局，内部始终使用原生 Grid 轨道算法。
        s.display(bx(inline ? 'inline-grid' : 'grid'));

        // 显式轨道：数字 columns 已校验并转换为等宽 repeat，字符串保持原生含义。
        // 行定义与命名区域由调用方组合，不把二维布局转换成按钮组规则。
        s.gridTemplateColumns(bx(tracks)).gridTemplateRows(bx(rows)).gridTemplateAreas(bx(areas));

        // 自动放置：控制隐式轨道尺寸与填充方向，不改写子项的 DOM 次序。
        s.gridAutoRows(bx(autoRows)).gridAutoColumns(bx(autoColumns)).gridAutoFlow(bx(autoFlow));

        // 间距先统一设置，再允许行/列覆盖，保持 CSS 简写在长写之前。
        s.gap(bx(gap)).rowGap(bx(rowGap)).columnGap(bx(columnGap));

        // items 对齐单元格内的子项，content 对齐整组轨道，两组职责分开阅读。
        s.alignItems(bx(alignItems)).justifyItems(bx(justifyItems));
        s.alignContent(bx(alignContent)).justifyContent(bx(justifyContent));

        // 字号只提供继承基准，不替代轨道尺寸；hidden 仍应完全退出布局。
        s.fontSize(bx(size));
        s.select('&[hidden]', () => {
          s.display('none');
        });
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
