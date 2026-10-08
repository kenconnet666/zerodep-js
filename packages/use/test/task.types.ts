import { _task } from 'zerodep-use/task';
import { _createRoot } from 'zerodep-js';

_createRoot((dispose) => {
  const task = _task(async (query: string, signal) => {
    signal.throwIfAborted();
    return [{ id: query, count: 1 }];
  });
  const data: { id: string; count: number }[] | undefined = task.data;
  void data;
  void task.run('hello').then((result) => {
    if (result.status === 'success') {
      const count: number | undefined = result.data[0]?.count;
      void count;
    }
  });
  // @ts-expect-error 输入类型来自 loader。
  void task.run(1);
  // @ts-expect-error 状态只读，只能通过 run/cancel 更新。
  task.pending = false;
  dispose();
});
