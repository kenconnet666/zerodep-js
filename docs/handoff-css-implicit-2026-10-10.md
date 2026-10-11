# CSS 隐式转换历史交接

本页所对应的字符串作者和隐式方法转换已被 2026-10-11 的 [CSS 回调作者重构](css-redesign-plan.md) 取代，不再作为实现依据。历史源码和验证记录保留在 Git 与 [框架/CSS 执行记录](framework-css-execution.md)。

继续保留的边界：props 参数直接解构响应、普通函数取值、完整表达式按 JavaScript 顺序求值、特殊值保留原声明、显式 style 最后覆盖、SSR 请求隔离。新的作者写法、bx 分类、主题变量和单类数组组合统一见 [CSS](css.md)。
