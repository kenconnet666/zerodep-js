# zerodep-js

面向 TSX 的细粒度响应式框架实验工作区，目标是显式声明响应式变量、直接读写、组件参数解构和自然的默认值。

当前已开始完整生产化目标：变量式状态、组件 props、JSX DOM、稳定 key 列表、context、错误恢复和 Vite 插件已接入真实 CSR 示例。完整表单行为、SSR/hydration、开发体验和发布验收仍在建设中，尚未达到生产验收。

## 工作区

| 子项目              | 当前职责                                                  |
| ------------------- | --------------------------------------------------------- |
| `packages/core`     | 状态、组件、DOM、生命周期、JSX 类型与内部 helper          |
| `packages/compiler` | 变量宏、组件参数和 JSX 编译，源码映射与绑定诊断           |
| `packages/vite`     | Vite 8 接入，保持源码映射并展示编译诊断                   |
| `packages/ssr`      | 文档模板组合和 SSR/CSR 模式分发                           |
| `apps/example`      | 真实 workspace 消费项目，包含客户端、服务端和模式切换入口 |

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

`pnpm dev` 同时监听各库和示例。体验已实现的框架组件可使用 `pnpm dev:csr`；`pnpm dev:ssr` 查看服务端工程入口。这两个命令先构建库，再启动示例服务。

生产入口：

```sh
pnpm build
pnpm preview
pnpm preview --render-mode csr
```

生产服务默认端口 4173，可附加 `--port 4200`。默认渲染模式仍可被 query 覆盖。服务端入口来自 `dist/server`，静态资源来自 `dist/client`，生产分支不启动 Vite。

## 当前示例的边界

CSR 已运行 [App.tsx](apps/example/src/App.tsx)，包含状态、props、输入、条件、key、ref、CSS 变量和 SVG；[examples](apps/example/src/examples) 另有带状态列表、context 和错误恢复用例。它通过 workspace 包产物和真实 Vite 插件消费框架。

SSR 暂时保留 `view.ts` 文档工程探针，在禁用 JavaScript 时仍可阅读；其原生事件接入不是通用 hydration。接下来会用同一 App 的真正 SSR + hydrate 替换此过渡入口。

## 已可使用的组件形态

```tsx
import { component, $state, $derived } from '@zerodep-js/core';

export const Counter = component(({ step = 1 }: { step?: number }) => {
  let count = $state(0);
  const doubled = $derived(count * 2);
  return (
    <button
      onClick={() => {
        count += step;
      }}
    >
      {count} / {doubled}
    </button>
  );
});
```

Vite 使用 `@zerodep-js/vite` 的 `zerodep()` 插件。TS 配置保持 `jsx: "preserve"`，并设置 `jsxImportSource: "@zerodep-js/core"`。客户端通过 `mount(App, { target, props })` 挂载，返回的函数负责卸载。未经过编译的宏会明确报错。

## 验证命令

```sh
pnpm check
pnpm test
pnpm test:e2e
pnpm format:check
```

- `pnpm check`：构建库的声明，再检查子项目、工具配置和 Oxlint。
- `pnpm test`：响应式、props、编译器和 SSR 文档基础设施的 Node 用例；JSX 类型正反例由 `pnpm check` 检查。
- `pnpm test:watch`：单元测试监听。
- `pnpm test:coverage`：V8 覆盖率；当前不将其作为框架完成度指标。
- `pnpm test:e2e`：构建后运行 Chromium、Firefox、WebKit。
- `pnpm test:e2e:chromium`：只运行 Chromium。
- `pnpm browsers:install`：安装测试所需浏览器。

Playwright 使用独立的 4175 端口，测试完成后关闭服务。失败时将 trace 和截图保存到被 Git 忽略的 `test-results`。基础 CI 在 push 和 pull request 时运行这些检查。

## Babel 与语言服务

根 `babel.config.mjs` 用于独立工具链探针；实际框架转换由 `packages/compiler` 执行，并经 `packages/vite` 接入应用。TS7 负责原始 TSX 的类型检查、编辑提示与声明生成；框架专有语义错误由编译器报告。

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
