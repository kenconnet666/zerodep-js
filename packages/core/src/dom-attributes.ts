import { Scope, onCleanup, renderEffect, untrack, unowned } from './reactivity.js';
import type { Props } from './props.js';
import type { HydrationSession } from './hydration.js';
import {
  HTML,
  attributeName,
  attributeValue,
  eventName,
  nativeAttributes,
  styleEntries,
  textValue,
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
  current: (event: Event) => void;
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
  if (properties.has(key) && key in element) {
    if ((key === 'value' || key === 'defaultValue') && element.localName === 'select') {
      const values = new Set((Array.isArray(value) ? value : [value ?? '']).map(textValue));
      let matched = false;
      for (const option of (element as HTMLSelectElement).options) {
        const selected: boolean =
          values.has(option.value) && ((element as HTMLSelectElement).multiple || !matched);
        option.selected = selected;
        matched ||= selected;
      }
      if (!matched) (element as HTMLSelectElement).selectedIndex = -1;
      return;
    }
    const next =
      key === 'value' || key === 'defaultValue'
        ? value == null
          ? ''
          : textValue(value)
        : Boolean(value);
    if (!Object.is(Reflect.get(element, key), next)) Reflect.set(element, key, next);
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
  const control = element as HTMLInputElement | HTMLTextAreaElement;
  const editedValue = Boolean(
    hydration &&
    input.value !== undefined &&
    (element.localName === 'input' || element.localName === 'textarea') &&
    (element.localName !== 'input' ||
      !['checkbox', 'radio'].includes((element as HTMLInputElement).type)) &&
    control.value !==
      (element.localName === 'textarea'
        ? control.defaultValue
        : (element.getAttribute('value') ?? '')),
  );
  const editedChecked = Boolean(
    hydration &&
    input.checked !== undefined &&
    element.localName === 'input' &&
    (element as HTMLInputElement).checked !== element.hasAttribute('checked'),
  );
  let initial = true;
  onCleanup(() => {
    for (const binding of events.values())
      element.removeEventListener(binding.type, binding.listener, binding.capture);
  });
  renderEffect(() => {
    nativeAttributes(input, element.localName, element.namespaceURI ?? HTML);
    const next = new Map(
      Object.keys(input)
        .filter((key) => key !== 'children' && key !== 'ref' && key !== 'key')
        .sort((left, right) => Number(properties.has(left)) - Number(properties.has(right)))
        .map((key) => [key, input[key]]),
    );
    for (const key of previous.keys()) if (!next.has(key)) next.set(key, undefined);
    for (const [key, value] of next) {
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
              current: value as (event: Event) => void,
              listener: (event) => {
                unowned(() => binding!.current.call(element, event));
              },
            };
            events.set(key, binding);
            element.addEventListener(binding.type, binding.listener, binding.capture);
          } else binding.current = value as (event: Event) => void;
        }
      } else if (
        initial &&
        ((key === 'value' && editedValue) || (key === 'checked' && editedChecked))
      )
        continue;
      else if (!Object.is(previous.get(key), value) || !previous.has(key))
        setAttribute(element, key, value);
    }
    previous.clear();
    for (const [key, value] of next) if (value !== undefined) previous.set(key, value);
    initial = false;
  });
  if (editedValue || editedChecked)
    hydration!.replay(() => {
      if (
        !element.isConnected ||
        (element.localName === 'input' &&
          (element as HTMLInputElement).type === 'radio' &&
          !(element as HTMLInputElement).checked)
      )
        return;
      const available = new Set([...events.values()].map((binding) => binding.type));
      const type =
        editedChecked && available.has('change')
          ? 'change'
          : available.has('input')
            ? 'input'
            : available.has('change')
              ? 'change'
              : undefined;
      if (type)
        element.dispatchEvent(
          new element.ownerDocument.defaultView!.Event(type, { bubbles: true, composed: true }),
        );
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
