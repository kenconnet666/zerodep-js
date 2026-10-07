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

WebStorm 已改选官方 node_modules/typescript。独立语言桥接的增强不自动进入 IDE；普通源码类型检查已验证，完整框架补全/诊断在 IDE 中的接入仍需另行完成，不能宣称全部 IDE 验收通过。

## 远端交付

090396b 的 CI 因官方 API 探针未使用变量失败；7117280 已修正并推送。推送迁移前核对：其 verify、六平台、Linux/Windows 消费及 Chromium 均通过，Firefox/WebKit 仍运行；旧路线 CI 不代表本轮迁移通过。

本轮迁移准备新候选 rc.7，尚未发布。完整平台与三浏览器矩阵以迁移提交的 CI 为准，不提升 latest；发布和注册表消费通过前不标记生产验收完成。
