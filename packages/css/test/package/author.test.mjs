import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { parse } from '@babel/parser';
import { compilerPath } from '../../../compiler/dist/checking/sdk.js';
import { nativeAttributes } from '../../../core/dist/native/attributes.js';
import {
  Css,
  SystemKeywords,
  systemKeywords,
  css,
  bx,
  _themeStyle,
  globalCss,
  createServerCssHost,
  withCssHost,
} from '../../dist/index.js';

function render(build, source) {
  const host = createServerCssHost();
  const s = new Css(source);
  const result = withCssHost(host, () => nativeAttributes({ class: css(() => build(s)) }, 'div'));
  return { host, attributes: result };
}

void test('502 个真实属性方法共用原型，不再分配属性作者对象', () => {
  const a = new Css(),
    b = new Css();
  const names = Object.keys(systemKeywords);
  assert.equal(names.length, 502);
  for (const name of names) {
    assert.equal(typeof a[name], 'function', name);
    assert.equal(a[name], b[name]);
    assert.deepEqual(systemKeywords[name], {});
  }
  assert.equal(Object.hasOwn(a, 'width'), false);
  assert.equal('raw' in Reflect.get(a, 'width'), false);
  const result = render((s) => {
    for (const name of names) s[name](undefined);
    s.opacity(0).width(0).zIndex(0);
  });
  assert.equal(result.host.rules()[0].body, 'opacity:0;width:0;z-index:0;');
});

