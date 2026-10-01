import { afterEach, describe, expect, it, vi } from 'vitest';
import { Derived, createRoot, effect, flushSync, type Cleanup } from '../src/runtime/reactivity.js';
import { reactive, state } from '../src/runtime/state.js';

const roots: Cleanup[] = [];
function observe(fn: () => void): void {
  createRoot((dispose) => {
    roots.push(dispose);
    effect(fn);
  });
  flushSync();
}
afterEach(() => {
  for (const dispose of roots.splice(0)) dispose();
  flushSync();
});

describe('属性级对象状态', () => {
  it('getter 在读取其他依赖前抛错，替换字段后冷派生和 effect 都能恢复', () => {
    const object = reactive({
      get value(): number {
        throw new Error('临时读取失败');
      },
    });
    const cold = new Derived(() => object.value);
    const seen: number[] = [];
    expect(() => cold.read()).toThrow('临时读取失败');
    expect(() =>
      observe(() => {
        seen.push(object.value);
      }),
    ).toThrow('临时读取失败');
    Object.defineProperty(object, 'value', { configurable: true, enumerable: true, value: 2 });
    expect(cold.read()).toBe(2);
    flushSync();
    expect(seen).toEqual([2]);
  });

  it('只跟踪读到的属性，整体替换后重新收集依赖', () => {
    const user = state({ name: '甲', age: 20, address: { city: '北京' } });
    const values: string[] = [];
    observe(() => {
      values.push(`${user.read().name}/${user.read().address.city}`);
    });
    flushSync(() => {
      user.read().age++;
    });
    expect(values).toEqual(['甲/北京']);
    const old = user.read();
    flushSync(() => {
      old.address.city = '上海';
    });
    flushSync(() => {
      user.write({ name: '乙', age: 21, address: { city: '成都' } });
    });
    flushSync(() => {
      old.name = '旧对象';
    });
    expect(values).toEqual(['甲/北京', '甲/上海', '乙/成都']);
  });

  it('区分读取值、存在性与键枚举', () => {
    const object = reactive<Record<string, number | undefined>>({ a: 1 });
    const value = vi.fn(() => {
      void object.a;
    });
    const has = vi.fn(() => {
      void ('a' in object);
    });
    const keys = vi.fn(() => {
      Object.keys(object);
    });
    observe(value);
    observe(has);
    observe(keys);
    flushSync(() => {
      object.a = 2;
    });
    expect(value).toHaveBeenCalledTimes(2);
    expect(has).toHaveBeenCalledTimes(1);
    expect(keys).toHaveBeenCalledTimes(1);
    flushSync(() => {
      delete object.a;
    });
    expect(has).toHaveBeenCalledTimes(2);
    expect(keys).toHaveBeenCalledTimes(2);
    flushSync(() => {
      object.a = undefined;
    });
    expect(value).toHaveBeenCalledTimes(4);
    expect(has).toHaveBeenCalledTimes(3);
  });

  it('代理身份稳定、保留循环引用、写回同一原对象不重复通知', () => {
    const original: { self?: unknown; child: { n: number } } = { child: { n: 1 } };
    original.self = original;
    const object = reactive(original);
    expect(reactive(original)).toBe(object);
    expect(reactive(object)).toBe(object);
    expect(object.self).toBe(object);
    expect(object.child).toBe(object.child);
    const cell = state(original);
    const reader = vi.fn(() => {
      cell.read();
    });
    observe(reader);
    flushSync(() => {
      cell.write(original);
    });
    expect(reader).toHaveBeenCalledTimes(1);
    object.child.n = 2;
    expect(original.child.n).toBe(2);
  });

  it('原始别名变更不通知，但下一次普通读取可看到原值', () => {
    const raw = { n: 0 };
    const object = reactive(raw);
    const reader = vi.fn(() => {
      void object.n;
    });
    observe(reader);
    flushSync(() => {
      raw.n = 1;
    });
    expect(reader).toHaveBeenCalledTimes(1);
    expect(object.n).toBe(1);
  });

  it('访问器保持接收者并跟踪内部读取，赋值不会额外调用 getter', () => {
    let getterCalls = 0;
    const object = reactive({
      n: 1,
      get doubled() {
        getterCalls++;
        return this.n * 2;
      },
      set doubled(value: number) {
        this.n = value / 2;
      },
    });
    object.doubled = 8;
    expect(getterCalls).toBe(0);
    const seen: number[] = [];
    observe(() => {
      seen.push(object.doubled);
    });
    flushSync(() => {
      object.n = 5;
    });
    expect(seen).toEqual([8, 10]);
  });

  it('冷派生在属性节点回收后仍正确失效', () => {
    const object = reactive({ n: 0 });
    const value = new Derived(() => object.n + 1);
    expect(value.read()).toBe(1);
    object.n = 1;
    object.n = 2;
    expect(value.read()).toBe(3);
  });

  it('纯派生中的对象写入在真实变更前被拒绝', () => {
    const object = reactive({ n: 0 });
    const invalid = new Derived(() => ++object.n);
    expect(() => invalid.read()).toThrow('不能写入');
    expect(object.n).toBe(0);
  });

  it('保留类、内建对象与冻结对象，冻结代理和改原型有明确错误', () => {
    class Box {
      #n = 1;
      read() {
        return this.#n;
      }
    }
    const box = new Box();
    const date = new Date();
    const frozen = Object.freeze({ n: 1 });
    expect(reactive(box)).toBe(box);
    expect(reactive(box).read()).toBe(1);
    expect(reactive(date)).toBe(date);
    expect(reactive(frozen)).toBe(frozen);
    const object = reactive({ n: 0 });
    expect(() => Object.freeze(object)).toThrow('原地冻结');
    expect(() => Object.setPrototypeOf(object, null)).toThrow('原型');
  });

  it('不可写且不可配置的属性遵守 Proxy 返回值约束', () => {
    const child = { n: 1 };
    const object = reactive(Object.defineProperty({}, 'child', { value: child }));
    expect(Reflect.get(object, 'child')).toBe(child);
  });
});

