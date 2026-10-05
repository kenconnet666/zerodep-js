import { afterEach, expect, it, vi } from 'vitest';
import {
  _persistLocal,
  _persistSession,
  type Persistence,
  type StorageLike,
} from '../src/storage/persist.js';
import { _createRoot, _flushSync } from 'zerodep-js';
import { Scope, source, state } from 'zerodep-js/internal';

const reactive = <T>(value: T): T => state(value).read();

class MemoryStorage implements StorageLike {
  data = new Map<string, string>();
  writes = 0;
  reads = 0;
  failRead = false;
  failWrite = false;
  failRemove = false;
  getItem(key: string) {
    this.reads++;
    if (this.failRead) throw new Error('禁止读取');
    return this.data.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    if (this.failWrite) throw new Error('空间不足');
    this.writes++;
    this.data.set(key, value);
  }
  removeItem(key: string) {
    if (this.failRemove) throw new Error('禁止删除');
    this.data.delete(key);
  }
}
const saved = (value: unknown, version = 1) =>
  JSON.stringify({ format: 'zerodep-js-storage', version, value });
const value = (storage: MemoryStorage, key = 'prefs') => JSON.parse(storage.data.get(key)!).value;
const cleanups: Array<() => void> = [];
function owned<T>(setup: () => T): { result: T; stop: () => void } {
  let result!: T;
  const stop = _createRoot((dispose) => {
    result = setup();
    return dispose;
  });
  cleanups.push(stop);
  return { result, stop };
}
afterEach(() => {
  for (const stop of cleanups.splice(0).reverse()) stop();
  vi.useRealTimers();
});

it('先恢复已有值，保持根对象身份，深层编辑按批次写入', () => {
  const storage = new MemoryStorage();
  storage.data.set('prefs', saved({ nested: { n: 3 }, extra: true }));
  const model = reactive({ nested: { n: 0 }, old: true } as {
    nested: { n: number };
    old?: boolean;
    extra?: boolean;
  });
  const { result } = owned(() => _persistLocal('prefs', model, { storage }));
  expect(result.ready).toBe(false);
  expect(storage.reads).toBe(0);
  _flushSync();
  expect(model).toEqual({ nested: { n: 3 }, extra: true });
  expect(result.ready).toBe(true);
  expect(storage.writes).toBe(0);
  model.nested.n = 4;
  model.nested.n = 5;
  _flushSync();
  expect(value(storage).nested.n).toBe(5);
  expect(storage.writes).toBe(1);
});

it('默认值不主动落盘，恢复前的新编辑优先', () => {
  const storage = new MemoryStorage();
  const initial = reactive({ n: 0 });
  owned(() => _persistLocal('missing', initial, { storage }));
  _flushSync();
  expect(storage.data.has('missing')).toBe(false);
  storage.data.set('prefs', saved({ n: 8 }));
  const edited = reactive({ n: 0 });
  owned(() => _persistLocal('prefs', edited, { storage }));
  edited.n = 2;
  _flushSync();
  expect(edited.n).toBe(2);
  expect(value(storage)).toEqual({ n: 2 });
});

it('read/write 绑定支持普通变量整体替换和动态键', () => {
  const storage = new MemoryStorage();
  storage.data.set('a', saved('甲'));
  storage.data.set('b', saved('乙'));
  const key = source('a');
  const model = source('默认');
  const { result } = owned(() =>
    _persistLocal(
      () => key.read(),
      {
        read: () => model.read(),
        write: (next) => {
          model.write(next);
        },
      },
      { storage },
    ),
  );
  _flushSync();
  expect(model.read()).toBe('甲');
  model.write('更新甲');
  _flushSync();
  key.write('b');
  _flushSync();
  expect(model.read()).toBe('乙');
  expect(value(storage, 'a')).toBe('更新甲');
  expect(result.remove()).toBe(true);
  _flushSync();
  expect(model.read()).toBe('默认');
  expect(storage.data.has('b')).toBe(false);
  expect(result.reset()).toBe(true);
  expect(value(storage, 'b')).toBe('默认');
});

