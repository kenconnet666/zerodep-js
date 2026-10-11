# 开发环境与 WebStorm

使用仓库固定的 Node 24、pnpm 10.34.5 和微软官方 TypeScript 7.1.0-dev.20261011.1。依赖以 pnpm-workspace.yaml 和锁文件为准，不维护 SDK 补丁或多版本兼容。

## 安装

在仓库根运行：

```powershell
pnpm install --frozen-lockfile
pnpm exec tsc --version
```

SDK 版本应与 catalog 一致。首次启动应用或项目语言服务需先准备 core、css、compiler 的产物，命令与顺序见 [开发命令](commands.md)。无需 Go、自建 SDK 或相邻 CSS 仓库。

## WebStorm

当前已验证的配置为 WebStorm EAP 263.6259.34；其他版本需按实际编辑行为确认。

- TypeScript 选择项目 `node_modules/typescript`，保留 TypeScript 语言服务，关闭“启用服务驱动的类型引擎”。
- 启用内置 React 插件以提供通用 JSX/TSX 编辑支持；项目不依赖 React 运行时。
- 保留原生补全及“适用时自动插入括号”。Registry 中 `typescript.service.completion.customServiceContributorEnabled`、`typescript.service.completion.ownContributorsEnabled` 保持开启。
- 不启用 TypeScript“在更改时重新编译”；日常应用编译由 Vite 负责。

应实际检查 useCss 自动导入、方法括号、泛型 props、bind 属性和字符串文档。IDE MCP 的空诊断或原生 LSP 的空字符串 hover 都不能代替编辑器验收。

UI 私有工作区包的 types 指向 src/index.ts，运行时指向转换后的 dist/index.js，便于导航。CSS 使用 dist/index.d.ts、声明映射和随包源码；不开放 /src 子入口。UI 对外发布前需另外验收独立包中的类型与导航。

CSS 字符串按属性定位系统关键字和主题 token；bx 内字符串文档仍有 IDE 限制，见 [实测边界](../.design/css-string-documentation.md)。不修改 csstype 安装文件或为文档弱化类型。

## 格式化

WebStorm 的 Prettier 使用根目录 node_modules/prettier，启用保存与重新格式化操作，并覆盖子包。文件范围可使用 `**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts,json,css,html,md,yml,yaml}`。

项目配置由 .prettierrc.json、.prettierignore 和 .editorconfig 维护。Prettier 使用 Oxc 解析插件；根 format 命令的内容缓存按锁文件摘要隔离，插件升级后不会复用旧缓存。只格式化修改文件，不在保存时运行全仓库构建或测试。

## 项目语言服务

框架 LSP 与 WebStorm 原生类型服务独立运行，项目服务补充 bind 写回检查、源码映射和命名空间导航。

```powershell
pnpm --dir packages/compiler lsp:setup
```

setup 只生成忽略的 .codex/config.toml，写入本机 Node 和仓库路径；换机后重新生成，不复制旧绝对路径。Codex 中服务名为 zerodep_js_lsp；已运行的会话可能需要重新加载，生成配置不等于进程已更新。

WebStorm 默认使用内置编辑支持，不接入已撤销的 LSP4IJ 试验。其他编辑器可显式使用 compiler 提供的标准 `zerodep-language-server --stdio`。WebStorm IDE MCP 是另一项配置，地址使用 IDE 实际显示的端口。

本地只检查修改文件的 LSP 错误和必要的局部短测试。完整协议、补全、类型检查和浏览器验证交给 CI，见 [命令分工](commands.md)。

## 故障定位

- 提示陈旧：重启对应 TypeScript 服务或重新加载项目 MCP，不更换 SDK 版本。
- bind 写回错误漏检：确认使用框架检查能力，普通 TypeScript 类型检查不包含全部框架规则。
- 没有括号或 JSX 补全：检查原生补全、React 插件及输入法快捷键冲突。
- 字符串文档为空：区分普通方法参数、bx 参数和原生 LSP 路径，按当前 IDE 设置复现。

旧原生预览缓存和代理补丁步骤已移出当前指南；需要恢复旧环境时查 Git 历史，不把旧补丁应用到新版 IDE。
