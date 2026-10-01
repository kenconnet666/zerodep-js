import { expect, it } from 'vitest';
import { snapshot } from '../src/runtime/snapshot.js';
import { reactive, state } from '../src/runtime/state.js';
import { createRoot, effect, flushSync } from '../src/runtime/reactivity.js';

it('脱开深代理且后续双向修改互不影响', () => {
  const model = reactive({ title: '草稿', child: { count: 1 }, list: [{ done: false }] });
  expect(() => structuredClone(model)).toThrow();
  const copy = snapshot(model);
  expect(structuredClone(copy)).toEqual(copy);
  model.child.count = 2;
  copy.list[0]!.done = true;
  expect(copy.child.count).toBe(1);
  expect(model.list[0]!.done).toBe(false);
});

it('保留循环、共享引用、稀疏数组和安全的特殊属性名', () => {
  const shared = reactive({ n: 1 });
  const input: Record<string, unknown> = { a: shared, b: shared };
  input.self = input;
  const sparse = new Array(3);
  sparse[2] = shared;
  input.sparse = sparse;
  Object.defineProperty(input, '__proto__', { value: { safe: true }, enumerable: true });
  const copy = snapshot(input);
  expect(copy.self).toBe(copy);
  expect(copy.a).toBe(copy.b);
  expect((copy.sparse as unknown[])[2]).toBe(copy.a);
  expect(0 in (copy.sparse as unknown[])).toBe(false);
  expect(Object.hasOwn(copy, '__proto__')).toBe(true);
  expect(Object.getPrototypeOf(copy)).toBe(Object.prototype);
});

it('Map/Set 的代理键和值与普通属性共享同一快照', () => {
  const child = reactive({ value: 1 });
  const map = new Map<unknown, unknown>();
  const set = new Set<unknown>([child]);
  map.set(child, set);
  map.set('self', map);
  const copy = snapshot({ child, map, set });
  expect(copy.map.get(copy.child)).toBe(copy.set);
  expect(copy.set.has(copy.child)).toBe(true);
  expect(copy.map.get('self')).toBe(copy.map);
  expect(copy.child).not.toBe(child);
});

it('二进制视图共享克隆 buffer，原始 buffer 不被转移', () => {
  const buffer = new ArrayBuffer(16);
  const view = new Uint8Array(buffer, 4, 4);
  view[0] = 7;
  const copy = snapshot({
    buffer,
    view,
    data: new DataView(buffer, 4),
    date: new Date(123),
    re: /x/gi,
    big: 2n,
  });
  expect(copy.view.buffer).toBe(copy.buffer);
  expect(copy.data.buffer).toBe(copy.buffer);
  expect(copy.view[0]).toBe(7);
  copy.view[0] = 8;
  expect(view[0]).toBe(7);
  expect(buffer.byteLength).toBe(16);
  expect(copy.date.getTime()).toBe(123);
  expect(copy.re.flags).toBe('gi');
  expect(copy.big).toBe(2n);
});

it('错误 cause 中的代理也被复制，支持 cause 环', () => {
  const error = new TypeError('失败', { cause: reactive({ n: 1 }) });
  const copy = snapshot(error);
  expect(copy).toBeInstanceOf(TypeError);
  expect(copy.message).toBe('失败');
  expect(copy.cause).toEqual({ n: 1 });
  const circular = new Error('循环');
  circular.cause = circular;
  expect(snapshot(circular).cause).not.toBe(circular);
  const cloned = snapshot(circular);
  expect(cloned.cause).toBe(cloned);
});

it('保留平台不可克隆值的错误，不以空对象或 JSON 丢弃替代', () => {
  for (const value of [() => {}, Symbol('x'), new WeakMap(), Promise.resolve(1)])
    expect(() => snapshot({ nested: value })).toThrow();
  expect(snapshot({ missing: undefined, number: NaN })).toEqual({
    missing: undefined,
    number: NaN,
  });
  const bad = {
    get value(): never {
      throw new Error('读取失败');
    },
  };
  expect(() => snapshot(bad)).toThrow('读取失败');
});

it('读取快照的属性参与正常依赖跟踪', () => {
  const source = state({ nested: { n: 0 } });
  const values: number[] = [];
  const stop = createRoot((dispose) => {
    effect(() => {
      values.push(snapshot(source.read()).nested.n);
    });
    return dispose;
  });
  try {
    flushSync();
    source.read().nested.n++;
    flushSync();
    expect(values).toEqual([0, 1]);
  } finally {
    stop();
  }
});
