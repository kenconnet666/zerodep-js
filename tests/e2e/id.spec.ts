import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 组件 ID 接管一致，列表移动稳定，重建生成新 ID`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    if (mode === 'ssr')
      await page.route('**/assets/*.js', async (route) => {
        await gate;
        await route.continue();
      });
    try {
      await page.goto(`/?render=${mode}`, { waitUntil: mode === 'ssr' ? 'commit' : 'load' });
      const first = page.locator('[data-id-field="甲"] input');
      await expect(first).toBeAttached();
      const initial = await first.getAttribute('id');
      const node = await first.elementHandle();
      release();
      await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
      expect(
        await node!.evaluate(
          (node) => node === document.querySelector('[data-id-field="甲"] input'),
        ),
      ).toBe(true);
      expect(await first.getAttribute('id')).toBe(initial);
      await expect(page.locator('[data-id-field="独立根"] input')).toBeAttached();
      const ids = await page
        .locator('[data-id-field] [id]')
        .evaluateAll((nodes) => nodes.map((node) => node.id));
      expect(new Set(ids).size).toBe(ids.length);
      await page.locator('[data-id-reverse]').click();
      expect(await first.getAttribute('id')).toBe(initial);
      const optional = page.locator('[data-id-field="可选"] input');
      const before = await optional.getAttribute('id');
      await page.locator('[data-id-toggle]').click();
      await expect(optional).toHaveCount(0);
      await page.locator('[data-id-toggle]').click();
      await expect(optional).toBeAttached();
      expect(await optional.getAttribute('id')).not.toBe(before);
      expect(
        await page.locator('[data-id-field]').evaluateAll((fields) =>
          fields.every((field) => {
            const input = field.querySelector('input')!;
            return (
              field.querySelector('label')!.htmlFor === input.id &&
              field.querySelector('small')!.id === input.getAttribute('aria-describedby')
            );
          }),
        ),
      ).toBe(true);
      expect(errors).toEqual([]);
      await page.locator('[data-unmount]').click();
      await expect(page.locator('[data-id-field]')).toHaveCount(0);
      expect(
        await page.locator('#app').evaluate((root) => {
          const walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT);
          while (walker.nextNode())
            if (walker.currentNode.textContent?.startsWith('zj:id:')) return true;
          return false;
        }),
      ).toBe(false);
    } finally {
      release();
    }
  });
}

test('接管拒绝损坏的组件 ID 标记，显式 replace 可以重新建立关联', async ({ page }) => {
  await page.route('**/?render=ssr*', async (route) => {
    const response = await route.fetch();
    const html = (await response.text()).replace(
      /<!--zj:id:zj-[a-f0-9]{32}-->/,
      '<!--zj:id:invalid-->',
    );
    await route.fulfill({ response, body: html });
  });
  await page.goto('/?render=ssr&recover=replace');
  await expect(page.locator('#app')).toHaveAttribute(
    'data-hydration-error',
    'ZJ_HYDRATION_MISMATCH',
  );
  await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
  const field = page.locator('[data-id-field="甲"]');
  expect(await field.locator('label').getAttribute('for')).toBe(
    await field.locator('input').getAttribute('id'),
  );
});
