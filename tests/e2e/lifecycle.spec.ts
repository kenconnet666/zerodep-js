import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} mount 在连接 DOM 后执行，销毁先取消，快照可以传给外部 API`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('[data-lifecycle-child]')).toHaveText('已挂载');
    await expect(page.locator('[data-lifecycle-events]')).toHaveText('mount:true;');
    await page.locator('[data-snapshot]').click();
    await expect(page.locator('[data-snapshot-state]')).toHaveText('1/10');
    await expect(page.locator('[data-lifecycle-events]')).toHaveText('mount:true;');
    await page.locator('[data-lifecycle-toggle]').click();
    await expect(page.locator('[data-lifecycle-events]')).toHaveText(
      'mount:true;mount-cleanup;cleanup:true;',
    );
    await page.locator('[data-lifecycle-toggle]').click();
    await expect(page.locator('[data-lifecycle-events]')).toHaveText(
      'mount:true;mount-cleanup;cleanup:true;mount:true;',
    );
    expect(errors).toEqual([]);
  });
}
