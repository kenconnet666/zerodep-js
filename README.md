# zerodep-js

使用标准 TSX、显式变量式状态和细粒度更新的独立框架。项目只维护固定的定制 TypeScript 7.1 Go 编译器：检查原始源码，在同一编译器内完成框架转换、JS、声明、映射和语言服务诊断。

当前十一包 **1.0.0-rc.5 已发布到 next**，通过六平台 CI 与 npm 实际消费。传统编译器及 Vue、React、Svelte 页面宿主已移除，core 保留一份源码和一套产物。历史版本与发布证据见 [CHANGELOG](CHANGELOG.md)，当前工具与共享边界见 [原生工具说明](docs/native-tooling.md)。

## 工作区

| 子项目              | 职责                                                 |
| ------------------- | ---------------------------------------------------- |
| `packages/core`     | 状态、组件、DOM、生命周期、JSX 类型与 ABI 2          |
| `packages/use`      | router、storage、history 子入口，通过 peer 共享 core |
| `packages/ssr`      | 请求内渲染、HTML 转义、数据编码与文档组合            |
| `packages/native`   | Go 框架转换、CLI、单文件接口与常驻项目会话           |
| `packages/native-*` | Windows/Linux/macOS 的 x64/ARM64 定制 SDK            |
| `packages/vite`     | 原生源码转换、依赖扫描、开发诊断与 HMR               |
| `apps/example`      | 独立框架、任务工作台与路由应用示例                   |

示例消费实际包产物，不使用源码别名。框架代码使用 [MIT License](LICENSE)，平台包中的 TypeScript 上游使用 Apache-2.0，相关许可随包分发。

## 环境与运行

维护环境：Node 24.18.0、pnpm 10.34.5、Go 1.27.1；TypeScript API 固定为 `7.1.0-dev.20261005.1`。安装已发布平台包的消费者不需要 Go。源码工作区第一次运行先构建当前平台的 SDK：

```sh
pnpm install --frozen-lockfile
pnpm compiler:native:build --source <TypeScript源码检出路径> --go <Go可执行文件路径>
pnpm dev
```

TypeScript 源码检出应包含 `scripts/language-services/typescript-target.json` 指定的上游提交。工作区的构建、检查和声明命令通过 `scripts/native/tsc.mjs` 调用定制 SDK；SDK 缺失时明确报错，不回退到官方编译器。

开发入口默认为 `http://127.0.0.1:5173/`。`?render=ssr` 返回已渲染 HTML，`?render=csr` 由浏览器创建页面。`/tasks` 包含持久化任务、搜索、编辑、取消和并发冲突；`/workspace/tasks` 演示嵌套路由、草稿、离开确认和偏好设置。日常数据位于被忽略的 `apps/example/.data`，浏览器测试使用独立内存数据库。

```sh
pnpm dev:csr
pnpm dev:ssr
pnpm build
pnpm preview
```

生产服务默认端口 4173，可传 `--port 4200`。生产分支消费 `dist/client`、`dist/server`，不启动 Vite。

## 组件与构建

```tsx
import { _component, _state, _derived } from 'zerodep-js';

export const Counter = _component(({ step = 1 }: { step?: number }) => {
  let count = _state(0);
  const doubled = _derived(count * 2);
  return (
    <button onClick={() => (count += step)}>
      {count} / {doubled}
    </button>
  );
});
```

Vite 使用 `zerodep-js-vite` 的 `zerodep()`，插件直接依赖原生编译器，不再提供后端选择。Vite 项目的 TS 配置使用 `jsx: "preserve"`、`jsxImportSource: "zerodep-js"`。独立 CLI 输出 JS 使用 `zerodep-tsc -p tsconfig.json --jsx react-jsx`；该 JSX 模式名称属于 TypeScript，不引入 React。

客户端通过 `_mount(App, { target, props })` 挂载，通过返回的 disposer 卸载。SSR 使用 `renderToString`，客户端以相同初值 `_hydrate`。详细用法见 [开始使用](docs/getting-started.md)、[编写指南](docs/authoring.md)、[SSR 指南](docs/ssr-and-hydration.md)。

## 验证与编辑器

```sh
pnpm check
pnpm test
pnpm test:dev
pnpm test:packages
pnpm test:e2e:chromium
pnpm format:check
```

- `check`：定制 SDK 构建、各包与工具类型、框架诊断、生成数据与 lint。
- `test`：运行时、原生编译语义、SSR、工具与发布恢复测试；`test:native` 只运行原生包用例。
- `test:dev`：真实 Vite 开发更新、编译错误恢复、状态保留与 SSR 更新。
- `test:packages`：工作区外安装真实 tgz，检查声明、预编译组件库、CSR/SSR、绑定和清理。
- `test:e2e`：完整 Chromium/Firefox/WebKit；本地可选择 Chromium，完整矩阵由 CI 执行。
- `benchmark:native`：当前原生路线的冷/热转换、完整项目、增量编辑和进程树内存观察。

```sh
pnpm lsp:setup
pnpm lsp:verify
pnpm lsp:completions
```

WebStorm 选择当前平台包下的 `typescript` 目录，例如 `packages/native-win32-x64/typescript`。项目 MCP 名称为 `zerodep_js_lsp`，由本项目生成本机配置；不会修改其他项目或全局配置。补全、导航和框架诊断来自同一个定制 SDK。详见 [开发与诊断](docs/development.md)。

Prettier/Oxc 和 Oxlint 仍是独立工程工具；它们尚未共享 Go AST。格式化行为及 WebStorm 操作见 [格式化说明](docs/formatting.md)。

## 参考

- [API](docs/api.md)、[语义契约](docs/semantics.md)、[支持范围](docs/support.md)
- [表单](docs/forms.md)、[原生元素](docs/native-elements.md)、[路由](docs/routing.md)、[持久化](docs/storage.md)
- [开发检查面板](docs/devtools.md)、[任务试点](docs/pilot.md)
- [包产物与消费](docs/packages.md)、[多平台发布](docs/native-release.md)、[发布与回滚](docs/releasing.md)
- [贡献约定](CONTRIBUTING.md)、[安全边界](docs/security.md)、[稳定性](docs/stability.md)
