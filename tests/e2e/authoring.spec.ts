import { expect, test } from '@playwright/test';

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 原生和组件双向绑定沿用受控输入流程`, async ({ page }) => {
    await page.goto(`/?render=${mode}`);
    const section = page.getByRole('region', { name: '绑定、快照和按需加载' });
    await section.getByLabel('双向文本', { exact: true }).fill('输入内容');
    await expect(section.locator('[data-bind-text]')).toHaveText('输入内容');
    await expect(section.locator('[data-bind-after]')).toHaveText('输入内容');
    await section.getByLabel('双向勾选').check();
    await expect(section.locator('[data-bind-checked]')).toHaveText('true');
    await section.getByLabel('双向数字').fill('42');
    await expect(section.locator('[data-bind-number]')).toHaveText('42');
    await section.getByLabel('双向数字').fill('');
    await expect(section.locator('[data-bind-number]')).toHaveText('空');
    await section.getByLabel('双向多选').selectOption(['a', 'c']);
    await expect(section.locator('[data-bind-selected]')).toHaveText('a,c');
    await section.getByLabel('组件双向输入').fill('子组件输入');
    await expect(section.locator('[data-bind-component]')).toHaveText('子组件输入');
    await section.getByRole('button', { name: '从代码修改输入' }).click();
    await expect(section.getByLabel('双向文本', { exact: true })).toHaveValue('代码修改');
    await expect(section.getByLabel('双向数字')).toHaveValue('12');
    await expect(section.getByLabel('双向多选')).toHaveValues(['b']);
    await expect(section.getByLabel('组件双向输入')).toHaveValue('代码修改组件');
  });
  test(`${mode} 编辑历史保留备份并能切换保存点`, async ({ page }) => {
    await page.goto(`/?render=${mode}`);
    const input = page.getByLabel('历史姓名');
    await input.fill('第一次编辑');
    await page.getByRole('button', { name: '记录这次编辑', exact: true }).click();
    await input.fill('第二次编辑');
    await page.getByRole('button', { name: '记录这次编辑', exact: true }).click();
    await expect(page.locator('[data-history-snapshot]')).toHaveText('保存的姓名');
    await page.getByRole('button', { name: '撤销编辑', exact: true }).click();
    await expect(input).toHaveValue('第一次编辑');
    await page.getByRole('button', { name: '重做编辑', exact: true }).click();
    await expect(input).toHaveValue('第二次编辑');
    await page.getByRole('button', { name: '把当前内容设为保存点', exact: true }).click();
    await input.fill('尚未保存');
    await page.getByRole('button', { name: '恢复保存点', exact: true }).click();
    await expect(input).toHaveValue('第二次编辑');
  });
  test(`${mode} 按需组件失败可重试，关闭后重建局部状态`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}&lazy-fail=1`);
    await expect(page.locator('[data-lazy-details]')).toHaveCount(0);
    await page.getByRole('button', { name: '打开按需组件', exact: true }).click();
    await page.getByRole('button', { name: '重试下载组件', exact: true }).click();
    await expect(page.locator('[data-lazy-details]')).toBeVisible();
    await page.getByRole('button', { name: '按需组件计数：0', exact: true }).click();
    await page.getByRole('button', { name: '关闭按需组件', exact: true }).click();
    await expect(page.locator('[data-lazy-details]')).toHaveCount(0);
    await page.getByRole('button', { name: '打开按需组件', exact: true }).click();
    await expect(page.getByRole('button', { name: '按需组件计数：0', exact: true })).toBeVisible();
    await page.getByLabel('历史姓名').fill('实时属性');
    await expect(page.locator('[data-lazy-name]')).toHaveText('实时属性');
    expect(errors).toEqual([]);
  });
}

test('接管前的已有文本通过 bind 写回状态', async ({ page }) => {
  await page.route('**/assets/*.js', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    await route.continue();
  });
  await page.goto('/?render=ssr', { waitUntil: 'commit' });
  await page.getByLabel('双向文本', { exact: true }).fill('接管前已输入');
  await expect(page.locator('[data-bind-text]')).toHaveText('接管前已输入');
});