it('同页多个实例同步而不发生写入循环，停止后不再接收', () => {
  const storage = new MemoryStorage();
  const first = reactive({ n: 0 });
  const second = reactive({ n: 0 });
  owned(() => _persistLocal('prefs', first, { storage }));
  const { result } = owned(() => _persistLocal('prefs', second, { storage }));
  _flushSync();
  first.n = 1;
  _flushSync();
  expect(second.n).toBe(1);
  expect(storage.writes).toBe(1);
  result.stop();
  first.n = 2;
  _flushSync();
  expect(second.n).toBe(1);
  expect(result.status).toBe('stopped');
  expect(result.flush()).toBe(false);
});

it('延时写入、手动提交和卸载提交最后一轮尚未刷新状态', () => {
  vi.useFakeTimers();
  const storage = new MemoryStorage();
  const model = reactive({ n: 0 });
  const { result, stop } = owned(() => _persistLocal('prefs', model, { storage, writeDelay: 100 }));
  _flushSync();
  model.n = 1;
  _flushSync();
  model.n = 2;
  _flushSync();
  vi.advanceTimersByTime(99);
  expect(storage.writes).toBe(0);
  expect(result.flush()).toBe(true);
  expect(value(storage).n).toBe(2);
  model.n = 3; // 还没等 effect 刷新就卸载。
  stop();
  expect(value(storage).n).toBe(3);
  vi.advanceTimersByTime(1000);
  expect(storage.writes).toBe(2);
});

it('切换键先提交原键的排队快照，不把新值写入旧键', () => {
  vi.useFakeTimers();
  const storage = new MemoryStorage();
  storage.data.set('b', saved({ n: 8 }));
  const key = source('a');
  const model = reactive({ n: 0 });
  owned(() => _persistLocal(() => key.read(), model, { storage, writeDelay: 100 }));
  _flushSync();
  model.n = 2;
  _flushSync();
  key.write('b');
  _flushSync();
  expect(value(storage, 'a').n).toBe(2);
  expect(model.n).toBe(8);
  vi.advanceTimersByTime(1000);
  expect(value(storage, 'b').n).toBe(8);
});

it('暂停不写入，恢复后订阅仍生效', () => {
  const storage = new MemoryStorage();
  const model = reactive({ n: 0 });
  const { result } = owned(() => _persistLocal('prefs', model, { storage }));
  _flushSync();
  result.pause();
  model.n = 1;
  _flushSync();
  model.n = 2;
  _flushSync();
  expect(result.status).toBe('paused');
  expect(result.flush()).toBe(false);
  expect(storage.writes).toBe(0);
  result.resume();
  _flushSync();
  expect(value(storage).n).toBe(2);
  model.n = 3;
  _flushSync();
  expect(value(storage).n).toBe(3);
});

it('损坏数据不会被默认值覆盖，显式删除或重置才能清除', () => {
  const storage = new MemoryStorage();
  storage.data.set('prefs', '{bad');
  const model = reactive({ n: 0 });
  const { result } = owned(() => _persistLocal('prefs', model, { storage }));
  _flushSync();
  expect(result.ready).toBe(false);
  expect(result.status).toBe('error');
  model.n = 1;
  _flushSync();
  expect(storage.data.get('prefs')).toBe('{bad');
  expect(result.remove()).toBe(true);
  _flushSync();
  expect(storage.data.has('prefs')).toBe(false);
  model.n = 2;
  _flushSync();
  expect(value(storage)).toEqual({ n: 2 });
});

it('迁移和校验在恢复前完成，未知更高版本禁止覆盖', () => {
  const storage = new MemoryStorage();
  storage.data.set('prefs', saved({ old: 3 }, 1));
  const model = reactive({ n: 0 });
  const { result } = owned(() =>
    _persistLocal('prefs', model, {
      storage,
      version: 2,
      migrate: (data, previous) => {
        expect(previous).toBe(1);
        return { n: (data as { old: number }).old };
      },
      validate: (data) => {
        if (typeof (data as { n?: unknown }).n !== 'number') throw new Error('类型错误');
        return data as { n: number };
      },
    }),
  );
  _flushSync();
  expect(model.n).toBe(3);
  expect(JSON.parse(storage.data.get('prefs')!).version).toBe(2);
  result.stop();
  const old = owned(() => _persistLocal('prefs', reactive({ n: 0 }), { storage }));
  _flushSync();
  expect(old.result.ready).toBe(false);
  expect(String(old.result.error)).toContain('版本比当前应用更新');
  expect(JSON.parse(storage.data.get('prefs')!).version).toBe(2);
});

