# 按钮与 Flex

从 zerodep-js-ui 根入口导入，在 Provider 内使用。UI 保持 private。所有 size 属性都是 CSS 字号，省略时继承；组件内部尺寸使用 em。通用 token 在 zerodep-js-css，按钮专用比例在 UI 内部。

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

| 属性                       | 契约                                      |
| -------------------------- | ----------------------------------------- |
| direction                  | row / column，保持 DOM 与阅读顺序         |
| inline                     | 切换 flex / inline-flex                   |
| gap、rowGap、columnGap     | 对应 CSS 输入；轴向 gap 覆盖 gap 的对应轴 |
| wrap                       | nowrap / wrap / wrap-reverse              |
| alignItems、justifyContent | 对应 CSS 输入                             |
| size                       | 字号基准，子项未显式设置时继承            |
| equal                      | 直接元素子项按主轴等分，不进行 JS 测量    |
| attached                   | 相连控件模式，默认 false                  |

equal 沿主轴分配空间；纵向等高需要容器有明确可分配高度，换行时每行独立等分。裸文字用 Text 或原生元素承载。用户显式子项 style 按正常层叠生效。

Flex 不共享或改写子项的 variant/disabled/loading/pressed，不自动加 toolbar 角色，也不实现方向键导航。可显式提供 role=group 和名称，Tab 仍逐个访问原生控件。

需要同时对齐行列或二维相连时使用 [Grid](grid.md)。Flex 的换行仍属于一维主轴布局，不跨行推算相连圆角。

## Flex 相连布局

```tsx
<Flex attached direction="row" size="1rem" role="group" aria-label="文件操作">
  <Button variant="outline">保存</Button>
  <Button variant="outline">另存为</Button>
  <IconButton variant="outline" icon={Search} aria-label="查找" />
</Flex>
```

- attached 只允许 gap/rowGap/columnGap 为 0 或省略，wrap 为 nowrap 或省略，alignItems 为 stretch 或省略。类型与运行时都拒绝冲突输入。
- 首尾保留各自外侧圆角，接触侧为零；单项保留全部圆角。横向使用 inline 方向，纵向使用 block 方向，适配 RTL 与 writing-mode。
- 标准控件重叠一条边框厚度，避免双线；不删除边框使内容位移。所有变体保留同样的边框占位。
- focus-visible 子项位于相邻项之上，pressed 和 hover 使用较低层级；Flex 不裁剪焦点轮廓，层级隔离在自身范围内。
- 条件移除、列表重排和原生 hidden 自动更新首尾；disabled/loading 项仍参与几何。任意外部 display:none 无法仅靠 CSS 首尾选择器识别，使用 hidden 或条件渲染。
- 长标签可在按钮内换行；相连容器本身不换行，交叉轴拉伸。默认方形 IconButton 在这种拉伸组合中也会服从行高。
- 只处理直接兼容控件，不穿透 wrapper 或嵌套 Flex。启用时对不兼容直接内容发出提示，不安装 DOM 观察器持续检查动态非法内容。
- 自定义字号、边框厚度或 inline/important 圆角覆盖可能使接缝不齐或覆盖内侧零圆角；此时不承诺默认连接几何。优先统一 Flex.size、变体和边框。

自定义控件可选择实现同一 CSS 协议：根添加 data-ui-action，使用 --zj-action-border 指定实际边框厚度（标准值 0.0625em），根具备 position:relative、明确边框及圆角。连接选择器只命中该标记的直接可见子项，且仅排除原生 hidden；不得借此把不兼容结构自动当成按钮。

相连效果不代表选择组语义，不会让多个 ToggleButton 互斥。MenuButton、Toolbar、单选组和菜单焦点工具不属于本次范围。

## 验证与维护

交互示例：apps/docs/src/pages/components/ButtonDemo.tsx。组件及消费测试在 packages/ui/test/buttons.test.ts、flex.test.ts；真实 TSX 类型反例在 buttons-types.tsx；浏览器用例在 tests/e2e/buttons.spec.ts。补全使用 pnpm lsp:completions --case 按钮属性。

公共组件在 base/layout，私有样式和内容组合在 internal；根入口由 pnpm ui:generate 维护，pnpm ui:check 校验，不创建子目录 index.ts。普通按钮/Flex 不读取像素尺寸；几何观察另见 [字号与测量](../packages/ui/README.md#字号等比尺寸与测量)。

研究依据：[WAI-ARIA Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)、[Link](https://www.w3.org/WAI/ARIA/apg/patterns/link/)、[Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)、[Radix Flex](https://www.radix-ui.com/themes/docs/components/flex)、[Mantine Group](https://mantine.dev/core/group/)、[MUI Button 加载](https://mui.com/material-ui/api/button/)。本库使用自身运行时和原生元素，不引入上述组件库。
