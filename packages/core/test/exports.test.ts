import { expect, it } from 'vitest';
import * as core from 'zerodep-js';
import * as router from 'zerodep-js/router';
import * as storage from 'zerodep-js/storage';

it('公开函数使用单下划线，不保留旧函数导出或兼容别名', () => {
  for (const [module, oldNames] of [
    [
      core,
      [
        '$state',
        '$derived',
        'component',
        'effect',
        'mount',
        'hydrate',
        'onCleanup',
        'onMount',
        'snapshot',
      ],
    ],
    [router, ['createRouter', 'defineRoute', 'defineRoutes', 'useRoute', 'useRouter', 'redirect']],
    [storage, ['persistLocal', 'persistSession']],
  ] as const) {
    for (const name of oldNames) {
      expect(Object.hasOwn(module, name)).toBe(false);
      expect(typeof Reflect.get(module, '_' + name.replace(/^\$/, ''))).toBe('function');
    }
  }
  expect(core.For).toBeTypeOf('function');
  expect(router.Router).toBeTypeOf('function');
});
