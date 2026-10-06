# 开发、类型检查与框架诊断

项目定制 TypeScript 7.1 同时检查原始 TSX 类型和框架绑定约束。CLI、Vite 与项目语言服务使用同一个定制 SDK；持续编辑通过原生项目会话复用快照与 Program。

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

在本仓库运行 `pnpm check`，使用定制 SDK 构建包产物、检查各包与工具类型、报告框架语义错误，再运行 lint。独立项目使用原生 CLI：

```sh
pnpm exec zerodep-tsc -p tsconfig.json --noEmit
pnpm exec zerodep-tsc -p tsconfig.json --jsx react-jsx
```

CLI 读取项目配置，原始类型与框架语义在同一编译器中检查；`noEmit` 仍报告框架错误。语言服务支持未保存的编辑内容。Node 工具可使用 `diagnose(source, filename)` 获取单文件框架诊断，`compile` 输出 JS/map；完整类型检查或连续编辑使用 `createCompiler`，结束后关闭会话。源码错误通过 `CompileError.diagnostics` 返回，内部异常不会伪装成无错误。

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

命名导入可以重命名；静态命名空间成员也受支持，例如 `import * as Z from 'zerodep-js'` 后使用 `Z.component`、`Z._state`、`Z._derived.by` 和 `<Z.For>`。静态字符串成员 `Z['_state']` 也能识别。不支持通过运行时计算的属性名、二次包装或动态导入间接调用宏；宏本身不可当作普通值转交。普通运行时函数不受这个宏限制。

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

需要保留原对象时，在外层保存当前值，检查并捕获这个普通局部变量。这里仍是对象引用，后续对象内部变更遵循普通 JavaScript 规则；需要脱开的数据副本时使用 snapshot(value)。

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

TS7 的补全、跳转、引用、原生类型错误和框架语义错误来自同一个原生语言服务。框架分析直接挂在原始 SourceFile 与检查流程中，项目桥接器不再调用 Babel 诊断进程。MCP 输出中的 `source: 'zerodep-js'` 和 `framework` 字段标识框架诊断；普通 LSP 客户端能直接收到带 ZJ 编号的错误。

项目桥接器使用 MCP `2025-11-25` 的 stdio JSON-RPC：按行传输 JSON，公开五个只读工具，参数用 JSON Schema 描述并在服务端校验。传输和请求调度复用 `vscode-jsonrpc`，不依赖 MCP SDK 或 Zod；`json-lines.mjs` 负责分帧，`mcp-client.mjs` 服务独立检查脚本。协议依据为 [MCP stdio](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) 和[生命周期](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle)。

官方 npm `typescript@7.1.0-dev.20261005.1` 有 JSX 命名空间属性的补全回归。项目维护固定上游提交的原生补丁，修复候选筛选、冒号上下文、编辑范围及自动触发；MCP 直接调用修复后的服务，不补造候选。core 同时显式保留已生成的 ARIA 属性以提供候选，见[原生补全修复记录](../.design/typescript71-jsx-completions.md)。

首次设置语言服务先准备 Go 1.27 和包含固定提交的 TypeScript 源码，再运行：

```sh
pnpm compiler:native:build --source <TypeScript源代码路径> --go <Go可执行文件路径> --test
pnpm lsp:setup
pnpm lsp:verify
pnpm lsp:completions
```

Go 已在 PATH 时可省略 `--go`。生成的 `packages/native-<平台>/typescript` 保留官方平台 SDK 与标准库布局，版本为 `7.1.0-dev.20261005.1+zerodep.native.<源码摘要>`，同时包含框架转换、框架诊断和补全修复。项目 MCP 在 SDK 缺失或补丁不匹配时明确要求重新构建，不回退到缺少修复的服务。`lsp:completions` 同时核对候选、文档、实际插入/自动导入编辑及插入后的类型诊断。

WebStorm 的 TypeScript 设置需要选择构建命令输出的**平台包目录**。Windows x64 为 `packages/native-win32-x64/typescript`。WebStorm 2026.2.3 从 SDK 根目录的同级查找平台包，不会按 Node 的规则进入根目录内的 node_modules；直接选择 `.codex/typescript-sdk` 虽然显示正确版本，实际服务却可能回退到内置 TypeScript 6.0.3。应用设置后，点击状态栏的语言服务图标，确认当前文件运行的是 `TypeScript-Go 7.1.0-dev.20261005.1+zerodep.native.<摘要>`；只看设置页的版本号不够。

