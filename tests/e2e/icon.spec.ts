import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const url = 'http://127.0.0.1:4176';
for (const mode of ['csr', 'ssr']) {
  test(`${mode} Icon 静态数据、主题与原生样式、可访问性和卸载`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    if (mode === 'ssr') {
      const { render } = await import(
        pathToFileURL(resolve('apps/docs/dist/server/entry-server.js')).href
      );
      const { html, styles } = render();
      const template = await readFile('apps/docs/dist/index.html', 'utf8');
      await page.route(url + '/', (route) =>
        route.fulfill({
          contentType: 'text/html',
          body: template
            .replace('<div id="app"></div>', `<div id="app">${html}</div>`)
            .replace('</head>', `${styles}</head>`),
        }),
      );
      let release!: () => void;
      const ready = new Promise<void>((resolve) => {
        release = resolve;
      });
      await page.route('**/assets/*.js', async (route) => {
        await ready;
        await route.continue();
      });
      try {
        await page.goto(url, { waitUntil: 'commit' });
        await expect(page.locator('[data-icon="dynamic"]')).toHaveAttribute('role', 'img');
        // 标记对象身份而非 HTML 属性，避免探针自身触发严格接管的属性不匹配。
        await page.locator('[data-icon="dynamic"]').evaluate((node) => {
          (node as Element & { __ssrNode?: boolean }).__ssrNode = true;
        });
      } finally {
        release();
      }
    } else await page.goto(url);
    await expect(page.locator('#app')).toHaveAttribute('data-ready', 'true');
    const inherited = page.locator('[data-icon="inherited"]');
    const dynamic = page.locator('[data-icon="dynamic"]');
    const nested = page.locator('[data-icon="nested"]');
    if (mode === 'ssr')
      expect(
        await dynamic.evaluate((node) => (node as Element & { __ssrNode?: boolean }).__ssrNode),
      ).toBe(true);
    await expect(inherited).toHaveCSS('color', 'rgb(10, 80, 120)');
    await expect(inherited).toHaveCSS('width', '30px');
    await expect(inherited).toHaveAttribute('aria-hidden', 'true');
    expect(
      await inherited.evaluate((node) => [node.namespaceURI, node.firstElementChild?.namespaceURI]),
    ).toEqual(['http://www.w3.org/2000/svg', 'http://www.w3.org/2000/svg']);
    await expect(dynamic).toHaveCSS('color', 'rgb(36, 95, 197)');
    await expect(dynamic).toHaveCSS('width', '18px');
    await expect(dynamic.locator('circle')).toHaveCount(1);
    await expect(page.locator('[data-icon="styled"]')).toHaveCSS('color', 'rgb(1, 2, 3)');
    await expect(page.locator('[data-icon="styled"]')).toHaveAttribute('stroke-width', '1');
    const innerColor = await nested.evaluate((node) => getComputedStyle(node).color);
    await page.getByLabel('图标暗色主题', { exact: true }).check();
    await expect(dynamic).toHaveCSS('color', innerColor);
    await page.getByLabel('切换完成图标', { exact: true }).check();
    await expect(dynamic.locator('circle')).toHaveCount(0);
    await expect(dynamic.locator('path')).toHaveCount(1);
    await page.getByLabel('自定义图标样式', { exact: true }).check();
    await expect(dynamic).toHaveCSS('color', 'rgb(120, 40, 160)');
    await expect(dynamic).toHaveCSS('width', '24px');
    await page.getByLabel('自定义图标样式', { exact: true }).uncheck();
    await expect(dynamic).toHaveCSS('color', innerColor);
    await expect(dynamic).toHaveCSS('width', '18px');
    await page.getByLabel('图标可访问名称', { exact: true }).uncheck();
    await expect(dynamic).toHaveAttribute('aria-hidden', 'true');
    await expect(dynamic).not.toHaveAttribute('role');
    await page.getByLabel('图标可访问名称', { exact: true }).check();
    await expect(dynamic).toHaveAttribute('role', 'img');
    await expect(dynamic).not.toHaveAttribute('aria-hidden');
    await page.getByRole('button', { name: '图标搜索', exact: true }).click();
    await expect(dynamic.locator('circle')).toHaveCount(1);
    await page.getByLabel('显示图标示例', { exact: true }).uncheck();
    await expect(page.locator('#icon-demo svg')).toHaveCount(0);
    await page.getByLabel('显示图标示例', { exact: true }).check();
    await expect(dynamic.locator('circle')).toHaveCount(1);
    expect(errors).toEqual([]);
  });
}
