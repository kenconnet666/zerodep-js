import { expect, it } from 'vitest';
import { copyData, preview } from '../src/dev/values.js';
import { state } from '../src/runtime/state.js';

it('开发快照保留普通数据的循环、共享引用和稀疏数组，不保留响应式代理', () => {
  const shared = { name: '原值' };
  const original: { left: typeof shared; right: typeof shared; self?: unknown; items: unknown[] } =
    { left: shared, right: shared, items: new Array(4) };
  original.self = original;
  const model = state(original);
  const copied = copyData(model.read()) as typeof original;
  expect(copied.self).toBe(copied);
  expect(copied.left).toBe(copied.right);
  expect(copied.left).not.toBe(shared);
  expect(copied.items).toHaveLength(4);
  expect(0 in copied.items).toBe(false);
  copied.left.name = '副本';
  expect(model.read().left.name).toBe('原值');
});

it('开发查看不调用访问器，历史迁移拒绝资源和异常大的对象图', () => {
  let calls = 0;
  const object = {
    get secret() {
      calls++;
      throw new Error('不应读取');
    },
  };
  expect(preview(object)).toContain('[访问器]');
  expect(() => copyData(object)).toThrow('访问器');
  expect(calls).toBe(0);
  expect(() => copyData(new AbortController())).toThrow('外部');
  expect(() => copyData({ run() {} })).toThrow('函数');
  const deep: { next?: unknown } = {};
  let cursor = deep;
  for (let index = 0; index < 102; index++) {
    const next = {};
    cursor.next = next;
    cursor = next;
  }
  expect(() => copyData(deep)).toThrow('上限');
  expect(preview(deep).length).toBeLessThan(200);
});
