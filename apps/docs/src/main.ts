import { _mount } from 'zerodep-js';
import { App } from './App.js';
import './style.css';

const target = document.querySelector<HTMLElement>('#app');
if (!target) throw new Error('Missing docs application root.');

const dispose = _mount(App, { target });
if (import.meta.hot) {
  // 入口或页面更新时先释放旧组件树，避免重复挂载。
  import.meta.hot.accept('./App.js', () => import.meta.hot?.invalidate());
  import.meta.hot.dispose(dispose);
}
