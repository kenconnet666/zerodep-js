# zerodep-js

使用标准 TSX、显式变量式状态和细粒度更新的独立框架。Babel 负责框架转换，微软官方 TypeScript 7.1 夜间版本负责类型与语言服务，Vite 负责开发和构建。具体版本由 pnpm catalog 和锁文件固定。

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

变量直接读写，无 .value。props 参数解构、默认值和 rest 直接响应；普通函数传参、局部解构与返回值保持 JavaScript 取值语义。

## 工作区

| 目录              | 职责                                          |
| ----------------- | --------------------------------------------- |
| packages/core     | 状态、组件、DOM、SSR、生命周期、JSX 类型      |
| packages/compiler | Babel/CSS 转换、Vite 插件、框架检查和语言服务 |
| packages/css      | CSS 回调作者、主题变量及浏览器/SSR 样式宿主   |
| packages/ui       | Provider、基础组件和布局，保持 private        |
| apps/example      | CSR/SSR 功能示例和任务应用                    |
| apps/docs         | UI 组件示例站                                 |

所有公开 API 从各包根入口导入。没有独立 use/router/store/持久化包，也不提供外部框架适配。

UI 组件在 Provider 内使用。按钮支持 solid/outline/text/soft 外观，`density={'compact'}` 调整几何尺寸而不缩小字号，`color` 始终表示前景色。Text 的 `lines={1}` 为单行省略，`lines={2}` 等正整数为多行截断；完整内容保留在 DOM 中，不自动添加 Tooltip。

## 启动

使用 Node 24 和 package.json 固定的 pnpm。在仓库根运行：

```sh
pnpm install --frozen-lockfile
pnpm --dir apps/example dev
```

文档应用使用 `pnpm --dir apps/docs dev`。两个应用的 Vite 开发与构建直接关联 core/CSS/UI 源码，编译器插件也从源码加载，不必先构建依赖包。UI 修改支持组件热更新；底层运行时修改可能触发整页刷新，Vite 插件修改需要服务重启。

发布包仍单独执行包的 build、UI 的 build:types，独立消费测试继续验证真实产物。应用分别执行 build:client/build:server；命令不隐式捆绑类型检查或补建依赖。

换机使用 Codex 时，完成 core/css/compiler 各包的 build 后运行 `pnpm --dir packages/compiler lsp:setup`，再在 Codex 中信任项目并重新加载项目工具。Git 保留 `.codex/config.example.toml` 模板；含本机 Node/仓库路径的 `.codex/config.toml` 由命令重新生成，不直接复制或提交。旧 `.codex/lsp4ij/` 不再使用，也不提交。

## 维护

API 细节以源码类型和实际组件示例为准，项目只维护 AGENTS.md 和必要的 README。

本地只检查修改文件的 LSP 错误和必要的局部短测试；完整类型检查、构建及长测试交 CI。协作要求见 [AGENTS.md](AGENTS.md)，历史变更与发行记录查 Git 和 GitHub Releases。

框架采用 MIT License；第三方生成数据的许可保留在对应包的 THIRD_PARTY_NOTICES。
