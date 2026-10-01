# zerodep-js-react

React 页面宿主。只在客户端 effect 中建立独立 zerodep-js 页面，支持输入更新、入口更换和 StrictMode 清理；服务器输出空容器。React 与 zerodep-js 均作为 peer，由消费项目提供。

```tsx
import { ZerodepPage } from 'zerodep-js-react';
import { reportPage } from './report-page.js';

export function Reports({ projectId }: { projectId: string }) {
  return <ZerodepPage entry={reportPage} input={{ projectId }} className="reports" />;
}
```

reportPage 由 `_createPage(Report)` 创建，Report 源码经过 zerodep 编译。input 更新保持页面局部状态，entry 改变会重建；需要按记录重建时使用 React key。容器不接收 children 或 dangerouslySetInnerHTML。页面异常由页面自身的 ErrorBoundary 管理，宿主 effect 的同步错误遵循 React 的错误处理。

[完整使用与边界](https://github.com/kenconnet666/zerodep-js/blob/main/docs/page-hosts.md) · [MIT](LICENSE)
