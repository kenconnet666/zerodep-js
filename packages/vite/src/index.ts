import type { Plugin } from 'vite';
import { compile, CompileError } from '@zerodep-js/compiler';

export function zerodep(): Plugin {
  return {
    name: 'zerodep-js',
    enforce: 'pre',
    transform(code, id) {
      const filename = id.split('?')[0]!;
      if (
        id.startsWith('\0') ||
        /[/\\]node_modules[/\\]/.test(filename) ||
        !/\.[jt]sx?$/.test(filename)
      )
        return null;
      // 已发布的 JS 依赖不重编译；应用的 TS/TSX 和显式 JSX 使用同一入口。
      if (filename.endsWith('.js') && !code.includes('@zerodep-js/core')) return null;
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
  };
}
