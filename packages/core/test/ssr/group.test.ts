import { expect, it } from 'vitest';
import { bindProps, defineComponent, element, dynamic, renderToString } from 'zerodep-js';

it('output 的 SSR 文本没有结构标记，保持表单原生 reset 可往返', () => {
  const App = defineComponent(() => element('output', { children: ['<', dynamic(() => 2), '>'] }));
  expect(renderToString(App)).toBe('<output>&lt;2&gt;</output>');
});

it.each(['checkbox', 'radio'])('%s 分组 SSR 从模型输出 checked，保留原生表单值', (type) => {
  const model = type === 'checkbox' ? ['a'] : 'a';
  const App = defineComponent(() =>
    ['a', 'b'].map((value) =>
      element(
        'input',
        bindProps({ type, value, name: 'pick' }, [
          [
            'group',
            () => model,
            () => {
              throw Error('SSR write');
            },
          ],
        ]),
      ),
    ),
  );
  const html = renderToString(App);
  expect(html).toContain(`type="${type}"`);
  expect(html).toContain('value="a"');
  expect(html).toContain('value="b"');
  expect(html.match(/checked=""/g)).toHaveLength(1);
  expect(html).not.toContain('group=');
});
