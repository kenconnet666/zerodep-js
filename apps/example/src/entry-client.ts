import '@zerodep-js/core';
import { attachExample, renderExample } from './view.js';
import './style.css';

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('Missing application root.');
const mode = root.dataset.renderMode;
if (mode !== 'csr' && mode !== 'ssr') throw new Error('Missing render mode.');

if (mode === 'csr') root.innerHTML = renderExample(mode);
const dispose = attachExample(root);
import.meta.hot?.dispose(dispose);
