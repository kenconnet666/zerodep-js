import { expect, it } from 'vitest';
import { bindProps, defineComponent, element } from 'zerodep-js/internal';
import { renderToString } from '../src/render.js';

it.each([false, true])('details SSR 为 bind:open=%s 保存独立初值，不执行写回', (initial) => {
  const App = defineComponent(() =>
    element(
      'details',
      bindProps(
        {
          children: element('summary', { children: '查看' }),
        },
        [
          [
            'open',
            () => initial,
            () => {
              throw Error('SSR write');
            },
          ],
        ],
      ),
    ),
  );
  const html = renderToString(App);
  expect(html).toContain(`data-zj-open="${initial ? '1' : '0'}"`);
  expect(html.includes(' open=""')).toBe(initial);
});

it('普通 details 不引入绑定标记，运行时拒绝展开的冲突属性', () => {
  expect(renderToString(defineComponent(() => element('details', { open: true })))).toBe(
    '<details open=""></details>',
  );
  for (const props of [{ open: false }, { 'data-zj-open': '0' }]) {
    const App = defineComponent(() =>
      element('details', bindProps(props, [['open', () => true, () => {}]])),
    );
    expect(() => renderToString(App)).toThrow('不能同时声明');
  }
});
