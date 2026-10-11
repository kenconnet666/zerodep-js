import { defineConfig } from 'vite';
import { zerodep } from 'zerodep-js-compiler';
import { resolve } from 'node:path';

export default defineConfig(({ isSsrBuild }) => ({
  // 完整类型检查由独立 check 命令执行，客户端与服务端构建只做转换。
  plugins: [zerodep()],
  appType: 'custom',
  // 等完整保存后更新，避免分段写入及短时间内的错误/修复被文件监听合并。
  server: { watch: { awaitWriteFinish: { stabilityThreshold: 100, pollInterval: 20 } } },
  ssr: { noExternal: ['zerodep-js', 'zerodep-js-css'] },
  build: isSsrBuild
    ? {}
    : {
        rolldownOptions: {
          input: {
            example: resolve(import.meta.dirname, 'index.html'),
            tasks: resolve(import.meta.dirname, 'tasks.html'),
          },
        },
      },
}));
