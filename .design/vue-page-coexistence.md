# Vue 工程中的独立 zerodep-js 页面：讨论稿

2026-10-01。用户要求：框架能独立开发应用，同时允许已有 Vue 项目中的独立新页面使用它；不要求双方互用组件或兼容响应式系统。本稿只研究方案，未实现适配、未添加 Vue 依赖，也不涉及暂缓的 zerodep-css 接入。

## 建议方向

保持 zerodep-js 的独立运行时、组件、路由和 SSR。进入现有 Vue SPA 时，通过一个很薄的页面宿主管理独立 DOM 容器与进入/退出；Vue Router 继续决定页面地址。新页面内部全部使用 zerodep-js，无须让 Vue 理解它的组件或状态。

不先造微前端运行平台、全局事件总线或 Vue 专用的核心模式。先在一个真实新页面上证明生命周期、构建、类型、导航和开发更新都清楚，再决定是否把重复的宿主代码收成一个小适配包。

## 三种方式

| 方式                                            | 体验与收益                                                            | 成本/限制                                                    | 判断                          |
| ----------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------ | ----------------------------- |
| 同一 Vue SPA 中挂载独立页面                     | 保留现有布局、登录流程、Vue Router 与无整页刷新导航；新页面可逐步增加 | 需要宿主生命周期、编译范围与类型边界；URL 由 Vue Router 管理 | 当前需求优先推荐              |
| 同一仓库/Vite 的多个 HTML 入口                  | 两套应用完全独立，可各自使用自己的 router 与 SSR；边界直观            | 跨入口整页跳转，内存状态不会自动共享；部署配置需识别两个入口 | 新业务区域独立部署/SSR 时合适 |
| iframe、完整微前端平台或 Custom Elements 组件桥 | 可提供更强隔离或组件分发                                              | 多出通信、样式、焦点、路由与打包协议；超出整页接入需要       | 当前不采用                    |

