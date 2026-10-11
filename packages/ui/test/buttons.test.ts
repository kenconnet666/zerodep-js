import { expect, it } from 'vitest';
import { expectCssValue } from './style-assertions.js';
import { Search } from '@lucide/icons';
import { defineComponent, element, renderToString } from 'zerodep-js';

import { css as collectCss, bx, createServerCssHost, withCssHost } from 'zerodep-js-css';
import * as ui from '../dist/index.js';
import {
  Provider,
  lightTheme,
  Button,
  Icon,
  ToggleButton,
  LinkButton,
  ButtonGroup,
  useCss,
} from '../dist/index.js';
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
    .flatMap((output) => {
      if (!('output' in output)) throw new Error('按钮消费验证不应启动 watch');
      return output.output;
    })
    .filter((output) => output.type === 'chunk');
  const code = chunks.map((chunk) => chunk.code).join('\n');
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

it('包根删除重复按钮入口，保留正式按钮的自定义样式能力', () => {
  expect(ui).not.toHaveProperty('_buttonStyle');
  expect(ui).not.toHaveProperty('_buttonAppearance');
  expect(ui).not.toHaveProperty('ButtonBase');
  expect(ui).not.toHaveProperty('IconButton');
  expect(ui).not.toHaveProperty('ButtonView');
  expect(ui).not.toHaveProperty('LinkButtonRoot');
  const Custom = defineComponent(() => {
    const s = useCss();
    const appearance = collectCss(() => s.color(bx('#123456')));
    return element(Button, {
      class: appearance,
      disabled: true,
      loading: true,
      children: '自定义按钮',
    });
  });
  const { html, css } = render(Custom, {});
  expect(html).toContain('自定义按钮');
  expect(html).toContain('disabled');
  expect(html).toMatch(/--zj-[a-z0-9-]+:#123456;/);
  expect(html).toContain('data-ui-button-content');
  expect(css).toMatch(/color:var\(--zj-[a-z0-9-]+\)/);
});

it.each([
  ['文字', Button, { children: '测试', ripple: false }],
  [
    '图标',
    Button,
    { variant: 'text', icon: element(Icon, { icon: Search }), 'aria-label': '测试', ripple: false },
  ],
  ['切换', ToggleButton, { children: '测试', pressed: false, onPressedChange() {}, ripple: false }],
  ['链接', LinkButton, { children: '测试', href: '/docs', ripple: false }],
] as const)(
  '%s按钮连续颜色不增加规则，特殊 CSS 与外部 style 保持原意',
  (_name, component, fixed) => {
    const host = createServerCssHost();
    const App = defineComponent((props: Record<string, unknown>) =>
      element(Provider, {
        children: element(component, { ...fixed, ...props }),
      }),
    );
    withCssHost(host, () => {
      renderToString(App, {
        props: { color: '#000000', backgroundColor: '#ffffff', borderColor: '#000000' },
      });
      const count = host.rules().length;
      for (let i = 1; i <= 50; i++) {
        const color = '#' + i.toString(16).padStart(6, '0');
        const html = renderToString(App, {
          props: { color, backgroundColor: color, borderColor: color },
        });
        expect(html.match(new RegExp(`--zj-[a-z0-9-]+:${color};`, 'g'))).toHaveLength(3);
      }
      expect(host.rules()).toHaveLength(count);
      for (const color of ['inherit', 'revert', 'red!important', 'var(--custom-color)']) {
        const html = renderToString(App, {
          props: { color, style: { color: 'blue', '--user': 'kept' } },
        });
        expect(html).not.toMatch(
          new RegExp(`--zj-[a-z0-9-]+:${color.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')};`),
        );
        expect(html).toContain('color:blue;--user:kept');
        expect(host.cssText()).toContain(`color:${color};`);
      }
    });
  },
);

it.each(['solid', 'outline', 'text', 'soft'] as const)(
  '%s 变体默认值、选中状态和显式配色按层覆盖',
  (variant) => {
    for (const pressed of [false, true]) {
      const result = render(Button, {
        variant,
        'aria-pressed': pressed,
        children: '操作',
        ripple: false,
      });
      const filled = variant === 'solid' || pressed;
      expectCssValue(
        result,
        'color',
        filled ? lightTheme.color._onPrimary : lightTheme.color._primary,
      );
      expectCssValue(
        result,
        'background-color',
        filled
          ? lightTheme.backgroundColor._primary
          : variant === 'soft'
            ? lightTheme.backgroundColor._primarySurface
            : 'transparent',
      );
      expectCssValue(
        result,
        'border-color',
        variant === 'outline' ? lightTheme.borderColor._primary : 'transparent',
      );
      const custom = render(Button, {
        variant,
        'aria-pressed': pressed,
        color: '#123456',
        backgroundColor: '#abcdef',
        borderColor: 'currentColor',
        ripple: false,
      });
      expectCssValue(custom, 'color', '#123456');
      expectCssValue(custom, 'background-color', '#abcdef');
      expectCssValue(custom, 'border-color', 'currentColor');
    }
    const link = render(LinkButton, {
      variant,
      href: '/docs',
      color: undefined,
      backgroundColor: null,
      borderColor: undefined,
      ripple: false,
    });
    expectCssValue(
      link,
      'color',
      variant === 'solid' ? lightTheme.color._onPrimary : lightTheme.color._primary,
    );
    expectCssValue(
      link,
      'background-color',
      variant === 'solid'
        ? lightTheme.backgroundColor._primary
        : variant === 'soft'
          ? lightTheme.backgroundColor._primarySurface
          : 'transparent',
    );
    expectCssValue(
      link,
      'border-color',
      variant === 'outline' ? lightTheme.borderColor._primary : 'transparent',
    );
  },
);

it('Button 加载首屏即原生禁用，保留标签并隔离槽语义', () => {
  const { html, css } = render(Button, {
    loading: true,
    children: '保存',
    type: 'submit',
    name: 'action',
    value: 'save',
    startIcon: element('svg', {
      'data-custom-icon': '',
      children: element('path', { d: 'M0 0h1' }),
    }),
    slotSpinner: { 'aria-label': '不应成为名称', 'aria-hidden': false },
    slotRipple: (state: { loading: boolean }) => ({ 'data-loading': state.loading }),
  });
  expect(html).toContain('type="submit"');
  expect(html).toContain('disabled');
  expect(html).toContain('aria-busy="true"');
  expect(html).toContain('保存');
  expect(html).not.toContain('<h1');
  expect(html).not.toContain('不应成为名称');
  expect(html).toContain('data-custom-icon');
  expect(html).toContain('data-ui-button-label');
  expect(html).toContain('name="action"');
  expect(html).toContain('data-loading="true"');
  const opacityVariable = css.match(/opacity:var\((--zj-[a-z0-9-]+)\)/)?.[1];
  expect(opacityVariable).toBeTruthy();
  expect(html).toContain(`${opacityVariable}:0;`);
  expectCssValue({ html, css }, 'border-width', '0.0625em');
  expect(css).toContain('cursor:not-allowed;');
});
it('Button 图标模式保留名称、方形尺寸与原生根节点', () => {
  const { html, css } = render(Button, {
    variant: 'text',
    icon: element(Icon, { icon: Search }),
    'aria-label': '搜索',
    loading: true,
  });
  expect(html).toContain('<button');
  expect(html).toContain('aria-label="搜索"');
  expect(css).toContain('inline-size:2.625em;');
  expect(css).toContain('min-block-size:2.625em;');
});
it.each([
  { name: '无图标', props: {}, count: 1 },
  { name: '结束图标', props: { endIcon: element('svg', { 'data-end': '' }) }, count: 1 },
  {
    name: '两侧图标',
    props: {
      startIcon: element('svg', { 'data-start': '' }),
      endIcon: element('svg', { 'data-end': '' }),
    },
    count: 2,
  },
])('加载只占用一个图标区域：$name', ({ props, count }) => {
  const { html } = render(Button, { ...props, children: '可见标签', loading: true, ripple: false });
  expect(html.match(/data-ui-button-icon(?:[\s=>])/g)).toHaveLength(count);
  expect(html.match(/data-ui-button-spinner(?:[\s=>])/g)).toHaveLength(1);
  expect(html.replace(/<!--[\s\S]*?-->/g, '')).toMatch(/data-ui-button-label[^>]*>可见标签/);
});
it('Toggle 的内部 Spinner/Ripple 槽仍接收受控 pressed 状态', () => {
  const { html } = render(ToggleButton, {
    pressed: true,
    loading: true,
    children: '选中',
    onPressedChange() {},
    slotSpinner: (state: { pressed: boolean }) => ({
      'data-spinner-pressed': String(state.pressed),
    }),
    slotRipple: (state: { pressed: boolean }) => ({ 'data-ripple-pressed': String(state.pressed) }),
  });
  expect(html).toContain('data-spinner-pressed="true"');
  expect(html).toContain('data-ripple-pressed="true"');
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
  expect(normal.html).not.toMatch(/\s(?:root|variant|iconOnly|pressed|slotRipple)=/);
});
it('ButtonGroup 首屏拥有一维连接样式和分组语义', () => {
  const { html, css } = render(ButtonGroup, {
    direction: 'column',
    'aria-label': '操作',
    children: element(Button, { children: '操作' }),
  });
  expect(html).toContain('role="group"');
  expect(html).toContain('aria-label="操作"');
  expect(css).toContain('flex-wrap:nowrap;');
  expect(css).toContain('gap:0;');
  expect(css).toContain('border-start-start-radius:0;');
  expect(css).toContain('margin-block-start:-0.0625em;');
  expect(css).toContain(':nth-child(1 of [data-ui-action]:not([hidden]))');
  expect(css).not.toContain('grid-template-columns');
});
