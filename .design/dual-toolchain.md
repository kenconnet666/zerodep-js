# TS6 传统线路与定制 TS7 原生工具共享方案

2026-10-06。状态：研究与隔离验证完成，依赖、编译脚本和 IDE 配置尚未迁移。用户确认 `apps/hosts` 使用 TS6 与传统编译器，`apps/example` 使用项目定制 TS7-Go；原生线路的目标是共享解析树、Program 和类型检查结果。

建议保留一套运行时和 ABI 2，按包分开编译工具依赖。原生线路先统一检查、框架转换和 JS/DTS 输出，再把类型相关 lint、语言服务操作接入同一项目服务。格式化需要单独选择输出规则：TypeScript 原生格式化可以利用已有 AST，Prettier 的排版结果不能通过更换编译器直接保留。

用户再次明确：Vue、Svelte、React 兼容路线是完整的传统路线。其安装、类型检查、框架转换、构建、格式化、IDE 和宿主测试均不依赖定制 TS-Go；传统环境不需要 Go SDK 或原生平台包。原生工具共享方案只作用于原生线路。

## 工具链分工

| 范围                                                | 目标工具链                               | 责任                                        |
| --------------------------------------------------- | ---------------------------------------- | ------------------------------------------- |
| `packages/compiler`                                 | TypeScript 6.0.3、Babel 8                | 传统框架转换与诊断                          |
| `packages/vue`、`packages/react`、`packages/svelte` | TS6 与各自官方工具                       | 宿主适配，不接入定制 Go                     |
| `apps/hosts`                                        | TS6、Babel、Vue/Svelte/React Vite 插件   | 三种宿主的演示、开发、构建和测试            |
| `packages/core`、`packages/use`、`packages/ssr`     | 建议用 TS6 生成共享 JS 和声明            | 同时供两条线路消费，不复制运行时            |
| `packages/native` 与六个平台包                      | 固定 TS7 API 客户端与定制 Go 二进制      | 原生转换、检查、语言服务及后续规则          |
| `apps/example`                                      | 定制 TS7-Go                              | 原生框架主示例与性能验收                    |
| `packages/vite`                                     | TS6 可编译的公共适配层，按消费者选择后端 | 传统消费端不安装 Go，原生消费端不加载 Babel |
| 根目录脚本与测试                                    | 按所服务线路拆分范围                     | 根 `tsc` 不隐式承担原生 API 检查            |

截至研究时，npm 已发布的 TS6 稳定版本最高为 **6.0.3**。原生线路保持已验证的 **7.1.0-dev.20261005.1**、上游提交 `50d70a3f5f453a79a4323b263165da51f656a4e3` 与项目补丁，不跟随 `latest` 或 `next` 浮动。传统 TS6 是独立构建线路；原生后端不增加旧编译器兼容分支。

共享包以 TS6 能检查的源码和公开声明为边界。TS7 消费其声明并执行 ABI 2；不向运行时的公开类型泄漏 `typescript/unstable/*`、原生 Program 或 checker。两条线路仍需分别验证消费结果，不能只凭 TS6 通过就推断全部 TS7 语义一致。

## TS6 可行性验证

在独立临时目录安装 `typescript@6.0.3`，用其真实 `tsc` 检查当前工作区，未改动仓库依赖或锁文件。执行参数为 `-p <包>/tsconfig.json --noEmit --incremental false --composite false --pretty false`。

| 检查对象                                                 | 结果                                 |
| -------------------------------------------------------- | ------------------------------------ |
| compiler、vite、use、ssr、vue、react、svelte、apps/hosts | 八个项目通过                         |
| core                                                     | 开发态组件的循环类型推断产生四条诊断 |
| core 加一处内存类型覆盖                                  | 零诊断，磁盘源码未修改               |
| `vue-tsc@3.3.12` 与 TS6 检查宿主 `.vue`                  | 通过                                 |
| `svelte-check@4.7.6` 与 TS6 检查宿主 `.svelte`           | 零错误、零警告                       |

