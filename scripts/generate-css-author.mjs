import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';
import { parse } from '@babel/parser';
import {
  units,
  extraUnits,
  unitMethod,
  rawMethod,
  valueMethods,
  gridMethods,
} from './css-author-methods.mjs';
import {
  jsdoc,
  propertyDocumentation,
  keywordDocumentation,
  validatePropertyDocs,
  validateKeywordDocs,
  selectorDescriptions,
} from './css-author-docs.mjs';
import { selectorShortcuts } from '../packages/css/src/util/author.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const input = resolve(root, 'packages/css/node_modules/csstype/index.d.ts');
const outputDir = resolve(root, 'packages/css/src/generated');
const config = JSON.parse(await readFile(resolve(root, 'scripts/css-author-notes.json'), 'utf8'));
const version = JSON.parse(
  await readFile(resolve(root, 'packages/css/node_modules/csstype/package.json'), 'utf8'),
).version;
const mode = process.argv[2];
if (!['--write', '--check'].includes(mode) || process.argv.length !== 3)
  throw new Error('Use --write or --check.');

// 只解析 csstype 的声明数据，复用框架 Babel；类型检查仍由唯一的 TS7 SDK 负责。
const sourceText = await readFile(input, 'utf8');
const ast = parse(sourceText, { sourceType: 'module', plugins: ['typescript'] });
const interfaces = new Map();
const aliases = new Map();
function collect(body, scope = '') {
  for (const entry of body) {
    const node = entry.type === 'ExportNamedDeclaration' ? entry.declaration : entry;
    if (!node) continue;
    if (node.type === 'TSModuleDeclaration') collect(node.body.body, node.id.name);
    if (node.type === 'TSTypeAliasDeclaration')
      aliases.set(scope ? scope + '.' + node.id.name : node.id.name, { node, scope });
    if (node.type === 'TSInterfaceDeclaration') interfaces.set(node.id.name, node);
  }
}
collect(ast.program.body);
const textOf = (node) => sourceText.slice(node.start, node.end);
const typeName = (node) =>
  node.type === 'Identifier' ? node.name : typeName(node.left) + '.' + node.right.name;
function valuesOf(node, scope = '', parameters = new Map(), seen = new Set()) {
  if (!node) return [];
  if (node.type === 'TSLiteralType') return [node.literal.value];
  if (node.type === 'TSNumberKeyword') return [0];
  if (node.type === 'TSUnionType' || node.type === 'TSIntersectionType')
    return node.types.flatMap((item) => valuesOf(item, scope, parameters, seen));
  if (node.type === 'TSParenthesizedType')
    return valuesOf(node.typeAnnotation, scope, parameters, seen);
  if (node.type !== 'TSTypeReference') return [];
  const name = typeName(node.typeName);
  if (parameters.has(name)) return parameters.get(name);
  // csstype 的根接口默认长度允许 0，时间参数默认开放字符串。
  if (name === 'TLength') return [0];
  if (name === 'TTime') return [];
  const key = aliases.has(scope + '.' + name) ? scope + '.' + name : name;
  const alias = aliases.get(key);
  if (!alias) throw new Error('Unknown csstype alias: ' + key);
  if (seen.has(key)) throw new Error('Recursive csstype alias: ' + key);
  const next = new Map();
  for (const [index, param] of (alias.node.typeParameters?.params ?? []).entries()) {
    const argument = node.typeParameters?.params[index];
    next.set(
      param.name,
      valuesOf(argument ?? param.default, argument ? scope : alias.scope, parameters, seen),
    );
  }
  return valuesOf(alias.node.typeAnnotation, alias.scope, next, new Set([...seen, key]));
}
function membersOf(name) {
  const declaration = interfaces.get(name);
  if (!declaration) throw new Error('Missing csstype interface ' + name);
  return declaration.body.body
    .filter((node) => node.type === 'TSPropertySignature')
    .map((node) => ({
      name: node.key.name ?? node.key.value,
      type: node.typeAnnotation.typeAnnotation,
      docs: (node.leadingComments ?? []).map((comment) => '/*' + comment.value + '*/').join('\n'),
    }));
}
const properties = new Map();
// 同序的 Hyphen 接口给出真正写入 CSS 的属性名；错位时必须停止生成。
for (const [camel, hyphen] of [
  ['StandardLonghandProperties', 'StandardLonghandPropertiesHyphen'],
  ['StandardShorthandProperties', 'StandardShorthandPropertiesHyphen'],
  ['SvgProperties', 'SvgPropertiesHyphen'],
]) {
  const names = membersOf(camel);
  const cssNames = membersOf(hyphen);
  if (names.length !== cssNames.length) throw new Error(`${camel} changed its property count.`);
  for (let index = 0; index < names.length; index++) {
    const member = names[index];
    const cssMember = cssNames[index];
    if (textOf(member.type) !== textOf(cssMember.type))
      throw new Error(`${camel} and ${hyphen} are no longer aligned at ${index}.`);
    if (!properties.has(member.name))
      properties.set(member.name, { member, cssName: cssMember.name });
  }
}

