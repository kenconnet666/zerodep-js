import {
  assertCanWrite,
  _effect,
  getScope,
  _untrack,
  type Cleanup,
  type EffectCallback,
} from './reactivity.js';

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
