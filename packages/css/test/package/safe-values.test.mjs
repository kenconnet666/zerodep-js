import assert from 'node:assert/strict';
import test from 'node:test';
import { Css, SystemKeywords } from '../../dist/index.js';
import { bindValue } from './bindings.mjs';

await test('作者关键字全集不是浏览器支持表，布局关键字均保留原声明', () => {
  for (const s of [new Css(), new Css(new SystemKeywords())]) {
    for (const value of [
      'run-in',
      'flex',
      'inherit',
      'initial',
      'unset',
      'revert',
      'revert-layer',
      'unknown',
      'flex!important',
    ]) {
      assert.deepEqual(bindValue(s, 'display', 'raw', value, '--zj-test'), {
        declaration: `display:${value};`,
      });
    }
  }
});

await test('普通与主题作者的常用长度采用相同分类，区分负值及百分比', () => {
  const cases = [
    ['width', 'px', 24, '24px'],
    ['fontSize', 'raw', '1.25rem', '1.25rem'],
    ['gap', 'raw', '12px', '12px'],
    ['marginLeft', 'px', -8, '-8px'],
    ['insetInlineStart', 'raw', '-10%', '-10%'],
    ['opacity', 'raw', 0, '0'],
    ['width', 'raw', 0, '0'],
    ['width', 'raw', '0', '0'],
    ['width', 'px', -1, undefined],
    ['padding', 'raw', '-1px', undefined],
    ['borderWidth', 'raw', '10%', undefined],
    ['width', 'px', Infinity, undefined],
    ['width', 'px', NaN, undefined],
    ['width', 'raw', 'calc(100% - 1px)', undefined],
    ['width', 'raw', 'var(--user)', undefined],
    ['width', 'raw', '1.px', undefined],
    ['fontSize', 'raw', undefined, undefined],
  ];
  for (const s of [new Css(), new Css(new SystemKeywords())]) {
    for (const [property, member, input, expected] of cases) {
      const result = bindValue(s, property, member, input, '--zj-test');
      assert.equal(result.value, expected, `${property}.${member}(${input})`);
      assert.equal(
        result.declaration,
        expected === undefined ? s[property][member](input) : s[property].raw('var(--zj-test)'),
      );
    }
  }
});
