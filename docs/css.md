# CSS 回调作者

CSS 由本仓库 zerodep-js-css 提供，使用真实属性方法、同步回调和结构化样式结果。本次是破坏性作者 API 迁移，core/compiler ABI 为 5，应用和预编译库需要一起重建。

## 作者与组合

```tsx
const s = useCss();
return (
  <div
    class={[
      base,
      css(() => {
        s.display('flex').padding('_md');
        s.color(bx(color)).width(bx(width));
        if (disabled) s.opacity(0.5);
        s.select('&:hover', () => s.color('_primary'));
      }),
      className,
    ]}
  />
);
```

UI 的 useCss() 从 Provider 取得带 UiTheme 类型的作者。没有 UI 时可从 CSS 包创建 new Css()，或使用 createCssContext<Css<AppTheme>>() 提供自定义作者。作者只持有主题来源；每次 css 独立收集，不把状态保存在共享作者上。

没有复用或特殊处理需求时，直接在模板 class 中写 css；只有一个样式时使用 class={css(() => ...)}，组合时使用数组。跨位置复用或确有独立处理需求再提取命名样式，避免只用一次的 appearance/style 和额外 _derived 转发。此约定不取消命名 css 的自动派生能力。

属性方法返回 this，既能链式调用，也能分行调用。回调支持普通同步函数、if/switch 和循环；返回值不参与样式组合。属性方法不能在收集范围外调用，回调不能跨 await。嵌套 css 和异常退出恢复外层收集范围。

css 返回不可变的 CssClass 描述，创建时不登记规则。原生 class/className 展平数组、忽略 false/null/undefined，合并声明和绑定，再生成一个最终哈希类。不得把结果拼接成字符串或交给 classList.add。组件 class 属性复用 core 的 ClassValue 或原生 JSX 属性类型。

同选择器/条件路径、同属性最后一次有效调用覆盖此前声明，并取得最后出现的位置。undefined 忽略，0 保留。不同路径仍遵循浏览器层叠；只合并相邻同路径块，不重排 hover/active 或简写/单项声明。不支持靠重复同属性保存无效值回退，兼容分支使用 @supports。

普通字符串 class 仍是原生类名，不反向解析未知样式；数组中的外部类名不享有“后面的声明覆盖前面的声明”的结构化合并保证。识别 DOM 使用 data-* 或 id，生成类不是稳定身份。

## 响应式边界

- 函数内从 CSS 包直接命名导入的 css 调用初始化 const，继续自动派生；导入别名也支持。依赖变化重新执行整个回调。
- JSX 动态 class 中的调用随依赖更新。共享包装函数放在 JSX 或 _derived 中调用；普通函数参数、局部解构、返回值仍是当次取值。
- props 参数解构直接响应，不要求额外 _derived。
- 不为 bx 建立独立 effect、订阅或历史值表。结果结构不变时复用类；动态结构或原声明回退可能登记新类。

## bx、系统关键字和主题

```tsx
css(() => {
  s.color('_text');
  s.color(bx(color)); // 未传入时不擦掉默认值
  s.width(bx(width)); // width 可以是 12px、auto、inherit 或主题 token
});
```

bx 保存原始值和绑定意图，不马上生成 var()。属性方法知道具体属性及主题，按以下顺序处理：

1. undefined 忽略。
2. 系统关键字查表后按原值输出；bx('red')、bx('auto')、bx('inherit') 不生成元素变量。
3. 完整的下划线主题 token 查当前属性的主题表。bx('_primary') 合法，与不加 bx 的主题 token 共用主题机制，不额外套一层 bx 变量。
4. 其他值按固定安全范围及选择器位置判断；安全时使用 --zj-* 元素变量，否则保留原声明。

常用完整长度、基础颜色数值、受约束数值和时间值可优化；特殊值、未知复合值和不能确认变量继承位置的选择器保留声明。SSR 与浏览器使用相同分类，不读取 CSS.supports，也不把类型提示表当作浏览器兼容性表。

长度单位放进绑定值：bx(width + 'px')。不能写 bx(width) 后再拼 px，也不支持模板字符串中嵌入多个 bx；需要时拆成单项属性，或把完整复合表达式交给 bx。数字不自动补 px。无效值不由框架修正，只有明确的输入边界错误会抛出诊断。

主题普通安全值使用 --zt-*。UI Provider 在根元素注入主题变量，嵌套 Provider 覆盖；Portal 在内容的实际根节点桥接逻辑 Provider 的变量，不增加包装 DOM、@scope、DOM 扫描器或 MutationObserver。独立 new Css(theme) 没有 Provider 时，主题值随结果绑定到使用元素。特殊主题值仍回退原声明。

