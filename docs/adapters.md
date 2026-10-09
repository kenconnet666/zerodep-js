# 框架适配器边界

2026-10-09 用户确认将 CSS 专用能力迁入 zerodep-css 仓库的 zerodep-js 适配器。框架只提供状态、上下文、派生、JSX 属性和编译接入，适配器不得导入 core/src。

`zerodep-js/adapter` 提供 `_memo`（带 read 的派生缓存）、`_mergeProps`（复用 JSX 的逐项覆盖/按键缓存）和 `_styleText`（与 DOM/SSR 一致的序列化）。它们不依赖 CSS 库。

compiler 的 CompileOptions.extensions 与 Vite 的 zerodep({ extensions }) 接受同一组 CompileExtension。prepare 复用已解析的 Babel AST；返回 elementProps、derived、ownsIdentifier 三个可选接点，分别在 JSX 降低、命名派生和引用转换阶段调用。Vite 正常转换、预扫描和 HMR 使用同一配置；默认没有附加扩展。

发布按依赖顺序进行：先发布提供这些接口的框架候选，再发布 CSS 适配器并迁移应用，最后删除框架的旧 CSS 入口。过渡期间不把尚未发布的包写成无法安装的正式依赖，不覆盖旧版本。最终 CSS 入口、CSS 专用 TSX 转换和 CSS 作者注入归适配器，UI Provider/主题/语言/时区继续归 UI 包。
