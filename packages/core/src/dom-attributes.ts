import { Scope, onCleanup, renderEffect, untrack, unowned } from './reactivity.js';
import type { Props } from './props.js';

const booleanAttributes = new Set(
  'allowfullscreen async autofocus autoplay checked controls default defer disabled formnovalidate hidden inert ismap itemscope loop multiple muted nomodule novalidate open playsinline readonly required reversed selected'.split(
    ' ',
  ),
);
const aliases: Record<string, string> = {
  className: 'class',
  htmlFor: 'for',
  tabIndex: 'tabindex',
  readOnly: 'readonly',
  contentEditable: 'contenteditable',
  crossOrigin: 'crossorigin',
  noValidate: 'novalidate',
  strokeWidth: 'stroke-width',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  fillRule: 'fill-rule',
};
const properties = new Set(['value', 'checked', 'selected', 'muted']);
const enumerated = new Set(['draggable', 'spellcheck', 'contenteditable']);

interface EventBinding {
  type: string;
  capture: boolean;
  current: (event: Event) => void;
  listener: EventListener;
}

function eventName(name: string): { type: string; capture: boolean } | null {
  if (name.startsWith('on:')) return { type: name.slice(3), capture: false };
  if (!/^on[a-zA-Z]/.test(name)) return null;
  const capture =
    name.endsWith('Capture') && name !== 'onGotPointerCapture' && name !== 'onLostPointerCapture';
  return { type: name.slice(2, capture ? -7 : undefined).toLowerCase(), capture };
}

function cssName(name: string): string {
  return name.startsWith('--')
    ? name
    : name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/^ms-/, '-ms-');
}

function applyStyle(element: Element, value: unknown, previous: Map<string, string>): void {
  const style = (element as HTMLElement | SVGElement).style;
  if (typeof value === 'string') {
    if (element.getAttribute('style') !== value) element.setAttribute('style', value);
    previous.clear();
    return;
  }
  const next = new Map<string, string>();
  if (value != null && value !== false) {
    if (typeof value !== 'object') throw new Error('style 使用 CSS 字符串或属性对象。');
    for (const key of Object.keys(value)) {
      const item: unknown = Reflect.get(value, key);
      if (item != null && item !== false) next.set(cssName(key), String(item));
    }
  }
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
    const next = key === 'value' ? (value == null ? '' : String(value)) : Boolean(value);
    if (!Object.is(Reflect.get(element, key), next)) Reflect.set(element, key, next);
    return;
  }
  const name = Object.hasOwn(aliases, key) ? aliases[key]! : key;
  const lower = name.toLowerCase();
  if (
    value == null ||
    (value === false &&
      !name.startsWith('aria-') &&
      !name.startsWith('data-') &&
      !enumerated.has(lower))
  ) {
    element.removeAttribute(name);
  } else if (booleanAttributes.has(lower)) {
    element.toggleAttribute(name, Boolean(value));
  } else {
    element.setAttribute(
      name,
      value === true &&
        !name.startsWith('aria-') &&
        !name.startsWith('data-') &&
        !enumerated.has(lower)
        ? ''
        : String(value),
    );
  }
}

export function attachAttributes(element: Element, input: Props): void {
  const previous = new Map<string, unknown>();
  const styles = new Map<string, string>();
  const events = new Map<string, EventBinding>();
  onCleanup(() => {
    for (const binding of events.values())
      element.removeEventListener(binding.type, binding.listener, binding.capture);
  });
  renderEffect(() => {
    const next = new Map(
      Object.keys(input)
        .filter((key) => key !== 'children' && key !== 'ref' && key !== 'key')
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
      } else if (!Object.is(previous.get(key), value) || !previous.has(key))
        setAttribute(element, key, value);
    }
    previous.clear();
    for (const [key, value] of next) if (value !== undefined) previous.set(key, value);
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
