import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} property 在 DOM 就绪后生效，并在 effect 前可读`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    const scroller = page.locator('[data-scroll-probe]');
    const media = page.locator('[data-media-probe]');
    expect(await scroller.evaluate((node) => node.scrollTop)).toBe(0);
    await page.locator('[data-property-toggle]').click();
    await expect(page.locator('[data-observed-property]')).toHaveText('35/35');
    await expect(page.locator('[data-property-link]')).toHaveAttribute('href', '/property-target');
    expect(
      await media.evaluate((node: HTMLVideoElement) => [
        node.volume,
        node.srcObject instanceof MediaStream,
      ]),
    ).toEqual([0.25, true]);
    await expect(scroller).not.toHaveAttribute('scrolltop');
    await expect(scroller).not.toHaveAttribute('prop:scrolltop');
    await page.locator('[data-property-update]').click();
    await expect(page.locator('[data-observed-property]')).toHaveText('90/90');
    await page.locator('[data-property-toggle]').click();
    expect(await scroller.evaluate((node) => node.scrollTop)).toBe(0);
    await expect(page.locator('[data-property-link]')).not.toHaveAttribute('href');
    expect(
      await page.locator('[data-property-link]').evaluate((node: HTMLAnchorElement) => node.href),
    ).toBe('');
    expect(await media.evaluate((node: HTMLVideoElement) => [node.volume, node.srcObject])).toEqual(
      [1, null],
    );
    expect(errors).toEqual([]);
  });

  test(`${mode} 自定义对象、精确事件名、捕获与卸载恢复`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    const widget = page.locator('[data-property-widget]');
    await expect(widget.locator('span')).toHaveText('默认对象');
    expect(await widget.evaluate((node) => Object.hasOwn(node, 'format'))).toBe(false);
    await page.locator('[data-property-toggle]').click();
    await expect(widget.locator('span')).toHaveText('格式化:应用对象');
    expect(await widget.evaluate((node) => typeof Reflect.get(node, 'data'))).toBe('object');
    await expect(widget).not.toHaveAttribute('prop:data');
    await widget.getByRole('button', { name: '发送对象事件' }).click();
    await expect(page.locator('[data-property-event]')).toHaveText('捕获:应用对象;目标:应用对象;');
    await widget.evaluate((node) =>
      node.dispatchEvent(
        new CustomEvent('valuechanged', { detail: { label: '错误大小写' }, bubbles: true }),
      ),
    );
    await expect(page.locator('[data-property-event]')).toHaveText('捕获:应用对象;目标:应用对象;');
    await page.locator('[data-property-update]').click();
    await expect(widget.locator('span')).toHaveText('格式化:新对象');
    await page.locator('[data-property-toggle]').click();
    await expect(widget.locator('span')).toHaveText('默认对象');
    expect(await widget.evaluate((node) => Object.hasOwn(node, 'format'))).toBe(false);
    await page.locator('[data-property-toggle]').click();
    await expect(widget.locator('span')).toHaveText('格式化:新对象');
    const retained = await widget.elementHandle();
    await page.locator('[data-unmount]').click();
    expect(
      await retained!.evaluate((node) => [
        Reflect.get(node, 'data').label,
        Object.hasOwn(node, 'format'),
      ]),
    ).toEqual(['默认对象', false]);
    expect(errors).toEqual([]);
  });

  test(`${mode} 未注册与只读 property 错误可以局部修正恢复`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('[data-register-late]')).toContainText('已注册');
    await expect(page.locator('[data-property-readonly]')).toContainText('不可写');
    await page.locator('[data-register-late]').click();
    await expect(page.locator('[data-late-widget] span')).toHaveText('延后注册成功');
    await page.locator('[data-property-readonly]').click();
    await expect(page.locator('[data-readonly-recovered]')).toHaveText('只读检查');
    expect(errors).toEqual([]);
  });

  test(`${mode} form/list/for 使用内容属性关联外部控件`, async ({ page }) => {
    await page.goto(`/?render=${mode}`);
    const input = page.getByRole('combobox', { name: '外部表单字段' });
    expect(
      await input.evaluate((node: HTMLInputElement) => [node.form?.id, node.list?.id]),
    ).toEqual(['property-form', 'property-suggestions']);
    await input.fill('外部字段提交');
    await page.locator('[data-property-submit]').click();
    await expect(page.locator('[data-property-form]')).toHaveText('外部字段提交');
    expect(
      await page
        .locator('[data-property-form]')
        .evaluate((node: HTMLOutputElement) => [...node.htmlFor]),
    ).toEqual(['property-field']);
  });
}

test('SSR 省略 DOM property 并保留可读的原生属性', async ({ request }) => {
  const response = await request.get('/?render=ssr');
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).not.toContain('prop:');
  expect(html).not.toContain('scrolltop=');
  expect(html).not.toContain('srcobject=');
  expect(html).toContain('list="property-suggestions"');
});
