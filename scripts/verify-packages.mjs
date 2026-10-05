import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { access, cp, mkdir, mkdtemp, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs, promisify } from 'node:util';
import { chromium, expect } from '@playwright/test';
import { packages as packageList } from './package-list.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { values } = parseArgs({
  options: { registry: { type: 'boolean', default: false }, version: { type: 'string' } },
});
if (values.registry)
  assert(
    values.version && /^\d+\.\d+\.\d+(?:-rc\.\d+)?$/.test(values.version),
    '注册表消费需要明确版本。',
  );
const pnpm = process.env.npm_execpath;
assert(pnpm, '请通过 pnpm test:packages 运行，以使用当前固定版本的包管理器。');
const temporary = await realpath(tmpdir());
const fixture = await mkdtemp(resolve(temporary, 'zerodep-pack-'));
const inside = relative(temporary, fixture);
assert(inside.startsWith('zerodep-pack-') && !inside.includes(sep) && !isAbsolute(inside));
const consumer = resolve(fixture, 'consumer');
const archives = resolve(fixture, 'archives');
const executable = /\.[cm]?js$/.test(pnpm) ? process.execPath : pnpm;
const prefix = executable === pnpm ? [] : [pnpm];
const env = { ...process.env, CI: 'true' };
if (values.registry) env.npm_config_registry = 'https://registry.npmjs.org/';
delete env.NODE_PATH;
const exec = promisify(execFile);
async function run(args, cwd = consumer) {
  return exec(executable, [...prefix, ...args], {
    cwd,
    env,
    windowsHide: true,
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024,
  });
}
async function json(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}
const packages = new Map();
let server;
let browser;

