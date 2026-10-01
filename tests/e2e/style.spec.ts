import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 样式声明顺序、priority 与整段替换保持一致`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    const target = page.locator('[data-style-target]');
    const original = await target.elementHandle();
    const inspect = () =>
      target.evaluate((element: HTMLElement) => ({
        margin: element.style.margin,
        left: element.style.marginLeft,
        color: element.style.color,
        priority: element.style.getPropertyPriority('color'),
        display: element.style.display,
      }));
    expect(await inspect()).toEqual({
      margin: '4px 4px 4px 9px',
      left: '9px',
      color: 'red',
      priority: 'important',
      display: 'block',
    });
    expect(
      await target.evaluate((element: HTMLElement) => [
        element.style.cssFloat,
        element.style.getPropertyValue('-webkit-transform'),
        element.style.getPropertyValue('--payload'),
        element.style.getPropertyValue('--unicode'),
        element.style.getPropertyValue('--escaped+'),
      ]),
    ).toEqual(['left', 'translateX(1px)', '"a;b"', '"🚀��-�"', 'escaped']);
    await page.locator('[data-style-step]').click();
    expect(await inspect()).toEqual({
      margin: '6px',
      left: '6px',
      color: 'blue',
      priority: '',
      display: '',
    });
    await page.locator('[data-style-step]').click();
    expect(await inspect()).toEqual({
      margin: '2px',
      left: '2px',
      color: 'green',
      priority: '',
      display: '',
    });
    await page.locator('[data-style-step]').click();
    expect(await inspect()).toEqual({
      margin: '3px 3px 3px 8px',
      left: '8px',
      color: 'purple',
      priority: 'important',
      display: '',
    });
    await page.locator('[data-style-step]').click();
    await expect(target).not.toHaveAttribute('style');
    await page.locator('[data-style-step]').click();
    expect((await inspect()).left).toBe('9px');
    expect(
      await original!.evaluate(
        (element) => element === document.querySelector('[data-style-target]'),
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });

  test(`${mode} 深层样式、命名空间和 Unicode 保持可接管`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    const target = page.locator('[data-style-deep]');
    await expect(target).toHaveCSS('padding-top', '2px');
    await page.locator('[data-style-mutate]').click();
    expect(
      await target.evaluate((element: HTMLElement) => [element.style.color, element.style.padding]),
    ).toEqual(['teal', '']);
    for (const selector of ['[data-style-svg]', '[data-style-math]']) {
      expect(
        await page.locator(selector).evaluate((element) => {
          const style = (element as SVGElement | MathMLElement).style;
          return [
            style.getPropertyPriority(element.localName === 'rect' ? 'fill' : 'color'),
            style.length,
          ];
        }),
      ).toEqual(['important', 1]);
    }
    await expect(page.locator('[data-style-text]')).toHaveText('🚀��-�');
    await expect(page.locator('[data-style-text]')).toHaveAttribute('title', '🚀��-�');
    expect(errors).toEqual([]);
  });

  test(`${mode} 对象声明边界报错后可局部恢复`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await page.locator('[data-style-break]').click();
    await expect(page.locator('[data-style-recover]')).toContainText('一个声明值');
    await page.locator('[data-style-recover]').click();
    await expect(page.locator('[data-style-valid]')).toHaveCSS('color', 'rgb(255, 0, 0)');
    expect(errors).toEqual([]);
  });
}

test('SSR 无脚本时即具有相同的声明顺序与重要样式', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(`${baseURL}/?render=ssr`);
    await expect(page.locator('[data-style-target]')).toHaveCSS('margin-left', '9px');
    await expect(page.locator('[data-style-target]')).toHaveCSS('color', 'rgb(255, 0, 0)');
    await expect(page.locator('[data-style-text]')).toHaveText('🚀��-�');
  } finally {
    await context.close();
  }
});
