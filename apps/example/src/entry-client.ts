import { mount, hydrate, type MountOptions } from '@zerodep-js/core';
import { App } from './App.js';
import './style.css';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Missing application root.');
const mode = root.dataset.renderMode;
if (mode !== 'csr' && mode !== 'ssr') throw new Error('Missing render mode.');

let dispose = () => {};
const options: MountOptions<typeof App> = {
  target: root,
  props: { mode, onUnmount: () => dispose() },
};
dispose =
  mode === 'csr'
    ? mount(App, options)
    : hydrate(App, {
        ...options,
        mismatch:
          new URL(location.href).searchParams.get('recover') === 'replace' ? 'replace' : 'throw',
        onMismatch(error) {
          root.dataset.hydrationError = error.code;
        },
      });
root.dataset.clientReady = 'true';
if (import.meta.hot) {
  // 开发更新重建应用并明确释放旧作用域；不猜测哪些局部状态可以迁移。
  import.meta.hot.accept('./App.js', (next) => {
    if (!next) return;
    dispose();
    // Vite 的模块回调不携带导出类型，在这个已知入口恢复 App 的签名。
    dispose = mount(next.App as typeof App, options);
  });
  import.meta.hot.dispose(() => dispose());
}
