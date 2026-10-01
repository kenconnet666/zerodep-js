import { _onMount, _createScope, _getAbortSignal, _snapshot } from 'zerodep-js';

export function lifecycleTypes() {
  const scope = _createScope();
  const number: number = scope.run(() => 1);
  const signal: AbortSignal = scope.signal;
  scope.run(() => {
    const current: AbortSignal = _getAbortSignal();
    _onMount(() => () => current.throwIfAborted());
    // @ts-expect-error onMount 必须同步提供清理责任。
    _onMount(async () => {});
  });
  const copy = _snapshot({ count: 1, list: ['a'], date: new Date() });
  const date: Date = copy.date;
  // @ts-expect-error 快照保留数据类型，不退化为 any。
  copy.count = 'wrong';
  scope.dispose();
  return { number, signal, date };
}
