import { execute } from './execute.js';
import { describe, expect, it } from 'vitest';
import * as runtime from '../../core/src/internal.js';
import { createRoot } from '../../core/src/reactivity.js';
import { state } from '../../core/src/state.js';
import type { ElementTemplate, Renderable } from '../../core/src/template.js';

function text(value: Renderable): string {
  if (value == null || typeof value === 'boolean') return '';
  if (typeof value !== 'object') return String(value);
  if (Array.isArray(value)) return value.map(text).join('');
  if (!('kind' in value)) throw new Error('预期框架模板。');
  if (value.kind === 'dynamic') return text(value.value.read());
  if (value.kind === 'fragment') return value.children.map(text).join('');
  return text(value.props.children as Renderable);
}

describe('JSX 惰性输出', () => {
  it('替换 spread 对象但保留 key 时，描述身份和输入视图保持有效', () => {
    const input = state({ title: '旧', key: 1 });
    const view = runtime.dynamicElement(() => 'button', runtime.props([() => input.read()]));
    const before = view.value.read() as ElementTemplate;
    input.write({ title: '新', key: 1 });
    expect(view.value.read()).toBe(before);
    expect(before.props.title).toBe('新');
    expect('key' in before.props).toBe(false);
    input.read().key = 2;
    expect(view.value.read()).not.toBe(before);
  });

  it('特殊属性名保留为自有属性，不改变属性对象的原型', () => {
    const result = execute(`const result = <div __proto__="safe" />;`) as ElementTemplate;
    expect(result.props.__proto__).toBe('safe');
    expect(Object.getPrototypeOf(result.props)).toBeNull();
  });

  it('属性与子内容按读取跟踪，静态节点不建立多余动态区域', () => {
    const result = execute(`
      import { $state } from '@zerodep-js/core';
      let count = $state(1);
      const view = <main title={String(count)}><span>静态</span><b>{count}</b></main>;
      const result = { view, change() { count = 2; } };
    `) as { view: ElementTemplate; change: () => void };
    expect(result.view.tag).toBe('main');
    expect(result.view.props.title).toBe('1');
    expect(text(result.view)).toBe('静态1');
    const children = result.view.props.children as ElementTemplate[];
    expect(children.map((child) => child.kind)).toEqual(['element', 'element']);
    result.change();
    expect(result.view.props.title).toBe('2');
    expect(text(result.view)).toBe('静态2');
  });

  it('Fragment、条件、空内容和实体文本保留正确语义', () => {
    const result = execute(`
      import { $state } from '@zerodep-js/core';
      let visible = $state(true);
      const view = <>A &amp; B{visible ? <b>可见</b> : null}{false}{0}</>;
      const result = { view, hide() { visible = false; } };
    `) as { view: Renderable; hide: () => void };
    expect(text(result.view)).toBe('A & B可见0');
    result.hide();
    expect(text(result.view)).toBe('A & B0');
  });

  it('解构得到的组件标签和属性别名可以出现在 JSX 中', () => {
    const View = execute(`
      import { component } from '@zerodep-js/core';
      const View = component(({ as: Tag, class: className = 'default' }) => <Tag class={className}>内容</Tag>);
      const result = View;
    `) as Parameters<typeof runtime.setupComponent>[0];
    createRoot((dispose) => {
      try {
        const result = runtime.setupComponent(View, { as: 'article' });
        expect(text(result)).toBe('内容');
      } finally {
        dispose();
      }
    });
  });

  it('JSX 中的事件处理函数不会在构建属性时执行', () => {
    const result = execute(`
      import { $state } from '@zerodep-js/core';
      let count = $state(0);
      const view = <button onClick={() => count++}>{count}</button>;
      const result = { view, read: () => count };
    `) as { view: ElementTemplate; read: () => number };
    expect(typeof result.view.props.onClick).toBe('function');
    expect(result.read()).toBe(0);
    (result.view.props.onClick as () => void)();
    expect(text(result.view)).toBe('1');
  });
});
