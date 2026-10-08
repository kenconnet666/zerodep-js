import { expect, test } from '@playwright/test';

const key = 'zerodep.example.preferences';
const saved = (name: string) => JSON.stringify({ name, compact: true });

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 恢复、同页同步、刷新与明确删除`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('[data-storage-status]')).toHaveText('ready');
    await page.evaluate(({ key, value }) => localStorage.setItem(key, value), {
      key,
      value: saved('已保存'),
    });
    await page.reload();
    const input = page.getByRole('textbox', { name: '保存的名字' });
    await expect(input).toHaveValue('已保存');
    await expect(page.getByRole('checkbox', { name: '紧凑偏好' })).toBeChecked();
    await input.fill('新名字');
    await page.locator('[data-storage-flush]').click();
    await expect(page.locator('[data-storage-mirror]')).toHaveText('新名字/true');
    await page.reload();
    await expect(input).toHaveValue('新名字');
    await page.locator('[data-storage-remove]').click();
    await expect(input).toHaveValue('默认');
    await expect(page.locator('[data-storage-mirror]')).toHaveText('默认/false');
    expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBeNull();
    expect(errors).toEqual([]);
  });
}

test('真实跨标签同步，两个页面都可更新共享的保存内容', async ({ page, context }) => {
  await page.goto('/?render=ssr');
  const other = await context.newPage();
  await other.goto('/?render=csr');
  await expect(page.locator('[data-storage-status]')).toHaveText('ready');
  await expect(other.locator('[data-storage-status]')).toHaveText('ready');
  await page.getByRole('textbox', { name: '保存的名字' }).fill('跨标签');
  await page.locator('[data-storage-flush]').click();
  await expect(other.getByRole('textbox', { name: '保存的名字' })).toHaveValue('跨标签');
  await other.getByRole('textbox', { name: '保存的名字' }).fill('另一个页面');
  await other.locator('[data-storage-flush]').click();
  await expect(page.getByRole('textbox', { name: '保存的名字' })).toHaveValue('另一个页面');
});

test('SSR 接管先保留初值，恢复前的真实编辑优先于存储', async ({ page }) => {
  await page.goto('/?render=csr');
  await page.evaluate(({ key, value }) => localStorage.setItem(key, value), {
    key,
    value: saved('旧名字'),
  });
  let release!: () => void;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/assets/*.js', async (route) => {
    await pending;
    await route.continue();
  });
  try {
    await page.goto('/?render=ssr', { waitUntil: 'commit' });
    const input = page.getByRole('textbox', { name: '保存的名字' });
    await expect(input).toHaveValue('默认');
    await input.fill('接管前编辑');
    release();
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    await expect(input).toHaveValue('接管前编辑');
    await page.locator('[data-storage-flush]').click();
    expect(await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).name, key)).toBe(
      '接管前编辑',
    );
  } finally {
    release();
  }
});

test('部分字段恢复使用默认值，损坏内容不被自动覆盖', async ({ page }) => {
  await page.goto('/?render=csr');
  await page.evaluate(({ key, value }) => localStorage.setItem(key, value), {
    key,
    value: JSON.stringify({ name: '部分数据' }),
  });
  await page.reload();
  await expect(page.getByRole('textbox', { name: '保存的名字' })).toHaveValue('部分数据');
  await page.locator('[data-storage-flush]').click();
  await expect(page.getByRole('checkbox', { name: '紧凑偏好' })).not.toBeChecked();
  await page.evaluate((key) => localStorage.setItem(key, '{bad'), key);
  await page.reload();
  await expect(page.locator('[data-storage-status]')).toHaveText('error');
  expect(await page.evaluate((key) => localStorage.getItem(key), key)).toBe('{bad');
  await page.locator('[data-storage-reset]').click();
  await expect(page.locator('[data-storage-status]')).toHaveText('ready');
  expect(await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).name, key)).toBe(
    '默认',
  );
});

test('任务新增草稿跨页面重载和渲染模式恢复', async ({ page }) => {
  await page.goto('/tasks?render=ssr');
  const input = page.getByRole('textbox', { name: '新任务', exact: true });
  await input.fill('尚未提交的草稿');
  await page.getByRole('link', { name: 'CSR', exact: true }).click();
  await expect(input).toHaveValue('尚未提交的草稿');
  await input.fill('');
});

for (const mode of ['csr', 'ssr']) {
  test(`${mode} IndexedDB 自动保存、恢复、跨标签通知与清除`, async ({ page, context }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/?render=${mode}`);
    await expect(page.locator('[data-idb-ready]')).toHaveText('true');
    const input = page.getByRole('textbox', { name: 'IndexedDB 笔记' });
    await input.fill('异步保存的笔记');
    const read = () =>
      page.evaluate(async () => {
        return new Promise<string | undefined>((resolve, reject) => {
          const open = indexedDB.open('zerodep-example-store', 1);
          open.onerror = () => reject(open.error);
          open.onsuccess = () => {
            const db = open.result;
            const tx = db.transaction('state', 'readonly');
            const get = tx.objectStore('state').get('note');
            tx.oncomplete = () => {
              db.close();
              resolve(get.result as string | undefined);
            };
            tx.onabort = () => {
              db.close();
              reject(tx.error);
            };
          };
        });
      });
    await expect.poll(read).toBe('{"text":"异步保存的笔记"}');
    await page.reload();
    await expect(input).toHaveValue('异步保存的笔记');
    const other = await context.newPage();
    await other.goto('/?render=csr');
    await expect(other.locator('[data-idb-ready]')).toHaveText('true');
    await expect(other.getByRole('textbox', { name: 'IndexedDB 笔记' })).toHaveValue(
      '异步保存的笔记',
    );
    await input.fill('跨标签异步更新');
    await expect(other.getByRole('textbox', { name: 'IndexedDB 笔记' })).toHaveValue(
      '跨标签异步更新',
    );
    await page.locator('[data-idb-clear]').click();
    await expect(input).toHaveValue('');
    await expect(other.getByRole('textbox', { name: 'IndexedDB 笔记' })).toHaveValue('');
    await expect.poll(read).toBeUndefined();
    expect(errors).toEqual([]);
  });
}
