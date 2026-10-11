# CSS 回调作者重构计划

2026-10-11 用户已批准实施。本计划取代旧的字符串属性作者、全面隐式变量转换和主题 class 切换方案。历史验收保留在 framework-css-execution.md；当前阶段状态见本文末尾，不把计划当作完成。

## 已确定契约

```tsx
const s = useCss();
const appearance = css(() => {
  s.color(bx(color)).width(bx(width));
  if (disabled) s.opacity(0.5);
  s.select('&:hover', () => s.color('_primary'));
});
return <div class={[base, appearance, className]} />;
```

- Css 的属性是真实类方法，由生成器生成；每次调用返回 this，保证 WebStorm 的方法、括号和参数补全。不使用映射函数属性替代方法。
- s 只保存主题来源，不保存正在累积的声明。css 建立同步收集范围，支持普通函数、if/switch/循环；嵌套和异常通过 try/finally 恢复。无范围的属性调用和异步收集明确失败。
- 依赖变化重算整个 css 回调，不为 bx 创建独立订阅。保留直接命名 const css 自动派生、JSX 动态求值和普通函数取值边界；props 参数解构继续直接响应。
- bx(value) 保存本次原值及绑定意图，不立即字符串化。属性方法先解析主题 token，再按属性及选择器位置保守变量化；特殊值和未知值保留原声明。bx('_primary')、bx(props.color) 都合法，不要求组件调用者区分输入来源。
- bx 第一版接收完整属性值；不支持模板字符串内多个 bx 的隐式字符串化。长度单位放进绑定值。数字遵守属性类型，不自动补 px；undefined 忽略，0 不忽略。
- 声明保留选择器/条件路径和顺序；同路径同属性最后一次有效调用替换旧声明并取得最后的位置。不同选择器之间仍按原生 CSS 层叠，不重排、合并无关块或展开简写属性。
- css 返回不可变的结构化结果，不立即登记类。class/className 接受嵌套数组，忽略 false/null/undefined；组合不修改来源，先覆盖声明，再整理变量与动画，最终登记一个生成类。普通类名仍是原生类名，不反向解析未知 CSS。
- 原生渲染通过通用协议消费结构化结果，core 不依赖 CSS 包。显式 style 最后覆盖。被覆盖、退出条件及回退后的绑定同步清理。
- select 是唯一选择器/条件入口，支持原生嵌套选择器及 @media/@supports/@container 等局部条件；不新增 hover/media/when/variant 方法，不引入 @scope。
- 主题 token 查表成为稳定 CSS 变量，Provider 根元素提供值，嵌套 Provider 覆盖。主题变量名不依赖值；特殊主题值回退声明。Portal 恢复逻辑 Provider 的主题变量，SSR 输出同一初始结果。
- keyframes 返回结构化动画结果，由 animationName 消费；帧使用 select('from'/'to'/百分比, callback)。动态输入仍在派生/JSX 位置求值，不新增动画状态 API。globalCss 保留明确的全局宿主职责。
- CSS 规则登记、nonce、SSR 序列化/接管、请求隔离和文档宿主恢复继续保留。连续安全绑定不增加规则；结构/回退变化可产生新规则，不新增 LRU、全局历史值缓存或 DOM 扫描器。

## Vue 参考边界

参考 Vue core 4ab865a 的 CSS v-bind：变量身份与当前值分离、SSR 同步、空值防止意外继承、style 更新不丢变量、Teleport 明确桥接。保留本框架的属性安全回退，不复制 Vue 的逐组件根遍历、MutationObserver 或专门的 CSS effect。Provider 主题继承与元素 bx 绑定分开处理。

## 阶段与验收

| 阶段 | 实施内容                                                        | 焦点验证                                                      |
| ---- | --------------------------------------------------------------- | ------------------------------------------------------------- |
| R0   | 精简重复文档，更新批准契约与计划                                | 文档链接、已有改动隔离、上一轮 CI                             |
| R1   | 核心结果协议、声明收集、方法生成、bx、数组合并、宿主            | 有序覆盖、异常/嵌套、主题 token、变量稳定、SSR 与 class/style |
| R2   | 编译器去除旧隐式方法分析；主题 Provider/Portal；select/动画     | props 直接响应、类型/LSP、嵌套主题、Portal、动态关键帧        |
| R3   | Button/Icon 先试点，再迁移 UI/例子/消费与测试；删除旧作者及协议 | 实际 TSX、组件组合、焦点浏览器与独立消费                      |
| R4   | 文档、生成检查、旧产物和空目录清理、最终 CI                     | 最新提交全量 CI，不将未完成写为通过                           |

每个可审阅阶段中文提交并推送。本地只跑相关检查，完整测试交 CI；不发布 npm。用户编辑中的三个补全试点和 .codex/lsp4ij 保留，未经审查不纳入提交或删除。

## 回归清单

- 方法补全分类 Method、Enter 括号、链后参数类型及 token 提示。
- 整份 props 更新、default/rest、普通函数读取、条件切换无残留。
- 常量/动态 bx、undefined/0、主题 token、inherit/initial、未知值、负长度。
- 重复属性、简写/单项、hover/active 顺序、数组覆盖与变量清理。
- 不同实例不串值；继承允许位置与兄弟选择器回退；主题切换与 Portal。
- 动画绑定、动画名稳定、SSR 注册/接管/并发、显式 style 最后覆盖。
- 删除旧作者后生成器和消费入口一致，旧应用和预编译库必须重建。

## 执行记录

- R0：进行中。基线 155c5a7 的 CI 已通过。用户补全文件存在 staged/unstaged 改动，本任务保留。
- R1–R4：待实施。
