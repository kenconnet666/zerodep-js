import { Source, batch, effect, onCleanup, untrack, type Cleanup } from '../runtime/reactivity.js';
import { getAbortSignal, onMount } from '../runtime/lifecycle.js';
import { snapshot } from '../runtime/snapshot.js';
import { storageSubscription, type StorageLike } from './hub.js';

export type { StorageLike } from './hub.js';
export interface StorageBinding<T> {
  read(): T;
  write(value: T): void;
}
export interface PersistOptions<T> {
  /** 惰性取得存储；SSR 不调用。默认使用所属 window 的原生存储。 */
  storage?: StorageLike | (() => StorageLike | undefined);
  window?: Window;
  version?: number;
  migrate?: (value: unknown, previousVersion: number) => unknown;
  validate?: (value: unknown) => T;
  writeDelay?: number;
  onError?: (error: unknown) => void;
}
export type PersistStatus = 'idle' | 'ready' | 'paused' | 'error' | 'stopped';
export interface Persistence {
  readonly ready: boolean;
  readonly status: PersistStatus;
  readonly error: unknown;
  flush(): boolean;
  reset(): boolean;
  remove(): boolean;
  retry(): boolean;
  pause(): void;
  resume(): void;
  stop(): void;
}

const format = 'zerodep-js-storage';
const record = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
function synchronous<T>(value: T): T {
  if (
    value !== null &&
    (typeof value === 'object' || typeof value === 'function') &&
    typeof Reflect.get(value, 'then') === 'function'
  )
    throw new TypeError('localStorage 绑定、迁移和校验必须同步完成。');
  return value;
}

function bindingFor<T>(input: T | StorageBinding<T>): StorageBinding<T> {
  if (record(input) && typeof input.read === 'function' && typeof input.write === 'function')
    return input as unknown as StorageBinding<T>;
  if (input === null || typeof input !== 'object')
    throw new TypeError('持久化普通变量请提供 read/write，对象绑定请使用稳定的响应式对象。');
  if (!Array.isArray(input) && ![Object.prototype, null].includes(Object.getPrototypeOf(input)))
    throw new TypeError('直接持久化只绑定普通对象或数组。');
  return {
    read: () => input as T,
    write(next) {
      if (next === null || typeof next !== 'object' || Array.isArray(next) !== Array.isArray(input))
        throw new TypeError('保存的数据与持久化对象形态不同，请提供 validate 或迁移。');
      for (const key of new Set([...Object.keys(input), ...Object.keys(next)])) {
        const descriptor = Object.getOwnPropertyDescriptor(input, key);
        if (
          (descriptor && !descriptor.configurable) ||
          (!descriptor && !Object.isExtensible(input))
        )
          throw new TypeError('持久化对象含不可替换字段，请使用 read/write 绑定。');
      }
      if (Array.isArray(input) && !Object.getOwnPropertyDescriptor(input, 'length')?.writable)
        throw new TypeError('持久化数组的 length 必须可写。');
      batch(() => {
        for (const key of Object.keys(input))
          if (!Object.hasOwn(next, key)) Reflect.deleteProperty(input, key);
        if (Array.isArray(input)) input.length = (next as unknown[]).length;
        for (const key of Object.keys(next))
          // defineProperty 保留 __proto__ 作为数据，不触发原型 setter。
          Object.defineProperty(input, key, {
            value: Reflect.get(next, key),
            enumerable: true,
            configurable: true,
            writable: true,
          });
      });
    },
  };
}

