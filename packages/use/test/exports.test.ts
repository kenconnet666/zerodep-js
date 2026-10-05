import { expect, it } from 'vitest';
import * as router from 'zerodep-use/router';
import * as storage from 'zerodep-use/storage';

it('应用工具子入口直接提供下划线函数及路由组件', () => {
  for (const [module, names] of [
    [router, ['createRouter', 'defineRoute', 'defineRoutes', 'useRoute', 'useRouter', 'redirect']],
    [storage, ['persistLocal', 'persistSession']],
  ] as const)
    for (const name of names) {
      expect(Object.hasOwn(module, name)).toBe(false);
      expect(Reflect.get(module, '_' + name)).toBeTypeOf('function');
    }
  expect(router.Router).toBeTypeOf('function');
  expect(router.Outlet).toBeTypeOf('function');
  expect(router.Link).toBeTypeOf('function');
});
