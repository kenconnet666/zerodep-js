import type { AnyComponent } from '../component.js';
import type { DataOf, Match, Params, ParamsOf, RouteRef, SearchOf, AnyRoute } from './routes.js';

export interface DestinationOptions {
  params?: Params;
  search?:
    | URLSearchParams
    | Readonly<
        Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[] | null | undefined
        >
      >;
  hash?: string;
}
type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];
export type RouteOptions<R extends AnyRoute> = Omit<DestinationOptions, 'params'> &
  (keyof ParamsOf<R> extends never
    ? { params?: Readonly<Record<string, never>> }
    : RequiredKeys<ParamsOf<R>> extends never
      ? { params?: ParamsOf<R> }
      : { params: ParamsOf<R> });
export type RouteArguments<R extends AnyRoute, Extra = {}> =
  RequiredKeys<ParamsOf<R>> extends never
    ? [options?: RouteOptions<R> & Extra]
    : [options: RouteOptions<R> & Extra];
export interface NavigationOptions extends DestinationOptions {
  replace?: boolean;
  state?: unknown;
  force?: boolean;
  scroll?: boolean;
  focus?: boolean;
}
export interface RouteLocation {
  readonly href: string;
  readonly pathname: string;
  readonly search: string;
  readonly hash: string;
  readonly state: unknown;
}
export interface ResolvedMatch extends Match {
  readonly data: unknown;
  readonly component: AnyComponent | undefined;
}
export interface RouterState {
  readonly location: RouteLocation;
  readonly matches: readonly ResolvedMatch[];
  readonly status: 'idle' | 'ready' | 'not-found' | 'error';
  readonly statusCode: number;
  readonly error: RouteError | undefined;
  readonly errorIndex: number | undefined;
}
export class RouteError extends Error {
  readonly status: number;
  constructor(status: number, message: string, options?: ErrorOptions) {
    if (!Number.isInteger(status) || status < 400 || status > 599)
      throw new TypeError('路由错误使用 400–599 状态。');
    super(message, options);
    this.name = 'RouteError';
    this.status = status;
  }
}
export class RouteRedirect {
  readonly to: string | AnyRoute;
  readonly options: DestinationOptions;
  readonly status: 301 | 302 | 303 | 307 | 308;
  constructor(
    to: string | AnyRoute,
    options: DestinationOptions = {},
    status: 301 | 302 | 303 | 307 | 308 = 302,
  ) {
    this.to = to;
    this.options = options;
    this.status = status;
  }
}
export function redirect<R extends AnyRoute>(
  to: R,
  ...args: RouteArguments<NoInfer<R>, { status?: 301 | 302 | 303 | 307 | 308 }>
): RouteRedirect;
export function redirect(
  to: string,
  options?: DestinationOptions & { status?: 301 | 302 | 303 | 307 | 308 },
): RouteRedirect;
export function redirect(
  to: string | AnyRoute,
  options: DestinationOptions & { status?: 301 | 302 | 303 | 307 | 308 } = {},
): RouteRedirect {
  return new RouteRedirect(to, options, options.status);
}
export interface NavigationContext {
  readonly from: RouterState;
  readonly to: { location: RouteLocation; matches: readonly Match[] };
  readonly signal: AbortSignal;
}
export type NavigationGuard = (
  context: NavigationContext,
) => void | boolean | RouteRedirect | Promise<void | boolean | RouteRedirect>;
export type NavigationResult =
  | {
      readonly status: 'committed';
      readonly state: RouterState;
      readonly redirect?: { from: string; status: number };
    }
  | { readonly status: 'cancelled' | 'unchanged' }
  | { readonly status: 'error'; readonly error: RouteError };
export interface RouterSnapshot {
  readonly version: 1;
  readonly href: string;
  readonly state?: unknown;
  readonly matches: readonly { name: string; data: unknown }[];
  readonly status: 'ready' | 'not-found' | 'error';
  readonly error?: { status: number; message: string; index: number };
}
export interface RouteView<R extends AnyRoute = RouteRef> {
  readonly params: ParamsOf<R>;
  readonly search: Readonly<SearchOf<R>>;
  readonly data: DataOf<R> | undefined;
  readonly error: RouteError | undefined;
  readonly location: RouteLocation;
}

export function location(url: URL, state: unknown): RouteLocation {
  return Object.freeze({
    href: url.pathname + url.search + url.hash,
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    state,
  });
}
export function asRouteError(error: unknown, fallback = 500): RouteError {
  return error instanceof RouteError
    ? error
    : new RouteError(
        error instanceof URIError ? 400 : fallback,
        fallback === 400 || error instanceof URIError ? '路由参数无效。' : '页面加载失败。',
        { cause: error },
      );
}
export const cancelled = Symbol('cancelled-navigation');
export function abortable<T>(value: T | PromiseLike<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) return Promise.reject(cancelled);
  return new Promise((resolve, reject) => {
    const abort = () => {
      signal.removeEventListener('abort', abort);
      reject(cancelled);
    };
    signal.addEventListener('abort', abort, { once: true });
    Promise.resolve(value).then(
      (result) => {
        signal.removeEventListener('abort', abort);
        resolve(result);
      },
      (error) => {
        signal.removeEventListener('abort', abort);
        reject(error);
      },
    );
  });
}
