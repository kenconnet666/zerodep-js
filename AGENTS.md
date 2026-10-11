# zerodep-js 协作约定

- 在当前主目录工作，仅用户明确要求时创建工作树；保留用户改动、IDE 配置与运行数据。
- 只维护 AGENTS.md 和用于 GitHub/npm 介绍的 README；不恢复 docs/.design/.agent 或其他 Markdown 文档，不为每轮变更新建计划、交接或验收汇总。API 细节以源码类型和示例为准，历史查 Git。
- 独立标准 TSX 细粒度框架，只维护本仓库 core/css/compiler/ui。相邻框架仅作研究，不恢复外部适配或已删除的 use/vite/ssr 包。
- 简洁可维护、方便使用、准确类型提示优先。新 API 从实际业务讨论；不为对应 Svelte/Solid 名称扩大功能，不增加无必要抽象、后台、缓存或兼容层。
- 保留显式 _state/_derived、普通变量读写与 props 参数解构/default/rest 直接响应，无 .value；普通函数、局部解构和 return 遵循 JS 取值。保留 bind、生命周期、列表身份、SSR/接管及真实回归断言。
- CSS 使用 useCss + 同步 css 回调、真实链式方法、bx、select；系统关键字保留原值，主题 token 交给主题变量机制，安全值才元素变量化。class 数组合成单类；无复用的样式直接写模板 class。
- UI 保持 private；Button 直接渲染 button，纯图标用 icon，ToggleButton 复用，LinkButton 保留 a。无 ButtonBase/IconButton、共享外观模块或任意根注入。其他组件/API 按实际需求讨论。
- 各包只公开 src/index.ts 根入口；CSS 用 generated/runtime/util，compiler 用 transform/checking/language/tooling，core 的 SSR 在 ssr、JSX 在 native、协议在 runtime；UI 无 internal/子目录 index.ts，根导出由 generate 维护。
- 顶层框架函数单下划线声明并直接导出；UI 消费入口沿用 useCss/useLang/useLocale。中文注释解释语义、原因和所有权；多互斥模式可用 switch，不机械替换清楚的 if。
- 使用 Node 24、固定 pnpm、catalog 精确固定的微软官方 TS7.1 夜间版本和 ES2025；不降级 TS6、不维护多版本或 SDK 补丁，不添加其他锁文件或默认 polyfill。
- 各项目自己的 package.json 分别维护检查、编译、声明、客户端、服务端和测试；根只留仓库工具、跨包验收与发布。CI 显式安排依赖，类型感知 lint 在声明构建后执行。
- **先看脚本范围与耗时。本地只查修改相关文件的 LSP 错误、做必要的局部短测试，通过即可提交推送继续。完整类型检查、构建、长测试、浏览器、稳定性、独立消费与全量 LSP 都交 CI。**
- 每个可审阅阶段中文提交并推送；推送前核对上一轮 CI 并定点修复失败，推送后不空等或反复轮询。pending 不记为通过，不靠减少行为覆盖或放宽断言提速。
- WebStorm 选择项目 SDK，保留语言服务和 JSX 编辑支持，关闭服务驱动类型引擎；不恢复旧代理补丁/LSP4IJ。项目 MCP 名为 zerodep_js_lsp，不改全局或其他项目设置；安装、进程和实际 IDE 行为分别报告。
- 换机保留已跟踪的 .codex/config.example.toml；完成框架包构建后运行 compiler 的 lsp:setup，生成本机 .codex/config.toml。生成配置与旧 .codex/lsp4ij 均不提交，不把个人全局设置或凭据复制进仓库。
- 发布清单在 scripts/package-list.mjs，只有 core/compiler/css；prepare 改版本，pack 只打包已有产物，不自动构建。缺少入口拒绝登记，恢复时核对 release.json 的提交、版本和摘要。
- 发布复用同一提交完整 CI 通过的固定 tgz 与摘要，已有 next 授权不包含自动提升 latest；凭据只走环境变量。
- Windows 清理先核对绝对目标，逐文件删除、不跟随链接，再移除空目录。不碰共享 store、其他工作区、根 .git、用户配置与应用数据，只停止本任务进程。保留许可证及第三方声明。
