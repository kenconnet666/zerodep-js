import { expect, it } from 'vitest';
import { _createRoot, _effect, _flushSync } from 'zerodep-js';
import { derived, state } from 'zerodep-js/internal';
import { _history, type History } from '../src/history.js';

it('误传失败的异步 write 只报告同步契约错误，不产生额外的未处理拒绝', async () => {
  let value = 0;
  const history = _history({
    read: () => value,
    write: async () => {
      throw new Error('late write');
    },
  });
  value = 1;
  history.commit();
  expect(() => history.undo()).toThrow('同步');
  expect(history.index).toBe(1);
  history.dispose();
  await new Promise<void>((resolve) => setImmediate(resolve));
});

it.each(['commit', 'clear', 'undo', 'redo', 'reset'] as const)(
  '%s 的绑定回调销毁历史后，不再恢复已释放的记录或游标',
  (operation) => {
    let value = 0;
    let disposeInCallback = false;
    let history!: History;
    history = _history({
      read() {
        if (disposeInCallback) history.dispose();
        return value;
      },
      write(next) {
        value = next;
        if (disposeInCallback) history.dispose();
      },
    });
    value = 1;
    history.commit();
    if (operation === 'redo') history.undo();
    disposeInCallback = true;
    expect(history[operation]()).toBe(false);
    expect(history.disposed).toBe(true);
    expect(history.length).toBe(0);
    expect(history.index).toBe(0);
    expect(history.canUndo).toBe(false);
    expect(history.canRedo).toBe(false);
  },
);

it('绑定回调不能重入同一历史操作，异常后仍可继续使用', () => {
  let value = 0;
  let reenter = false;
  const history = _history({
    read: () => value,
    write(next) {
      if (reenter) history.commit();
      value = next;
    },
  });
  value = 1;
  history.commit();
  reenter = true;
  expect(() => history.undo()).toThrow('重入');
  expect(history.index).toBe(1);
  expect(history.length).toBe(2);
  expect(value).toBe(1);
  reenter = false;
  expect(history.undo()).toBe(true);
  expect(value).toBe(0);
  history.dispose();
});

it('每次提交保存独立数据，支持撤销/重做，继续编辑会丢弃旧重做分支', () => {
  const data = state({ name: '初始', nested: { n: 0 } });
  const history = _history({
    read: () => data.read(),
    write: (value) => {
      data.write(value);
    },
  });
  data.read().name = '一';
  history.commit();
  data.read().nested.n = 2;
  history.commit();
  expect(history.undo()).toBe(true);
  expect(data.read()).toEqual({ name: '一', nested: { n: 0 } });
  expect(history.redo()).toBe(true);
  expect(data.read().nested.n).toBe(2);
  history.undo();
  data.read().name = '新分支';
  history.commit();
  expect(history.canRedo).toBe(false);
  history.undo();
  expect(data.read().name).toBe('一');
  history.dispose();
});

it('容量限制不会丢失 reset 基线，clear 把当前值变为新的保存点', () => {
  let value = 0;
  const history = _history(
    {
      read: () => value,
      write: (next) => {
        value = next;
      },
    },
    { limit: 2 },
  );
  for (value = 1; value <= 4; value++) history.commit();
  expect(history.length).toBe(3);
  history.undo();
  history.undo();
  expect(value).toBe(2);
  expect(history.undo()).toBe(false);
  history.reset();
  expect(value).toBe(0);
  value = 10;
  history.clear();
  value = 11;
  history.commit();
  history.reset();
  expect(value).toBe(10);
  expect(history.canUndo).toBe(false);
  history.dispose();
});

it('恢复值不与记录共享对象，环和 Map/Set 按快照语义保存', () => {
  type Data = { items: Map<string, Set<number>>; self?: Data };
  let value: Data = { items: new Map([['a', new Set([1])]]) };
  value.self = value;
  const history = _history({
    read: () => value,
    write: (next) => {
      value = next;
    },
  });
  value.items.get('a')!.add(2);
  history.commit();
  history.undo();
  expect(value.self).toBe(value);
  expect([...value.items.get('a')!]).toEqual([1]);
  value.items.get('a')!.add(9);
  history.reset();
  expect([...value.items.get('a')!]).toEqual([1]);
  history.dispose();
});

it('复制失败或写入失败不移动历史位置', () => {
  let value: unknown = { n: 0 };
  let reject = false;
  const history = _history({
    read: () => value,
    write(next) {
      if (reject) throw new Error('不能恢复');
      value = next;
    },
  });
  value = { n: 1 };
  history.commit();
  reject = true;
  expect(() => history.undo()).toThrow('不能恢复');
  expect(history.index).toBe(1);
  expect(history.canRedo).toBe(false);
  value = () => {};
  expect(() => history.commit()).toThrow();
  expect(history.length).toBe(2);
  reject = false;
  history.undo();
  expect(value).toEqual({ n: 0 });
  history.dispose();
});

it('状态能被界面跟踪，组件清理释放记录，纯派生内不能修改历史', () => {
  let value = 0;
  const states: boolean[] = [];
  let history!: ReturnType<typeof _history>;
  const stop = _createRoot((dispose) => {
    history = _history({
      read: () => value,
      write: (next) => {
        value = next;
      },
    });
    _effect(() => {
      states.push(history.canUndo);
    });
    return dispose;
  });
  _flushSync();
  value = 1;
  history.commit();
  _flushSync();
  expect(states).toEqual([false, true]);
  expect(() => derived(() => history.undo()).read()).toThrow('纯派生');
  expect(value).toBe(1);
  stop();
  expect(history.disposed).toBe(true);
  expect(history.length).toBe(0);
  expect(history.commit()).toBe(false);
  history.dispose();
});
