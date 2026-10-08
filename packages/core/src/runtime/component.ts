import { assertCanWrite, getScope, type Scope } from './reactivity.js';
import { readonlyProps } from './props.js';
import type { Renderable } from './template.js';

export const COMPONENT = Symbol('zerodep.component');

let idOwner: Scope | null = null;
let allocateId: (() => string) | undefined;

/** 不共享服务端计数器；接管时由渲染器提供服务端已写出的 ID。 */
export function createId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return 'zj-' + Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/** 在组件同步初始化中创建稳定 ID；多个调用得到不同 ID，普通更新不会重新生成。 */
export function _id(): string {
  assertCanWrite();
  if (!allocateId || getScope() !== idOwner) throw new Error('_id 必须在组件同步初始化中调用。');
  return allocateId();
}

export type Component<F extends (...args: never[]) => Renderable> = F & {
  readonly [COMPONENT]: F;
};

export type AnyComponent = Component<(...args: never[]) => Renderable>;
export type ComponentProps<C extends AnyComponent> =
  Parameters<C> extends [] ? Record<string, never> : NonNullable<Parameters<C>[0]>;
export function _component<F extends (...args: never[]) => Renderable>(_setup: F): Component<F> {
  throw new Error('_component 必须经过 zerodep-js 编译器转换。');
}

export function defineComponent<F extends (...args: never[]) => Renderable>(
  setup: F,
): Component<F> {
  const wrapper = new Proxy(setup, {
    apply() {
      throw new Error('组件通过 JSX 或 mount 创建，不能当普通函数直接调用。');
    },
  });
  return Object.assign(wrapper, { [COMPONENT]: setup });
}

/** 渲染器先建立实例作用域，再执行一次 setup；输入的 getter 不会被复制掉。 */
export function setupComponent(
  component: AnyComponent,
  input: object,
  ids: () => string = createId,
): Renderable {
  if (!getScope()) throw new Error('组件初始化必须属于渲染作用域。');
  if (typeof component?.[COMPONENT] !== 'function')
    throw new Error('无效组件，请使用 _component 声明。');
  const setup = component[COMPONENT];
  const previousOwner = idOwner;
  const previousAllocator = allocateId;
  idOwner = getScope();
  allocateId = ids;
  try {
    return setup(readonlyProps(input) as never);
  } finally {
    idOwner = previousOwner;
    allocateId = previousAllocator;
  }
}
