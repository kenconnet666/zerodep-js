import { beforeAll, afterAll, expect, it } from 'vitest';
import { createServer, type ViteDevServer } from 'vite';
import { resolve } from 'node:path';
import { zerodep } from '../../compiler/src/tooling/vite.js';
import { expectCssValue } from './style-assertions.js';

let server: ViteDevServer;
let ui: typeof import('../src/index.js');
let styles: typeof import('../../css/src/index.js');
let core: typeof import('zerodep-js');

// 直接通过真实 Vite 转换读取本次组件源码；不依赖旧 UI/CSS dist，也不写出整包产物。
beforeAll(async () => {
  server = await createServer({
    configFile: false,
    root: resolve('.'),
    logLevel: 'silent',
    plugins: [
      zerodep({ include: /\/(?:packages\/ui\/src|apps\/docs\/src\/pages\/components)\// }),
      {
        name: 'appearance-runtime',
        resolveId: (id) =>
          id === 'virtual:appearance-runtime' ? '\0appearance-runtime' : undefined,
        load: (id) => (id === '\0appearance-runtime' ? "export * from 'zerodep-js';" : undefined),
      },
    ],
    resolve: {
      alias: {
        'zerodep-js-css': resolve('packages/css/src/index.ts'),
        'zerodep-js-ui': resolve('packages/ui/src/index.ts'),
      },
    },
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
    ssr: { external: ['zerodep-js', '@lucide/icons', 'date-fns', '@date-fns/tz'] },
  });
  ui = (await server.ssrLoadModule('/packages/ui/src/index.ts')) as typeof ui;
  styles = (await server.ssrLoadModule('/packages/css/src/index.ts')) as typeof styles;
  // 组件标记和响应式上下文必须来自与源码组件相同的模块运行器。
  core = (await server.ssrLoadModule('virtual:appearance-runtime')) as typeof core;
}, 10000);
afterAll(async () => {
  await server?.close();
});

function render(
  component: Exclude<Parameters<typeof core.element>[0], string>,
  props: Record<string, unknown>,
  theme = ui.lightTheme,
) {
  const host = styles.createServerCssHost();
  const App = core.defineComponent(() =>
    core.element(ui.Provider, {
      theme,
      children: core.element(component, { children: '完整的操作名称', ripple: false, ...props }),
    }),
  );
  const html = styles.withCssHost(host, () => core.renderToString(App));
  return { html, css: host.cssText() };
}

function block(result: { html: string; css: string }, selector: string) {
  const start = result.css.indexOf(selector + '{');
  expect(start, selector).toBeGreaterThanOrEqual(0);
  const body = start + selector.length + 1;
  return {
    html: result.html,
    css: '{' + result.css.slice(body, result.css.indexOf('}', body)) + '}',
  };
}
const hover = '&:not(:disabled):not([aria-disabled="true"]):hover';
const active = '&:not(:disabled):not([aria-disabled="true"]):active';
const disabled = '&:disabled, &[aria-disabled="true"]';

it('本轮示例可独立 SSR，不在创建 Provider 前读取子级主题', async () => {
  for (const name of ['BaseDemo', 'ButtonDemo']) {
    const module = await server.ssrLoadModule(`/apps/docs/src/pages/components/${name}.tsx`);
    const host = styles.createServerCssHost();
    const html = styles.withCssHost(host, () => core.renderToString(module[name]));
    expect(html).toContain(name === 'BaseDemo' ? 'data-text-lines' : 'data-appearance="soft"');
    expect(host.rules().length).toBeGreaterThan(0);
  }
});

it('按钮和链接在亮暗主题使用真实状态色，soft 保持柔和底色', () => {
  for (const theme of [ui.lightTheme, ui.darkTheme]) {
    for (const component of [ui.Button, ui.LinkButton]) {
      for (const variant of ['solid', 'outline', 'text', 'soft'] as const) {
        const result = render(component, { variant, href: '/', disabled: true }, theme);
        expect(result.css).not.toContain('brightness(');
        expectCssValue(
          block(result, hover),
          'background-color',
          variant === 'solid'
            ? theme.backgroundColor._primaryHover
            : variant === 'soft'
              ? theme.backgroundColor._primarySurfaceHover
              : theme.backgroundColor._primarySurface,
        );
        expectCssValue(
          block(result, active),
          'background-color',
          variant === 'solid'
            ? theme.backgroundColor._primaryPressed
            : variant === 'soft'
              ? theme.backgroundColor._primarySurfacePressed
              : theme.backgroundColor._primarySurfaceHover,
        );
        expectCssValue(block(result, disabled), 'color', theme.color._disabled);
        if (variant === 'soft')
          expectCssValue(result, 'background-color', theme.backgroundColor._primarySurface);
      }
    }
    const toggle = render(
      ui.ToggleButton,
      { variant: 'soft', pressed: true, onPressedChange() {} },
      theme,
    );
    expectCssValue(block(toggle, hover), 'background-color', theme.backgroundColor._primaryHover);
  }
});

it('显式配色不会在交互时跳回主题，部分覆盖只保留对应通道', () => {
  for (const component of [ui.Button, ui.LinkButton]) {
    const result = render(component, {
      href: '/',
      color: '#123456',
      backgroundColor: 'var(--brand)',
      borderColor: 'inherit',
    });
    expect(result.css).not.toContain(hover);
    expect(result.css).not.toContain(active);
    expectCssValue(block(result, disabled), 'opacity', '0.5');
    const partial = render(component, { href: '/', variant: 'outline', color: '#123456' });
    expect(block(partial, hover).css).not.toMatch(/(?:[;{])color:/);
    expectCssValue(block(partial, hover), 'border-color', ui.lightTheme.borderColor._primaryHover);
  }
});

it('内置亮暗主题的默认按钮文字在普通、悬停和按下状态保持可读对比', () => {
  function luminance(value: string) {
    expect(value).toMatch(/^#[\da-f]{6}$/i);
    return value
      .slice(1)
      .match(/../g)!
      .map((part) => parseInt(part, 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
      .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i]!, 0);
  }
  for (const theme of [ui.lightTheme, ui.darkTheme]) {
    const c = theme.color;
    for (const [foreground, background] of [
      [c._onPrimary, c._primary],
      [c._onPrimary, c._primaryHover],
      [c._onPrimary, c._primaryPressed],
      [c._primary, c._primarySurface],
      [c._primaryHover, c._primarySurfaceHover],
      [c._primaryPressed, c._primarySurfacePressed],
      [c._primaryPressed, c._primarySurfaceHover],
    ]) {
      const a = luminance(foreground!),
        b = luminance(background!);
      expect(
        (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
        `${theme.name}: ${foreground}/${background}`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  }
});

it('紧凑密度改变文字/图标/链接的几何尺寸，但不缩小字号或泄露 DOM 属性', () => {
  for (const component of [ui.Button, ui.LinkButton, ui.ToggleButton]) {
    const props = { href: '/', size: '20px', pressed: false, onPressedChange() {} };
    const normal = render(component, props);
    const compact = render(component, { ...props, density: 'compact' });
    expectCssValue(normal, 'min-block-size', '2.625em');
    expectCssValue(compact, 'min-block-size', '2em');
    expectCssValue(compact, 'padding-block', '0.3125em');
    expectCssValue(compact, 'font-size', '20px');
    expect(compact.html).not.toContain(' density=');
  }
  const icon = render(ui.Button, {
    children: undefined,
    icon: '图',
    'aria-label': '搜索',
    density: 'compact',
  });
  expectCssValue(icon, 'inline-size', '2em');
  expectCssValue(icon, 'padding-inline', '0em');
});

it('Text 单行/多行截断保留全文和语义标签，未配置时不改变显示方式', () => {
  const normal = render(ui.Text, {});
  expect(normal.css).not.toContain('line-clamp:');
  const single = render(ui.Text, { lines: 1, as: 'p' });
  expect(single.html).toContain('<p');
  expect(single.html).toContain('完整的操作名称');
  expect(single.html).not.toMatch(/ (?:lines|title)=/);
  expect(single.css).toContain('text-overflow:ellipsis');
  const multiple = render(ui.Text, { lines: 3 });
  expect(multiple.css).toContain('display:-webkit-box;');
  expect(multiple.css).toContain('-webkit-box-orient:vertical;');
  expect(multiple.css).toContain('-webkit-line-clamp:3;');
  expect(multiple.html).toContain('完整的操作名称');
  for (const lines of [0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    expect(() => render(ui.Text, { lines })).toThrow('Text lines 必须是正安全整数');
  }
});
