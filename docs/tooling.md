# 编译、检查与语言工具

当前源码按用户最新要求固定 JetBrains `typescript@7.1.0-dev.jetbrains.20261006.2` 与 Babel 8，Vite 负责开发和打包。项目不再编译、打补丁或分发 TypeScript SDK。接口变化集中在 `packages/compiler` 的适配层，只维护选定的 TS7.1 版本。

换机、安装缓存、应用补丁与回退的完整步骤见 [环境配置](environment-setup.md)。

## 职责

| 工作                                    | 负责工具                                        |
| --------------------------------------- | ----------------------------------------------- |
| TypeScript 类型、声明与基础语言服务     | 选定的 JetBrains TS7.1                          |
| 变量式响应性、组件、JSX、bind、框架诊断 | Babel 框架编译器                                |
| 模块解析与打包、监听、开发服务器        | Vite                                            |
| 通用 lint                               | 现有 Oxlint；ESLint 正式支持 TS7 后优先评估切换 |
| 格式化                                  | Prettier，当前沿用已验证的 Oxc parser 配置      |
| 测试                                    | Vitest、Playwright                              |

性能不作为首要目标。优先保持实现清楚、使用方便、类型提示准确和适当中文注释；不为共享一次解析引入常驻后台或跨工具缓存。

## 构建和检查

下列命令列出完整工程入口；日常本地只检查改动相关范围，完整检查、构建与测试交给 CI。

```sh
pnpm build:packages
pnpm check
pnpm build
```

普通运行时包由 SDK 的 `tsc -b` 输出 JS、声明与映射。包含框架宏的应用通过 Vite 插件转换，不能把仅经 tsc 擦除类型的宏调用作为可执行产物。

`zerodep-check -p tsconfig.json` 同时执行框架规则和SDK 类型检查。它覆盖配置包含及实际依赖的源文件，不只检查当前路由加载的组件。`--json` 输出结构化诊断；文件/目录与 `--stdin` 模式只执行框架语义检查。

Vite 保留框架语义错误反馈，不在每次转换时启动项目类型检查。生产入口先检查一次，再分别构建 client/server。原 `typeCheck` 选项和自有编译会话已移除。

## 绑定类型与映射

源码仍然使用 bind、bind:this 和组件参数解构。框架为检查器生成表达显式写回的临时源码视图：

- 原生 bind 保留其读取类型，另检查事件值能否写回。
- 必填组件属性使用普通 prop 帮助泛型推断；可选性由官方类型 API 判断，可选 bind 保留显式 undefined 的既有语义。
- bind:this 显式表达元素与清理空值的赋值，避免SDK 检查器误把回调变量收窄为初始 undefined。
- 原文不写回磁盘，诊断映射到用户文件；检查投影保留源行和 TypeScript 注释指令的作用范围。
- 类型关系由选定 TS 判断，Babel 不实现第二套类型系统。语法不完整时保留真实语法错误；API 故障明确失败，不跳过检查。

检查任务拥有并关闭自己的SDK 进程。Vite 转换不拥有 Go 进程；没有跨命令后台、租约、项目指纹缓存或专属 SDK 下载器。

## 语言工具与编辑器边界

```sh
pnpm lsp:setup
pnpm lsp:verify
pnpm lsp:completions
```

项目 `zerodep_js_lsp` 基于选定 SDK 的 LSP/API。命名空间属性补全来自 JSX 上下文中的真实符号，不硬编码候选；导航追溯组件原属性并跟随声明映射。绑定检查使用同一投影规则，普通重命名、自动导入等继续交给SDK 语言服务。

磁盘配置、独立语言工具和 IDE/已运行 MCP 进程是不同层次。独立测试通过后，已启动 MCP 仍可能需要新会话加载模块。项目工具从 `node_modules/typescript` 解析 SDK；WebStorm 类型引擎使用同版本的原生预览项；配置更改不证明旧进程已经退出。框架扩展在 IDE 中的实际接入需单独验证，不能以 MCP 成功代替 IDE 验收。

LSP 探针会在主示例目录创建临时源码，不与同一工作区的应用 check/build 同时执行。脚本负责恢复文件并关闭自己创建的服务。

### 标准编辑器接入

`zerodep-language-server --stdio` 是 compiler 包提供的标准 LSP 入口。传输与增量文档管理使用微软的 vscode-languageserver / vscode-languageserver-textdocument；它与 MCP 复用官方进程、框架检查和源码映射。编辑器连接关闭时释放官方进程与监听，多个未保存文件共享该连接的缓冲区，临时检查投影不会覆盖原文。

