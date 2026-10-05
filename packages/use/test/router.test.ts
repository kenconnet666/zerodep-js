import { expect, it, vi } from 'vitest';
import { defineComponent } from 'zerodep-js/internal';
import { _defineRoute, _defineRoutes } from '../src/router/routes.js';
import { _createRouter } from '../src/router/router.js';
import { _createMemoryHistory } from '../src/router/history.js';
import { RouteError, _redirect } from '../src/router/navigation.js';

const Page = defineComponent(() => null);
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

it('加载父子数据、查询解析和地址生成，实例分别持有状态', async () => {
  const routes = _defineRoutes({
    shell: _defineRoute('/', { component: Page, load: () => ({ parent: true }) }),
    task: _defineRoute('/tasks/:id', {
      parent: 'shell',
      component: Page,
      parseSearch: (query) => ({ page: Number(query.get('page') ?? 1) }),
      load: ({ params, search, parentData }) => ({
        id: params.id,
        page: search.page,
        parent: parentData,
      }),
    }),
  });
  const router = _createRouter(routes, { history: _createMemoryHistory('/tasks/1?page=2') });
  const another = _createRouter(routes, { history: _createMemoryHistory('/tasks/9') });
  try {
    expect(router.state.status).toBe('idle');
    await Promise.all([router.resolve(), another.resolve()]);
    expect(router.state.matches.at(-1)!.data).toEqual({
      id: '1',
      page: 2,
      parent: { parent: true },
    });
    expect(another.state.matches.at(-1)!.params.id).toBe('9');
    expect(
      router.href(routes.task, {
        params: { id: 'a/b' },
        search: { q: ['甲', '乙'], page: 1 },
        hash: 'section',
      }),
    ).toBe('/tasks/a%2Fb?q=%E7%94%B2&q=%E4%B9%99&page=1#section');
    await router.setSearch({ page: 3, q: null });
    expect(router.state.location.href).toBe('/tasks/1?page=3');
    expect(router.state.matches.at(-1)!.data).toMatchObject({ page: 3 });
  } finally {
    router.dispose();
    another.dispose();
  }
});

it('取消和重定向不会先破坏当前页面，路径参数变化触发离开守卫', async () => {
  const routes = _defineRoutes({
    home: { path: '/', component: Page },
    task: { path: '/tasks/:id', component: Page },
    alias: { path: '/old', redirect: '/' },
  });
  const history = _createMemoryHistory('/tasks/1');
  const router = _createRouter(routes, { history });
  try {
    await router.resolve();
    const leave = vi.fn(() => false);
    const stop = router.beforeLeave(routes.task, leave);
    expect((await router.navigate(routes.task, { params: { id: '2' } })).status).toBe('cancelled');
    expect(history.location.href).toBe('/tasks/1');
    expect(router.state.location.href).toBe('/tasks/1');
    expect(leave).toHaveBeenCalledOnce();
    stop();
    router.beforeEach(({ to }) =>
      to.location.pathname === '/tasks/2' ? _redirect(routes.home) : undefined,
    );
    const result = await router.navigate(routes.task, { params: { id: '2' } });
    expect(result.status).toBe('committed');
    expect(router.state.location.href).toBe('/');
    await router.navigate(routes.alias);
    expect(router.state.location.href).toBe('/');
  } finally {
    router.dispose();
  }
});

it('新导航取消忽略 signal 的旧 loader，迟到结果不能覆盖', async () => {
  const slow = deferred<string>();
  let oldSignal!: AbortSignal;
  const routes = _defineRoutes({
    home: { path: '/', component: Page },
    task: _defineRoute('/tasks/:id', {
      component: Page,
      load: ({ params, signal }) => {
        if (params.id === '1') {
          oldSignal = signal;
          return slow.promise;
        }
        return 'second';
      },
    }),
  });
  const router = _createRouter(routes);
  try {
    await router.resolve();
    const first = router.navigate(routes.task, { params: { id: '1' } });
    await vi.waitFor(() => expect(oldSignal).toBeDefined());
    const second = router.navigate(routes.task, { params: { id: '2' } });
    expect((await first).status).toBe('cancelled');
    expect(oldSignal.aborted).toBe(true);
    await second;
    slow.resolve('late');
    await Promise.resolve();
    expect(router.state.location.href).toBe('/tasks/2');
    expect(router.state.matches[0]!.data).toBe('second');
  } finally {
    router.dispose();
  }
});

it('点回当前地址也会撤销正在进行的其他导航', async () => {
  const slow = deferred<void>();
  let started = false;
  const routes = _defineRoutes({
    home: { path: '/', component: Page },
    slow: _defineRoute('/slow', {
      component: Page,
      load: () => {
        started = true;
        return slow.promise;
      },
    }),
  });
  const router = _createRouter(routes);
  try {
    await router.resolve();
    const pending = router.navigate(routes.slow);
    await vi.waitFor(() => expect(started).toBe(true));
    expect((await router.navigate(routes.home)).status).toBe('unchanged');
    expect((await pending).status).toBe('cancelled');
    expect(router.pending).toBeUndefined();
    slow.resolve();
    expect(router.state.location.href).toBe('/');
  } finally {
    router.dispose();
  }
});

