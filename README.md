# zerodep-js

面向 TSX 的细粒度响应式框架，使用显式声明的响应式变量、直接读写、组件参数解构和自然的默认值。

`1.0.0-rc.2` 的七个包已发布，完整 CI 与 npm 精确版本安装验收通过。包含变量式状态、组件、表单、SSR/hydration、快照、生命周期、路由、浏览器持久化及 Vue/React/Svelte 页面宿主；当前仍是发布候选，尚未发布稳定 1.0.0。

使用指南从[开始使用](docs/getting-started.md)和[API 参考](docs/api.md)进入。基础包为 `zerodep-js`、`zerodep-js-compiler`、`zerodep-js-vite`、`zerodep-js-ssr`，另有 Vue、React、Svelte 三个可选页面宿主包；当前发布状态见 [CHANGELOG](CHANGELOG.md)，支持范围见 [support.md](docs/support.md)。

当前 main 已准备统一的 `1.0.0-rc.3` 拆包候选：路由和持久化移到独立 `zerodep-use/router`、`zerodep-use/storage`，core 的旧入口直接移除。拆包版本尚未发布，使用当前源码时通过工作区或本地 tgz 安装；迁移与验收见 [zerodep-use 拆包](docs/use-extraction.md)。RC2 的原始 npm 产物保持不变。

当前源码另提供 `zerodep-js-native` 及 Windows/Linux/macOS 的 x64/ARM64 平台包，与 Babel 后端共用运行时。原生 CLI 在一次 TS7 编译中完成检查、JS、声明和映射；Vite 使用 `zerodep({ compiler: 'native' })` 选择。平台包与 RC3 尚未发布，构建、测试和性能结果见[原生实施记录](docs/native-compiler-implementation.md)。

项目框架代码使用 [MIT License](LICENSE)，原生包所含 TypeScript 上游使用 Apache-2.0，许可随平台包提供。贡献方式见 [CONTRIBUTING](CONTRIBUTING.md)。

RC2 直接使用 `_state`、`_derived`、`_component`、`_effect` 等公开函数名，实现与入口名称一致，不保留旧名或导出重命名中转。下面的示例安装时统一指定 `1.0.0-rc.2`。[Vue、React、Svelte 页面宿主](docs/page-hosts.md)提供三个独立适配包。

## 工作区

| 子项目                              | 当前职责                                                  |
| ----------------------------------- | --------------------------------------------------------- |
| `packages/core`                     | 状态、组件、DOM、生命周期、JSX 类型与内部 helper          |
| `packages/use`                      | 可选的路由与浏览器持久化，通过 peer 共享 core             |
| `packages/compiler`                 | 变量宏、组件参数和 JSX 编译，源码映射与绑定诊断           |
| `packages/vite`                     | Vite 8 接入，保持源码映射并展示编译诊断                   |
| `packages/ssr`                      | 请求内组件渲染、HTML 转义、数据编码与文档模板组合         |
| `packages/vue` / `react` / `svelte` | 连接各宿主生命周期与独立页面入口，按需安装                |
| `apps/example`                      | 真实 workspace 消费项目，包含客户端、服务端和模式切换入口 |
| `apps/hosts`                        | 三宿主复用同一 TSX 页面，验证宿主 SSR 与 CSR              |

示例依赖包的构建产物，不使用指向源码的别名。原 `apps/playground` 已整理为 `apps/example`。

## 环境与安装

使用 Node 24.18.0、pnpm 10.34.5、TypeScript 7.1.0-dev.20261005.1、Vite 8.3.1。共享依赖固定在 `pnpm-workspace.yaml` catalog。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

开发入口默认是 `http://127.0.0.1:5173/`，默认 SSR。页面链接或 query 可在同一个服务中切换：

- `/?render=ssr`：响应 HTML 已包含页面内容。
- `/?render=csr`：响应包含空应用容器，由客户端入口创建页面。

`/tasks` 是带持久化数据的任务工作台，验证搜索、编辑、并发冲突和异步清理；同样支持 `?render=csr` / `?render=ssr`。日常数据保存在被 Git 忽略的 `apps/example/.data`，浏览器测试使用独立内存数据库。操作与支持边界见[业务试点](docs/pilot.md)。

RC2 提供快照、挂载/取消生命周期、[浏览器持久化](docs/storage.md)和[路由](docs/routing.md)。`/workspace/tasks?render=ssr` / `?render=csr` 是使用相同任务数据的路由应用，包含嵌套布局、详情编辑、草稿、离开确认与偏好页；`/workspace?render=csr&history=hash#/workspace/tasks` 验证 hash 导航。

`pnpm dev` 同时监听各库和示例；`pnpm dev:csr` 与 `pnpm dev:ssr` 分别启动两种默认模式。这两个命令先构建库，再启动示例服务。

生产入口：

```sh
pnpm build
pnpm preview
pnpm preview --render-mode csr
```

生产服务默认端口 4173，可附加 `--port 4200`。默认渲染模式仍可被 query 覆盖。服务端入口来自 `dist/server`，静态资源来自 `dist/client`，生产分支不启动 Vite。

## 当前示例的边界

两种模式都运行 [App.tsx](apps/example/src/App.tsx)，包含状态、props、输入、条件、key、ref、CSS 变量和 SVG；[examples](apps/example/src/examples) 另有列表、context、错误恢复和原生序列化用例。它通过 workspace 包产物和真实 Vite 插件消费框架。

