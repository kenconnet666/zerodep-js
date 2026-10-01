/** @jsxImportSource react */
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App.js';
import '../style.css';
const target = document.querySelector<HTMLElement>('#app')!;
const root =
  target.dataset.mode === 'ssr'
    ? hydrateRoot(
        target,
        <StrictMode>
          <App />
        </StrictMode>,
      )
    : createRoot(target);
if (target.dataset.mode !== 'ssr')
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
if (import.meta.hot) import.meta.hot.dispose(() => root.unmount());
