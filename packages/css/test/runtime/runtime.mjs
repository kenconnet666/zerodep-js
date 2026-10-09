import { existsSync } from 'node:fs';
import { registerHooks } from 'node:module';

const sourceRoot = new URL('../../src/', import.meta.url);
// Node 24 直接执行 TS 源码；仅在本包源码范围映射 .js 导入，覆盖率才能落在人工维护的文件上。
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (context.parentURL?.startsWith(sourceRoot.href) && specifier.endsWith('.js')) {
      const source = new URL(specifier.slice(0, -3) + '.ts', context.parentURL);
      if (existsSync(source)) return nextResolve(source.href, context);
    }
    return nextResolve(specifier, context);
  },
});
export const { createRuleRegistry, ruleText } = await import('../../src/registry.ts');
export const { className, hash } = await import('../../src/names.ts');
export const { serializeCssRules } = await import('../../src/serialization.ts');
export const { createServerCssHost, withCssHost, css } = await import('../../src/server.ts');
