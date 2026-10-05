# 后续增强：具体能少写什么

2026-10-06。本文是与用户讨论候选方向的材料，不是全部要实现的清单。已批准的 bind、编辑历史、_lazy 和开发诊断/HMR 见 authoring-enhancements.md；下文写“候选”的接口尚不存在，命名和参数也未冻结。

## _watch：只在指定的数据变化时做一件事

例如编辑地址：原来的省是“浙江”、城市是“杭州”。打开表单时要保留“杭州”；用户把省改成“江苏”后才清空城市，让他重新选择。

现在的 _effect 完全可以完成它：

```tsx
let province = _state('浙江');
let city = _state('杭州');
let previousProvince = province;

_effect(() => {
  const next = province;
  if (next === previousProvince) return;
  previousProvince = next;
  city = '';
});
```

第一次运行时省份没有变，所以保留原城市。只改城市也不会清空它，因为这个 effect 只读取了 province。这个写法没有功能缺陷。

候选 _watch 想把“保存上次的值、比较变化、默认不执行第一次回调”收进工具：

```tsx
// 候选，尚未实现。
_watch(
  () => province,
  (next, previous) => {
    city = '';
  },
);
```

_effect 的依赖是回调同步执行时读取的所有响应式数据；候选 _watch 的依赖只来自第一个函数，第二个函数里为了日志或条件再读其他状态也不追加监听对象。因此区别是依赖范围和旧值管理更明确，不是 _effect 做不到。不要默认加入昂贵的深度遍历：先把单值/多个明确来源、相等比较、清理和首次执行规则说清楚。我的倾向是有足够实际用例再加入小工具，放 use，而不是给运行时再造一套调度器。

## 异步工具：防止旧请求覆盖新输入

搜索框先输入“北”，再输入“北京”。搜索“北京”的请求先回来，旧的“北”后来才回来；如果两个结果都直接写入页面，用户最终会看到旧结果。

已有 API 可以明确取消上一次工作：

```tsx
let query = _state('');
let rows = _state<string[]>([]);
let loading = _state(false);
let error = _state<unknown>();

_effect(() => {
  const text = query.trim();
  const signal = _getAbortSignal();
  if (!text) {
    rows = [];
    loading = false;
    error = undefined;
    return;
  }
  loading = true;
  error = undefined;
  void (async () => {
    try {
      // search 是应用自己的请求函数，返回 Promise<string[]>。
      const result = await search(text, { signal });
      if (!signal.aborted) rows = result;
    } catch (failure) {
      if (!signal.aborted) error = failure;
    } finally {
      if (!signal.aborted) loading = false;
    }
  })();
});
```

query 改变导致这一轮 effect 结束时，旧 signal 会取消；组件卸载也会取消。不支持 AbortSignal 的请求仍需检查 signal.aborted，才能阻止迟到结果写入。

候选工具想减少的就是上面重复的 loading/error/取消与迟到检查：

```tsx
// 候选，尚未实现。
const searchResult = _resource(
  () => query,
  (text, { signal }) => search(text, { signal }),
);
// 页面读取 searchResult.loading / data / error，重试调用 refresh()。
```

这不是给所有请求强行包一层。提交订单、保存资料等由点击触发的动作，与“输入变化就重新查询”不同，不能混成一个自动请求 API。是否要缓存、跨组件共享或服务端取数也要分别讨论。我的倾向是先完成取消/并发归属，再谈缓存，不复制整个查询库。

## 浏览器工具：需要 JavaScript 参与时才使用

“屏幕窄了就让两列变一列”应直接用 CSS；没有必要为了这个写媒体查询工具。

真正需要 JavaScript 的例子是：系统要求减少动画时，停止 Canvas 绘制循环；浏览器离线时停止后台轮询；画布容器尺寸变化后重新设置像素缓冲区。这些动作 CSS 不能替 JavaScript 执行。

更简单的例子：菜单打开后按 Esc 关闭，现在已经能这样写：

```tsx
let open = _state(false);
_onMount(() => {
  window.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape') open = false;
    },
    { signal: _getAbortSignal() },
  );
});
```

挂载后安装监听，卸载时 signal 自动移除监听，不在 SSR 访问 window。候选 `_eventListener` 只是把这种安装/移除和目标切换收起来。ResizeObserver、matchMedia 也同理，价值在于正确释放、SSR 默认值和对象改变后的重新订阅，不在于把浏览器函数换个名字。我的倾向是只补实际重复的几个工具，暂不照抄 VueUse 的整个目录。

## _snapshot 与编辑历史

`const copy = original` 不是备份，两者指向相同数据。`_snapshot(original)` 才给你脱离响应式代理的独立数据副本，可用于备份、提交请求和交给要求普通数据的第三方库。Map/Set 的快照也能复制，但不能因此推断它们的原地操作已有响应式。

