# 框架完善与 CSS 简化执行记录

2026-10-11 用户授权按两份计划进入目标模式实施。起点 5616bae；只在当前目录工作，保留已有 `.codex/lsp4ij/`。不发布 npm。

## 阶段

| 阶段 | 范围                                             | 状态                                       |
| ---- | ------------------------------------------------ | ------------------------------------------ |
| R0   | 基线 CI、生成声明一致性                          | 5616bae 完整 CI 已通过                     |
| R1   | F2/F3/F6 两层泛型表单与类型；CSS P1 单类组合内核 | 已完成，包含在 47731e9 的完整 CI 验收中    |
| R2   | F1/F4 编译与列表矩阵；ButtonBase/Icon 试点       | 已完成，包含在 47731e9 的完整 CI 验收中    |
| R3   | F5 资源/异步；UI 迁移、删除旧 CSS API            | 已完成，47731e9 完整 CI 通过               |
| R4   | F7 SSR/接管/类型与独立消费、文档清理和完整 CI    | 实现与本地验收完成；远端以最终提交检查为准 |

## 实施约束

- props 参数解构直接响应，不加派生包装，不增加绑定字段名单。
- css 最终结果只有一个当前宿主登记的哈希类或空结果；保留 CSS 声明顺序与动态变量。旧合并入口仅在阶段迁移期间存在，最终删除。
- 普通 JS 参数、局部快照、派生只读、同步跟踪和显式清理不变。每项先核对既有证据，有缺陷才修，不把新增测试说成运行时修复。
- 本地焦点验证，阶段中文提交/推送，完整验收以最终提交 CI 为准。

## 证据与剩余工作

每阶段完成后在这里记录具体实现、命令结果、提交和 CI；保留未完成项，不将计划当作交付。

### R1

- 新增 LayeredFieldsExample：FieldShell<T> → FieldInput<T> → input，参数解构/default/rest 无需派生包装，覆盖根对象替换、可选值、最新回调、实例状态、CSS 单类组合和卸载。
- 复现并修复 ComponentBindings 对未实例化 T 的条件比较导致合法泛型转发失败。类型映射只识别回调参数形状，真实写回仍由官方 TS 赋值投影检查；互斥输入、必填 props、只读目标与错误回调类型不放宽。
- css 现在按登记表展开结果，保留声明与变量顺序，只输出单类或空结果。空输入不登记；未知内部哈希引用、跨宿主缺失引用和旧多类结果明确失败。原始 CSS 片段不按标点猜测。旧 mergeClasses 暂留到 R3 迁移完成后删除。
- CSS runtime 两文件 10 例、CSS compiler 两文件 46 例、真实 TS7 投影 17 例通过。新启动 LSP 的例子与既有绑定类型夹具无错误。
- Chromium authoring + layered-fields 共 13 例通过，含 CSR/SSR。相关包和示例两端构建、变更 lint、格式/差异检查通过；未运行本地完整矩阵。

### R2

- R1 已提交 47f6356。ButtonBase/Icon 已将传入 class 纳入同一个 css 声明；共用按钮样式函数和 keyframes 未删除。
- F1 的赋值/自增/BigInt/短路/词法绑定/源码映射使用既有 macros 测试；增加辅助函数实际依赖、条件切换、异常恢复及快照的组合用例，运行时已有行为正确，无须改写。
- F4 新增同 key 替换后的事件读取、排序、过滤、恢复、删除连续用例，确认旧草稿在复用时保留、销毁后不再复用、每个实例只清理一次。
- macros/derived-patterns/loops 三文件 47 例、Icon/Base/Buttons 三文件 21 例通过；Chromium flow/icon/base 18 例（含 CSR/SSR）通过。新启动 LSP、变更 lint 和相关构建通过。

### R3

