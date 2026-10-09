import { Derived } from './runtime/reactivity.js';
import { props, type Props, type PropSource } from './runtime/props.js';
import { styleText } from './native/style.js';

/** 适配器共享框架派生缓存；不暴露 Source/Scope 等实现类。 */
export function _memo<T>(calculate: () => T): { read(): T } {
  return new Derived(calculate);
}

/** 与 JSX 相同的实时读取和后项覆盖语义，显式字段按键缓存。 */
export function _mergeProps(sources: readonly PropSource[]): Props {
  return props(sources);
}

/** 与 DOM 和 SSR 使用同一套 style 序列化、属性名和单位规则。 */
export function _styleText(value: unknown): string {
  return styleText(value);
}
export type { Props, PropSource } from './runtime/props.js';
