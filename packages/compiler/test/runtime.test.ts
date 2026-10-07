import { expect, it } from 'vitest';
import * as runtime from '../../core/src/internal.js';
import { execute } from './execute.js';
import { compile } from '../src/index.js';

it('协议不匹配在应用初始化前报错，匹配协议可以正常执行', () => {
  let initialized = 0;
  const source = `import { _state } from 'zerodep-js';
let value = _state(initialize());const result = value;`;
  const initialize = () => ++initialized;
  expect(() =>
    execute(source, {
      initialize,
      runtime: {
        ...runtime,
        assertRuntime: (expected: number) => runtime.assertRuntime(expected + 1),
      },
    }),
  ).toThrow('ZJ_RUNTIME_ABI');
  expect(initialized).toBe(0);
  expect(execute(source, { initialize })).toBe(1);
});

it('不含框架转换的普通模块没有新增运行时依赖', () => {
  expect(compile('export const answer: number = 42;', 'plain.ts').code).not.toContain(
    'assertRuntime',
  );
});
