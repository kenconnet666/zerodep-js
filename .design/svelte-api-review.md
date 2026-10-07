# Svelte API 对照与取舍

日期：2026-10-07。本文是研究与规划，**不代表新增 API 已实现或已获批实施**。当前实现基于 zerodep-js 的 core/use/ssr 源码、语义和表单测试；Svelte 基准为本地 5.56.10，提交 `15720b16a5ef33e3e1f4301c77b94ec375070e73`，并参考官方 API 文档。线上文档可能更新，涉及实际语义时优先看固定源码。

筛选标准：简单维护、容易使用、准确类型提示、资源与 SSR 正确性。性能不是排序依据。TSX 已能用普通表达式、函数和类型表达得更直接的部分，不算缺口，不为 API 数量或语法对齐复制 Svelte。

## 已具备或应保留的选择

| Svelte 能力                                        | 当前项目                                                         | 取舍                                                                              |
| -------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| $state / $state.raw / $derived / $derived.by       | _state/raw、_derived/by                                          | 保留变量式写法；不改为容器或 .value                                               |
| $props 解构、默认值与 rest                         | _component 参数解构、别名、默认值、实时 rest                     | 当前 TSX 更直接，不引入 $props 类宏                                               |
| if / each / key / 动态组件 / snippet               | JS 表达式、For、key、组件值、类型化 children 回调                | 保留 TSX 和显式 For 身份语义；不增加模板块语法                                    |
| 回调 props、组件绑定                               | 常规函数 props、onValueChange 约定、bind:value                   | 已有双向写回类型检查；不为对应 $bindable 再加声明宏                               |
| onMount / onDestroy / effect.root / getAbortSignal | _onMount、_onCleanup、_createRoot、_createScope、_getAbortSignal | 生命周期与取消已有基础，不误报成缺失；派生保持纯同步，取消范围不完全等同于 Svelte |
| tick / flushSync / untrack                         | _tick、_flushSync、_untrack                                      | 已有调度契约；_tick 不承诺等待网络                                                |
| 类型化 context                                     | _createContext / _provideContext / _useContext                   | 已有作用域隔离和准确类型，不需要重造                                              |
| state.snapshot                                     | _snapshot                                                        | 保留明确的 structuredClone 语义；与 Svelte 的克隆细节差异不自动视为缺陷           |
| boundary 错误恢复                                  | ErrorBoundary 的 fallback(error, reset)                          | 同步呈现/effect 的错误恢复已有；异步等待边界另行讨论                              |
| 动态代码加载                                       | _lazy、preload、fallback、重试                                   | 已有代码加载流程，不把它误称为通用异步数据资源                                    |

实现入口：[公开导出](../packages/core/src/index.ts)、[生命周期](../packages/core/src/runtime/lifecycle.ts)、[控制流](../packages/core/src/runtime/flow.ts)、[lazy](../packages/core/src/runtime/lazy.ts)、[语义](../docs/semantics.md)。

## 值得优先补足的能力

### 1. SSR 与接管一致的组件 ID：优先级最高

