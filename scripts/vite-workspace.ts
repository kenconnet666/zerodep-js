import { fileURLToPath } from 'node:url';
import { normalizePath, type Plugin } from 'vite';
import { zerodep } from '../packages/compiler/src/tooling/vite.js';

const source = (path: string) => fileURLToPath(new URL('../packages/' + path, import.meta.url));
const cssEntry = normalizePath(source('css/src/index.ts'));

/** 仓库应用直接消费同一份源码；发布包的 exports 和独立消费仍验证 dist。 */
export function workspacePlugins(): Plugin[] {
  return [
    // core/css 已是普通 TS，不对框架实现本身重复执行作者宏转换。
    zerodep({ include: /\/(?:apps\/[^/]+\/src|packages\/ui\/src)\// }),
    {
      name: 'zerodep-workspace',
      enforce: 'pre',
      config: () => ({
        resolve: {
          alias: [
            { find: /^zerodep-js$/, replacement: source('core/src/index.ts') },
            { find: /^zerodep-js-css$/, replacement: source('css/src/index.ts') },
            { find: /^zerodep-js-ui$/, replacement: source('ui/src/index.ts') },
          ],
        },
        optimizeDeps: { exclude: ['zerodep-js', 'zerodep-js-css', 'zerodep-js-ui'] },
        ssr: { noExternal: ['zerodep-js', 'zerodep-js-css', 'zerodep-js-ui'] },
      }),
      resolveId(id, importer) {
        // 源码绕过 package.browser 的 dist 映射，按 Vite 环境选择真实 CSS 宿主。
        if (id !== './runtime/server.js' || !importer || normalizePath(importer) !== cssEntry)
          return;
        return source(
          this.environment.config.consumer === 'server'
            ? 'css/src/runtime/server.ts'
            : 'css/src/runtime/browser.ts',
        );
      },
      hotUpdate(context) {
        // 运行时与样式宿主拥有全局上下文；替换后重建页面，避免新旧实例混用。
        if (
          this.environment.config.consumer === 'client' &&
          ['core', 'css'].some((folder) =>
            normalizePath(context.file).startsWith(normalizePath(source(folder + '/src/'))),
          )
        ) {
          this.environment.hot.send({ type: 'full-reload' });
          return [];
        }
      },
    },
  ];
}
