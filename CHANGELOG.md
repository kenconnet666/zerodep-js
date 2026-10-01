# 变更记录

## 1.0.0-rc.2 — 候选准备，尚未发布

七个包已统一准备 rc.2，待该候选的完整 CI 与注册表验收；不覆盖 RC1 原始版本。

- 新增 zerodep-js-vue、zerodep-js-react、zerodep-js-svelte 三个独立页面宿主包，支持保留实例的输入更新、入口替换、清理与宿主 SSR 空容器。
- Vite 增加统一的 include/exclude 范围，覆盖开发、预扫描、生产和 SSR；三个宿主复用同一个 TSX/普通 TS 页面，并有独立 tgz 消费和开发热更新验证。

- 破坏性重构：core 根入口与 router/storage 的公开函数统一为单下划线前缀，直接移除旧导出；编译器按统一语义角色识别新名、导入别名和命名空间。
- 新增 _createPage 页面入口与 update/dispose 契约，宿主输入更新保留页面实例；修复旧 disposer 重复调用可能误删新根登记的问题。

- 新增 snapshot，支持脱开深代理、普通对象/数组循环与共享引用、Map/Set、二进制及平台结构化克隆规则。
- 新增 onMount、createScope、getAbortSignal，明确一次性挂载、同步所有权恢复与作用域取消；新增实际 CSR/SSR 用例。
- 新增可选 storage 子入口，支持 localStorage/sessionStorage 恢复、迁移、校验、同步、写入合并和清理；实际任务页保存新增草稿。
- 新增可选 router 子入口，支持命名路由与参数类型、嵌套布局、browser/hash/memory history、导航守卫、取消/预加载、错误恢复、滚动/焦点与 SSR 快照恢复。
- 新增任务空间示例，复用实际任务 API、保留布局、编辑持久化草稿、懒加载偏好页，并验证 CSR/SSR 与真实历史行为；新增子入口已有工作区外 tgz 消费验证。
- 修正新增持久化示例后原有输入测试的模糊名字定位；既有功能用例继续保留。

## 1.0.0-rc.1 — 2026-10-01

四个包已发布统一的 `1.0.0-rc.1`：[zerodep-js](https://www.npmjs.com/package/zerodep-js/v/1.0.0-rc.1)、[zerodep-js-compiler](https://www.npmjs.com/package/zerodep-js-compiler/v/1.0.0-rc.1)、[zerodep-js-vite](https://www.npmjs.com/package/zerodep-js-vite/v/1.0.0-rc.1)、[zerodep-js-ssr](https://www.npmjs.com/package/zerodep-js-ssr/v/1.0.0-rc.1)。源码为 a29419625773bfb4c6bdedf136496fbf6e7e2624，[GitHub 预发布与原始产物](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.1) 已建立。

[完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36818853600) 通过，包含三浏览器、Node 资源验证和 Windows 独立包消费。四包注册表 SHA-512 与本地固定产物一致，npm 精确版本的工作区外安装、TS7 声明、预编译组件库、CSR/SSR、接管、表单和卸载验证通过。

标签例外：发布使用 next，最终回读发现 registry 同时初始化 latest。尝试移除 latest 时，正常工具审批通过，但 npm 返回 HTTP 403；pnpm 登录身份已核对为发布账户。当前两个标签均指向 RC1，并不表示稳定 1.0.0 已发布。建议安装精确候选版本；未执行稳定提升，也未删除包版本。

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
