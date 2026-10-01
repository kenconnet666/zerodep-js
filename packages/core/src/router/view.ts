import { defineComponent } from '../component.js';
import { createContext, provideContext, useContext } from '../context.js';
import { ErrorBoundary } from '../flow.js';
import { effect, getScope, onCleanup } from '../reactivity.js';
import { onMount } from '../lifecycle.js';
import { props, restProps, type Props } from '../props.js';
import { dynamic, dynamicElement, element, type Renderable } from '../template.js';
import { attributeValue, HTML } from '../native.js';
import type { NativeProps } from '../jsx-runtime.js';
import type { Router as RouterInstance } from './router.js';
import type { AnyRoute, RouteRef, Search, RouteRecord } from './routes.js';
import {
  asRouteError,
  type DestinationOptions,
  type NavigationGuard,
  type NavigationOptions,
  type RouteOptions,
  type RouteView,
} from './navigation.js';

export interface RouterProps {
  router: RouterInstance;
  pending?: Renderable;
  notFound?: Renderable;
  error?: (error: ReturnType<typeof asRouteError>, retry: () => void) => Renderable;
}
interface Level {
  router: RouterInstance;
  depth: number;
  input: RouterProps;
}
const context = createContext<Level>();
const mounted = new WeakSet<RouterInstance>();
function currentLevel(): Level {
  const level = useContext(context);
  if (!level) throw new Error('路由组件与 hook 必须位于 Router 内部。');
  return level;
}
export function useRouter(): RouterInstance {
  return currentLevel().router;
}
export function useRoute<R extends AnyRoute>(route: R): RouteView<R>;
export function useRoute(): RouteView<RouteRef<string, Search, unknown>>;
export function useRoute(route?: AnyRoute): RouteView<AnyRoute> {
  const level = currentLevel();
  const index = level.depth - 1;
  const read = () => {
    const matches = level.router.state.matches;
    const match = route ? matches.find((item) => item.record.ref === route) : matches[index];
    if (!match) throw new Error('当前组件没有匹配所请求的路由。');
    return match;
  };
  read();
  return Object.freeze({
    get params() {
      return read().params;
    },
    get search() {
      return read().search as Search;
    },
    get data() {
      return read().data;
    },
    get error() {
      return level.router.state.error;
    },
    get location() {
      return level.router.state.location;
    },
  });
}
export function onBeforeLeave(guard: NavigationGuard): void {
  const level = currentLevel();
  const match = level.router.state.matches[level.depth - 1];
  if (!match) throw new Error('onBeforeLeave 必须在匹配的路由组件中使用。');
  const owner = getScope()!;
  const stop = level.router.beforeLeave(match.record.ref, (context) => {
    if (owner.disposed || owner.clearing) return;
    return owner.run(() => guard(context));
  });
  onCleanup(stop);
}

function errorView(level: Level, error: unknown, retry: () => void): Renderable {
  const normalized = asRouteError(error);
  return level.input.error
    ? level.input.error(normalized, retry)
    : element('div', {
        role: 'alert',
        children: [
          element('p', { children: normalized.message }),
          element('button', { type: 'button', onClick: retry, children: '重试页面' }),
        ],
      });
}
const RenderFailure = defineComponent(
  (input: { level: Level; error: unknown; reset: () => void }) => {
    const failed = input.level.router.state;
    effect(() => {
      if (input.level.router.state !== failed) input.reset();
    });
    return dynamic(() => errorView(input.level, input.error, input.reset));
  },
);
const Failure = defineComponent((input: { level: Level }) =>
  dynamic(() =>
    errorView(input.level, input.level.router.state.error ?? input.level.router.error, () => {
      void input.level.router.reload();
    }),
  ),
);
const Missing = defineComponent((input: { level: Level }) =>
  dynamic(() =>
    input.level.input.notFound !== undefined
      ? input.level.input.notFound
      : element('p', { role: 'status', children: '页面不存在。' }),
  ),
);
const Pending = defineComponent((input: { level: Level }) =>
  dynamic(() =>
    input.level.input.pending !== undefined
      ? input.level.input.pending
      : element('p', { role: 'status', children: '正在加载页面…' }),
  ),
);
const Pass = defineComponent((input: { children?: Renderable }) => dynamic(() => input.children));
const Empty = defineComponent(() => null);
const Page = defineComponent((input: { level: Level }) => {
  const child = element(Outlet, {});
  return dynamicElement(
    () => input.level.router.state.matches[input.level.depth]?.component ?? Pass,
    props([{ children: () => child }]),
  );
});

