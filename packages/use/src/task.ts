import { _onCleanup, _untrack } from 'zerodep-js';
import { assertCanWrite, getScope, source } from 'zerodep-js/internal';

export type TaskResult<T> =
  { status: 'success'; data: T } | { status: 'error'; error: unknown } | { status: 'cancelled' };

export interface TaskOptions<T> {
  /** 已有结果的快照，不调用 loader；类型由 loader 决定，不因初值放宽。 */
  initial?: NoInfer<T>;
}

export interface Task<I, T> {
  readonly status: 'idle' | 'pending' | 'success' | 'error';
  readonly pending: boolean;
  readonly data: T | undefined;
  readonly error: unknown;
  readonly disposed: boolean;
  /** 启动新任务并取消旧任务；loader 的失败作为结果返回，不产生未处理的拒绝。 */
  run(this: void, input: I): Promise<TaskResult<T>>;
  /** 使用最近一次输入重试；首次 run 前不启动任务，返回 cancelled。 */
  retry(this: void): Promise<TaskResult<T>>;
  cancel(this: void): void;
  /** 取消并清空结果、错误和重试输入；不会恢复 initial 或重新发起请求。 */
  reset(this: void): void;
  dispose(this: void): void;
}

interface TaskState<T> {
  status: Task<unknown, T>['status'];
  data: T | undefined;
  error: unknown;
}

/** 显式任务，跟踪不跨 await；只拥有当前任务与最近一次结果，不提供请求缓存。 */
export function _task<I, T>(
  loader: (input: I, signal: AbortSignal) => T | PromiseLike<T>,
  options: TaskOptions<T> = {},
): Task<I, T> {
  assertCanWrite();
  const owner = getScope();
  if (!owner || owner.disposed || owner.clearing)
    throw new Error('_task 必须在有效的组件或 createRoot 作用域中创建。');
  const server = owner.server;
  const state = source<TaskState<T>>({
    status: 'initial' in options ? 'success' : 'idle',
    data: options.initial,
    error: undefined,
  });
  let current: AbortController | undefined;
  let disposed = false;
  // undefined 本身可以是合法输入；包装也便于 reset/dispose 释放最后一次输入。
  let last: { input: I } | undefined;
  const cancelled = (): TaskResult<T> => ({ status: 'cancelled' });

  function cancel(): void {
    assertCanWrite();
    const previous = current;
    if (!previous) return;
    current = undefined;
    state.write({ status: 'idle', data: _untrack(() => state.read().data), error: undefined });
    // 先撤销所有权，再触发 abort，避免同步 abort 监听器重入时覆盖新任务。
    previous.abort();
  }
  function dispose(): void {
    if (disposed) return;
    assertCanWrite();
    disposed = true;
    last = undefined;
    cancel();
  }
  function reset(): void {
    assertCanWrite();
    if (disposed) return;
    const previous = current;
    current = undefined;
    last = undefined;
    state.write({ status: 'idle', data: undefined, error: undefined });
    // 先提交重置，再通知 abort；监听器启动的新任务不得被旧操作覆盖。
    previous?.abort();
  }
  function run(input: I): Promise<TaskResult<T>> {
    assertCanWrite();
    if (disposed || server) return Promise.resolve(cancelled());
    last = { input };
    const previous = current;
    const controller = new AbortController();
    current = controller;
    const data = _untrack(() => state.read().data);
    state.write({ status: 'pending', data, error: undefined });
    previous?.abort();
    if (current !== controller || controller.signal.aborted) return Promise.resolve(cancelled());
    let abort!: () => void;
    const cancellation = new Promise<TaskResult<T>>((resolve) => {
      abort = () => resolve(cancelled());
      controller.signal.addEventListener('abort', abort, { once: true });
    });
    let work: Promise<TaskResult<T>>;
    try {
      work = Promise.resolve(_untrack(() => loader(input, controller.signal))).then(
        (data): TaskResult<T> => ({ status: 'success', data }),
        (error): TaskResult<T> => ({ status: 'error', error }),
      );
    } catch (error) {
      work = Promise.resolve({ status: 'error', error });
    }
    // 不支持 AbortSignal 的第三方 Promise 也能及时结束调用，并忽略其迟到结果。
    return Promise.race([work, cancellation])
      .then((result) => {
        if (disposed || current !== controller || controller.signal.aborted) return cancelled();
        current = undefined;
        if (result.status === 'success')
          state.write({ status: 'success', data: result.data, error: undefined });
        else if (result.status === 'error')
          state.write({ status: 'error', data, error: result.error });
        return result;
      })
      .finally(() => controller.signal.removeEventListener('abort', abort));
  }
  _onCleanup(dispose);
  return Object.freeze({
    get status() {
      return state.read().status;
    },
    get pending() {
      return state.read().status === 'pending';
    },
    get data() {
      return state.read().data;
    },
    get error() {
      return state.read().error;
    },
    get disposed() {
      return disposed;
    },
    run,
    retry: () => (last ? run(last.input) : Promise.resolve(cancelled())),
    cancel,
    reset,
    dispose,
  });
}
