import { AsyncLocalStorage } from 'node:async_hooks';
import type { CssInput } from '../util/author.js';
import type { ServerCssHost } from './rules.js';

const current = new AsyncLocalStorage<ServerCssHost>();

/** 请求异步链路独占规则收集器，避免并发 SSR 写入同一张表。 */
export function withCssHost<T>(host: ServerCssHost, render: () => T): T {
  return current.run(host, render);
}

export function css(...parts: CssInput[]): string {
  return requireHost().css(...parts);
}

function requireHost(): ServerCssHost {
  const host = current.getStore();
  if (!host) throw new Error('CSS server host is unavailable.');
  return host;
}
export const keyframes = (...parts: CssInput[]): string => requireHost().keyframes(...parts);
export const _mergeClasses = (...values: readonly (string | null | undefined | false)[]): string =>
  requireHost().mergeClasses(...values);
export const globalCss = (key: string, ...parts: CssInput[]): void =>
  requireHost().globalCss(key, ...parts);
