# Naive UI 按钮体系研究

2026-10-11。检查官方 main 的固定提交 [8b249214](https://github.com/tusen-ai/naive-ui/tree/8b249214f17328a47eeb57dd5c7b80a47c94d116)，该提交 package.json 为 2.45.3。以下是源码与官方示例审阅，不是对 Naive UI 的本地运行验收；研究后用户批准普通按钮的内容槽与实现收敛，明确暂不做浮动按钮；最终契约见 [按钮文档](../docs/buttons.md)。

## 组件划分与实现

| 对象             | Naive UI 做法                                                                                                                  | 对本项目的启发                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Button           | 一个 defineComponent 自己处理 props、主题计算、事件与渲染，复用内部加载/波纹/过渡组件；不是多层 ButtonBase/ButtonView 包装体系 | 先让一个主要组件拥有完整职责，不以增加层次为目标                                     |
| 图标             | icon 槽与 renderIcon 均接收节点内容；renderIcon 优先，iconPlacement 决定前后；无文字时取消图标间距                             | 图标由调用方渲染，按钮不依赖图标数据格式；TSX 不必同时维护两套槽入口                 |
| 纯图标           | 没有独立导出的 IconButton；通过 Button circle + icon 槽，或 text + 默认槽图标实现                                              | 纯图标不需要另一套样式引擎；我方 IconButton 可因无障碍名称类型及默认几何保留薄封装   |
| 加载             | loading 在图标区域切换为加载器，保留标签，使用展开/切换过渡；click 回调被拦截，DOM disabled 仍只取 disabled prop               | 可考虑图标区加载，但与我方整段内容占位覆盖、loading 原生禁用不是相同契约，需单独取舍 |
| ButtonGroup      | div role=group，提供 size 上下文，vertical 改方向；圆角与边框接缝由 CSS 实现                                                   | 我方字体继承/em 已能统一尺寸，无需仅为模仿新增上下文；组不负责选择状态               |
| FloatButton      | 独立实现，拥有定位/边距/宽高/形状/描述/展开内容等职责，没有导入普通 Button                                                     | 浮动位置与展开交互属于另一种容器，不向普通 Button 堆定位与菜单选项                   |
| FloatButtonGroup | 容器负责定位，向子按钮提供 shape；组内子按钮不再使用自身定位。圆形分离排列，方形形成带接缝的整体                               | 区分连续按钮组与浮动操作组，只在确有父子协作时使用上下文                             |

主要源码：[Button](https://github.com/tusen-ai/naive-ui/blob/8b249214f17328a47eeb57dd5c7b80a47c94d116/src/button/src/Button.tsx)、[ButtonGroup](https://github.com/tusen-ai/naive-ui/blob/8b249214f17328a47eeb57dd5c7b80a47c94d116/src/button-group/src/ButtonGroup.tsx)、[FloatButton](https://github.com/tusen-ai/naive-ui/blob/8b249214f17328a47eeb57dd5c7b80a47c94d116/src/float-button/src/FloatButton.tsx)、[FloatButtonGroup](https://github.com/tusen-ai/naive-ui/blob/8b249214f17328a47eeb57dd5c7b80a47c94d116/src/float-button-group/src/FloatButtonGroup.tsx)。

## 图标内容的两个可选方向

1. 按 Naive 收敛到一个 icon 节点槽和 iconPlacement。入口少，但同一按钮同时使用前后图标时需要额外组合。
2. 保留我方 startIcon/endIcon 两个位置，把值从 LucideIconData 改为 Renderable。调用方直接写 Icon 或自定义图形，slotStartIcon/slotEndIcon 这类二次转发可取消。IconButton 的 icon 同样接收节点。

倾向第二个方向：复用现有位置语义，减少图标数据与属性转发的耦合，不同时增加 renderIcon。动态内容继续由 TSX/props 负责，按钮不扫描节点来判断是什么组件；图标槽外壳负责尺寸/间距与装饰语义。IconButton 的显式身份也避免靠扫描 children 猜测“纯图标”。

已有 slotRipple/slotSpinner 属于内部创建的部件，可按确切需求保留；它们与调用方已经创建的图标节点不同，不一刀切删除所有槽配置。

## 不照搬的边界

- Button 的 text/ghost/dashed/secondary/tertiary/quaternary 等布尔开关组合复杂，源码会警告部分冲突。我方继续使用单一 variant，不为对齐组件库扩大组合。
- Naive 的 tag 支持任意 HTML 标签，但公开 TSX 原生属性仍主要基于 button，源码另有未公开的 XButton 类型。我方保留 button 与 a 的明确事件/ref/禁用契约。
- FloatButton 使用 div role=button；所审源码没有相应的 tabindex/键盘激活处理。若我方实现，激活部件应使用原生 button，定位外壳与展开区域放在外层，不能嵌套按钮。
- menu 槽是一个可展开区域，不等同于完整 ARIA 菜单。首版浮动操作可只做定位/形状/内容/组合；展开与焦点行为另行定义，避免直接把 hover 当成唯一入口。
- 当前公开文档的 ButtonGroup size 优先级与源码不同：源码是按钮显式 size 优先于组。FloatButton 文档中部分尺寸/偏移默认值也与源码不一致；实现判断以上述固定源码为准。

## 对当前未提交重构的评价

第一版 ButtonView 消除了四份装配重复，通过现有行为验证；但仍有内部根组件注入、重复转发与图标数据协议，并未充分改善内容 API。不能只因测试通过就认定设计足够简单。

下一步先确定内容槽与主要组件边界，再调整内部结构。可以把 Button 作为完整的主要实现，IconButton 仅提供类型/几何便利，ToggleButton 保留受控切换，LinkButton 保留导航；少量跨根的纯样式函数并不天然有问题，不为追求“全是组件”制造根协议或大规模泛型。

FloatButton/FloatButtonGroup 是候选的新功能，不在本轮研究时直接加入。已有 ButtonGroup 继续只管一维相连与尺寸继承。
