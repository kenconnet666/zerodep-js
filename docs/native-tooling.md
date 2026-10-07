# 定制 TS7 原生工具

项目只维护定制 TS7-Go 编译路线。每个工具宿主持有自己的编译器，任务或宿主结束时关闭；没有脱离调用方继续存活的共享后台服务。

## 默认工程流程

`pnpm build:packages` 使用原生 `tsc -b tsconfig.build.json`，按项目引用检查并生成 JS、声明和映射，保留 TypeScript 自己的增量构建信息。`pnpm check` 随后通过原生 CLI 检查主示例与工具/测试配置，再运行 Oxlint。一次性检查进程完成即退出。

`pnpm build` 在包构建之后运行示例 CSR/SSR 打包。每次 Vite 构建创建自己的编译会话，一次构建中的文件复用该会话，结束即关闭。`vite dev` 在开发服务器存活期间复用会话，服务器关闭时释放。

不为跨命令复用维护启动锁、进程发现、空闲 TTL/LRU、客户端租约或专属缓存目录。需要磁盘增量时可以直接使用原生 `--incremental --tsBuildInfoFile <路径>`，与编译器的正常配置一致；当前默认应用检查保留完整验证。

## 类型规则与工具

工作区的 `zerodepLint: true` 在 Go checker 中启用以下规则：

| 编号   | 范围                                         | 处理方式                                                    |
| ------ | -------------------------------------------- | ----------------------------------------------------------- |
| ZJ2001 | 表达式语句中未处理的 Promise                 | await、return、保存引用、处理 rejection，或用 void 明确丢弃 |
| ZJ2002 | Promise 回调传给只声明同步 void 返回值的参数 | 使用同步回调并明确处理异步结果                              |
| ZJ2003 | 有限字面量/枚举/可空联合的 switch 遗漏       | 补全 case 或声明 default                                    |

这是有限规则集；保存 Promise 不证明稍后一定消费，void 也不自动捕获 rejection。测试工程含故意的错误样例，`tsconfig.tools.json` 不默认启用这些规则。框架语义诊断始终执行。

安装后的原生包提供 `zerodep-tools`。源码工作区可用 `node packages/native/dist/tool-cli.js`：

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
```

`NativeTools.check(projects, { lint: false })` 可显式关闭类型规则，`lint` 命令显式启用。工具检查使用请求独占的快照，读取完整诊断后立即释放；不会写出 JS、声明或检查缓存。结果包含输入版本摘要 `revision`；检查期间输入变化时返回 `complete: false`，CLI 失败退出。API 报告生成前后比较输入版本，不依赖结果缓存命中来判断一致性。

import 整理、quick fix、格式化与模块信息来自当前工具持有的原生 LSP。写入前仍验证原文、编辑范围、重叠和 Unicode 边界。涉及多个文件或额外命令的修复不能只应用一部分。Go 格式化是试验入口，默认 Prettier/Oxc 和 WebStorm 配置保持原样。

包边界检查原生解析得到的直接导入，不扫描未知动态字符串或替代打包产物检查。API 报告提供导出类型和声明摘要，不是语义兼容性证明。

## 宿主生命周期

```ts
import { createCompiler, NativeTools } from 'zerodep-js-native';

const compiler = createCompiler({ root: projectRoot });
const tools = new NativeTools(projectRoot);
try {
  const output = await compiler.compile(source, filename);
  const check = await tools.check(['tsconfig.json']);
} finally {
  await compiler.close();
  await tools.close();
}
```

两个对象各自持有 Go 进程，互不共享可变状态。编译会话保留同一宿主内的快照与输出缓存，保留继承 paths、磁盘依赖校验和未保存文本边界。Vite 提供文件变更通知；编译器不额外安装全工作区监听。工具 LSP 保留自身依赖监听，以支持多次语言服务请求。

`close()` 可重复调用，等待资源释放和 Go 退出；关闭后不能继续请求。编译器异常退出会明确失败，调用方可以重新创建会话，不在背后启动另一套后台服务。MCP 的服务重启关闭原来的宿主会话；WebStorm 继续管理独立的定制 TS7-Go LSP。

`status`、`stop`、`WorkspaceStats`、检查结果的 `cached` 字段和后台保留环境变量均已移除。调用方只需管理自己创建的对象，不需要查找或停止其他进程。

## 取舍

公平对照中，独立 CLI 与常驻都启用原生增量时，简单修改约 234/192 ms，真实 JSX 修改约 2.216/1.930 s。接受这部分差异以减少长期状态和维护成本。详细证据与历史试验见 [生命周期研究](../.design/native-hot-check-followup.md#用户调整方向后的研究结论)；其中后台版本的接口和脚本不代表当前实现。

编译器、ABI 和类型/框架诊断契约保持不变。没有重启传统编译路线，也不使用删减声明检查等方式提速。
