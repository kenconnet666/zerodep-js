# 当前执行记录

更新：2026-10-07。目标与取舍见 [工具链方案](../.design/standard-toolchain-plan.md)，当前职责与使用入口见 [工具链](tooling.md)。

## 已落地

- 官方 TypeScript 固定至当天最新 7.1.0-dev.20261007.1；Babel core/parser/traverse/types 8.0.6、preset-typescript 8.0.1。只维护这一 TS7.1 路线，不再构建或分发定制 SDK。
- Babel 接管框架转换，复用运行时与 ABI 2；保留变量式响应性、组件参数解构/default/rest、DOM/组件 bind、DOM bind:this、列表、SSR 和开发状态保留。
- 项目检查通过官方 API 及绑定检查投影覆盖写回、引用清理、可选值、泛型、注释指令和源码映射。Vite 不拥有类型检查进程或自有项目缓存。
- 既有小核心修改已承接：删除 _createPage 与冗余工具入口，根入口统一 _mount/_hydrate；持久化统一 read/write；开发面板显式 _inspect；DOM bind:this 复用 ref 生命周期。旧交接文档已由本文替代。
- 通用类型 lint 使用发布的 oxlint-tsgolint；typescript-eslint 当前 peer 尚不支持 TS7，不引入 TS6 或自有 Go lint。
- 用户报告的 ReferenceExample TS2339 已修正：SVG 引用使用显式 _state 联合类型。官方原始 TSX 检查通过，CI 增加该检查防止 IDE 可见错误漏检。
- CI 保留工程、三浏览器及 Linux/Windows 独立消费并行，将自有 SDK 构建改为六平台官方工具验证；发布仍等待同一提交全部门槛。

## 验证证据

当前最新 nightly 已通过全仓 check（生成数据、类型、lint）、326 项 Node 测试，以及示例原始官方 tsc 检查。项目检查测试的进程超时统一为 30 秒，断言未放宽。client/server 构建、独立 LSP 验证和 49/49 补全也已在该 nightly 重新通过。

迁移过程中上一版官方 nightly 已通过 client/server 构建、19 项 Chromium 引用/作者写法/生命周期/接管测试、真实 HMR 状态保留/重置与错误恢复、五包 tgz 的工作区外消费。独立语言工具已通过 49 项补全与 16 个绑定导航位置，并覆盖错误修复、重命名、依赖刷新与项目隔离；这些阶段证据不代替最新提交的完整 CI。

## 清理与边界

旧 native 包和六个平台包、Go 后端/补丁/构建脚本、专属配置及失效维护文档已删除。17 个退役目录逐项清理并确认不存在，另外清理项目内旧 Go 构建/模块缓存的 6,675 个文件与 456 个目录。临时清理脚本、清单和空父目录已移除。源码目录复查无空文件夹；共享 pnpm store、全局 SDK、主 .git、用户 IDE 配置与应用数据保留。

仍有价值的 Svelte/TSX 研究保留；CHANGELOG 的历史文档链接固定到旧提交，避免误导为现行工具说明。本地 Markdown 链接检查通过。

WebStorm 已改选官方 node_modules/typescript，并通过本机已有 LSP4IJ 导入标准语言服务。用户实际确认窄字符串绑定的写回错误出现在原始 TSX，修复后红线消失，bind 补全、中文悬浮说明与 Ctrl+B 跳转正常；IDE 接口也取得真实 jsx-elements.ts 声明。临时 EditorProbe 已删除。标准协议进一步覆盖跨文件未保存修改、Unicode 增量范围、引用/重命名、自动导入及项目隔离。服务入口使用微软维护的 LSP 依赖，不增加自有 IDE 插件。

## 远端交付

090396b 的 CI 因官方 API 探针未使用变量失败；7117280 已修正并推送。推送迁移前核对：其 verify、六平台、Linux/Windows 消费及 Chromium 均通过，Firefox/WebKit 仍运行；旧路线 CI 不代表本轮迁移通过。

迁移实现已提交为 7f442d4，五包版本已准备为 rc.7，尚未发布。6263da4 的 CI 37607762711 已完成：工程检查、六平台和 Linux/Windows 独立消费全部通过；三个浏览器任务在启动测试前因 zerodep-check 命令未链接失败。固定 CLI 入口已改为随源码存在的 bin/check.mjs，并实测 dist/cli.js 缺失时重新安装仍能建立命令链接；恢复产物后示例检查通过。完整平台与三浏览器矩阵以迁移提交的 CI 为准，不提升 latest；发布和注册表消费通过前不标记生产验收完成。

## 后续修复

1848cf4 的 CI 37615196903 中，工程、六平台、三浏览器和独立消费任务已通过；release-artifacts 被干净工作区检查拦截。原因是 pnpm 在 Linux 安装时为两个已跟踪的 CLI 入口设置可执行位，Git 原先记录为 100644。入口改为记录 100755，保留发布时的干净工作区门槛。

用户要求直接试用 JetBrains 发布的 TS7.1 SDK，并明确放在项目中选择。已核对其 2026-10-07 发布的 7.1.0-dev.jetbrains.20261006.2，校验发行包 SHA256，安装到本机 `.codex/jetbrains-sdk/node_modules/typescript`，标准 bin/tsc 已返回该版本；平台包位于同一 node_modules。SDK 原文不修改，不进入版本控制，也不覆盖构建依赖。试用版对现有声明报告 14 项 DOM 标准库差异（SetHTMLOptions/SetHTMLUnsafeOptions），因此不能宣称其与当前微软 nightly 等价。用户中止电脑自动操作后，按其要求交由 IDE 选择该项目目录；之前的 IDE 缓存安装尝试和错误版本目录已清理，原有 7.0 缓存保留。

a5d6507 的 CI 37608594119 已确认 CLI 链接修复：工程、六平台、两种独立消费、Firefox/WebKit 均通过。Chromium 唯一失败为修饰键打开新标签页的偶发超时，原始 trace 确认 trusted/modified 均为 true、defaultPrevented 为 false；重试成功仍按严格门槛判失败，Windows 无框架链接对照中，headless shell 与完整 Chromium 各 100 次均通过，未在本机复现，因此不能宣称已证明 shell 是根因。CI 的 Chromium 项目改用 Playwright 官方提供的完整 Chromium 新无头模式，以更接近桌面原生输入与开页行为；保留原断言和 failOnFlakyTests，并增加 Alt/Shift/button 记录，完整 Linux 结果仍待 CI。参考：https://playwright.dev/docs/browsers#chromium-new-headless-mode 。

标准 LSP 试点修复 Windows URI 大小写/编码映射与 bind 读写重复编辑；补全 resolve 保留原投影上下文。两个真实进程协议用例、既有语言工具和 49 项补全通过；最新完整 CI 仍待本轮提交。

本机已通过标准 LSP 两项真实进程用例、全仓 328 项 Node 测试；随后大型声明诊断修复通过新增回归和全部 117 项编译/工具测试。诊断复用框架分析但不生成 JS，消除 jsx-elements.ts 超过 500KB 的 Babel 日志。完整 Chromium 的修饰键开页/滚动用例本地连续 20 次通过，原断言保留。WebStorm 专有服务驱动类型引擎的 7.0.x 版本限制已在工具文档说明；不等同于本次已验证的 TS7.1 标准 LSP 接入。