describe('数组状态', () => {
  it('push、索引写入和截短 length 更新内容、长度、存在性', () => {
    const rows = reactive([1, 2, 3]);
    const seen: string[] = [];
    observe(() => {
      seen.push(`${rows.join(',')}/${rows.length}/${2 in rows}`);
    });
    flushSync(() => {
      rows.push(4);
    });
    flushSync(() => {
      rows[0] = 9;
    });
    flushSync(() => {
      rows.length = 1;
    });
    expect(seen).toEqual(['1,2,3/3/true', '1,2,3,4/4/true', '9,2,3,4/4/true', '9/1/false']);
  });

  it('splice 与排序合并通知，方法保持返回值和 this 语义', () => {
    const rows = reactive([3, 1, 2]);
    const seen: string[] = [];
    observe(() => {
      seen.push(rows.join(','));
    });
    expect(rows.sort()).toBe(rows);
    flushSync();
    expect(rows.splice(1, 1, 4, 5)).toEqual([2]);
    flushSync();
    expect(seen).toEqual(['3,1,2', '1,2,3', '1,4,5,3']);
    const push = rows.push;
    expect(() => push(7)).toThrow(TypeError);
  });

  it('变更方法的内部 length 读取不会把 effect 变成循环', () => {
    const rows = reactive<number[]>([]);
    observe(() => {
      rows.push(1);
    });
    flushSync(() => {
      rows.push(2);
    });
    expect(rows).toEqual([1, 2]);
  });

  it('截短失败造成部分删除时依然通知真实状态', () => {
    const rows = reactive([1, 2, 3]);
    Object.defineProperty(rows, '1', { configurable: false });
    const seen: string[] = [];
    observe(() => {
      seen.push(`${rows.length}/${rows[2]}`);
    });
    expect(Reflect.set(rows, 'length', 0)).toBe(false);
    flushSync();
    expect(seen).toEqual(['3/3', '2/undefined']);
  });
});
