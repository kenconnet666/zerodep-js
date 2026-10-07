# 当前执行记录

当前工作区版本调整（2026-10-07）：按用户最新要求，IDE 与项目统一固定 JetBrains `7.1.0-dev.jetbrains.20261006.2`，使用 GitHub 原始 HTTPS 发行包与锁定平台覆盖。已在用户授权分支 codex/webstorm-ts71-integration 保存检查点 2480fbd。项目 check、client/server 构建、117 项编译测试、lsp:verify、49/49 补全和 Windows 独立 tgz 消费通过。本轮未发布新包，以下 rc.7 发布证据仍对应此前微软 nightly。

WebStorm EAP 263.6259.34 的本机代理已按用户授权打补丁并保留原文件：快照 API 改为 getCurrentLanguageServerSnapshot，配置路径查找项目改为 getConfiguredProject。真实 IDE 查询返回 string、泛型 number | undefined、对象属性及 _component 的默认值/rest 参数类型；修改泛型调用后结果刷新为 string | undefined。错误赋值在编辑器出现红线，修复后的状态单独核对。补丁命令和 LSP 复用边界见 [工具链](tooling.md)。

更新：2026-10-07。官方 TS7.1 dev、Babel 与 Vite 迁移已完成，五包 `1.0.0-rc.7` 已发布到 npm next。目标与取舍见 [工具链方案](../.design/standard-toolchain-plan.md)，使用入口及编辑器限制见 [工具链](tooling.md)。

## 实现与验收

- TypeScript 固定官方 `7.1.0-dev.20261007.1`，当天重新查询 npm next 与本机安装一致；Babel core/parser/traverse/types 8.0.6、preset-typescript 8.0.1。移除自维护 SDK、Go 内核补丁与平台发布包。
- Babel 接管框架转换，复用运行时与 ABI 2；保留变量式响应性、组件参数解构/default/rest、DOM/组件 bind、DOM bind:this、列表、SSR 和开发状态保留。
- 官方 API 与检查投影覆盖绑定写回、引用清理、可选值、泛型、注释指令和源码映射。Vite 不拥有类型检查进程或自有项目缓存。通用 lint 沿用发布的 Oxlint/oxlint-tsgolint。
- ReferenceExample 的 TS2339 已用显式 _state 联合类型修正；CI 检查示例原始 TSX，避免框架检查掩盖 IDE 可见错误。
- 标准语言服务使用微软维护的 LSP 依赖，覆盖跨文件未保存修改、Unicode 增量范围、引用/重命名、自动导入、项目隔离和连接关闭清理；大型声明文件诊断不再生成 JS，消除 Babel 的 500KB 日志。

发布源码提交为 `ccffb8b2f9e89833e47f91cbe89f6e2a27db0d1e`。

| 验证                                 | 结果与证据                                                                                                                          |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| 全仓检查、构建、测试与六平台官方工具 | [CI 37618603078](https://github.com/kenconnet666/zerodep-js/actions/runs/37618603078) 全部通过                                      |
| Chromium、Firefox、WebKit            | 同一 CI 三浏览器任务全部通过；保留严格断言与 failOnFlakyTests                                                                       |
| Linux/Windows 工作区外 tgz 消费      | 同一 CI 两种消费任务全部通过                                                                                                        |
| 发布冻结产物及 Linux 注册表消费      | [发布流程 37619281796](https://github.com/kenconnet666/zerodep-js/actions/runs/37619281796) 成功                                    |
| Windows 注册表消费                   | `pnpm test:packages:registry --version 1.0.0-rc.7` 通过；覆盖声明、泛型/事件类型、预编译库、CSR/SSR/接管、表单、清理与 tree shaking |
| 冻结产物真实性                       | 五个 tgz 的 SHA512 与 release.json、npm dist.integrity 一致                                                                         |
| 实际发行包 LSP                       | 隔离安装 CI 冻结的 core/compiler tgz，通过官方 7.1 服务启动、绑定写回 TS2322、命名空间类型补全与关闭验证                            |
| 独立语言工具                         | lsp:verify、49/49 补全通过；真实进程协议测试纳入上述 CI                                                                             |

五包 next 均为 rc.7；latest 未提升（core/ssr/compiler/vite 保持 rc.1，use 保持 rc.4）。[GitHub rc.7 预发布](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.7) 已公开，冻结 tgz 与发布账本留在忽略目录 `.release/1.0.0-rc.7` 供恢复与审计。

## rc.7 阶段的 IDE 验证记录（历史）

WebStorm 的项目 SDK 使用官方 node_modules/typescript。用户曾通过本机 LSP4IJ 实测：窄字符串绑定写回错误出现在原始 TSX，修复后红线消失，bind 补全、中文悬浮与 Ctrl+B 跳转正常。临时 EditorProbe 已删除。IDE MCP 可能漏报 TS 错误，空诊断不作为验收依据。

普通补全候选可能同时来自 IDE 与 LSP4IJ；实际 LSP 响应中 task/tasks 各只有一个，不能删除正确类型候选来掩盖 IDE 合并。用户在后续 SDK 试用期间停用了 Zerodep LSP，未擅自重新启用。

按用户要求试装的 JetBrains SDK 已撤销并清理；构建依赖及锁文件始终为微软官方 TS7.1。WebStorm 2026.2.3 与最新 2026.3 EAP 均把项目 TS7.1 排除在服务驱动类型引擎之外。两版 IDE 原始代理接入官方 7.1 的独立实测也因 updateSnapshot API 不兼容失败。该引擎尚未启用，需要 JetBrains 更新版本判断与适配；已验证的标准语言服务不等同于该引擎。具体证据见 [工具链说明](tooling.md#webstorm-的服务驱动类型引擎)。

## 修复与清理

迁移验收期间修正了干净安装前 CLI 入口不存在、Linux 可执行位导致工作区变脏的问题。两个跟踪的 bin/*.mjs 入口使用 100755，保留发布的干净工作区门槛。

Chromium 修饰键开页曾有 Linux 偶发超时，trace 显示事件未被框架 preventDefault。Windows 对照未复现，未宣称已证明浏览器 shell 是根因。CI 改用 Playwright 官方完整 Chromium 新无头模式、增加事件证据，严格断言与重试失败门槛保持；最终同一发布提交的三浏览器任务通过。

旧 native 包、六个平台包、Go 后端/补丁/构建脚本、失效配置和维护文档、临时 SDK、研究下载和测试夹具均已逐项清理，包含空目录；源码目录扫描无空文件夹。仍有价值的 Svelte/TSX 研究与发布冻结产物保留。未清理共享 pnpm store、主 .git、用户 IDE 配置或应用数据，也未覆盖用户 TaskBoard.tsx 的编辑器试验修改。
