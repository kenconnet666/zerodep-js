import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 标题更新不改变优先级，子域/独立根卸载恢复外层`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page).toHaveTitle('zerodep-js example');
    await expect(page.locator('head meta[name=description]')).toHaveAttribute(
      'content',
      '基础 API 验收',
    );
    await page.locator('[data-head-child-toggle]').click();
    await expect(page).toHaveTitle('子区域标题');
    await page.locator('[data-head-change]').click();
    await expect(page).toHaveTitle('子区域标题');
    await page.locator('[data-head-fail]').click();
    await expect(page.locator('[data-head-retry]')).toBeVisible();
    await expect(page).toHaveTitle('更新后的标题');
    await page.locator('[data-head-retry]').click();
    await expect(page).toHaveTitle('子区域标题');
    await page.locator('[data-head-child-toggle]').click();
    await expect(page).toHaveTitle('更新后的标题');
    await page.locator('[data-head-second]').click();
    await expect(page).toHaveTitle('另一个根');
    await page.locator('[data-head-second]').click();
    await expect(page).toHaveTitle('更新后的标题');
    await expect(page.locator('head title')).toHaveCount(1);
    await page.locator('[data-head-foreign]').click();
    await expect(page.locator('[data-head-foreign-result]')).toHaveText('另一个根/外部原标题');
    await expect(page).toHaveTitle('更新后的标题');
    await page.locator('[data-unmount]').click();
    await expect(page.locator('head title')).toHaveCount(0);
    await expect(page.locator('head meta[name=description]')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('SSR 首屏含元信息；接管失败不清除服务端元信息', async ({ page, request }) => {
  const html = await (await request.get('/?render=ssr')).text();
  expect(html).toContain('<title data-zj-head="title">zerodep-js example</title>');
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/?render=ssr', async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      body: (await response.text()).replace('data-zj-open="0"', 'data-zj-open="bad"'),
    });
  });
  await page.goto('/?render=ssr');
  await expect.poll(() => errors.some((value) => value.includes('展开初值标记'))).toBe(true);
  await expect(page).toHaveTitle('zerodep-js example');
  await expect(page.locator('head meta[name=description]')).toHaveAttribute(
    'content',
    '基础 API 验收',
  );
});
