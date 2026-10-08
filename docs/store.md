# 向下注入的 store

store 的数据由父组件创建并提供，子组件通过同一份入口读取。没有提供者就报错，不自动创建，也没有全局单例。模块中只定义入口，不保存请求或页面状态。

```tsx
// preferences-store.ts
import { _createStore } from 'zerodep-use/store';

type Preferences = { compact: boolean; theme: string };
export const { provideStore: providePreferences, useStore: usePreferences } =
  _createStore<Preferences>();
```

父组件创建状态：

```tsx
const preferences = _state({ compact: false, theme: 'light' });
providePreferences(preferences);
```

下面任意一层组件，在初始化时取得它：

```tsx
const preferences = usePreferences();
return <input type="checkbox" bind:checked={preferences.compact} />;
```

提供和读取的是同一个对象。继续用 `_state` 创建可变响应式数据，派生值用 `_derived`，修改逻辑用普通函数；不另加 actions/getters 注册体系。普通对象也可以作为静态数据提供，但不会因此自动变成响应式对象。

同一作用域不能重复提供同一个 store；子树可以提供另一份，读取最近的提供者。提供者销毁时才释放其持久化订阅，某个使用者销毁不影响兄弟组件。Portal 沿逻辑父组件读取。不同 SSR 请求分别创建状态，模块中共享的仅是入口，不能把可变状态放到模块全局。

`useStore()` 和 `provideStore()` 需要当前组件/根作用域；事件和 await 后使用初始化时取得的对象，不在回调中重新查找提供者。组件外可使用 `_createRoot` 并负责销毁它；没有 `_createScope` 或 `ScopeHandle`。

## 自动保存

持久化只配置在提供者处，使用者无需了解保存方式：

```tsx
providePreferences(preferences, {
  persist: {
    key: 'preferences',
    pick: ['compact', 'theme'],
  },
});
```

默认使用 localStorage，保存普通 JSON 对象。pick 省略时保存提供时的全部字段，空数组只保存空对象；只接受顶层字段名，不支持点号路径。未选择的字段不读取、不恢复，也不会触发保存。恢复时不替换 store 对象，缺少的所选字段使用初值，额外字段被忽略；嵌套对象作为整个字段恢复，不做深层合并。

| 配置       | 作用                                                       |
| ---------- | ---------------------------------------------------------- |
| key        | 必填的保存名称，固定字符串                                 |
| storage    | 默认 'local'；可选 'session' 或自定义适配器                |
| pick       | 保存哪些顶层字段，类型提示来自 store 类型                  |
| validate   | 同步校验外部数据，可返回部分字段；失败不覆盖状态或保存内容 |
| writeDelay | 合并连续编辑的等待时间，默认 0 毫秒                        |

SSR 不访问浏览器或后端存储；客户端接管完成后才读取。读取前或异步读取期间发生的编辑会保留，随后保存新值。损坏 JSON、非法数据或读取失败会阻止自动覆盖原内容。

若首屏需要后端数据，由应用请求入口先 await 获取，再通过 props 在父组件初始化状态并提供；store 不自动等待 SSR 或把同步组件变成异步组件。

不保留旧的 read/write 绑定接口、版本封装或迁移钩子。原开发环境的旧保存内容不会转换，需要时清除旧键。路由预加载和 CSS 标签拼接不变。

## IndexedDB

```tsx
import { _indexedDBStorage } from 'zerodep-use/store';

// 可在模块顶层创建适配器；这里只保存配置，不打开数据库。
const storage = _indexedDBStorage({ database: 'my-app' });

providePreferences(preferences, {
  persist: { key: 'preferences', storage },
});
```

适配器使用专用数据库的 state 对象仓库，版本为 1，默认数据库名 zerodep-js。不要将它指向需要其他数据库结构的现有数据库；那种情况使用自定义适配器。一次操作以事务完成为成功，然后关闭连接；多个标签之间通过 BroadcastChannel 通知更新，浏览器不支持广播时仍可读写和刷新恢复。

## 自定义适配器，包括后端 Redis

适配器接受同步返回值或 Promise：

```ts
interface StorageAdapter {
  getItem(key: string): string | null | PromiseLike<string | null>;
  setItem(key: string, value: string): void | PromiseLike<void>;
  removeItem(key: string): void | PromiseLike<void>;
  subscribe?(listener: (key: string | null, value: string | null) => void): () => void;
}
```

Redis 放在应用后端。浏览器可以用这样的适配器访问自己的 HTTP 接口；示例接口约定 GET 返回保存的原始 JSON 文本，404 表示不存在：

```ts
import type { StorageAdapter } from 'zerodep-use/store';

const url = (key: string) => `/api/store/${encodeURIComponent(key)}`;
async function send(method: string, key: string, body?: string) {
  const response = await fetch(url(key), { method, body });
  if (!response.ok) throw new Error('保存失败');
}
const remote: StorageAdapter = {
  async getItem(key) {
    const response = await fetch(url(key));
    if (response.status === 404) return null;
    if (!response.ok) throw new Error('读取失败');
    return response.text();
  },
  setItem: (key, value) => send('PUT', key, value),
  removeItem: (key) => send('DELETE', key),
};
```

把 remote 传给 persist.storage 即可，Redis 的连接、鉴权和键管理属于后端。框架不绑定 Redis 客户端，也不要求所有后端采用示例 HTTP 路径。

store 对同一个适配器实例发出的操作按调用顺序执行，失败不会阻塞后续操作。多个 store 使用同一后端时优先共用适配器实例；跨设备并发冲突仍由后端决定。subscribe 是可选项，可接后端推送；没有它的远端适配器不会自动感知其他设备的修改。

## 需要手动保存或错误提示时

通常可以忽略 provideStore 的返回值。配置 persist 后，它返回一个控制对象：

```tsx
const persistence = providePreferences(preferences, {
  persist: { key: 'preferences', storage: remote },
});

const success = await persistence.save();
```

| 成员      | 行为                                             |
| --------- | ------------------------------------------------ |
| ready     | 首次成功恢复或显式保存后为 true，可用于页面提示  |
| error     | 最近一次错误，可在 JSX 中读取                    |
| save()    | 立即保存当前所选字段，也可明确覆盖损坏的保存内容 |
| restore() | 重新读取；初次读取尚未完成时等待同一次读取       |
| clear()   | 删除保存内容并恢复所选字段的初值，期间新编辑保留 |

三个方法都返回 Promise<boolean>。存储失败返回 false 并记录 error；未挂载、已经销毁或操作被后续请求替代时也会返回 false，此时不一定有错误。销毁后的迟到读取不会更新状态。正常卸载会尽力提交最后一次编辑，但 IndexedDB 或网络写入不保证在关闭标签前完成；需要确认保存的操作应显式 await save()。

没有 pause/resume/stop 控制器，也没有旧的 _persistLocal/_persistSession 子入口。提供者销毁时自动解除订阅；如需恢复默认值，可以直接修改状态后保存。

参考 pinia-plugin-persistedstate 的 key/storage/pick 和自动恢复配置，但不使用 Pinia、不创建全局 store 注册表，也不复制多策略、点路径、序列化插件和迁移协议。本实现另外支持异步存储。

参考：[插件配置](https://prazdevs.github.io/pinia-plugin-persistedstate/guide/config.html)、[插件存储限制](https://prazdevs.github.io/pinia-plugin-persistedstate/guide/limitations.html)。
