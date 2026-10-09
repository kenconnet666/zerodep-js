# zerodep-js 协作约定

## 目标与范围

- 直接在当前主目录工作，只有用户明确要求才创建或使用新工作树。保留用户已有改动。
- 独立 TSX 细粒度响应式框架。2026-10-09 用户确认只维护本仓库 CSS：packages/css 承担作者、生成数据和浏览器/SSR 宿主；compiler 内置 CSS 转换和 Vite 插件，不维护 Vue/Svelte 适配、CompileExtension、公开 adapter 或 bx。相邻 zerodep-css 仓库只作为历史迁移来源，不继续开发或发布。
- 2026-10-08 用户已授权建立 packages/ui 与 apps/docs，并确认实施 div Provider、继承 SystemKeywords 的亮暗主题、独立语言/地区/时区，以及日期库接入。契约见 docs/provider.md；UI 仍保持 private。2026-10-09 已授权在 packages/ui/src/base 实施 Icon，静态导入 Lucide 数据；通用主题/token 归 packages/css，组件专用默认值留在组件内部，基础属性复用 CSS 输入类型。其他组件另行讨论。框架主计划为 docs/production-plan.md。
- 2026-10-09 用户最新决定：IDE 与项目统一固定微软官方 TypeScript 7.1.0-dev.20261008.1，取代此前 JetBrains 分支。主包与平台包直接使用官方 npm 发行版，catalog 精确锁定并由 lockfile 校验；不维护 SDK 内核补丁或多版本兼容。Babel/Vite 不变；已授权备份并适配 WebStorm EAP 的 ts-go-proxy，开启服务驱动类型引擎并验证实际行为。
- 首要目标是简单易维护、方便使用、良好类型提示与适当中文注释。性能次要；不为减少依赖或解析次数引入复杂后台、缓存和协议。
- 2026-10-08 用户已授权按基础 API 计划自主执行、完善测试和修复，并允许为简洁性适当调整 API；在实施前记录选定契约，不必逐项再次确认。本地只跑相关焦点检查，完整测试交 CI。CSS 0.3.1 与框架 rc.8 已交付，发布/恢复证据见 docs/api-hardening-handoff.md；此前限时窗口已经结束，不作为后续截止时间，不触发额度重置或购买。
- 保留显式变量式 _state/_derived（无 .value）、_component 参数解构/默认值/实时 rest、bind、DOM bind:this、_lazy、快照和开发状态保留。不能以弱化类型或生命周期、表单、列表、SSR 断言完成迁移。
- 选择性参考 Svelte 的语义和资源所有权，参考 Vue Devtools 的使用体验；无需复制其全部功能。以 docs/production-plan.md、docs/semantics.md 和 .design/standard-toolchain-plan.md 为执行依据。

- 2026-10-08 后续决定：删除 `_task` 整组 API，不新增 `_query`；参考 Svelte 的普通 async/await 请求，复用现有状态与生命周期。保留 useCss 写法，服务端 CSS 标签由应用自己拼接，不改动该流程。

- 2026-10-09 用户决定删除 packages/use 及全部 router/store/history/持久化能力，不再维护或使用该包，不搬入 core/UI、不保留兼容入口。该决定取代此前保留路由预加载和新增 store/IndexedDB 的约定；core 的上下文、快照及 UI Provider 保留。

## 结构与 API

- 2026-10-09：core 提供 DomRef/_composeRefs 并允许 DOM bind:this 与 ref 共存；UI src/utils 承担组件组合与按压工具，src/base 提供 Icon/Text/Ripple/Spinner/ButtonBase。仅维护 UI src/index.ts 根入口，由 pnpm ui:generate 自动生成，pnpm ui:check 校验；不创建子目录 index.ts。
- 组件使用独立 slotXxx 属性转发底层参数，例如 slotRipple；多个部件分别提供各自属性，不使用统一 slotProps 对象。对象/状态回调仍复用单槽解析与合并工具。
- 基础组件 size 表示 CSS 字号基准；Icon/Spinner 宽高 1em，ButtonBase 默认继承字号且不预设间距。组件内部视觉尺寸（含边框/焦点）默认用 em；不隐式叠加 rem 点击区域下限，应用可显式约束。根 Provider 默认 _md，嵌套默认继承，size 支持任意合法 CSS 字号。测量使用实际 CSS px，观察工具按需启用并清理。
- 2026-10-09 用户授权完整执行的 Button/IconButton/ToggleButton/LinkButton/Flex 已进入源码。Flex attached 处理相连内侧圆角、边框和焦点，不管理选择状态；不保留 Group 别名或专用 Group。加载采用原生 disabled，MenuButton 暂不做。稳定契约见 docs/buttons.md，当前交接见 docs/handoff-ui-buttons-2026-10-09.md；完整验收以对应提交 CI 为准。
- 2026-10-09 新增 Grid，位于 UI layout 并由根入口自动导出。普通模式支持原生 CSS 二维轨道；attached 限定数字列数、row 单格排列与零间距，纯 CSS 处理二维接缝/外轮廓。契约见 docs/grid.md，不把跨格或 auto-fit 当作已支持相连。

