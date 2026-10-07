# zerodep-js-compiler

使用 Babel 编译标准 TS/TSX 中的 zerodep-js 框架语义，并通过官方 TypeScript 7.1 开发版检查类型。不构建或携带定制 TypeScript SDK。

保留 `_state`、`_derived`、组件参数解构、实时 rest、DOM/组件 bind、DOM bind:this、keyed 列表、SSR 与开发更新协议。普通 TypeScript 类型由官方检查器负责；绑定的隐式写回通过检查用源码表达，错误映射回原文件。

```ts
import { compile } from 'zerodep-js-compiler';

const result = compile(source, 'App.tsx');
// result.code 为运行代码，result.map 为 source map。
```

应用通过 `zerodep-js-vite` 使用编译器。项目检查使用 `zerodep-check -p tsconfig.json`，会同时执行官方类型检查和框架规则。`--json` 输出结构化诊断；显式文件/目录和 `--stdin` 模式仅检查框架语义。

预编译组件库使用 Vite library mode 输出 JS，官方 `tsc --emitDeclarationOnly` 输出声明，并在构建前运行 `zerodep-check`。Babel 与 TypeScript 只属于开发工具依赖，不进入浏览器运行时。

编辑器可使用 `zerodep-language-server --stdio`。标准 LSP 入口复用同一套官方 TS7.1、框架检查和源码映射；支持未保存文本、补全、悬浮、定义、引用、重命名和诊断。协议及增量文档同步使用微软维护的 vscode-languageserver，不维护 IDE 插件或另一套类型系统。格式化继续使用项目 Prettier。

当前固定官方 `typescript@7.1.0-dev.20261007.1`。开发版接口变化集中在本包的检查与语言工具适配中，不维护 TS6 或旧版本兼容线路。完整工具接入与迁移状态见仓库执行记录；CLI/协议检查通过不代表具体 IDE 的操作验收已完成。
