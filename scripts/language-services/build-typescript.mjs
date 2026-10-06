import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, realpath, rename, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { basename, dirname, resolve } from 'node:path';
import { parseArgs, promisify } from 'node:util';

const root = resolve(import.meta.dirname, '../..');
const requireProject = createRequire(resolve(root, 'package.json'));
const target = JSON.parse(
  await readFile(new URL('./typescript-target.json', import.meta.url), 'utf8'),
);
const { values } = parseArgs({
  options: { source: { type: 'string' }, go: { type: 'string', default: 'go' } },
});
assert(values.source, '请用 --source 指定包含固定上游提交的 TypeScript Git 仓库。');
const source = await realpath(values.source);
const patch = await readFile(resolve(root, target.patch));
const patchHash = createHash('sha256').update(patch).digest('hex');
const version = `${target.version}+zerodep.${target.revision}`;
const sdk = resolve(root, '.codex/typescript-sdk');
const platformName = `@typescript/typescript-${process.platform}-${process.arch}`;
const manifestPath = requireProject.resolve('typescript/package.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
assert.equal(manifest.version, target.version, 'npm TypeScript 与补丁基线必须一致。');
const requireCompiler = createRequire(manifestPath);
const platformRoot = dirname(requireCompiler.resolve(platformName + '/package.json'));
const binaryName = process.platform === 'win32' ? 'tsc.exe' : 'tsc';
const execute = promisify(execFile);
const env = {
  ...process.env,
  GOTOOLCHAIN: 'local',
  GOWORK: 'off',
  GOCACHE: process.env.GOCACHE ?? resolve(root, '.codex/toolchains/build-cache'),
  GOMODCACHE: process.env.GOMODCACHE ?? resolve(root, '.codex/toolchains/module-cache'),
};
async function run(command, args) {
  const result = await execute(command, args, {
    cwd: root,
    env,
    windowsHide: true,
    maxBuffer: 16 * 1024 * 1024,
  });
  return result.stdout.trim();
}
const goVersion = await run(values.go, ['version']);
assert.match(goVersion, /\bgo1\.27\./, '构建要求 Go 1.27。');
assert.equal(
  await run('git', ['-C', source, 'rev-parse', target.commit + '^{commit}']),
  target.commit,
);
const platformPackagePath = resolve(sdk, 'node_modules', platformName);
const binaryPath = resolve(platformPackagePath, 'lib', binaryName);
const existing = await readFile(resolve(sdk, 'zerodep-build.json'), 'utf8')
  .then(JSON.parse)
  .catch((error) => {
    if (error.code === 'ENOENT') return null;
    throw error;
  });
if (
  existing?.version === version &&
  existing.patchHash === patchHash &&
  existing.platform === process.platform &&
  existing.arch === process.arch
) {
  let healthy = false;
  try {
    const actual = createHash('sha256')
      .update(await readFile(binaryPath))
      .digest('hex');
    healthy =
      actual === existing.binaryHash &&
      (await run(process.execPath, [resolve(sdk, 'bin/tsc'), '--version'])) ===
        'Version ' + version;
  } catch {
    // 生成产物缺失或损坏时重新构建，避免缓存记录阻止恢复。
  }
  if (healthy) {
    console.log('原生 TypeScript SDK 已是当前补丁版本：' + sdk);
    console.log('WebStorm 的 TypeScript 包目录请选择：' + platformPackagePath);
    process.exit(0);
  }
}

await mkdir(resolve(root, '.codex'), { recursive: true });
const temporary = await mkdtemp(resolve(root, '.codex/ts-native-build-'));
const checkout = resolve(temporary, 'source');
const stagedSdk = resolve(temporary, 'sdk');
let registered = false;
try {
  console.log('准备固定上游源码与补丁：' + target.commit);
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
  await run('git', ['-C', checkout, 'apply', '--check', resolve(root, target.patch)]);
  await run('git', ['-C', checkout, 'apply', resolve(root, target.patch)]);
  await cp(dirname(manifestPath), stagedSdk, {
    recursive: true,
    dereference: true,
    filter: (path) => basename(path) !== 'node_modules',
  });
  const stagedPlatform = resolve(stagedSdk, 'node_modules', platformName);
  await cp(platformRoot, stagedPlatform, { recursive: true, dereference: true });
  const output = resolve(stagedPlatform, 'lib', binaryName);
  console.log('构建 TypeScript ' + version + '，保留官方 SDK 和标准库布局。');
  await run(values.go, [
    '-C',
    resolve(checkout, 'tsc'),
    'build',
    '-tags=noembed',
    '-trimpath',
    `-ldflags=-s -w -X github.com/microsoft/TypeScript/tsc/internal/core.version=${version}`,
    '-o',
    output,
    './cmd/tsc',
  ]);
  assert.equal(await run(output, ['--version']), 'Version ' + version);
  await writeFile(
    resolve(stagedSdk, 'package.json'),
    JSON.stringify(
      { ...manifest, version, private: true, optionalDependencies: { [platformName]: version } },
      null,
      2,
    ) + '\n',
  );
  const platformManifest = JSON.parse(
    await readFile(resolve(stagedPlatform, 'package.json'), 'utf8'),
  );
  await writeFile(
    resolve(stagedPlatform, 'package.json'),
    JSON.stringify({ ...platformManifest, version, private: true }, null, 2) + '\n',
  );
  const metadata = {
    version,
    baseVersion: target.version,
    commit: target.commit,
    patchHash,
    goVersion,
    platform: process.platform,
    arch: process.arch,
    binaryHash: createHash('sha256')
      .update(await readFile(output))
      .digest('hex'),
  };
  await writeFile(
    resolve(stagedSdk, 'zerodep-build.json'),
    JSON.stringify(metadata, null, 2) + '\n',
  );
  assert.equal(
    await run(process.execPath, [resolve(stagedSdk, 'bin/tsc'), '--version']),
    'Version ' + version,
  );
  // 只替换本脚本生成的 SDK；不触碰 pnpm store 或用户提供的上游源码。
  const previousSdk = resolve(temporary, 'previous-sdk');
  if (existing) {
    assert.equal(await realpath(sdk), sdk);
    assert.equal(existing.baseVersion, target.version);
    await rename(sdk, previousSdk);
  }
  try {
    await rename(stagedSdk, sdk);
  } catch (error) {
    if (existing) await rename(previousSdk, sdk);
    throw error;
  }
  console.log('原生 TypeScript SDK 构建完成：' + sdk);
  console.log('WebStorm 的 TypeScript 包目录请选择：' + platformPackagePath);
} finally {
  if (registered) await run('git', ['-C', source, 'worktree', 'remove', '--force', checkout]);
  assert.equal(dirname(temporary), resolve(root, '.codex'));
  assert(basename(temporary).startsWith('ts-native-build-'));
  await rm(temporary, { recursive: true, force: true });
}
