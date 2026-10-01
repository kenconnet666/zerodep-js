import { assertCanWrite, getScope } from './reactivity.js';

export interface Context<T> {
  readonly key: symbol;
  readonly defaultValue: T;
}

export function _createContext<T>(defaultValue: T): Context<T>;
export function _createContext<T>(): Context<T | undefined>;
export function _createContext<T>(defaultValue?: T): Context<T | undefined> {
  return Object.freeze({ key: Symbol('zerodep.context'), defaultValue });
}

/** 提供的是普通值或带 getter 的状态对象；不会偷偷把普通数值变成活引用。 */
export function _provideContext<T>(context: Context<T>, value: NoInfer<T>): void {
  assertCanWrite();
  const scope = getScope();
  if (!scope || scope.disposed || scope.clearing)
    throw new Error('provideContext 必须在有效的组件或 createRoot 作用域中使用。');
  const values = (scope.context ??= new Map());
  if (values.has(context.key))
    throw new Error('同一作用域不能重复提供同一个 context；变化数据请使用响应式对象。');
  values.set(context.key, value);
}
export function _useContext<T>(context: Context<T>): T {
  let scope = getScope();
  if (!scope)
    throw new Error('useContext 必须在组件或 createRoot 作用域中使用；事件回调请捕获已读取的值。');
  for (; scope; scope = scope.parent) {
    if (scope.context?.has(context.key)) return scope.context.get(context.key) as T;
  }
  return context.defaultValue;
}
