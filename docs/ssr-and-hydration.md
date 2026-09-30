# SSR、CSR 与客户端接管

本文记录已经实现的入口与边界。完整生产验收仍在推进，进度见 [execution.md](execution.md)。

## 同一 App 的两个入口

```ts
// 服务端先准备请求数据，再同步渲染组件。
import { renderToString } from '@zerodep-js/ssr';
const html = renderToString(App, { props: { mode: 'ssr' } });

// 浏览器选择创建新节点或接管服务端节点，返回值都负责卸载。
import { mount, hydrate } from '@zerodep-js/core';
const dispose =
  mode === 'ssr'
    ? hydrate(App, { target, props: { mode } })
    : mount(App, { target, props: { mode } });
```

`renderDocument` 仍负责可信 HTML 模板的组合，`renderToString` 负责组件 HTML。示例的两种模式现在都使用 App.tsx，旧的原生 DOM 探针已删除。模式切换通过新请求完成，不把已挂载的客户端实例搬到服务端。

## 请求与生命周期

- 每次服务端渲染创建独立根作用域，context、组件和列表行都属于本次请求。
- 用户 effect、DOM ref 和事件处理器不在服务端执行。服务端 flushSync 不会冲刷其他根的排队任务。
- 初始化时注册的 onCleanup 会在请求渲染结束或失败后执行，清理错误不会隐藏原始渲染错误。
- 异步数据在 renderToString 之前准备；组件初始化保持同步。模块级不可变定义可以共享，可变用户状态应在请求或组件内创建。

## HTML 与数据

文本和属性按不同上下文转义；客户端和服务端共享属性别名、布尔值、ARIA、CSS 和文本专用元素规则。非法标签/属性名、void 元素 children 和危险的 raw-text 结束标签会明确报错。script、style、textarea、title、option 不插入结构注释作为文本内容。

如需传输初始化数据，显式选择数据并编码：

```ts
import { serializeData } from '@zerodep-js/ssr/data';
const dataText = serializeData(initialData);
```

这个独立入口只包含 JSON 编码，不加载组件服务端渲染器。编码会处理 `<`、`>`、`&`、行分隔符等，可放入 `type="application/json"` 的 script 文本。它遵循 JSON 的值规则，不提供类实例、函数或任意对象图的自动恢复；数据校验与客户端恢复由应用负责。框架不会自动把全部 props、异常或服务端资源序列化到页面。

## hydration 的保证

客户端先认领和验证已有节点，再激活属性绑定、监听器和 ref。正常接管保留已有元素、文本、表单和列表节点。浏览器合并的相邻文本会按组件结构拆分；验证失败时撤销这些拆分，保留原 HTML。

输入框在脚本加载前已有编辑时，接管会保留输入、焦点和选区，并在原生监听器就绪后把已有编辑交给对应 input/change 回调。完整输入模式、IME、平台输入规范化和动态选项边界仍需后续专项加固。

不要删除 `zj:` 区域注释，或在接管前重写根容器内部。服务端与客户端应使用一致的初始数据；浏览器修正无效 HTML 结构也会导致不匹配。

## 不匹配与错误边界

默认不匹配策略为 `throw`，通过 `HydrationError` 和稳定代码 `ZJ_HYDRATION_MISMATCH` 报告问题。应用可以明确选择替换：

```ts
hydrate(App, {
  target,
  props,
  mismatch: 'replace',
  onMismatch(error) {
    report(error);
  },
});
```

replace 先释放失败的客户端作用域，再重新 mount。它不会声称复用了不匹配节点。结构不匹配也不会被子树 ErrorBoundary 吞成普通业务错误。

服务端 ErrorBoundary 可输出可阅读的 fallback。协议只标记该区域发生过错误，不传输异常对象或堆栈；客户端完成整体接管后，对该区域局部重试。正常区域保留节点，降级区域按客户端实际结果重新建立内容。
