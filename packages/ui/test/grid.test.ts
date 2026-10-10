import { expect, it } from 'vitest';
import { defineComponent, element } from 'zerodep-js/internal';
import { renderToString } from 'zerodep-js-ssr';
import { createServerCssHost, withCssHost } from 'zerodep-js-css';
import { Provider, Grid, Button } from '../dist/index.js';

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
it('相连样式 SSR 即存在，包含二维接缝并保留原始按钮节点', () => {
  const result = render({
    attached: true,
    columns: 3,
    children: element(Button, { children: '一' }),
  });
  expect(result.css).toContain('margin-inline-start:calc(');
  expect(result.css).toContain('margin-block-start:calc(');
  expect(result.css).toContain(':nth-last-child(-n+3 of [data-ui-action]:not([hidden]))');
  expect(result.html).toContain('data-ui-grid-attached="true"');
  expect(result.html).toContain('<button');
});
it('数字列数与相连模式拒绝不确定或冲突的布局', () => {
  for (const columns of [0, -1, 1.5, NaN, Infinity])
    expect(() => render({ columns })).toThrow('正安全整数');
  for (const props of [
    {},
    { columns: 'repeat(2, 1fr)' },
    { columns: 2, gap: '1em' },
    { columns: 2, autoFlow: 'dense' },
    { columns: 2, areas: '"a b"' },
    { columns: 2, alignItems: 'start' },
    { columns: 2, alignContent: 'space-between' },
  ])
    expect(() => render({ ...props, attached: true })).toThrow('Grid attached');
});
