import { snapshot } from '../snapshot.js';
import type { Cleanup } from '../reactivity.js';

export interface HistoryEntry {
  readonly href: string;
  readonly state: unknown;
  readonly key: string;
  readonly index: number;
  readonly group: string;
}
export interface HistoryChange {
  readonly action: 'push' | 'replace' | 'pop';
  readonly location: HistoryEntry;
  /** 不属于同一段受管理历史时为 null，不能猜测 history.go 的距离。 */
  readonly delta: number | null;
}
export interface RouterHistory {
  readonly kind: 'memory' | 'browser' | 'hash';
  readonly origin: string;
  readonly location: HistoryEntry;
  readonly window?: Window | undefined;
  href(path: string): string;
  push(path: string, state?: unknown): HistoryEntry;
  replace(path: string, state?: unknown): HistoryEntry;
  go(delta: number): void;
  listen(listener: (event: HistoryChange) => void): Cleanup;
  dispose(): void;
}

export function internalURL(path: string, base: string, origin: string): URL {
  const url = new URL(path, origin + base);
  if (url.origin !== origin || !['http:', 'https:'].includes(url.protocol))
    throw new TypeError('路由只管理当前 origin；外部地址请使用普通链接。');
  return url;
}
export const urlPath = (url: URL): string => url.pathname + url.search + url.hash;

