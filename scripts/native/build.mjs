import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { cp, mkdir, mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { parseArgs, promisify } from 'node:util';
import { nativeInputs } from './inputs.mjs';
import { platforms } from './platforms.mjs';

const root = resolve(import.meta.dirname, '../..');
const { values } = parseArgs({
  options: {
    source: { type: 'string' },
    go: { type: 'string', default: 'go' },
    test: { type: 'boolean', default: false },
    platform: { type: 'string' },
  },
});
assert(values.source, '用 --source 指定 TypeScript 源码检出。');
const source = resolve(values.source);
const { target, goSource, patches, sourceHash, version } = nativeInputs(root);
const hostPlatform = `${process.platform}-${process.arch}`;
const platform = values.platform ?? hostPlatform;
const targetPlatform = platforms.find((item) => item.platform === platform);
assert(targetPlatform, `不支持的原生平台：${platform}`);
const packageRoot = resolve(root, 'packages/native-' + platform);
const destination = resolve(packageRoot, 'typescript');
assert(!values.test || platform === hostPlatform, '交叉构建不能在宿主执行目标平台测试。');
const executable = platform.startsWith('win32') ? 'tsc.exe' : 'tsc';
const require = createRequire(resolve(root, 'package.json'));
const tsManifest = require.resolve('typescript/package.json');
const ts = JSON.parse(await readFile(tsManifest, 'utf8'));
assert.equal(ts.version, target.version);
const platformRoot = dirname(
  createRequire(tsManifest).resolve(`@typescript/typescript-${hostPlatform}/package.json`),
);
const execute = promisify(execFile);
const env = {
  ...process.env,
  GOTOOLCHAIN: 'local',
  GOWORK: 'off',
  CGO_ENABLED: '0',
  GOOS: targetPlatform.goos,
  GOARCH: targetPlatform.goarch,
  GOCACHE: process.env.GOCACHE ?? resolve(root, '.codex/toolchains/build-cache'),
  GOMODCACHE: process.env.GOMODCACHE ?? resolve(root, '.codex/toolchains/module-cache'),
};
async function run(command, args) {
  try {
    return (
      await execute(command, args, {
        cwd: root,
        env,
        windowsHide: true,
        maxBuffer: 16 * 1024 * 1024,
      })
    ).stdout.trim();
  } catch (error) {
    process.stderr.write(error.stderr ?? '');
    process.stderr.write(error.stdout ?? '');
    throw error;
  }
}
const goVersion = await run(values.go, ['version']);
assert.match(goVersion, /\bgo1\.27\./);
assert.equal(
  await run('git', ['-C', source, 'rev-parse', target.commit + '^{commit}']),
  target.commit,
);
let previous;
try {
  previous = JSON.parse(await readFile(resolve(destination, 'zerodep-build.json'), 'utf8'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
if (
  !values.test &&
  previous?.sourceHash === sourceHash &&
  previous.commit === target.commit &&
  previous.baseVersion === target.version &&
  previous.goVersion === goVersion &&
  previous.platform === platform
) {
  const binary = resolve(destination, 'lib', executable);
  const contents = await readFile(binary).catch((error) => {
    if (error.code === 'ENOENT') return undefined;
    throw error;
  });
  if (
    contents &&
    createHash('sha256').update(contents).digest('hex') === previous.binaryHash &&
    (platform !== hostPlatform || (await run(binary, ['--version'])) === 'Version ' + version)
  ) {
    console.log('原生框架编译器已是当前版本：' + version);
    console.log('WebStorm 平台包目录：' + destination);
    process.exit(0);
  }
}
await mkdir(resolve(root, '.codex'), { recursive: true });
const temporary = await mkdtemp(resolve(root, '.codex/ts-native-build-framework-'));
const checkout = resolve(temporary, 'source');
const staged = resolve(temporary, 'typescript');
let registered = false;
try {
  await run('git', [
    '-C',
    source,
    'worktree',
    'add',
    '--detach',
    '--no-checkout',
    checkout,
    target.commit,
  ]);
  registered = true;
  await run('git', [
    '-C',
    checkout,
    '-c',
    'core.longpaths=true',
    'sparse-checkout',
    'set',
    'tsc/cmd',
    'tsc/internal',
  ]);
  await run('git', ['-C', checkout, '-c', 'core.longpaths=true', 'checkout', target.commit]);
  for (const patch of patches) await run('git', ['-C', checkout, 'apply', patch]);
  await cp(goSource, resolve(checkout, 'tsc/internal/zerodep'), { recursive: true });
  if (values.test)
    console.log(
      await run(values.go, [
        '-C',
        resolve(checkout, 'tsc'),
        'test',
        '-trimpath',
        './internal/zerodep',
        '-count=1',
      ]),
    );
  await cp(platformRoot, staged, {
    recursive: true,
    dereference: true,
    filter: (path) => !['tsc', 'tsc.exe'].includes(basename(path)),
  });
  const binary = resolve(staged, 'lib', executable);
  console.log('构建框架原生编译器：' + version);
  await run(values.go, [
    '-C',
    resolve(checkout, 'tsc'),
    'build',
    '-tags=noembed',
    '-trimpath',
    `-ldflags=-s -w -X github.com/microsoft/TypeScript/tsc/internal/core.version=${version}`,
    '-o',
    binary,
    './cmd/tsc',
  ]);
  if (platform === hostPlatform)
    assert.equal(await run(binary, ['--version']), 'Version ' + version);
  else
    assert.equal(
      (await readFile(binary)).subarray(0, 4).toString('hex'),
      targetPlatform.os === 'linux'
        ? '7f454c46'
        : targetPlatform.os === 'darwin'
          ? 'cffaedfe'
          : '4d5a9000',
    );
  const manifest = JSON.parse(await readFile(resolve(staged, 'package.json'), 'utf8'));
  await writeFile(
    resolve(staged, 'package.json'),
    JSON.stringify(
      {
        ...manifest,
        name: `@typescript/typescript-${platform}`,
        version,
        private: true,
        os: [targetPlatform.os],
        cpu: [targetPlatform.arch],
      },
      null,
      2,
    ) + '\n',
  );
  await writeFile(
    resolve(staged, 'zerodep-build.json'),
    JSON.stringify(
      {
        version,
        baseVersion: target.version,
        commit: target.commit,
        sourceHash,
        goVersion,
        platform,
        binaryHash: createHash('sha256')
          .update(await readFile(binary))
          .digest('hex'),
      },
      null,
      2,
    ) + '\n',
  );
  const backup = resolve(temporary, 'previous');
  if (previous) await rename(destination, backup);
  try {
    await rename(staged, destination);
  } catch (error) {
    if (previous) await rename(backup, destination);
    throw error;
  }
  console.log('原生框架编译器构建完成。WebStorm 平台包目录：' + destination);
} finally {
  if (registered) await run('git', ['-C', source, 'worktree', 'remove', '--force', checkout]);
  assert.equal(dirname(temporary), resolve(root, '.codex'));
  assert(basename(temporary).startsWith('ts-native-build-framework-'));
  await rm(temporary, { recursive: true, force: true });
}