SSR 在服务端生成组件 HTML，浏览器通过 _hydrate 认领原节点、建立绑定和监听器；禁用 JavaScript 仍可阅读。旧的 view.ts 探针已删除。默认严格报告不匹配，示例可用 `?render=ssr&recover=replace` 显式选择重建。具体边界见 [SSR 与 hydration](docs/ssr-and-hydration.md)。

## 已可使用的组件形态

```tsx
import { _component, _state, _derived } from 'zerodep-js';

export const Counter = _component(({ step = 1 }: { step?: number }) => {
  let count = _state(0);
  const doubled = _derived(count * 2);
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

Vite 使用 `zerodep-js-vite` 的 `zerodep()` 插件。TS 配置保持 `jsx: "preserve"`，并设置 `jsxImportSource: "zerodep-js"`。客户端通过 `_mount(App, { target, props })` 挂载，返回的函数负责卸载。未经过编译的宏会明确报错。

## 验证命令

```sh
pnpm check
pnpm test
pnpm test:e2e
pnpm format:check
```

- `pnpm check`：构建库的声明，再检查子项目、工具配置、示例框架语义和 Oxlint。
- `pnpm check:framework`：使用已构建的编译器独立检查示例框架语义。
- `pnpm test`：先准备包产物，再运行响应式、编译器和组件 SSR 用例；JSX 类型正反例由 `pnpm check` 检查。
- `pnpm test:watch`：单元测试监听。
- `pnpm test:coverage`：V8 覆盖率；当前不将其作为框架完成度指标。
- `pnpm test:e2e`：构建后运行 Chromium、Firefox、WebKit。
- `pnpm test:e2e:chromium`：只运行 Chromium。
- `pnpm test:dev`：实际 Vite 热更新、错误恢复、作用域清理与 SSR 模块更新。
- `pnpm test:packages`：打包后在工作区外安装，验证声明、预编译组件库、CSR/SSR、接管和按需打包。
- `pnpm test:stability`：独立 Node 进程验证反复销毁、临时字段回收、清理失败和 SSR 请求隔离；可用 `--iterations 5000` 指定轮数。
- `pnpm native:generate` / `pnpm native:check`：生成或核对原生属性类型与 SVG 别名，保留人工语义修正。
- `pnpm browsers:install`：安装测试所需浏览器。

Playwright 使用独立的 4175 端口，测试完成后关闭服务。失败时将 trace 和截图保存到被 Git 忽略的 `test-results`。基础 CI 在 push 和 pull request 时运行这些检查。

## Babel 与语言服务

根 `babel.config.mjs` 用于独立工具链探针；实际框架转换由 `packages/compiler` 执行，并经 `packages/vite` 接入应用。TS7 负责原始 TSX 的类型检查、编辑提示与声明生成；框架专有语义错误由编译器报告，独立入口为 `zerodep-check`。安全收窄写法、错误码、热更新行为见 [开发指南](docs/development.md)。

```sh
pnpm lsp:setup
pnpm lsp:verify
pnpm lsp:inspect packages/ssr/src/index.ts apps/example/src/entry-client.ts
```

项目独立 MCP 服务名为 `zerodep_js_lsp`，使用本工作区的 `tsc --lsp --stdio`。setup 按当前机器生成被忽略的 `.codex/config.toml`，不会写入用户级配置。请在 Codex 中信任本项目并重新打开，然后确认工具已经加载。

诊断桥现在合并 TS7 与框架诊断；已运行的旧进程需要重启 Codex 才加载新增检查，独立验证不代表当前会话已经刷新。普通编辑器仍使用标准 TS7，并通过检查命令或 Vite 获得框架错误。

## 研究与状态

- [从基础工程到生产可用的主计划](docs/production-plan.md)
- [执行中的语义契约](docs/semantics.md)
- [目标执行记录](docs/execution.md)
- [开始使用](docs/getting-started.md)
- [API 参考](docs/api.md)
- [支持范围](docs/support.md)
- [安全边界与发布审查](docs/security.md)
- [发布、升级与回滚](docs/releasing.md)
- [稳定性验证与观察基线](docs/stability.md)
- [持久化任务管理试点](docs/pilot.md)
- [开发、类型检查与框架诊断](docs/development.md)
- [包产物与独立消费](docs/packages.md)
- [SSR 与 hydration 使用及边界](docs/ssr-and-hydration.md)
- [原生输入与表单契约](docs/forms.md)
- [原生元素、属性与命名空间](docs/native-elements.md)
- [第一阶段 API 评审用例](docs/api-review.md)
- [实现路线、代价与设计约束](docs/implementation-design.md)
- [TS7 与编译工具研究](.design/ts7-tsx-research.md)
- [zerodep-css 原生接入讨论稿（未实施）](.design/zerodep-css-integration.md)
- [TS7 类型实验](.design/ts7-tsx-probe-results.json)
- [基础工程交接](.design/foundation.md)
- [本轮工作区扩展范围](.design/workspace-expansion.md)

四个公共包统一发布为 `1.0.0-rc.1`，工作区根和 example 保持 private。许可为 MIT。[GitHub 预发布](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.1) 提供原始 tgz 与完整性记录。当前 npm 的 next 与 latest 均指向本候选；latest 标签清理被注册表以 HTTP 403 拒绝，请使用精确版本并按候选状态评估，详见 CHANGELOG。