普通 CSS 变量按 DOM 继承，兄弟选择器目标不会继承当前元素变量；第一版对不能确认安全的位置保守回退。内部前缀 --zj-/--zt- 不手写。显式用户 style 最后覆盖，被覆盖或退出分支的绑定同步移除。

## 选择器、动画与全局样式

```tsx
css(() => {
  s.select('&:focus-visible', () => s.outlineColor('_focus').outlineStyle('solid'));
  s.select('@media (width < 48rem)', () => s.padding('_sm'));
  s.select('@supports (display: grid)', () => s.display('grid'));
});

const fade = keyframes(() => {
  s.select('from', () => s.opacity(0));
  s.select('to', () => s.opacity(1));
});
const appearance = css(() => {
  s.animationName(fade).animationDuration('160ms').animationFillMode('both');
});
```

select 是唯一块入口。普通样式接受相对选择器和 @media/@supports/@container；关键帧只接受 from/to/百分比位置。回调语义相同，不增加 hover/media/when 等作者方法。

keyframes 返回结构化动画结果，由 animationName 消费；不能拼接动画字符串。动态帧值需要在 JSX/派生位置重新计算，安全绑定随最终使用元素传递；只改变绑定值不生成新动画名。帧内禁止 !important 和 animation 控制属性，animationTimingFunction 除外。不自动注册 @property 或实现动画状态系统。

globalCss(key, callback) 通过 select 输出全局规则；globalCss(key) 移除对应全局块。全局样式没有绑定元素，不接受 bx 元素绑定。主题变量引用仍遵守文档中的 DOM 继承，不假定存在组件根节点。

## SSR、接管和宿主

SSR 仍由应用拼接样式标签：

```ts
const host = createServerCssHost();
const html = withCssHost(host, () => renderToString(App));
const { cssText, manifest, nonceAttribute } = serializeCssRules(host.rules(), { nonce });
const styles =
  '<style data-zerodep-css' +
  nonceAttribute +
  '>' +
  cssText +
  '</style>' +
  '<script type="application/json" data-zerodep-css' +
  nonceAttribute +
  '>' +
  manifest +
  '</script>';
```

每个请求拥有宿主；样式真正被元素消费时登记。客户端在 _hydrate/_mount 前 hydrateCss()。变量命名不依赖随机数、当前值、构建路径或全局递增编号。显式 style、变量和最终类同步处理，接管不先清空再补回。

浏览器宿主按文档共享。configureCss 支持 nonce/insertionPoint/warnAfter；cssStats 用于观察规则增长；disposeCss 仅供整个文档宿主退出，不在子组件卸载时调用。nonce 不自动授权 style 属性，元素变量仍遵守应用的 CSP。

Vite 使用标准 browser 字段选择宿主，core 不依赖 CSS 包。SSR 联调保持一份运行时，不混用源码和重复安装的框架实例。旧的字符串作者、raw/px 等属性对象、cssBinding/cssResult 已删除，无兼容转发。

## 类型与维护

CssValue<'color', UiTheme> 等是组件 props 的普通输入类型；CssInput 是作者方法接受的输入，另包含类型保持的 bx 标记及适用的动画结果。CssClass 是结构化结果，ClassValue 负责原生 class 的数组与普通类名。

CSSType 提供属性值类型，生成器输出 502 个真实方法、中文说明和去重的系统关键字分类数据，不恢复旧的逐属性对象及大量关键字成员。字符串 token 候选保留补全，但不承诺 IDE 能展示每个字符串候选的中文说明；s.keywords 的主题字段继续保留定义导航。

源码为 generated/runtime/util，根目录只有 index.ts。pnpm --dir packages/css generate 更新，pnpm --dir packages/css generate:check 检查；入口和文档不用维护另一份方法名单。语言服务使用固定的官方 TS7，完整验证由最新提交 CI 给出。

系统关键字通过有文档的类型成员提供字符串导航，数值限制仍来自 csstype；常用值有中文行为说明，其余值提供所属属性及参考链接。WebStorm 当前使用项目 TypeScript，并关闭服务驱动类型引擎；可在 CssKeywordDocumentation.tsx 对照不同属性的同名关键字。泛型 bx 内字符串的悬浮文档仍有 IDE 解析限制，不能用补全候选存在代替文档验收。生成器不输出只有单属性调用的无意义示例。