it('旧 JSON 需要明确迁移，不假定它已符合当前数据契约', () => {
  const storage = new MemoryStorage();
  storage.data.set('prefs', JSON.stringify({ n: 3 }));
  const model = reactive({ n: 0 });
  owned(() =>
    _persistLocal('prefs', model, {
      storage,
      migrate: (value, version) => {
        expect(version).toBe(0);
        return value;
      },
    }),
  );
  _flushSync();
  expect(model.n).toBe(3);
  expect(JSON.parse(storage.data.get('prefs')!).format).toBe('zerodep-js-storage');
});

it('读取失败后的新编辑不被重试恢复覆盖，写入失败可明确重试', () => {
  const storage = new MemoryStorage();
  storage.data.set('prefs', saved({ n: 9 }));
  storage.failRead = true;
  const model = reactive({ n: 0 });
  const { result } = owned(() => _persistLocal('prefs', model, { storage }));
  _flushSync();
  model.n = 1;
  _flushSync();
  storage.failRead = false;
  expect(result.retry()).toBe(true);
  expect(model.n).toBe(1);
  expect(value(storage).n).toBe(1);
  storage.failWrite = true;
  model.n = 2;
  _flushSync();
  expect(result.ready).toBe(true);
  expect(String(result.error)).toContain('空间不足');
  expect(value(storage).n).toBe(1);
  storage.failWrite = false;
  expect(result.retry()).toBe(true);
  expect(result.error).toBeUndefined();
  expect(value(storage).n).toBe(2);
});

it('外部 storage 事件、clear 和 pagehide，释放最后监听', () => {
  const storage = new MemoryStorage();
  const target = new EventTarget();
  const add = vi.spyOn(target, 'addEventListener');
  const remove = vi.spyOn(target, 'removeEventListener');
  const model = reactive({ n: 0 });
  const { stop } = owned(() =>
    _persistLocal('prefs', model, { storage, window: target as Window, writeDelay: 100 }),
  );
  _flushSync();
  const event = new Event('storage');
  Object.defineProperties(event, {
    storageArea: { value: storage },
    key: { value: 'prefs' },
    newValue: { value: saved({ n: 4 }) },
  });
  storage.data.set('prefs', saved({ n: 4 }));
  target.dispatchEvent(event);
  _flushSync();
  expect(model.n).toBe(4);
  expect(storage.writes).toBe(0);
  model.n = 5;
  target.dispatchEvent(new Event('pagehide'));
  expect(value(storage).n).toBe(5);
  storage.data.clear();
  const cleared = new Event('storage');
  Object.defineProperties(cleared, {
    storageArea: { value: storage },
    key: { value: null },
    newValue: { value: null },
  });
  target.dispatchEvent(cleared);
  _flushSync();
  expect(model.n).toBe(0);
  expect(storage.data.size).toBe(0);
  stop();
  expect(remove.mock.calls.map((call) => call[0]).sort()).toEqual(
    add.mock.calls.map((call) => call[0]).sort(),
  );
});

it('sessionStorage 使用自己的默认宿主，SSR 完全不访问宿主', () => {
  const local = new MemoryStorage();
  const session = new MemoryStorage();
  const target = Object.assign(new EventTarget(), { localStorage: local, sessionStorage: session });
  const model = reactive({ n: 0 });
  owned(() => _persistSession('prefs', model, { window: target as unknown as Window }));
  _flushSync();
  model.n = 2;
  _flushSync();
  expect(session.data.has('prefs')).toBe(true);
  expect(local.data.size).toBe(0);
  const server = new Scope(null);
  server.server = true;
  const resolve = vi.fn(() => local);
  let handle!: Persistence;
  server.run(() => {
    handle = _persistLocal('prefs', reactive({ n: 0 }), { storage: resolve });
  });
  _flushSync();
  expect(resolve).not.toHaveBeenCalled();
  expect(handle.ready).toBe(false);
  server.dispose();
  expect(resolve).not.toHaveBeenCalled();
});

