import type { UiTheme } from '../provider/theme/theme.js';
import { _component, _derived, type JSX } from 'zerodep-js';
import { css, _mergeClasses, type CssValue } from 'zerodep-js-css';
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
      if (typeof value !== 'number') return s.gridTemplateColumns.raw(value);
      if (!Number.isSafeInteger(value) || value < 1)
        throw new Error('Grid columns 数字必须是正安全整数。');
      return s.gridTemplateColumns.repeat(value, 'minmax(0, 1fr)');
    });
    const style = css(
      s.display.raw(inline ? 'inline-grid' : 'grid'),
      tracks,
      s.gridTemplateRows.raw(rows),
      s.gridTemplateAreas.raw(areas),
      s.gridAutoRows.raw(autoRows),
      s.gridAutoColumns.raw(autoColumns),
      s.gridAutoFlow.raw(autoFlow),
      s.gap.raw(gap),
      s.rowGap.raw(rowGap),
      s.columnGap.raw(columnGap),
      s.alignItems.raw(alignItems),
      s.justifyItems.raw(justifyItems),
      s.alignContent.raw(alignContent),
      s.justifyContent.raw(justifyContent),
      s.fontSize.raw(size),
      s._selector('&[hidden]', s.display.none),
    );
    return (
      <div {...rest} class={_mergeClasses(style, className)}>
        {children}
      </div>
    );
  },
);
