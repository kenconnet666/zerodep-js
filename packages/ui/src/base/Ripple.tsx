import type { UiTheme } from '../provider/theme/theme.js';
import { _component, _effect, _state, type JSX } from 'zerodep-js';
import { css, type CssValue, bx } from 'zerodep-js-css';
import { useCss } from '../provider/context.js';
import { _press } from '../utils/press.js';
export type RippleProps = Omit<JSX.IntrinsicElements['span'], 'children' | 'color'> & {
  disabled?: boolean | undefined;
  centered?: boolean | undefined;
  color?: CssValue<'color', UiTheme>;
  children?: never;
};

/** 放在 position:relative 的直接父 button/a 内，只拥有视觉层和事件资源。 */
export const Ripple = _component(
  ({ disabled = false, centered = false, color, class: className, ...rest }: RippleProps) => {
    const s = useCss();
    let layer = _state<HTMLSpanElement | undefined>(undefined);
    _effect(() => {
      const node = layer;
      if (!node || disabled) return;
      const parent = node.parentElement;
      if (!parent || !['button', 'a'].includes(parent.localName))
        throw new Error('Ripple 需要直接放在 button 或 a 内。');
      const view = node.ownerDocument.defaultView!;
      const media = view.matchMedia('(prefers-reduced-motion: reduce)');
      let remove: (() => void) | undefined;
      let release: (() => void) | undefined;
      const clear = () => {
        remove?.();
        remove = undefined;
        release = undefined;
      };
      const stop = _press(parent, {
        onStart(point) {
          clear();
          if (media.matches) return;
          const { width, height } = parent.getBoundingClientRect();
          const x = centered || point.pointerType === 'keyboard' ? width / 2 : point.x;
          const y = centered || point.pointerType === 'keyboard' ? height / 2 : point.y;
          const diameter = 2 * Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
          const wave = node.ownerDocument.createElement('span');
          wave.style.cssText = `position:absolute;pointer-events:none;border-radius:50%;background:currentColor;width:${diameter}px;height:${diameter}px;left:${x - diameter / 2}px;top:${y - diameter / 2}px;`;
          node.append(wave);
          // 时长由 CSS 主题解析，WAAPI 只接收计算后的毫秒值。
          const text = view.getComputedStyle(node).transitionDuration.split(',')[0]!;
          const duration = Number.parseFloat(text) * (text.endsWith('ms') ? 1 : 1000);
          const grow = wave.animate(
            [
              {
                transform: 'scale(0)',
              },
              {
                transform: 'scale(1)',
              },
            ],
            {
              duration,
              fill: 'forwards',
              easing: 'ease-out',
            },
          );
          let fade: Animation | undefined;
          const dispose = () => {
            grow.cancel();
            fade?.cancel();
            wave.remove();
          };
          remove = dispose;
          release = () => {
            fade = wave.animate(
              [
                {
                  opacity: 1,
                },
                {
                  opacity: 0,
                },
              ],
              {
                duration,
                fill: 'forwards',
              },
            );
            void fade.finished.then(dispose, () => {});
          };
        },
        onEnd() {
          release?.();
          release = undefined;
        },
      });
      media.addEventListener('change', clear);
      return () => {
        stop();
        media.removeEventListener('change', clear);
        clear();
      };
    });

    return (
      <span
        {...rest}
        bind:this={layer}
        aria-hidden={'true'}
        class={[
          css(() => {
            // 覆盖层铺满定位父级，并按按钮圆角裁剪波纹，不参与文字和图标布局。
            s.position('absolute').inset(0);
            s.borderRadius('inherit').overflow('hidden');

            // 装饰层不能截获输入；按压事件仍由原生 button/a 处理。
            s.pointerEvents('none');

            // 外观使用低透明度覆盖；波纹子节点读取 currentColor，未传颜色时沿父级继承。
            s.opacity(0.14);
            // transition-duration 只用于解析主题时长；真正的扩散/淡出由上面的 WAAPI 控制。
            s.transitionDuration('_normal');
            s.color(bx(color));
          }),
          className,
        ]}
      />
    );
  },
);
