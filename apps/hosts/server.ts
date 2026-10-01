import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import sirv from 'sirv';
import type { ViteDevServer } from 'vite';
import type { Host } from './src/shared.ts';

type Entry = typeof import('./src/entry-server.js');
const { values } = parseArgs({
  options: { production: { type: 'boolean', default: false }, port: { type: 'string' } },
});
const root = import.meta.dirname;
const port = Number(values.port ?? (values.production ? 4177 : 5174));
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('端口无效。');
let vite: ViteDevServer | undefined;
let production: Entry | undefined;
const assets = values.production ? sirv(resolve(root, 'dist/client'), { etag: true }) : undefined;
const server = createServer((request, response) => {
  void (async () => {
    const url = new URL(request.url ?? '/', `http://127.0.0.1:${port}`);
    const selected = url.pathname === '/' ? 'vue' : url.pathname.slice(1).replace(/\.html$/, '');
    if (!['vue', 'react', 'svelte'].includes(selected)) {
      const missing = () => {
        response.writeHead(404);
        response.end('Not found');
      };
      if (vite) vite.middlewares(request, response, missing);
      else if (assets) assets(request, response, missing);
      else missing();
      return;
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      response.end();
      return;
    }
    const host = selected as Host;
    const mode = url.searchParams.get('mode') ?? 'ssr';
    if (mode !== 'ssr' && mode !== 'csr') {
      response.writeHead(400);
      response.end('模式无效');
      return;
    }
    let template = await readFile(
      resolve(root, values.production ? `dist/client/${host}.html` : `${host}.html`),
      'utf8',
    );
    let entry = production;
    if (vite) {
      template = await vite.transformIndexHtml(url.pathname + url.search, template);
      const { isRunnableDevEnvironment } = await import('vite');
      const environment = vite.environments.ssr;
      if (!environment || !isRunnableDevEnvironment(environment))
        throw new Error('缺少 SSR 环境。');
      entry = (await environment.runner.import('/src/entry-server.ts')) as Entry;
    }
    // render 必须在响应前完成；三个宿主均只输出页面的空容器。
    const rendered = mode === 'ssr' ? await entry!.render(host) : '';
    const document = template.replace('__MODE__', mode).replace('<!--app-->', () => rendered);
    if (response.destroyed) return;
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    });
    response.end(request.method === 'HEAD' ? undefined : document);
  })().catch((error: unknown) => {
    console.error(error);
    if (!response.headersSent) response.writeHead(500);
    response.end('页面加载失败。');
  });
});
if (values.production)
  production = (await import(
    pathToFileURL(resolve(root, 'dist/server/entry-server.js')).href
  )) as Entry;
else {
  const { createServer: createViteServer } = await import('vite');
  vite = await createViteServer({
    root,
    appType: 'custom',
    server: { middlewareMode: true, ws: { server } },
  });
}
let closing = false;
for (const signal of ['SIGINT', 'SIGTERM'] as const)
  process.once(signal, () => {
    if (closing) return;
    closing = true;
    void vite?.close().finally(() => {
      server.closeAllConnections();
      server.close();
    });
    if (!vite) {
      server.closeAllConnections();
      server.close();
    }
  });
server.listen(port, '127.0.0.1', () => {
  const address = server.address();
  if (address && typeof address !== 'string')
    console.log(`Hosts ready: http://127.0.0.1:${address.port}/vue`);
});
