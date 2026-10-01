import type { Plugin, Rolldown } from 'vite';
import { compile, CompileError } from 'zerodep-js-compiler';

export function zerodep(): Plugin {
  const compiler = {
    name: 'zerodep-js:compile',
    transform: {
      order: 'pre',
      handler(code, id) {
        const filename = id.split('?')[0]!;
        if (
          id.startsWith('\0') ||
          /[/\\]node_modules[/\\]/.test(filename) ||
          !/\.(?:[jt]sx?|m[jt]s)$/.test(filename)
        )
          return null;
        // 已发布的 JS 依赖不重编译；应用的 TS/TSX 和显式 JSX 使用同一入口。
        if (/\.m?js$/.test(filename) && !code.includes('zerodep-js')) return null;
        try {
          const result = compile(code, filename);
          // 使用标准 JSON 边界，避免把 Babel 的 readonly 映射类型强制断言成 Rolldown 可变数组。
          return { code: result.code, map: result.map ? JSON.stringify(result.map) : null };
        } catch (error) {
          if (error instanceof CompileError) {
            const first = error.diagnostics[0]!;
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
    config() {
      // 依赖扫描不执行 Vite 的常规 transform，必须看到同一份宏/JSX 转换结果。
      return { optimizeDeps: { rolldownOptions: { plugins: [compiler] } } };
    },
  };
}
