import { createServer, normalizePath, resolveConfig } from 'vite';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';

it.each(['docs', 'example'])('%s 的开发与应用构建直接关联源码，CSS 按环境选择宿主', async (app) => {
  const configFile = resolve(`apps/${app}/vite.config.ts`);
  const root = resolve(`apps/${app}`);
  const importer = resolve(root, 'src/main.ts');
  const server = await createServer({
    configFile,
    root,
    server: { middlewareMode: true, hmr: false },
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  try {
    const production = await resolveConfig({ configFile, root }, 'build');
    for (const [name, folder] of [
      ['zerodep-js', 'core'],
      ['zerodep-js-css', 'css'],
      ['zerodep-js-ui', 'ui'],
    ]) {
      const entry = await server.environments.client!.pluginContainer.resolveId(name!, importer);
      expect(normalizePath(entry!.id)).toBe(
        normalizePath(resolve(`packages/${folder}/src/index.ts`)),
      );
      const builtEntry = await production.createResolver()(name!, importer);
      expect(normalizePath(builtEntry!)).toBe(
        normalizePath(resolve(`packages/${folder}/src/index.ts`)),
      );
    }
    const cssEntry = resolve('packages/css/src/index.ts');
    for (const [environment, host] of [
      ['client', 'browser'],
      ['ssr', 'server'],
    ]) {
      const entry = await server.environments[environment!]!.pluginContainer.resolveId(
        './runtime/server.js',
        cssEntry,
      );
      expect(normalizePath(entry!.id)).toBe(
        normalizePath(resolve(`packages/css/src/runtime/${host}.ts`)),
      );
    }
    const component = await server.transformRequest(
      '/@fs/' + normalizePath(resolve('packages/ui/src/base/Button.tsx')),
    );
    expect(component?.code).toContain('import.meta.hot.accept');
    expect(component?.code).not.toMatch(/_component\s*\(/);
  } finally {
    await server.close();
  }
});