function persist<T>(
  kind: 'localStorage' | 'sessionStorage',
  key: string | (() => string),
  input: T | StorageBinding<T>,
  options: PersistOptions<T>,
): Persistence {
  getAbortSignal(); // 提前确认所有权，避免在事件或模块顶层留下无主监听。
  const binding = bindingFor(input);
  const initial = untrack(() => snapshot(binding.read()));
  const version = options.version ?? 1;
  const delay = options.writeDelay ?? 0;
  if (!Number.isSafeInteger(version) || version < 1 || !Number.isFinite(delay) || delay < 0)
    throw new TypeError('version 必须为正整数，writeDelay 必须为非负有限数值。');
  const encode = (value: T): string => {
    const data = JSON.stringify(value);
    if (data === undefined) throw new TypeError('持久化数据必须可以编码为 JSON。');
    return data;
  };
  const readKey = () => {
    const value = typeof key === 'function' ? key() : key;
    if (typeof value !== 'string') throw new TypeError('存储键必须是字符串。');
    return value;
  };
  let initialText: string | undefined;
  try {
    initialText = encode(initial);
  } catch {
    /* 挂载后的状态句柄报告编码错误。 */
  }
  let state = { ready: false, status: 'idle' as PersistStatus, error: undefined as unknown };
  const current = new Source(state);
  const mounted = new Source(false);
  let storage: StorageLike | undefined;
  let target: Window | undefined;
  let subscription: ReturnType<typeof storageSubscription> | undefined;
  let activeKey: string | undefined;
  let saved: string | undefined;
  let pending: { key: string; text: string } | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let paused = false;
  let stopped = false;
  let first = true;
  let rewrite = false;
  let processing = false;
  let reporting = false;
  let stopWatch: Cleanup = () => {};

  function publish(ready: boolean, error?: unknown) {
    const status: PersistStatus = stopped
      ? 'stopped'
      : paused
        ? 'paused'
        : error !== undefined
          ? 'error'
          : ready
            ? 'ready'
            : 'idle';
    if (state.ready !== ready || state.status !== status || !Object.is(state.error, error)) {
      state = { ready, status, error };
      current.write(state);
    }
  }
  function fail(error: unknown, ready = state.ready) {
    if (error === undefined) error = new Error('存储操作抛出了 undefined。');
    publish(ready, error);
    if (reporting) return;
    reporting = true;
    try {
      untrack(() => options.onError?.(error));
    } catch (callbackError) {
      publish(ready, new AggregateError([error, callbackError], '存储与错误回调均失败。'));
    } finally {
      reporting = false;
    }
  }
  function cancelTimer() {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  }
  function raw(text: string) {
    return `{"format":"${format}","version":${version},"value":${text}}`;
  }
  function commit(next: { key: string; text: string }): boolean {
    if (!storage) return false;
    try {
      const value = raw(next.text);
      storage.setItem(next.key, value);
      if (next.key === activeKey) {
        saved = next.text;
        rewrite = false;
      }
      if (pending === next) pending = undefined;
      publish(state.ready);
      subscription?.notify(next.key, value);
      return true;
    } catch (error) {
      fail(error);
      return false;
    }
  }
  function flushPending(): boolean {
    cancelTimer();
    return !pending || commit(pending);
  }
  function queue(text: string, schedule = true): boolean {
    if (text === saved && !rewrite) {
      pending = undefined;
      cancelTimer();
      publish(state.ready);
      return true;
    }
    pending = { key: activeKey!, text };
    cancelTimer();
    if (!schedule) return true;
    if (!delay) return flushPending();
    else
      timer = setTimeout(() => {
        timer = undefined;
        if (!stopped && !paused) flushPending();
      }, delay);
    return true;
  }
  function decode(serialized: string): { value: T; migrated: boolean } {
    const parsed: unknown = JSON.parse(serialized);
    let previous = 0;
    let data = parsed;
    if (record(parsed) && parsed.format === format) {
      if (
        !Number.isSafeInteger(parsed.version) ||
        (parsed.version as number) < 1 ||
        !Object.hasOwn(parsed, 'value')
      )
        throw new TypeError('持久化数据封装损坏。');
      previous = parsed.version as number;
      data = parsed.value;
    }
    if (previous > version) throw new Error('保存的数据版本比当前应用更新，不能覆盖。');
    if (previous !== version) {
      if (!options.migrate) throw new Error(`存储版本 ${previous} 需要迁移到 ${version}。`);
      data = synchronous(options.migrate(data, previous));
    }
    const value = synchronous(options.validate ? options.validate(data) : (data as T));
    return { value: snapshot(value), migrated: previous !== version };
  }
  function restore(value: string | null, preserveEdits = false): boolean {
    pending = undefined;
    cancelTimer();
    try {
      const loaded = value === null ? { value: snapshot(initial), migrated: false } : decode(value);
      const baseline = encode(loaded.value);
      if (!preserveEdits) synchronous(binding.write(loaded.value));
      saved = preserveEdits ? baseline : encode(binding.read());
      rewrite = loaded.migrated;
      publish(true);
      return true;
    } catch (error) {
      fail(error, false);
      return false;
    }
  }
  const receive = (changed: string | null, value: string | null) => {
    if (stopped || paused || activeKey === undefined || (changed !== null && changed !== activeKey))
      return;
    untrack(() => {
      try {
        restore(changed === null ? storage!.getItem(activeKey!) : value);
      } catch (error) {
        fail(error);
      }
    });
  };
  const pagehide = () => handle.flush();
  function connect(): boolean {
    if (storage) return true;
    try {
      target = options.window ?? (typeof window === 'undefined' ? undefined : window);
      storage =
        typeof options.storage === 'function'
          ? options.storage()
          : (options.storage ?? target?.[kind]);
      if (!storage) throw new Error(`${kind} 在当前环境不可用。`);
      subscription = storageSubscription(storage, target, receive);
      target?.addEventListener('pagehide', pagehide);
      return true;
    } catch (error) {
      subscription?.dispose();
      subscription = undefined;
      storage = undefined;
      fail(error);
      return false;
    }
  }
  function process(schedule = true): boolean {
    if (!mounted.read() || stopped || processing) return false;
    processing = true;
    try {
      const nextKey = readKey();
      const text = encode(binding.read());
      // 暂停期间仍收集读取，恢复后不会丢失字段或动态键的订阅。
      if (paused || !connect()) return false;
      if (activeKey !== nextKey) {
        // 已排队的旧键写入使用其原快照，不能把新用户/新键的值写回旧键。
        if (!flushPending()) return false;
        activeKey = nextKey;
        publish(false);
        const preserve = first && initialText !== text;
        first = false;
        if (!restore(storage!.getItem(nextKey), preserve)) return false;
      }
      return state.ready && queue(encode(binding.read()), schedule);
    } catch (error) {
      fail(error);
      return false;
    } finally {
      processing = false;
    }
  }
  const handle: Persistence = Object.freeze({
    get ready() {
      return current.read().ready;
    },
    get status() {
      return current.read().status;
    },
    get error() {
      return current.read().error;
    },
    flush: () =>
      untrack(() => {
        if (stopped || paused || !mounted.read()) return false;
        if (!process(false)) return false;
        return flushPending();
      }),
    reset: () =>
      untrack(() => {
        if (stopped || !mounted.read() || !connect()) return false;
        try {
          const nextKey = readKey();
          if (nextKey !== activeKey && !flushPending()) return false;
          activeKey = nextKey;
          synchronous(binding.write(snapshot(initial)));
          publish(true);
          rewrite = true;
          if (paused) return true;
          queue(encode(binding.read()), false);
          return flushPending();
        } catch (error) {
          fail(error);
          return false;
        }
      }),
    remove: () =>
      untrack(() => {
        if (stopped || !mounted.read() || !connect()) return false;
        try {
          const nextKey = readKey();
          if (nextKey !== activeKey && !flushPending()) return false;
          cancelTimer();
          pending = undefined;
          activeKey = nextKey;
          storage!.removeItem(activeKey);
          restore(null);
          subscription?.notify(activeKey, null);
          return state.ready;
        } catch (error) {
          fail(error);
          return false;
        }
      }),
    retry: () =>
      untrack(() => {
        if (stopped || paused || !mounted.read()) return false;
        if (state.ready) return handle.flush();
        if (!connect()) return false;
        try {
          activeKey = readKey();
          if (
            !restore(storage!.getItem(activeKey), encode(binding.read()) !== (saved ?? initialText))
          )
            return false;
          first = false;
          return handle.flush();
        } catch (error) {
          fail(error);
          return false;
        }
      }),
    pause() {
      if (!stopped) {
        paused = true;
        cancelTimer();
        publish(state.ready, state.error);
      }
    },
    resume() {
      if (stopped || !paused) return;
      paused = false;
      untrack(() => {
        try {
          if (
            state.ready &&
            storage &&
            !rewrite &&
            readKey() === activeKey &&
            encode(binding.read()) === saved
          )
            restore(storage.getItem(activeKey!));
          publish(state.ready, state.error);
          process();
        } catch (error) {
          fail(error);
        }
      });
    },
    stop() {
      if (stopped) return;
      try {
        if (!paused && state.ready) handle.flush();
      } finally {
        stopped = true;
        cancelTimer();
        pending = undefined;
        stopWatch();
        subscription?.dispose();
        target?.removeEventListener('pagehide', pagehide);
        subscription = undefined;
        storage = undefined;
        publish(state.ready, state.error);
      }
    },
  });
  onCleanup(handle.stop);
  stopWatch = effect(() => {
    process();
  });
  onMount(() => {
    mounted.write(true);
  });
  return handle;
}

export function persistLocal<T>(
  key: string | (() => string),
  binding: StorageBinding<T>,
  options?: PersistOptions<T>,
): Persistence;
export function persistLocal<T extends object>(
  key: string | (() => string),
  state: T,
  options?: PersistOptions<T>,
): Persistence;
export function persistLocal<T>(
  key: string | (() => string),
  state: T | StorageBinding<T>,
  options: PersistOptions<T> = {},
): Persistence {
  return persist('localStorage', key, state, options);
}

export function persistSession<T>(
  key: string | (() => string),
  binding: StorageBinding<T>,
  options?: PersistOptions<T>,
): Persistence;
export function persistSession<T extends object>(
  key: string | (() => string),
  state: T,
  options?: PersistOptions<T>,
): Persistence;
export function persistSession<T>(
  key: string | (() => string),
  state: T | StorageBinding<T>,
  options: PersistOptions<T> = {},
): Persistence {
  return persist('sessionStorage', key, state, options);
}
