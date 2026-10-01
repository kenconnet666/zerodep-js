import { mount, hydrate, unmount } from 'svelte';
import App from './App.svelte';
import '../style.css';
const target = document.querySelector<HTMLElement>('#app')!;
const app = (target.dataset.mode === 'ssr' ? hydrate : mount)(App, { target });
if (import.meta.hot)
  import.meta.hot.dispose(() => {
    void unmount(app);
  });
