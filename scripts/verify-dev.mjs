import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve, relative, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import { zerodep } from '../packages/vite/dist/index.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const example = resolve(root, 'apps/example');
const requireExample = createRequire(resolve(example, 'package.json'));
const { createServer, isRunnableDevEnvironment, createLogger } = await import(
  pathToFileURL(requireExample.resolve('vite')).href
);
const fixture = await mkdtemp(resolve(example, '.dev-check-'));
const inside = relative(example, fixture);
assert(
  inside.startsWith('.dev-check-') && !inside.includes(sep) && resolve(example, inside) === fixture,
  '拒绝使用范围外的开发夹具。',
);
const logs = [];
const logger = createLogger();
logger.error = (message) => {
  logs.push(message);
};
logger.warn = (message) => {
  logs.push(message);
};
const source = (label, invalid = false) => `
import { component, onCleanup } from 'zerodep-js';
import { createCounter } from './counter.mts';
export const App = component(({ onDestroy }: { onDestroy?: () => void }) => {
  ${invalid ? 'onDestroy = () => {};' : ''}
  const counter = createCounter();
  onCleanup(() => onDestroy?.());
  return <button onClick={counter.increment}>${label}:{counter.count}</button>;
});
`;
let server;
let browser;
try {
  await writeFile(
    resolve(fixture, 'index.html'),
    '<div id="app"></div><script type="module" src="/entry.ts"></script>',
  );
  await writeFile(resolve(fixture, 'package.json'), '{"private":true,"type":"module"}');
  await writeFile(
    resolve(fixture, 'counter.mts'),
    `
import { $state } from 'zerodep-js';
export function createCounter() {
  let count = $state(0);
  return { get count() { return count; }, increment() { count++; } };
}
`,
  );
  await writeFile(resolve(fixture, 'App.tsx'), source('版本一'));
  await writeFile(
    resolve(fixture, 'entry.ts'),
    `
import { mount } from 'zerodep-js';
import { App } from './App.tsx';
globalThis.__loads = (globalThis.__loads ?? 0) + 1;
globalThis.__disposals = 0;
const options = { target: document.querySelector('#app'), props: { onDestroy() { globalThis.__disposals++; } } };
let dispose = mount(App, options);
if (import.meta.hot) {
  import.meta.hot.accept('./App.tsx', (next) => { if (next) { dispose(); dispose = mount(next.App, options); } });
  import.meta.hot.dispose(() => dispose());
}
`,
  );
  await writeFile(
    resolve(fixture, 'server.ts'),
    `import { renderToString } from 'zerodep-js-ssr'; import { App } from './App.tsx'; export const render = () => renderToString(App);`,
  );
  server = await createServer({
    root: fixture,
    configFile: false,
    customLogger: logger,
    plugins: [zerodep()],
    cacheDir: resolve(fixture, '.cache'),
    server: {
      host: '127.0.0.1',
      port: 0,
      // 与示例的完整写入策略一致，保证连续的错误与修复都经过真实文件监听。
      watch: { awaitWriteFinish: { stabilityThreshold: 100, pollInterval: 20 } },
    },
    ssr: { noExternal: ['zerodep-js', 'zerodep-js-ssr'] },
  });
  await server.listen();
  const address = server.httpServer.address();
  assert(address && typeof address !== 'string');
  const environment = server.environments.ssr;
  assert(isRunnableDevEnvironment(environment));
  const first = await environment.runner.import('/server.ts');
  assert(first.render().includes('版本一:'));
  browser = await chromium.launch();
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.goto(`http://127.0.0.1:${address.port}/`);
  const client = server.environments.client;
  await client.depsOptimizer?.scanProcessing;
  await client.waitForRequestsIdle();
  assert.deepEqual(logs, [], '初始依赖扫描不应产生错误或警告。');
  await page.getByRole('button').click();
  await page.waitForFunction(() => document.querySelector('button')?.textContent === '版本一:1');
  await writeFile(resolve(fixture, 'App.tsx'), source('版本二'));
  await page.waitForFunction(() => document.querySelector('button')?.textContent === '版本二:0');
  assert.equal(await page.evaluate(() => globalThis.__loads), 1);
  assert.equal(await page.evaluate(() => globalThis.__disposals), 1);
  await writeFile(resolve(fixture, 'App.tsx'), source('错误版本', true));
  await page.waitForFunction(() =>
    document.querySelector('vite-error-overlay')?.shadowRoot?.textContent?.includes('ZJ1203'),
  );
  assert.equal(await page.getByRole('button').textContent(), '版本二:0');
  await writeFile(resolve(fixture, 'App.tsx'), source('版本三'));
  await page.waitForFunction(
    () =>
      document.querySelector('button')?.textContent === '版本三:0' &&
      !document.querySelector('vite-error-overlay'),
  );
  assert.equal(await page.evaluate(() => globalThis.__loads), 1);
  assert.equal(await page.evaluate(() => globalThis.__disposals), 2);
  const updated = await environment.runner.import('/server.ts');
  assert(updated.render().includes('版本三:'));
  assert.deepEqual(pageErrors, []);
  assert(logs.some((message) => String(message).includes('ZJ1203')));
  // 故意写入错误源码会产生 SSR 堆栈和客户端重载提示，但不应破坏依赖扫描。
  assert(
    !logs.some((message) => /Failed to run dependency scan|react\/jsx/.test(String(message))),
    logs.join('\n'),
  );
  await rm(resolve(root, 'test-results/dev-failure.png'), { force: true });
  console.log('开发验证通过：客户端热更新、旧作用域清理、错误覆盖层恢复、SSR Module Runner 更新。');
} catch (error) {
  if (browser) {
    const page = browser.contexts()[0]?.pages()[0];
    if (page) {
      await mkdir(resolve(root, 'test-results'), { recursive: true });
      await page.screenshot({ path: resolve(root, 'test-results/dev-failure.png') });
    }
  }
  if (logs.length) console.error(logs.slice(-4).join('\n'));
  throw error;
} finally {
  await browser?.close();
  await server?.close();
  // fixture 是创建时已核对范围的固定绝对路径，仅清理本次持有的目录。
  await rm(fixture, { recursive: true, force: true });
}
