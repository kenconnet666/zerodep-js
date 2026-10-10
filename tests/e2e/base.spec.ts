import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const url = 'http://127.0.0.1:4176';
for (const mode of ['csr', 'ssr']) {
  test(`${mode} Text/ButtonBase/Ripple/Spinner 状态、焦点、取消与清理`, async ({ page }) => {
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
    const button = page.getByRole('button', { name: '基础搜索', exact: true });
    const wave = page.locator('[data-ripple] > span');
    const text = page.locator('[data-base-text]');
    await expect(text).toHaveCSS('font-size', '14px');
    await page.getByLabel('标题语义', { exact: true }).check();
    expect(await text.evaluate((node) => node.localName)).toBe('h2');
    await page.getByLabel('自定义文字', { exact: true }).check();
    await expect(text).toHaveCSS('font-size', '22px');
    await expect(text).toHaveCSS('color', 'rgb(102, 51, 153)');
    await expect(page.locator('[data-base-refs]')).toHaveText('1');
    await button.scrollIntoViewIfNeeded();
    const box = (await button.boundingBox())!;
    await page.mouse.move(box.x + 15, box.y + 15);
    await page.mouse.down();
    await expect(wave).toHaveCount(1);
    await page.mouse.up();
    await expect(page.locator('[data-base-clicks]')).toHaveText('1');
    await expect(wave).toHaveCount(0);
    await button.focus();
    await page.keyboard.down('Space');
    await expect(wave).toHaveCount(1);
    await page.keyboard.up('Space');
    await expect(page.locator('[data-base-clicks]')).toHaveText('2');
    await expect(wave).toHaveCount(0);
    await button.dispatchEvent('pointerdown', {
      pointerId: 91,
      isPrimary: true,
      button: 0,
      clientX: box.x + 20,
      clientY: box.y + 20,
      pointerType: 'touch',
    });
    await expect(wave).toHaveCount(1);
    await button.dispatchEvent('pointercancel', { pointerId: 91 });
    await expect(wave).toHaveCount(0);
    await expect(page.locator('[data-base-clicks]')).toHaveText('2');
    await page.getByLabel('禁用底座', { exact: true }).check();
    await expect(button).toBeDisabled();
    await expect(button).toHaveCSS('cursor', 'not-allowed');
    await button.dispatchEvent('click');
    await expect(page.locator('[data-base-clicks]')).toHaveText('2');
    await page.getByLabel('禁用底座', { exact: true }).uncheck();
    await expect(button).toHaveCSS('cursor', 'pointer');
    await page.getByLabel('开启波纹', { exact: true }).uncheck();
    await expect(page.locator('[data-ripple]')).toHaveCount(0);
    await expect(page.locator('[data-base-refs]')).toHaveText('0');
    await button.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(button).toBeFocused();
    await expect(button).toHaveCSS('outline-style', 'solid');
    await page.getByLabel('开启波纹', { exact: true }).check();
    await expect(page.locator('[data-base-refs]')).toHaveText('1');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.locator('[data-spinner]')).toHaveCSS('animation-name', 'none');
    await button.dispatchEvent('pointerdown', { pointerId: 92, isPrimary: true, button: 0 });
    await expect(wave).toHaveCount(0);
    await button.dispatchEvent('pointerup', { pointerId: 92 });
    await page.getByLabel('显示基础预览', { exact: true }).uncheck();
    await expect(button).toHaveCount(0);
    await expect(page.locator('[data-base-refs]')).toHaveText('0');
    await page.getByLabel('显示基础预览', { exact: true }).check();
    await expect(page.locator('[data-base-refs]')).toHaveText('1');
    expect(errors).toEqual([]);
  });
}
