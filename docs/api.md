# API 参考

页面元信息使用 `zerodep-js/head` 的 `_head(() => ({ title, description }))`；SSR 的 `_render` 返回正文与元信息，`renderToString` 保持字符串接口。生命周期与模板接线见 [页面元信息](head.md)。

本文对应当前公开 API，发布版本与变更见 CHANGELOG。core 顶层函数直接使用单下划线名称；路由和持久化来自独立 zerodep-use，旧 core 子入口直接移除，不保留转发或 deprecated。JSX 组件、类型/类和实例方法保持原名。

公共运行时从 `zerodep-js` 导入，Vite 插件来自 `zerodep-js-vite`，独立编译来自 `zerodep-js-compiler`，服务端入口来自 `zerodep-js-ssr`。下面记录当前实际契约；安装与声明消费见 [开始使用](getting-started.md)和[包产物](packages.md)。

RC3 候选新增 `bind:value` / `bind:checked` / `bind:valueAsNumber` 与组件绑定、`zerodep-use/history` 的 _history、core 的 _lazy。前后写法、数据类型、撤销边界和 SSR 占位规则见[编写指南](authoring.md)。

可选 `zerodep-use/storage` 提供 _persistLocal / _persistSession，统一使用显式 read/write，支持迁移、同步、失败恢复与清理。完整契约见 [浏览器持久化](storage.md)。

可选 `zerodep-use/task` 提供 `_task(loader)`：显式 run/retry/cancel，跟踪只读状态并忽略过期结果，随作用域释放，SSR 不发起任务。完整类型、结果联合和边界见 [异步任务](tasks.md)。

可选 `zerodep-use/router` 提供 _defineRoute/_defineRoutes、_createRouter、browser/hash/memory history、Router/Outlet/Link、_useRoute/_useRouter、_onBeforeLeave、_redirect/RouteError。包含类型化参数、取消/预加载、布局复用、错误恢复和 SSR 数据准备，详见 [路由](routing.md)。这些扩展均不改变状态宏写法。

## 状态宏与组件

| API                         | 用法与行为                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------- |
| `_state(initial)`           | 声明普通值类型的响应式绑定。普通可扩展对象/数组按属性跟踪；类、DOM、Date、Map/Set 保持自身语义。  |
| `_state<T>()`               | 初始值为 undefined，类型为 `T \| undefined`。                                                     |
| `_state.raw(initial)`       | 只跟踪整个绑定的替换，适合外部不可变数据或显式替换的大对象。                                      |
| `_derived(expression)`      | 纯派生值，按需计算与缓存，同步追踪读取的依赖，不能重新赋值。                                      |
| `_derived.by(() => result)` | 多语句纯派生。不能在其中写状态、注册 cleanup 或创建 effect。                                      |
| `_component(setup)`         | 接收内联同步函数，标记组件边界并保留原函数的泛型签名。通过 JSX/mount 使用，不能直接调用组件函数。 |

这些入口需要编译。状态以单个命名变量初始化；const 绑定不能重写，const 对象的可写字段仍遵守普通 JS 规则。直接导出响应式变量、复杂解构写入和宏作为普通值传递都有明确诊断；跨模块可用 getter、普通函数或状态对象。

组件 props 支持顶层解构、别名、默认值和 rest。默认表达式要求纯计算；无依赖默认对象保持实例内身份，有依赖默认值随依赖变化。输入不是深度冻结对象，数据所有权仍由应用决定。`key` 属于实例身份，不作为业务 props 传入。

## 作用域与调度

| API               | 契约                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `_effect(fn)`     | 必须在组件或 _createRoot 作用域中创建；首次与更新均排入微任务，在 DOM 和 property 提交后执行。可同步返回清理函数，返回值是停止此 effect 的函数。 |
| `_onCleanup(fn)`  | 注册到当前作用域。重跑或卸载时执行，清理不收集依赖，重复销毁不重复清理。                                                                         |
| `_createRoot(fn)` | 给 fn 一个 disposer，返回 fn 的结果。手动创建的根由调用方持有并销毁；嵌套根也属于父级。                                                          |
| `_batch(fn)`      | 合并通知，返回 fn 的结果；写入值和派生值立即可读。                                                                                               |
| `_untrack(fn)`    | 同步执行且不登记读取依赖；不豁免纯派生的写入限制。                                                                                               |
| `_flushSync(fn?)` | 执行可选工作并立即处理排队更新。不能在计算、effect 或刷新中重入。                                                                                |
| `_tick()`         | 等待当前刷新批次；不会等待所有网络请求。                                                                                                         |

