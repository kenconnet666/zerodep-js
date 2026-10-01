import { expect, it, vi } from 'vitest';
import { _createScope, _getAbortSignal, _onMount } from '../src/runtime/lifecycle.js';
import {
  _createRoot,
  _effect,
  _flushSync,
  _onCleanup,
  Source,
  Derived,
  Scope,
} from '../src/runtime/reactivity.js';
import { _createContext, _provideContext, _useContext } from '../src/runtime/context.js';

it('onMount 排队执行一次，不跟踪内部读取，并回收返回资源', () => {
  const count = new Source(0);
  const called = vi.fn();
  const cleaned = vi.fn();
  const stop = _createRoot((dispose) => {
    _onMount(() => {
      called(count.read());
      return cleaned;
    });
    expect(called).not.toHaveBeenCalled();
    return dispose;
  });
  _flushSync();
  count.write(1);
  _flushSync();
  expect(called).toHaveBeenCalledExactlyOnceWith(0);
  stop();
  stop();
  expect(cleaned).toHaveBeenCalledOnce();
});

it('提前停止或销毁会撤销尚未执行的 mount', () => {
  const called = vi.fn();
  const stop = _createRoot((dispose) => {
    _onMount(called)();
    _onMount(called);
    return dispose;
  });
  stop();
  _flushSync();
  expect(called).not.toHaveBeenCalled();
});

it('SSR 不执行 mount，作用域结束仍取消 signal', () => {
  const server = new Scope(null);
  server.server = true;
  const called = vi.fn();
  let signal!: AbortSignal;
  server.run(() => {
    _onMount(called);
    signal = _getAbortSignal();
  });
  _flushSync();
  expect(called).not.toHaveBeenCalled();
  server.dispose();
  expect(signal.aborted).toBe(true);
});

it('每轮 effect 有独立 signal，取消发生在用户 cleanup 之前', () => {
  const source = new Source(0);
  const signals: AbortSignal[] = [];
  const order: string[] = [];
  const stop = _createRoot((dispose) => {
    _effect(() => {
      const value = source.read();
      const signal = _getAbortSignal();
      expect(_getAbortSignal()).toBe(signal);
      signals.push(signal);
      signal.addEventListener('abort', () => order.push(`abort:${value}`), { once: true });
      _onCleanup(() => {
        expect(signal.aborted).toBe(true);
        order.push(`cleanup:${value}`);
      });
    });
    return dispose;
  });
  _flushSync();
  source.write(1);
  _flushSync();
  expect(signals[0]!.aborted).toBe(true);
  expect(signals[1]!.aborted).toBe(false);
  expect(signals[1]).not.toBe(signals[0]);
  stop();
  expect(order).toEqual(['abort:0', 'cleanup:0', 'abort:1', 'cleanup:1']);
});

it('子作用域保持 context、显式停止和父级销毁责任', () => {
  const Context = _createContext('default');
  const cleaned = vi.fn();
  let child!: ReturnType<typeof _createScope>;
  const stop = _createRoot((dispose) => {
    _provideContext(Context, 'root');
    child = _createScope();
    child.run(() => _onCleanup(cleaned));
    return dispose;
  });
  const signal = child.signal;
  expect(child.run(() => _useContext(Context))).toBe('root');
  stop();
  expect(child.active).toBe(false);
  expect(child.signal).toBe(signal);
  expect(signal.aborted).toBe(true);
  expect(cleaned).toHaveBeenCalledOnce();
  expect(() => child.run(() => 1)).toThrow('已销毁');
  child.dispose();
});

it('独立 scope 需要显式销毁，失败清理仍释放兄弟资源', () => {
  const parent = _createScope();
  const cleaned = vi.fn();
  let child!: ReturnType<typeof _createScope>;
  parent.run(() => {
    _onCleanup(cleaned);
    child = _createScope();
    child.run(() =>
      _onCleanup(() => {
        throw new Error('清理失败');
      }),
    );
  });
  const signal = parent.signal;
  expect(() => parent.dispose()).toThrow('清理失败');
  expect(signal.aborted).toBe(true);
  expect(child.active).toBe(false);
  expect(cleaned).toHaveBeenCalledOnce();
});

it('禁止在纯派生创建生命周期资源，也不自动传播 await 作用域', async () => {
  expect(() => _getAbortSignal()).toThrow('有效的作用域');
  const scope = _createScope();
  try {
    scope.run(() => {
      expect(() => new Derived(() => _createScope()).read()).toThrow('纯派生');
      expect(() => new Derived(() => _getAbortSignal()).read()).toThrow('纯派生');
    });
    await scope.run(async () => {
      const signal = _getAbortSignal();
      await Promise.resolve();
      expect(() => _getAbortSignal()).toThrow('有效的作用域');
      expect(signal.aborted).toBe(false);
      expect(scope.run(() => _getAbortSignal())).toBe(signal);
    });
  } finally {
    scope.dispose();
  }
});
