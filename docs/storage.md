# 浏览器持久化

当前接口在 main 开发版本，尚未包含于 RC1。通过 `zerodep-js/storage` 可选子入口使用；不要求改变变量式状态，也不在根入口加载存储代码。

```tsx
import { component, $state } from 'zerodep-js';
import { persistLocal } from 'zerodep-js/storage';

const Preferences = component(() => {
  const prefs = $state({ compact: false, name: '' });
  const storage = persistLocal('app.preferences', prefs);
  return (
    <input
      value={prefs.name}
      onInput={(event) => {
        prefs.name = event.currentTarget.value;
      }}
    />
  );
});
```

直接对象绑定保持根对象/数组身份，通过字段更新恢复内容。使用稳定的 `$state` 普通对象或数组，不在绑定后替换根变量；不可替换字段和形态不匹配会报错。需要整体赋值或保存单个值时明确提供读写：

```ts
let theme = $state('system');
const storage = persistLocal('app.theme', {
  read: () => theme,
  write: (next) => {
    theme = next;
  },
});
```

`persistSession` 使用相同契约，但默认宿主为 sessionStorage。工厂必须在组件或显式作用域中调用；在组件外使用 createScope，并由调用方销毁。动作方法可以在事件里调用。

## 恢复、同步与提交

- SSR 不访问 window/storage，也不运行迁移；客户端先完成 hydration，再恢复本地值。
- 默认值不会主动写入不存在的键，已有数据也不会被初始化默认值覆盖。首次恢复前已有的新编辑优先，包括接管前 input 回放。
- 对象恢复按已验证的数据替换自身可枚举字段，移除不再存在的字段；不会隐式深合并缺失字段。需要新字段默认值时在 migrate/validate 中明确提供。
- 同页使用同一存储对象的绑定主动同步；跨标签页使用原生 storage 事件。收到外部提交时取消本实例的旧排队写入并应用提交，避免来回回写。这是提交事件覆盖规则，不是协作编辑或事务冲突解决。
- writeDelay（毫秒，默认 0）合并写入。0 仍受响应式微任务批次合并；不会每写一个字段就立即同步写磁盘。
- 动态键可以传 getter。切换前尝试提交旧键排队快照，再恢复新键；旧键提交失败会报告错误并保留待写内容，不能将新键数据写回旧键。
- 卸载和 pagehide 在已成功初始化且未暂停时尝试提交当前值，再移除监听/定时器。浏览器强制终止无法保证最后写入，关键内容可显式 flush。

## 控制句柄

| 成员             | 含义                                                                  |
| ---------------- | --------------------------------------------------------------------- |
| ready            | 是否已成功取得有效的存储初态；写失败时仍可为 true                     |
| status           | idle / ready / paused / error / stopped                               |
| error            | 最近错误；没有错误为 undefined，不默默吞掉存储失败                    |
| flush()          | 立即提交当前值/待写数据，成功为 true；暂停、未恢复或失败为 false      |
| reset()          | 恢复创建时的默认快照并明确保存；暂停中保留保存意图至恢复              |
| remove()         | 删除保存项并恢复默认内存状态，不随即把默认值重新写回                  |
| retry()          | 初始化失败时重新恢复；已恢复时重试当前状态保存。删除失败需再次 remove |
| pause()/resume() | 暂停双向同步，保留本地编辑；无本地变化时恢复会读取外部最新值          |
| stop()           | 按上述规则尝试最终提交后永久停止；重复调用安全                        |

状态字段可直接在 JSX 中读取，控制句柄没有状态容器 `.value`。错误回调自身失败时合并到 error，不能阻断其他实例的同步。

## 数据版本与外部校验

默认存储是 JSON，支持范围和序列化行为遵循 JSON；需要 Date/Map 等特殊恢复逻辑时由 validate 显式转换，不冒充无损对象数据库。持久化不是 IndexedDB 的替代。

```ts
persistLocal('app.preferences', prefs, {
  version: 2,
  writeDelay: 100,
  migrate(value, previousVersion) {
    if (previousVersion === 1) return { ...(value as object), compact: false };
    return value;
  },
  validate(value) {
    // 可使用应用已有 schema；框架不绑定特定校验库。
    return preferenceSchema.parse(value);
  },
});
```

存储封装为 `{ format: 'zerodep-js-storage', version, value }`。无封装的旧 JSON 按版本 0 处理，必须明确迁移。更高版本、损坏 JSON、校验失败不会自动删除或覆盖；修复原始数据后 retry，或由用户明确 reset/remove。

读写、迁移和校验必须同步。默认不推断业务字段 schema，TypeScript 类型不能验证外部数据；需要严格数据契约时提供 validate。storage 选项接受自定义同步 StorageLike 或惰性工厂，window 用于选择事件目标；它们在客户端挂载后才访问。

当前真实任务页已使用此入口保存未提交的新任务草稿；验证页演示双实例同步、迁移和错误恢复。IndexedDB、服务端同步、加密与身份体系不属于本入口。