it('pop 被拒绝时恢复历史位置，接受后正常提交', async () => {
  const routes = _defineRoutes({
    a: { path: '/a', component: Page },
    b: { path: '/b', component: Page },
  });
  const history = _createMemoryHistory('/a');
  const router = _createRouter(routes, { history });
  try {
    await router.resolve();
    const detach = router.start();
    await router.navigate(routes.b);
    const stop = router.beforeEach(({ to }) => to.location.href !== '/a');
    history.go(-1);
    await router.resolve();
    expect(history.location.href).toBe('/b');
    expect(router.state.location.href).toBe('/b');
    stop();
    history.go(-1);
    await router.resolve();
    expect(router.state.location.href).toBe('/a');
    detach();
  } finally {
    router.dispose();
  }
});

it('loader 错误有状态和可恢复快照，内部异常不自动序列化', async () => {
  let failed = true;
  const routes = _defineRoutes({
    home: { path: '/', component: Page },
    bad: _defineRoute('/bad', {
      component: Page,
      load: () => {
        if (failed) throw new Error('数据库密钥');
        return 'fixed';
      },
    }),
  });
  const router = _createRouter(routes);
  try {
    await router.resolve();
    await router.navigate(routes.bad);
    expect(router.state.status).toBe('error');
    expect(router.state.statusCode).toBe(500);
    expect(router.history.location.href).toBe('/bad');
    expect(JSON.stringify(router.dehydrate())).not.toContain('数据库密钥');
    failed = false;
    await router.reload();
    expect(router.state.status).toBe('ready');
    expect(router.state.matches[0]!.data).toBe('fixed');
    await router.navigate('/missing');
    expect(router.state.statusCode).toBe(404);
    expect(router.state.status).toBe('not-found');
  } finally {
    router.dispose();
  }
});

it('预加载去重并复用数据，失效后再次加载', async () => {
  const load = vi.fn(async ({ params }: { params: { id: string } }) => ({ id: params.id }));
  const routes = _defineRoutes({ task: _defineRoute('/tasks/:id', { component: Page, load }) });
  const router = _createRouter(routes);
  try {
    await Promise.all([
      router.preload(routes.task, { params: { id: '1' } }),
      router.preload(routes.task, { params: { id: '1' } }),
    ]);
    expect(load).toHaveBeenCalledOnce();
    expect(router.state.status).toBe('idle');
    await router.navigate(routes.task, { params: { id: '1' } });
    expect(load).toHaveBeenCalledOnce();
    router.invalidate(routes.task);
    await router.reload();
    expect(load).toHaveBeenCalledTimes(2);
    await router.preload(routes.task, { params: { id: '1' }, hash: 'one' });
    await router.navigate(routes.task, { params: { id: '1' }, hash: 'two' });
    expect(load).toHaveBeenCalledTimes(4);
  } finally {
    router.dispose();
  }
});

it('SSR 初始化快照恢复数据而不重新调用 loader，仍加载组件模块', async () => {
  const load = vi.fn(() => ({ value: 2 }));
  const lazy = vi.fn(async () => ({ default: Page }));
  const routes = _defineRoutes({ task: _defineRoute('/tasks/:id', { lazy, load }) });
  const server = _createRouter(routes, { history: _createMemoryHistory('/tasks/1') });
  await server.resolve();
  const initial = server.dehydrate();
  server.dispose();
  const client = _createRouter(routes, {
    history: _createMemoryHistory('/tasks/1'),
    initial: JSON.parse(JSON.stringify(initial)),
  });
  try {
    await client.resolve();
    expect(load).toHaveBeenCalledOnce();
    expect(lazy).toHaveBeenCalledTimes(2);
    expect(client.state.matches[0]!.data).toEqual({ value: 2 });
    expect(client.state.status).toBe('ready');
  } finally {
    client.dispose();
  }
});

it('解析错误、HTTP 错误、重复重定向和外部地址有明确结果', async () => {
  const routes = _defineRoutes({
    home: { path: '/', component: Page },
    bad: _defineRoute('/bad', {
      component: Page,
      parseSearch() {
        throw new Error('格式');
      },
    }),
    denied: _defineRoute('/denied', {
      component: Page,
      load() {
        throw new RouteError(403, '无权访问');
      },
    }),
    loop: { path: '/loop', redirect: '/loop' },
  });
  const router = _createRouter(routes);
  try {
    await router.resolve();
    await router.navigate(routes.bad);
    expect(router.state.statusCode).toBe(400);
    await router.navigate(routes.denied);
    expect(router.state.statusCode).toBe(403);
    expect((await router.navigate(routes.loop)).status).toBe('error');
    const before = router.state.location.href;
    expect((await router.navigate('https://outside.test/')).status).toBe('error');
    expect(router.state.location.href).toBe(before);
  } finally {
    router.dispose();
  }
});

