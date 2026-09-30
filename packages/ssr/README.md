# @zerodep-js/ssr

当前提供文档模板组合和 CSR/SSR 模式分发，用于打通工程入口。

`renderDocument({ template, mode, render })` 在 SSR 模式调用可信的 HTML 渲染函数，在 CSR 模式保留空应用容器。模板必须各包含一个 `__RENDER_MODE__` 和 `<!--app-html-->` 标记。

该接口不会自动转义渲染函数返回的 HTML，也不提供 JSX 渲染、流式输出、状态序列化或 hydration。真正的组件渲染器将在 API 和生命周期契约明确后接入。当前包为 private，不作生产发布。
