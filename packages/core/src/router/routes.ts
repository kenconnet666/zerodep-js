import type { Component } from '../runtime/component.js';
import type { Renderable } from '../runtime/template.js';
import { unowned } from '../runtime/reactivity.js';

export type ParamValue = string | readonly string[];
export type Params = Readonly<Record<string, ParamValue | undefined>>;
export type Search = Readonly<Record<string, string | readonly string[] | undefined>>;
export type RouteComponent =
  Component<(props: {}) => Renderable> | Component<(props: { children: Renderable }) => Renderable>;
type Segment<S extends string> = S extends `:${infer K}?`
  ? { readonly [P in K]?: string }
  : S extends `:${infer K}`
    ? { readonly [P in K]: string }
    : S extends `*${infer K}`
      ? { readonly [P in K]: readonly string[] }
      : {};
export type RouteParams<P extends string> = string extends P
  ? Params
  : P extends `${infer A}/${infer B}`
    ? Segment<A> & RouteParams<B>
    : Segment<P>;

export interface LoadContext<P = Params, S = Search> {
  readonly params: P;
  readonly search: S;
  readonly url: URL;
  readonly signal: AbortSignal;
  readonly intent: 'navigate' | 'preload';
  readonly parentData: unknown;
}
export interface RouteDefinition<P extends string = string, S = Search, D = unknown> {
  /** 所有路径显式写为绝对路径；parent 只声明布局/加载所有权。 */
  readonly path: P;
  readonly parent?: string;
  readonly component?: RouteComponent;
  readonly lazy?: () => Promise<RouteComponent | { default: RouteComponent }>;
  key?(context: { params: RouteParams<P>; search: S }): string | number | symbol;
  readonly parseSearch?: (search: URLSearchParams) => S;
  load?(context: LoadContext<RouteParams<P>, S>): D | Promise<D>;
  readonly validateData?: (value: unknown) => D | Promise<D>;
  readonly redirect?: string;
}
declare const routeType: unique symbol;
export interface RouteRef<P extends string = string, S = unknown, D = unknown> {
  readonly name: string;
  readonly path: P;
  readonly [routeType]?: { params: RouteParams<P>; search: S; data: D };
}
export type AnyRoute = { readonly name: string; readonly path: string };
export type ParamsOf<R> = R extends { readonly [routeType]?: { params: infer P extends Params } }
  ? P
  : Params;
export type SearchOf<R> = R extends { readonly [routeType]?: { search: infer S } } ? S : Search;
export type DataOf<R> = R extends { readonly [routeType]?: { data: infer D } } ? D : unknown;
type RouteInput = RouteDefinition<string, unknown>;
type QueryOf<T> = T extends { readonly [routeType]?: { search: infer Q } }
  ? Q
  : T extends { parseSearch: (...args: never[]) => infer Q }
    ? Q
    : Search;
type LoadedOf<T> = T extends { readonly [routeType]?: { data: infer D } }
  ? D
  : T extends { load: (...args: never[]) => infer D }
    ? Awaited<D>
    : undefined;
type RouteTable<T extends Record<string, RouteInput>> = {
  readonly [K in keyof T]: RouteRef<T[K]['path'], QueryOf<T[K]>, LoadedOf<T[K]>>;
};

type Token = { kind: 'static' | 'param' | 'optional' | 'rest'; value: string };
export interface RouteRecord {
  readonly ref: AnyRoute;
  readonly definition: RouteDefinition<string, unknown>;
  readonly tokens: readonly Token[];
  readonly chain: readonly RouteRecord[];
  readonly order: number;
}
export interface Match {
  readonly record: RouteRecord;
  readonly params: Params;
  readonly search: unknown;
}
const records = new WeakMap<object, readonly RouteRecord[]>();
const references = new WeakMap<object, RouteRecord>();

/** 单个路由先按路径和查询解析器推导 loader，避免映射类型的循环上下文推导。 */
export function defineRoute<const P extends string, S = Search, D = undefined>(
  path: P,
  options: Omit<RouteDefinition<P, S, D>, 'path'>,
): RouteDefinition<P, S, D> & { readonly [routeType]?: { search: S; data: Awaited<D> } } {
  return { ...options, path };
}

