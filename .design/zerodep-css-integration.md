# 原生 CSS 与编译器归属

2026-10-09 用户确认：停止维护相邻 zerodep-css，CSS 仅服务于 zerodep-js。此前跨仓库和多框架方案被本决定取代。

- packages/css：迁入作者、属性生成器及数据、关键字、单位、选择器、浏览器/SSR 宿主、context 和隐式变量运行时。
- packages/compiler：直接在既有 Babel AST 中处理 CSS；原 Vite 插件并入 /vite 子入口，普通转换、依赖扫描和 HMR 共用转换。
- core 只提供框架运行时；CSS 通过 internal 复用派生缓存、props 与 style 序列化，不保留公开 adapter。
- 删除 CompileExtension/扩展配置、bx 及绑定帧/订阅/专用样式表；不迁 Vue/Svelte/Nuxt/Kit 或 TS6 模板编译器。
- UI Provider、亮暗主题、语言和时区仍属于 ui；useCss() 读取逻辑上层注入的作者，SSR 标签由应用编写。
- 共享一份 JetBrains TS7.1、Babel、工作区构建、LSP 和 CI；生成器仅解析 csstype 声明数据，完整类型检查仍交固定 SDK。

API 和使用示例见 ../docs/css.md，包边界见 ../docs/packages.md。

## 简单表达式变量绑定（2026-10-09）

在既有单参数作者调用中，接管含明确 _state/_derived 来源的算术、比较、一元数值/逻辑运算、条件及逻辑短路表达式；类型包装透明。字面量与普通变量可参与组合，但不会单独被识别为响应式。函数、成员访问、写入和暂停表达式继续原转换。参数整体放入一次读取函数，保留接收者/方法先于参数、短路和异常；最终 CSS 值仍走既有安全分类。响应式不保存历史值，不增加 CSS 缓存或独立订阅。
