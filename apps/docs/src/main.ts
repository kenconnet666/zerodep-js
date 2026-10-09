import { _hydrate, _mount } from 'zerodep-js';
import { hydrateCss } from 'zerodep-js-css';
import { App } from './App.js';
import './style.css';

const target = document.querySelector<HTMLElement>('#app');
if (!target) throw new Error('Missing docs application root.');

hydrateCss();
const dispose = target.hasChildNodes() ? _hydrate(App, { target }) : _mount(App, { target });
target.dataset.ready = 'true';
if (import.meta.hot) {
  // 入口或页面更新时先释放旧组件树，避免重复挂载。
  import.meta.hot.accept('./App.js', () => import.meta.hot?.invalidate());
  import.meta.hot.dispose(dispose);
}
