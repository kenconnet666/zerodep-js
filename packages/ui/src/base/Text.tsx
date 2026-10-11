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
    class: className,
    children,
    ...rest
  }: TextProps) => {
    const s = useCss();
    const Tag = _derived(as);

    return (
      <Tag
        {...rest}
        class={[
          css(() => {
            s.margin(0);
            s.fontSize('inherit');
            s.fontWeight('inherit');
            s.lineHeight('inherit');
            s.color(bx(color));
            s.fontSize(bx(size));
            s.fontWeight(bx(weight));
            s.lineHeight(bx(lineHeight));
            s.textAlign(bx(align));
          }),
          className,
        ]}
      >
        {children}
      </Tag>
    );
  },
);
