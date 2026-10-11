import { expect, it } from 'vitest';
import * as runtime from 'zerodep-js';
import * as publicRuntime from 'zerodep-js';
import * as cssRuntime from 'zerodep-js-css';
import { Css, SystemKeywords, systemKeywords } from 'zerodep-js-css';
import { createServerCssHost, withCssHost } from 'zerodep-js-css';
import { execute } from '../../../compiler/test/execute.js';
import { renderToString } from 'zerodep-js';

it('真实编译后的主题在 SSR 输出当前变量值，特殊值回退且请求互不污染', () => {
  class Theme extends SystemKeywords {
    // oxlint-disable-next-line typescript/no-misused-spread -- 主题属性组只复制原始值。
    override readonly color = { ...systemKeywords.color, _primary: '' };
    constructor(value: string) {
      super();
      this.color._primary = value;
    }
  }
  const source = `import { _component } from 'zerodep-js';
import { css } from 'zerodep-js-css';
const App = _component(() => <div class={css(() => s.color('_primary'))} style={{ '--user': 'yes' }}>主题</div>);
const result = render(App);`;
  const render = (value: string) => {
    const host = createServerCssHost();
    const html = withCssHost(host, () =>
      execute(source, {
        runtime,
        publicRuntime,
        cssRuntime,
        s: new Css(new Theme(value)),
        render: renderToString,
      }),
    ) as string;
    return { html, css: host.cssText() };
  };
  const a = render('#123456');
  const b = render('#654321');
  expect(a.html).toContain(':#123456;');
  expect(b.html).toContain(':#654321;');
  expect(a.html).toContain('--user:yes');
  expect(b.html).toContain('--user:yes');
  expect(a.css).toContain('color:var(--zt-');
  expect(a.css).not.toContain('#654321');
  expect(b.css).toContain('color:var(--zt-');
  expect(b.css).not.toContain('#123456');
  expect(a.html.match(/class="([^"]+)"/)?.[1]).toBeTruthy();
  expect(a.html.match(/class="([^"]+)"/)?.[1]).toBe(b.html.match(/class="([^"]+)"/)?.[1]);
  for (const value of [
    'inherit',
    'initial',
    'unset',
    'revert',
    'revert-layer',
    'var(--brand, inherit)',
    'nonsense',
  ]) {
    const result = render(value);
    expect(result.html).not.toMatch(/--(?:zj|zt)-/);
    expect(result.html).toContain('--user:yes');
    expect(result.css).toContain(`color:${value};`);
  }
  expect(render('#123456')).toEqual(a);
});
