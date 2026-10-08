import { _component } from 'zerodep-js';
import { css } from 'zerodep-js/css';
import { useCss } from './css-theme.js';

export default _component(({ location }: { location: string }) => {
  const author = useCss();
  return (
    <div data-css-theme={location} class={css(author.color._primary)}>
      按需主题作用域
    </div>
  );
});
