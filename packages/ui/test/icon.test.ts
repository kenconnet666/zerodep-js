import { describe, expect, it } from 'vitest';
import { Search, Check, type LucideIconData } from '@lucide/icons';
import { defineComponent, element } from 'zerodep-js/internal';
import { renderToString } from 'zerodep-js-ssr';
import { darkTheme, Icon, Provider, type IconProps } from '../dist/index.js';
import { createServerCssHost, withCssHost } from 'zerodep-js-css';

import { build } from 'vite';
import { resolve } from 'node:path';

function render(props: IconProps, dark = false) {
  const host = createServerCssHost();
  const App = defineComponent(() =>
    element(Provider, { theme: dark ? darkTheme : undefined, children: element(Icon, props) }),
  );
  return { html: withCssHost(host, () => renderToString(App)), css: host.cssText() };
}

describe('Icon 真实构建产物', () => {
  it('静态导入只打入选中的图标，不拉入图标全集或网络加载器', async () => {
    const built = await build({
      configFile: false,
      root: resolve('packages/ui'),
      logLevel: 'silent',
      build: {
        write: false,
        minify: false,
        lib: { entry: resolve('packages/ui/test/fixtures/icon-consumer.ts'), formats: ['es'] },
        rolldownOptions: { external: (id) => /^(zerodep-js|zerodep-js-css)(\/|$)/.test(id) },
      },
    });
    const chunks = (Array.isArray(built) ? built : [built])
      .flatMap((result) => {
        if (!('output' in result)) throw new Error('图标消费验证不应启动 watch');
        return result.output;
      })
      .filter((item) => item.type === 'chunk');
    const code = chunks.map((chunk) => chunk.code).join('\n');
    expect(code).toContain('name: "search"');
    expect(code).not.toContain('name: "check"');
    expect(code).not.toContain('lucideDynamicIconImports');
    const renderedIcons = chunks
      .flatMap((chunk) => Object.entries(chunk.modules))
      .filter(
        ([id, module]) =>
          id.replaceAll('\\', '/').includes('/dist/esm/icons/') && module.renderedLength > 0,
      )
      .map(([id]) => id.replaceAll('\\', '/').split('/').at(-1));
    expect(renderedIcons).toEqual(['search.mjs']);
  });
  it('静态图标数据生成 SVG，默认继承字号和颜色并作为装饰', () => {
    const { html } = render({ icon: Search });
    expect(html).toContain('<svg');
    expect(html).toContain('viewBox="0 0 24 24"');
    expect(html).toContain('width="1em"');
    expect(html).toContain('stroke="currentColor"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('focusable="false"');
    expect(html).toContain('<circle');
    expect(html).not.toContain('role="img"');
  });

  it('名称、原生属性和显式可访问属性覆盖默认值', () => {
    const { html } = render({ icon: Check, 'aria-label': '已完成', strokeWidth: 1, id: 'done' });
    expect(html).toContain('role="img"');
    expect(html).toContain('aria-label="已完成"');
    expect(html).not.toContain('aria-hidden=');
    expect(html).toContain('stroke-width="1"');
    expect(html).toContain('id="done"');
    expect(render({ icon: Search, 'aria-labelledby': 'label' }).html).toContain('role="img"');
    expect(render({ icon: Check, 'aria-label': '已完成', 'aria-hidden': true }).html).toContain(
      'aria-hidden="true"',
    );
  });

  it('CSS 关键字与原值共用主题工具，SSR 请求独立', () => {
    const light = render({ icon: Check, color: '_primary', size: '_lg' });
    const dark = render({ icon: Check, color: '_primary', size: '_lg' }, true);
    expect(light.css).toContain('color:#245fc5;');
    expect(dark.css).toContain(`color:${darkTheme.color._primary};`);
    expect(light.css).toContain('font-size:1.125rem;');
    const raw = render({ icon: Check, color: 'var(--brand-color)', size: '20px' });
    expect(raw.css).toContain('color:var(--brand-color);');
    expect(raw.css).toContain('font-size:20px;');
    expect(render({ icon: Check, color: '_primary' }).css).toContain('color:#245fc5;');
  });

  it('自定义数据保留非正方形 viewBox、嵌套节点和属性转义', () => {
    const icon: LucideIconData = {
      width: 32,
      height: 16,
      node: [
        ['g', { transform: 'translate(1 0)' }, [['path', { d: 'M0 0h8', 'data-note': '"<&' }]]],
      ],
    };
    const { html } = render({ icon });
    expect(html).toContain('viewBox="0 0 32 16"');
    expect(html).toContain('<g transform="translate(1 0)">');
    expect(html).toContain('data-note="&quot;&lt;&amp;"');
  });

  it('遵循 UI 的 Provider 所有权要求', () => {
    const App = defineComponent(() => element(Icon, { icon: Search }));
    expect(() => renderToString(App)).toThrow('Provider');
  });
});
