import assert from 'node:assert/strict';
import { execFile, execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { access, mkdir, mkdtemp, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, isAbsolute, relative, resolve, sep } from 'node:path';
import { parseArgs, promisify } from 'node:util';

const root = resolve(import.meta.dirname, '..');
const registry = 'https://registry.npmjs.org/';
const repository = 'kenconnet666/zerodep-js';
const folders = ['core', 'compiler', 'ssr', 'vite'];
const names = ['zerodep-js', 'zerodep-js-compiler', 'zerodep-js-ssr', 'zerodep-js-vite'];
const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { version: { type: 'string' } },
});
const command = positionals[0] ?? 'check';
assert(
  ['check', 'prepare', 'pack', 'status', 'publish', 'verify-registry', 'promote'].includes(command),
  '未知发布操作。',
);
assert.equal(positionals.length <= 1, true, '只接受一个发布操作。');
const pnpm = process.env.npm_execpath;
assert(pnpm, '请通过 pnpm release:<操作> 运行。');
const executable = /\.[cm]?js$/.test(pnpm) ? process.execPath : pnpm;
const prefix = executable === pnpm ? [] : [pnpm];
const exec = promisify(execFile);
const json = async (file) => JSON.parse(await readFile(file, 'utf8'));
const git = (...args) =>
  execFileSync('git', args, { cwd: root, windowsHide: true, encoding: 'utf8' }).trim();
const digest = async (file) =>
  'sha512-' +
  createHash('sha512')
    .update(await readFile(file))
    .digest('base64');

function version(value) {
  assert(
    typeof value === 'string' &&
      /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-rc\.[1-9]\d*)?$/.test(value),
    '版本必须是 x.y.z 或 x.y.z-rc.n。',
  );
  return value;
}
function clean() {
  assert.equal(git('status', '--porcelain'), '', '发布操作需要干净工作区。');
}
async function manager(args, cwd = root, env = process.env) {
  return exec(executable, [...prefix, ...args], {
    cwd,
    env,
    windowsHide: true,
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024,
  });
}
async function manifests() {
  const packages = await Promise.all(
    folders.map(async (folder, index) => {
      const path = resolve(root, 'packages', folder, 'package.json');
      const manifest = await json(path);
      assert.equal(manifest.name, names[index], '发布名称不符合本项目约定。');
      assert.equal(manifest.license, 'MIT');
      assert.equal(manifest.publishConfig?.registry, registry);
      assert.equal(manifest.publishConfig?.access, 'public');
      assert.equal(
        await readFile(resolve(root, 'packages', folder, 'LICENSE'), 'utf8'),
        await readFile(resolve(root, 'LICENSE'), 'utf8'),
      );
      return { folder, path, manifest };
    }),
  );
  assert.equal(
    new Set(packages.map(({ manifest }) => manifest.version)).size,
    1,
    '四个包必须使用同一版本。',
  );
  return packages;
}
async function metadata(name, selectedVersion) {
  const response = await fetch(
    `${registry}${encodeURIComponent(name)}${selectedVersion ? '/' + encodeURIComponent(selectedVersion) : ''}`,
    { signal: AbortSignal.timeout(15000) },
  );
  if (response.status === 404) return null;
  assert(response.ok, `注册表查询失败：${name}，HTTP ${response.status}`);
  return response.json();
}
async function ciPassed(revision) {
  const { stdout } = await exec(
    'gh',
    [
      'run',
      'list',
      '--repo',
      repository,
      '--workflow',
      'ci.yml',
      '--commit',
      revision,
      '--limit',
      '1',
      '--json',
      'headSha,status,conclusion,url',
    ],
    { cwd: root, windowsHide: true, encoding: 'utf8' },
  );
  const run = JSON.parse(stdout)[0];
  assert(
    run?.headSha === revision && run.status === 'completed' && run.conclusion === 'success',
    '候选提交的完整 CI 尚未通过；不等待或跳过此门槛。',
  );
  return run.url;
}
function sameArtifact(item, remote) {
  assert.equal(remote.name, item.name);
  assert.equal(remote.version, item.version);
  assert.equal(
    remote.dist?.integrity,
    item.integrity,
    `${item.name}@${item.version} 已存在但完整性不同，禁止覆盖或继续提升 tag。`,
  );
}