以下生命周期和快照接口从 RC2 起提供。

`_onMount(fn)` 在客户端 DOM 提交后执行一次，内部读取不建立重跑依赖，可返回同步清理函数；SSR 不执行。返回的停止函数可撤销尚未执行的回调或提前释放其资源。

`_createScope()` 返回只包含 `run`、`dispose`、`signal`、`active` 的句柄，默认属于当前作用域；在组件外创建时调用方负责 dispose。run 只恢复同步回调的上下文，不让所有权跨 await 隐式传播。`_getAbortSignal()` 获取当前有效作用域的取消信号：在 effect 内每轮独立，重跑和销毁时先取消，再执行清理。

```ts
_onMount(() => {
  const signal = _getAbortSignal();
  void fetch('/api/settings', { signal }).catch(handleFailure);
});
```

`_snapshot(value)` 将可枚举普通数据中的代理脱开，再按原生 structuredClone 规则复制。支持普通对象/数组的环和共享引用，以及 Map/Set 内的代理；二进制视图共享克隆后的 buffer，原输入不被转移。Date、RegExp、Blob 等由平台复制，函数、WeakMap 等不可克隆值报错。类原型、属性描述符、符号键及 SharedArrayBuffer 遵循平台克隆语义，不是任意类实例复制器。普通属性的读取参与当前依赖跟踪，快照本身没有响应性。

异步工作使用明确的取消与过期结果检查，跟踪和作用域不跨 await 隐式传播。事件回调不继承触发者的临时跟踪上下文；需使用 context 时在组件初始化中读取并捕获它。

```tsx
_effect(() => {
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

| API                               | 契约                                                                                                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `For`                             | `each` 接受数组/null/undefined，`keyBy` 返回 string/number/symbol；children 为内联同步 `(row, index) => ...`，参数读取保持实时。fallback 用于空态。         |
| `ErrorBoundary`                   | children 为受保护子树，fallback 为 `(error, reset) => Renderable`；捕获初始化、渲染、排队 effect 错误，reset 重建子树。事件与自行启动的异步工作由应用捕获。 |
| `_createContext(defaultValue?)`   | 创建类型化 context；不传默认值时读取结果可能为 undefined。                                                                                                  |
| `_provideContext(context, value)` | 在当前作用域提供值，同一作用域不能重复提供同一个 context。变化数据使用状态对象或 getter。                                                                   |
| `_useContext(context)`            | 读取最近的提供者，缺失时返回默认值。需要当前作用域。                                                                                                        |

```tsx
const Theme = _createContext({ color: 'teal' });
const Panel = _component(() => {
  const theme = _state({ color: 'teal' });
  _provideContext(Theme, theme);
  return <Content />;
});
const Content = _component(() => {
  const theme = _useContext(Theme);
  return <p style={{ color: theme.color }}>共享主题</p>;
});
```

JSX 值是可重复插入的渲染描述，每个位置有独立 DOM 与生命周期。普通 children 可以转发；参数化内容使用显式调用的函数。普通函数值不会被自动当作 children 执行。

## Portal：把内容放到页面外层

```tsx
import { Portal } from 'zerodep-js';

<Portal>
  <div role="dialog">弹窗内容</div>
