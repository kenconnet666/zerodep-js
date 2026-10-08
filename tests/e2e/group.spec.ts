import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 分组模型、原生重置、选项重排与多实例`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    const first = page.locator('[data-group=first]');
    const second = page.locator('[data-group=second]');
    await first.locator('[data-group-check=b]').check();
    await expect(first.locator('[data-group-picked]')).toHaveText('a,b');
    await first.locator('[data-group-radio=b]').check();
    await expect(first.locator('[data-group-choice]')).toHaveText('b');
    await expect(second.locator('[data-group-picked]')).toHaveText('a');
    await expect(second.locator('[data-group-radio=a]')).toBeChecked();
    await first.getByRole('button', { name: '重置', exact: true }).click();
    await expect(first.locator('[data-group-check=b]')).toBeChecked();
    await expect(first.locator('[data-group-radio=b]')).toBeChecked();
    const b = await first.locator('[data-group-check=b]').elementHandle();
    await first.locator('[data-group-options]').click();
    await expect(first.locator('[data-group-check=a]')).toHaveCount(0);
    await expect(first.locator('[data-group-picked]')).toHaveText('a,b');
    await expect(first.locator('[data-group-check=b]')).toBeChecked();
    await first.locator('[data-group-check=b]').uncheck();
    await expect(first.locator('[data-group-picked]')).toHaveText('a');
    await first.locator('[data-group-options]').click();
    await expect(first.locator('[data-group-check=a]')).toBeChecked();
    expect(
      await b!.evaluate(
        (node) => node === document.querySelector('[data-group=first] [data-group-check=b]'),
      ),
    ).toBe(true);
    await first.locator('[data-group-model]').click();
    await expect(first.locator('[data-group-picked]')).toHaveText('b');
    await first.locator('[data-group-reset-model]').check();
    await first.getByRole('button', { name: '重置', exact: true }).click();
    await expect(first.locator('[data-group-picked]')).toBeEmpty();
    await expect(first.locator('[data-group-choice]')).toBeEmpty();
    await expect(first.locator('[data-group-check=b]')).not.toBeChecked();
    await page.locator('[data-unmount]').click();
    await expect(first).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('SSR 接管前的分组选中由已有受控输入流程恢复', async ({ page }) => {
  let release!: () => void;
  const ready = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/assets/*.js', async (route) => {
    await ready;
    await route.continue();
  });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    await page.goto('/?render=ssr', { waitUntil: 'commit' });
    const form = page.locator('[data-group=first]');
    await form.getByRole('button', { name: '重置', exact: true }).click();
    await form.locator('[data-group-check=a]').uncheck();
    await form.locator('[data-group-check=b]').check();
    await form.locator('[data-group-radio=b]').check();
    release();
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    await expect(form.locator('[data-group-picked]')).toHaveText('b');
    await expect(form.locator('[data-group-choice]')).toHaveText('b');
    expect(errors).toEqual([]);
  } finally {
    release();
  }
});
