# 参与开发

使用 `.node-version` 指定的 Node 24 和 package.json 固定的 pnpm。依赖版本放入 pnpm catalog，包间使用 workspace 协议。请先阅读 [语义契约](docs/semantics.md)，不要把早期候选方案直接当作已实现 API。

本机后续工作直接使用 `C:\Users\lionheart\WebstormProjects\zerodep-js`，不自行创建游离工作树。源码工作区先构建定制 SDK，所有包的构建与检查都使用它。

## 开发步骤

1. 确认当前源码和 Git 状态，保留已有工作。
2. 针对问题增加最小有意义的复现，修复实际语义；避免只验证第三方工具存在或复制实现的测试。
3. 本地先运行相关用例与静态检查。配置或公共类型变更运行 `pnpm check`、`pnpm build`；LSP 变更运行 `pnpm lsp:verify`。
4. 完整矩阵由 CI 执行，下次推送前检查上轮结果。最终发布必须核对候选版本的完整结果，不能以 pending 代替通过。
5. 同步修改使用文档、边界与执行记录，使用中文提交说明。

## 文件与职责

- `packages/core`：状态、组件、DOM、生命周期及公共 JSX 类型。
- `packages/native`：Go 绑定分析、宏/JSX 转换、语义诊断、CLI 与项目会话。
- `packages/vite`：普通转换和依赖扫描的同一接入。
- `packages/ssr`：请求内渲染、数据编码与文档组合。
- `apps/example`：功能验证页和任务工作台，消费实际包产物。

类型和别名的生成入口是 `pnpm native:generate`。改数据来源或语义修正时重新生成；不要直接编辑 native-data.ts 或第三方许可汇总。`pnpm native:check` 会检查漂移。

保持小而清晰的职责、明确的生命周期和必要中文注释。抽象须解决已经出现的重复责任，不为形式增加层次。性能与体积只在有证据时优化，不能牺牲正确性和维护性。

## 数据与凭据

测试只清理自己创建的文件、进程和数据库，不清理共享 pnpm store 或日常 `.data`。凭据仅通过环境变量使用，不进入源码、配置值、日志或提交。

发布前阅读 [发布与回滚](docs/releasing.md)。提交代码不等于发布授权或生产验收；本项目的具体执行授权由维护者决定。
