import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 主题关键字与全局值、用户 var 切换时清理自动变量`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    const node = page.locator('[data-css-keyword]');
    const name = await node.getAttribute('class');
    const variables = () =>
      node.evaluate((element: HTMLElement) =>
        Array.from(element.style).filter((key) => key.startsWith('--zj-')),
      );
    await expect(node).toHaveCSS('color', 'rgb(36, 95, 197)');
    expect(await variables()).toHaveLength(1);
    for (const color of [
      'rgb(20, 30, 40)',
      'rgb(0, 0, 0)',
      'rgb(20, 30, 40)',
      'rgb(20, 30, 40)',
      'rgb(20, 30, 40)',
      'rgb(18, 52, 86)',
      'rgb(255, 0, 0)',
    ]) {
      await page.locator('[data-css-keyword-next]').click();
      await expect(node).toHaveCSS('color', color);
      expect(await variables()).toHaveLength(0);
      expect(
        await node.evaluate((element: HTMLElement) => element.style.getPropertyValue('--user')),
      ).toBe('kept');
      if (color === 'rgb(18, 52, 86)') {
        const variableClass = await node.getAttribute('class');
        await page.locator('[data-css-keyword-external]').click();
        await expect(node).toHaveCSS('color', 'rgb(101, 67, 33)');
        expect(await node.getAttribute('class')).toBe(variableClass);
      }
    }
    await page.locator('[data-css-keyword-next]').click();
    await expect(node).toHaveCSS('color', 'rgb(255, 255, 255)');
    expect(await node.getAttribute('class')).toBe(name);
    expect(await variables()).toHaveLength(1);
    expect(errors).toEqual([]);
  });

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
    const expression = page.locator('[data-css-expression=first]');
    await expect(expression).toHaveCSS('width', '121px');
    await expect(expression).toHaveCSS('height', '24px');
    const expressionClass = await expression.getAttribute('class');
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
    await expect(expression).toHaveCSS('width', '161px');
    expect(await expression.getAttribute('class')).toBe(expressionClass);
    await expect(second).toHaveCSS('width', '180px');
    expect(await first.getAttribute('class')).toBe(name);
    expect(await ruleCount()).toBe(rules);
    expect(await first.evaluate((node: HTMLElement) => node.style.getPropertyValue('--user'))).toBe(
      'kept',
    );
    await page.locator('[data-css-toggle=first]').click();
    await expect(first).toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect(expression).toHaveCSS('height', '48px');
    expect(await first.getAttribute('class')).toBe(name);
    expect(await ruleCount()).toBe(rules);
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
    const outer = page.locator('[data-css-theme=outer]');
    const themeClass = await outer.getAttribute('class');
    expect(await outer.getAttribute('style')).toMatch(/--zj-[a-z0-9-]+:blue/);
    await page.locator('[data-css-theme-toggle]').click();
    await expect(page.locator('[data-css-theme=outer]')).toHaveCSS('color', 'rgb(0, 128, 0)');
    await expect(page.locator('[data-css-theme=portal]')).toHaveCSS('color', 'rgb(0, 128, 0)');
    await expect(page.locator('[data-css-theme=local]')).toHaveCSS('color', 'rgb(128, 0, 128)');
    expect(await outer.getAttribute('class')).toBe(themeClass);
    expect(await outer.getAttribute('style')).toMatch(/--zj-[a-z0-9-]+:green/);
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
