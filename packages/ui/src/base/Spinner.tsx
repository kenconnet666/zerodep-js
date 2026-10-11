import { _component } from 'zerodep-js';
import { css, keyframes } from 'zerodep-js-css';
import { LoaderCircle } from '@lucide/icons';
import { Icon, type IconProps } from './Icon.js';
import { useCss } from '../provider/context.js';
export type SpinnerProps = Omit<IconProps, 'icon'>;

/** 只提供加载图形，业务加载状态及操作说明由上层控件拥有。 */
export const Spinner = _component(({ class: className, ...rest }: SpinnerProps) => {
  const s = useCss();
  const rotation = keyframes(() => {
    s.select('to', () => {
      s.transform('rotate(360deg)');
    });
  });

  return (
    <Icon
      {...rest}
      icon={LoaderCircle}
      class={[
        css(() => {
          // 加载图形匀速循环；动画只表达进行中，不接管上层控件的 loading 状态。
          s.animationName(rotation)
            .animationDuration('800ms')
            .animationTimingFunction('linear')
            .animationIterationCount('infinite');

          // 尊重系统减少动态效果的偏好：停转但保留图形和占位，不改变内容结构。
          s.select('@media (prefers-reduced-motion: reduce)', () => {
            s.animation('none');
          });
        }),
        className,
      ]}
    />
  );
});
