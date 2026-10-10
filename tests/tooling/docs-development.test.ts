import { createServer, normalizePath, resolveConfig } from 'vite';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';

it('文档开发读取UI源码并生成HMR，生产构建仍读取包产物', async () => {
  const configFile = resolve('apps/docs/vite.config.ts');
  const root = resolve('apps/docs');
  const importer = resolve(root, 'src/main.ts');
  const server = await createServer({
    configFile,
    root,
    server: { middlewareMode: true, hmr: false },
    optimizeDeps: { noDiscovery: true, include: [] },
  });
  try {
    const entry = await server.environments.client!.pluginContainer.resolveId(
      'zerodep-js-ui',
      importer,
    );
    expect(normalizePath(entry!.id)).toBe(normalizePath(resolve('packages/ui/src/index.ts')));
    const component = await server.transformRequest(
      '/@fs/' + normalizePath(resolve('packages/ui/src/base/Button.tsx')),
    );
    expect(component?.code).toContain('import.meta.hot.accept');
    expect(component?.code).not.toMatch(/_component\s*\(/);
    const production = await resolveConfig({ configFile, root }, 'build');
    const builtEntry = await production.createResolver()('zerodep-js-ui', importer);
    expect(normalizePath(builtEntry!)).toBe(normalizePath(resolve('packages/ui/dist/index.js')));
  } finally {
    await server.close();
  }
});
