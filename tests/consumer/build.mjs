import { writeFile } from 'node:fs/promises';
import { build } from 'vite';
import { zerodep } from 'zerodep-js-compiler';

const reports = {};
function inspect(name) {
  return {
    name: 'consumer-package-evidence',
    generateBundle(_options, bundle) {
      reports[name] = Object.values(bundle)
        .filter((entry) => entry.type === 'chunk')
        .map((chunk) => ({
          file: chunk.fileName,
          bytes: Buffer.byteLength(chunk.code),
          modules: Object.entries(chunk.modules)
            .filter(([, info]) => info.renderedLength > 0)
            .map(([id]) => id.replaceAll('\\', '/')),
        }));
    },
  };
}

const common = { root: import.meta.dirname, configFile: false, logLevel: 'warn' };
await build({
  ...common,
  plugins: [zerodep(), inspect('client')],
  build: { outDir: 'dist/client', sourcemap: true },
});
await build({
  ...common,
  plugins: [zerodep(), inspect('server')],
  // 保持包 external，验证发布后的 Node ESM 解析及运行时单例。
  build: { ssr: 'src/server.ts', outDir: 'dist/server', sourcemap: true },
});
await build({
  ...common,
  plugins: [zerodep(), inspect('tree')],
  build: {
    lib: { entry: 'src/tree.ts', formats: ['es'], fileName: 'tree' },
    outDir: 'dist/tree',
    sourcemap: true,
    minify: false,
  },
});
await build({
  ...common,
  plugins: [inspect('cssTree')],
  build: {
    target: 'es2025',
    lib: { entry: 'src/css-tree.ts', formats: ['es'], fileName: 'css-tree' },
    outDir: 'dist/css-tree',
    minify: true,
  },
});
await writeFile('dist/build-report.json', JSON.stringify(reports, null, 2));