本机 WebStorm 已安装 LSP4IJ，可按其 [自定义服务器文档](https://github.com/redhat-developer/lsp4ij/blob/main/docs/UserDefinedLanguageServer.md) 导入模板，无需开发 JetBrains 插件：

1. 运行 `pnpm build:packages` 与 `pnpm lsp:setup`。
2. 在 WebStorm 的“语言服务器”设置中点击“＋”，在模板菜单选择 Import from custom template。
3. 选择项目 `.codex/lsp4ij` 文件夹，导入 Zerodep TS7.1。
4. 模板中的 Node/服务器路径来自当前工作区，初始化选项限定项目根目录；其他项目初始化时不启用框架能力。生成文件仅供本机使用，不提交。
5. 导入后用真实文件验证 bind: 补全、属性导航、错误/修复和未保存文本，再判断是否需关闭本项目内置 TS 诊断以消除重复提示。不要全局停用其他项目的 TypeScript。

标准协议测试覆盖跨文件未保存修改、Unicode 增量范围、绑定写回负例与修复、重命名、引用及自动导入。Windows URI 的盘符大小写和编码差异先归一化；同一绑定在投影中的读写引用合并为原文的一次编辑。补全 resolve 重开原投影并映射自动导入编辑，有限的菜单上下文在连接关闭时释放。

不声明生成代码的格式化、语义 token 或未经验证的编辑能力。WebStorm 本机已实测绑定错误/修复、补全、悬浮与导航，当前状态见执行记录。

WebStorm 自带补全与 LSP4IJ 可能同时展示同名普通候选。本机 TaskBoard 探针确认 LSP 在属性名和表达式位置各只返回一个 task，解析后的类型分别为 Task 和 NoInfer<Task>；候选列表中另一项来自 IDE 的补全合并。当前 LSP4IJ 用户配置不提供关闭 IDE 原生补全贡献者的开关。保留完整官方类型候选，不通过限制普通补全能力去掩盖界面重复；不能将没有行内详情直接解释为 any。

### WebStorm 的服务驱动类型引擎

按用户最新决定，IDE 与项目统一固定 JetBrains `7.1.0-dev.jetbrains.20261006.2`。SDK 来自 [JetBrains GitHub Release](https://github.com/JetBrains/typescript-go/releases/tag/v7.1.0-dev.jetbrains.20261006.2)，catalog 固定主包 HTTPS tarball，overrides 固定七个平台 tarball，锁文件记录完整性校验。`pnpm install --frozen-lockfile` 可直接重现，不依赖 IDE 缓存，也不修改 SDK 内核。

EAP 263.6259.34 原始代理使用旧快照 API，与新 SDK 不兼容。用户授权直接修改 IDE 代理；补丁只将两个 API 调用改为 getCurrentLanguageServerSnapshot，并将两个按配置路径查找项目的调用改为 getConfiguredProject，保留原有快照租约和释放逻辑。

`scripts/language-services/webstorm-patch.mjs <IDE目录> check|apply|restore` 管理此本机补丁。脚本只接受已验证的原文件/补丁 SHA256，备份保存在代理文件旁的 index.js.original-263.6259.34；不分发 JetBrains 代理源码。IDE 更新后校验不符就停止，需重新研究，不能盲目套用旧补丁。

IDE Registry 的 typescript.native-preview.ts-go.version 设为 v7.1.0-dev.jetbrains.20261006.2，TypeScript 选择“TypeScript 7（原生）”，开启“服务驱动的类型引擎”。发行包须先进入该版本的预览缓存，再重启 TypeScript 服务。本机已确认进程使用新 SDK，实际类型查询返回 string、泛型 number | undefined 和对象属性类型。

### 与 WebStorm 复用 LSP 的范围

[JetBrains/typescript-go](https://github.com/JetBrains/typescript-go) 为公开的 Apache-2.0 分支。实际 WebStorm 进程使用 tsc --lsp --stdio，项目 TypeScriptService 也使用相同发行版本和启动参数；双方各自拥有文档连接和进程，不共享 IDE 私有管道。

[JetBrains 公开 LSP API](https://plugins.jetbrains.com/docs/intellij/language-server-protocol.html) 是 IDE 的客户端/插件集成 API，不是可直接代替 TypeScript 的服务端。ts-go-proxy 则以 IDE 专有 JSON 命令连接 SDK API，服务于类型引擎，不能作为标准 stdio LSP 配置。

项目现有 Zerodep LSP 仍保留必要的 bind 写回检查、源码映射和命名空间导航，底层统一使用同一份 JetBrains SDK。若把入口直接换成原生 tsc LSP，会丢失这些框架增强。无需再维护第二个通用语言服务器或复制 WebStorm 插件；IDE 专有能力通过 WebStorm MCP 读取，框架能力通过项目服务读取。

## 生成类型与注释

`pnpm native:generate` 中的 native 指浏览器原生元素数据。它使用成熟的 HTML 属性数据、csstype 和选定 TS7.1 API 生成清楚的 JSX 接口，不依赖被删除的 Go 补丁。

生成文件有明确人工维护入口，禁止修改生成输出绕过检查。源码中文注释解释默认值、求值顺序、资源所有权、映射和生命周期等不明显的原因，不机械复述语句。

当前迁移验证与未完成事项见 [执行记录](execution.md)，发布规则见 [发布](releasing.md)。
