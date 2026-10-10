# 按钮、ButtonGroup 与布局

按钮只使用 css(...) 与属性作者描述样式；共享函数和组件转发由编译器/CSS 工具自动绑定安全动态值，UI 不手工声明 CSS 变量或拼接 style。连续改变十六进制颜色不会不断登记新类。inherit/revert/!important、自定义 var() 等值沿用原始声明，不为优化改变层叠语义。用户 class 仍最后组合，显式 style 由原生渲染统一合并，保持调用方最后覆盖。ButtonGroup 负责一维相连；Flex/Grid 只做普通布局。

从 zerodep-js-ui 根入口导入，在 Provider 内使用。UI 保持 private。所有 size 属性都是 CSS 字号，省略时继承；组件内部尺寸使用 em。通用 token 位于 UI Provider，按钮专用比例在 UI 内部。

```tsx
import { _component, _state } from 'zerodep-js';
import { Save, Search, Bold } from '@lucide/icons';
import { Provider, Flex, Button, IconButton, ToggleButton, LinkButton } from 'zerodep-js-ui';

export const Actions = _component(() => {
  let bold = _state(false);
  return (
    <Provider>
      <Flex size="1rem" gap="0.5em">
        <Button startIcon={Save}>保存</Button>
        <IconButton icon={Search} aria-label="搜索" />
        <ToggleButton icon={Bold} aria-label="加粗" bind:pressed={bold} />
        <LinkButton href="/docs">查看文档</LinkButton>
      </Flex>
    </Provider>
  );
});
```

## 四类控件

| 组件         | 根与默认值                                | 内容及状态                                                        |
| ------------ | ----------------------------------------- | ----------------------------------------------------------------- |
| Button       | button，type=button、variant=solid        | children、startIcon/endIcon、disabled/loading                     |
| IconButton   | button，type=button、variant=text         | 必填 icon，以及 aria-label 或 aria-labelledby；默认方形           |
| ToggleButton | button，固定 type=button、variant=outline | 必填 pressed/onPressedChange，支持 bind:pressed；文字或 icon 模式 |
| LinkButton   | a，必填 href、variant=outline             | children、startIcon/endIcon，保留导航属性与链接按键语义           |

variant 为 solid/outline/text。color/backgroundColor/borderColor 分别采用对应 CssValue 类型，接受主题关键字和 CSS 原值；color 始终表示前景色。用户自定义配色自行确保可读性，不从任意背景色自动推断文字色。

Button/IconButton 保留原生 button 属性，包括 type=submit/reset、name/value 和 form。禁用 fieldset 的原生规则有效，包括第一个 legend 中的例外。ToggleButton 不自动提交表单或生成隐藏 input；多个 ToggleButton 放入 Flex 也不会自动互斥。

ToggleButton 激活时先检查禁用，再执行用户 onClick；未取消且未抛错才调用 onPressedChange(!pressed)。父级拒绝写回时仍显示原 pressed。持续选中、按下和焦点分别表达；根 aria-pressed 由组件拥有。图标模式与 IconButton 一样必须有有效操作名称，title 不替代名称。

## 加载与禁用

loading 由业务控制，不自动跟踪 Promise。button 的有效 disabled 为 disabled || loading；SSR 初始加载也会输出原生 disabled。动态禁用可能改变焦点，不承诺保留或自动恢复焦点。表单整体的重复提交校验仍由业务负责。

disabled/loading 状态使用标准 cursor: not-allowed 禁止光标。ButtonBase 的禁用外观通过 :disabled 判断，同时覆盖原生 fieldset 继承并保留首个 legend 的例外；ButtonGroup 不给禁用子项应用 hover 层级。光标图案由浏览器/操作系统绘制，不使用自定义图片。

加载时原标签和图标节点保留，opacity 隐藏视觉内容，Spinner 居中覆盖，根 aria-busy=true。按钮名称和布局占位保持；原内容 ref 不会因加载切换而卸载。Spinner 是装饰，不默认创建额外 live region。

LinkButton 正常时保留 target/rel/download、修饰键点击、中键和右键菜单。Enter 激活，Space 滚动；不接管路由。disabled/loading 时实际移除 href，设 aria-disabled、role=link、tabIndex=-1，并拦截 click/auxclick 的业务处理。恢复时使用最新 href。它不会给 a 写无效 disabled 属性，也不靠 pointer-events:none 伪装禁用。

## 独立槽属性

| 组件                | 槽                                                            |
| ------------------- | ------------------------------------------------------------- |
| Button / LinkButton | slotStartIcon、slotEndIcon、slotText、slotSpinner、slotRipple |
| IconButton          | slotIcon、slotSpinner、slotRipple                             |
| ToggleButton        | 按文字/图标模式使用上述对应槽                                 |

槽接受对象或纯状态回调。所有成品按钮状态含 variant/disabled/loading/unavailable；disabled 表示显式禁用，unavailable 为 disabled || loading。ToggleButton 另有 pressed。

```tsx
<Button
  startIcon={Save}
  slotStartIcon={{ size: '1.25em' }}
  slotText={{ weight: '_semibold' }}
  slotRipple={(state) => ({ color: state.unavailable ? '_disabled' : 'currentColor' })}
>
  保存
</Button>
```

根的 class/style/ref 和原生事件直接传入，没有 slotRoot 或统一 slotProps。内容、图标来源、内部装饰标记、禁用与 busy/pressed 语义由组件拥有，槽不能覆盖。slotText 固定 span；children 不应嵌套链接或其他交互控件。外部类仍遵循 CSS 层叠，不能把类名字符串顺序当作所有 CSS 规则的优先级。

