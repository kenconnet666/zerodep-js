# TypeScript 7.1 原生 JSX 命名空间补全研究

日期：2026-10-06。状态：用户随后授权全面校验并修复；原生补丁、项目 SDK 构建和补全回归矩阵已实现。

## 基线和范围

- 项目使用官方 npm `typescript@7.1.0-dev.20261005.1`。
- npm `gitHead` 与本地 TypeScript 仓库一致：`50d70a3f5f453a79a4323b263165da51f656a4e3`。
- 用户明确只面向选定的新版本，不增加旧版或多版本兼容分支。
- 原生修复位于 `patches/typescript-7.1.0-dev.20261005.1.patch`，只支持该提交与 npm 版本；不更改 bind API，不向上游发布问题或 PR。

## 独立复现

使用单独 tsconfig，设置 `jsx: preserve`、`module: esnext`、`moduleResolution: bundler`、`strict: true`、`types: []`、`lib: [es2023]`，没有导入 zerodep-js、MCP SDK 或 Zod。

```tsx
export {};
declare global {
  namespace JSX {
    interface Element {}
    interface IntrinsicElements {
      input: {
        normal?: string;
        'aria-label'?: string;
        'bind:value'?: string;
        'on:click'?: () => void;
        'invalid:a:b'?: string;
      };
    }
  }
}
```

修复前直接请求原生 `textDocument/completion`，以下 `|` 为光标，不是实际源码：

| 位置                                                         | 实际结果 |
| ------------------------------------------------------------ | -------- |
| `<input                                                      | />`      | 有 normal、aria-label，没有 bind:value、on:click        |
| `<input bind                                                 | />`      | 同上                                                    |
| `<input bind:                                                | />`      | 返回 Array、Map 等全局符号及关键字，丢失 JSX 属性上下文 |
| `<input bind:v                                               | />`      | 同上                                                    |
| `declare const attrs: JSX.IntrinsicElements['input']; attrs. | `        | 有 bind:value 和 on:click，以属性访问的方括号编辑返回   |

完整的 `<input bind:value="ok" on:click={() => {}} />` 没有类型错误，仅报告未使用变量提示。说明属性声明、类型解析和合法语法都存在，问题集中在补全路径。

探针文件、临时配置目录和原生语言服务子进程已清理。

## 变化来源

官方 7.0.2 的 `gitHead` 是 `2bd066d87f5bafd315be9f40889d0a60b9e58e0b`。其 scanner 的 JSX 标识符检查允许 `-` 和 `:`。

