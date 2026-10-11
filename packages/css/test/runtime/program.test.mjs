import assert from 'node:assert/strict';
import test from 'node:test';
import { createServerCssHost } from './runtime.mjs';
const { CssMethods } = await import('../../src/generated/methods.ts');
const { SystemKeywords } = await import('../../src/generated/keywords.ts');
const { bx, collectCss, collectTheme, collectKeyframes, resolvePrograms } =
  await import('../../src/runtime/program.ts');
import { nativeAttributes } from '../../../core/dist/native/attributes.js';

function setup(source) {
  const host = createServerCssHost();
  const s = new CssMethods(source);
  const resolve = (values) => resolvePrograms(values, host);
  const css = (build) => collectCss(build, resolve);
  return { host, s, css, resolve };
}

test('收集范围隔离，异常和嵌套后恢复，属性调用必须属于同步范围', () => {
  const { host, s, css, resolve } = setup();
  assert.throws(() => s.color('red'), /同步回调/);
  let inner;
  const outer = css(() => {
    s.color('red');
    inner = css(() => s.color('blue'));
    assert.throws(
      () =>
        css(() => {
          s.width('10px');
          throw Error('stop');
        }),
      /stop/,
    );
    s.padding('4px');
  });
  resolve([outer]);
  resolve([inner]);
  assert.deepEqual(
    host.rules().map((x) => x.body),
    ['color:red;padding:4px;', 'color:blue;'],
  );
  assert.throws(() => css(async () => s.color('green')), /async/);
  assert.throws(() => s.color('red'), /同步回调/);
});

test('同属性覆盖更新位置，选择器交错顺序不被移动', () => {
  const { host, s, css, resolve } = setup();
  resolve([
    css(() => {
      s.padding('0').paddingLeft('8px').padding('4px');
      s.select('&:hover', () => s.color('red'));
      s.select('&:active', () => s.color('blue'));
      s.select('&:hover', () => s.padding('4px'));
    }),
  ]);
  assert.equal(
    host.rules()[0].body,
    'padding-left:8px;padding:4px;&:hover{color:red;}&:active{color:blue;}&:hover{padding:4px;}',
  );
});

test('安全连续值复用类；undefined 忽略，特殊值及兄弟选择器回退', () => {
  const { host, s, css, resolve } = setup();
  const classes = new Set();
  for (let value = 1; value <= 100; value++) {
    const result = resolve([css(() => s.width(bx(`${value}px`)))]);
    classes.add(result.class);
    assert.match(result.style, new RegExp(`:${value}px$`));
  }
  assert.equal(classes.size, 1);
  assert.equal(host.rules().length, 1);
  const inherited = resolve([css(() => s.width(bx('inherit')))]);
  assert.equal(inherited.style, '');
  assert.equal(host.rules().at(-1).body, 'width:inherit;');
  resolve([css(() => s.color('red').color(bx(undefined)))]);
  assert.equal(host.rules().at(-1).body, 'color:red;');
  const sibling = resolve([css(() => s.select('& + span', () => s.color(bx('blue'))))]);
  assert.equal(sibling.style, '');
  assert.equal(host.rules().at(-1).body, '& + span{color:blue;}');
  assert.throws(() => Reflect.apply(String, undefined, [bx(12)]), /完整属性值/);
  assert.throws(() => css(() => s.color('red;background:blue')), /一个声明值/);
});

test('数组先覆盖再登记，来源不变，class 别名覆盖不会消费旧结果', () => {
  const { host, s, css } = setup();
  const base = css(() => s.width(bx('12px')).color('red'));
  const override = css(() => s.width('20px'));
  assert.equal(host.rules().length, 0);
  const attributes = nativeAttributes(
    { class: [base, [false, null, override]], style: 'color:blue' },
    'div',
  );
  assert.match(attributes.get('class'), /^z-[a-z0-9]{14}$/);
  assert.equal(attributes.get('style'), 'color:blue');
  assert.equal(host.rules()[0].body, 'color:red;width:20px;');
  const original = nativeAttributes({ class: base }, 'div');
  assert.match(original.get('style'), /:12px$/);
  const unused = css(() => s.height('200px'));
  const count = host.rules().length;
  assert.equal(
    nativeAttributes({ class: unused, className: 'external' }, 'div').get('class'),
    'external',
  );
  assert.equal(host.rules().length, count);
});

test('bx 主题 token 按属性解析，Provider 值变化不改变消费类，特殊主题值回退', () => {
  const theme = new SystemKeywords();
  Object.defineProperty(theme, 'color', {
    value: { ...theme.color, _primary: '#123456' },
    configurable: true,
  });
  const { host, s, css, resolve } = setup(theme);
  const consumer = () => resolve([css(() => s.color(bx('_primary')))]);
  const first = consumer();
  assert.equal(first.style, '');
  assert.match(host.rules()[0].body, /^color:var\(--zt-/);
  const provider = () => resolve([collectTheme(s, resolve)]);
  assert.match(provider().style, /:#123456/);
  theme.color._primary = '#abcdef';
  assert.equal(consumer().class, first.class);
  assert.match(provider().style, /:#abcdef/);
  theme.color._primary = 'inherit';
  assert.notEqual(consumer().class, first.class);
  assert.equal(host.rules().at(-1).body, 'color:inherit;');
  assert.throws(() => css(() => s.gap(bx('_primary'))), /没有关键字/);
});

test('关键帧参数随样式结果传递，动态值不产生新动画名', () => {
  const { host, s, css, resolve } = setup();
  const styles = [];
  for (const opacity of [0.2, 0.4, 0.8]) {
    const animation = collectKeyframes(() => {
      s.select('from', () => s.opacity(0));
      s.select('to', () => s.opacity(bx(opacity)));
    });
    styles.push(resolve([css(() => s.animationName(animation).animationDuration('1s'))]));
  }
  assert.equal(new Set(styles.map((x) => x.class)).size, 1);
  assert.equal(host.rules().filter((x) => x.kind === 'keyframes').length, 1);
  assert.match(styles[2].style, /:0.8$/);
  assert.throws(() => collectKeyframes(() => s.opacity(1)), /帧位置/);
  assert.throws(() => css(() => s.select('@font-face', () => s.color('red'))), /局部条件/);
});
