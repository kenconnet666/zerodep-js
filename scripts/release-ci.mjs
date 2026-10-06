import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, resolve } from 'node:path';
import { promisify } from 'node:util';
import { releasePackages } from './package-list.mjs';

const root = resolve(import.meta.dirname, '..');
const repository = 'kenconnet666/zerodep-js';
const execute = promisify(execFile);
async function gh(args) {
  return (
    await execute('gh', [...args, '--repo', repository], {
      cwd: root,
      windowsHide: true,
      maxBuffer: 8 * 1024 * 1024,
    })
  ).stdout;
}
const pnpm = process.env.npm_execpath;
assert(pnpm, '请通过 pnpm release:ci 运行。');
async function manager(args, authenticate = false) {
  const env = authenticate ? process.env : { ...process.env, NPM_TOKEN: '', NODE_AUTH_TOKEN: '' };
  const result = await execute(process.execPath, [pnpm, ...args], {
    cwd: root,
    env,
    windowsHide: true,
    maxBuffer: 16 * 1024 * 1024,
  });
  process.stdout.write(result.stdout);
}
const manifest = JSON.parse(await readFile(resolve(root, 'packages/core/package.json'), 'utf8'));
const version = manifest.version;
const tag = 'v' + version;
assert(/^\d+\.\d+\.\d+-rc\.[1-9]\d*$/.test(version), '自动流程只发布明确的 RC 到 next。');
const directory = resolve(root, '.release', version);
const ledgerPath = resolve(directory, 'release.json');
const candidate = JSON.parse(await readFile(ledgerPath, 'utf8'));
const revision = (
  await execute('git', ['rev-parse', 'HEAD'], { cwd: root, windowsHide: true })
).stdout.trim();
assert.equal(candidate.revision, revision);
assert.equal(candidate.version, version);
assert.deepEqual(
  candidate.packages.map((p) => p.name),
  releasePackages.map((p) => p.name),
);
let existing;
try {
  existing = JSON.parse(await gh(['release', 'view', tag, '--json', 'isDraft,url']));
} catch (error) {
  if (!String(error.stderr).includes('release not found')) throw error;
}
if (existing) {
  const temporary = await mkdtemp(resolve(tmpdir(), 'zerodep-release-resume-'));
  let completed = false;
  try {
    await gh(['release', 'download', tag, '--pattern', 'release.json', '--dir', temporary]);
    const saved = JSON.parse(await readFile(resolve(temporary, 'release.json'), 'utf8'));
    if (!existing.isDraft && saved.version === version && saved.registryVerifiedAt) {
      console.log('该候选已发布并完成注册表验收：' + existing.url);
      completed = true;
    } else {
      assert.equal(saved.revision, revision, '同一候选版本已绑定其他提交，不能覆盖。');
      assert.deepEqual(
        saved.packages.map((p) => p.name),
        candidate.packages.map((p) => p.name),
      );
      // 恢复首次冻结的完整产物；不以重新构建的相同版本覆盖未知发布结果。
      await gh([
        'release',
        'download',
        tag,
        '--pattern',
        '*.tgz',
        '--pattern',
        'release.json',
        '--dir',
        directory,
        '--clobber',
      ]);
    }
  } finally {
    assert(basename(temporary).startsWith('zerodep-release-resume-'));
    await rm(temporary, { recursive: true, force: true });
  }
  if (completed) process.exit(0);
} else {
  const { stdout } = await execute(
    'git',
    ['ls-remote', '--tags', 'origin', `refs/tags/${tag}`, `refs/tags/${tag}^{}`],
    { cwd: root, windowsHide: true },
  );
  const refs = stdout.trim().split('\n').filter(Boolean);
  if (refs.length) assert.equal(refs.at(-1).split(/\s+/)[0], revision, '已有 tag 指向其他提交。');
  await mkdir(directory, { recursive: true });
  const notes = resolve(directory, 'notes.md');
  await writeFile(
    notes,
    `候选 ${version}，源码 ${revision}。\n\n只包含定制 TS7-Go 工具链与 Windows/Linux/macOS 的 x64/ARM64 平台包。平台产物来自同一提交的实际架构 CI 测试；发布到 npm next，不提升稳定标签。\n\n详细变更见仓库 CHANGELOG.md、docs/native-compiler-implementation.md 和 docs/native-performance.md。\n`,
  );
  await gh([
    'release',
    'create',
    tag,
    '--target',
    revision,
    '--draft',
    '--prerelease',
    '--title',
    version,
    '--notes-file',
    notes,
  ]);
  await gh([
    'release',
    'upload',
    tag,
    ledgerPath,
    ...candidate.packages.map((p) => resolve(directory, p.file)),
  ]);
}
try {
  for (let attempt = 0; ; attempt++) {
    try {
      await manager(['release:publish', '--github-release'], true);
      break;
    } catch (error) {
      if (error.code !== 2 || attempt === 7) throw error;
      const delay = Math.min((attempt + 1) * 15000, 60000);
      console.log(
        `注册表或平台入口尚未就绪，${delay / 1000} 秒后恢复同一份发布记录；不重复上传已尝试的包。`,
      );
      await new Promise((done) => setTimeout(done, delay));
    }
  }
  // 检查步骤不继承 npm 发布凭据，也不重打包任何将要发布的文件。
  await manager(['release:verify-registry', '--github-release']);
  await gh(['release', 'edit', tag, '--draft=false']);
  console.log(`npm ${version} 与 GitHub 预发布已完成，并通过注册表真实消费。`);
} catch (error) {
  // ledger 已在每次远端动作前保存到草稿；失败只报告，不改变结果或盲目重试。
  const token = process.env.NODE_AUTH_TOKEN || process.env.NPM_TOKEN;
  const text = [error.message, error.stdout, error.stderr].filter(Boolean).join('\n');
  console.error(token ? text.replaceAll(token, '[redacted]') : text);
  process.exitCode = 1;
}
