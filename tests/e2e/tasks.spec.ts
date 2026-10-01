import { test as base, expect, type Route } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { pageSchema, taskSchema, type Task } from '../../apps/example/src/tasks/schema.js';

interface Tasks {
  prefix: string;
  create(suffix: string): Promise<Task>;
  list(): Promise<Task[]>;
  url(mode?: 'csr' | 'ssr'): string;
}
const test = base.extend<{ tasks: Tasks }>({
  tasks: async ({ request }, use) => {
    const prefix = `试点-${randomUUID()}`;
    const list = async () => {
      const response = await request.get(`/api/tasks?q=${encodeURIComponent(prefix)}`);
      expect(response.ok()).toBe(true);
      return pageSchema.parse(await response.json()).tasks;
    };
    try {
      await use({
        prefix,
        list,
        url: (mode = 'ssr') => `/tasks?${new URLSearchParams({ render: mode, q: prefix })}`,
        async create(suffix) {
          const response = await request.post('/api/tasks', {
            data: { title: `${prefix} ${suffix}` },
          });
          expect(response.status()).toBe(201);
          return taskSchema.parse(await response.json());
        },
      });
    } finally {
      // 仅移除此用例的随机前缀记录；整个测试服务器还使用独立的内存数据库。
      for (const task of await list()) {
        const response = await request.delete(`/api/tasks/${task.id}`, {
          data: { revision: task.revision },
        });
        expect(response.status()).toBe(204);
      }
    }
  },
});

for (const mode of ['csr', 'ssr'] as const) {
  test(`${mode} 任务增删改查与异步刷新保留草稿和焦点`, async ({ page, request, tasks }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const original = await tasks.create('初始任务');
    await tasks.create('另一项');
    await page.goto(tasks.url(mode));
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    const row = page.locator(`[data-task-id="${original.id}"]`);
    const draft = row.locator('[data-task-draft]');
    const edited = `${tasks.prefix} 我的草稿`;
    await draft.fill(edited);
    await draft.evaluate((node: HTMLInputElement) => {
      node.dataset.retained = 'true';
      node.setSelectionRange(2, 6);
    });
    const updated = await request.patch(`/api/tasks/${original.id}`, {
      data: { revision: original.revision, title: `${tasks.prefix} 服务器新内容` },
    });
    expect(updated.status()).toBe(200);
    await page
      .getByRole('button', { name: '刷新列表' })
      .evaluate((node: HTMLButtonElement) => node.click());
    await expect(page.getByRole('button', { name: '刷新列表' })).toBeEnabled();
    await expect(draft).toHaveValue(edited);
    await expect(draft).toHaveAttribute('data-retained', 'true');
    await expect(draft).toBeFocused();
    expect(
      await draft.evaluate((node: HTMLInputElement) => [node.selectionStart, node.selectionEnd]),
    ).toEqual([2, 6]);
    await row.getByRole('button', { name: '恢复服务器内容' }).click();
    await expect(draft).toHaveValue(`${tasks.prefix} 服务器新内容`);
    await expect(row.getByRole('button', { name: '保存', exact: true })).toBeDisabled();
    await draft.fill(edited);
    await row.getByRole('button', { name: '保存', exact: true }).click();
    await expect(page.locator('[data-task-status]')).toHaveText('任务已保存');
    expect((await tasks.list()).find((task) => task.id === original.id)?.title).toBe(edited);

    const createdTitle = `${tasks.prefix} 新增任务`;
    await page.getByRole('textbox', { name: '新任务', exact: true }).fill(createdTitle);
    await page.getByRole('button', { name: '添加任务', exact: true }).click();
    await expect(page.locator('[data-task-count]')).toHaveText('3');
    const created = (await tasks.list()).find((task) => task.title === createdTitle)!;
    const createdRow = page.locator(`[data-task-id="${created.id}"]`);
    await createdRow.getByRole('checkbox').check();
    await expect(createdRow.locator('.task-meta')).toContainText('已完成');
    expect((await tasks.list()).find((task) => task.id === created.id)?.completed).toBe(true);
    await createdRow.getByRole('button', { name: '删除', exact: true }).click();
    await expect(createdRow).toHaveCount(0);
    await page.reload();
    await expect(page.locator('[data-task-count]')).toHaveText('2');
    await expect(page.locator(`[data-task-id="${original.id}"] [data-task-draft]`)).toHaveValue(
      edited,
    );
    expect(errors).toEqual([]);
  });
}

