# 开发、类型检查与框架诊断

固定的 JetBrains TS7.1 SDK 负责类型检查与语言服务，Babel 负责框架转换与语义诊断，Vite 负责开发和打包。工具职责、检查投影和编辑器边界见 [工具链](tooling.md)，换机按 [环境配置](environment-setup.md) 操作。

## 运行时与应用工具源码职责

| 目录/入口                               | 职责                                                                                  |
| --------------------------------------- | ------------------------------------------------------------------------------------- |
| runtime/                                | 响应式图、状态、调度队列、组件、props、模板描述、上下文、生命周期和快照，不操作 DOM   |
| dom/                                    | 节点挂载、hydration、列表/错误区域、属性/property、表单与原生事件清理                 |
| native/                                 | 客户端与 SSR 共用的名称、文本、样式、序列化和 property 所有权规则，以及生成的属性数据 |
| index.ts / internal.ts / jsx-runtime.ts | 公共运行时、编译 ABI 与 JSX 类型入口                                                  |

上表均位于 packages/core/src。应用工具独立位于 packages/use/src：storage/ 管理持久化、版本/校验及同页/跨页同步；router/ 管理匹配、历史、导航、SSR 数据与页面呈现；storage.ts/router.ts 是对应的公开子入口。

use 和 SSR 均通过同版本 core 的公开 API 与必要的 internal 协议共享组件身份、调度和所有权，不能跨包导入 core/src 或复制状态内核；core 不反向依赖 use。不要在 runtime/native 中增加 window/document 访问。生成数据维护入口仍为 scripts/generate-native.mjs，产物在 native/data.ts。改目录时同步检查声明映射、生成脚本、资源验证与独立消费，移除已经失效的旧构建文件。

## 检查入口

CI 使用 `pnpm check` 做完整工程检查。本地只运行改动相关的文件/类型夹具检查和焦点测试，不把完整测试列为每次提交的本地前置。应用项目使用 `zerodep-check -p tsconfig.json`，通过选定 SDK 检查类型，同时执行框架规则。

zerodep-js-compiler 的 compile 输出 JS/map，diagnose 检查单文件框架语义。普通包与声明输出使用选定 SDK 的 tsc，框架应用使用 Vite。

## 自然解构与实时读取

推荐组件仍是带类型的普通参数解构，没有新增 props 宏：

```tsx
import { _component, _state, _derived } from 'zerodep-js';

export const Counter = _component(({ step = 1 }: { step?: number }) => {
  let count = _state(0);
  const doubled = _derived(count * 2);
  return <button onClick={() => (count += step)}>{doubled}</button>;
});
```

命名导入可以重命名；静态命名空间成员也受支持，例如 `import * as Z from 'zerodep-js'` 后使用 `Z._component`、`Z._state`、`Z._derived.by` 和 `<Z.For>`。静态字符串成员 `Z['_state']` 也能识别。不支持通过运行时计算的属性名、二次包装或动态导入间接调用宏；宏本身不可当作普通值转交。普通运行时函数不受这个宏限制。

解构 props 及 For 的 row/index 是实时只读绑定。默认表达式只在输入为 undefined 时参与求值，遵循缓存与依赖更新规则；普通函数体中的局部解构、赋值和传参继续是当前取值。详见 [语义契约](semantics.md)。

## 判空、回调与 await

TS 认为参数或 const 派生是普通变量，但编译后每次读取可能取得新值。外层判空不能保证用户点击时或 await 结束时仍非空：

```tsx
// ZJ1501：这个检查发生在渲染时，点击可能晚得多。
return user ? <button onClick={() => open(user.name)}>打开</button> : null;
```

需要点击时的最新对象时，在回调内取值并检查：

```tsx
return user ? (
  <button
    onClick={() => {
      const current = user;
      if (current) open(current.name);
    }}
  >
    打开
  </button>
) : null;
```

需要保留原对象时，在外层保存当前值，检查并捕获这个普通局部变量。这里仍是对象引用，后续对象内部变更遵循普通 JavaScript 规则；需要脱开的数据副本时使用 _snapshot(value)。

```tsx
const current = user;
if (!current) return null;
return <button onClick={() => open(current.name)}>打开创建时的对象</button>;
```

可辨识联合需要重新检查相应判别字段，仅重新判真值不够。异步逻辑要明确选择“调用前快照”或“await 后重新取值并检查”；框架不跨 await 保留依赖跟踪或作用域。

另一个边界是初始化语句与持续渲染的区别：

```tsx
// ZJ1501：初始化 if 不重跑，后面的 JSX 文本仍会更新。
if (!user) return null;
return <span>{user.name}</span>;

// 持续选择分支，并在分支失效时先销毁它的子绑定。
return user ? <span>{user.name}</span> : null;
```

普通局部 `const view = user ? <span>{user.name}</span> : null` 的外层条件也只取值一次。需要动态选择时，把条件放进组件返回表达式或 JSX 内容位置；需要快照时显式保存普通值。

