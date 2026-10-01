import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { readFile } from 'node:fs/promises';
import { once } from 'node:events';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import sirv from 'sirv';
import type { ViteDevServer } from 'vite';
import { TasksDatabase, TaskFailure } from './server/tasks-database.ts';
import { handleTasksApi, taskQuery } from './server/tasks-api.ts';

type ServerEntry = typeof import('./src/entry-server.js');

const { values } = parseArgs({
  options: {
    production: { type: 'boolean', default: false },
    port: { type: 'string' },
    'render-mode': { type: 'string', default: 'ssr' },
    'tasks-file': { type: 'string', default: '.data/tasks.sqlite' },
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
type Page = 'index' | 'tasks';
let loadPage: (url: string, page: Page) => Promise<{ template: string; entry: ServerEntry }>;
let tasks: TasksDatabase | undefined;
function database(): TasksDatabase {
  return (tasks ??= new TasksDatabase(
    values['tasks-file'] === ':memory:' ? ':memory:' : resolve(root, values['tasks-file']),
  ));
}
const assets = values.production
  ? sirv(resolve(root, 'dist/client'), { etag: true, maxAge: 31_536_000, immutable: true })
  : undefined;
const server = createServer((request, response) => {
  void handle(request, response).catch((error: unknown) => {
    if (request.aborted || response.destroyed) return;
    if (error instanceof TaskFailure) {
      reply(response, error.status, error.message);
      return;
    }
    if (error instanceof Error) vite?.ssrFixStacktrace(error);
    console.error(error);
    if (response.headersSent) response.destroy();
    else reply(response, 500, 'Unable to render the document.');
  });
});
server.requestTimeout = 15_000;

if (values.production) {
  const [index, tasks] = await Promise.all(
    ['index', 'tasks'].map((page) => readFile(resolve(root, `dist/client/${page}.html`), 'utf8')),
  );
  const templates = { index: index!, tasks: tasks! };
  const entry: ServerEntry = await import(
    pathToFileURL(resolve(root, 'dist/server/entry-server.js')).href
  );
  if (typeof entry.render !== 'function') throw new Error('Missing production SSR entry.');
  loadPage = async (_url, page) => ({ template: templates[page], entry });
} else {
  const { createServer: createViteServer, isRunnableDevEnvironment } = await import('vite');
  vite = await createViteServer({
    root,
    appType: 'custom',
    server: { middlewareMode: true, ws: { server } },
  });
  const development = vite;
  const environment = development.environments.ssr;
  if (!environment || !isRunnableDevEnvironment(environment))
    throw new Error('Missing runnable SSR environment.');
  loadPage = async (url, page) => ({
    template: await development.transformIndexHtml(
      url,
      await readFile(resolve(root, `${page}.html`), 'utf8'),
    ),
    entry: (await environment.runner.import('/src/entry-server.ts')) as ServerEntry,
  });
}

function reply(response: ServerResponse, status: number, message: string) {
  response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(message);
}

async function handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
  // 本机试点只接受已知本机 Host，避免把浏览器的其他站点当作这个本地应用。
  let host: URL;
  try {
    host = new URL(`http://${request.headers.host ?? ''}`);
  } catch {
    reply(response, 403, 'Invalid local host.');
    return;
  }
  if (
    !['127.0.0.1', 'localhost'].includes(host.hostname) ||
    Number(host.port || 80) !== request.socket.localPort
  ) {
    reply(response, 403, 'Invalid local host.');
    return;
  }
  const url = new URL(request.url ?? '/', host);
  if (url.pathname === '/api/tasks' || url.pathname.startsWith('/api/tasks/')) {
    await handleTasksApi(request, response, url, database());
    return;
  }
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    reply(response, 405, 'Method not allowed.');
    return;
  }
  if (url.pathname !== '/' && url.pathname !== '/tasks') {
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

  const page = url.pathname === '/tasks' ? 'tasks' : 'index';
  const initial = page === 'tasks' ? database().list(taskQuery(url)) : undefined;
  const { template, entry } = await loadPage(url.pathname + url.search, page);
  const html = initial
    ? await entry.renderTasks(template, mode, initial)
    : await entry.render(template, mode);
  if (response.destroyed) return;
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
  try {
    await vite?.close();
  } finally {
    server.closeAllConnections();
    await new Promise<void>((done) => server.close(() => done()));
    tasks?.close();
  }
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
