import test from 'node:test';
import assert from 'node:assert/strict';
import { createRuleRegistry, className } from './runtime.mjs';

await test('Unicode 与已知旧哈希碰撞均生成不同类，标记不占规则', () => {
  const registry = createRuleRegistry(() => {});
  assert.notEqual(registry.css('--probe:28fx-1rqasrx;'), registry.css('--probe:28vj-gi2s3j;'));
  assert.notEqual(registry.css('content:"Ā";'), registry.css('content:"Ȁ";'));
  assert.equal(className('Card.title'), className('Card.title'));
  assert.notEqual(className('Card.title'), className('Card.icon'));
  assert.equal(registry.size, 4);
});

await test('css 按顺序合并已登记类、声明和嵌套数组，省略条件空项', () => {
  const registry = createRuleRegistry(() => {});
  const a = registry.css('color:red!important;padding:1px;');
  const b = registry.css('color:blue;padding-left:2px;');
  assert.equal(registry.css(a, false, [null, undefined]), a);
  assert.equal(registry.size, 2);
  const merged = registry.css([a, [false, b]], undefined);
  const combined = registry.css('color:red!important;padding:1px;color:blue;padding-left:2px;');
  assert.equal(merged, combined);
  assert.equal(registry.size, 3);
  assert.notEqual(registry.css(b, a), merged);
  assert.equal(registry.css(), registry.css(false, null, [undefined, []]));
  // 任意片段仍原样拼接，不靠标点猜测 class，更不拆开 CSS 值内的空格。
  const fragments = registry.css('color:', 'red', ';', 'font-family:Open Sans;');
  assert.equal(
    registry.rules().find((rule) => rule.className === fragments).body,
    'color:red;font-family:Open Sans;',
  );
  const raw = registry.css('external');
  assert.equal(registry.rules().find((rule) => rule.className === raw).body, 'external');
  const unknown = registry.css('z-not-registered');
  assert.equal(
    registry.rules().find((rule) => rule.className === unknown).body,
    'z-not-registered',
  );
  const immutable = Object.freeze([a, Object.freeze([false, b])]);
  assert.equal(registry.css(immutable), merged);
  assert.deepEqual(immutable, [a, [false, b]]);
  assert.equal('cx' in registry, false);
});

await test('动画去重、全局块原位更新移除、恢复清单整体回滚', () => {
  const writes = [];
  const registry = createRuleRegistry(
    () => {},
    (key, rule) => writes.push([key, rule?.body]),
  );
  const frames = registry.keyframes('from{opacity:0}to{opacity:1}');
  assert.equal(frames, registry.keyframes('from{opacity:0}', 'to{opacity:1}'));
  registry.globalCss('first', 'body{color:red}');
  registry.globalCss('second', 'html{padding:0}');
  registry.globalCss('first', 'body{color:blue}');
  registry.globalCss('first', 'body{color:red}');
  assert.deepEqual(
    registry
      .rules()
      .filter((rule) => rule.kind === 'global')
      .map((rule) => rule.key),
    ['first', 'second'],
  );
  registry.globalCss('first');
  registry.globalCss('first', 'body{color:red}');
  assert.deepEqual(
    registry
      .rules()
      .filter((rule) => rule.kind === 'global')
      .map((rule) => rule.key),
    ['second', 'first'],
  );
  const next = createRuleRegistry(() => {});
  assert.throws(() => next.hydrate([...registry.rules(), { className: 'bad', body: 'x:y' }]));
  assert.equal(next.size, 0);
  next.hydrate(registry.rules());
  assert.equal(next.keyframes('from{opacity:0}to{opacity:1}'), frames);
  assert.deepEqual(next.rules(), registry.rules());
  assert.equal(writes.length, 6);
});

await test('动画与全局块接受嵌套条件片段，空块更新与删除语义分开', () => {
  const registry = createRuleRegistry(() => {});
  const frames = Object.freeze([
    'from{opacity:0;}',
    Object.freeze([false, null, 'to{opacity:1;}']),
  ]);
  assert.equal(registry.keyframes(frames), registry.keyframes('from{opacity:0;}to{opacity:1;}'));
  registry.globalCss('base', ['body{margin:0;}', [false, 'html{color:red;}']]);
  assert.equal(
    registry.rules().find((r) => r.key === 'base').body,
    'body{margin:0;}html{color:red;}',
  );
  registry.globalCss('base', false, []);
  assert.equal(registry.rules().find((r) => r.key === 'base').body, '');
  registry.globalCss('base');
  assert.equal(
    registry.rules().some((r) => r.key === 'base'),
    false,
  );
  const name = registry.css('color:red;');
  registry.globalCss('literal', name);
  assert.equal(registry.rules().find((r) => r.key === 'literal').body, name);
});

await test('增长诊断只跟随成功增加或恢复，缓存命中和更新不重复计算增长', () => {
  const sizes = [];
  const registry = createRuleRegistry(
    () => {},
    () => {},
    (size) => sizes.push(size),
  );
  registry.css('color:red;');
  registry.css('color:red;');
  registry.globalCss('theme', 'body{color:red;}');
  registry.globalCss('theme', 'body{color:blue;}');
  assert.deepEqual(sizes, [1, 2]);
  registry.globalCss('theme');
  assert.equal(registry.size, 1);
});