/** 命名路由表提供稳定引用，普通无 loader 的记录也可以直接声明。 */
export function defineRoutes<const T extends Record<string, RouteInput>>(
  definitions: T,
): RouteTable<T> {
  const table: Record<string, AnyRoute> = Object.create(null);
  const all: Array<RouteRecord & { chain: RouteRecord[] }> = [];
  for (const [name, item] of Object.entries(definitions)) {
    const definition = item as RouteDefinition<string, unknown>;
    const path = normalizePath(definition.path);
    const ref = Object.freeze({ name, path: definition.path });
    const record = {
      ref,
      definition: { ...definition, path },
      tokens: tokenize(path),
      chain: [] as RouteRecord[],
      order: all.length,
    };
    if (definition.component && definition.lazy)
      throw new Error(`${name} 不能同时提供 component 和 lazy。`);
    table[name] = ref;
    all.push(record);
    references.set(ref, record);
  }
  const byName = new Map(all.map((record) => [record.ref.name, record]));
  for (const record of all) {
    let entry: RouteRecord | undefined = record;
    const seen = new Set<RouteRecord>();
    while (entry) {
      if (seen.has(entry)) throw new Error(`路由 parent 存在循环：${record.ref.name}`);
      seen.add(entry);
      record.chain.unshift(entry);
      const parent: string | undefined = entry.definition.parent;
      entry = parent === undefined ? undefined : byName.get(parent);
      if (parent !== undefined && !entry) throw new Error(`找不到父路由：${parent}`);
    }
  }
  const shapes = new Map<string, RouteRecord[]>();
  for (const record of all) {
    if (!record.definition.component && !record.definition.lazy && !record.definition.redirect)
      continue;
    const shape = JSON.stringify(
      record.tokens.map((token) => [token.kind, token.kind === 'static' ? token.value : '']),
    );
    const previous = shapes.get(shape) ?? [];
    if (previous.some((other) => !record.chain.includes(other) && !other.chain.includes(record)))
      throw new Error(`路由模式重复：${record.ref.name}`);
    previous.push(record);
    shapes.set(shape, previous);
  }
  records.set(table, all);
  return Object.freeze(table) as unknown as RouteTable<T>;
}

