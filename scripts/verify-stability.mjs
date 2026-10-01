import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parseArgs } from 'node:util';
import {
  Source,
  Derived,
  Scope,
  createRoot,
  getScope,
  effect,
  renderEffect,
  propertyEffect,
  flushSync,
  onCleanup,
  tick,
} from '../packages/core/dist/reactivity.js';
import { reactive } from '../packages/core/dist/state.js';
import { createContext, provideContext, useContext } from '../packages/core/dist/context.js';
import { defineComponent, element } from '../packages/core/dist/internal.js';
import { ErrorBoundary } from '../packages/core/dist/flow.js';
import { renderToString } from '../packages/ssr/dist/index.js';

const { values } = parseArgs({
  options: { iterations: { type: 'string', default: process.env.CI ? '5000' : '1000' } },
});
const iterations = Number(values.iterations);
assert(Number.isSafeInteger(iterations) && iterations > 0, '--iterations 需要正整数。');
assert.equal(typeof globalThis.gc, 'function', '请通过 pnpm test:stability 启动显式 GC。');
const nextTurn = () => new Promise(setImmediate);
async function collect() {
  // WeakRef 的目标在本 job 内保活；registry 清理后还需下一轮才能释放其持有的键。
  for (let round = 0; round < 5; round++) {
    await nextTurn();
    globalThis.gc();
  }
  await nextTurn();
}
const retained = (references) =>
  references.filter((reference) => reference.deref() !== undefined).length;
const report = { node: process.version, platform: process.platform, iterations, phases: {} };
async function measure(name, run) {
  await collect();
  const before = process.memoryUsage().heapUsed;
  const started = performance.now();
  const result = await run();
  const milliseconds = performance.now() - started;
  await collect();
  const measurement = {
    ...result,
    milliseconds: Math.round(milliseconds),
    heapDeltaBytes: process.memoryUsage().heapUsed - before,
  };
  report.phases[name] = measurement;
  console.log(`${name}：${JSON.stringify(measurement)}`);
}

await measure('依赖与作用域周转', async () => {
  const parent = new Scope(null);
  const left = new Source(0);
  const right = new Source(0);
  const chooseLeft = new Source(true);
  const references = [];
  let runs = 0;
  let cleanups = 0;
  let roots = 0;
  function cycle(index) {
    left.write(index);
    right.write(-index - 1);
    chooseLeft.write(true);
    const stop = parent.run(() =>
      createRoot((dispose) => {
        references.push(new WeakRef(getScope()));
        const selected = new Derived(() => (chooseLeft.read() ? left.read() : right.read()));
        const doubled = new Derived(() => selected.read() * 2);
        renderEffect(() => {
          doubled.read();
        });
        propertyEffect(() => {
          doubled.read();
        });
        effect(() => {
          assert.equal(doubled.read(), 2 * (chooseLeft.read() ? left.read() : right.read()));
          runs++;
          return () => {
            cleanups++;
          };
        });
        onCleanup(() => {
          roots++;
        });
        return dispose;
      }),
    );
    try {
      flushSync();
      flushSync(() => chooseLeft.write(false));
      right.write(index + 10); // 留下排队更新，再卸载，验证任务撤销。
    } finally {
      stop();
    }
    flushSync();
    assert.equal(parent.children.size, 0);
    for (const source of [left, right, chooseLeft]) assert.equal(source.subscribers.size, 0);
  }
  try {
    for (let index = 0; index < iterations; index++) cycle(index);
    await tick();
    assert.equal(runs, iterations * 2);
    assert.equal(cleanups, runs);
    assert.equal(roots, iterations);
    await collect();
    assert.equal(retained(references), 0, '卸载后的作用域仍被引用。');
    return { roots, runs, cleanups, retainedScopes: 0 };
  } finally {
    parent.dispose();
  }
});

