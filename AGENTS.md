# zerodep-js 协作约定

## 目标与范围

- 直接在当前主目录工作，只有用户明确要求才创建或使用新工作树。保留用户已有改动。
- 独立 TSX 细粒度响应式框架。已授权 zerodep-css 原生接入：CSS 作者与宿主归 CSS 仓库，TSX 转换复用本项目 Babel；命名 css 自动追踪，直接变量保守绑定。IndexedDB 等未授权扩展不顺带加入。
- 2026-10-08 当前重点是已有/新增基础 API 与 CSS 协作。组件只作为验收夹具，不实现或发布完整 Dialog/Button/TextField 等组件，不建立组件库；组件库另行规划。新候选须先确认契约，当前主计划为 docs/production-plan.md。
- 2026-10-07 用户最新决定：IDE 与项目统一固定 JetBrains TypeScript 7.1.0-dev.jetbrains.20261006.2，Babel 框架转换和 Vite 不变。此决定取代此前追随微软 nightly 的版本选择；只维护这一 TS7.1，不回退 TS6、不维护多版本兼容或定制 TS 内核补丁。已授权为 WebStorm EAP 类型引擎适配 ts-go-proxy，先备份并验证；SDK 与平台包从 JetBrains GitHub Release 原始发行地址安装，精确 URL 和校验信息进入 pnpm catalog/overrides/lockfile。
- 首要目标是简单易维护、方便使用、良好类型提示与适当中文注释。性能次要；不为减少依赖或解析次数引入复杂后台、缓存和协议。
- 2026-10-08 用户已授权按基础 API 计划自主执行、完善测试和修复，并允许为简洁性适当调整 API；在实施前记录选定契约，不必逐项再次确认。本地只跑相关焦点检查，完整矩阵交 CI。额度目标与持续交接记录见 docs/api-hardening-handoff.md；账户余额只少量用于收尾和交接，不触发额度重置或购买。
- 保留显式变量式 _state/_derived（无 .value）、_component 参数解构/默认值/实时 rest、bind、DOM bind:this、_lazy、快照历史和开发状态保留。不能以弱化类型或生命周期、表单、列表、SSR 断言完成迁移。
- 选择性参考 Svelte 的语义和资源所有权，参考 Vue Devtools 的使用体验；无需复制其全部功能。以 docs/production-plan.md、docs/semantics.md 和 .design/standard-toolchain-plan.md 为执行依据。

## 结构与 API

- core 提供响应式与 DOM 运行时；use 提供 router/storage/history；ssr 提供服务端适配；compiler 提供 Babel 转换与选定 TS SDK 适配；vite 提供开发和打包。不要创建空包、无用途抽象层或框架宿主演示。
- 顶层公开函数使用单下划线，声明本身使用该名称，入口直接导出。JSX 组件、类型、类和对象成员保持常规命名。删除旧入口，不保留 deprecated 别名或兼容转发。
- 普通包由选定 SDK 的 tsc 构建，框架应用由 Vite 转换；不能把未经宏转换的 TS 擦除产物冒充可执行应用。
- 共享版本放在 pnpm catalog，包间依赖使用 workspace:*。使用 Node 24 和 package.json 固定的 pnpm，不添加其他包管理器锁文件。
- 优先使用成熟依赖；ESLint 的 TS 支持满足选定版本时再评估替换现有 lint，不引入 TS6 或自造通用 linter。项目不引入 Zod，MCP 使用 JSON Schema、vscode-jsonrpc 与标准 stdio JSON-RPC。
- 生成数据应有明确维护入口与检查命令。中文注释解释语义、原因、资源责任，不机械复述代码。

## 验证与交付

- 编译语义测试在 packages/compiler/test，工具链测试在 tests/tooling，浏览器测试在 tests/e2e。测试实际框架和选定 SDK，不以 mock 或空用例代替功能验收。
- 配置变更运行 pnpm check、pnpm build；语言工具变更运行 pnpm lsp:verify 和相关补全用例。按风险选择本地检查，完整平台与三浏览器矩阵交给 CI。
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