void test('生成声明保留真实方法、属性类型、中文文档和链式返回', async () => {
  const source = await readFile(
    new URL('../../dist/generated/author.d.ts', import.meta.url),
    'utf8',
  );
  const ast = parse(source, { sourceType: 'module', plugins: ['typescript'] });
  const cls = ast.program.body.find((x) => x.declaration?.id?.name === 'Css').declaration;
  assert.equal(cls.body.body.length, 502);
  for (const member of cls.body.body) {
    assert.equal(member.type, 'TSDeclareMethod');
    const docs = member.leadingComments.map((x) => x.value).join('');
    assert.match(docs, /[\u4e00-\u9fff]/);
    assert.match(docs, /@param value/);
    assert.match(docs, /@returns/);
    assert.doesNotMatch(docs, /@example css\(\(\) => s\./);
    assert.equal(member.returnType.typeAnnotation.type, 'TSThisType');
  }
});

void test('字符串关键字引用带文档的属性成员，公共词共享而同名属性含义保持独立', async () => {
  const source = await readFile(
    new URL('../../dist/generated/keywords.d.ts', import.meta.url),
    'utf8',
  );
  const ast = parse(source, { sourceType: 'module', plugins: ['typescript'] });
  const declarations = new Map(
    ast.program.body.map((entry) => {
      const node = entry.declaration ?? entry;
      return [node.id?.name, node];
    }),
  );
  const keywordValues = declarations.get('KeywordValues');
  assert.equal(keywordValues.body.body.length, 502);
  for (const member of keywordValues.body.body) {
    const type = member.typeAnnotation.typeAnnotation.types.find(
      (node) => node.type === 'TSTypeOperator' && node.operator === 'keyof',
    );
    assert.ok(declarations.has(type?.typeAnnotation.typeName.name), member.key.name);
  }
  const doc = (group, value) =>
    declarations
      .get(group)
      .body.body.find((member) => (member.key.name ?? member.key.value) === value)
      .leadingComments.map((comment) => comment.value)
      .join('\n');
  assert.match(doc('DisplayValues', 'inline-flex'), /创建行内级的 Flex 容器/);
  assert.match(doc('DisplayValues', 'none'), /不生成元素及其后代的布局盒子/);
  assert.match(doc('BackgroundImageValues', 'none'), /不绘制这一层背景图像/);
  assert.match(doc('GlobalsValues', 'inherit'), /使用父元素该属性的计算值/);
  assert.match(doc('NamedColorValues', 'red'), /CSS 命名颜色 red/);
  assert.doesNotMatch(
    await readFile(new URL('../../dist/generated/keywords.js', import.meta.url), 'utf8'),
    /inline-flex|DisplayValues|NamedColorValues/,
  );
});

for (const [property, value, safe] of [
  ['animationDuration', '120ms', true],
  ['transitionDelay', '-0.2s', true],
  ['animationDuration', '-1s', false],
  ['opacity', '0.5', true],
  ['width', '24px', true],
  ['fontSize', '1.25rem', true],
  ['gap', '12px', true],
  ['marginLeft', '-8px', true],
  ['insetInlineStart', '-10%', true],
  ['opacity', 0, true],
  ['width', 0, true],
  ['width', '0', true],
  ['color', '#abcdef', true],
  ['color', 'red', false],
  ['color', 'RED', false],
  ['color', 'transparent', false],
  ['width', '-1px', false],
  ['padding', '-1px', false],
  ['borderWidth', '10%', false],
  ['width', 'Infinitypx', false],
  ['width', 'NaNpx', false],
  ['width', 'calc(100% - 1px)', false],
  ['width', 'var(--user)', false],
  ['width', '1.px', false],
  ...[
    'run-in',
    'flex',
    'inherit',
    'initial',
    'unset',
    'revert',
    'revert-layer',
    'unknown',
    'flex!important',
  ].map((value) => ['display', value, false]),
  ...['inherit', 'initial', 'unset', 'revert', 'revert-layer', 'unknown'].map((value) => [
    'color',
    value,
    false,
  ]),
])
  void test(property + ' ' + value + ' 的绑定分类', () => {
    const { host, attributes } = render((s) => s[property](bx(value)));
    if (safe) {
      assert.match(host.cssText(), /:var\(--zj-/);
      assert.ok(attributes.get('style').includes(':' + value + ';'));
    } else {
      assert.equal(attributes.has('style'), false);
      assert.ok(host.cssText().includes(':' + value + ';'));
    }
  });

void test('主题更新、父子作者和安全/特殊 token 转换', () => {
  class Theme extends SystemKeywords {
    color = { _primary: '#123456' };
    gap = { _sm: '4px' };
  }
  let theme = new Theme();
  const parent = new Css(() => theme),
    child = new Css(new Theme());
  const host = createServerCssHost();
  const read = (author) =>
    withCssHost(host, () =>
      nativeAttributes(
        { class: [_themeStyle(author), css(() => author.color(bx('_primary')).gap(bx('_sm')))] },
        'div',
      ),
    );
  const first = read(parent),
    other = read(child);
  theme = new Theme();
  theme.color._primary = '#abcdef';
  const next = read(parent);
  assert.equal(first.get('class'), next.get('class'));
  assert.match(next.get('style'), /:#abcdef;/);
  assert.equal(read(child).get('style'), other.get('style'));
  theme.color._primary = 'inherit';
  const fallback = read(parent);
  assert.notEqual(fallback.get('class'), first.get('class'));
  assert.ok(host.cssText().includes('color:inherit;'));
  assert.throws(() => css(() => parent.width(bx('_primary'))), /没有关键字/);
});

void test('真实 TS7 检查属性输入、主题约束、绑定类型及 class 数组', async () => {
  const file = resolve('packages/css/test/package/__types_' + randomUUID() + '.tsx');
  const source = `import{Css,SystemKeywords,css,bx,type CssValue,type CssString,type KeywordValues}from'zerodep-js-css';import type{ClassValue}from'zerodep-js';
import type { Properties } from 'csstype';
type OldValue<K extends keyof KeywordValues> = Exclude<Properties[K], undefined> | CssString;
type Changed = { [K in keyof KeywordValues]: [KeywordValues[K]] extends [OldValue<K>] ? [OldValue<K>] extends [KeywordValues[K]] ? never : K : K }[keyof KeywordValues];
const sameAcceptedValues: [Changed] extends [never] ? true : false = true; void sameAcceptedValues;
class Theme extends SystemKeywords{override readonly color={_primary:'#123456'};override readonly gap={_sm:'4px'};}
const s=new Css(new Theme());const result=css(()=>{s.color('_primary').width('12px').gap(bx('_sm')).opacity(bx(0.5));});
const classes:ClassValue=[false,null,result,[undefined,'external']];void classes;
const color:CssValue<'color',Theme>='_primary';void color;
// @ts-expect-error 数字宽度不自动补 px。
s.width(12);
// @ts-expect-error bx 保留错误的输入类型，不能把数字颜色擦成 string。
s.color(bx(12));
// @ts-expect-error 特定主题作者不能省略主题值。
new Css<Theme>();
class BadTheme extends SystemKeywords{override readonly color={_primary:12};}
// @ts-expect-error 主题值也受到 color 属性约束。
new Css(new BadTheme());
// @ts-expect-error 回调必须同步。
css(async()=>{s.color('red');});
// @ts-expect-error 旧属性对象入口已删除。
s.width.px(12);
`;
  try {
    await writeFile(file, source, { flag: 'wx' });
    execFileSync(
      compilerPath(),
      [
        '--ignoreConfig',
        '--noEmit',
        '--strict',
        '--skipLibCheck',
        '--module',
        'preserve',
        '--moduleResolution',
        'bundler',
        '--target',
        'ES2025',
        '--jsx',
        'preserve',
        '--types',
        'zerodep-js',
        file,
      ],
      { stdio: 'pipe', windowsHide: true },
    );
  } catch (error) {
    if (error.stdout) throw Error(error.stdout.toString());
    throw error;
  } finally {
    await unlink(file);
  }
});

void test('并发 SSR 独占宿主，样式描述可以先创建后在请求内消费', async () => {
  const a = createServerCssHost(),
    b = createServerCssHost(),
    s = new Css();
  const first = css(() => s.color(bx('#123456'))),
    second = css(() => s.color(bx('#abcdef')));
  const [left, right] = await Promise.all([
    withCssHost(a, async () => {
      await Promise.resolve();
      return nativeAttributes({ class: first }, 'div');
    }),
    withCssHost(b, async () => {
      await Promise.resolve();
      return nativeAttributes({ class: second }, 'div');
    }),
  ]);
  assert.equal(left.get('class'), right.get('class'));
  assert.match(left.get('style'), /:#123456;/);
  assert.match(right.get('style'), /:#abcdef;/);
  assert.equal(a.rules().length, 1);
  assert.equal(b.rules().length, 1);
});

void test('全局块显式更新与删除，无根选择器的声明拒绝', () => {
  const host = createServerCssHost(),
    s = new Css();
  withCssHost(host, () => {
    globalCss('base', () => s.select('body', () => s.margin(0)));
    globalCss('base', () => s.select('body', () => s.margin('4px')));
    assert.equal(host.rules().length, 1);
    assert.equal(host.rules()[0].body, 'body{margin:4px;}');
    assert.throws(() => globalCss('invalid', () => s.color('red')), /全局属性/);
    globalCss('base');
    assert.equal(host.rules().length, 0);
  });
});
