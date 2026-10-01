/** 这些 DOM 成员没有等价的同名内容属性；类型与运行时共同使用此表。 */
export const clientProperties = [
  'scrollTop',
  'scrollLeft',
  'selectionStart',
  'selectionEnd',
  'selectionDirection',
  'valueAsNumber',
  'valueAsDate',
  'selectedIndex',
  'currentTime',
  'playbackRate',
  'defaultPlaybackRate',
  'volume',
  'preservesPitch',
  'returnValue',
  'srcObject',
  'files',
  'defaultMuted',
  'hash',
  'host',
  'hostname',
  'pathname',
  'port',
  'protocol',
  'search',
  'currentScale',
] as const;
export const ownedProperties = [
  'innerHTML',
  'outerHTML',
  'textContent',
  'innerText',
  'outerText',
  'children',
  'childNodes',
  'style',
  'shadowRoot',
  '__proto__',
  'constructor',
  'prototype',
  'appendChild',
  'append',
  'prepend',
  'insertBefore',
  'replaceChild',
  'removeChild',
  'replaceChildren',
  'remove',
  'before',
  'after',
  'replaceWith',
  'insertAdjacentElement',
  'insertAdjacentHTML',
  'insertAdjacentText',
  'attachShadow',
  'setAttribute',
  'setAttributeNS',
  'removeAttribute',
  'removeAttributeNS',
  'toggleAttribute',
  'addEventListener',
  'removeEventListener',
] as const;
export const formProperties = [
  'value',
  'defaultValue',
  'checked',
  'defaultChecked',
  'indeterminate',
  'selected',
  'defaultSelected',
  'type',
  'multiple',
  'name',
  'size',
] as const;

const clientNames = new Map(clientProperties.map((name) => [name.toLowerCase(), name]));
const owned = new Set<string>(ownedProperties);
const forms = new Set<string>(formProperties);

export function clientProperty(key: string): string | undefined {
  return clientNames.get(key.toLowerCase());
}

export function ownsContent(tag: string, name: string): boolean {
  return (
    (['a', 'script', 'title', 'option'].includes(tag) && name === 'text') ||
    (tag === 'output' && (name === 'value' || name === 'defaultValue')) ||
    (tag === 'select' && name === 'length') ||
    (tag === 'table' && ['caption', 'tHead', 'tFoot'].includes(name))
  );
}

/** 这里只校验源码约定；SSR 不读取或执行 property 的值。 */
export function propertyName(key: string, tag: string, html: boolean): string | null {
  if (!key.startsWith('prop:')) return null;
  const name = key.slice(5);
  if (
    !/^[$_\p{L}][$_\p{L}\p{N}-]*$/u.test(name) ||
    owned.has(name) ||
    (html && ownsContent(tag, name))
  )
    throw new Error(`${key} 会绕过元素或子内容所有权，请使用 children、style 或有清理的 DOM ref。`);
  if (html && ['input', 'select', 'textarea', 'option'].includes(tag) && forms.has(name))
    throw new Error(`${key} 不用于内建表单模型或模式，请使用普通的 ${name} 属性。`);
  return name;
}
