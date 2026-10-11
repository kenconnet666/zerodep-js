import { _component, type JSX } from 'zerodep-js';
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

    return (
      <div
        {...rest}
        role={role}
        class={[
          css(() => {
            // 一维相连：禁止换行和间距，沿交叉轴拉伸，才能让相邻边框形成连续接缝。
            s.display(bx(inline ? 'inline-flex' : 'flex'))
              .flexDirection(bx(direction))
              .flexWrap('nowrap');
            s.gap(0).alignItems('stretch');

            // 统一字号让各按钮的 em 边框匹配；隔离堆叠上下文，状态层级不影响组外元素。
            s.fontSize(bx(size));
            s.isolation('isolate');

            // display 由组件显式设置，保留 hidden 的原生隐藏效果。
            s.select('&[hidden]', () => {
              s.display('none');
            });

            // 只等分未带 hidden 的直接按钮，其他节点不参与按钮尺寸与接缝处理。
            if (equal) {
              s.select(`& > ${item}`, () => {
                s.flex('1 1 0').minInlineSize(0).minBlockSize(0);
              });
            }

            // 接缝：按逻辑方向去掉内侧圆角，并重叠一层标准边框；自动适应 RTL/书写方向。
            // 首尾选择器排除带 hidden 的按钮，切换该属性或重排后无需手工更新类名。
            if (direction === 'row') {
              s.select(afterFirst, () => {
                s.borderStartStartRadius(0).borderEndStartRadius(0);
                s.marginInlineStart(bx(`${-buttonBorderWidth}em`));
              });
              s.select(beforeLast, () => {
                s.borderStartEndRadius(0).borderEndEndRadius(0);
              });
            } else {
              s.select(afterFirst, () => {
                s.borderStartStartRadius(0).borderStartEndRadius(0);
                s.marginBlockStart(bx(`${-buttonBorderWidth}em`));
              });
              s.select(beforeLast, () => {
                s.borderEndStartRadius(0).borderEndEndRadius(0);
              });
            }

            // 重叠边框下依次抬高 hover、持续选中、键盘焦点；禁用按钮不获得 hover 层级。
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
        ]}
      >
        {children}
      </div>
    );
  },
);