_snapshot 自身不会自动撤销。已批准新增的 _history 把多份快照放入有容量上限的记录：commit 记录，undo 回上一步，redo 重做，reset 恢复保存点，clear 把当前内容设为新保存点。完整编辑器例子见 [编写指南](authoring.md#快照和撤销)。它管理浏览器内的数据，不能撤销已经发到服务器的请求。

## bind：减少输入控件重复代码

已批准并实现的 `bind:value={text}` 相当于 `value={text}` 加上把输入写回 text 的处理器。数字、勾选和多选都有明确的写回类型。组件用 value/onValueChange 这种普通属性配对，父级仍拥有数据。见 [输入绑定](authoring.md#输入绑定)。

bind 不等于表单管理。必填校验、异步验证、错误显示、是否修改过、保存期间禁用等是另一组需求。现阶段用普通状态/派生/函数可以做；如果将来补表单工具，应该让字段声明和错误归属更清楚，而不是为了几行绑定引入大型 schema 系统。

## _lazy：打开功能时才下载它的组件代码

大编辑器、图表或管理页面不必进入网站就全部下载。已实现的 `_lazy(() => import('./Editor.js'))` 返回可以正常写 JSX 的组件；首次显示时下载，失败时允许重试，关闭后清理实例。代码只下载一份，多个实例的数据各自独立。见 [按需组件](authoring.md#按需下载组件)。

它解决“什么时候下载界面代码”，上面的异步工具解决“请求业务数据时如何管理等待和失败”，是两件不同的事。当前 SSR 输出加载占位，不等待下载后再生成完整内容。

## Map/Set：可以继续沿用 _state，不必发明新容器

你提出的方向合理：未来可以扩展 `_state(new Set())`，让 add/delete/clear 触发正确更新，而不是要求用户另学 ReactiveSet。

但当前实现只代理普通对象和数组。`let selected = _state(new Set<string>())` 的整个变量被替换时会更新；`selected.add('a')` 当前不会通知依赖。现在要更新需要 `selected = new Set([...selected, 'a'])`。

直接增强 _state 是可行的，但需要分别处理原生方法、size、遍历以及 Map 的键。例如只有 map.get('a') 的值变了，不应让只读 map.get('b') 的位置也更新；代理对象和原始对象作为键时还要有一致行为。这是尚待确认的响应式扩展，不是目前已经支持或技术上不能做。

## 开发诊断和热更新保留状态

已批准的目标是：开发时能找到组件、查看它的本地状态和最近的异常/重载；改一段文案后，刚输入的表单数据尽量不丢。代码报错应定位到原始 TSX，不能只给一段编译后的堆栈。

Vue Devtools 的组件树、状态查看和时间线值得参考；Vue 的组件实例和内部协议不能原样用在独立框架。具体实现采用开发态元数据与独立查看界面，不安装 Vue 作为本框架运行时。生产构建不自动注入该界面。

保留数据不等于保留旧代码：热更新仍须移除旧监听、停止旧 effect、取消旧异步工作。修改状态初始值/类型，或导出结构无法安全替换时应重置并说明原因；不能承诺任何源代码修改都保留全部状态。此阶段进度见 authoring-enhancements.md。

## 其他可选方向

| 需求场景                              | 能补什么                                                  | 当前倾向                                                   |
| ------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------- |
| 日期面板被父容器 overflow:hidden 裁掉 | Portal 把面板 DOM 放到 body，组件所有权和卸载仍属于原位置 | 有明确场景再做；焦点、事件、SSR 目标需要一起考虑           |
| 关闭提示条时希望先播放退出动画        | 保留 DOM 到动画完成，再销毁，并能处理期间重新打开         | 与普通条件渲染是不同生命周期，单独设计，不先造完整动画系统 |
| 多组件共享主题/当前用户               | 现有 context 加状态对象或 getter 已能处理                 | 不再补一套 Provider/store 命名来重复同一能力               |
| 容器变化时测量/监听真实元素           | 现有 ref 获取元素，_onMount 后测量，cleanup 释放          | 优先补足已存在 ref 的使用文档；仅真实重复时增加观察器工具  |
| 大列表行数特别多                      | 虚拟列表只显示可见行，保持选择、焦点和无障碍导航          | 可选应用组件；先测实际瓶颈，不让所有列表承担额外复杂度     |
| 整张表单校验、保存、恢复              | 在绑定之上管理错误、是否修改、提交状态                    | 尚未批准实现，避免把 schema/验证器强制装进 core            |

这些方向没有被否决，也没有全部成为任务。选择标准是有没有明确场景、能否减少重复且保留可预测的生命周期，而不是别的框架有多少函数。
