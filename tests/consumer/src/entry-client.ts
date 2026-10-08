import { _mount, _hydrate } from 'zerodep-js';
import { App } from './App.js';
import { hydrateCss } from 'zerodep-css/browser';

hydrateCss();

declare global {
  interface Window {
    stopFixture: () => void;
    remountFixture: () => boolean;
  }
}

const target = document.querySelector<HTMLElement>('#app')!;
const previous = target.querySelector('[data-counter]');
const props = { title: '独立消费' };
window.stopFixture =
  target.dataset.mode === 'ssr' ? _hydrate(App, { target, props }) : _mount(App, { target, props });
target.dataset.reused = String(
  previous !== null && previous === target.querySelector('[data-counter]'),
);
target.dataset.ready = 'true';
window.remountFixture = () => {
  const old = window.stopFixture;
  old();
  const current = _mount(App, { target, props });
  old();
  let rejected = false;
  try {
    _mount(App, { target, props })();
  } catch {
    rejected = true;
  }
  window.stopFixture = current;
  return rejected;
};
