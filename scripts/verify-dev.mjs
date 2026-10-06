import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve, relative, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium, expect } from '@playwright/test';
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
const compiler = process.env.ZERODEP_COMPILER ?? 'babel';
assert(['babel', 'native'].includes(compiler));
const logger = createLogger();
logger.error = (message) => {
  logs.push(message);
};
logger.warn = (message) => {
  logs.push(message);
};
const source = (label, invalid = false) => `
import { _component, _onCleanup } from 'zerodep-js';
import { createCounter } from './counter.mts';
export const App = _component(({ onDestroy }: {onDestroy?: () => void;}) => {
  ${invalid ? 'onDestroy = () => {};' : ''};
  const counter = createCounter();
  _onCleanup(() => onDestroy?.());
  return <button onClick={counter.increment}>${label}:{counter.count}</button>;
});
`;
const localSource = (label, initial = 0, failure = false, mixed = false) => `
import {_component,_state,_onMount,_onCleanup,_getAbortSignal} from 'zerodep-js';
export const App = _component(({onDestroy}:{onDestroy?:()=>void}) => {
  let count = _state(${initial});
  const form = _state({name:'初始'});
  _onMount(() => {
    globalThis.__mounts=(globalThis.__mounts??0)+1;
    window.addEventListener('zerodep-probe',()=>{globalThis.__pings=(globalThis.__pings??0)+1;},
      {signal:_getAbortSignal()});
  });
  _onCleanup(()=>onDestroy?.());
  ${failure ? "throw new Error('测试初始化失败');" : ''}
  return <section><h1>${label}</h1><input aria-label="热更新姓名" bind:value={form.name}/>
    <button data-local-count onClick={()=>count++}>{count}</button></section>;
});
${mixed ? 'export const extra = 1;' : ''}
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
import { _state } from 'zerodep-js';
export function createCounter() {
  let count = _state(0);
  return { get count() {return count;}, increment() {count++;} };
}
`,
  );
  await writeFile(resolve(fixture, 'App.tsx'), source('版本一'));
  await writeFile(
    resolve(fixture, 'entry.ts'),
    `
import { _mount } from 'zerodep-js';
import { App } from './App.tsx';
globalThis.__loads = (globalThis.__loads ?? 0) + 1;
globalThis.__disposals = 0;
const options = { target: document.querySelector('#app'), props: { onDestroy() {globalThis.__disposals++;} } };
let dispose = _mount(App, options);
if (import.meta.hot) {
  import.meta.hot.accept('./App.tsx', (next) => {if (next) {dispose();dispose = _mount(next.App, options);}});
  import.meta.hot.dispose(() => dispose());
}
`,
  );
  await writeFile(
    resolve(fixture, 'server.ts'),
    `import { renderToString } from 'zerodep-js-ssr'; import { App } from './App.tsx'; export const render = () => renderToString(App);`,
  );
  await writeFile(
    resolve(fixture, 'hydrate.ts'),
    `
import {_hydrate} from 'zerodep-js';
import {App} from './App.tsx';
const target=document.querySelector('#app');
const before=target.querySelector('input');
const stop=_hydrate(App,{target});
globalThis.__hydrated=before===target.querySelector('input');
if(import.meta.hot)import.meta.hot.dispose(stop);
`,
  );
  server = await createServer({
    root: fixture,
    configFile: false,
    customLogger: logger,
    plugins: [
      // 这些运行时/HMR 夹具含故意的动态全局，不把它们当作项目类型检查用例。
      zerodep({ compiler, typeCheck: false }),
      {
        name: 'hydration-probe',
        configureServer(vite) {
          vite.middlewares.use((request, response, next) => {
            if (request.url !== '/hydrate-check') return next();
            void (async () => {
              const module = await vite.environments.ssr.runner.import('/server.ts');
              const html = await vite.transformIndexHtml(
                '/hydrate-check',
                '<div id="app">' +
                  module.render() +
                  '</div><script type="module" src="/hydrate.ts"></script>',
              );
              response.setHeader('content-type', 'text/html;charset=utf-8');
              response.end(html);
            })().catch((error) => {
              response.statusCode = 500;
              response.end(String(error));
            });
          });
        },
      },
    ],
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
  await page.locator('#app').getByRole('button').click();
  await page.waitForFunction(() => document.querySelector('button')?.textContent === '版本一:1');
  await writeFile(resolve(fixture, 'App.tsx'), source('版本二'));
  await page.waitForFunction(() => document.querySelector('button')?.textContent === '版本二:0');
  assert.equal(await page.evaluate(() => globalThis.__loads), 1);
  assert.equal(await page.evaluate(() => globalThis.__disposals), 1);
  await writeFile(resolve(fixture, 'App.tsx'), source('错误版本', true));
  await page.waitForFunction(() =>
    document.querySelector('vite-error-overlay')?.shadowRoot?.textContent?.includes('ZJ1203'),
  );
  assert.equal(await page.locator('#app').getByRole('button').textContent(), '版本二:0');
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
  await writeFile(resolve(fixture, 'App.tsx'), localSource('本地一'));
  await expect(page.locator('#app h1')).toHaveText('本地一');
  await page.getByLabel('热更新姓名').fill('热更新前的数据');
  await page.locator('[data-local-count]').click();
  await page.locator('[data-local-count]').click();
  const disposals = await page.evaluate(() => globalThis.__disposals);
  await writeFile(resolve(fixture, 'App.tsx'), localSource('本地二'));
  await expect(page.locator('#app h1')).toHaveText('本地二');
  await expect(page.locator('[data-local-count]')).toHaveText('2');
  await expect(page.getByLabel('热更新姓名')).toHaveValue('热更新前的数据');
  assert.equal(await page.evaluate(() => globalThis.__loads), 1);
  assert.equal(await page.evaluate(() => globalThis.__disposals), disposals + 1);
  await page.evaluate(() => window.dispatchEvent(new Event('zerodep-probe')));
  assert.equal(await page.evaluate(() => globalThis.__pings), 1, '旧事件监听必须被移除');
  await page.getByRole('button', { name: '开发检查', exact: true }).click();
  const inspector = page.getByRole('complementary', { name: 'zerodep 开发检查' });
  await expect(inspector).toContainText('热更新前的数据');
  await expect(inspector).toContainText('保留 2/2');
  await inspector.getByRole('button', { name: '重新初始化此组件' }).click();
  await expect(page.locator('[data-local-count]')).toHaveText('0');
  await expect(page.getByLabel('热更新姓名')).toHaveValue('初始');
  await writeFile(resolve(fixture, 'App.tsx'), localSource('初值改变', 5));
  await expect(page.locator('#app h1')).toHaveText('初值改变');
  await expect(page.locator('[data-local-count]')).toHaveText('5');
  await expect(inspector).toContainText('状态声明改变');
  await writeFile(resolve(fixture, 'App.tsx'), localSource('执行失败', 5, true));
  await page.waitForFunction(() =>
    window.__ZERODEP_DEVTOOLS__
      .snapshot()
      .events.some((event) => event.type === 'error' && event.message.includes('测试初始化失败')),
  );
  await expect(page.locator('#app h1')).toHaveText('初值改变');
  await writeFile(resolve(fixture, 'App.tsx'), localSource('修复执行', 5));
  await expect(page.locator('#app h1')).toHaveText('修复执行');
  await expect(page.locator('[data-local-count]')).toHaveText('5');
  // 增加非组件导出后不再作为自接收边界；入口的常规重建仍能取得新定义。
  await writeFile(resolve(fixture, 'App.tsx'), localSource('导出变化', 6, false, true));
  await expect(page.locator('#app h1')).toHaveText('导出变化');
  await expect(page.locator('[data-local-count]')).toHaveText('6');
  assert.equal(await page.evaluate(() => globalThis.__loads), 1);
  const inspected = await page.evaluate(() => window.__ZERODEP_DEVTOOLS__.snapshot());
  assert.equal(inspected.components.length, 1, '热更新和失败恢复后不能遗留旧实例');
  assert(inspected.events.length <= 200);
  assert(
    pageErrors.every((message) => message.includes('测试初始化失败')),
    pageErrors.join('\n'),
  );
  const hydration = await browser.newPage();
  const hydrationErrors = [];
  hydration.on('pageerror', (error) => hydrationErrors.push(error.message));
  await hydration.goto(`http://127.0.0.1:${address.port}/hydrate-check`);
  await hydration.waitForFunction(() => globalThis.__hydrated === true);
  await hydration.getByLabel('热更新姓名').fill('开发态接管');
  await hydration.locator('[data-local-count]').click();
  await expect(hydration.locator('[data-local-count]')).toHaveText('7');
  assert.deepEqual(hydrationErrors, []);
  await hydration.close();
  // 从本地组件切换为转发导出后，不能让旧的自接收边界静默留下旧页面。
  await writeFile(resolve(fixture, 'Replacement.tsx'), localSource('转发入口', 9));
  await writeFile(resolve(fixture, 'App.tsx'), "export {App} from './Replacement.tsx';");
  await expect(page.locator('#app h1')).toHaveText('转发入口');
  await expect(page.locator('[data-local-count]')).toHaveText('9');
  assert(logs.some((message) => String(message).includes('ZJ1203')));
  // 故意写入错误源码会产生 SSR 堆栈和客户端重载提示，但不应破坏依赖扫描。
  assert(
    !logs.some((message) => /Failed to run dependency scan|react\/jsx/.test(String(message))),
    logs.join('\n'),
  );
  await rm(resolve(root, 'test-results/dev-failure.png'), { force: true });
  console.log(
    '开发验证通过：状态保留/重置、事件释放、编译/执行错误恢复、导出变化、检查面板及开发态 SSR 接管。',
  );
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