try {
  await mkdir(archives);
  await cp(resolve(root, 'tests/consumer'), consumer, { recursive: true });
  const manifest = await json(resolve(consumer, 'package.json'));
  const workspace = await json(resolve(root, 'package.json'));
  manifest.packageManager = workspace.packageManager;
  manifest.dependencies = {};
  manifest.devDependencies = {};
  manifest.pnpm = { overrides: {} };
  const catalog = await readFile(resolve(root, 'pnpm-workspace.yaml'), 'utf8');
  // 只读取本项目已有的固定数字版本，不引入另一套版本列表或 YAML 依赖。
  for (const name of ['typescript', 'vite', '@types/node']) {
    const version = catalog.match(new RegExp(`^  ['"]?${name}['"]?: ([0-9.]+)$`, 'm'))?.[1];
    assert(version, `找不到 ${name} 的固定 catalog 版本。`);
    manifest.devDependencies[name] = version;
  }
  for (const { folder: name } of packageList.filter((item) => item.kind !== 'host')) {
    const directory = resolve(root, 'packages', name);
    const sourceManifest = await json(resolve(directory, 'package.json'));
    if (values.registry)
      assert.equal(sourceManifest.version, values.version, '注册表验证版本与当前源码不同。');
    const packed = JSON.parse(
      (await run(['pack', '--json', '--pack-destination', archives], directory)).stdout,
    );
    const files = new Set(packed.files.map((file) => file.path));
    assert(files.has('README.md'), `${name} 缺少包级说明。`);
    assert(
      files.has('LICENSE') && sourceManifest.license === 'MIT',
      `${name} 缺少 MIT 许可声明或文件。`,
    );
    assert.equal(
      await readFile(resolve(directory, 'LICENSE'), 'utf8'),
      await readFile(resolve(root, 'LICENSE'), 'utf8'),
      `${name} 的许可证与项目根不一致。`,
    );
    if (name === 'core') {
      assert(files.has('THIRD_PARTY_NOTICES.md'), 'core 缺少生成数据的第三方许可。');
      assert(
        ![...files].some((file) => /^(src|dist)\/(router|storage)(\/|\.)/.test(file)),
        'core 包不能残留拆出能力的源码或旧构建文件。',
      );
      assert(!sourceManifest.exports['./router'] && !sourceManifest.exports['./storage']);
      assert(!sourceManifest.dependencies['zerodep-use'], 'core 不能反向依赖应用工具。');
    }
    if (name === 'use') {
      assert.deepEqual(Object.keys(sourceManifest.exports).sort(), [
        './history',
        './router',
        './storage',
      ]);
      assert.deepEqual(Object.keys(sourceManifest.peerDependencies), ['zerodep-js']);
      assert.equal(Object.keys(sourceManifest.dependencies ?? {}).length, 0);
    }
    assert(
      [...files].every((file) => !/tsbuildinfo|(^|\/)(test|node_modules|\.codex)(\/|$)/.test(file)),
      `${name} 混入构建缓存或测试。`,
    );
    assert(
      [...files].some((file) => file.startsWith('src/')),
      `${name} 缺少源码导航产物。`,
    );
    for (const target of Object.values(sourceManifest.exports))
      assert(files.has(target.types.slice(2) + '.map'), `${name} 缺少入口声明映射。`);
    const file = resolve(archives, basename(packed.filename));
    await access(file);
    const dependency = values.registry
      ? values.version
      : 'file:' + relative(consumer, file).replaceAll('\\', '/');
    (['core', 'ssr', 'use'].includes(name) ? manifest.dependencies : manifest.devDependencies)[
      packed.name
    ] = dependency;
    manifest.pnpm.overrides[packed.name] = dependency;
    packages.set(packed.name, { files, sourceManifest });
  }
  await writeFile(resolve(consumer, 'package.json'), JSON.stringify(manifest, null, 2));
  await writeFile(
    resolve(consumer, '.npmrc'),
    'engine-strict=true\nnode-linker=isolated\nstrict-peer-dependencies=true\nauto-install-peers=false\n' +
      (values.registry ? 'registry=https://registry.npmjs.org/\n' : ''),
  );
  console.log(`包内容清单通过，开始工作区外的${values.registry ? '注册表' : 'tgz'}独立安装。`);
  await run(['install', '--ignore-scripts', '--prefer-offline']);
  for (const host of ['react', 'vue', 'svelte'])
    assert.equal(
      await access(resolve(consumer, 'node_modules', host)).then(
        () => true,
        () => false,
      ),
      false,
      '独立框架消费不能强制安装宿主。',
    );
  for (const [name, { files, sourceManifest }] of packages) {
    const directory = resolve(consumer, 'node_modules', name);
    const installedPath = await realpath(directory);
    assert(installedPath.startsWith(consumer + sep), `${name} 仍链接到工作区。`);
    const installed = await json(resolve(directory, 'package.json'));
    assert.equal(installed.version, sourceManifest.version);
    for (const kind of ['dependencies', 'peerDependencies', 'optionalDependencies'])
      for (const version of Object.values(installed[kind] ?? {}))
        assert(
          !/^(workspace:|catalog:|link:|file:)/.test(version),
          `${name} 的 ${kind} 含本地协议。`,
        );
    for (const target of Object.values(installed.exports))
      for (const file of Object.values(target)) await access(resolve(directory, file));
    for (const file of files)
      if (file.endsWith('.map')) {
        const map = await json(resolve(directory, file));
        for (const source of map.sources)
          await access(resolve(directory, dirname(file), map.sourceRoot ?? '', source));
      }
  }
  // 真正用 Node 的包解析验证边界，避免工作区工具对不存在的旧入口作隐式回退。
  await exec(
    process.execPath,
    [
      '--input-type=module',
      '--eval',
      `
    import assert from 'node:assert/strict';
    import { _createRoot, _flushSync } from 'zerodep-js';
    import { _persistLocal } from 'zerodep-use/storage';
    import { _createRouter } from 'zerodep-use/router';
    for (const specifier of ['zerodep-js/router', 'zerodep-js/storage', 'zerodep-use']) {
      await assert.rejects(import(specifier), { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' });
    }
    assert.equal(typeof _createRouter, 'function');
    _createRoot(dispose => {
      try {
        const persistence = _persistLocal('probe', { n: 0 }, {
          storage: { getItem: () => null, setItem() {}, removeItem() {} },
        });
        _flushSync();
        assert.equal(persistence.ready, true, 'use 必须共享调用方的 core 所有权和调度器');
      } finally { dispose(); }
    });
  `,
    ],
    { cwd: consumer, env, windowsHide: true, encoding: 'utf8' },
  );
  // 先用已安装的编译器和 TS7 生成组件库，再真正打包、安装它。
  const libraryManifest = await json(resolve(consumer, 'library/package.json'));
  libraryManifest.peerDependencies['zerodep-js'] =
    packages.get('zerodep-js').sourceManifest.version;
  await writeFile(
    resolve(consumer, 'library/package.json'),
    JSON.stringify(libraryManifest, null, 2),
  );
  await run(['run', 'library']);
  const library = JSON.parse(
    (await run(['pack', '--json', '--pack-destination', archives], resolve(consumer, 'library')))
      .stdout,
  );
  await run([
    'add',
    '--ignore-scripts',
    '--prefer-offline',
    'file:' +
      relative(consumer, resolve(archives, basename(library.filename))).replaceAll('\\', '/'),
  ]);
  await run(['run', 'check']);
  console.log('独立安装、声明、泛型/事件类型与预编译组件库通过。');
  await run(['run', 'build']);
  const report = await json(resolve(consumer, 'dist/build-report.json'));
  const clientModules = report.client.flatMap((chunk) => chunk.modules);
  assert(
    clientModules.some((id) => id.includes('/@zerodep-consumer/counter/')),
    '客户端没有消费预编译依赖。',
  );
  assert(
    !clientModules.some((id) => /\/@babel\/|\/zerodep-js-(compiler|vite|ssr)\//.test(id)),
    '构建或服务端代码进入客户端。',
  );
  assert(
    clientModules.some((id) => id.includes('/@csstools/css-tokenizer/')),
    '样式依赖未进入实际消费构建。',
  );
  const treeModules = report.tree.flatMap((chunk) => chunk.modules);
  assert(
    !treeModules.some(
      (id) =>
        /\/dist\/(dom|router|storage)\//.test(id) ||
        /\/dist\/(runtime\/(state|template)|native\/style|router|storage)\.js$/.test(id) ||
        id.includes('/@csstools/css-tokenizer/'),
    ),
    '按需导入仍包含无关渲染器。',
  );
  // 体积用于观察，依赖隔离仍由上面的模块断言保证，不设置任意字节上限。
  console.log(
    `数据与 untrack 入口体积：${report.tree.reduce((sum, chunk) => sum + chunk.bytes, 0)} 字节。`,
  );
  assert.equal(typeof globalThis.document, 'undefined');
  const { render } = await import(pathToFileURL(resolve(consumer, 'dist/server/server.js')).href);
  assert(render('<独立请求>').includes('&lt;独立请求&gt;'));
  assert(!render('另一个请求').includes('独立请求'));
  const template = await readFile(resolve(consumer, 'dist/client/index.html'), 'utf8');
  server = createServer((request, response) => {
    void (async () => {
      const url = new URL(request.url, 'http://localhost');
      if (url.pathname === '/') {
        const mode = url.searchParams.get('mode') === 'csr' ? 'csr' : 'ssr';
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.end(
          template
            .replace('__MODE__', mode)
            .replace('<!--app-->', mode === 'ssr' ? render('独立消费') : ''),
        );
      } else {
        assert(/^\/assets\/[\w.-]+$/.test(url.pathname));
        response.setHeader(
          'Content-Type',
          url.pathname.endsWith('.css') ? 'text/css' : 'text/javascript',
        );
        response.end(await readFile(resolve(consumer, 'dist/client', '.' + url.pathname)));
      }
    })().catch((error) => {
      response.statusCode = 500;
      response.end(String(error));
    });
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  assert(address && typeof address !== 'string');
  browser = await chromium.launch();
  for (const mode of ['csr', 'ssr']) {
    const page = await browser.newPage();
    const failures = [];
    page.on('pageerror', (error) => failures.push(error.message));
    await page.goto(`http://127.0.0.1:${address.port}/?mode=${mode}`);
    await expect(page.locator('#app')).toHaveAttribute('data-ready', 'true');
    await expect(page.locator('#app')).toHaveAttribute('data-reused', String(mode === 'ssr'));
    await expect(page.locator('h1')).toHaveText('独立消费');
    await expect(page.locator('[data-row]')).toHaveText(['甲', '乙']);
    await page.locator('[data-counter]').click();
    await expect(page.locator('output')).toHaveText('2');
    await page.getByLabel('消息').fill('独立输入');
    await expect(page.locator('output')).toHaveText('独立输入');
    await page.locator('[data-history-commit]').click();
    await page.getByLabel('消息').fill('下一次输入');
    await page.locator('[data-history-commit]').click();
    await page.locator('[data-history-undo]').click();
    await expect(page.getByLabel('消息')).toHaveValue('独立输入');
    await page.locator('[data-history-redo]').click();
    await expect(page.getByLabel('消息')).toHaveValue('下一次输入');
    await page.locator('[data-lazy-open]').click();
    await expect(page.getByRole('button', { name: /^按需打包/ })).toBeVisible();
    await expect(page.locator('body')).toHaveAttribute('data-fixture-effect', 'active');
    await page.locator('[data-copy]').click();
    await expect(page.locator('output')).toHaveText('副本/甲');
    await page.locator('[data-open-router]').click();
    await expect(page.locator('[data-route-id]')).toHaveText('start');
    await page.getByRole('link', { name: '下一页' }).click();
    await expect(page.locator('[data-route-id]')).toHaveText('next');
    await expect(page.locator('[data-route-initial]')).toHaveText('start');
    await page.getByRole('link', { name: '记录一' }).click();
    await expect(page.locator('[data-route-initial]')).toHaveText('one');
    await page.getByRole('link', { name: '记录二' }).click();
    await expect(page.locator('[data-route-initial]')).toHaveText('two');
    assert.equal(
      await page.evaluate(() => window.remountFixture()),
      true,
      '旧 disposer 不得撤销新根的登记。',
    );
    await expect(page.locator('body')).toHaveAttribute('data-fixture-effect', 'active');
    await page.evaluate(() => window.stopFixture());
    await expect(page.locator('#app')).toBeEmpty();
    await expect(page.locator('body')).toHaveAttribute('data-fixture-effect', 'disposed');
    await expect(page.locator('body')).toHaveAttribute('data-fixture-aborted', 'true');
    assert.equal(
      await page.evaluate(() => JSON.parse(localStorage.getItem('package-message')).value),
      '副本/甲',
    );
    assert.deepEqual(failures, []);
    await page.close();
  }
  console.log(
    `包消费验证通过：CSR、SSR、节点接管、表单、卸载及按需打包（小入口 ${report.tree.reduce((sum, chunk) => sum + chunk.bytes, 0)} 字节）。`,
  );
  await rm(resolve(root, 'test-results/packages-failure.log'), { force: true });
} catch (error) {
  await mkdir(resolve(root, 'test-results'), { recursive: true });
  const details = [error.stack, error.stdout, error.stderr].filter(Boolean).join('\n');
  await writeFile(resolve(root, 'test-results/packages-failure.log'), details);
  console.error(details);
  process.exitCode = 1;
} finally {
  await browser?.close();
  if (server) {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
  // mkdtemp 创建且已核对范围的绝对路径；不清理共享 pnpm store 或工作区依赖。
  await rm(fixture, { recursive: true, force: true });
}
