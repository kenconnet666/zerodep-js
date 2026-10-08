import { expect, it } from 'vitest';
import { Portal } from 'zerodep-js';
import { defineComponent, element } from 'zerodep-js/internal';
import { renderToString } from '../src/render.js';

it('SSR 只输出 Portal 空标记，不读取浏览器目标或执行子组件', () => {
  const App = defineComponent(() =>
    element(Portal, {
      get target() {
        throw new Error('服务端不读取 document');
      },
      get children() {
        throw new Error('服务端不执行子内容');
      },
    }),
  );
  expect(renderToString(App)).toBe('<!--zj:portal--><!--zj:/portal-->');
});
