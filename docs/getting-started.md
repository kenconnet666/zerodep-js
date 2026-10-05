# 开始使用 zerodep-js

zerodep-js 使用标准 TSX、显式变量式状态和一次初始化的组件。状态在声明处标记，之后直接读写；编译器把这些操作连接到局部 DOM 更新。本文对应已发布并完成安装验收的 1.0.0-rc.2；版本与标签状态见 [发布记录](../CHANGELOG.md)。

当前 main 的 rc.3 候选将路由与持久化迁到 `zerodep-use`，其他基础写法保持不变。下方 npm 命令仍安装已发布 RC2；若使用新的 router/storage 导入，需统一消费当前工作区或本地 rc.3 tgz。候选实际发布前不混用不同版本，具体迁移见 [拆包方案](use-extraction.md)。

## 安装与构建入口

目标环境是 Node 24、TypeScript 7 和 Vite 8。框架包统一安装精确版本，避免 next/latest 的候选标签差异；RC2 的下划线 API 与 RC1 不兼容，需要同步更新导入并重新编译应用：

```sh
pnpm add zerodep-js@1.0.0-rc.2
pnpm add -D zerodep-js-vite@1.0.0-rc.2 vite@8.3.1 typescript@7.0.2
```

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

仓库的 `apps/example` 同时提供框架用例和 `/tasks` 持久化任务页面，可以观察 props、表单、异步请求、取消、并发冲突、SSR/CSR 和开发更新在一起时的实际写法。运行方式见 [任务试点](pilot.md)。

下一步阅读 [API 参考](api.md)、[原生元素](native-elements.md)和[语义契约](semantics.md)。