function propertyType(member) {
  const nodes = member.type.type === 'TSUnionType' ? member.type.types : [member.type];
  const reference = nodes.find(
    (node) =>
      node.type === 'TSTypeReference' &&
      node.typeName.type === 'TSQualifiedName' &&
      node.typeName.left.name === 'Property',
  );
  if (!reference) throw new Error(`Missing Property.* type for ${member.name}.`);
  return reference.typeName.right.name;
}

const reserved = new Set([
  'raw',
  'declaration',
  'px',
  'constructor',
  'then',
  '__proto__',
  'prototype',
  'toString',
  'toLocaleString',
  'valueOf',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
]);
function keywordName(value) {
  if (/^-(?:moz|ms|webkit|o)-/i.test(value)) return null;
  const name = value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) || reserved.has(name)) return null;
  return name;
}

function keywordsOf(member) {
  // 开放字符串留给 raw()；只有固定字面量预生成成一行声明。
  const keywords = new Map();
  for (const value of new Set(valuesOf(member.type).filter((item) => typeof item === 'string'))) {
    const name = keywordName(value);
    if (!name) continue;
    if (keywords.has(name) && keywords.get(name) !== value)
      throw new Error(`CSS keyword name collision: ${member.name}.${name}`);
    keywords.set(name, value);
  }
  return [...keywords].sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0));
}

function commentOf(member, name, cssName) {
  return propertyDocumentation(name, cssName, member.docs);
}

const header = [
  `// 由 scripts/generate-css-author.mjs 从 csstype@${version} 生成；请勿手改。`,
  '// 来源许可见 packages/css/THIRD_PARTY_NOTICES.md。',
];
const base = [
  ...header,
  '',
  '/** 保留关键字补全，同时允许任意 CSS 字符串。 */',
  'export type CssString = string & {};',
  '',
  '/** CSS 声明构造基类；供属性子类复用，不验证输入或登记样式。 */',
  'export class CssProperty<V extends string | number = string | number> {',
  '/** 写入声明的 CSS 属性原名。 */',
  '  protected readonly name: string;',
  jsdoc('构造指定 CSS 属性的声明作者。', {
    params: { name: 'CSS 原名，如 background-color；不是 camelCase 字段名。' },
    examples: ["class CustomCss extends CssProperty { constructor() { super('--custom'); } }"],
  }),
  '  constructor(name: string) { this.name = name; }',
  jsdoc('原样拼接当前属性的声明。', {
    params: { value: '属性值；undefined 省略声明，不自动添加单位、不转义或校验。' },
    returns: '形如 name:value; 的完整声明字符串，undefined 返回空字符串。',
  }),
  '  protected declaration(value: string | number | undefined): string { return value === undefined ? "" : `${this.name}:${value};`; }',
  ...rawMethod('V'),
  '}',
  '/** 共享数学方法；泛型保留属性对裸值的具体约束。 */',
  'export class MathCssProperty<V extends string | number = string | number> extends CssProperty<V> {',
  ...valueMethods('V', false, true, 'width'),
  '}',
  '/** 共享颜色方法；格式化后仍调用可覆写的 raw。 */',
  'export class ColorCssProperty<V extends string | number = string | number> extends CssProperty<V> {',
  ...valueMethods('V', true, false, 'color'),
  '}',
  '/** 共享长度和数学方法；值的参照和限制仍由具体 CSS 属性决定。 */',
  'export class LengthCssProperty<V extends string | number = string | number> extends MathCssProperty<V> {',
  ...Object.entries(units).flatMap(([name, suffix]) => unitMethod(name, suffix)),
  '}',
  '/** 同时支持长度与颜色的属性复用此基类，不向其他长度属性开放颜色方法。 */',
  'export class ColorLengthCssProperty<V extends string | number = string | number> extends LengthCssProperty<V> {',
  ...valueMethods('V', true, false, 'color'),
  '}',
  '/** 作者单位方法到原生 CSS 后缀的映射，例如 percent 对应 %。 */',
  `export const unitSuffix: Readonly<Record<string, string>> = ${JSON.stringify({ ...units, ...extraUnits })};`,
];
const groups = ['a', 'b', 'c-f', 'g-l', 'm-o', 'p-r', 's-t', 'u-z'];
const baseImports = new Map(groups.map((group) => [group, new Set()]));
const groupLines = new Map(
  groups.map((group) => [
    group,
    [
      ...header,
      "import type { Property } from 'csstype';",
      "import { initializeKeywordDeclarations } from '../util/keywords.js';",
      "import type { KeywordDeclarations, KeywordValuesOf } from '../util/keywords.js';",
      '// 关键字是实例上的声明字符串；系统实例按属性链惰性创建并共享。',
    ],
  ]),
);
const author = [...header];
for (const [index, group] of groups.entries()) {
  author.push(`import * as group${index} from './${group}.js';`);
}
for (const group of groups) author.push(`export * from './${group}.js';`);

