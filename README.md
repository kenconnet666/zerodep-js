# zerodep-js

使用标准 TSX、显式变量式状态和细粒度更新的独立框架。框架转换使用 Babel，类型检查、声明和基础语言服务使用选定 TypeScript 7.1 dev，开发与打包使用 Vite。

优先保证实现简单、容易维护、使用方便、类型提示准确，并用适当中文注释解释关键语义。性能不是首要目标，不维护自有 TypeScript 分支、原生 SDK 或跨命令编译后台。

> 当前源码已收拢为 core、css、compiler、ssr：CSS 在本仓库维护，Vite 插件来自 compiler/vite。新结构尚未发布；既有 rc.9 npm 产物仍是旧布局，不能用旧包验证下面的新入口。历史发行证据见 [维护交接](docs/api-hardening-handoff.md)。

## 工作区

| 包                | 职责                                                    |
| ----------------- | ------------------------------------------------------- |
| packages/core     | 响应式、组件、DOM、生命周期、JSX 类型和运行时协议       |
| packages/ssr      | 请求隔离、HTML 渲染、转义和数据编码                     |
| packages/compiler | Babel/CSS 转换、Vite 插件、框架检查与 TS7.1 语言服务    |
| packages/css      | CSS 作者、关键字、通用主题与浏览器/SSR 样式收集         |
| apps/example      | 使用实际包产物的 CSR/SSR 示例和任务应用                 |
| packages/ui       | Provider、Icon/Text/Ripple/Spinner/ButtonBase，暂不发布 |
| apps/docs         | 组件库与框架文档应用                                    |

不提供外部框架运行时适配，也不把预编译组件库链接到工作区源码。

## 开发

完整换机步骤见 [环境配置](docs/environment-setup.md)，包括 SDK、WebStorm 补丁、MCP/LSP 和回退。

使用 Node 24、pnpm 10.34.5；当前工作区使用 微软官方 TypeScript 7.1.0-dev.20261008.1。安装不需要 Go 或 TypeScript 源码仓库。TypeScript target/lib 与 Vite 默认输出统一使用 ES2025；新内置 API 仍由运行环境提供。

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview
```

开发默认端口 5173，生产预览默认端口 4173。主示例支持 CSR/SSR 和独立任务页面；应用数据保存在 apps/example/.data，测试使用独立临时数据。

组件库与文档工程已独立准备：`pnpm dev:docs` 启动文档站（5174），`pnpm build:ui` 构建组件库，`pnpm build:docs` 构建文档站，`pnpm preview:docs` 预览产物（4174）。根命令 `pnpm dev` 仍只启动原有示例和框架包监听，`pnpm build` 包含两个应用。目录和后续放置代码的位置见 [组件库](packages/ui/README.md) 与 [文档应用](apps/docs/README.md)。

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

`_id()` 提供 SSR/接管一致的组件 ID。当前源码已移除 rc.8 中的 task 工具，请直接使用 async/await、状态和生命周期回调；见 [普通请求](docs/requests.md)。

`<Portal>内容</Portal>` 可以把弹层内容放到 body，仍随原父组件更新和销毁；指定位置使用 `target={container}`。SSR 只留占位，接管成功后再显示。它也属于当前分支新增能力，详见 [Portal](docs/api.md#portal把内容放到页面外层)。

Vite 使用 zerodep-js-compiler/vite 的 zerodep()。应用 TS 配置使用 jsx: preserve、jsxImportSource: zerodep-js。客户端通过 _mount/_hydrate 返回的 disposer 卸载；服务端使用独立 SSR 入口。

2026-10-09 起，当前源码已删除整个 zerodep-use 包，不再提供路由、store、持久化和撤销重做工具。core 的状态、上下文、快照以及 UI Provider 保留；旧 npm 发行记录不变。

## 验证与工具

下面是 CI 使用的完整验收入口，不是本地开发需要依次执行的清单：

```sh
pnpm check
pnpm test
pnpm test:compiler
pnpm test:dev
pnpm test:packages
pnpm lsp:verify
pnpm lsp:completions
```

本地只执行改动相关的焦点检查，例如 `pnpm exec vitest run packages/core/test/lifecycle.test.ts`；完整测试留给 CI。CI 并行运行工程检查、三浏览器、Linux/Windows 独立消费和选定 SDK 的六平台验证。LSP 探针会临时写主示例源码，不与同一工作区的应用 check/build 同时运行。

[环境配置](docs/environment-setup.md) · [Svelte API 取舍](.design/svelte-api-review.md) · [工具分工](docs/tooling.md) · [开始使用](docs/getting-started.md) · [API](docs/api.md) · [语义](docs/semantics.md) · [表单](docs/forms.md) · [SSR](docs/ssr-and-hydration.md) · [包消费](docs/packages.md) · [发布](docs/releasing.md)

框架源码使用 MIT License；成熟依赖按各自许可证分发，core 的生成数据来源见包内 THIRD_PARTY_NOTICES.md。

原生 [CSS](docs/css.md) 由工作区 zerodep-js-css 提供：命名 css 自动追踪，安全动态值隐式绑定元素变量；zerodep() 默认完成转换，无需适配器或扩展配置。

UI 的 [按钮与 Flex](docs/buttons.md) 已提供独立槽转发、等比尺寸、受控切换及相连布局。当前状态见 [UI 交接](docs/handoff-ui-buttons-2026-10-09.md)，UI 保持 private。
