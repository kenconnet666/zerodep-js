import { _component, _derived, type NativeProps, element } from 'zerodep-js';
import { css, bx } from 'zerodep-js-css';
import { ButtonContent } from './ButtonContent.js';
import { Ripple } from './Ripple.js';
import type { ActionProps, ButtonState, LabelProps } from './Button.js';
import { _resolveSlotProps } from '../utils/slot-props.js';
import { useCss } from '../provider/context.js';
export interface LinkButtonProps
  extends
    Omit<
      NativeProps<HTMLAnchorElement>,
      'size' | 'color' | 'children' | 'href' | 'aria-busy' | 'aria-disabled'
    >,
    ActionProps<ButtonState>,
    LabelProps {
  href: string;
}
// JSX 的 a 同时覆盖多个命名空间；保持明确的 HTML 事件/ref 类型。
const HtmlAnchor = _component((props: NativeProps<HTMLAnchorElement>) => element('a', props));
/** 链接保留原生导航，不可用时真实移除 href。 */
export const LinkButton = _component(
  ({
    href,
    variant = 'outline',
    size,
    density = 'normal',
    color,
    backgroundColor,
    borderColor,
    disabled = false,
    loading = false,
    ripple = true,
    startIcon,
    endIcon,
    children,
    slotSpinner,
    slotRipple,
    onClick,
    onAuxClick,
    tabIndex,
    role,
    class: className,
    ...rest
  }: LinkButtonProps) => {
    const s = useCss();
    const state = _derived(
      Object.freeze({ variant, disabled, loading, unavailable: disabled || loading }),
    );

    return (
      <HtmlAnchor
        {...rest}
        href={state.unavailable ? undefined : href}
        role={state.unavailable ? 'link' : role}
        tabIndex={state.unavailable ? -1 : tabIndex}
        aria-disabled={state.unavailable || undefined}
        aria-busy={loading || undefined}
        data-ui-action={''}
        class={[
          css(() => {
            const compact = density === 'compact';
            const filled = variant === 'solid';
            const customColors = color != null || backgroundColor != null || borderColor != null;
            // 布局：边框计入盒子尺寸；relative 为内部 Ripple 提供定位参照。
            // 图标与文字在按钮中居中，行内使用时与周围内容保持垂直对齐。
            s.boxSizing('border-box').position('relative');
            s.display('inline-flex').alignItems('center').justifyContent('center');
            s.verticalAlign('middle');

            // 文字：先重置原生控件字体，再设置组件排版；font 简写必须在细项之前。
            // 长标签允许换行和断词，避免内容撑破受限宽度。
            s.font('inherit').lineHeight(1.25);
            s.fontWeight('_medium').textDecoration('none').textAlign('center');
            s.whiteSpace('normal').overflowWrap('anywhere');

            // 尺寸：链接不被同排项目挤窄，但不能超过容器；长文字在容器内换行。
            // 高度与内边距都用 em，随实际字号缩放，不额外引入固定像素点击区。
            s.flexShrink(0)
              .minInlineSize(0)
              .maxInlineSize('100%')
              .minBlockSize(compact ? '2em' : '2.625em');
            s.paddingBlock(compact ? '0.3125em' : '0.625em').paddingInline(
              compact ? '0.625em' : '1em',
            );

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

            // 调用方配色在默认外观之后写入；null/undefined 不擦掉已有声明。
            // bx 由属性作者判断变量优化和关键字回退，不在组件中手工拼接 style。
            s.color(bx(color ?? undefined))
              .backgroundColor(bx(backgroundColor ?? undefined))
              .borderColor(bx(borderColor ?? undefined));

            // 可见性与禁用：显式 display 不能让 hidden 元素重新参与布局。
            // 链接的禁用由 aria-disabled 表达，事件拦截与 href 移除由模板负责。
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

            // 显式字号覆盖上面的字体继承；省略时继续继承，em 尺寸随计算字号变化。
            s.fontSize(bx(size));
          }),
          className,
        ]}
        onClick={(event) => {
          if (state.unavailable) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
        onAuxClick={(event) => {
          if (state.unavailable) {
            event.preventDefault();
            return;
          }
          onAuxClick?.(event);
        }}
      >
        <ButtonContent
          loading={loading}
          startIcon={startIcon}
          endIcon={endIcon}
          spinnerProps={_resolveSlotProps(slotSpinner, state)}
        >
          {children}
        </ButtonContent>
        {ripple && (
          <Ripple {..._resolveSlotProps(slotRipple, state)} disabled={state.unavailable} />
        )}
      </HtmlAnchor>
    );
  },
);
