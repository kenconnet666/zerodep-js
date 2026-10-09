import { expect, it } from 'vitest';
import { defineComponent, element } from 'zerodep-js/internal';
import { renderToString } from 'zerodep-js-ssr';
import { createServerCssHost, withCssHost } from 'zerodep-js-css/server';
import { Provider, Text, Spinner, ButtonBase, Ripple } from '../dist/index.js';

function render(
  component: Exclude<Parameters<typeof element>[0], string>,
  props: Record<string, unknown>,
) {
  const host = createServerCssHost();
  const App = defineComponent(() => element(Provider, { children: element(component, props) }));
  return { html: withCssHost(host, () => renderToString(App)), css: host.cssText() };
}
it('Text 保留语义标签、主题输入、内容转义与外部类名', () => {
  const result = render(Text, {
    as: 'h2',
    size: '_xl',
    weight: '_semibold',
    color: '_primary',
    class: 'heading',
    children: '<标题>',
  });
  expect(result.html).toContain('<h2');
  expect(result.html).toContain('heading');
  expect(result.html).toContain('&lt;标题&gt;');
  expect(result.css).toContain('font-size:1.5rem;');
  expect(result.css).toContain('font-weight:600;');
  expect(result.css).not.toContain('undefined');
});
it('Spinner 使用实际 Lucide 节点，默认装饰并包含减少动态效果规则', () => {
  const result = render(Spinner, { size: '20px' });
  expect(result.html).toContain('<svg');
  expect(result.html).toContain('aria-hidden="true"');
  expect(result.css).toContain('prefers-reduced-motion');
  expect(result.css).toContain('animation:none;');
});
it('ButtonBase 保留原生按钮语义、独立焦点样式及可关闭 Ripple', () => {
  const result = render(ButtonBase, { children: '确定', ripple: false, disabled: true });
  expect(result.html).toContain('type="button"');
  expect(result.html).toContain('disabled');
  expect(result.html).not.toContain('aria-hidden');
  expect(result.css).toContain(':focus-visible');
  expect(render(ButtonBase, { type: 'submit', children: '提交' }).html).toContain('type="submit"');
  const forwarded = render(ButtonBase, { slotRipple: { color: '#123456', 'data-slot': 'ripple' } });
  expect(forwarded.html).toContain('data-slot="ripple"');
  expect(forwarded.html).not.toContain('slotRipple=');
  expect(forwarded.css).toContain('color:#123456;');
});
it('Ripple SSR 只输出视觉层，不读取 document 或安装监听', () => {
  const result = render(Ripple, { color: '_primary' });
  expect(result.html).toContain('aria-hidden="true"');
  expect(result.css).toContain('pointer-events:none;');
});
