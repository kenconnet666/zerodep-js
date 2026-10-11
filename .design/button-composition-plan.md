# 按钮内容组合与实现收敛

2026-10-11，用户在 Naive UI 研究后批准采用类似方向，明确本轮不做浮动按钮。本文取代未提交的 ButtonView/根组件注入试验方案；研究依据见 naiveui-buttons-study.md。

## 已确定契约

- Button 是主要实现，拥有成品按钮状态、CSS 与内容装配。IconButton 只保留名称约束、纯图标默认几何和 text 默认变体；ToggleButton 只保留受控 pressed、取消顺序与内部槽状态补充。
- LinkButton 保留真实 a 及导航、禁用、ref 语义；按用户最新要求删除 button-shared.ts 和 _buttonAppearance，两种原生根各自在 css 回调中完整声明自己的外观。单独导入 Button 仍不带入链接处理。
- icon/startIcon/endIcon 接收 Renderable；调用方直接创建 Icon 或自定义 SVG 并设置属性/ref。文本通过 children 组合。删除 slotIcon/slotStartIcon/slotEndIcon/slotText，不保留兼容入口。
- 内部创建的 Spinner/Ripple 保留 slotSpinner/slotRipple 对象或状态回调；Toggle 的回调仍含 pressed。
- 加载时文字保持可见，只在一个图标区域显示 Spinner；原图标节点保留。无图标时增加起始区域，宽度可以变化。loading 继续使用原生 disabled，根 aria-busy 不变。
- 裸 ButtonBase 与 ButtonContent 继续支持自定义组合；按钮组只负责一维相连，字号/em、边框协议保留。删除旧 button-style 文件及 _buttonStyle/ButtonStyleOptions 入口。
- 不新增 FloatButton/FloatButtonGroup，不拓展通用菜单、形状矩阵或多态根 API。

## 验证与交付

- UI 与 docs 的客户端/SSR 构建；相关 TS7 正反类型检查。
- 19 个 UI/SSR/按需打包用例，涵盖自定义 SVG、图标区域加载分配、名称与槽约束、Toggle pressed 槽、包根入口和链接树摇。
- 10 个 Chromium CSR/SSR 场景，涵盖加载文字与图标节点/ref、props 更新、连续 CSS 值、受控取消/拒绝、fieldset、链接导航和一维按钮组。
- 本地仅相关检查，完整 CI 交远端；不发布 npm。上一轮 CSS 文档生成器的冗余 never 分支单独修复，不降低 lint 或类型断言。

状态：实施和上述焦点检查全部通过；相关 lint、UI/CSS 生成一致性检查通过。正式交付仍以最新提交的远端 CI 为准，不将本地 Chromium 结果等同于完整三浏览器/平台矩阵。

后续按用户要求删除共享样式文件：Button/LinkButton 各自内联样式，类型按组件归属放置，ButtonGroup 负责接缝常量。UI 构建、19 个相关测试、7 个按钮属性/槽补全探针及相关 lint 通过。修正了上一轮 CI 中仍传 Lucide 数据的 IconButton 补全夹具，保留原类型断言。
