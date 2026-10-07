import { expect, it, vi } from 'vitest';
import { _createRoot, _effect, _flushSync } from 'zerodep-js';
import { defineComponent, source } from 'zerodep-js/internal';
import { renderToString } from 'zerodep-js-ssr';
import { _task, type Task } from '../src/task.js';

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}

it('同步值、同步异常、异步失败和重试都有明确结果，undefined 是成功值', async () => {
  const stop = _createRoot((dispose) => {
    let count = 0;
    const task = _task((input: number) => {
      if (count++ === 0) throw new Error('first');
      return input === 0 ? undefined : input * 2;
    });
    return { task, dispose };
  });
  try {
    expect(await stop.task.retry()).toEqual({ status: 'cancelled' });
    const failed = await stop.task.run(2);
    expect(failed.status).toBe('error');
    expect(stop.task.status).toBe('error');
    expect(stop.task.error).toBeInstanceOf(Error);
    expect(await stop.task.retry()).toEqual({ status: 'success', data: 4 });
    expect(stop.task.error).toBeUndefined();
    expect(await stop.task.run(0)).toEqual({ status: 'success', data: undefined });
    expect(stop.task.status).toBe('success');
  } finally {
    stop.dispose();
  }
});

it('新请求立即取消旧等待，忽略不支持 abort 的迟到成功/失败', async () => {
  const work = [deferred<string>(), deferred<string>(), deferred<string>()];
  const signals: AbortSignal[] = [];
  const owned = _createRoot((dispose) => ({
    dispose,
    task: _task((i: number, signal) => {
      signals.push(signal);
      return work[i]!.promise;
    }),
  }));
  try {
    const a = owned.task.run(0);
    const b = owned.task.run(1);
    expect(signals[0]!.aborted).toBe(true);
    expect(await a).toEqual({ status: 'cancelled' });
    work[1]!.resolve('new');
    expect(await b).toEqual({ status: 'success', data: 'new' });
    work[0]!.reject(new Error('late'));
    await Promise.resolve();
    expect(owned.task.data).toBe('new');
    expect(owned.task.error).toBeUndefined();
    const c = owned.task.run(2);
    expect(owned.task.pending).toBe(true);
    expect(owned.task.data).toBe('new');
    work[2]!.reject('failed');
    expect(await c).toEqual({ status: 'error', error: 'failed' });
    expect(owned.task.data).toBe('new');
  } finally {
    owned.dispose();
  }
});

it('取消、卸载与重复 dispose 不再接受结果，也不会再次调用 loader', async () => {
  const work = deferred<number>();
  const loader = vi.fn((_input: undefined, _signal: AbortSignal) => work.promise);
  const owned = _createRoot((dispose) => ({ dispose, task: _task(loader) }));
  const pending = owned.task.run(undefined);
  owned.task.cancel();
  expect(await pending).toEqual({ status: 'cancelled' });
  expect(owned.task.status).toBe('idle');
  const again = owned.task.retry();
  owned.dispose();
  expect(await again).toEqual({ status: 'cancelled' });
  owned.task.dispose();
  work.resolve(9);
  await Promise.resolve();
  expect(owned.task.data).toBeUndefined();
  expect(owned.task.disposed).toBe(true);
  expect(await owned.task.run(undefined)).toEqual({ status: 'cancelled' });
  expect(loader).toHaveBeenCalledTimes(2);
});

it('仅调用方显式读取的输入建立依赖，内部状态与 loader 读取不让 effect 自触发', async () => {
  const input = source(1);
  const hidden = source(2);
  const loader = vi.fn((value: number) => value + hidden.read());
  const runs: Promise<unknown>[] = [];
  const owned = _createRoot((dispose) => {
    const task = _task(loader);
    _effect(() => {
      runs.push(task.run(input.read()));
    });
    return { task, dispose };
  });
  try {
    _flushSync();
    await runs[0];
    _flushSync();
    hidden.write(3);
    _flushSync();
    expect(loader).toHaveBeenCalledTimes(1);
    input.write(2);
    _flushSync();
    await runs[1];
    expect(owned.task.data).toBe(5);
  } finally {
    owned.dispose();
  }
});

it('SSR 不启动请求；禁止没有所有者的隐式长期任务', async () => {
  const loader = vi.fn((n: number) => n);
  expect(() => _task(loader)).toThrow('作用域');
  let result!: Promise<unknown>;
  const App = defineComponent(() => {
    const task = _task(loader);
    result = task.run(1);
    return 'server';
  });
  expect(renderToString(App)).toBe('server');
  expect(await result).toEqual({ status: 'cancelled' });
  expect(loader).not.toHaveBeenCalled();
});

it('abort 监听器同步启动新任务时，外层操作不覆盖重入任务', async () => {
  let task!: Task<number, number>;
  let reentered!: Promise<unknown>;
  const never = deferred<number>();
  const owned = _createRoot((dispose) => {
    task = _task((input: number, signal) => {
      if (input === 1) {
        signal.addEventListener(
          'abort',
          () => {
            reentered = task.run(3);
          },
          { once: true },
        );
        return never.promise;
      }
      return input;
    });
    return dispose;
  });
  try {
    const first = task.run(1);
    const second = task.run(2);
    expect(await first).toEqual({ status: 'cancelled' });
    expect(await second).toEqual({ status: 'cancelled' });
    await reentered;
    expect(task.data).toBe(3);
  } finally {
    owned();
  }
});
