# API 参考

公共运行时从 `zerodep-js` 导入，Vite 插件来自 `zerodep-js-vite`，独立编译来自 `zerodep-js-compiler`，服务端入口来自 `zerodep-js-ssr`。下面记录当前实际契约；安装与声明消费见 [开始使用](getting-started.md)和[包产物](packages.md)。

main 新增的可选 `zerodep-js/storage` 提供 persistLocal / persistSession，绑定对象或显式 read/write，支持迁移、同步、失败恢复与清理。完整契约见 [浏览器持久化](storage.md)，尚未进入已发布 RC1。

## 状态宏与组件

| API                         | 用法与行为                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------- |
| `$state(initial)`           | 声明普通值类型的响应式绑定。普通可扩展对象/数组按属性跟踪；类、DOM、Date、Map/Set 保持自身语义。  |
| `$state<T>()`               | 初始值为 undefined，类型为 `T \| undefined`。                                                     |
| `$state.raw(initial)`       | 只跟踪整个绑定的替换，适合外部不可变数据或显式替换的大对象。                                      |
| `$derived(expression)`      | 纯派生值，按需计算与缓存，同步追踪读取的依赖，不能重新赋值。                                      |
| `$derived.by(() => result)` | 多语句纯派生。不能在其中写状态、注册 cleanup 或创建 effect。                                      |
| `component(setup)`          | 接收内联同步函数，标记组件边界并保留原函数的泛型签名。通过 JSX/mount 使用，不能直接调用组件函数。 |

这些入口需要编译。状态以单个命名变量初始化；const 绑定不能重写，const 对象的可写字段仍遵守普通 JS 规则。直接导出响应式变量、复杂解构写入和宏作为普通值传递都有明确诊断；跨模块可用 getter、普通函数或状态对象。

组件 props 支持顶层解构、别名、默认值和 rest。默认表达式要求纯计算；无依赖默认对象保持实例内身份，有依赖默认值随依赖变化。输入不是深度冻结对象，数据所有权仍由应用决定。`key` 属于实例身份，不作为业务 props 传入。

## 作用域与调度

| API              | 契约                                                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `effect(fn)`     | 必须在组件或 createRoot 作用域中创建；首次与更新均排入微任务，在 DOM 和 property 提交后执行。可同步返回清理函数，返回值是停止此 effect 的函数。 |
| `onCleanup(fn)`  | 注册到当前作用域。重跑或卸载时执行，清理不收集依赖，重复销毁不重复清理。                                                                        |
| `createRoot(fn)` | 给 fn 一个 disposer，返回 fn 的结果。手动创建的根由调用方持有并销毁；嵌套根也属于父级。                                                         |
| `batch(fn)`      | 合并通知，返回 fn 的结果；写入值和派生值立即可读。                                                                                              |
| `untrack(fn)`    | 同步执行且不登记读取依赖；不豁免纯派生的写入限制。                                                                                              |
| `flushSync(fn?)` | 执行可选工作并立即处理排队更新。不能在计算、effect 或刷新中重入。                                                                               |
| `tick()`         | 等待当前刷新批次；不会等待所有网络请求。                                                                                                        |

下面新增的生命周期和快照入口当前位于 main 开发版本，尚不包含在已发布的 RC1 中。

`onMount(fn)` 在客户端 DOM 提交后执行一次，内部读取不建立重跑依赖，可返回同步清理函数；SSR 不执行。返回的停止函数可撤销尚未执行的回调或提前释放其资源。

`createScope()` 返回只包含 `run`、`dispose`、`signal`、`active` 的句柄，默认属于当前作用域；在组件外创建时调用方负责 dispose。run 只恢复同步回调的上下文，不让所有权跨 await 隐式传播。`getAbortSignal()` 获取当前有效作用域的取消信号：在 effect 内每轮独立，重跑和销毁时先取消，再执行清理。

```ts
onMount(() => {
  const signal = getAbortSignal();
  void fetch('/api/settings', { signal }).catch(handleFailure);
});
```

`snapshot(value)` 将可枚举普通数据中的代理脱开，再按原生 structuredClone 规则复制。支持普通对象/数组的环和共享引用，以及 Map/Set 内的代理；二进制视图共享克隆后的 buffer，原输入不被转移。Date、RegExp、Blob 等由平台复制，函数、WeakMap 等不可克隆值报错。类原型、属性描述符、符号键及 SharedArrayBuffer 遵循平台克隆语义，不是任意类实例复制器。普通属性的读取参与当前依赖跟踪，快照本身没有响应性。

