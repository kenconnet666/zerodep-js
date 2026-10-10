# CSS 隐式绑定与按钮简化交接

## 本轮决定

- UI 源码通过 `css(...)`、属性作者和 `class` 表达样式，不手写 CSS 变量名、`var(...)`、`cssBinding/cssResult` 或拼接工具生成的 `style`。
- 不增加 Provider 样式覆盖层。ButtonGroup 保持一维 CSS 相连，使用普通数值与按钮共用边框厚度；不引入样式注入体系。
- 调用方仍可使用原生 `style`，其声明在自动生成的元素值之后覆盖。
- SSR 的样式标签与清单仍由应用输出，不增加自动标签注入。

## 当前写法

共享函数正常返回 `css(...)`，组件通过 `class` 转发：

```tsx
export function _buttonStyle(s: Css<UiTheme>, options: ButtonStyleOptions): CssClass {
  const { color, variant } = options;
  return css(s.color.raw(color ?? (variant === 'solid' ? '_onPrimary' : '_primary')));
}

<ButtonBase {...rest} class={_mergeClasses(appearance, className)} />;
```

示例省略其他外观声明。实际实现位于 `packages/ui/src/base/button-style.ts`；四类按钮不再读取 `.class/.style` 或维护变量。UI 源码已无显式 CSS 变量声明与引用。

`css()` 返回类型为 `CssClass`，可能是普通类名，也可能携带当前动态值。业务直接把它交给 JSX `class` 或 `css/_mergeClasses`，不要用字符串拼接、模板字符串或 `classList.add()` 消费。自定义组件属性使用 `ClassValue` 或原生 JSX 的 `class` 类型，不继续声明成纯 `string`。

## 实现职责

| 位置                                     | 职责                                                                                        |
| ---------------------------------------- | ------------------------------------------------------------------------------------------- |
| `packages/compiler/src/transform/css.ts` | 对函数参数、props、状态及简单表达式生成隐式绑定；不再追踪样式最终是否只用于原生元素。       |
| `packages/css/src/runtime/bindings.ts`   | 核对作者、解析安全动态值、生成样式结果；主题 raw 关键字与普通关键字共用安全分类。           |
| `packages/css/src/util/keywords.ts`      | 共享主题 raw 的实际求值，保留单次 getter 读取与自定义作者语义。                             |
| `packages/css/src/runtime/rules.ts`      | `css/_mergeClasses` 合并声明并按输入顺序携带动态值，保留外部类名。                          |
| `packages/core/src/native/style.ts`      | 定义 ClassStyle/ClassValue。                                                                |
| `packages/core/src/native/attributes.ts` | CSR/SSR 共用的原生边界统一展开最终 class 样式结果，合并显式 style；别名覆盖后不残留旧变量。 |
| `packages/ui/src/base`                   | 普通 CSS 描述与组合；buttonBorderWidth 是按钮和接缝共用的 em 数值。                         |

删除旧 `cssProps` 编译协议和 JSX 专用装饰回调；原生元素、共享函数、组件转发使用同一条样式结果处理路径。没有新建历史值缓存、实例注册表或 CSS effect。

## 兼容边界

- 内部运行协议从 2 升至 3，core/compiler 同步。已有应用及预编译组件库需要重新构建；不要混用旧产物。
- 普通类名字符串继续支持，但 `css()` 的类型不再保证纯字符串。工作区外消费样例已更新为 CssClass，并增加错误类型反例。
- 安全转换继续限定已有范围：非负有限单位值、系统关键字、十六进制颜色和合法 opacity 等。
- `inherit/revert/important`、用户 `var()`、不确定值及自定义覆写方法保留原声明。特殊值切换时撤销对应自动变量。
- 嵌套选择器与声明级条件保留原声明，复杂函数调用不做猜测优化；不声称所有 CSS 输入都能稳定复用同一个类。
- 调用方自行改变按钮边框厚度时，仍需保证与 ButtonGroup 接缝一致；不再维护 `--zj-action-border` 协议。

## 验证

- core、css、compiler 构建通过；UI、docs、example 的实际类型检查与构建通过，docs/example 包含客户端和 SSR 产物。
- 编译器 CSS/协议、core 样式、UI 按钮/基础组件/布局/Provider/Icon 相关单测通过；覆盖共享函数、组件转发、className 覆盖、单次主题读取、特殊值回退、连续颜色规则稳定和 SSR 实例隔离。
- CSS 规则登记焦点测试 4 项通过。
- Chromium 的 `buttons.spec.ts`、`css.spec.ts`、`base.spec.ts`、`provider.spec.ts` 共 21 项通过，包含 CSR/SSR 与接管。
- 相关 TS/TSX 类型反例、改动文件 lint、native 生成检查和 UI 根导出检查通过；UI 当前 62 个具名导出。
- 工作区外 tgz 独立安装验收通过：声明与泛型/事件类型、预编译组件库、CSR/SSR、节点接管、表单、卸载和按需打包均通过；数据/untrack 小入口为 2718 字节。
- 推送前上一阶段 `2d60075` 的 CI 已通过；本次完整矩阵以本提交 GitHub Actions 为准，不把运行中任务记为通过。
- 本轮不发布 npm 包，UI 仍为 private。

## 后续接手

1. 先确认本提交完整 CI，重点看 Linux/Windows 声明消费和 Firefox/WebKit；本地只做了上述焦点验证。
2. 不要把工具生成的变量搬回 UI，也不要恢复 cssProps 双路径或 Provider 全局样式覆盖。
3. 先前按钮审查中的 aria-disabled 行为一致性、事件别名与装饰槽焦点限制未纳入本轮；如继续处理，先复核当前代码和用例，另作聚焦修复。

稳定使用契约见 [CSS](css.md)、[按钮](buttons.md) 与 [语义](semantics.md)。
