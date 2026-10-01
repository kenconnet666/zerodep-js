import {
  Scope,
  getScope,
  onCleanup,
  renderEffect,
  propertyEffect,
  untrack,
  unowned,
} from '../runtime/reactivity.js';
import type { Props } from '../runtime/props.js';
import type { HydrationSession } from './hydration.js';
import { bindControl, notifySelect } from './controls.js';
import { HTML, attributeNamespace, eventName, nativeAttributes } from '../native/attributes.js';
import { PropertyBindings } from './properties.js';

const properties = new Set(['value', 'checked', 'selected', 'muted']);

interface EventBinding {
  type: string;
  capture: boolean;
  listener: EventListener;
}

function setAttribute(element: Element, name: string, value: string | null): void {
  if (
    (name === 'selected' && element.localName === 'option') ||
    (name === 'muted' && name in element)
  ) {
    const next = value !== null;
    element.toggleAttribute(name, next);
    if (Reflect.get(element, name) !== next) Reflect.set(element, name, next);
    return;
  }
  const namespace = attributeNamespace(name, element.namespaceURI ?? HTML);
  if (namespace) {
    if (value === null) element.removeAttributeNS(namespace, name.slice(name.indexOf(':') + 1));
    else element.setAttributeNS(namespace, name, value);
  } else if (value === null) element.removeAttribute(name);
  else element.setAttribute(name, value);
}

export function attachAttributes(
  element: Element,
  input: Props,
  hydration?: HydrationSession,
): void {
  const previous = new Map<string, string>();
  const events = new Map<string, EventBinding>();
  const owner = getScope()!;
  let propertyBindings: PropertyBindings | undefined;
  const control = bindControl(element, input, hydration, (type) =>
    [...events.values()].some((binding) => binding.type === type),
  );
  onCleanup(() => {
    for (const binding of events.values())
      element.removeEventListener(binding.type, binding.listener, binding.capture);
    propertyBindings?.dispose();
  });
  renderEffect(() => {
    control?.track();
    const next = nativeAttributes(input, element.localName, element.namespaceURI ?? HTML);
    if (!propertyBindings && Object.keys(input).some((key) => key.startsWith('prop:'))) {
      propertyBindings = new PropertyBindings(element);
      // 绑定归属元素所在作用域，不随普通属性 effect 的重跑而销毁。
      owner.run(() => propertyEffect(() => propertyBindings!.update(input)));
    }
    // 先按真实属性名合并别名，再比较最终值；较早别名更新不能覆盖较晚的稳定值。
    const names = [...new Set([...previous.keys(), ...next.keys()])].sort(
      (left, right) => Number(properties.has(left)) - Number(properties.has(right)),
    );
    for (const name of names) {
      if (control && (name === 'value' || name === 'checked')) continue;
      const value = next.get(name) ?? null;
      if (previous.get(name) !== value) setAttribute(element, name, value);
    }
    const eventKeys = new Set(events.keys());
    for (const key of Object.keys(input)) {
      if (eventName(key)) eventKeys.add(key);
    }
    for (const key of eventKeys) {
      const event = eventName(key)!;
      const value = input[key];
      let binding = events.get(key);
      if (value == null) {
        if (binding) element.removeEventListener(binding.type, binding.listener, binding.capture);
        events.delete(key);
      } else {
        if (typeof value !== 'function') throw new Error(`${key} 必须是事件处理函数。`);
        if (!binding) {
          binding = {
            ...event,
            listener: (event) => {
              unowned(() => {
                const handler = input[key];
                if (typeof handler === 'function') handler.call(element, event);
              });
            },
          };
          events.set(key, binding);
          element.addEventListener(binding.type, binding.listener, binding.capture);
        }
      }
    }
    previous.clear();
    for (const [key, value] of next) previous.set(key, value);
    control?.update();
    if (element.localName === 'option' || element.localName === 'optgroup')
      notifySelect(element.parentNode);
  });
}

export function attachRef(element: Element, input: Props, owner: Scope): void {
  let scope: Scope | undefined;
  let previous: unknown;
  renderEffect(() => {
    const reference = input.ref;
    if (reference === previous) return;
    scope?.dispose();
    scope = undefined;
    previous = reference;
    if (reference == null) return;
    if (typeof reference !== 'function') throw new Error('DOM ref 必须是函数。');
    scope = new Scope(owner);
    try {
      untrack(() =>
        scope!.run(() => {
          const cleanup: unknown = reference(element);
          if (typeof cleanup === 'function') onCleanup(cleanup as () => void);
        }),
      );
    } catch (error) {
      scope.dispose();
      scope = undefined;
      previous = undefined;
      throw error;
    }
  });
}
