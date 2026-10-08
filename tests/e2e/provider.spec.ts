import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const url = 'http://127.0.0.1:4176';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} Provider 独立继承、主题语言切换、日期时区和 Portal 清理`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    if (mode === 'ssr') {
      const entry = pathToFileURL(resolve('apps/docs/dist/server/entry-server.js')).href;
      const { render } = (await import(entry)) as {
        render: () => { html: string; styles: string };
      };
      const result = render();
      const template = await readFile('apps/docs/dist/index.html', 'utf8');
      const html = template
        .replace('<div id="app"></div>', `<div id="app">${result.html}</div>`)
        .replace('</head>', `${result.styles}</head>`);
      await page.route(url + '/', (route) =>
        route.fulfill({ contentType: 'text/html', body: html }),
      );
      // 先禁用脚本检查真实 SSR 首屏，再让同一文档正常接管。
      await page.route('**/assets/*.js', (route) => route.abort());
      await page.goto(url);
      await expect(page.locator('[data-preview="outer"] [data-message]')).toHaveText('暂无数据');
      await expect(page.locator('[data-provider="inner"]')).toHaveCSS('color-scheme', 'dark');
      await page.unroute('**/assets/*.js');
    }
    await page.goto(url);
    await expect(page.locator('#app')).toHaveAttribute('data-ready', 'true');
    const outer = page.locator('[data-preview="outer"]');
    const inner = page.locator('[data-preview="inner"]');
    await expect(outer).toHaveCSS('color', 'rgb(32, 42, 54)');
    await expect(inner).toHaveCSS('color', 'rgb(237, 242, 247)');
    await expect(outer.locator('[data-hours]')).toHaveText('24');
    await expect(inner.locator('[data-hours]')).toHaveText('23');
    await page.getByLabel('保留输入').fill('切换后仍保留');
    await outer.evaluate((node) => {
      (node as HTMLElement).dataset.preserved = 'true';
    });
    await page.getByLabel('暗色', { exact: true }).check();
    await expect(outer).toHaveCSS('color', 'rgb(237, 242, 247)');
    await page.getByLabel('英文文案').check();
    await expect(outer.locator('[data-confirm]')).toHaveText('OK');
    await expect(outer.locator('[data-locale]')).toHaveText('zh-CN');
    await page.getByLabel('纽约时区').check();
    await expect(outer.locator('[data-hours]')).toHaveText('23');
    await expect(outer.locator('[data-date]')).toHaveText(
      await inner.locator('[data-date]').innerText(),
    );
    await page.getByLabel('美国格式').check();
    await expect(inner.locator('[data-locale]')).toHaveText('en-US');
    await page.getByLabel('显示 Portal').check();
    const portal = page.locator('[data-provider="portal"]');
    await expect(portal).toHaveAttribute('lang', 'en-US');
    await expect(portal).toHaveCSS('color-scheme', 'dark');
    await page.getByLabel('内层覆盖').uncheck();
    await page.getByLabel('暗色', { exact: true }).uncheck();
    await page.getByLabel('英文文案').uncheck();
    await page.getByLabel('纽约时区').uncheck();
    await expect(inner).toHaveCSS('color', 'rgb(32, 42, 54)');
    await expect(inner.locator('[data-confirm]')).toHaveText('确定');
    await expect(inner.locator('[data-hours]')).toHaveText('24');
    await expect(portal).toHaveAttribute('lang', 'zh-CN');
    await expect(portal).toHaveCSS('color-scheme', 'light');
    await expect(outer).toHaveAttribute('data-preserved', 'true');
    await expect(page.getByLabel('保留输入')).toHaveValue('切换后仍保留');
    await page.getByLabel('显示预览').uncheck();
    await expect(portal).toHaveCount(0);
    await page.getByLabel('显示预览').check();
    await expect(outer.locator('[data-theme]')).toHaveText('light');
    expect(errors).toEqual([]);
  });
}
