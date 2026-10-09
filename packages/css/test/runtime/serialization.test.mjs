import assert from 'node:assert/strict';
import test from 'node:test';
import { serializeCssRules } from './runtime.mjs';

await test('SSR 清单阻止 HTML 标签截断，并保持原始声明供哈希恢复', () => {
  const rules = [
    { className: 'z-test', body: 'content:"\\</StYlE><script>x</script>";\r\ncolor:red;' },
  ];
  const { cssText, manifest } = serializeCssRules(rules);
  assert.equal(/<\/style/i.test(cssText), false);
  assert.equal(manifest.includes('<'), false);
  assert.deepEqual(JSON.parse(manifest), rules);
  assert.ok(cssText.includes('<\\/StYlE>'));
  assert.equal(cssText.includes('\r'), false);
});

await test('nonce 属性安全编码，不影响规则清单', () => {
  assert.equal(
    serializeCssRules([], { nonce: 'a"&<' }).nonceAttribute,
    ' nonce="a&quot;&amp;&lt;"',
  );
});
