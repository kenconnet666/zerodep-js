# UI 按钮与 Flex 交接

分支 main；工作目录以当前 checkout 为准，不照抄其他机器路径。先读 AGENTS.md，再检查 git status、HEAD 和对应 CI；旧发行版和旧交接快照不能代表当前源码。2026-10-10 的 CI 修复和后续审计见 [审计记录](audit-2026-10-10.md)。

## 后续 Grid（2026-10-09）

- 新增 layout/Grid.tsx 与 GridDemo，根导出扩至 47 项。普通网格支持 CSS 轨道/自动填充/跨格；attached 用明确数字列数、零间距、按行单格处理二维接缝与末行不满的阶梯外轮廓。无新增依赖、测量观察器或断点系统。
- 稳定 API 见 [Grid](grid.md)。类型与 SSR 用例在 grid-types.tsx、grid.test.ts，CSR/SSR 浏览器矩阵在 tests/e2e/grid.spec.ts；不沿用前一轮按钮的 CI 作为 Grid 验收。
- 本地通过 Grid SSR 4 项（连同 Flex/按钮回归共 11 项）、Chromium CSR/SSR 6 项（含 80 组列数/项数圆角组合）、UI/docs 构建、类型正反例、4 项补全、47 个根导出检查和相关 lint/格式。新提交的完整矩阵仍以当前 HEAD 工程 CI 为准。
- 上一提交 2b525c3 的完整 CI 37951272868 已成功。

## 本轮结果

- 已实现 Button、IconButton、ToggleButton、LinkButton、Flex。MenuButton 明确暂不做；不保留 Group 名称或各类专用 Group。
- 原生按钮采用 disabled || loading；标签、图标与名称在加载切换时保留。LinkButton 使用 HTML a，禁用/加载时实际移除 href，恢复使用最新值。
- ToggleButton 只使用受控 pressed/onPressedChange，支持 bind:pressed，父级可拒绝更新。图标模式要求可访问名称。
- Flex 普通模式负责布局；attached 用逻辑圆角和边框重叠处理直接兼容控件，支持横纵、RTL、writing-mode、hidden 和列表重排，保留独立 Tab 顺序。
- 所有 size 为 CSS 字号，专用尺寸用 em。通用 token 在 CSS，按钮样式/内容复用在 UI internal。独立 slotXxx 不变；不新增统一 slotProps。
- UI 保持 private，没有 npm 发布。公开契约集中在 [按钮与 Flex](buttons.md)，基础组件和测量见 [UI 说明](../packages/ui/README.md)，框架实施范围见 [生产主计划](production-plan.md)。

## 提交与验证

- 2356741：修复 core 组件绑定类型中 Omit 丢失 ARIA 模板索引下必填成员的问题，改用保留成员的键重映射；没有新增 core API，也没有修改官方 SDK。单独的类型正反例保留在 packages/core/test/component-bindings-types.ts。
- 221c1ee：四类按钮、Flex、示例、自动入口和相关检查。[CI 37950171226](https://github.com/kenconnet666/zerodep-js/actions/runs/37950171226) 的三浏览器、六平台和 Linux/Windows 独立消费通过；verify 发现类型反例指令位置与打包测试返回类型未收窄，后续已修复并通过相关类型检查和消费测试。该次失败不记录为完整通过。
- 最终验收查看 [main 工程 CI](https://github.com/kenconnet666/zerodep-js/actions/workflows/ci.yml?query=branch%3Amain) 对应 HEAD 的完整任务；不要误用同提交的“发布 npm 候选”skipped 状态。交接文档不把排队/进行中的运行记录为成功。
- 本地已通过：UI 与 docs CSR/SSR 构建；新增按钮/Flex SSR 与消费测试 7 项、既有 Icon 6 项、基础组件 4 项；Chromium 按钮/Flex 与基础组件 CSR/SSR 8 项；类型正反例；绑定编译 6 项；按钮属性补全 6 项；45 个 UI 导出一致性；原生生成一致性、相关类型感知 lint 与格式检查。
- 单独消费 Button 只带入 Search 和 Spinner 的 LoaderCircle；单独消费 Icon 保持原来的单图标断言。
- NVDA/VoiceOver 的人工体验不在上述自动化验证中，不声称完整辅助技术认证。

## 维护入口与边界

- packages/ui/src/base：四类按钮及 Icon/Text/Ripple/Spinner/ButtonBase。
- packages/ui/src/layout/Flex.tsx：布局、attached 参数验证与 CSS 连接规则。
- packages/ui/src/internal：按钮私有外观、内容布局、复用类型；不从根导出。
- packages/ui/src/utils：事件/槽/按压/测量，所有有资源的工具必须清理。
- scripts/generate-ui-exports.mjs 扫描 base/utils/layout，Provider 使用明确白名单。只有 src/index.ts，一个公开入口。
- 测试：packages/ui/test、tests/e2e/buttons.spec.ts；文档示例：ButtonDemo.tsx。

LinkButton 的内部 HTML 锚点薄层用于明确 HTMLAnchorElement 事件/ref；JSX 原生 a 同时覆盖 HTML/SVG/MathML，直接求巨型联合的 Omit 会失去精度或超出 TS7 展开限制。薄层原样传递活跃 props，不增加 DOM wrapper、不做 any 断言。

Flex 的相连样式只保证兼容直接控件；CSS display:none、任意 wrapper、不同字号/边框厚度和强制圆角覆盖不在默认整齐连接承诺内。启用时提示非法内容，不为布局安装持续 DOM/尺寸观察器。Flex 不承担单选、多选或 Toolbar 键盘协议。

## 当前工程与 IDE 基线

Node 24.18.0、pnpm 10.34.5、微软官方 TypeScript 7.1.0-dev.20261008.1，ES2025。WebStorm EAP 使用同版本原生服务与既有 ts-go-proxy 适配；保留 React 插件以支持通用 JSX，不接入 LSP4IJ 框架服务，不修改 bind:checked 等冒号 API。具体操作只看 [环境配置](environment-setup.md)。

CSS 只维护本仓库 packages/css；packages/use 与独立 packages/vite 已删除，Vite 从 compiler/vite 导出。core 的上下文、快照、Portal 保留。SSR CSS 标签仍由应用拼接。

Playwright 输出只能使用 test-results/e2e。历史旧配置曾清理 IDE 备份目录，之后仅恢复过可核对的 ide.general.recovered-session-snapshot.xml 与 recovery-note.txt；不能声称原备份逐字节恢复。这些文件和其他 IDE/用户数据不属于本轮清理目标。

## 接续方式

本地只运行改动相关检查，完整矩阵交 CI。语言补全探针会临时写源码，不与同一工作区的应用 check/build 并行。先看当前提交 CI，再开始新阶段；按用户的新任务继续，不自动启动 MenuButton、发布或新的框架 API。

已失效的按钮规划稿和重复旧交接由本文件与稳定 API 文档替代；环境配置、发布恢复证据及有价值的研究文档保留在各自入口。新提交的完整 CI 必须按该提交核对，不能借用上一次绿灯。