ZJ1501 是保守的源码边界检查，不是第二套 TypeScript 类型系统。它识别源码内的 if、条件/逻辑表达式、提前返回、switch 和 await/yield，以及相关局部别名；不会证明任意外部断言、复杂函数的纯度或深层对象不变性，也不替开发者检查所有潜在空值错误。难以证明等价的自定义检查可能需要改成局部取值和明确条件。基础类型错误仍由 TS7 报告；通过所有静态检查也不等于运行时逻辑必然正确。

`_state` / `_derived` 调用不会把输入关系变成 TS 的条件别名。例如 `const dirty = _derived(draft !== task.title)` 可以控制按钮显示，而按钮回调正常读取 `task.title`；检查器不把 dirty 的数据依赖误判为 task 的收窄。若变量自身可空，仍须按照其真实 TS 类型在本次调用判空，派生布尔值不能替代这个检查。

## 错误码

| 错误码      | 含义及修正方向                                                           |
| ----------- | ------------------------------------------------------------------------ |
| ZJ1000      | TSX 解析失败；修正所指源码语法                                           |
| ZJ1001–1004 | 宏成员、声明位置、参数或 var 不符合规则；使用明确的 let/const 初始化     |
| ZJ1005      | 重写 const 状态或只读派生；修改源状态而非派生结果                        |
| ZJ1006      | 直接导出响应式绑定；用普通 getter、读取函数和操作方法跨模块传递          |
| ZJ1007–1009 | 不支持的写入目标、直接 eval 或宏逃逸；保留显式词法声明与逐项写入         |
| ZJ1200–1202 | 组件入口形式错误；使用内联同步函数及一个 props 参数                      |
| ZJ1203      | 写入 props 参数、解构绑定或 props/rest 顶层属性；通过回调交回拥有者      |
| ZJ1204–1205 | 嵌套/动态解构或默认表达式词法依赖不支持；使用 props 对象或清楚的前序参数 |
| ZJ1206      | component 标记被间接转交；直接包装组件函数                               |
| ZJ1207      | 读取保留的 key 输入；业务字段使用 id 等名称                              |
| ZJ1400–1401 | For 回调形态或 row/index 写入错误；使用内联同步只读参数                  |
| ZJ1501      | 延后读取继承了失效的收窄；按上文明确持续读取和快照边界                   |

## 编辑器和 Codex 诊断桥

项目桥接器使用官方 LSP/API 和 Babel 检查投影；补全从真实 JSX 属性类型取符号，导航跟随声明映射。独立验证入口为 `pnpm lsp:verify` 与 `pnpm lsp:completions`，本机配置通过 `pnpm lsp:setup` 生成。

WebStorm 的服务驱动类型引擎选择同版本的 **TypeScript 7（原生）**，缓存与 EAP 代理补丁按 [环境配置](environment-setup.md) 操作；项目工具从 `node_modules/typescript` 读取 SDK。这是两个独立入口，原生 SDK 不会自动加载框架增强。源码检查和框架检查之间的区别、绑定限制见 [工具链](tooling.md)。IDE MCP 曾漏报编辑器可见的 TS 错误，不能把空诊断作为验收证据。

MCP 传输使用 vscode-jsonrpc 与 JSON Schema 校验，未引入 MCP SDK 或 Zod。修改桥接器后，已运行 MCP 进程需重新加载；先完成独立验证，再检查当前会话。

## 开发更新

Vite 插件在现有转换入口报告带位置的源码错误，并自动注入开发检查与组件热更新。兼容更新保留组件直接声明的可迁移本地数据；状态声明、组件身份或导出结构改变时按规则重置或交给导入方重建。示例入口原有的显式根接收仍作为后者的回退；初始 SSR 页面只在首次启动 hydrate。

编译失败时保留上一份可运行应用并展示覆盖层，修复后更新恢复。新子树准备成功后替换旧子树，旧 effect、ref、事件和子作用域继续释放；可迁移数据与不可迁移资源分别处理。检查面板、复制边界、父子实例重建和错误恢复见[开发检查与热更新](devtools.md)，不承诺整个组件树或 DOM/焦点的保留。

服务端开发入口使用 Vite 的 SSR Environment Module Runner 导入与更新模块。生产 SSR 使用构建产物，两条路径消费同一应用入口。

依赖扫描也经过框架转换，避免按默认 React JSX 扫描出错误依赖；`.mts/.mjs` 中的显式宏与普通 TS/JS 使用同一规则。预编译依赖继续跳过 node_modules，产物消费验证见 [包产物](packages.md)。

`pnpm test:dev` 使用独立临时项目验证实际 Vite HMR：兼容数据保留、声明变化及手动重置、旧监听清理、编译/执行错误恢复、导出变化、检查面板与开发 SSR 接管。浏览器、服务和临时目录在结束时释放；CI 在完整浏览器用例前运行它。

示例与开发夹具使用 `server.watch.awaitWriteFinish`，在文件稳定 100 毫秒后处理完整写入，每 20 毫秒检查一次。这个保存策略避免分段写入和短时间的错误/修复被底层文件监听合并，代价是少量开发更新延迟；未向断言添加固定 sleep，也不改变框架插件使用者的全局监听配置。宿主应用可以根据编辑器保存行为选择相应 Vite 设置。
