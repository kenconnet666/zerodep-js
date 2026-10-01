import { defineComponent } from './component.js';
import { Derived } from './reactivity.js';
import { TEMPLATE, type Renderable } from './template.js';

export type Key = string | number | symbol;
export interface ForProps<T> {
  each: readonly T[] | null | undefined;
  keyBy: (item: NoInfer<T>) => Key;
  children: (item: NoInfer<T>, index: number) => Renderable;
  fallback?: Renderable;
}

const LIVE_RENDER = Symbol('zerodep.live-render');
export type LiveRender = ((item: () => unknown, index: () => number) => Renderable) & {
  readonly [LIVE_RENDER]: true;
};

export function liveRender(
  render: (item: () => unknown, index: () => number) => Renderable,
): LiveRender {
  return Object.assign(render, { [LIVE_RENDER]: true as const });
}

function isLiveRender(value: unknown): value is LiveRender {
  return typeof value === 'function' && Reflect.get(value, LIVE_RENDER) === true;
}

export interface ListEntry {
  key: Key;
  item: unknown;
}
export interface ListTemplate {
  readonly [TEMPLATE]: true;
  readonly kind: 'list';
  readonly entries: Derived<readonly ListEntry[]>;
  readonly render: LiveRender;
  readonly fallback: () => Renderable;
}

export const For = defineComponent(<T>(input: ForProps<T>): ListTemplate => {
  if (!isLiveRender(input.children))
    throw new Error(
      'For 需要经过编译的内联 children 回调；请使用导入绑定或静态命名空间成员，复用呈现放入组件。',
    );
  return {
    [TEMPLATE]: true,
    kind: 'list',
    render: input.children,
    fallback: () => input.fallback,
    entries: new Derived(() => {
      const items = input.each ?? [];
      if (!Array.isArray(items)) throw new Error('For each 必须是数组、null 或 undefined。');
      const keys = new Set<Key>();
      return Array.from(items, (item) => {
        const key = input.keyBy(item);
        if (typeof key !== 'string' && typeof key !== 'number' && typeof key !== 'symbol')
          throw new Error('列表 key 必须是字符串、数字或 symbol。');
        if (keys.has(key)) throw new Error(`重复的列表 key：${String(key)}`);
        keys.add(key);
        return { key, item };
      });
    }),
  };
});

export interface ErrorBoundaryProps {
  children?: Renderable;
  fallback: (error: unknown, reset: () => void) => Renderable;
}
export interface BoundaryTemplate {
  readonly [TEMPLATE]: true;
  readonly kind: 'boundary';
  readonly input: ErrorBoundaryProps;
}

export const ErrorBoundary = defineComponent((input: ErrorBoundaryProps): BoundaryTemplate => ({
  [TEMPLATE]: true,
  kind: 'boundary',
  input,
}));
