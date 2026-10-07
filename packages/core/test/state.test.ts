import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  Derived,
  _createRoot,
  _effect,
  _flushSync,
  _untrack,
  type Cleanup,
} from '../src/runtime/reactivity.js';
import { reactive, state } from '../src/runtime/state.js';
import { runInNewContext } from 'node:vm';

const roots: Cleanup[] = [];
function observe(fn: () => void): void {
  _createRoot((dispose) => {
    roots.push(dispose);
    _effect(fn);
  });
  _flushSync();
}
afterEach(() => {
  for (const dispose of roots.splice(0)) dispose();
  _flushSync();
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
    _flushSync();
    expect(seen).toEqual([2]);
  });

  it('只跟踪读到的属性，整体替换后重新收集依赖', () => {
    const user = state({ name: '甲', age: 20, address: { city: '北京' } });
    const values: string[] = [];
    observe(() => {
      values.push(`${user.read().name}/${user.read().address.city}`);
    });
    _flushSync(() => {
      user.read().age++;
    });
    expect(values).toEqual(['甲/北京']);
    const old = user.read();
    _flushSync(() => {
      old.address.city = '上海';
    });
    _flushSync(() => {
      user.write({ name: '乙', age: 21, address: { city: '成都' } });
    });
    _flushSync(() => {
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
    _flushSync(() => {
      object.a = 2;
    });
    expect(value).toHaveBeenCalledTimes(2);
    expect(has).toHaveBeenCalledTimes(1);
    expect(keys).toHaveBeenCalledTimes(1);
    _flushSync(() => {
      delete object.a;
    });
    expect(has).toHaveBeenCalledTimes(2);
    expect(keys).toHaveBeenCalledTimes(2);
    _flushSync(() => {
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
    _flushSync(() => {
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
    _flushSync(() => {
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
    _flushSync(() => {
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
    _flushSync(() => {
      rows.push(4);
    });
    _flushSync(() => {
      rows[0] = 9;
    });
    _flushSync(() => {
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
    // 默认排序本身也是响应式数组需要覆盖的原生行为。
    // oxlint-disable-next-line typescript/require-array-sort-compare
    expect(rows.sort()).toBe(rows);
    _flushSync();
    expect(rows.splice(1, 1, 4, 5)).toEqual([2]);
    _flushSync();
    expect(seen).toEqual(['3,1,2', '1,2,3', '1,4,5,3']);
    const push = rows.push;
    expect(() => push(7)).toThrow(TypeError);
  });

  it('变更方法的内部 length 读取不会把 effect 变成循环', () => {
    const rows = reactive<number[]>([]);
    observe(() => {
      rows.push(1);
    });
    _flushSync(() => {
      rows.push(2);
    });
    expect(rows).toEqual([1, 2]);
  });

  it('sort 用户比较回调中的读取正常跟踪，内部索引读取不使排序自循环', () => {
    const rows = reactive([3, 1, 2]);
    const direction = state(1);
    let calls = 0;
    observe(() => {
      calls++;
      rows.sort((left, right) => direction.read() * (left - right));
    });
    expect(rows).toEqual([1, 2, 3]);
    expect(calls).toBe(1);
    _flushSync(() => direction.write(-1));
    expect(rows).toEqual([3, 2, 1]);
    expect(calls).toBe(2);
  });

  it('sort 对象字段读取可使排序更新，显式 untrack 仍能关闭跟踪', () => {
    const rows = reactive([
      { id: 'a', rank: 2 },
      { id: 'b', rank: 1 },
    ]);
    const a = rows[0]!;
    observe(() => {
      rows.sort((left, right) => left.rank - right.rank);
    });
    expect(rows.map((row) => row.id)).toEqual(['b', 'a']);
    _flushSync(() => {
      a.rank = 0;
    });
    expect(rows.map((row) => row.id)).toEqual(['a', 'b']);
    const direction = state(1);
    const numbers = reactive([2, 1]);
    let calls = 0;
    observe(() => {
      calls++;
      _untrack(() => numbers.sort((left, right) => direction.read() * (left - right)));
    });
    _flushSync(() => direction.write(-1));
    expect(calls).toBe(1);
    expect(numbers).toEqual([1, 2]);
  });

  it('替换数组方法会使调用方更新，不返回旧的缓存方法', () => {
    const rows = reactive([1, 2]);
    let calls = 0;
    observe(() => {
      calls++;
      rows.reverse();
    });
    const replacement = vi.fn(function (this: number[]) {
      return this;
    });
    _flushSync(() => {
      rows.reverse = replacement;
    });
    expect(calls).toBe(2);
    expect(replacement).toHaveBeenCalledTimes(1);
    expect(rows.reverse).toBe(replacement);
  });

  it('跨 realm 普通数组的变更方法不意外订阅内部 length', () => {
    const rows = reactive(runInNewContext('[]') as number[]);
    let calls = 0;
    observe(() => {
      calls++;
      // 有限写入也能识别错误重跑，避免回归用例本身制造无限循环。
      if (calls === 1) rows.push(1);
    });
    expect(calls).toBe(1);
    expect([...rows]).toEqual([1]);
  });

  it('Array 子类保持类身份与私有字段，整体替换仍可跟踪', () => {
    class Rows extends Array<number> {
      #label = 'rows';
      get label() {
        return this.#label;
      }
    }
    const rows = new Rows(1, 2);
    expect(reactive(rows)).toBe(rows);
    const model = state(rows);
    expect(model.read().label).toBe('rows');
    const seen: number[] = [];
    observe(() => {
      seen.push(model.read().length);
    });
    rows.push(3);
    _flushSync();
    expect(seen).toEqual([2]);
    _flushSync(() => model.write(new Rows(1, 2, 3, 4)));
    expect(seen).toEqual([2, 4]);
  });

  it('截短失败造成部分删除时依然通知真实状态', () => {
    const rows = reactive([1, 2, 3]);
    Object.defineProperty(rows, '1', { configurable: false });
    const seen: string[] = [];
    observe(() => {
      seen.push(`${rows.length}/${rows[2]}`);
    });
    expect(Reflect.set(rows, 'length', 0)).toBe(false);
    _flushSync();
    expect(seen).toEqual(['3/3', '2/undefined']);
  });
});