function groupFor(name) {
  const first = name[0].toLowerCase();
  return groups.find((group) => first >= group[0] && first <= group.at(-1));
}

const systemFields = [];
const keywordFields = [];
const keywordCreators = [];
const keywordValues = [];
const systemCreators = [];
const sharedKeywords = new Map();
const sharedKeywordLines = [...header];
const keywordImports = new Map(groups.map((group) => [group, new Set()]));
let keywordCount = 0;
const notes = new Map(config.properties.map((setting) => [setting.name, setting]));
for (const name of notes.keys())
  if (!properties.has(name)) throw new Error(`Unknown CSS property ${name}.`);
const names = [...properties.keys()].sort((left, right) =>
  left < right ? -1 : left > right ? 1 : 0,
);
validatePropertyDocs(names);
const keywordDefinitions = new Map(
  names.map((name) => {
    const { member, cssName } = properties.get(name);
    const keywords = keywordsOf(member);
    const docs = keywords.map(([, value]) =>
      keywordDocumentation(name, cssName, value).replace(
        /CSS 声明：`[^`]+`。/g,
        `默认 CSS 值：\`${value}\`；主题可覆盖。`,
      ),
    );
    return [
      name,
      {
        keywords,
        docs,
        signature: JSON.stringify([keywords, docs.map((doc) => doc.replace(/\s+/g, ' ').trim())]),
      },
    ];
  }),
);
// 常用公共集合优先采用熟悉的属性名；其他集合使用其代表属性名，不把哈希泄漏到类型提示。
const preferred = [
  'all',
  'color',
  'display',
  'position',
  'width',
  'height',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'fontFamily',
  'border',
  'borderStyle',
  'borderWidth',
  'textAlign',
  'overflow',
  'alignItems',
  'justifyContent',
  'cursor',
  'background',
];
const keywordNames = new Map();
const globalKeys = new Set(['inherit', 'initial', 'unset', 'revert', 'revertLayer']);
for (const name of [...preferred, ...names.filter((name) => !preferred.includes(name))]) {
  const definition = keywordDefinitions.get(name);
  if (!definition || keywordNames.has(definition.signature)) continue;
  const extra = definition.keywords.filter(([key]) => !globalKeys.has(key));
  const generic =
    extra.length <= 2 &&
    extra.every(
      ([key, value]) =>
        ['auto', 'none', 'normal'].includes(key) &&
        definition.docs[definition.keywords.findIndex(([entry]) => entry === key)] ===
          `/** 默认 CSS 值：\`${value}\`；主题可覆盖。 */`,
    );
  const label =
    extra.length === 0
      ? 'global'
      : generic
        ? extra.map(([key], index) => (index ? key[0].toUpperCase() + key.slice(1) : key)).join('')
        : name;
  const dataName = `${label}Keywords`;
  if ([...keywordNames.values()].includes(dataName))
    throw new Error(`Keyword group name collision: ${dataName}`);
  keywordNames.set(definition.signature, dataName);
}
for (const name of names) {
  const setting = notes.get(name) ?? { name };
  const found = properties.get(name);
  const { member, cssName } = found;
  const type = propertyType(member);
  const className = `${setting.name[0].toUpperCase()}${setting.name.slice(1)}Css`;
  const { keywords, docs, signature } = keywordDefinitions.get(name);
  validateKeywordDocs(name, keywords);
  const documentation = commentOf(member, name, cssName);
  keywordCount += keywords.length;
  const hasLength = textOf(member.type).includes('TLength');
  const syntax = member.docs.match(/\*\*Syntax\*\*: `([^`]+)`/)?.[1] ?? '';
  const maxArgs =
    setting.maxArguments ??
    setting.maxPxArguments ??
    Number(syntax.match(/\{1,([234])\}/)?.[1] ?? 1);
  const hasPercent =
    setting.percentage ??
    /<(?:length-percentage|percentage|alpha-value|opacity-value)(?:\s[^>]*)?>/.test(syntax);
  const hasTime = textOf(member.type).includes('TTime');
  const hasAngle = /<angle(?:\s[^>]*)?>/.test(syntax);
  const hasColor = keywords.some(([name]) => name === 'red');
  const hasNumber = valuesOf(member.type).some((value) => typeof value === 'number');
  const hasMath = hasLength || hasPercent || hasTime || hasAngle || hasNumber;
  const baseClass = hasColor
    ? hasLength
      ? 'ColorLengthCssProperty'
      : 'ColorCssProperty'
    : hasLength
      ? 'LengthCssProperty'
      : hasMath
        ? 'MathCssProperty'
        : 'CssProperty';
  // 当前颜色+数学组合均属于长度属性；新增组合时明确扩展基类，不能静默漏方法。
  if (hasColor && hasMath && !hasLength) throw new Error(`Unsupported CSS method group: ${name}.`);
  const grid = gridMethods(name);
  const methodNames = [
    ...Object.keys(grid),
    ...(hasLength ? Object.keys(units) : []),
    ...(hasPercent ? ['percent'] : []),
    ...(hasTime ? ['ms', 's'] : []),
    ...(hasAngle ? ['deg', 'grad', 'rad', 'turn'] : []),
    ...(hasColor ? ['rgb', 'hsl', 'oklch', 'oklab'] : []),
    ...(hasLength || hasPercent || hasTime || hasAngle || hasNumber
      ? ['calc', 'min', 'max', 'clamp']
      : []),
  ];
  for (const method of methodNames)
    if (keywords.some(([name]) => name === method))
      throw new Error(`CSS method conflicts with keyword: ${name}.${method}`);
  if (setting.maxPxArguments && (!hasLength || setting.maxPxArguments < 2))
    throw new Error(`Invalid px arity for ${setting.name}.`);
  const group = groupFor(name);
  if (!group) throw new Error(`No generated group for ${name}.`);
  const lines = groupLines.get(group);
  baseImports.get(group).add(baseClass);
  const alias = `group${groups.indexOf(group)}`;
  const keywordClass = className.replace(/Css$/, 'Keywords');
  // 值相同但 auto/normal 等说明不同的属性不能共用文档；不重复附加属性专属声明示例。
  let dataName = sharedKeywords.get(signature);
  if (!dataName) {
    dataName = keywordNames.get(signature);
    sharedKeywords.set(signature, dataName);
    sharedKeywordLines.push(`export const ${dataName} = {`);
    for (const [index, [keyword, value]] of keywords.entries())
      sharedKeywordLines.push(docs[index], `${JSON.stringify(keyword)}: ${JSON.stringify(value)},`);
    sharedKeywordLines.push('} as const;');
  }
  if (!keywordImports.get(group).has(dataName)) {
    keywordImports.get(group).add(dataName);
    lines.push(`import { ${dataName} } from './keyword-sets.js';`);
  }
  lines.push(
    '',
    jsdoc(`${cssName} 的系统关键字值；主题可继承或展开后覆盖，值不包含属性名与分号。`),
    `export type ${keywordClass} = KeywordValuesOf<typeof ${dataName}, Property.${type} | CssString>;`,
    jsdoc(`创建 ${cssName} 的可继承关键字对象；每个实例独立，成员保留语义说明。`, {
      examples: [`new ${keywordClass}()`],
    }),
    `export const ${keywordClass} = class ${keywordClass} { constructor() { Object.assign(this, ${dataName}); } } as new () => ${keywordClass};`,
  );
  keywordFields.push(documentation, `declare readonly ${name}: ${alias}.${keywordClass};`);
  keywordCreators.push(
    `defineKeywordProperty(${JSON.stringify(name)}, () => new ${alias}.${keywordClass}());`,
  );
  keywordValues.push(documentation, `readonly ${name}: Property.${type} | CssString;`);
  lines.push(
    '',
    jsdoc(`${cssName} 作者的运行时方法；公共成员类型由原始关键字定义映射。`),
    `class ${className}Runtime extends ${baseClass}<Property.${type}> {`,
  );
  lines.push(
    jsdoc(`创建 ${cssName} 属性作者；普通使用通过 s.${name} 取得共享实例。`, {
      examples: [`class Custom${className} extends ${className} {}`],
    }),
    `  constructor() { super(${JSON.stringify(cssName)}); initializeKeywordDeclarations(this, ${JSON.stringify(cssName)}, ${dataName}); }`,
  );
  if (hasLength && maxArgs > 1)
    for (const [unit, suffix] of Object.entries(units))
      lines.push(...unitMethod(unit, suffix, 1, maxArgs, true, name));
  if (hasPercent) lines.push(...unitMethod('percent', '%', 1, maxArgs, false, name));
  if (hasTime)
    for (const unit of ['ms', 's']) lines.push(...unitMethod(unit, unit, 1, 1, false, name));
  if (hasAngle)
    for (const unit of ['deg', 'grad', 'rad', 'turn'])
      lines.push(...unitMethod(unit, unit, 1, 1, false, name));
  lines.push(...Object.values(grid).flat(), '}');
  lines.push(
    jsdoc(`${cssName} 属性作者；关键字读取为完整声明字符串，保留中文说明。`),
    `export type ${className} = ${className}Runtime & KeywordDeclarations<${keywordClass}>;`,
    documentation,
    `export const ${className} = ${className}Runtime as new () => ${className};`,
  );
  systemFields.push(
    documentation,
    `  declare readonly ${setting.name}: KeywordAuthor<${alias}.${className}, T[${JSON.stringify(name)}]>;`,
  );
  systemCreators.push(
    `defineSystemProperty(${JSON.stringify(setting.name)}, () => new ${alias}.${className}());`,
  );
}
for (const [group, lines] of groupLines) {
  lines.splice(
    header.length + 1,
    0,
    `import { ${[...baseImports.get(group), 'type CssString'].join(', ')} } from './base.js';`,
  );
}
for (const name of ['_selector', ...Object.keys(selectorShortcuts)]) {
  if (properties.has(name)) throw new Error(`CSS selector method conflicts with property: ${name}`);
}
author.push(
  "import { selectorRule, type CssSelector } from '../util/author.js';",
  "import type { CssInput } from '../util/author.js';",
  "import { SystemKeywords, systemKeywords } from './keywords.js';",
  "export * from './keywords.js';",
  "import { getKeywordSource, setKeywordSource, bindKeywords, type KeywordSource, type KeywordAuthor, type CheckedKeywords } from '../util/keywords.js';",
  '',
  '// 仅在首次构造作者实例时注册，避免未使用的属性链阻止按需打包。',
  'let systemPropertiesReady = false;',
  '/** 系统属性链；项目可通过类继承扩展关键字。 */',
  'export class Css<T extends SystemKeywords = SystemKeywords> {',
  jsdoc('创建作者入口；可注入主题值或由框架跟踪的当前主题读取函数。', {
    params: { theme: '原始关键字值或读取函数；省略时使用系统默认值。' },
    remarks:
      '系统默认属性实例只读共享；注入主题时创建作用域属性视图。主题值变化在下一次读取声明时生效。',
    examples: ['const s = new Css();', 's.display.flex // display:flex;'],
  }),
  '  constructor(theme: KeywordSource<T> & KeywordSource<CheckedKeywords<T>>);',
  jsdoc('创建无主题的系统作者；显式扩展主题类型时必须提供对应值。', {
    params: { args: '系统作者可省略参数；自定义主题作者必须提供主题值或读取函数。' },
    examples: ['const s = new Css();'],
  }),
  '  constructor(...args: SystemKeywords extends T ? [] : [theme: KeywordSource<T> & KeywordSource<CheckedKeywords<T>>]);',
  '  constructor(...args: [theme?: KeywordSource<T> & KeywordSource<CheckedKeywords<T>>]) { initializeSystemProperties(); if (args[0]) setKeywordSource(this, args[0]); }',
  jsdoc('取得当前作用域的原始关键字值；主题读取函数由框架跟踪。', {
    examples: ['const values = new Css().keywords;'],
  }),
  '  get keywords(): T { return (getKeywordSource(this)?.() ?? systemKeywords) as T; }',
  jsdoc('构造原生选择器、@ 规则或动画帧的嵌套声明片段。', {
    params: {
      selector: '选择器、逗号分隔的选择器列表或 @ 规则字符串；& 代表当前规则。',
      parts: '属性声明、嵌套片段、数组或条件空项；展开数组并省略条件空项。',
    },
    returns: '嵌套声明片段；交给 css(...) 后才登记样式。',
    examples: [
      "s._selector('& > span', s.color.red)",
      "s._selector('@media (min-width: 48rem)', s.display.grid)",
    ],
  }),
  '_selector(selector: CssSelector, ...parts: CssInput[]): string { return selectorRule(selector, parts); }',
  ...Object.entries(selectorShortcuts).flatMap(([name, selector]) => [
    jsdoc(selectorDescriptions[name], {
      params: { parts: '属性声明或嵌套片段；允许数组及条件空项。' },
      returns: `${selector} 嵌套规则片段，不立即登记样式。`,
      examples: [`s.${name}(s.color.red)`],
    }),
    `${name}(...parts: CssInput[]): string { return this._selector(${JSON.stringify(selector)}, ...parts); }`,
  ]),
);
author.push(...systemFields, '}');
author.push(
  'function defineSystemProperty(name: string, create: () => object): void {',
  '  let shared: object | undefined;',
  '  let scoped: WeakMap<object, object> | undefined;',
  '  Object.defineProperty(Css.prototype, name, {',
  '    configurable: true,',
  '    get() {',
  '      const source = getKeywordSource(this);',
  '      if (!source) return shared ??= Object.freeze(create());',
  '      let value = scoped?.get(this);',
  '      if (!value) {',
  '        value = bindKeywords(create() as { raw(value: never): string }, name, () => Reflect.get(source(), name));',
  '        (scoped ??= new WeakMap<object, object>()).set(this, value);',
  '      }',
  '      return value;',
  '    },',
  '  });',
  '}',
  'function initializeSystemProperties(): void {',
  '  if (systemPropertiesReady) return;',
  ...systemCreators,
  '  systemPropertiesReady = true;',
  '}',
);

const keywordRoot = [
  ...header,
  "import type { Property } from 'csstype';",
  "import type { CssString } from './base.js';",
  ...groups.map((group, index) => `import * as group${index} from './${group}.js';`),
  '/** 各 CSS 属性允许的原始关键字值类型。 */',
  'export interface KeywordValues {',
  ...keywordValues,
  '}',
  '/** 系统关键字的值契约；用户主题通过继承覆盖或扩展属性组。 */',
  'export class SystemKeywords {',
  jsdoc('创建系统默认关键字；属性组按需创建并只读共享。', {
    examples: ['const keywords = new SystemKeywords();'],
  }),
  'constructor() { initializeKeywords(); }',
  ...keywordFields,
  '}',
  '/** 不携带请求或组件状态的系统默认值，适合对象展开复用。 */',
  'let defaults: SystemKeywords | undefined;',
  'export const systemKeywords: SystemKeywords = {',
  ...names.map((name) => `get ${name}() { return (defaults ??= new SystemKeywords()).${name}; },`),
  '};',
  'function defineKeywordProperty(name: string, create: () => object): void {',
  'let shared: object | undefined;',
  'Object.defineProperty(SystemKeywords.prototype, name, { enumerable: true, get() { return shared ??= Object.freeze(create()); } });',
  '}',
  'function initializeKeywords(): void {',
  "if (Object.hasOwn(SystemKeywords.prototype, 'color')) return;",
  ...keywordCreators,
  '}',
];
const files = new Map([
  ['base', base],
  ...groupLines,
  ['author', author],
  ['keywords', keywordRoot],
  ['keyword-sets', sharedKeywordLines],
]);
// 这里只生成系统作者与关键字；具体 UI 主题由 UI 包维护。
for (const [name, lines] of files) {
  const output = resolve(outputDir, `${name}.ts`);
  const result = await prettier.format(lines.join('\n') + '\n', {
    ...(await prettier.resolveConfig(output)),
    filepath: output,
  });
  const existing = await readFile(output, 'utf8').catch((error) => {
    if (error.code === 'ENOENT') return '';
    throw error;
  });
  if (mode === '--check') {
    if (existing !== result) throw new Error(`CSS author output ${name}.ts is stale.`);
  } else if (existing !== result) {
    // 不重写未改变的大文件，避免开发期间无意义的 IDE 重索引和文件争用。
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, result);
  }
}
console.log(
  `${mode === '--check' ? 'Checked' : 'Generated'} ${names.length} properties and ${keywordCount} keywords in ${sharedKeywords.size} documented groups.`,
);
