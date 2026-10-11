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
          s.display('inline-grid').alignItems('center').justifyItems('center');
          s.fontSize('1.125em').flexShrink(0);
        })}
        aria-hidden="true"
        data-ui-button-icon
      >
        <span
          class={css(() => {
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
          s.display('inline-flex').alignItems('center').justifyContent('center');
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
