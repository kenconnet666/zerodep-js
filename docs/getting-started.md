# 开始使用 zerodep-js

zerodep-js 使用标准 TSX、显式变量式状态和一次初始化的组件。当前源码采用官方 TS7.1 dev、Babel 与 Vite；发布状态见 [执行记录](execution.md)和[变更记录](../CHANGELOG.md)。源码工作区运行方式见 [README](../README.md)。

## 安装与构建入口

工作区源码已按用户要求切换为 EAP 配套 `7.1.0-dev.jetbrains.20260721.2`，使用仓库的 `pnpm install --frozen-lockfile`，下载来源和平台覆盖见 [工具链](tooling.md)。下方 npm rc.7 安装说明对应既有发布版本，尚不包含本次 SDK 调整。

消费者使用 Node 24、官方 TypeScript 7.1.0-dev.20261007.1 与 Vite 8.3.1。当前候选 rc.7 已发布到 npm next，框架包安装相同版本：

```sh
pnpm add zerodep-js@1.0.0-rc.7
pnpm add -D zerodep-js-compiler@1.0.0-rc.7 zerodep-js-vite@1.0.0-rc.7 typescript@7.1.0-dev.20261007.1 vite@8.3.1
```

SSR 应用另装 zerodep-js-ssr@1.0.0-rc.7；路由、持久化和历史使用 zerodep-use@1.0.0-rc.7。官方平台二进制随 TypeScript 安装，不需要 Go 或自建 SDK。

应用 package.json 的基本脚本：

```json
{
  "scripts": {
    "dev": "vite",
    "check": "zerodep-check -p tsconfig.json",
    "build": "pnpm check && vite build",
    "preview": "vite preview"
  }
}
```

本仓库开发使用 README 中的工作区命令。

Vite 插件同时处理普通转换和依赖扫描：

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import { zerodep } from 'zerodep-js-vite';

export default defineConfig({ plugins: [zerodep()] });
```

TypeScript 配置保留 JSX，让框架编译器处理它，并使用框架自身的 JSX 类型：

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "Preserve",
    "moduleResolution": "Bundler",
    "jsx": "preserve",
    "jsxImportSource": "zerodep-js",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "types": ["vite/client"],
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

不配置 React JSX runtime。未经过编译的宏会明确报错，不能把原始 TSX 直接当成普通运行时函数执行。

## 第一个组件

```tsx
// src/App.tsx
import { _component, _state, _derived } from 'zerodep-js';

export const App = _component(({ step = 1 }: { step?: number }) => {
  let count = _state(0);
  const doubled = _derived(count * 2);
  return (
    <section>
      <button onClick={() => (count += step)}>增加</button>
      <p>
        当前：{count}，两倍：{doubled}
      </p>
    </section>
  );
});
```

```ts
// src/main.ts
import { _mount } from 'zerodep-js';
import { App } from './App.js';

const target = document.querySelector('#app');
if (!target) throw new Error('缺少应用容器');
const dispose = _mount(App, { target });
// 宿主移除应用时调用 dispose()。
```

HTML 使用 `<div id="app"></div>` 和指向入口的 module script。`_mount` 接管整个容器并替换原有内容，同一容器不能重复挂载。

组件函数执行一次，事件、动态文本和属性分别读取最新状态。`const initial = count` 是普通快照；需要派生值时显式使用 `_derived`。条件放在返回表达式或 JSX 内会持续更新，初始化阶段的语句级 if 不会自动重跑。

## props、默认值与转发

```tsx
import { _component, type JSX } from 'zerodep-js';

export const Button = _component(
  ({ type = 'button', children, ...attrs }: JSX.IntrinsicElements['button']) => (
    <button {...attrs} type={type}>
      {children}
    </button>
  ),
);
```

参数支持顶层解构、别名、默认值和实时 rest。输入绑定只读，修改交给回调；默认值在输入为 undefined 时使用，并按实例缓存。`_state(initialProp)` 只取初始化值，后续 prop 更新不会重置用户正在编辑的本地状态。

复杂嵌套解构不静默变成快照；使用 `props.user.name` 或独立派生。跨回调的可空值需要在本次调用重新检查，详见 [开发诊断](development.md)。

## 列表与输入

```tsx
import { _component, _state, For } from 'zerodep-js';

export const TodoList = _component(() => {
  const rows = _state([{ id: 'first', title: '开始使用', done: false }]);
  return (
    <ul>
      <For each={rows} keyBy={(row) => row.id}>
        {(row) => (
          <li>
            <input
              type="checkbox"
              checked={row.done}
              onChange={(event) => (row.done = event.currentTarget.checked)}
            />

            <input value={row.title} onInput={(event) => (row.title = event.currentTarget.value)} />
          </li>
        )}
      </For>
    </ul>
  );
});
```

`For` 用稳定 key 保留实例和 DOM；同 key 替换数据后，内联回调仍读取新对象。普通 map 保持 JavaScript 计算语义。输入使用原生事件及 currentTarget，value/checked 与首次默认值有独立契约，见 [表单](forms.md)。

## SSR 与实际应用

SSR 项目额外安装 `zerodep-js-ssr`。先加载请求数据，再用 `renderToString(App, { props })` 生成 HTML；客户端以相同初值调用 `_hydrate`。初始化 JSON 通过 `zerodep-js-ssr/data` 的 serializeData 编码。完整文档模板和错误处理见 [SSR 指南](ssr-and-hydration.md)。

仓库的 `apps/example` 同时提供框架用例和 `/tasks` 持久化任务页面，可以观察 props、表单、异步请求、取消、并发冲突、SSR/CSR 和开发更新在一起时的实际写法。运行方式见 [任务试点](tooling.md)。

下一步阅读 [API 参考](api.md)、[原生元素](native-elements.md)和[语义契约](semantics.md)。
