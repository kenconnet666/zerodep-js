import { getScope } from './reactivity.js';
import { readonlyProps } from './props.js';

export const COMPONENT = Symbol('zerodep.component');

// 渲染值协议将在 DOM 接入时扩展为具体模板类型，现阶段保留原函数签名。
export type Component<F extends (...args: never[]) => unknown> = F & {
  readonly [COMPONENT]: F;
};

export function component<F extends (...args: never[]) => unknown>(_setup: F): Component<F> {
  throw new Error('component 必须经过 zerodep-js 编译器转换。');
}

export function defineComponent<F extends (...args: never[]) => unknown>(setup: F): Component<F> {
  const wrapper = new Proxy(setup, {
    apply() {
      throw new Error('组件通过 JSX 或 mount 创建，不能当普通函数直接调用。');
    },
  });
  return Object.assign(wrapper, { [COMPONENT]: setup });
}

/** 渲染器先建立实例作用域，再执行一次 setup；输入的 getter 不会被复制掉。 */
export function setupComponent(
  component: Component<(props: never) => unknown>,
  input: object,
): unknown {
  if (!getScope()) throw new Error('组件初始化必须属于渲染作用域。');
  if (typeof component?.[COMPONENT] !== 'function')
    throw new Error('无效组件，请使用 component 声明。');
  return component[COMPONENT](readonlyProps(input) as never);
}
