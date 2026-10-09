# 基础 API 完善与 CSS 协作计划

更新：2026-10-09。当前包边界以 docs/packages.md 为准：CSS 收入本仓库，Vite 并入 compiler，删除外部适配器与 bx。框架基础 API、编译/类型工具及原生 CSS 能力继续维护。用户后续已授权搭建组件库/文档站并实施 Provider 基础设施，具体契约见 [Provider](provider.md)；这项授权取代下文对 Provider 和基础组件目录的早期限制，其他完整组件仍另行讨论。

2026-10-09 后续安排：CI 修复已通过验收，用户随后授权实现 base/Icon。通用 token 归入 CSS 主题工具，组件专用 token 留在组件内部；基础组件属性直接接受对应 CSS 属性允许的类型。第 9 节记录当前实施契约。

2026-10-08 用户已授权按本计划自主执行并适当调整 API，实施前记录明确契约；无须为已在范围内的取舍逐项再确认。已有契约以 [语义](semantics.md)、[API](api.md) 和 [CSS](css.md) 为准；选定候选后更新公开契约并通过测试验收。持续检查点见 [交接记录](api-hardening-handoff.md)。

本轮基础 API 与 CSS 集成已作为 1.0.0-rc.8 交付：源码合入 main，CSS 固定 npm 0.3.1，完整 CI、五包发布及注册表消费通过。下文继续定义维护边界，不把已完成的候选交付重新列为未实施；后续易用性审查只处理真实缺口。用户随后决定删除 `_task` 整组 API，当前源码直接使用普通请求；CSS 的服务端标签拼接继续由应用负责，不改动。

## 1. 目标与交付边界

- 首要目标是简单维护、使用直接、类型提示准确、错误可定位以及适当中文注释。性能次要，不以绑定率、包体积或基准数字驱动复杂设计。
- 保持显式变量式 _state/_derived、普通 TSX、_component 参数解构/默认值/实时 rest、既有 bind、For、Portal 和作用域模型。
- 框架示例中的按钮、输入、任务行、确认弹窗仍用于验证基础 API。组件库已实施 Provider 基础设施与 base/Icon，其他成品组件、变体系统和 UI 发布另行讨论。
- 不以整页样式迁移率为目标。只迁移验证所需片段，保留仍有用途的原生 CSS、示例和业务逻辑。
- 现有实现先审计为“已覆盖 / 真实缺口 / 不适用”，只修复实际问题、补足确有价值的用法，不重新实现已有能力。

2026-10-09 用户决定取消整个 packages/use，移除路由、store、持久化和历史工具；不将这些实现搬到其他包。这一决定取代此前维护这些工具的安排，框架状态/上下文/快照与 UI Provider 不变。

## 2. 当前基线

- zerodep-js 固定微软官方 TS7.1.0-dev.20261008.1、Babel 和 Vite；不退回 TS6，不建立多版本兼容或自定义 TS 内核。
- CSS 作者与运行时迁入 packages/css，Babel 转换属于 compiler；统一 TS7，不维护 Vue/Svelte 适配。
- css 自动追踪、直接变量及简单响应式表达式保守绑定、SSR 样式收集/恢复、_id、Portal 已落地。
- 框架提交 b34b0f3 的 CI 已确认通过：基础检查、六个平台工具链、Linux/Windows 独立消费和三浏览器。CSS 提交 ca86a9d 的完整 CI 也已通过。规划提交后的 CI 状态另行记录，不把这些证据套到后续实现。

## 3. 已有 API 的完善清单

| 范围                                                                                | 要解决的问题与边界                                                                         | 验收方式                                                           |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| _state/raw、_derived/by、_snapshot                                                  | 对象/数组、普通快照、浅状态和类实例边界一致；动态依赖变化正确；纯计算限制及错误位置清楚    | 状态更新、依赖切换、快照、非法写入与类型用例                       |
| _effect、_onMount/_onCleanup、_createRoot、_getAbortSignal、_tick/_batch/_flushSync | 清理顺序、重入、取消、DOM 提交时点一致；不跨 await 隐式跟踪                                | 创建/重跑/销毁、迟到异步结果、异常清理；只补现有覆盖缺口           |
| _component、props、children、事件                                                   | 保留解构/default/rest；完善泛型、可选回调、原生属性转发、参数化 children 推断与原源码诊断  | 最小组件夹具、TS7 严格检查、补全/悬浮/重命名和预编译消费           |
| 既有 bind 与 DOM bind:this                                                          | 原生及自定义组件写回一致；保留 IME、光标、同值校准、reset 和接管前编辑；引用按既有范围清理 | 原生控件与一层/多层包装夹具、错误类型、CSR/SSR；不扩张组件实例 API |
| For、条件分支、Portal、context、_id                                                 | 组合使用 CSS/主题时保持 key 身份、最新数据、焦点、上下文、ID 与资源归属                    | 排序、同 key 替换、删除、多根、Portal 移动与卸载、并发 SSR         |
| _lazy、ErrorBoundary、普通请求                                                      | 代码加载重试、子树重建、业务失败各守自己的范围；CSS/主题与懒加载协同                       | 成功/失败/重试、过期结果、卸载及 SSR 占位；不制造万能异步边界      |