await measure('临时字段与冷派生回收', async () => {
  const dictionary = reactive({});
  const references = [];
  function query() {
    const key = Symbol('一次性查询');
    references.push(new WeakRef(key));
    const stop = createRoot((dispose) => {
      effect(() => {
        void dictionary[key];
        void (key in dictionary);
      });
      return dispose;
    });
    flushSync();
    stop();
  }
  for (let index = 0; index < iterations; index++) query();
  await collect();
  assert.equal(retained(references), 0, '没有实际字段的对象仍保留已销毁观察者的查询键。');
  assert.equal(Reflect.ownKeys(dictionary).length, 0);

  const model = reactive({ value: 1 });
  let calculations = 0;
  const cold = new Derived(() => {
    calculations++;
    return { result: model.value * 2 };
  });
  const original = cold.read();
  await collect();
  assert.equal(cold.read(), original, '仍存活的冷派生失去依赖或无故重算。');
  model.value = 2;
  assert.deepEqual(cold.read(), { result: 4 });
  assert.equal(calculations, 2);
  let observed;
  const stop = createRoot((dispose) => {
    effect(() => {
      observed = cold.read().result;
    });
    return dispose;
  });
  try {
    await collect();
    flushSync(() => {
      model.value = 3;
    });
    assert.equal(observed, 6, 'GC 后重新订阅没有接入当前字段。');
  } finally {
    stop();
  }
  return { queries: iterations, retainedKeys: 0, coldCachePreserved: true };
});

await measure('失败清理与后续任务', async () => {
  const source = new Source(0);
  let cleanups = 0;
  let activeRuns = 0;
  const live = createRoot((dispose) => {
    effect(() => {
      source.read();
      activeRuns++;
    });
    return dispose;
  });
  try {
    flushSync();
    for (let index = 0; index < iterations; index++) {
      const stop = createRoot((dispose) => {
        renderEffect(() => {
          source.read();
        });
        effect(() => {
          throw new Error('已取消的任务不应执行');
        });
        onCleanup(() => {
          cleanups++;
        });
        onCleanup(() => {
          throw new Error('预期清理失败');
        });
        return dispose;
      });
      assert.throws(stop, /预期清理失败/);
      assert.equal(source.subscribers.size, 1);
      flushSync(() => source.write(index + 1));
    }
    await tick();
    assert.equal(activeRuns, iterations + 1);
    assert.equal(cleanups, iterations);
  } finally {
    live();
  }
  assert.equal(source.subscribers.size, 0);
  return { failuresRecovered: iterations, independentRuns: activeRuns };
});

await measure('SSR 请求隔离与失败恢复', async () => {
  const Request = createContext('缺少请求');
  let cleanups = 0;
  let effects = 0;
  const scopes = [];
  const Child = defineComponent(({ fail }) => {
    scopes.push(new WeakRef(getScope()));
    onCleanup(() => {
      cleanups++;
    });
    if (fail) throw new Error('服务端内部信息');
    return element('p', { children: useContext(Request) });
  });
  const App = defineComponent(({ id, fail }) => {
    scopes.push(new WeakRef(getScope()));
    provideContext(Request, id);
    effect(() => {
      effects++;
    });
    onCleanup(() => {
      assert.equal(useContext(Request), id);
      cleanups++;
    });
    return element('section', {
      'data-request': id,
      children: element(ErrorBoundary, {
        children: element(Child, { fail }),
        fallback: () => element('p', { children: `恢复 ${useContext(Request)}` }),
      }),
    });
  });
  // 加载步骤异步交错，真正的 renderToString 仍遵守同步、请求内作用域契约。
  for (let start = 0; start < iterations; start += 50) {
    await Promise.all(
      Array.from({ length: Math.min(50, iterations - start) }, async (_, offset) => {
        const index = start + offset;
        await nextTurn();
        const id = `请求-${index}`;
        const fail = index % 7 === 0;
        const output = renderToString(App, { props: { id, fail } });
        assert(output.includes(`data-request="${id}"`));
        assert(output.includes(`<p>${fail ? '恢复 ' : ''}${id}</p>`));
        assert(!output.includes('服务端内部信息'));
      }),
    );
  }
  assert.equal(effects, 0);
  assert.equal(cleanups, iterations * 2);
  await collect();
  assert.equal(retained(scopes), 0, '请求结束后仍保留组件作用域。');
  return { requests: iterations, cleanups, retainedScopes: 0, serverEffects: effects };
});

const directory = resolve(import.meta.dirname, '../reports/stability');
await mkdir(directory, { recursive: true });
await writeFile(resolve(directory, 'stability-node.json'), JSON.stringify(report, null, 2));
console.log('稳定性验证通过；耗时与堆大小是本次环境的观察值，不是发布硬指标。');
