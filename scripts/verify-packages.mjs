import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import { once } from 'node:events';
import {
  access,
  cp,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rm,
  rmdir,
  unlink,
  writeFile,
} from 'node:fs/promises';
import { basename, dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs, promisify } from 'node:util';
import { chromium, expect } from '@playwright/test';
import { releasePackages as selectedPackages } from './package-list.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { values } = parseArgs({
  options: {
    registry: { type: 'boolean', default: false },
    version: { type: 'string' },
  },
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
// 消费安装连 store 也隔离，避免宿主缓存掩盖发行依赖的完整性验证。
const env = { ...process.env, CI: 'true', npm_config_store_dir: resolve(fixture, 'store') };
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
  // SDK 与平台包使用微软官方 npm 发行版，不再复制 IDE 专用平台覆盖。
  for (const name of ['typescript', 'vite', '@types/node']) {
    const version = catalog.match(new RegExp(`^  ['"]?${name}['"]?: (\\S+)$`, 'm'))?.[1];
    assert(version, `找不到 ${name} 的固定 catalog 版本。`);
    manifest.devDependencies[name] = version;
  }

  for (const item of selectedPackages) {
    const name = item.folder;
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
      assert.deepEqual(Object.keys(sourceManifest.exports), ['.'], 'core 只公开包根。');
      assert.deepEqual(
        [...files].filter((file) => /^src\/[^/]+$/.test(file)),
        ['src/index.ts'],
        'core 的 src 根目录只保留 index.ts。',
      );
      assert(
        ![...files].some((file) =>
          /^dist\/(internal|head|devtools|jsx-runtime|jsx-elements)\./.test(file),
        ),
        'core 不得包含旧入口产物。',
      );
      assert(files.has('THIRD_PARTY_NOTICES.md'), 'core 缺少生成数据的第三方许可。');
      assert(
        ![...files].some((file) => /^(src|dist)\/(router|storage)(\/|\.)/.test(file)),
        'core 包不能残留拆出能力的源码或旧构建文件。',
      );
      assert(!sourceManifest.exports['./router'] && !sourceManifest.exports['./storage']);
      assert(!sourceManifest.dependencies['zerodep-use'], 'core 不能反向依赖应用工具。');
    }
    if (name === 'compiler') {
      assert.deepEqual(Object.keys(sourceManifest.exports), ['.'], 'compiler 只公开包根。');
      assert.deepEqual(
        [...files].filter((file) => /^src\/[^/]+$/.test(file)),
        ['src/index.ts'],
        'compiler 的 src 根目录只保留 index.ts。',
      );
      assert(
        [...files]
          .filter((file) => /^dist\/[^/]+\.js$/.test(file))
          .every((file) => file === 'dist/index.js'),
        'compiler 不得携带旧的根目录实现产物。',
      );
    }
    if (name === 'css') {
      assert.deepEqual(Object.keys(sourceManifest.exports), ['.'], 'CSS 只公开包根。');
      assert.equal(sourceManifest.exports['.'].types, './dist/index.d.ts');
      const sourceEntries = new Set(
        [...files]
          .filter((file) => file.startsWith('src/'))
          .map((file) => file.slice(4).replace(/\/.*$/, '')),
      );
      assert.deepEqual(
        [...sourceEntries].sort((left, right) => left.localeCompare(right, 'en')),
        ['generated', 'index.ts', 'runtime', 'util'],
        'CSS 源码只能包含根入口和三个职责目录。',
      );
      assert(
        ![...files].some((file) => /^dist\/(author\/|theme\/|bindings\.)/.test(file)),
        'CSS 不能包含旧目录的构建残留。',
      );
      assert(
        !files.has('dist/server.js') && !files.has('dist/internal.js'),
        'CSS 不能打包旧子入口产物。',
      );
      assert(!files.has('dist/theme/theme.js'), '具体 UI 主题不属于 CSS 包。');
    }
    assert(
      [...files].every((file) => !/tsbuildinfo|(^|\/)(test|node_modules|\.codex)(\/|$)/.test(file)),
      `${name} 混入构建缓存或测试。`,
    );
    assert(
      [...files].some((file) => file.startsWith('src/')),
      `${name} 缺少源码导航产物。`,
    );
    for (const target of Object.values(sourceManifest.exports ?? {}))
      assert(files.has(target.types.slice(2) + '.map'), `${name} 缺少入口声明映射。`);
    const file = resolve(archives, basename(packed.filename));
    await access(file);
    const dependency = values.registry
      ? values.version
      : 'file:' + relative(consumer, file).replaceAll('\\', '/');
    (['core', 'css'].includes(name) ? manifest.dependencies : manifest.devDependencies)[
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
  const lock = await readFile(resolve(consumer, 'pnpm-lock.yaml'), 'utf8');
  assert(lock.includes('@babel/'), '消费安装缺少正式 Babel 编译依赖。');
  for (const host of ['zerodep-js-native', 'react', 'react-dom', 'vue', 'svelte'])
    assert.equal(
      await access(resolve(consumer, 'node_modules', host)).then(
        () => true,
        () => false,
      ),
      false,
      '消费安装不能回流定制原生 SDK 或外部宿主。',
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
    const targets = [installed.exports ?? {}];
    while (targets.length) {
      const target = targets.pop();
      if (typeof target === 'string') await access(resolve(directory, target));
      else if (target) targets.push(...Object.values(target));
    }
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
    for (const specifier of ['zerodep-js-compiler/vite', 'zerodep-js/internal', 'zerodep-js/head', 'zerodep-js/devtools', 'zerodep-js/jsx-runtime', 'zerodep-js/adapter', 'zerodep-js/router', 'zerodep-js/storage', 'zerodep-js/css', 'zerodep-js/css/internal', 'zerodep-js-css/server', 'zerodep-js-css/internal']) {
      await assert.rejects(import(specifier), { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' });
    }
    for (const specifier of ['zerodep-js-ssr', 'zerodep-js-ssr/data', 'zerodep-use', 'zerodep-use/router', 'zerodep-use/store', 'zerodep-use/history']) {
      await assert.rejects(import(specifier), { code: 'ERR_MODULE_NOT_FOUND' });
    }
    assert.equal('_createPage' in await import('zerodep-js'), false, '旧页面宿主 API 必须移除');
    assert.equal('_createScope' in await import('zerodep-js'), false, '旧 scope API 必须移除');
    const core = await import('zerodep-js');
    for (const name of ['headData', 'renderedHead', 'hasOpenBinding', 'OPEN_STATE_ATTRIBUTE', 'HTML', 'SVG', 'MATH', 'namespaceFor', 'voidTags', 'textTags', 'rawTextTags', 'elementName', 'textValue', 'textContent', 'elementText', 'nativeAttributes', 'attributeValue', 'selectionValues']) assert.equal(name in core, false, '内部 HTML/SSR 工具不再公开');
    const compiler = await import('zerodep-js-compiler');
    for (const name of ['compile', 'diagnose', 'zerodep']) assert.equal(typeof compiler[name], 'function');
    const css = await import('zerodep-js-css');
    for (const name of ['UiTheme', 'LightTheme', 'DarkTheme', 'lightTheme', 'darkTheme']) assert.equal(name in css, false);
    for (const name of ['css', 'createServerCssHost', 'withCssHost', 'hydrateCss', 'cssBinding', 'cssKeyword', 'cssResult', 'cssProps']) assert.equal(typeof css[name], 'function');
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
  for (const build of ['client', 'server', 'tree', 'cssTree'])
    assert(
      report[build].every((chunk) =>
        chunk.modules.every((id) => !/\/dist\/(dev\/|devtools\.js)/.test(id)),
      ),
      `开发检查或 HMR 代码进入 ${build} 生产构建。`,
    );
  assert(
    clientModules.some((id) => id.includes('/@zerodep-consumer/counter/')),
    '客户端没有消费预编译依赖。',
  );
  assert(
    !clientModules.some((id) =>
      /\/@babel\/|\/typescript\/|\/zerodep-js-(compiler|native|vite|ssr)\/|\/zerodep-js\/dist\/ssr\/(render|document)\.js$/.test(
        id,
      ),
    ),
    '构建或服务端代码进入客户端。',
  );
  assert(
    !clientModules.some((id) =>
      /node:async_hooks|\/zerodep-js-css\/dist\/runtime\/server\.js$/.test(id),
    ),
    'Node CSS 请求隔离实现不能进入浏览器。',
  );
  assert(
    clientModules.some((id) => id.includes('/@csstools/css-tokenizer/')),
    '样式依赖未进入实际消费构建。',
  );
  const cssModules = report.cssTree.flatMap((chunk) => chunk.modules);
  assert(
    !cssModules.some((id) =>
      /\/zerodep-js\/|\/dist\/(runtime\/(browser|server|context|bindings)|generated\/author)\.js$/.test(
        id,
      ),
    ),
    '单属性作者不应带入完整作者、框架运行时或样式宿主。',
  );
  const isolatedCss = await import(
    pathToFileURL(resolve(consumer, 'dist/css-tree/css-tree.js')).href
  );
  assert.equal(isolatedCss.red, 'color:red;');
  assert.equal(typeof isolatedCss.marker, 'string');
  const treeModules = report.tree.flatMap((chunk) => chunk.modules);
  assert(
    !treeModules.some(
      (id) =>
        /\/dist\/(dom|router|storage)\//.test(id) ||
        /\/dist\/(runtime\/(state|template)|native\/style|ssr\/(render|document)|router|storage)\.js$/.test(
          id,
        ) ||
        id.includes('/@csstools/css-tokenizer/'),
    ),
    '按需导入仍包含无关渲染器。',
  );
  // 体积用于观察，依赖隔离仍由上面的模块断言保证，不设置任意字节上限。
  console.log(
    `数据与 untrack 入口体积：${report.tree.reduce((sum, chunk) => sum + chunk.bytes, 0)} 字节。`,
  );
  assert.equal(typeof globalThis.document, 'undefined');
  const { render, page: renderPage } = await import(
    pathToFileURL(resolve(consumer, 'dist/server/server.js')).href
  );
  assert(render('<独立请求>').html.includes('&lt;独立请求&gt;'));
  assert(!render('另一个请求').html.includes('独立请求'));
  const template = await readFile(resolve(consumer, 'dist/client/index.html'), 'utf8');
  server = createServer((request, response) => {
    void (async () => {
      const url = new URL(request.url, 'http://localhost');
      if (url.pathname === '/') {
        const mode = url.searchParams.get('mode') === 'csr' ? 'csr' : 'ssr';
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.end(await renderPage(template, mode, '独立消费'));
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
    await expect(page).toHaveTitle('独立消费');
    await expect(page.locator('head meta[name=description]')).toHaveAttribute(
      'content',
      '独立包消费',
    );
    await expect(page.locator('[data-packed-css]')).toHaveCSS('width', '121px');
    const cssClass = await page.locator('[data-packed-css]').getAttribute('class');
    await page.locator('[data-packed-css-grow]').click();
    await expect(page.locator('[data-packed-css]')).toHaveCSS('width', '131px');
    assert.equal(await page.locator('[data-packed-css]').getAttribute('class'), cssClass);
    const keywordNode = page.locator('[data-packed-keyword]');
    const keywordClass = await keywordNode.getAttribute('class');
    await expect(keywordNode).toHaveCSS('color', 'rgb(36, 95, 197)');
    await expect(keywordNode).toHaveAttribute('style', /--zj-[a-z0-9-]+:#245fc5/);
    await page.locator('[data-packed-keyword-update]').click();
    await expect(keywordNode).toHaveCSS('color', 'rgb(102, 51, 153)');
    assert(!/--zj-/.test(await keywordNode.getAttribute('style')));
    await page.locator('[data-packed-keyword-update]').click();
    await expect(keywordNode).toHaveCSS('color', 'rgb(255, 255, 255)');
    assert.equal(await keywordNode.getAttribute('class'), keywordClass);
    await expect(page.locator('[data-packed-mapped-css]')).toHaveCSS('opacity', '0.5');
    await page.locator('[data-packed-mapped-update]').click();
    await expect(page.locator('[data-packed-mapped-css]')).toHaveCSS('opacity', '0.8');
    await expect(page.locator('[data-packed-portal]')).toHaveText('外层内容');
    assert(
      await page
        .locator('[data-packed-portal]')
        .evaluate((node) => node.parentNode === document.body),
    );
    assert.equal(
      await page.locator('label').getAttribute('for'),
      await page.locator('input[aria-label="消息"]').getAttribute('id'),
    );
    await expect(page.locator('[data-row]')).toHaveText(['甲', '乙']);
    await page.locator('[data-counter]').click();
    await expect(page.locator('output')).toHaveText('2');
    await page.getByLabel('消息').fill('独立输入');
    await page.locator('[data-reference-focus]').click();
    await expect(page.getByLabel('消息')).toBeFocused();
    await expect(page.locator('output')).toHaveText('独立输入');
    await page.locator('[data-lazy-open]').click();
    await expect(page.getByRole('button', { name: /^按需打包/ })).toBeVisible();
    await expect(page.locator('body')).toHaveAttribute('data-fixture-effect', 'active');
    await page.locator('[data-copy]').click();
    await expect(page.locator('output')).toHaveText('副本/甲');
    assert.equal(
      await page.evaluate(() => window.remountFixture()),
      true,
      '旧 disposer 不得撤销新根的登记。',
    );
    await expect(page.locator('body')).toHaveAttribute('data-fixture-effect', 'active');
    await page.evaluate(() => window.stopFixture());
    await expect(page.locator('#app')).toBeEmpty();
    await expect(page.locator('[data-packed-portal]')).toHaveCount(0);
    await expect(page.locator('body')).toHaveAttribute('data-fixture-effect', 'disposed');
    await expect(page.locator('body')).toHaveAttribute('data-fixture-aborted', 'true');
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
  // 只逐项清理 mkdtemp 创建的目录和私有 store；pnpm 链接本身可删，不能遍历目标。
  assert.equal(await realpath(fixture), fixture);
  const pending = [fixture];
  const directories = [];
  while (pending.length) {
    const directory = pending.pop();
    directories.push(directory);
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = resolve(directory, entry.name);
      if (entry.isDirectory() && !entry.isSymbolicLink()) pending.push(file);
      else await unlink(file);
    }
  }
  for (const directory of directories.reverse()) await rmdir(directory);
}
