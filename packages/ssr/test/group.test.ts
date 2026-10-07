import { expect, it } from 'vitest';
import { bindProps, defineComponent, element } from 'zerodep-js/internal';
import { renderToString } from '../src/render.js';

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
