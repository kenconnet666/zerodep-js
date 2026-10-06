# 定制 TS7 工具共享的可行性与优先级

2026-10-06。基于原生路线提交 `6953332`、固定上游 `50d70a3f5f453a79a4323b263165da51f656a4e3` 和定制 SDK `7.1.0-dev.20261005.1+zerodep.native.3e8b0d4352f9`。本轮在主目录研究和运行只读实验，没有添加依赖、迁移工具或修改编译器实现。

建议把 TypeScript 语义相关能力接入现有原生项目服务：检查、emit、类型规则、代码修复、API 元数据和少量框架专属分析。普通语法 lint、打包、测试执行、多语言格式化、包管理与发布继续使用合适的现有工具。目标是减少重复解析和类型工作，同时降低维护成本；把工具统一改写为 Go 本身不构成收益。

## 当前共享到哪一层

工作区构建、检查、声明、Vite 和语言服务已经使用相同的定制 SDK。原生 `CompilerSession` 会在自己持有的项目快照里检查并 emit，框架分析挂在 SourceFile 上。Vite、MCP、编辑器和独立 CLI 仍各自管理进程，尚未统一为跨工具共享服务。

同一二进制、同一进程、同一 Program、同一 checker 是不同层次。固定上游的 `checkerpool.go` 将诊断、短期查询和持久 API checker 分开管理；连接同一个 LSP 不等于全部类型计算只发生一次。API 的 Type/Symbol 句柄也不能跨 checker 或失效快照任意复用。

最先值得处理的是现有重复调度：根 `check` 先构建包，再逐包启动检查，最后单独检查工具和示例；生产 Vite 又有自己的项目会话。应复用已有构建结果和项目诊断，并研究 BuildOrchestrator 与项目引用，保留测试类型、工具配置等独立项目的必要检查。不同编译配置不能强行合并为一个 Program。