function validateLedger(ledger, revision, selectedVersion) {
  assert.equal(ledger.repository, repository);
  assert.equal(ledger.revision, revision, '当前提交与产物记录不一致。');
  assert.equal(ledger.version, selectedVersion);
  assert.deepEqual(
    ledger.packages.map((item) => item.name),
    names,
  );
  for (const item of ledger.packages) {
    assert.equal(item.version, selectedVersion);
    assert.equal(
      item.file,
      `${item.name}-${selectedVersion}.tgz`,
      '产物文件名必须留在本版本目录。',
    );
    assert(/^sha512-[A-Za-z0-9+/]{86}==$/.test(item.integrity), '产物完整性格式错误。');
    assert.equal(typeof item.private, 'boolean');
  }
}

// 临时配置只保存环境变量引用，token 值不进入文件、命令行或返回日志。
async function authenticated(run) {
  let token = process.env.NPM_TOKEN || process.env.NODE_AUTH_TOKEN;
  if (!token && process.platform === 'win32' && !process.env.CI) {
    token = execFileSync(
      'powershell.exe',
      [
        '-NoLogo',
        '-NoProfile',
        '-NonInteractive',
        '-Command',
        "[Environment]::GetEnvironmentVariable('NPM_TOKEN', 'User')",
      ],
      { encoding: 'utf8', windowsHide: true },
    ).trim();
  }
  assert(token, '请在环境变量中提供 NPM_TOKEN 或 NODE_AUTH_TOKEN。');
  const temporary = await realpath(tmpdir());
  const directory = await mkdtemp(resolve(temporary, 'zerodep-npm-'));
  const owned = relative(temporary, directory);
  assert(owned.startsWith('zerodep-npm-') && !owned.includes(sep) && !isAbsolute(owned));
  try {
    const config = resolve(directory, '.npmrc');
    await writeFile(
      config,
      'registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}\n',
    );
    const env = {
      ...process.env,
      NODE_AUTH_TOKEN: token,
      NPM_CONFIG_USERCONFIG: config,
      npm_config_userconfig: config,
    };
    const publish = async (args) => {
      try {
        return await manager([...args, '--registry', registry], root, env);
      } catch (error) {
        throw new Error(
          [error.message, error.stdout, error.stderr]
            .filter(Boolean)
            .join('\n')
            .replaceAll(token, '[redacted]'),
        );
      }
    };
    return await run(publish);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

async function main() {
  const packages = await manifests();
  const selectedVersion = version(values.version ?? packages[0].manifest.version);
  const directory = resolve(root, '.release', selectedVersion);
  const ledgerFile = resolve(directory, 'release.json');
  if (command === 'check') {
    console.log(
      JSON.stringify(
        packages.map(({ manifest }) => ({
          name: manifest.name,
          version: manifest.version,
          private: manifest.private ?? false,
        })),
        null,
        2,
      ),
    );
    return;
  }
  if (command === 'prepare') {
    clean();
    assert(values.version && selectedVersion !== '0.0.0', 'prepare 需要明确的候选版本。');
    for (const entry of packages) {
      entry.manifest.version = selectedVersion;
      delete entry.manifest.private;
      await writeFile(entry.path, JSON.stringify(entry.manifest, null, 2) + '\n');
    }
    await manager(['install', '--lockfile-only']);
    console.log(`已准备 ${selectedVersion}，请完成检查、提交和 CI 后打包。`);
    return;
  }
  if (command === 'status') {
    const ledger = await json(ledgerFile);
    validateLedger(ledger, ledger.revision, selectedVersion);
    for (const item of ledger.packages) {
      assert.equal(await digest(resolve(directory, item.file)), item.integrity);
      const remote = await metadata(item.name, selectedVersion);
      if (remote) sameArtifact(item, remote);
      console.log(`${item.name}@${selectedVersion}: ${remote ? '注册表完整性一致' : '尚未发布'}`);
      if (remote) console.log(JSON.stringify((await metadata(item.name))?.['dist-tags'] ?? {}));
    }
    return;
  }
  assert.equal(packages[0].manifest.version, selectedVersion, '命令版本与工作区版本不一致。');
  clean();
  const revision = git('rev-parse', 'HEAD');
  if (command === 'pack') {
    let previous;
    try {
      previous = await json(ledgerFile);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    if (previous) {
      validateLedger(previous, revision, selectedVersion);
      for (const item of previous.packages)
        assert.equal(await digest(resolve(directory, item.file)), item.integrity);
      console.log(`已保留并复核现有产物：${ledgerFile}`);
      return;
    }
    await manager(['build:packages']);
    await mkdir(directory, { recursive: true });
    const ledger = {
      repository,
      revision,
      version: selectedVersion,
      createdAt: new Date().toISOString(),
      packages: [],
    };
    for (const { folder, manifest } of packages) {
      const packed = JSON.parse(
        (
          await manager(
            ['pack', '--json', '--pack-destination', directory],
            resolve(root, 'packages', folder),
          )
        ).stdout,
      );
      const file = basename(packed.filename);
      await access(resolve(directory, file));
      assert(packed.files.some((entry) => entry.path === 'LICENSE'));
      assert(
        !packed.files.some((entry) =>
          /tsbuildinfo|(^|\/)(test|node_modules|\.codex)(\/|$)/.test(entry.path),
        ),
      );
      ledger.packages.push({
        name: manifest.name,
        version: selectedVersion,
        private: manifest.private ?? false,
        file,
        integrity: await digest(resolve(directory, file)),
        published: false,
      });
    }
    await writeFile(ledgerFile, JSON.stringify(ledger, null, 2) + '\n');
    console.log(`产物与完整性记录：${ledgerFile}`);
    return;
  }
  const ledger = await json(ledgerFile);
  validateLedger(ledger, revision, selectedVersion);
  for (const item of ledger.packages)
    assert.equal(await digest(resolve(directory, item.file)), item.integrity, '本地产物已经变化。');
  const save = () => writeFile(ledgerFile, JSON.stringify(ledger, null, 2) + '\n');
  assert(['publish', 'verify-registry', 'promote'].includes(command), '未知发布操作。');
  assert(
    selectedVersion !== '0.0.0' && ledger.packages.every((item) => !item.private),
    '开发私有包不能发布。',
  );
  ledger.ci = await ciPassed(revision);
  await save();
  if (command === 'publish') {
    await authenticated(async (publish) => {
      for (const item of ledger.packages) {
        let remote = await metadata(item.name, selectedVersion);
        if (!remote) {
          // 发布的是已记录的原始 tgz，避免中途重新打包得到不同内容。
          await publish([
            'publish',
            resolve(directory, item.file),
            '--access',
            'public',
            '--tag',
            'next',
            '--ignore-scripts',
            '--no-git-checks',
          ]);
          remote = await metadata(item.name, selectedVersion);
          assert(remote, '发布命令返回后版本尚未可读，请先重新查询 status，保留现有产物。');
        }
        sameArtifact(item, remote);
        // 首次发包时注册表可能同时初始化 latest，不能把 --tag next 当作最终标签证据。
        item.tags = (await metadata(item.name))?.['dist-tags'] ?? {};
        assert.equal(item.tags.next, selectedVersion, 'next 标签没有指向本次候选版本。');
        if (selectedVersion.includes('-') && item.tags.latest === selectedVersion)
          console.warn(`${item.name} 的 latest 也指向预发布版本，请单独确认并记录标签策略。`);
        item.published = true;
        await save();
        console.log(`候选已核对：${item.name}@${selectedVersion}`);
      }
    });
    return;
  }
  for (const item of ledger.packages) {
    const remote = await metadata(item.name, selectedVersion);
    assert(remote, '候选版本不完整，不能验收或提升稳定 tag。');
    sameArtifact(item, remote);
  }
  if (command === 'verify-registry') {
    const result = await manager(['test:packages:registry', '--version', selectedVersion]);
    process.stdout.write(result.stdout);
    ledger.registryVerifiedAt = new Date().toISOString();
    await save();
    return;
  }
  assert(!selectedVersion.includes('-'), '预发布版本不能提升为 latest。');
  assert(ledger.registryVerifiedAt, '必须先完成真实注册表消费验证。');
  if (!ledger.previousLatest) {
    ledger.previousLatest = {};
    for (const item of ledger.packages)
      ledger.previousLatest[item.name] = (await metadata(item.name))?.['dist-tags']?.latest ?? null;
    await save();
  }
  await authenticated(async (publish) => {
    for (const item of ledger.packages) {
      await publish(['dist-tag', 'add', `${item.name}@${selectedVersion}`, 'latest']);
      assert.equal((await metadata(item.name))?.['dist-tags']?.latest, selectedVersion);
      console.log(`稳定 tag 已核对：${item.name}@${selectedVersion}`);
    }
  });
  ledger.promotedAt = new Date().toISOString();
  await save();
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
