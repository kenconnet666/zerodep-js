import { _component, _derived, type JSX, type DomRef } from 'zerodep-js';
import { css, _mergeClasses, type CssValue } from 'zerodep-js-css';
import { useCss } from '../provider/context.js';

export type TextTag =
  'span' | 'p' | 'strong' | 'em' | 'small' | 'code' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TextProps = Omit<JSX.IntrinsicElements['span'], 'color' | 'ref' | 'bind:this'> & {
  /** 标签只决定语义；省略的排版值继承父级。 */
  as?: TextTag | undefined;
  color?: CssValue<'color'>;
  size?: CssValue<'fontSize'>;
  weight?: CssValue<'fontWeight'>;
  lineHeight?: CssValue<'lineHeight'>;
  align?: CssValue<'textAlign'>;
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
    const style = css(
      s.margin.raw(0),
      s.fontSize.inherit,
      s.fontWeight.inherit,
      s.lineHeight.inherit,
      s.color.raw(color),
      s.fontSize.raw(size),
      s.fontWeight.raw(weight),
      s.lineHeight.raw(lineHeight),
      s.textAlign.raw(align),
    );
    return (
      <Tag {...rest} class={_mergeClasses(style, className)}>
        {children}
      </Tag>
    );
  },
);
