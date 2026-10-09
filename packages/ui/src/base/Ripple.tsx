import { _component, _effect, _state, type JSX } from 'zerodep-js';
import { _mergeClasses, css, type CssValue } from 'zerodep-js-css';
import { useCss } from '../provider/context.js';
import { _press } from '../utils/press.js';

export type RippleProps = Omit<JSX.IntrinsicElements['span'], 'children' | 'color'> & {
  disabled?: boolean | undefined;
  centered?: boolean | undefined;
  color?: CssValue<'color'>;
  children?: never;
};

/** 放在 position:relative 的直接父 button 内，只拥有自己的视觉层和事件资源。 */
export const Ripple = _component(
  ({ disabled = false, centered = false, color, class: className, ...rest }: RippleProps) => {
    const s = useCss();
    let layer = _state<HTMLSpanElement | undefined>(undefined);
    _effect(() => {
      const node = layer;
      if (!node || disabled) return;
      const parent = node.parentElement;
      if (!parent || parent.localName !== 'button')
        throw new Error('Ripple 需要直接放在 button 内。');
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
          const diameter = Math.max(
            1,
            2 * Math.hypot(Math.max(x, width - x), Math.max(y, height - y)),
          );
          const wave = node.ownerDocument.createElement('span');
          wave.style.cssText = `position:absolute;pointer-events:none;border-radius:50%;background:currentColor;width:${diameter}px;height:${diameter}px;left:${x - diameter / 2}px;top:${y - diameter / 2}px;`;
          node.append(wave);
          // 时长由 CSS 主题解析，WAAPI 只接收计算后的毫秒值。
          const text = view.getComputedStyle(node).transitionDuration.split(',')[0]!;
          const duration = Number.parseFloat(text) * (text.endsWith('ms') ? 1 : 1000);
          const grow = wave.animate([{ transform: 'scale(0)' }, { transform: 'scale(1)' }], {
            duration,
            fill: 'forwards',
            easing: 'ease-out',
          });
          let fade: Animation | undefined;
          const dispose = () => {
            grow.cancel();
            fade?.cancel();
            wave.remove();
          };
          remove = dispose;
          release = () => {
            fade = wave.animate([{ opacity: 1 }, { opacity: 0 }], { duration, fill: 'forwards' });
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
    const style = css(
      s.position.absolute,
      s.inset.px(0),
      s.borderRadius.inherit,
      s.overflow.hidden,
      s.pointerEvents.none,
      s.opacity.raw(0.14),
      s.transitionDuration._normal,
      s.color.raw(color),
    );
    return (
      <span
        {...rest}
        bind:this={layer}
        aria-hidden="true"
        class={_mergeClasses(style, className)}
      />
    );
  },
);
