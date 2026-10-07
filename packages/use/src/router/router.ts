import { _tick, _snapshot, type Cleanup } from 'zerodep-js';
import { COMPONENT, source, unowned, type AnyComponent } from 'zerodep-js/internal';
import {
  _createMemoryHistory,
  internalURL,
  urlPath,
  type HistoryChange,
  type HistoryEntry,
  type RouterHistory,
} from './history.js';
import {
  matchRoutes,
  routePath,
  tableRecords,
  type AnyRoute,
  type Match,
  type RouteRecord,
} from './routes.js';
import {
  abortable,
  asRouteError,
  cancelled,
  location,
  RouteError,
  RouteRedirect,
  type DestinationOptions,
  type NavigationGuard,
  type NavigationOptions,
  type NavigationResult,
  type ResolvedMatch,
  type RouteArguments,
  type RouteLocation,
  type RouterSnapshot,
  type RouterState,
} from './navigation.js';

export interface RouterOptions {
  history?: RouterHistory;
  initial?: RouterSnapshot;
  preloadMaxAge?: number;
  preloadEntries?: number;
  scroll?: boolean;
  focus?: boolean;
  onError?: (error: unknown) => void;
}
export interface RouterInstance<T extends object = object> {
  readonly routes: T;
  readonly history: RouterHistory;
  readonly state: RouterState;
  readonly pending: RouteLocation | undefined;
  readonly error: RouteError | undefined;
  readonly disposed: boolean;
  href<R extends AnyRoute>(to: R, ...args: RouteArguments<NoInfer<R>>): string;
  href(to: string, options?: DestinationOptions): string;
  navigate<R extends AnyRoute>(
    to: R,
    ...args: RouteArguments<NoInfer<R>, Omit<NavigationOptions, keyof DestinationOptions>>
  ): Promise<NavigationResult>;
  navigate(to: string, options?: NavigationOptions): Promise<NavigationResult>;
  preload<R extends AnyRoute>(to: R, ...args: RouteArguments<NoInfer<R>>): Promise<void>;
  preload(to: string, options?: DestinationOptions): Promise<void>;
  resolve(): Promise<NavigationResult>;
  reload(): Promise<NavigationResult>;
  setSearch(
    search: NonNullable<DestinationOptions['search']>,
    options?: Omit<NavigationOptions, 'params' | 'search'>,
  ): Promise<NavigationResult>;
  beforeEach(guard: NavigationGuard): Cleanup;
  beforeLeave(route: AnyRoute, guard: NavigationGuard): Cleanup;
  afterEach(callback: (state: RouterState) => void): Cleanup;
  invalidate(route?: AnyRoute): void;
  dehydrate(): RouterSnapshot;
  start(): Cleanup;
  go(delta: number): void;
  dispose(): void;
}
interface Prepared {
  matches: ResolvedMatch[];
  error?: RouteError;
  errorIndex?: number;
}
interface Cached {
  promise: Promise<Prepared>;
  controller: AbortController;
  expires: number;
}
// 一个历史实例只交给一个控制器；窗口级历史另在适配器中限制所有者。
const ownedHistories = new WeakSet<RouterHistory>();
export function _createRouter<T extends object>(
  routes: T,
  options: RouterOptions = {},
): RouterInstance<T> {
  const definitions = tableRecords(routes);
  const refs = new Set(definitions.map((record) => record.ref));
  const history = options.history ?? _createMemoryHistory();
  if (ownedHistories.has(history)) throw new Error('history 已被路由器使用，请创建独立实例。');
  const maxAge = options.preloadMaxAge ?? 30_000;
  const maxEntries = options.preloadEntries ?? 32;
  if (!Number.isFinite(maxAge) || maxAge < 0 || !Number.isSafeInteger(maxEntries) || maxEntries < 1)
    throw new TypeError('预加载时限和缓存容量无效。');
  let initial = options.initial;
  if (
    initial &&
    (initial.version !== 1 ||
      typeof initial.href !== 'string' ||
      !Array.isArray(initial.matches) ||
      !['ready', 'not-found', 'error'].includes(initial.status))
  )
    throw new TypeError('无效的路由初始化快照。');
  const firstURL = internalURL(initial?.href ?? history.location.href, '/', history.origin);
  const current = source<RouterState>(
    Object.freeze({
      location: location(firstURL, initial ? initial.state : history.location.state),
      matches: [],
      status: 'idle',
      statusCode: 200,
      error: undefined,
      errorIndex: undefined,
    }),
  );
  const pending = source<RouteLocation | undefined>(undefined);
  const failure = source<RouteError | undefined>(undefined);
  const guards = new Set<NavigationGuard>();
  const leaveGuards = new Set<{ route: AnyRoute; guard: NavigationGuard }>();
  const after = new Set<(state: RouterState) => void>();
  const modules = new Map<RouteRecord, Promise<AnyComponent | undefined>>();
  const cache = new Map<string, Cached>();
  const positions = new Map<string, [number, number]>();
  let controller: AbortController | undefined;
  let job: Promise<NavigationResult> | undefined;
  let committedEntry = history.location;
  let stopHistory: Cleanup | undefined;
  let previousScroll: ScrollRestoration | undefined;
  let restoring: string | undefined;
  let writingHistory = false;
  let deferredHistory: HistoryChange | undefined;
  let disposed = false;

  function active() {
    if (disposed) throw new Error('路由器已销毁。');
  }
  function own(route: AnyRoute) {
    if (!refs.has(route)) throw new TypeError('路由引用不属于当前路由表。');
  }
  function report(error: unknown) {
    const normalized = asRouteError(error);
    failure.write(normalized);
    try {
      unowned(() => options.onError?.(error));
    } catch (callbackError) {
      failure.write(
        asRouteError(new AggregateError([error, callbackError], '导航与错误回调均失败。')),
      );
    }
  }
  function searchValues(
    url: URL,
    values: NonNullable<DestinationOptions['search']>,
    merge = false,
  ) {
    if (values instanceof URLSearchParams) {
      url.search = values.toString();
      return;
    }
    if (!merge) url.search = '';
    for (const [key, value] of Object.entries(values)) {
      url.searchParams.delete(key);
      if (value === undefined || value === null) continue;
      for (const item of Array.isArray(value) ? value : [value]) {
        if (
          !['string', 'number', 'boolean'].includes(typeof item) ||
          (typeof item === 'number' && !Number.isFinite(item))
        )
          throw new TypeError('查询值使用字符串、有限数字、布尔值或其数组。');
        url.searchParams.append(key, String(item));
      }
    }
  }
  function target(to: string | AnyRoute, opts: DestinationOptions = {}): URL {
    if (typeof to !== 'string') own(to);
    const url = internalURL(
      typeof to === 'string' ? to : routePath(to, opts.params),
      current.read().location.href,
      history.origin,
    );
    if (opts.search !== undefined) searchValues(url, opts.search);
    if (opts.hash !== undefined) url.hash = opts.hash;
    return url;
  }
  function component(record: RouteRecord): Promise<AnyComponent | undefined> {
    let found = modules.get(record);
    if (found) return found;
    found = Promise.resolve()
      .then(async () => {
        const result = record.definition.lazy
          ? await record.definition.lazy()
          : record.definition.component;
        const value =
          result && typeof result === 'object' && 'default' in result ? result.default : result;
        if (
          (record.definition.lazy || value !== undefined) &&
          (typeof value !== 'function' || typeof value[COMPONENT] !== 'function')
        )
          throw new TypeError(`路由 ${record.ref.name} 没有返回 component 组件。`);
        return value;
      })
      .catch((error) => {
        modules.delete(record);
        throw error;
      });
    modules.set(record, found);
    return found;
  }
  async function prepare(
    matches: Match[],
    url: URL,
    signal: AbortSignal,
    intent: 'navigate' | 'preload',
    restored?: RouterSnapshot,
  ): Promise<Prepared> {
    const result: ResolvedMatch[] = matches.map((match) => ({
      ...match,
      component: match.record.definition.component,
      data: undefined,
    }));
    // 代码下载并行开始，数据按父到子加载，parentData 因而有明确含义。
    const code = matches.map((match) =>
      component(match.record).then(
        (value) => ({ value }),
        (error) => ({ error }),
      ),
    );
    for (let index = 0; index < matches.length; index++) {
      const match = matches[index]!;
      try {
        const module = await abortable(code[index]!, signal);
        if ('error' in module) throw module.error;
        let data = restored
          ? restored.matches[index]!.data
          : await abortable(
              match.record.definition.load?.({
                params: match.params,
                search: match.search,
                url: new URL(url),
                signal,
                intent,
                parentData: result[index - 1]?.data,
              }),
              signal,
            );
        if (data instanceof RouteRedirect) throw data;
        if (match.record.definition.validateData)
          data = await abortable(match.record.definition.validateData(data), signal);
        if (signal.aborted) throw cancelled;
        result[index] = { ...match, component: module.value, data };
      } catch (error) {
        if (error === cancelled || signal.aborted || error instanceof RouteRedirect) throw error;
        return { matches: result, error: asRouteError(error), errorIndex: index };
      }
    }
    return { matches: result };
  }
  function prune() {
    for (const [key, value] of cache)
      if (value.expires <= Date.now()) {
        value.controller.abort();
        cache.delete(key);
      }
    while (cache.size > maxEntries) {
      const [key, value] = cache.entries().next().value!;
      value.controller.abort();
      cache.delete(key);
    }
  }
  function rememberPosition() {
    const browser = history.window;
    if (!browser || options.scroll === false) return;
    positions.delete(committedEntry.key);
    positions.set(committedEntry.key, [browser.scrollX, browser.scrollY]);
    while (positions.size > 100) positions.delete(positions.keys().next().value!);
  }
  async function settleView(
    url: URL,
    entry: HistoryEntry,
    isPop: boolean,
    signal: AbortSignal,
    scroll: boolean,
    focus: boolean,
  ) {
    if (!history.window || !stopHistory) return;
    await _tick();
    if (signal.aborted || disposed) return;
    const browser = history.window;
    let anchor: HTMLElement | null = null;
    try {
      if (url.hash) anchor = browser.document.getElementById(decodeURIComponent(url.hash.slice(1)));
    } catch {
      /* 无效 fragment 不影响已完成导航。 */
    }
    if (options.scroll !== false && scroll) {
      const saved = isPop ? positions.get(entry.key) : undefined;
      if (saved) browser.scrollTo(...saved);
      else if (anchor) anchor.scrollIntoView();
      else browser.scrollTo(0, 0);
    }
    if (options.focus !== false && focus && !isPop)
      browser.document
        .querySelector<HTMLElement>('[data-route-focus]')
        ?.focus({ preventScroll: true });
  }
  function writeHistory(write: () => HistoryEntry): HistoryEntry {
    writingHistory = true;
    let entry: HistoryEntry | undefined;
    try {
      return (entry = write());
    } finally {
      writingHistory = false;
      const change = deferredHistory;
      deferredHistory = undefined;
      // 跳过自己的通知；监听器造成的后续历史变更仍作为新导航处理。
      if (change && change.location !== entry) receive(change);
    }
  }
  function rollback(change: HistoryChange, previous: HistoryEntry) {
    if (history.location.key !== change.location.key) return;
    if (
      change.delta !== null &&
      previous.index !== change.location.index &&
      previous.group === change.location.group
    ) {
      restoring = previous.key;
      // 连续后退时 delta 只相对上一次原生事件，恢复距离必须相对已提交页面。
      history.go(previous.index - change.location.index);
    } else {
      committedEntry = writeHistory(() => history.replace(previous.href, previous.state));
    }
  }
  async function navigateInternal(
    to: string | AnyRoute,
    opts: NavigationOptions = {},
    change?: HistoryChange,
    restored?: RouterSnapshot,
  ): Promise<NavigationResult> {
    if (disposed) return { status: 'error', error: new RouteError(500, '路由器已销毁。') };
    let url: URL;
    try {
      url = target(to, opts);
    } catch (error) {
      report(error);
      return { status: 'error', error: asRouteError(error, 400) };
    }
    const from = current.read();
    if (
      !opts.force &&
      !change &&
      !restored &&
      from.status !== 'idle' &&
      urlPath(url) === from.location.href &&
      history.location.href === from.location.href &&
      !Object.hasOwn(opts, 'state')
    ) {
      controller?.abort();
      pending.write(undefined);
      return { status: 'unchanged' };
    }
    controller?.abort();
    const attempt = new AbortController();
    controller = attempt;
    const signal = attempt.signal;
    const previous = committedEntry;
    let redirected: { from: string; status: number } | undefined;
    rememberPosition();
    failure.write(undefined);
    let prepared: Prepared = { matches: [] };
    try {
      for (let redirects = 0; ; redirects++) {
        if (redirects > 16) throw new RouteError(500, '路由重定向形成循环。');
        pending.write(location(url, opts.state));
        let matches: Match[];
        try {
          matches =
            restored?.status === 'error' && !restored.matches.length
              ? []
              : matchRoutes(routes, url);
        } catch (error) {
          prepared = { matches: [], error: asRouteError(error, 400), errorIndex: 0 };
          break;
        }
        try {
          const redirectPath = matches.find(
            (match) => match.record.definition.redirect !== undefined,
          )?.record.definition.redirect;
          if (redirectPath !== undefined) throw new RouteRedirect(redirectPath);
          if (!restored) {
            const context = { from, to: { location: location(url, opts.state), matches }, signal };
            const selected = [...leaveGuards]
              .filter((item) => {
                const before = from.matches.find((match) => match.record.ref === item.route);
                const next = matches.find((match) => match.record.ref === item.route);
                return (
                  before && (!next || JSON.stringify(before.params) !== JSON.stringify(next.params))
                );
              })
              .map((item) => item.guard);
            for (const guard of [...selected, ...guards]) {
              const result = await abortable(
                unowned(() => guard(context)),
                signal,
              );
              if (result === false) {
                if (change) rollback(change, previous);
                attempt.abort();
                return { status: 'cancelled' };
              }
              if (result instanceof RouteRedirect) throw result;
            }
          }
          if (restored) {
            if (
              restored.matches.length !== matches.length ||
              restored.matches.some(
                (match, index) => match.name !== matches[index]?.record.ref.name,
              )
            )
              throw new RouteError(500, '路由快照与当前路由表不一致。');
            prepared = await prepare(matches, url, signal, 'navigate', restored);
            if (restored.status === 'error') {
              if (
                !restored.error ||
                !Number.isInteger(restored.error.index) ||
                restored.error.index < 0 ||
                restored.error.index > matches.length
              )
                throw new RouteError(500, '路由错误快照无效。');
              prepared.error = new RouteError(restored.error.status, restored.error.message);
              prepared.errorIndex = restored.error.index;
            }
          } else {
            prune();
            const cacheKey = urlPath(url);
            const cached = !opts.force && cache.get(cacheKey);
            if (cached) {
              // 被导航接管后脱离预加载淘汰规则，改由这次导航负责取消。
              cache.delete(cacheKey);
              const abort = () => cached.controller.abort();
              signal.addEventListener('abort', abort, { once: true });
              try {
                prepared = await abortable(cached.promise, signal);
              } finally {
                signal.removeEventListener('abort', abort);
              }
            } else prepared = await prepare(matches, url, signal, 'navigate');
          }
          break;
        } catch (error) {
          if (!(error instanceof RouteRedirect)) throw error;
          redirected ??= { from: urlPath(url), status: error.status };
          url = target(error.to, error.options);
          restored = undefined;
        }
      }
      if (signal.aborted || disposed) return { status: 'cancelled' };
      let entry = change?.location ?? history.location;
      if (!restored && (!change || redirected)) {
        try {
          entry = writeHistory(() =>
            opts.replace || change || redirected
              ? history.replace(urlPath(url), opts.state)
              : history.push(urlPath(url), opts.state),
          );
        } catch (error) {
          report(error);
          return { status: 'error', error: asRouteError(error) };
        }
      }
      if (signal.aborted || disposed) return { status: 'cancelled' };
      committedEntry = entry;
      const error = prepared.error;
      const state: RouterState = Object.freeze({
        location: location(url, restored ? restored.state : entry.state),
        matches: Object.freeze(prepared.matches),
        status: error ? 'error' : prepared.matches.length ? 'ready' : 'not-found',
        statusCode: error?.status ?? (prepared.matches.length ? 200 : 404),
        error,
        errorIndex: prepared.errorIndex,
      });
      current.write(state);
      if (error) report(error);
      for (const callback of [...after]) {
        try {
          unowned(() => callback(state));
        } catch (error) {
          report(error);
        }
      }
      await settleView(
        url,
        entry,
        change?.action === 'pop',
        signal,
        opts.scroll !== false,
        opts.focus ?? (from.status === 'idle' || from.location.pathname !== url.pathname),
      );
      return { status: 'committed', state, ...(redirected ? { redirect: redirected } : {}) };
    } catch (error) {
      if (error === cancelled || signal.aborted || disposed) return { status: 'cancelled' };
      if (change) rollback(change, previous);
      report(error);
      return { status: 'error', error: asRouteError(error) };
    } finally {
      if (controller === attempt) pending.write(undefined);
    }
  }
  const navigation = (
    to: string | AnyRoute,
    opts: NavigationOptions = {},
    change?: HistoryChange,
    restored?: RouterSnapshot,
  ) => (job = navigateInternal(to, opts, change, restored));
  const receive = (change: HistoryChange) => {
    // 前面的监听器可能已同步 push/replace；过期入口不能覆盖较新的导航。
    if (disposed || change.location !== history.location) return;
    if (writingHistory) {
      deferredHistory = change;
      return;
    }
    if (restoring === change.location.key) {
      restoring = undefined;
      committedEntry = change.location;
      return;
    }
    restoring = undefined;
    void navigation(change.location.href, { state: change.location.state, force: true }, change);
  };
  const router: RouterInstance<T> = {
    routes,
    history,
    get state() {
      return current.read();
    },
    get pending() {
      return pending.read();
    },
    get error() {
      return failure.read();
    },
    get disposed() {
      return disposed;
    },
    href: (to: string | AnyRoute, opts?: DestinationOptions) =>
      history.href(urlPath(target(to, opts))),
    navigate: (to: string | AnyRoute, opts?: NavigationOptions) => navigation(to, opts),
    async preload(to: string | AnyRoute, opts?: DestinationOptions) {
      active();
      const url = target(to, opts);
      const key = urlPath(url);
      prune();
      const existing = cache.get(key);
      if (existing) {
        await existing.promise;
        return;
      }
      const control = new AbortController();
      const entry: Cached = {
        controller: control,
        expires: Date.now() + maxAge,
        promise: Promise.resolve({ matches: [] }),
      };
      entry.promise = prepare(matchRoutes(routes, url), url, control.signal, 'preload')
        .then((result) => {
          if (result.error) throw result.error;
          return result;
        })
        .catch((error) => {
          if (cache.get(key) === entry) cache.delete(key);
          throw error === cancelled ? new DOMException('预加载已取消。', 'AbortError') : error;
        });
      cache.set(key, entry);
      prune();
      await entry.promise;
    },
    resolve() {
      active();
      if (job && pending.read()) return job;
      if (initial) {
        const restored = initial;
        initial = undefined;
        return navigation(
          restored.href,
          { replace: true, force: true, scroll: false },
          undefined,
          restored,
        );
      }
      if (current.read().status !== 'idle') return Promise.resolve({ status: 'unchanged' });
      return navigation(history.location.href, {
        replace: true,
        state: history.location.state,
        force: true,
        scroll: false,
      });
    },
    reload() {
      active();
      router.invalidate();
      return navigation(current.read().location.href, {
        replace: true,
        state: current.read().location.state,
        force: true,
        scroll: false,
      });
    },
    setSearch(values, opts = {}) {
      const url = internalURL(current.read().location.href, '/', history.origin);
      searchValues(url, values, true);
      return navigation(urlPath(url), {
        replace: true,
        state: current.read().location.state,
        scroll: false,
        ...opts,
      });
    },
    beforeEach(guard) {
      active();
      guards.add(guard);
      return () => {
        guards.delete(guard);
      };
    },
    beforeLeave(route, guard) {
      active();
      own(route);
      const item = { route, guard };
      leaveGuards.add(item);
      return () => {
        leaveGuards.delete(item);
      };
    },
    afterEach(callback) {
      active();
      after.add(callback);
      return () => {
        after.delete(callback);
      };
    },
    invalidate(route) {
      if (route) own(route);
      for (const [key, entry] of cache) {
        if (
          !route ||
          matchRoutes(routes, internalURL(key, '/', history.origin)).some(
            (match) => match.record.ref === route,
          )
        ) {
          entry.controller.abort();
          cache.delete(key);
        }
      }
    },
    dehydrate() {
      const state = current.read();
      if (state.status === 'idle' || pending.read())
        throw new Error('序列化路由前必须 await router.resolve。');
      return _snapshot({
        version: 1 as const,
        href: state.location.href,
        state: state.location.state,
        matches: state.matches.map((match) => ({ name: match.record.ref.name, data: match.data })),
        status: state.status,
        ...(state.error
          ? {
              error: {
                status: state.error.status,
                message: state.error.message,
                index: state.errorIndex ?? 0,
              },
            }
          : {}),
      });
    },
    start() {
      active();
      if (stopHistory) throw new Error('一个路由器只能挂载一次；请先解除旧挂载。');
      const detach = history.listen(receive);
      stopHistory = detach;
      if (history.window && options.scroll !== false) {
        previousScroll = history.window.history.scrollRestoration;
        history.window.history.scrollRestoration = 'manual';
      }
      if (current.read().status === 'idle') void router.resolve();
      else if (current.read().location.href !== history.location.href)
        void navigation(history.location.href, {
          replace: true,
          state: history.location.state,
          force: true,
        });
      else {
        // SSR 无法读取浏览器 history.state；接管完成后才恢复本页的原生历史数据。
        const state = current.read();
        if (state.location.state !== history.location.state)
          current.write(
            Object.freeze({
              ...state,
              location: Object.freeze({ ...state.location, state: history.location.state }),
            }),
          );
      }
      return () => {
        if (stopHistory !== detach) return;
        detach();
        stopHistory = undefined;
        controller?.abort();
        if (history.window && previousScroll !== undefined)
          history.window.history.scrollRestoration = previousScroll;
      };
    },
    go(delta) {
      active();
      history.go(delta);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      controller?.abort();
      stopHistory?.();
      stopHistory = undefined;
      if (history.window && previousScroll !== undefined)
        history.window.history.scrollRestoration = previousScroll;
      for (const entry of cache.values()) entry.controller.abort();
      cache.clear();
      modules.clear();
      positions.clear();
      guards.clear();
      leaveGuards.clear();
      after.clear();
      history.dispose();
      pending.write(undefined);
    },
  };
  ownedHistories.add(history);
  return Object.freeze(router);
}
