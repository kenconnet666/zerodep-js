import { expectCssValue } from './style-assertions.js';
import { expect, it } from 'vitest';
import { defineComponent, element, renderToString } from 'zerodep-js';

import { createServerCssHost, withCssHost } from 'zerodep-js-css';
import { Provider, Flex } from '../dist/index.js';

it('Flex SSR 保留原生子项、字号继承与显式布局，不创建隐式分组语义', () => {
  const host = createServerCssHost();
  const App = defineComponent(() =>
    element(Provider, {
      children: element(Flex, {
        direction: 'column',
        gap: '1em',
        size: '2vw',
        equal: true,
        class: 'custom',
        children: [
          element('button', { children: '一' }),
          element('a', { href: '/two', children: '二' }),
        ],
      }),
    }),
  );
  const html = withCssHost(host, () => renderToString(App));
  expect(html).toContain('custom');
  expect(html).toContain('<button>一</button>');
  expect(html).toContain('<a href="/two">二</a>');
  expect(html).not.toContain('role=');
  expect(html).not.toContain('equal=');
  expectCssValue({ html, css: host.cssText() }, 'flex-direction', 'column');
  expect(host.cssText()).toContain('font-size:2vw;');
  expect(host.cssText()).toContain('flex:1 1 0;');
  expect(host.cssText()).not.toContain('data-ui-action');
  expect(host.cssText()).not.toContain('margin-inline-start');
});
