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
        const node = document.querySelector('[data-action="save"]');
        if (node) {
          Object.defineProperty(window, '__buttonSSR', { value: node });
          observer.disconnect();
        }
      }).observe(document, { childList: true, subtree: true });
    });
  }
  await page.goto(url);
  await expect(page.locator('#app')).toHaveAttribute('data-ready', 'true');
}

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 连续颜色更新复用类名和规则，保留主题切换`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await open(page, mode);
    const demo = page.locator('[data-button-color-demo]');
    const controls = demo.locator('[data-ui-action]');
    await expect(controls).toHaveCount(4);
    const before = await controls.evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute('class')!),
    );
    const ruleCount = () =>
      page.evaluate(() =>
        Array.from(document.querySelectorAll<HTMLStyleElement>('style[data-zerodep-css]')).reduce(
          (count, tag) => count + (tag.sheet?.cssRules.length ?? 0),
          0,
        ),
      );
    const count = await ruleCount();
    await demo.locator('input').evaluate(async (input: HTMLInputElement) => {
      for (let i = 1; i <= 200; i++) {
        input.value = '#' + i.toString(16).padStart(6, '0');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        await new Promise<void>((resolve) => queueMicrotask(resolve));
      }
    });
    for (let i = 0; i < 4; i++) {
      await expect(controls.nth(i)).toHaveCSS('color', 'rgb(0, 0, 200)');
      await expect(controls.nth(i)).toHaveCSS('border-top-color', 'rgb(0, 0, 200)');
      await expect(controls.nth(i)).toHaveAttribute('class', before[i]!);
    }
    expect(await ruleCount()).toBe(count);
    await page.getByLabel('按钮暗色', { exact: true }).check();
    await expect(controls.first()).toHaveCSS('color', 'rgb(0, 0, 200)');
    expect(errors).toEqual([]);
  });

  test(`${mode} 成品按钮加载、类型化槽、表单与原生禁用`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await open(page, mode);
    const demo = page.locator('#button-demo');
    const save = demo.locator('[data-action="save"]');
    const icon = demo.locator('[data-action="icon"]');
    if (mode === 'ssr')
      expect(await save.evaluate((node) => node === Reflect.get(window, '__buttonSSR'))).toBe(true);
    await expect(save).toHaveAccessibleName('保存按钮');
    await expect(icon).toHaveAccessibleName('搜索按钮');
    await expect(demo.locator('[data-button-refs]')).toHaveText('1');
    await save
      .locator('[data-save-icon]')
      .evaluate((node) => node.setAttribute('data-same-icon', 'yes'));
    const width = (await save.boundingBox())!.width;
    const height = (await save.boundingBox())!.height;
    expect((await icon.boundingBox())!.height).toBeCloseTo(height, 1);
    expect((await icon.boundingBox())!.width).toBeCloseTo(height, 1);
    await save.click();
    await expect(demo.locator('[data-button-clicks]')).toHaveText('1');
    await demo.getByLabel('按钮加载', { exact: true }).check();
    await expect(save).toBeDisabled();
    for (const action of ['save', 'icon', 'toggle', 'icon-toggle', 'link'])
      await expect(demo.locator(`[data-action="${action}"]`)).toHaveCSS('cursor', 'not-allowed');
    await expect(save.locator('[data-save-icon]')).toHaveCSS('cursor', 'not-allowed');
    await expect(save).toHaveAttribute('aria-busy', 'true');
    await expect(save).toHaveAccessibleName('保存按钮');
    await expect(save.locator('[data-ui-button-content]')).toHaveCSS('opacity', '0');
    await expect(save.locator('[data-loading-ripple]')).toHaveAttribute(
      'data-loading-ripple',
      'true',
    );
    expect((await save.boundingBox())!.width).toBeCloseTo(width, 1);
    await save.dispatchEvent('click');
    await expect(demo.locator('[data-button-clicks]')).toHaveText('1');
    await demo.getByLabel('按钮加载', { exact: true }).uncheck();
    await expect(save).toHaveCSS('cursor', 'pointer');
    await expect(save.locator('[data-save-icon]')).toHaveAttribute('data-same-icon', 'yes');
    await expect(demo.locator('[data-button-refs]')).toHaveText('1');
    await demo.getByLabel('按钮放大', { exact: true }).check();
    await expect(save).toHaveCSS('font-size', '32px');
    expect((await save.boundingBox())!.height).toBeCloseTo(height * 2, 1);
    await expect(save).toHaveCSS('border-top-width', '2px');
    await save.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(save).toHaveCSS('outline-width', '4px');
    const lightBackground = await save.evaluate((node) => getComputedStyle(node).backgroundColor);
    await demo.getByLabel('按钮暗色', { exact: true }).check();
    await expect(save).not.toHaveCSS('background-color', lightBackground);
    await demo.getByLabel('按钮暗色', { exact: true }).uncheck();
    await expect(save).toHaveCSS('background-color', lightBackground);
    await demo.getByLabel('按钮自定义色', { exact: true }).check();
    await expect(save).toHaveCSS('color', 'rgb(18, 52, 86)');
    await expect(save).toHaveCSS('background-color', 'rgb(254, 220, 186)');
    await demo.getByLabel('按钮自定义色', { exact: true }).uncheck();
    await expect(save).not.toHaveCSS('color', 'rgb(18, 52, 86)');
    await demo.locator('[data-action="submit"]').click();
    await expect(demo.locator('[data-button-submits]')).toHaveText('save');
    await demo.locator('[data-action="reset"]').click();
    await expect(demo.locator('[data-button-resets]')).toHaveText('1');
    await demo.getByLabel('禁用表单区域', { exact: true }).check();
    await expect(demo.locator('[data-action="submit"]')).toBeDisabled();
    await expect(demo.locator('[data-action="submit"]')).toHaveCSS('cursor', 'not-allowed');
    const base = demo.locator('[data-action="fieldset-base"]');
    await expect(base).toBeDisabled();
    await expect(base).not.toHaveAttribute('disabled');
    await expect(base).toHaveCSS('cursor', 'not-allowed');
    expect(await base.evaluate((node) => Number(getComputedStyle(node).opacity))).toBeLessThan(1);
    await base.dispatchEvent('click');
    await expect(demo.locator('[data-button-clicks]')).toHaveText('1');
    await expect(demo.locator('[data-action="legend"]')).toBeEnabled();
    await expect(demo.locator('[data-action="legend"]')).toHaveCSS('cursor', 'pointer');
    await demo.locator('[data-action="legend"]').click();
    await expect(demo.locator('[data-button-clicks]')).toHaveText('2');
    await demo.getByLabel('禁用表单区域', { exact: true }).uncheck();
    await expect(base).toBeEnabled();
    await expect(base).toHaveCSS('cursor', 'pointer');
    await expect(base).toHaveCSS('opacity', '1');
    await demo.getByLabel('显示按钮示例', { exact: true }).uncheck();
    await expect(demo.locator('[data-button-refs]')).toHaveText('0');
    expect(errors).toEqual([]);
  });

  test(`${mode} Toggle 受控绑定与 Link 原生激活`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await open(page, mode);
    const demo = page.locator('#button-demo');
    const toggle = demo.locator('[data-action="toggle"]');
    const icon = demo.locator('[data-action="icon-toggle"]');
    await toggle.focus();
    await page.keyboard.press('Space');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(icon).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await demo.getByLabel('拒绝切换请求', { exact: true }).check();
    await icon.click();
    await expect(icon).toHaveAttribute('aria-pressed', 'false');
    await expect(demo.locator('[data-button-changes]')).toHaveText('1');
    await demo.getByLabel('拒绝切换请求', { exact: true }).uncheck();
    await demo.getByLabel('取消切换事件', { exact: true }).check();
    await icon.click();
    await expect(demo.locator('[data-button-changes]')).toHaveText('1');
    await demo.getByLabel('取消切换事件', { exact: true }).uncheck();
    await icon.click();
    await expect(icon).toHaveAttribute('aria-pressed', 'true');
    await expect(icon).toHaveAccessibleName('图标加粗');
    const link = demo.locator('[data-action="link"]');
    await link.focus();
    await page.keyboard.press('Space');
    await expect(demo.locator('[data-button-links]')).toHaveText('0');
    await expect(link.locator('[aria-hidden="true"] > span')).toHaveCount(0);
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(demo.locator('[data-button-links]')).toHaveText('1');
    await demo.getByLabel('按钮禁用', { exact: true }).check();
    for (const action of ['save', 'icon', 'toggle', 'icon-toggle', 'link'])
      await expect(demo.locator(`[data-action="${action}"]`)).toHaveCSS('cursor', 'not-allowed');
    await expect(link).not.toHaveAttribute('href');
    await expect(link).toHaveAttribute('tabindex', '-1');
    await link.dispatchEvent('click');
    await link.dispatchEvent('auxclick', { button: 1 });
    await expect(demo.locator('[data-button-links]')).toHaveText('1');
    await demo.getByLabel('按钮自定义色', { exact: true }).check();
    await demo.getByLabel('按钮禁用', { exact: true }).uncheck();
    await expect(link).toHaveCSS('cursor', 'pointer');
    await expect(link).toHaveAttribute('href', '#button-heading');
    const popupEvent = page.waitForEvent('popup');
    await demo.locator('[data-action="native-link"]').click();
    const popup = await popupEvent;
    await expect(popup).toHaveURL(/#button-heading$/);
    await popup.close();
    expect(errors).toEqual([]);
  });

  test(`${mode} ButtonGroup 相连圆角、接缝、隐藏、重排与逻辑方向`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await open(page, mode);
    const demo = page.locator('#button-demo');
    const flex = demo.locator('[data-button-group]');
    await expect(flex).toHaveAttribute('role', 'group');
    await expect(flex).toHaveAccessibleName('相连操作');
    const first = flex.locator('[data-item="第一项"]');
    const middle = flex.locator('[data-item="中间项"]');
    const last = flex.locator('[data-item="最后项"]');
    await expect(first).toHaveCSS('border-start-start-radius', '8px');
    await expect(first).toHaveCSS('border-start-end-radius', '0px');
    await expect(middle).toHaveCSS('border-radius', '0px');
    await expect(last).toHaveCSS('border-end-end-radius', '8px');
    await expect(middle).toHaveCSS('margin-inline-start', '-1px');
    const a = (await first.boundingBox())!,
      b = (await middle.boundingBox())!;
    expect(a.x + a.width - b.x).toBeCloseTo(1, 1);
    await first.focus();
    await page.keyboard.press('Tab');
    await expect(middle).toBeFocused();
    await expect(middle).toHaveCSS('z-index', '3');
    await middle.hover();
    await expect(middle).toHaveCSS('z-index', '3');
    await expect(flex).toHaveCSS('overflow', 'visible');
    await demo.getByLabel('隐藏首项', { exact: true }).check();
    await expect(first).toBeHidden();
    await expect(middle).toHaveCSS('border-start-start-radius', '8px');
    await expect(middle).toHaveCSS('margin-inline-start', '0px');
    await demo.getByLabel('隐藏首项', { exact: true }).uncheck();
    await demo.getByRole('button', { name: '反转连接顺序', exact: true }).click();
    await expect(last).toHaveCSS('border-start-start-radius', '8px');
    await expect(first).toHaveCSS('border-start-end-radius', '8px');
    await demo.getByLabel('连接 RTL', { exact: true }).check();
    await expect(last).toHaveCSS('border-top-right-radius', '8px');
    await expect(last).toHaveCSS('border-top-left-radius', '0px');
    await demo.getByLabel('纵向连接', { exact: true }).check();
    await expect(last).toHaveCSS('border-start-end-radius', '8px');
    await expect(last).toHaveCSS('border-end-end-radius', '0px');
    await expect(middle).toHaveCSS('margin-block-start', '-1px');
    await expect(middle).toHaveCSS('margin-inline-start', '0px');
    await demo.getByLabel('纵向书写', { exact: true }).check();
    await expect(last).toHaveCSS('border-start-end-radius', '8px');
    await demo.getByRole('button', { name: '切换单项', exact: true }).click();
    await expect(flex.locator('[data-ui-action]')).toHaveCount(1);
    await expect(flex.locator('[data-ui-action]')).toHaveCSS('border-radius', '8px');
    await expect(flex.locator('[data-ui-action]')).toHaveCSS('margin-block-start', '0px');
    const mixed = demo.locator('[data-button-group-mixed] > [data-ui-action]');
    await expect(mixed).toHaveCount(4);
    await expect(mixed.nth(1)).toHaveCSS('border-radius', '0px');
    await expect(mixed.nth(2)).toHaveCSS('border-radius', '0px');
    const equal = demo.locator('[data-equal] > button');
    const selected = mixed.nth(2);
    await selected.click();
    await expect(selected).toHaveAttribute('aria-pressed', 'true');
    await selected.evaluate((node: HTMLElement) => node.blur());
    await selected.hover();
    await expect(selected).toHaveCSS('z-index', '2');
    expect((await equal.nth(0).boundingBox())!.width).toBeCloseTo(
      (await equal.nth(1).boundingBox())!.width,
      1,
    );
    await demo.getByLabel('按钮禁用', { exact: true }).check();
    for (let i = 0; i < 4; i++) await expect(mixed.nth(i)).toHaveCSS('cursor', 'not-allowed');
    await mixed.first().hover();
    await expect(mixed.first()).toHaveCSS('z-index', 'auto');
    await mixed.last().hover();
    await expect(mixed.last()).toHaveCSS('z-index', 'auto');
    expect(errors).toEqual([]);
  });
}