- core 提供响应式与 DOM 运行时；css 提供原生 CSS；ssr 提供服务端渲染；compiler 提供 Babel/CSS 转换、compiler/vite 入口和 TS7/LSP；ui 提供 Provider 与组件。packages/use 和 packages/vite 已删除，不保留兼容包。
- 框架顶层公开函数使用单下划线，声明本身使用该名称，入口直接导出。UI Provider 的消费入口沿用已确认的 useCss 写法，同类入口为 useLang/useLocale。JSX 组件、类型、类和对象成员保持常规命名。删除旧入口，不保留 deprecated 别名或兼容转发。
- 普通包由选定 SDK 的 tsc 构建，框架应用由 Vite 转换；不能把未经宏转换的 TS 擦除产物冒充可执行应用。
- TypeScript target/lib 与 compiler/vite 默认构建目标统一 ES2025；不要退回旧基线或改为随版本变化的 ESNext。新 API 的类型声明不代替运行时支持，不默认注入 polyfill。
- 共享版本放在 pnpm catalog，包间依赖使用 workspace:*。使用 Node 24 和 package.json 固定的 pnpm，不添加其他包管理器锁文件。
- 优先使用成熟依赖；ESLint 的 TS 支持满足选定版本时再评估替换现有 lint，不引入 TS6 或自造通用 linter。项目不引入 Zod，MCP 使用 JSON Schema、vscode-jsonrpc 与标准 stdio JSON-RPC。
- 生成数据应有明确维护入口与检查命令。中文注释解释语义、原因、资源责任，不机械复述代码。

## 验证与交付

- 编译语义测试在 packages/compiler/test，工具链测试在 tests/tooling，浏览器测试在 tests/e2e。测试实际框架和选定 SDK，不以 mock 或空用例代替功能验收。
- 本地只运行改动相关的焦点检查，不运行完整测试。配置变更的 pnpm check、pnpm build 及完整平台/三浏览器矩阵交给 CI；语言工具变更只在本地验证相关补全或协议用例，完整语言检查也由 CI 执行。
- 每个可审阅阶段中文提交并推送；推送前检查上一轮 CI 并修复真实失败，推送后继续工作，不空等或反复轮询。未完成的 CI 不记为通过。
- CI 按浏览器、平台和 Linux/Windows 独立消费并行；发布等待同一提交全部必需任务通过，不减少用例或放宽断言提速。
- 已授权生产验收后使用环境变量中的 npm token 发布固定 tgz 到 next，并核对注册表与干净安装；凭据不写入文件或日志。发布与恢复见 docs/releasing.md，未经授权不提升 latest。
- 项目服务名 zerodep_js_lsp，由 pnpm lsp:setup 配置，不改全局或其他项目设置。先独立验证，再请求重新加载；磁盘配置、独立服务、当前会话和 IDE 实际接入分别说明。
- 换机先阅读 docs/environment-setup.md；API 对照研究见 .design/svelte-api-review.md，未确认的提议不能当作已实现契约。
- WebStorm 使用同版本 TypeScript 7（原生）以启用服务驱动类型引擎；项目 node_modules/typescript 安装相同版本。SDK 不自动加载项目框架增强；IDE MCP 可能漏报 TS 错误，不能把空诊断当作验收。

## 清理

- 删除不再维护的代码、配置、文档和本任务产物，连同空目录；保留仍有价值的研究材料、用户 IDE 配置和运行数据。
- Windows 不使用递归删除，按核对后的准确路径逐文件删除，再从深到浅删除空目录；拒绝越出目标和遍历链接目标。先处理 pnpm 链接，源码迁移与依赖重装分开。
- 只关闭本任务子进程，不碰共享 pnpm store、用户环境、其他工作区或项目根 .git。
