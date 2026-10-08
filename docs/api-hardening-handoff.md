# 基础 API 维护交接

更新：2026-10-08。用户于北京时间约 07:58 延长 20 分钟，本轮截至约 08:19；到时停止新增工作并保留下面的远端待办。本文区分源码完成、CI 验收和发布，不把待运行的检查当作通过。

## 最新授权与环境

- 用户最新要求：周额度到 0 后继续使用已有余额，07:58:37 再延长 20 分钟，约至北京时间 2026-10-08 08:18:37（UTC 00:18:37）结束，预留提交、清理与交接时间。此前 08:00 截止及“余额仅少量用于交接”已被替代；不购买、不重置额度。本地只做改动相关焦点检查，完整测试全部交 CI。
- 最近账户读数：周额度已用 98%，余额 61,804.0163505000；这些是账户共享数据，不能精确归因到本任务，也不是 token 数。
- zerodep-js：当前主目录，分支 codex/webstorm-ts71-integration；完整验收基线为 97319ae / CI 37702203453。延长窗口又提交生命周期修复 3ae393b、可选参数类型修复 3b96b09、补充组合测试 7f75127；最新代码/测试 CI 为 37706472895，不能沿用旧绿灯。
- zerodep-css：相邻目录 main，提交 593cebde73d62234f0d38c635cf0c56ca368faa9，六包源码版本 0.3.1，尚未发布。主框架 catalog 仍为已发布 0.3.0。
- Node 24.18.0、pnpm 10.34.5；框架固定 JetBrains TS7.1.0-dev.jetbrains.20261006.2，Babel/Vite 分工不变。CSS 仓库保留自己的 TS6，不进入主框架运行时/SDK 依赖图。

## 已交付源码

| 范围               | 已实现或修复的契约                                                                                                              | 验收入口                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 任务               | initial 建立成功初态但不请求；reset 清空数据/错误/重试输入；取消与同步 abort 重入安全；初值 getter 只读一次                     | docs/tasks.md、packages/use/test/task.test.ts                   |
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
| 工具与文档         | 54 项语言补全含任务 reset、head 和主题作者方法；旧 SDK 操作说明移出当前指南，研究保留为历史                                     | lsp:verify、lsp:completions、environment-setup.md               |

组件仅为验收夹具，没有建立组件库。watch、防抖、ref 组合、class 合并、复杂外部订阅、流式/异步组件 SSR 等未进入本轮。

## 当前 CI 与发布边界

- 08:17 核对：7f75127 / CI 37706472895 的工程检查、六平台 SDK、Linux/Windows 独立消费已通过，只剩 Chromium/Firefox/WebKit 三浏览器任务仍在运行，没有已确认失败。前一轮 3ae393b 被后续推送按工作流并发策略取消；不记为通过。随后文档提交不改变代码/测试。
- 延长窗口新增修复：effect 重跑前的 cleanup/abort 可以停止自身或销毁根，调度器清理后检查 disposed，不再误报“不能进入已销毁作用域”。两项回归先复现失败，再与响应式单测共 34 项通过；只做这两个测试文件和改动文件 lint，完整测试交新提交 CI。
- 随后补齐清理停止根并抛错的组合回归：保留原始错误、其他根继续更新、最终解除全部订阅。该生命周期测试文件当前 10 项通过；它与前述 34 项有重合，不能相加冒充新增数量。
- 可选 props 参数修复：ComponentProps 不再把 `(props?: { label?: string })` 误判成无参数组件。三个合法的客户端/SSR 类型用例先复现 TS2322，再通过只包含两份类型夹具的 TS7 检查；真实 Babel 组件参数测试 18 项通过，新增独立包消费类型反例交 CI。没有放宽必填属性或无参数组件的限制，临时类型配置已删除。
- 主框架 97319ae / CI 37702203453：verify、六平台 SDK、两平台独立消费、三浏览器全部通过；其中 verify 的 56 个测试文件、452 项 Vitest 测试及 54/54 补全通过；补全数量已由脚本 AST 与 CI 日志复核。发布产物任务按分支规则跳过，不能据此声称已发布。
- 先前完整通过的主框架基线：5b93e73 / 37692576724、e4d8cf5 / 37690013428、6fa1088 / 37684887284。更早失败与修复记录保存在 Git 历史，不覆盖后来提交的验收。
- CSS 593cebd / CI 37688602400：最近只剩 performance (templates) 未结束，其 job 为 113022729179，仍显示运行 .github/actions/setup，未开始基准。其余功能、类型、三浏览器、生命周期、元框架等任务已通过。
- 该运行仍活跃；下载未完成 job 的日志返回 BlobNotFound，不是程序失败证据。没有取消/重启它，也没有跳过发布门禁。
- 本轮框架新 API 尚未发布到 npm；框架源码包版本仍 1.0.0-rc.7，注册表现有 rc.7 不包含全部源码新能力。不得覆盖已发布版本或提升 latest。

