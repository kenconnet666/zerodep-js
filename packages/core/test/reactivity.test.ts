import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  Derived,
  Source,
  batch,
  createRoot,
  effect,
  flushSync,
  onCleanup,
  renderEffect,
  tick,
  untrack,
  type Cleanup,
} from '../src/runtime/reactivity.js';

const roots: Cleanup[] = [];
function root(fn: () => void): void {
  createRoot((dispose) => {
    roots.push(dispose);
    fn();
  });
}

afterEach(() => {
  for (const dispose of roots.splice(0).reverse()) dispose();
  flushSync();
});

describe('状态和派生', () => {
  it('写入立即可读，连续写入按微任务合并', async () => {
    const count = new Source(0);
    const values: number[] = [];
    root(() =>
      effect(() => {
        values.push(count.read());
      }),
    );
    expect(values).toEqual([]);
    count.write(1);
    count.write(2);
    expect(count.read()).toBe(2);
    await tick();
    expect(values).toEqual([2]);
    count.write(3);
    count.write(4);
    await tick();
    expect(values).toEqual([2, 4]);
  });

  it('惰性缓存，结果相等时不触发下游副作用', () => {
    const count = new Source(0);
    const calculate = vi.fn(() => count.read() > 2);
    const large = new Derived(calculate);
    const observe = vi.fn(() => {
      large.read();
    });
    expect(calculate).not.toHaveBeenCalled();
    root(() => effect(observe));
    flushSync();
    flushSync(() => count.write(1));
    expect(calculate).toHaveBeenCalledTimes(2);
    expect(observe).toHaveBeenCalledTimes(1);
    flushSync(() => count.write(3));
    expect(observe).toHaveBeenCalledTimes(2);
  });

  it('菱形依赖只观察一致结果，同步派生读取也一致', () => {
    const count = new Source(1);
    const left = new Derived(() => count.read() * 2);
    const right = new Derived(() => count.read() + 10);
    const total = new Derived(() => left.read() + right.read());
    const values: number[] = [];
    root(() =>
      effect(() => {
        values.push(total.read());
      }),
    );
    flushSync();
    batch(() => {
      count.write(2);
      expect(total.read()).toBe(16);
      count.write(3);
      expect(total.read()).toBe(19);
    });
    flushSync();
    expect(values).toEqual([13, 19]);
  });

  it('条件依赖切换后停止订阅旧分支', () => {
    const chooseLeft = new Source(true);
    const left = new Source(1);
    const right = new Source(2);
    const selected = new Derived(() => (chooseLeft.read() ? left.read() : right.read()));
    const values: number[] = [];
    root(() =>
      effect(() => {
        values.push(selected.read());
      }),
    );
    flushSync();
    flushSync(() => chooseLeft.write(false));
    flushSync(() => left.write(9));
    expect(values).toEqual([1, 2]);
    flushSync(() => right.write(8));
    expect(values).toEqual([1, 2, 8]);
  });

  it('冷派生不留下反向订阅，重新读取仍更新', () => {
    const source = new Source(1);
    const a = new Derived(() => source.read() + 1);
    const b = new Derived(() => a.read() * 2);
    expect(b.read()).toBe(4);
    expect(source.subscribers.size).toBe(0);
    source.write(2);
    expect(b.read()).toBe(6);
    let stop!: Cleanup;
    root(() => {
      stop = effect(() => {
        b.read();
      });
    });
    flushSync();
    expect(source.subscribers.size).toBe(1);
    stop();
    expect(source.subscribers.size).toBe(0);
    source.write(3);
    expect(b.read()).toBe(8);
  });

  it('Object.is 正确处理 NaN 与正负零', () => {
    const source = new Source(NaN);
    const observe = vi.fn(() => {
      source.read();
    });
    root(() => effect(observe));
    flushSync();
    flushSync(() => source.write(NaN));
    expect(observe).toHaveBeenCalledTimes(1);
    flushSync(() => source.write(0));
    flushSync(() => source.write(-0));
    expect(observe).toHaveBeenCalledTimes(3);
  });

  it('派生异常保留恢复所需依赖且不破坏跟踪上下文', () => {
    const broken = new Source(true);
    const value = new Derived(() => {
      if (broken.read()) throw new Error('计算失败');
      return 42;
    });
    const seen: number[] = [];
    root(() =>
      effect(() => {
        seen.push(value.read());
      }),
    );
    expect(() => flushSync()).toThrow('计算失败');
    flushSync(() => broken.write(false));
    expect(seen).toEqual([42]);
  });

  it('检测循环派生并禁止 untrack 绕过纯计算写入限制', () => {
    const looping: Derived<number> = new Derived(() => looping.read());
    expect(() => looping.read()).toThrow('循环依赖');
    const source = new Source(0);
    const invalid = new Derived(() => untrack(() => source.write(1)));
    expect(() => invalid.read()).toThrow('不能写入');
    expect(source.read()).toBe(0);
  });
});

