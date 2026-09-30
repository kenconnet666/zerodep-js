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
  'allowfullscreen async autofocus autoplay checked controls default defer disabled formnovalidate inert ismap itemscope loop multiple muted nomodule novalidate open playsinline readonly required reversed selected'.split(
    ' ',
  ),
);
const enumerated = new Set([
  'draggable',
  'spellcheck',
  'contenteditable',
  'focusable',
  'externalresourcesrequired',
  'displaystyle',
  'stretchy',
  'symmetric',
  'fence',
  'separator',
  'largeop',
  'movablelimits',
  'accent',
  'accentunder',
]);
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
  defaultValue: 'value',
  defaultChecked: 'checked',
  defaultSelected: 'selected',
  xlinkHref: 'xlink:href',
  xmlLang: 'xml:lang',
  xmlSpace: 'xml:space',
  xmlnsXlink: 'xmlns:xlink',
};

// 这些 presentation 属性允许 camelCase；viewBox 等大小写敏感名称保持原样。
export const svgAliases = {
  alignmentBaseline: 'alignment-baseline',
  baselineShift: 'baseline-shift',
  clipPath: 'clip-path',
  clipRule: 'clip-rule',
  colorInterpolation: 'color-interpolation',
  colorInterpolationFilters: 'color-interpolation-filters',
  dominantBaseline: 'dominant-baseline',
  fillOpacity: 'fill-opacity',
  fillRule: 'fill-rule',
  floodColor: 'flood-color',
  floodOpacity: 'flood-opacity',
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontStyle: 'font-style',
  fontWeight: 'font-weight',
  imageRendering: 'image-rendering',
  letterSpacing: 'letter-spacing',
  lightingColor: 'lighting-color',
  markerEnd: 'marker-end',
  markerMid: 'marker-mid',
  markerStart: 'marker-start',
  paintOrder: 'paint-order',
  pointerEvents: 'pointer-events',
  shapeRendering: 'shape-rendering',
  stopColor: 'stop-color',
  stopOpacity: 'stop-opacity',
  strokeDasharray: 'stroke-dasharray',
  strokeDashoffset: 'stroke-dashoffset',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeMiterlimit: 'stroke-miterlimit',
  strokeOpacity: 'stroke-opacity',
  strokeWidth: 'stroke-width',
  textAnchor: 'text-anchor',
  textDecoration: 'text-decoration',
  textRendering: 'text-rendering',
  vectorEffect: 'vector-effect',
  wordSpacing: 'word-spacing',
  writingMode: 'writing-mode',
};

// 对齐 text/html 解析器的大小写修正规则，保证 SSR 与 createElementNS 路径一致。
const svgCase = new Map(
  'attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits diffuseConstant edgeMode filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan'
    .split(' ')
    .map((name) => [name.toLowerCase(), name]),
);

export function namespaceFor(
  tag: string,
  parentNamespace = HTML,
  parentTag = '',
  encoding = '',
): string {
  if (parentNamespace === SVG && !['foreignObject', 'desc', 'title'].includes(parentTag))
    return SVG;
  if (parentNamespace === MATH) {
    const text = ['mi', 'mo', 'mn', 'ms', 'mtext'].includes(parentTag);
    const annotation = parentTag === 'annotation-xml';
    if (annotation && tag === 'svg') return SVG;
    if (
      !(text && tag !== 'mglyph' && tag !== 'malignmark') &&
      !(annotation && ['text/html', 'application/xhtml+xml'].includes(encoding.toLowerCase()))
    )
      return MATH;
  }
  if (tag === 'svg') return SVG;
  if (tag === 'math') return MATH;
  return HTML;
}

export function attributeNamespace(name: string, namespace: string): string | null {
  if (namespace === HTML) return null;
  if (/^xlink:(actuate|arcrole|href|role|show|title|type)$/.test(name))
    return 'http://www.w3.org/1999/xlink';
  if (name === 'xml:lang' || name === 'xml:space') return 'http://www.w3.org/XML/1998/namespace';
  if (name === 'xmlns' || name === 'xmlns:xlink') return 'http://www.w3.org/2000/xmlns/';
  return null;
}

export function assertName(name: string): void {
  if (!/^[:_\p{L}][:_\p{L}\p{N}\p{M}.\-\u00b7]*$/u.test(name))
    throw new Error(`无效的 DOM 名称：${name}`);
}

export function textValue(value: unknown): string {
  return String(value).replace(/\0/g, '\ufffd');
}

export function selectionValues(value: unknown): Set<string> {
  const items: unknown[] = Array.isArray(value) ? value : [value ?? ''];
  if (items.some((item) => typeof item !== 'string' && typeof item !== 'number'))
    throw new Error('select 的值使用字符串、数字或其数组。');
  return new Set(items.map(textValue));
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
      : namespace === SVG && Object.hasOwn(svgAliases, key)
        ? svgAliases[key as keyof typeof svgAliases]
        : key;
  assertName(name);
  // HTML 只折叠 ASCII 大写字母，不能改变 data-Ä 等自定义名称中的 Unicode 字符。
  const lower = name.replace(/[A-Z]/g, (letter) => letter.toLowerCase());
  if (namespace === SVG) return svgCase.get(lower) ?? lower;
  return namespace === MATH && lower === 'definitionurl' ? 'definitionURL' : lower;
}

export function attributeValue(name: string, value: unknown, namespace = HTML): string | null {
  const lower = name.toLowerCase();
  if (
    value != null &&
    (typeof value === 'function' || typeof value === 'symbol' || typeof value === 'object')
  )
    throw new Error(`原生属性 ${name} 需要标量值。`);
  if (namespace === HTML && lower === 'hidden')
    return value == null || value === false ? null : value === true ? '' : textValue(value);
  if (namespace === HTML && lower === 'translate' && typeof value === 'boolean')
    return value ? 'yes' : 'no';
  if (
    value == null ||
    (value === false &&
      !lower.startsWith('aria-') &&
      !lower.startsWith('data-') &&
      !enumerated.has(lower))
  )
    return null;
  if (namespace === HTML && booleans.has(lower)) return value ? '' : null;
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
  if (tag === 'input' && input.type === 'file' && (input.value ?? input.defaultValue ?? '') !== '')
    throw new Error('文件输入不能设置非空 value/defaultValue。');
  if (tag === 'select' && !input.multiple && Array.isArray(input.value ?? input.defaultValue))
    throw new Error('数组 value/defaultValue 需要 multiple select。');
  const attributes = new Map<string, string>();
  for (const key of Object.keys(input)) {
    if (key === 'children' || key === 'ref' || key === 'key' || eventName(key)) continue;
    if (tag === 'input' && key === 'indeterminate') continue;
    // undefined 的表单模型表示没有接管，不能清掉仍有效的首次默认值。
    if (
      namespace === HTML &&
      input[key] === undefined &&
      [
        'value',
        'defaultValue',
        'checked',
        'defaultChecked',
        'selected',
        'defaultSelected',
      ].includes(key)
    )
      continue;
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
      name === 'style'
        ? styleText(input[key]) || null
        : attributeValue(name, input[key], namespace);
    if (value === null) attributes.delete(name);
    else attributes.set(name, value);
  }
  return attributes;
}
