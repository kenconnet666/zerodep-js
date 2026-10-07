import { TEMPLATE, type Renderable } from '../runtime/template.js';
import type { Props } from '../runtime/props.js';
import { clientProperty, ownsContent, propertyName } from './properties.js';
import { styleText } from './style.js';
import { textValue } from './text.js';
import { svgAliases } from './data.js';

export { textValue } from './text.js';

export const HTML = 'http://www.w3.org/1999/xhtml';
export const SVG = 'http://www.w3.org/2000/svg';
export const MATH = 'http://www.w3.org/1998/Math/MathML';
export const voidTags = new Set(
  'area base br col embed hr img input link meta param source track wbr'.split(' '),
);
export const rawTextTags = new Set(['script', 'style', 'iframe', 'xmp', 'noembed', 'noframes']);
// output 的 form.reset 会替换子文本，不能在其中依赖结构注释或持久 Text 节点身份。
export const textTags = new Set(['title', 'textarea', 'option', 'output', ...rawTextTags]);
const asciiLower = (value: string) => value.replace(/[A-Z]/g, (letter) => letter.toLowerCase());
// HTML 解析器会修正这些 SVG 名称；createElementNS 必须使用相同拼写。
const svgTags = new Map(
  'altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath'
    .split(' ')
    .map((name) => [asciiLower(name), name]),
);

export function elementName(name: string, namespace: string): string {
  if (!/^[A-Za-z][\p{L}\p{N}\p{M}._\-\u00b7]*$/u.test(name))
    throw new Error(`无效的 HTML 元素名：${name}；使用 ASCII 字母开头且不含冒号的名称。`);
  const lower = asciiLower(name);
  if (namespace === HTML && lower === 'plaintext')
    throw new Error('plaintext 无法结束 HTML 解析，不能用于可接管内容；请使用 pre。');
  return namespace === SVG ? (svgTags.get(lower) ?? lower) : lower;
}
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
  'preservealpha',
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
  tag = asciiLower(tag);
  parentTag = asciiLower(parentTag);
  if (parentNamespace === SVG && !['foreignobject', 'desc', 'title'].includes(parentTag))
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

export function selectionValues(value: unknown): Set<string> {
  const items: unknown[] = Array.isArray(value) ? value : [value ?? ''];
  if (items.some((item) => typeof item !== 'string' && typeof item !== 'number'))
    throw new Error('select 的值使用字符串、数字或其数组。');
  return new Set(items.map(textValue));
}

export function eventName(name: string): { type: string; capture: boolean } | null {
  if (/^oncapture:/i.test(name)) return { type: name.slice(10), capture: true };
  if (/^on:/i.test(name)) return { type: name.slice(3), capture: false };
  if (!/^on[a-z]/i.test(name)) return null;
  const capture =
    name.endsWith('Capture') && name !== 'onGotPointerCapture' && name !== 'onLostPointerCapture';
  return { type: name.slice(2, capture ? -7 : undefined).toLowerCase(), capture };
}

export function attributeName(key: string, namespace = HTML, tag = ''): string {
  // 这些历史 DOM 别名只属于相应 HTML 元素，不能改写 MathML 或自定义元素的同名输入。
  if (namespace === HTML) {
    if (tag === 'form' && key === 'encoding') return 'enctype';
    if (['col', 'colgroup', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr'].includes(tag)) {
      if (key === 'ch') return 'char';
      if (key === 'chOff') return 'charoff';
    }
  }
  const name = /^aria[A-Z]/.test(key)
    ? `aria-${key.slice(4).toLowerCase()}`
    : Object.hasOwn(aliases, key)
      ? aliases[key]!
      : namespace === SVG && Object.hasOwn(svgAliases, key)
        ? svgAliases[key as keyof typeof svgAliases]
        : key;
  assertName(name);
  // HTML 只折叠 ASCII 大写字母，不能改变 data-Ä 等自定义名称中的 Unicode 字符。
  const lower = asciiLower(name);
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
  if (!rawTextTags.has(tag)) return value;
  const text = value.replace(/\r\n?/g, '\n');
  if (new RegExp(`</${tag}(?:[\\t\\n\\f\\r />])`, 'i').test(text))
    throw new Error(`${tag} 文本包含结束标签，请使用安全的数据序列化入口。`);
  if (tag === 'script') {
    // 仅检查 HTML 解析状态，不改写 JS。双重转义会吞掉真正的 </script> 和后续页面。
    let escaped = false;
    for (const [token] of text.matchAll(/<!--|-->|<script(?=[\t\n\f\r />])/gi)) {
      if (token === '<!--') escaped = true;
      else if (token === '-->') escaped = false;
      else if (escaped)
        throw new Error('script 文本包含 HTML 双重转义序列；JSON 请使用 serializeData。');
    }
    if (escaped) throw new Error('script 文本包含未闭合的 HTML 注释；JSON 请使用 serializeData。');
  }
  return text;
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
  const propertyAttributes = new Set<string>();
  for (const key of Object.keys(input)) {
    if (key === 'children' || key === 'ref' || key === 'key' || eventName(key)) continue;
    if (key.startsWith('bind:'))
      throw new Error('bind:* 必须直接写在经过编译的 JSX 属性中，不能作为普通值 spread。');
    if (
      namespace === HTML &&
      (key.toLowerCase() === 'is' ||
        (tag === 'template' && key.toLowerCase().startsWith('shadowroot')))
    )
      throw new Error('当前不支持 is 或声明式 shadow root；请使用已注册的独立自定义元素。');
    const property = propertyName(key, tag, namespace === HTML);
    if (property) {
      propertyAttributes.add(attributeName(property, namespace, tag));
      if (
        namespace === HTML &&
        input.value !== undefined &&
        ['input', 'select'].includes(tag) &&
        ['valueAsNumber', 'valueAsDate', 'selectedIndex', 'files'].includes(property)
      )
        throw new Error(`prop:${property} 与 value 模型不能同时拥有同一个表单状态。`);
      continue;
    }
    const client = clientProperty(key);
    if (client && !(namespace === HTML && tag.includes('-')))
      throw new Error(`${key} 是 DOM property，请使用 prop:${client}。`);
    if (namespace === HTML && ownsContent(tag, key))
      throw new Error(`${key} 会改写子内容，请使用 children。`);
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
    const name = attributeName(key, namespace, tag);
    const value =
      name === 'style'
        ? styleText(input[key]) || null
        : attributeValue(name, input[key], namespace);
    if (value === null) attributes.delete(name);
    else attributes.set(name, value);
  }
  for (const name of propertyAttributes)
    if (attributes.has(name)) throw new Error(`${name} 不能同时由 attribute 和 prop:* 绑定。`);
  return attributes;
}