test('任务页面切换渲染模式保留查询与状态筛选', async ({ page, request, tasks }) => {
  const open = await tasks.create('待处理');
  const done = await tasks.create('已完成');
  expect(
    (
      await request.patch(`/api/tasks/${done.id}`, {
        data: { revision: done.revision, completed: true },
      })
    ).status(),
  ).toBe(200);
  await page.goto(tasks.url());
  await page.getByRole('combobox', { name: '任务状态' }).selectOption('open');
  await expect(page.locator(`[data-task-id="${done.id}"]`)).toHaveCount(0);
  await page.getByRole('link', { name: 'CSR', exact: true }).click();
  await expect(page.locator('#app')).toHaveAttribute('data-render-mode', 'csr');
  await expect(page.getByRole('searchbox', { name: '搜索任务' })).toHaveValue(tasks.prefix);
  await expect(page.getByRole('combobox', { name: '任务状态' })).toHaveValue('open');
  await expect(page.locator(`[data-task-id="${open.id}"]`)).toBeVisible();
  await expect(page.locator(`[data-task-id="${done.id}"]`)).toHaveCount(0);
  await page.getByRole('link', { name: 'SSR', exact: true }).click();
  await expect(page.locator('#app')).toHaveAttribute('data-render-mode', 'ssr');
  await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
  await expect(page.locator('[data-task-count]')).toHaveText('1');
});

test('较早的保存响应不会清掉后来输入的草稿', async ({ page, tasks }) => {
  const task = await tasks.create('原始');
  await page.goto(tasks.url('csr'));
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  let started!: () => void;
  const saving = new Promise<void>((resolve) => {
    started = resolve;
  });
  await page.route(`**/api/tasks/${task.id}`, async (route) => {
    const response = await route.fetch();
    started();
    await gate;
    await route.fulfill({ response });
  });
  try {
    const row = page.locator(`[data-task-id="${task.id}"]`);
    const input = row.locator('[data-task-draft]');
    await input.fill(`${tasks.prefix} 已提交`);
    await row.getByRole('button', { name: '保存', exact: true }).click();
    await saving;
    await input.fill(`${tasks.prefix} 后续草稿`);
    release();
    await expect(row.getByRole('button', { name: '保存', exact: true })).toBeEnabled();
    await expect(input).toHaveValue(`${tasks.prefix} 后续草稿`);
    expect((await tasks.list())[0]?.title).toBe(`${tasks.prefix} 已提交`);
    await expect(row.locator('.task-meta')).toContainText('未保存');
  } finally {
    release();
  }
});

test('版本冲突保留编辑内容，使用最新版本后可以再次保存', async ({ page, request, tasks }) => {
  const task = await tasks.create('原始');
  // 服务端改名后不再匹配当前查询，冲突处理仍须让用户保留并核对草稿。
  await page.goto(`/tasks?render=ssr&q=${encodeURIComponent(task.title)}`);
  const row = page.locator(`[data-task-id="${task.id}"]`);
  const draft = `${tasks.prefix} 本地草稿`;
  const remote = `${tasks.prefix} 另一页面的修改`;
  await row.locator('[data-task-draft]').fill(draft);
  expect(
    (
      await request.patch(`/api/tasks/${task.id}`, {
        data: { revision: task.revision, title: remote },
      })
    ).status(),
  ).toBe(200);
  await row.getByRole('button', { name: '保存', exact: true }).click();
  await expect(row.getByRole('alert')).toContainText('其他页面更新');
  await expect(row.locator('.server-title')).toContainText(remote);
  await expect(row.locator('[data-task-draft]')).toHaveValue(draft);
  await row.getByRole('button', { name: '保存', exact: true }).click();
  await expect(row.getByRole('alert')).toHaveCount(0);
  await expect(page.locator('[data-task-status]')).toHaveText('任务已保存');
  expect((await tasks.list())[0]?.title).toBe(draft);
});

