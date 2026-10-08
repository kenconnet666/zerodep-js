import { isPlainObjectPrototype } from './objects.js';

const mapSize = Object.getOwnPropertyDescriptor(Map.prototype, 'size')!;
const setSize = Object.getOwnPropertyDescriptor(Set.prototype, 'size')!;

/** 读取内建槽而非可伪造的显示标签，兼容跨 realm 和覆写 toStringTag 的集合。 */
function hasCollectionSlot(value: object, descriptor: PropertyDescriptor): boolean {
  try {
    descriptor.get!.call(value);
    return true;
  } catch {
    return false;
  }
}

/** 脱开可枚举数据中的响应式代理，平台仍决定哪些值可以被结构化克隆。 */
export function _snapshot<T>(value: T): T {
  const copies = new WeakMap<object, unknown>();
  // 借用内建方法处理跨 realm 数据，下面每次都通过 call 显式提供接收者。
  // oxlint-disable-next-line typescript/unbound-method
  const tag = Object.prototype.toString;

  function objectData(input: object): unknown {
    const result: Record<string, unknown> | unknown[] = Array.isArray(input)
      ? new Array(input.length)
      : {};
    copies.set(input, result);
    for (const key of Object.keys(input))
      Object.defineProperty(result, key, {
        value: prepare(Reflect.get(input, key)),
        enumerable: true,
        configurable: true,
        writable: true,
      });
    return result;
  }

  function prepare(input: unknown): unknown {
    if (input === null || typeof input !== 'object') return input;
    if (copies.has(input)) return copies.get(input);
    if (Array.isArray(input) || isPlainObjectPrototype(Object.getPrototypeOf(input)))
      return objectData(input);
    if (hasCollectionSlot(input, mapSize)) {
      const result = new Map<unknown, unknown>();
      copies.set(input, result);
      // 使用内建方法，避免子类覆写迭代器改变快照内容；跨 realm 的 Map 也适用。
      Map.prototype.forEach.call(input, (item: unknown, key: unknown) => {
        result.set(prepare(key), prepare(item));
      });
      return result;
    }
    if (hasCollectionSlot(input, setSize)) {
      const result = new Set<unknown>();
      copies.set(input, result);
      Set.prototype.forEach.call(input, (item: unknown) => result.add(prepare(item)));
      return result;
    }
    // 其余带自定义标签的平台/类实例由平台克隆，不调用该符号 getter 或据它冒充别的类型。
    if (Symbol.toStringTag in input) return input;
    const kind = tag.call(input);
    if (kind === '[object Object]') return objectData(input);
    if (kind === '[object Error]') {
      const original = input as Error & { cause?: unknown };
      const constructors: Record<string, ErrorConstructor> = {
        Error,
        EvalError,
        RangeError,
        ReferenceError,
        SyntaxError,
        TypeError,
        URIError,
      };
      const Constructor = Object.hasOwn(constructors, original.name)
        ? constructors[original.name]!
        : Error;
      const result = new Constructor(original.message);
      copies.set(input, result);
      if ('cause' in original)
        Object.defineProperty(result, 'cause', {
          value: prepare(original.cause),
          configurable: true,
          writable: true,
        });
      if (typeof original.stack === 'string') result.stack = original.stack;
      return result;
    }
    // 原生克隆一次性处理 buffer/view 的别名、Blob、Date、RegExp，以及不可克隆值的错误。
    return input;
  }

  return structuredClone(prepare(value)) as T;
}
