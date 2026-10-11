# CSS 单类组合历史阶段

本阶段已完成，验收证据见 [框架/CSS 执行记录](framework-css-execution.md)。当前作者体系重构执行 [CSS 回调作者计划](css-redesign-plan.md)，不再使用本文作为新实现依据。

已完成：删除 _mergeClasses、className(name)、CssProps；统一生成类组合，保留原生 class/className、CSS 变量传递、SSR 宿主及应用自己的服务端标签拼接。DOM 定位使用 data-* 与 id。Button/Icon 试点后已迁移 UI。

当时采用字符串声明拼接和保守隐式绑定；新计划改为回调方法、显式 bx、结构化声明与数组组合。历史提交/测试记录留在执行记录和 Git，不重复保留已被取代的详细实施步骤。
