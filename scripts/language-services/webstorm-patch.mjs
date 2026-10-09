import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// 此 API 适配同时验证过微软官方 7.1.0-dev.20261008.1；保留原补丁字节及哈希。
// 只适配已验证的 EAP 代理；IDE 升级后哈希不同就停止，避免误改新版本。
const [installation, mode = 'check'] = process.argv.slice(2);
assert(
  installation,
  '用法：node scripts/language-services/webstorm-patch.mjs <IDE目录> [check|apply|restore]',
);
assert(['check', 'apply', 'restore'].includes(mode), '未知补丁操作');
const file = resolve(installation, 'plugins/javascript-plugin/ts-go-proxy/index.js');
const backup = file + '.original-263.6259.34';
const originalHash = 'f794468ddd277ce65d7c211c187beceeddc5acc5853960b7525a6eb3d5b5847c';
const patchedHash = 'fcb2071764e9d999b9033485ab511c3377be7b561ede55ddc2c7e0b67895de1e';
const hash = (text) => createHash('sha256').update(text).digest('hex');
const source = await readFile(file, 'utf8');
const current = hash(source);
assert([originalHash, patchedHash].includes(current), '代理不是已验证的 EAP 263.6259.34，未修改');
if (mode === 'apply' && current === originalHash) {
  const previous = await readFile(backup, 'utf8').catch((error) => {
    if (error.code !== 'ENOENT') throw error;
    return undefined;
  });
  if (previous !== undefined) assert.equal(hash(previous), originalHash, '原文件备份校验失败');
  else await copyFile(file, backup);
  // 新 API 用语言服务器当前快照；项目路径需经 getConfiguredProject 规范化。
  const patched =
    '// Local adaptation for JetBrains TS 7.1.0-dev.jetbrains.20261006.2; original saved beside this file.\n' +
    source
      .replaceAll('this.api.updateSnapshot(', 'this.api.getCurrentLanguageServerSnapshot(')
      .replaceAll(
        'getSnapshot().getProject(projectFileName)',
        'getSnapshot().getConfiguredProject(projectFileName)',
      )
      .replaceAll(
        'snapshot.getProject(projectFileName)',
        'snapshot.getConfiguredProject(projectFileName)',
      );
  assert.equal(hash(patched), patchedHash, '补丁输出校验失败');
  await writeFile(file, patched);
} else if (mode === 'restore' && current === patchedHash) {
  const original = await readFile(backup, 'utf8');
  assert.equal(hash(original), originalHash, '原文件备份校验失败');
  await writeFile(file, original);
}
console.log(
  JSON.stringify({ file, patched: hash(await readFile(file, 'utf8')) === patchedHash, backup }),
);
