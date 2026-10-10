# 页面标题与描述

从 `zerodep-js` 导入 `_head`，在组件或有效根作用域中声明一次同步读取函数：

```tsx
import { _head } from 'zerodep-js';

_head(() => ({
  title: `${task.title} · 任务`,
  description: task.summary,
}));
```

只支持 title 和 description，值为字符串；undefined 表示继承其他活跃记录，空字符串表示明确的空内容。整个函数返回 false/null/undefined 表示本条记录暂不提供字段。字段读取是纯派生，不能写状态、创建资源或返回 Promise。

## 生命周期和优先级

- 按登记顺序逐字段覆盖，通常子组件晚于父组件；既有记录更新不改变优先级。
- 作用域销毁时删除自己的记录，恢复其他仍活跃的记录。错误边界清理失败子树时也释放其元信息。
- 同一文档的多个根共享覆盖顺序，全部卸载后恢复接管前的静态元信息。只有框架创建的节点会被删除。
- `_mount` / `_hydrate` 使用目标所属文档，挂载到其他 HTML 文档不会修改全局 document。独立 `_createRoot` 在浏览器中使用全局文档。
- 事件回调不直接调用 `_head`；更新它读取的状态。也不需要在每次更新时重新登记。

这不是任意 head 标签或资源加载 API，不处理脚本、样式表、SEO 配置系统和路由数据请求。CSS 继续使用 CSS 宿主。

## SSR 文档组合

`renderToString()` 仍只返回正文字符串。需要元信息时，使用 SSR 包的 `_render()`，返回 `{ html, head }`：

```ts
import { _render, renderDocument } from 'zerodep-js';

return renderDocument({
  template,
  mode,
  render: () => _render(App, { props }),
});
```

模板在 head 中预留唯一位置：

```html
<head>
  <meta charset="UTF-8" />
  <!--app-head-->
</head>
<body>
  <div id="app" data-render-mode="__RENDER_MODE__"><!--app-html--></div>
</body>
```

使用这套 SSR 元信息时，模板不要再重复声明 title/description；默认值由根组件 `_head` 提供。其他静态 head 内容照常保留。正文与元信息只在各自模板位置替换一次，正文或标题中出现模板标记不会再次被解释。

每次 `_render` 创建独立的请求作用域，在清理前收集仍存活的元信息。失败子树已经释放的记录不会进入结果；不会保留跨请求的组件实例。标题和描述以文本安全转义输出，不接受原始 HTML。

服务端输出的 title/meta 带 `data-zj-head` 标记，客户端复用其节点；保留该标记。接管验证失败、首个 effect 前销毁时，不改动服务端 head。成功激活后，服务端生成的节点归框架管理，最终卸载会清除它们。

旧的 `renderDocument({ render: () => string })` 仍然有效；没有元信息时不要求 head 位置。CSR 不执行服务端 render 回调，元信息由客户端 effect 写入。

## 验收范围

单测覆盖字段覆盖、作用域隔离、清理、非法类型、纯计算约束、SSR 失败回收和安全输出。浏览器夹具覆盖更新优先级、错误恢复、多个根、外部文档归属、SSR 首屏及接管失败。完整浏览器/平台和包消费由 CI 验收。
