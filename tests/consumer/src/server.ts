import { renderToString } from 'zerodep-js-ssr';
import { App } from './App.js';

export const render = (title: string) => renderToString(App, { props: { title } });
