import { COMPONENT, defineComponent, type AnyComponent, type Component } from './component.js';
import { _onMount } from './lifecycle.js';
import { Source } from './reactivity.js';
import { dynamic, element, type Renderable } from './template.js';
import type { Props } from './props.js';

export interface LazyOptions {
  fallback?: Renderable;
  error?: (error: unknown, retry: () => void) => Renderable;
}
export type LazyComponent<C extends AnyComponent> = Component<C[typeof COMPONENT]> & {
  /** 预取代码；失败后再次调用可重试。不会在调用处建立组件实例。 */
  preload(): Promise<C>;
};
type Loading<C> =
  | { status: 'idle' | 'pending' }
  | { status: 'ready'; component: C }
  | { status: 'error'; error: unknown };

/** 只缓存组件代码；每次实际呈现仍有独立的 props、状态和所有权。 */
export function _lazy<C extends AnyComponent>(
  loader: () => Promise<C | { default: C }>,
  options?: LazyOptions,
): LazyComponent<C>;
export function _lazy(
  loader: () => Promise<AnyComponent | { default: AnyComponent }>,
  options: LazyOptions = {},
): LazyComponent<AnyComponent> {
  const state = new Source<Loading<AnyComponent>>({ status: 'idle' });
  let pending: Promise<AnyComponent> | undefined;
  let loaded: AnyComponent | undefined;
  function preload(): Promise<AnyComponent> {
    if (loaded) return Promise.resolve(loaded);
    if (pending) return pending;
    state.write({ status: 'pending' });
    pending = Promise.resolve()
      .then(loader)
      .then((module) => {
        const component = typeof module === 'function' ? module : module?.default;
        if (typeof component !== 'function' || typeof component[COMPONENT] !== 'function')
          throw new TypeError('_lazy 必须加载 _component 组件或含 default 组件的模块。');
        loaded = component;
        state.write({ status: 'ready', component });
        return component;
      })
      .catch((error: unknown) => {
        state.write({ status: 'error', error });
        throw error;
      })
      .finally(() => {
        pending = undefined;
      });
    return pending;
  }
  const retry = () => {
    void preload().catch(() => {});
  };
  const component = defineComponent((input: Props): Renderable => {
    const active = new Source(false);
    _onMount(() => {
      // 首次接管始终与 SSR 占位一致，不能因浏览器预加载完成而制造不匹配。
      active.write(true);
      retry();
    });
    return dynamic(() => {
      if (!active.read()) return options.fallback;
      const current = state.read();
      if (current.status === 'ready') return element(current.component, input);
      if (current.status === 'error') {
        if (options.error) return options.error(current.error, retry);
        throw current.error;
      }
      return options.fallback;
    });
  });
  // 运行时转发相同 props；保留原组件（包括泛型组件）的完整调用签名。
  return Object.assign(component, { preload });
}
