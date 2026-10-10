import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  Css,
  SystemKeywords,
  systemKeywords,
  ColorCss,
  createServerCssHost,
  withCssHost,
  css,
} from '../../dist/index.js';
import { authorInputs } from '../../dist/runtime/bindings.js';

class Light extends SystemKeywords {
  color = { ...systemKeywords.color, _primary: '#1d4ed8' };
  fontSize = { ...systemKeywords.fontSize, _md: '1rem' };
}
class Dark extends SystemKeywords {
  color = { ...systemKeywords.color, _primary: '#93c5fd' };
  fontSize = { ...systemKeywords.fontSize, _md: '1.25rem' };
}

await test('系统关键字保存裸值，注入作者返回声明并保持原生方法', () => {
  const values = new Light();
  const s = new Css(values);
  assert.equal(values.color.red, 'red');
  assert.equal(systemKeywords.display.inlineFlex, 'inline-flex');
  assert.equal(s.color.red, 'color:red;');
  assert.equal(s.color._primary, 'color:#1d4ed8;');
  assert.equal(s.color.raw('_primary'), s.color._primary);
  assert.equal(s.fontSize.raw('_md'), 'font-size:1rem;');
  assert.equal(s.width.px(20), 'width:20px;');
  assert.equal(s._hover(s.color._primary), '&:hover{color:#1d4ed8;}');
  assert.equal(s.keywords, values);
  assert.ok(Object.isFrozen(s.color));
  assert.ok(Object.isFrozen(systemKeywords.color));
  assert.equal(new ColorCss().red, 'color:red;');
  // 框架对作者的透明代理不能丢失注入的源；库本身不创建 Proxy 作者。
  const forwarded = new Proxy(s, {});
  assert.equal(forwarded.color._primary, s.color._primary);
  assert.equal(authorInputs(forwarded, 'color', '_primary'), undefined);
});

await test('父子作者隔离，字段更新与主题替换不保存初始值', () => {
  let current = new Light();
  const parent = new Css(() => current);
  const child = new Css(new Dark());
  const color = parent.color;
  const original = color._primary;
  current.color._primary = 'purple';
  assert.equal(color._primary, 'color:purple;');
  current = new Dark();
  assert.equal(parent.color, color);
  assert.equal(parent.color._primary, 'color:#93c5fd;');
  assert.equal(parent.fontSize._md, 'font-size:1.25rem;');
  assert.equal(child.color._primary, 'color:#93c5fd;');
  assert.equal(original, 'color:#1d4ed8;');
  assert.notEqual(parent.color, child.color);
  assert.equal(new Css().color.red, 'color:red;');
  assert.notEqual(authorInputs(new Css(), 'color', 'red'), undefined);
  assert.equal(authorInputs(parent, 'color', '_primary'), undefined);
});

await test('主题继承的 getter 可以直接取值，错误成员不覆盖作者方法', () => {
  class Colors {
    get _primary() {
      return 'teal';
    }
  }
  const values = new Light();
  values.color = Object.assign(new Colors(), systemKeywords.color);
  const s = new Css(values);
  assert.equal(s.color._primary, 'color:teal;');
  for (const key of ['raw', 'name', '__proto__']) {
    const bad = new Light();
    Object.defineProperty(bad.color, key, { value: 'red', enumerable: true });
    assert.throws(() => new Css(bad).color, /conflicts/);
  }
  const invalid = new Light();
  invalid.color._primary = {};
  assert.throws(() => new Css(invalid).color._primary, /Invalid CSS keyword value/);
});

await test('作用域只在首次访问时读取相应属性组', () => {
  let reads = 0;
  class Theme extends SystemKeywords {
    get color() {
      reads++;
      return { ...systemKeywords.color, _primary: 'red' };
    }
  }
  const s = new Css(new Theme());
  assert.equal(reads, 0);
  s.width.px(1);
  assert.equal(reads, 0);
  assert.equal(s.color._primary, 'color:red;');
  assert.ok(reads > 0);
});

await test('并发 SSR 的主题作者与登记结果互不混用', async () => {
  const render = (theme) => {
    const host = createServerCssHost();
    return withCssHost(host, async () => {
      const s = new Css(theme);
      await Promise.resolve();
      css(s.color._primary, s.fontSize._md);
      return host.cssText();
    });
  };
  const [light, dark] = await Promise.all([render(new Light()), render(new Dark())]);
  assert.match(light, /#1d4ed8/);
  assert.doesNotMatch(light, /#93c5fd/);
  assert.match(dark, /#93c5fd/);
  assert.doesNotMatch(dark, /#1d4ed8/);
});
