import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from '@babel/parser';
import { Css, systemKeywords } from '../../dist/index.js';

const directory = new URL('../../dist/generated/', import.meta.url);
const declarations = readdirSync(directory)
  .filter((name) => name.endsWith('.d.ts'))
  .flatMap(
    (name) =>
      parse(readFileSync(new URL(name, directory), 'utf8'), {
        sourceType: 'module',
        plugins: ['typescript'],
      }).program.body,
  );
const docs = (node) => (node.leadingComments ?? []).map((comment) => comment.value).join('\n');

await test('全部属性、关键字与公共方法保留中文说明、参数及示例', () => {
  let properties = 0;
  let signatures = 0;
  for (const entry of declarations) {
    const node = entry.type === 'ExportNamedDeclaration' ? entry.declaration : entry;
    if (node?.type !== 'ClassDeclaration') continue;
    for (const member of node.body.body) {
      if (['private', 'protected'].includes(member.accessibility)) continue;
      const name = member.key?.name ?? member.key?.value ?? 'constructor';
      const label = node.id.name + '.' + name;
      const comment = docs(member);
      assert.match(comment, /[\u4e00-\u9fff]/, label + ' 缺少中文说明');
      if (node.id.name === 'Css' && member.type === 'ClassProperty') {
        properties++;
        assert.match(comment, /@see https:/, label + ' 缺少属性参考');
        assert(!comment.trim().startsWith('* CSS 属性 '), label + ' 不应只有占位说明');
      }
      if (
        !['TSDeclareMethod', 'ClassMethod'].includes(member.type) ||
        ['get', 'set'].includes(member.kind)
      )
        continue;
      signatures++;
      assert.match(comment, /@example/, label + ' 缺少示例');
      if (member.kind !== 'constructor') assert.match(comment, /@returns/, label + ' 缺少返回说明');
      const parameters = [...comment.matchAll(/@param (\w+) ([^\n]+)/g)];
      assert.deepEqual(
        parameters.map((match) => match[1]),
        member.params.map((param) => (param.argument ?? param).name),
        label,
      );
      for (const parameter of parameters) assert.match(parameter[2], /[\u4e00-\u9fff]/, label);
    }
  }
  assert.equal(properties, 502);
  assert(signatures > 2000);
  const author = new Css();
  let keywords = 0;
  for (const [property, values] of Object.entries(systemKeywords)) {
    for (const name of Object.keys(values)) {
      assert.equal(typeof author[property][name], 'string', property + '.' + name);
      keywords++;
    }
  }
  assert.equal(keywords, 12586);
});

await test('共享关键字声明逐个带中文文档，保持 IDE 可见的语义来源', () => {
  const declarations = parse(readFileSync(new URL('keyword-sets.d.ts', directory), 'utf8'), {
    sourceType: 'module',
    plugins: ['typescript'],
  });
  let documented = 0;
  for (const entry of declarations.program.body) {
    const node = entry.declaration;
    if (node?.type !== 'VariableDeclaration') continue;
    for (const declaration of node.declarations) {
      const type = declaration.id.typeAnnotation?.typeAnnotation;
      if (type?.type !== 'TSTypeLiteral') continue;
      for (const member of type.members) {
        assert.match(docs(member), /[\u4e00-\u9fff]/, member.key.name);
        documented++;
      }
    }
  }
  assert(documented > 1000);
});
