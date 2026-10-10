import assert from 'node:assert/strict';
import test from 'node:test';
import { Css, SystemKeywords, systemKeywords, cssBinding } from '../../dist/index.js';
import { bindValue } from './bindings.mjs';

await test('系统作者不预建主题缓存；访问过的主题属性才创建缓存并保持实例隔离', () => {
  const NativeWeakMap = globalThis.WeakMap;
  let allocations = 0;
  globalThis.WeakMap = class extends NativeWeakMap {
    constructor(...args) {
      super(...args);
      allocations++;
    }
  };
  try {
    const plain = new Css();
    assert.equal(plain.color.red, 'color:red;');
    assert.equal(allocations, 0);
    class Theme extends SystemKeywords {
      color = { ...systemKeywords.color, _primary: 'red' };
    }
    const theme = new Theme();
    const first = new Css(theme);
    const second = new Css(new Theme());
    assert.equal(allocations, 0);
    const color = first.color;
    assert.equal(color._primary, 'color:red;');
    assert.equal(first.color, color);
    assert.equal(allocations, 1);
    assert.notEqual(second.color, color);
    theme.color._primary = 'blue';
    assert.equal(color._primary, 'color:blue;');
    assert.equal(second.color._primary, 'color:red;');
    assert.equal(allocations, 1);
    assert.equal(first.width.auto, 'width:auto;');
    assert.equal(allocations, 2);
  } finally {
    globalThis.WeakMap = NativeWeakMap;
  }
});

await test('重复颜色绑定复用固定关键字查询表，特殊值仍回退普通声明', () => {
  const original = Object.values;
  const keywords = systemKeywords.color;
  let enumerations = 0;
  Object.values = (value) => {
    if (value === keywords) enumerations++;
    return original(value);
  };
  try {
    const s = new Css();
    for (let index = 0; index < 100; index++) {
      const value = index % 2 ? 'red' : '#123456';
      assert.deepEqual(bindValue(s, 'color', 'raw', value, '--zj-color'), {
        declaration: 'color:var(--zj-color);',
        value,
      });
    }
    assert.equal(enumerations, 1);
    for (const value of ['inherit', 'var(--brand, inherit)', 'unknown-color']) {
      assert.deepEqual(bindValue(s, 'color', 'raw', value, '--zj-color'), {
        declaration: `color:${value};`,
      });
    }
  } finally {
    Object.values = original;
  }
});

await test('动态参数前后各核对一次作者，绑定阶段复用核对结果', () => {
  const s = new Css();
  const original = Object.getOwnPropertyDescriptor;
  let checks = 0;
  let reads = 0;
  Object.getOwnPropertyDescriptor = (object, name) => {
    if (object === s && name === 'width') checks++;
    return original(object, name);
  };
  try {
    const bound = cssBinding(
      s,
      'width',
      'px',
      () => {
        reads++;
        return 24;
      },
      '--zj-width',
    );
    assert.equal(bound.declaration, 'width:var(--zj-width);');
    assert.equal(bound.value, '24px');
    assert.equal(reads, 1);
    assert.equal(checks, 2);
  } finally {
    Object.getOwnPropertyDescriptor = original;
  }
});
