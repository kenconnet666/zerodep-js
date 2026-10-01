import { createApp, createSSRApp } from 'vue';
import App from './App.vue';
import '../style.css';
const target = document.querySelector<HTMLElement>('#app')!;
const app = (target.dataset.mode === 'ssr' ? createSSRApp : createApp)(App);
app.mount(target);
if (import.meta.hot) import.meta.hot.dispose(() => app.unmount());
