# 显式异步任务

`_task` 从 `zerodep-use/task` 导入，是普通函数，不是编译宏。它统一管理单个任务的 pending/error/data、取消、重试和过期结果，不提供网络缓存、自动防抖或跨 await 依赖跟踪。

```tsx
import { _component, _state, _effect } from 'zerodep-js';
import { _task } from 'zerodep-use/task';

export const Search = _component(() => {
  let query = _state('');
  const search = _task(async (text: string, signal) => {
    const response = await fetch(`/api/search?q=${encodeURIComponent(text)}`, { signal });
    if (!response.ok) throw new Error('查询失败');
    return await response.text();
  });
  _effect(() => {
    void search.run(query);
    return search.cancel;
  });
  return (
    <section>
      <input bind:value={query} />
      {search.pending ? <p>正在查询</p> : null}
      {search.status === 'error' ? (
        <button
          onClick={() => {
            void search.retry();
          }}
        >
          重试
        </button>
      ) : null}
      <output>{search.data ?? ''}</output>
    </section>
  );
});
```

## 类型与状态

`_task<I, T>((input: I, signal: AbortSignal) => T | PromiseLike<T>, options?)` 根据 loader 推断输入和结果类型。创建时必须属于有效组件或 `_createRoot`；不能创建无主的长期任务。创建本身不调用 loader。

可传入 `{ initial: existingData }` 表示已有成功结果，例如服务端传来的首屏数据。它只读取初值一次、不调用 loader、不自动提供 retry 输入，也不会因之后 options 的变化重新初始化。显式提供合法的 undefined 初值仍是 success；完全省略 initial 才是 idle。类型由 loader 决定，initial 不能把结果类型放宽。初值与后续 data 都是普通值，不额外深代理或克隆。

| 成员                 | 契约                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| status               | idle / pending / success / error                                                                  |
| pending              | 当前是否存在等待中的任务                                                                          |
| data                 | 最近一次成功的结果；初始 undefined，等待和失败时保留旧数据                                        |
| error                | 当前失败原因，类型 unknown；新任务开始时清空                                                      |
| run(input)           | 取消旧任务，立即设置 pending，运行新任务并返回结果 Promise                                        |
| retry()              | 使用最近一次输入重新运行；首次 run 前返回 cancelled，不启动 loader                                |
| cancel()             | 取消等待中的任务，回到 idle，保留已有 data；没有等待任务时不改变状态                              |
| reset()              | 取消任务，清空 data/error 和重试输入，回到 idle；不恢复 initial，也不发请求；dispose 后不再改状态 |
| dispose() / disposed | 永久释放；所属作用域销毁时自动调用，重复调用无副作用                                              |

status/pending/data/error 是可跟踪的只读 getter。不要通过普通解构期待持续跟踪，也不要手动写入状态。data 是 loader 返回的普通值，不做额外深代理；如需编辑结果，交给应用的 `_state` 数据模型。

清空搜索结果可以调用 reset；临时中断并保留已显示结果则调用 cancel。reset 在通知 AbortSignal 之前提交空状态，监听器若同步启动新任务，该新任务仍然有效。设置了 initial 后 data 仍可能是 undefined，因为 reset 可以清空结果。

`run` / `retry` 返回判别联合 `TaskResult<T>`：

- `{ status: 'success', data: T }`：成功，data 可以合法地为 undefined。
- `{ status: 'error', error: unknown }`：同步抛错或异步拒绝，错误由调用方展示；不会自动进入 ErrorBoundary。
- `{ status: 'cancelled' }`：被新任务替换、显式取消、已释放，或在 SSR 中调用。

loader 的业务失败作为结果返回，因此 `void task.run(input)` 不会因网络失败形成未处理的 Promise 拒绝。纯派生中调用等非法用法仍会明确报错，不隐藏编程错误。

## 取消、所有权与 SSR

同一句柄只接受最后启动的任务。新 run、cancel 和 dispose 会触发旧 AbortSignal；即使第三方 Promise 忽略 signal，旧调用也会及时返回 cancelled，迟到成功/失败不更新任务状态。取消不能撤销服务端已经执行的写操作，因此不要用一个共享句柄随意合并多个独立保存操作。

loader 应返回数据而不是自行写应用状态。若需要把结果合并到可编辑列表，在 await run 后检查 success 再处理。示例任务工作台保留保存冲突和草稿语义，只把查询的状态管理交给 `_task`。

任务不会跟踪 loader 内部的响应式读取，也不会把组件上下文传播到 await 后。依赖在调用方显式读取；条件 effect 不再需要任务时，返回 cancel 作为清理函数。需要 context 时在初始化中读取并捕获。

SSR 创建空状态或显式 initial 成功状态，不启动 loader；run/retry 返回 cancelled。服务端首屏数据仍由现有请求/路由准备并传入组件；应用根据是否已有首屏数据决定是否调用首次客户端查询，不隐式重复请求。没有自动 SSR 缓存或全局任务注册表。
