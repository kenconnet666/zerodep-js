import { _component, type JSX, _derived } from 'zerodep-js';
import { css, type CssValue, bx } from 'zerodep-js-css';
import { useCss } from '../provider/context.js';
import type { UiTheme } from '../provider/theme/theme.js';
/** 相连按钮的标准边框厚度，单位 em；Button/LinkButton 各自遵循同一 CSS 协议。 */
export const buttonBorderWidth = 0.0625;
export interface ButtonGroupProps extends Omit<JSX.IntrinsicElements['div'], 'size'> {
  /** 只支持一维相连，容器不换行。 */
  direction?: 'row' | 'column' | undefined;
  inline?: boolean | undefined;
  size?: CssValue<'fontSize', UiTheme>;
  /** 直接按钮沿主轴等分；纵向需要可分配的容器高度。 */
  equal?: boolean | undefined;
}
const item = '[data-ui-action]:not([hidden])';
const afterFirst = `& > ${item}:not(:nth-child(1 of ${item}))`;
const beforeLast = `& > ${item}:not(:nth-last-child(1 of ${item}))`;

/** 只组合直接按钮的外观，保留各自状态、原生 Tab 顺序与焦点。 */
export const ButtonGroup = _component(
  ({
    direction = 'row',
    inline = false,
    size,
    equal = false,
    role = 'group',
    class: className,
    children,
    ...rest
  }: ButtonGroupProps) => {
    const s = useCss();
    const style = _derived([
      css(() => {
        s.display(bx(inline ? 'inline-flex' : 'flex'));
        s.flexDirection(bx(direction));
        s.flexWrap('nowrap');
        s.gap(0);
        s.alignItems('stretch');
        s.fontSize(bx(size));
        s.isolation('isolate');
        s.select('&[hidden]', () => {
          s.display('none');
        });
        if (equal) {
          s.select(`& > ${item}`, () => {
            s.flex('1 1 0');
            s.minInlineSize(0);
            s.minBlockSize(0);
          });
        }
        if (direction === 'row') {
          s.select(afterFirst, () => {
            s.borderStartStartRadius(0);
            s.borderEndStartRadius(0);
            s.marginInlineStart(bx(`${-buttonBorderWidth}em`));
          });
        } else {
          s.select(afterFirst, () => {
            s.borderStartStartRadius(0);
            s.borderStartEndRadius(0);
            s.marginBlockStart(bx(`${-buttonBorderWidth}em`));
          });
        }
        if (direction === 'row') {
          s.select(beforeLast, () => {
            s.borderStartEndRadius(0);
            s.borderEndEndRadius(0);
          });
        } else {
          s.select(beforeLast, () => {
            s.borderEndStartRadius(0);
            s.borderEndEndRadius(0);
          });
        }
        s.select(`& > ${item}:where(:not(:disabled):not([aria-disabled="true"])):hover`, () => {
          s.zIndex(1);
        });
        s.select(`& > ${item}[aria-pressed="true"]`, () => {
          s.zIndex(2);
        });
        s.select(`& > ${item}:focus-visible`, () => {
          s.zIndex(3);
        });
      }),
      className,
    ]);
    return (
      <div {...rest} role={role} class={style}>
        {children}
      </div>
    );
  },
);
