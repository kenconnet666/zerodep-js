import assert from 'node:assert/strict';
import test from 'node:test';
import { createRuleRegistry } from './runtime.mjs';

await test('样式组合携带各自变量，显式顺序覆盖且不按动态值登记规则', () => {
  const registry = createRuleRegistry(() => {});
  const base = registry.css('color:var(--zj-color);');
  const first = { class: base, style: '--zj-color:red;' };
  const second = { class: base, style: '--zj-color:blue;' };
  const combined = registry.mergeClasses(first, second, 'external');
  assert.match(combined.class, / external$/);
  assert.equal(combined.style, '--zj-color:red;;--zj-color:blue;');
  const recomposed = registry.css(combined);
  assert.match(recomposed.class, / external$/);
  assert.equal(recomposed.style, combined.style);
  const count = registry.size;
  for (let i = 0; i < 100; i++)
    registry.mergeClasses(
      first,
      { class: base, style: `--zj-color:#${i.toString(16).padStart(6, '0')};` },
      'external',
    );
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
