import { Source } from '../runtime/reactivity.js';
import { props } from '../runtime/props.js';
import type { AnyComponent, ComponentProps } from '../runtime/component.js';
import { mount, type MountOptions } from './mount.js';

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

/** 工厂可在模块级共享；每次调用入口才创建独立的页面与数据。 */
export function createPage<C extends AnyComponent>(component: C): PageEntry<ComponentProps<C>> {
  return (target, initial) => {
    const input = new Source(copyInput(initial));
    const live = props([() => input.read()]);
    // 入口已按 C 检查输入；这里仅把相同字段换成实时只读视图。
    const stop = mount(component, { target, props: live } as unknown as MountOptions<C>);
    let disposed = false;
    return Object.freeze({
      update(next: ComponentProps<C>) {
        if (!disposed) input.write(copyInput(next));
      },
      dispose() {
        if (disposed) return;
        disposed = true;
        stop();
      },
    });
  };
}
