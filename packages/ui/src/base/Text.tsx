import type { UiTheme } from '../provider/theme/theme.js';
import { _component, _derived, type JSX, type DomRef } from 'zerodep-js';
import { css, type CssValue, bx } from 'zerodep-js-css';
import { useCss } from '../provider/context.js';
export type TextTag =
  'span' | 'p' | 'strong' | 'em' | 'small' | 'code' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TextProps = Omit<JSX.IntrinsicElements['span'], 'color' | 'ref' | 'bind:this'> & {
  /** 标签只决定语义；省略的排版值继承父级。 */
  as?: TextTag | undefined;
  color?: CssValue<'color', UiTheme>;
  size?: CssValue<'fontSize', UiTheme>;
  weight?: CssValue<'fontWeight', UiTheme>;
  lineHeight?: CssValue<'lineHeight', UiTheme>;
  align?: CssValue<'textAlign', UiTheme>;
  /**
   * 正安全整数；1 为单行省略，其他值为多行截断。需要受限宽度，会建立块级文本盒。
   * 多行模式的块方向内边距放在外层容器，避免兼容截断算法额外露出一行。
   */
  lines?: number | undefined;
  ref?: DomRef<HTMLElement> | undefined;
};
export const Text = _component(
  ({
    as = 'span',
    color,
    size,
    weight,
    lineHeight,
    align,
    lines,
    class: className,
    children,
    ...rest
  }: TextProps) => {
    const s = useCss();
    const Tag = _derived(as);
    const lineLimit = _derived.by(() => {
      if (lines === undefined) return undefined;
      if (!Number.isSafeInteger(lines) || lines < 1)
        throw new Error('Text lines 必须是正安全整数。');
      return lines;
    });

    return (
      <Tag
        {...rest}
        class={[
          css(() => {
            // 标签负责语义，组件负责排版：清除标题/段落的原生外边距与字号、字重差异。
            // 未显式配置时统一继承父级，切换 as 不应意外改变字号和字重。
            s.margin(0);
            s.fontSize('inherit').fontWeight('inherit').lineHeight('inherit');

            // 显式外观放在继承声明之后；省略的值不覆盖默认继承和浏览器原生对齐行为。
            s.color(bx(color));
            s.fontSize(bx(size)).fontWeight(bx(weight)).lineHeight(bx(lineHeight));
            s.textAlign(bx(align));

            // 截断只改变视觉排版，不删除 children 或自动添加 title/Tooltip。
            // 先限制固有最小宽度，Flex/Grid 中的长文本才能随可用空间收缩。
            const limit = lineLimit;
            if (limit !== undefined) {
              s.minInlineSize(0).overflow('hidden');
              if (limit === 1) {
                s.display('block').whiteSpace('nowrap').textOverflow('ellipsis');
              } else {
                // 使用三浏览器都支持的兼容组合；不要只设置尚不普遍支持的 line-clamp。
                s.display('-webkit-box').whiteSpace('normal');
                s.WebkitBoxOrient('vertical').WebkitLineClamp(limit);
              }
            }
          }),
          className,
        ]}
      >
        {children}
      </Tag>
    );
  },
);
