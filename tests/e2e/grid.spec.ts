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
        const node = document.querySelector('[data-grid-attached]');
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
  test(`${mode} Grid 相连矩阵与不满行外轮廓`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await open(page, mode);
    const demo = page.locator('#grid-demo');
    const grid = demo.locator('[data-grid-attached]');
    if (mode === 'ssr')
      expect(await grid.evaluate((node) => node === Reflect.get(window, '__gridSSR'))).toBe(true);
    for (const columns of [1, 2, 3, 4]) {
      await demo.getByLabel('网格列数', { exact: true }).fill(String(columns));
      for (const count of [0, 1, 2, 3, 4, 5, 6, 7, 9, 10]) {
        await demo.getByLabel('网格项数', { exact: true }).fill(String(count));
        await expect(grid.locator('[data-grid-item]')).toHaveCount(count);
        const corners = await grid.locator('[data-grid-item]').evaluateAll((nodes) =>
          nodes.map((node) => {
            const style = getComputedStyle(node);
            return [
              style.borderStartStartRadius,
              style.borderStartEndRadius,
              style.borderEndStartRadius,
              style.borderEndEndRadius,
            ];
          }),
        );
        const expected = Array.from({ length: count }, (_, index) => {
          const end = index % columns === columns - 1 || index === count - 1;
          const noBelow = index + columns >= count;
          return [
            index === 0,
            index < columns && end,
            index % columns === 0 && noBelow,
            end && noBelow,
          ].map((corner) => (corner ? '8px' : '0px'));
        });
        expect(corners, `${columns} 列 ${count} 项`).toEqual(expected);
      }
    }
    expect(errors).toEqual([]);
  });

  test(`${mode} Grid 二维接缝、方向、焦点与动态隐藏`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await open(page, mode);
    const demo = page.locator('#grid-demo');
    const grid = demo.locator('[data-grid-attached]');
    const items = grid.locator('[data-grid-item]:not([hidden])');
    const first = (await items.nth(0).boundingBox())!;
    const second = (await items.nth(1).boundingBox())!;
    const below = (await items.nth(3).boundingBox())!;
    expect(first.x + first.width - second.x).toBeCloseTo(1, 1);
    expect(first.y + first.height - below.y).toBeCloseTo(1, 1);
    await items.nth(0).focus();
    await page.keyboard.press('Tab');
    await expect(items.nth(1)).toBeFocused();
    await expect(items.nth(1)).toHaveCSS('z-index', '3');
    await expect(grid).toHaveCSS('overflow', 'visible');
    await demo.getByLabel('网格隐藏首项', { exact: true }).check();
    await expect(grid.locator('[data-grid-item="1"]')).toBeHidden();
    await expect(items.nth(0)).toHaveCSS('border-start-start-radius', '8px');
    await expect(items.nth(0)).toHaveCSS('margin-inline-start', '0px');
    await expect(items.nth(0)).toHaveCSS('margin-block-start', '0px');
    await demo.getByLabel('网格反转', { exact: true }).check();
    await expect(items.nth(0)).toHaveAttribute('data-grid-item', '5');
    await expect(items.nth(0)).toHaveCSS('border-start-start-radius', '8px');
    await demo.getByLabel('网格 RTL', { exact: true }).check();
    await expect(items.nth(0)).toHaveCSS('border-top-right-radius', '8px');
    await demo.getByLabel('网格纵向书写', { exact: true }).check();
    await expect(items.nth(0)).toHaveCSS('border-start-start-radius', '8px');
    await expect(items.nth(1)).toHaveCSS('margin-inline-start', '-1px');
    await demo.getByLabel('网格放大', { exact: true }).check();
    await expect(items.nth(0)).toHaveCSS('border-start-start-radius', '16px');
    await expect(items.nth(1)).toHaveCSS('margin-inline-start', '-2px');
    await demo.getByLabel('网格放大', { exact: true }).uncheck();
    const mixed = demo.locator('[data-grid-mixed] > [data-ui-action]');
    expect((await mixed.nth(0).boundingBox())!.width).toBeCloseTo(
      (await mixed.nth(1).boundingBox())!.width - 1,
      1,
    );
    await expect(mixed.nth(1)).toHaveCSS('border-bottom-left-radius', '0px');
    await expect(mixed.nth(2)).toBeDisabled();
    await expect(mixed.nth(3)).toBeDisabled();
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
