import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { readFile } from 'node:fs/promises';
import { once } from 'node:events';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import sirv from 'sirv';
import type { ViteDevServer } from 'vite';

type ServerEntry = typeof import('./src/entry-server.js');

const { values } = parseArgs({
  options: {
    production: { type: 'boolean', default: false },
    port: { type: 'string' },
    'render-mode': { type: 'string', default: 'ssr' },
  },
});
const root = import.meta.dirname;
const defaultMode = values['render-mode'];
if (defaultMode !== 'csr' && defaultMode !== 'ssr') {
  throw new TypeError('--render-mode must be csr or ssr.');
}
const port = Number(values.port ?? (values.production ? 4173 : 5173));
if (!Number.isInteger(port) || port < 0 || port > 65535) {
  throw new TypeError('--port must be an integer between 0 and 65535.');
}

let vite: ViteDevServer | undefined;
let loadPage: (url: string) => Promise<{ template: string; entry: ServerEntry }>;
const assets = values.production
  ? sirv(resolve(root, 'dist/client'), { etag: true, maxAge: 31_536_000, immutable: true })
  : undefined;
const server = createServer((request, response) => {
  void handle(request, response).catch((error: unknown) => {
    if (error instanceof Error) vite?.ssrFixStacktrace(error);
    console.error(error);
    if (response.headersSent) response.destroy();
    else reply(response, 500, 'Unable to render the document.');
  });
});

if (values.production) {
  const template = await readFile(resolve(root, 'dist/client/index.html'), 'utf8');
  const entry: ServerEntry = await import(
    pathToFileURL(resolve(root, 'dist/server/entry-server.js')).href
  );
  if (typeof entry.render !== 'function') throw new Error('Missing production SSR entry.');
  loadPage = async () => ({ template, entry });
} else {
  const { createServer: createViteServer, isRunnableDevEnvironment } = await import('vite');
  vite = await createViteServer({
    root,
    appType: 'custom',
    server: { middlewareMode: true, hmr: { server } },
  });
  const development = vite;
  const environment = development.environments.ssr;
  if (!environment || !isRunnableDevEnvironment(environment))
    throw new Error('Missing runnable SSR environment.');
  loadPage = async (url) => ({
    template: await development.transformIndexHtml(
      url,
      await readFile(resolve(root, 'index.html'), 'utf8'),
    ),
    entry: (await environment.runner.import('/src/entry-server.ts')) as ServerEntry,
  });
}

function reply(response: ServerResponse, status: number, message: string) {
  response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(message);
}

async function handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    reply(response, 405, 'Method not allowed.');
    return;
  }
  const url = new URL(request.url ?? '/', 'http://127.0.0.1');
  if (url.pathname !== '/') {
    if (vite) vite.middlewares(request, response, () => reply(response, 404, 'Not found.'));
    else if (url.pathname.startsWith('/assets/') && assets) {
      assets(request, response, () => reply(response, 404, 'Not found.'));
    } else reply(response, 404, 'Not found.');
    return;
  }
  const mode = url.searchParams.get('render') ?? defaultMode;
  if (mode !== 'csr' && mode !== 'ssr') {
    reply(response, 400, 'The render query must be csr or ssr.');
    return;
  }

  const { template, entry } = await loadPage(url.pathname + url.search);
  const html = await entry.render(template, mode);
  response.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(html),
    'X-Render-Mode': mode,
  });
  response.end(request.method === 'HEAD' ? undefined : html);
}

let closing = false;
async function close() {
  if (closing) return;
  closing = true;
  await vite?.close();
  server.closeAllConnections();
  await new Promise<void>((done) => server.close(() => done()));
}
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    void close();
  });
}

server.listen(port, '127.0.0.1');
try {
  await once(server, 'listening');
} catch (error) {
  await vite?.close();
  throw error;
}
const address = server.address();
if (!address || typeof address === 'string') throw new Error('Missing HTTP server address.');
console.log(`Example ready: http://127.0.0.1:${address.port}/ (default: ${defaultMode})`);