Vite 官方支持多个 HTML 构建入口，但入口设计不替代插件分工；同一构建仍需避免两个 JSX 转换同时处理同一个文件。[Vite 多页面应用](https://vite.dev/guide/build.html#multi-page-app)

## 独立页面的边界

建议按普通模块提供一个页面挂载入口，基础版本只需要返回 disposer：

```ts
// 新页面自己的入口，经过 zerodep 编译；不依赖 Vue。
import { mount } from 'zerodep-js';
import { ReportsPage } from './ReportsPage.js';

export function mountReports(target: HTMLElement, initial: { projectId: string }) {
  return mount(ReportsPage, { target, props: initial });
}
```

这只包装已有 mount，不需要新增核心 API。Vue 页面的模板只放一个空 div，onMounted 调用 mountReports，onBeforeUnmount 调用 disposer。Vue 管理容器和外部布局，zerodep-js 管理容器内部节点；Vue 不再在该 div 内声明插槽或其他 children。Vue 生命周期的这些钩子可以提供对应时点。[Vue 生命周期](https://vuejs.org/api/composition-api-lifecycle.html)

实际试点还必须处理异步 import 完成时宿主已退出的情况，不能在过期容器上重新挂载；挂载失败应显示宿主级错误/重试入口。源码热更新清理旧实例并重新挂载，状态重置符合当前 zerodep 开发契约，不承诺自动迁移任意本地状态。

Vue 的 KeepAlive 暂不作为默认宿主。停用缓存页面不等于卸载，不能只依赖 beforeUnmount 停止后台订阅/请求。需要缓存时再明确选择“停用即销毁，激活重建”或专门的保活策略；不把整个作用域暂停机制匆忙加进 core。[Vue 缓存生命周期](https://vuejs.org/guide/built-ins/keep-alive.html#lifecycle-of-cached-instance)

## URL 只交给一个系统

在已有 Vue SPA 内，由 Vue Router 负责 browser history、登录守卫、页面切换与外层滚动。独立新页面接收明确的初始业务参数，导航意图通过普通回调交给宿主，或者使用原生链接完成跨应用跳转。它可以使用 memory history 管理不需要写入地址栏的内部视图。

不要在同一个窗口里让 Vue Router 和 zerodep 的 browser/hash history 同时作为顶层 URL 所有者。两者的历史元数据、pop 处理和取消回滚并非同一个协议。确有“新页面内部子路由也同步到 URL”的需求时，再做一个以 Vue Router 为唯一提交者的 history 适配，并验证异步守卫与前后退；第一步不实现双向监听/互相 push 的同步循环。

参数变化是必须明确的地方：Vue Router 可能复用相同路由组件，而不会重新触发挂载。可以按记录 ID 给宿主设置 key，从而销毁并重建新页面；需要保留草稿时，再由宿主将普通数据显式交给页面的更新函数。直接把 Vue reactive/getter 传给 zerodep 不会自动建立跨框架订阅。[Vue Router 参数变化](https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes)

同理，zerodep 的 onBeforeLeave 只拦截自己控制器的导航，不能直接取消 Vue Router 的离开。真实编辑页有未保存内容时，应把一个明确的页面级确认回调接到 Vue 的离开守卫，而不是假装内部守卫已覆盖所有出口。只在业务需要时增加这个边界函数，不预先设计通用服务容器。

## 编译和类型需要先解决

已核对本项目 packages/vite/src/index.ts：zerodep() 目前没有 include/exclude，默认接管应用的 TS/TSX/JSX，并复用转换器参与依赖扫描。直接和 Vue JSX 插件并排加入不能视为已支持共存。

下一步若批准试点，应先补齐统一的文件范围选择：Vue SFC 交给 Vue 插件，Vue JSX/TSX 交给 Vue JSX 插件；新页面目录内的 TS/TSX 交给 zerodep。范围规则同时应用于开发 transform、依赖预扫描、生产与 SSR，Windows 路径和带 query 的模块 ID 采用相同解释。Vue JSX 插件已有 include/exclude；zerodep 对应选项仍是待实现设计。[Vue JSX 插件选项](https://raw.githubusercontent.com/vitejs/vite-plugin-vue/main/packages/plugin-vue-jsx/README.md)

推荐把新页面组织成一个 pnpm workspace 子项目，有自己的 TS7 与 jsxImportSource: zerodep-js 检查；对 Vue 暴露纯类型明确的挂载入口和声明。Vue 项目维持已有类型工具，不要求它跟随框架切换 TS 版本。开发时是否直接使用新页面源码，取决于文件范围与声明解析的试点结果；正式分发支持预编译 ESM + d.ts。

同一 TS 项目混放两类 TSX 时，不能只设置一个全局 JSX 类型来源，也不能假定新建嵌套 tsconfig 就会自动隔离跨目录 import 的类型检查。逐文件 JSX 来源与工程引用是候选手段，必须与实际 Vue 类型工具联合验证；通过打包后的页面入口隔开类型系统更稳妥，但需要维护声明构建/监听。

当前目录整理只是 core 内部责任拆分，不新增 Vue 依赖，也不等于已有 zerodep-js/runtime 独立导出。公开根入口继续用于 standalone 应用；需要进一步拆发布包时，应有独立版本或消费需求作为理由。

## 样式与服务端

同一文档内的 CSS 仍会互相影响。默认用页面类名前缀或 CSS Modules，复用项目设计变量；不在嵌入页引入全局 body/reset，不因整页接入默认增加 Shadow DOM。zerodep-css 等待另一个项目的新版本后另行讨论。

Vue SPA 宿主第一步采用客户端挂载；如果宿主是 Vue SSR，先输出稳定空容器，等 Vue 接管后再挂载新页面。两套 renderer 不共同认领同一子树。需要 zerodep 新页也做 SSR 时，优先让服务端按路径分派到它自己的 HTML/SSR 入口；混合 SSR 宿主需要独立约定和验证，不在这次页面共存中默认承诺。

## 讨论后的执行顺序

1. 确定第一个新页面采用 SPA 宿主还是独立 HTML，明确 URL 所有者和是否需要 SSR。
2. 为 Vite 增加文件范围，验证普通 TS 宏、两类 TSX、预扫描与 production；保持现有独立应用默认行为。
3. 实现一个小宿主/独立页面入口，验证参数切换、按需导入竞态、销毁、错误、开发更新和样式范围。
4. 用现有 task 或真实业务页面试点后，再判断是否抽取 Vue 适配包；不在共存验证前承诺全面互操作。

本稿的推荐是工程判断，源码和官方文档只能证明基础机制存在；实际 Vue 共存尚未实施或通过联合验收。
