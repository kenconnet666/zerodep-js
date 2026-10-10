import { runInNewContext } from 'node:vm';
import * as runtime from '../../core/src/internal.js';
import * as publicRuntime from '../../core/src/index.js';
import { compile } from '../src/index.js';
import * as cssRuntime from 'zerodep-js-css';
import * as cssCoreRuntime from 'zerodep-js/internal';
import * as cssPublicRuntime from 'zerodep-js';
import { css } from 'zerodep-js-css';

export function execute(source: string, extra: Record<string, unknown> = {}): unknown {
  const usesCss = source.includes('zerodep-js-css');
  const output = compile(source, 'example.tsx', { runtimeModule: 'test-runtime' });
  // 仅接线测试沙盒的模块导入，变量转换、严格模式与运行时都按真实模块执行。
  const code = output.code
    .replace(/^import \* as (\w+) from ["']zerodep-js-css["'];?/gm, 'const $1 = cssRuntime;')
    .replace(
      /^import \{([^}]+)\} from ["']zerodep-js-css["'];?/gm,
      (_statement, names: string) =>
        `const { ${names.trim().replace(/\s+as\s+/, ': ')} } = cssPublic;`,
    )
    .replace(/import \* as (\w+) from ["']test-runtime["'];?/, 'const $1 = runtime;')
    .replace(/^import \{([^}]+)\} from ["']zerodep-js["'];?/gm, (_statement, names: string) => {
      const bindings = names
        .split(',')
        .map((name) => name.trim().replace(/\s+as\s+/, ': '))
        .join(', ');
      return `const { ${bindings} } = publicRuntime;`;
    });
  const linked = code.replace(
    /^import \* as (\w+) from ["']zerodep-js["'];?/gm,
    'const $1 = publicRuntime;',
  );
  return runInNewContext(`"use strict";\n${linked}\nresult;`, {
    runtime: usesCss ? cssCoreRuntime : runtime,
    publicRuntime: usesCss ? cssPublicRuntime : publicRuntime,
    cssRuntime,
    cssPublic: { css },
    ...extra,
  });
}
