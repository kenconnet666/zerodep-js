import {
  Scope,
  assertCanWrite,
  _effect,
  getScope,
  _untrack,
  type Cleanup,
  type EffectCallback,
} from './reactivity.js';

export interface ScopeHandle {
  readonly active: boolean;
  readonly signal: AbortSignal;
  /** 只在同步回调中恢复作用域；await 后须显式再次 run。 */
  run<T>(callback: () => T): T;
  dispose(): void;
}

/** 默认归属当前作用域；在组件外创建时，由调用方负责 dispose。 */
export function _createScope(): ScopeHandle {
  const scope = new Scope();
  return Object.freeze({
    get active() {
      return !scope.disposed && !scope.clearing;
    },
    get signal() {
      return scope.signal;
    },
    run: <T>(callback: () => T): T => _untrack(() => scope.run(callback)),
    dispose: () => scope.dispose(),
  });
}

/** 当前 effect 重跑或所属组件/根销毁时取消；不会把作用域传播到异步调用链。 */
export function _getAbortSignal(): AbortSignal {
  assertCanWrite();
  const scope = getScope();
  if (!scope || scope.disposed || scope.clearing)
    throw new Error('getAbortSignal 必须在有效的作用域中使用。');
  return scope.signal;
}

/** DOM 提交后执行一次，读取不建立重跑依赖；SSR 不执行。 */
export function _onMount(callback: EffectCallback): Cleanup {
  return _effect(() => _untrack(callback));
}
