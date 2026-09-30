import { defineConfig } from 'vite';
import { zerodep } from '@zerodep-js/vite';

export default defineConfig({
  plugins: [zerodep()],
  appType: 'custom',
  // 等完整保存后更新，避免分段写入及短时间内的错误/修复被文件监听合并。
  server: { watch: { awaitWriteFinish: { stabilityThreshold: 100, pollInterval: 20 } } },
  ssr: { noExternal: ['@zerodep-js/core', '@zerodep-js/ssr'] },
});
