import { AsyncLocalStorage } from 'node:async_hooks';
import { createRuleRegistry, type CssRule, type CssInput } from './registry.js';
import { serializeStyleRules } from './serialization.js';
export { serializeCssRules } from './serialization.js';

export interface ServerCssHost {
  mergeClasses(...values: readonly (string | null | undefined | false)[]): string;
  css(...parts: CssInput[]): string;
  keyframes(...parts: CssInput[]): string;
  globalCss(key: string, ...parts: CssInput[]): void;
  readonly nonce?: string;
  rules(): CssRule[];
  cssText(): string;
}

const current = new AsyncLocalStorage<ServerCssHost>();

export function createServerCssHost(options: { nonce?: string } = {}): ServerCssHost {
  const registry = createRuleRegistry(() => {});
  return {
    mergeClasses: registry.mergeClasses,
    css: registry.css,
    keyframes: registry.keyframes,
    globalCss: registry.globalCss,
    ...(options.nonce === undefined ? {} : { nonce: options.nonce }),
    rules: registry.rules,
    cssText: () => serializeStyleRules(registry.rules()),
  };
}

/** 请求异步链路独占规则收集器，避免并发 SSR 写入同一张表。 */
export function withCssHost<T>(host: ServerCssHost, render: () => T): T {
  return current.run(host, render);
}

export function css(...parts: CssInput[]): string {
  const host = current.getStore();
  if (!host) throw new Error('CSS server host is unavailable.');
  return host.css(...parts);
}

export function requireHost(): ServerCssHost {
  const host = current.getStore();
  if (!host) throw new Error('CSS server host is unavailable.');
  return host;
}
export const keyframes = (...parts: CssInput[]): string => requireHost().keyframes(...parts);
export const _mergeClasses = (...values: readonly (string | null | undefined | false)[]): string =>
  requireHost().mergeClasses(...values);
export type { CssValue } from './value-types.js';
export const globalCss = (key: string, ...parts: CssInput[]): void =>
  requireHost().globalCss(key, ...parts);

export * from './generated/author.js';
export { className } from './names.js';
export type { CssString } from './generated/base.js';
export type { CssRule, CssInput } from './registry.js';
export type { CssSelector } from './selectors.js';
export { createCssContext } from './context.js';

export { UiTheme, type UiColors } from './theme/theme.js';
export { LightTheme, lightTheme } from './theme/light.js';
export { DarkTheme, darkTheme } from './theme/dark.js';
