import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 两层泛型字段支持替换、空值、最新回调和单类样式组合`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    const section = page.getByRole('region', { name: '多层字段组件' });
    const name = section.locator('[data-layer-field=name]');
    const amount = section.getByLabel('两层数字');
    await expect(name).toHaveValue('第一份');
    await expect(name).toHaveAttribute('title', '初始提示');
    await expect(name).toHaveAttribute('class', /^z-[a-z0-9]{14}$/);
    await expect(name).toHaveCSS('width', '160px');
    const node = await name.elementHandle();
    const id = await name.getAttribute('id');
    await name.fill('旧表单编辑');
    await expect(section.locator('[data-layer-callback]')).toHaveText('A:旧表单编辑');
    await section.getByRole('button', { name: '替换多层表单' }).click();
    await expect(name).toHaveValue('第二份');
    await expect(name).toHaveAttribute('aria-label', '新的姓名');
    await expect(name).not.toHaveAttribute('title');
    await expect(name).toHaveCSS('width', '240px');
    expect(await name.getAttribute('id')).toBe(id);
    expect(await node!.evaluate((element) => element.isConnected)).toBe(true);
    await expect(section.locator('[data-layer-initial=name]')).toHaveText('第一份');
    await expect(section.locator('[data-layer-edits=name]')).toHaveText('1');
    await name.fill('新表单编辑');
    await expect(section.locator('[data-layer-model]')).toHaveText('新表单编辑/2');
    await expect(section.locator('[data-layer-original]')).toHaveText('旧表单编辑');
    await expect(section.locator('[data-layer-callback]')).toHaveText('B:新表单编辑');
    await name.fill('');
    await amount.fill('');
    await expect(section.locator('[data-layer-model]')).toHaveText('空/空');
    await expect(section.locator('[data-layer-callback]')).toHaveText('B:空');
    await amount.fill('12');
    await expect(section.locator('[data-layer-model]')).toHaveText('空/12');
    await section.getByRole('button', { name: '切换姓名字段' }).click();
    await expect(name).toHaveCount(0);
    await expect(section.locator('[data-layer-disposed]')).toHaveText('1');
    await section.getByRole('button', { name: '切换姓名字段' }).click();
    await expect(name).toHaveValue('');
    await expect(section.locator('[data-layer-edits=name]')).toHaveText('0');
    await node!.dispose();
    expect(errors).toEqual([]);
  });
}
