import { _component, _derived } from 'zerodep-js';
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
  const style = _derived([
    css(() => {
      s.animationName(rotation)
        .animationDuration('800ms')
        .animationTimingFunction('linear')
        .animationIterationCount('infinite');
      s.select('@media (prefers-reduced-motion: reduce)', () => {
        s.animation('none');
      });
    }),
    className,
  ]);
  return <Icon {...rest} icon={LoaderCircle} class={style} />;
});