上述清单包含已具备的能力，不表示每一项都有缺陷，也不要求机械增加重复测试。

## 4. CSS 协作的重点

### 4.1 完善既有 css 语义

- 已支持直接主题成员的运行时分类：安全值绑定元素变量，特殊关键字与已有 var()/复杂表达式保留原声明；切换时清理对应私有变量，不改变用户 style、原始 keywords 或 SSR 标签拼接。普通系统常量、嵌套选择器和跨组件类名保持原边界。
- 函数内命名 const css 声明与 JSX 内联调用保持一致的依赖更新；普通别名仍是快照，类名仍为 string。
- 评估支持可直接证明覆盖顺序的 spread 用法，例如在 spread 后明确写 class；后续 spread 可能覆盖 class 时继续保守处理。先看可读性和维护代价，不追求所有位置都自动绑定。
- 保留用户 style、属性覆盖顺序、条件惰性及 JS 方法/参数求值顺序；CSS 变量转换失败时保留正确原声明。
- 直接 _state/_derived 值与条件/计算表达式分工不变，单位由 JS 写为完整值。不加入原生 bx、class 合并、普通函数全面自动追踪或跨组件隐藏样式对象。
- 系统作者、继承、自定义方法、注入主题、选择器、关键字及无效值边界以共同测试固定；不在两个仓库复制单位或主题规则。

### 4.2 主题作用域

先用现有 Css(() => theme) 和框架 context 验证：主题替换、子树覆盖、Portal/懒加载中的逻辑继承、请求隔离和自定义关键字提示。逻辑 context 的继承与 CSS 变量在实际 DOM 上的继承需要区分，不能宣称 Portal 自动搬运所有 CSS 变量。

已采用 createCssContext 薄封装，并覆盖嵌套提供、根隔离和 SSR 请求隔离。组件库 Provider 复用此能力和 zerodep-js-css 的 SystemKeywords/Css，不建立第二套 CSS 属性作者或全局主题注册表。

### 4.3 SSR、接管与开发工具

- 将样式宿主创建、收集、安全输出和客户端恢复接到统一文档流程，覆盖所需入口；用小范围公共/内部函数减少重复，不先建立通用插件注册系统。
- CSS 对不使用它的应用继续可选；不得强制依赖旧模板编译器，不更改 renderToString 的既有返回类型。
- 覆盖并发请求、多根、Portal、懒加载、nonce、内联变量的 CSP 边界、HMR 重建与 source map。
- 验证 TS7 对 CSS 作者、方法参数、自定义主题和 css 返回 string 的提示及错误；以真实包安装验证，不能靠源码别名通过。

## 5. 新增基础 API（源码已实现，持续验收）

| API                        | 当前契约                                                                                                          | 入口与文档                                     |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 原生 bind:group            | radio 字符串、checkbox 字符串数组；静态 type/明确 value 在所有 spread 后；写回声明值；原生 name/form 分组保持一致 | compiler/core/类型投影；[表单](forms.md)       |
| 原生 details 的 bind:open  | 用户 toggle 写回 boolean，模型控制展开；验证 SSR 原值后接纳接管前操作；没有 Dialog 模态协议                       | compiler/core/类型投影；[表单](forms.md)       |
| createCssContext<AppCss>() | provideCss/useCss 薄封装，保留作者类型，缺失提供者报错；复用既有 context                                          | 可选 zerodep-js-css；[CSS](css.md)             |
| _head(() => data)          | 只支持 title/description；同步纯读取、SSR 收集、客户端更新、按字段覆盖和卸载恢复，多文档隔离                      | 可选 zerodep-js/head 与 ssr；[元信息](head.md) |

这些是源码实现状态，不表示新 npm 版本已发布，也不替代同一提交完整 CI。当前重点转向组合与错误路径审计，阶段证据和待验收项集中在 [交接记录](api-hardening-handoff.md)。授权允许继续有价值的完善，不为清单数量扩充 API。

以下暂不进入本轮：完整 Dialog/Button/TextField 等组件、视觉主题/变体组件体系、退场动画协调、通用 Suspense/流式 SSR、请求缓存/并发策略、watch、防抖、ref 组合、class 合并和复杂外部订阅。

## 6. 单仓库职责与依赖

| 归属                     | 负责内容                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| packages/css             | 作者、关键字、单位、选择器、隐式变量辅助、浏览器/SSR 样式收集                                     |
| zerodep-js compiler/core | Babel TSX 转换、响应式来源判断、JS 求值和覆盖顺序、DOM 属性/生命周期、类型投影、框架 context 接入 |
| zerodep-js ssr/compiler  | 文档组合、SSR/接管接线、开发/HMR 与构建器集成                                                     |