## Flex 普通布局

Flex 渲染一个 div，不包裹或克隆子项。默认 direction=row、wrap=wrap、alignItems=center、gap=0.5em。

| 属性                       | 契约                                                            |
| -------------------------- | --------------------------------------------------------------- |
| direction                  | row / column / row-reverse / column-reverse；反向只改变视觉排列 |
| inline                     | 切换 flex / inline-flex                                         |
| gap、rowGap、columnGap     | 对应 CSS 输入；轴向 gap 覆盖 gap 的对应轴                       |
| wrap                       | nowrap / wrap / wrap-reverse                                    |
| alignItems、justifyContent | 对应 CSS 输入                                                   |
| size                       | 字号基准，子项未显式设置时继承                                  |
| equal                      | 直接元素子项按主轴等分，不进行 JS 测量                          |

equal 沿主轴分配空间；纵向等高需要容器有明确可分配高度，换行时每行独立等分。裸文字用 Text 或原生元素承载。用户显式子项 style 按正常层叠生效。

Flex 不共享或改写子项的 variant/disabled/loading/pressed，不自动加 toolbar 角色，也不实现方向键导航。可显式提供 role=group 和名称，Tab 仍逐个访问原生控件。

需要同时对齐行列时使用 [Grid](grid.md)。按钮相连使用 ButtonGroup，不提供二维相连。

## ButtonGroup 一维相连

```tsx
import { ButtonGroup } from 'zerodep-js-ui';

<ButtonGroup direction="row" size="1rem" role="group" aria-label="文件操作">
  <Button variant="outline">保存</Button>
  <Button variant="outline">另存为</Button>
  <IconButton variant="outline" icon={Search} aria-label="查找" />
</ButtonGroup>;
```

- direction 为 row（默认）或 column；inline 切换 inline-flex，size 控制继承字号，equal 让直接按钮按主轴等分。默认 role=group，可提供 aria-label/aria-labelledby。
- 固定零间距、不换行、交叉轴拉伸，不提供 columns、gap、wrap、自动排列或选择状态。
- 首尾保留各自外侧圆角，接触侧为零；单项保留全部圆角。横向使用 inline 方向，纵向使用 block 方向，适配 RTL 与 writing-mode。
- 标准控件重叠一条边框厚度，避免双线；不删除边框使内容位移。所有变体保留同样的边框占位。
- focus-visible 子项位于相邻项之上，pressed 和 hover 使用较低层级；ButtonGroup 不裁剪焦点轮廓，层级隔离在自身范围内。
- 条件移除、列表重排和原生 hidden 自动更新首尾；disabled/loading 项仍参与几何。任意外部 display:none 无法仅靠 CSS 首尾选择器识别，使用 hidden 或条件渲染。
- 长标签可在按钮内换行；相连容器本身不换行，交叉轴拉伸。默认方形 IconButton 在这种拉伸组合中也会服从行高。
- 只处理直接兼容控件，不穿透 wrapper 或嵌套组；调用方保证子项结构，不扫描 DOM 或为不兼容内容发出运行时警告。
- 自定义字号、边框厚度或 inline/important 圆角覆盖可能使接缝不齐或覆盖内侧零圆角；此时不承诺默认连接几何。优先统一 ButtonGroup.size、变体和边框。

自定义控件可选择实现同一 CSS 协议：根添加 data-ui-action，使用 buttonBorderWidth 对应的 em 边框厚度（标准值 0.0625em），根具备 position:relative、明确边框及圆角。连接选择器只命中该标记的直接可见子项，且仅排除原生 hidden；不得借此把不兼容结构自动当成按钮。

ButtonGroup 不提供互斥选择语义，不会让多个 ToggleButton 互斥。MenuButton、Toolbar、单选组和菜单焦点工具不属于本次范围。

## 验证与维护

交互示例：apps/docs/src/pages/components/ButtonDemo.tsx。组件及消费测试在 packages/ui/test/buttons.test.ts、flex.test.ts；真实 TSX 类型反例在 buttons-types.tsx；浏览器用例在 tests/e2e/buttons.spec.ts。补全使用 pnpm lsp:completions --case 按钮属性。

按钮组件、内容和样式组合放在 base，布局放在 layout，不维护 internal 目录。ButtonContent/ButtonContentProps、_buttonStyle/ButtonStyleOptions、DecorationProps、AccessibleName、ActionProps 和 LabelProps 均从 zerodep-js-ui 根入口导出，可用于自定义按钮组合。_buttonStyle 返回 CssClass，直接传给 class 或交给 _mergeClasses；动态值随样式结果传递，不需要拆成 class/style。buttonBorderWidth 是标准按钮与相连接缝共用的 em 数值。根入口由 pnpm ui:generate 维护，pnpm ui:check 校验，不创建子目录 index.ts。普通按钮/Flex 不读取像素尺寸；几何观察另见 [字号与测量](../packages/ui/README.md#字号等比尺寸与测量)。

研究依据：[WAI-ARIA Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)、[Link](https://www.w3.org/WAI/ARIA/apg/patterns/link/)、[Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)、[Radix Flex](https://www.radix-ui.com/themes/docs/components/flex)、[Mantine Group](https://mantine.dev/core/group/)、[MUI Button 加载](https://mui.com/material-ui/api/button/)。本库使用自身运行时和原生元素，不引入上述组件库。