用户随后批准实施：`_id()` 已落地，契约见 [API](../docs/api.md#组件-id)。每次调用生成实例稳定 ID，SSR 标记由 hydration 复用；多根、列表移动、实例重建、卸载及损坏标记恢复已有测试。下面保留最初取舍依据。

Svelte 的 `$props.id()` 给组件实例生成 ID。固定源码中，服务端把 ID 写为标记，客户端 hydration 读取该标记，而不是两边各调用随机数：见 [client props_id](https://github.com/sveltejs/svelte/blob/15720b16a5ef33e3e1f4301c77b94ec375070e73/packages/svelte/src/internal/client/dom/template.js)、[server props_id](https://github.com/sveltejs/svelte/blob/15720b16a5ef33e3e1f4301c77b94ec375070e73/packages/svelte/src/internal/server/index.js)。

当前 core 没有公开的同类生成入口。组件作者必须手动传 id，否则多个 Field、提示信息和 aria-describedby 关系容易重复；SSR 和客户端各自 randomUUID 也不能保证接管一致。这是无障碍与复用能力的缺口，TSX 简洁性不能替代它。

建议先讨论一个普通函数式 `_id()`，名称暂定、不作为现有 API：组件初始化时生成实例稳定 ID，再由普通字符串组合出 input/help/error ID。不复制 `$props` 语法，不用模块全局自增号假装支持请求隔离。

验收必须覆盖：同页多实例、多 root、SSR 并发请求隔离、hydration 一致、条件分支和 keyed 列表移动、卸载后重建、客户端后续创建。代价为中等，需要进入 SSR/接管协议，不能只加一个计数器。

### 2. 通用异步任务状态：有真实价值，优先放 use

Svelte 的 await/boundary/settled 等能力能协调异步结果与呈现。当前项目已有取消信号、_createScope、_lazy 和路由 pending/loader，但普通搜索或详情请求仍需每处编写 loading/error/data、取消和过期结果保护。这里的缺口是重复且易错的生命周期管理，**不是少了一个 await 模板块**。

建议以一个普通异步任务辅助函数为试点，名称和返回形状先讨论；接收明确依赖/loader，统一 pending/error/data、重试和最后一次请求生效。优先放 use 包，普通 Promise 和 AbortSignal 继续可用。第一阶段不引入自动跨 await 跟踪、不改变 _derived 纯计算、不扩张流式 SSR、Suspense 或通用网络缓存。

必须验证同步抛错、拒绝 Promise、依赖切换、过期成功/失败、卸载取消、不支持取消的第三方 Promise、重试以及 SSR 不意外发起客户端副作用。只有语义明确后再考虑 pending 边界；不能用一个全局 settled 去等待任意用户 Promise。

依据：[现有取消作用域](../packages/core/src/runtime/lifecycle.ts)、[现有路由](../packages/use/src/router/router.ts)、[Svelte boundary](https://svelte.dev/docs/svelte/svelte-boundary)、[Svelte runtime API](https://svelte.dev/docs/svelte/svelte)。代价中等。

### 3. 退场动画与卸载协调：真实缺口，但不急于做完整动画框架

Svelte transition 的价值不只在语法：退场期间节点仍需存活，结束或取消后才销毁，并与条件/列表切换协调。普通 CSS class 和 element.animate 可以完成入场和持续动画，却不能独自决定框架何时删除节点。

当前 mount 返回同步 disposer，DOM 范围与作用域清理没有公开的异步退场协议。因此不能把 ref cleanup 中启动一个动画视为完整支持：节点可能先被移除。

建议有实际弹层/列表需求时，先做一个使用原生 Web Animations 的局部方案，讨论“等待视觉退场”与“业务订阅何时释放”的边界；先不添加 transition:/animate: 宏或整套 spring/tween。验收需要取消、快速反转、列表 key 复用、父子退场、路由切换、reduced-motion、错误恢复和强制销毁。代价较高，优先级低于 ID 与异步任务。

依据：[当前挂载与清理](../packages/core/src/dom/mount.ts)、[Svelte transition](https://svelte.dev/docs/svelte/transition)、[固定版 transitions 实现](https://github.com/sveltejs/svelte/blob/15720b16a5ef33e3e1f4301c77b94ec375070e73/packages/svelte/src/internal/client/dom/elements/transitions.js)。

### 4. 路由页面的 head 所有权：中等优先，放 SSR/use 边界

Svelte 提供 svelte:head，能将页面元数据纳入服务端输出和客户端更新。当前 renderDocument 只组合可信模板与 app HTML，没有公开的组件级 title/meta/link 收集、去重与卸载恢复协议。只在 onMount 中修改 document.title 解决不了首屏 SSR 和嵌套路由的覆盖恢复。

若项目面向带 SEO 的多页面应用，建议先做路由级 title/meta 数据契约，由 SSR 文档和客户端路由共同应用；不必从一开始支持任意组件向 head 注入节点。明确键、覆盖顺序、转义、请求隔离和导航撤销。若产品只是内部后台，此项可以延后。

依据：[当前文档组合](../packages/ssr/src/index.ts)、[Svelte head](https://svelte.dev/docs/svelte/svelte-head)。代价中等，属于产品能力，不是当前 SSR 实现必然有 bug。

## 先用普通 TSX/函数解决，不新增核心机制

### ref 与 attachment 的组合

当前 [attachRef](../packages/core/src/dom/attributes.ts) 已为回调建立子作用域，支持返回 cleanup，换 ref 或卸载时销毁；在 ref 中创建 _effect 可显式跟踪参数。它足以接入大部分 tooltip、observer 和第三方 DOM 库。

与 [Svelte attachment](https://github.com/sveltejs/svelte/blob/15720b16a5ef33e3e1f4301c77b94ec375070e73/packages/svelte/src/internal/client/dom/elements/attachments.js) 相比，主要差距是一个元素上多个行为的组合以及 ref 转发约定。先补中文示例；如果重复出现，再做普通函数组合 helper，规定反序清理和部分初始化失败的清理。不要因为缺少 @attach 名称，就把它列成整个能力缺失。

### 原生表单与双向绑定

Svelte 还支持 group、files、尺寸、媒体状态和 getter/setter 绑定。当前 bind:value/checked/valueAsNumber/this，加原生事件与 ref，已覆盖基础表单；IME、reset、选区和 hydration 的正确性比绑定名称数量更重要。

当前原生 select 的 bind:value 明确写回 string/string[]；Svelte 可以通过内部 option 值保存对象。这是实质差异，但稳定 ID 与模型查找通常更贴近原生 HTML，也便于 SSR/表单提交。不默认扩展对象 select，只有真实产品需要对象身份语义时才讨论。普通输入归一化直接写 value + onInput 更清楚，不为 getter/setter binding 再造语法。

依据：[原生 JSX 类型](../packages/core/src/native/jsx.ts)、[表单契约](../docs/forms.md)、[Svelte select 绑定](https://github.com/sveltejs/svelte/blob/15720b16a5ef33e3e1f4301c77b94ec375070e73/packages/svelte/src/internal/client/dom/elements/bindings/select.js)、[绑定清单](https://github.com/sveltejs/svelte/blob/15720b16a5ef33e3e1f4301c77b94ec375070e73/packages/svelte/src/compiler/phases/bindings.js)。

### 集合、外部订阅与浏览器状态

Svelte 有 SvelteMap/Set/Date/URL、MediaQuery 和 createSubscriber。当前 _state 有意只深度代理普通对象/数组；Map/Set 原位更新没有响应通知，但不可变替换、_effect/_onCleanup 和普通封装可解决很多场景。

先补明确示例，使用成熟外部库时接好订阅与释放；不要为了 API 对齐引入整套集合类。尺寸监听、媒体查询、window/document 事件也先用原生 API 与 ref/cleanup，只有反复出现的复杂所有权才值得统一。

依据：[Svelte reactivity 导出](https://github.com/sveltejs/svelte/blob/15720b16a5ef33e3e1f4301c77b94ec375070e73/packages/svelte/src/reactivity/index-client.js)、[当前状态语义](../docs/semantics.md)。

## 明确不纳入本轮不足

- SFC、scoped CSS、style/class 指令、模板 if/await/snippet 语法：不替换已清楚的 TSX、函数与 CSS 方案。
- legacy store 自动订阅、事件 dispatcher、旧组件实例方法：不为兼容 Svelte 旧 API 建一套维护面。
- 跨 await 隐式跟踪、可覆写 derived、推测性 fork：有独立价值，但所有权和调度成本高；目前不影响核心用法，不按功能清单补齐。
- 自定义元素编译、全栈数据层、流式 SSR、内置动画库：当前范围外，不能借这次比较顺带实施。
- 更多调试宏或命名相同的 API：已有 _inspect、开发面板与中文诊断；应按实际可定位性评价，不按名称数量评价。

## 建议实施顺序与门槛

1. 先讨论并试点 SSR 稳定 ID，明确根/请求/接管的身份语义。
2. 以一个真实搜索场景试点异步任务 helper，先验证取消和过期结果，再决定是否公开。
3. 补 ref 行为组合和外部订阅示例；只有重复代码确实出现时才提炼 helper。
4. 根据产品需求选择 head 管理或退场协调，分别设计，不捆成一次运行时大改。

每项新增先给出当前写法、拟议写法、维护代价和失败用例，再修改语义文档并做局部实现。本文不授权立即新增这些功能，也不把成熟框架的特性列表当作必须完成的路线图。
