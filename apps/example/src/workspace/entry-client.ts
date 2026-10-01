import { hydrate, mount } from 'zerodep-js';
import {
  createRouter,
  createBrowserHistory,
  createHashHistory,
  type RouterSnapshot,
} from 'zerodep-js/router';
import { routes } from './routes.js';
import { Workspace } from './App.js';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('缺少任务空间入口。');
const mode = root.dataset.renderMode;
if (mode !== 'csr' && mode !== 'ssr') throw new Error('缺少渲染模式。');
const hash = new URL(location.href).searchParams.get('history') === 'hash';
const initial = JSON.parse(
  document.querySelector('#route-data')?.textContent ?? 'null',
) as RouterSnapshot | null;
const router = createRouter(routes, {
  history: hash ? createHashHistory() : createBrowserHistory(),
  ...(initial ? { initial } : {}),
});
if (mode === 'ssr') await router.resolve();
const options = { target: root, props: { router } };
const dispose = mode === 'ssr' ? hydrate(Workspace, options) : mount(Workspace, options);
root.dataset.clientReady = 'true';
document.querySelector('#unmount')?.addEventListener(
  'click',
  () => {
    dispose();
    root.dataset.routerDisposed = String(router.disposed);
  },
  { once: true },
);
if (import.meta.hot) import.meta.hot.dispose(dispose);