源码依据：[checker 所有权](https://github.com/microsoft/TypeScript/blob/50d70a3f5f453a79a4323b263165da51f656a4e3/tsc/internal/project/checkerpool.go)、[API 会话](https://github.com/microsoft/TypeScript/blob/50d70a3f5f453a79a4323b263165da51f656a4e3/tsc/internal/api/session.go)。

## 工具取舍

| 能力                                    | 复用对象与实现方式                                        | 必要性与优先级                                                |
| --------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| 项目检查、框架诊断、JS/DTS/map          | 已有 Program、绑定、checker 与 emit；统一调度和服务所有权 | P0，高，现有成本最直接                                        |
| 类型相关 lint                           | 在现有 checker 的受控使用周期内运行选定 Go 规则           | P1，高；先覆盖 Promise 误用、分支穷尽和明确的 unsafe 操作     |
| 框架诊断 quick fix                      | 原始 AST、绑定身份和文本范围，输出版本化 TextEdits        | P1，高；先做确定性修复，语义选择提供建议                      |
| import 整理、重命名、引用与导航         | 复用上游 LSP 实现                                         | P1，高；不用再写一套语义引擎                                  |
| TS/TSX 格式化                           | 上游 Go formatter 直接使用已有 SourceFile                 | P1 试验；接受其排版规则后有接入价值                           |
| Prettier 完全相同的排版                 | Go AST 转为其 printer 所需 AST，或维护自己的 printer      | 低优先级，成本高，不能视作换解析器即可完成                    |
| 普通 Oxlint / ESLint 规则               | 需要移植规则或转换 AST、作用域与插件接口                  | 目前收益低，保留 Oxlint；不做通用 ESLint 兼容层               |
| 包边界与依赖方向检查                    | 模块解析结果、导入/导出、入口配置与 package.json          | P1，高；适合阻止 Node/编译工具泄漏到浏览器包                  |
| 未使用导出、文件和依赖                  | 项目图加 exports、测试、脚本、动态入口规则                | P2；只实现项目需要的确定范围，不复刻全部 Knip 插件            |
| 公开 API 与声明审查                     | 导出符号、签名、JSDoc、声明 emit                          | P1，中高；先做可审阅的 API 清单与声明差异                     |
| API 文档                                | 原生服务批量导出文档模型，Node 负责页面渲染               | P2；不整体迁移 TypeDoc                                        |
| 类型驱动校验器、JSON Schema、接口客户端 | checker 类型信息驱动显式支持的代码生成                    | P2，按实际需求；JSON 可表达类型优先，不承诺任意 TS 类型可生成 |
| JSX 可访问性与 SSR 静态检查             | 原始 JSX、元素类型、绑定身份与运行环境                    | P2；检查明确的静态错误，动态 DOM 行为仍需浏览器验证           |
| 组件检查与源码定位                      | 利用现有 Go emit 的开发元数据与 source map                | 已有基础，按功能扩展；运行时面板仍在 JS/DOM 中执行            |
| Vitest 文件转换                         | 经现有 Vite 插件接入原生输出，测试引擎保留                | 按 TSX 组件测试需求接入；不接管断言、隔离、mock 或调度        |
| Vite/Rolldown 打包与压缩                | 消费 Go 生成的 JS 和映射                                  | 保留；其模块图、分块和生成 JS 解析是独立职责                  |
| Playwright、覆盖率、运行时性能分析      | 消费执行结果、浏览器行为和映射                            | 保留对应工具；TS AST 不能替代运行数据                         |
| HTML/CSS/JSON/YAML/Markdown 格式化      | 需要各语言的解析器与规则                                  | 保留专用工具，不能用 TS AST 完成                              |
| 属性数据生成、npm/pnpm、许可证、CI/CD   | 外部数据、文件和发布状态                                  | 保留现有小脚本；没有明显的 TS 语义复用收益                    |

其中 Promise、unsafe 和可访问性规则应按框架实际约定配置，区分错误与建议；不能为减少告警而全局跳过 async 事件，也不能把所有启发式提示当成编译错误。上游已有的 unused 检查和编辑操作优先复用。

原生包边界检查补充现有产物验证，不替代打包器的最终模块图；type-only import、条件导出、虚拟模块和资源导入需要按各自语义处理。

## 可以借鉴的项目

**tsgolint** 已经提供接受 `Program` 与 SourceFile 的 `RunLinterOnProgram`，但要求调用期间独占相关 checker。本轮核对 `24b18b48c47b7ae0d84e21a0e974575026e27908`：它仍使用 `typescript-go/shim/*` 与自己的固定上游，我们使用 `TypeScript/tsc`。直接安装 `oxlint-tsgolint` 会由它另建项目，不能共享本项目已经完成的检查。建议固定参考源码，适配必要规则、辅助代码和测试，保留许可证，沿用我们的版本和调度。[规则入口](https://github.com/oxc-project/tsgolint/blob/24b18b48c47b7ae0d84e21a0e974575026e27908/internal/linter/linter.go)、[依赖](https://github.com/oxc-project/tsgolint/blob/24b18b48c47b7ae0d84e21a0e974575026e27908/go.mod)、[Oxlint 分工](https://oxc.rs/docs/guide/usage/linter/type-aware.html)

**Effect-TS/tsgo** 已把领域诊断、quick fix 和 lint 接入原生语言服务，并支持检查阶段一次运行与缓存。它证明了框架专属语义工具的路线可行，但其支持版本、Effect 规则和兼容层不应直接成为我们的依赖。[固定提交说明](https://github.com/Effect-TS/tsgo/blob/d1e539c4956bf4b2d1643c58e1477f7597b20d5b/README.md)

**TypeDoc / API Extractor** 适合借鉴公开 API 报告、文档模型和声明检查目标。所核对 TypeDoc 提交仍接收传统 TypeScript Program、Symbol 和 Type；不能直接传入 Go API 对象。先由原生服务导出我们需要的 API 数据，比迁移整个文档框架更容易维护。声明文本差异也不等于已证明语义不兼容。[TypeDoc 转换器](https://github.com/TypeStrong/typedoc/blob/6d8c856bbb46b089371952981f113c3e318818fd/src/lib/converter/converter.ts)、[API Extractor 文档模型](https://api-extractor.com/pages/overview/demo_docs/)

**Knip** 当前主要利用解析、解析模块路径和图可达性，包配置中采用 Oxc parser/resolver。未使用依赖分析还需要识别 package scripts、公开入口和动态加载，不能只遍历 TS import。这个领域可以做原生专项检查，但不值得为了省一次解析而重写所有生态适配。[工作原理](https://knip.dev/explanations/how-knip-works)、[固定依赖清单](https://github.com/webpro-nl/knip/blob/a8bf4bfaeba2ee0aaf756b343789de9fff75a1fa/packages/knip/package.json)

## 原生接口的实测结果

实验通过项目现有 language-client 启动一个自有 LSP，打开仅存在于该服务内存中的 TSX 文件。未修改磁盘源码或用户 IDE 缓冲区；结束后关闭 API 客户端、快照和自有进程。

| 实验                            | 结果                                                |
| ------------------------------- | --------------------------------------------------- |
| `textDocument/formatting`       | 返回 5 处编辑，保留 `bind:value={name}`             |
| `source.organizeImports`        | 删除未使用的 `_snapshot`，保留用于宏转换的 `_state` |
| 两个独立 API 管道连接同一个 LSP | 都定位到主示例项目，语义诊断为零                    |
| 两个客户端读取 JS 与声明 emit   | 均成功，JS 包含实际 `.state(...)` 框架转换          |

连接机制是现有 `custom/initializeAPISession` 与 `API.fromLSPConnection`，不是重新序列化完整 AST。该实验验证了功能和连接能力，没有统计 parser 调用、checker 构造或每个类型查询，因此不把它当作“所有计算只做一次”的性能证明。

固定上游的 formatter 从语言服务取得原始 SourceFile；整理 import 也接收现成 Program。工具可以通过现有操作返回 TextEdits，避免另起 JS 语义模型。[格式化源码](https://github.com/microsoft/TypeScript/blob/50d70a3f5f453a79a4323b263165da51f656a4e3/tsc/internal/ls/format.go)、[编辑操作](https://github.com/microsoft/TypeScript/blob/50d70a3f5f453a79a4323b263165da51f656a4e3/tsc/internal/ls/codeactions.go)、[API 管道](https://github.com/microsoft/TypeScript/blob/50d70a3f5f453a79a4323b263165da51f656a4e3/tsc/internal/lsp/server.go)

## 格式化与 WebStorm 的实际取舍

同一段含中文、bind 和长属性的 TSX，原生 formatter 保留了长单行与原有双引号，最长一行为 207 个字符；Prettier 根据项目配置改用单引号并拆分 JSX，最长一行为 117 个字符，长字符串本身仍超过 printWidth。两者输出不同，不能直接替换后声称格式不变。

存在三个方向：

1. **保留当前 Prettier/Oxc。** 改造成本最低，现有保存、粘贴、选区与光标行为已验证，TS 解析独立运行。
2. **采用 Go 原生 TS/TSX 格式化。** 复用 SourceFile，沿用上游规则；增加薄的 CLI/IDE 适配，不自己写完整 printer。建议先对注释、长行、Unicode、错误中的 TSX 和选区做试验，再决定是否切换。
3. **保持精确 Prettier 输出并共享 Go AST。** 需要适配其 AST 格式、注释归属、位置与 Doc printer。跨进程传整树和转换对象本身可能抵消解析节省，维护成本最高，当前不推荐。

Prettier 插件允许自定义 parser/printer，WebStorm 支持项目插件配置、保存和选区格式化。因此可以研究以薄适配保留 IDE 入口并转发给原生服务，但这属于尚未验证的方案：必须处理整文件/选区、UTF-16 光标、Windows URI 标准化、未保存文本、ignore/config、错误恢复和多语言文件；使用 Prettier 的调用入口并不表示采用 Prettier 的排版规则。[Prettier 插件契约](https://prettier.io/docs/plugins)、[WebStorm 接入](https://www.jetbrains.com/help/webstorm/prettier.html)

单纯把 WebStorm 的 TypeScript SDK 指向同一二进制，也不会自动让 Prettier、Vite 或 MCP 连接其进程。先统一我们控制的 CLI/Vite/MCP；WebStorm 的服务发现、连接生命周期和编辑器格式化操作单独验收。[TypeScript SDK 选择](https://www.jetbrains.com/help/webstorm/settings-languages-typescript.html)

## 当前成本观察

Windows x64、Node 24.18.0，三轮串行、每轮新进程；使用现行配置，没有安装额外工具。以下对象和工作量不同，仅用于判断各项现有成本，不用于工具速度排名或接入收益承诺：

| 命令负载                                                                                 | 三次耗时 ms           | 中位数   |
| ---------------------------------------------------------------------------------------- | --------------------- | -------- |
| 全仓 Oxlint，Node 启动安装包的 bin，参数 `. --deny-warnings`                             | 481 / 416 / 419       | 0.419 s  |
| `node scripts/format.mjs --check . --no-cache`                                           | 10147 / 11937 / 11596 | 11.596 s |
| `node scripts/native/tsc.mjs -p apps/example/tsconfig.json --noEmit --incremental false` | 14573 / 13331 / 13687 | 13.687 s |

普通 lint 当前很轻，重写整套规则的收益空间小。类型检查成本更值得避免重复。格式化扫描了 TS、文档及配置等不同文件，11.596 秒不能全部归因于 TS 解析；编辑器常驻单文件延迟也不能由这个全仓 CLI 数字推断。

## 维护成本可控的实施顺序

1. **统一项目服务和调度。** 明确独立进程所有者与附着客户端，缓存按源码版本、编译器摘要、配置和规则版本区分。优先去掉同一配置与版本的重复检查，沿用上游 checker 持有规则，保持编辑器请求优先级。
2. **接入少量高价值语义能力。** 类型相关 lint、框架 quick fix、现成 import 操作、包依赖边界、公开 API 清单。返回诊断、TextEdits 或小型结构化模型，不向每个工具传整棵树。
3. **试验格式化适配。** 先使用现成 Go formatter 验证 CLI 与 WebStorm 操作和用户可接受的排版；保持每种文件只有一个格式化所有者。
4. **按需求加入生成与分析。** API 文档、JSON 类型校验、有限的依赖可达性和静态 JSX 检查。Vitest 的 TSX 转换可复用现有 Vite 插件，但 mock/测试隔离/断言继续由测试框架负责。[Vitest 插件配置](https://vitest.dev/config/)

共享服务需隔离编辑器未保存内容和磁盘构建的派生快照；客户端关闭只释放自己的引用。Vite 的开发、SSR 和客户端选项目前会影响 Program 创建，应先分清语义选项与纯输出选项，不能假定都可共享同一个 Program。代码修复或格式化改变文本后，必须对新版本重新解析和检查，不为追求字面“一次解析”使用旧结果。

验收同时看正确性和成本：记录 parser 调用、Program 更新、checker 创建/获取与检查次数，测冷启动、热请求、单文件和依赖编辑、配置变化、内存、取消和 IDE 延迟。基线是当前单一原生路线。收益来自被消除的重复工作，扣除 IPC、数据转换、缓存维护和调度开销；没有实测前不承诺倍数。
