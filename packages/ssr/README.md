# zerodep-js-ssr

zerodep-js 的同步组件 SSR、文档模板组合与显式数据编码。每次 `renderToString` 使用独立请求作用域；不执行 DOM effect、ref 或浏览器事件。安装时须提供同版本的 `zerodep-js`。

```ts
import { renderToString, renderDocument } from 'zerodep-js-ssr';
import { App } from './App.js';

const html = await renderDocument({
  template,
  mode: 'ssr',
  render: () => renderToString(App, { props: { title: '页面' } }),
});
```

`renderDocument({ template, mode, render })` 在 SSR 模式调用可信的 HTML 渲染函数，在 CSR 模式保留空应用容器。模板必须各包含一个 `__RENDER_MODE__` 和 `<!--app-html-->` 标记。

组件渲染器负责文本和属性转义；`renderDocument` 不会再次转义传入的完整 HTML。浏览器从 core 调用 `_hydrate` 接管同一组件输出，默认严格检查结构不匹配。

`zerodep-js-ssr/data` 单独导出 `serializeData`，浏览器只需要编码 JSON 时使用此入口，不加载服务端渲染器。它返回适合 HTML script 数据位置的 JSON 文本，不自动传输组件 props；不要把含有敏感字段的整个服务端对象直接发给客户端。

[SSR 与接管约定](https://github.com/kenconnet666/zerodep-js/blob/main/docs/ssr-and-hydration.md)。暂不提供流式 SSR。本文对应 `1.0.0-rc.3` API，框架与适配包统一版本，实际发布与验收状态见 [变更记录](https://github.com/kenconnet666/zerodep-js/blob/main/CHANGELOG.md)。
