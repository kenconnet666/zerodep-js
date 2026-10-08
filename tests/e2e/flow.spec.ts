import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test.describe(mode, () => {
    for (const fallback of [false, true]) {
      test(`列表排序保留节点、草稿、焦点与选区${fallback ? '（兼容移动路径）' : ''}`, async ({
        page,
      }) => {
        if (fallback)
          await page.addInitScript(() => {
            Object.defineProperty(Element.prototype, 'moveBefore', {
              configurable: true,
              value: undefined,
            });
            Object.defineProperty(DocumentFragment.prototype, 'moveBefore', {
              configurable: true,
              value: undefined,
            });
          });
        await page.goto(`/?render=${mode}`);
        const input = page.getByRole('textbox', { name: '草稿 2', exact: true });
        await input.fill('用户草稿');
        await input.evaluate((node: HTMLInputElement) => {
          node.setSelectionRange(1, 3);
          node.dataset.original = 'true';
        });
        await page.locator('[data-reverse]').evaluate((node: HTMLButtonElement) => node.click());
        await expect(page.locator('[data-row]').first()).toHaveAttribute('data-row', '3');
        expect(
          await page
            .locator('[data-row]')
            .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-row'))),
        ).toEqual(['3', '2', '1']);
        await expect(input).toBeFocused();
        await expect(input).toHaveAttribute('data-original', 'true');
        expect(
          await input.evaluate((node: HTMLInputElement) => [
            node.selectionStart,
            node.selectionEnd,
          ]),
        ).toEqual([1, 3]);
        await page.locator('[data-replace-rows]').click();
        await expect(page.locator('[data-row="2"] [data-row-source]')).toHaveText('乙更新');
        await expect(input).toHaveValue('用户草稿');
        await page.locator('[data-add-row]').click();
        await expect(page.locator('[data-row="2"] [data-row-index]')).toHaveText('2');
        await expect(page.locator('[data-removed]')).toHaveText('');
      });
    }

    test('删除和清空释放每行作用域，空态与重复 key 可恢复', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(`/?render=${mode}`);
      await page.getByRole('button', { name: '删除 2', exact: true }).click();
      await expect(page.locator('[data-row="2"]')).toHaveCount(0);
      await expect(page.locator('[data-removed]')).toHaveText('2');
      await page.locator('[data-clear-rows]').click();
      await expect(page.locator('[data-empty]')).toBeVisible();
      expect((await page.locator('[data-removed]').textContent())!.split(',').sort()).toEqual([
        '1',
        '2',
        '3',
      ]);
      await page.locator('[data-add-row]').click();
      await expect(page.locator('[data-empty]')).toHaveCount(0);
      await page.locator('[data-duplicate-row]').click();
      await expect(page.locator('[data-list-error]')).toContainText('重复的列表 key');
      await page.locator('[data-repair-list]').click();
      await expect(page.locator('[data-row]')).toHaveCount(1);
      expect(errors).toEqual([]);
    });

    test('context 按作用域继承，内层覆盖不影响外层和默认值', async ({ page }) => {
      await page.goto(`/?render=${mode}`);
      await expect(page.locator('[data-theme="default"]')).toHaveText('默认');
      await expect(page.locator('[data-theme="outer"]')).toHaveText('蓝');
      await expect(page.locator('[data-theme="inner"]')).toHaveText('内层');
      await page.locator('[data-change-theme]').click();
      await expect(page.locator('[data-theme="outer"]')).toHaveText('紫');
      await expect(page.locator('[data-theme="inner"]')).toHaveText('内层');
      await expect(page.locator('[data-theme="default"]')).toHaveText('默认');
    });

    test('清理中再次 reset 不重复挂载恢复子树', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(`/?render=${mode}`);
      await page.locator('[data-cleanup-reset-error]').click();
      await page.locator('[data-cleanup-reset-recover]').click();
      await expect(page.locator('[data-working]')).toHaveCount(1);
      await expect(page.locator('[data-working]')).toHaveText('工作正常');
      await page.locator('[data-unmount]').click();
      await expect(page.locator('[data-working]')).toHaveCount(0);
      expect(errors).toEqual([]);
    });

    test('呈现与副作用错误局部恢复，fallback 自身失败交给外层', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(`/?render=${mode}`);
      for (const kind of ['render', 'effect', 'promise', 'promise-text']) {
        await page.locator(`[data-${kind}-error]`).click();
        await expect(page.locator('[data-boundary-error]')).toBeVisible();
        if (kind.startsWith('promise'))
          await expect(page.locator('[data-boundary-error]')).toContainText('Promise');
        await page.locator('[data-recover]').click();
        await expect(page.locator('[data-working]')).toHaveText('工作正常');
      }
      await page.locator('[data-nested-error]').click();
      await expect(page.locator('[data-outer-error]')).toContainText('备用界面失败');
      await page.locator('[data-recover-outer]').click();
      await expect(page.locator('[data-nested-ok]')).toBeVisible();
      await page.locator('[data-increment]').click();
      await expect(page.locator('[data-count]')).toHaveText('1');
      expect(errors).toEqual([]);
    });
  });
}
