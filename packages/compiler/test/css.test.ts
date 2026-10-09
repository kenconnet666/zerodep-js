import { describe, expect, it } from 'vitest';
import { Css, SystemKeywords, systemKeywords } from 'zerodep-js-css';
import { createServerCssHost, withCssHost } from 'zerodep-js-css/server';
import { execute } from './execute.js';
import { compile } from '../src/index.js';
import { cssBinding } from 'zerodep-js-css/internal';
import { TraceMap, originalPositionFor } from '@jridgewell/trace-mapping';

function run(source: string) {
  const host = createServerCssHost();
  const result = withCssHost(host, () => execute(source, { s: new Css() }));
  return { result, host };
}

describe('原生 CSS 编译', () => {
  it.each([false, true])('raw 可选值撤销声明与私有变量，随后能恢复（named=%s）', (named) => {
    const { result, host } = run(`
import { _state } from 'zerodep-js';
import { css } from 'zerodep-js-css';
function create() {
  let color = _state<string | undefined>('#123456');
  ${named ? 'const name = css(s.color.raw(color), s.display.block);' : ''}
  const view = <div class={${named ? 'name' : 'css(s.color.raw(color), s.display.block)'}} style={{padding:'2px'}} />;
  const read = () => ({className:view.props.class, style:view.props.style});
  const before = read();
  color = undefined;
  const removed = read();
  color = '#654321';
  return [before, removed, read()];
}
const result = create();`);
    const [before, removed, restored] = result as Array<{ className: string; style: string }>;
    expect(before!.style).toContain('#123456');
    expect(removed!.style).toContain('padding:2px');
    expect(removed!.style).not.toContain('--zj-');
    expect(host.rules().find((rule) => rule.className === removed!.className)?.body).toBe(
      'display:block;',
    );
    expect(restored!.style).toContain('#654321');
    expect(restored!.className).toBe(before!.className);
    expect(host.cssText()).not.toContain('undefined');
  });
  it('关键字绑定源码映射仍指向原始成员读取', () => {
    const source = `import { css } from 'zerodep-js-css';
function view() { return <div class={css(s.color._primary)} />; }`;
    const result = compile(source, 'KeywordMap.tsx');
    const lines = result.code.split('\n');
    const index = lines.findIndex((line) => line.includes('.cssKeyword('));
    expect(index).toBeGreaterThanOrEqual(0);
    expect(
      originalPositionFor(new TraceMap(result.map!), {
        line: index + 1,
        column: lines[index]!.indexOf('.cssKeyword('),
      }),
    ).toMatchObject({
      source: 'KeywordMap.tsx',
      line: 2,
      column: source.split('\n')[1]!.indexOf('s.color._primary'),
    });
  });
  it.each([false, true])(
    '主题关键字动态绑定并在特殊值/var 之间清理私有变量（named=%s）',
    (named) => {
      class Theme extends SystemKeywords {
        // oxlint-disable-next-line typescript/no-misused-spread -- 只复制库契约中的原始值字段，不复制作者方法。
        override readonly color = { ...systemKeywords.color, _primary: '#245fc5' };
        constructor(primary = '#245fc5') {
          super();
          this.color._primary = primary;
        }
      }
      const host = createServerCssHost();
      const result = withCssHost(host, () =>
        execute(
          `
import { _state } from 'zerodep-js';
import { css } from 'zerodep-js-css';
function create() {
 let theme = _state.raw(new Theme());
 let external = _state('#123456');
 const s = makeAuthor(() => theme);
 ${named ? 'const name = css(s.color._primary, s.display.flex);' : ''}
 const view = <div class={${named ? 'name' : 'css(s.color._primary, s.display.flex)'}} style={{ '--brand': external, padding: '2px' }} />;
 const values = ['#245fc5', 'inherit', 'initial', 'unset', 'revert', 'revert-layer', 'var(--brand, inherit)', 'nonsense', '#ffffff'];
 return values.map(value => {
   theme = new Theme(value);
   external = '#abcdef';
   return [view.props.class, view.props.style, s.keywords.color._primary];
 });
}
const result = create();`,
          { Theme, makeAuthor: (read: () => Theme) => new Css(read) },
        ),
      ) as string[][];
      expect(result[0]![0]).toBe(result.at(-1)![0]);
      for (const [index, [, style, value]] of result.entries()) {
        expect(style).toContain('--brand:#abcdef');
        expect(style).toContain('padding:2px');
        if (index === 0 || index === result.length - 1) expect(style).toContain(`:${value}`);
        else {
          expect(style).not.toContain(value);
          // display.flex 是主题中的安全值，只有 color 对应的变量应被移除。
          expect(style!.match(/--zj-[^:]+:/g)).toHaveLength(1);
          expect(host.cssText()).toContain(`color:${value};`);
        }
      }
    },
  );

  it('主题关键字接收者和 getter 保留一次求值，未知作者不绑定', () => {
    const order: string[] = [];
    const s = {
      get color() {
        order.push('color');
        return {
          get _primary() {
            order.push('primary');
            return 'color:red;';
          },
        };
      },
    };
    const host = createServerCssHost();
    const result = withCssHost(host, () =>
      execute(
        `
import { css } from 'zerodep-js-css';
const attrs = <div class={css(s.color._primary)} />.props;
const result = { class: attrs.class, style: attrs.style };`,
        { s },
      ),
    ) as { class: string; style: string };
    expect(result.class).toBeTruthy();
    expect(result.style).toBe('');
    expect(order).toEqual(['color', 'primary']);
  });

  it('嵌套选择器和跨组件主题类名保持原声明，不要求隐藏的变量传递', () => {
    const code = compile(
      `import { css } from 'zerodep-js-css';
function view() { const name = css(s.color._primary);
return <Widget class={name}><div class={css(s._hover(s.color._primary))} /></Widget>; }`,
      'theme.tsx',
    ).code;
    expect(code).not.toContain('cssKeyword');
  });
  it.each([
    [false, 'width'],
    [true, 'width'],
    [false, 'width + 1'],
    [true, 'width + 1'],
  ] as const)('CSS 调用源码映射（named=%s，参数=%s）', (named, argument) => {
    const expression = `css(s.width.px(${argument}))`;
    const line = named ? `const name = ${expression};` : `return <div class={${expression}} />;`;
    const source = [
      "import { _state } from 'zerodep-js';",
      "import { css } from 'zerodep-js-css';",
      'function view() {',
      'let width = _state(20);',
      line,
      ...(named ? ['return <div class={name} />;'] : []),
      '}',
    ].join('\n');
    const result = compile(source, 'CssMap.tsx');
    const lines = result.code.split('\n');
    for (const [helper, original] of [
      ['cssBinding', 's.width'],
      ['cssResult', 'css('],
    ]) {
      const index = lines.findIndex((text) => text.includes(`.${helper}(`));
      expect(index).toBeGreaterThanOrEqual(0);
      expect(
        originalPositionFor(new TraceMap(result.map!), {
          line: index + 1,
          column: lines[index]!.indexOf(`.${helper}(`),
        }),
      ).toMatchObject({ source: 'CssMap.tsx', line: 5, column: line.indexOf(original!) });
    }
  });

  it('真实 TSX 的直接派生值求参改变作者时，保留原方法并回退普通声明', () => {
    const { result, host } = run(`
import { _derived } from 'zerodep-js';
import { css } from 'zerodep-js-css';
function create() {
 const width = _derived.by(() => {
   Object.defineProperty(s, 'width', { value: { px: () => 'width:999px;' } });
   return 20;
 });
 const node = <div class={css(s.width.px(width))} />;
 const attributes = node.props;
 return [attributes.class, attributes.style];
}
const result = create();`);
    expect((result as string[])[0]).toBeTruthy();
    expect((result as string[])[1]).toBe('');
    expect(host.cssText()).toContain('width:20px;');
    expect(host.cssText()).not.toContain('999px');
  });

  it('参数计算替换系统作者属性时，仍调用求参前取得的方法', () => {
    const author = new Css();
    const original = author.width;
    const result = cssBinding(
      author,
      'width',
      'px',
      () => {
        Object.defineProperty(author, 'width', { value: { px: () => 'width:999px' } });
        return 20;
      },
      '--zj-order',
    );
    expect(result.declaration).toBe(original.px(20));
    expect(result.value).toBeUndefined();
  });

  for (const named of [false, true]) {
    it(`${named ? '命名' : '内联'}类名在 spread 后仍绑定变量并实时合并 style`, () => {
      const call = 'css(s.width.px(width))';
      const { result, host } = run(`
import { _state } from 'zerodep-js';
import { css } from 'zerodep-js-css';
function create() {
 let width = _state(20);
 let attrs = _state({ class: 'old', style: { color: 'red', '--user': 'first' } });
 ${named ? `const name = ${call};` : ''}
 const template = <div {...attrs} class={${named ? 'name' : call}} />;
 const first = template.value.read().props;
 const before = [first.class, first.style];
 width = 40;
 attrs = { class: 'ignored', style: { color: 'blue', '--user': 'second' } };
 const next = template.value.read().props;
 return [before, next.class, next.style];
}
const result = create();`);
      const [before, name, style] = result as [string[], string, string];
      expect(name).toBe(before[0]);
      expect(before[1]).toContain(':20px');
      expect(style).toContain(':40px');
      expect(style).toContain('color:blue');
      expect(style).toContain('--user:second');
      expect(style).not.toContain('first');
      expect(host.rules()).toHaveLength(1);
    });
  }

  it('最后的 spread 可能覆盖类名时，保留原生 class/style 覆盖语义', () => {
    const { result } = run(`
import { _state } from 'zerodep-js';
import { css } from 'zerodep-js-css';
function create() {
 let width = _state(20);
 let attrs = _state({ class: 'external', style: 'width:80px' });
 const template = <div {...{ title: 'before' }} class={css(s.width.px(width))} {...attrs} />;
 const before = template.value.read().props.class;
 attrs = { class: 'new', style: 'width:90px' };
 const after = template.value.read().props;
 return [before, after.class, after.style];
}
const result = create();`);
    expect(result).toEqual(['external', 'new', 'width:90px']);
  });

  it('spread 引入 key 后仍能读取绑定结果，key 改变不混用元素变量', () => {
    const { result } = run(`
import { _state } from 'zerodep-js';
import { css } from 'zerodep-js-css';
function create() {
 let width = _state(20); let id = _state('a');
 const template = <div {...{ key: id }} class={css(s.width.px(width))} />;
 const first = template.value.read();
 const before = first.props.style;
 id = 'b'; width = 30;
 const next = template.value.read();
 return [first === next, before, next.props.style];
}
const result = create();`);
    const [same, before, after] = result as [boolean, string, string];
    expect(same).toBe(false);
    expect(before).toContain(':20px');
    expect(after).toContain(':30px');
  });
  it('未知接收者的属性错误不会提前读取参数', () => {
    let reads = 0;
    expect(() =>
      cssBinding(
        null,
        'width',
        'px',
        () => {
          reads++;
          return 20;
        },
        '--zj-test',
      ),
    ).toThrow(TypeError);
    expect(reads).toBe(0);
  });
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
import { css } from 'zerodep-js-css';
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
    const source = `import { _state } from 'zerodep-js';\nimport { css } from 'zerodep-js-css';\nfunction view() { let width = _state(10); return <div class={css(s.width.px(width))} />; }`;
    const windows = compile(source.replaceAll('\n', '\r\n'), 'C:/app/Card.tsx').code;
    const linux = compile(source, '/home/runner/app/Card.tsx').code;
    expect(windows.match(/--zj-[a-z0-9-]+/g)).toEqual(linux.match(/--zj-[a-z0-9-]+/g));
  });

  it('同名作者参数按作用域解析，展开覆盖 class 时不注入变量', () => {
    const { result } = run(`
import { _state } from 'zerodep-js';
import { css } from 'zerodep-js-css';
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
import { css } from 'zerodep-js-css';
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
import { css as style } from 'zerodep-js-css';
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
import { css } from 'zerodep-js-css';
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

  it('算术参数绑定，声明级条件、普通别名与跨组件 class 保留重算', () => {
    const code = compile(
      `
import { _state } from 'zerodep-js';
import { css } from 'zerodep-js-css';
function create() {
 let width = _state(10); let active = _state(false); const saved = width;
 const a = css(s.width.px(width));
 return <Widget class={a}><div class={css(s.width.px(width * 2), active ? s.width.px(width) : s.color.red, s.width.px(saved))}/></Widget>;
}`,
      'example.tsx',
    ).code;
    expect(code.match(/\.cssBinding\(/g)).toHaveLength(1);
    expect(code).toContain('.derived(');
  });

  it('特殊值取消变量绑定，style 不留下上一次的变量', () => {
    const { result, host } = run(`
import { _state } from 'zerodep-js';
import { css } from 'zerodep-js-css';
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
      compile(`import { css } from 'zerodep-js-css'; const name = css('color:red;');`, 'plain.ts')
        .code,
    ).not.toContain('.derived(');
    expect(
      compile(`function f(css) { const name = css('x'); return name; }`, 'plain.ts').code,
    ).not.toContain('.derived(');
    expect(() =>
      compile(
        `import { css } from 'zerodep-js-css'; function f() { let name = css('color:red;'); }`,
        'plain.ts',
      ),
    ).toThrow('const');
  });
});