## CSS 0.3.1 候选与待应用测试

CSS 修复核对 authorInputs 的底层 name 数据值，拒绝将改名或 getter 作者套用系统属性优化，正常扩展关键字仍可绑定。修复前两个用例失败，修复后构建、生成检查、六包类型/Vue/Svelte 检查、绑定焦点与 5 项 inline 用例通过。

固定候选位于相邻 CSS 仓库 test-results/release，manifest.json 记录提交 593cebd、六个 tgz 的 SHA512。zerodep-css-0.3.1.tgz 已用于主框架工作区外独立消费，验证真实 opacity 层叠和更新、声明、组件库、CSR/SSR、接管、表单、卸载。

主框架新增的两处消费用例保存于 [.design/pending-css-0.3.1-consumer.patch](../.design/pending-css-0.3.1-consumer.patch)，尚未应用到当前分支。它包含 scripts/verify-packages.mjs 和 tests/consumer/src/App.tsx 的已验证修改；不能在旧 0.3.0 依赖下启用。补丁已验证可以应用，避免遗留必须等待新依赖的脏工作区。

## 恢复交付顺序

1. 在 CSS 仓库核对 CI 37688602400 的同一提交完整成功。若仍运行就保留；若终止失败，先读日志定位再修复或重跑失败任务，不能凭等待时长重启。
2. 核对 CSS main 干净、HEAD 与 origin/main 为 593cebd，manifest.commit 和 tgz 摘要相符。随后执行 pnpm release:publish（默认 next），不重新构造另一批包。缺少本机候选时需从相同源码重新构建、打包并验证新的固定产物，不能冒充旧摘要已验收。
3. 核对六包注册表版本、dist.integrity 与 next。原有五包 latest 应保持 0.2.0，compiler 的 latest 保持 0.3.0；不自动提升 latest。
4. 回主框架，将 catalog 的 zerodep-css 固定为 0.3.1，并将 core 的 CSS peer 下限改为 ^0.3.1。应用补丁：git apply --check .design/pending-css-0.3.1-consumer.patch，确认后 git apply 同一路径。
5. 安装并检查 lockfile，只接受所需 CSS 变更。若 pnpm 丢掉未变 SDK 的 SHA512，应从可信 HEAD 恢复这些完整性字段，再 frozen 安装；不能删摘要绕过验证。
6. 按最新约定，本地只检查依赖差异和相关焦点；pnpm check、pnpm build、完整独立消费和平台/浏览器交新提交 CI。提交时删除已经应用的补丁，避免维护两份用例。
7. 主框架发布另按 docs/releasing.md 准备新的候选版本，等待同提交完整门禁，发布固定 tgz 到 next 并干净安装复验；当前源码版本不能再次上传覆盖 rc.7。

## 安装、清理与验证注意事项

- 当前 JetBrains SDK 主包和平台包都来自原始 GitHub 发行地址。独立消费者需合并根级平台 overrides；只安装主包 URL 不保证平台二进制可用。完整说明见 environment-setup.md、packages.md。
- 换机/IDE 操作只按 environment-setup.md 指定 SDK 与 EAP 构建。语言协议测试通过不代表当前桌面 MCP 或所有 IDE 构建已重新加载。
- 已清理本任务浏览器截图、trace、日志和临时开发目录；检查过 121 个 docs/.design 相对文件链接及 44 个源码目录，无缺失目标或空目录。
- CSS 发布目录的六个本任务旧 0.3.0 tgz 已逐个比对 npm SHA512 后删除，可从 npm 恢复；0.3.1 固定候选保留。更早的发布归档、用户 IDE 数据和共享 pnpm store 未动。
- Windows 仅按核对后的准确路径逐文件/链接删除，再删除空目录，不递归删除、不遍历链接、不动根 .git。只清理本任务进程与产物。
- 本地优先焦点测试，不重复运行已通过且未受影响的全集。LSP 探针会创建临时源码，不能与同工作区 check/build 并行。
- 延长窗口已再次核对源码目录无空目录、临时 props 类型配置已删除、待应用 CSS 补丁仍可应用。README、开发、工具链和换机指南明确完整检查由 CI 执行；开发指南的 WebStorm 入口已与原生预览/类型引擎配置保持一致。
- 08:17 再次核对 CSS 六个 0.3.1 tgz 的 SHA-512 全部匹配提交 593cebd 的 manifest；原候选保留，未重新打包或发布。两仓库工作区干净，新增框架提交已推送。
