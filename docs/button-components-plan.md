# Button 系列与 Flex 实施规划

日期：2026-10-09。本文是 [生产主计划](production-plan.md) 第 12 节的实施依据。用户已授权进入目标模式完整执行。采用下列 API、默认值和阶段方案，加载使用原生 disabled；实现与验证进度在交接时统一整理。

## 1. 最新范围与验收起点

- 本次目标：Button、IconButton、ToggleButton、LinkButton、Flex，以及它们确实需要的基础组件或工具。
- 布局组件统一叫 Flex，不保留 Group 别名，不创建 ButtonGroup、IconButtonGroup、ToggleButtonGroup。
- Flex 除排列、间距、换行外，需要可选 attached 模式，处理相连控件的中间圆角、共享接缝和焦点层级。
- MenuButton 暂不做。Menu、浮层定位、菜单导航、关闭层管理、焦点陷阱和虚拟列表不进入本次实施，不安装 Floating UI。
- 在当前主目录工作；UI 保持 private。按阶段实现并提交推送；完成后精简失效/重复文档，建立最终交接文档。
- 起点提交 915f950 的完整 [CI 37943848823](https://github.com/kenconnet666/zerodep-js/actions/runs/37943848823) 已成功；不能把该结果用于后续组件提交。

## 2. 当前已有能力与真正缺口

| 已有能力                                                          | 本次用法                                 | 缺口                                                          |
| ----------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| core 的 _component/_state/_derived、生命周期、DomRef/_composeRefs | 组件组合、状态与资源清理                 | 不预设新增 core API                                           |
| core 的 _id、组件 bind 回调协议                                   | 可访问关联、ToggleButton 的 bind:pressed | 用真实 TSX 验证类型和父级拒绝更新                             |
| Icon、Text、Spinner、ButtonBase                                   | 图标、标签、加载与原生 button            | 成品外观、加载协议、稳定内容布局                              |
| Ripple/_press                                                     | 指针和键盘的视觉反馈                     | Ripple 目前只允许直接父 button；链接需要 a 支持和不同按键规则 |
| _resolveSlotProps/_mergeSlotProps/_composeEventHandlers           | 每个 slotXxx 的组合                      | 给新组件限定可覆盖字段和明确状态                              |
| CSS 的 UiTheme/CssValue/_mergeClasses                             | 主题和原生 CSS 输入类型                  | 按钮私有外观规则、相连控件的样式约定                          |
| 字号与尺寸测量工具                                                | 后续几何组件复用                         | 普通按钮与 Flex 不需要观察器                                  |
| ui:generate/ui:check                                              | 唯一根入口                               | 当前只扫描 base/utils；加入 layout，同时保持 internal 不公开  |

核心原则：先复用已有能力。按钮外观的私有复用代码不等于新的公开工具；没有两个真实消费者的抽象不提前发布。

## 3. 研究结论与取舍

### 布局与行为分开

Radix Flex 与 Mantine Group 都把布局作为独立职责。我们只保留一个 Flex，支持横向和纵向，不同时引入 Row/Stack/Box 三套近似入口。[Radix Flex](https://www.radix-ui.com/themes/docs/components/flex)、[Mantine Group](https://mantine.dev/core/group/)

相连外观是本库 Flex 的 opt-in 扩展，只应用到明确支持相连样式的直接子控件。互斥选择、单 Tab 停靠、方向键导航属于其他交互协议；WAI-ARIA Toolbar 有独立的键盘要求，不能因容器排成一行就自动添加 toolbar 角色。[Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)

### 两种原生根元素，复用外观

Button/IconButton/ToggleButton 用 button；LinkButton 用 a。避免一个带 as/href 泛型的大型 Button，也不在 button 中包 a。链接保留浏览器导航能力，按钮保留表单和键盘能力。[Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)、[Link pattern](https://www.w3.org/WAI/ARIA/apg/patterns/link/)

### 加载策略的修订建议

上一轮提出加载期间保留焦点。本轮建议首版优先采用原生禁用：button 的有效 disabled = disabled || loading。这样 SSR 接管前也有原生保护，无须自己模拟全部按钮/表单激活路径。MUI 同样把 loading 定义为显示指示器并禁用按钮。[MUI Button API](https://mui.com/material-ui/api/button/)

执行选择：button 的有效 disabled = disabled || loading。动态 disabled 可能改变焦点与 Tab 行为，不承诺加载期间保持焦点，不自动把焦点抢回，也不安装焦点恢复器。

## 4. 共用视觉与属性契约

- variant 首版 solid/outline/text。建议 Button 默认 solid，IconButton 默认 text，ToggleButton 默认 outline，LinkButton 默认 outline。
- size 始终是 CssValue<'fontSize'>，省略时继承。专用几何尺寸使用 em，不自动换算数字 px，不添加 sm/md/lg 密度枚举。
- color 始终是前景色，backgroundColor/borderColor 分别对应同名 CSS 属性的输入类型。变体给默认配色；用户可显式覆盖，不猜测任意背景色的对比文字色。
- 通用颜色、字号、动效 token 继续在 packages/css；内边距、图标比例、按钮圆角、连接边框等专用值留在 UI 内部。
- 保留当前试点 line-height 1.25、padding-block 0.625em、padding-inline 1em、gap 0.5em、border 0.0625em、focus outline/offset 0.125em。默认单行外框按同一组比例统一，IconButton 的方形边长包含相同边框；不出现文本按钮 42px、图标按钮却 40px 的默认错位。
- 所有变体保留相同边框占位，避免切换变体或 pressed 时尺寸跳动。默认标签允许换行，内容增高时使用 min-block-size，不能固定高度裁切。
- 控件自己的 display:inline-flex 等默认样式不得覆盖原生 hidden 的隐藏效果；否则 attached 排除隐藏项与真实几何会不一致。原生 hidden 的支持要与按钮布局样式一起验证。
- 用户显式 CSS 下限、字号和边框覆盖按 CSS 生效；自定义后不承诺与默认相连几何仍然完全兼容。
- disabled/loading 阻止激活；Toggle 的 pressed 是持续状态，pointer :active 是短暂状态，focus-visible 是独立可见层。禁用波纹不能移除焦点提示。
- hover 仅对支持悬停的环境启用；保留 prefers-reduced-motion 和 forced-colors 下的可见边界与状态，不只依靠颜色区分持续选中和焦点。
- 不引入通用 variants/recipe 引擎。先从 Button 提取一个私有样式函数和必要的内容布局，供其他三个控件复用。

## 5. 各组件 API 草案

### Button

- 根节点 button；type 默认为 button，支持显式 submit/reset、name/value、form、formAction 等原生属性。
- startIcon/endIcon 接收现有 LucideIconData，children 为非交互标签内容。
- loading 由外部传入，不接管 Promise、不实现请求缓存或自动 loading。
- loading 时保留原内容节点和占位，用 opacity 隐藏视觉内容而不隐藏其可访问名称；Spinner 居中覆盖，aria-hidden，根标记 aria-busy。原标签与图标不因 loading 来回卸载。
- 不默认加入 live region，避免每个按钮都重复播报；业务状态信息由业务提供。
- slotStartIcon/slotEndIcon/slotText/slotSpinner/slotRipple 分别转发。root 的 class/style/ref/事件直接传入。

### IconButton

- 复用按钮行为与视觉规则，icon 接收 Lucide 数据，默认方形，居中对齐。
- 类型层要求 aria-label 或 aria-labelledby 至少一个；运行时文档要求实际名称非空。title 不能替代名称，也不顺带创建 Tooltip。
- 独立 slotIcon/slotSpinner/slotRipple；图标默认装饰性，名称由根按钮拥有。
- loading 保留名称和方形占位；圆形外观先通过 class/style 的圆角表达，不新增另一个组件。

### ToggleButton

- 根节点始终 type=button；不自动提交表单、不注册隐藏 input。
- 首版只做受控 boolean：pressed + onPressedChange，可用框架现有 bind:pressed。没有 defaultPressed、内部乐观状态或通用 controllable-state 工具。
- pressed 与回调都作为受控契约声明；bind 语法生成回调。父级不接受更新时，视图继续服从原 pressed。
- 提供文字模式及 icon 模式；icon 模式按 IconButton 的名称要求约束，使用类型联合避免同时传 icon 与 startIcon/endIcon。
- 激活流程：检查有效禁用 → 用户 onClick → 若未 preventDefault 且未抛错，调用 onPressedChange(!pressed)。不在 keydown 和原生 click 各切换一次。
- 根 aria-pressed 由 pressed 决定，槽无法覆盖。首版不支持 mixed，不实现单选组或多选集合。
- 持续状态保留稳定标签，例如“加粗”配合 pressed，而不是同时改变成“取消加粗”；图标可以表达状态，仍须保留操作名称。

### LinkButton

- 根节点 a，href 为必填导航地址；属性和 ref 类型使用 HTMLAnchorElement，不混入 button 的表单属性。
- 正常状态保留 target/rel/download、Ctrl/Cmd 点击、中键和右键菜单，不统一 preventDefault，不接管路由。
- Enter 激活，Space 保持链接的原生滚动行为；不能复用会把 Space 当作按钮激活的工具。
- disabled/loading 时移除实际 href，设 aria-disabled、tabIndex=-1；保留 role=link 与名称。阻止 click/auxclick 执行用户导航处理；恢复时取最新 href/原生属性，不用挂载时快照。
- 不把 pointer-events:none 当作禁用实现，不向 a 输出无效 disabled 属性。SSR 同样省略不可用链接的 href。
- loading 复用按钮的内容占位与 Spinner；它表示链接暂不可操作，不表示库自动追踪页面跳转。
- 波纹支持 a 的 Enter 和指针反馈，Space 不触发链接波纹；直接原生导航不应因等待动画而延迟。

### 每个 slot 的共同边界

- 对象或纯状态回调；状态公开 variant/disabled/loading，Toggle 再加 pressed。语义中 disabled 表示显式禁用，另用 unavailable 表达 disabled || loading，避免消费者误解。
- 不提供统一 slotProps，也不引入 slotRoot。根事件、原生属性和 ref 保持直接传入。
- class/style/ref 按已有合并工具组合；只有明确列出的事件组合。用户显式 undefined 撤销普通覆盖，不可撤销组件拥有的语义。
- icon 数据、标签 children、disabled、aria-pressed、aria-busy 及内层装饰标记由组件拥有；对应字段从槽类型排除，运行时也在 spread 后落实。
- slotText 固定 span，不能转发成 h1/p 等不适合 button 的结构；原生交互内容不得嵌套。动态槽变化必须响应，不能 setup 时取一次快照。

## 6. Flex：布局与相连控件

### 6.1 常规布局

首版一个 div 根节点，不包裹或克隆 children；默认 direction=row、wrap=wrap、alignItems=center、gap=0.5em。建议公开：

| 属性                       | 含义                                                       |
| -------------------------- | ---------------------------------------------------------- |
| direction                  | row / column；不提供 reverse，保持 DOM、视觉与键盘顺序一致 |
| inline                     | flex / inline-flex                                         |
| wrap                       | nowrap / wrap / wrap-reverse；attached 时只允许 nowrap     |
| gap、rowGap、columnGap     | 对应 CssValue 输入；未传轴向 gap 时沿用 gap                |
| alignItems、justifyContent | 对应 CSS 输入类型；不另外创造对齐枚举                      |
| size                       | 字号基准；控制后代未显式覆盖的字号，继而控制 em 比例       |
| equal                      | 可选，直接元素子项在主轴等分；仅按 CSS flex 分配，不测量   |
| attached                   | 启用下面的连接规则，默认 false                             |
| class/style/ref/原生属性   | 直接作用于容器；可显式写 role=group 及名称                 |

equal 设置直接元素子项 flex-basis:0、flex-grow:1 和合理的最小尺寸约束；纵向等高需要容器有明确可分配高度，换行时只能每行等分，不承诺跨行等宽。裸文字需要用 Text/元素承载。子项的显式 style 仍按 CSS 层叠生效。

Flex 不传递 variant、disabled、loading、pressed，不为子项合成回调，不注册选择集合，也不自动成为 toolbar。共享字号通过正常继承；共享业务状态由调用方显式传入。

### 6.2 attached 的完整规则

| 场景                   | 约定                                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| 横向相连               | 首项保留 inline-start 两角，尾项保留 inline-end 两角，中间接触角为 0                               |
| 纵向相连               | 首项保留 block-start 两角，尾项保留 block-end 两角，中间接触角为 0                                 |
| 只有一项               | 保留全部自身外侧圆角，不留下负间距                                                                 |
| 没有子项               | 空布局，无占位、无事件资源                                                                         |
| RTL / writing-mode     | 使用逻辑角、逻辑边和主轴规则；不把 left/right 写死                                                 |
| 相邻边框               | 标准控件使用一致边框占位，通过主轴重叠一条边框厚度避免双线；不用删除边框造成内容位移               |
| 焦点 / 按压 / 悬停     | focus-visible 项位于相邻项之上，pressed/hover 按约定分层；父级不以 overflow:hidden 裁剪焦点        |
| disabled / loading     | 子项仍参与连接几何；不因不可交互而被当成缺失项                                                     |
| 条件渲染 / 列表移动    | 根据真实直接元素子项更新首尾；不能依赖初始数组索引或挂载时缓存                                     |
| 隐藏子项               | 支持条件移除与原生 hidden；首尾计算排除这些项。任意外部 CSS display:none 的检测不做 JS 测量推断    |
| 子项 class/style       | 外侧自定义圆角保留，中间接触角由 attached 规则拥有；强行用 inline/important 覆盖接触角将退出该保证 |
| 不同控件               | 四类控件都实现同一连接样式协议；可混排。标准边框宽度与字号一致时保证单线接缝                       |
| 不同字号/边框/边框颜色 | 允许显式 CSS，但不保证轮廓齐平。文档提供统一 Flex.size 与子项边框的建议，不能暗中覆盖用户字号      |
| 长标签                 | 标签可内部换行，同行项通过布局拉伸对齐；容器本身不换行。不得默认截断或强制横向滚动                 |
| 圆形 IconButton        | attached 会把接触侧圆角置零；外侧保留设置后的形状，组件需在示例中展示此行为                        |
| 嵌套 Flex              | 普通布局可嵌套；连接选择器只处理直接子项，不穿透后代，不把嵌套容器当成原生按钮                     |

attached 自动使用 gap=0、nowrap、交叉轴 stretch。类型用联合限制与非零 gap、wrap、冲突 alignItems 同用；运行时对动态/JS 输入做明确校验，不悄悄猜测。class/style 能覆盖 CSS，但覆盖后不承诺连接效果。

默认保留每个首尾子项自己的外侧圆角，Flex 不另设一套主题圆角。自定义外侧半径优先通过子组件 class/style；需要统一时使用容器的明确子项 CSS 规则。本轮不额外加入含糊的 radius/rounded 双重入口。

### 6.3 相连样式协议

- 四类控件根元素提供本库约定的可连接标记和边框厚度变量；名称在 P1 定稿并有测试，不暴露组件实例或 DOM 注册表。
- Flex 的连接选择器只命中带标记的直接子元素。普通模式接受任意子元素；attached 模式只保证兼容控件连续排列，文本、分隔线、wrapper 或第三方组件不能被静默当作按钮。
- 实施时记录不兼容直接子项的开发诊断；扩展自定义控件可按文档显式实现相同样式协议，不通过查询后代找到某个 button 并强行改样式。
- 限定直接子项，禁止 :first-child/:last-child 误命中隐藏元素；选择器在 CSR/SSR、条件隐藏、动态增删和嵌套布局中验收。
- 使用 CSS 处理接缝和圆角。没有 MutationObserver、ResizeObserver 或全局事件监听来跟踪普通布局，不新增每个子项的生命周期资源。
- 先以本库四类控件的统一边框验证连接；不要把任意第三方 CSS 边框宽度推断成同一个值。需要统一圆角和边框时通过已说明的样式协议处理，不能靠读取 DOM 再逐项写内联样式。
- Flex 根为其子项层级提供局部隔离；不把 z-index 升到页面全局顶层。滚动外壳由业务另包容器，并自行预留焦点轮廓空间。

### 6.4 与状态分组的区别

多个 ToggleButton 可以放入 Flex，业务各自绑定状态。Flex attached 仅让它们外观相连，不使它们互斥；若业务确实需要单选语义，后续单独设计 radio/segmented 控件及键盘协议。不能仅为了少写代码就向 Flex 添加 value/onValueChange。

## 7. 需要新增或调整的基础实现

| 归属                            | 工作                                                  | 公开边界                                     |
| ------------------------------- | ----------------------------------------------------- | -------------------------------------------- |
| core                            | 复用 _id/_composeRefs/组件绑定/生命周期               | 本轮不计划新增 API；真实缺陷单独提交修复     |
| UI base/ButtonBase              | 审核原生属性转发、fieldset 禁用、外部 class、事件守卫 | 保持 button-only，不扩成任意 as 组件         |
| UI internal/button-style.ts     | 默认外观、状态层、连接标记/边框变量                   | 私有，不进入根导出                           |
| UI internal/ButtonContent.tsx   | 只有出现重复后才提取标签/图标/加载占位                | 私有，不能创建第二个 button 根               |
| UI utils/press.ts + base/Ripple | 支持 button/a 的反馈区别、取消/卸载/禁用              | 只跟踪视觉，不模拟 click，不阻止原生导航     |
| UI LinkButton 内部              | 不可用链接的 href/事件/tabIndex 处理                  | 先局部实现，不先发布 LinkBase 或通用禁用工具 |
| UI layout/Flex.tsx              | 布局与 attached CSS                                   | 根入口直接导出 Flex/FlexProps                |
| scripts/generate-ui-exports.mjs | 扫描 layout，显式排除 internal                        | 无子目录 index，无意外导出私有函数           |

本轮不需要通用焦点控制器、焦点范围、全局焦点可见状态、controlled-state hook、Popover、Tooltip、Separator 或新的布局 DSL。焦点视觉用 CSS，原生激活用原生元素，业务状态用已有 _state/bind。

## 8. 实施顺序与逐阶段完成标准

| 阶段                  | 工作                                                          | 阶段出口                                                |
| --------------------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| P0 契约冻结           | 确认加载策略、API 默认值、Flex attached 边界；检查上一提交 CI | 文档明确哪些是公共承诺，尚未实现                        |
| P1 基础布局与样式约定 | Flex 普通模式、唯一入口扫描 layout、连接协议样例              | 横纵布局、wrap、equal、继承与类型检查；不提前做复杂连接 |
| P2 Button 试点        | 私有外观、内容占位、原生表单、slot 转发、加载                 | 一套真实 docs 示例、组件/SSR/浏览器与补全通过           |
| P3 IconButton         | 复用 P2，补方形尺寸与名称约束                                 | 名称类型反例、图标加载、16→32px 等比                    |
| P4 ToggleButton       | 文字/图标模式、受控 pressed、bind                             | 父级拒绝/外部更新、按键不重复切换、稳定名称             |
| P5 LinkButton         | a 根、禁用链接、Ripple 链接支持                               | 原生导航/修饰键/中键/Space、禁用恢复、SSR href          |
| P6 Flex attached      | 用四类真实控件验收圆角/边框/层级                              | 横纵/RTL/隐藏/单项/混排/动态列表/长文本全部满足契约     |
| P7 集成与交接         | 文档、最小包消费、无关导出/观察器审计                         | 当前提交完整 CI，记录交付范围，无 npm 发布              |

P1 先做普通 Flex，方便各按钮的示例；attached 的正式实现放到四类控件齐备后，避免用假 div 样例证明组件组合正确。P2 的按钮几何与连接协议应提前冻结，P6 不重新改写四套外观。

每阶段独立中文提交、推送；推送前查看上一轮 CI，修复真实失败。只跑相关本地检查，完整平台/三浏览器矩阵留给 CI。推送后继续独立工作，不空等、反复轮询；未完成的检查不记为通过。

## 9. 验证矩阵

- 原生语义：Button type=button/submit/reset、name/value、外部 form、fieldset disabled（包括 first legend 例外）、用户 preventDefault、程序触发事件的行为守卫。组件禁用不能替代业务对 form.requestSubmit()/submit 的校验。
- 状态：正常/hover/active/focus-visible/disabled/loading；Toggle 再组合 pressed。loading 同步切换与重复点击不会触发二次业务动作，但异步请求状态仍由业务及时设置。
- 可访问性：IconButton 与图标 Toggle 有名称，aria-pressed 与模型一致；焦点和选中外观不同；关闭 Ripple 仍有焦点提示。检查真实可访问名称，不能只检查 aria-label 属性存在。
- 尺寸：继承、14/16/20px、16→32px、vw/rem/clamp/var；边框与焦点 em，浏览器边框量化容差明确，内容不裁切；普通组件没有测量观察器。
- 样式：亮暗主题、显式 CSS 颜色、颜色撤销、variant 切换、动态 slot、class/style/ref 合并，forced-colors、reduced-motion。
- Link：Enter/Space、Ctrl/Cmd/中键、新窗口与下载属性保持；不可用时真实 href 缺失、click/auxclick 不执行、恢复使用最新值；取消导航不产生多余业务事件。
- Flex：row/column、RTL、vertical writing-mode、wrap/equal；attached 的 0/1/N 项、hidden、移除/重排、禁用/加载、不同控件混排、嵌套容器隔离、焦点轮廓不被遮挡。非法 attached 参数有类型反例和动态输入验收。
- SSR/接管：按钮节点复用，初始 loading/disabled 原生属性正确；Toggle pressed、稳定名称、Flex 首尾样式一致；不读取 window，不创建计时器/观察器。
- 类型与工具：真实 TS7.1 宏检查、bind:pressed、slot 回调状态、CSS token 补全、原生 ref 类型；无子目录 index，自动导出仅包含公开 API。
- 消费边界：只导入 Button/IconButton 不把其他组件、未用 Lucide 图标或菜单/定位依赖带进产物；UI 仍 private。
- 本地自动检查不能代替读屏器实测。交付时区分已跑的浏览器/名称断言与未执行的 NVDA/VoiceOver 体验检查，不声称完整辅助技术认证。

## 10. 拟议使用示例

以下是设计目标，不代表当前已存在这些导出：

```tsx
let saving = _state(false);
let bold = _state(false);

<Flex size="1rem" gap="0.5em" wrap="wrap">
  <Button startIcon={Save} loading={saving} onClick={save}>
    保存
  </Button>
  <IconButton icon={Search} aria-label="搜索" />
  <ToggleButton icon={Bold} aria-label="加粗" bind:pressed={bold} />
  <LinkButton href="/docs" target="_blank" rel="noopener">
    查看文档
  </LinkButton>
</Flex>;

<Flex attached direction="row" size="1rem" role="group" aria-label="文件操作">
  <Button variant="outline" startIcon={Save}>
    保存
  </Button>
  <Button variant="outline">另存为</Button>
  <IconButton variant="outline" icon={Download} aria-label="下载" />
</Flex>;
```

attached 是视觉组合，不会把上述三个按钮变成一个 Tab 停靠，也不会让 ToggleButton 自动形成互斥选择。具体组件 API 和加载方案在实施前冻结；布局和行为不通过隐式父级 props 修改互相耦合。
