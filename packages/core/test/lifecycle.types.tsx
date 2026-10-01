import { onMount, createScope, getAbortSignal, snapshot } from 'zerodep-js';

export function lifecycleTypes() {
  const scope = createScope();
  const number: number = scope.run(() => 1);
  const signal: AbortSignal = scope.signal;
  scope.run(() => {
    const current: AbortSignal = getAbortSignal();
    onMount(() => () => current.throwIfAborted());
    // @ts-expect-error onMount 必须同步提供清理责任。
    onMount(async () => {});
  });
  const copy = snapshot({ count: 1, list: ['a'], date: new Date() });
  const date: Date = copy.date;
  // @ts-expect-error 快照保留数据类型，不退化为 any。
  copy.count = 'wrong';
  scope.dispose();
  return { number, signal, date };
}
