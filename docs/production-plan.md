# 框架与组件生产计划

当前 CSS 重构执行 [CSS 回调作者计划](css-redesign-plan.md)。框架语义审计执行 [框架完善计划](framework-hardening-plan.md)，上一阶段已完成的修复及 CI 证据见 [执行记录](framework-css-execution.md)。本页只维护范围和索引，不重复历史 API 方案。

## 保持的框架契约

- 标准 TSX、显式 _state/_derived、普通变量使用；无 .value。props 参数解构/default/rest 直接响应，普通函数、局部解构、返回值仍按 JavaScript 取值。
- 保留 bind、DOM bind:this、For 身份与清理、Portal、快照、懒加载、SSR/接管及开发状态保留。请求使用普通 async/await 与生命周期，不恢复 _task 或 packages/use。
- 官方 TS 7.1.0-dev.20261008.1、Babel/Vite、ES2025。core/css/compiler/ui 保持根入口边界；不补丁化 SDK、不新增 CSS 专用响应式系统。
- 维护性、类型提示和实际使用优先；新功能从业务场景讨论，不照抄其他框架 API 数量。

## 已有组件职责

- Provider 管理主题、语言、地区、时区和字号。CSS 作者在 CSS 包，具体主题 token 在 UI；见 [Provider](provider.md)。
- Icon/Text/Ripple/Spinner 提供基础能力；Button 直接渲染原生按钮，ToggleButton 复用 Button，LinkButton 保留原生链接。尺寸使用字号和 em，不强加点击区域或间距；见 [按钮](buttons.md)。
- Flex/Grid 只负责布局；ButtonGroup 负责一维相连，不管理选择状态和键盘导航；见 [Grid](grid.md)。
- 独立 slotXxx 属性转发底层参数；仅保留 _resolveSlotProps 等确有共用责任的工具。UI 根入口由生成器维护，其他组件另行讨论。

## 当前实施顺序

1. CSS 计划先固定作者、绑定、组合、主题和动画契约。
2. 底层实现与焦点验证后试点 Button/Icon，再迁移其余使用处。
3. 保持框架 props、表单、列表、生命周期与 SSR 断言；发现真实回归即时修复。
4. 本地只跑相关检查，每阶段中文提交推送；完整平台/浏览器/消费验证交 CI。未完成 CI 不写为通过，不自动发布 npm。

## 文档入口

[语义](semantics.md) · [API](api.md) · [CSS 使用](css.md) · [包边界](packages.md) · [环境](environment-setup.md) · [发布](releasing.md)
