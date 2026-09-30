# zerodep-js 协作约定

## 当前范围

- 这是独立的 TSX 细粒度响应式框架项目，不能混入 zerodep-css、zerodep-svelte-ui 或其他框架项目的 API 决定。
- 用户已选择显式声明的变量式响应式，不使用 `.value`；其他设计见 `.design`，文档中的候选方案不是已批准 API。
- 当前提供 core 空入口、SSR/CSR 文档基础设施、Vite 8 示例、工具链与 LSP。响应式、JSX 编译和通用 hydration 仍需先讨论清楚。
- `packages/ssr` 负责服务端适配，`apps/example` 通过 `workspace:*` 使用 core 与 ssr。不引入 React 或其他框架作为临时运行时；原生 DOM 工程探针也不能冒充框架实现。
- `packages/core` 预留核心实现；按确定的职责增加其他包，不提前创建无用途的抽象层或空包。

## 工具与质量

- 使用 Node 24、package.json 固定的 pnpm 和 TypeScript 7。共享版本放在 catalog，包间依赖使用 `workspace:*`，不添加 npm/yarn 锁文件或旧版 TypeScript 兼容层。
- 保持简洁、可维护的结构，优先原生语言能力；注释解释不明显的原因和生命周期责任。
- 配置变更运行 `pnpm check`、`pnpm build`；LSP 改动运行 `pnpm lsp:verify`。根据影响选择验证，不用空测试代表框架功能完成。
- Babel 8、Vitest 和 Playwright 已用于基础工具配置；具体框架编译仍待讨论。工具链用例放在 `tests/tooling`，浏览器用例放在 `tests/e2e`，核心业务用例以后放在 `packages/core/test`。
- `pnpm test` 运行 Node 单元测试；`pnpm test:e2e` 构建并运行三种浏览器的基础测试。不要把第三方工具接入测试或空 core 的覆盖率当作框架功能验收。
- 项目 LSP 使用独立服务 `zerodep_js_lsp`。通过 `pnpm lsp:setup` 生成本机配置，不改其他项目或全局 Codex 配置。
- 先完成独立 LSP 验证再请求用户重启。磁盘配置、独立服务和当前会话工具暴露要分别说明。
- 保留研究材料和用户 IDE 配置；清理本任务创建的临时文件与子进程，不碰共享 pnpm store 或其他工作区。
- Windows 整理包目录时先处理 pnpm 链接，不使用会遍历链接目标的目录移动操作。源码迁移和依赖重装分开进行。
