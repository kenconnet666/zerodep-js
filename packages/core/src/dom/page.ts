import { Derived, Source, assertCanWrite } from '../runtime/reactivity.js';
import type { AnyComponent, ComponentProps } from '../runtime/component.js';
import { _mount, type MountOptions } from './mount.js';

export interface PageHandle<Input> {
  /** 完整替换宿主输入，保留页面实例及其局部状态。 */
  update(next: Input): void;
  dispose(): void;
}
export type PageEntry<Input> = (target: HTMLElement, initial: Input) => PageHandle<Input>;

function plain(value: object): boolean {
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

/** 只复制数据容器；函数与外部实例保持身份，不把宿主状态当作本框架代理。 */
function copyInput<Input>(input: Input): Input {
  if (!input || typeof input !== 'object' || !plain(input))
    throw new TypeError('页面 input 必须是普通对象。');
  const copies = new WeakMap<object, object>();
  const copy = (value: unknown): unknown => {
    if (!value || typeof value !== 'object' || (!Array.isArray(value) && !plain(value)))
      return value;
    if (copies.has(value)) return copies.get(value);
    const result = Array.isArray(value)
      ? new Array(value.length)
      : Object.create(Object.getPrototypeOf(value));
    copies.set(value, result);
    for (const key of Reflect.ownKeys(value)) {
      if (!Object.getOwnPropertyDescriptor(value, key)?.enumerable) continue;
      Object.defineProperty(result, key, {
        value: copy(Reflect.get(value, key)),
        enumerable: true,
        configurable: true,
        writable: true,
      });
    }
    return result;
  };
  return copy(input) as Input;
}

/** 相同输入不反复通知页面；双向配对同时保留循环和共享引用的区别。 */
function sameInput(left: unknown, right: unknown): boolean {
  const forward = new WeakMap<object, object>();
  const reverse = new WeakMap<object, object>();
  const equal = (a: unknown, b: unknown): boolean => {
    if (Object.is(a, b)) return true;
    if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false;
    if ((!Array.isArray(a) && !plain(a)) || (!Array.isArray(b) && !plain(b))) return false;
    if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;
    if (Array.isArray(a) && (!Array.isArray(b) || a.length !== b.length)) return false;
    if (forward.has(a)) return forward.get(a) === b;
    if (reverse.has(b)) return false;
    forward.set(a, b);
    reverse.set(b, a);
    const keys = (value: object) =>
      Reflect.ownKeys(value).filter(
        (key) => Object.getOwnPropertyDescriptor(value, key)?.enumerable,
      );
    const before = keys(a),
      after = keys(b);
    return (
      before.length === after.length &&
      before.every(
        (key, index) => key === after[index] && equal(Reflect.get(a, key), Reflect.get(b, key)),
      )
    );
  };
  return equal(left, right);
}

/** 工厂可在模块级共享；每次调用入口才创建独立的页面与数据。 */
export function _createPage<C extends AnyComponent>(component: C): PageEntry<ComponentProps<C>> {
  return (target, initial) => {
    let current = copyInput(initial);
    const input = new Source(current);
    const fields = new Map<PropertyKey, Derived<unknown>>();
    const live = new Proxy(Object.create(null), {
      get(_target, key) {
        let value = fields.get(key);
        if (!value) {
          value = new Derived(() => Reflect.get(input.read() as object, key));
          fields.set(key, value);
        }
        return value.read();
      },
      ownKeys: () => Reflect.ownKeys(input.read() as object),
      getOwnPropertyDescriptor: (_target, key) =>
        Object.hasOwn(input.read() as object, key)
          ? { configurable: true, enumerable: true }
          : undefined,
    });
    // 入口已按 C 检查输入；这里仅把相同字段换成实时只读视图。
    const stop = _mount(component, { target, props: live } as unknown as MountOptions<C>);
    let disposed = false;
    return Object.freeze({
      update(next: ComponentProps<C>) {
        if (disposed) return;
        assertCanWrite();
        const copy = copyInput(next);
        if (sameInput(current, copy)) return;
        // 旧派生仍由真实观察者持有；缓存只保留本轮读取的键，不积累已移除字段。
        fields.clear();
        input.write(copy);
        current = copy;
      },
      dispose() {
        if (disposed) return;
        disposed = true;
        try {
          stop();
        } finally {
          fields.clear();
        }
      },
    });
  };
}
