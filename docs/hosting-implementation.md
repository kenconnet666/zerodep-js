# 公开函数改名与页面宿主执行方案

用户已批准直接重构，不保留旧导出、deprecated 或双轨兼容。框架仍以独立应用为主体，Vue/React/Svelte 适配仅接管完整页面区域，不实现组件互用或跨框架响应式协议。CSS 接入继续暂停。

## 阶段和契约

1. core 根入口及 router/storage 子入口的顶层函数统一为 _ 前缀。宏识别集中为导入绑定到语义角色的映射；内部 helper 和 ABI、JSX 组件/类型/类、对象成员不机械改名。同步真实源码、编译夹具、LSP、文档与独立消费。
2. 修复旧 disposer 误删新根登记的问题。新增 _createPage(Component)，返回稳定的 PageEntry；每次挂载独立实例，句柄提供完整输入替换 update 与幂等 dispose，销毁后 update 不再生效。普通对象/数组输入形成独立数据视图，回调与不透明实例保留引用，不自动接管宿主状态。
3. Vite 插件增加 include/exclude，并在开发转换、依赖扫描、生产及 SSR 使用同一判断；分别处理普通 TS 宏与 TSX，保留标准 TS7 语法和类型来源。
4. 新增独立的 zerodep-js-vue、zerodep-js-react、zerodep-js-svelte 包。Vue/React 提供 ZerodepPage，Svelte 提供 _attachPage；对应宿主作为 peer，core 不依赖它们。宿主负责 URL；原生懒加载负责模块加载，适配入口是同步 PageEntry。
5. 同一个真实页面验证三种宿主的输入更新、局部状态/节点保留、卸载、重新挂载、React StrictMode、Svelte attachment 重跑、SSR 空容器、构建与声明消费。更新打包/发布清单为全部实际包，新增能力使用新版本，不覆盖 RC1。

## 维护原则

- 页面挂载与输入更新分开；宿主创建新 input 对象不会重建整页，身份变化用宿主原生 key/keyed block。
- 宿主容器不得声明自己的 children 或 innerHTML。错误按对应宿主生命周期传播；页面内部使用框架错误边界管理自身呈现失败。
- 不建立可配置服务容器或万能适配器。共同的页面实例逻辑属于 core，宿主只实现最小必要的生命周期连接。
- 本地先验证改动相关范围；每个可审阅阶段中文提交并推送，下次推送前核对上一阶段 CI，不空等矩阵。
- 研究稿中的过渡兼容建议已由用户否决，本方案为执行依据。未验证的宿主/全栈 SSR 组合不写成支持完成。

## 交付结果（2026-10-02）

五个阶段均已完成并进入七包统一的 1.0.0-rc.2。源码为 3d44ae7，[完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36887698421) 与工作区外 npm 精确版本安装验收通过；[GitHub 预发布](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.2) 保存原始 tgz 和最终 release.json。

- 实现声明、内部引用与公开入口直接采用 _ 名称，RouterInstance 直接声明；旧函数、deprecated、导出重命名中转均已移除。
- _createPage、根重复清理、输入复制/替换/字段缓存、三个宿主及 Vite 编译范围已交付。288 项 Node、类型/构建、格式及宿主浏览器用例通过；完整矩阵包括三浏览器和 Windows 独立包消费。
- 三宿主共享同一 TSX 页面，CSR/宿主 SSR、状态/节点/焦点/选区保留、入口替换、卸载、StrictMode 和热更新有实际验证；注册表验收再验证了公开包的类型、构建和交互。
- TS7 LSP 错误/修复、补全/跳转/重命名已有验证。LSP 探针会短暂写入故意错误的源文件，必须与构建串行执行。
- 用户要求的交付后完整性检查见 [完整性审查](completeness-audit.md)。范围保持为页面宿主，不扩展为组件互用、混合子树 hydration 或全栈框架适配。
