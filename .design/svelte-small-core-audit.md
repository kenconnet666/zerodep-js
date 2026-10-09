# Svelte 编译路径与小核心审查

2026-10-09 范围更新：整个 packages/use（含 _history）已取消维护；下文保留原审查依据，不作为当前工具包维护计划。

日期：2026-10-07。用户选择“优先维护小核心，允许把不必要的高级能力列为删减候选”。本报告给出删减和重构建议，不自动撤销已经发布的 API；本轮仅另行修复了已由远端 CI 证明的文件变更检测错误。

## 审查依据与边界

- zerodep-js 基线：`af0b665`，已经移除跨命令后台服务。
- 本地 Svelte：`5.56.10`，干净检出 `15720b16a5ef33e3e1f4301c77b94ec375070e73`，路径 `C:/Users/lionheart/WebstormProjects/svelte`。
- 行为探针：现有本地 npm 缓存中的 Svelte `5.57.1` 编译器，未安装项目依赖或修改 Svelte 源码。
- 另核对官方 Svelte 文档、language-tools 的 svelte-check 说明及 vite-plugin-svelte 主线源码。插件主线不当作上述本地版本的固定依赖快照。
- 阅读了核心导出、编译/类型/工具入口、路由、存储、历史、页面宿主、开发面板、SSR 和相应示例/测试。仓库引用只能说明仓库内使用，不能证明外部 npm 用户是否需要某项 API。
- 区分三类成本：类型检查时间、运行时体积/速度、维护和验证范围。删除一个可选功能不一定能降低当前类型检查耗时。

## Svelte 的主要取舍

### 1. 单组件编译不执行完整 TypeScript 类型检查

本地 `packages/svelte/src/compiler/index.js:23` 的 compile 路径是解析组件、去除 TypeScript 类型节点、分析组件、生成 client/server 输出。`phases/1-parse/remove_typescript_nodes.js` 删除类型注解、interface/type、as/satisfies 等节点；不创建 TypeScript Program/checker。

实际探针：

| 输入                                                                    | compile 结果                                                   |
| ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| `<script lang="ts">let count: number = "wrong";</script><p>{count}</p>` | 成功生成 258 字符 JS，无警告；赋值类型错误需由类型检查工具报告 |
| `$state` 变量被用于 `<div bind:value={value}>`                          | 拒绝，`bind_invalid_target`，限定 input/textarea/select        |

因此“去掉完整类型检查”不等于“放弃框架语义诊断”。Svelte 编译器仍检查语法、作用域、rune、绑定目标等；项目 TypeScript 错误由编辑器和 svelte-check 处理。svelte-check 仍需理解项目依赖，不能仅检查改动文件后就宣称所有使用点正确。

适用于本项目：生产流程安排一次完整原生检查，转换阶段保留框架语义约束，避免再逐文件重复完整检查。开发态本来已经默认不阻塞于完整类型检查，应保留。不能把 Svelte 的纯转换耗时与我们的 check+transform 耗时直接比较。

