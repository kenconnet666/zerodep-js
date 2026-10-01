import { createSSRApp } from 'vue';
import { renderToString as renderVue } from '@vue/server-renderer';
import { createElement } from 'react';
import { renderToString as renderReact } from 'react-dom/server';
import { render as renderSvelte } from 'svelte/server';
import VueApp from './vue/App.vue';
import { App as ReactApp } from './react/App.js';
import SvelteApp from './svelte/App.svelte';
import type { Host } from './shared.js';

export async function render(host: Host): Promise<string> {
  if (host === 'vue') return renderVue(createSSRApp(VueApp));
  if (host === 'react') return renderReact(createElement(ReactApp));
  return renderSvelte(SvelteApp).body;
}
