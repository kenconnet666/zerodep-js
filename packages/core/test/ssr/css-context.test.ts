import { expect, it } from 'vitest';
import { Css } from 'zerodep-js-css';
import { createCssContext } from 'zerodep-js-css';
import { defineComponent, element, renderToString } from 'zerodep-js';

it('模块级 CSS context 只共享键，作者数据按 SSR 请求隔离', () => {
  class NamedCss extends Css {
    readonly name: string;
    constructor(name: string) {
      super();
      this.name = name;
    }
  }
  const { provideCss, useCss } = createCssContext<NamedCss>();
  const Child = defineComponent(() => useCss().name);
  const App = defineComponent(({ name }: { name: string }) => {
    provideCss(new NamedCss(name));
    return element(Child, {});
  });
  expect(renderToString(App, { props: { name: 'first' } })).toBe('first');
  expect(renderToString(App, { props: { name: 'second' } })).toBe('second');
  expect(() => renderToString(Child)).toThrow('没有 CSS 作者');
});
