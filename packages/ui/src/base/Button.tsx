import { _component, _derived, type JSX, type Renderable } from 'zerodep-js';
import { css, bx, type CssValue } from 'zerodep-js-css';
import type { UiTheme } from '../provider/theme/theme.js';
import { Ripple, type RippleProps } from './Ripple.js';
import type { SlotProps } from '../utils/slot-props.js';
import { ButtonContent, type DecorationProps } from './ButtonContent.js';
import { _resolveSlotProps } from '../utils/slot-props.js';
import { useCss } from '../provider/context.js';

export type ButtonVariant = 'solid' | 'outline' | 'text' | 'soft';
export interface ButtonState {
  readonly variant: ButtonVariant;
  /** 调用方显式禁用，不包含 loading。 */
  readonly disabled: boolean;
  readonly loading: boolean;
  /** disabled || loading，用于判断当前能否激活。 */
  readonly unavailable: boolean;
}

type Decoration = 'aria-hidden' | 'aria-label' | 'aria-labelledby' | 'role';
export type AccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: string | undefined }
  | { 'aria-labelledby': string; 'aria-label'?: string | undefined };

export interface ActionProps<S> {
  /** 外观变体，不改变原生元素语义或字号。 */
  variant?: ButtonVariant | undefined;
  /** CSS 字号，省略时继承；内部几何尺寸按 em 缩放。 */
  size?: CssValue<'fontSize', UiTheme>;
  /** 只改变高度与内边距，compact 不缩小字号；图标模式同步缩小方形区域。 */
  density?: 'normal' | 'compact' | undefined;
  /** 前景色；与 backgroundColor 分开，不自动推算对比文字色。 */
  color?: CssValue<'color', UiTheme>;
  backgroundColor?: CssValue<'backgroundColor', UiTheme>;
  borderColor?: CssValue<'borderColor', UiTheme>;
  disabled?: boolean | undefined;
  /** 外部拥有加载状态；加载时禁用激活并保持内容占位。 */
  loading?: boolean | undefined;
  /** 仅关闭按压视觉；关闭后仍有 focus-visible 轮廓。 */
  ripple?: boolean | undefined;
  slotSpinner?: SlotProps<DecorationProps, S> | undefined;
  slotRipple?:
    | SlotProps<
        Omit<RippleProps, 'disabled' | 'children' | Decoration> & { [K in Decoration]?: never },
        S
      >
    | undefined;
}
/** 图标是调用方创建的装饰内容，按钮只负责区域布局，不依赖图标库。 */
export interface LabelProps {
  children?: Renderable;
  startIcon?: Renderable;
  endIcon?: Renderable;
}
/** 显式 icon 模式保留名称约束，不通过扫描 children 猜测纯图标按钮。 */
export type ButtonContentInput =
  | (LabelProps & { icon?: never })
  | (AccessibleName & { icon: Renderable; children?: never; startIcon?: never; endIcon?: never });

export type ButtonProps = Omit<
  JSX.IntrinsicElements['button'],
  'size' | 'color' | 'children' | 'aria-busy'
> &
  ActionProps<ButtonState> &
  ButtonContentInput;

