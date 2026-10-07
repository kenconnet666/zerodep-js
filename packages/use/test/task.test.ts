import { expect, it, vi } from 'vitest';
import { _createRoot, _effect, _flushSync } from 'zerodep-js';
import { defineComponent, derived, source } from 'zerodep-js/internal';
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

it('初值是成功结果，不调用 loader、不提供虚构的 retry 输入', async () => {
  const value = { title: 'server' };
  const loader = vi.fn((id: number) => ({ title: String(id) }));
  const owned = _createRoot((dispose) => ({ dispose, task: _task(loader, { initial: value }) }));
  try {
    expect(owned.task.status).toBe('success');
    expect(owned.task.pending).toBe(false);
    expect(owned.task.data).toBe(value);
    expect(await owned.task.retry()).toEqual({ status: 'cancelled' });
    expect(loader).not.toHaveBeenCalled();
    expect(await owned.task.run(2)).toEqual({ status: 'success', data: { title: '2' } });
  } finally {
    owned.dispose();
  }
});

it('显式 undefined 初值与未提供初值区分，不复制或深代理结果', () => {
  _createRoot((dispose) => {
    try {
      expect(_task(() => undefined).status).toBe('idle');
      const seeded = _task(() => undefined, { initial: undefined });
      expect(seeded.status).toBe('success');
      expect(seeded.data).toBeUndefined();
      seeded.reset();
      expect(seeded.status).toBe('idle');
    } finally {
      dispose();
    }
  });
});

it('reset 清空初值、错误和 retry 输入，保留 cancel 的原语义', async () => {
  const loader = vi.fn(() => {
    throw new Error('failed');
  });
  const owned = _createRoot((dispose) => ({
    dispose,
    task: _task<undefined, string>(loader, { initial: 'seed' }),
  }));
  try {
    await owned.task.run(undefined);
    expect(owned.task.data).toBe('seed');
    expect(owned.task.status).toBe('error');
    owned.task.cancel();
    expect(owned.task.status).toBe('error');
    const reset = owned.task.reset;
    reset();
    expect(owned.task.status).toBe('idle');
    expect(owned.task.data).toBeUndefined();
    expect(owned.task.error).toBeUndefined();
    expect(await owned.task.retry()).toEqual({ status: 'cancelled' });
    expect(loader).toHaveBeenCalledTimes(1);
    await owned.task.run(undefined);
    expect(loader).toHaveBeenCalledTimes(2);
  } finally {
    owned.dispose();
  }
});

it.each(['success', 'error'] as const)('reset 及时结束等待并忽略迟到 %s', async (outcome) => {
  const pending = deferred<string>();
  let signal!: AbortSignal;
  const owned = _createRoot((dispose) => ({
    dispose,
    task: _task(
      (_: number, nextSignal) => {
        signal = nextSignal;
        return pending.promise;
      },
      { initial: 'seed' },
    ),
  }));
  try {
    const result = owned.task.run(1);
    owned.task.reset();
    expect(signal.aborted).toBe(true);
    expect(await result).toEqual({ status: 'cancelled' });
    if (outcome === 'success') pending.resolve('late');
    else pending.reject(new Error('late'));
    await Promise.resolve();
    expect(owned.task.status).toBe('idle');
    expect(owned.task.data).toBeUndefined();
    expect(owned.task.error).toBeUndefined();
  } finally {
    owned.dispose();
  }
});

it('reset 通知 abort 时允许新任务重入，重置不清掉新的重试输入', async () => {
  let task!: Task<number, number>;
  let next!: Promise<unknown>;
  const dispose = _createRoot((stop) => {
    task = _task((id, signal) => {
      if (id === 1) {
        signal.addEventListener(
          'abort',
          () => {
            next = task.run(3);
          },
          { once: true },
        );
        return new Promise<number>(() => {});
      }
      return id;
    });
    return stop;
  });
  try {
    const first = task.run(1);
    task.reset();
    expect(await first).toEqual({ status: 'cancelled' });
    await next;
    expect(task.data).toBe(3);
    expect(await task.retry()).toEqual({ status: 'success', data: 3 });
  } finally {
    dispose();
  }
});

it('reset 是可跟踪状态更新，纯派生不能调用，dispose 后不再变更', async () => {
  const seen: string[] = [];
  const owned = _createRoot((dispose) => {
    const task = _task((value: number) => value, { initial: 1 });
    _effect(() => {
      seen.push(`${task.status}:${task.data}`);
    });
    return { task, dispose };
  });
  try {
    _flushSync();
    expect(() => derived(() => owned.task.reset()).read()).toThrow();
    expect(owned.task.data).toBe(1);
    owned.task.reset();
    _flushSync();
    expect(seen).toEqual(['success:1', 'idle:undefined']);
    await owned.task.run(2);
    owned.dispose();
    owned.task.reset();
    expect(owned.task.data).toBe(2);
    expect(await owned.task.retry()).toEqual({ status: 'cancelled' });
  } finally {
    owned.dispose();
  }
});

it('SSR 初值按请求隔离，可渲染但不启动 loader', async () => {
  const loader = vi.fn((id: number) => id);
  const calls: Promise<unknown>[] = [];
  const App = defineComponent(({ initial }: { initial: number }) => {
    const task = _task(loader, { initial });
    calls.push(task.run(9));
    return `${task.status}:${task.data}`;
  });
  expect(renderToString(App, { props: { initial: 1 } })).toBe('success:1');
  expect(renderToString(App, { props: { initial: 2 } })).toBe('success:2');
  expect(await Promise.all(calls)).toEqual([{ status: 'cancelled' }, { status: 'cancelled' }]);
  expect(loader).not.toHaveBeenCalled();
});