test('晚到的旧查询结果不会覆盖新查询，即使传输层忽略取消', async ({ page, tasks }) => {
  const old = await tasks.create('旧结果');
  const latest = await tasks.create('新结果');
  await page.goto(tasks.url('csr'));
  type RaceWindow = Window & {
    releaseLate?: () => void;
    lateReady?: boolean;
    lateConsumed?: boolean;
  };
  await page.evaluate((oldQuery) => {
    const state = window as RaceWindow;
    const original = window.fetch.bind(window);
    window.fetch = async (input, options) => {
      const url = new URL(input instanceof Request ? input.url : String(input), location.href);
      const response = await original(input, options);
      if (url.pathname !== '/api/tasks' || url.searchParams.get('q') !== oldQuery) return response;
      // 模拟缓存/适配层已经取得响应，却在取消后才交还调用方。
      const held = new Response(await response.text(), {
        status: response.status,
        headers: response.headers,
      });
      const json = held.json.bind(held);
      held.json = async () => {
        const result = await json();
        state.lateConsumed = true;
        return result;
      };
      return new Promise<Response>((resolve) => {
        state.releaseLate = () => resolve(held);
        state.lateReady = true;
      });
    };
  }, old.title);
  await page.getByRole('searchbox', { name: '搜索任务' }).fill(old.title);
  await page.waitForFunction(() => (window as RaceWindow).lateReady);
  await page.getByRole('searchbox', { name: '搜索任务' }).fill(latest.title);
  await expect(page.locator(`[data-task-id="${latest.id}"]`)).toBeVisible();
  await expect(page.locator(`[data-task-id="${old.id}"]`)).toHaveCount(0);
  await page.evaluate(() => (window as RaceWindow).releaseLate!());
  await page.waitForFunction(() => (window as RaceWindow).lateConsumed);
  await page.evaluate(() => new Promise(requestAnimationFrame));
  await expect(page.locator(`[data-task-id="${latest.id}"]`)).toBeVisible();
  await expect(page.locator(`[data-task-id="${old.id}"]`)).toHaveCount(0);
});

test('查询失败保留已有内容，重试后恢复', async ({ page, tasks }) => {
  const task = await tasks.create('保留');
  await page.goto(tasks.url());
  let fail = true;
  await page.route('**/api/tasks?*', async (route) => {
    if (fail) {
      fail = false;
      await route.fulfill({ status: 503, json: { error: '查询服务暂时不可用' } });
    } else await route.continue();
  });
  await page.getByRole('button', { name: '刷新列表' }).click();
  await expect(page.getByRole('alert')).toContainText('暂时不可用');
  await expect(page.locator('[data-task-status]')).toHaveText('同步失败');
  await expect(page.locator(`[data-task-id="${task.id}"]`)).toBeVisible();
  await page.getByRole('button', { name: '重试查询' }).click();
  await expect(page.getByRole('button', { name: '刷新列表' })).toBeEnabled();
  await expect(page.getByRole('alert')).toHaveCount(0);
  await page.route('**/api/tasks?*', (route) => route.abort('failed'), { times: 1 });
  await page.getByRole('button', { name: '刷新列表' }).click();
  await expect(page.getByRole('alert')).toContainText('网络请求未完成');
  await expect(page.locator('[data-task-status]')).toHaveText('同步失败');
  await page.getByRole('button', { name: '重试查询' }).click();
  await expect(page.getByRole('button', { name: '刷新列表' })).toBeEnabled();
  await expect(page.getByRole('alert')).toHaveCount(0);
});

