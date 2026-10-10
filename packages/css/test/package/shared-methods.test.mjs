import assert from 'node:assert/strict';
import test from 'node:test';
import { Css, ColorCss, WidthCss, systemKeywords } from '../../dist/index.js';

await test('属性实例保留独立声明，raw/数学/颜色实际执行体按类别共享', () => {
  const s = new Css();
  const authors = Object.keys(systemKeywords).map((property) => s[property]);
  assert.equal(new Set(authors.map((author) => author.raw)).size, 1);
  for (const method of ['calc', 'min', 'max', 'clamp']) {
    const functions = authors.map((author) => author[method]).filter(Boolean);
    assert.equal(functions.length, 228);
    assert.equal(new Set(functions).size, 1, method);
  }
  for (const method of ['rgb', 'hsl', 'oklch', 'oklab']) {
    const functions = authors.map((author) => author[method]).filter(Boolean);
    assert.equal(functions.length, 42);
    assert.equal(new Set(functions).size, 2, method);
  }
  assert.equal(s.width.raw('auto'), 'width:auto;');
  assert.equal(s.height.raw('auto'), 'height:auto;');
  assert.equal(s.width.raw(undefined), '');
  assert.equal(s.color.px, undefined);
  assert.equal(s.width.rgb, undefined);
  assert.equal(s.display.clamp, undefined);
});

await test('共享颜色和数学方法仍调用子类的 raw，长度单位保留原声明路径', () => {
  class CustomColor extends ColorCss {
    raw(value) {
      return `outline-color:${value};`;
    }
  }
  class CustomWidth extends WidthCss {
    raw(value) {
      return `inline-size:${value};`;
    }
  }
  assert.equal(new CustomColor().rgb(255, 0, 0, 0), 'outline-color:rgb(255 0 0 / 0);');
  assert.equal(new CustomColor().oklch(0.7, 0.1, 200), 'outline-color:oklch(0.7 0.1 200);');
  assert.equal(
    new CustomWidth().clamp('1rem', '20vw', '30rem'),
    'inline-size:clamp(1rem, 20vw, 30rem);',
  );
  assert.equal(new CustomWidth().px(24), 'width:24px;');
});