2026-08-28 的 [PR #63996](https://github.com/microsoft/TypeScript/pull/63996)，提交 [a6fab636](https://github.com/microsoft/TypeScript/commit/a6fab636c7840e8430a02d4a5e7137ac55f78aa9)，重构了标识符扫描，将 JSX 分支改为只允许 `-`，并注明冒号属于 `JSXNamespacedName`，不属于单个 `JSXIdentifier`。

该语法区分是正确的：命名空间名由两个 JSXIdentifier 和中间一个冒号组成。应补齐语言服务对组合名称的处理，不回滚 scanner，也不全局允许任意带冒号字符串。

## 两个已定位的缺口

### 1. 合法候选在显示名称筛选中消失

`tsc/internal/ls/completions.go` 的 `tryGetJsxCompletionSymbols` 获取属性符号后，把完成种类设为 `CompletionKindMemberLike`。

后续 `getCompletionEntryDisplayNameForSymbol` 使用 `scanner.IsIdentifierText(name, LanguageVariantJSX)` 过滤。`bind:value` 现在不再通过该检查，又不是其 computed-name 特例，因此 MemberLike 分支返回空名称，候选被删除。

补丁在 JSX 名称位置接受合法 `JSXNamespacedName`。判定逻辑复用两个现有 JSX 标识符检查：

```go
func isJsxNamespacedNameText(name string) bool {
    namespace, local, ok := strings.Cut(name, ":")
    return ok &&
        scanner.IsIdentifierText(namespace, core.LanguageVariantJSX) &&
        scanner.IsIdentifierText(local, core.LanguageVariantJSX)
}
```

仅在已有 JSX 名称上下文使用它。空前缀、空后缀、额外冒号和非法名称继续被排除；普通 JS 标识符规则不变。

### 2. 输入冒号后未识别属性名称的父节点链

`tryGetContainingJsxElement` 已处理命名空间标签，但对子标识符到 `JsxNamespacedName`、再到 `JsxAttribute` 的路径缺少归一化，且冒号 token 未进入相关分支。

补丁在补全数据收集阶段把光标归一化到完整属性名称，覆盖名称后半段和未完成的 `bind:`，并复用已有 JSX 属性类型和候选过滤。注册冒号自动触发，仅在 JSX 命名空间属性上下文启用。

补丁统一替换完整名称：在 `bind:v|` 位置接受候选时，替换完整的 `bind:v` 并插入 `bind:value`；明确返回 textEdit，不依赖客户端自行推测单词范围。filterText 保持原始属性名，不混入 snippet 占位符。原生 completion resolve 继续使用原始符号名返回类型和 JSDoc。

## 验证范围

原生回归测试放在 `tsc/internal/fourslash/tests`，至少覆盖：

1. 空属性位置、输入 bind、输入 bind:、输入 bind:v，接受补全后的源码正确。
2. 完整名称及名称中间位置、冒号两边的空白、不同 UTF-16 长度的前置文本。
3. `bind:value`、`on:click`、`xml:lang`，以及带连字符和 Unicode 的合法 namespace/local 名。
4. 拒绝 `:value`、`bind:`、`invalid:a:b` 等非法完整候选。
5. 已存在属性不重复建议、spread 属性与可选成员排序保持现有行为。
6. intrinsic 和组件 props 的命名空间属性；命名空间标签、普通属性和普通属性值表达式不受影响。
7. plain text 与 snippet 两种客户端能力下的 textEdit、filterText、详情和文档。
8. 重跑 zerodep-js 的 `pnpm lsp:verify`；不能删除、放宽或把 bind 补全断言改成跳过。

## 项目内交付

`scripts/language-services/typescript-target.json` 固定 npm 版本、上游提交和补丁版本。`pnpm typescript:build --source <TypeScript Git 仓库> [--go <Go 1.27 可执行文件>]` 在临时 worktree 中应用补丁并构建，不污染源码仓库或 pnpm store。它复制官方 npm SDK/平台包布局和许可，将新的原生可执行文件安装到 `.codex/typescript-sdk`，并记录源码、补丁及二进制摘要。重复执行核对缓存和 SDK 入口，缺失或损坏会重新构建。

项目 MCP 固定使用生成的 SDK，WebStorm 的 TypeScript 包目录也选择该 SDK。CI 从固定上游提交构建 Linux SDK，再执行完整 LSP 检查和 `pnpm lsp:completions`。这只是语言服务补丁，框架的 Go 转换后端仍未实施。

只在项目 MCP 中追加候选不能修复 WebStorm 直接调用的原生服务，也会重复维护类型、文档和编辑范围，因此不推荐作为主方案。修改 JSX 声明或把 bind 改名，也不能修复原生语言服务对合法命名空间属性的通用问题。

## 其他补全检查

项目矩阵覆盖宏导入、自动导入、命名空间、raw/by、状态变量、props 与解构、HTML 标签/闭合标签/属性/事件、currentTarget/ref、ARIA、SVG、bind/prop/自定义命名空间、For 行/索引参数、泛型组件、字面量、style、可选链、联合收窄及 router/storage 子入口。每个候选都实际应用主编辑和自动导入编辑，并再次请求完整类型诊断。

检查另发现 ARIA 已知名称被开放的 `aria-*` 索引签名吞掉候选。core 的 NativeProps 现显式纳入已有生成数据中的 ARIA 属性，不手写另一套属性清单；仍允许任意合法的 `aria-*` 值。

另一个原生遗漏出现在未写大括号的 JSX 属性表达式：`value=te` 选择 text 时原先生成 `value=text`。原生代码登记了 initializer 节点，却漏设 isInitializer；补丁恢复该标记，使编辑生成 `value={text}`。对应上游原先跳过的 `TestCompletionsJsxAttributeInitializer2` 已恢复并通过，项目也增加实际插入及类型检查用例。

## 命名空间属性的定义导航

用户随后在 WebStorm 报告 `<NameField bind:value={custom} />` 无法跳转。用独立的 `+zerodep.1` 原生服务复现：`bind` 与 `value` 均返回空定义，原生 input 也一样；组件名、普通 value 属性和 custom 变量正常。补全和 hover 成功不代表定义导航已实现。

缺口分两层：原生定义服务未把 namespace/local 子节点归一化到 `JsxNamespacedName`，也没有像 hover 一样按 JSX 上下文读取完整属性名；组件原先按新字符串集合生成 `bind:${K}`，类型中没有保留原 value 属性的来源。

修复后的定义服务复用既有上下文属性查询，对没有直接声明的映射属性使用 `GetRootSymbols` 追溯来源，不改变 checker 的重命名行为。core 的正向绑定分支改为重映射 `Required<Pick<P, K>>` 的键，值仍取 `P[B]`，因此绑定保持必填且保留原值的 undefined。去除原属性的 readonly 修饰，保持此前生成绑定键的修饰符语义；普通属性与绑定的互斥条件不变。

`+zerodep.2` 下，原生绑定跳到 jsx-runtime 的具体属性声明，组件绑定跳到业务 props 中的原 value。原生回归覆盖 namespace/local、直接与映射组件属性、自定义 prop、命名空间标签；项目 LSP 回归验证 14 个位置，包括实际 AuthoringExample、跨文件可选/泛型 props，严格比对目标文件和源属性位置。类型回归继续检查可选值、readonly、泛型实参、必填回调和错误值类型。

这一阶段仍是项目 SDK 修复，官方 npm 包本身没有修改。WebStorm 必须加载项目 SDK 后才具备此能力；原生协议验证与 IDE 实际加载状态分别记录。