test('关闭复用任务组件会取消真实请求，重新打开仍可使用', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/?render=csr');
  let started!: (route: Route) => void;
  const pending = new Promise<Route>((resolve) => {
    started = resolve;
  });
  await page.route('**/api/tasks?*', (route) => {
    started(route);
  });
  await page.locator('[data-task-panel-toggle]').click();
  const route = await pending;
  const cancelled = page.waitForEvent('requestfailed', {
    predicate: (request) => request.url() === route.request().url(),
  });
  await page.locator('[data-task-panel-toggle]').click();
  await cancelled;
  await expect(page.locator('[data-task-board]')).toHaveCount(0);
  // 已取消请求在部分浏览器中已经失去拦截句柄，仅清理这个已确认终止的请求。
  await route.abort().catch(() => {});
  await page.unroute('**/api/tasks?*');
  await page.locator('[data-task-panel-toggle]').click();
  await expect(page.locator('[data-task-board]')).toBeVisible();
  await expect(page.locator('[data-task-board] [data-task-status]')).toHaveText('已同步');
  expect(errors).toEqual([]);
});

test('SSR 可无脚本阅读并安全接管持久化的特殊字符', async ({ browser, page, baseURL, tasks }) => {
  const task = await tasks.create('</script><img src=x onerror=alert(1)> $&');
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const offline = await context.newPage();
    await offline.goto(`${baseURL}${tasks.url()}`);
    await expect(offline.getByRole('heading', { name: '任务工作台' })).toBeVisible();
    await expect(offline.locator(`[data-task-id="${task.id}"] [data-task-draft]`)).toHaveValue(
      task.title,
    );
    await expect(offline.locator('img')).toHaveCount(0);
  } finally {
    await context.close();
  }
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/assets/*.js', async (route) => {
    await gate;
    await route.continue();
  });
  try {
    await page.goto(tasks.url(), { waitUntil: 'commit' });
    const input = page.locator(`[data-task-id="${task.id}"] [data-task-draft]`);
    const original = await input.elementHandle();
    release();
    await expect(page.locator('#app')).toHaveAttribute('data-client-ready', 'true');
    expect(await original!.evaluate((node) => node === document.getElementById(node.id))).toBe(
      true,
    );
    await expect(input).toHaveValue(task.title);
    await expect(page.locator('img')).toHaveCount(0);
  } finally {
    release();
  }
});

test('任务 API 校验请求、来源、大小和查询参数', async ({ request }) => {
  expect((await request.post('/api/tasks', { data: { title: '' } })).status()).toBe(400);
  expect((await request.post('/api/tasks', { data: { title: 'x'.repeat(161) } })).status()).toBe(
    400,
  );
  expect(
    (
      await request.post('/api/tasks', {
        data: { title: '禁止跨站' },
        headers: { Origin: 'https://example.com' },
      })
    ).status(),
  ).toBe(403);
  expect((await request.get('/api/tasks', { headers: { Host: 'example.com' } })).status()).toBe(
    403,
  );
  expect(
    (
      await request.post('/api/tasks', {
        data: '{broken',
        headers: { 'Content-Type': 'application/json' },
      })
    ).status(),
  ).toBe(400);
  expect(
    (
      await request.post('/api/tasks', { data: 'plain', headers: { 'Content-Type': 'text/plain' } })
    ).status(),
  ).toBe(415);
  expect((await request.post('/api/tasks', { data: { title: 'x'.repeat(20_000) } })).status()).toBe(
    413,
  );
  expect((await request.get('/tasks?filter=invalid')).status()).toBe(400);
  expect((await request.get('/api/tasks?filter=invalid')).status()).toBe(400);
  const head = await request.head('/api/tasks');
  expect(head.status()).toBe(200);
  expect(await head.body()).toHaveLength(0);
});