describe('作用域和调度', () => {
  it('重跑清理子 effect，卸载释放所有订阅，重复卸载安全', () => {
    const source = new Source(0);
    const log: string[] = [];
    let dispose!: Cleanup;
    createRoot((stop) => {
      dispose = stop;
      effect(() => {
        const value = source.read();
        log.push(`父:${value}`);
        effect(() => {
          log.push(`子:${value}`);
          return () => {
            log.push(`清理子:${value}`);
          };
        });
        return () => {
          log.push(`清理父:${value}`);
        };
      });
    });
    flushSync();
    flushSync(() => source.write(1));
    dispose();
    dispose();
    flushSync(() => source.write(2));
    expect(log).toEqual([
      '父:0',
      '子:0',
      '清理子:0',
      '清理父:0',
      '父:1',
      '子:1',
      '清理子:1',
      '清理父:1',
    ]);
    expect(source.subscribers.size).toBe(0);
  });

  it('无作用域创建 effect 和 cleanup 给出明确错误', () => {
    expect(() => effect(() => {})).toThrow('createRoot');
    expect(() => onCleanup(() => {})).toThrow('有效');
  });

  it('首次执行前销毁会撤销待执行任务', async () => {
    const callback = vi.fn();
    createRoot((dispose) => {
      effect(callback);
      dispose();
    });
    await tick();
    expect(callback).not.toHaveBeenCalled();
  });

  it('清理按逆序执行，一处异常不阻止其余清理', () => {
    const log: number[] = [];
    let dispose!: Cleanup;
    createRoot((stop) => {
      dispose = stop;
      onCleanup(() => {
        log.push(1);
      });
      onCleanup(() => {
        log.push(2);
        throw new Error('清理失败');
      });
      onCleanup(() => {
        log.push(3);
      });
    });
    expect(dispose).toThrow('清理失败');
    expect(log).toEqual([3, 2, 1]);
    expect(dispose).not.toThrow();
  });

  it('setup 抛错仍释放已创建资源', () => {
    const cleanup = vi.fn();
    expect(() =>
      createRoot(() => {
        onCleanup(cleanup);
        throw new Error('初始化失败');
      }),
    ).toThrow('初始化失败');
    expect(cleanup).toHaveBeenCalledOnce();
  });

  it('清理和 untrack 的读取不污染依赖', () => {
    const trigger = new Source(0);
    const ignored = new Source(0);
    const callback = vi.fn(() => {
      trigger.read();
      untrack(() => ignored.read());
      return () => {
        ignored.read();
      };
    });
    root(() => effect(callback));
    flushSync();
    flushSync(() => trigger.write(1));
    flushSync(() => ignored.write(1));
    expect(callback).toHaveBeenCalledTimes(2);
    expect(ignored.subscribers.size).toBe(0);
  });

  it('渲染任务先于用户 effect，即使用户订阅更早', () => {
    const source = new Source(0);
    let rendered = -1;
    const seen: number[] = [];
    root(() => {
      effect(() => {
        source.read();
        seen.push(rendered);
      });
      renderEffect(() => {
        rendered = source.read();
      });
    });
    expect(rendered).toBe(0);
    flushSync();
    flushSync(() => source.write(1));
    expect(seen).toEqual([0, 1]);
  });

  it('失败任务不阻止独立任务，后续写入可以恢复', () => {
    const source = new Source(0);
    const seen: number[] = [];
    root(() =>
      effect(() => {
        if (source.read() === 1) throw new Error('局部错误');
      }),
    );
    root(() =>
      effect(() => {
        seen.push(source.read());
      }),
    );
    flushSync();
    expect(() => flushSync(() => source.write(1))).toThrow('局部错误');
    flushSync(() => source.write(2));
    expect(seen).toEqual([0, 1, 2]);
  });

  it('循环 effect 被停止，其余作用域仍然可用', () => {
    const looping = new Source(0);
    const stable = new Source(0);
    const seen: number[] = [];
    root(() =>
      effect(() => {
        looping.write(looping.read() + 1);
      }),
    );
    root(() =>
      effect(() => {
        seen.push(stable.read());
      }),
    );
    expect(() => flushSync()).toThrow('循环 effect');
    expect(looping.subscribers.size).toBe(0);
    flushSync(() => stable.write(2));
    expect(seen).toEqual([0, 2]);
  });

  it('effect 内不能重入刷新或返回 Promise', () => {
    root(() =>
      effect(() => {
        flushSync();
      }),
    );
    expect(() => flushSync()).toThrow('重入');
    root(() => {
      // @ts-expect-error 异步 effect 没有可靠的自动清理协议。
      effect(async () => {});
    });
    expect(() => flushSync()).toThrow('同步返回');
  });

  it('执行中卸载仍释放回调返回的资源', () => {
    const cleanup = vi.fn();
    const source = new Source(0);
    createRoot((dispose) => {
      effect(() => {
        source.read();
        dispose();
        return cleanup;
      });
    });
    flushSync();
    expect(cleanup).toHaveBeenCalledOnce();
    expect(source.subscribers.size).toBe(0);
  });

  it('清理期间不能创建新的孤立资源', () => {
    const trigger = new Source(0);
    root(() =>
      effect(() => {
        trigger.read();
        return () => {
          effect(() => {});
        };
      }),
    );
    flushSync();
    expect(() => flushSync(() => trigger.write(1))).toThrow('作用域');
  });

  it('flushSync 保留回调与刷新产生的两个错误', () => {
    root(() =>
      effect(() => {
        throw new Error('刷新错误');
      }),
    );
    try {
      flushSync(() => {
        throw new Error('调用错误');
      });
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(AggregateError);
      expect((error as AggregateError).errors.map((item: Error) => item.message)).toEqual([
        '调用错误',
        '刷新错误',
      ]);
    }
  });
});
