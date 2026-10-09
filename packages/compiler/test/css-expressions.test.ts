import { expect, it } from 'vitest';
import { Css } from 'zerodep-js-css';
import { createServerCssHost, withCssHost } from 'zerodep-js-css/server';
import { compile } from '../src/index.js';
import { execute } from './execute.js';

function run(source: string, extra: Record<string, unknown> = {}) {
  const host = createServerCssHost();
  const result = withCssHost(host, () => execute(source, { s: new Css(), ...extra }));
  return { result, host };
}

it.each([false, true])('表达式连续变化 1000 次只登记一条规则，多实例独立（named=%s）', (named) => {
  const expression =
    "css(s.width.px((width + offset) * 2), s.opacity.raw(enabled ? 0.5 : 1), s.color.raw(color ?? '#000000'))";
  const { result, host } = run(`
import { _state } from 'zerodep-js';
import { css } from 'zerodep-js-css';
function create(initial) {
 let width = _state(initial), enabled = _state(false), color = _state(null);
 const offset = 2;
 ${named ? `const name = ${expression};` : ''}
 const node = <div class={${named ? 'name' : expression}} style={{'--user':'kept'}} />;
 return { read: () => [node.props.class, node.props.style], update(value) { width=value; enabled=true; color='#ffffff'; } };
}
const first=create(10), second=create(20);
const before=first.read(), other=second.read(), classes=new Set();
for(let i=1;i<=1000;i++){first.update(i);classes.add(first.read()[0]);}
const result={before, after:first.read(), other, unchanged:second.read(), classes:classes.size};
`);
  const value = result as {
    before: string[];
    after: string[];
    other: string[];
    unchanged: string[];
    classes: number;
  };
  expect(value.classes).toBe(1);
  expect(host.rules()).toHaveLength(1);
  expect(value.after[0]).toBe(value.before[0]);
  expect(value.before[1]).toContain(':24px;');
  expect(value.after[1]).toContain(':2004px;');
  expect(value.after[1]).toContain(':0.5;');
  expect(value.after[1]).toContain(':#ffffff;');
  expect(value.after[1]).toContain('--user:kept');
  expect(value.unchanged).toEqual(value.other);
});

it('条件与逻辑短路不提前求值，响应式运算参数只求一次', () => {
  const calls: string[] = [];
  const value = {
    [Symbol.toPrimitive]() {
      calls.push('value');
      return 8;
    },
  };
  const bomb = {
    [Symbol.toPrimitive]() {
      throw new Error('inactive branch');
    },
  };
  const { result, host } = run(
    `
import { _state } from 'zerodep-js'; import { css } from 'zerodep-js-css';
function create() {
 let enabled = _state(false), operand = _state.raw(value);
 const node=<div class={css(s.width.px(enabled ? +bomb : +operand), s.height.px((enabled && +bomb) || 12))}/>;
 return [node.props.class, node.props.style, node.props.style];
}
const result=create();`,
    { value, bomb },
  );
  expect(calls).toEqual(['value']);
  expect((result as string[])[1]).toContain(':8px;');
  expect((result as string[])[1]).toContain(':12px;');
  expect(host.rules()).toHaveLength(1);
});

it('自定义作者保留一次接收者、方法和值的求值顺序', () => {
  const order: string[] = [];
  const s = {
    get width() {
      order.push('receiver');
      return {
        get px() {
          order.push('method');
          return (v: number) => {
            order.push('call');
            return `width:${v}px;`;
          };
        },
      };
    },
  };
  const operand = {
    [Symbol.toPrimitive]() {
      order.push('value');
      return 20;
    },
  };
  const { result, host } = run(
    `
import { _state } from 'zerodep-js'; import { css } from 'zerodep-js-css';
function create(){let width=_state.raw(operand);const node=<div class={css(s.width.px(width + 1))}/>;return [node.props.class,node.props.style];}
const result=create();`,
    { s, operand },
  );
  expect(order).toEqual(['receiver', 'method', 'value', 'call']);
  expect((result as string[])[1]).toBe('');
  expect(host.cssText()).toContain('width:21px;');
});