- R2 已提交 63d8843。该提交 CI 的 verify 在 lint 发现 CSS 测试对 CssClass 的未收窄字符串拼接；已增加真实 string 类型断言，不关闭规则或削弱错误用例。
- 13 个 UI 组件全部统一到 css；删除 _mergeClasses、宿主 mergeClasses、className 标记函数与 CssProps 重复公开别名。保留编译协议函数和原生 DOM class/className；协议仍为 ABI 4，旧预编译 UI 需重建。
- Provider 文档示例的标记类改为 data-ui 选择器；Text/Flex/Grid 测试改用当前宿主生成样式并保留声明和 data 定位断言。单属性按需导入夹具移除标记函数，新增旧公开导出缺席检查。
- F5 增加旧成功/失败和卸载后返回的普通 Promise 用例，包含旧请求不得清除新 loading 的检查；运行时现有取消/清理正确，无需引入任务 API。requests 文档同步示例。
- CSS runtime 12 例、CSS compiler 46 例通过。core 生命周期/reactivity/ref 焦点测试通过；Grid/Flex 迁移后与 lifecycle 16 例通过。Chromium buttons/base/grid/provider/icon 共 18 例（含 CSR/SSR）通过。
- CSS/UI 生成检查、native 生成检查、独立 LSP 与变更 lint/格式检查作为阶段门槛；完整矩阵在最终提交验收。

### R4 与最终交付边界

- R3 已提交 47731e9，独立 tgz 消费通过：安装、声明、泛型/事件、预编译库、旧公开入口缺席、CSR/SSR、接管、卸载及 tree-shaking。CssProps 的删除另有真实类型负例，未用运行时 typeof 代替类型验收。
- SSR render/css-context/css-keywords/id 与 development 五文件 27 例通过；Chromium hydration/css/layered-fields 共 20 例通过，覆盖节点身份、接管前编辑、错误接管恢复、CSS 主题与懒加载、请求隔离和多层 props。
- 新增 binding-language.test：独立启动官方语言服务，泛型两层组件正确源码 → readonly 写回错误 → 恢复，诊断 0 → TS2540 → 0，错误仍位于原 bind 行。焦点测试及该文件的 lint/LSP 通过。
- 本轮没有新增公共 API，也没有重写本来正确的依赖图、列表或清理运行时。实际框架修复是泛型组件绑定类型；其他明确边界用现有及新增组合用例固定。

## 语义证据矩阵

| 工作包 | 证据入口                                                            | 结论                                                                              |
| ------ | ------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| F1     | compiler macros/derived-patterns、core reactivity                   | 保留普通 JS 结果/顺序、实际同步依赖、异常恢复和合法快照；组合回归通过             |
| F2     | LayeredFieldsExample、components/props、projection                  | 参数别名/default/rest 直接响应；泛型转发误报已修复                                |
| F3     | layered-fields/authoring/forms/group、绑定类型夹具                  | 可选值、最新回调、整份替换和只读/错误写回检查；原生 IME/reset 路径继续覆盖        |
| F4     | ListExample、flow、loops                                            | 同 key 保留节点/草稿，排序与最新事件数据正确；过滤销毁后恢复新实例                |
| F5     | core lifecycle/reactivity/refs、flow/base/provider、requests        | 旧结果和旧 loading 不覆盖新请求，卸载取消和失败清理有明确责任                     |
| F6     | projection、binding-language、独立 lsp:inspect、native/css/ui check | 官方 TS7 正反例、源码坐标、泛型上下文及生成一致性通过；当前旧连接需重载时单独说明 |
| F7     | SSR 五文件、hydration/css、独立 tgz 消费；完整 CI 的开发/平台矩阵   | 本地相关场景通过；完整验收看最终提交 CI，不借用旧提交的通过记录                   |

## 远端验收与清理

- 运行时与 API 迁移提交 47731e9 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/38117779881) 全部任务成功，包含六个平台、三浏览器、Linux/Windows 独立消费、主验证和发行产物生成。后续语言服务回归与记录提交仍需自身完整 CI，不预先宣称通过。
- 生成产物保留供 IDE/应用使用；临时迁移/清理脚本、浏览器配置与独立结果目录已删除。独立消费脚本已回收其临时包、安装和私有 store。用户已有 `.codex/lsp4ij/` 保留。
- For 参数解构、深层 props 参数解构、可覆写派生、自动异步呈现等仍在原计划的候选边界外，不作为未完成的本轮实施项。