同仓库统一固定 TS7.1，CSS 转换复用框架 Babel AST。包间使用 workspace 依赖；发布清单为 core、css、compiler、ssr，UI 暂不发布。完整 CI 验证通过后再准备新版本，不继续旧 CSS 仓库的发布任务。

## 7. 执行阶段与完成条件

1. **P0：契约审计与决策。** 用本计划标记现状与真实缺口；为选中的新候选固定签名、默认值、错误/取消、SSR 和资源所有权，不写成品组件。
2. **P1：已有基础 API 完善。** 优先处理 props/类型、bind/原生事件、生命周期及列表/Portal/context 的真实缺口；以小夹具测试，不进行业务页面重做。
3. **P2：CSS 完整协作。** 完成普通/命名 css、可确认 spread、主题、SSR/接管、HMR 与类型消费；仅为验证迁移必要片段，清理失效重复样式。
4. **P3：已确认的新基础 API。** bind:group、details bind:open 逐项落地；每项含类型诊断、运行时、SSR、组合用例和中文文档。主题封装和元信息按讨论结论分别加入，不为依赖倒置新建空包。
5. **P4：集成验收和清理。** 用一个小型综合夹具连接状态、组件、绑定、列表、任务、CSS、路由及 SSR；检查预编译组件消费、IDE 提示、回归矩阵和资源释放，再清理本任务产物与空目录。

每阶段的完成要求：支持范围与默认行为写清；真实用例通过；类型/诊断保持；已有断言不弱化；失效代码/文档清理；两个仓库相关改动独立可审阅。先做相关本地检查，完整平台和三浏览器交 CI；不重复跑已通过且未受影响的检查，不把 queued/pending 当通过。发布仍遵循既有验收和 next 授权边界。

## 8. 文档入口

本文件是当前执行范围的唯一主计划。[Svelte API 对照](../.design/svelte-api-review.md) 保留来源与历史取舍，不覆盖本次组件库边界；[CSS 接入设计](../.design/zerodep-css-integration.md) 记录已落地实现；[执行记录](execution.md) 记录提交和验证证据；换机仍使用 [环境配置](environment-setup.md)。

## 9. Icon 与 token 实施契约

2026-10-09 用户已授权实施，Icon 位于 packages/ui/src/base/Icon.tsx。图标来源使用静态导入的 @lucide/icons；UI 保持 private。组件用法见 packages/ui/README.md 和 apps/docs 的 Icon 示例。

- UiTheme、UiColors、亮暗主题及通用颜色、字号、间距、圆角、动效等 token 归 packages/css/src/theme，统一从 zerodep-js-css 导出；UI 不保留主题兼容转发。手写主题继承 SystemKeywords，不修改生成数据。Provider 继续负责作用域注入。
- Icon 的 color/size 分别复用 color/fontSize 作者的 raw 参数类型，接受 _primary、_lg 等主题关键字及 CSS 原值。省略时继承周围文字的颜色和字号。默认宽高为 1em，数字不隐式转换为 px。
- 后续用户授权 CSS 属性作者统一接受 raw(undefined)，返回空声明字符串，css(...) 中自然省略该项。响应式值撤销时清理旧声明与私有变量，恢复原有继承/层叠；保留合法 0 值。Icon 直接调用 raw(color)/raw(size)，不再逐项判断 undefined。
- 单个 icon 属性接收 LucideIconData，不接收名称字符串或 children。调用方静态导入图标，自定义数据沿用 Lucide 契约。使用官方 @lucide/icons/build 节点 builder，再转换为框架模板，不扫描 DOM、不下载图标、不注入 SVG 字符串。
- 根节点为 svg，viewBox 来自图标数据；透传原生 SVG 属性、事件、class/style。局部 display、vertical-align、flex-shrink 等规则留在组件内部。用户 class 在默认声明后组合，style 保留原生语义。
- 默认装饰图标 aria-hidden=true；存在 aria-label/aria-labelledby 时默认 role=img，移除默认 aria-hidden。显式原生属性优先于默认值。按钮负责操作名称；Icon 不包含按钮或加载状态协议。
- 同其他 UI 消费者一样要求上层 Provider。SSR 和客户端使用同一节点结构；验证覆盖命名空间、节点复用、嵌套图形、主题替换、原生样式、可访问名称、图标更新和卸载。
- 类型和定义导航保持显式 token 成员及中文说明；LSP 用例验证 Icon 的颜色/尺寸关键字与迁移后的 token 定义位置。

依据：[Lucide 图标数据](https://lucide.dev/guide/icons/)。发行包 1.54.0 的实际节点 builder 子入口为 @lucide/icons/build；以锁定包导出为准。
