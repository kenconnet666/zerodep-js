# 原生输入与表单契约

表单使用原生元素、浏览器事件和少量明确规则，不要求 model/controller 对象。下面能力在 CSR 与 SSR 接管两条路径中共同验证。

## 受控值与初始化值

```tsx
let name = _state('');
<input
  value={name}
  onInput={(event) => {
    name = event.currentTarget.value;
  }}
/>;
```

`value !== undefined` 表示由模型控制，null 表示空值。输入处理器可以接受、拒绝或归一化用户输入；即使归一化后模型值与原值相等，DOM 也会校准。更新文本时尽量按变更区间恢复选区，避免简单格式化把光标推到末尾。

`defaultValue`、`defaultChecked` 用于首次默认状态，后续改变这些 props 不会覆盖用户编辑。不能同时提供 value/defaultValue 或 checked/defaultChecked。控件切回 undefined 后停止回写受控值；需要全新初始化状态时可以更换 key。

文本即时编辑推荐 onInput。onChange 保持浏览器原生的提交时点；只有 onChange 的文本输入会暂存编辑，到 change/blur 再与模型同步。不要按 React 的合成事件语义理解它。

## 组合输入与原生事件

组合期间不会把格式化结果写回正在编辑的 value，结束后再应用模型值。处理器仍收到真实的 composition/input 事件。checkbox 等控件的 input 可能是普通 Event，因此 InputEvent 的 isComposing、data 等扩展字段在类型中是可选的；currentTarget 保持对应元素类型。

内部校准不会抢在冒泡处理器和默认动作之前执行。原生回调从 props 读取最新函数，同一调用里替换后立即触发事件也不会使用旧闭包。

参考：[InputEvent.isComposing](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/isComposing)、[原生 reset 事件](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset_event)。

## 勾选、选择器与文件

- checkbox 用 checked 配合 onChange，value 仍是提交值；indeterminate 只在客户端写入 DOM property，需要服务端可访问状态时显式提供 aria-checked。
- radio 同组按浏览器的 name、form 和树范围匹配。受控成员应来自同一个一致模型，拒绝选中时恢复该组受控状态。
- select 单选使用标量，多选使用数组并设置 multiple。选项增删、移动和 value/text 变化后会重新匹配模型，不依赖额外 MutationObserver 回合。
- 没有匹配选项时客户端 selectedIndex 为 -1；如需无 JavaScript 的 SSR 首屏也显示空态，请提供 value="" 的占位选项。
- 文件输入通过 files 读取选择，不能设置非空 value/defaultValue。需要主动清空时使用空 value 或原生表单重置。

## 重置与接管

reset 事件的默认动作之后，非受控字段回到首次默认值，受控字段重新服从当前模型。如果业务希望同时重置模型，在 onReset 中显式赋初值；preventDefault 会保留浏览器当前状态。

SSR 接管比较浏览器原生初始状态，避免把 range 等平台默认规范化误判为用户输入。接管前已有的文本、勾选和选择状态会保留，并交给已经安装的 input/change 回调；模型拒绝的修改仍会回写模型值。事件监听器、校准任务和组合输入定时器随作用域释放。

真实使用见 [FormExample.tsx](../apps/example/src/examples/FormExample.tsx) 与 [NativeExample.tsx](../apps/example/src/examples/NativeExample.tsx)。三浏览器的事件序列用例覆盖组合边界；Chromium 另经 CDP 的浏览器编辑管线验证候选更新、组合期间外部模型变化、提交、Unicode 选区替换与取消，CSR/SSR 共四项通过。

CDP 用例没有自行 dispatch 组合事件。compositionstart/update、beforeinput/input 均验证 isTrusted；当前 CDP 提交产生的 compositionend 与未接入框架的原生 input 对照一致，但该事件的 isTrusted 为 false。因此这些结果证明浏览器编辑管线中的行为，不声称覆盖操作系统候选窗口或真实微软拼音。

2026-10-01，用户在本机 Windows 通过实际输入法检查后反馈“基本没问题”，附图显示 SSR 页面与系统候选窗口。该人工记录补充真实输入的基本使用证据；未报告输入法具体版本，也不据此承诺所有操作系统和输入法组合。协议测试与人工结果分别保留，出现实际缺陷时按事件序列补充回归。
