import { expect, test, type Page } from '@playwright/test';

async function holdClient(page: Page): Promise<() => void> {
  let release!: () => void;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/assets/*.js', async (route) => {
    await pending;
    await route.continue();
  });
  return release;
}

test('SSR 使用真实组件，接管复用元素、文本、输入与列表节点', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const release = await holdClient(page);
  try {
    await page.goto('/?render=ssr', { waitUntil: 'commit' });
    await expect(page.locator('[data-count]')).toHaveText('0');
    await expect(page.locator('[data-server-fallback]')).toBeVisible();
    const main = await page.locator('main').elementHandle();
    const count = await page.locator('[data-count]').elementHandle();
    const text = await count!.evaluateHandle((node) =>
      [...node.childNodes].find((child) => child.nodeType === 3)!,
    );
    const input = await page.getByRole('textbox', { name: '草稿 2', exact: true }).elementHandle();
    release();
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    await expect(page.locator('[data-client-status]')).toHaveText('客户端已接入');
    expect(await main!.evaluate((node) => node === document.querySelector('main'))).toBe(true);
    expect(await count!.evaluate((node) => node === document.querySelector('[data-count]'))).toBe(
      true,
    );
    expect(
      await input!.evaluate((node) => node === document.querySelector('[aria-label="草稿 2"]')),
    ).toBe(true);
    await expect(page.locator('[data-server-fallback]')).toHaveCount(0);
    await expect(page.locator('[data-client-recovered]')).toBeVisible();
    await page.locator('[data-increment]').click();
    await expect(page.locator('[data-count]')).toHaveText('1');
    expect(
      await text.evaluate(
        (node) =>
          node ===
          [...document.querySelector('[data-count]')!.childNodes].find(
            (child) => child.nodeType === 3,
          ),
      ),
    ).toBe(true);
    await page.locator('[data-reverse]').click();
    await expect(page.locator('[data-row]').first()).toHaveAttribute('data-row', '3');
    expect(
      await input!.evaluate((node) => node === document.querySelector('[aria-label="草稿 2"]')),
    ).toBe(true);
    await page.locator('[data-unmount]').click();
    await expect(page.locator('#app')).toBeEmpty();
    expect(errors).toEqual([]);
  } finally {
    release();
  }
});

test('hydration 前的输入、焦点和选区保留，并通过原生回调同步状态', async ({ page }) => {
  const release = await holdClient(page);
  try {
    await page.goto('/?render=ssr', { waitUntil: 'commit' });
    const input = page.getByRole('textbox', { name: '名字', exact: true });
    await input.fill('预先编辑');
    await input.evaluate((node: HTMLInputElement) => node.setSelectionRange(1, 3));
    release();
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    await expect(input).toHaveValue('预先编辑');
    await expect(input).toBeFocused();
    expect(
      await input.evaluate((node: HTMLInputElement) => [node.selectionStart, node.selectionEnd]),
    ).toEqual([1, 3]);
    await expect(page.locator('[data-greeting]')).toHaveText('你好，预先编辑');
  } finally {
    release();
  }
});

for (const policy of ['throw', 'replace']) {
  test(`不匹配策略 ${policy} 给出诊断并执行明确行为`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const release = await holdClient(page);
    try {
      await page.goto(`/?render=ssr&recover=${policy}`, { waitUntil: 'commit' });
      await expect(page.locator('[data-row="2"] input')).toBeVisible();
      const main = await page.locator('main').elementHandle();
      // 在错误边界内制造结构不一致，不能被吞成普通组件错误。
      await page
        .locator('[data-row="2"] input')
        .evaluate((node) => node.setAttribute('value', '错误初值'));
      const before = await page.locator('#app').innerHTML();
      release();
      await expect(page.locator('#app')).toHaveAttribute(
        'data-hydration-error',
        'ZJ_HYDRATION_MISMATCH',
      );
      if (policy === 'throw') {
        await expect.poll(() => errors.some((message) => message.includes('Hydration'))).toBe(true);
        expect(await page.locator('#app').innerHTML()).toBe(before);
        expect(await main!.evaluate((node) => node === document.querySelector('main'))).toBe(true);
      } else {
        await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
        expect(await main!.evaluate((node) => node.isConnected)).toBe(false);
        await page.locator('[data-increment]').click();
        await expect(page.locator('[data-count]')).toHaveText('1');
        expect(errors).toEqual([]);
      }
    } finally {
      release();
    }
  });
}

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 正确处理文本专用元素、选项和安全 JSON`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    await expect(page.getByRole('textbox', { name: '多行内容' })).toHaveValue('\n第一行 <>&');
    expect(await page.locator('[data-leading-newline]').textContent()).toBe('\n首行');
    await expect(page.getByRole('combobox', { name: '单选内容' })).toHaveValue('b');
    await expect(page.getByRole('listbox', { name: '多选内容' })).toHaveValues(['a', 'c']);
    await page.getByRole('combobox', { name: '单选内容' }).selectOption('a');
    await page.getByRole('listbox', { name: '多选内容' }).selectOption(['b']);
    await expect(page.locator('[data-choice]')).toHaveText('a/b');
    expect(
      await page.locator('[data-safe-json]').evaluate((node) => JSON.parse(node.textContent!)),
    ).toEqual({ text: '</script><img data-xss-probe src=x>' });
    await expect(page.locator('[data-xss-probe]')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}
