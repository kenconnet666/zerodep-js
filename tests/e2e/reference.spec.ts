import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} ref 自行卸载仍清理资源，异步引用只报告同步诊断`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await page.locator('[data-reference-dispose]').click();
    await expect(page.locator('[data-reference-probe-result]')).toHaveText('1');
    await expect(page.locator('[data-reference-probe]')).toHaveCount(0);
    await page.locator('[data-reference-async]').click();
    await expect(page.locator('[data-reference-probe-result]')).toContainText('DOM ref 必须同步');
    await expect(page.locator('[data-reference-probe]')).toHaveCount(0);
    await page.locator('[data-reference-failure]').click();
    await expect(page.locator('[data-reference-probe-result]')).toHaveText('ref setup/ref cleanup');
    await expect(page.locator('[data-reference-probe]')).toHaveCount(0);
    expect(errors).toEqual([]);
  });

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
  const html = await response.text();
  // output 采用受控文本协议，不再包含会被原生 reset 清除的结构注释。
  expect(html).toMatch(/data-reference-current[^>]*>empty<\/output>/);
  expect(html).toMatch(/data-reference-mounted[^>]*><\/output>/);
});
