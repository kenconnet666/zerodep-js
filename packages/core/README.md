# zerodep-js

zerodep-js 的响应式、组件、DOM 与 hydration 运行时。使用标准 TSX 和 TypeScript 7，源码须经过 `zerodep-js-compiler` 或 `zerodep-js-vite` 转换。样式边界采用 CSS Tools tokenizer，CSS 类型采用 csstype 的生成数据；不依赖其他组件框架运行时。

```tsx
import { component, $state, mount } from 'zerodep-js';

const Counter = component(({ step = 1 }: { step?: number }) => {
  let count = $state(0);
  return <button onClick={() => (count += step)}>{count}</button>;
});

const dispose = mount(Counter, { target: document.querySelector('#app')! });
// 应用退出时调用 dispose，释放节点、事件与订阅。
```

公共入口包含变量宏、component、mount/hydrate、effect 与生命周期、For、context 和 ErrorBoundary。`jsx-runtime` 提供 JSX 类型，配置 `jsx: "preserve"` 与 `jsxImportSource: "zerodep-js"`；不使用 React JSX 转换。`internal` 是编译输出协议，不作为手写 signal API。

main 开发版本另提供 snapshot、onMount/createScope/getAbortSignal，以及可选 `zerodep-js/storage` 和 `zerodep-js/router`；它们尚未包含于 RC1。持久化绑定现有状态，路由使用命名表与每应用/请求控制器，不引入另一套 `.value` 状态模型。完整用法见[持久化](https://github.com/kenconnet666/zerodep-js/blob/main/docs/storage.md)和[路由](https://github.com/kenconnet666/zerodep-js/blob/main/docs/routing.md)。

源码随声明映射一起打包供编辑器导航；执行入口仅导出编译后的 ESM。SSR 包及预编译组件库应通过 peer dependency 共享同一 core，避免产生相互隔离的响应式图和组件身份。

[使用契约](https://github.com/kenconnet666/zerodep-js/blob/main/docs/semantics.md) · [开发与诊断](https://github.com/kenconnet666/zerodep-js/blob/main/docs/development.md) · [表单](https://github.com/kenconnet666/zerodep-js/blob/main/docs/forms.md)

当前为 `1.0.0-rc.1` 发布候选。四个框架包使用同一版本，实际发布与验收状态见 [变更记录](https://github.com/kenconnet666/zerodep-js/blob/main/CHANGELOG.md)。
