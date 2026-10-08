# 普通异步请求

请求直接使用 async/await 和 fetch，页面数据用 `_state`。不需要创建任务对象，也没有 run/retry/reset 一组额外操作。

## 页面打开后请求一次

下面的代码放在 `_component` 的初始化函数中：

```tsx
let data = _state('');
let error = _state('');

async function load() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('查询失败');
    data = await response.text();
  } catch (cause) {
    error = cause instanceof Error ? cause.message : '查询失败';
  }
}

_onMount(() => {
  void load();
});
```

点击刷新时直接调用 load；需要加载提示时，由页面保存一个 boolean。以上写法只发起请求，不自动取消普通 fetch。错误显示什么、失败后是否保留旧数据，由页面决定。

参考 Svelte 的 onMount 请求示例使用普通异步函数。本项目的 `_onMount` 和 `_effect` 仍同步返回清理函数或 undefined，因此通过同步回调启动 load，不直接把 async 函数传作生命周期回调。它们在 SSR 不执行；服务端首屏数据由请求入口准备，再通过 props 传入。

## 条件变化后重新请求

在 effect 中同步读取查询条件，并将该轮的取消信号传给普通函数：

```tsx
_effect(() => {
  const id = selectedId;
  const signal = _getAbortSignal();
  void loadItem(id, signal);
});

async function loadItem(id: string, signal: AbortSignal) {
  try {
    const response = await fetch(`/api/items/${encodeURIComponent(id)}`, { signal });
    if (!response.ok) throw new Error('查询失败');
    const result = await response.text();
    if (!signal.aborted) data = result;
  } catch (cause) {
    if (!signal.aborted) error = cause instanceof Error ? cause.message : '查询失败';
  }
}
```

effect 重跑或销毁时，旧信号自动取消。组件初始化时取得的 `_getAbortSignal()` 则跟随组件销毁。取消不能强行终止任意 Promise；写回前检查 signal，避免不支持取消的传输层交回旧结果。不会把依赖跟踪或组件上下文自动延伸到 await 后。

任务工作台还允许手动刷新，并需要在保存冲突时取消查询以保护草稿，因此在应用内使用一个 AbortController 管理当前查询，再用 AbortSignal.any 合并生命周期信号。这里的取消策略属于这个页面，不另造公共请求工具。

## 与已有版本的区别

rc.8 曾发布 `zerodep-use/task`，当前源码已删除该入口及其类型，没有兼容转发。迁移时直接调用原来的异步函数；原 data/pending/error 由页面按需要保存。服务器初值直接初始化页面状态，不经过任务工具。

这次没有实现 `$derived(await ...)`、await 模板块或自动异步渲染。Svelte 的这些能力涉及额外编译与渲染机制，不能只改函数名字就声称支持。

参考：[Svelte onMount](https://svelte.dev/docs/svelte/svelte#onMount)、[Svelte getAbortSignal](https://svelte.dev/docs/svelte/svelte#getAbortSignal)。本项目保持自己的同步生命周期与 SSR 契约。
