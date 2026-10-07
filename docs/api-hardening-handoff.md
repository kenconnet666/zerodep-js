# 基础 API 持续交接

更新：2026-10-08。这是进行中的检查点，目标仍在执行，不能当作发布验收。

## 授权、预算与工作区

- 按 [主计划](production-plan.md) 自主完善基础 API、CSS 协作和真实缺陷，可为简单维护适当调整 API。组件只是测试夹具，不建立组件库。
- 周额度启动时剩余 17%，最近读数剩余 10%（已用 90%）；账户余额读数 61,804.0163505000。额度共享，无法精确归因；用户只授权少量余额用于最终整理交接，不用它继续扩展，不购买或重置。
- 主仓库当前目录，分支 codex/webstorm-ts71-integration；本轮起点 057d8ab。CSS 相邻仓库 main，HEAD 964a4f6，本轮未修改 CSS 源码。
- 固定 JetBrains TS7.1.0-dev.jetbrains.20261006.2、Babel、Vite；CSS 消费 npm 0.3.0，CSS 仓库自己的 TS6 不进入框架依赖图。
- 每个可审阅阶段中文提交推送。完整平台/浏览器/独立消费交 CI，本地只做受影响检查；下次推送前核对前轮 CI，修复真实失败，不空等或反复轮询。
- Windows 清理逐文件/链接后再删空目录，不递归删除、不遍历链接、不动共享 pnpm store、用户运行数据或根 .git。

## 已完成实现与契约

| 范围       | 当前实现                                                                                                                                              | 入口与重点回归                                            |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| 任务       | _task(loader,{initial}) 保存成功初值，不发请求、不制造 retry 输入；reset 清空数据/错误/重试输入，取消等待且不覆盖 abort 重入的新任务；cancel 保留数据 | [任务](tasks.md)，use/test/task.test.ts                   |
| CSS        | 支持显式 class 前的 spread；命名 css 自动跟踪；直接变量保守绑定；_createCssContext 复用 context，保留作者类型、嵌套覆盖和请求隔离                     | [CSS](css.md)，compiler CSS、core/SSR context、CssExample |
| details    | bind:open 布尔写回；data-zj-open 验证 SSR 原值并接纳接管前操作；toggle 下一任务校准，卸载取消 timer                                                   | [表单](forms.md)，disclosure 编译/SSR/浏览器测试          |
| 分组       | bind:group 的 radio 字符串、checkbox 字符串数组；静态 type 和明确 value 位于 spread 后；写回声明值，保留隐藏选项，不建立全局分组表                    | group 编译/类型投影/SSR/浏览器测试                        |
| output     | 受控纯文本 TextRenderable，不放结构注释；form.reset 后重新取得实际 Text；富内容使用普通容器                                                           | [表单](forms.md)，WebKit reset、接管前 reset、负面类型    |
| 数组       | sort 用户回调恢复依赖跟踪，机械读取不形成循环；跨 realm 普通数组可响应，Array 子类保持实例/私有字段                                                   | core state/reactivity 测试                                |
| 快照       | 普通对象/数组先于显示标签识别；Map/Set 用内建槽识别，不被 Symbol.toStringTag 误导；其他平台对象仍交 structuredClone                                   | core snapshot 测试，共享 objects.ts 原型判断              |
| 页面元信息 | 可选 zerodep-js/head 的 _head，只支持 title/description；同步纯读取、按字段覆盖、释放恢复、按 Document 隔离；SSR 按根收集                             | [元信息](head.md)，core/SSR head、HeadExample、独立消费   |
| SSR 入口   | _render 返回 {html,head}，renderToString 保持字符串；renderDocument 一次替换标记并安全输出；示例三个入口共用 CSS 宿主，客户端恢复清单                 | ssr document 测试与独立包消费                             |

类型、LSP、完整浏览器测试均进入已有 CI，没有降低断言或添加重试掩盖失败。生成 JSX 类型用 native:generate 维护，不能手工修改生成文件。

## 提交与 CI 证据

| 提交                      | CI          | 结果与修复关系                                                                                                                     |
| ------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1f0aa82（含任务 4445436） | 37656625476 | 完整通过；早期 GitHub 500 推送故障已恢复                                                                                           |
| 1612e3f                   | 37658548791 | 三浏览器暴露 details toggle 微任务校准过早，后续改下一任务                                                                         |
| c26fa40                   | 37661954118 | WebKit 暴露 form.reset 重建 output 文本，随后落实纯文本契约                                                                        |
| 4284d8c                   | 37671752512 | 旧 reference SSR 断言仍要求 output 注释，更新为严格纯文本协议                                                                      |
| 671b5de（含快照 94f5909） | 37673784740 | 完整通过                                                                                                                           |
| 4a21fe2                   | 37678372596 | 后续推送取消了未结束的 Chromium 安装步骤（尚未开始 E2E）；其余两浏览器、六平台、Linux/Windows 消费及 verify 通过，不能记为完整通过 |
| 8b431ed                   | 37680292167 | 任务/getter、分组稀疏数组与历史生命周期修复已推送，完整结果待核对                                                                  |

