import { expect, test, type Page } from '@playwright/test';

async function holdClient(page: Page) {
  let release!: () => void;
  const ready = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/assets/*.js', async (route) => {
    await ready;
    await route.continue();
  });
  return release;
}

for (const mode of ['csr', 'ssr']) {
  test(`${mode} details 双向更新、拒绝同值和原生互斥组`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    const details = page.locator('[data-details-bound]');
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    await page.locator('[data-details-toggle]').click();
    await expect(details).toHaveAttribute('open', '');
    await expect(page.locator('[data-details-last]')).toHaveText('true');
    await details.locator('summary').click();
    await expect(page.locator('[data-details-model]')).toHaveText('false');
    await page.locator('[data-details-reject]').check();
    await details.locator('summary').click();
    await expect(details).not.toHaveAttribute('open');
    await expect(page.locator('[data-details-model]')).toHaveText('false');
    await page.locator('[data-details-left] summary').click();
    await expect(page.locator('[data-details-pair]')).toHaveText('true:false');
    await page.locator('[data-details-right] summary').click();
    await expect(page.locator('[data-details-pair]')).toHaveText('false:true');
    await page.locator('[data-unmount]').click();
    await expect(details).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('details 接管前展开保留 DOM 并写回模型', async ({ page }) => {
  const release = await holdClient(page);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    await page.goto('/?render=ssr', { waitUntil: 'commit' });
    const details = page.locator('[data-details-bound]');
    await details.locator('summary').click();
    const original = await details.elementHandle();
    await expect(details).toHaveAttribute('open', '');
    release();
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    await expect(page.locator('[data-details-model]')).toHaveText('true');
    await expect(details).not.toHaveAttribute('data-zj-open');
    expect(
      await original!.evaluate((node) => node === document.querySelector('[data-details-bound]')),
    ).toBe(true);
    expect(errors).toEqual([]);
  } finally {
    release();
  }
});

test('损坏的 details 初值标记不能被当作接管前用户操作', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/?render=ssr', async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      body: (await response.text()).replace('data-zj-open="0"', 'data-zj-open="1"'),
    });
  });
  await page.goto('/?render=ssr');
  await expect.poll(() => errors.some((message) => message.includes('展开初值标记'))).toBe(true);
  await expect(page.locator('[data-details-model]')).toHaveText('false');
});
