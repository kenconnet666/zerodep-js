import { Derived } from './reactivity.js';

export type Props = Record<PropertyKey, unknown>;
export type PropSource = Record<PropertyKey, () => unknown> | (() => unknown);

function readonlyView(
  read: (key: PropertyKey) => unknown,
  keys: () => PropertyKey[],
  contains: (key: PropertyKey) => boolean,
): Props {
  const reject = (): never => {
    throw new Error('组件 props 是只读输入，请通过回调通知数据拥有者。');
  };
  return new Proxy(Object.create(null) as Props, {
    get: (_target, key) => read(key),
    has: (_target, key) => contains(key),
    ownKeys: () => keys() as (string | symbol)[],
    getOwnPropertyDescriptor: (_target, key) =>
      contains(key) ? { configurable: true, enumerable: true, get: () => read(key) } : undefined,
    set: reject,
    deleteProperty: reject,
    defineProperty: reject,
    setPrototypeOf: reject,
    preventExtensions: reject,
  });
}

function hasEnumerable(value: object, key: PropertyKey): boolean {
  return Reflect.getOwnPropertyDescriptor(value, key)?.enumerable === true;
}

function enumerableKeys(value: object): PropertyKey[] {
  return Reflect.ownKeys(value).filter(
    (key) => Reflect.getOwnPropertyDescriptor(value, key)?.enumerable,
  );
}

/** JSX 显式属性按键缓存，spread 保留实时对象视图和从左到右覆盖顺序。 */
export function props(sources: readonly PropSource[]): Props {
  const inputs = sources.map((input) => {
    if (typeof input === 'function') {
      const value = new Derived(input);
      return () => Object(value.read()) as Props;
    }
    const attributes: Props = Object.create(null) as Props;
    for (const key of Reflect.ownKeys(input)) {
      const value = new Derived(input[key]!);
      Object.defineProperty(attributes, key, { enumerable: true, get: () => value.read() });
    }
    return () => attributes;
  });
  return readonlyView(
    (key) => {
      for (let index = inputs.length - 1; index >= 0; index--) {
        const input = inputs[index]!();
        // 只查当前键；多层 props/rest 转发不能在每次读取时递归枚举整组属性。
        // 响应式对象的属性描述符读取同样跟踪键的新增和删除。
        if (hasEnumerable(input, key)) {
          return input[key];
        }
      }
      return undefined;
    },
    () => [...new Set(inputs.flatMap((input) => enumerableKeys(input())))],
    (key) => inputs.some((input) => hasEnumerable(input(), key)),
  );
}

export function readonlyProps(input: object): Props {
  return readonlyView(
    (key) => Reflect.get(input, key),
    () => enumerableKeys(input),
    (key) => hasEnumerable(input, key),
  );
}

export function prop(input: Props, key: PropertyKey, fallback?: () => unknown): () => unknown {
  const defaultValue = fallback && new Derived(fallback);
  return () => {
    const value = input[key];
    return value === undefined ? defaultValue?.read() : value;
  };
}

export function restProps(input: Props, excluded: readonly PropertyKey[]): Props {
  const removed = new Set(excluded);
  return readonlyView(
    (key) => (removed.has(key) || !hasEnumerable(input, key) ? undefined : input[key]),
    () => enumerableKeys(input).filter((key) => !removed.has(key)),
    (key) => !removed.has(key) && hasEnumerable(input, key),
  );
}
