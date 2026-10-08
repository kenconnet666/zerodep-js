import { _onMount, _createRoot, _getAbortSignal, _snapshot } from 'zerodep-js';

export function lifecycleTypes() {
  const owned = _createRoot((dispose) => {
    const current: AbortSignal = _getAbortSignal();
    _onMount(() => () => current.throwIfAborted());
    // @ts-expect-error onMount 必须同步提供清理责任。
    _onMount(async () => {});
    return { number: 1, signal: current, dispose };
  });
  const number: number = owned.number;
  const signal: AbortSignal = owned.signal;
  const copy = _snapshot({ count: 1, list: ['a'], date: new Date() });
  const date: Date = copy.date;
  // @ts-expect-error 快照保留数据类型，不退化为 any。
  copy.count = 'wrong';
  owned.dispose();
  return { number, signal, date };
}
