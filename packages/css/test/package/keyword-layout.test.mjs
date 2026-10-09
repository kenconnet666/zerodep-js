import assert from 'node:assert/strict';
import test from 'node:test';
import { Css, ColorCss, ColorKeywords, WidthCss, SystemKeywords } from '../../dist/index.js';
import { authorInputs } from '../../dist/author-guards.js';
import { inlineKeyword } from '../../dist/inline.js';

await test('公开构造器、实例身份和可覆盖的自有字段保持不变', () => {
  // 发布 JS 原本就会压缩 Function.name；验证导出和实例身份，不为调试名引入顶层副作用。
  assert.equal(new ColorCss().constructor, ColorCss);
  assert.equal(new ColorKeywords().constructor, ColorKeywords);
  const author = new ColorCss();
  assert(author instanceof ColorCss);
  assert.deepEqual(
    Object.keys(author).filter((key) => key !== 'name'),
    Object.keys(new ColorKeywords()),
  );
  assert.deepEqual(Object.getOwnPropertyDescriptor(author, 'inherit'), {
    value: 'color:inherit;',
    enumerable: true,
    configurable: true,
    writable: true,
  });
  class Custom extends ColorCss {
    red = 'color:#123456;';
    raw(value) {
      return `outline-color:${value};`;
    }
  }
  const custom = new Custom();
  assert.equal(custom.red, 'color:#123456;');
  assert.equal(custom.blue, 'color:blue;');
  assert.equal(custom.raw('blue'), 'outline-color:blue;');
  class Renamed extends WidthCss {
    name = 'opacity';
  }
  assert.equal(new Renamed().auto, 'width:auto;');
  assert.equal(new Renamed().raw('auto'), 'opacity:auto;');
});

await test('共享数据不共享用户实例的可变字段，系统作者继续惰性共享', () => {
  const a = new ColorKeywords(),
    b = new ColorKeywords();
  a.red = '#123456';
  assert.equal(b.red, 'red');
  assert.equal(new ColorCss().red, 'color:red;');
  const first = new Css(),
    second = new Css();
  assert.equal(first.color, second.color);
  assert(Object.isFrozen(first.color));
  assert(authorInputs(first, 'color', 'red'));
});

await test('主题替换与变量安全回退不依赖已删除的预制声明表', () => {
  class Theme extends SystemKeywords {
    color = { ...this.color, _primary: '#123456' };
  }
  let theme = new Theme();
  const s = new Css(() => theme);
  const color = s.color;
  assert.equal(inlineKeyword(color, '_primary', '--zj-test').value, '#123456');
  theme = new Theme();
  theme.color._primary = 'inherit';
  assert.deepEqual(inlineKeyword(color, '_primary', '--zj-test'), {
    declaration: 'color:inherit;',
  });
  theme.color._primary = '#654321';
  assert.equal(inlineKeyword(color, '_primary', '--zj-test').value, '#654321');
  assert.equal(color.red, 'color:red;');
});
