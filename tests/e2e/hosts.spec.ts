import { expect, test } from '@playwright/test';

test.use({ baseURL: 'http://127.0.0.1:4177' });

for (const host of ['vue', 'react', 'svelte']) {
  for (const mode of ['csr', 'ssr']) {
    test(`${host} ${mode} 输入更新保持页面，入口替换与卸载释放实例`, async ({ page }) => {
      const failures: string[] = [];
      page.on('pageerror', (error) => failures.push(error.message));
      await page.goto(`/${host}?mode=${mode}`);
      await expect(page.locator('[data-shared-root]')).toHaveCount(1);
      await expect(page.locator('#events')).toContainText('mount:true');
      await page.locator('[data-count-button]').click();
      const draft = page.getByRole('textbox', { name: '页内草稿' });
      await draft.fill('保留中的草稿');
      await draft.evaluate((node: HTMLInputElement) => {
        node.dataset.identity = 'retained';
        node.setSelectionRange(1, 3);
      });
      for (const name of ['更改项目输入', '更改嵌套输入', '移除可选输入', '宿主重新呈现'])
        await page
          .getByRole('button', { name, exact: true })
          .evaluate((node: HTMLButtonElement) => node.click());
      await expect(page.locator('[data-project]')).toHaveText('二');
      await expect(page.locator('[data-model]')).toHaveText('初始名字/更新标签');
      await expect(page.locator('[data-optional]')).toHaveCount(0);
      await expect(page.locator('[data-count]')).toHaveText('1');
      await expect(draft).toHaveValue('保留中的草稿');
      await expect(draft).toHaveAttribute('data-identity', 'retained');
      await expect(draft).toBeFocused();
      expect(
        await draft.evaluate((node: HTMLInputElement) => [node.selectionStart, node.selectionEnd]),
      ).toEqual([1, 3]);
      await page.locator('[data-report]').click();
      await expect(page.locator('#events')).toContainText('report:二:1');
      const events = (await page.locator('#events').textContent())!;
      expect(events.split(';').filter((event) => event === 'setup')).toHaveLength(1);
      await page.getByRole('button', { name: '更换页面入口', exact: true }).click();
      await expect(page.locator('[data-count]')).toHaveText('0');
      await expect(draft).toHaveValue('页内草稿');
      await expect(draft).not.toHaveAttribute('data-identity');
      const oldReport = await page.locator('[data-report]').elementHandle();
      await page.getByRole('button', { name: '卸载页面', exact: true }).click();
      await expect(page.locator('[data-shared-root]')).toHaveCount(0);
      await expect(page.locator('#events')).toContainText('cleanup:true');
      const after = await page.locator('#events').textContent();
      await oldReport!.evaluate((node: HTMLButtonElement) => node.click());
      expect(await page.locator('#events').textContent()).toBe(after);
      await page.getByRole('button', { name: '重新挂载页面', exact: true }).click();
      await expect(page.locator('[data-shared-root]')).toHaveCount(1);
      await expect(page.locator('[data-project]')).toHaveText('二');
      expect(failures).toEqual([]);
    });
  }

  test(`${host} SSR 只呈现宿主和空容器，新页面由客户端拥有`, async ({ request }) => {
    const response = await request.get(`/${host}?mode=ssr`);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain('页面宿主');
    expect(html).toContain('data-host-container');
    expect(html).not.toContain('data-shared-root');
    expect(html).not.toContain('共享 TSX 页面');
  });
}