来源：[编译入口](https://github.com/sveltejs/svelte/blob/15720b16a5ef33e3e1f4301c77b94ec375070e73/packages/svelte/src/compiler/index.js)、[TypeScript 支持](https://svelte.dev/docs/svelte/typescript)、[svelte-check](https://github.com/sveltejs/language-tools/blob/master/packages/svelte-check/README.md)。

### 2. 固定 DOM 属性和绑定规则直接表达

`elements.d.ts:1076` 的 HTMLInputAttributes 等是明确的接口，SvelteHTMLElements 直接映射标签；编译器的 `phases/bindings.js` 明列绑定对应事件、适用标签、双向性和 SSR 行为。它不会在每次应用检查中通过一套通用类型运算重新推导所有 DOM 成员是否可写。

本项目的 WritableKeys、NativeProps、HtmlAttributes、Elements 将固定平台信息与用户类型一起运算，是已经测到的主要成本。建议把固定信息在库维护阶段生成，消费者读取明确接口，自定义元素与声明合并单独保留扩展路径。

不能机械照抄所有 Svelte 类型：其部分输入属性采用 any，有自己的绑定语义。我们的严格 value/bind 类型、readonly 拒绝和导航来源必须单独验收，不能用扩大到 any 来换速度。

### 3. 组件可绑定属性显式声明

Svelte 5 runes 模式以 `$bindable()` 声明可绑定 prop。`VariableDeclarator.js:129` 将其标记为 `bindable_prop`。显式信息降低了框架猜测意图的需要。

我们从 `value/onValueChange` 命名关系自动推导可绑定字段，并对通用 props 构造条件类型、联合与交叉约束。该便利性应重新评估：原生三类表单绑定保留；自定义组件绑定可以考虑显式元数据，或先收窄自动推导范围。具体 API 属于后续设计，不直接引入新 rune，也不在本次改变调用语法。

来源：[$bindable](https://svelte.dev/docs/svelte/$bindable)。

### 4. 增量更新交给宿主，限制缓存和无效更新

官方 Vite 插件按模块执行 compile，区分 client/server；hot-update 插件保存变换结果，在 buildStart 清空，重新转换受影响模块后比较输出，跳过没有实际变化的 HMR 更新。JS/CSS 更新分别处理。

这不代表编译器对变化组件只解析几个字符，也不代表编译、类型检查、格式化都共用一棵 AST。该缓存属于构建/开发宿主，不需要我们恢复跨命令后台服务。

来源：[compile 插件](https://github.com/sveltejs/vite-plugin-svelte/blob/main/packages/vite-plugin-svelte/src/plugins/compile.js)、[hot-update 插件](https://github.com/sveltejs/vite-plugin-svelte/blob/main/packages/vite-plugin-svelte/src/plugins/hot-update.js)。

### 5. 只生成当前组件需要的代码，但不复制它全部的功能范围

Svelte client transform 根据 uses_props、uses_rest_props、uses_slots、runes、hmr 等分析/选项分支生成相应代码。应该借鉴能力边界和按需输出；静态 DOM 提取、细粒度更新主要改善运行时，不能直接解释成 TS 类型检查提速。

不建议引入 Svelte 的 SFC 虚拟代码层、完整 CSS 编译、legacy 兼容、转场或异步组件模型。我们已有标准 TSX 与定制 Go 编译器，额外维护这些机制与“小核心”目标相反。

## `bind:this` 是否值得加入

结论：DOM 引用版有价值，列为完成主要性能改造后的有限候选；组件实例版暂缓。它改善变量式写法和引用清理，不是编译加速措施，也不需要为了它恢复后台服务或引入另一套 AST。

### Svelte 的实际语义与成本

Svelte 的 `bind:this` 把 DOM 节点或组件公开实例写到用户变量中。DOM 在挂载前不可用；它不是绑定名为 this 的 DOM 属性，也不是把变量赋值反向替换为新 DOM。Svelte 5 组件引用主要获得组件导出的函数/常量，不应理解为拿到类实例或组件根元素。

本地 `src/internal/client/dom/elements/bindings/this.js` 不只是一次赋值：它检查引用身份，在 each 上下文变化时清理旧位置，在销毁阶段清空仍属于旧节点的引用，并处理清理先后顺序。`build_bind_this` 还要收集列表上下文，生成读写闭包。直接支持 `refs[row.id]`、动态索引和组件实例，会明显扩大维护范围。

在已有 Svelte 5.57.1 编译器上执行输入探针：`let node: HTMLInputElement | undefined; <input bind:this={node} />` 对应的 Svelte 组件在 client 输出中产生 `$.bind_this(input, setter, getter)`，server 输出只保留 `<input/>`，不创建 DOM 引用。该探针仅验证生成行为，没有测量新功能性能。

来源：[官方 bind:this 文档](https://svelte.dev/docs/svelte/bind#bind:this)、[本地版本运行时对应源码](https://github.com/sveltejs/svelte/blob/15720b16a5ef33e3e1f4301c77b94ec375070e73/packages/svelte/src/internal/client/dom/elements/bindings/this.js)。

### 本项目已有什么

- `NativeProps<T>.ref` 已有具体元素类型，`attachRef` 接受回调返回的清理函数；当前编译器也能转换下面的 ref 写法。
- `LifecycleExample.tsx` 已存在“普通变量保存节点，_onMount 读取”的真实需求；canvas、焦点、测量和第三方 DOM 库也适用。
- 当前 `<input bind:this={node} />` 的实际编译结果是 ZJ1403“不支持 bind:this”，不能把下面的建议写法当成已支持。
- `_component` 的 setup 返回 Renderable，当前没有公开组件实例协议。支持 `<Dialog bind:this={dialog} />` 并调用 dialog.open，需要另行设计暴露方法、句柄类型及挂载/替换/销毁契约，不能靠把 ref 转发到根 DOM 代替。

现在已有的完整引用清理写法：

```tsx
let input: HTMLInputElement | undefined;

<input
  ref={(element) => {
    input = element;
    return () => {
      if (input === element) input = undefined;
    };
  }}
/>;
```

建议的 DOM 简写，尚未实现：

```tsx
let input: HTMLInputElement | undefined;

_onMount(() => input?.focus());

return <input bind:this={input} />;
```

### 推荐的最小边界

1. 先只支持已有类型明确的 DOM 标签和简单可写局部变量。`refs[key]`、函数 getter/setter 对、动态对象路径和组件实例不进入首批。复杂资源初始化及列表引用继续用 ref 回调，因此保留 ref 有不同职责，不只是重复命名。
2. 复用现有 ref 的挂载、作用域清理和 hydration 验证后激活机制。卸载时仅在变量仍指向该节点时清空；建议统一回到 undefined，与当前示例的可选类型一致，不强行复制 Svelte 销毁时写 null 的约定。
3. 普通 let 仍是普通变量，供事件或 _onMount 读取；如果用户需要元素切换触发 effect，使用显式 _state。不能为简写隐式赋予任意 let 响应性。SSR 不写入引用；挂载完成前不能当作已存在的 DOM 使用。
4. `bind:this` 和同元素 ref 首批明确互斥，减少双重所有权及执行顺序规则。条件切换时旧引用不得覆盖新引用，不鼓励多个同时存在的节点竞争一个变量。
5. 类型安全是必要成本：除了 const、导入、只读派生等可写性约束，还要检查“真实元素类型可以写入目标变量，清理值 undefined 也可以写入”。仅增加 `'bind:this'?: T` 是读取方向的 JSX 检查，不能证明写回安全；DOM 子类型或未初始化变量尤其需要反例。检查应接入已有 Go 分析/类型检查流程，不新建独立 Program。
6. 对该属性增加声明与实际 TS7 补全/悬浮信息/跳转验收。事件后的类型收窄仍按 TS 规则；不能假定 TS 已看见编译器稍后生成的赋值。

实施前后至少验证：元素类型正反例、拒绝只读目标、初始空态、条件卸载/替换、状态引用更新、SSR 不赋值、hydration 失败不泄露节点、正常接管和 HMR 清理，以及现有 ref 初始化/清理不回归。单独测加此能力前后的类型实例化数量和编译时间，不预先声称“零成本”。

优先级低于固定 DOM 类型与单次检查流程。建议先解决已测到的类型成本，再在一个已有生命周期示例上验证 DOM 简写是否足够小；组件公开句柄等遇到真实需求再设计。

## 具体审核结果

| 优先级           | 对象                                                                  | 证据与判断                                                                                                                                                | 建议                                                                                                                                                                |
| ---------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0               | 文件指纹快路径                                                        | Windows ARM64 CI 中同长度修改未被 changedFiles 检出；原测试预期一处变化却得到零处                                                                         | 已单独修复，不能放宽断言。文件按内容确认，不新增更复杂缓存层                                                                                                        |
| P1               | 动态 DOM 属性类型                                                     | jsx-runtime.ts 为全部内置标签计算可写键、属性、事件和命名空间组合；已有空 TSX/React/Solid 对照证明固定成本过高                                            | 重构为生成的明确接口。保留严格值类型、扩展和 LSP；不要只改类型别名名字                                                                                              |
| P1               | 检查与打包重复                                                        | 默认生产 Vite transform 再调用 getSemanticDiagnostics；单独 check 已做完整项目检查                                                                        | 定义一次完整检查的生产命令，转换/打包不重复承担它；保留错误阻断门禁                                                                                                 |
| P1               | 组件自动 bind 推导                                                    | LibraryManagedAttributes 对组件 props 应用 ComponentBindings；复杂原生 props 包装已出现 TS2590                                                            | 列为 API 收窄候选，优先显式可绑定信息。先测静态 DOM 改造后的残余成本                                                                                                |
| P2，优先删减候选 | `_createPage` 页面宿主                                                | 仓库 apps 和独立消费中没有引用，只找到 core 导出及自身类型/行为测试；旧 Vue/React/Svelte 宿主已删除。仍维护深复制、深比较、输入代理和 update/dispose 契约 | 倾向移出核心或删除；若存在明确外部页面嵌入需求，再作为单独适配层。不能据此断言外部用户无人使用                                                                      |
| P2，优先删减候选 | Go format 试验入口                                                    | 默认流程/WebStorm 已用 Prettier+Oxc，Go 排版规则不一致；主要见工具自身测试与文档                                                                          | 倾向删除产品化入口，保留既有格式化链路                                                                                                                              |
| P2，优先删减候选 | API 基线报告                                                          | 自建 exports/type 文本与声明 hash 报告，不是语义兼容证明；默认 CI 没有使用这个 API 基线门禁                                                               | 倾向删除独立 api 命令和对应专属元数据路径，保留类型消费/声明产物验证                                                                                                |
| P2，优先删减候选 | 独立 boundary 工具                                                    | 限于直接导入的规则；生产产物与独立消费另有验证                                                                                                            | 评估收敛到现有打包/消费验证，避免维护一套通用包分析产品；不能删除真正的浏览器/服务端边界检查                                                                        |
| P2               | NativeTools.check/build 等第二套入口                                  | 默认工程已走原生 CLI，编程式接口主要由自身工具测试与消费验收使用                                                                                          | 若删除报告/分析工具后没有实际编程式消费者，继续收敛到正式 CLI 与必要 LSP；同时删除专属快照/元数据分支，而不是只隐藏命令名                                           |
| P2               | 自动安装开发面板                                                      | dev/inspector 与 dev/runtime 承担 UI、事件记录、组件重置以及部分 HMR；仅开发模式加载                                                                      | 保留 HMR、错误恢复和最小诊断；面板/时间线列为可选或删减候选。不能直接删 dev/runtime，因为 HMR 状态也使用它                                                          |
| P2               | 持久化 API 多形态                                                     | persist/hub 约 523 行，支持对象原地写回与 read/write、动态 key、多 Window、迁移、暂停/恢复等；示例确实使用偏好、草稿、镜像和迁移                          | 保留已有真实用途，优先统一到显式 read/write 边界，减少自动对象替换分支；跨 Window、自定义 Storage、暂停等高级组合列为收窄候选。保护原型、验证、错误和卸载处理不能删 |
| P2，较大范围     | 数据路由扩展                                                          | router 目录约 1,827 行，覆盖 loader、预取/缓存、守卫、重定向、SSR、滚动/焦点、三类 history；不是小核心职责，当前任务空间依赖它                            | 保持独立扩展并冻结扩张。若进一步缩减官方维护范围，优先让数据加载/缓存策略回到应用，保留基本导航；需要同步调整任务空间，不做一次性盲删                               |
| P3               | 通用 Go lint                                                          | 三条规则在 base 配置启用，涉及普通 TS 调用/Promise/switch，不是框架专属语义                                                                               | 不扩展为通用 lint 平台；目前未测出它是主要瓶颈，不为删它再引入另一套复杂 checker。框架错误诊断保持必需                                                              |
| 保留，维持边界   | `_history`、`_lazy`                                                   | 历史是显式 commit 的有界辅助；lazy 只缓存代码且 SSR 使用同步占位，已有作者明确需求和消费验证                                                              | 保留小实现或独立扩展，不增加自动事务、整个组件树状态迁移、流式 Suspense 等新范围                                                                                    |
| 保留             | 响应式作用域、清理、表单、键控列表、基础 SSR/hydration、诊断/映射/LSP | 是现有正确性的基础，有可观察的输入、资源和服务端行为要求                                                                                                  | 可整理实现，不能因为条件多就删除；尤其保留 IME、事件释放、异步取消、转义及接管一致性                                                                                |

上述行数含注释，仅用于定位维护面，不用行数或仓库引用次数单独证明功能多余。高级功能删减往往主要减少维护，不会自动消除 10 秒类型检查。

## 建议维护的边界

小核心保留：变量式响应式、组件与 DOM、事件/表单/列表、作用域与错误处理、必要的上下文，以及定制 Go 编译和编辑器语义。SSR 维持独立能力，不在缺少产品要求的情况下贸然改成 SPA-only。

扩展而非核心承诺：路由、持久化、历史。已有独立包只能隔离依赖，不能自动减少同仓库的维护义务；是否继续官方维护需要按真实需求收窄。

工具保留：一个正式检查入口、一个构建入口、Vite、现有 Prettier/Oxc、必要的 LSP/MCP。无需把每个原生 API 都变成产品命令，也不追求所有工具共享一个巨型 Program。

第一批建议只处理三组：固定 DOM 类型生成与单次检查流程；删除 `_createPage`/Go format/API report 等低使用高重叠入口；收窄自动 bind 和开发面板的承诺。路由、存储的整块裁剪放后面，先明确应用迁移代价。新增能力只保留 DOM `bind:this` 作为后续有限试点候选，组件实例版暂缓。

验证仍保留类型正反例、补全/跳转、真实 HMR 与独立消费。对已删除功能移除相应功能用例可以降低范围，但不能通过减少现有错误断言、跳过平台或修改质量门禁让问题消失。

## 本轮实际改动

功能删减、类型生成、生产流程改造和 `bind:this` 实现均未执行。只修复 `project-files.ts` 的元数据相同但内容改变漏检，保留原 ARM64 失败断言并新增确定性回归。提交 `83d90a9` 已推送，本机相关 18 项测试、工具配置检查、lint 和开发热更新验证通过；随后远端六平台原生任务均通过，工程检查、浏览器和消费验收仍在进行，不能写成完整 CI 已通过。
