import { describe, expect, it } from 'vitest';
import { Derived, Scope, Source, flushSync, renderEffect } from '../src/reactivity.js';
import { RenderQueue } from '../src/render-queue.js';

describe('渲染更新顺序', () => {
  it('父条件重新订阅后，仍先销毁子树再处理子读取', () => {
    const root = new Scope(null);
    const user = new Source<{ name: string } | undefined>({ name: '甲' });
    const refresh = new Source(0);
    const visible = new Derived(() => {
      refresh.read();
      return Boolean(user.read());
    });
    const child = new Scope(root);
    const values: string[] = [];
    root.run(() =>
      renderEffect(() => {
        if (!visible.read()) child.dispose();
      }),
    );
    child.run(() =>
      renderEffect(() => {
        values.push(user.read()!.name);
      }),
    );
    try {
      flushSync(() => refresh.write(1));
      expect(() => flushSync(() => user.write(undefined))).not.toThrow();
      expect(values).toEqual(['甲']);
      expect(child.disposed).toBe(true);
    } finally {
      root.dispose();
    }
  });

  it('按深度及入队顺序处理，丢弃已取消任务', () => {
    const queue = new RenderQueue<{ depth: number; id: number }>();
    const tasks = Array.from({ length: 200 }, (_, id) => ({ id, depth: (id * 37) % 11 }));
    for (const task of tasks) queue.add(task);
    for (const task of tasks) if (task.id % 7 === 0) queue.delete(task);
    const output = [];
    while (queue.size) output.push(queue.take());
    expect(output).toEqual(
      tasks.filter((task) => task.id % 7 !== 0).sort((a, b) => a.depth - b.depth || a.id - b.id),
    );
    expect(queue.take()).toBeUndefined();
  });
});
