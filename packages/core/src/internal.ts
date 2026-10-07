import { Derived, Source } from './runtime/reactivity.js';

/** 与编译输出保持稳定的协议入口；不兼容改动才递增，补丁修复不必递增。 */
export function assertRuntime(expected: number): void {
  const actual = 2;
  if (expected !== actual)
    throw Object.assign(
      new Error(
        `ZJ_RUNTIME_ABI：编译结果要求内部协议 ${expected}，当前 core 提供 ${actual}；请统一框架版本并重新构建应用与组件库。`,
      ),
      { code: 'ZJ_RUNTIME_ABI' },
    );
}

export {
  Scope,
  getScope,
  renderEffect,
  _untrack,
  unowned,
  assertCanWrite,
} from './runtime/reactivity.js';
export { state } from './runtime/state.js';
export { synchronous } from './runtime/synchronous.js';
export { defineComponent, setupComponent, createId, COMPONENT } from './runtime/component.js';
export { prop, props, restProps } from './runtime/props.js';
export type { Props } from './runtime/props.js';
export { renderedHead, headData } from './runtime/head.js';
export type { HeadData } from './runtime/head.js';
export { bindProps, hasOpenBinding, OPEN_STATE_ATTRIBUTE } from './native/bindings.js';
export {
  element,
  dynamic,
  dynamicElement,
  fragment,
  conditional,
  logical,
} from './runtime/template.js';
export { liveRender } from './runtime/flow.js';
export { TEMPLATE } from './runtime/template.js';
export type { Renderable, Template } from './runtime/template.js';
export type { AnyComponent, ComponentProps } from './runtime/component.js';
export {
  HTML,
  SVG,
  MATH,
  namespaceFor,
  voidTags,
  textTags,
  rawTextTags,
  elementName,
  textValue,
  textContent,
  elementText,
  nativeAttributes,
  attributeValue,
  selectionValues,
} from './native/attributes.js';

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
