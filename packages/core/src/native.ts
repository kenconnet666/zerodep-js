import { TEMPLATE, type Renderable } from './template.js';
import type { Props } from './props.js';

export const HTML = 'http://www.w3.org/1999/xhtml';
export const SVG = 'http://www.w3.org/2000/svg';
export const MATH = 'http://www.w3.org/1998/Math/MathML';
export const voidTags = new Set(
  'area base br col embed hr img input link meta param source track wbr'.split(' '),
);
export const textTags = new Set(['title', 'textarea', 'script', 'style', 'option']);
const booleans = new Set(
  'allowfullscreen async autofocus autoplay checked controls default defer disabled formnovalidate hidden inert ismap itemscope loop multiple muted nomodule novalidate open playsinline readonly required reversed selected'.split(
    ' ',
  ),
);
const enumerated = new Set(['draggable', 'spellcheck', 'contenteditable']);
const aliases: Record<string, string> = {
  className: 'class',
  htmlFor: 'for',
  tabIndex: 'tabindex',
  readOnly: 'readonly',
  contentEditable: 'contenteditable',
  crossOrigin: 'crossorigin',
  noValidate: 'novalidate',
  acceptCharset: 'accept-charset',
  httpEquiv: 'http-equiv',
  strokeWidth: 'stroke-width',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  fillRule: 'fill-rule',
  defaultValue: 'value',
  defaultChecked: 'checked',
  xlinkHref: 'xlink:href',
};

export function namespaceFor(tag: string, parentNamespace = HTML, parentTag = ''): string {
  if (tag === 'svg') return SVG;
  if (tag === 'math') return MATH;
  if (parentNamespace === SVG && parentTag !== 'foreignObject') return SVG;
  if (parentNamespace === MATH && parentTag !== 'annotation-xml') return MATH;
  return HTML;
}

export function assertName(name: string): void {
  if (!/^[:_\p{L}][:_\p{L}\p{N}\p{M}.\-\u00b7]*$/u.test(name))
    throw new Error(`无效的 DOM 名称：${name}`);
}

export function textValue(value: unknown): string {
  return String(value).replace(/\0/g, '\ufffd');
}

export function eventName(name: string): { type: string; capture: boolean } | null {
  if (/^on:/i.test(name)) return { type: name.slice(3), capture: false };
  if (!/^on[a-z]/i.test(name)) return null;
  const capture =
    name.endsWith('Capture') && name !== 'onGotPointerCapture' && name !== 'onLostPointerCapture';
  return { type: name.slice(2, capture ? -7 : undefined).toLowerCase(), capture };
}

export function attributeName(key: string, namespace = HTML): string {
  const name = /^aria[A-Z]/.test(key)
    ? `aria-${key.slice(4).toLowerCase()}`
    : Object.hasOwn(aliases, key)
      ? aliases[key]!
      : key;
  assertName(name);
  return namespace === HTML ? name.toLowerCase() : name;
}

export function attributeValue(name: string, value: unknown): string | null {
  const lower = name.toLowerCase();
  if (
    value == null ||
    (value === false &&
      !lower.startsWith('aria-') &&
      !lower.startsWith('data-') &&
      !enumerated.has(lower))
  )
    return null;
  if (booleans.has(lower)) return value ? '' : null;
  if (typeof value === 'function' || typeof value === 'symbol' || typeof value === 'object')
    throw new Error(`原生属性 ${name} 需要标量值。`);
  return value === true &&
    !lower.startsWith('aria-') &&
    !lower.startsWith('data-') &&
    !enumerated.has(lower)
    ? ''
    : textValue(value);
}

export function styleEntries(value: unknown): Map<string, string> {
  const entries = new Map<string, string>();
  if (value == null || value === false) return entries;
  if (typeof value !== 'object') throw new Error('style 使用 CSS 字符串或属性对象。');
  for (const key of Object.keys(value)) {
    const item: unknown = Reflect.get(value, key);
    if (item == null || item === false) continue;
    const name = key.startsWith('--')
      ? key
      : key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/^ms-/, '-ms-');
    if (!/^(?:--[-_\p{L}\p{N}]+|-?[a-z][a-z0-9-]*)$/u.test(name))
      throw new Error(`无效的 CSS 属性名：${key}`);
    entries.set(name, textValue(item));
  }
  return entries;
}

export function styleText(value: unknown): string {
  return typeof value === 'string'
    ? value
    : [...styleEntries(value)].map(([name, item]) => `${name}:${item}`).join(';');
}

/** 文本专用元素不能放入结构标记，也不能把模板对象直接转成字符串。 */
export function textContent(value: Renderable): string {
  if (value == null || typeof value === 'boolean') return '';
  if (typeof value !== 'object') return textValue(value);
  if (Array.isArray(value)) return value.map(textContent).join('');
  if (TEMPLATE in value) {
    if (value.kind === 'dynamic') return textContent(value.value.read());
    if (value.kind === 'fragment') return value.children.map(textContent).join('');
  }
  throw new Error('文本专用元素只接受文本、数组和派生文本，不接受子组件或元素。');
}

export function elementText(tag: string, input: Props): string {
  if (tag === 'textarea' && (input.value !== undefined || input.defaultValue !== undefined)) {
    if (input.children != null)
      throw new Error('textarea 的 value/defaultValue 与 children 不能同时提供。');
    return textValue(input.value ?? input.defaultValue ?? '');
  }
  const value = textContent(input.children as Renderable);
  return tag === 'script' || tag === 'style' ? value.replace(/\r\n?/g, '\n') : value;
}

export function nativeAttributes(input: Props, tag: string, namespace = HTML): Map<string, string> {
  if (input.value !== undefined && input.defaultValue !== undefined)
    throw new Error('value 与 defaultValue 不能同时提供。');
  if (input.checked !== undefined && input.defaultChecked !== undefined)
    throw new Error('checked 与 defaultChecked 不能同时提供。');
  const attributes = new Map<string, string>();
  for (const key of Object.keys(input)) {
    if (key === 'children' || key === 'ref' || key === 'key' || eventName(key)) continue;
    if (key === 'innerHTML' || key === 'outerHTML' || key === 'textContent' || key === 'innerText')
      throw new Error(`${key} 会绕过 JSX 所有权，请使用 children 或 DOM ref。`);
    if (
      namespace === HTML &&
      (tag === 'textarea' || tag === 'select') &&
      (key === 'value' || key === 'defaultValue')
    )
      continue;
    const name = attributeName(key, namespace);
    const value =
      key === 'style' ? styleText(input[key]) || null : attributeValue(name, input[key]);
    if (value !== null) attributes.set(name, value);
  }
  return attributes;
}
