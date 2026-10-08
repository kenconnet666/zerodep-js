import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} Portal 保留上下文和实例，移动、错误恢复与卸载只清理自身内容`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    const panel = page.locator('[data-portal-panel]');
    await expect(panel).toBeVisible();
    await expect(page.locator('[data-portal-context]')).toHaveText('来自原父组件');
    expect(await panel.evaluate((node) => node.parentNode === document.body)).toBe(true);
    const clicks = await page.locator('[data-portal-origin-clicks]').textContent();
    await page.locator('[data-portal-count]').click();
    await expect(page.locator('[data-portal-origin-clicks]')).toHaveText(clicks!);
    await page.getByLabel('外层草稿').fill('保留输入');
    const input = await page.getByLabel('外层草稿').elementHandle();
    const id = await page.getByLabel('外层草稿').getAttribute('id');
    await page.locator('[data-portal-update]').click();
    await expect(page.locator('[data-portal-message]')).toHaveText('更新消息');
    for (const side of ['left', 'right', 'body']) {
      await page.locator(`[data-portal-${side}]`).click();
      if (side === 'body')
        expect(await panel.evaluate((node) => node.parentNode === document.body)).toBe(true);
      else
        await expect(
          page.locator(`[data-portal-${side}-target] [data-portal-panel]`),
        ).toBeVisible();
      expect(
        await input!.evaluate(
          (node) => node === document.querySelector('[data-portal-panel] input'),
        ),
      ).toBe(true);
      await expect(page.getByLabel('外层草稿')).toHaveValue('保留输入');
      await expect(page.locator('[data-portal-count]')).toHaveText('1');
      expect(await page.getByLabel('外层草稿').getAttribute('id')).toBe(id);
    }
    await expect(page.locator('[data-portal-existing-left]')).toHaveText('已有左侧内容');
    await expect(page.locator('[data-portal-existing-right]')).toHaveText('已有右侧内容');
    await page.getByLabel('外层草稿').focus();
    await page
      .getByLabel('外层草稿')
      .evaluate((node: HTMLInputElement) => node.setSelectionRange(1, 3));
    await page.evaluate(() =>
      document.querySelector<HTMLButtonElement>('[data-portal-left]')!.click(),
    );
    await expect(page.locator('[data-portal-left-target] [data-portal-panel]')).toBeVisible();
    await expect(page.getByLabel('外层草稿')).toBeFocused();
    expect(
      await page
        .getByLabel('外层草稿')
        .evaluate((node: HTMLInputElement) => [node.selectionStart, node.selectionEnd]),
    ).toEqual([1, 3]);
    await page.locator('[data-portal-hide]').click();
    await expect(panel).toHaveCount(0);
    await expect(page.locator('[data-portal-nested]')).toHaveCount(0);
    await page.locator('[data-portal-body]').click();
    await expect(panel).toBeVisible();
    await expect(page.locator('[data-portal-count]')).toHaveText('0');
    await page.locator('[data-portal-fail]').click();
    await expect(panel).toHaveCount(0);
    await expect(page.locator('[data-portal-nested]')).toHaveCount(0);
    await expect(page.locator('[data-portal-retry]')).toBeVisible();
    await page.locator('[data-portal-retry]').click();
    await expect(panel).toBeVisible();
    await page.locator('[data-portal-close]').click();
    await expect(panel).toHaveCount(0);
    await page.locator('[data-portal-open]').click();
    await expect(panel).toBeVisible();
    await page.locator('[data-unmount]').click();
    await expect(panel).toHaveCount(0);
    await expect(page.locator('[data-portal-nested]')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('SSR 不输出外层内容，接管失败也不会向 body 留下内容', async ({ page, request }) => {
  const response = await request.get('/?render=ssr');
  const html = await response.text();
  expect(html).toContain('<!--zj:portal--><!--zj:/portal-->');
  expect(html).not.toContain('data-portal-panel');
  await page.route('**/?render=ssr', async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      body: (await response.text()).replace('<!--zj:portal-->', '<!--broken-portal-->'),
    });
  });
  const error = page.waitForEvent('pageerror');
  await page.goto('/?render=ssr');
  expect((await error).message).toContain('portal');
  await expect(page.locator('[data-portal-panel]')).toHaveCount(0);
  await expect(page.locator('[data-portal-nested]')).toHaveCount(0);
});
