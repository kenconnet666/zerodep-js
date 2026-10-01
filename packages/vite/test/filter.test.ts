import { expect, it } from 'vitest';
import { resolve } from 'node:path';
import { zerodep, type ZerodepOptions } from '../src/index.js';

type Transform = (
  this: { error(error: { message: string }): never },
  code: string,
  id: string,
) => { code: string } | null;
function transforms(options: ZerodepOptions) {
  const plugin = zerodep(options);
  const root = resolve('fixture-app').replaceAll('\\', '/');
  // 仅传入这两个钩子实际需要的配置，验证预扫描和常规转换持有同一规则。
  if (typeof plugin.configResolved !== 'function' || typeof plugin.config !== 'function')
    throw new Error('预期为同步配置钩子。');
  Reflect.apply(plugin.configResolved, undefined, [{ root }]);
  const config: {
    optimizeDeps: { rolldownOptions: { plugins: Array<{ transform: { handler: Transform } }> } };
  } = Reflect.apply(plugin.config, undefined, [{}, { command: 'serve', mode: 'development' }]);
  const handlers = [
    (plugin.transform as { handler: Transform }).handler,
    config.optimizeDeps.rolldownOptions.plugins[0]!.transform.handler,
  ];
  return {
    root,
    run: (code: string, id: string) =>
      handlers.map((handler) =>
        handler.call(
          {
            error(error) {
              throw new Error(error.message);
            },
          },
          code,
          id,
        ),
      ),
  };
}
const source = `import { _state } from 'zerodep-js'; let count = _state(0); count++;`;

it('目录范围按项目 root 解释，查询不影响选择，排除其他 JSX 和宿主模块', () => {
  const { root, run } = transforms({ include: 'src/page/**', exclude: '**/*.skip.tsx' });
  for (const result of run(source, `${root}/src/page/state.ts?import`))
    expect(result?.code).toContain('.state(');
  for (const path of [
    'src/react/App.tsx',
    'src/page/ignored.skip.tsx',
    'src/page/native.svelte.ts',
    'src/page/types.d.ts',
    'node_modules/pkg/state.ts',
  ])
    expect(run(source, `${root}/${path}`)).toEqual([null, null]);
});

it('Windows 路径与虚拟模块在两条管线中的行为一致', () => {
  const { run } = transforms({ include: /\/src\/page\// });
  for (const result of run(source, 'C:\\project\\src\\page\\counter.mts?direct'))
    expect(result?.code).toContain('.state(');
  expect(run(source, '\0virtual:src/page/view.tsx')).toEqual([null, null]);
});
