import { _component } from 'zerodep-js';
import { css, keyframes, _mergeClasses } from 'zerodep-js-css';
import { LoaderCircle } from '@lucide/icons';
import { Icon, type IconProps } from './Icon.js';
import { useCss } from '../provider/context.js';

export type SpinnerProps = Omit<IconProps, 'icon'>;

/** 只提供加载图形，业务加载状态及操作说明由上层控件拥有。 */
export const Spinner = _component(({ class: className, ...rest }: SpinnerProps) => {
  const s = useCss();
  const rotation = keyframes('to{transform:rotate(360deg);}');
  const style = css(
    s.animation.raw(`${rotation} 800ms linear infinite`),
    s._selector('@media (prefers-reduced-motion: reduce)', s.animation.none),
  );
  return <Icon {...rest} icon={LoaderCircle} class={_mergeClasses(style, className)} />;
});
