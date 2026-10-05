import { raw } from '../runtime/state.js';

/** HMR 只复制无访问器的普通数据；不运行 getter，也不迁移外部实例和资源句柄。 */
export function copyData(value: unknown): unknown {
  const seen = new Map<object, object>();
  let budget = 10_000;
  function copy(input: unknown, depth: number): unknown {
    if (typeof input === 'function' || typeof input === 'symbol')
      throw new Error('包含函数或 symbol');
    if (input === null || typeof input !== 'object') return input;
    if (--budget < 0 || depth > 100) throw new Error('数据超过开发态复制上限');
    input = raw(input);
    const object = input as object;
    if (seen.has(object)) return seen.get(object);
    const prototype = Object.getPrototypeOf(object);
    if (!Array.isArray(object) && prototype !== Object.prototype && prototype !== null)
      throw new Error('包含外部对象或资源');
    const result: Record<string, unknown> | unknown[] = Array.isArray(object)
      ? []
      : Object.create(prototype);
    seen.set(object, result);
    for (const key of Reflect.ownKeys(object)) {
      if (Array.isArray(object) && key === 'length') continue;
      const descriptor = Object.getOwnPropertyDescriptor(object, key)!;
      if (typeof key !== 'string' || !('value' in descriptor))
        throw new Error('包含 symbol 属性或访问器');
      if (descriptor.enumerable)
        Object.defineProperty(result, key, {
          value: copy(descriptor.value, depth + 1),
          writable: true,
          configurable: true,
          enumerable: true,
        });
    }
    if (Array.isArray(object) && Array.isArray(result)) result.length = object.length;
    return result;
  }
  return copy(value, 0);
}

/** 预览只留字符串，不把整个历史对象图挂到时间线；访问器显示标记而不求值。 */
export function preview(value: unknown): string {
  const seen = new Set<object>();
  let budget = 150;
  function show(input: unknown, depth: number): string {
    if (typeof input === 'string')
      return JSON.stringify(input.length > 300 ? input.slice(0, 300) + '…' : input);
    if (typeof input === 'function') return '[函数]';
    if (input === null || typeof input !== 'object') return String(input);
    const object = raw(input);
    if (seen.has(object)) return '[循环引用]';
    if (depth > 4 || --budget < 0) return '…';
    seen.add(object);
    const prototype = Object.getPrototypeOf(object);
    if (!Array.isArray(object) && prototype !== Object.prototype && prototype !== null)
      return '[外部对象]';
    const parts: string[] = [];
    for (const key of Object.keys(object).slice(0, 30)) {
      const descriptor = Object.getOwnPropertyDescriptor(object, key)!;
      parts.push(
        `${key}: ${'value' in descriptor ? show(descriptor.value, depth + 1) : '[访问器]'}`,
      );
    }
    return `${Array.isArray(object) ? '[' : '{'}${parts.join(', ')}${Array.isArray(object) ? ']' : '}'}`;
  }
  try {
    return show(value, 0).slice(0, 5000);
  } catch {
    return '[无法查看]';
  }
}
