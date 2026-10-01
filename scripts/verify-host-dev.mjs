import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { cp, mkdtemp, readFile, rm, writeFile, mkdir } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import { chromium, expect } from '@playwright/test';

const root = resolve(import.meta.dirname, '..');
const app = resolve(root, 'apps/hosts');
const fixture = await mkdtemp(resolve(app, '.dev-check-'));
const inside = relative(app, fixture);
assert(inside.startsWith('.dev-check-') && !inside.includes(sep));
let browser;
let server;
let output = '';
try {
  for (const file of [
    'src',
    'server.ts',
    'vite.config.ts',
    'package.json',
    'react.html',
    'vue.html',
    'svelte.html',
  ])
    await cp(resolve(app, file), resolve(fixture, file), { recursive: true });
  const config = JSON.parse(await readFile(resolve(app, 'tsconfig.json'), 'utf8'));
  config.extends = relative(fixture, resolve(root, 'tsconfig.base.json')).replaceAll('\\', '/');
  await writeFile(resolve(fixture, 'tsconfig.json'), JSON.stringify(config));
  server = spawn(process.execPath, ['server.ts', '--port', '0'], {
    cwd: fixture,
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const url = await new Promise((done, fail) => {
    const timeout = setTimeout(() => fail(new Error('开发宿主启动超时。')), 30_000);
    server.once('error', (error) => {
      clearTimeout(timeout);
      fail(error);
    });
    server.once('exit', (code) => {
      clearTimeout(timeout);
      fail(new Error(`开发宿主提前退出：${code}`));
    });
    server.stderr.on('data', (chunk) => {
      output += chunk.toString();
    });
    server.stdout.on('data', (chunk) => {
      output += chunk.toString();
      const match = output.match(/Hosts ready: (http:\/\/127\.0\.0\.1:\d+)\/vue/);
      if (match) {
        clearTimeout(timeout);
        done(match[1]);
      }
    });
  });
  browser = await chromium.launch();
  const pages = [];
  const errors = [];
  for (const host of ['vue', 'react', 'svelte']) {
    const page = await browser.newPage();
    page.on('pageerror', (error) => errors.push(`${host}: ${error.message}`));
    await page.goto(`${url}/${host}?mode=csr`);
    await expect(page.locator('[data-shared-root]')).toHaveCount(1);
    await expect(page.locator('#events')).toContainText('mount:true');
    if (host === 'react') {
      const events = (await page.locator('#events').textContent()).split(';');
      assert(
        events.filter((event) => event === 'setup').length >= 2,
        '必须实际运行开发 StrictMode。',
      );
      assert(events.includes('cleanup:true'));
    }
    await page.locator('[data-count-button]').click();
    await expect(page.locator('[data-count]')).toHaveText('1');
    pages.push(page);
  }
  const sourcePath = resolve(fixture, 'src/page/SharedPage.tsx');
  const source = await readFile(sourcePath, 'utf8');
  await writeFile(sourcePath, source.replace('共享 TSX 页面', '热更新后的共享页面'));
  for (const page of pages) {
    await expect(page.getByRole('heading', { name: '热更新后的共享页面' })).toBeVisible();
    await expect(page.locator('[data-shared-root]')).toHaveCount(1);
    await expect(page.locator('[data-count]')).toHaveText('0');
    await page.locator('[data-count-button]').click();
    await expect(page.locator('[data-count]')).toHaveText('1');
  }
  assert.deepEqual(errors, []);
  assert(
    !/Failed to run dependency scan|Failed to resolve import|Internal server error/.test(output),
    output,
  );
  console.log('开发宿主通过：React StrictMode、普通 TS 宏预扫描、三种编译器分工和共享页面热更新。');
  await rm(resolve(root, 'test-results/hosts-dev-failure.log'), { force: true });
} catch (error) {
  await mkdir(resolve(root, 'test-results'), { recursive: true });
  await writeFile(
    resolve(root, 'test-results/hosts-dev-failure.log'),
    [error.stack, output].join('\n'),
  );
  console.error(error.stack, output);
  process.exitCode = 1;
} finally {
  await browser?.close();
  if (server && server.exitCode === null && server.signalCode === null) {
    const closed = once(server, 'close');
    server.kill();
    await closed;
  }
  await rm(fixture, { recursive: true, force: true });
}
