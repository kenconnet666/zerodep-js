# TypeScript 7.1 原生 JSX 命名空间补全研究

日期：2026-10-06。状态：已复现并定位，原生修复方案尚未实现或构建验证。

## 基线和范围

- 项目使用官方 npm `typescript@7.1.0-dev.20261005.1`。
- npm `gitHead` 与本地 TypeScript 仓库一致：`50d70a3f5f453a79a4323b263165da51f656a4e3`。
- 用户明确只面向选定的新版本，不增加旧版或多版本兼容分支。
- 本轮只研究原生语言服务修复，不更改 bind API，不替换已安装编译器，不修改 TypeScript 仓库，也不向上游发布问题或 PR。

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

直接请求原生 `textDocument/completion`，以下 `|` 为光标，不是实际源码：

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

推荐在 JSX 名称位置接受合法 `JSXNamespacedName`。判定逻辑可复用两个现有 JSX 标识符检查：

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

补全上下文判断中的 `isJsxIdentifierExpected` 也需要覆盖名称后半段和未完成的 `bind:`。应把光标所在位置归一化到完整属性名称，再复用已有 JSX 属性类型和候选过滤，避免退回全局符号补全。

修复还必须统一替换范围：在 `bind:v|` 位置接受候选时，替换完整的 `bind:v` 并插入 `bind:value`。不能只替换 `v` 却插入完整名称，产生 `bind:bind:value`。原生 completion resolve 应继续使用原始符号名来返回类型和 JSDoc。

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

## 接入判断

推荐在选定 TypeScript 7.1 源码的语言服务中修复，并随后续原生编译器共用同一份受控源码和版本。源码改动集中于补全逻辑，但真正交付仍需构建平台二进制和执行上述测试。

只在项目 MCP 中追加候选不能修复 WebStorm 直接调用的原生服务，也会重复维护类型、文档和编辑范围，因此不推荐作为主方案。修改 JSX 声明或把 bind 改名，也不能修复原生语言服务对合法命名空间属性的通用问题。

本轮没有 Go 补丁的执行验证，因此只确认根因和修复方向，不将它标记为已修复。
