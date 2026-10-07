import { describe, expect, it } from 'vitest';
import { Css } from 'zerodep-css';
import { createServerCssHost, withCssHost } from 'zerodep-css/server';
import { execute } from './execute.js';
import { compile } from '../src/index.js';

function run(source: string) {
  const host = createServerCssHost();
  const result = withCssHost(host, () => execute(source, { s: new Css() }));
  return { result, host };
}

describe('原生 CSS 编译', () => {
  it('未知作者回退保留 getter、方法和参数的 JS 求值顺序', () => {
    const order: string[] = [];
    const author = {
      get width() {
        order.push('target');
        return {
          get px() {
            order.push('method');
            return (value: number) => {
              order.push('call');
              return `width:${value}px;`;
            };
          },
        };
      },
    };
    const host = createServerCssHost();
    withCssHost(host, () =>
      execute(
        `
import { _derived } from 'zerodep-js';
import { css } from 'zerodep-js/css';
function create() {
 const width = _derived.by(() => { record('value'); return 20; });
 const element = <div class={css(s.width.px(width))} />;
 return element.props.class;
}
const result = create();`,
        { s: author, record: (value: string) => order.push(value) },
      ),
    );
    expect(order).toEqual(['target', 'method', 'value', 'call']);
    expect(host.cssText()).toContain('width:20px;');
  });
  it('变量名称不依赖构建机器路径或换行风格', () => {
    const source = `import { _state } from 'zerodep-js';\nimport { css } from 'zerodep-js/css';\nfunction view() { let width = _state(10); return <div class={css(s.width.px(width))} />; }`;
    const windows = compile(source.replaceAll('\n', '\r\n'), 'C:/app/Card.tsx').code;
    const linux = compile(source, '/home/runner/app/Card.tsx').code;
    expect(windows.match(/--zj-[a-z0-9-]+/g)).toEqual(linux.match(/--zj-[a-z0-9-]+/g));
  });

  it('同名作者参数按作用域解析，展开覆盖 class 时不注入变量', () => {
    const { result } = run(`
import { _state } from 'zerodep-js';
import { css } from 'zerodep-js/css';
function create() {
 let width = _state(10);
 function view(width) { return <div class={css(s.width.px(width))} />; }
 const overridden = <div class={css(s.width.px(width))} {...{ class: 'external', style: 'color:red' }} />;
 return [view(50).props.style, overridden.value.read().props.class, overridden.value.read().props.style];
}
const result = create();`);
    expect(result).toEqual([undefined, 'external', 'color:red']);
  });

  it('未进入的条件分支不提前求值', () => {
    const { result } = run(`
import { _state } from 'zerodep-js';
import { css } from 'zerodep-js/css';
function create() {
 let width = _state(10); let enabled = _state(false);
 function fail() { throw new Error('inactive'); }
 const name = css(s.width.px(width), enabled ? fail() : s.color.red);
 return <div class={name} />.props.class;
}
const result = create();`);
    expect(result).toMatch(/^z-/);
  });
  it('命名条件样式自动派生，重复读取缓存，普通别名仍是快照', () => {
    const { result, host } = run(`
import { _state } from 'zerodep-js';
import { css as style } from 'zerodep-js/css';
function create() {
 let active = _state(false);
 const className = style(s.color.raw(active ? 'red' : 'blue'));
 const saved = className;
 const before = className;
 active = true;
 return [before, className, saved, className];
}
const result = create();`);
    const values = result as string[];
    expect(values[0]).not.toBe(values[1]);
    expect(values[0]).toBe(values[2]);
    expect(values[1]).toBe(values[3]);
    expect(host.rules()).toHaveLength(2);
  });

  for (const named of [false, true]) {
    it(`${named ? '命名' : '内联'}直接值使用元素变量，合并 style，多实例不串值`, () => {
      const call = 'css(s.width.px(width), s.color.raw(color))';
      const { result, host } = run(`
import { _state } from 'zerodep-js';
import { css } from 'zerodep-js/css';
function create(initial) {
 let width = _state(initial);
 let color = _state('red');
 ${named ? `const className = ${call};` : ''}
 const view = <div style={{ height: '8px', '--user': 'yes' }} class={${named ? 'className' : call}} />;
 return { view, update() { width += 10; color = 'blue'; } };
}
const first = create(20), second = create(40);
const before = [first.view.props.class, first.view.props.style, second.view.props.style];
first.update();
const result = [before, first.view.props.class, first.view.props.style, second.view.props.style];`);
      const [before, name, updated, other] = result as [string[], string, string, string];
      expect(name).toBe(before[0]);
      expect(before[1]).toContain(':20px');
      expect(updated).toContain(':30px');
      expect(updated).toContain(':blue');
      expect(updated).toContain('height:8px');
      expect(updated).toContain('--user:yes');
      expect(other).toBe(before[2]);
      expect(other).toContain(':40px');
      expect(host.rules()).toHaveLength(1);
    });
  }

  it('条件、计算参数、普通别名与跨组件 class 保留重算', () => {
    const code = compile(
      `
import { _state } from 'zerodep-js';
import { css } from 'zerodep-js/css';
function create() {
 let width = _state(10); let active = _state(false); const saved = width;
 const a = css(s.width.px(width));
 return <Widget class={a}><div class={css(s.width.px(width * 2), active ? s.width.px(width) : s.color.red, s.width.px(saved))}/></Widget>;
}`,
      'example.tsx',
    ).code;
    expect(code).not.toContain('cssBinding');
    expect(code).toContain('.derived(');
  });

  it('特殊值取消变量绑定，style 不留下上一次的变量', () => {
    const { result, host } = run(`
import { _state } from 'zerodep-js';
import { css } from 'zerodep-js/css';
function create() {
 let color = _state('red');
 const view = <div class={css(s.color.raw(color))} />;
 const before = view.props.style;
 color = 'initial';
 return [before, view.props.style, view.props.class];
}
const result = create();`);
    expect((result as string[])[0]).toContain(':red');
    expect((result as string[])[1]).toBe('');
    expect(host.cssText()).toContain('color:initial;');
  });

  it('模块常量、同名函数不成为派生，命名样式必须 const', () => {
    expect(
      compile(`import { css } from 'zerodep-js/css'; const name = css('color:red;');`, 'plain.ts')
        .code,
    ).not.toContain('.derived(');
    expect(
      compile(`function f(css) { const name = css('x'); return name; }`, 'plain.ts').code,
    ).not.toContain('.derived(');
    expect(() =>
      compile(
        `import { css } from 'zerodep-js/css'; function f() { let name = css('color:red;'); }`,
        'plain.ts',
      ),
    ).toThrow('const');
  });
});
