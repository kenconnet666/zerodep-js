# 变更记录

## 未发布 — 单仓库 CSS 与构建工具精简

- UI 主题关键字改为显式只读成员声明，恢复 _thin、颜色、间距等成员的定义导航和中文提示；保持 CSS 值类型与亮暗主题数据，新增 26 项实际 TS7 补全、hover 和源码定位回归。

- 新增 zerodep-js-css 工作区包，迁入 CSS 作者、生成数据、关键字、隐式变量与浏览器/SSR 样式收集；移除跨框架适配和 bx，亮暗主题只在 UI 维护。
- Vite 插件并入 zerodep-js-compiler/vite，删除独立 vite 包；CSS 转换内置，删除 CompileExtension、extensions 配置和公开 adapter 入口。
- CSS 生成器复用 Babel，统一固定 JetBrains TS7，不引入 TS6。应用、UI、SSR、独立消费与语言测试统一使用本地工作区包。
- 修复 props/rest 多层转发重复枚举导致的 Provider 切换卡顿，保留可枚举性、覆盖顺序和响应式更新语义。

以下为此前同批未发布的 API 精简：

- 删除 `_createScope` 和 `ScopeHandle`，保留内部生命周期管理。
- 2026-10-09 删除整个 packages/use，不再维护 zerodep-use 的 router/store/history、持久化和 IndexedDB 适配器；清理依赖、专用示例/测试和发布清单，不迁移实现、不保留兼容入口。任务页保留页面状态与服务端 CRUD，取消浏览器草稿持久化。
- 删除 `_task`、Task/TaskOptions/TaskResult 与整个 `zerodep-use/task` 子入口，不保留兼容别名。请求直接使用 async/await、页面状态及已有生命周期信号。
- 任务工作台保留旧查询丢弃、卸载取消、错误重试、SSR 首屏和保存冲突保护；同步移除专属补全、消费夹具与旧构建产物。已发布 rc.8 不变。
- CSS 的服务端标签拼接和 useCss 不变；未新增 `_query` 或实验性异步渲染机制。

## 1.0.0-rc.8 — 基础 API 与原生 CSS 集成，2026-10-08