const RouteHost = defineComponent((input: { level: Level }) => {
  const { level } = input;
  const page = dynamicElement(
    () => {
      const state = level.router.state;
      if (state.status === 'idle') return level.router.error ? Failure : Pending;
      if (state.error && (state.errorIndex ?? 0) <= level.depth) return Failure;
      const match = state.matches[level.depth];
      return match ? Page : state.status === 'not-found' ? Missing : Empty;
    },
    props([{ level: () => level }]),
  );
  const server = getScope()!.server;
  return element(
    ErrorBoundary,
    props([
      {
        children: () => page,
        fallback: () => (error: unknown, reset: () => void) => {
          // SSR 渲染错误交还 HTTP 层；不把失败页面伪装成 200，也保持两端相同的边界标记。
          if (server) throw error;
          return element(RenderFailure, { level, error, reset });
        },
      },
    ]),
  );
});

export const Outlet = defineComponent(() => {
  const level = currentLevel();
  let previous: RouteRecord | undefined;
  let previousKey: string | number | symbol | undefined;
  let identity = Symbol('route');
  provideContext(context, { ...level, depth: level.depth + 1 });
  return dynamicElement(
    () => RouteHost,
    props([
      {
        key: () => {
          const match = level.router.state.matches[level.depth];
          const key = match?.record.definition.key?.({
            params: match.params,
            search: match.search,
          });
          if (key !== undefined && !['string', 'number', 'symbol'].includes(typeof key))
            throw new TypeError('路由 key 必须是字符串、数字或 symbol。');
          if (previous !== match?.record || !Object.is(previousKey, key)) {
            previous = match?.record;
            previousKey = key;
            identity = Symbol('route');
          }
          return identity;
        },
        level: () => level,
      },
    ]),
  );
});
const RouterRoot = defineComponent((input: RouterProps) => {
  const router = input.router;
  if (router.disposed || mounted.has(router))
    throw new Error('Router 需要独立且尚未挂载的有效控制器。');
  if (getScope()!.server && (router.state.status === 'idle' || router.pending))
    throw new Error('SSR 渲染 Router 前必须 await router.resolve()。');
  mounted.add(router);
  onCleanup(() => {
    mounted.delete(router);
    router.dispose();
  });
  provideContext(context, { router, depth: 0, input });
  onMount(() => router.start());
  return element(Outlet, {});
});
/** 控制器身份改变时重建其所有权，其他输入仍保持实时。 */
export const Router = defineComponent((input: RouterProps) => {
  let previous: RouterInstance | undefined;
  let view: Renderable;
  return dynamic(() => {
    if (previous !== input.router) {
      previous = input.router;
      view = element(RouterRoot, input as unknown as Props);
    }
    return view;
  });
});

export type LinkProps<R extends AnyRoute> = Omit<NativeProps<HTMLAnchorElement>, 'href'> &
  RouteOptions<NoInfer<R>> & {
    to: R;
    state?: unknown;
    replace?: boolean;
    exact?: boolean;
    activeClass?: string;
    preload?: boolean;
    reload?: boolean;
  };
