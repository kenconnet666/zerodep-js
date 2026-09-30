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
import.meta.hot?.dispose(dispose);
