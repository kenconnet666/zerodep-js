import {
  _batch,
  _effect,
  _getAbortSignal,
  _onCleanup,
  _onMount,
  _snapshot,
  _untrack,
  type Cleanup,
} from 'zerodep-js';
import { assertCanWrite, source, synchronous } from 'zerodep-js/internal';
import { storageOperation, storageSubscription, type StorageAdapter } from './hub.js';

export interface StorePersistOptions<T extends object> {
  key: string;
  storage?: 'local' | 'session' | StorageAdapter;
  /** 只选择顶层字段；不解释点号路径。 */
  pick?: readonly Extract<keyof T, string>[];
  validate?: (value: unknown) => Partial<T>;
  writeDelay?: number;
}
export interface StorePersistence {
  readonly ready: boolean;
  readonly error: unknown;
  /** 等待当前所选字段保存完成；失败记录到 error，不产生未处理的拒绝。 */
  save(this: void): Promise<boolean>;
  /** 重新读取；初次恢复仍在进行时复用该请求，不覆盖期间的新编辑。 */
  restore(this: void): Promise<boolean>;
  /** 清除保存内容，将所选字段恢复为提供时的初值；期间的新编辑仍保留。 */
  clear(this: void): Promise<boolean>;
}
const object = (value: unknown): value is object =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** 由提供者持有订阅；不在 SSR 或首次 DOM 接管完成前访问存储。 */
export function persistStore<T extends object>(
  value: T,
  options: StorePersistOptions<T>,
): StorePersistence {
  _getAbortSignal();
  if (Array.isArray(value)) throw new TypeError('持久化需要对象状态，请将数组放在字段中。');
  const key = options.key,
    delay = options.writeDelay ?? 0;
  if (typeof key !== 'string' || !key) throw new TypeError('持久化需要非空 key。');
  if (!Number.isFinite(delay) || delay < 0) throw new TypeError('writeDelay 必须为非负有限数值。');
  const keys = [...new Set(options.pick ?? Object.keys(value))];
  for (const field of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(value, field);
    if (!descriptor || !('value' in descriptor) || !descriptor.writable)
      throw new TypeError(`持久化字段 ${field} 必须是状态自身的可写数据字段。`);
  }
  const select = (data: object) => {
    const result: Record<string, unknown> = {};
    for (const field of keys)
      Object.defineProperty(result, field, {
        value: Reflect.get(data, field),
        enumerable: true,
        configurable: true,
        writable: true,
      });
    return result;
  };
  const initial = _untrack(() => _snapshot(select(value)));
  const encode = () => JSON.stringify(select(value));
  const initialText = _untrack(encode);
  const mounted = source(false),
    available = source(false),
    failure = source<unknown>(undefined);
  let ready = false,
    stopped = false,
    stopping = false,
    attempted = false;
  let callbackDepth = 0,
    epoch = 0,
    writes = 0;
  let saved: string | undefined, requested: string | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let storage: StorageAdapter | undefined, target: Window | undefined;
  let subscription: ReturnType<typeof storageSubscription> | undefined;
  let restoring: { epoch: number; promise: Promise<boolean> } | undefined;
  let stopWatch: Cleanup = () => {};
  function call<R>(fn: () => R): R {
    callbackDepth++;
    try {
      return fn();
    } finally {
      callbackDepth--;
    }
  }
  function publish(nextReady: boolean, error?: unknown) {
    if (stopped) return;
    ready = nextReady;
    available.write(ready);
    failure.write(error);
  }
  function fail(error: unknown, nextReady = ready) {
    publish(nextReady, error ?? new Error('存储操作失败。'));
  }
  function cancelTimer() {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  }
  function apply(data: object) {
    const defaults = _snapshot(initial);
    _batch(() => {
      for (const field of keys) {
        if (stopped) return;
        const next = Object.hasOwn(data, field) ? Reflect.get(data, field) : defaults[field];
        if (!call(() => Reflect.set(value, field, next)))
          throw new TypeError(`无法恢复 store 字段 ${field}。`);
      }
    });
  }
  function receive(text: string | null, preserve: boolean): boolean {
    try {
      let data: unknown = text === null ? _snapshot(initial) : JSON.parse(text);
      if (text !== null && options.validate)
        data = call(() => synchronous(options.validate!(data), 'store 校验必须同步完成。'));
      if (stopped) return false;
      if (!object(data)) throw new TypeError('保存内容必须是 JSON 对象。');
      if (!preserve) apply(_snapshot(data));
      if (stopped) return false;
      saved = preserve ? (text ?? initialText) : encode();
      requested = undefined;
      publish(true);
      return true;
    } catch (error) {
      fail(error, false);
      return false;
    }
  }
  const pagehide = () => {
    flushFinal();
  };
  function connect(): boolean {
    if (storage) return true;
    try {
      target = typeof window === 'undefined' ? undefined : window;
      const selected = options.storage ?? 'local';
      storage = call(() =>
        typeof selected === 'object'
          ? selected
          : target?.[selected === 'session' ? 'sessionStorage' : 'localStorage'],
      );
      if (stopped) return false;
      if (!storage) throw new Error('当前环境无法访问存储。');
      subscription = storageSubscription(storage, target, (changed, text) => {
        if (stopped || (changed !== null && changed !== key)) return;
        if (changed === null) {
          void restore(false);
          return;
        }
        _untrack(() => {
          try {
            const preserve = encode() !== (saved ?? initialText);
            epoch++;
            cancelTimer();
            if (receive(text, preserve) && preserve) schedule(encode());
          } catch (error) {
            fail(error, false);
          }
        });
      });
      if (stopped) {
        subscription.dispose();
        subscription = undefined;
        storage = undefined;
        return false;
      }
      target?.addEventListener('pagehide', pagehide);
      return true;
    } catch (error) {
      subscription?.dispose();
      subscription = undefined;
      storage = undefined;
      fail(error, false);
      return false;
    }
  }
  function write(text: string, finish = false): Promise<boolean> {
    if (!storage) return Promise.resolve(false);
    const backend = storage,
      token = epoch,
      notify = subscription?.notify;
    requested = text;
    writes++;
    return storageOperation(backend, async () => {
      if (token !== epoch || (stopped && !finish)) return false;
      try {
        await call(() => backend.setItem(key, text));
        if (token !== epoch || (stopped && !finish)) return false;
        saved = text;
        publish(true);
        notify?.(key, text);
        return true;
      } catch (error) {
        fail(error);
        return false;
      }
    }).finally(() => {
      writes--;
    });
  }
  function schedule(text: string) {
    if (!ready || stopped) return;
    if (!writes && text === saved) {
      cancelTimer();
      requested = undefined;
      return;
    }
    if (text === requested) return;
    cancelTimer();
    requested = text;
    if (!delay) void write(text);
    else
      timer = setTimeout(() => {
        timer = undefined;
        if (!stopped) void write(text);
      }, delay);
  }
  function restore(first: boolean): Promise<boolean> {
    if (stopped || !mounted.read()) return Promise.resolve(false);
    if (restoring?.epoch === epoch) return restoring.promise;
    attempted = true;
    if (!connect()) return Promise.resolve(false);
    const backend = storage!,
      token = ++epoch;
    cancelTimer();
    publish(false);
    let before: string;
    try {
      before = first ? initialText : _untrack(encode);
    } catch (error) {
      fail(error, false);
      return Promise.resolve(false);
    }
    const promise = storageOperation(backend, async () => {
      if (stopped || token !== epoch) return false;
      try {
        const text = await call(() => backend.getItem(key));
        if (stopped || token !== epoch) return false;
        if (text !== null && typeof text !== 'string')
          throw new TypeError('getItem 必须返回文本或 null。');
        return _untrack(() => receive(text, encode() !== before));
      } catch (error) {
        fail(error, false);
        return false;
      }
    });
    restoring = { epoch: token, promise };
    void promise.finally(() => {
      if (restoring?.promise === promise) restoring = undefined;
    });
    return promise;
  }
  function flushFinal() {
    if (!ready || !mounted.read() || stopped || callbackDepth) return;
    try {
      const text = _untrack(encode);
      if (text !== saved || writes) void write(text, true);
    } catch (error) {
      fail(error);
    }
  }
  const handle: StorePersistence = Object.freeze({
    get ready() {
      return available.read();
    },
    get error() {
      return failure.read();
    },
    save: () =>
      _untrack(() => {
        assertCanWrite();
        if (stopped || !mounted.read() || !connect()) return Promise.resolve(false);
        epoch++;
        cancelTimer();
        try {
          return write(encode());
        } catch (error) {
          fail(error);
          return Promise.resolve(false);
        }
      }),
    restore: () =>
      _untrack(() => {
        assertCanWrite();
        return restore(false);
      }),
    clear: () =>
      _untrack(() => {
        assertCanWrite();
        if (stopped || !mounted.read() || !connect()) return Promise.resolve(false);
        const backend = storage!,
          token = ++epoch;
        cancelTimer();
        let before: string | undefined;
        try {
          before = encode();
        } catch {
          /* 显式清除也可恢复无法序列化的当前值。 */
        }
        return storageOperation(backend, async () => {
          if (stopped || token !== epoch) return false;
          try {
            await call(() => backend.removeItem(key));
            if (stopped || token !== epoch) return false;
            const preserve = before !== undefined && _untrack(encode) !== before;
            if (!receive(null, preserve)) return false;
            subscription?.notify(key, null);
            if (preserve) schedule(_untrack(encode));
            return true;
          } catch (error) {
            fail(error);
            return false;
          }
        });
      }),
  });
  _onCleanup(() => {
    if (stopped || stopping) return;
    stopping = true;
    epoch++;
    cancelTimer();
    try {
      flushFinal();
    } finally {
      stopped = true;
      stopWatch();
      try {
        subscription?.dispose();
      } finally {
        target?.removeEventListener('pagehide', pagehide);
        subscription = undefined;
        storage = undefined;
      }
    }
  });
  stopWatch = _effect(() => {
    if (!mounted.read() || stopped) return;
    const canSave = available.read();
    try {
      const text = encode();
      if (!attempted) {
        void restore(true);
        return;
      }
      if (canSave) schedule(text);
    } catch (error) {
      fail(error);
    }
  });
  _onMount(() => {
    mounted.write(true);
  });
  return handle;
}
export type { StorageAdapter, StorageResult } from './hub.js';
