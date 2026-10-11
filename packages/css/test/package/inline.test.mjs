import assert from 'node:assert/strict';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { Css, WidthCss } from '../../dist/index.js';
import { authorInputs } from '../../dist/runtime/bindings.js';
import { bindValue } from './bindings.mjs';

await test('跨 realm 和无原型主题 token 保留原声明', () => {
  for (const color of [
    runInNewContext('({ _primary: "red" })'),
    Object.assign(Object.create(null), { _primary: 'red' }),
  ]) {
    const s = new Css({ color });
    assert.equal(s.color._primary, 'color:red;');
    assert.deepEqual(bindValue(s, 'color', 'raw', '_primary', '--zj-test'), {
      declaration: 'color:red;',
    });
  }
});

await test('主题 token 切换、原始值与 getter 单次求值', () => {
  let value = '#123456',
    reads = 0;
  const s = new Css(() => ({
    color: {
      get _primary() {
        reads++;
        return value;
      },
    },
  }));
  for (const next of [
    '#123456',
    'inherit',
    'initial',
    'unset',
    'revert',
    'revert-layer',
    'var(--brand)',
    'nonsense',
    '#abcdef',
  ]) {
    value = next;
    reads = 0;
    assert.deepEqual(bindValue(s, 'color', 'raw', '_primary', '--zj-test'), {
      declaration: 'color:' + next + ';',
    });
    assert.equal(reads, 1);
    assert.equal(s.color._primary, 'color:' + next + ';');
  }
  assert.deepEqual(bindValue(s, 'color', 'raw', '#654321', '--zj-test'), {
    declaration: 'color:var(--zj-test);',
    value: '#654321',
  });
});

await test('继承系统方法但改写底层属性名时，不按原属性假设绑定变量', () => {
  class Width extends WidthCss {
    name = 'opacity';
  }
  class Custom extends Css {
    width = new Width();
  }
  const author = new Custom();
  assert.equal(authorInputs(author, 'width', 'raw'), undefined);
  assert.deepEqual(bindValue(author, 'width', 'raw', 'auto', '--zj-test'), {
    declaration: 'opacity:auto;',
  });
});

await test('属性名 getter 不参与优化判定，原声明只求值一次', () => {
  let reads = 0;
  const width = new WidthCss();
  Object.defineProperty(width, 'name', {
    get() {
      reads++;
      return 'width';
    },
  });
  class Custom extends Css {
    width = width;
  }
  const author = new Custom();
  assert.equal(authorInputs(author, 'width', 'px'), undefined);
  assert.equal(reads, 0);
  assert.deepEqual(bindValue(author, 'width', 'px', 20, '--zj-test'), {
    declaration: 'width:20px;',
  });
  assert.equal(reads, 1);
});

await test('系统直接值绑定完整单位，保留特殊值原始层叠', () => {
  const s = new Css();
  assert.deepEqual(bindValue(s, 'width', 'px', 24, '--zj-test'), {
    declaration: 'width:var(--zj-test);',
    value: '24px',
  });
  assert.deepEqual(bindValue(s, 'color', 'raw', 'red', '--zj-test'), {
    declaration: 'color:var(--zj-test);',
    value: 'red',
  });
  assert.equal(bindValue(s, 'color', 'raw', '#abcdef', '--zj-test').value, '#abcdef');
  for (const value of [
    'initial',
    'inherit',
    'unset',
    'revert',
    'revert-layer',
    'red!important',
    'nonsense',
    'var(--external)',
  ]) {
    assert.deepEqual(bindValue(s, 'color', 'raw', value, '--zj-test'), {
      declaration: s.color.raw(value),
    });
  }
  assert.deepEqual(bindValue(s, 'width', 'px', -1, '--zj-test'), {
    declaration: 'width:-1px;',
  });
});

await test('只扩展关键字而保留属性身份的作者仍可绑定系统方法', () => {
  class Width extends WidthCss {
    thumb = 'width:24px;';
  }
  class Custom extends Css {
    width = new Width();
  }
  assert.deepEqual(bindValue(new Custom(), 'width', 'px', 20, '--zj-test'), {
    declaration: 'width:var(--zj-test);',
    value: '20px',
  });
});

await test('覆写和主题作者保持方法调用及读取，不猜测实现', () => {
  let calls = 0;
  class Width extends WidthCss {
    px(value) {
      calls++;
      return this.raw(`${value * 2}px`);
    }
  }
  class Custom extends Css {
    width = new Width();
  }
  assert.deepEqual(bindValue(new Custom(), 'width', 'px', 10, '--zj-test'), {
    declaration: 'width:20px;',
  });
  assert.equal(calls, 1);
  const themed = new Css(() => ({ color: { red: 'blue' } }));
  assert.deepEqual(bindValue(themed, 'color', 'raw', 'red', '--zj-test'), {
    declaration: 'color:var(--zj-test);',
    value: 'red',
  });
});