运行链接格式：https://github.com/kenconnet666/zerodep-js/actions/runs/运行编号 。以 GitHub 实际结果为准，后续修改不能沿用旧提交的验收结论。

## 本次继续修复（随本检查点提交）

- 任务 initial 的原型 getter 与普通属性一致，状态为 success，初值只读取一次。
- checkbox 模型先读取一次再验证，拒绝稀疏数组，避免 getter 在校验和写回时提供不同数据。
- 历史 read/write 可触发 dispose/卸载；外层操作随后返回 false，不恢复记录。拒绝同一句柄重入修改，try/finally 保证异常后仍可操作。
- 新回归先失败再修复：任务/绑定相关 24 项、历史 11 项、TS7 工具/测试源检查和 lint 均通过。完整矩阵交本阶段 CI。
- 持久化回调中 stop/卸载现在终止外层恢复/读写，不重新连接；正常外部停止仍最终提交，回调内停止直接清理，避免递归提交。7 个停止位置先复现失败后修复；补充监听释放、错误回调、最终提交及 reset 重入，31 项存储测试、TS7 工具检查和 lint 通过。

## 同步契约与格式门禁

- 8b431ed 和 784cd1b 的 verify 被交接文档表格格式挡住，后续按统一 formatter 修正；这是文档格式问题，完整 verify 仍需新提交运行，不能以焦点通过替代。
- effect、历史 write、parseSearch 和存储 migrate 的失败 Promise 已复现额外未处理拒绝。现复用内部 synchronous 检查，仍同步报契约错误，同时消费无主拒绝；页面元信息也复用此检查，不增加异步 API。
- 相关 5 个文件 76 项测试、TS7 工具检查、lint 与改动文件格式检查通过。框架新增内部导出同步供 use 包使用，独立包消费继续交 CI。

## 继续工作

- 后续源码已补齐同步清理检查（注册清理、effect 清理和执行中卸载三种路径），32 项响应式/生命周期测试通过。
- DOM ref 在调用中卸载自己的根时立即释放返回的资源；误传 async ref 同步诊断并消费拒绝。真实 Chromium CSR/SSR 两项新增用例在修复前失败（有效作用域报错），修复后通过。应用构建、TS7 工具检查和 lint 通过，三浏览器全量交 CI。
- 0838cd3 的 CI 37681272108 已确认 verify、六个平台与 Windows 消费通过；Linux 消费及三浏览器仍运行。文档格式门禁已恢复，未宣称完整通过。
- 主计划新增 API 表已更新为实际契约与源码状态，不再把已落地功能写成待选候选。测试失败截图/trace 在成功重跑后由测试工具清理，本地剩余 .last-run.json 和空 test-results 目录一并移除。

1. 先查 Git 状态和最新 CI；4a21fe2 的 Chromium 因新推送取消安装，最新提交必须重新覆盖它。
2. 继续基础 API 生命周期/错误路径、SSR/CSS/类型消费的有价值审计；不要为用完额度凑重复测试或引入成品组件。
3. 后续继续审计组件/引用失败的错误保留、类型提示与组合使用。避免用复杂泛型包装所有同步函数，仅为实际问题补充约束。
4. 接近周额度耗尽时停止开启大改动，整理准确提交、CI、未完成验证和恢复命令。余额只少量用于交接。

## 发布与恢复

- 本轮框架基础 API 尚未作为新 npm 版本发布；源码包版本仍 1.0.0-rc.7。不得声称现有注册表已包含这些改动。
- CSS 0.3.0 六包 next 已发布验证；既有五包 latest 仍为 0.2.0。新 compiler 首次发布由 npm 自动创建 latest=0.3.0，删除返回 403，已在 CSS 发布记录说明；本轮不重新发布它们。
- 发布前按 [发布流程](releasing.md) 完成同提交全门禁和干净消费，不能把 pending 当通过，未经授权不提升 latest。
- 换机按 [环境配置](environment-setup.md)，不是重新选 TS 版本。SDK 安装后若 lockfile 被 pnpm 重写，必须保留并核对原 SHA512，不删摘要绕过检查。
- 常用焦点命令：pnpm test 后跟受影响测试路径；pnpm exec tsc -p tsconfig.tools.json --noEmit；pnpm lint。完整构建/三浏览器/六平台/包消费在 CI。