it('dispose 撤销未完成导航，后续异步结果不提交', async () => {
  let called = false;
  const deferredLoad = deferred<string>();
  const routes = _defineRoutes({
    slow: _defineRoute('/slow', {
      component: Page,
      load: () => {
        called = true;
        return deferredLoad.promise;
      },
    }),
  });
  const router = _createRouter(routes, { history: _createMemoryHistory('/slow') });
  const pending = router.resolve();
  await vi.waitFor(() => expect(called).toBe(true));
  router.dispose();
  expect((await pending).status).toBe('cancelled');
  deferredLoad.resolve('late');
  expect(router.disposed).toBe(true);
  expect(router.pending).toBeUndefined();
});

it('连续 pop 以已提交页面计算拒绝后的回滚距离', async () => {
  const slow = deferred<boolean>();
  const routes = _defineRoutes({ page: { path: '/:id', component: Page } });
  const history = _createMemoryHistory({ entries: ['/a', '/b', '/c'] });
  const router = _createRouter(routes, { history });
  try {
    await router.resolve();
    router.start();
    router.beforeEach(({ to }) => (to.location.pathname === '/b' ? slow.promise : false));
    history.go(-1);
    history.go(-1);
    await router.resolve();
    expect(history.location.href).toBe('/c');
    expect(history.location.index).toBe(2);
    expect(router.state.location.href).toBe('/c');
    slow.resolve(true);
  } finally {
    router.dispose();
  }
});

it('历史实例只属于一个路由器，SSR 接管后采用浏览器式历史数据', async () => {
  const routes = _defineRoutes({ page: { path: '/', component: Page } });
  const history = _createMemoryHistory({ entries: [{ href: '/', state: { tab: 2 } }] });
  const router = _createRouter(routes, {
    history,
    initial: {
      version: 1,
      href: '/',
      status: 'ready',
      matches: [{ name: 'page', data: undefined }],
    },
  });
  try {
    expect(() => _createRouter(routes, { history })).toThrow('已被');
    await router.resolve();
    expect(router.state.location.state).toBeUndefined();
    router.start();
    expect(router.state.location.state).toEqual({ tab: 2 });
  } finally {
    router.dispose();
  }
});

it('错误和 404 快照在客户端保持状态，并允许重试', async () => {
  let failed = true;
  const routes = _defineRoutes({
    bad: _defineRoute('/bad', {
      component: Page,
      load() {
        if (failed) throw new RouteError(403, '暂无权限');
        return 'ready';
      },
    }),
  });
  for (const href of ['/bad', '/missing']) {
    const server = _createRouter(routes, { history: _createMemoryHistory(href) });
    await server.resolve();
    const initial = server.dehydrate();
    server.dispose();
    const client = _createRouter(routes, { history: _createMemoryHistory(href), initial });
    try {
      await client.resolve();
      expect(client.state.statusCode).toBe(href === '/bad' ? 403 : 404);
      expect(client.dehydrate()).toEqual(initial);
      if (href === '/bad') {
        failed = false;
        await client.reload();
        expect(client.state.matches[0]!.data).toBe('ready');
      }
    } finally {
      client.dispose();
    }
  }
});

it('取消预加载给出 AbortError，失败代码可在下次导航重新加载', async () => {
  const slow = deferred<void>();
  let loaded = false;
  let first = true;
  const routes = _defineRoutes({
    slow: _defineRoute('/slow', {
      component: Page,
      load() {
        loaded = true;
        return slow.promise;
      },
    }),
    lazy: {
      path: '/lazy',
      lazy: async () => {
        if (first) {
          first = false;
          throw new Error('网络中断');
        }
        return Page;
      },
    },
  });
  const router = _createRouter(routes);
  try {
    const preload = router.preload(routes.slow);
    const checked = expect(preload).rejects.toMatchObject({ name: 'AbortError' });
    await vi.waitFor(() => expect(loaded).toBe(true));
    router.invalidate(routes.slow);
    await checked;
    slow.resolve();
    await router.navigate(routes.lazy);
    expect(router.state.status).toBe('error');
    await router.reload();
    expect(router.state.status).toBe('ready');
  } finally {
    router.dispose();
  }
});

it('前台接管预加载后不会被缓存失效取消，停止函数不会误停后续挂载', async () => {
  const slow = deferred<string>();
  let called = 0;
  const routes = _defineRoutes({
    home: { path: '/', component: Page },
    page: _defineRoute('/page', {
      component: Page,
      load: () => {
        called++;
        return slow.promise;
      },
    }),
  });
  const router = _createRouter(routes);
  try {
    await router.resolve();
    const stop = router.start();
    stop();
    const again = router.start();
    stop();
    const preload = router.preload(routes.page);
    await vi.waitFor(() => expect(called).toBe(1));
    const navigation = router.navigate(routes.page);
    router.invalidate();
    slow.resolve('ready');
    await preload;
    expect((await navigation).status).toBe('committed');
    router.go(-1);
    await router.resolve();
    expect(router.state.location.pathname).toBe('/');
    again();
  } finally {
    router.dispose();
  }
});
