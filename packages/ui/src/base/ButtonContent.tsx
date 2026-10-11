import { _component, type Renderable } from 'zerodep-js';
import { css, bx } from 'zerodep-js-css';
import { Spinner, type SpinnerProps } from './Spinner.js';
import { useCss } from '../provider/context.js';
type Decoration = 'aria-hidden' | 'aria-label' | 'aria-labelledby' | 'role';
export type DecorationProps = Omit<SpinnerProps, 'children' | Decoration> & {
  [K in Decoration]?: never;
};

export interface ButtonContentProps {
  loading: boolean;
  icon?: Renderable;
  startIcon?: Renderable;
  endIcon?: Renderable;
  children?: Renderable;
  spinnerProps?: DecorationProps | undefined;
}

/** 同一图标区域叠放原内容和加载器；加载切换不卸载调用方的图标/ref。 */
const ButtonIcon = _component(
  ({
    children,
    loading = false,
    spinnerProps,
  }: {
    children?: Renderable;
    loading?: boolean;
    spinnerProps?: DecorationProps | undefined;
  }) => {
    const s = useCss();

    return (
      <span
        class={css(() => {
          // 单个网格区域叠放图标与 Spinner，两者居中；内容本身仍参与区域尺寸计算。
          s.display('inline-grid').alignItems('center').justifyItems('center');

          // 图标相对按钮字号略放大，并保持独立占位，不被长标签压缩。
          s.fontSize('1.125em').flexShrink(0);
        })}
        aria-hidden="true"
        data-ui-button-icon
      >
        <span
          class={css(() => {
            // 原图标留在同一网格位置，加载时只隐藏像素，保留节点、尺寸与 ref 生命周期。
            s.gridArea('1 / 1').display('inline-flex');
            s.opacity(bx(loading ? 0 : 1));
          })}
          data-ui-button-icon-content
        >
          {children}
        </span>
        {loading && (
          <span
            class={css(() => {
              // 加载器覆盖原图标区域，不额外挤开文字；自定义 Spinner 仍可影响区域尺寸。
              s.gridArea('1 / 1').display('inline-flex');
            })}
            data-ui-button-spinner
          >
            <Spinner
              size="1em"
              {...spinnerProps}
              aria-hidden="true"
              aria-label={undefined}
              aria-labelledby={undefined}
              role={undefined}
            />
          </span>
        )}
      </span>
    );
  },
);

/** 文字始终可见；加载优先占用起始图标，其次结束图标，无图标时新增起始区域。 */
export const ButtonContent = _component(
  ({ loading, icon, startIcon, endIcon, children, spinnerProps }: ButtonContentProps) => {
    const s = useCss();

    return (
      <span
        class={css(() => {
          // 内容布局：装饰图标和文字整体居中，不为调用方的文字强加 Text 包装。
          s.display('inline-flex').alignItems('center').justifyContent('center');

          // 间距随字号缩放；限制内容区域宽度，让按钮的换行规则能够作用于长标签。
          s.gap('0.5em').minInlineSize(0).maxInlineSize('100%');
        })}
        data-ui-button-content
      >
        {icon !== undefined ? (
          <ButtonIcon loading={loading} spinnerProps={spinnerProps}>
            {icon}
          </ButtonIcon>
        ) : (
          <>
            {(startIcon !== undefined || (loading && endIcon === undefined)) && (
              <ButtonIcon loading={loading} spinnerProps={spinnerProps}>
                {startIcon}
              </ButtonIcon>
            )}
            <span data-ui-button-label>{children}</span>
            {endIcon !== undefined && (
              <ButtonIcon loading={loading && startIcon === undefined} spinnerProps={spinnerProps}>
                {endIcon}
              </ButtonIcon>
            )}
          </>
        )}
      </span>
    );
  },
);
