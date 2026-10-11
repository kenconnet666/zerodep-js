import { expectCssValue } from './style-assertions.js';
import { expect, it } from 'vitest';
import { defineComponent, element, renderToString } from 'zerodep-js';
import { css, createServerCssHost, withCssHost, Css } from 'zerodep-js-css';
import { Provider, Text, Spinner, ButtonBase, Ripple } from '../dist/index.js';
const _cssAuthor = new Css();
function render(
  component: Exclude<Parameters<typeof element>[0], string>,
  props: Record<string, unknown> | (() => Record<string, unknown>),
) {
  const host = createServerCssHost();
  const App = defineComponent(() =>
    element(Provider, {
      children: element(component, typeof props === 'function' ? props() : props),
    }),
  );
  return {
    html: withCssHost(host, () => renderToString(App)),
    css: host.cssText(),
  };
}
it('Text 保留语义标签、主题输入、内容转义与传入声明，定位使用 data 属性', () => {
  const result = render(Text, () => ({
    as: 'h2',
    size: '_xl',
    weight: '_semibold',
    color: '_primary',
    class: css(() => {
      _cssAuthor.fontStyle('italic');
    }),
    'data-part': 'heading',
    children: '<标题>',
  }));
  expect(result.html).toContain('<h2');
  expect(result.html).toContain('data-part="heading"');
  expect(result.css).toContain('font-style:italic;');
  expect(result.html.match(/<h2[^>]*class="([^"]+)"/)?.[1]).toMatch(/^z-[a-z0-9]{14}$/);
  expect(result.html).toContain('&lt;标题&gt;');
  expectCssValue(result, 'font-size', '1.5rem');
  expectCssValue(result, 'font-weight', '600');
  expect(result.css).not.toContain('undefined');
});
it('Spinner 使用实际 Lucide 节点，默认装饰并包含减少动态效果规则', () => {
  const result = render(Spinner, {
    size: '20px',
  });
  expect(result.html).toContain('<svg');
  expect(result.html).toContain('aria-hidden="true"');
  expect(result.css).toContain('prefers-reduced-motion');
  expect(result.css).toContain('animation:none;');
});
it('ButtonBase 保留原生按钮语义、独立焦点样式及可关闭 Ripple', () => {
  const result = render(ButtonBase, {
    children: '确定',
    ripple: false,
    disabled: true,
  });
  expect(result.html).toContain('type="button"');
  expect(result.html).toContain('disabled');
  expect(result.html).not.toContain('aria-hidden');
  expect(result.css).toContain(':focus-visible');
  expect(result.css).toContain('outline-width:0.125em;');
  expect(result.css).toContain('outline-offset:0.125em;');
  expect(result.css).toContain('&:disabled{cursor:not-allowed;opacity:');
  expect(
    render(ButtonBase, {
      type: 'submit',
      children: '提交',
    }).html,
  ).toContain('type="submit"');
  const forwarded = render(ButtonBase, {
    slotRipple: {
      color: '#123456',
      'data-slot': 'ripple',
    },
  });
  expect(forwarded.html).toContain('data-slot="ripple"');
  expect(forwarded.html).not.toContain('slotRipple=');
  expectCssValue(forwarded, 'color', '#123456');
  const sized = render(ButtonBase, {
    size: '_lg',
    children: '搜索',
  });
  expectCssValue(sized, 'font-size', '1.125rem');
  expect(sized.html).not.toContain(' size=');
  const inherited = render(ButtonBase, {
    size: undefined,
  });
  expect(inherited.css).not.toContain('font-size:undefined');
});
it('Ripple SSR 只输出视觉层，不读取 document 或安装监听', () => {
  const result = render(Ripple, {
    color: '_primary',
  });
  expect(result.html).toContain('aria-hidden="true"');
  expectCssValue(result, 'pointer-events', 'none');
});
