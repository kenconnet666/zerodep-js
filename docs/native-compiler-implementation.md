# 原生编译器实施

2026-10-06 用户已批准 [.design/native-compiler.md](../.design/native-compiler.md) 的推荐路线及完成后的性能测试。

## 交付范围

- 固定 TypeScript 7.1.0-dev.20261005.1，Go 编译进同一 emit 流程，保留原始声明与源码映射。
- 迁移现有宏、组件、For、JSX/bind、控制流诊断及开发元数据，共用 core ABI 2。
- 提供独立 `zerodep-js-native` CLI/Node 接口，Vite 显式选择后端且不在 native 模式加载 Babel。
- 原生检查接入 noEmit/LSP；常驻服务串行更新快照并隔离客户端/SSR 配置，close 等待当前请求后释放进程。CLI 转发终止信号；Node API 暂不提供单请求中途取消。
- 正确性以现有 Babel 语义、浏览器/SSR/HMR 和干净消费对照验证；不靠自动回退通过测试。
- 性能报告分别比较转换、检查加输出、冷构建与增量更新，记录硬件/版本、样本及内存，不预设原生一定更快。

## 阶段记录

1. 原生分析、转换及上游接线：完成，框架 Go 源码位于 `packages/native/go/zerodep`，固定上游接线位于 `patches/zerodep-native.patch`。
2. Node/CLI、Vite 选择及分发：完成 Windows/Linux x64 平台构建及 Windows tgz 消费；npm 尚未发布，Linux 运行验收交 CI。
3. 语义、声明、映射、浏览器与开发态：本地验收通过，具体证据如下；完整跨平台浏览器矩阵仍由本次提交的 CI 执行。
4. 性能：完成独立重复采样，见[性能报告](native-performance.md)和[原始样本](../reports/native-performance.json)。

## 实现边界

框架分析缓存由原始 `SourceFile` 持有，使用原始声明身份识别导入、作用域遮蔽、读取和写入。分析结束后释放 resolver，emit 只读取已保存的声明关系。JS 转换使用自己的工厂与 EmitContext，声明转换继续访问原始树；不打印中间 TSX 再次解析，也不通过进程外 Babel 回退。

Go 后端覆盖 `_state/raw`、`_derived/by`、组件参数解构/default/rest、实时 For 参数、JSX/片段/动态选择、spread、双向绑定、原有框架诊断、开发检查及 HMR 元数据。两种后端共用 core ABI 2。`noEmit` 和 LSP 使用相同的框架分析；数字诊断为 `900000 + ZJ 编号`，消息保留 ZJ 原编号，桥接器将其标识为框架诊断。

Node 的 `compile` 是与 Babel 对等的单文件转换入口。`createCompiler` 保留官方 TS7 API 的 Program/快照，支持输入更新、依赖创建/修改/删除、不同 client/SSR 输出及有序关闭。源码版本更新必须设置 `ensurePrograms`，仅写入文件系统层不会自动刷新 Program。本轮已用错误、修复、依赖删除与重建测试验证这一点。

Vite 的原生生产构建默认检查每个请求文件；开发态默认将类型诊断留给原生语言服务，框架诊断仍阻止输出。可以显式设置 `typeCheck: true/false`。三宿主项目同步检查曾使热更新超过原有 5 秒断言，调整开发态检查策略后原断言通过；没有延长超时掩盖问题。项目完整检查使用 `zerodep-tsc --noEmit`。

`zerodep-js-vite` 的两种后端均为可选 peer，并只动态加载所选后端。`zerodep-js-native` 使用官方固定 TS7 JavaScript API 连接项目原生二进制；公开类型不泄漏 TypeScript 内部 API 类型。没有旧版 TS 兼容层，没有 Zod 或 MCP SDK。

## 构建与使用

```sh
pnpm compiler:native:build --source <TypeScript仓库> --go <Go可执行文件> --test
pnpm compiler:native:build --source <TypeScript仓库> --go <Go可执行文件> --platform linux-x64
pnpm test:native
pnpm test:native:packages
pnpm benchmark:native --samples 5
```

第一条命令在固定上游的临时 worktree 应用补丁并复制框架 Go 源码，运行 Go 测试后构建当前平台 SDK；结束时清理该临时 worktree。Windows 维护者用第二条命令交叉构建 Linux 平台；Linux CI 则交叉构建 win32-x64。缓存同时核对源码摘要、上游提交、Go 版本、平台和二进制摘要。

构建产物在 `packages/native-<平台>/typescript`，可以直接选择为 WebStorm 的 TypeScript 平台 SDK。版本带有 `+zerodep.native.<源码摘要>`，使旧增量缓存随编译器实现变化失效。CLI、Vite API 和项目 LSP 使用相同的二进制实现；它们各自管理进程，不共享单个全局进程。

示例保留默认 Babel 选择。PowerShell 中用 `$env:ZERODEP_COMPILER='native'` 后运行 `pnpm dev` 或 `pnpm build`；普通消费项目设置 `zerodep({ compiler: 'native' })`，安装对应后端。组件库使用原生 CLI 一次输出 JS、声明及两种映射，配置见原生包 README。

统一发布清单现在包含十一包；平台包在 Node 原生包之前发布。平台携带 Apache-2.0 的 TypeScript 原文许可证/NOTICE 与 MIT 的框架许可证，并声明二进制 bin，确保从 Windows 打出的 Linux tgz 仍有可执行权限。包使用者无需 Go。

## 本地验证记录

- Go 的宏输出、非法源码阻止输出、组件/bind/开发输出三项测试通过。
- 原生后端复用现有编译器用例，加常驻服务及 CLI 集成，共 99 项通过；覆盖真实执行值、ZJ 错误、声明、映射位置和开发签名。
- `pnpm test --maxWorkers=2` 完整通过 42 个测试文件、318 项单元/工具用例；包含十一包发布清单的独立夹具验证。
- 原生构建 Chromium 的 121 项用例通过，包含 CSR/SSR、双向绑定、IME、列表、输入、路由、持久化、三宿主和资源清理。
- Babel 与原生各自通过真实 Vite 开发态验证；原生三宿主开发验证通过 React StrictMode 与共享页面 HMR。
- Babel 与原生各自通过工作区外 tgz 安装、预编译组件库、类型正反例、CSR/SSR、节点接管与清理。原生消费实际断言依赖图没有 Babel。
- 原生 LSP 的错误/修复、依赖刷新、14 个绑定定义位置、标准重命名通过；补全矩阵 48/48，通过实际插入及插入后诊断。
- `pnpm check`、两种后端的构建、格式检查、Actions 静态检查通过。

这些是本机证据；不把 Windows 的交叉编译成功等同于 Linux 执行成功，也不把本机 Chromium 等同于三浏览器矩阵。新版本的 npm 发布仍以完整 CI 与正式发布门槛为准。
