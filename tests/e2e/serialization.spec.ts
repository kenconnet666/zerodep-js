import { expect, test } from '@playwright/test';
import { defineComponent, element, dynamic } from '../../packages/core/dist/internal.js';
import { renderToString, serializeData } from '../../packages/ssr/dist/index.js';

test('浏览器解析 raw-text、安全 JSON 和规范化 SVG 后保留后续节点', async ({ page }) => {
  const tags = ['script', 'style', 'iframe', 'xmp', 'noembed', 'noframes'];
  const payload = { text: '</script><!-- <script><img data-injected>' };
  const App = defineComponent(() => [
    ...tags.map((tag) =>
      element(tag.toUpperCase(), {
        'data-raw': tag,
        type: 'application/json',
        children: dynamic(() => 'A<&>\r\nB'),
      }),
    ),
    element('SCRIPT', {
      'data-json': true,
      type: 'application/json',
      children: serializeData(payload),
    }),
    element('SVG', {
      children: [
        element('LINEARGRADIENT', { 'data-gradient': true }),
        element('FOREIGNOBJECT', {
          children: element('DIV', { 'data-html': true, children: 'HTML' }),
        }),
      ],
    }),
    element('p', { 'data-after': true, children: '后续内容' }),
  ]);
  await page.setContent(renderToString(App));
  for (const tag of tags)
    expect(await page.locator(`[data-raw="${tag}"]`).textContent()).toBe('A<&>\nB');
  expect(
    await page.locator('[data-json]').evaluate((node) => JSON.parse(node.textContent!)),
  ).toEqual(payload);
  expect(await page.locator('[data-gradient]').evaluate((node) => node.localName)).toBe(
    'linearGradient',
  );
  expect(
    await page.locator('[data-html]').evaluate((node) => [node.localName, node.namespaceURI]),
  ).toEqual(['div', 'http://www.w3.org/1999/xhtml']);
  await expect(page.locator('[data-injected]')).toHaveCount(0);
  await expect(page.locator('[data-after]')).toHaveText('后续内容');
});

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 原始文本更新不混入结构标记且卸载移除节点`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    const frame = page.locator('[data-raw-frame]');
    expect(await frame.textContent()).toBe('\n第一行 <>&');
    expect(await frame.evaluate((node) => node.childNodes.length)).toBe(1);
    const text = await frame.evaluateHandle((node) => node.firstChild!);
    const cased = page.locator('[data-cased-tag]');
    expect(await cased.evaluate((node) => node.localName)).toBe('x-cased');
    await page.getByRole('textbox', { name: '多行内容' }).fill('更新 <&> 中文');
    await expect.poll(() => frame.textContent()).toBe('更新 <&> 中文');
    expect(
      await text.evaluate(
        (node) => node === document.querySelector('[data-raw-frame]')!.firstChild,
      ),
    ).toBe(true);
    await page.locator('[data-unmount]').click();
    expect(await text.evaluate((node) => node.isConnected)).toBe(false);
    expect(errors).toEqual([]);
  });
}
