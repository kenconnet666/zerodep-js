import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} DOM bind:this 支持挂载、焦点、条件清理和键替换`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('[data-reference-mounted]')).toHaveText('true/circle');
    await expect(page.locator('[data-reference-current]')).toHaveText('input');
    await page.locator('[data-reference-focus]').click();
    await expect(page.locator('[data-reference-input]')).toBeFocused();
    await page.locator('[data-reference-toggle]').click();
    await expect(page.locator('[data-reference-input]')).toHaveCount(0);
    await expect(page.locator('[data-reference-current]')).toHaveText('empty');
    await page.locator('[data-reference-toggle]').click();
    await expect(page.locator('[data-reference-current]')).toHaveText('input');
    await page.locator('[data-reference-input]').fill('旧节点');
    await page.locator('[data-reference-replace]').click();
    await expect(page.locator('[data-reference-input]')).toHaveValue('');
    await page.locator('[data-reference-focus]').click();
    await expect(page.locator('[data-reference-input]')).toBeFocused();
    await page.locator('[data-unmount]').click();
    await expect(page.locator('[data-reference-input]')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('SSR 中引用保持空态，不尝试创建浏览器对象', async ({ request }) => {
  const response = await request.get('/?render=ssr');
  expect(response.ok()).toBe(true);
  expect(await response.text()).toMatch(
    /data-reference-current[^>]*><!--zj:dynamic-->empty<!--zj:\/dynamic--><\/output>/,
  );
});
