# 基础 API 维护交接

更新：2026-10-08。CSS 0.3.1 与框架 1.0.0-rc.8 均已发布到 next，完整 CI、固定产物与注册表验收完成。此前限时窗口已结束，本页记录最终交付与恢复依据。

## 当前源码的后续变更

用户已决定删除 `_task` 整组 API；当前源码移除 task 子入口、实现、类型及专属测试，任务工作台改用普通 async 请求。保留原有竞态、取消、错误恢复、SSR 首屏与草稿断言，增加首屏不重复查询的回归。CSS 标签拼接与 useCss 保持不变。下面的 rc.8 发布证据属于删除前版本，不能作为本次改动的验收；rc.8 原始发行包不改写。

本地完成相关类型检查、包声明及示例 client/server 构建，12 项入口/生命周期单测与任务页 Chromium 11 项通过；语言补全只验证相关包导入用例，完整平台、三浏览器和剩余补全交新提交 CI。新增文档为 requests.md，不增加替代任务 API，也不改变同步生命周期的约定。

## 注入 store 的后续变更

当前源码进一步删除 `_createScope` 与 `ScopeHandle`，保留内部 Scope 和生命周期断言。新增 `zerodep-use/store`：必须提供后向下读取；持久化配置在提供者处，保存普通 JSON，支持 Web Storage、IndexedDB 和自定义同步/异步适配器。不保留旧 storage 入口、数据封装或迁移逻辑。路由预加载、其他工具和 CSS 接线不变。本次代码使用独立的新提交验收，不套用下面 rc.8 的发布结论。

本地验证：相关应用与工具类型检查均 0 错误，包声明与 client/server 构建通过；33 项 store/生命周期/入口单测、30 项 Chromium 存储/任务/路由用例通过，包含真实 IndexedDB 的 CSR/SSR 恢复、刷新、跨标签通知和清除。4 项相关 LSP 补全通过。新适配器的异步读写、失败、次序和清理通过受控延迟用例验证，没有连接真实 Redis；后端接线由用户实现 StorageAdapter。

打包检查确认 use 仅导出 history/router/store，不包含旧 task/storage 入口文件。临时检查文件已清理，完整平台和三浏览器由新提交 CI 验收。

首轮 store CI 的 Linux/Windows 消费检查发现验收脚本仍读取旧存储的 .value 包装字段。已改为断言完整的新 JSON 对象 `{ message: '副本/甲' }`，继续验证卸载后的保存结果，不恢复旧格式兼容；修复提交需要重新取得 CI 结果。

## 最新授权与环境

- 本地只做改动相关焦点检查，完整测试全部交 CI；阶段提交并推送，同提交完整验收后发布固定 tgz 到 next，不提升 latest。
- zerodep-js：当前主目录，分支 main；PR #1 已合入，发布源码提交为 fe2a7b417a1a6bdf4dc95b8deda1ac9bd24d3473。候选 f3812e8 的 push/PR 完整 CI 均通过，main 的同提交发布门禁和注册表消费均通过。
- zerodep-css：相邻目录 main，发布源码提交 593cebde73d62234f0d38c635cf0c56ca368faa9，随后 561a555 仅记录发布/恢复文档；六包 0.3.1 已全部发布到 next，摘要逐包一致；原有五包 latest 保持 0.2.0，compiler latest 保持 0.3.0。主框架 catalog 固定 0.3.1。
- 本次本机 Node 24.12.0、pnpm 10.34.5；CI 按 .node-version 使用 Node 24.18.0。框架固定 JetBrains TS7.1.0-dev.jetbrains.20261006.2，Babel/Vite 分工不变。CSS 仓库保留自己的 TS6，不进入主框架运行时/SDK 依赖图。
- WebStorm EAP 263.6259.34 的 SDK 缓存与代理补丁已恢复，实际 TS/代理进程均使用选定版本；IDE 错误修复与泛型刷新实测通过。项目 zerodep_js_lsp 已重新生成并加载，当前 Codex 会话完成 TS2322 错误→修复及悬浮验证；独立服务与 54/54 补全也通过。

## 已交付源码

