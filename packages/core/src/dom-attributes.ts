import { Scope, onCleanup, renderEffect, untrack, unowned } from './reactivity.js';
import type { Props } from './props.js';
import type { HydrationSession } from './hydration.js';
import { bindControl, controlProperties, notifySelect } from './dom-controls.js';
import {
  HTML,
  attributeName,
  attributeValue,
  eventName,
  nativeAttributes,
  styleEntries,
} from './native.js';

const properties = new Set([
  'value',
  'defaultValue',
  'checked',
  'defaultChecked',
  'selected',
  'muted',
]);

interface EventBinding {
  type: string;
  capture: boolean;
  listener: EventListener;
}

function applyStyle(element: Element, value: unknown, previous: Map<string, string>): void {
  const style = (element as HTMLElement | SVGElement).style;
  if (typeof value === 'string') {
    if (element.getAttribute('style') !== value) element.setAttribute('style', value);
    previous.clear();
    return;
  }
  const next = styleEntries(value);
  if (!previous.size && element.hasAttribute('style')) style.cssText = '';
  for (const key of previous.keys()) if (!next.has(key)) style.removeProperty(key);
  for (const [key, item] of next) if (previous.get(key) !== item) style.setProperty(key, item);
  previous.clear();
  for (const [key, item] of next) previous.set(key, item);
  if (!next.size) element.removeAttribute('style');
}

function setAttribute(element: Element, key: string, value: unknown): void {
  if (key === 'innerHTML' || key === 'outerHTML' || key === 'textContent' || key === 'innerText') {
    throw new Error(`${key} 会绕过 JSX 所有权，请使用 children 或明确的 DOM ref 集成。`);
  }
  if (
    (key === 'selected' && element.localName === 'option') ||
    (key === 'muted' && key in element)
  ) {
    const next = Boolean(value);
    element.toggleAttribute(key, next);
    if (Reflect.get(element, key) !== next) Reflect.set(element, key, next);
    return;
  }
  const name = attributeName(key, element.namespaceURI ?? HTML);
  const next = attributeValue(name, value);
  if (name.startsWith('xlink:')) {
    if (next === null) element.removeAttributeNS('http://www.w3.org/1999/xlink', name.slice(6));
    else element.setAttributeNS('http://www.w3.org/1999/xlink', name, next);
  } else if (next === null) element.removeAttribute(name);
  else element.setAttribute(name, next);
}

export function attachAttributes(
  element: Element,
  input: Props,
  hydration?: HydrationSession,
): void {
  const previous = new Map<string, unknown>();
  const styles = new Map<string, string>();
  const events = new Map<string, EventBinding>();
  const control = bindControl(element, input, hydration, (type) =>
    [...events.values()].some((binding) => binding.type === type),
  );
  onCleanup(() => {
    for (const binding of events.values())
      element.removeEventListener(binding.type, binding.listener, binding.capture);
  });
  renderEffect(() => {
    control?.track();
    nativeAttributes(input, element.localName, element.namespaceURI ?? HTML);
    const next = new Map(
      Object.keys(input)
        .filter((key) => key !== 'children' && key !== 'ref' && key !== 'key')
        .sort((left, right) => Number(properties.has(left)) - Number(properties.has(right)))
        .map((key) => [key, input[key]]),
    );
    for (const key of previous.keys()) if (!next.has(key)) next.set(key, undefined);
    for (const [key, value] of next) {
      if (control && controlProperties.has(key)) continue;
      if (key === 'style') {
        applyStyle(element, value, styles);
        continue;
      }
      const event = eventName(key);
      if (event) {
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
      } else if (!Object.is(previous.get(key), value) || !previous.has(key))
        setAttribute(element, key, value);
    }
    previous.clear();
    for (const [key, value] of next) if (value !== undefined) previous.set(key, value);
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
