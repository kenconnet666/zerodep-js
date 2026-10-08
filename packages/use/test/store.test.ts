import { afterEach, expect, it, vi } from 'vitest';
import * as core from 'zerodep-js';
import { _createRoot, _flushSync } from 'zerodep-js';
import { Scope, state, derived, defineComponent, element } from 'zerodep-js/internal';
import { renderToString } from 'zerodep-js-ssr';
import { _createStore, type StorePersistence, type StorageAdapter } from '../src/store.js';

class MemoryStorage implements StorageAdapter {
  data = new Map<string, string>();
  reads = 0;
  writes = 0;
  failRead = false;
  failWrite = false;
  failRemove = false;
  onRead?: () => void;
  onWrite?: () => void;
  onRemove?: () => void;
  getItem(key: string) {
    this.reads++;
    this.onRead?.();
    if (this.failRead) throw new Error('读取失败');
    return this.data.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.writes++;
    this.onWrite?.();
    if (this.failWrite) throw new Error('保存失败');
    this.data.set(key, value);
  }
  removeItem(key: string) {
    this.onRemove?.();
    if (this.failRemove) throw new Error('删除失败');
    this.data.delete(key);
  }
}
const stops: Array<() => void> = [];
function owned<T>(fn: () => T) {
  return _createRoot((dispose) => {
    stops.push(dispose);
    return { value: fn(), stop: dispose };
  });
}
const model = <T extends object>(value: T): T => state(value).read();
async function mount(handle: StorePersistence) {
  _flushSync();
  const result = await handle.restore();
  _flushSync();
  return result;
}
function gate<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
afterEach(() => {
  for (const stop of stops.splice(0).reverse()) stop();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it('必须先提供，向下共享同一对象，嵌套提供仅覆盖自己的子树', () => {
  const store = _createStore<{ count: number }>();
  expect(() => store.useStore()).toThrow('作用域');
  owned(() => {
    expect(() => store.useStore()).toThrow('尚未提供');
    const outer = model({ count: 1 });
    store.provideStore(outer);
    expect(() => store.provideStore(outer)).toThrow('重复提供');
    _createRoot(() => {
      expect(store.useStore()).toBe(outer);
      store.useStore().count = 2;
    });
    _createRoot(() => {
      const inner = model({ count: 9 });
      store.provideStore(inner);
      _createRoot(() => expect(store.useStore()).toBe(inner));
    });
    expect(store.useStore()).toBe(outer);
    expect(outer.count).toBe(2);
  });
  owned(() => expect(() => store.useStore()).toThrow('尚未提供'));
  expect(Object.hasOwn(core, '_createScope')).toBe(false);
});

it('子组件消失不销毁提供者，提供者销毁后不再自动保存', async () => {
  const store = _createStore<{ count: number }>(),
    storage = new MemoryStorage();
  const parent = owned(() => {
    const value = model({ count: 0 });
    const handle = store.provideStore(value, { persist: { key: 'counter', storage } });
    const child = new Scope();
    child.run(() => expect(store.useStore()).toBe(value));
    child.dispose();
    return { value, handle };
  });
  await mount(parent.value.handle);
  parent.value.value.count = 1;
  _flushSync();
  await vi.waitFor(() => expect(storage.data.get('counter')).toBe('{"count":1}'));
  await parent.value.handle.save();
  parent.stop();
  const writes = storage.writes;
  parent.value.value.count = 2;
  _flushSync();
  expect(await parent.value.handle.save()).toBe(false);
  expect(storage.writes).toBe(writes);
});

it('SSR 请求隔离，不访问存储，兄弟组件读取同一份注入', () => {
  const store = _createStore<{ count: number }>(),
    storage = new MemoryStorage();
  const Child = defineComponent(() => String(++store.useStore().count));
  const Parent = defineComponent(({ count }: { count: number }) => {
    store.provideStore(model({ count }), { persist: { key: 'counter', storage } });
    return [element(Child, {}), element(Child, {})];
  });
  const first = renderToString(Parent, { props: { count: 0 } });
  expect(first).toContain('1');
  expect(first).toContain('2');
  expect(renderToString(Parent, { props: { count: 0 } })).toBe(first);
  expect(storage.reads).toBe(0);
  expect(storage.writes).toBe(0);
});

it('pick 只保存所选字段，恢复保持对象身份并保留其他字段', async () => {
  const storage = new MemoryStorage();
  storage.data.set('prefs', '{"name":"保存值","session":"不应恢复","unknown":1}');
  const store = _createStore<{ name: string; session: string }>(),
    original = model({ name: '默认', session: '当前会话' });
  const { value: saved } = owned(() => {
    const h = store.provideStore(original, { persist: { key: 'prefs', storage, pick: ['name'] } });
    expect(store.useStore()).toBe(original);
    return h;
  });
  expect(original.name).toBe('默认');
  expect(storage.reads).toBe(0);
  await mount(saved);
  expect(original).toEqual({ name: '保存值', session: '当前会话' });
  expect(saved.ready).toBe(true);
  original.session = '改变但不保存';
  _flushSync();
  expect(storage.writes).toBe(0);
  original.name = '新值';
  _flushSync();
  await vi.waitFor(() => expect(storage.data.get('prefs')).toBe('{"name":"新值"}'));
  expect(await saved.clear()).toBe(true);
  _flushSync();
  expect(original.name).toBe('默认');
  expect(original.session).toBe('改变但不保存');
  expect(storage.data.has('prefs')).toBe(false);
});

it('部分字段补齐初值，额外字段不能修改原型', async () => {
  const storage = new MemoryStorage();
  storage.data.set('prefs', '{"name":"保存值","__proto__":{"injected":true}}');
  const value = model({ name: '默认', compact: false });
  await mount(
    owned(() =>
      _createStore<typeof value>().provideStore(value, { persist: { key: 'prefs', storage } }),
    ).value,
  );
  expect(value).toEqual({ name: '保存值', compact: false });
  expect(Object.hasOwn(value, '__proto__')).toBe(false);
  expect(Reflect.get(value, 'injected')).toBeUndefined();
});

it('异步读取期间的新编辑保留并保存，嵌套字段继续追踪', async () => {
  const delayed = gate<string | null>();
  const writes: string[] = [];
  const storage: StorageAdapter = {
    getItem: () => delayed.promise,
    setItem: (_, text) => {
      writes.push(text);
    },
    removeItem() {},
  };
  const value = model({ user: { name: '初值' } }),
    handle = owned(() =>
      _createStore<typeof value>().provideStore(value, { persist: { key: 'prefs', storage } }),
    ).value;
  _flushSync();
  const loading = handle.restore();
  value.user.name = '读取期间编辑';
  _flushSync();
  delayed.resolve('{"user":{"name":"旧值"}}');
  expect(await loading).toBe(true);
  _flushSync();
  await vi.waitFor(() => expect(writes.at(-1)).toBe('{"user":{"name":"读取期间编辑"}}'));
  expect(value.user.name).toBe('读取期间编辑');
  value.user.name = '再次编辑';
  _flushSync();
  await vi.waitFor(() => expect(writes.at(-1)).toBe('{"user":{"name":"再次编辑"}}'));
});

it('延时保存撤销旧计时器，卸载提交最后修改', async () => {
  vi.useFakeTimers();
  const storage = new MemoryStorage(),
    value = model({ count: 0 });
  const root = owned(() =>
    _createStore<typeof value>().provideStore(value, {
      persist: { key: 'counter', storage, writeDelay: 100 },
    }),
  );
  await mount(root.value);
  value.count = 1;
  _flushSync();
  value.count = 0;
  _flushSync();
  await vi.advanceTimersByTimeAsync(100);
  expect(storage.writes).toBe(0);
  value.count = 2;
  _flushSync();
  value.count = 3;
  _flushSync();
  root.stop();
  await vi.runAllTimersAsync();
  expect(storage.data.get('counter')).toBe('{"count":3}');
  expect(storage.writes).toBe(1);
});

it('损坏数据不会自动覆盖，重新读取、保存和删除失败可恢复', async () => {
  const storage = new MemoryStorage();
  storage.data.set('prefs', '{bad');
  const value = model({ count: 0 });
  const handle = owned(() =>
    _createStore<typeof value>().provideStore(value, { persist: { key: 'prefs', storage } }),
  ).value;
  expect(await mount(handle)).toBe(false);
  expect(handle.error).toBeDefined();
  value.count = 2;
  _flushSync();
  expect(storage.data.get('prefs')).toBe('{bad');
  storage.data.set('prefs', '{"count":3}');
  expect(await handle.restore()).toBe(true);
  expect(value.count).toBe(3);
  storage.failWrite = true;
  value.count = 4;
  expect(await handle.save()).toBe(false);
  expect(String(handle.error)).toContain('保存失败');
  storage.failWrite = false;
  expect(await handle.save()).toBe(true);
  expect(handle.error).toBeUndefined();
  storage.failRemove = true;
  expect(await handle.clear()).toBe(false);
  expect(value.count).toBe(4);
  storage.failRemove = false;
  expect(await handle.clear()).toBe(true);
  expect(value.count).toBe(0);
});

it('校验拒绝非法数据，错误不会覆盖本地或存储', async () => {
  const storage = new MemoryStorage();
  storage.data.set('prefs', '{"count":"错误"}');
  const value = model({ count: 0 });
  const handle = owned(() =>
    _createStore<typeof value>().provideStore(value, {
      persist: {
        key: 'prefs',
        storage,
        validate(data) {
          if (!data || typeof data !== 'object' || typeof Reflect.get(data, 'count') !== 'number')
            throw new Error('count 无效');
          return { count: Reflect.get(data, 'count') as number };
        },
      },
    }),
  ).value;
  expect(await mount(handle)).toBe(false);
  expect(String(handle.error)).toContain('count 无效');
  expect(storage.writes).toBe(0);
  for (const invalid of ['null', '[]', '1']) {
    storage.data.set('prefs', invalid);
    expect(await handle.restore()).toBe(false);
    expect(storage.data.get('prefs')).toBe(invalid);
  }
});

it.each(['read', 'validate', 'write', 'remove'] as const)(
  '%s 回调销毁提供者后不继续恢复或连接',
  async (phase) => {
    const storage = new MemoryStorage();
    storage.data.set('prefs', '{"count":1}');
    const value = model({ count: 0 });
    let stop = () => {};
    let armed = false;
    const dispose = () => {
      if (armed) stop();
    };
    if (phase === 'read') storage.onRead = dispose;
    if (phase === 'write') storage.onWrite = dispose;
    if (phase === 'remove') storage.onRemove = dispose;
    const root = owned(() =>
      _createStore<typeof value>().provideStore(value, {
        persist: {
          key: 'prefs',
          storage,
          validate(data) {
            if (phase === 'validate') dispose();
            return data as { count: number };
          },
        },
      }),
    );
    stop = root.stop;
    if (phase === 'read' || phase === 'validate') {
      armed = true;
      await mount(root.value);
      expect(value.count).toBe(0);
    } else {
      await mount(root.value);
      value.count = 2;
      armed = true;
      if (phase === 'write') await root.value.save();
      else await root.value.clear();
    }
    const reads = storage.reads,
      writes = storage.writes;
    expect(await root.value.save()).toBe(false);
    expect(await root.value.restore()).toBe(false);
    expect(await root.value.clear()).toBe(false);
    value.count = 3;
    _flushSync();
    expect(storage.reads).toBe(reads);
    expect(storage.writes).toBe(writes);
  },
);

it('同页提供者同步保存与清除，销毁解除浏览器监听', async () => {
  const target = new EventTarget();
  vi.stubGlobal('window', target);
  const add = vi.spyOn(target, 'addEventListener'),
    remove = vi.spyOn(target, 'removeEventListener');
  const storage = new MemoryStorage();
  const create = () =>
    owned(() => {
      const value = model({ count: 0 });
      const handle = _createStore<typeof value>().provideStore(value, {
        persist: { key: 'counter', storage },
      });
      return { value, handle };
    });
  const left = create(),
    right = create();
  await mount(left.value.handle);
  await mount(right.value.handle);
  left.value.value.count = 2;
  expect(await left.value.handle.save()).toBe(true);
  expect(right.value.value.count).toBe(2);
  expect(await right.value.handle.clear()).toBe(true);
  _flushSync();
  expect(left.value.value.count).toBe(0);
  expect(storage.data.has('counter')).toBe(false);
  left.stop();
  right.stop();
  for (const [name, listener] of add.mock.calls)
    expect(remove.mock.calls.some((call) => call[0] === name && call[1] === listener)).toBe(true);
});

it('session 与空 pick 遵循配置，挂载前不访问存储', async () => {
  const local = new MemoryStorage(),
    session = new MemoryStorage();
  vi.stubGlobal(
    'window',
    Object.assign(new EventTarget(), { localStorage: local, sessionStorage: session }),
  );
  const value = model({ count: 0 });
  const handle = owned(() =>
    _createStore<typeof value>().provideStore(value, {
      persist: { key: 'counter', storage: 'session', pick: [] },
    }),
  ).value;
  const beforeMount = handle.save();
  expect(session.reads).toBe(0);
  expect(await beforeMount).toBe(false);
  await mount(handle);
  value.count = 1;
  _flushSync();
  expect(session.writes).toBe(0);
  expect(await handle.save()).toBe(true);
  expect(session.data.get('counter')).toBe('{}');
  expect(local.writes).toBe(0);
});

it('异步写入按顺序执行，较早的保存不能最后覆盖新值', async () => {
  const first = gate<void>(),
    started = gate<void>();
  const events: string[] = [];
  const storage: StorageAdapter = {
    getItem: () => null,
    async setItem(_, text) {
      events.push('start:' + text);
      if (text === '{"count":1}') {
        started.resolve();
        await first.promise;
      }
      events.push('end:' + text);
    },
    removeItem() {},
  };
  const value = model({ count: 0 }),
    handle = owned(() =>
      _createStore<typeof value>().provideStore(value, { persist: { key: 'counter', storage } }),
    ).value;
  await mount(handle);
  value.count = 1;
  const one = handle.save();
  await started.promise;
  value.count = 2;
  const two = handle.save();
  expect(events).toEqual(['start:{"count":1}']);
  first.resolve();
  await one;
  expect(await two).toBe(true);
  expect(events).toEqual([
    'start:{"count":1}',
    'end:{"count":1}',
    'start:{"count":2}',
    'end:{"count":2}',
  ]);
});

it('异步删除期间继续编辑，不被迟到的清除结果覆盖', async () => {
  const deleted = gate<void>();
  const writes: string[] = [];
  const storage: StorageAdapter = {
    getItem: () => '{"count":1}',
    setItem(_, text) {
      writes.push(text);
    },
    removeItem: () => deleted.promise,
  };
  const value = model({ count: 0 }),
    handle = owned(() =>
      _createStore<typeof value>().provideStore(value, { persist: { key: 'counter', storage } }),
    ).value;
  await mount(handle);
  const clear = handle.clear();
  value.count = 2;
  _flushSync();
  deleted.resolve();
  expect(await clear).toBe(true);
  expect(value.count).toBe(2);
  await vi.waitFor(() => {
    _flushSync();
    expect(writes.at(-1)).toBe('{"count":2}');
  });
});

it('读取失败后可重试，提供者销毁后异步响应不再应用', async () => {
  const loaded = gate<string | null>();
  const storage: StorageAdapter = { getItem: () => loaded.promise, setItem() {}, removeItem() {} };
  const value = model({ count: 0 });
  const root = owned(() =>
    _createStore<typeof value>().provideStore(value, { persist: { key: 'counter', storage } }),
  );
  _flushSync();
  const pending = root.value.restore();
  root.stop();
  loaded.resolve('{"count":9}');
  expect(await pending).toBe(false);
  expect(value.count).toBe(0);
});

it('派生中不能触发持久化操作，无法序列化的编辑可明确清除', async () => {
  const storage = new MemoryStorage();
  const value = model<{ count: unknown }>({ count: 0 });
  const handle = owned(() =>
    _createStore<typeof value>().provideStore(value, { persist: { key: 'prefs', storage } }),
  ).value;
  await mount(handle);
  for (const method of [handle.save, handle.restore, handle.clear]) {
    expect(() => derived(method).read()).toThrow('纯派生');
  }
  value.count = 1n;
  expect(() => _flushSync()).not.toThrow();
  expect(handle.error).toBeDefined();
  expect(await handle.clear()).toBe(true);
  expect(value.count).toBe(0);
});

it('自定义订阅清理失败仍解除 pagehide 并允许重新订阅', async () => {
  const target = new EventTarget();
  vi.stubGlobal('window', target);
  const add = vi.spyOn(target, 'addEventListener'),
    remove = vi.spyOn(target, 'removeEventListener');
  const storage = new MemoryStorage();
  let subscriptions = 0;
  const adapter: StorageAdapter = {
    getItem: (key) => storage.getItem(key),
    setItem: (key, value) => storage.setItem(key, value),
    removeItem: (key) => storage.removeItem(key),
    subscribe() {
      subscriptions++;
      return () => {
        throw new Error('订阅清理失败');
      };
    },
  };
  const create = () =>
    owned(() =>
      _createStore<{ count: number }>().provideStore(model({ count: 0 }), {
        persist: { key: 'prefs', storage: adapter },
      }),
    );
  const first = create();
  await mount(first.value);
  expect(first.stop).toThrow('订阅清理失败');
  const second = create();
  await mount(second.value);
  expect(subscriptions).toBe(2);
  expect(second.stop).toThrow('订阅清理失败');
  for (const [name, listener] of add.mock.calls)
    expect(remove.mock.calls.some((call) => call[0] === name && call[1] === listener)).toBe(true);
});

it('异步适配器读取拒绝后可重试', async () => {
  let failing = true;
  const adapter: StorageAdapter = {
    async getItem() {
      if (failing) throw new Error('后端暂不可用');
      return '{"count":8}';
    },
    async setItem() {},
    async removeItem() {},
  };
  const value = model({ count: 0 });
  const handle = owned(() =>
    _createStore<typeof value>().provideStore(value, {
      persist: { key: 'prefs', storage: adapter },
    }),
  ).value;
  expect(await mount(handle)).toBe(false);
  expect(String(handle.error)).toContain('后端暂不可用');
  failing = false;
  expect(await handle.restore()).toBe(true);
  expect(value.count).toBe(8);
  expect(handle.error).toBeUndefined();
});
