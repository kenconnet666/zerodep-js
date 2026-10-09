import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const url = 'http://127.0.0.1:4176';
for (const mode of ['csr', 'ssr']) {
  test(`${mode} 字号基准、完整 em 比例和局部覆盖`, async ({ page }) => {
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
    }
    await page.goto(url);
    await expect(page.locator('#app')).toHaveAttribute('data-ready', 'true');
    for (const size of [14, 16, 20]) {
      const row = page.locator(`[data-sizing-row="${size}"]`);
      const text = row.locator('[data-sizing="text"]');
      const mixed = row.locator('[data-sizing="mixed"]');
      const icon = row.locator('[data-sizing="icon"]');
      const loading = row.locator('[data-sizing="loading"]');
      const long = row.locator('[data-sizing="long"]');
      for (const button of [text, mixed, icon, loading, long]) {
        await expect(button).toHaveCSS('font-size', `${size}px`);
        expect(await button.evaluate((node) => node.style.borderTopWidth)).toBe('0.0625em');
        await expect(button).toHaveCSS('padding-top', `${size * 0.625}px`);
        const rect = (await button.boundingBox())!;
        expect(rect.height).toBeGreaterThanOrEqual(size * 2.5);
        expect(rect.width).toBeGreaterThanOrEqual(size * 2.5);
      }
      await expect(mixed).toHaveCSS('column-gap', `${size * 0.5}px`);
      await expect(mixed.locator('svg')).toHaveCSS('width', `${size * 1.125}px`);
      await expect(loading.locator('svg')).toHaveCSS('width', `${size * 1.125}px`);
      // 边框可能被浏览器量化；验证声明的 em 单位，并使用实际边框核对自然高度。
      const border = await text.evaluate((node) =>
        Number.parseFloat(getComputedStyle(node).borderTopWidth),
      );
      expect((await text.boundingBox())!.height).toBeCloseTo(size * 2.5 + border * 2, 1);
      expect((await long.boundingBox())!.height).toBeGreaterThan(
        (await mixed.boundingBox())!.height,
      );
      expect(await long.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true);
    }
    const focused = page.locator('[data-sizing-row="16"] [data-sizing="text"]');
    await focused.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(focused).toHaveCSS('outline-width', '2px');
    await expect(focused).toHaveCSS('outline-offset', '2px');
    const originalHeight = (await focused.boundingBox())!.height;
    await focused.evaluate((node) => {
      node.style.fontSize = '32px';
    });
    await expect(focused).toHaveCSS('outline-width', '4px');
    await expect(focused).toHaveCSS('outline-offset', '4px');
    await expect(focused).toHaveCSS('border-top-width', '2px');
    expect((await focused.boundingBox())!.height).toBeCloseTo(originalHeight * 2, 1);
    const inherited = page.locator('[data-sizing-inherit]');
    await expect(inherited).toHaveCSS('font-size', '14px');
    await page.getByLabel('继承外围字号', { exact: true }).check();
    await expect(inherited).toHaveCSS('font-size', '18px');
    for (const svg of await inherited.locator('svg').all())
      await expect(svg).toHaveCSS('width', '18px');
    await page.getByLabel('继承外围字号', { exact: true }).uncheck();
    await expect(inherited).toHaveCSS('font-size', '14px');
    const local = page.locator('[data-sizing-local]');
    await expect(local).toHaveCSS('font-size', '20px');
    await expect(local).toHaveCSS('padding-top', '12.5px');
    await expect(local.locator('svg')).toHaveCSS('width', '16px');
    await expect(local.locator('span').first()).toHaveCSS('font-size', '14px');
    expect(errors).toEqual([]);
  });
}
