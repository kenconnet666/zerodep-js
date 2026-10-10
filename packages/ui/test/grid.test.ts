import { expectCssValue } from './style-assertions.js';
import { expect, it } from 'vitest';
import { defineComponent, element, renderToString } from 'zerodep-js';

import { createServerCssHost, withCssHost } from 'zerodep-js-css';
import { Provider, Grid } from '../dist/index.js';

function render(props: Record<string, unknown>) {
  const host = createServerCssHost();
  const App = defineComponent(() => element(Provider, { children: element(Grid, props) }));
  return { html: withCssHost(host, () => renderToString(App)), css: host.cssText() };
}
it('Grid SSR 复用 CSS 轨道，保留普通子项和原生属性', () => {
  const result = render({
    columns: 3,
    rows: 'auto 1fr',
    gap: '1em',
    size: '2vw',
    class: 'custom',
    children: element('div', { style: 'grid-column:span 2', children: '跨列' }),
  });
  expect(result.css).toContain('grid-template-columns:repeat(3, minmax(0, 1fr));');
  expect(result.css).toContain('grid-template-rows:auto 1fr;');
  expect(result.css).toContain('font-size:2vw;');
  expect(result.html).toContain('grid-column:span 2');
  expect(result.html).toContain('custom');
  expect(result.html).not.toContain('columns=');
  expect(result.html).not.toContain('role=');
});
it('Grid 支持原始轨道/命名区域/自动放置，不解释 CSS 字符串', () => {
  const result = render({
    columns: 'repeat(auto-fit, minmax(8em, 1fr))',
    autoRows: 'minmax(3em, auto)',
    autoFlow: 'row dense',
    areas: '"header header" "aside main"',
    justifyItems: 'start',
  });
  expect(result.css).toContain('repeat(auto-fit, minmax(8em, 1fr))');
  expect(result.css).toContain('grid-auto-flow:row dense;');
  expect(result.css).toContain('grid-template-areas:"header header" "aside main";');
});
it('Grid 拒绝非法数字列数，普通轨道不附加按钮接缝', () => {
  for (const columns of [0, -1, 1.5, NaN, Infinity])
    expect(() => render({ columns })).toThrow('正安全整数');
  const result = render({ columns: 2, gap: '1em', alignContent: 'space-between' });
  expect(result.css).toContain('gap:1em;');
  expectCssValue(result, 'align-content', 'space-between');
  expect(result.css).not.toContain('data-ui-action');
  expect(result.css).not.toContain('margin-inline-start');
});
