import { Source, assertCanWrite, batch, isTracking, untrack } from './reactivity.js';

const proxies = new WeakMap<object, object>();
const originals = new WeakMap<object, object>();
const mutators = new Set<PropertyKey>([
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
  'fill',
  'copyWithin',
]);
const arrayMethods = new Map<PropertyKey, (...args: unknown[]) => unknown>();

function raw<T>(value: T): T {
  return value !== null && typeof value === 'object'
    ? ((originals.get(value) as T | undefined) ?? value)
    : value;
}

function arrayIndex(key: PropertyKey): number {
  if (typeof key !== 'string' || key === '') return -1;
  const index = Number(key);
  return Number.isInteger(index) && index >= 0 && index < 4_294_967_295 && String(index) === key
    ? index
    : -1;
}

/** 仅代理普通可扩展对象/数组，保留外部库实例、私有字段和内部槽语义。 */
export function reactive<T>(value: T): T {
  if (value === null || typeof value !== 'object' || originals.has(value)) return value;
  const prototype = Object.getPrototypeOf(value);
  if (
    (!Array.isArray(value) && prototype !== Object.prototype && prototype !== null) ||
    !Object.isExtensible(value)
  )
    return value;
  const cached = proxies.get(value);
  if (cached) return cached as T;

  const values = new Map<PropertyKey, Source<number>>();
  const existence = new Map<PropertyKey, Source<number>>();
  const keys = new Source(0);
  const isArray = Array.isArray(value);

  function track(map: Map<PropertyKey, Source<number>>, key: PropertyKey): void {
    if (!isTracking()) return;
    let source = map.get(key);
    if (!source) map.set(key, (source = new Source(0)));
    source.read();
  }

  function bump(source: Source<number>): void {
    source.write(untrack(() => source.read()) + 1);
  }

  function changed(map: Map<PropertyKey, Source<number>>, key: PropertyKey): void {
    const source = map.get(key);
    if (!source) return;
    bump(source);
    // 冷派生仍持有旧版本，因此删除无订阅节点也能使其下次读取失效。
    if (!source.subscribers.size) map.delete(key);
  }

  function updateLength(previous: number): void {
    if (!isArray) return;
    const length = (value as unknown[]).length;
    if (length === previous) return;
    changed(values, 'length');
    if (length < previous) {
      bump(keys);
      for (const key of new Set([...values.keys(), ...existence.keys()])) {
        if (arrayIndex(key) >= length) {
          changed(values, key);
          changed(existence, key);
        }
      }
    }
  }

  const proxy = new Proxy(value, {
    get(target, key, receiver) {
      const result: unknown = Reflect.get(target, key, receiver);
      if (isArray && mutators.has(key) && result === Reflect.get(Array.prototype, key)) {
        let method = arrayMethods.get(key);
        if (!method) {
          method = function (this: unknown, ...args: unknown[]): unknown {
            // 原生数组变更内部会读 length，这些机械读取不能成为 effect 依赖。
            return batch(() => untrack(() => Reflect.apply(result as Function, this, args)));
          };
          arrayMethods.set(key, method);
        }
        return method;
      }
      track(values, key);
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
      if (descriptor && !descriptor.configurable && 'value' in descriptor && !descriptor.writable) {
        return result;
      }
      return reactive(result);
    },
    set(target, key, next, receiver) {
      assertCanWrite();
      return batch(() => {
        const success = Reflect.set(target, key, raw(next), receiver);
        const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
        // 普通数据属性由 defineProperty 通知；访问器可能只写入外部闭包。
        if (success && (!descriptor || !('value' in descriptor))) changed(values, key);
        return success;
      });
    },
    defineProperty(target, key, descriptor) {
      assertCanWrite();
      const before = Reflect.getOwnPropertyDescriptor(target, key);
      const had = Reflect.has(target, key);
      const length = isArray ? (target as unknown[]).length : 0;
      const next =
        'value' in descriptor ? { ...descriptor, value: raw(descriptor.value) } : descriptor;
      const success = Reflect.defineProperty(target, key, next);
      // length 缩短遇到不可配置元素可能部分成功，失败时也要通知实际变更。
      batch(() => {
        const after = Reflect.getOwnPropertyDescriptor(target, key);
        if (
          after &&
          (!before ||
            !Object.is(before.value, after.value) ||
            before.get !== after.get ||
            before.set !== after.set)
        )
          changed(values, key);
        if (had !== Reflect.has(target, key)) changed(existence, key);
        if ((!before && after) || before?.enumerable !== after?.enumerable) bump(keys);
        updateLength(length);
      });
      return success;
    },
    deleteProperty(target, key) {
      assertCanWrite();
      const before = Reflect.getOwnPropertyDescriptor(target, key);
      const had = Reflect.has(target, key);
      const success = Reflect.deleteProperty(target, key);
      if (success && before)
        batch(() => {
          changed(values, key);
          if (had !== Reflect.has(target, key)) changed(existence, key);
          bump(keys);
        });
      return success;
    },
    has(target, key) {
      track(existence, key);
      return Reflect.has(target, key);
    },
    ownKeys(target) {
      keys.read();
      return Reflect.ownKeys(target);
    },
    preventExtensions() {
      throw new Error('响应式对象不能原地冻结；请使用独立快照或初始化为不可变对象。');
    },
    setPrototypeOf() {
      throw new Error('响应式对象不支持修改原型。');
    },
  });
  proxies.set(value, proxy);
  originals.set(proxy, value);
  return proxy;
}

class DeepState<T> extends Source<T> {
  constructor(initial: T) {
    super(reactive(initial));
  }

  override write(next: T): T {
    return super.write(reactive(next));
  }
}

export function state<T>(initial: T): Source<T> {
  return new DeepState(initial);
}