五包已发布到 npm next，源码为 `fe2a7b4`。[main 完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/37729962027) 与 [发布及注册表消费](https://github.com/kenconnet666/zerodep-js/actions/runs/37730703039) 均成功；[GitHub 预发布](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.8) 保存原始五包 tgz 与最终账本，SHA-512、next 和注册表版本逐项一致，latest 未提升。基础 API 与工具链改动经 [PR #1](https://github.com/kenconnet666/zerodep-js/pull/1) 合入 main。

- 新增 `_id()`、`zerodep-use/task` 的 `_task(loader, { initial })` 与 reset/retry/cancel、保留逻辑父级所有权的 Portal，以及可选 `zerodep-js/head` 的 `_head()`。
- 新增原生 details 的 `bind:open` 和 radio/checkbox 的字符串 `bind:group`，保留 reset、接管前编辑和写回类型检查；output 使用受控纯文本，富内容使用普通容器。
- 可选 `zerodep-js/css` 接入 CSS 作者、命名 css 自动追踪、直接变量保守绑定和 `_createCssContext`，覆盖 SSR 样式恢复、Portal/懒加载主题和 CSS HMR。
- 修复清理期间停止自身/销毁根、引用回调内卸载、错误边界重入、路由取消与历史重入、持久化停止后重新连接、Proxy 不变量和快照边界；保留异常来源与其余资源清理。
- 完善组件泛型、可选 props、默认值和实时 rest；语言补全覆盖任务 reset、head、CSS 主题及新的原生绑定。

安装与迁移注意事项：

- IDE 与项目固定 JetBrains `7.1.0-dev.jetbrains.20261006.2`，替换 rc.7 的微软 nightly。独立应用需合并 docs/packages.md 中说明的主包 URL 和根级平台 overrides，并保存锁文件；不能只执行普通 npm TypeScript 版本安装。
- core 的 CSS 子入口保持可选，使用时安装 `zerodep-css@^0.3.1`，本仓库精确固定 0.3.1；不会把旧 Vue/Svelte 模板编译器或其 TS6 引入框架工具链。
- `renderToString()` 仍返回正文字符串。使用 head 管理时改用 `_render()` 的 `{ html, head }`，交给文档模板组合；title/description 默认值放到根组件 `_head()`，避免重复声明。
- `_task` 的 initial 建立成功初态但不自动请求；reset 回到 idle 并清空数据、错误与重试输入，cancel 保留现有数据。Portal 的逻辑 context 继承不等于搬运实际 DOM 上的 CSS 变量。
- 应用与预编译组件库统一升级五包并重建，继续共享同一 core；未增加完整组件库、流式 SSR 或新的外部框架宿主。

## 1.0.0-rc.7 — 官方 TS7.1 与 Babel，2026-10-07

五包已发布到 npm next，源码 `ccffb8b` 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/37618603078) 和 [发布及注册表消费](https://github.com/kenconnet666/zerodep-js/actions/runs/37619281796) 均通过。[GitHub 预发布](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.7) 保存五份原始 tgz 与包含注册表验证时间的账本；SHA-512、版本和 next 标签一致，稳定 latest 未提升。

- 官方 TypeScript 固定 7.1.0-dev.20261007.1，Babel 负责框架转换，Vite 负责开发与构建；删除自有 Go 后端、补丁、平台 SDK 和构建缓存设施，发布范围收敛为五包。
- 保留变量式 API、组件参数解构/default/rest、DOM/组件 bind、泛型、SSR 和 HMR；项目检查与独立语言工具通过官方 API 和检查投影提供类型写回验证及源码映射。
- 增加仅 DOM 的 bind:this，修复示例 SVG 引用的 TS2339；CI 同时检查示例原始 TSX，避免框架检查掩盖官方 IDE 可见错误。
- 承接小核心简化：删除 _createPage 与冗余工具入口，持久化统一 read/write，开发面板显式 _inspect；生成直观 DOM 类型声明，保留中文语义与生命周期注释。
- 标准 LSP 入口通过现有 LSP4IJ 接入 WebStorm，用户已确认绑定错误/修复、补全、中文说明和导航；协议测试覆盖跨文件未保存文本、增量编辑、重命名、自动导入和资源清理。WebStorm 专有类型引擎的版本限制独立记录于 [工具边界](docs/tooling.md)。
- 已通过固定 nightly 的全仓 check、Node/编译测试、client/server 构建、独立 LSP 与 49 项补全、六平台工具验证、三浏览器及 Linux/Windows 独立消费。发布后另在 Windows 验证实际 npm 安装，并从 CI 原 tgz 验证语言服务器的绑定诊断、类型补全与关闭。

## 1.0.0-rc.6 — 编译缓存修正，2026-10-07

十一包已发布到 next。源码 `cd49382` 的[完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/37501732117)通过：六平台原生专项各 113 项、Node 336 项、三浏览器 328 项，严格抖动门禁通过。[发布任务](https://github.com/kenconnet666/zerodep-js/actions/runs/37504139849)完成真实注册表消费；十一份原始 tgz、npm SHA-512 和 next 标签一致。[GitHub 预发布](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.6)保留冻结产物与发布记录。

- 编译会话区分已读取的磁盘文本与内存覆盖，忽略内容未变化的迟到监听通知，显式 invalidate 仍然生效。
- 包元数据只使相关项目失效，避免其他临时项目的删除事件清空当前编译缓存。
- 新增或删除源文件时重新读取项目根文件列表，覆盖全局声明文件的增删与错误恢复。
- 保留三浏览器、工程检查与独立消费的并行 CI，以及重试后成功仍报失败的浏览器门禁；RC5 原始发布产物不变。

## 1.0.0-rc.5 — 原生工具共享，2026-10-07

十一包已发布到 next。发布源码为 `052a51e`，[六平台 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/37485656478)与[发布恢复和注册表消费](https://github.com/kenconnet666/zerodep-js/actions/runs/37489398562/attempts/2)通过，[GitHub 预发布](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.5)保存原始 tgz 与 release.json。未提升稳定 latest。

- 自有 Vite、异步编译接口与 MCP 共用工作区 Go 进程；加入项目缓存、内存文本隔离、连接租约、异常重连和退出清理。
- Go checker 增加三项可选类型规则，与类型诊断一起执行；补全 import 整理、状态声明 quick fix、模块边界与 API 报告入口。
- 五包使用原生项目引用一次调度构建，移除构建之后的重复包级检查。保留 Oxlint 与 Prettier/Oxc；原生排版和 API 报告按需运行。
- 原生 SDK 构建使用固定提交的临时源码归档，直接在主项目维护，不再创建 Git worktree。完整共享边界见 [原生工具说明](https://github.com/kenconnet666/zerodep-js/blob/090396b/docs/native-tooling.md)。

## 1.0.0-rc.4 — 单一定制 TS7-Go 路线，2026-10-06

十一包已通过[六平台完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/37452811866)与[发布恢复及 npm 消费](https://github.com/kenconnet666/zerodep-js/actions/runs/37455845240/attempts/2)。发布到 next，未提升稳定版。

- 删除 Babel 编译器、Vue/React/Svelte 适配、宿主演示、专属测试、验证脚本及直接依赖；不保留后端选择或回退。
- Vite、主示例、工作区类型检查、声明构建和 CLI 统一调用项目定制 TS7 SDK。编译语义用例迁入 native，直接验证真实 Go 实现。
- core 保留一份源码和一套产物；取消 TS6 双线路与双产物计划，删除失效实验和宿主文档。
- 发布清单收敛为十一包，CI 保留六平台与独立框架三浏览器验证；传统宿主与重复后端任务移除。
- Prettier/Oxc 与 Oxlint 保留为独立工程工具，移除 Svelte 格式插件，不声称这些工具已经共享 Go AST。

## 1.0.0-rc.3 — 应用与编写体验候选，尚未发布

- 新增原生输入与组件 bind 语法、可选 zerodep-use/history 编辑历史、core 的 _lazy 按需组件。完整用法与边界见 [编写指南](docs/authoring.md)。
- 编译输出协议升为 2，包含 bind 所需的运行时协议；应用与预编译组件库应使用相同版本重建。增加 TS7 绑定候选的类型/说明回归。
- 新增开发组件/状态检查面板、有界事件记录、手动重置与兼容本地数据的 HMR；覆盖编译/执行失败恢复、导出变化回退和开发 SSR 接管，生产构建不注入调试代码。具体保留和重建边界见 [开发检查](docs/devtools.md)。

- 新增 zerodep-use，将路由和浏览器持久化迁到 `zerodep-use/router`、`zerodep-use/storage`；直接移除 core 旧子入口，不保留兼容转发。
- 状态、快照、通用生命周期与页面入口留在 core；use 通过同版本 peer 共享内核，不复制状态图，不反向依赖应用层。存储协议与已有数据保持兼容。
- 路由/存储类型与语义测试、路由 SSR 测试、示例和独立消费同步迁移；公开路由组件声明使用 Renderable，避免私有模板类型路径泄漏。
- 十五个公共包统一准备 1.0.0-rc.3（八个框架/宿主包、原生入口与六个平台包），发布清单与独立消费区分可选 use 和页面宿主。已发布 RC2 原始产物保持不变。

- 新增独立原生 Go 编译器，与 Babel 后端共用 ABI 2；统一原始类型检查、JS/声明/映射及 LSP 框架诊断。原生转换性能与等价工作量测试见 [性能报告](https://github.com/kenconnet666/zerodep-js/blob/090396b/docs/native-performance.md)。
- Windows/Linux/macOS 的 x64/ARM64 使用对应架构 CI 构建与测试。完整 CI 通过后自动冻结 tgz、发布 next、检查 SHA-512 并运行真实注册表消费，最后公开 GitHub 预发布。恢复时沿用草稿中的原始产物与回执，不覆盖同版本内容。
- 修复中间件开发服务器关闭时未释放原生编译进程的问题，避免 Linux 宿主开发测试在已完成断言后挂起。

## 维护收尾 — 2026-10-02

- 补齐 npm 异步受理、版本公开与标签同步的发布恢复；先落盘尝试记录，受理后不重复上传，响应不确定时保留证据。增加四项针对性恢复测试并保留真实 Git/打包测试。
- 更新当前安装指南、API 名称、主计划和宿主交付进度，区分研究历史与已支持能力；[交付后完整性审查](https://github.com/kenconnet666/zerodep-js/blob/090396b/docs/completeness-audit.md)记录检查结果与取舍。
- 本维护阶段不修改 RC2 运行时或重打包已发布产物。

## 1.0.0-rc.2 — 2026-10-02

七个包均已发布统一的 `1.0.0-rc.2`：zerodep-js、zerodep-js-compiler、zerodep-js-ssr、zerodep-js-vite、zerodep-js-react、zerodep-js-vue、zerodep-js-svelte。源码为 `3d44ae7fb664fc748aaff446bc697ea9ecc1c03a`，[GitHub 预发布](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.2)附原始七包与最终 release.json。

[候选完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36887698421)通过，包含 288 项 Node、三浏览器、资源/LSP/开发更新以及 Linux/Windows 独立消费。七包 registry SHA-512 与固定产物一致；2026-10-02 从 npm 精确安装后，基础框架与三宿主的类型、构建、CSR/SSR、更新及清理验收通过。

七包 next 均指向 RC2。原有四包 latest 仍指向 RC1；三个首次发布的宿主包同时被 npm 初始化为 latest=RC2。安装请统一指定精确版本，未执行稳定版提升或删除包版本。

- 新增 zerodep-js-vue、zerodep-js-react、zerodep-js-svelte 三个独立页面宿主包，支持保留实例的输入更新、入口替换、清理与宿主 SSR 空容器。
- Vite 增加统一的 include/exclude 范围，覆盖开发、预扫描、生产和 SSR；三个宿主复用同一个 TSX/普通 TS 页面，并有独立 tgz 消费和开发热更新验证。

- 破坏性重构：core 根入口与 router/storage 的公开函数统一为单下划线前缀，直接移除旧导出；编译器按统一语义角色识别新名、导入别名和命名空间。
- 新增 _createPage 页面入口与 update/dispose 契约，宿主输入更新保留页面实例；修复旧 disposer 重复调用可能误删新根登记的问题。

- 新增 _snapshot，支持脱开深代理、普通对象/数组循环与共享引用、Map/Set、二进制及平台结构化克隆规则。
- 新增 _onMount、_createScope、_getAbortSignal，明确一次性挂载、同步所有权恢复与作用域取消；新增实际 CSR/SSR 用例。
- 新增可选 storage 子入口，支持 localStorage/sessionStorage 恢复、迁移、校验、同步、写入合并和清理；实际任务页保存新增草稿。
- 新增可选 router 子入口，支持命名路由与参数类型、嵌套布局、browser/hash/memory history、导航守卫、取消/预加载、错误恢复、滚动/焦点与 SSR 快照恢复。
- 新增任务空间示例，复用实际任务 API、保留布局、编辑持久化草稿、懒加载偏好页，并验证 CSR/SSR 与真实历史行为；新增子入口已有工作区外 tgz 消费验证。
- 修正新增持久化示例后原有输入测试的模糊名字定位；既有功能用例继续保留。

## 1.0.0-rc.1 — 2026-10-01

四个包已发布统一的 `1.0.0-rc.1`：[zerodep-js](https://www.npmjs.com/package/zerodep-js/v/1.0.0-rc.1)、[zerodep-js-compiler](https://www.npmjs.com/package/zerodep-js-compiler/v/1.0.0-rc.1)、[zerodep-js-vite](https://www.npmjs.com/package/zerodep-js-vite/v/1.0.0-rc.1)、[zerodep-js-ssr](https://www.npmjs.com/package/zerodep-js-ssr/v/1.0.0-rc.1)。源码为 a29419625773bfb4c6bdedf136496fbf6e7e2624，[GitHub 预发布与原始产物](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.1) 已建立。

[完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36818853600) 通过，包含三浏览器、Node 资源验证和 Windows 独立包消费。四包注册表 SHA-512 与本地固定产物一致，npm 精确版本的工作区外安装、TS7 声明、预编译组件库、CSR/SSR、接管、表单和卸载验证通过。

历史标签例外：发布使用 next，最终回读发现 registry 同时初始化 latest。尝试移除 latest 时，正常工具审批通过，但 npm 返回 HTTP 403；pnpm 登录身份已核对为发布账户。当时两个标签均指向 RC1，并不表示稳定 1.0.0 已发布。最新标签状态见上方 RC2 记录；未执行稳定提升，也未删除包版本。

开发阶段的 `@zerodep-js/*` 公共包名已统一调整；私有示例项目名称不影响安装入口。

- 变量式状态、深对象/数组、浅状态、派生缓存与作用域清理。
- 标准 TSX 组件、泛型、props 解构/default/rest、内容转发、稳定列表、context 与错误恢复。
- 原生事件、表单编辑与重置、property、自定义元素、样式与 HTML/SVG/MathML 类型/命名空间。
- 同步 SSR、安全数据编码、严格 hydration、已有输入与节点保留。
- Babel/Vite 编译、原生 TS7、框架诊断、开发更新、独立包和组件库消费。
- 原生属性生成、资源回收验证与持久化任务试点；修复试点反馈的语义问题。
- 完整 raw-text 规则、HTML/SVG 标签名称规范化和 script 双重转义保护；明确支持与安全边界。
- 固定产物与完整性、候选 CI、注册表消费及稳定 tag 提升工具；MIT 许可和统一版本策略。

用户将本轮收尾调整为 RC1 交付和 zerodep-css 接入研究；接入方案见 [.design/zerodep-css-integration.md](.design/zerodep-css-integration.md)，尚未实施。稳定版本与后续接入由讨论后的任务继续推进。