export function tableRecords(table: object): readonly RouteRecord[] {
  const result = records.get(table);
  if (!result) throw new TypeError('路由表必须通过 defineRoutes 创建。');
  return result;
}
export function routeRecord(route: AnyRoute): RouteRecord {
  const result = references.get(route);
  if (!result) throw new TypeError('无效的路由引用。');
  return result;
}
function normalizePath(path: string): string {
  if (
    typeof path !== 'string' ||
    !path.startsWith('/') ||
    /[?#]/.test(path.replace(/:[A-Za-z_$][\w$]*\?/g, ':param')) ||
    /\/\//.test(path)
  )
    throw new TypeError('路由 path 使用绝对路径，不包含 query/hash 或空路径片段。');
  return path.length > 1 ? path.replace(/\/$/, '') : path;
}
function tokenize(path: string): Token[] {
  const segments = path.split('/').slice(1).filter(Boolean);
  const names = new Set<string>();
  return segments.map((part, index) => {
    if (!part.startsWith(':') && !part.startsWith('*')) {
      const value = decodeURIComponent(part);
      if (value === '.' || value === '..') throw new TypeError('路由不能包含点路径片段。');
      return { kind: 'static', value };
    }
    const kind = part.startsWith('*') ? 'rest' : part.endsWith('?') ? 'optional' : 'param';
    const value = part.slice(1, kind === 'optional' ? -1 : undefined);
    if (
      !/^[A-Za-z_$][\w$]*$/.test(value) ||
      names.has(value) ||
      (kind === 'rest' && index !== segments.length - 1)
    )
      throw new TypeError(`无效、重复或非末尾通配的路由参数：${part}`);
    names.add(value);
    return { kind, value };
  });
}
function matchTokens(
  tokens: readonly Token[],
  segments: readonly string[],
  prefix = false,
): { params: Record<string, ParamValue>; score: number[] } | undefined {
  function visit(
    position: number,
    index: number,
    params: Record<string, ParamValue>,
    score: number[],
  ): ReturnType<typeof matchTokens> {
    const token = tokens[position];
    if (!token) return prefix || index === segments.length ? { params, score } : undefined;
    if (token.kind === 'rest')
      return {
        params: { ...params, [token.value]: Object.freeze(segments.slice(index)) },
        score: [...score, 0],
      };
    const part = segments[index];
    if (token.kind === 'static')
      return part === token.value
        ? visit(position + 1, index + 1, params, [...score, 4])
        : undefined;
    if (part !== undefined) {
      const matched = visit(position + 1, index + 1, { ...params, [token.value]: part }, [
        ...score,
        token.kind === 'param' ? 3 : 2,
      ]);
      if (matched) return matched;
    }
    return token.kind === 'optional'
      ? visit(position + 1, index, params, [...score, 1])
      : undefined;
  }
  return visit(0, 0, Object.create(null) as Record<string, ParamValue>, []);
}
export function readSearch(search: URLSearchParams): Search {
  const result: Record<string, string | readonly string[]> = Object.create(null);
  for (const key of new Set(search.keys())) {
    const values = search.getAll(key);
    result[key] = values.length === 1 ? values[0]! : Object.freeze(values);
  }
  return Object.freeze(result);
}
export function matchRoutes(table: object, url: URL): Match[] {
  const path = url.pathname.length > 1 ? url.pathname.replace(/\/$/, '') : url.pathname;
  const segments =
    path === '/'
      ? []
      : path
          .slice(1)
          .split('/')
          .map((segment) => decodeURIComponent(segment));
  if (segments.some((segment) => !segment)) return [];
  let selected: { record: RouteRecord; score: number[]; matches: Match[] } | undefined;
  for (const record of tableRecords(table)) {
    if (!record.definition.component && !record.definition.lazy && !record.definition.redirect)
      continue;
    const matched = matchTokens(record.tokens, segments);
    if (!matched) continue;
    const matches: Match[] = [];
    for (const parent of record.chain) {
      const params = parent === record ? matched : matchTokens(parent.tokens, segments, true);
      if (!params) break;
      matches.push({
        record: parent,
        params: Object.freeze(params.params),
        search: undefined,
      });
    }
    if (matches.length !== record.chain.length) continue;
    const score = [...matched.score, 5, record.chain.length];
    const difference = selected
      ? score.findIndex((value, index) => value !== (selected!.score[index] ?? -1))
      : -1;
    if (!selected || (difference >= 0 && score[difference]! > (selected.score[difference] ?? -1)))
      selected = { record, score, matches };
  }
  return (
    selected?.matches.map((match) => {
      const parse = match.record.definition.parseSearch;
      const search = parse
        ? unowned(() => parse(new URLSearchParams(url.search)))
        : readSearch(url.searchParams);
      if (
        search !== null &&
        typeof search === 'object' &&
        typeof Reflect.get(search, 'then') === 'function'
      )
        throw new TypeError('parseSearch 必须同步完成。');
      return { ...match, search };
    }) ?? []
  );
}

function segment(value: string): string {
  if (value === '.' || value === '..') throw new TypeError('路径参数不能使用 . 或 ..。');
  return encodeURIComponent(value);
}

export function routePath(route: AnyRoute, params: Params = {}): string {
  const parts: string[] = [];
  const used = new Set<string>();
  for (const token of routeRecord(route).tokens) {
    if (token.kind === 'static') {
      parts.push(segment(token.value));
      continue;
    }
    used.add(token.value);
    const value = params[token.value];
    if (token.kind === 'optional' && value === undefined) continue;
    if (token.kind === 'rest') {
      if (!Array.isArray(value) || value.some((part) => typeof part !== 'string' || !part))
        throw new TypeError(`${token.value} 需要路径片段字符串数组。`);
      parts.push(...value.map((part) => segment(part)));
    } else {
      if (typeof value !== 'string' || !value)
        throw new TypeError(`缺少字符串路由参数：${token.value}`);
      parts.push(segment(value));
    }
  }
  for (const key of Object.keys(params))
    if (!used.has(key)) throw new TypeError(`多余路由参数：${key}`);
  return '/' + parts.join('/');
}