| 范围               | 已实现或修复的契约                                                                                                              | 验收入口                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 请求               | 普通 async/await、页面状态、生命周期取消；旧查询不得覆盖新结果或冲突草稿                                                        | docs/requests.md、tests/e2e/tasks.spec.ts                       |
| 绑定               | details bind:open；radio/checkbox 字符串 bind:group；原生 reset、接管前编辑、写回类型与稀疏数组校验                             | docs/forms.md、compiler/SSR group 与 disclosure 测试、tests/e2e |
| output             | 受控纯文本 TextRenderable，原生 reset 后重新取得实际文本节点；富内容用普通容器                                                  | docs/forms.md、SSR/类型反例、WebKit 回归                        |
| 状态与快照         | 数组用户比较器追踪、跨 realm/子类边界、锁定属性 Proxy 不变量；显示标签不能伪装普通数据或集合                                    | core state/reactivity/snapshot 测试                             |
| props              | 解构/default/rest 保留；实时 rest 只暴露自有可枚举属性，命名读取仍支持 getter                                                   | core props 与真实组件编译测试                                   |
| 历史/持久化        | 回调内销毁后不恢复已释放记录或重新连接；拒绝历史操作重入；普通停止仍最终提交                                                    | use history/storage 测试                                        |
| 路由               | 已取消 Promise 的拒绝仍处理；同步历史重入保留事件入口、最新地址/state，守卫按已提交位置回滚                                     | use router/history 测试、真实 browser/hash 夹具                 |
| 同步契约/引用/边界 | 误传 Promise 报错并处理拒绝；清理继续释放其他资源；ref 内卸载立即清理返回资源；初始化/清理双错误保留；边界 reset 重入不重复挂载 | core/SSR 单测、reference/flow 浏览器测试                        |
| CSS                | 命名 css 追踪、直接变量保守绑定、class 前 spread、参数求值顺序、调用源码映射、_createCssContext                                 | docs/css.md、compiler CSS 19 项、类型与独立消费                 |
| 页面元信息         | _head 只处理 title/description；按字段覆盖/销毁恢复、Document/SSR 根隔离；_render 返回 {html,head}                              | docs/head.md、core/SSR head、浏览器及独立消费                   |
| CSS 组合           | 普通/局部/Portal/动态导入主题；加载期间切换主题；CSS HMR 尺寸/颜色、单宿主与开发 SSR 样式接管                                   | css.spec.ts、verify-dev.mjs，已进入 97319ae 完整 CI             |
| 工具与文档         | 补全保留 head 和主题作者方法，移除 task.reset 专属用例；旧 SDK 操作说明移出当前指南，研究保留为历史                             | lsp:verify、lsp:completions、environment-setup.md               |

组件仅为验收夹具，没有建立组件库。watch、防抖、ref 组合、class 合并、复杂外部订阅、流式/异步组件 SSR 等未进入本轮。

## 当前 CI 与发布边界

