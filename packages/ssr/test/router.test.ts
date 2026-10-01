import { expect, it } from 'vitest';
import { defineComponent, element } from 'zerodep-js/internal';
import {
  createRouter,
  createMemoryHistory,
  defineRoutes,
  Router,
  Outlet,
  useRoute,
  RouteError,
} from 'zerodep-js/router';
import { renderToString } from '../src/index.js';

it('SSR 必须先准备数据，布局与叶子按各自上下文渲染并释放控制器', async () => {
  const Layout = defineComponent(() => element('section', { children: element(Outlet, {}) }));
  const Page = defineComponent(() => element('p', { children: useRoute().params.id }));
  const routes = defineRoutes({
    layout: { path: '/', component: Layout },
    page: { path: '/:id', parent: 'layout', component: Page },
  });
  const idle = createRouter(routes);
  try {
    expect(() => renderToString(Router, { props: { router: idle } })).toThrow('resolve');
  } finally {
    idle.dispose();
  }
  const router = createRouter(routes, { history: createMemoryHistory('/one') });
  await router.resolve();
  const html = renderToString(Router, { props: { router } });
  expect(html).toContain('<section>');
  expect(html).toContain('<p>one</p>');
  expect(router.disposed).toBe(true);
  expect(router.dehydrate().matches).toHaveLength(2);
  expect(() => renderToString(Router, { props: { router } })).toThrow('有效控制器');
});

it('显式 null fallback 被保留，SSR 页面渲染失败交还 HTTP 层', async () => {
  const Broken = defineComponent(() => {
    throw new Error('页面初始化失败');
  });
  const Page = defineComponent(() => null);
  const routes = defineRoutes({
    broken: { path: '/broken', component: Broken },
    denied: {
      path: '/denied',
      component: Page,
      load() {
        throw new RouteError(403, '拒绝');
      },
    },
  });
  for (const path of ['/missing', '/denied', '/broken']) {
    const router = createRouter(routes, { history: createMemoryHistory(path) });
    await router.resolve();
    const render = () =>
      renderToString(Router, { props: { router, notFound: null, error: () => null } });
    if (path === '/broken') expect(render).toThrow('页面初始化失败');
    else expect(render().replace(/<!--[\s\S]*?-->/g, '')).toBe('');
    expect(router.disposed).toBe(true);
  }
});
