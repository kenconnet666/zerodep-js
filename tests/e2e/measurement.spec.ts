import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const url = 'http://127.0.0.1:4176';
const fluid = 'clamp(0.875rem, calc(1vw + 0.5rem), 1.5rem)';
for (const mode of ['csr', 'ssr']) {
  test(`${mode} 任意字号单位、固定容器观察、Portal 镜像和清理`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewportSize({ width: 800, height: 900 });
    if (mode === 'ssr') {
      const { render } = await import(
        pathToFileURL(resolve('apps/docs/dist/server/entry-server.js')).href
      );
      const { html, styles } = render();
      expect(html).not.toContain('data-zj-font-probe');
      expect(html).toMatch(/data-measured-font[^>]*>pending<\/output>/);
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
    const font = page.locator('[data-measured-font]');
    const source = page.locator('[data-measure-source]');
    const probe = page.locator('[data-zj-font-probe]');
    const nested = page.locator('[data-measure-nested]');
    const unit = page.getByLabel('测量字号', { exact: true });
    await expect(font).toHaveText('16');
    await expect(nested).toHaveCSS('font-size', '16px');
    await expect(probe).toHaveCount(1);
    await expect(page.locator('[data-measured-inline]')).toHaveText('160');
    await expect(page.locator('[data-measured-block]')).toHaveText('80');
    const sizeEvents = await page.locator('[data-size-events]').textContent();
    await page.getByLabel('显示字号镜像浮层', { exact: true }).check();
    const popup = page.locator('[data-font-portal]');
    await expect(popup).toHaveCSS('font-size', '16px');
    await page.setViewportSize({ width: 1600, height: 900 });
    await expect(font).toHaveText('32');
    await expect(nested).toHaveCSS('font-size', '32px');
    await expect(popup).toHaveCSS('font-size', '32px');
    await expect(page.locator('[data-size-events]')).toHaveText(sizeEvents!);
    await page.getByRole('button', { name: '读取实际字号', exact: true }).click();
    await expect(page.locator('[data-read-font]')).toHaveText('32');
    await unit.selectOption(fluid);
    await expect(font).toHaveText('24');
    await page.setViewportSize({ width: 800, height: 900 });
    await expect(font).toHaveText('16');
    await unit.selectOption('1.25rem');
    await expect(font).toHaveText('20');
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '20px';
    });
    await expect(font).toHaveText('25');
    await unit.selectOption('125%');
    await expect(font).toHaveText('25');
    await unit.selectOption('var(--measured-font)');
    await expect(font).toHaveText('22');
    await page
      .locator('[data-measure-container]')
      .evaluate((node) => node.style.setProperty('--measured-font', '26px'));
    await expect(font).toHaveText('26');
    await page.setViewportSize({ width: 1600, height: 900 });
    await unit.selectOption('5cqw');
    await expect(font).toHaveText('20');
    await page.locator('[data-measure-container]').evaluate((node) => {
      node.style.width = '600px';
    });
    await expect(font).toHaveText('30');
    await expect(popup).toHaveCSS('font-size', '30px');
    await expect(page.locator('[data-size-events]')).toHaveText(sizeEvents!);
    await source.evaluate((node) => {
      node.style.transform = 'scale(1.5)';
      node.style.transformOrigin = '0 0';
    });
    expect((await source.boundingBox())!.width).toBeCloseTo(240, 1);
    await expect(page.locator('[data-measured-inline]')).toHaveText('160');
    await unit.selectOption('0px');
    await expect(font).toHaveText('0');
    await page.getByLabel('启用字号观察', { exact: true }).uncheck();
    await expect(probe).toHaveCount(0);
    const events = await page.locator('[data-font-events]').textContent();
    await unit.selectOption('2vw');
    await expect(nested).toHaveCSS('font-size', '32px');
    await expect(page.locator('[data-font-events]')).toHaveText(events!);
    const stoppedSizes = await page.locator('[data-size-events]').textContent();
    await source.evaluate((node) => {
      node.style.width = '190px';
    });
    await page.evaluate(
      () =>
        new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        ),
    );
    await expect(page.locator('[data-measured-inline]')).toHaveText('160');
    await expect(page.locator('[data-size-events]')).toHaveText(stoppedSizes!);
    await page.getByLabel('启用字号观察', { exact: true }).check();
    await expect(font).toHaveText('32');
    await expect(page.locator('[data-measured-inline]')).toHaveText('190');
    await expect(probe).toHaveCount(1);
    await page.getByLabel('显示测量容器', { exact: true }).uncheck();
    await expect(probe).toHaveCount(0);
    await expect(popup).toHaveCount(0);
    await page.getByRole('button', { name: '读取实际字号', exact: true }).click();
    await expect(page.locator('[data-read-font]')).toHaveText('pending');
    await page.getByLabel('显示测量容器', { exact: true }).check();
    await expect(probe).toHaveCount(1);
    await expect(font).toHaveText('32');
    expect(errors).toEqual([]);
  });
}
