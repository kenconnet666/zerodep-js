# 定制 TS7 原生工具

当前源码在固定 TS7-Go 中实现框架分析与类型规则，自有 Vite、异步 Node 编译接口和只读 MCP 使用工作区共享服务。同步单文件 `compile()` 与独立 `zerodep-tsc` CLI 仍自行启动原生进程，适用于一次性转换和构建自举。WebStorm 使用同一平台 SDK，但由 IDE 管理独立进程。

## 默认工程流程

`pnpm build:packages` 使用一次 `tsc -b tsconfig.build.json` 调度五个包，按项目引用完成类型检查、JS、声明和映射输出，并保留增量构建信息。`pnpm check` 随后只检查主示例与工具/测试配置，再运行 Oxlint；不在已经检查过的包构建之后逐包重复检查。`pnpm build` 在包构建后运行示例 CSR/SSR 打包。

`pnpm check:projects`、`pnpm check:config` 和 `pnpm check:shared` 使用常驻原生服务。普通应用配置进入 noEmit 增量检查；包含项目引用的配置保留完整检查，避免覆盖引用项目的输出契约。`pnpm build:packages` 保留原生 CLI 自举与增量构建。服务的冷启动仍有完整检查成本，主要收益来自连续修改和跨命令复用，实测见 [常驻服务性能](native-daemon-performance.md)。

工作区的 `zerodepLint: true` 启用三个 Go 类型规则，与 TS 语义诊断使用同一个 checker：

| 编号   | 范围                                             | 明确的处理方式                                              |
| ------ | ------------------------------------------------ | ----------------------------------------------------------- |
| ZJ2001 | 表达式语句中未处理的 Promise                     | await、return、保存引用、处理 rejection，或用 void 明确丢弃 |
| ZJ2002 | Promise 回调传给只声明同步 void 返回值的函数参数 | 使用同步回调并明确处理异步结果                              |
| ZJ2003 | 有限字面量/枚举/可空联合的 switch 遗漏           | 补全 case 或声明 default                                    |

这是有限的原生规则集，不承诺覆盖 ESLint/tsgolint 的所有场景。`void` 表示作者明确接管责任，不会自动捕获 rejection；保存 Promise 也不证明稍后一定消费。测试工程包含有意的错误样例，因此 `tsconfig.tools.json` 不默认启用这些规则。类型规则不改变框架诊断始终执行的契约。

## 使用命令

安装后的原生包提供 `zerodep-tools`。在源码工作区可用 `node packages/native/dist/tool-cli.js` 代替该命令。

```sh
zerodep-tools check -p tsconfig.json
zerodep-tools lint -p tsconfig.json
zerodep-tools build -p tsconfig.json
zerodep-tools imports src/App.tsx --json
zerodep-tools imports src/App.tsx --write
zerodep-tools fix src/App.tsx
zerodep-tools fix src/App.tsx --action 0 --write
zerodep-tools boundary src/App.tsx --browser --package-root .
zerodep-tools api -p tsconfig.json src/index.ts --baseline api.json --update
zerodep-tools api -p tsconfig.json src/index.ts --baseline api.json
zerodep-tools format src/App.tsx --json
zerodep-tools status
zerodep-tools stop
```

`check` 尊重配置中的 lint 开关，`lint` 显式启用；`NativeTools.check(projects, { lint: false })` 可以显式关闭。检查期间文件变化时返回 `complete: false` 和变动路径，CLI 失败退出，不把中途过期的结果记作通过。

import 整理和 quick fix 来自原生语言服务。当前框架修复支持将发生写入的单个 `const _state` 声明改为 `let`，不批量改写其他绑定。写入前校验原文、范围、重叠、Unicode 边界；涉及多个文件或额外命令的操作不能由单文件入口部分执行。格式化使用 TS-Go 自身规则，不保证与 Prettier 输出相同，默认 Prettier/Oxc 和 WebStorm Prettier 配置不变。

包边界读取 Go 的模块解析结果，检查浏览器源码的直接 Node/构建工具运行时导入及跨包私有源码引用；不扫描未知动态字符串，也不替代最终打包产物检查。公开 API 报告包括入口导出类型和各声明文件的摘要，可用于审阅变化，不是语义兼容性证明。core 的真实报告约 571 KB，因此报告保留为按需工具，不进入保存动作。

## 共享与生命周期

```ts
import { createCompiler, NativeTools } from 'zerodep-js-native';
const compiler = createCompiler({ root: projectRoot });
const tools = new NativeTools(projectRoot);
try {
  const output = await compiler.compile(source, filename);
  const check = await tools.check(['tsconfig.json']);
  const status = await tools.stats();
} finally {
  await compiler.close();
  await tools.close();
}
```

同一工作区、SDK 摘要、Node 工具版本和服务策略对应一个本机服务，服务持有一个 Go LSP/API 进程。相同配置的磁盘编译客户端共用 Program 与输出缓存；内存文本与磁盘不一致时使用独立编译会话，不能污染其他客户端。Go 类型规则复用正在检查文件的 checker；import、quick fix、元数据复用 LSP 所持项目。不同编译选项、声明检查与 LSP 项目仍可能拥有各自 Program，不承诺全生态只有一棵 AST。统计里的 `programsCreated` 是适配层计数，不是 Go 解析器调用次数。

文件监听负责及时失效；工程检查和编译缓存复用前另外核对配置、根文件列表、依赖文件、包元数据和安装目录指纹。关闭客户端释放其私有状态，磁盘编译引擎保留供后续命令使用。最后一个连接断开后默认保留 5 分钟，随后退出；服务按需启动，不注册系统启动项。异常退出后下次请求可重连。原生请求失联时有超时与最终清理上限，服务不继承测试加载器或 npm/GitHub 发布凭据。

| 环境变量                  | 默认值 | 作用                                               |
| ------------------------- | -----: | -------------------------------------------------- |
| ZERODEP_IDLE_TIMEOUT_MS   | 300000 | 最后一个连接断开后的进程保留时间，100–3600000 毫秒 |
| ZERODEP_CACHE_TIMEOUT_MS  | 300000 | 空闲编译与检查快照的保留时间，100–3600000 毫秒     |
| ZERODEP_MAX_IDLE_PROJECTS |      4 | 最多保留的空闲编译引擎数，0–32；活动租约不被淘汰   |

检查快照和专用增量文件各最多保留 16 个配置/规则组合。这是数量和时间上限，不是 Go 内存的硬配额。增量信息写入服务专属临时目录，正常退出删除；异常退出的目录由后续服务在确认所属进程已不存在后清理。项目自己的 build-info、JS 与声明输出不受 check 修改。

用 `pnpm tools:status` 查看 PID、缓存数和策略，`pnpm tools:stop` 释放当前工作区服务。安装后的对应命令是 `zerodep-tools status/stop`。停止默认拒绝中断其他连接或进行中的请求；明确需要中断时使用 `stop --force`。停止确认发生在编译器与监听器释放之后；SDK/代码/策略不同的服务分别隔离并按各自空闲期限退出。

构建命令在同一 Go 进程内逐轮创建和释放调度器，保留磁盘增量信息；不保留可能跨轮失效的构建状态。检查缓存还记录包元数据，迟到的已知文件通知需通过指纹确认，避免无变化时重复检查；有错误的项目重新建立快照，让缺失依赖修复后能够恢复。

六平台由 CI 构建和验证。Windows 本机通过不代替 Linux/macOS、ARM64、完整浏览器矩阵与发布后消费验收。
