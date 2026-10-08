import { _onCleanup, _snapshot, _untrack } from 'zerodep-js';
import { assertCanWrite, getScope, source, synchronous } from 'zerodep-js/internal';

export interface HistoryBinding<T> {
  read(): T;
  write(value: T): void;
}
export interface HistoryOptions {
  /** 可撤销的操作数量；另保留创建时或 clear 时的重置基线。 */
  limit?: number;
}
export interface History {
  readonly canUndo: boolean;
  readonly canRedo: boolean;
  readonly length: number;
  readonly index: number;
  readonly disposed: boolean;
  /** 句柄方法捕获所属状态，不依赖 this，可以直接用作回调。 */
  commit(this: void): boolean;
  undo(this: void): boolean;
  redo(this: void): boolean;
  /** 恢复基线并清空其后的操作记录。 */
  reset(this: void): boolean;
  /** 把当前数据设为新的基线，适合保存成功后使用。 */
  clear(this: void): boolean;
  dispose(this: void): void;
}

/** 手动标记操作边界；只记录数据，不把网络提交或 DOM 操作当成可撤销事务。 */
export function _history<T>(binding: HistoryBinding<T>, options: HistoryOptions = {}): History {
  assertCanWrite();
  const limit = options.limit ?? 50;
  if (!Number.isSafeInteger(limit) || limit < 1) throw new TypeError('历史 limit 必须是正整数。');
  if (typeof binding?.read !== 'function' || typeof binding?.write !== 'function')
    throw new TypeError('历史记录需要 read 和 write。');

  const capture = () =>
    _untrack(() => _snapshot(synchronous(binding.read(), '历史记录的 read/write 必须同步完成。')));
  let baseline: T | undefined = capture();
  let records: T[] = [baseline];
  let position = 0;
  let disposed = false;
  let operating = false;
  const state = source({ length: 1, index: 0, disposed: false });
  const publish = () => state.write({ length: records.length, index: position, disposed });

  const operate = (action: () => boolean): boolean => {
    if (disposed) return false;
    assertCanWrite();
    if (operating) throw new Error('历史记录的 read/write 回调不能重入同一历史操作。');
    operating = true;
    try {
      return _untrack(action);
    } finally {
      operating = false;
    }
  };

  const apply = (value: T) => {
    // write 获得副本，后续编辑不能回头修改历史；只有写入成功后才移动游标。
    const copy = _snapshot(value);
    synchronous(binding.write(copy), '历史记录的 read/write 必须同步完成。');
  };
  const move = (offset: number): boolean =>
    operate(() => {
      const next = position + offset;
      if (next < 0 || next >= records.length) return false;
      apply(records[next]!);
      // 用户回调可能卸载所有者；已释放的记录不能被外层操作恢复。
      if (disposed) return false;
      position = next;
      publish();
      return true;
    });
  const history: History = Object.freeze({
    get canUndo() {
      return state.read().index > 0;
    },
    get canRedo() {
      const current = state.read();
      return !current.disposed && current.index < current.length - 1;
    },
    get length() {
      return state.read().length;
    },
    get index() {
      return state.read().index;
    },
    get disposed() {
      return state.read().disposed;
    },
    commit: () =>
      operate(() => {
        const copy = capture();
        if (disposed) return false;
        records = records.slice(0, position + 1);
        records.push(copy);
        if (records.length > limit + 1) records.splice(0, records.length - limit - 1);
        position = records.length - 1;
        publish();
        return true;
      }),
    undo: () => move(-1),
    redo: () => move(1),
    reset: () =>
      operate(() => {
        apply(baseline as T);
        if (disposed) return false;
        records = [baseline as T];
        position = 0;
        publish();
        return true;
      }),
    clear: () =>
      operate(() => {
        const copy = capture();
        if (disposed) return false;
        baseline = copy;
        records = [copy];
        position = 0;
        publish();
        return true;
      }),
    dispose() {
      if (disposed) return;
      assertCanWrite();
      disposed = true;
      baseline = undefined;
      records = [];
      position = 0;
      publish();
    },
  });
  if (getScope()) _onCleanup(history.dispose);
  return history;
}
