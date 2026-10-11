# 按钮内容组合与实现收敛

2026-10-11，用户在 Naive UI 研究后批准采用类似方向，明确本轮不做浮动按钮。本文取代未提交的 ButtonView/根组件注入试验方案；研究依据见 naiveui-buttons-study.md。

后续用户批准收敛删除 ButtonBase/IconButton 及对应类型，不保留别名。Button 直接渲染原生 button，接管默认 type=button、有效禁用拦截、字号与 Ripple；纯图标通过 Button.icon 表达，旧 IconButton 的 text 默认值在迁移处显式保留。旧底座演示改为正式按钮用途，原有表单/fieldset/字号/清理断言迁移后保留。

## 已确定契约

- Button 是主要实现，拥有成品按钮状态、CSS 与内容装配。纯图标使用 Button.icon，名称约束和方形几何属于 Button，旧 text 外观在调用处显式指定；ToggleButton 只保留受控 pressed、取消顺序与内部槽状态补充。
- LinkButton 保留真实 a 及导航、禁用、ref 语义；按用户最新要求删除 button-shared.ts 和 _buttonAppearance，两种原生根各自在 css 回调中完整声明自己的外观。单独导入 Button 仍不带入链接处理。
- icon/startIcon/endIcon 接收 Renderable；调用方直接创建 Icon 或自定义 SVG 并设置属性/ref。文本通过 children 组合。删除 slotIcon/slotStartIcon/slotEndIcon/slotText，不保留兼容入口。
- 内部创建的 Spinner/Ripple 保留 slotSpinner/slotRipple 对象或状态回调；Toggle 的回调仍含 pressed。
- 加载时文字保持可见，只在一个图标区域显示 Spinner；原图标节点保留。无图标时增加起始区域，宽度可以变化。loading 继续使用原生 disabled，根 aria-busy 不变。
- ButtonContent 继续支持自定义内容组合，ButtonBase/IconButton 已取消；按钮组只负责一维相连，字号/em、边框协议保留。删除旧 button-style 文件及 _buttonStyle/ButtonStyleOptions 入口。
- 不新增 FloatButton/FloatButtonGroup，不拓展通用菜单、形状矩阵或多态根 API。

## 验证与交付

- UI 与 docs 的客户端/SSR 构建；相关 TS7 正反类型检查。
- 19 个 UI/SSR/按需打包用例，涵盖自定义 SVG、图标区域加载分配、名称与槽约束、Toggle pressed 槽、包根入口和链接树摇。
- 10 个 Chromium CSR/SSR 场景，涵盖加载文字与图标节点/ref、props 更新、连续 CSS 值、受控取消/拒绝、fieldset、链接导航和一维按钮组。
- 本地仅相关检查，完整 CI 交远端；不发布 npm。上一轮 CSS 文档生成器的冗余 never 分支单独修复，不降低 lint 或类型断言。

状态：实施和上述焦点检查全部通过；相关 lint、UI/CSS 生成一致性检查通过。正式交付仍以最新提交的远端 CI 为准，不将本地 Chromium 结果等同于完整三浏览器/平台矩阵。

后续按用户要求删除共享样式文件：Button/LinkButton 各自内联样式，类型按组件归属放置，ButtonGroup 负责接缝常量。UI 构建、19 个相关测试、7 个按钮属性/槽补全探针及相关 lint 通过。修正了上一轮 CI 中仍传 Lucide 数据的 IconButton 补全夹具，保留原类型断言。

ButtonBase/IconButton 收敛已完成：删除 2 个组件及 3 个对应类型导出，包根剩余 55 项。UI/docs 构建、相关 TS7 正反类型检查、25 个组件/SSR/消费测试、13 个补全探针和 14 个 Chromium CSR/SSR 场景通过。字号演示改用正式 Button 几何，测试保留尺寸公式、字体缩放和局部覆盖断言。相关 lint 与入口生成检查通过；完整矩阵以该阶段远端 CI 为准。