export function createMemoryHistory(
  initial:
    | string
    | { entries: readonly (string | { href: string; state?: unknown })[]; index?: number } = '/',
): RouterHistory {
  const values = typeof initial === 'string' ? [initial] : initial.entries;
  if (!values.length) throw new TypeError('内存历史至少需要一个入口。');
  const first = typeof values[0] === 'string' ? values[0] : values[0]!.href;
  const origin = new URL(first, 'http://zerodep.local').origin;
  let serial = 0;
  const make = (
    href: string,
    state: unknown,
    index: number,
    key = `memory-${serial++}`,
  ): HistoryEntry =>
    Object.freeze({
      href: urlPath(internalURL(href, '/', origin)),
      state: snapshot(state),
      key,
      index,
      group: 'memory',
    });
  let entries = values.map((value, index) =>
    typeof value === 'string'
      ? make(value, undefined, index)
      : make(value.href, value.state, index),
  );
  let position = typeof initial === 'string' ? 0 : (initial.index ?? entries.length - 1);
  if (!Number.isInteger(position) || position < 0 || position >= entries.length)
    throw new TypeError('无效的内存历史位置。');
  let disposed = false;
  const listeners = new Set<(event: HistoryChange) => void>();
  const active = () => {
    if (disposed) throw new Error('历史已销毁。');
  };
  const emit = (action: HistoryChange['action'], delta: number) => {
    for (const listener of [...listeners])
      listener({ action, delta, location: entries[position]! });
  };
  return {
    kind: 'memory',
    origin,
    get location() {
      return entries[position]!;
    },
    href: (path) => urlPath(internalURL(path, entries[position]!.href, origin)),
    push(path, state) {
      active();
      const next = make(
        urlPath(internalURL(path, entries[position]!.href, origin)),
        state,
        position + 1,
      );
      entries = [...entries.slice(0, position + 1), next];
      position++;
      emit('push', 1);
      return next;
    },
    replace(path, state) {
      active();
      entries[position] = make(
        urlPath(internalURL(path, entries[position]!.href, origin)),
        state,
        position,
        entries[position]!.key,
      );
      emit('replace', 0);
      return entries[position]!;
    },
    go(delta) {
      active();
      if (!Number.isInteger(delta)) throw new TypeError('历史偏移必须为整数。');
      const next = Math.max(0, Math.min(entries.length - 1, position + delta));
      if (next === position) return;
      const change = next - position;
      position = next;
      emit('pop', change);
    },
    listen(listener) {
      active();
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    dispose() {
      disposed = true;
      listeners.clear();
    },
  };
}

const marker = '__zerodep_history_v1';
const windows = new WeakSet<Window>();
type NativeState = { [marker]: { group: string; key: string; index: number }; user: unknown };
function nativeState(value: unknown): value is NativeState {
  if (!value || typeof value !== 'object' || !Object.hasOwn(value, marker)) return false;
  const item: unknown = Reflect.get(value, marker);
  return (
    !!item &&
    typeof item === 'object' &&
    typeof Reflect.get(item, 'group') === 'string' &&
    typeof Reflect.get(item, 'key') === 'string' &&
    Number.isSafeInteger(Reflect.get(item, 'index'))
  );
}
function createWindowHistory(kind: 'browser' | 'hash', target?: Window): RouterHistory {
  const browser = target ?? (typeof window === 'undefined' ? undefined : window);
  if (!browser) throw new Error('浏览器 history 在 SSR 中不可用，请使用 createMemoryHistory。');
  if (windows.has(browser)) throw new Error('此窗口已有 history 实例，请先销毁原实例。');
  const origin = browser.location.origin;
  let serial = 0;
  const id = () =>
    `${Date.now().toString(36)}-${(serial++).toString(36)}-${Math.random().toString(36).slice(2)}`;
  const readHref = () =>
    kind === 'hash'
      ? urlPath(internalURL(browser.location.hash.slice(1) || '/', '/', origin))
      : browser.location.pathname + browser.location.search + browser.location.hash;
  const external = (path: string) =>
    kind === 'hash' ? browser.location.pathname + browser.location.search + '#' + path : path;
  let current!: HistoryEntry;
  let disposed = false;
  const listeners = new Set<(event: HistoryChange) => void>();
  const packet = (entry: HistoryEntry): NativeState => ({
    [marker]: { group: entry.group, key: entry.key, index: entry.index },
    user: snapshot(entry.state),
  });
  function read(): HistoryEntry {
    const state: unknown = browser!.history.state;
    const location = nativeState(state)
      ? { ...state[marker], href: readHref(), state: state.user }
      : { group: id(), key: id(), index: 0, href: readHref(), state };
    if (!nativeState(state))
      browser!.history.replaceState(packet(location), '', browser!.location.href);
    return Object.freeze(location);
  }
  current = read();
  windows.add(browser);
  function emit(action: HistoryChange['action'], previous: HistoryEntry) {
    const delta = current.group === previous.group ? current.index - previous.index : null;
    for (const listener of [...listeners]) listener({ action, delta, location: current });
  }
  const receive = () => {
    const previous = current;
    const next = read();
    if (next.key === previous.key && next.href === previous.href) return; // hashchange/popstate 可能成对发生。
    current = next;
    emit('pop', previous);
  };
  const stop = () => {
    browser.removeEventListener('popstate', receive);
    if (kind === 'hash') browser.removeEventListener('hashchange', receive);
  };
  const active = () => {
    if (disposed) throw new Error('历史已销毁。');
  };
  return {
    kind,
    origin,
    window: browser,
    get location() {
      return current;
    },
    href: (path) => external(urlPath(internalURL(path, current.href, origin))),
    push(path, state) {
      active();
      const previous = current;
      const next = Object.freeze({
        ...current,
        href: urlPath(internalURL(path, current.href, origin)),
        state: snapshot(state),
        key: id(),
        index: current.index + 1,
      });
      browser.history.pushState(packet(next), '', external(next.href));
      current = next;
      emit('push', previous);
      return next;
    },
    replace(path, state) {
      active();
      const previous = current;
      const next = Object.freeze({
        ...current,
        href: urlPath(internalURL(path, current.href, origin)),
        state: snapshot(state),
      });
      browser.history.replaceState(packet(next), '', external(next.href));
      current = next;
      emit('replace', previous);
      return next;
    },
    go(delta) {
      active();
      if (!Number.isInteger(delta)) throw new TypeError('历史偏移必须为整数。');
      if (delta) browser.history.go(delta);
    },
    listen(listener) {
      active();
      if (!listeners.size) {
        browser.addEventListener('popstate', receive);
        if (kind === 'hash') browser.addEventListener('hashchange', receive);
      }
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (!listeners.size) stop();
      };
    },
    dispose() {
      if (!disposed) {
        disposed = true;
        stop();
        listeners.clear();
        windows.delete(browser);
      }
    },
  };
}

export const createBrowserHistory = (options: { window?: Window } = {}): RouterHistory =>
  createWindowHistory('browser', options.window);
export const createHashHistory = (options: { window?: Window } = {}): RouterHistory =>
  createWindowHistory('hash', options.window);
