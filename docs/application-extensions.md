# 应用扩展执行方案

2026-10-01：用户授权直接完善快照、生命周期、路由和 localStorage。实施起点为 RC1 与 dfe566a；这些扩展现已随 RC2 发布并通过完整 CI 与真实 npm 消费。zerodep-css 继续等待另一边的新版本，本轮不修改或接入。

## 职责与 API

- 核心提供 snapshot、onMount、createScope、getAbortSignal；已有 effect/onCleanup/createRoot 保持语义，不另造一套信号容器。
- 路由与持久化先使用 zerodep-js/router、zerodep-js/storage 可选子入口，源码按职责独立。根入口不导出它们；不为同一版本多造两个发布流程，也不引入框架依赖。
- 状态仍显式声明并按变量或对象字段使用。变化输入使用 getter，跨异步不隐式保留作用域；getter/setter 绑定用于可整体替换的持久状态。

## 实施顺序与门槛

### 1. 快照与生命周期

snapshot 脱开深响应式普通对象、数组与 Map/Set 内的代理，再交给原生 structuredClone；保留循环与共享引用、二进制、日期等平台克隆行为，不以 JSON 冒充通用深拷贝。不支持的值明确报错，读取的属性参与正常依赖跟踪。

onMount 在客户端 DOM 提交后执行一次且不收集依赖，SSR 跳过；返回的清理函数受所有权管理。createScope 只暴露 run/dispose/signal/active，不暴露内部 Scope。getAbortSignal 绑定当前作用域，重跑和销毁时取消；清理继续逐项完成，失败不能阻断其他清理。

门槛：克隆隔离/环/别名/非法值，嵌套作用域、取消顺序、提前销毁、SSR、错误清理与类型均有验证。

### 2. 浏览器持久化

persistLocal/persistSession 绑定稳定对象或显式 read/write。支持动态键、版本迁移、校验、同页与 storage 事件同步、写入合并、flush/reset/remove/retry/pause/resume/stop。恢复前不写入默认值，损坏/未知版本不自动覆盖；卸载按已初始化的状态提交最后修改并释放监听/定时器。

SSR 不访问浏览器存储；客户端初次接管保持服务端初值，挂载后恢复，初始化期间的用户新编辑优先。应用自行选择序列化数据，默认 JSON；可用校验函数检查外部值，错误通过句柄暴露。

门槛：首次恢复、深层编辑、同页/跨标签、键切换、损坏数据、迁移、存储异常、暂停恢复、卸载提交和真实 CSR/SSR 页面。

### 3. 路由

类型化命名路由表、动态/可选参数与末尾通配、嵌套布局、browser/hash/memory history、Link、Outlet、route 上下文和 URL 查询更新。布局与同一路由实例保持稳定，参数更新不偷偷重跑组件初始化。

导航包括离开/全局守卫、重定向、可取消 loader、迟到结果丢弃、预加载、错误/未匹配状态、滚动与焦点处理。SSR 显式 await 路由数据准备后同步渲染，初始快照支持恢复；每应用/请求独立实例，不使用全局用户状态。

门槛：匹配与生成 URL、类型负例、嵌套身份、真实历史前后退、查询、守卫、竞态、SSR 恢复与释放。业务示例承接实际路由、偏好和草稿，不只增加孤立探针。

### 4. 交付

更新 API、支持范围、入门与示例；实际包消费验证新增子入口和声明。每阶段中文提交并推送，完整矩阵交 CI，下次推送前处理上一轮失败。RC1 保持原始产物；新增能力按新版本交付，不覆盖已有 npm 版本。

## 当前进度

- 阶段 1 本地完成：37 项相关 Node 用例、类型/框架检查、构建和两项 Chromium CSR/SSR 页面用例通过。SSR 构建补 Node 类型以识别标准 AbortSignal，独立 JSON 数据入口仍不引入 DOM 类型。
- 阶段 1 已推送 30d79f7，完整 CI 通过。
- 阶段 2 本地完成：persistLocal/persistSession、版本/校验、同步与清理已实现；21 项单元、6 项 Chromium 用例、类型与构建通过。任务页已保存未提交草稿，文档见 storage.md。完整矩阵随提交交 CI。
- 阶段 2 提交 a8535b6 的完整矩阵有 277 项浏览器用例通过、6 项失败：原有“名字”定位同时匹配新增的“保存的名字”。已改为 exact 并通过本地 CSR/SSR 回归，未删减断言。
- 阶段 3 本地完成：命名路由、参数/查询、布局与显式 key、历史、守卫、取消/预加载、错误/404、滚动/焦点和 SSR 快照恢复已实现。23 项 Node 与 8 项 Chromium 路由用例、pnpm check/build 通过。
- 任务空间位于 /workspace/tasks，使用真实任务 API，含标题编辑、草稿、离开确认、懒加载偏好和 CSR/SSR/hash。保存期间的新输入保留，SSR 连接中断会取消准备工作。
- 独立 tgz 已验证新增 API、子入口声明、CSR/SSR、快照、存储及路由消费。实现提交 4715059 的[完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36865635529) 已通过，包含三浏览器和 Windows 消费；上一轮名称定位问题也已通过远端复验。
- 新增能力现已进入 1.0.0-rc.2，候选 3d44ae7 完整 CI 和七包真实 registry 安装验收通过；RC1 原始包保持不变。
- 按用户新要求将 core 归入 dom/runtime/native/storage/router，保留公开入口与 ABI；生成脚本、测试导入、资源脚本与包隔离断言已同步。整理后的 279 项 Node、类型/构建和新路径 LSP 通过，独立包消费再核对产物与行为。
- 后续用户批准的 Vue/React/Svelte 页面宿主均已随 RC2 交付；最终范围见 [页面宿主](page-hosts.md)。早期[讨论稿](../.design/vue-page-coexistence.md)仅保留方案选择历史。
- 未创建新目标模式；本轮执行来自用户的明确实现请求。
- 本文中的能力在相应实现和验证完成前不记为已交付。
