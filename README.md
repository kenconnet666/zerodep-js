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

## 启动

使用 Node 24 和 package.json 固定的 pnpm。在仓库根运行：

```sh
pnpm install --frozen-lockfile
pnpm --dir packages/core build
pnpm --dir packages/css build
pnpm --dir packages/compiler build
pnpm --dir apps/example dev
```

文档应用使用 `pnpm --dir apps/docs dev`，开发时直接消费 UI 源码。生产构建分别执行包的 build、UI 的 build:types，以及应用的 build:client/build:server；命令不隐式捆绑类型检查或补建依赖。

## 维护

API 细节以源码类型和实际组件示例为准，项目只维护 AGENTS.md 和必要的 README。

本地只检查修改文件的 LSP 错误和必要的局部短测试；完整类型检查、构建及长测试交 CI。协作要求见 [AGENTS.md](AGENTS.md)，历史变更与发行记录查 Git 和 GitHub Releases。

框架采用 MIT License；第三方生成数据的许可保留在对应包的 THIRD_PARTY_NOTICES。
