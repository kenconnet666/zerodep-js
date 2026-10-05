import { expect, it } from 'vitest';
import * as core from 'zerodep-js';

it('公开函数使用单下划线，不保留旧函数导出或兼容别名', () => {
  for (const name of [
    '$state',
    '$derived',
    'component',
    'effect',
    'mount',
    'hydrate',
    'onCleanup',
    'onMount',
    'snapshot',
  ]) {
    expect(Object.hasOwn(core, name)).toBe(false);
    expect(typeof Reflect.get(core, '_' + name.replace(/^\$/, ''))).toBe('function');
  }
  expect(core.For).toBeTypeOf('function');
});
