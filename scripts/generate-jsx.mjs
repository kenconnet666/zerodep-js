import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { API, TypeFlags, TypeFormatFlags } from 'typescript/unstable/sync';
import { format, resolveConfig } from 'prettier';

// 使用官方 TS7.1 API 生成清晰的平台声明，不依赖项目定制 SDK。
export async function generateJSX(check = false) {
  const root = resolve(import.meta.dirname, '..');
  const output = resolve(root, 'packages/core/src/native/elements.ts');
  const file = resolve(root, 'packages/core/src/native/__native-generation.ts').replaceAll(
    '\\',
    '/',
  );
  const api = new API({ cwd: root });
  let snapshot;
  try {
    const source = `import type { NativeProps, SvgAttributes, MathAttributes } from './jsx.js';
import type { HtmlAttributeValues, HtmlAttributeNames } from './data.js';
type TagName =
  keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | keyof MathMLElementTagNameMap;
type HtmlElement<K> = K extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[K] : never;
type SvgElement<K> = K extends keyof SVGElementTagNameMap ? SVGElementTagNameMap[K] : never;
type MathElement<K> = K extends keyof MathMLElementTagNameMap ? MathMLElementTagNameMap[K] : never;
// 只对相应 HTML 分支补缺失属性，避免同名 SVG/MathML 标签把已有 props 联合成笛卡尔积。
type HtmlAttributes<K> = K extends keyof HTMLElementTagNameMap
  ? Omit<
      Pick<
        HtmlAttributeValues,
        | HtmlAttributeNames['*']
        | (K extends keyof HtmlAttributeNames ? HtmlAttributeNames[K] : never)
      >,
      keyof NativeProps<HTMLElementTagNameMap[K]>
    >
  : {};

export type NativeElementProps<K extends TagName> = NativeProps<
  HtmlElement<K> | SvgElement<K> | MathElement<K>
> &
  HtmlAttributes<K> &
  (K extends keyof SVGElementTagNameMap ? SvgAttributes : {}) &
  (K extends keyof MathMLElementTagNameMap
    ? { [P in keyof MathAttributes]?: MathAttributes[P] | null | undefined }
    : {});


type Probe = { [K in keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | keyof MathMLElementTagNameMap]: NativeElementProps<K> };`;
    const config = api.parseConfigFile(resolve(root, 'packages/core/tsconfig.json'));
    snapshot = api.createSnapshot({
      fileSystem: { kind: 'layer', files: { [file]: source } },
      createPrograms: [
        { rootFiles: [file], compilerOptions: { ...config.options, composite: false } },
      ],
    });
    const program = snapshot.operation.createdPrograms[0];
    const checker = snapshot.getProject(program.id).checker;
    const declaration = program
      .getSourceFile(file)
      .statements.find((node) => node.name?.text === 'Probe');
    const probe = checker.getTypeAtLocation(declaration);
    const flags = TypeFormatFlags.NoTruncation | TypeFormatFlags.InTypeAlias;
    const tags = [];
    const records = [];
    const unique = new Map();
    const printed = new Map();
    const descriptions = new Map();
    for (const tag of probe
      .getProperties()
      .toSorted((a, b) => a.name.localeCompare(b.name, 'en'))) {
      const type = checker.getTypeOfSymbol(tag);
      const branches = type.flags & TypeFlags.Union ? type.getTypes() : [type];
      const names = [];
      for (const branch of branches) {
        const properties = new Map();
        const reference = checker.typeToString(
          checker.getTypeOfPropertyOfType(branch, 'ref'),
          declaration,
          flags,
        );
        const dom = /element: ([^)]+)\)/.exec(reference)?.[1];
        assert(dom, `缺少 DOM 引用类型：${tag.name}`);
        const symbols = branch
          .getProperties()
          .toSorted((a, b) => a.name.localeCompare(b.name, 'en'));
        // optional 的“属性缺失”不等于允许显式 undefined，保留 exactOptionalPropertyTypes。
        const types = api.batch(
          ...symbols.map((symbol) => checker.getNonMissingTypeOfSymbol.gen(symbol)),
        );
        const fresh = [
          ...new Map(
            types.filter((type) => !printed.has(type.id)).map((type) => [type.id, type]),
          ).values(),
        ];
        const texts = api.batch(
          ...fresh.map((type) => checker.typeToString.gen(type, declaration, flags)),
        );
        for (let i = 0; i < fresh.length; i++) printed.set(fresh[i].id, texts[i]);
        const pattern = new RegExp(`\\b${dom.replaceAll('|', '\\|')}\\b`, 'g');
        for (let i = 0; i < symbols.length; i++) {
          const name = symbols[i].name;
          const type = printed.get(types[i].id).replace(pattern, 'T');
          properties.set(name, type);
          if (name.startsWith('bind:'))
            descriptions.set(name + '\0' + type, symbols[i].getDocumentationComment(checker));
        }
        const key = JSON.stringify([dom, [...properties]]);
        let name = unique.get(key);
        if (!name) {
          name =
            tag.name.replace(/(^|-)(\w)/g, (_, _prefix, letter) => letter.toUpperCase()) +
            `Props${names.length || ''}`;
          unique.set(key, name);
          records.push({ name, dom, properties });
        }
        names.push(name);
      }
      tags.push([tag.name, [...new Set(names)].join(' | ')]);
    }
    // 相同平台字段只存一份；生成文件大小与解析成本也需要控制。
    const groups = new Map();
    for (const record of records) {
      const family = record.dom.includes(' | ')
        ? record.dom
        : /^(HTML|SVG|MathML)/.exec(record.dom)?.[0];
      assert(family, record.dom);
      let group = groups.get(family);
      if (!group)
        groups.set(
          family,
          (group = { name: `Common${groups.size}`, properties: new Map(record.properties) }),
        );
      for (const [name, type] of group.properties)
        if (record.properties.get(name) !== type) group.properties.delete(name);
      record.group = group;
    }
    const fields = (properties) =>
      [...properties]
        .map(([name, type]) => {
          const description = descriptions.get(name + '\0' + type);
          return `${description ? `/** ${description.replaceAll('*/', '* /')} */\n` : ''}${JSON.stringify(name)}?: ${type};`;
        })
        .join('\n');
    const text = `// 由 pnpm native:generate 生成；规则维护于 native/jsx.ts，官方 TS7.1 API 负责展开。\n
import type { NativeIndexProps } from './jsx.js';
${[...groups.values()].map(({ name, properties }) => `interface ${name}<T extends Element> extends NativeIndexProps { ${fields(properties)} }`).join('\n')}
${records.map(({ name, dom, properties, group }) => `interface ${name} extends ${group.name}<${dom}> { ${fields(new Map([...properties].filter(([key]) => !group.properties.has(key)))).replaceAll(/\bT\b/g, dom)} }`).join('\n')}
export interface NativeElements { ${tags.map(([tag, type]) => `${JSON.stringify(tag)}: ${tag.includes('-') ? `{ [K in keyof ${type}]: ${type}[K] }` : type};`).join('\n')} }
`;
    const formatted = await format(text, { ...(await resolveConfig(output)), parser: 'oxc-ts' });
    if (check)
      assert.equal(
        await readFile(output, 'utf8'),
        formatted,
        'DOM 声明已过期，请运行 pnpm native:generate。',
      );
    else await writeFile(output, formatted);
    console.log(
      `DOM 声明${check ? '检查通过' : '已生成'}：${tags.length} 个标签，${records.length} 组属性。`,
    );
  } finally {
    snapshot?.dispose();
    api.close();
  }
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename))
  await generateJSX(process.argv.includes('--check'));
