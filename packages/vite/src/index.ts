import { createFilter, normalizePath, type FilterPattern, type Plugin, type Rolldown } from 'vite';

export interface ZerodepOptions {
  include?: FilterPattern;
  exclude?: FilterPattern;
  compiler?: 'babel' | 'native';
  /** 原生构建默认检查类型；开发态由语言服务检查，避免阻塞热更新。框架诊断始终执行。 */
  typeCheck?: boolean;
}

interface Backend {
  compile(
    source: string,
    filename: string,
    options: { development: boolean; hmr: boolean },
  ):
    | { code: string; map: unknown; hasDevelopment: boolean }
    | Promise<{ code: string; map: unknown; hasDevelopment: boolean }>;
  invalidate?(filename: string, event?: 'create' | 'update' | 'delete'): void;
  close?(): void | Promise<void>;
}

export function zerodep(options: ZerodepOptions = {}): Plugin {
  let filter = createFilter(options.include, options.exclude);
  let development = false;
  let root = process.cwd();
  let backend: Promise<Backend> | undefined;
  const load = () =>
    (backend ??= (async () => {
      if (options.compiler === 'native') {
        const native = await import('zerodep-js-native');
        return native.createCompiler({ root, check: options.typeCheck ?? !development });
      }
      return import('zerodep-js-compiler');
    })());
  const close = async () => {
    const current = backend;
    backend = undefined;
    if (current) await (await current).close?.();
  };
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
          /(?:\.svelte\.[jt]s|\.d\.[cm]?ts)$/.test(filename) ||
          !filter(filename)
        )
          return null;
        // 已发布的 JS 依赖不重编译；应用的 TS/TSX 和显式 JSX 使用同一入口。
        if (/\.m?js$/.test(filename) && !code.includes('zerodep-js')) return null;
        try {
          const result = await (
            await load()
          ).compile(code, filename, {
            development,
            hmr: this.environment?.config.consumer !== 'server',
          });
          if (result.hasDevelopment) componentFiles.add(filename);
          // 使用标准 JSON 边界，避免把 Babel 的 readonly 映射类型强制断言成 Rolldown 可变数组。
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
    async watchChange(id, change) {
      if (backend) (await backend).invalidate?.(id, change.event);
    },
    async closeBundle() {
      if (!this.meta.watchMode) await close();
    },
    async closeWatcher() {
      await close();
    },
    configureServer(server) {
      server.httpServer?.once('close', () => {
        void close().catch((error: Error) => server.config.logger.error(error.message));
      });
    },
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
      const result = await (
        await load()
      ).compile(await context.read(), normalizePath(context.file), {
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
      root = config.root;
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
