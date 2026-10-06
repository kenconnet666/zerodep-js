# 支持范围与验收边界

框架目标是可维护的完整生产能力，不承诺覆盖所有前端或全栈功能。下表区分实现范围、已有验证和仍需完成的发布门槛；不能用一项通过推断其他平台也已经通过。

## 工具与平台

| 领域            | 当前范围与证据                                                                                                                                                             |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript      | 当前工作区固定官方 npm `7.1.0-dev.20261005.1`，升级验证见执行记录。Go 编译路线仅面向选定的新版本，不增加旧版或多版本兼容层。                                               |
| Node            | Node 24，工程固定 24.18.0，包 engines 为 `>=24.11 <25`。不把未验证的大版本写入支持范围。                                                                                   |
| 构建            | ESM、固定的项目定制 TS7-Go 原生编译、Vite 8 插件；固定版本由 catalog 管理，不提供 React runtime 或旧版 TS 兼容层。                                                         |
| 浏览器          | 面向现代 DOM、Proxy、WeakRef/FinalizationRegistry 和 AbortController 环境。CI 使用固定 Playwright 版本的 Chromium、Firefox、WebKit；状态保留移动提供 moveBefore 兼容路径。 |
| Windows / Linux | Windows 本地与独立包消费、Linux 完整 CI 均有证据。WebKit 自动化不等于实机 Safari 或所有平台输入法验证。                                                                    |
| 输入法          | 三浏览器组合事件序列已验证；Chromium CDP 编辑管线已覆盖候选、提交、取消、外部更新及 Unicode 选区。协议输入不等于 OS 输入法实测。                                           |
| 编辑器          | 标准 TS7 协议与 WebStorm 类型提示、变量/跨文件 JSX 重命名已验证；用户确认 IDE 显示 TS2322。IDE MCP 诊断接口漏报该错误，自动化诊断使用项目 LSP/CLI，见开发文档。            |

包的体积和速度没有硬性上限，仍保留资源回收、压力和按需打包观察。验证脚本的运行超时用于发现挂起，不是性能排名或用户负载承诺。

当前 TypeScript 7.1 nightly 的 JSX 命名空间补全回归由项目固定版本的原生 SDK 补丁修复；语言服务设置和补全回归入口见[开发诊断说明](development.md)。官方 npm TypeScript 只提供固定 API 客户端与标准库；工作区检查、声明、CLI、编辑器和 MCP 均选择 `packages/native-<平台>/typescript`。分发覆盖 Windows/Linux/macOS 的 x64/ARM64 六种组合，实际平台验收以对应提交 CI 为准。

## 正式设计范围

- 显式变量式状态、深普通对象/数组、浅状态、派生、批处理和有所有权的生命周期。
- 单次初始化组件、类型化参数解构/default/rest、普通 children 与显式内容函数。
- 条件与动态结构、稳定 key 列表、context、错误边界和恢复。
- 原生元素与事件、受控/默认表单、ref、客户端 property、自定义元素、样式与命名空间。
- 同步组件 SSR、显式初始化数据、严格 hydration、已有输入保留与显式不匹配重建。
- 原始 TSX 类型检查、框架诊断、source map、Vite 开发更新、产物与预编译组件库消费。

可选 router/storage/history 能力位于 zerodep-use，core 根入口不主动加载它们。外部框架适配及宿主演示已删除；数据库、鉴权、流式或异步组件 SSR、通用请求缓存和 UI 组件库由应用组合，任务数据库与 HTTP 服务属于消费示例。

当前 main 的 rc.4 候选已把相同行为迁入 zerodep-use/router 和 zerodep-use/storage，并移除 core 旧子入口；存储数据协议保持兼容。新版本尚未发布，当前消费与验收边界见 [拆包记录](use-extraction.md)。

## 必须遵守的边界

- 响应式声明不是对整个 JavaScript 语言的改写。普通传参/return/局部变量保持取值语义；跨函数或模块的持续读取用 getter、读取函数或状态对象表达。
- TS 控制流收窄有时间边界。回调和 await 后重新取值判空，框架诊断不证明任意用户程序、any 或外部断言安全。
- 不代理类、DOM、Date、Map/Set；经原始对象别名绕过代理的写入不承诺通知。响应式代理不支持原地冻结或改原型。
- 自定义元素先注册再启用 prop 绑定。is 定制内建元素和声明式 shadow root 尚不支持；普通 template 与 noscript 有各自内容规则。
- renderToString 输出 HTML 容器中的内容，调用方须使用合法 HTML/SVG/MathML 嵌套。plaintext 和不可往返的元素名明确拒绝；原始文本结束标签及 script 双重转义不能绕过共享检查。任意 HTML 字符串不是可信模板，JSON 数据使用专用编码入口。
- 服务端用户状态属于请求/组件。模块级可变对象按 JavaScript 规则共享，不会被自动隔离或序列化。
- HMR 清理旧根并重新挂载，局部状态重置。库发布预编译 JS 与声明，预编译 node_modules 不再次转换。

详细行为见 [语义契约](semantics.md)、[表单](forms.md)、[原生元素](native-elements.md)、[SSR](ssr-and-hydration.md)和[安全边界](security.md)。

## RC2 交付与后续范围

1.0.0-rc.2 已通过完整 CI 与七包实际 npm 安装验收，并建立 GitHub 预发布和完整性记录。本机 Windows 输入基本试用有用户反馈，详细范围见 [表单](forms.md)。七包 next 指向 RC2；四个原有包 latest=RC1，三个新宿主包 latest=RC2。使用精确版本，标签名不是稳定版承诺，具体证据见 CHANGELOG。

历史交付记录保留在 CHANGELOG。当前源码已经收敛到单一定制 TS7-Go 路线，外部框架适配不再维护；稳定 1.0.0 尚未发布，不能把候选自动记为生产验收通过。
