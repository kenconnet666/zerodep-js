# zerodep-js

面向 TSX 的细粒度响应式框架实验工作区，目标是显式声明响应式变量、直接读写、组件参数解构和自然的默认值。

当前已开始完整生产化目标：工程入口可切换 SSR/CSR，响应式图、派生缓存、effect 调度和作用域清理已实现并有语义用例。变量宏编译、组件 DOM 与通用 hydration 仍在建设中，尚未达到生产验收。

## 工作区

| 子项目          | 当前职责                                                  |
| --------------- | --------------------------------------------------------- |
| `packages/core` | 响应式图、派生与生命周期，后续接入变量宏和 DOM            |
| `packages/ssr`  | 文档模板组合和 SSR/CSR 模式分发                           |
| `apps/example`  | 真实 workspace 消费项目，包含客户端、服务端和模式切换入口 |

示例依赖包的构建产物，不使用指向源码的别名。原 `apps/playground` 已整理为 `apps/example`。

## 环境与安装

使用 Node 24.18.0、pnpm 10.34.5、TypeScript 7.0.2、Vite 8.3.1。共享依赖固定在 `pnpm-workspace.yaml` catalog。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

开发入口默认是 `http://127.0.0.1:5173/`，默认 SSR。页面链接或 query 可在同一个服务中切换：

- `/?render=ssr`：响应 HTML 已包含页面内容。
- `/?render=csr`：响应包含空应用容器，由客户端入口创建页面。

`pnpm dev` 同时监听 core、ssr 和示例。只开发示例且希望改变默认模式时，可使用 `pnpm dev:csr` 或 `pnpm dev:ssr`；这两个命令先构建库，再启动示例服务。

生产入口：

```sh
pnpm build
pnpm preview
pnpm preview --render-mode csr
```

生产服务默认端口 4173，可附加 `--port 4200`。默认渲染模式仍可被 query 覆盖。服务端入口来自 `dist/server`，静态资源来自 `dist/client`，生产分支不启动 Vite。

## 当前示例的边界

两个模式复用同一个页面定义。SSR 模式在禁用 JavaScript 时仍可阅读；客户端接入后启用计数按钮。CSR 模式在客户端创建页面。

这只是原生 DOM 工程探针。SSR 模式接入现有 DOM 的少量事件代码不是通用 hydration 实现，也没有调用尚不存在的 `$state` 或 `component`。后续会用框架 API 替换该探针。

## 验证命令

```sh
pnpm check
pnpm test
pnpm test:e2e
pnpm format:check
```

- `pnpm check`：构建库的声明，再检查子项目、工具配置和 Oxlint。
- `pnpm test`：Vitest Node 测试，包含 Babel 工具链和 SSR 文档基础设施。
- `pnpm test:watch`：单元测试监听。
- `pnpm test:coverage`：V8 覆盖率；当前不将其作为框架完成度指标。
- `pnpm test:e2e`：构建后运行 Chromium、Firefox、WebKit。
- `pnpm test:e2e:chromium`：只运行 Chromium。
- `pnpm browsers:install`：安装测试所需浏览器。

Playwright 使用独立的 4175 端口，测试完成后关闭服务。失败时将 trace 和截图保存到被 Git 忽略的 `test-results`。基础 CI 在 push 和 pull request 时运行这些检查。

## Babel 与语言服务

`babel.config.mjs` 配置 Babel 8 类型移除、JSX 保留和 source map。它还没有接入框架语义转换。TS7 负责类型检查与声明生成。

```sh
pnpm lsp:setup
pnpm lsp:verify
pnpm lsp:inspect packages/ssr/src/index.ts apps/example/src/entry-client.ts
```

项目独立 MCP 服务名为 `zerodep_js_lsp`，使用本工作区的 `tsc --lsp --stdio`。setup 按当前机器生成被忽略的 `.codex/config.toml`，不会写入用户级配置。请在 Codex 中信任本项目并重新打开，然后确认工具已经加载。

## 研究与状态

- [从基础工程到生产可用的主计划](docs/production-plan.md)
- [执行中的语义契约](docs/semantics.md)
- [目标执行记录](docs/execution.md)
- [第一阶段 API 评审用例](docs/api-review.md)
- [实现路线、代价与设计约束](docs/implementation-design.md)
- [TS7 与编译工具研究](.design/ts7-tsx-research.md)
- [TS7 类型实验](.design/ts7-tsx-probe-results.json)
- [基础工程交接](.design/foundation.md)
- [本轮工作区扩展范围](.design/workspace-expansion.md)

所有包暂为 private，未发布到 npm。仓库公开用于开发与评审；生产发布、许可证和版本承诺将在后续阶段确定。
