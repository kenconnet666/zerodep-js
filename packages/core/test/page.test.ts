import { expect, it, vi } from 'vitest';
import { createPage } from '../src/dom/page.js';
import { defineComponent } from '../src/runtime/component.js';
import { onCleanup } from '../src/runtime/reactivity.js';

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
    onCleanup(cleanup);
    return null;
  });
  const input: Input = { nested: { count: 1 }, callback, optional: '删除' };
  input.cycle = input;
  const page = createPage(Page)(target(), input);
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
  const entry = createPage(
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
  const entry = createPage(
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
