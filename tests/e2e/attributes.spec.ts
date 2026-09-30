import { expect, test } from '@playwright/test';

const HTML = 'http://www.w3.org/1999/xhtml';
const SVG = 'http://www.w3.org/2000/svg';
const MATH = 'http://www.w3.org/1998/Math/MathML';
for (const mode of ['csr', 'ssr']) {
  test(`${mode} 枚举属性、布尔属性和别名覆盖在更新后仍一致`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    const alias = page.locator('[data-alias]');
    await expect(alias).toHaveAttribute('class', '较晚属性');
    await expect(alias).toHaveAttribute('aria-label', '较晚标签');
    await page.locator('[data-change-first]').click();
    await expect(alias).toHaveAttribute('class', '较晚属性');
    await expect(alias).toHaveAttribute('aria-label', '较晚标签');
    const flags = page.locator('[data-native-flags]');
    await expect(flags).toHaveAttribute('hidden', 'until-found');
    await expect(flags).toHaveAttribute('translate', 'no');
    await expect(flags).toHaveAttribute('aria-hidden', 'false');
    await expect(flags).toHaveAttribute('data-enabled', 'false');
    await expect(flags).toHaveAttribute('draggable', 'false');
    await expect(page.locator('[data-native-disabled]')).toBeDisabled();
    await expect(page.getByRole('textbox', { name: '保留首次默认值' })).toHaveValue('默认文本');
    await expect(page.getByRole('checkbox', { name: '保留首次勾选' })).toBeChecked();
    await page.locator('[data-native-toggle]').click();
    await expect(flags).not.toHaveAttribute('hidden');
    await expect(flags).toHaveAttribute('translate', 'yes');
    await expect(page.locator('[data-native-disabled]')).toBeEnabled();
    await expect(page.locator('[data-presentation]')).toHaveAttribute('stroke-width', '3');
    await page.locator('[data-clear-alias]').click();
    await expect(alias).not.toHaveAttribute('class');
    await expect(alias).not.toHaveAttribute('aria-label');
    await page.locator('[data-remove-alias]').click();
    await expect(alias).toHaveAttribute('class', '前项已更新');
    await expect(alias).toHaveAttribute('aria-label', '前项已更新');
    await expect(page.locator('[data-presentation]')).toHaveAttribute('stroke-width', '4');
    expect(errors).toEqual([]);
  });

  test(`${mode} SVG、MathML 集成点及动态子树保留正确命名空间`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    for (const [selector, namespace] of [
      ['data-native-svg', SVG],
      ['data-foreign-html', HTML],
      ['data-title-html', HTML],
      ['data-desc-html', HTML],
      ['data-native-math', MATH],
      ['data-mtext-html', HTML],
      ['data-mtext-svg', SVG],
      ['data-annotation-html', HTML],
      ['data-annotation-math', MATH],
      ['data-annotation-svg', SVG],
    ])
      expect(await page.locator(`[${selector}]`).evaluate((node) => node.namespaceURI)).toBe(
        namespace,
      );
    await expect(page.locator('[data-native-math]')).toHaveAttribute('displaystyle', 'false');
    await expect(page.locator('[data-native-math] mo')).toHaveAttribute('stretchy', 'false');
    await page.locator('[data-native-toggle]').click();
    await expect(page.locator('[data-mtext-html]')).toHaveText('关闭');
    expect(await page.locator('[data-mtext-html]').evaluate((node) => node.namespaceURI)).toBe(
      HTML,
    );
    expect(errors).toEqual([]);
  });

  test(`${mode} XML 与 XLink 属性按命名空间写入和删除`, async ({ page }) => {
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    const svg = page.locator('[data-native-svg]');
    const use = page.locator('[data-native-use]');
    expect(
      await svg.evaluate((node) => [
        node.getAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns'),
        node.getAttributeNS('http://www.w3.org/2000/xmlns/', 'xlink'),
        node.getAttributeNS('http://www.w3.org/XML/1998/namespace', 'lang'),
      ]),
    ).toEqual([SVG, 'http://www.w3.org/1999/xlink', 'zh-CN']);
    expect(
      await use.evaluate((node) => node.getAttributeNS('http://www.w3.org/1999/xlink', 'href')),
    ).toBe('#attribute-shape');
    await expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
    await expect(svg).toHaveAttribute('focusable', 'false');
    await expect(svg).toHaveAttribute('data-statuscode', '有效');
    await expect(svg.locator('stop')).toHaveAttribute('stop-color', 'red');
    await page.locator('[data-native-toggle]').click();
    expect(
      await svg.evaluate((node) =>
        node.getAttributeNS('http://www.w3.org/XML/1998/namespace', 'lang'),
      ),
    ).toBeNull();
    expect(
      await use.evaluate((node) => node.getAttributeNS('http://www.w3.org/1999/xlink', 'href')),
    ).toBeNull();
    await expect(page.locator('[data-presentation]')).not.toHaveAttribute('fill-opacity');
    await expect(page.locator('[data-presentation]')).not.toHaveAttribute('stroke-dasharray');
  });
}
