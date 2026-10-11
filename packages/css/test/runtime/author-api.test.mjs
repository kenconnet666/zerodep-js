import test from 'node:test';
import assert from 'node:assert/strict';
import { createRuleRegistry } from './runtime.mjs';

await test('Unicode 与已知旧哈希碰撞均生成不同类', () => {
  const registry = createRuleRegistry(() => {});
  assert.notEqual(registry.css('--probe:28fx-1rqasrx;'), registry.css('--probe:28vj-gi2s3j;'));
  assert.notEqual(registry.css('content:"Ā";'), registry.css('content:"Ȁ";'));
  assert.equal(registry.size, 4);
});

await test('动画去重、全局块原位更新移除、恢复清单整体回滚', () => {
  const writes = [];
  const registry = createRuleRegistry(
    () => {},
    (key, rule) => writes.push([key, rule?.body]),
  );
  const frames = registry.keyframes('from{opacity:0}to{opacity:1}');
  assert.equal(frames, registry.keyframes('from{opacity:0}to{opacity:1}'));
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
