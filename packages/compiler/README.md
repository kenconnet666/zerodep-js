# zerodep-js-compiler

提供 Babel 框架/CSS 转换、Vite 插件、类型检查投影和语言服务，只公开包根。Vite 使用 zerodep()，独立转换使用 compile()/diagnose()；CLI 为 zerodep-check 与 zerodep-language-server。

仅适配工作区精确固定的微软官方 TypeScript 7.1 夜间版本，不维护 SDK 补丁或旧版兼容。类型检查与构建分别执行，语言服务进程及临时投影按连接生命周期清理。

[使用与工作区](https://github.com/kenconnet666/zerodep-js#readme)
