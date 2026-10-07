import {
  Source,
  assertCanWrite,
  _batch,
  isTracking,
  _untrack,
  captureTracking,
} from './reactivity.js';

const proxies = new WeakMap<object, object>();
const originals = new WeakMap<object, object>();
type Signals = Map<PropertyKey, WeakRef<Source<number>>>;
const releasedSignals = new FinalizationRegistry<{
  map: Signals;
  key: PropertyKey;
  reference: WeakRef<Source<number>>;
}>(({ map, key, reference }) => {
  // 同名字段可能已被重新订阅，旧节点的回收不能删除新节点。
  if (map.get(key) === reference) map.delete(key);
});
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
const nativeMethods = new Map(
  [...mutators].map((key) => [key, Reflect.get(Array.prototype, key) as Function]),
);
const arrayMethods = new WeakMap<Function, (...args: unknown[]) => unknown>();
const functionSource = (value: Function) => Function.prototype.toString.call(value);

export function raw<T>(value: T): T {
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
  const constructor = prototype && Object.getOwnPropertyDescriptor(prototype, 'constructor')?.value;
  const isArray = Array.isArray(value);
  const plainArray =
    isArray &&
    (prototype === null ||
      prototype === Array.prototype ||
      (typeof constructor === 'function' && functionSource(constructor) === functionSource(Array)));
  const plain =
    prototype === null ||
    prototype === Object.prototype ||
    (Object.getPrototypeOf(prototype) === null &&
      typeof constructor === 'function' &&
      Function.prototype.toString.call(constructor) === Function.prototype.toString.call(Object));
  if ((!plainArray && !plain) || !Object.isExtensible(value)) return value;
  const cached = proxies.get(value);
  if (cached) return cached as T;

  const values: Signals = new Map();
  const existence: Signals = new Map();
  const keys = new Source(0);

  function track(map: Signals, key: PropertyKey): void {
    if (!isTracking()) return;
    const previous = map.get(key);
    let source = previous?.deref();
    if (!source) {
      if (previous) releasedSignals.unregister(previous);
      source = new Source(0);
      const reference = new WeakRef(source);
      map.set(key, reference);
      // 真实观察者（包括冷派生）持有依赖；缓存本身不能让临时查询键永久存活。
      releasedSignals.register(source, { map, key, reference }, reference);
    }
    source.read();
  }

  function bump(source: Source<number>): void {
    source.write(_untrack(() => source.read()) + 1);
  }

  function changed(map: Signals, key: PropertyKey): void {
    const reference = map.get(key);
    if (!reference) return;
    const source = reference.deref();
    if (source) bump(source);
    // 冷派生仍持有旧版本，因此删除无订阅节点也能使其下次读取失效。
    if (!source?.subscribers.size) {
      map.delete(key);
      releasedSignals.unregister(reference);
    }
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
      let result: unknown;
      try {
        result = Reflect.get(target, key, receiver);
      } catch (error) {
        // 读取失败仍依赖这个字段，否则替换 getter 后冷派生会永久缓存旧异常。
        track(values, key);
        throw error;
      }
      const native = isArray && nativeMethods.get(key);
      if (
        native &&
        typeof result === 'function' &&
        (result === native || functionSource(result) === functionSource(native))
      ) {
        track(values, key);
        let method = arrayMethods.get(result);
        if (!method) {
          method = function (this: unknown, ...args: unknown[]): unknown {
            if (key === 'sort' && typeof args[0] === 'function') {
              const compare = args[0];
              const tracked = captureTracking();
              args[0] = (...items: unknown[]) =>
                tracked(() => Reflect.apply(compare, undefined, items));
            }
            // 原生数组变更内部会读 length，这些机械读取不能成为 effect 依赖。
            return _batch(() => _untrack(() => Reflect.apply(result as Function, this, args)));
          };
          arrayMethods.set(result, method);
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
      return _batch(() => {
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
      _batch(() => {
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
        _batch(() => {
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
