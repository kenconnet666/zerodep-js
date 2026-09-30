import { runInNewContext } from 'node:vm';
import * as runtime from '../../core/src/internal.js';
import * as publicRuntime from '../../core/src/index.js';
import { compile } from '../src/index.js';

export function execute(source: string, extra: Record<string, unknown> = {}): unknown {
  const output = compile(source, 'example.tsx', { runtimeModule: 'test-runtime' });
  // 仅接线测试沙盒的模块导入，变量转换、严格模式与运行时都按真实模块执行。
  const code = output.code
    .replace(/import \* as (\w+) from ["']test-runtime["'];?/, 'const $1 = runtime;')
    .replace(
      /^import \{([^}]+)\} from ["']@zerodep-js\/core["'];?/gm,
      (_statement, names: string) => {
        const bindings = names
          .split(',')
          .map((name) => name.trim().replace(/\s+as\s+/, ': '))
          .join(', ');
        return `const { ${bindings} } = publicRuntime;`;
      },
    );
  return runInNewContext(`"use strict";\n${code}\nresult;`, { runtime, publicRuntime, ...extra });
}
