import { beforeEach, expect, it, vi } from 'vitest';
import { zerodep } from '../src/index.js';

const backend = vi.hoisted(() => ({
  compile: vi.fn(async () => ({ code: 'export {};', map: null, hasDevelopment: false })),
  close: vi.fn(async () => {}),
}));
const createCompiler = vi.hoisted(() => vi.fn(() => backend));
vi.mock('zerodep-js-native', () => ({ createCompiler }));
beforeEach(() => vi.clearAllMocks());

async function open(command: 'serve' | 'build') {
  const plugin = zerodep();
  Reflect.apply(plugin.configResolved as Function, undefined, [{ root: process.cwd(), command }]);
  const transform = plugin.transform as { handler: Function };
  await Reflect.apply(
    transform.handler,
    {
      error: (error: Error) => {
        throw error;
      },
    },
    ['export {};', process.cwd() + '/fixture.ts'],
  );
  return plugin;
}

it('中间件开发服务器关闭时释放原生进程，即使 watchMode 为 true', async () => {
  const plugin = await open('serve');
  expect(createCompiler).toHaveBeenCalledWith({ root: process.cwd(), check: false });
  await Reflect.apply(plugin.closeBundle as Function, { meta: { watchMode: true } }, []);
  await Reflect.apply(plugin.closeBundle as Function, { meta: { watchMode: true } }, []);
  expect(backend.close).toHaveBeenCalledTimes(1);
});

it('构建 watch 保留编译服务到 watcher 关闭，普通构建直接关闭', async () => {
  const watching = await open('build');
  expect(createCompiler).toHaveBeenCalledWith({ root: process.cwd(), check: true });
  await Reflect.apply(watching.closeBundle as Function, { meta: { watchMode: true } }, []);
  expect(backend.close).not.toHaveBeenCalled();
  await Reflect.apply(watching.closeWatcher as Function, undefined, []);
  expect(backend.close).toHaveBeenCalledTimes(1);
  const build = await open('build');
  await Reflect.apply(build.closeBundle as Function, { meta: { watchMode: false } }, []);
  expect(backend.close).toHaveBeenCalledTimes(2);
});
