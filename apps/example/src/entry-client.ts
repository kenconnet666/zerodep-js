import { mount } from '@zerodep-js/core';
import { App } from './App.js';
import { attachExample } from './view.js';
import './style.css';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Missing application root.');
const mode = root.dataset.renderMode;
if (mode !== 'csr' && mode !== 'ssr') throw new Error('Missing render mode.');

const dispose =
  mode === 'csr' ? mount(App, { target: root, props: { mode } }) : attachExample(root);
root.dataset.clientReady = 'true';
import.meta.hot?.dispose(dispose);
