import assert from 'node:assert/strict';
import test from 'node:test';
import { createRuleRegistry } from './runtime.mjs';

await test('单类组合保留声明次序，空结果不登记，旧多类与未登记引用明确失败', () => {
  const registry = createRuleRegistry(() => {});
  assert.equal(registry.css(false, null, undefined, ['', []]), '');
  assert.equal(registry.size, 0);
  const red = registry.css('color:red;');
  const blue = registry.css('color:blue;');
  const result = registry.css(red, ['padding:1px;', blue]);
  assert.match(result, /^z-[a-z0-9]{14}$/);
  assert.equal(
    registry.rules().find((rule) => rule.className === result).body,
    'color:red;padding:1px;color:blue;',
  );
  assert.equal(registry.css({ class: result, style: '' }), result);
  assert.throws(() => registry.css(red + ' ' + blue), /单个/);
  assert.throws(() => registry.css({ class: red + ' ' + blue, style: '' }), /单个/);
  assert.throws(() => registry.css('z-00000000000000'), /未登记/);
  assert.throws(() => registry.css({ class: 'external', style: '' }), /未登记/);
  const other = createRuleRegistry(() => {});
  assert.throws(() => other.css(red), /未登记/);
  other.hydrate(registry.rules());
  assert.equal(other.css(red, 'padding:1px;', blue), result);
});

await test('样式组合携带各自变量，显式顺序覆盖且不按动态值登记规则', () => {
  const registry = createRuleRegistry(() => {});
  const base = registry.css('color:var(--zj-color);');
  const first = { class: base, style: '--zj-color:red;' };
  const second = { class: base, style: '--zj-color:blue;' };
  const combined = registry.css(first, second);
  assert.match(combined.class, /^z-[a-z0-9]{14}$/);
  assert.equal(combined.style, '--zj-color:red;;--zj-color:blue;');
  const recomposed = registry.css(combined);
  assert.equal(recomposed.class, combined.class);
  assert.equal(recomposed.style, combined.style);
  const count = registry.size;
  for (let i = 0; i < 100; i++)
    registry.css(first, { class: base, style: `--zj-color:#${i.toString(16).padStart(6, '0')};` });
  assert.equal(registry.size, count);
  const nested = registry.css('display:block;', [first]);
  assert.equal(nested.style, first.style);
  assert.match(
    registry.rules().find((rule) => rule.className === nested.class).body,
    /display:block;color:var/,
  );
});

await test('相同声明复用类名，且只写入一次', () => {
  const writes = [];
  const registry = createRuleRegistry((name, body) => writes.push({ name, body }));
  const first = registry.css('color:red;', 'width:24px;');
  assert.equal(registry.css('color:red;', 'width:24px;'), first);
  assert.equal(registry.size, 1);
  assert.deepEqual(writes, [{ name: first, body: 'color:red;width:24px;' }]);
});

await test('写入失败不污染缓存，可以重试', () => {
  let attempts = 0;
  const registry = createRuleRegistry(() => {
    if (++attempts === 1) throw new Error('insert failed');
  });
  assert.throws(() => registry.css('color:blue;'), /insert failed/);
  assert.equal(registry.size, 0);
  registry.css('color:blue;');
  assert.equal(attempts, 2);
  assert.equal(registry.size, 1);
});

await test('恢复已有规则后不重写，错误清单整体回滚', () => {
  const origin = createRuleRegistry(() => {});
  origin.css('color:red;');
  const inserted = [];
  const restored = createRuleRegistry((name) => inserted.push(name));
  assert.throws(
    () => restored.hydrate([...origin.rules(), { className: 'wrong', body: 'color:blue;' }]),
    /does not match/,
  );
  assert.equal(restored.size, 0);
  restored.hydrate(origin.rules());
  assert.equal(restored.css('color:red;'), origin.rules()[0].className);
  assert.deepEqual(inserted, []);
});
