import { mount, hydrate } from '@zerodep-js/core';
import { App } from './App.js';

declare global {
  interface Window {
    stopFixture: () => void;
  }
}

const target = document.querySelector<HTMLElement>('#app')!;
const previous = target.querySelector('[data-counter]');
const props = { title: '独立消费' };
window.stopFixture =
  target.dataset.mode === 'ssr' ? hydrate(App, { target, props }) : mount(App, { target, props });
target.dataset.reused = String(
  previous !== null && previous === target.querySelector('[data-counter]'),
);
target.dataset.ready = 'true';
