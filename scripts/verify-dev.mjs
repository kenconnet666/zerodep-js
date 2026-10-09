import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve, relative, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium, expect } from '@playwright/test';
import { zerodep } from '../packages/compiler/dist/vite.js';

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
import { _component, _onCleanup } from 'zerodep-js';
import { createCounter } from './counter.mts';
export const App = _component(({ onDestroy }: {onDestroy?: () => void;}) => {
  ${invalid ? 'onDestroy = () => {};' : ''};
  const counter = createCounter();
  _onCleanup(() => onDestroy?.());
  return <button onClick={counter.increment}>${label}:{counter.count}</button>;
});
`;
const localSource = (label, initial = 0, failure = false, mixed = false, color = 'blue') => `
import {_component,_state,_derived,_onMount,_onCleanup,_getAbortSignal,_id} from 'zerodep-js';
import {Css} from 'zerodep-js-css';
import {css} from 'zerodep-js-css';
const s = new Css();
export const App = _component(({onDestroy}:{onDestroy?:()=>void}) => {
  let count = _state(${initial});
  let node = _state<HTMLInputElement | undefined>(undefined);
  const form = _state({name:'初始'});
  const width = _derived(count + 100);
  const className = css(s.width.px(width), s.color.raw('${color}'));
  const inputId = _id();
  _onMount(() => {
    globalThis.__boundInput = () => node;
    globalThis.__mounts=(globalThis.__mounts??0)+1;
    window.addEventListener('zerodep-probe',()=>{globalThis.__pings=(globalThis.__pings??0)+1;},
      {signal:_getAbortSignal()});
  });
  _onCleanup(()=>onDestroy?.());
  ${failure ? "throw new Error('测试初始化失败');" : ''}
  return <section data-local-css class={className}><h1>${label}</h1><label for={inputId}>姓名</label><input id={inputId} aria-label="热更新姓名" bind:this={node} bind:value={form.name}/>
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
    resolve(fixture, 'ReferenceCheck.tsx'),
    `
import {_component,_hydrate} from 'zerodep-js';
import {renderToString} from 'zerodep-js-ssr';
const Probe = _component(({capture}:{capture?: (read: () => HTMLInputElement | undefined) => void}) => {
  let node: HTMLInputElement | undefined;
  capture?.(() => node);
  return <section><input bind:this={node}/><p>expected</p></section>;
});
export function verifyReferences() {
  const target = document.createElement('div');
  document.body.append(target);
  let read = (): HTMLInputElement | undefined => undefined;
  const props = {capture: (next: typeof read) => { read = next; }};
  let failed = false;
  let stop: (()=>void) | undefined;
  try {
    const html = renderToString(Probe, {props: {}});
    target.innerHTML = html.replace('expected', 'wrong');
    try { _hydrate(Probe,{target,props}); } catch { failed = true; }
    const emptyAfterFailure = read() === undefined;
    target.innerHTML = html;
    const before = target.querySelector('input');
    stop = _hydrate(Probe,{target,props});
    const reused = read() === before && read()?.isConnected;
    stop();
    return {failed,emptyAfterFailure,reused,emptyAfterDispose:read()===undefined};
  } finally { stop?.(); target.remove(); }
}
`,
  );
  await writeFile(
    resolve(fixture, 'entry.ts'),
    `
import { _mount } from 'zerodep-js';
import { _inspect } from 'zerodep-js/devtools';
import { Css } from 'zerodep-js-css';
import { css } from 'zerodep-js-css';
import 'zerodep-js-css/internal';
import { hydrateCss } from 'zerodep-js-css';
import { App } from './App.tsx';
// 预先声明夹具随后使用的依赖，避免新增依赖触发 Vite 的整页重新优化。
void Css; void css;
hydrateCss();
_inspect();
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
    `import { renderToString } from 'zerodep-js-ssr';
import { createServerCssHost, withCssHost, serializeCssRules } from 'zerodep-js-css/server';
import { App } from './App.tsx';
export const render = () => {
  const host = createServerCssHost();
  const html = withCssHost(host, () => renderToString(App));
  return {html, styles: serializeCssRules(host.rules())};
};`,
  );
  await writeFile(
    resolve(fixture, 'hydrate.ts'),
    `
import {_hydrate} from 'zerodep-js';
import {hydrateCss} from 'zerodep-js-css';
import {App} from './App.tsx';
hydrateCss();
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
      zerodep(),
      {
        name: 'hydration-probe',
        configureServer(vite) {
          vite.middlewares.use((request, response, next) => {
            if (request.url !== '/hydrate-check') return next();
            void (async () => {
              const module = await vite.environments.ssr.runner.import('/server.ts');
              const rendered = module.render();
              const styles =
                '<style data-zerodep-css>' +
                rendered.styles.cssText +
                '</style>' +
                '<script type="application/json" data-zerodep-css>' +
                rendered.styles.manifest +
                '</script>';
              const html = await vite.transformIndexHtml(
                '/hydrate-check',
                styles +
                  '<div id="app">' +
                  rendered.html +
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
    ssr: { noExternal: ['zerodep-js', 'zerodep-js-ssr', 'zerodep-js-css'] },
  });
  await server.listen();
  const address = server.httpServer.address();
  assert(address && typeof address !== 'string');
  const environment = server.environments.ssr;
  assert(isRunnableDevEnvironment(environment));
  const first = await environment.runner.import('/server.ts');
  assert(first.render().html.includes('版本一:'));
  browser = await chromium.launch();
  const page = await browser.newPage();
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  await page.goto(`http://127.0.0.1:${address.port}/`);
  const client = server.environments.client;
  await client.depsOptimizer?.scanProcessing;
  await client.waitForRequestsIdle();
  await page.evaluate(() => {
    globalThis.__documentProbe = true;
  });
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
  assert(updated.render().html.includes('版本三:'));
  assert.deepEqual(pageErrors, []);
  await writeFile(resolve(fixture, 'App.tsx'), localSource('本地一'));
  await expect(page.locator('#app h1')).toHaveText('本地一');
  await page.getByLabel('热更新姓名').fill('热更新前的数据');
  await page.locator('[data-local-count]').click();
  await page.locator('[data-local-count]').click();
  await expect(page.locator('[data-local-css]')).toHaveCSS('width', '102px');
  await expect(page.locator('[data-local-css]')).toHaveCSS('color', 'rgb(0, 0, 255)');
  const disposals = await page.evaluate(() => globalThis.__disposals);
  await writeFile(resolve(fixture, 'App.tsx'), localSource('本地二', 0, false, false, 'red'));
  await expect(page.locator('#app h1')).toHaveText('本地二');
  await expect(page.locator('[data-local-count]')).toHaveText('2');
  await expect(page.locator('[data-local-css]')).toHaveCSS('width', '102px');
  await expect(page.locator('[data-local-css]')).toHaveCSS('color', 'rgb(255, 0, 0)');
  await expect(page.locator('style[data-zerodep-css]')).toHaveCount(1);
  await expect(page.getByLabel('热更新姓名')).toHaveValue('热更新前的数据');
  assert.equal(
    await page.locator('label').getAttribute('for'),
    await page.getByLabel('热更新姓名').getAttribute('id'),
  );
  assert(
    await page.evaluate(
      () => globalThis.__boundInput() === document.querySelector('[aria-label="热更新姓名"]'),
    ),
    'HMR 后 bind:this 必须指向新节点',
  );
  assert.deepEqual(
    await page.evaluate(async () => (await import('/ReferenceCheck.tsx')).verifyReferences()),
    {
      failed: true,
      emptyAfterFailure: true,
      reused: true,
      emptyAfterDispose: true,
    },
  );
  assert.equal(await page.evaluate(() => globalThis.__loads), 1);
  assert.equal(await page.evaluate(() => globalThis.__disposals), disposals + 1);
  await page.evaluate(() => window.dispatchEvent(new Event('zerodep-probe')));
  assert.equal(await page.evaluate(() => globalThis.__pings), 1, '旧事件监听必须被移除');
  await page.getByRole('button', { name: '开发检查', exact: true }).click();
  const inspector = page.getByRole('complementary', { name: 'zerodep 开发检查' });
  await expect(inspector).toContainText('热更新前的数据');
  // DOM 引用是资源，重建时重新绑定；计数与表单这两份普通数据继续保留。
  await expect(inspector).toContainText('保留 2/3');
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
  assert.equal(
    await page.evaluate(() => globalThis.__documentProbe),
    true,
    '兼容组件更新不能用整页重载伪装恢复',
  );
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
  assert.equal(
    await hydration.locator('label').getAttribute('for'),
    await hydration.getByLabel('热更新姓名').getAttribute('id'),
  );
  await hydration.locator('[data-local-count]').click();
  await expect(hydration.locator('[data-local-count]')).toHaveText('7');
  await expect(hydration.locator('[data-local-css]')).toHaveCSS('width', '107px');
  await expect(hydration.locator('[data-local-css]')).toHaveCSS('color', 'rgb(0, 0, 255)');
  await expect(hydration.locator('style[data-zerodep-css]')).toHaveCount(1);
  assert.deepEqual(hydrationErrors, []);
  await hydration.close();
  await page.evaluate(() => {
    globalThis.__documentProbe = true;
  });
  // 从本地组件切换为转发导出后，不能让旧的自接收边界静默留下旧页面。
  await writeFile(resolve(fixture, 'Replacement.tsx'), localSource('转发入口', 9));
  await writeFile(resolve(fixture, 'App.tsx'), "export {App} from './Replacement.tsx';");
  await expect(page.locator('#app h1')).toHaveText('转发入口');
  await expect(page.locator('[data-local-count]')).toHaveText('9');
  assert(logs.some((message) => String(message).includes('ZJ1203')));
  assert.equal(
    await page.evaluate(() => globalThis.__documentProbe),
    undefined,
    '移除最后一个本地组件后应刷新转发入口',
  );
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
