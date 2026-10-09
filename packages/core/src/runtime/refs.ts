import { _createRoot, _onCleanup, getScope, type Cleanup } from './reactivity.js';
import { synchronous } from './synchronous.js';

/** DOM 资源绑定；同步初始化，可返回同步清理函数。 */
export type DomRef<T extends Element = Element> = (element: T) => void | Cleanup;

/** 顺序初始化、逆序释放；每次挂载拥有独立资源，部分失败也能回滚。 */
export function _composeRefs<T extends Element>(
  ...references: readonly (DomRef<T> | null | undefined)[]
): DomRef<T> {
  for (const ref of references) {
    if (ref != null && typeof ref !== 'function') throw new TypeError('DOM ref 必须是函数。');
  }
  return (element) =>
    _createRoot((dispose) => {
      const scope = getScope()!;
      for (const reference of references) {
        if (scope.disposed) break;
        if (!reference) continue;
        const cleanup = synchronous(
          reference(element),
          'DOM ref 必须同步返回清理函数或 undefined。',
        );
        if (typeof cleanup === 'function') {
          // 回调可同步卸载所属根；此时新返回的资源必须立即释放。
          if (scope.disposed) synchronous(cleanup(), '清理函数必须同步完成。');
          else _onCleanup(cleanup);
        }
      }
      return dispose;
    });
}
