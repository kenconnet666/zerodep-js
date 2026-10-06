import { defineConfig } from 'vite';
import { zerodep } from 'zerodep-js-vite';
import { resolve } from 'node:path';

const compiler = process.env.ZERODEP_COMPILER ?? 'babel';
if (compiler !== 'babel' && compiler !== 'native')
  throw new Error('ZERODEP_COMPILER 必须为 babel 或 native。');

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [zerodep({ compiler })],
  appType: 'custom',
  // 等完整保存后更新，避免分段写入及短时间内的错误/修复被文件监听合并。
  server: { watch: { awaitWriteFinish: { stabilityThreshold: 100, pollInterval: 20 } } },
  ssr: { noExternal: ['zerodep-js', 'zerodep-js-ssr', 'zerodep-use'] },
  build: isSsrBuild
    ? {}
    : {
        rolldownOptions: {
          input: {
            example: resolve(import.meta.dirname, 'index.html'),
            tasks: resolve(import.meta.dirname, 'tasks.html'),
            workspace: resolve(import.meta.dirname, 'workspace.html'),
          },
        },
      },
}));
