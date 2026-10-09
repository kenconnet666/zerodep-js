import { expect, it } from 'vitest';
import { Search } from '@lucide/icons';
import { defineComponent, element } from 'zerodep-js/internal';
import { renderToString } from 'zerodep-js-ssr';
import { createServerCssHost, withCssHost } from 'zerodep-js-css/server';
import { Provider, Button, IconButton, ToggleButton, LinkButton, Flex } from '../dist/index.js';
import { build } from 'vite';
import { resolve } from 'node:path';

it('单独消费 Button 只包含使用图标与 Spinner，不带入其他成品组件', async () => {
  const result = await build({
    configFile: false,
    root: resolve('packages/ui'),
    logLevel: 'silent',
    build: {
      write: false,
      minify: false,
      lib: { entry: resolve('packages/ui/test/fixtures/button-consumer.ts'), formats: ['es'] },
      rolldownOptions: { external: (id) => /^(zerodep-js|zerodep-js-css)(\/|$)/.test(id) },
    },
  });
  const chunks = (Array.isArray(result) ? result : [result])
    .flatMap((output) => output.output)
    .filter((output) => output.type === 'chunk');
  const code = chunks.map((chunk) => chunk.code).join('\n');
  expect(code).not.toContain('Flex attached');
  expect(code).not.toContain('onPressedChange');
  expect(code).not.toContain('onAuxClick');
  const icons = chunks
    .flatMap((chunk) => Object.entries(chunk.modules))
    .filter(
      ([id, module]) =>
        id.replaceAll('\\', '/').includes('/dist/esm/icons/') && module.renderedLength > 0,
    )
    .map(([id]) => id.replaceAll('\\', '/').split('/').at(-1)!)
    .sort((left, right) => left.localeCompare(right));
  expect(icons).toEqual(['loader-circle.mjs', 'search.mjs']);
});

function render(
  component: Exclude<Parameters<typeof element>[0], string>,
  props: Record<string, unknown>,
) {
  const host = createServerCssHost();
  const App = defineComponent(() => element(Provider, { children: element(component, props) }));
  return { html: withCssHost(host, () => renderToString(App)), css: host.cssText() };
}

it('Button 加载首屏即原生禁用，保留标签并隔离槽语义', () => {
  const { html, css } = render(Button, {
    loading: true,
    children: '保存',
    type: 'submit',
    name: 'action',
    value: 'save',
    startIcon: Search,
    slotStartIcon: { 'aria-label': '不应成为名称', 'aria-hidden': false },
    slotText: { as: 'h1', 'data-label': 'keep' },
    slotRipple: (state: { loading: boolean }) => ({ 'data-loading': state.loading }),
  });
  expect(html).toContain('type="submit"');
  expect(html).toContain('disabled');
  expect(html).toContain('aria-busy="true"');
  expect(html).toContain('保存');
  expect(html).not.toContain('<h1');
  expect(html).not.toContain('不应成为名称');
  expect(html).toContain('name="action"');
  expect(html).toContain('data-loading="true"');
  expect(css).toContain('opacity:0;');
  expect(css).toContain('0.0625em');
});
it('IconButton 保留名称、方形尺寸与根 ref 类型对应的原生节点', () => {
  const { html, css } = render(IconButton, { icon: Search, 'aria-label': '搜索', loading: true });
  expect(html).toContain('<button');
  expect(html).toContain('aria-label="搜索"');
  expect(css).toContain('inline-size:2.625em;');
  expect(css).toContain('min-block-size:2.625em;');
});
it('ToggleButton 的 pressed 与 type 由组件拥有，不创建隐式表单 input', () => {
  const { html } = render(ToggleButton, {
    pressed: true,
    onPressedChange() {},
    type: 'submit',
    children: '加粗',
  });
  expect(html).toContain('aria-pressed="true"');
  expect(html).toContain('type="button"');
  expect(html).not.toContain('<input');
});
it('LinkButton 保留原生导航属性，不可用首屏移除 href', () => {
  const normal = render(LinkButton, {
    href: '/docs',
    target: '_blank',
    rel: 'noopener',
    download: 'docs.html',
    children: '文档',
  });
  expect(normal.html).toContain('<a');
  expect(normal.html).toContain('href="/docs"');
  expect(normal.html).toContain('download="docs.html"');
  expect(normal.html).toContain('target="_blank"');
  const blocked = render(LinkButton, { href: '/secret', loading: true, children: '文档' });
  expect(blocked.html).not.toContain('href=');
  expect(blocked.html).not.toContain(' disabled');
  expect(blocked.html).toContain('aria-disabled="true"');
  expect(blocked.html).toContain('tabindex="-1"');
});
it('Flex attached 首屏拥有逻辑连接样式并拒绝冲突输入', () => {
  const { css } = render(Flex, {
    attached: true,
    direction: 'column',
    children: element(Button, { children: '操作' }),
  });
  expect(css).toContain('flex-wrap:nowrap;');
  expect(css).toContain('border-start-start-radius:0;');
  expect(css).toContain('margin-block-start:calc(');
  expect(css).toContain(':nth-child(1 of [data-ui-action]:not([hidden]))');
  expect(() => render(Flex, { attached: true, gap: '1em' })).toThrow('Flex attached');
  expect(() => render(Flex, { attached: true, wrap: 'wrap' })).toThrow('Flex attached');
});
