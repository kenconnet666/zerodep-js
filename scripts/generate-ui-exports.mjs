import assert from 'node:assert/strict';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parse } from '@babel/parser';

const root = resolve(import.meta.dirname, '..');
const source = resolve(root, 'packages/ui/src');
const target = resolve(source, 'index.ts');
const mode = process.argv[2];
assert(
  ['--write', '--check'].includes(mode),
  '用法：node scripts/generate-ui-exports.mjs --write|--check',
);
// Provider 同目录也有私有上下文和实现工具，只有这些入口对外；base/utils 则直接收集公开声明。
const entries = new Map([
  ['provider/Provider.tsx', null],
  ['provider/context.ts', ['useCss', 'useLang', 'useLocale']],
  ['provider/lang/en-US.ts', ['enUS']],
  ['provider/lang/zh-CN.ts', ['zhCN']],
  ['provider/lang/types.ts', ['UiLanguage']],
  ['provider/locale.ts', ['UiLocale']],
  ['provider/theme/theme.ts', ['UiTheme']],
  ['provider/theme/tokens.ts', ['UiColors']],
  ['provider/theme/light.ts', ['LightTheme', 'lightTheme']],
  ['provider/theme/dark.ts', ['DarkTheme', 'darkTheme']],
]);
async function collect(directory) {
  for (const item of await readdir(resolve(source, directory), { withFileTypes: true })) {
    assert(!item.isSymbolicLink(), `公开目录不能包含链接：${directory}/${item.name}`);
    if (item.isDirectory()) {
      await collect(`${directory}/${item.name}`);
      continue;
    }
    if (!item.isFile() || !/\.tsx?$/.test(item.name) || item.name.endsWith('.d.ts')) continue;
    assert(item.name !== 'index.ts', `UI 不维护子目录入口：${directory}/index.ts`);
    entries.set(`${directory}/${item.name}`, null);
  }
}
for (const directory of ['base', 'utils', 'layout', 'input', 'display', 'feedback', 'navigation'])
  await collect(directory);
const seen = new Set();
const lines = ['// 由 scripts/generate-ui-exports.mjs 生成；运行 pnpm ui:generate 更新。'];
for (const [file, selected] of [...entries].sort(([a], [b]) => a.localeCompare(b, 'en'))) {
  const ast = parse(await readFile(resolve(source, file), 'utf8'), {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  });
  const names = new Map();
  for (const statement of ast.program.body) {
    assert(statement.type !== 'ExportDefaultDeclaration', `${file} 应使用具名导出`);
    if (statement.type !== 'ExportNamedDeclaration') continue;
    assert(!statement.source, `${file} 不应充当二级导出入口`);
    const declaration = statement.declaration;
    if (declaration?.type === 'VariableDeclaration') {
      for (const item of declaration.declarations) {
        assert(item.id.type === 'Identifier', `${file} 的公开变量需有明确名称`);
        names.set(item.id.name, false);
      }
    } else if (declaration && 'id' in declaration && declaration.id) {
      names.set(
        declaration.id.name,
        ['TSInterfaceDeclaration', 'TSTypeAliasDeclaration'].includes(declaration.type),
      );
    } else {
      for (const specifier of statement.specifiers) {
        const name = specifier.exported.name ?? specifier.exported.value;
        names.set(name, statement.exportKind === 'type' || specifier.exportKind === 'type');
      }
    }
  }
  const exports = selected ?? [...names.keys()];
  if (!exports.length) continue;
  const items = exports.map((name) => {
    assert(names.has(name), `${file} 缺少公开声明 ${name}`);
    assert(!seen.has(name), `UI 导出名称重复：${name}`);
    seen.add(name);
    return `${names.get(name) ? 'type ' : ''}${name}`;
  });
  lines.push(`export { ${items.join(', ')} } from './${file.replace(/\.tsx?$/, '.js')}';`);
}
const prettier = await import('prettier');
const config = await prettier.resolveConfig(target);
const output = await prettier.format(lines.join('\n') + '\n', { ...config, filepath: target });
if (mode === '--write') await writeFile(target, output);
else assert.equal(await readFile(target, 'utf8'), output, 'UI 入口过期，请运行 pnpm ui:generate');
console.log(`${mode === '--write' ? '生成' : '检查'} UI 根入口：${seen.size} 个具名导出。`);
