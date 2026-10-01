export { defineRoute, defineRoutes } from './router/routes.js';
export { createRouter } from './router/router.js';
export { Router, Outlet, Link, useRoute, useRouter, onBeforeLeave } from './router/view.js';
export type { RouterProps, LinkProps } from './router/view.js';
export type { Router as RouterInstance, RouterOptions } from './router/router.js';
export { createMemoryHistory, createBrowserHistory, createHashHistory } from './router/history.js';
export type { RouterHistory, HistoryEntry, HistoryChange } from './router/history.js';
export { redirect, RouteRedirect, RouteError } from './router/navigation.js';
export type {
  RouterState,
  RouterSnapshot,
  NavigationContext,
  NavigationGuard,
  NavigationResult,
  NavigationOptions,
  RouteView,
} from './router/navigation.js';
export type {
  RouteRef,
  RouteDefinition,
  RouteParams,
  ParamsOf,
  SearchOf,
  DataOf,
  LoadContext,
  RouteComponent,
  Params,
  Search,
} from './router/routes.js';
export type { DestinationOptions, RouteOptions } from './router/navigation.js';
