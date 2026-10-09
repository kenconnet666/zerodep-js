# zerodep-js

可选 `zerodep-js/head` 提供 `_head`，以同步读取函数维护页面标题/描述，随作用域释放；不依赖 CSS 包。SSR 使用 `_render` 收集元信息，见仓库 docs/head.md。

zerodep-js 的响应式、组件、DOM 与 hydration 运行时。使用标准 TSX 和官方 TypeScript 7.1，框架源码须经过 `zerodep-js-compiler` 或 `zerodep-js-compiler/vite` 转换。样式边界采用 CSS Tools tokenizer，CSS 类型采用 csstype 的生成数据；不依赖其他组件框架运行时。

```tsx
import { _component, _state, _mount } from 'zerodep-js';

const Counter = _component(({ step = 1 }: { step?: number }) => {
  let count = _state(0);
  return <button onClick={() => (count += step)}>{count}</button>;
});

const dispose = _mount(Counter, { target: document.querySelector('#app')! });
// 应用退出时调用 dispose，释放节点、事件与订阅。
```

公共入口包含变量宏、_component、_mount/_hydrate、_effect 与生命周期、For、context 和 ErrorBoundary。`jsx-runtime` 提供 JSX 类型，配置 `jsx: "preserve"` 与 `jsxImportSource: "zerodep-js"`；不使用 React JSX 转换。`internal` 是编译输出协议，不作为手写 signal API。

_snapshot、_onMount/_getAbortSignal 与上下文继续留在 core。当前源码已删除整个应用工具包，不再提供路由、store、持久化或撤销重做；没有旧入口转发。

源码随声明映射一起打包供编辑器导航；执行入口仅导出编译后的 ESM。SSR 包及预编译组件库应通过 peer dependency 共享同一 core，避免产生相互隔离的响应式图和组件身份。

[使用契约](https://github.com/kenconnet666/zerodep-js/blob/main/docs/semantics.md) · [开发与诊断](https://github.com/kenconnet666/zerodep-js/blob/main/docs/development.md) · [表单](https://github.com/kenconnet666/zerodep-js/blob/main/docs/forms.md)

本文说明当前公开 API。框架与适配包统一版本，实际发布与验收状态见 [变更记录](https://github.com/kenconnet666/zerodep-js/blob/main/CHANGELOG.md)。

CSS 由同仓库 zerodep-js-css 提供；core 不依赖 CSS 包，也不提供 css 或 adapter 子入口。编译器内置 CSS 转换，写法见仓库 docs/css.md。
