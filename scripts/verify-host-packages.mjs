import assert from 'node:assert/strict';
import { execFile, spawn } from 'node:child_process';
import { once } from 'node:events';
import { access, cp, mkdir, mkdtemp, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { basename, isAbsolute, relative, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { parseArgs, promisify } from 'node:util';
import { chromium, expect } from '@playwright/test';
import { packages as packageList } from './package-list.mjs';

// 宿主只需要页面内核；这条独立消费专门验证不安装可选应用工具也能工作。
const packages = packageList.filter((item) => item.kind !== 'extension');

const root = resolve(import.meta.dirname, '..');
const { values } = parseArgs({
  options: { registry: { type: 'boolean', default: false }, version: { type: 'string' } },
});
if (values.registry)
  assert(
    values.version && /^\d+\.\d+\.\d+(?:-rc\.\d+)?$/.test(values.version),
    '必须指定注册表版本。',
  );
const pnpm = process.env.npm_execpath;
assert(pnpm, '请通过 pnpm test:hosts:packages 运行。');
const temporary = await realpath(tmpdir());
const fixture = await mkdtemp(resolve(temporary, 'zerodep-hosts-'));
const inside = relative(temporary, fixture);
assert(inside.startsWith('zerodep-hosts-') && !inside.includes(sep) && !isAbsolute(inside));
const consumer = resolve(fixture, 'consumer');
const archives = resolve(fixture, 'archives');
const executable = /\.[cm]?js$/.test(pnpm) ? process.execPath : pnpm;
const prefix = executable === pnpm ? [] : [pnpm];
const env = { ...process.env, CI: 'true' };
delete env.NODE_PATH;
if (values.registry) env.npm_config_registry = 'https://registry.npmjs.org/';
const exec = promisify(execFile);
const run = (args, cwd = consumer) =>
  exec(executable, [...prefix, ...args], {
    cwd,
    env,
    windowsHide: true,
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024,
  });
const json = async (path) => JSON.parse(await readFile(path, 'utf8'));
let browser;
let server;
let output = '';
try {
  await mkdir(consumer);
  await mkdir(archives);
  for (const path of [
    'src',
    'vite.config.ts',
    'server.ts',
    'react.html',
    'vue.html',
    'svelte.html',
  ])
    await cp(resolve(root, 'apps/hosts', path), resolve(consumer, path), { recursive: true });
  await cp(resolve(root, 'tsconfig.base.json'), resolve(consumer, 'tsconfig.base.json'));
  const config = await json(resolve(root, 'apps/hosts/tsconfig.json'));
  config.extends = './tsconfig.base.json';
  config.include.push('contracts/**/*.ts', 'contracts/**/*.tsx');
  await writeFile(resolve(consumer, 'tsconfig.json'), JSON.stringify(config));
  const manifest = await json(resolve(root, 'apps/hosts/package.json'));
  manifest.name = 'zerodep-host-consumer';
  manifest.packageManager = (await json(resolve(root, 'package.json'))).packageManager;
  manifest.pnpm = { overrides: {} };
  const catalog = await readFile(resolve(root, 'pnpm-workspace.yaml'), 'utf8');
  for (const group of [manifest.dependencies, manifest.devDependencies])
    for (const [name, version] of Object.entries(group))
      if (version === 'catalog:') {
        const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const selected = catalog.match(
          new RegExp(`^  ['"]?${escaped}['"]?: ([0-9.]+(?:-[0-9A-Za-z.-]+)?)$`, 'm'),
        )?.[1];
        assert(selected, `找不到 catalog：${name}`);
        group[name] = selected;
      }
  await mkdir(resolve(consumer, 'contracts'));
  for (const item of packages) {
    const directory = resolve(root, 'packages', item.folder);
    const source = await json(resolve(directory, 'package.json'));
    if (values.registry) assert.equal(source.version, values.version);
    const packed = JSON.parse(
      (await run(['pack', '--json', '--pack-destination', archives], directory)).stdout,
    );
    const files = new Set(packed.files.map((file) => file.path));
    assert(files.has('README.md') && files.has('LICENSE') && files.has('dist/index.d.ts.map'));
    if (item.kind === 'host') {
      assert.deepEqual(
        Object.keys(source.peerDependencies).sort(),
        [item.folder, 'zerodep-js'].sort(),
      );
      const extension = item.folder === 'svelte' ? 'ts' : 'tsx';
      const contract = (
        await readFile(resolve(directory, `test/types.${extension}`), 'utf8')
      ).replace('../src/index.js', item.name);
      await writeFile(resolve(consumer, `contracts/${item.folder}.${extension}`), contract);
    }
    const file = resolve(archives, basename(packed.filename));
    await access(file);
    const dependency = values.registry
      ? values.version
      : 'file:' + relative(consumer, file).replaceAll('\\', '/');
    const group = Object.hasOwn(manifest.dependencies, item.name)
      ? manifest.dependencies
      : manifest.devDependencies;
    group[item.name] = dependency;
    manifest.pnpm.overrides[item.name] = dependency;
  }
  await writeFile(resolve(consumer, 'package.json'), JSON.stringify(manifest, null, 2));
  await writeFile(
    resolve(consumer, '.npmrc'),
    'engine-strict=true\nnode-linker=isolated\nstrict-peer-dependencies=true\nauto-install-peers=false\nregistry=https://registry.npmjs.org/\n',
  );
  console.log(
    `${packages.length} 个基础/宿主包与 peer 通过，开始工作区外 ${values.registry ? 'registry' : 'tgz'} 安装。`,
  );
  await run(['install', '--ignore-scripts', '--prefer-offline']);
  assert.equal(
    await access(resolve(consumer, 'node_modules/zerodep-use')).then(
      () => true,
      () => false,
    ),
    false,
    '基础框架和宿主不能强制安装应用工具包。',
  );
  for (const item of packages) {
    const directory = resolve(consumer, 'node_modules', item.name);
    assert((await realpath(directory)).startsWith(consumer + sep), '不能链接回工作区。');
    const installed = await json(resolve(directory, 'package.json'));
    for (const target of Object.values(installed.exports))
      for (const file of Object.values(target)) await access(resolve(directory, file));
    if (item.kind === 'host') {
      const map = await json(resolve(directory, 'dist/index.d.ts.map'));
      for (const source of map.sources)
        await access(resolve(directory, 'dist', map.sourceRoot ?? '', source));
    }
  }
  await run(['run', 'check']);
  await run(['run', 'build']);
  console.log('安装后的 TS7 参数/负例与三宿主客户端、SSR 构建通过。');
  server = spawn(process.execPath, ['server.ts', '--production', '--port', '0'], {
    cwd: consumer,
    env,
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const url = await new Promise((done, fail) => {
    const timeout = setTimeout(() => fail(new Error('宿主消费服务器启动超时。')), 30_000);
    server.once('error', (error) => {
      clearTimeout(timeout);
      fail(error);
    });
    server.once('exit', (code) => {
      clearTimeout(timeout);
      fail(new Error(`宿主服务器提前退出：${code}\n${output}`));
    });
    server.stdout.on('data', (chunk) => {
      output += chunk.toString();
      const match = output.match(/Hosts ready: (http:\/\/127\.0\.0\.1:\d+)\/vue/);
      if (match) {
        clearTimeout(timeout);
        done(match[1]);
      }
    });
    server.stderr.on('data', (chunk) => {
      output += chunk.toString();
    });
  });
  browser = await chromium.launch();
  for (const host of ['vue', 'react', 'svelte'])
    for (const mode of ['csr', 'ssr']) {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(`${url}/${host}?mode=${mode}`);
      await expect(page.locator('[data-shared-root]')).toHaveCount(1);
      await page.locator('[data-count-button]').click();
      const draft = page.getByRole('textbox', { name: '页内草稿' });
      await draft.fill('独立包草稿');
      await page.getByRole('button', { name: '更改嵌套输入', exact: true }).click();
      await expect(page.locator('[data-model]')).toHaveText('初始名字/更新标签');
      await expect(page.locator('[data-count]')).toHaveText('1');
      await expect(draft).toHaveValue('独立包草稿');
      await page.getByRole('button', { name: '更换页面入口', exact: true }).click();
      await expect(page.locator('[data-count]')).toHaveText('0');
      await page.getByRole('button', { name: '卸载页面', exact: true }).click();
      await expect(page.locator('[data-shared-root]')).toHaveCount(0);
      await expect(page.locator('#events')).toContainText('cleanup:true');
      assert.deepEqual(errors, []);
      await page.close();
    }
  console.log(
    '三适配包独立消费通过：同一 TSX/普通 TS 页面、CSR、宿主 SSR 接管、更新、重建和清理。',
  );
  await rm(resolve(root, 'test-results/hosts-package-failure.log'), { force: true });
} catch (error) {
  const details = [error.stack, error.stdout, error.stderr, output].filter(Boolean).join('\n');
  await mkdir(resolve(root, 'test-results'), { recursive: true });
  await writeFile(resolve(root, 'test-results/hosts-package-failure.log'), details);
  console.error(details);
  process.exitCode = 1;
} finally {
  await browser?.close();
  if (server && server.exitCode === null && server.signalCode === null) {
    const closed = once(server, 'close');
    server.kill();
    await closed;
  }
  // 仅清理由本次 mkdtemp 创建并核对范围的目录，保留共享 store。
  await rm(fixture, { recursive: true, force: true });
}
