import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
// Prettier 的文件缓存不完整追踪插件实现；锁文件变化时换一个缓存，避免升级后漏检。
const key = createHash('sha256')
  .update(await readFile(resolve(root, 'pnpm-lock.yaml')))
  .digest('hex')
  .slice(0, 16);
const cache = resolve(root, 'node_modules/.cache/zerodep-prettier');
await mkdir(cache, { recursive: true });
const child = spawn(
  process.execPath,
  [
    resolve(root, 'node_modules/prettier/bin/prettier.cjs'),
    ...(args.includes('--no-cache')
      ? []
      : [
          '--cache',
          '--cache-strategy',
          'content',
          '--cache-location',
          resolve(cache, key + '.json'),
        ]),
    ...args,
  ],
  { cwd: root, stdio: 'inherit', windowsHide: true },
);
child.once('error', (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.once('exit', (code) => {
  process.exitCode = code ?? 1;
});
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => child.kill(signal));