运行 `pnpm lsp:verify` 会验证原生错误/修复、框架错误/修复、依赖刷新和项目隔离。这是独立服务验证；已运行的 Codex MCP 进程需要重启后才加载桥接脚本变更。选择项目原生 SDK 的 WebStorm/VS Code 会直接得到框架诊断；选择官方 SDK 时只能得到官方 TS 诊断，应改选项目定制 SDK 获得完整诊断。没有要求安装私有 TS 插件或降级 TS 版本。

验证还通过标准 `textDocument/rename` 检查响应式变量、组件导出、跨文件 import 和 JSX 引用，并仅把编辑应用到本次临时探针。它证明标准 TS7 协议能力，不代替某个 IDE 自身的完整操作验收。

WebStorm 2026.2 已提供 TS7 原生支持；选择上述平台包后，本机的 service-powered type engine 控件由 IDE 自动禁用，不手动改注册表或退回旧版 TS。[JetBrains 配置说明](https://www.jetbrains.com/help/webstorm/settings-languages-typescript.html)

2026-10-06 在 WebStorm 2026.2.3 实测项目 `+zerodep.2`：NameField 的 bind:value 可用 Ctrl+B 跳到业务 value 声明，基本补全把 bind 插入为 bind:value，英文输入 bind:va 自动显示同一候选且 Tab 接受后的属性名正确。中文输入法可能拦截 Ctrl+空格并输入全角冒号 `：`，这与语言服务候选缺失不同；代码使用 ASCII `:`，必要时通过“代码 → 代码补全 → 基本”检查。

本机 WebStorm 2026.2 重启后，事件提示正确给出 MouseEvent 与 HTMLButtonElement；响应式变量、组件导出、跨文件 import 与 JSX 重命名均实际执行并核对。用户确认故意类型错误在编辑器中显示 TS2322，修复后独立 TS7 对定义和使用文件均返回完整的零错误报告。临时文件在核对后清理。

该版本 IDE MCP 的 get_file_problems / lint_files 对上述错误返回空结果，而编辑器可见诊断与独立 TS7 能正确发现；目前不能把 MCP 空结果用作 TS7 验收。此前出现的插件异常与接口超时在重启后未阻止本轮操作，其具体因果关系未确定。工具诊断继续使用项目 LSP 或 pnpm check；不因接口漏报而降级 TS 或修改其他项目设置。

## 开发更新

Vite 插件在现有转换入口报告带位置的源码错误，并自动注入开发检查与组件热更新。兼容更新保留组件直接声明的可迁移本地数据；状态声明、组件身份或导出结构改变时按规则重置或交给导入方重建。示例入口原有的显式根接收仍作为后者的回退；初始 SSR 页面只在首次启动 hydrate。

编译失败时保留上一份可运行应用并展示覆盖层，修复后更新恢复。新子树准备成功后替换旧子树，旧 effect、ref、事件和子作用域继续释放；可迁移数据与不可迁移资源分别处理。检查面板、复制边界、父子实例重建和错误恢复见[开发检查与热更新](devtools.md)，不承诺整个组件树或 DOM/焦点的保留。

服务端开发入口使用 Vite 的 SSR Environment Module Runner 导入与更新模块。生产 SSR 使用构建产物，两条路径消费同一应用入口。

依赖扫描也经过框架转换，避免按默认 React JSX 扫描出错误依赖；`.mts/.mjs` 中的显式宏与普通 TS/JS 使用同一规则。预编译依赖继续跳过 node_modules，产物消费验证见 [包产物](packages.md)。

`pnpm test:dev` 使用独立临时项目验证实际 Vite HMR：兼容数据保留、声明变化及手动重置、旧监听清理、编译/执行错误恢复、导出变化、检查面板与开发 SSR 接管。浏览器、服务和临时目录在结束时释放；CI 在完整浏览器用例前运行它。

示例与开发夹具使用 `server.watch.awaitWriteFinish`，在文件稳定 100 毫秒后处理完整写入，每 20 毫秒检查一次。这个保存策略避免分段写入和短时间的错误/修复被底层文件监听合并，代价是少量开发更新延迟；未向断言添加固定 sleep，也不改变框架插件使用者的全局监听配置。宿主应用可以根据编辑器保存行为选择相应 Vite 设置。