it('条件参数遇到特殊值清除变量，恢复安全值后复用原规则', () => {
  const { result, host } = run(`
import { _state } from 'zerodep-js'; import { css } from 'zerodep-js-css';
function create(){
 let value=_state('red');
 const node=<div class={css(s.color.raw(value ?? 'blue'))}/>;
 return ['red','inherit','initial','unset','revert','revert-layer','var(--brand, inherit)','not-a-color','red'].map(next=>{value=next;return [node.props.class,node.props.style];});
}
const result=create();`);
  const values = result as string[][];
  expect(values[0]).toEqual(values.at(-1));
  expect(values[0]![1]).toContain(':red;');
  for (const [, style] of values.slice(1, -1)) expect(style).toBe('');
  expect(host.cssText()).toContain('color:inherit;');
  expect(host.cssText()).toContain('color:var(--brand, inherit);');
});

it('运算中的类型转换替换系统作者后，仍使用求参前的方法', () => {
  const author = new Css();
  let conversions = 0;
  const operand = {
    [Symbol.toPrimitive]() {
      conversions++;
      Object.defineProperty(author, 'width', { value: { px: () => 'width:999px;' } });
      return 20;
    },
  };
  const { host, result } = run(
    `
import {_state} from 'zerodep-js';import {css} from 'zerodep-js-css';
function create(){let width=_state.raw(operand);const node=<div class={css(s.width.px(width+1))}/>;return [node.props.class,node.props.style];}
const result=create();`,
    { s: author, operand },
  );
  expect(conversions).toBe(1);
  expect((result as string[])[1]).toBe('');
  expect(host.cssText()).toContain('width:21px;');
  expect(host.cssText()).not.toContain('999px');
});

it.each([
  ['width > 10 ? width - 1 : width + 1', 11, 19],
  ['width && width + 1', 11, 21],
  ['-(-width)', 10, 20],
])('简单表达式 %s 保持结果并复用规则', (expression, before, after) => {
  const { result, host } = run(`
import {_state} from 'zerodep-js';import {css} from 'zerodep-js-css';
function create(){let width=_state(10);const node=<div class={css(s.width.px(${expression}))}/>;
const first=[node.props.class,node.props.style];width=20;return [first,node.props.class,node.props.style];}
const result=create();`);
  const [first, name, style] = result as [string[], string, string];
  expect(first[1]).toContain(`:${before}px;`);
  expect(style).toContain(`:${after}px;`);
  expect(name).toBe(first[0]);
  expect(host.rules()).toHaveLength(1);
});

it('负值、非有限值及恢复保持原始声明的层叠行为', () => {
  const { result, host } = run(`
import { _state } from 'zerodep-js'; import { css } from 'zerodep-js-css';
function create(){let width=_state(0);const node=<div class={css(s.width.px(20),s.width.px(width+1))}/>;
 return [0,-2,Infinity,NaN,1].map(next=>{width=next;return [node.props.class,node.props.style];});}
const result=create();`);
  const values = result as string[][];
  expect(values[0]![1]).toContain(':1px;');
  for (const [, style] of values.slice(1, -1)) expect(style).toBe('');
  expect(values.at(-1)![0]).toBe(values[0]![0]);
  expect(host.cssText()).toContain('width:20px;width:-1px;');
});

it('TS 类型包装与导入别名可识别，普通参数遮蔽来源时不转换', () => {
  const code = compile(
    `import {_state as state} from 'zerodep-js';import {css} from 'zerodep-js-css';
function create(){let width=state(10);const node=<div class={css(s.width.px(((width as number)+1) satisfies number))}/>;
function shadow(width){return <div class={css(s.width.px(width+1))}/>;}return [node,shadow(20)];}`,
    'alias.tsx',
  ).code;
  expect(code.match(/\.cssBinding\(/g)).toHaveLength(1);
});

it('调用、成员访问、赋值和纯常量继续原计算，不扩大到未知表达式', () => {
  const code = compile(
    `import {_state} from 'zerodep-js';import {css} from 'zerodep-js-css';
function create(){let width=_state(10);const saved=width;
return <div class={css(s.width.px(Math.max(width,0)),s.width.px(width.value),s.width.px(width=20),s.width.px(saved+1),s.width.px(1+2))}/>;}`,
    'fallback.tsx',
  ).code;
  expect(code).not.toContain('cssBinding');
});
