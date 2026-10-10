import type { UiTheme } from '../provider/theme/theme.js';
import { _component, _derived, _effect, _state, type JSX } from 'zerodep-js';
import { css, _mergeClasses, type CssValue } from 'zerodep-js-css';
import { useCss } from '../provider/context.js';

interface GridCommon extends Omit<JSX.IntrinsicElements['div'], 'size'> {
  inline?: boolean | undefined;
  size?: CssValue<'fontSize', UiTheme>;
  rows?: CssValue<'gridTemplateRows', UiTheme>;
  autoRows?: CssValue<'gridAutoRows', UiTheme>;
  autoColumns?: CssValue<'gridAutoColumns', UiTheme>;
}
export type GridProps = GridCommon &
  (
    | {
        attached?: false | undefined;
        /** 正整数为等宽列，字符串直接采用 CSS 轨道定义。默认 1 列。 */
        columns?: number | Exclude<CssValue<'gridTemplateColumns', UiTheme>, number>;
        areas?: CssValue<'gridTemplateAreas', UiTheme>;
        autoFlow?: CssValue<'gridAutoFlow', UiTheme>;
        gap?: CssValue<'gap', UiTheme>;
        rowGap?: CssValue<'rowGap', UiTheme>;
        columnGap?: CssValue<'columnGap', UiTheme>;
        alignItems?: CssValue<'alignItems', UiTheme>;
        justifyItems?: CssValue<'justifyItems', UiTheme>;
        alignContent?: CssValue<'alignContent', UiTheme>;
        justifyContent?: CssValue<'justifyContent', UiTheme>;
      }
    | {
        /** 零间距、按行填充的单格相连控件；不支持跨格、CSS order 或自动列数。 */
        attached: true;
        columns: number;
        areas?: never;
        autoFlow?: 'row' | undefined;
        gap?: 0 | '0' | undefined;
        rowGap?: 0 | '0' | undefined;
        columnGap?: 0 | '0' | undefined;
        alignItems?: 'stretch' | undefined;
        justifyItems?: 'stretch' | undefined;
        alignContent?: 'stretch' | undefined;
        justifyContent?: 'stretch' | undefined;
      }
  );

const item = '[data-ui-action]:not([hidden])';

export const Grid = _component(
  ({
    columns,
    rows,
    areas,
    autoRows,
    autoColumns,
    autoFlow,
    inline = false,
    attached = false,
    size,
    gap,
    rowGap,
    columnGap,
    alignItems,
    justifyItems,
    alignContent,
    justifyContent,
    class: className,
    children,
    ...rest
  }: GridProps) => {
    const s = useCss();
    let container = _state<HTMLDivElement | undefined>(undefined);
    _effect(() => {
      const node = container;
      if (!node || !attached) return;
      let active = true;
      node.ownerDocument.defaultView!.queueMicrotask(() => {
        if (!active) return;
        if (
          Array.from(node.children).some(
            (child) => !child.hasAttribute('data-ui-action') && !child.hasAttribute('hidden'),
          ) ||
          Array.from(node.childNodes).some(
            (child) => child.nodeType === 3 && child.textContent?.trim(),
          )
        )
          console.warn(
            'Grid attached 只支持带 data-ui-action 标记的直接单格控件；不支持 wrapper、跨格或手工定位。',
          );
      });
      return () => {
        active = false;
      };
    });
    const layout = _derived.by(() => {
      if (typeof columns === 'number' && (!Number.isSafeInteger(columns) || columns < 1))
        throw new Error('Grid columns 数字必须是正安全整数。');
      if (
        attached &&
        (typeof columns !== 'number' ||
          areas !== undefined ||
          (autoFlow !== undefined && autoFlow !== 'row') ||
          (alignItems !== undefined && alignItems !== 'stretch') ||
          (justifyItems !== undefined && justifyItems !== 'stretch') ||
          (alignContent !== undefined && alignContent !== 'stretch') ||
          (justifyContent !== undefined && justifyContent !== 'stretch') ||
          [gap, rowGap, columnGap].some(
            (value) => value !== undefined && value !== 0 && value !== '0',
          ))
      )
        throw new Error(
          'Grid attached 需要正整数 columns、gap=0、autoFlow=row、子项/轨道两轴 stretch，且不能使用 areas。',
        );
      return {
        columns: columns ?? 1,
        gap: attached ? 0 : (gap ?? '0.5em'),
        align: attached ? 'stretch' : (alignItems ?? 'stretch'),
        justify: attached ? 'stretch' : (justifyItems ?? 'stretch'),
      };
    });
    const connection = _derived.by(() => {
      if (!attached || typeof layout.columns !== 'number') return '';
      const count = layout.columns;
      const firstColumn = `:nth-child(${count}n+1 of ${item})`;
      const rowEnd = `:is(:nth-child(${count}n of ${item}), :nth-last-child(1 of ${item}))`;
      const firstRow = `:nth-child(-n+${count} of ${item})`;
      // 最后 count 项中不再有同列下邻格；与行首/行尾相交即可得到实际凸角。
      const noBelow = `:nth-last-child(-n+${count} of ${item})`;
      return css(
        s.isolation.isolate,
        s._selector(`& > ${item}`, s.inlineSize.auto, s.minInlineSize.raw(0)),
        s._selector(`& > ${item}:not(:nth-child(1 of ${item}))`, s.borderStartStartRadius.raw(0)),
        s._selector(`& > ${item}:not(${firstRow}${rowEnd})`, s.borderStartEndRadius.raw(0)),
        s._selector(`& > ${item}:not(${firstColumn}${noBelow})`, s.borderEndStartRadius.raw(0)),
        s._selector(`& > ${item}:not(${rowEnd}${noBelow})`, s.borderEndEndRadius.raw(0)),
        s._selector(
          `& > ${item}:not(${firstColumn})`,
          s.marginInlineStart.raw('calc(-1 * var(--zj-action-border, 0.0625em))'),
        ),
        s._selector(
          `& > ${item}:not(${firstRow})`,
          s.marginBlockStart.raw('calc(-1 * var(--zj-action-border, 0.0625em))'),
        ),
        s._selector(`& > ${item}:hover`, s.zIndex.raw(1)),
        s._selector(`& > ${item}[aria-pressed="true"]`, s.zIndex.raw(2)),
        s._selector(`& > ${item}:focus-visible`, s.zIndex.raw(3)),
      );
    });
    const style = css(
      s.display.raw(inline ? 'inline-grid' : 'grid'),
      typeof layout.columns === 'number'
        ? s.gridTemplateColumns.repeat(layout.columns, 'minmax(0, 1fr)')
        : s.gridTemplateColumns.raw(layout.columns),
      s.gridTemplateRows.raw(rows),
      s.gridTemplateAreas.raw(areas),
      s.gridAutoRows.raw(autoRows),
      s.gridAutoColumns.raw(autoColumns),
      s.gridAutoFlow.raw(autoFlow),
      s.gap.raw(layout.gap),
      s.rowGap.raw(rowGap),
      s.columnGap.raw(columnGap),
      s.alignItems.raw(layout.align),
      s.justifyItems.raw(layout.justify),
      s.alignContent.raw(alignContent),
      s.justifyContent.raw(justifyContent),
      s.fontSize.raw(size),
      s._selector('&[hidden]', s.display.none),
    );
    return (
      <div
        {...rest}
        bind:this={container}
        data-ui-grid-attached={attached || undefined}
        class={_mergeClasses(style, connection, className)}
      >
        {children}
      </div>
    );
  },
);