core 的差异集中在 `packages/core/src/dev/runtime.ts` 的 `component` 初始化过程中引用自身。下面的显式类型在 TS6 CompilerHost 内存覆盖实验中消除了全部四条诊断：

```ts
const component: AnyComponent = defineComponent((props: Props) => {
  // 其余实现保持原样。
});
```

普通 `apps/hosts/tsconfig.json` 仅包含 TS/TSX，`*.vue` 模块声明不能替代模板检查。因此隔离验证另建了临时配置，显式包含 `.vue` 和 `.svelte`，运行官方检查器后删除。正式迁移应把这两项纳入传统线路检查。

这些结果基于当前源码和已有构建声明，证明迁移阻力较小；完整的干净安装、TS6 构建、打包、宿主开发及浏览器测试仍是迁移阶段的验收要求。原始结果见 [验证记录](probes/dual-toolchain-results.json)。

## core 双产物的准备条件

用户允许必要时将 core 分成 TS6 和 TS7 两种产物。当前建议先共用 TS6 能生成的 JS 与声明；保留同源双构建的方案，以实际输出或类型契约差异作为拆分依据。

额外实验对同一份 core 源码应用前述一行内存类型覆盖，分别调用 TS6 编译 API 和项目定制 TS7 的 Program emit，在内存中捕获完整 JS 与声明，未覆盖源码或 `dist`：

| 对照项                                   | 结果                     |
| ---------------------------------------- | ------------------------ |
| core 类型检查                            | TS6、定制 TS7 均为零诊断 |
| 两边输出文件数                           | 各 70 个                 |
| 输出文本一致                             | 66 个；全部 JS 一致      |
| 归一化后的输出 AST 一致                  | 70 个                    |
| TS6 宿主消费 TS6 生成的 core 声明        | 零诊断                   |
| 定制 TS7 主示例消费 TS6 生成的 core 声明 | 零诊断                   |

文本差异仅出现在 `runtime/flow.d.ts`、`native/properties.d.ts`、`native/data.d.ts`、`jsx-runtime.d.ts`。AST 对照忽略注释、位置和字面量原始拼写，不表示这些文件逐字一致。实验没有比较 source map/declaration map，也没有替代浏览器运行验收。

可复现脚本为 [core-output-research.mjs](probes/core-output-research.mjs)，结果为 [core-output-results.json](probes/core-output-results.json)。脚本在当前已构建的工作区运行，参数是独立安装 `typescript@6.0.3` 的目录中的 `package.json` 绝对路径：

```sh
node .design/probes/core-output-research.mjs <isolated-directory>/package.json
```

后续如果仅声明需要差异化，优先保留一个 JS 运行时，生成传统与原生两套声明入口。如果定制转换、运行时代码或 ABI 确实分化，再从同一源码分别构建两套完整产物，并由消费者明确选择。不能依赖 JS 运行时自动识别使用者的 TypeScript 版本，也不能只靠换目录就让同一应用安全混用两份有全局响应式状态的运行时。

两套完整产物将增加出口映射、发布文件、源码映射、消费测试和版本同步的维护范围。正式拆分时必须验证传统产物独立安装，不含原生工具依赖，并验证宿主适配与页面代码最终解析到同一运行时实例。

## 依赖和构建入口

使用 pnpm 的 named catalogs，使每个包的 `typescript` 名称只对应一条线路：

```yaml
catalogs:
  traditional:
    typescript: 6.0.3
  native:
    typescript: 7.1.0-dev.20261005.1
```