export const Button = _component(
  ({
    type = 'button',
    variant = 'solid',
    size,
    density = 'normal',
    color,
    backgroundColor,
    borderColor,
    disabled = false,
    loading = false,
    ripple = true,
    icon,
    startIcon,
    endIcon,
    children,
    slotSpinner,
    slotRipple,
    onClick,
    'aria-pressed': ariaPressed,
    class: className,
    ...rest
  }: ButtonProps) => {
    const s = useCss();
    const state = _derived(
      Object.freeze({ variant, disabled, loading, unavailable: disabled || loading }),
    );

    return (
      <button
        {...rest}
        type={type}
        disabled={state.unavailable}
        onClick={(event) => {
          if (!state.unavailable && !event.currentTarget.matches(':disabled')) onClick?.(event);
        }}
        aria-busy={loading || undefined}
        aria-pressed={ariaPressed}
        data-ui-action={''}
        class={[
          css(() => {
            const iconOnly = icon !== undefined;
            const compact = density === 'compact';
            const pressed = ariaPressed === true || ariaPressed === 'true';
            const filled = variant === 'solid' || pressed;
            const customColors = color != null || backgroundColor != null || borderColor != null;
            // 布局：边框计入盒子尺寸；relative 为内部 Ripple 提供定位参照。
            // 图标与文字在按钮中居中，行内使用时与周围内容保持垂直对齐。
            s.boxSizing('border-box').position('relative');
            s.display('inline-flex').alignItems('center').justifyContent('center');
            s.verticalAlign('middle');

            // 文字：先重置原生控件字体，再设置组件排版；font 简写必须在细项之前。
            // 长标签允许换行和断词，避免内容撑破受限宽度。
            s.font('inherit').fontSize(bx(size)).lineHeight(1.25);
            s.fontWeight('_medium').textDecoration('none').textAlign('center');
            s.whiteSpace('normal').overflowWrap('anywhere');

            // 尺寸：按钮不被父级 Flex 压缩；最小宽度不受标签的固有宽度限制。
            // 高度与内边距都用 em，随实际字号缩放，不额外引入固定像素点击区。
            s.flexShrink(0)
              .minInlineSize(0)
              .minBlockSize(compact ? '2em' : '2.625em');
            // 先清空原生 padding，再按内容模式设置逻辑方向；纯图标不留文字内边距。
            s.padding(0)
              .paddingBlock(bx(`${iconOnly ? 0 : compact ? 0.3125 : 0.625}em`))
              .paddingInline(bx(`${iconOnly ? 0 : compact ? 0.625 : 1}em`));
            if (iconOnly) {
              s.inlineSize(compact ? '2em' : '2.625em');
            }

            // 边框：各变体预留相同边框空间，切换配色时不改变几何尺寸。
            // 0.0625em 与 ButtonGroup 的负边距接缝一致，调整时必须同步。
            s.borderStyle('solid').borderWidth('0.0625em').borderRadius('0.5em');

            // 配色：先建立透明底色和边框，再由 variant 设置默认外观。
            // text 沿用透明声明，outline 补边框，soft 使用柔和底色；solid 使用实心配色。
            s.color('_primary').backgroundColor('transparent').borderColor('transparent');
            switch (variant) {
              case 'solid':
                s.color('_onPrimary').backgroundColor('_primary');
                break;
              case 'outline':
                s.borderColor('_primary');
                break;
              case 'soft':
                s.backgroundColor('_primarySurface');
                break;
              case 'text':
                break;
            }
            // 持续选中状态覆盖变体默认色，调用方仍可在下一组显式改色。
            if (pressed) s.color('_onPrimary').backgroundColor('_primary');

            // 调用方配色在默认外观之后写入；null/undefined 不擦掉已有声明。
            // bx 由属性作者判断变量优化和关键字回退，不在组件中手工拼接 style。
            s.color(bx(color ?? undefined))
              .backgroundColor(bx(backgroundColor ?? undefined))
              .borderColor(bx(borderColor ?? undefined));

            // 可见性与禁用：显式 display 不能让 hidden 元素重新参与布局。
            // 禁用选择器同时覆盖 button 自身与 fieldset 继承的原生禁用状态。
            s.cursor('pointer');
            s.select('&[hidden]', () => {
              s.display('none');
            });
            s.select('&:disabled, &[aria-disabled="true"]', () => {
              s.cursor('not-allowed');
              if (customColors) {
                // 自定义色不被主题重写，保留用透明度表达禁用的既有行为。
                s.opacity('_disabled');
              } else {
                // 默认禁用用主题前景/表面表达，不再对整组文字和图标二次变淡。
                s.color('_disabled')
                  .backgroundColor(
                    filled || variant === 'soft' ? '_disabledSurface' : 'transparent',
                  )
                  .borderColor(variant === 'outline' ? '_border' : 'transparent');
              }
            });

            // 悬停/按下只改未显式配置的颜色，不对整个按钮加滤镜，避免连图标一起变暗。
            // 两种状态共用同一组规则；外部 CSS 仍可在对应选择器中覆盖默认状态。
            const feedback = (active: boolean) => {
              if (color == null && !filled) s.color(active ? '_primaryPressed' : '_primaryHover');
              if (backgroundColor == null) {
                switch (filled ? 'solid' : variant) {
                  case 'solid':
                    s.backgroundColor(active ? '_primaryPressed' : '_primaryHover');
                    break;
                  case 'soft':
                    s.backgroundColor(active ? '_primarySurfacePressed' : '_primarySurfaceHover');
                    break;
                  case 'outline':
                  case 'text':
                    s.backgroundColor(active ? '_primarySurfaceHover' : '_primarySurface');
                    break;
                }
              }
              if (borderColor == null && variant === 'outline')
                s.borderColor(active ? '_primaryPressed' : '_primaryHover');
            };

            // 指针反馈只应用于可激活项；hover 限定到支持悬停的设备，避免触屏粘住状态。
            s.select('@media (hover: hover)', () => {
              s.select('&:not(:disabled):not([aria-disabled="true"]):hover', () => {
                feedback(false);
              });
            });
            s.select('&:not(:disabled):not([aria-disabled="true"]):active', () => {
              feedback(true);
            });

            // 键盘焦点使用外置轮廓，不占布局空间，也不依赖 Ripple 是否开启。
            s.select('&:focus-visible', () => {
              s.outlineStyle('solid').outlineWidth('0.125em');
              s.outlineOffset('0.125em').outlineColor('_focus');
            });
            // 用内阴影补充持续选中的边界，区别于短暂的 :active 明暗反馈。
            if (pressed) {
              s.boxShadow('inset 0 0 0 0.0625em currentColor');
            }

            // 系统强制颜色模式最后覆盖主题颜色，用系统色区分边界、焦点与选中状态。
            // 禁用项恢复不透明度，让 GrayText 本身表达禁用，避免二次变淡。
            s.select('@media (forced-colors: active)', () => {
              s.borderColor('ButtonText');
              s.select('&:focus-visible', () => {
                s.outlineColor('Highlight');
              });
              s.select('&[aria-pressed="true"]', () => {
                s.backgroundColor('Highlight').color('HighlightText');
              });
              s.select('&:disabled, &[aria-disabled="true"]', () => {
                s.color('GrayText').opacity(1);
              });
            });
          }),
          className,
        ]}
      >
        <ButtonContent
          loading={loading}
          icon={icon}
          startIcon={startIcon}
          endIcon={endIcon}
          spinnerProps={_resolveSlotProps(slotSpinner, state)}
        >
          {children}
        </ButtonContent>
        {ripple && (
          <Ripple {..._resolveSlotProps(slotRipple, state)} disabled={state.unavailable} />
        )}
      </button>
    );
  },
);
