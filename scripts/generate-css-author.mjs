import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';
import { parse } from '@babel/parser';
import { propertyDocumentation, validatePropertyDocs } from './css-author-docs.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const input = resolve(root, 'packages/css/node_modules/csstype/index.d.ts');
const version = JSON.parse(
  await readFile(resolve(root, 'packages/css/node_modules/csstype/package.json'), 'utf8'),
).version;
const mode = process.argv[2];
if (!['--write', '--check'].includes(mode) || process.argv.length !== 3)
  throw new Error('Use --write or --check.');
const source = await readFile(input, 'utf8');
const ast = parse(source, { sourceType: 'module', plugins: ['typescript'] });
const interfaces = new Map(),
  aliases = new Map();
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
function members(name) {
  const node = interfaces.get(name);
  if (!node) throw new Error('Missing csstype interface: ' + name);
  return node.body.body
    .filter((item) => item.type === 'TSPropertySignature')
    .map((item) => ({
      name: item.key.name ?? item.key.value,
      type: item.typeAnnotation.typeAnnotation,
      docs: (item.leadingComments ?? []).map((comment) => '/*' + comment.value + '*/').join('\n'),
    }));
}
const properties = new Map();
for (const [camel, hyphen] of [
  ['StandardLonghandProperties', 'StandardLonghandPropertiesHyphen'],
  ['StandardShorthandProperties', 'StandardShorthandPropertiesHyphen'],
  ['SvgProperties', 'SvgPropertiesHyphen'],
]) {
  const names = members(camel),
    cssNames = members(hyphen);
  if (names.length !== cssNames.length) throw new Error('CSS property interfaces are misaligned.');
  for (const [index, item] of names.entries()) {
    const types = item.type.type === 'TSUnionType' ? item.type.types : [item.type];
    const reference = types.find(
      (type) =>
        type.type === 'TSTypeReference' &&
        type.typeName.type === 'TSQualifiedName' &&
        type.typeName.left.name === 'Property',
    );
    if (!reference) throw new Error('Missing CSS property type: ' + item.name);
    const cssName = cssNames[index].name;
    properties.set(item.name, { ...item, cssName, propertyType: reference.typeName.right.name });
  }
}
const names = [...properties.keys()].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
validatePropertyDocs(names);
const header = [
  '// 由 scripts/generate-css-author.mjs 从 csstype@' + version + ' 生成；请勿手改。',
  '// 来源许可见 packages/css/THIRD_PARTY_NOTICES.md。',
];
const keywords = [
  ...header,
  "import type { Property } from 'csstype';",
  "import type { CssString } from '../util/author.js';",
  '/** 属性原始值类型，仅用于类型检查和补全，不复制系统关键字运行时表。 */',
  'export interface KeywordValues {',
];
const author = [
  ...header,
  "import { CssAuthor, type PropertyInput } from '../runtime/program.js';",
  "import type { SystemKeywords } from './keywords.js';",
  '/** 真实方法作者；声明写入当前 css 收集范围，实例只保存主题来源。 */',
  'export class Css<T extends SystemKeywords = SystemKeywords> extends CssAuthor<T> {',
];
for (const name of names) {
  const item = properties.get(name);
  // 删除旧属性对象专属的调用示例；中文语义和 MDN 来源继续保留。
  const docs = propertyDocumentation(name, item.cssName, item.docs).replace(
    /\n \* @example[\s\S]*?(?=\n \* @|\n \*\/)/g,
    '',
  );
  keywords.push(docs, 'readonly ' + name + ': Property.' + item.propertyType + ' | CssString;');
  author.push(
    docs.replace(
      ' */',
      ' * @param value 当前属性值、主题 token 或 bx 绑定。\n * @returns 当前作者，支持连续调用其他属性方法。\n * @example css(() => s.' +
        name +
        '("inherit"));\n */',
    ),
    name + '(value: PropertyInput<' + JSON.stringify(name) + ', T>): this {',
    'this.write(' + JSON.stringify(name) + ', ' + JSON.stringify(item.cssName) + ', value);',
    'return this;',
    '}',
  );
}
keywords.push(
  '}',
  '/** 空的系统主题组；原生 CSS 关键字直接作为值输入，主题仅扩展下划线 token。 */',
  'type EmptyTokens = Readonly<Record<never, never>>;',
  'const empty: EmptyTokens = Object.freeze({});',
  'export class SystemKeywords {',
);
for (const name of names) keywords.push('readonly ' + name + ': EmptyTokens = empty;');
keywords.push('}', 'export const systemKeywords = Object.freeze(new SystemKeywords());');
author.push('}');
// 只保留去重后的原始关键字集合用于分类，不恢复属性作者对象或关键字成员 API。
const groups = [],
  groupIds = new Map(),
  lookup = {};
for (const name of names) {
  const values = [
    ...new Set(
      valuesOf(properties.get(name).type)
        .filter((value) => typeof value === 'string')
        .map((value) => value.toLowerCase()),
    ),
  ].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const key = JSON.stringify(values);
  if (!groupIds.has(key)) {
    groupIds.set(key, groups.length);
    groups.push(values);
  }
  lookup[name] = groupIds.get(key);
}
const system = [
  ...header,
  "import type { KeywordValues } from './keywords.js';",
  'const groups = [' +
    groups.map((values) => 'new Set<string>(' + JSON.stringify(values) + ')').join(',') +
    '];',
  'const lookup: Record<keyof KeywordValues, number> = ' + JSON.stringify(lookup) + ';',
  '/** 系统关键字按原值输出，不因 bx 生成元素变量。 */',
  'export function isSystemKeyword(property: keyof KeywordValues, value: unknown): boolean { return typeof value === "string" && groups[lookup[property]]!.has(value.trim().toLowerCase()); }',
];
const files = new Map([
  ['author', author],
  ['keywords', keywords],
  ['system', system],
]);
for (const [name, lines] of files) {
  const output = resolve(root, 'packages/css/src/generated', name + '.ts');
  const result = await prettier.format(lines.join('\n') + '\n', {
    ...(await prettier.resolveConfig(output)),
    filepath: output,
  });
  const previous = await readFile(output, 'utf8').catch((error) => {
    if (error.code === 'ENOENT') return '';
    throw error;
  });
  if (mode === '--check') {
    if (result !== previous) throw new Error('CSS generated file is stale: ' + name);
  } else if (result !== previous) {
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, result);
  }
}
console.log(
  (mode === '--check' ? 'Checked' : 'Generated') +
    ' ' +
    names.length +
    ' CSS methods and property types; compact system keyword classifier.',
);
