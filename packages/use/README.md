# zerodep-use

独立应用工具：路由、编辑历史，以及必须由上层提供的 store。通过同版本 core 共享状态和生命周期，不引入 Vue、Pinia 或全局 store 注册表。

```tsx
import { _component, _state } from 'zerodep-js';
import { _createStore } from 'zerodep-use/store';

const { provideStore: providePreferences, useStore: usePreferences } = _createStore<{
  compact: boolean;
}>();

const Content = _component(() => {
  const preferences = usePreferences();
  return <input type="checkbox" bind:checked={preferences.compact} />;
});
export const App = _component(() => {
  const preferences = _state({ compact: false });
  providePreferences(preferences, { persist: { key: 'preferences' } });
  return <Content />;
});
```

不配置 persist 时只共享状态。持久化默认 localStorage，可选择 sessionStorage、`_indexedDBStorage()` 或自定义 StorageAdapter；getItem/setItem/removeItem 可以返回 Promise，适合经用户后端接口访问 Redis。字段选择、错误处理与异步操作见 [store 文档](https://github.com/kenconnet666/zerodep-js/blob/main/docs/store.md)。旧 read/write 存储入口和数据格式不保留。

`zerodep-use/router` 继续提供导航、预加载缓存和 SSR 数据准备，`zerodep-use/history` 继续提供撤销重做。只导入所需子入口，没有聚合根入口；普通请求使用 async/await 和已有生命周期，task 子入口已经删除。

源码与发行包状态分别记录在 [CHANGELOG](https://github.com/kenconnet666/zerodep-js/blob/main/CHANGELOG.md)。
