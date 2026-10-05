# zerodep-use 拆包

2026-10-05：用户批准实施。将已有路由与浏览器持久化迁入 `packages/use`，发布名 `zerodep-use`；通过 `zerodep-use/router` 和 `zerodep-use/storage` 使用，不新增没有职责的根入口。core 保留状态、快照、生命周期、组件、DOM 和页面入口。此次不实施 Go/Rust 编译器，也不扩展存储种类。

## 实施边界

- use 以同版本 core 为 peer，共享组件身份、响应式图与所有权。公开函数从 core 根入口导入，少量底层能力通过现有 internal 协议集中提供；禁止复制内核或引用另一包的 src/dist 私有路径。
- 直接移除 core 的 router/storage 导出及源码，不保留 deprecated、转发别名或反向依赖。路由组件与已有存储行为保持不变，持久化封装标记和版本规则继续兼容原数据。
- 路由、存储语义/类型用例和路由 SSR 用例归入 use；示例与独立消费改用新路径。宿主适配包只依赖 core，独立宿主消费不安装 use。
- 八包继续统一版本，准备 1.0.0-rc.3；RC2 的已发布产物不变。新的发布以对应候选完整 CI 和真实 registry 安装验收为准。

## 验收

本地检查类型、构建、相关语义用例、Chromium 路由/存储行为与真实 tgz 消费。包消费要验证旧入口不可解析、core 无残留路由/存储产物、use 声明与映射可导航，并共享同一个 core。完整三浏览器与 Windows/Linux 矩阵交 CI，不等待或将 pending 当作通过。

上一阶段 36f61c9 的[完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36956305832)已通过。

## 本阶段结果

- 源码、公开入口、相关测试与示例均已迁移；core 只保留 runtime/dom/native。新包没有聚合根入口，公开函数名和对象方法不变。internal 只兼容增加组件身份、隔离所有权调用、属性规范化及必要类型出口，编译输出 ABI 保持 1。
- TS7 发现跨包推断返回值泄漏私有模板类型路径，已把公开 Router/Outlet/Link 的返回类型明确为 Renderable；Link 的泛型参数检查仍保留，独立消费的正反例通过。
- `pnpm check`、`pnpm build`、相关 70 项 Node 与 14 项 Chromium 路由/存储用例通过。真实 tgz 验证了类型与 source/declaration maps、旧入口拒绝、共享 core 调度与所有权、CSR/SSR、路由及存储行为。
- 三宿主另在工作区外安装四个基础包及三个适配包，明确未安装 use，类型/构建/CSR/SSR/更新/清理均通过。完整三浏览器和 Windows/Linux 矩阵由本次提交的 CI 再验证。
- 项目 LSP 对新路由视图返回完整零错误报告；从示例的 Link 导入可跳转到 packages/use/src/router/view.ts。
- 已逐项清理 core 内迁出源码对应的 36 个旧生成文件和两个空构建目录；发布产物不会混入旧入口。独立消费夹具、浏览器和服务器由验证脚本释放，未触及日常任务数据库或共享 pnpm store。
- 八包版本为 1.0.0-rc.3，当前仅完成源码和本地候选验收，尚未发布 npm；不将未完成的候选 CI 或 registry 验收记为通过。
