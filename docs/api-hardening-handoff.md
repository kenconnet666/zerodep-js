# 基础 API 维护交接

更新：2026-10-09。当前源码改为单仓库维护 CSS，Vite 并入 compiler；新布局尚未发布。已发布 rc.9 为此前的通用适配接口版本，不能当作包含本次精简。下面历史发布记录保留当时状态。

## 本轮架构精简

- packages/css 迁入原 CSS 仓库 e5a0bfe 的作者、生成器、关键字、运行时及测试，只支持 zerodep-js。Vue/Svelte/Nuxt/Kit、bx 与旧主题预设不迁入；亮暗主题继续由 UI Provider 维护。原仓库本轮未修改或继续发布。
- packages/vite 已删除，Vite 插件在 zerodep-js-compiler/vite；CSS 转换内置。CompileExtension、extensions 配置及 zerodep-js/adapter 均删除，不保留旧入口。
- 生成器改用 Babel 解析固定 csstype，除路径与 bx 文档清理外，502 个属性和 12,586 个关键字的生成结果不变；共享 TS7.1、LSP、构建和发布清单。临时本地 tgz 覆盖及旧构建文件已清理。
- 修复多层 props/rest 转发递归枚举造成的 Provider 卡顿。属性描述符读取跟踪结构变化；焦点测试覆盖新增/删除/可枚举性切换、覆盖顺序和多层读取，不放宽浏览器断言。
- 本地通过：包编译与配置/应用类型检查，UI 与两个应用 CSR/SSR 构建，CSS 运行时/关键字文档 30 项，框架/CSS/Provider 焦点 42 项，以及 props/state/CSS 56 项（两组有重叠）；Chromium CSS/Provider 11 项；实际 TS7 的 CSS hover/补全；工作区外 tgz 消费检查；Vite 热更新及开发 SSR。完整平台与浏览器矩阵交当前提交 CI，尚不能记录为通过。

## 当前源码的后续变更

关键字压缩（2026-10-09）：CSS 源码 071cdd7 将 12,586 项关键字合为 219 组值与语义说明一致的共享数据，保留 502 个属性的中文说明、可继承作者/关键字构造器及自有字符串字段。常用公开类型和共享集合使用 ColorCss、ColorKeywords、globalKeywords、colorKeywords、fontSizeKeywords 等有意义的名称，不使用哈希命名；允许移除属性专属的 CSS 声明示例，不移除 inherit 等关键词的说明。

同入口、相同 esbuild 设置的测量：压缩 JS 由 1,030,728 降到 416,436 字节，gzip 由 98,446 降到 34,484 字节，生成声明由 9,056,355 降到 5,533,941 字节。这不是整个应用的大小。小入口按需打包仍通过原有断言，命名工具 359 字节、单颜色作者 5,222 字节。最初 CI 暴露的顶层初始化导致按需打包失效和旧探针读取已删除字段的问题已修复，没有放宽断言。

