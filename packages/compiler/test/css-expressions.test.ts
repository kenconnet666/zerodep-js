import { expect, it } from 'vitest';
import { Css, createServerCssHost, withCssHost } from 'zerodep-js-css';
import { execute } from './execute.js';
import { nativeAttributes } from '../../core/src/native/attributes.js';
import type { Props } from 'zerodep-js';
function run(source: string, extra: Record<string, unknown> = {}) {
  const host = createServerCssHost();
  const result = withCssHost(host, () =>
    execute(source, {
      s: new Css(),
      attributes: (node: { props: Props }) =>
        Object.fromEntries(nativeAttributes(node.props, 'div')),
      ...extra,
    }),
  );
  return { result, host };
}

it('if/switch、短路及 helper 只执行当前分支，每次绑定求值一次', () => {
  const calls: string[] = [];
  const { result } = run(
    `import{_state}from'zerodep-js';import{css,bx}from'zerodep-js-css';
 function make(){let enabled=_state(false);let mode=_state('a');function width(){mark('read');return '12px';}const style=css(()=>{if(enabled){s.width(bx(width()));}switch(mode){case'a':s.color('red');break;default:s.color('blue');}});const node=<div class={style}/>;const before=attributes(node);enabled=true;const after=attributes(node);mode='b';const changed=attributes(node);enabled=false;return[before,after,changed,attributes(node)];}const result=make();`,
    { mark: (value: string) => calls.push(value) },
  );
  const rows = result as { style?: string }[];
  expect(rows[0]!.style).toBeUndefined();
  expect(rows[1]!.style).toContain(':12px;');
  expect(rows[3]!.style).toBeUndefined();
  expect(calls).toEqual(['read', 'read']);
});

it.each([
  'inherit',
  'initial',
  'unset',
  'revert',
  'revert-layer',
  'calc(10px + 20px)',
  '-1px',
  'not-a-length',
])('特殊或未知宽度 %s 保留原声明，恢复安全值复用类', (value) => {
  const { result, host } = run(
    `import{_state}from'zerodep-js';import{css,bx}from'zerodep-js-css';function make(){let width=_state('12px');const style=css(()=>s.width(bx(width)));const node=<div class={style}/>;const first=attributes(node);width=special;const middle=attributes(node);width='24px';return[first,middle,attributes(node)];}const result=make();`,
    { special: value },
  );
  const [first, middle, last] = result as { class: string; style?: string }[];
  expect(middle!.style).toBeUndefined();
  expect(host.cssText()).toContain('width:' + value + ';');
  expect(first!.class).toBe(last!.class);
  expect(last!.style).toContain(':24px;');
});

it('求参前先读取方法，普通 JavaScript 调用顺序不被改写', () => {
  const calls: string[] = [];
  const { result } = run(
    `import{css,bx}from'zerodep-js-css';const result=css(()=>author.color(bx(read())));`,
    {
      author: {
        get color() {
          calls.push('method');
          return (value: unknown) => {
            calls.push('call');
            void value;
          };
        },
      },
      read: () => {
        calls.push('value');
        return 'red';
      },
    },
  );
  expect(result).toBeTruthy();
  expect(calls).toEqual(['method', 'value', 'call']);
});

it('未绑定的连续值按普通声明重算，bx 是显式优化边界', () => {
  const { host } = run(
    `import{_state}from'zerodep-js';import{css}from'zerodep-js-css';function make(){let width=_state(10);const style=css(()=>s.width(width+'px'));const node=<div class={style}/>;attributes(node);width=20;attributes(node);}make();const result=true;`,
  );
  expect(host.rules().map((x) => x.body)).toEqual(['width:10px;', 'width:20px;']);
});
