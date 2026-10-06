# 变更记录

## 1.0.0-rc.3 — 应用与编写体验候选，尚未发布

- 新增原生输入与组件 bind 语法、可选 zerodep-use/history 编辑历史、core 的 _lazy 按需组件。完整用法与边界见 [编写指南](docs/authoring.md)。
- 编译输出协议升为 2，包含 bind 所需的运行时协议；应用与预编译组件库应使用相同版本重建。增加 TS7 绑定候选的类型/说明回归。
- 新增开发组件/状态检查面板、有界事件记录、手动重置与兼容本地数据的 HMR；覆盖编译/执行失败恢复、导出变化回退和开发 SSR 接管，生产构建不注入调试代码。具体保留和重建边界见 [开发检查](docs/devtools.md)。

- 新增 zerodep-use，将路由和浏览器持久化迁到 `zerodep-use/router`、`zerodep-use/storage`；直接移除 core 旧子入口，不保留兼容转发。
- 状态、快照、通用生命周期与页面入口留在 core；use 通过同版本 peer 共享内核，不复制状态图，不反向依赖应用层。存储协议与已有数据保持兼容。
- 路由/存储类型与语义测试、路由 SSR 测试、示例和独立消费同步迁移；公开路由组件声明使用 Renderable，避免私有模板类型路径泄漏。
- 十五个公共包统一准备 1.0.0-rc.3（八个框架/宿主包、原生入口与六个平台包），发布清单与独立消费区分可选 use 和页面宿主。已发布 RC2 原始产物保持不变。

- 新增独立原生 Go 编译器，与 Babel 后端共用 ABI 2；统一原始类型检查、JS/声明/映射及 LSP 框架诊断。原生转换性能与等价工作量测试见 [性能报告](docs/native-performance.md)。
- Windows/Linux/macOS 的 x64/ARM64 使用对应架构 CI 构建与测试。完整 CI 通过后自动冻结 tgz、发布 next、检查 SHA-512 并运行真实注册表消费，最后公开 GitHub 预发布。恢复时沿用草稿中的原始产物与回执，不覆盖同版本内容。
- 修复中间件开发服务器关闭时未释放原生编译进程的问题，避免 Linux 宿主开发测试在已完成断言后挂起。

## 维护收尾 — 2026-10-02

- 补齐 npm 异步受理、版本公开与标签同步的发布恢复；先落盘尝试记录，受理后不重复上传，响应不确定时保留证据。增加四项针对性恢复测试并保留真实 Git/打包测试。
- 更新当前安装指南、API 名称、主计划和宿主交付进度，区分研究历史与已支持能力；[交付后完整性审查](docs/completeness-audit.md)记录检查结果与取舍。
- 本维护阶段不修改 RC2 运行时或重打包已发布产物。

## 1.0.0-rc.2 — 2026-10-02

七个包均已发布统一的 `1.0.0-rc.2`：zerodep-js、zerodep-js-compiler、zerodep-js-ssr、zerodep-js-vite、zerodep-js-react、zerodep-js-vue、zerodep-js-svelte。源码为 `3d44ae7fb664fc748aaff446bc697ea9ecc1c03a`，[GitHub 预发布](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.2)附原始七包与最终 release.json。

[候选完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36887698421)通过，包含 288 项 Node、三浏览器、资源/LSP/开发更新以及 Linux/Windows 独立消费。七包 registry SHA-512 与固定产物一致；2026-10-02 从 npm 精确安装后，基础框架与三宿主的类型、构建、CSR/SSR、更新及清理验收通过。

七包 next 均指向 RC2。原有四包 latest 仍指向 RC1；三个首次发布的宿主包同时被 npm 初始化为 latest=RC2。安装请统一指定精确版本，未执行稳定版提升或删除包版本。

- 新增 zerodep-js-vue、zerodep-js-react、zerodep-js-svelte 三个独立页面宿主包，支持保留实例的输入更新、入口替换、清理与宿主 SSR 空容器。
- Vite 增加统一的 include/exclude 范围，覆盖开发、预扫描、生产和 SSR；三个宿主复用同一个 TSX/普通 TS 页面，并有独立 tgz 消费和开发热更新验证。

