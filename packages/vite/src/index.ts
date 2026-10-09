import { createFilter, normalizePath, type FilterPattern, type Plugin, type Rolldown } from 'vite';
import { compile, type CompileExtension } from 'zerodep-js-compiler';

export interface ZerodepOptions {
  extensions?: readonly CompileExtension[];
  include?: FilterPattern;
  exclude?: FilterPattern;
}

export function zerodep(options: ZerodepOptions = {}): Plugin {
  let filter = createFilter(options.include, options.exclude);
  let development = false;
  const componentFiles = new Set<string>();
  const compiler = {
    name: 'zerodep-js:compile',
    transform: {
      order: 'pre',
      async handler(code, id) {
        const filename = normalizePath(id.split('?')[0]!.replaceAll('\\', '/'));
        if (
          id.startsWith('\0') ||
          /[/\\]node_modules[/\\]/.test(filename) ||
          !/\.(?:[jt]sx?|m[jt]s)$/.test(filename) ||
          /\.d\.[cm]?ts$/.test(filename) ||
          !filter(filename)
        )
          return null;
        // 已发布的 JS 依赖不重编译；应用的 TS/TSX 和显式 JSX 使用同一入口。
        if (/\.m?js$/.test(filename) && !code.includes('zerodep-js')) return null;
        try {
          const result = compile(code, filename, {
            extensions: options.extensions ?? [],
            development,
            hmr: this.environment?.config.consumer !== 'server',
          });
          if (result.hasDevelopment) componentFiles.add(filename);
          // 映射交给 Vite 合并；框架插件不保存另一份项目图或输出缓存。
          return { code: result.code, map: result.map ? JSON.stringify(result.map) : null };
        } catch (error) {
          if (
            error instanceof Error &&
            'diagnostics' in error &&
            Array.isArray(error.diagnostics)
          ) {
            const first = error.diagnostics[0] as { line: number; column: number };
            this.error({
              message: error.message,
              id,
              loc: { file: filename, line: first.line, column: first.column - 1 },
            });
          }
          throw error;
        }
      },
    },
  } satisfies Rolldown.Plugin;
  return {
    ...compiler,
    name: 'zerodep-js',
    enforce: 'pre',
    async hotUpdate(context) {
      if (
        this.environment.config.consumer !== 'client' ||
        !componentFiles.has(normalizePath(context.file))
      )
        return;
      if (context.type === 'delete') {
        componentFiles.delete(normalizePath(context.file));
        this.environment.hot.send({ type: 'full-reload' });
        return [];
      }
      // 最后一个组件被移除时，新模块不再有自接收代码；直接刷新，避免旧回调失效后残留旧页面。
      const result = compile(await context.read(), normalizePath(context.file), {
        extensions: options.extensions ?? [],
        development: true,
        hmr: true,
      });
      if (!result.hasDevelopment) {
        componentFiles.delete(normalizePath(context.file));
        this.environment.hot.send({ type: 'full-reload' });
        return [];
      }
    },
    configResolved(config) {
      development = config.command === 'serve';
      // 相对模式按应用 root 解释；常规转换与预扫描共享这个闭包。
      filter = createFilter(options.include, options.exclude, { resolve: config.root });
    },
    config() {
      // 依赖扫描不执行 Vite 的常规 transform，必须看到同一份宏/JSX 转换结果。
      return { optimizeDeps: { rolldownOptions: { plugins: [compiler] } } };
    },
  };
}
