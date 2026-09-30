# 基础工程交接

日期：2026-09-30。范围为工程配置与语言服务，框架实现仍待讨论。

## 已配置

- pnpm 10.34.5 workspace：`packages/core` 和 `apps/playground`。
- Node 24.18.0、TypeScript 7.0.2、Vite 8.3.1。
- core 是 private ESM 包，只有 `export {}` 空入口；具备声明、source map 和增量构建配置。
- playground 通过 `workspace:*` 使用 core，提供普通 TypeScript 基础页面、开发服务器、生产构建和预览。
- Oxlint 1.86.0、Prettier 3.9.9、统一 catalog、锁文件和忽略规则。
- Babel 8 工具链：core、CLI、parser、traverse、types、generator 为 8.0.6，TypeScript preset 为 8.0.1；补齐 `@types/convert-source-map`，保持依赖声明的完整类型检查。
- Vitest 与 V8 coverage provider 5.0.3，Playwright 1.63.0 及 Chromium、Firefox、WebKit 浏览器。
- 本地 Git 仓库已初始化；尚无提交或远程配置。
- 研究资料保存在 `.design/ts7-tsx-research.md` 和 `.design/ts7-tsx-probe-results.json`。

## LSP

独立 MCP 名称为 `zerodep_js_lsp`，从本项目 TypeScript 包启动 `tsc --lsp --stdio`。MCP 服务配置保留在本项目内。2026-09-30 经用户明确授权，仅在用户级 Codex 配置中添加本项目的 `trust_level = "trusted"` 记录，原文件其他内容保持不变。

`pnpm lsp:setup` 生成 `.codex/config.toml`，换机后重新生成。已验证重复执行不会改变配置。`pnpm lsp:verify` 使用这个生成文件中的真实 command、args 和 cwd，验证诊断、hover、definitions、references、completions。

验证过程修正了两个问题：

1. 同名 `.ts` 和 `.tsx` 会令 TSX 探针不属于预期项目。探针现在使用唯一且不同的文件名。
2. 文件监听防抖可能令修改依赖后的即时查询拿到旧诊断。桥接现在先提交待处理的文件变更，再执行查询。

首次重启后工具未暴露，原因是缺少本项目的信任记录。补上经用户授权的记录后，`codex mcp get zerodep_js_lsp --json` 返回 `enabled: true`。2026-09-30 再次重启后，当前 Codex 会话已真实暴露并直接调用五项 `zerodep_js_lsp` 工具：诊断返回 TypeScript 7.0.2 和完整报告，hover 返回 `HTMLDivElement | null`，定义跳转定位到 Vite 声明，引用返回 `app` 的三处位置，补全返回 `innerHTML` 与 `innerText`。临时 TSX 探针检出 TS2322，修复后清零，探针已删除。配置读取、独立桥接和当前会话原生工具三层验证均已完成。

## 已验证

- `pnpm install --frozen-lockfile --offline`。
- `pnpm check`，包括 core、playground、Vite 配置和 Oxlint。
- `pnpm build`，包括 core ESM/声明与 Vite 8 生产构建。
- `pnpm format:check`。
- `pnpm lsp:verify`：core TS、core TSX、playground TSX 的错误修复循环、五种语义工具、未打开依赖文件的更新、工作区边界。
- `pnpm lsp:inspect`：core 入口、playground 入口、Vite 配置和语言服务环境脚本。
- Vite 开发服务器 HTTP、TS 转换、workspace core 导入；生产预览及生成的 JS 资源。冒烟服务器与临时缓存已关闭和清理，尚未做浏览器交互测试。
- `pnpm test`：2 项 Babel 工具链测试通过，覆盖 TSX 类型移除、JSX 与 source map 保留、同名变量作用域和 AST 编辑后执行。
- `pnpm test:coverage`：V8 provider 启动与报告生成通过；core 为空模块，报告为 0/0，不代表框架业务覆盖率。
- `pnpm test:e2e`：生产构建后 Chromium、Firefox、WebKit 各 1 项页面冒烟测试通过，无未捕获的浏览器错误，预览服务由 Playwright 管理。

## 后续边界

尚未实现 `$state`、`$derived`、component、JSX runtime、DOM 或 SSR。基础页面没有使用候选框架 API。

用户随后要求提前安装 Babel 8、Vitest 和 Playwright 并做基础配置。依赖与配置现在位于工作区根目录；Babel 的 TSX 与作用域用例位于 `tests/tooling`，生产预览浏览器用例位于 `tests/e2e`。这些用于验证工具接入，具体框架编译和运行时仍待讨论。

实验源码与结果已经收录到项目 JSON；LSP 验证创建的源码由 finally 清理。本机依赖缓存、临时报告和生成的 Codex 配置不提交到仓库。
