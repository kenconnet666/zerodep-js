# zerodep-use

zerodep-js 的可选应用工具，提供路由和浏览器持久化。通过同版本 `zerodep-js` peer 共享响应式与组件所有权；不依赖 Vue、React 或 Svelte。

```tsx
import { _component, _state } from 'zerodep-js';
import { _persistLocal } from 'zerodep-use/storage';

export const Preferences = _component(() => {
  const prefs = _state({ name: '' });
  _persistLocal('app.preferences', prefs);
  return <input value={prefs.name} onInput={(event) => (prefs.name = event.currentTarget.value)} />;
});
```

`zerodep-use/router` 提供 _defineRoute/_defineRoutes、_createRouter、三种 history、Router/Outlet/Link、路由数据和导航生命周期。`zerodep-use/storage` 提供 _persistLocal/_persistSession、版本迁移、校验、同步和释放。只导入需要的子入口，没有聚合根入口。

这些能力从 `1.0.0-rc.3` 起由本包提供；原 core 的 router/storage 入口直接移除。状态宏、快照、通用生命周期和 _createPage 仍来自 `zerodep-js`。存储封装格式与之前版本兼容，拆包不重置已有草稿或偏好。

SSR 时持久化不访问浏览器存储，路由按请求创建。语义与边界见[路由指南](https://github.com/kenconnet666/zerodep-js/blob/main/docs/routing.md)、[持久化指南](https://github.com/kenconnet666/zerodep-js/blob/main/docs/storage.md)；实际版本发布状态见[变更记录](https://github.com/kenconnet666/zerodep-js/blob/main/CHANGELOG.md)。