传统包使用 `typescript: catalog:traditional`；原生 Node 适配包使用 `typescript: catalog:native`。根工具链采用 TS6。原生命令显式调用项目的 `zerodep-tsc`，避免两个编译器的 `tsc` bin 在根目录争用。named catalogs 会在 pack/publish 时解析为普通版本依赖。[pnpm 文档](https://pnpm.io/10.x/catalogs)

目前有几个必须一起处理的入口：

- `scripts/native/build.mjs`、`scripts/language-services/build-typescript.mjs` 从根 `package.json` 解析 TypeScript。需要改为从原生包解析固定 TS7 客户端与标准库。
- `scripts/native/benchmark-worker.mjs` 在根目录导入 `typescript/unstable/async`。原生 API 的使用和解析必须归属原生包，不能意外解析为根 TS6。
- `tsconfig.tools.json` 混合传统配置、原生测试及脚本，需按线路拆分。统一根命令可以顺序调度两个检查，不让一个 checker 遍历两套工具实现。
- Vite 当前开发依赖包含两个后端，源码中的后端类型导入会扩大检查依赖。应以最小结构化编译接口隔离适配层，保持运行时按需装载；原生专有选项和类型留在原生实现及测试中，不为几个接口新建空包。
- `apps/hosts` 固定 Babel 并移除原生开发依赖和环境变量切换；`apps/example` 固定 native。包级后端语义对照测试可保留独立夹具，无需让宿主演示参与 Go 验收。
- 传统开发、检查和构建命令使用明确的包过滤范围，不再以全量 `build:packages` 为前置。共享 core/use/ssr 与传统 Vite 适配层可由 TS6 独立构建；传统包的安装图和构建图都不得传递拉入原生 SDK。全仓维护命令可以显式调度两条线路，但不能成为启动宿主演示的唯一入口。

原生自举顺序为：构建定制 Go SDK，再用该 SDK 检查和构建原生 Node 适配器，最后构建主示例。官方 TS7 npm 在这条线路提供 API 客户端与标准库；调用时指定项目二进制路径，不自动使用官方 Go 可执行文件。

两个编译器的 API 对象和枚举值也不能混用。配置分别交给所属版本解析，再使用该版本的 API 类型；不把 TS6 的 Program、AST 或数值枚举直接传给 TS7 客户端。

## 哪些工作已经共享

| 能力                               | 当前状态                                       | 下一步                     |
| ---------------------------------- | ---------------------------------------------- | -------------------------- |
| 原生框架分析与 emit                | 已嵌入定制编译器，缓存分析数据，使用 ABI 2     | 保持源码与声明分支边界     |
| 原生 `CompilerSession` 检查后 emit | 同一快照与项目内执行诊断和 `getJavaScriptEmit` | 统一 CLI、Vite 和工具入口  |
| `compile()` 单文件入口             | 每次通过 `transpileModule` 处理                | 多文件工具优先使用持久会话 |
| 定制语言服务的补全、导航、诊断     | 已使用定制 SDK                                 | 暴露服务连接供其他工具复用 |
| Vite、MCP、WebStorm 跨宿主共享     | 尚未统一所有者与连接                           | 采用现有 LSP API 会话机制  |
| Prettier 加 Oxc parser             | 使用独立 Oxc AST                               | 不计为 TS-Go AST 复用      |
| 当前 Oxlint                        | 独立解析与规则执行                             | 类型规则单独移植到原生服务 |
| 根 `check`                         | 多个工具独立运行，仍含 Babel 诊断              | 按两条线路分工调度         |

同一路径、同一二进制版本并不能让独立进程共享内存。统一原生工具的关键是项目服务持有文件版本、快照与 Program，工具提交操作并领取结果。不同 TS 配置、服务端与浏览器条件可能需要不同 Program；共享目标是消除相同输入和配置下的重复工作。

## 原生项目服务

固定上游已经提供 `custom/initializeAPISession`。它从 LSP 创建连接到现有项目 Session 的 API 管道，Node 端通过 `API.fromLSPConnection({ pipe })` 和 `getCurrentLanguageServerSnapshot()` 访问。无需重新设计 AST 序列化协议，也不应先导出完整 AST 再让每个 JS 工具重建模型。

隔离实验启动一个项目定制 LSP，创建两个 API 客户端并检查同一个 `apps/example/tsconfig.json`。两次检查均无错误，第一次语义诊断约 2689.92 ms，第二次约 0.83 ms。两个客户端的快照句柄分别为 2 和 3；该实验验证共享服务连接与缓存路径，并未统计 parser 调用或证明不同句柄对象完全相同，不能当作完整性能基准。

建议复用 `packages/native` 中的会话管理，增加两种所有权：独立命令拥有并关闭服务；附着客户端只释放自己的会话和快照。每个 API 客户端申请独立管道，不能让多个 LSP 客户端争用同一个 stdio。由服务所有者维护版本、连接和关闭时机，构建结束不能误杀编辑器服务。

编辑器未保存内容属于编辑器快照。Vite 或磁盘构建使用派生快照，不能把打包器传入的转换文本写回编辑器的标准视图。缓存至少区分编译器摘要、项目配置、文件版本、编译选项和 lint 配置；配置及依赖变化应正确使缓存失效。checker 按上游池的所有权规则借用，不跨 checker 混用 Type，也不把串行共享误作可安全并发。

第一步在自有 CLI、Vite、MCP 之间接通服务。WebStorm 启动的服务没有现成的外部 API 管道发现契约；要与其进程真正共用，还需在 SDK 启动器或 IDE 集成中增加受控连接发现并实测。仅把 IDE 指向相同 SDK 是版本一致，不能作为跨进程缓存共享的验收。

源码依据：[LSP 接入](https://github.com/microsoft/TypeScript/blob/50d70a3f5f453a79a4323b263165da51f656a4e3/tsc/internal/lsp/server.go)、[API 会话](https://github.com/microsoft/TypeScript/blob/50d70a3f5f453a79a4323b263165da51f656a4e3/tsc/internal/api/session.go)、[checker 池](https://github.com/microsoft/TypeScript/blob/50d70a3f5f453a79a4323b263165da51f656a4e3/tsc/internal/project/checkerpool.go)。

## 工具接入优先级

| 工具或工作                                | 可复用的数据                       | 推荐方式与代价                                                              |
| ----------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------- |
| 类型检查、框架诊断、JS/DTS 输出           | SourceFile、绑定、Program、checker | 优先统一；使用现有原生会话，收益直接                                        |
| 类型相关 lint                             | SourceFile 与 checker              | 将选定 Go 规则接入同一 Program；初期覆盖 Promise 误用和分支穷尽等高价值规则 |
| 代码修复、重命名、整理 import、类型元数据 | 语言服务与项目快照                 | 复用上游实际暴露的操作；扩展部分在 Go 内返回 edits/结果，避免传整树         |
| 原生 TS/TSX 格式化                        | SourceFile、token、注释            | 使用 TypeScript 原生 formatter，不需要 checker；必须接受其排版规则          |
| Prettier 风格的格式化                     | 部分语法信息可转换                 | Go AST 与 Prettier AST、注释及 doc printer 不同，适配成本高，排在后面       |
| 通用 Oxlint 与 ESLint 插件                | 规则语义可参考，AST API 不同       | 不直接宣称零成本接入；保留独立运行，按重复解析成本选择值得移植的规则        |
| 测试、覆盖率、打包压缩                    | 消费 JS、source map 或声明         | 保持原工具职责；打包器解析输出 JS 不等于重复进行 TS 类型检查                |
| Vue/Svelte 模板、宿主 React 工具          | 各自编译器和语言服务               | 固定在传统线路                                                              |

tsgolint 有接受 `Program` 和 `SourceFile` 的 `RunLinterOnProgramOptions`，说明规则可以放在已有类型项目上运行。但所考察提交仍导入 `github.com/microsoft/typescript-go/shim/*`，当前定制编译器是 `github.com/microsoft/TypeScript/tsc`。应固定参考提交，将需要的规则与支持代码适配到当前源码并保留许可证和测试；只安装 `oxlint-tsgolint` 再运行 CLI 会创建另一套项目，达不到共享目标。[规则入口](https://github.com/oxc-project/tsgolint/blob/c8f5cbc884b706c42efb8b451fe31d2f1079df10/internal/linter/linter.go)、[依赖版本](https://github.com/oxc-project/tsgolint/blob/c8f5cbc884b706c42efb8b451fe31d2f1079df10/go.mod)

不建议现在把全部 ESLint 插件或 Prettier printer 移植到 Go。原生线路先让高价值类型规则在已有 checker 上运行，并通过 LSP 发布相同诊断、修复，再衡量普通语法 lint 是否值得迁移。CLI 和编辑器应输出相同规则编号及文本范围。

## 格式化与 WebStorm

传统线路继续使用现有 Prettier、Oxc parser 及 Svelte 插件。Oxc 加速解析但独立建树；Prettier 本身通常不需要 TypeScript checker，因此它的潜在节省主要是解析与进程启动，不是类型推断。

如果原生线路以 AST 共享为优先，建议原生专属 TS/TSX 文件使用定制语言服务中的 TypeScript formatter；共享运行时和传统目录继续归 Prettier。必须按文件范围分配唯一格式化所有者，并验证保存、粘贴、格式化选区、整文件操作和 CI check 的一致性。两个 formatter 不能轮流重写同一文件。若必须保留 Prettier 的精确排版，则继续现有加速方案，不将其标记为共享 AST；这项权衡应在正式格式化改造前确定。

WebStorm 官方配置提供项目 TypeScript 包选择和自定义 SDK。现有 `.idea/compiler.xml` 已指定定制 SDK，不能假设按目录安装两个版本就自动获得正确的服务分流。建议先以两个项目窗口建立可验证边界：传统范围使用 TS6，原生示例范围使用定制 SDK；确认项目范围、配置查找、引用源码和检查行为后，再考虑单窗口整合。本轮未改变用户 IDE 设置。[WebStorm TypeScript 配置](https://www.jetbrains.com/help/webstorm/settings-languages-typescript.html)

TypeScript 自带 formatter 能读已有 SourceFile，但 WebStorm 的默认 Reformat 是否调用该路径还需要实测；若默认使用 IDE 自己的格式化器，需提供显式工具操作或编辑器适配。不能把选择定制 SDK 等同于 Prettier 或 IDE formatter 已接入其 AST。

## 实施顺序与验收

1. **完成工具链分离。** named catalogs、包级依赖、检查范围、根脚本解析和主示例后端一起调整；core 加显式类型。在没有定制 SDK 和原生平台包的干净消费者中验证 TS6 构建、两种 SFC 检查、传统宿主消费和开发测试；原生主示例保持现有语义矩阵。
2. **统一原生服务入口。** 自有 CLI、Vite、MCP 复用项目服务；保留独立命令启动模式，验证引用计数、异常断开、增量失效、未保存编辑与磁盘构建隔离。WebStorm 共享进程作为独立集成验收。
3. **接入类型规则和编辑操作。** 先移植少量实际需要的 Go lint 规则，复用上游 checker 调度；CLI、LSP、fix 输出一致。用已有 AST/类型驱动后续元数据操作。
4. **决定原生格式化规则。** 先比较代表性 TSX、`bind:`、注释和多行泛型的结果；接受 TS formatter 规则后再切换原生目录，否则保留 Prettier 并清楚标记独立解析。
5. **更新性能基线。** 对照组改为 TS6+Babel，实验组为定制 TS7；分别测冷启动完整检查与构建、热请求、单文件编辑、依赖改动和配置变更，报告峰值内存及启动进程数。

性能验收还应记录 parse 次数、Program 创建与更新次数、checker 获取与实际检查次数，以及语言服务/构建工具的服务 ID。对同一文件版本和配置发起多个工具请求时，证明工作被复用；不能只凭工具使用 Go 或第二次请求更快判断完成。旧报告的整体构建对照是官方 TS7+Babel，其差值不能直接套用到新的 TS6 线路。

CI 应让传统构建、TS6 与 SFC 检查、宿主浏览器测试独立于 Go 编译矩阵启动。六平台任务继续构建和验证定制 SDK；原生主示例及包消费使用其产物。最终发包仍汇总同一提交的全部必需检查和固定 tgz，不降低跨平台验收门槛。
