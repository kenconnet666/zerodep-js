import { generateJSX } from './generate-jsx.mjs';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format, resolveConfig } from 'prettier';
import { find, html, svg } from 'property-information';
import { htmlElementAttributes } from 'html-element-attributes';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'packages/core/src/native/data.ts');
const check = process.argv.includes('--check');
const config = await resolveConfig(output);
const sources = await Promise.all(
  ['property-information', 'html-element-attributes'].map(async (name) => {
    const directory = dirname(fileURLToPath(import.meta.resolve(name)));
    const manifest = JSON.parse(await readFile(resolve(directory, 'package.json'), 'utf8'));
    return {
      name,
      version: manifest.version,
      license: await readFile(resolve(directory, 'license'), 'utf8'),
    };
  }),
);

// 数据源不定义框架的结构、控件和事件所有权；这些规则继续由运行时负责。
const managed = new Set(['class', 'style', 'is']);
const skip = (name) => managed.has(name) || /^on/i.test(name) || /^shadowroot/i.test(name);
const camel = (name) => name.replace(/[-:]([a-z])/g, (_, letter) => letter.toUpperCase());
const htmlTypes = new Map();
const htmlTags = new Map();
const svgTypes = new Map();
const svgAliases = new Map();
const events = new Map();

function valueType(info, foreign) {
  if (info.attribute.startsWith('aria-')) return 'string | number | boolean';
  if (info.attribute === 'hidden') return "boolean | 'until-found'";
  if (info.attribute === 'translate') return "boolean | 'yes' | 'no'";
  if (info.attribute === 'value') return 'string | number';
  if (['preserveAlpha', 'externalResourcesRequired'].includes(info.attribute))
    return "boolean | 'true' | 'false'";
  if (info.overloadedBoolean) return 'string | boolean';
  if (info.booleanish || (foreign && info.boolean)) return 'string | number | boolean';
  if (info.boolean) return 'boolean';
  // SVG 的几何值、动画值和单位不能仅从 Web IDL 的 number 推断。
  return foreign || info.number ? 'string | number' : 'string';
}

function names(info) {
  return [...new Set([info.attribute, info.property, camel(info.attribute)])];
}

for (const [tag, attributes] of Object.entries(htmlElementAttributes)) {
  const keys = new Set();
  const common =
    tag === '*'
      ? [
          ...attributes,
          'role',
          ...Object.values(html.property)
            .filter((info) => info.attribute.startsWith('aria-'))
            .map((info) => info.attribute),
        ]
      : attributes;
  for (const attribute of common) {
    if (skip(attribute)) continue;
    // 数据集包含历史属性；现代 label/legend.form 是只读关联结果，不接受 form 内容属性。
    if ((tag === 'label' || tag === 'legend') && attribute === 'form') continue;
    const info = find(html, attribute);
    for (const name of names(info)) {
      keys.add(name);
      htmlTypes.set(name, valueType(info, false));
    }
  }
  htmlTags.set(
    tag,
    [...keys].sort((left, right) => (left < right ? -1 : left > right ? 1 : 0)),
  );
}

for (const info of Object.values(svg.property)) {
  if (skip(info.attribute)) continue;
  for (const name of names(info)) {
    svgTypes.set(name, valueType(info, true));
    if (name !== info.attribute) svgAliases.set(name, info.attribute);
  }
}
for (const schema of [html, svg]) {
  for (const info of Object.values(schema.property))
    if (/^on[A-Z]/.test(info.property)) events.set(info.property, info.attribute.slice(2));
}

const entries = (map) => [...map].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
function values(name, map) {
  return `export interface ${name} {\n${entries(map)
    .map(([key, type]) => `${JSON.stringify(key)}?: ${type} | null | undefined;`)
    .join('\n')}\n}`;
}
const header = `// 由 pnpm native:generate 生成，请修改 scripts/generate-native.mjs 后重新生成。
// 数据来源：${sources.map(({ name, version }) => `${name}@${version}`).join('、')}。
// 原作者及 MIT 许可见 ../THIRD_PARTY_NOTICES.md；类型补充不改变浏览器支持范围。`;
const code = await format(
  `${header}
export const svgAliases = ${JSON.stringify(Object.fromEntries(entries(svgAliases)))} as const;
${values('HtmlAttributeValues', htmlTypes)}
export interface HtmlAttributeNames {
${entries(htmlTags)
  .map(
    ([tag, keys]) =>
      `${JSON.stringify(tag)}: ${keys.length ? keys.map((key) => JSON.stringify(key)).join(' | ') : 'never'};`,
  )
  .join('\n')}
}
${values('SvgAttributeValues', svgTypes)}
export interface NativeEventAliases {
${entries(events)
  .map(([name, type]) => `${JSON.stringify(name)}: ${JSON.stringify(type)};`)
  .join('\n')}
}
`,
  { ...config, parser: 'oxc-ts' },
);

const notices = await format(
  `# 生成数据的第三方许可

本文件由 pnpm native:generate 生成。以下数据仅在维护时用于生成原生属性映射和类型，相关许可随 core 包分发。

${sources.map(({ name, version, license }) => `## ${name} ${version}\n\n来源：https://github.com/wooorm/${name}\n\n\`\`\`text\n${license.trim()}\n\`\`\`\n`).join('\n')}
`,
  { ...config, parser: 'markdown' },
);

for (const [path, content] of [
  [output, code],
  [resolve(root, 'packages/core/THIRD_PARTY_NOTICES.md'), notices],
]) {
  if (check) {
    if ((await readFile(path, 'utf8')) !== content)
      throw new Error(`生成结果已过期：${path}；请运行 pnpm native:generate。`);
  } else await writeFile(path, content);
}
console.log(
  `原生属性${check ? '生成检查通过' : '已生成'}：HTML ${htmlTypes.size} 个名称、SVG ${svgTypes.size} 个名称、事件 ${events.size} 个别名。`,
);

await generateJSX(check);
