import assert from 'node:assert/strict';
import test from 'node:test';
import { Css, systemKeywords, lightTheme } from '../../dist/index.js';
import { inlineDeclaration } from '../../dist/inline.js';
import { createServerCssHost, withCssHost, css } from '../../dist/server.js';

test('所有生成属性的 raw(undefined) 省略声明，合法零值保留', () => {
  const s = new Css();
  for (const property of Object.keys(systemKeywords)) {
    assert.equal(s[property].raw(undefined), '', property);
  }
  assert.equal(s.opacity.raw(0), 'opacity:0;');
  assert.equal(s.width.raw(0), 'width:0;');
  assert.equal(s.zIndex.raw(0), 'z-index:0;');
});

test('注入主题的可选值仍省略，已有关键字解析与 SSR 组合不变', () => {
  const s = new Css(lightTheme);
  const host = createServerCssHost();
  withCssHost(host, () => css(s.color.raw(undefined), s.fontSize.raw(undefined), s.display.flex));
  assert.equal(host.cssText().includes('undefined'), false);
  assert.equal(host.rules()[0].body, 'display:flex;');
  assert.equal(s.color.raw('_primary'), `color:${lightTheme.color._primary};`);
});

test('内联值撤销后不再提供声明或私有变量值', () => {
  const s = new Css();
  assert.deepEqual(inlineDeclaration(s, 'color', 'raw', '#123456', '--zj-optional'), {
    declaration: 'color:var(--zj-optional);',
    value: '#123456',
  });
  assert.deepEqual(inlineDeclaration(s, 'color', 'raw', undefined, '--zj-optional'), {
    declaration: '',
  });
  assert.deepEqual(inlineDeclaration(s, 'opacity', 'raw', 0, '--zj-optional'), {
    declaration: 'opacity:var(--zj-optional);',
    value: '0',
  });
});
