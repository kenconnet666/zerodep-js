# zerodep-js

`zerodep-js` 根入口提供 `_head`，以同步读取函数维护页面标题/描述，随作用域释放；不依赖 CSS 包。SSR 使用 `_render` 收集元信息，见仓库 docs/head.md。

zerodep-js 的响应式、组件、DOM、SSR 与 hydration 运行时。使用标准 TSX 和官方 TypeScript 7.1，框架源码须经过 `zerodep-js-compiler` 或 `zerodep-js-compiler/vite` 转换。样式边界采用 CSS Tools tokenizer，CSS 类型采用 csstype 的生成数据；不依赖其他组件框架运行时。

```tsx
import { _component, _state, _mount } from 'zerodep-js';

const Counter = _component(({ step = 1 }: { step?: number }) => {
  let count = _state(0);
  return <button onClick={() => (count += step)}>{count}</button>;
});

const dispose = _mount(Counter, { target: document.querySelector('#app')! });
// 应用退出时调用 dispose，释放节点、事件与订阅。
```

公共入口包含变量宏、_component、_mount/_hydrate、_effect 与生命周期、For、context 和 ErrorBoundary。根入口同时提供 JSX 类型，配置 `jsx: "preserve"` 与 `types: ["zerodep-js"]`；不配置 jsxImportSource，也不使用 React JSX 转换。编译器所需的协议函数也由根入口导出，应用继续使用变量宏，不把协议函数作为另一套 signal API。

_snapshot、_onMount/_getAbortSignal 与上下文继续留在 core。当前源码已删除整个应用工具包，不再提供路由、store、持久化或撤销重做；没有旧入口转发。

源码随声明映射一起打包供编辑器导航；执行入口仅导出编译后的 ESM。预编译组件库应通过 peer dependency 共享同一 core，避免产生相互隔离的响应式图和组件身份。

[使用契约](https://github.com/kenconnet666/zerodep-js/blob/main/docs/semantics.md) · [开发与诊断](https://github.com/kenconnet666/zerodep-js/blob/main/docs/development.md) · [表单](https://github.com/kenconnet666/zerodep-js/blob/main/docs/forms.md)

本文说明当前公开 API。框架与适配包统一版本，实际发布与验收状态见 [变更记录](https://github.com/kenconnet666/zerodep-js/blob/main/CHANGELOG.md)。

CSS 由同仓库 zerodep-js-css 提供；core 不依赖 CSS 包，也不提供 css 或 adapter 子入口。编译器内置 CSS 转换，写法见仓库 docs/css.md。

服务端直接使用同一个包，不再安装独立 SSR 包：

```ts
import { renderToString, renderDocument, serializeData } from 'zerodep-js';
import { App } from './App.js';

const html = await renderDocument({
  template,
  mode: 'ssr',
  render: () => renderToString(App, { props: { title: '页面' } }),
});
const initialData = serializeData({ title: '页面' });
```

每次 SSR 使用独立作用域，完成后回收，不执行 DOM effect、ref 或浏览器事件。模板必须各包含一个 `__RENDER_MODE__` 和 `<!--app-html-->` 标记；需要标题/描述时再提供 `<!--app-head-->`。`serializeData` 只负责安全 JSON 编码，不自动传输 props。当前不提供流式 SSR。浏览器按需构建会移除未使用的 SSR 渲染器和开发工具。