export const Link = defineComponent(<R extends AnyRoute>(input: LinkProps<R>) => {
  const router = useRouter();
  // 公开 props 已按 to 检查参数，内部组装使用宽泛签名而不扩大公开重载。
  const actions = router as {
    href(to: AnyRoute, options: DestinationOptions): string;
    navigate(to: AnyRoute, options: NavigationOptions): Promise<unknown>;
    preload(to: AnyRoute, options: DestinationOptions): Promise<void>;
  };
  const destination = (): DestinationOptions => ({
    ...(input.params !== undefined ? { params: input.params } : {}),
    ...(input.search !== undefined ? { search: input.search } : {}),
    ...(input.hash !== undefined ? { hash: input.hash } : {}),
  });
  const href = () => actions.href(input.to, destination());
  function active(exact: boolean) {
    const external = new URL(href(), router.history.origin);
    const to =
      router.history.kind === 'hash'
        ? new URL(external.hash.slice(1) || '/', router.history.origin)
        : external;
    const current = router.state.location;
    const path = to.pathname.replace(/\/$/, '') || '/';
    const currentPath = current.pathname.replace(/\/$/, '') || '/';
    if (exact || path === '/') {
      if (currentPath !== path) return false;
    } else if (currentPath !== path && !currentPath.startsWith(path + '/')) return false;
    const search = new URLSearchParams(current.search);
    for (const key of new Set(to.searchParams.keys()))
      if (JSON.stringify(to.searchParams.getAll(key)) !== JSON.stringify(search.getAll(key)))
        return false;
    return !to.hash || current.hash === to.hash;
  }
  const ownValue = (names: readonly string[]) => {
    const key = Object.keys(input)
      .filter((key) => names.includes(key))
      .at(-1);
    return {
      supplied: key !== undefined,
      value: key === undefined ? undefined : Reflect.get(input, key),
    };
  };
  const load = () => {
    if (input.preload && !input.reload)
      void actions.preload(input.to, destination()).catch(() => {
        /* 预加载失败不替换当前页面，实际导航会重试并显示错误。 */
      });
  };
  const attrs = restProps(input, [
    'to',
    'params',
    'search',
    'hash',
    'state',
    'replace',
    'exact',
    'activeClass',
    'preload',
    'reload',
    'class',
    'className',
    'aria-current',
    'ariaCurrent',
    'onClick',
    'onFocus',
    'onPointerEnter',
  ]);
  return element(
    'a',
    props([
      () => attrs,
      {
        href,
        class: () => {
          const value = attributeValue('class', ownValue(['class', 'className']).value, HTML);
          return input.activeClass && active(Boolean(input.exact))
            ? [value, input.activeClass].filter(Boolean).join(' ')
            : value;
        },
        'aria-current': () => {
          const value = ownValue(['aria-current', 'ariaCurrent']);
          return value.supplied ? value.value : active(true) ? 'page' : undefined;
        },
        onClick: () => (event: MouseEvent & { currentTarget: HTMLAnchorElement }) => {
          input.onClick?.call(event.currentTarget, event);
          if (
            input.reload ||
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.currentTarget.hasAttribute('download') ||
            (event.currentTarget.target && event.currentTarget.target !== '_self') ||
            event.currentTarget.relList.contains('external')
          )
            return;
          event.preventDefault();
          void actions.navigate(input.to, {
            ...destination(),
            ...(input.replace !== undefined ? { replace: input.replace } : {}),
            ...(Object.hasOwn(input, 'state') ? { state: input.state } : {}),
          });
        },
        onFocus: () => (event: FocusEvent & { currentTarget: HTMLAnchorElement }) => {
          input.onFocus?.call(event.currentTarget, event);
          if (!event.defaultPrevented) load();
        },
        onPointerEnter: () => (event: PointerEvent & { currentTarget: HTMLAnchorElement }) => {
          input.onPointerEnter?.call(event.currentTarget, event);
          if (!event.defaultPrevented) load();
        },
      },
    ]),
  );
});