异步工作使用明确的取消与过期结果检查，跟踪和作用域不跨 await 隐式传播。事件回调不继承触发者的临时跟踪上下文；需使用 context 时在组件初始化中读取并捕获它。

```tsx
effect(() => {
  const controller = new AbortController();
  const url = `/api/search?q=${encodeURIComponent(query)}`;
  void fetch(url, { signal: controller.signal })
    .then((response) => response.json())
    .then((result) => {
      if (!controller.signal.aborted) items = result;
    })
    .catch((error) => {
      if (!controller.signal.aborted) report(error);
    });
  return () => controller.abort();
});
```

真实应用应校验网络响应；完整示例在任务工作台中。异步 effect 本身不能返回 Promise 来充当 cleanup。

## 结构与共享上下文

| API                              | 契约                                                                                                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `For`                            | `each` 接受数组/null/undefined，`keyBy` 返回 string/number/symbol；children 为内联同步 `(row, index) => ...`，参数读取保持实时。fallback 用于空态。         |
| `ErrorBoundary`                  | children 为受保护子树，fallback 为 `(error, reset) => Renderable`；捕获初始化、渲染、排队 effect 错误，reset 重建子树。事件与自行启动的异步工作由应用捕获。 |
| `createContext(defaultValue?)`   | 创建类型化 context；不传默认值时读取结果可能为 undefined。                                                                                                  |
| `provideContext(context, value)` | 在当前作用域提供值，同一作用域不能重复提供同一个 context。变化数据使用状态对象或 getter。                                                                   |
| `useContext(context)`            | 读取最近的提供者，缺失时返回默认值。需要当前作用域。                                                                                                        |

```tsx
const Theme = createContext({ color: 'teal' });
const Panel = component(() => {
  const theme = $state({ color: 'teal' });
  provideContext(Theme, theme);
  return <Content />;
});
const Content = component(() => {
  const theme = useContext(Theme);
  return <p style={{ color: theme.color }}>共享主题</p>;
});
```

JSX 值是可重复插入的渲染描述，每个位置有独立 DOM 与生命周期。普通 children 可以转发；参数化内容使用显式调用的函数。普通函数值不会被自动当作 children 执行。

## 原生元素与根入口

- `class`/`className`、style 字符串/对象、HTML/SVG/MathML 与原生事件遵循[原生元素契约](native-elements.md)。`StyleObject` 提供 CSS 属性提示，长度单位显式填写。
- `ref={(element) => ...}` 获取元素，可返回清理函数。布局测量放在 DOM 提交后的 effect；同步回调中启动的异步资源仍需自行取消。
- `prop:member={value}` 用于客户端 DOM 成员。SSR 不求值直接表达式；解除绑定恢复接管时初值。内建表单模型和子内容所有权不能绕过。
- `on:EventName` / `oncapture:EventName` 保留精确事件名；自定义 detail 来自调用方类型契约。
- `mount(App, { target, props })` 替换并接管目标容器，返回 disposer。
- `hydrate(App, { target, props, mismatch?, onMismatch? })` 接管已有 HTML，默认严格校验并复用节点；`mismatch: 'replace'` 是显式重建选择。

SSR 使用 `renderToString(App, { props })` 同步生成组件 HTML；每请求独立 scope，不执行用户 effect/ref/事件。`renderDocument({ template, mode, render })` 组合可信文档模板，`serializeData(data)` 编码明确选择的 JSON 数据。具体标记、数据边界和错误恢复见 [SSR 指南](ssr-and-hydration.md)。

## 编译与公开类型

`compile(source, filename, options?)` 返回 `{ code, map }`，编译失败抛出 CompileError，其 diagnostics 包含代码、文件和位置。`diagnose(source, filename)` 返回诊断数组。CLI 为 `zerodep-check`，可与 TS7 检查并行提供框架语义反馈，见[开发指南](development.md)。

常用类型包括 `ComponentProps<typeof App>`、`JSX.IntrinsicElements['button']`、`Renderable`、`Template`、`Style`、`StyleObject`、`EventHandler<Element, Event>`、`MountOptions`、`HydrateOptions`、`Context<T>` 和 `Cleanup`。优先让 component 保留函数与泛型推断，不需要为每个返回值手写接口。

`zerodep-js/internal` 是编译输出协议，不作为用户 signal API。模块间传值、控制流收窄、支持范围与迁移规则以 [语义契约](semantics.md)和[支持范围](support.md)为准。
