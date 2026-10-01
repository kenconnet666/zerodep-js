import { expect, it, vi } from 'vitest';
import { _createPage } from '../src/dom/page.js';
import { defineComponent } from '../src/runtime/component.js';
import { Derived, _effect, _flushSync, _onCleanup } from '../src/runtime/reactivity.js';

// 这些用例只检查输入与作用域；真实节点、接管与重复卸载由浏览器消费验证。
function target(): HTMLElement {
  return {
    ownerDocument: { createDocumentFragment: () => ({}) },
    replaceChildren() {},
  } as unknown as HTMLElement;
}

it('宿主输入完整替换且不重建实例，普通数据脱开且保留环/回调', () => {
  const cleanup = vi.fn();
  const callback = vi.fn();
  type Input = {
    nested: { count: number };
    callback: () => void;
    optional?: string;
    cycle?: Input;
  };
  let view!: Input;
  let setups = 0;
  const Page = defineComponent((input: Input) => {
    setups++;
    view = input;
    _onCleanup(cleanup);
    return null;
  });
  const input: Input = { nested: { count: 1 }, callback, optional: '删除' };
  input.cycle = input;
  const page = _createPage(Page)(target(), input);
  expect(view.nested).not.toBe(input.nested);
  expect(view.cycle!.cycle).toBe(view.cycle);
  expect(view.callback).toBe(callback);
  input.nested.count = 2;
  expect(view.nested.count).toBe(1);
  page.update({ nested: input.nested, callback });
  expect(view.nested.count).toBe(2);
  expect(view.optional).toBeUndefined();
  expect(Object.keys(view)).toEqual(['nested', 'callback']);
  expect(setups).toBe(1);
  page.dispose();
  page.dispose();
  page.update({ nested: { count: 3 }, callback });
  expect(view.nested.count).toBe(2);
  expect(cleanup).toHaveBeenCalledOnce();
});

it('每次入口创建独立数据，读取失败不部分提交', () => {
  const views: Array<{ n: number }> = [];
  const entry = _createPage(
    defineComponent((input: { n: number }) => {
      views.push(input);
      return null;
    }),
  );
  const one = entry(target(), { n: 1 });
  const two = entry(target(), { n: 2 });
  try {
    expect(() =>
      one.update({
        get n(): number {
          throw new Error('读取失败');
        },
      }),
    ).toThrow('读取失败');
    expect(views.map((view) => view.n)).toEqual([1, 2]);
    one.update({ n: 3 });
    expect(views.map((view) => view.n)).toEqual([3, 2]);
  } finally {
    one.dispose();
    two.dispose();
  }
});

it('拒绝非普通根输入，__proto__ 作为数据字段处理', () => {
  let view!: object;
  const entry = _createPage(
    defineComponent((input: object) => {
      view = input;
      return null;
    }),
  );
  expect(() => entry(target(), [])).toThrow('普通对象');
  const input = JSON.parse('{"__proto__":{"safe":true}}');
  const page = entry(target(), input);
  expect(Object.hasOwn(view, '__proto__')).toBe(true);
  expect(Object.getPrototypeOf(view)).toBeNull();
  page.dispose();
});

it('宿主的等值提交与无关字段变化不反复运行标量输入 effect', () => {
  const values: string[] = [];
  const entry = _createPage(
    defineComponent((input: { title: string; other: number; nested: { value: number } }) => {
      _effect(() => {
        values.push(input.title);
      });
      return null;
    }),
  );
  const page = entry(target(), { title: '一', other: 0, nested: { value: 1 } });
  try {
    _flushSync();
    page.update({ title: '一', other: 0, nested: { value: 1 } });
    page.update({ title: '一', other: 1, nested: { value: 1 } });
    _flushSync();
    expect(values).toEqual(['一']);
    page.update({ title: '二', other: 1, nested: { value: 1 } });
    _flushSync();
    expect(values).toEqual(['一', '二']);
  } finally {
    page.dispose();
  }
});

it('等值比较不合并不同的别名结构，循环输入仍能更新', () => {
  type Input = { a: { n: number }; b: { n: number }; self?: Input };
  let view!: Input;
  const entry = _createPage(
    defineComponent((input: Input) => {
      view = input;
      return null;
    }),
  );
  const shared = { n: 1 };
  const initial: Input = { a: shared, b: shared };
  initial.self = initial;
  const page = entry(target(), initial);
  try {
    const next: Input = { a: { n: 1 }, b: { n: 1 } };
    next.self = next;
    page.update(next);
    expect(view.a).not.toBe(view.b);
    expect(view.self!.self).toBe(view.self);
    next.a.n = 2;
    page.update(next);
    expect(view.a.n).toBe(2);
  } finally {
    page.dispose();
  }
});

it('纯派生内的更新被拒绝，不影响之后的正常提交', () => {
  let view!: { n: number };
  const page = _createPage(
    defineComponent((input: { n: number }) => {
      view = input;
      return null;
    }),
  )(target(), { n: 1 });
  try {
    expect(() => new Derived(() => page.update({ n: 2 })).read()).toThrow('纯派生');
    expect(view.n).toBe(1);
    page.update({ n: 2 });
    expect(view.n).toBe(2);
  } finally {
    page.dispose();
  }
});