CSS [CI 37807279904](https://github.com/kenconnet666/zerodep-css/actions/runs/37807279904) 已完整成功，包含原先等待环境准备的 WebKit。主项目已从 npm 安装核心包 0.3.3，保留原有 SDK 摘要，frozen 安装通过，无本地路径覆盖。针对正式 npm 包，本地 CSS 编译/SSR 25 项、公共关键字/属性/主题成员/方法的选定 TS7 补全与 hover 四类用例全部通过；没有运行本地完整测试。此前补全脚本提交 d442fd2 的完整框架 CI 37809863232 已成功；本次依赖升级另行推送完整 CI，不套用旧提交结果。

已交付：六包 0.3.3 均已发布到 next，逐包 SHA-512/SHA-1 与固定 CI 产物一致，latest 保持原值。npm 受理后延迟可读，Vue 包的无查询参数元数据还曾命中旧缓存；通过版本端点和禁用缓存的完整元数据核对后完成验收，没有重复上传。[v0.3.3 预发布](https://github.com/kenconnet666/zerodep-css/releases/tag/v0.3.3) 保存六份原始 tgz、manifest.json 和 registry-verification-0.3.3.json。本地固定产物归档在相邻 CSS 仓库 test-results/release，manifest.commit 为 071cdd779360a45af3461d8b250089852ca6d61e；换机从该发布恢复，不重新构建同版本发行包。临时发布脚本、日志和重复候选目录已清理。

主题关键字变量绑定（2026-10-08）：已按用户确认保留 s.color._primary 写法，编译器标记直接成员读取，CSS 库运行时读取可信主题视图，按实际值选择元素变量或原声明。特殊关键字、已有 var()/复杂表达式回退仍响应更新；生成变量清除不影响用户 style。CSS 0.3.2 来自提交 0f888c8 的 CI 37787188898，完整矩阵通过，六包已全部发布到 next，逐包 SHA512 与固定 CI 产物一致，latest 保持原值。主项目已从 npm 安装 0.3.2、移除临时覆盖、保留未变 SDK 的原始摘要并 frozen 安装通过。跨 realm 关键字枚举问题同时修复，没有放宽自定义作者判定。

相关本地证据：CSS 14 项焦点用例、框架编译/SSR 25 项用例、选定 TS7 类型夹具及改动文件 lint 通过；Chromium CSR/SSR 的两项新增切换用例通过。三浏览器与 Linux/Windows 独立包消费新增对应断言，完整框架验证交 CI。没有运行本地完整测试。

框架实现提交 0ce4e9a 的 CI 37789427718 已完整成功：57 个测试文件、445 项单元/集成测试、56 项补全、三浏览器、六平台 SDK、Linux/Windows 独立消费与候选产物全部通过。后续文档提交不改变实现。这轮框架代码尚未发布新版本，现有 rc.8 不能视为包含本次绑定增强。

CSS [v0.3.2 预发布](https://github.com/kenconnet666/zerodep-css/releases/tag/v0.3.2) 保存六份 tgz、manifest.json 与 registry-verification-0.3.2.json。npm 受理后曾延迟可读，最终核验完整包元数据与 next/latest；没有重复上传已受理包。临时类型/浏览器配置、临时本地候选已删除，固定发行产物与旧版归档保留。

用户已决定删除 `_task` 整组 API；当前源码移除 task 子入口、实现、类型及专属测试，任务工作台改用普通 async 请求。保留原有竞态、取消、错误恢复、SSR 首屏与草稿断言，增加首屏不重复查询的回归。CSS 标签拼接与 useCss 保持不变。下面的 rc.8 发布证据属于删除前版本，不能作为本次改动的验收；rc.8 原始发行包不改写。

本地完成相关类型检查、包声明及示例 client/server 构建，12 项入口/生命周期单测与任务页 Chromium 11 项通过；语言补全只验证相关包导入用例，完整平台、三浏览器和剩余补全交新提交 CI。新增文档为 requests.md，不增加替代任务 API，也不改变同步生命周期的约定。

## 注入 store 的后续变更

当前源码已删除 `_createScope` 与 `ScopeHandle`，保留内部 Scope 和生命周期断言。2026-10-09 按用户决定删除整个 packages/use，先前的注入 store、持久化、路由与历史工具均不再维护或使用，也不搬入 core/UI。基础任务页保留状态与 HTTP 数据功能，移除持久化草稿；Provider 与 CSS 接线不变。后续源码发布清单为四包，以下 rc.8 五包记录仅为历史交付证据。

本地验证：相关应用与工具类型检查均 0 错误，包声明与 client/server 构建通过；33 项 store/生命周期/入口单测、30 项 Chromium 存储/任务/路由用例通过，包含真实 IndexedDB 的 CSR/SSR 恢复、刷新、跨标签通知和清除。4 项相关 LSP 补全通过。新适配器的异步读写、失败、次序和清理通过受控延迟用例验证，没有连接真实 Redis；后端接线由用户实现 StorageAdapter。

打包检查确认 use 仅导出 history/router/store，不包含旧 task/storage 入口文件。临时检查文件已清理，完整平台和三浏览器由新提交 CI 验收。

首轮 store CI 的 Linux/Windows 消费检查发现验收脚本仍读取旧存储的 .value 包装字段。已改为断言完整的新 JSON 对象 `{ message: '副本/甲' }`，继续验证卸载后的保存结果，不恢复旧格式兼容；修复提交需要重新取得 CI 结果。

随后消费夹具暴露 JSX 中直接调用 useStore 的错误用法；已改为组件初始化时取得对象，更新期间仅读取对象字段，保持与应用示例及 useCss 相同的调用方式。没有放宽作用域检查。

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
- 当前没有遗留的待应用 CSS 补丁或待发布候选。后续授权的组件库基础设施见下节；rc.8 发行包不包含这些后续源码变更。

## 2026-10-08 Provider 与文档站

- 用户已确认 packages/ui 的 div Provider、继承系统关键字的亮暗主题、中文/英文及自定义语言、独立地区与时区。使用 useCss/useLang/useLocale，根默认亮色、zh-CN、Asia/Shanghai；不会自动跟随系统或持久化。契约见 [Provider](provider.md)。
- 复用 _createContext/_createCssContext、SystemKeywords 和 Css 的主题读取函数；日期计算引入 date-fns 4.4.0 与官方 @date-fns/tz 1.5.0。无全局语言/时区设置，夏令时规则交给库。
- apps/docs 加入真实交互示例和 SSR 渲染入口，应用继续自行拼接 CSS 标签；客户端有 SSR 内容时接管。Portal 中可用空参数 Provider 重新应用继承配置。
- 本地通过 UI 构建与声明、文档 CSR/SSR 构建、相关类型检查、8 项单元/SSR 用例和 Chromium 的 CSR/SSR 两项端到端用例。焦点 lint、格式和 frozen 安装也通过。完整三浏览器/平台由本次提交 CI 验证，不把此前 CI 绿灯当作本轮结果。
- UI 保持 private，未加入五包发行清单；启动文档演示用 pnpm dev:docs。下一步讨论首个业务组件，或先审阅并确定主题颜色/字号/间距的具体数值。

## 安装、清理与验证注意事项

- 当前 JetBrains SDK 主包和平台包都来自原始 GitHub 发行地址。独立消费者需合并根级平台 overrides；只安装主包 URL 不保证平台二进制可用。完整说明见 environment-setup.md、packages.md。
- 换机/IDE 操作只按 environment-setup.md 指定 SDK 与 EAP 构建。语言协议测试通过不代表当前桌面 MCP 或所有 IDE 构建已重新加载。
- 本轮 docs/.design 的相对文档链接已检查，无缺失目标；IDE/LSP 临时探针、发布辅助脚本和临时日志已逐文件删除。
- CSS 发布目录只保留本批六份 0.3.1 tgz、manifest、注册表核验记录和发布说明。更早的发布归档、用户 IDE 数据和共享 pnpm store 未动。
- Windows 仅按核对后的准确路径逐文件/链接删除，再删除空目录，不递归删除、不遍历链接、不动根 .git。只清理本任务进程与产物。
- 本地优先焦点测试，不重复运行已通过且未受影响的全集。LSP 探针会创建临时源码，不能与同工作区 check/build 并行。
- 待应用 CSS 补丁已消费并删除；临时发布脚本和日志已逐文件清理。README、开发、工具链和换机指南明确完整检查由 CI 执行；WebStorm 入口与原生预览/类型引擎配置保持一致。
- 本轮不复用此前机器的本地产物摘要；发布说明记录重新冻结的来源与验证结果。临时 IDE/LSP 探针已删除，用户 IDE 配置、共享 pnpm store 和应用数据保留。

## 2026-10-09 应用工具包精简

删除 packages/use、路由工作区和存储专用示例/测试，移除 consumer 与语言补全中的工具包用例。core 的快照恢复与双向绑定验收继续保留；构建引用、工作区依赖和发布说明改为当前四包清单。历史 npm 版本与冻结发布产物不修改。

本地通过 frozen-lockfile 安装、示例框架检查及 CSR/SSR 构建、示例和工具 TypeScript 检查、18 项 Chromium 的绑定/快照/按需加载/任务用例、发布工具焦点集成用例、四包 tgz 工作区外安装/声明/CSR/SSR/接管/卸载验证，以及相关 lint/格式和文档链接检查。独立消费明确验证 zerodep-use 及其 router/store/history 子入口不可导入。完整平台与三浏览器仍交本次提交 CI，不复用前一提交的通过结论。