- 框架候选 f3812e8：[push CI 37729045859](https://github.com/kenconnet666/zerodep-js/actions/runs/37729045859) 与 [PR CI 37729097673](https://github.com/kenconnet666/zerodep-js/actions/runs/37729097673) 均完整成功，包含工程检查、六平台 SDK、三浏览器及 Linux/Windows 独立消费。
- [PR #1](https://github.com/kenconnet666/zerodep-js/pull/1) 已合入 main，合并提交 fe2a7b4 与 f3812e8 的源码树一致。main 的 [CI 37729962027](https://github.com/kenconnet666/zerodep-js/actions/runs/37729962027) 已完整成功并冻结五包 rc.8；本机从 release-candidate 恢复原 tgz，revision 与五份 SHA-512 均核对一致。
- 本地仅运行本次相关检查：发布工具 6 项、CSS 编译/上下文 22 项通过，包声明构建、相关 lint、格式与文档相对链接检查通过；完整矩阵交 CI。
- CSS 593cebd / [CI 37688602400](https://github.com/kenconnet666/zerodep-css/actions/runs/37688602400)：完整成功。原 performance (templates) 在 Playwright 安装系统依赖时因 Ubuntu 镜像源请求停滞超过六小时而取消；恢复时只重跑该任务，setup 和原有全部探针随后成功，没有更改断言。
- 框架五包源码版本为 1.0.0-rc.8；[发布流程 37730703039](https://github.com/kenconnet666/zerodep-js/actions/runs/37730703039) 已成功，使用同一提交的固定产物发布并完成 Linux 工作区外注册表安装、声明/泛型/事件类型、预编译库、CSR/SSR、接管、表单、卸载和按需打包验证。五包 next 均为 rc.8，core/ssr/compiler/vite 的 latest 保持 rc.1，use 保持 rc.4。历史运行证据由 Git 与 CHANGELOG 保留，不把旧绿灯套到新提交。

## CSS 0.3.1 已交付

CSS 修复核对 authorInputs 的底层 name 数据值，拒绝将改名或 getter 作者套用系统属性优化，正常扩展关键字仍可绑定。修复前两个用例失败，修复后构建、生成检查、六包类型/Vue/Svelte 检查、绑定焦点与 5 项 inline 用例通过。

此前机器保留的候选未随 Git 转移到当前机器；原工作区外消费结果属于此前产物。当前已从同一源码 593cebd 重新构建六包，并通过 packed Node/browser 入口及消费类型检查。新固定候选位于相邻 CSS 仓库 test-results/release，manifest.json 记录 commit 与本批 SHA512；原 tgz、manifest 和 registry-verification.json 已保存到 [v0.3.1 GitHub 预发布](https://github.com/kenconnet666/zerodep-css/releases/tag/v0.3.1) 供恢复。

六包均经历 npm 受理后延迟公开；每次先确认已受理包的元数据与摘要，再恢复剩余包，没有重复上传。最终六包 dist.integrity 与固定产物一致，next 全部为 0.3.1，latest 保持旧值；GitHub 预发布已公开。框架已从注册表安装核心包。

主框架已将 catalog 固定为 0.3.1、core CSS peer 下限改为 ^0.3.1，并应用 scripts/verify-packages.mjs 与 tests/consumer/src/App.tsx 的继承作者消费回归。待应用补丁已删除，不再维护两份用例。锁文件仅变化 CSS 版本和摘要，SDK 的完整性字段保持；frozen 安装通过。

## 固定产物与恢复

- 框架 [rc.8 GitHub 预发布](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.8) 已公开，保存原始五份 tgz 和最终 release.json。账本 revision 为 fe2a7b4，registryVerifiedAt 为 2026-10-08T05:11:43.861Z。本机 .release/1.0.0-rc.8 已恢复同批 tgz 与最终账本，五份摘要一致。
- CSS [0.3.1 GitHub 预发布](https://github.com/kenconnet666/zerodep-css/releases/tag/v0.3.1) 保存六份原始 tgz、manifest.json 和 registry-verification.json。本机相邻仓库 test-results/release 保留同批产物。
- 已完成版本不重新上传、不重新构造同版本产物。换机先从对应预发布恢复原文件并核对源码与 SHA-512；下一次代码修复使用新版本，完整门禁仍按同一候选提交执行。
- 当前没有遗留的待应用 CSS 补丁或待发布候选。后续可讨论基础 API 易用性审查；组件仍是验收夹具，不自动扩张为完整组件库。

## 安装、清理与验证注意事项

- 当前 JetBrains SDK 主包和平台包都来自原始 GitHub 发行地址。独立消费者需合并根级平台 overrides；只安装主包 URL 不保证平台二进制可用。完整说明见 environment-setup.md、packages.md。
- 换机/IDE 操作只按 environment-setup.md 指定 SDK 与 EAP 构建。语言协议测试通过不代表当前桌面 MCP 或所有 IDE 构建已重新加载。
- 本轮 docs/.design 的相对文档链接已检查，无缺失目标；IDE/LSP 临时探针、发布辅助脚本和临时日志已逐文件删除。
- CSS 发布目录只保留本批六份 0.3.1 tgz、manifest、注册表核验记录和发布说明。更早的发布归档、用户 IDE 数据和共享 pnpm store 未动。
- Windows 仅按核对后的准确路径逐文件/链接删除，再删除空目录，不递归删除、不遍历链接、不动根 .git。只清理本任务进程与产物。
- 本地优先焦点测试，不重复运行已通过且未受影响的全集。LSP 探针会创建临时源码，不能与同工作区 check/build 并行。
- 待应用 CSS 补丁已消费并删除；临时发布脚本和日志已逐文件清理。README、开发、工具链和换机指南明确完整检查由 CI 执行；WebStorm 入口与原生预览/类型引擎配置保持一致。
- 本轮不复用此前机器的本地产物摘要；发布说明记录重新冻结的来源与验证结果。临时 IDE/LSP 探针已删除，用户 IDE 配置、共享 pnpm store 和应用数据保留。
