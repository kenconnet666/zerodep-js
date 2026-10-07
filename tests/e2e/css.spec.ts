import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 按需组件加载期间切换主题，完成后继承最新逻辑作用域`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    let requested = false;
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    await page.route('**/LazyThemeProbe-*.js', async (route) => {
      requested = true;
      await gate;
      await route.continue();
    });
    try {
      await page.goto(`/?render=${mode}`);
      await page.locator('[data-css-lazy-toggle]').click();
      await expect.poll(() => requested).toBe(true);
      await page.locator('[data-css-theme-toggle]').click();
      await expect(page.locator('[data-css-theme=lazy]')).toHaveCount(0);
      release();
      await expect(page.locator('[data-css-theme=lazy]')).toHaveCSS('color', 'rgb(0, 128, 0)');
      await expect(page.locator('[data-css-theme=lazy-portal]')).toHaveCSS(
        'color',
        'rgb(0, 128, 0)',
      );
      await expect(page.locator('[data-css-theme=lazy-local]')).toHaveCSS(
        'color',
        'rgb(128, 0, 128)',
      );
      await page.locator('[data-css-lazy-toggle]').click();
      await expect(page.locator('[data-css-theme^=lazy]')).toHaveCount(0);
      await page.locator('[data-css-lazy-toggle]').click();
      await expect(page.locator('[data-css-theme=lazy]')).toHaveCSS('color', 'rgb(0, 128, 0)');
      await page.locator('[data-unmount]').click();
      await expect(page.locator('[data-css-theme^=lazy]')).toHaveCount(0);
      expect(errors).toEqual([]);
    } finally {
      release();
    }
  });

  test(`${mode} 原生 CSS 追踪、变量、多实例与销毁`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    const first = page.locator('[data-css-box=first]');
    const second = page.locator('[data-css-box=second]');
    await expect(first).toHaveCSS('width', '120px');
    await expect(first).toHaveCSS('color', 'rgb(0, 0, 255)');
    await expect(second).toHaveCSS('width', '180px');
    const name = await first.getAttribute('class');
    const ruleCount = () =>
      page
        .locator('style[data-zerodep-css]')
        .evaluate((node: HTMLStyleElement) => node.sheet!.cssRules.length);
    const rules = await ruleCount();
    for (let index = 0; index < 4; index++) await page.locator('[data-css-grow=first]').click();
    await expect(first).toHaveCSS('width', '160px');
    await expect(page.locator('[data-css-inline=first]')).toHaveCSS('width', '160px');
    await expect(page.locator('[data-css-spread=first]')).toHaveCSS('width', '160px');
    await expect(second).toHaveCSS('width', '180px');
    expect(await first.getAttribute('class')).toBe(name);
    expect(await ruleCount()).toBe(rules);
    expect(await first.evaluate((node: HTMLElement) => node.style.getPropertyValue('--user'))).toBe(
      'kept',
    );
    await page.locator('[data-css-toggle=first]').click();
    await expect(first).toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect(second).toHaveCSS('color', 'rgb(0, 0, 255)');
    await expect(page.locator('[data-css-portal]')).toHaveCSS('position', 'fixed');
    await page.locator('[data-css-visible]').click();
    await expect(first).toHaveCount(0);
    await page.locator('[data-css-visible]').click();
    await expect(first).toHaveCSS('width', '120px');
    await page.locator('[data-unmount]').click();
    await expect(page.locator('[data-css-portal]')).toHaveCount(0);
    expect(errors).toEqual([]);
  });

  test(`${mode} CSS 主题按逻辑作用域传递，局部覆盖和 Portal 不串值`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('[data-css-theme=outer]')).toHaveCSS('color', 'rgb(0, 0, 255)');
    await expect(page.locator('[data-css-theme=portal]')).toHaveCSS('color', 'rgb(0, 0, 255)');
    await expect(page.locator('[data-css-theme=local]')).toHaveCSS('color', 'rgb(128, 0, 128)');
    await page.locator('[data-css-theme-toggle]').click();
    await expect(page.locator('[data-css-theme=outer]')).toHaveCSS('color', 'rgb(0, 128, 0)');
    await expect(page.locator('[data-css-theme=portal]')).toHaveCSS('color', 'rgb(0, 128, 0)');
    await expect(page.locator('[data-css-theme=local]')).toHaveCSS('color', 'rgb(128, 0, 128)');
    await page.locator('[data-unmount]').click();
    await expect(page.locator('[data-css-theme=portal]')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('SSR 首屏带样式、内联变量与安全清单', async ({ request, browser }) => {
  const response = await request.get('/?render=ssr');
  const html = await response.text();
  expect(html).toContain('style data-zerodep-css');
  expect(html).toContain('type="application/json" data-zerodep-css');
  expect(html).toMatch(/--zj-[a-z0-9-]+:120px/);
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('/?render=ssr');
    await expect(page.locator('[data-css-box=first]')).toHaveCSS('width', '120px');
  } finally {
    await context.close();
  }
});