it('数组保持根身份，特殊键不会变成原型；验证错误不产生部分写入', () => {
  const storage = new MemoryStorage();
  storage.data.set('array', saved([{ n: 2 }]));
  const array = reactive([{ n: 0 }, { n: 1 }]);
  owned(() => _persistLocal('array', array, { storage }));
  _flushSync();
  expect(array).toEqual([{ n: 2 }]);
  storage.data.set('prefs', saved(JSON.parse('{"__proto__":{"safe":true},"n":1}')));
  const model = reactive({ n: 0 });
  owned(() => _persistLocal('prefs', model, { storage }));
  _flushSync();
  expect(Object.hasOwn(model, '__proto__')).toBe(true);
  expect(Object.getPrototypeOf(model)).toBe(Object.prototype);
  expect(() => _persistLocal('outside', model, { storage })).toThrow('作用域');
});

it('错误回调失败不影响其他订阅，错误仍可观察', () => {
  const storage = new MemoryStorage();
  storage.failWrite = true;
  const model = reactive({ n: 0 });
  const { result } = owned(() =>
    _persistLocal('prefs', model, {
      storage,
      onError() {
        throw new Error('处理失败');
      },
    }),
  );
  _flushSync();
  model.n = 1;
  _flushSync();
  expect(result.error).toBeInstanceOf(AggregateError);
});

it('挂载前停止不会读取或写入，挂载前暂停可正常恢复', () => {
  const storage = new MemoryStorage();
  const model = reactive({ n: 0 });
  const first = owned(() => _persistLocal('prefs', model, { storage }));
  first.stop();
  _flushSync();
  expect(storage.reads).toBe(0);
  const next = owned(() => _persistLocal('prefs', model, { storage }));
  next.result.pause();
  _flushSync();
  expect(storage.reads).toBe(0);
  next.result.resume();
  _flushSync();
  model.n = 1;
  _flushSync();
  expect(value(storage).n).toBe(1);
});

it('不可用宿主可以重试，未使用的键不影响活跃键', () => {
  let available: MemoryStorage | undefined;
  const model = reactive({ n: 0 });
  const { result } = owned(() => _persistLocal('prefs', model, { storage: () => available }));
  _flushSync();
  expect(result.ready).toBe(false);
  model.n = 3;
  _flushSync();
  available = new MemoryStorage();
  expect(result.retry()).toBe(true);
  expect(value(available).n).toBe(3);
});

it('恢复前校验失败和不可替换字段不产生部分状态', () => {
  const storage = new MemoryStorage();
  storage.data.set('prefs', saved({ n: 2, locked: 3 }));
  const raw = { n: 0, locked: 1 };
  Object.defineProperty(raw, 'locked', {
    value: 1,
    configurable: false,
    writable: true,
    enumerable: true,
  });
  const model = reactive(raw);
  const { result } = owned(() => _persistLocal('prefs', model, { storage }));
  _flushSync();
  expect(result.ready).toBe(false);
  expect(model.n).toBe(0);
  expect(model.locked).toBe(1);
  expect(storage.writes).toBe(0);
});

it('暂停中明确 reset 的写入意图不会在恢复时丢失', () => {
  const storage = new MemoryStorage();
  const model = reactive({ n: 0 });
  const { result } = owned(() => _persistLocal('prefs', model, { storage }));
  _flushSync();
  result.pause();
  expect(result.reset()).toBe(true);
  expect(storage.data.size).toBe(0);
  result.resume();
  _flushSync();
  expect(value(storage)).toEqual({ n: 0 });
});

it('新键 reset 仍提交旧键待写快照', () => {
  vi.useFakeTimers();
  const storage = new MemoryStorage();
  const model = reactive({ n: 0 });
  const key = source('a');
  const { result } = owned(() =>
    _persistLocal(() => key.read(), model, { storage, writeDelay: 100 }),
  );
  _flushSync();
  model.n = 2;
  _flushSync();
  key.write('b');
  expect(result.reset()).toBe(true);
  expect(value(storage, 'a').n).toBe(2);
  expect(value(storage, 'b').n).toBe(0);
});

it('异步迁移明确报错，不能把 Promise 当空对象持久化', () => {
  const storage = new MemoryStorage();
  storage.data.set('prefs', saved({ n: 1 }));
  const model = reactive({ n: 0 });
  const { result } = owned(() =>
    _persistLocal('prefs', model, {
      storage,
      version: 2,
      migrate: () => Promise.resolve({ n: 2 }),
    }),
  );
  _flushSync();
  expect(String(result.error)).toContain('同步');
  expect(model.n).toBe(0);
  expect(storage.writes).toBe(0);
});
