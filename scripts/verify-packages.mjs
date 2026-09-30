import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { access, cp, mkdir, mkdtemp, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';
import { chromium, expect } from '@playwright/test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
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
  for (const name of ['core', 'compiler', 'vite', 'ssr']) {
    const directory = resolve(root, 'packages', name);
    const sourceManifest = await json(resolve(directory, 'package.json'));
    const packed = JSON.parse(
      (await run(['pack', '--json', '--pack-destination', archives], directory)).stdout,
    );
    const files = new Set(packed.files.map((file) => file.path));
    assert(files.has('README.md'), `${name} 缺少包级说明。`);
    assert(
      [...files].every((file) => !/tsbuildinfo|(^|\/)(test|node_modules|\.codex)(\/|$)/.test(file)),
      `${name} 混入构建缓存或测试。`,
    );
    assert(
      files.has('src/index.ts') && files.has('dist/index.d.ts.map'),
      `${name} 缺少源码导航产物。`,
    );
    const file = resolve(archives, basename(packed.filename));
    await access(file);
    const dependency = 'file:' + relative(consumer, file).replaceAll('\\', '/');
    (name === 'core' || name === 'ssr' ? manifest.dependencies : manifest.devDependencies)[
      packed.name
    ] = dependency;
    manifest.pnpm.overrides[packed.name] = dependency;
    packages.set(packed.name, { files, sourceManifest });
  }
  await writeFile(resolve(consumer, 'package.json'), JSON.stringify(manifest, null, 2));
  await writeFile(
    resolve(consumer, '.npmrc'),
    'engine-strict=true\nnode-linker=isolated\nstrict-peer-dependencies=true\nauto-install-peers=false\n',
  );
  console.log('包内容清单通过，开始工作区外的独立安装。');
  await run(['install', '--ignore-scripts', '--prefer-offline']);
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
  // 先用已安装的编译器和 TS7 生成组件库，再真正打包、安装它。
  const libraryManifest = await json(resolve(consumer, 'library/package.json'));
  libraryManifest.peerDependencies['@zerodep-js/core'] =
    packages.get('@zerodep-js/core').sourceManifest.version;
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
    !clientModules.some((id) => /\/@babel\/|\/@zerodep-js\/(compiler|vite|ssr)\//.test(id)),
    '构建或服务端代码进入客户端。',
  );
  const treeModules = report.tree.flatMap((chunk) => chunk.modules);
  assert(
    !treeModules.some((id) => /\/dist\/(dom[^/]*|hydration|render|state|template)\.js$/.test(id)),
    '按需导入仍包含无关渲染器。',
  );
  assert(
    report.tree.reduce((sum, chunk) => sum + chunk.bytes, 0) < 5000,
    '数据与 untrack 导入异常膨胀。',
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
    await expect(page.locator('body')).toHaveAttribute('data-fixture-effect', 'active');
    await page.evaluate(() => window.stopFixture());
    await expect(page.locator('#app')).toBeEmpty();
    await expect(page.locator('body')).toHaveAttribute('data-fixture-effect', 'disposed');
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
