# zerodep-js

使用标准 TSX、显式变量式状态和细粒度更新的独立框架。框架转换使用 Babel，类型检查、声明和基础语言服务使用选定 TypeScript 7.1 dev，开发与打包使用 Vite。

优先保证实现简单、容易维护、使用方便、类型提示准确，并用适当中文注释解释关键语义。性能不是首要目标，不维护自有 TypeScript 分支、原生 SDK 或跨命令编译后台。

> 官方 TS7.1 + Babel + Vite 路线已作为 1.0.0-rc.7 发布到 npm next，并通过完整 CI 与注册表消费验证。稳定 latest 未提升；证据与 IDE 边界见 [执行记录](docs/execution.md)。

## 工作区

| 包                | 职责                                                 |
| ----------------- | ---------------------------------------------------- |
| packages/core     | 响应式、组件、DOM、生命周期、JSX 类型和运行时协议    |
| packages/use      | router、storage、history 子入口，通过 peer 共享 core |
| packages/ssr      | 请求隔离、HTML 渲染、转义和数据编码                  |
| packages/compiler | Babel 转换、框架检查、官方 TS7.1 与语言工具适配      |
| packages/vite     | 转换接入、依赖扫描和开发更新                         |
| apps/example      | 使用实际包产物的 CSR/SSR 示例和任务应用              |

不提供外部框架运行时适配，也不把预编译组件库链接到工作区源码。

## 开发

使用 Node 24、pnpm 10.34.5；官方 TypeScript 固定为 7.1.0-dev.20261007.1。安装不需要 Go 或 TypeScript 源码仓库。

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

开发默认端口 5173，生产预览默认端口 4173。主示例支持 CSR/SSR、任务路由和工作区；应用数据保存在 apps/example/.data，测试使用独立临时数据。

## 写法

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

保留变量式读写、组件参数解构/默认值/实时 rest，以及原生和组件 bind、DOM bind:this。它们都是标准 TSX 语法，由框架编译器实现响应式语义；普通局部变量不隐式变为响应式。

Vite 使用 zerodep-js-vite 的 zerodep()。应用 TS 配置使用 jsx: preserve、jsxImportSource: zerodep-js。客户端通过 _mount/_hydrate 返回的 disposer 卸载；服务端使用独立 SSR 入口。

## 验证与工具

```sh
pnpm check
pnpm test
pnpm test:compiler
pnpm test:dev
pnpm test:packages
pnpm lsp:verify
pnpm lsp:completions
```

本地执行相关验证；CI 并行运行工程检查、三浏览器、Linux/Windows 独立消费和官方工具的六平台验证。LSP 探针会临时写主示例源码，不与同一工作区的应用 check/build 同时运行。

[工具分工](docs/tooling.md) · [开始使用](docs/getting-started.md) · [API](docs/api.md) · [语义](docs/semantics.md) · [表单](docs/forms.md) · [SSR](docs/ssr-and-hydration.md) · [包消费](docs/packages.md) · [发布](docs/releasing.md)

框架源码使用 MIT License；成熟依赖按各自许可证分发，core 的生成数据来源见包内 THIRD_PARTY_NOTICES.md。