</Portal>;
```

默认把内容放到当前页面的 body，适合需要离开原容器的弹层或提示。它仍属于原父组件：数据照常更新，context 照常可用，原错误边界仍能接住错误，父组件卸载时外层内容一起清理。Portal 不自动添加包装 div，不接管目标容器中原有的内容。

需要指定位置时使用 `<Portal target={container}>内容</Portal>`，container 是同一文档中的 HTML 元素引用，不是选择器字符串。换到另一个容器时保留子组件、DOM、草稿、ID 和焦点；target 为 null 时销毁内容，恢复目标后重新创建。省略 target 或传 undefined 都使用 body。

SSR 只输出空的 Portal 标记，不读取目标、不执行子组件；整棵树成功接管后再显示外层内容。因此首屏必须包含的正文不要放进 Portal。事件按实际 DOM 位置冒泡，放到 body 后不会自动冒泡给原 JSX 父节点。Portal 只负责放置与清理，不负责弹窗焦点圈定、滚动锁定或动画。

## 原生元素与根入口

- `class`/`className`、style 字符串/对象、HTML/SVG/MathML 与原生事件遵循[原生元素契约](native-elements.md)。`StyleObject` 提供 CSS 属性提示，长度单位显式填写。
- `ref={(element) => ...}` 同步获取元素，可返回同步清理函数；若回调卸载了自己的根，刚返回的清理会立即执行。布局测量放在 DOM 提交后的 effect；回调中启动的异步资源仍需自行取消，不能直接把 async 函数作为 ref。
- `prop:member={value}` 用于客户端 DOM 成员。SSR 不求值直接表达式；解除绑定恢复接管时初值。内建表单模型和子内容所有权不能绕过。
- `on:EventName` / `oncapture:EventName` 保留精确事件名；自定义 detail 来自调用方类型契约。
- `_mount(App, { target, props })` 替换并接管目标容器，返回 disposer。
- `_hydrate(App, { target, props, mismatch?, onMismatch? })` 接管已有 HTML，默认严格校验并复用节点；`mismatch: 'replace'` 是显式重建选择。

SSR 使用 `renderToString(App, { props })` 同步生成组件 HTML；每请求独立 scope，不执行用户 effect/ref/事件。`renderDocument({ template, mode, render })` 组合可信文档模板，`serializeData(data)` 编码明确选择的 JSON 数据。具体标记、数据边界和错误恢复见 [SSR 指南](ssr-and-hydration.md)。

## 编译与公开类型

页面入口统一为 `_mount` / `_hydrate`，返回清理函数。旧 `_createPage` 的宿主输入复制、深比较和 update 协议已删除。

`zerodep-js-compiler` 的 `compile(source, filename, options?)` 返回代码、映射与开发标记，失败抛出带 diagnostics 的 CompileError。`diagnose(source, filename)` 返回单文件框架诊断。项目检查使用 `zerodep-check -p tsconfig.json`，应用编译使用 Vite，声明输出使用官方 tsc；见 [开发指南](development.md)。

常用类型包括 `ComponentProps<typeof App>`、`JSX.IntrinsicElements['button']`、`Renderable`、`Template`、`Style`、`StyleObject`、`EventHandler<Element, Event>`、`MountOptions`、`HydrateOptions`、`Context<T>` 和 `Cleanup`。优先让 component 保留函数与泛型推断，不需要为每个返回值手写接口。

`zerodep-js/internal` 是编译输出协议，不作为用户 signal API。模块间传值、控制流收窄、支持范围与迁移规则以 [语义契约](semantics.md)和[支持范围](support.md)为准。

## 组件 ID

`_id(): string` 在组件同步初始化中生成 ID，可以从同步辅助函数中调用。一个初始化中的多次调用得到不同 ID；返回值在实例存活期间稳定。它不是响应式宏，不需要额外编译语法；事件、effect、派生和普通 root 中调用都会报错。

SSR 把 ID 写为组件前的 `zj:id:` 注释，hydration 读取同一标记，label/for 和 aria-describedby 关系不变。客户端新实例使用 Web Crypto 生成独立 ID，不依赖进程全局计数器。不同请求产生不同 ID，不承诺相同输入的 HTML 字节完全相同；不要将 ID 用作业务主键。HTML 压缩器必须保留 `zj:` 协议注释，调用次数或组件树不一致会按正常接管规则报错。

```tsx
const Field = _component(() => {
  const id = _id();
  return (
    <>
      <label for={id}>姓名</label>
      <input id={id} />
    </>
  );
});
```

## DOM 引用

`<input bind:this={node} />` 将元素写入可写变量，并在卸载时清为 undefined。目标可声明为 `let node: HTMLInputElement | undefined = undefined`，也可以使用更宽的 Element 类型；显式空态初始化也让普通 lint 工具正确理解声明。需要引用变化触发视图更新时显式使用 _state。普通 let 适合事件和 _onMount 中读取。官方 IDE 不理解 bind:this 的隐式赋值，若普通变量被收窄为初始 undefined，可使用 `_state<ElementType | undefined>(undefined)` 保留准确的联合类型；框架检查投影会另外检查实际元素写入和卸载清理类型。

仅支持 DOM 标签和简单变量，不支持组件实例、对象路径、参数或与 ref 同时使用。复杂初始化仍使用 ref 回调返回清理函数；SSR 不写入 DOM 引用，hydration 验证成功后才激活。

## 原生 CSS

可选 `zerodep-js/css` 接入 zerodep-css。css 命名 const 声明自动追踪，直接响应式值可绑定元素变量；写法和边界见 [原生 CSS](css.md)。沿用 CSS 库 css 名称，不增加另一套样式 API。
