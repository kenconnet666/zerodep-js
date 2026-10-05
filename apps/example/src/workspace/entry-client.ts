import { _hydrate, _mount } from 'zerodep-js';
import {
  _createRouter,
  _createBrowserHistory,
  _createHashHistory,
  type RouterSnapshot,
} from 'zerodep-use/router';
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
const router = _createRouter(routes, {
  history: hash ? _createHashHistory() : _createBrowserHistory(),
  ...(initial ? { initial } : {}),
});
if (mode === 'ssr') await router.resolve();
const options = { target: root, props: { router } };
const dispose = mode === 'ssr' ? _hydrate(Workspace, options) : _mount(Workspace, options);
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
