# 开发、类型检查与框架诊断

TypeScript 7 检查原始 TSX 的类型；框架编译器检查被转换绑定的额外约束。二者一起使用，不能以一种检查通过代替另一种。Vite 接入、独立检查命令和项目诊断桥复用同一个编译器。

## 检查入口

在本仓库运行 `pnpm check`，依次准备包产物、检查各包及工具类型、检查示例的框架语义、运行 lint。已经构建后可以单独运行 `pnpm check:framework`。

compiler 包提供以下命令；在消费项目安装它后，由 pnpm 调用：

```sh
pnpm exec zerodep-check src
pnpm exec zerodep-check src/Counter.tsx --json
pnpm exec zerodep-check --stdin src/Counter.tsx --json
```

最后一条从标准输入读取源码，适合编辑器传入未保存的文本快照。检查不执行应用代码；递归扫描会排除依赖、构建产物、声明文件和常见工具目录。退出码 0 表示无框架错误，1 表示发现语义错误，2 表示参数、文件访问或检查过程失败。JSON 结果是诊断数组，包含文件名、错误码、信息及从 1 开始的行列；结束位置可选且不包含末字符。它不读取 TS 项目配置，也不替代 `tsc --noEmit`。

只想从工具调用时，可以导入 `diagnose(source, filename)`。遇到编译器自身异常会抛出错误，不会伪装成“源码无错误”。生成代码使用 `compile(source, filename)`，源码错误以 `CompileError.diagnostics` 返回。

## 自然解构与实时读取

推荐组件仍是带类型的普通参数解构，没有新增 props 宏：

```tsx
import { component, $state, $derived } from '@zerodep-js/core';

export const Counter = component(({ step = 1 }: { step?: number }) => {
  let count = $state(0);
  const doubled = $derived(count * 2);
  return <button onClick={() => (count += step)}>{doubled}</button>;
});
```

命名导入可以重命名；静态命名空间成员也受支持，例如 `import * as Z from '@zerodep-js/core'` 后使用 `Z.component`、`Z.$state`、`Z.$derived.by` 和 `<Z.For>`。静态字符串成员 `Z['$state']` 也能识别。不支持通过运行时计算的属性名、二次包装或动态导入间接调用宏；宏本身不可当作普通值转交。普通运行时函数不受这个宏限制。

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

需要保留原对象时，在外层显式保存快照，检查并捕获这个普通局部值。快照只是当前值或对象引用，不是深拷贝；后续对象内部变更仍遵循普通 JavaScript 规则。

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

TS7 的补全、跳转、引用和原生类型错误继续来自标准语言服务。项目 `zerodep_js_lsp` 的 diagnostics 额外调用已构建的 compiler，并传入同一份源码快照；输出中的 `source: 'zerodep-js'` 和 `framework` 字段标识框架诊断。编译器不可用时报告明确失败，不默默跳过。

运行 `pnpm lsp:verify` 会验证原生错误/修复、框架错误/修复、依赖刷新和项目隔离。这是独立服务验证；已运行的 Codex MCP 进程需要重启后才加载桥接脚本变更。普通 WebStorm/VS Code TS7 服务不会自动获得这个 MCP 扩展，当前可以将 `zerodep-check` 接到外部检查任务，并在 Vite 错误覆盖层看到编译诊断。没有要求安装私有 TS 插件或降级 TS 版本。

## 开发更新

Vite 插件在现有转换入口报告带位置的源码错误。示例入口通过 `import.meta.hot.accept('./App.js', ...)` 接收根应用更新，先卸载旧根，再用新组件重新 mount。局部状态明确重置；初始 SSR 页面也只在首次启动 hydrate，开发更新随后走客户端重新挂载。

编译失败时保留上一份可运行应用并展示覆盖层，修复后更新恢复。成功重新挂载会清理旧 effect、ref、事件和子作用域；不推测如何迁移闭包中的状态。自动保留开发状态暂不列为生产完成条件，避免引入复杂且不可预测的迁移协议。新组件的运行时错误仍按根入口和错误边界规则处理。

服务端开发入口使用 Vite 的 SSR Environment Module Runner 导入与更新模块。生产 SSR 使用构建产物，两条路径消费同一应用入口。

`pnpm test:dev` 使用独立临时项目验证实际 Vite HMR：交互、无需整页刷新、旧作用域清理、状态重置、编译错误覆盖层及恢复、SSR 模块更新。浏览器、服务和临时目录在结束时释放；CI 在完整浏览器用例前运行它。
