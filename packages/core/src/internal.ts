import { Derived, Source } from './reactivity.js';

export { Scope, getScope, renderEffect, untrack } from './reactivity.js';
export { state } from './state.js';
export { defineComponent, setupComponent } from './component.js';
export { prop, props, restProps } from './props.js';
export { element, dynamic, dynamicElement, fragment, conditional, logical } from './template.js';
export { liveRender } from './flow.js';
export { TEMPLATE } from './template.js';
export type { Renderable, Template } from './template.js';
export type { AnyComponent, ComponentProps } from './component.js';
export {
  HTML,
  SVG,
  MATH,
  namespaceFor,
  voidTags,
  textTags,
  textValue,
  textContent,
  elementText,
  nativeAttributes,
  selectionValues,
} from './native.js';

export function source<T>(initial: T): Source<T> {
  return new Source(initial);
}

export function derived<T>(calculate: () => T): Derived<T> {
  return new Derived(calculate);
}

interface Writable<T> {
  read(): T;
  write(next: T): T;
}

/** 赋值表达式返回右值本身，深代理包装不能改变这个返回值。 */
export function set<T>(target: Writable<T>, next: T): T {
  target.write(next);
  return next;
}

export function update(
  target: Writable<number | bigint>,
  increment: boolean,
  prefix: boolean,
): number | bigint {
  let next = target.read();
  const previous = increment ? next++ : next--;
  target.write(next);
  return prefix ? next : previous;
}
