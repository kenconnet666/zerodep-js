import { expect, test, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const url = 'http://127.0.0.1:4176';
async function open(page: Page, mode: string) {
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
    await page.addInitScript(() => {
      new MutationObserver((_, observer) => {
        const node = document.querySelector('[data-grid-layout]');
        if (node) {
          Object.defineProperty(window, '__gridSSR', { value: node });
          observer.disconnect();
        }
      }).observe(document, { childList: true, subtree: true });
    });
  }
  await page.goto(url);
  await expect(page.locator('#app')).toHaveAttribute('data-ready', 'true');
}

for (const mode of ['csr', 'ssr']) {
  test(`${mode} Grid 普通排列、动态列数和隐藏不改变按钮外观`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await open(page, mode);
    const demo = page.locator('#grid-demo');
    const grid = demo.locator('[data-grid-layout]');
    if (mode === 'ssr')
      expect(await grid.evaluate((node) => node === Reflect.get(window, '__gridSSR'))).toBe(true);
    await expect(grid).not.toHaveAttribute('role');
    const items = grid.locator('[data-grid-item]:not([hidden])');
    const first = (await items.nth(0).boundingBox())!;
    const next = (await items.nth(1).boundingBox())!;
    expect(next.x - first.x - first.width).toBeCloseTo(8, 1);
    for (const columns of [1, 2, 3, 4]) {
      await demo.getByLabel('网格列数', { exact: true }).fill(String(columns));
      expect(
        await grid.evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(' ').length),
      ).toBe(columns);
      for (const count of [0, 1, 3, 5]) {
        await demo.getByLabel('网格项数', { exact: true }).fill(String(count));
        await expect(items).toHaveCount(count);
        for (const item of await items.all()) {
          await expect(item).toHaveCSS('border-radius', '8px');
          await expect(item).toHaveCSS('margin-inline-start', '0px');
          await expect(item).toHaveCSS('margin-block-start', '0px');
        }
      }
    }
    await demo.getByLabel('网格隐藏首项', { exact: true }).check();
    await expect(grid.locator('[data-grid-item="1"]')).toBeHidden();
    await demo.getByLabel('网格反转', { exact: true }).check();
    await expect(items.first()).toHaveAttribute('data-grid-item', '5');
    await demo.getByLabel('网格 RTL', { exact: true }).check();
    await demo.getByLabel('网格纵向书写', { exact: true }).check();
    await expect(items.first()).toHaveCSS('border-radius', '8px');
    await demo.getByLabel('网格放大', { exact: true }).check();
    await expect(items.first()).toHaveCSS('border-radius', '16px');
    expect(errors).toEqual([]);
  });

  test(`${mode} Grid 原生自动填充与跨列`, async ({ page }) => {
    await open(page, mode);
    const demo = page.locator('#grid-demo');
    const auto = demo.locator('[data-grid-auto]');
    const cells = auto.locator('button');
    expect((await cells.nth(0).boundingBox())!.y).toBeCloseTo(
      (await cells.nth(3).boundingBox())!.y,
      1,
    );
    await demo.getByLabel('自动网格收窄', { exact: true }).check();
    expect((await cells.nth(2).boundingBox())!.y).toBeGreaterThan(
      (await cells.nth(0).boundingBox())!.y,
    );
    expect((await cells.nth(0).boundingBox())!.y).toBeCloseTo(
      (await cells.nth(1).boundingBox())!.y,
      1,
    );
    const span = demo.locator('[data-grid-span] > button');
    expect((await span.nth(0).boundingBox())!.width).toBeCloseTo(
      (await span.nth(1).boundingBox())!.width * 2 + 8,
      1,
    );
    await expect(auto).not.toHaveAttribute('role');
  });
}
