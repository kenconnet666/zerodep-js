import { test as base, expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { pageSchema, taskSchema, type Task } from '../../apps/example/src/tasks/schema.js';

const test = base.extend<{ task: Task }>({
  task: async ({ request }, use) => {
    const title = `路由-${randomUUID()}`;
    const result = await request.post('/api/tasks', { data: { title } });
    const task = taskSchema.parse(await result.json());
    try {
      await use(task);
    } finally {
      const response = await request.get('/api/tasks');
      const current = pageSchema
        .parse(await response.json())
        .tasks.find((item) => item.id === task.id);
      if (current)
        expect(
          (
            await request.delete(`/api/tasks/${current.id}`, {
              data: { revision: current.revision },
            })
          ).status(),
        ).toBe(204);
    }
  },
});

for (const mode of ['csr', 'ssr']) {
  test(`${mode} 嵌套路由、查询、编辑与布局身份`, async ({ page, task }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    let requests = 0;
    page.on('request', (request) => {
      if (new URL(request.url()).pathname === '/api/tasks') requests++;
    });
    await page.goto(`/workspace/tasks?render=${mode}&q=${encodeURIComponent(task.title)}`);
    await expect(page.getByRole('link', { name: task.title, exact: true })).toBeVisible();
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    expect(requests).toBe(mode === 'ssr' ? 0 : 1);
    const layout = page.getByRole('textbox', { name: '空间名称' });
    await layout.fill('保留的空间');
    await layout.evaluate((node) => node.setAttribute('data-retained', 'true'));
    await page.getByRole('link', { name: task.title, exact: true }).click();
    await expect(page.locator('[data-task-id]')).toHaveText(task.id);
    const title = page.getByRole('textbox', { name: '任务标题' });
    await title.fill(`${task.title} 已修改`);
    await page.getByRole('button', { name: '保存标题' }).click();
    await expect(page.locator('[data-dirty]')).toHaveText('已与服务端同步');
    await page.getByRole('link', { name: '返回列表' }).click();
    await expect(
      page.getByRole('link', { name: `${task.title} 已修改`, exact: true }),
    ).toBeVisible();
    await page.getByRole('textbox', { name: '查找任务' }).fill(task.title);
    await page.getByRole('button', { name: '搜索', exact: true }).click();
    await expect(page.locator('[data-task-query]')).toHaveText(`当前查询：${task.title}`);
    await expect(page).toHaveURL(
      new RegExp(`q=${task.title}`.replace('路由', '%E8%B7%AF%E7%94%B1')),
    );
    await page.getByRole('link', { name: '偏好设置', exact: true }).click();
    await expect(page.getByRole('heading', { name: '偏好设置' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '偏好设置' })).toBeFocused();
    await expect(layout).toHaveValue('保留的空间');
    await expect(layout).toHaveAttribute('data-retained', 'true');
    await expect(page.getByRole('link', { name: '偏好设置', exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await page.getByRole('button', { name: '后退', exact: true }).click();
    await expect(page.locator('[data-task-query]')).toHaveText(`当前查询：${task.title}`);
    await page.getByRole('button', { name: '前进', exact: true }).click();
    await expect(page.getByRole('heading', { name: '偏好设置' })).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('离开确认拒绝链接和浏览器后退，草稿在卸载时持久化', async ({ page, task }) => {
  await page.goto(`/workspace/tasks?render=ssr&q=${encodeURIComponent(task.title)}`);
  await page.getByRole('link', { name: task.title, exact: true }).click();
  const title = page.getByRole('textbox', { name: '任务标题' });
  await title.fill('保留草稿');
  page.once('dialog', (dialog) => dialog.dismiss());
  await page.getByRole('link', { name: '返回列表' }).click();
  await expect(page).toHaveURL(new RegExp(`/workspace/tasks/${task.id}$`));
  const dialog = page.waitForEvent('dialog');
  await page.evaluate(() => history.back());
  await (await dialog).dismiss();
  await expect(page).toHaveURL(new RegExp(`/workspace/tasks/${task.id}$`));
  await expect(title).toHaveValue('保留草稿');
  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('link', { name: '返回列表' }).click();
  await expect(page.getByRole('heading', { name: '任务列表' })).toBeVisible();
  await page.getByRole('link', { name: task.title, exact: true }).click();
  await expect(title).toHaveValue('保留草稿');
  await page.getByRole('button', { name: '卸载路由应用' }).click();
  await expect(page.locator('#app')).toHaveAttribute('data-router-disposed', 'true');
  await expect(page.locator('#app')).toBeEmpty();
});

test('SSR 保留原始 DOM，错误与未匹配页面返回正确 HTTP 状态', async ({ page, request, task }) => {
  let release!: () => void;
  const gate = new Promise<void>((done) => {
    release = done;
  });
  await page.route('**/assets/*.js', async (route) => {
    await gate;
    await route.continue();
  });
  try {
    await page.goto(`/workspace/tasks/${task.id}?render=ssr`, { waitUntil: 'commit' });
    const input = page.getByRole('textbox', { name: '任务标题' });
    await expect(input).toHaveValue(task.title);
    const original = await input.elementHandle();
    release();
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    expect(await input.evaluate((node, previous) => node === previous, original)).toBe(true);
    await original?.dispose();
    expect((await request.get('/workspace/missing?render=ssr')).status()).toBe(404);
    expect((await request.get('/workspace/tasks/not-found?render=ssr')).status()).toBe(404);
    expect((await request.get('/workspace/tasks?render=ssr&filter=invalid')).status()).toBe(400);
    const redirect = await request.get('/workspace', { maxRedirects: 0 });
    expect(redirect.status()).toBe(302);
    expect(redirect.headers().location).toBe('/workspace/tasks');
  } finally {
    release();
  }
});

test('客户端 loader 失败可重试，迟到的旧查询不覆盖新页面', async ({ page, task }) => {
  let fail = true;
  let release!: () => void;
  const slow = new Promise<void>((done) => {
    release = done;
  });
  await page.route('**/api/tasks?*', async (route) => {
    const query = new URL(route.request().url()).searchParams.get('q');
    if (fail) {
      await route.fulfill({ status: 503, json: { error: '重试' } });
      return;
    }
    if (query === 'slow') {
      await slow;
      await route.fulfill({ json: { query: 'slow', filter: 'all', tasks: [] } }).catch(() => {});
      return;
    }
    await route.continue();
  });
  try {
    await page.goto('/workspace/tasks?render=csr');
    await expect(page.getByRole('alert')).toContainText('503');
    fail = false;
    await page.getByRole('button', { name: '重新加载页面' }).click();
    await expect(page.getByRole('heading', { name: '任务列表' })).toBeVisible();
    const query = page.getByRole('textbox', { name: '查找任务' });
    await query.fill('slow');
    const started = page.waitForRequest(
      (request) => new URL(request.url()).searchParams.get('q') === 'slow',
    );
    await page.getByRole('button', { name: '搜索', exact: true }).click();
    await started;
    await query.fill(task.title);
    await page.getByRole('button', { name: '搜索', exact: true }).click();
    await expect(page.getByRole('link', { name: task.title, exact: true })).toBeVisible();
    release();
    await expect(page.locator('[data-task-query]')).toHaveText(`当前查询：${task.title}`);
  } finally {
    release();
  }
});

test('保存期间的继续输入保留为新草稿，下一次提交后删除已完成草稿', async ({ page, task }) => {
  let release!: () => void;
  const gate = new Promise<void>((done) => {
    release = done;
  });
  await page.route(`**/api/tasks/${task.id}`, async (route) => {
    const response = await route.fetch();
    await gate;
    await route.fulfill({ response });
  });
  try {
    await page.goto(`/workspace/tasks/${task.id}?render=ssr`);
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    const input = page.getByRole('textbox', { name: '任务标题' });
    await input.fill(`${task.title} 已提交`);
    const sent = page.waitForRequest((request) => request.method() === 'PATCH');
    await page.getByRole('button', { name: '保存标题' }).click();
    await sent;
    await input.fill(`${task.title} 新草稿`);
    release();
    await expect(page.getByRole('button', { name: '保存标题' })).toBeEnabled();
    await expect(input).toHaveValue(`${task.title} 新草稿`);
    await expect(page.locator('[data-dirty]')).toHaveText('有未提交的修改');
    await page.getByRole('button', { name: '保存标题' }).click();
    await expect(page.locator('[data-dirty]')).toHaveText('已与服务端同步');
    expect(
      await page.evaluate(
        (key) => localStorage.getItem(key),
        `zerodep.example.task-title:${task.id}`,
      ),
    ).toBeNull();
  } finally {
    release();
  }
});

test('hash 历史支持真实前后退，挂载位置外的 URL 保持不变', async ({ page, task }) => {
  await page.goto(
    `/workspace?render=csr&history=hash#/workspace/tasks?q=${encodeURIComponent(task.title)}`,
  );
  await page.getByRole('link', { name: task.title, exact: true }).click();
  await expect(page.locator('[data-task-id]')).toHaveText(task.id);
  expect(new URL(page.url()).pathname).toBe('/workspace');
  expect(new URL(page.url()).hash).toBe(`#/workspace/tasks/${task.id}`);
  await page.getByRole('button', { name: '后退', exact: true }).click();
  await expect(page.getByRole('heading', { name: '任务列表' })).toBeVisible();
  await page.getByRole('button', { name: '前进', exact: true }).click();
  await expect(page.locator('[data-task-id]')).toHaveText(task.id);
});

test('正常链接修饰键保留原生行为，后退恢复滚动', async ({ page, context }) => {
  await page.goto('/workspace/tasks?render=ssr');
  await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
  const original = page.url();
  // 修饰键的原生开页依赖活跃页面，先明确激活，再发出可信鼠标事件。
  await page.bringToFront();
  const [other] = await Promise.all([
    context.waitForEvent('page'),
    page
      .getByRole('link', { name: '偏好设置', exact: true })
      .click({ modifiers: ['ControlOrMeta'] }),
  ]);
  await other.waitForLoadState();
  await expect(other.getByRole('heading', { name: '偏好设置' })).toBeVisible();
  expect(page.url()).toBe(original);
  await other.close();
  await page.evaluate(() => {
    const spacer = document.createElement('div');
    spacer.style.height = '2400px';
    document.body.append(spacer);
    window.scrollTo(0, 500);
  });
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(500);
  await page
    .getByRole('link', { name: '偏好设置', exact: true })
    .evaluate((node: HTMLAnchorElement) => node.click());
  await expect(page.getByRole('heading', { name: '偏好设置' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.evaluate(() => history.back());
  await expect(page.getByRole('heading', { name: '任务列表' })).toBeVisible();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(500);
});
