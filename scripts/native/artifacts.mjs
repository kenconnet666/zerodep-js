import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';
import { platforms } from './platforms.mjs';
import { nativeInputs } from './inputs.mjs';

const root = resolve(import.meta.dirname, '../..');
const [operation, directory = '.codex/native-artifacts'] = process.argv.slice(2);
assert(['pack', 'restore'].includes(operation));
const archives = resolve(root, directory);
const execute = promisify(execFile);
const { target, sourceHash, version } = nativeInputs(root);
async function validate(platform) {
  const sdk = resolve(root, `packages/native-${platform}/typescript`);
  const metadata = JSON.parse(await readFile(resolve(sdk, 'zerodep-build.json'), 'utf8'));
  assert.equal(metadata.platform, platform);
  assert.equal(metadata.commit, target.commit);
  assert.equal(metadata.sourceHash, sourceHash);
  assert.equal(metadata.version, version);
  const binary = await readFile(
    resolve(sdk, 'lib', platform.startsWith('win32') ? 'tsc.exe' : 'tsc'),
  );
  assert.equal(createHash('sha256').update(binary).digest('hex'), metadata.binaryHash);
}
const selected =
  operation === 'pack'
    ? platforms.filter((p) => p.platform === `${process.platform}-${process.arch}`)
    : platforms;
assert(selected.length > 0);
await mkdir(archives, { recursive: true });
for (const { platform } of selected) {
  const archive = resolve(archives, `sdk-${platform}.tar.gz`);
  const packageRoot = resolve(root, 'packages/native-' + platform);
  if (operation === 'pack') {
    await validate(platform);
    await execute('tar', ['-czf', archive, '-C', packageRoot, 'typescript'], { windowsHide: true });
  } else {
    const { stdout } = await execute('tar', ['-tzf', archive], {
      windowsHide: true,
      maxBuffer: 2 * 1024 * 1024,
    });
    for (const entry of stdout.trim().split(/\r?\n/)) {
      assert(
        entry.startsWith('typescript/') && !entry.includes('..') && !entry.includes('\\'),
        'SDK 归档路径越界：' + entry,
      );
    }
    await execute('tar', ['-xzf', archive, '-C', packageRoot], { windowsHide: true });
    await validate(platform);
  }
  console.log(`${operation}: ${platform}，源码与二进制摘要一致。`);
}
