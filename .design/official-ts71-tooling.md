# 官方 TS7.1 工具迁移执行记录

2026-10-07，执行依据：standard-toolchain-plan.md 与本轮用户确认。只在主目录工作，保留小核心交接中的未提交实现。

## 阶段一：官方 API 关键探针

- 官方 next：typescript 7.1.0-dev.20261006.1，上游 gitHead a1ef42b9ea7032fa60df127d42b4c86fd2a110ee；与项目原定制 SDK 分开安装进行验证。
- Babel 候选：core/parser/traverse/types 8.0.6，preset-typescript 8.0.1。
- Node 24.18.0，项目 pnpm 10.34.5。探针临时项目已显式补齐相同 packageManager；首次隔离安装因缺少该字段由机器默认 pnpm 11.22.0 执行，没有改变根锁文件，后续统一使用项目版本。
- 上一轮代码提交 83d90a9 的工程 CI 37569197831 已完成且成功；与当前未提交工作和新路线验收分开。

复现：将官方 SDK 安装后运行 `node .design/probes/official-ts71-api.mjs <typescript 包目录>`。脚本创建自己的临时文件，finally 关闭 API 并清理文件与空目录，不向应用插入错误夹具。

实测结果：

| 用例                                | 官方结果                             | 结论                                                |
| ----------------------------------- | ------------------------------------ | --------------------------------------------------- |
| 原始隐式 bind:this 后的回调读取     | TS2339，变量被收窄为 never           | 仅使用原始源码的官方检查不满足框架语义              |
| 检查源码中表达显式 ref 写回与清理   | 无错误                               | 可以用官方检查器承载该写入关系，不必修改 Go checker |
| 错误 DOM 目标                       | TS2740                               | 元素写回方向得到检查                                |
| 目标不接受 undefined 清理值         | TS2322                               | 清理类型没有被忽略                                  |
| readonly 属性写回                   | TS2540                               | 不需要在 Babel 重造类型可写性判断                   |
| 过窄字符串联合接收输入              | TS2322                               | 读取合法不能掩盖写回不合法                          |
| 泛型组件 value/回调推断             | 无错误                               | 保留泛型的显式回调投影可行                          |
| bind / bind: / bind:v 原生补全      | 缺失命名空间候选                     | 不能宣称官方直接提供完整编辑体验                    |
| 相同三个位置读取 JSX 属性上下文类型 | 均取得真实 bind:this/bind:value 符号 | 可研究类型驱动补全适配，不硬编码候选                |
| 上述符号解析声明                    | 均解析回真实属性源码范围             | 可以继续验证导航/文档/重命名适配                    |

官方 API 的 compilerOptions 使用解析后的枚举值，配置字符串先经过 parseJsonConfigFileContent。当前补全探针只验证 JSX 属性，不测试自动导入；显式关闭自动导入偏好，避免 synthetic program 请求未准备的自动导入索引。后续实际语言服务必须单独覆盖真实自动导入。

TypeScript 内置 content mapper 不接受注册 .ts/.tsx 等原生扩展名。已核对本地上游 tsconfigparsing.go 的内置扩展拒绝逻辑，不能把 SFC content mapper 当作现成 TSX 插件；需要检查源码/请求映射适配，并验证最新包实际行为。

这些探针记录最初的官方能力边界。自动检查投影、映射、Babel 编译器和项目语言桥接已实现；最终证据统一维护在 [执行记录](../docs/execution.md)，不能将独立桥接通过当作 IDE 接入通过。

## ESLint 选型

用户要求正式支持 TS7 时优先 ESLint，不因 Rust/Go 性能选择其他工具。当前 npm eslint 10.12.0，typescript-eslint 与 parser 均 8.71.1，其 TS peer >=4.8.4 <6.1.0，不满足 TS7.1 dev。当前不切入不受支持的组合、不引入 TS6、不自造通用 lint；保留现有 lint，框架分析与 lint 宿主分离。

## 当前实施

检查投影使用官方类型判断可选属性，保留泛型推断、写回约束与注释指令；命名空间补全和导航取真实符号并追溯声明映射。Vite 已切换 Babel，旧 Go 后端与自有 SDK 分发已删除。剩余验收和 IDE 边界见 [执行记录](../docs/execution.md) 与 [工具链](../docs/tooling.md)。
