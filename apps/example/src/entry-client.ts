import { _mount, _hydrate, type MountOptions } from 'zerodep-js';
import { App } from './App.js';
import { registerPropertyElement } from './examples/property-elements.js';
import './style.css';
import { hydrateCss } from 'zerodep-css/browser';

// 必须在组件登记客户端规则前恢复 SSR 清单；CSR 页面没有清单时直接返回。
hydrateCss();

// 主示例明确开启诊断面板，框架的普通开发构建只负责 HMR。
if (import.meta.env.DEV) void import('zerodep-js/devtools').then(({ _inspect }) => _inspect());

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Missing application root.');
const mode = root.dataset.renderMode;
if (mode !== 'csr' && mode !== 'ssr') throw new Error('Missing render mode.');
registerPropertyElement();

let dispose = () => {};
let currentApp = App;
const options: MountOptions<typeof App> = {
  target: root,
  props: { mode, onUnmount: () => dispose() },
};
dispose =
  mode === 'csr'
    ? _mount(App, options)
    : _hydrate(App, {
        ...options,
        mismatch:
          new URL(location.href).searchParams.get('recover') === 'replace' ? 'replace' : 'throw',
        onMismatch(error) {
          root.dataset.hydrationError = error.code;
        },
      });
root.dataset.clientReady = 'true';
const restart = document.querySelector<HTMLButtonElement>('[data-remount]')!;
function remount() {
  dispose();
  dispose = _mount(currentApp, options);
}
restart.disabled = false;
restart.addEventListener('click', remount);
if (import.meta.hot) {
  // 开发更新重建应用并明确释放旧作用域；不猜测哪些局部状态可以迁移。
  import.meta.hot.accept('./App.js', (next) => {
    if (!next) return;
    // Vite 的模块回调不携带导出类型，在这个已知入口恢复 App 的签名。
    currentApp = next.App as typeof App;
    remount();
  });
  import.meta.hot.dispose(() => {
    restart.removeEventListener('click', remount);
    dispose();
  });
}
