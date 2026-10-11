# 框架与组件维护范围

当前行为以 [语义](semantics.md)、[API](api.md)、[CSS](css.md) 和组件文档为准。已完成的阶段计划与交接不再单独维护；历史源码、提交及验收证据查 Git 与对应 CI，发布证据见 [变更记录](../CHANGELOG.md)。

## 保持的方向

- 标准 TSX、显式 _state/_derived、普通变量使用，无 .value。props 参数解构/default/rest 直接响应；普通函数、局部解构和返回值按 JavaScript 取值。
- 保留 bind、DOM bind:this、列表身份与清理、Portal、快照、懒加载、SSR/接管及开发状态保留。请求使用普通 async/await 和生命周期，不恢复 _task 或 packages/use。
- 使用固定官方 TS7.1、Babel/Vite 和 ES2025；core/css/compiler/ui 只公开包根，不新增 CSS 专用响应式系统。
- CSS 使用 useCss 与同步 css 回调、真实属性方法、bx 和 select；class 数组合并结构化声明后生成单类，主题由 Provider 注入 CSS 变量。
- Provider 管理主题、语言、地区、时区和字号；Button/ToggleButton/LinkButton 承担按钮职责，ButtonGroup 只做一维相连，Flex/Grid 只做布局。具体见 [Provider](provider.md)、[按钮](buttons.md) 和 [Grid](grid.md)。

## 后续工作的边界

1. 先复现实际问题，再修改实现；围绕 props 转发、输入法/表单、列表身份、资源清理和 SSR 保留真实回归断言。
2. 新组件或 API 从重复业务场景讨论，不为了接近其他框架扩大数量。For 参数解构、深层 props 解构、可覆写派生、组件参数直接写回、退场动画、响应式 Map/Set 和自动异步呈现仍需单独取舍。
3. UI 保持 private；发布前验证源码/声明包含范围、声明映射和工作区外的类型与运行时一致性。
4. 本地先评估验证命令范围和耗时，只做修改文件的 LSP 错误检查与必要的局部短测试，通过后提交推送继续。完整类型检查、构建、长测试和语言矩阵交给 CI；pending 不记为通过。
5. 文档只维护当前契约、操作指南和仍有价值的研究；不为每次改动新建计划、交接、验收汇总。历史过程保留在 Git 中。

命令和 CI 分工见 [开发命令](commands.md)，环境见 [环境配置](environment-setup.md)，发布门槛见 [发布](releasing.md)。
