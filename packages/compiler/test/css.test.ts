import { describe, expect, it } from 'vitest';
import { Css, createServerCssHost, withCssHost } from 'zerodep-js-css';
import { execute } from './execute.js';
import { nativeAttributes } from '../../core/src/native/attributes.js';
import type { Template } from 'zerodep-js';
import { compile } from '../src/index.js';

function run(source: string, extra: Record<string, unknown> = {}) {
  const host = createServerCssHost();
  const result = withCssHost(host, () =>
    execute(source, {
      s: new Css(),
      attributes: (node: Template) => {
        while (node.kind === 'dynamic') node = node.value.read() as Template;
        if (node.kind !== 'element') throw new Error('需要原生元素');
        return Object.fromEntries(nativeAttributes(node.props, 'div'));
      },
      ...extra,
    }),
  );
  return { result, host };
}

describe('CSS 回调与实际 TSX', () => {
  it.each([false, true])('连续更新 1000 次复用类且实例隔离（named=%s）', (named) => {
    const expression =
      "css(() => { s.width(bx((width + 2) * 2 + 'px')); s.opacity(bx(enabled ? 0.5 : 1)); s.color(bx(color)); })";
    const { result, host } = run(`
import { _state } from 'zerodep-js';
import { css, bx } from 'zerodep-js-css';
function create(initial) {
 let width = _state(initial), enabled = _state(false), color = _state('#123456');
 ${named ? 'const appearance = ' + expression + ';' : ''}
 const node = <div class={${named ? 'appearance' : expression}} style={{'--user':'kept'}} />;
 return { read: () => attributes(node), update(value) { width=value; enabled=true; color='#ffffff'; } };
}
const first=create(10), second=create(20), before=first.read(), other=second.read(), classes=new Set();
for(let i=1;i<=1000;i++){first.update(i);classes.add(first.read().class);}
const result={before,after:first.read(),other,unchanged:second.read(),count:classes.size};
`);
    const value = result as {
      before: { class: string; style: string };
      after: { class: string; style: string };
      other: unknown;
      unchanged: unknown;
      count: number;
    };
    expect(value.count).toBe(1);
    expect(host.rules()).toHaveLength(1);
    expect(value.before.class).toBe(value.after.class);
    expect(value.before.style).toContain(':24px;');
    expect(value.after.style).toContain(':2004px;');
    expect(value.after.style).toContain(':0.5;');
    expect(value.after.style).toContain(':#ffffff;');
    expect(value.after.style).toContain('--user:kept');
    expect(value.unchanged).toEqual(value.other);
  });

  it('props 直接解构、多层转发和数组组合保持实例隔离与最新值', () => {
    const { result, host } = run(`
import { _component, _state, renderToString } from 'zerodep-js';
import { css, bx } from 'zerodep-js-css';
const Leaf = _component(({color, ...rest}) => <button {...rest} class={css(() => s.color(bx(color)))} />);
const Wrap = _component(({color, ...rest}) => <Leaf {...rest} color={color} />);
function create() {
 let color = _state('#123456');
 const App = _component(() => <div><Wrap color={color} style={{color:'blue'}}/><Wrap color="#abcdef"/></div>);
 const before=renderToString(App); color='#654321'; const after=renderToString(App); color='inherit';
 return [before, after, renderToString(App)];
}
const result=create();`);
    const [before, after, fallback] = result as string[];
    expect(before).toContain(':#123456;');
    expect(after).toContain(':#654321;');
    expect(after).not.toContain('#123456');
    for (const html of [before, after, fallback]) {
      expect(html).toContain(':#abcdef;');
      expect(html).toContain('color:blue');
      expect(html).not.toContain('[object Object]');
    }
    expect(fallback).not.toContain('#654321');
    expect(host.cssText()).toContain('color:inherit;');
  });

  it('className、spread 覆盖以及显式 style 不留下旧绑定', () => {
    const { result } = run(`
import { _state } from 'zerodep-js'; import { css, bx } from 'zerodep-js-css';
function create(){let plain=_state(false);const view=<div class={css(()=>s.color(bx('#123456')))} {...{className: plain?'external':css(()=>s.color(bx('#abcdef')))}} style={{color:'blue'}}/>;const before=attributes(view);plain=true;return [before,attributes(view)];}const result=create();`);
    const [before, after] = result as { class: string; style: string }[];
    expect(before!.style).toContain(':#abcdef;');
    expect(before!.style).not.toContain('#123456');
    expect(before!.style.endsWith('color:blue')).toBe(true);
    expect(after).toEqual({ class: 'external', style: 'color:blue' });
  });

  it('数组条件退出清理绑定，覆盖不修改原始样式', () => {
    const { result, host } = run(`
import {_state}from'zerodep-js';import{css,bx}from'zerodep-js-css';
function create(){let active=_state(true);const base=css(()=>s.color(bx('#123456')).padding('8px'));const override=css(()=>s.color('blue'));const node=<div class={[base,active&&override]}/>;const before=attributes(node);active=false;return[before,attributes(node)];}const result=create();`);
    const [before, after] = result as { class: string; style?: string }[];
    expect(before!.style).toBeUndefined();
    expect(after!.style).toContain(':#123456;');
    expect(host.rules()[0]!.body).toBe('padding:8px;color:blue;');
  });

  it('普通 helper 快照不升级；JSX 和显式派生正常更新', () => {
    const { result } = run(`
import{_state,_derived}from'zerodep-js';import{css,bx}from'zerodep-js-css';
function appearance(width){return css(()=>s.width(bx(width+'px')));}
function create(){let width=_state(10);const saved=appearance(width);const live=_derived(appearance(width));const a=<div class={saved}/>;const b=<div class={live}/>;const c=<div class={appearance(width)}/>;attributes(a);attributes(b);attributes(c);width=20;return[attributes(a),attributes(b),attributes(c)];}const result=create();`);
    const rows = result as { style: string }[];
    expect(rows[0]!.style).toContain(':10px;');
    expect(rows[1]!.style).toContain(':20px;');
    expect(rows[2]!.style).toContain(':20px;');
  });

  it('CSS 导入别名保留自动派生，编译器不再生成旧变量绑定协议', () => {
    const source = `import{_state}from'zerodep-js';import{css as appearance,bx}from'zerodep-js-css';function make(){let color=_state('red');const style=appearance(()=>s.color(bx(color)));return <div class={style}/>;}`;
    const output = compile(source, 'component.tsx');
    expect(output.code).toContain('derived(');
    expect(output.code).not.toContain('cssBinding');
    expect(output.code).not.toContain('cssResult');
    expect(output.map).toBeTruthy();
  });
});