- 破坏性重构：core 根入口与 router/storage 的公开函数统一为单下划线前缀，直接移除旧导出；编译器按统一语义角色识别新名、导入别名和命名空间。
- 新增 _createPage 页面入口与 update/dispose 契约，宿主输入更新保留页面实例；修复旧 disposer 重复调用可能误删新根登记的问题。

- 新增 _snapshot，支持脱开深代理、普通对象/数组循环与共享引用、Map/Set、二进制及平台结构化克隆规则。
- 新增 _onMount、_createScope、_getAbortSignal，明确一次性挂载、同步所有权恢复与作用域取消；新增实际 CSR/SSR 用例。
- 新增可选 storage 子入口，支持 localStorage/sessionStorage 恢复、迁移、校验、同步、写入合并和清理；实际任务页保存新增草稿。
- 新增可选 router 子入口，支持命名路由与参数类型、嵌套布局、browser/hash/memory history、导航守卫、取消/预加载、错误恢复、滚动/焦点与 SSR 快照恢复。
- 新增任务空间示例，复用实际任务 API、保留布局、编辑持久化草稿、懒加载偏好页，并验证 CSR/SSR 与真实历史行为；新增子入口已有工作区外 tgz 消费验证。
- 修正新增持久化示例后原有输入测试的模糊名字定位；既有功能用例继续保留。

## 1.0.0-rc.1 — 2026-10-01

四个包已发布统一的 `1.0.0-rc.1`：[zerodep-js](https://www.npmjs.com/package/zerodep-js/v/1.0.0-rc.1)、[zerodep-js-compiler](https://www.npmjs.com/package/zerodep-js-compiler/v/1.0.0-rc.1)、[zerodep-js-vite](https://www.npmjs.com/package/zerodep-js-vite/v/1.0.0-rc.1)、[zerodep-js-ssr](https://www.npmjs.com/package/zerodep-js-ssr/v/1.0.0-rc.1)。源码为 a29419625773bfb4c6bdedf136496fbf6e7e2624，[GitHub 预发布与原始产物](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.1) 已建立。

[完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36818853600) 通过，包含三浏览器、Node 资源验证和 Windows 独立包消费。四包注册表 SHA-512 与本地固定产物一致，npm 精确版本的工作区外安装、TS7 声明、预编译组件库、CSR/SSR、接管、表单和卸载验证通过。

历史标签例外：发布使用 next，最终回读发现 registry 同时初始化 latest。尝试移除 latest 时，正常工具审批通过，但 npm 返回 HTTP 403；pnpm 登录身份已核对为发布账户。当时两个标签均指向 RC1，并不表示稳定 1.0.0 已发布。最新标签状态见上方 RC2 记录；未执行稳定提升，也未删除包版本。

开发阶段的 `@zerodep-js/*` 公共包名已统一调整；私有示例项目名称不影响安装入口。

- 变量式状态、深对象/数组、浅状态、派生缓存与作用域清理。
- 标准 TSX 组件、泛型、props 解构/default/rest、内容转发、稳定列表、context 与错误恢复。
- 原生事件、表单编辑与重置、property、自定义元素、样式与 HTML/SVG/MathML 类型/命名空间。
- 同步 SSR、安全数据编码、严格 hydration、已有输入与节点保留。
- Babel/Vite 编译、原生 TS7、框架诊断、开发更新、独立包和组件库消费。
- 原生属性生成、资源回收验证与持久化任务试点；修复试点反馈的语义问题。
- 完整 raw-text 规则、HTML/SVG 标签名称规范化和 script 双重转义保护；明确支持与安全边界。
- 固定产物与完整性、候选 CI、注册表消费及稳定 tag 提升工具；MIT 许可和统一版本策略。

用户将本轮收尾调整为 RC1 交付和 zerodep-css 接入研究；接入方案见 [.design/zerodep-css-integration.md](.design/zerodep-css-integration.md)，尚未实施。稳定版本与后续接入由讨论后的任务继续推进。
