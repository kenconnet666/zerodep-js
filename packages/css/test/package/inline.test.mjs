import assert from 'node:assert/strict';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { Css, WidthCss, ColorCss } from '../../dist/index.js';
import { authorInputs } from '../../dist/author-guards.js';
import { inlineDeclaration, inlineKeyword } from '../../dist/inline.js';

await test('跨 realm 和无原型的关键字对象不混入 Object.prototype 成员', () => {
  for (const color of [
    runInNewContext('({ _primary: "red" })'),
    Object.assign(Object.create(null), { _primary: 'red' }),
  ]) {
    const s = new Css({ color });
    assert.deepEqual(inlineKeyword(s.color, '_primary', '--zj-test'), {
      declaration: 'color:var(--zj-test);',
      value: 'red',
    });
  }
});

await test('主题关键字在安全值、全局关键字与已有变量之间动态切换，保留原始值', () => {
  let value = '#245fc5';
  let reads = 0;
  const s = new Css(() => ({
    color: {
      get _primary() {
        reads++;
        return value;
      },
    },
  }));
  const target = s.color;
  for (const next of [
    '#245fc5',
    'inherit',
    'initial',
    'unset',
    'revert',
    'revert-layer',
    'var(--brand, inherit)',
    'rgb(0 0 0 / 0.5)',
    'not-a-color',
    '#ffffff',
  ]) {
    value = next;
    reads = 0;
    const actual = inlineKeyword(target, '_primary', '--zj-test');
    assert.equal(reads, 1);
    assert.deepEqual(
      actual,
      next.startsWith('#')
        ? { declaration: 'color:var(--zj-test);', value: next }
        : { declaration: `color:${next};` },
    );
    assert.equal(s.keywords.color._primary, next);
  }
});

await test('主题替换、覆盖的原生关键字和多个作者独立取值，普通常量不变量化', () => {
  let theme = { display: { flex: 'grid' } };
  const a = new Css(() => theme),
    b = new Css({ display: { flex: 'block' } });
  const view = a.display;
  assert.equal(inlineKeyword(view, 'flex', '--zj-test').value, 'grid');
  theme = { display: { flex: 'inline-flex' } };
  assert.equal(inlineKeyword(view, 'flex', '--zj-test').value, 'inline-flex');
  assert.equal(inlineKeyword(b.display, 'flex', '--zj-test').value, 'block');
  assert.deepEqual(inlineKeyword(new Css().display, 'flex', '--zj-test'), {
    declaration: 'display:flex;',
  });
});

await test('未知成员保持一次 getter 读取及异常，不把普通对象伪装成主题视图', () => {
  let reads = 0;
  const target = {
    get _primary() {
      reads++;
      return 'color:blue;';
    },
  };
  assert.deepEqual(inlineKeyword(target, '_primary', '--zj-test'), { declaration: 'color:blue;' });
  assert.equal(reads, 1);
  assert.throws(() => inlineKeyword(null, '_primary', '--zj-test'), TypeError);
  assert.throws(
    () =>
      inlineKeyword(
        {
          get _primary() {
            throw Error('getter');
          },
        },
        '_primary',
        '--zj-test',
      ),
    /getter/,
  );
});

await test('注入主题的自定义 raw 不按系统方法绑定，主题无效值仍报原错误', () => {
  class CustomColor extends ColorCss {
    raw(value) {
      return `outline-color:${value};`;
    }
  }
  class Custom extends Css {
    color = new CustomColor();
  }
  const s = new Custom({ color: { _primary: 'red' } });
  // 自有作者覆盖了主题属性 getter，没有库登记的视图。
  assert.deepEqual(inlineKeyword(s.color, 'red', '--zj-test'), { declaration: 'color:red;' });
  const invalid = new Css({ color: { _primary: {} } });
  assert.throws(
    () => inlineKeyword(invalid.color, '_primary', '--zj-test'),
    /Invalid CSS keyword value/,
  );
  const valid = new Css({ color: { _primary: 'red' } });
  assert.deepEqual(inlineKeyword(valid.color, '_primary', '--user-owned'), {
    declaration: 'color:red;',
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
  assert.deepEqual(inlineDeclaration(author, 'width', 'raw', 'auto', '--zj-test'), {
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
  assert.deepEqual(inlineDeclaration(author, 'width', 'px', 20, '--zj-test'), {
    declaration: 'width:20px;',
  });
  assert.equal(reads, 1);
});

await test('系统直接值绑定完整单位，保留特殊值原始层叠', () => {
  const s = new Css();
  assert.deepEqual(inlineDeclaration(s, 'width', 'px', 24, '--zj-test'), {
    declaration: 'width:var(--zj-test);',
    value: '24px',
  });
  assert.deepEqual(inlineDeclaration(s, 'color', 'raw', 'red', '--zj-test'), {
    declaration: 'color:var(--zj-test);',
    value: 'red',
  });
  assert.equal(inlineDeclaration(s, 'color', 'raw', '#abcdef', '--zj-test').value, '#abcdef');
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
    assert.deepEqual(inlineDeclaration(s, 'color', 'raw', value, '--zj-test'), {
      declaration: s.color.raw(value),
    });
  }
  assert.deepEqual(inlineDeclaration(s, 'width', 'px', -1, '--zj-test'), {
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
  assert.deepEqual(inlineDeclaration(new Custom(), 'width', 'px', 20, '--zj-test'), {
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
  assert.deepEqual(inlineDeclaration(new Custom(), 'width', 'px', 10, '--zj-test'), {
    declaration: 'width:20px;',
  });
  assert.equal(calls, 1);
  const original = new Css();
  const themed = new Css(() => ({ color: { red: 'blue' } }));
  assert.deepEqual(inlineDeclaration(themed, 'color', 'raw', 'red', '--zj-test'), {
    declaration: original.color.raw('red'),
  });
});
