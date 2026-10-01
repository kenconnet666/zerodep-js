# zerodep-css 原生接入：讨论稿

2026-10-01。依据 zerodep-js 的 1.0.0-rc.1 源码和本地 zerodep-css c200e36（包版本 0.1.3）研究。用户明确要求：完成 RC1 后研究接入，与用户讨论后结束本轮目标，不直接执行接入。本文中的新增入口、class 数组和 TSX bx 转换均为候选，尚未实现；CSS 仓库没有改动。

## 先区分三个不同目标

1. class 里的 css 不因无关状态变化重新执行。
2. 样式依赖变化时，只更新必要的值，不不断产生新类。
3. 静态声明可跨实例共用，并在 SSR、接管、销毁和开发更新中正确管理。

第一项已经由框架逐属性 Derived 缓存提供。不能把后两项也当作现有缓存自动解决；Svelte 的模板派生同样不等于把任意 CSS 函数自动静态提取。

## 实际探针

使用真实 zerodep-js 编译器转换内联 `class={css(s.display.inlineBlock, s.color.raw(color))}`，调用真实 zerodep-css 服务端登记器，读取同一元素的 class 和 title：

| 操作                            | css 累计调用次数 |
| ------------------------------- | ---------------- |
| 首次读取                        | 1                |
| 逐次修改无关 title，刷新 100 次 | 1                |
| 改变 color                      | 2                |
| 再次写入相同 color              | 2                |
| 累计改变为 100 个不同颜色       | 101              |

最后登记器保留 101 条类规则。这不是计时基准，也不是任意应用的内存结论；它明确区分了框架依赖缓存和 CSS 内容登记缓存。稳定类可复用，而连续尺寸/位置/颜色会持续生成不同内容。

源码依据：packages/core/src/runtime/props.ts 为每个显式 JSX 属性创建 Derived；dom/attributes.ts 可以重新检查属性，但缓存未失效的 class 不重新求值。CSS core/src/registry.ts 按内容登记不可变普通类，普通类保留在宿主缓存中；bx 的私有绑定另有释放协议。

Svelte 的 class 编译入口同样进入 memoizer；官方 derived 说明其依赖变化后按需重算，而非每次刷新都调用。[Svelte derived](https://svelte.dev/docs/svelte/$derived)

## 三条主要路线

| 路线                           | 组件写法                    | 得到的行为                                               | 代价与判断                                                                                   |
| ------------------------------ | --------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| A：保留普通 css 语义           | `s.fontSize.raw(size)`      | 无关状态不重算；样式依赖变化时重算，内容相同复用登记结果 | 接入最小，保留任意函数/继承行为；连续不同值仍会增加规则。适合作为默认基线。                  |
| B：显式动态值                  | `s.fontSize.raw(bx(size))`  | 静态声明和类稳定，动态值更新 CSS 变量                    | 要增加 TSX bx 编译和生命周期接入，但复用现有 CSS 语义；适合连续变化值。建议与 A 组合。       |
| C：自动把动态 raw 参数变为变量 | 仍写 `s.fontSize.raw(size)` | 理想情况下只更新变量，无需额外标记                       | 需要证明 CSS 语义、作者方法纯度和选择器作用域；不能作为对任意 raw 的透明改写。暂不建议默认。 |

全面构建期执行作者代码并提取 CSS 是另一条重路线，会涉及导入执行、主题/用户子类、条件结构、SSR 与 HMR。当前没有证据表明它值得成为原生接入的前置成本。

建议先采用 A + B。普通写法继续自然工作；需要稳定规则的连续值才显式使用 bx。之后确有调用/分配热点，再讨论对已知纯静态片段做有限提升，不为几个字符串构造引入第二套编译器。

## 为什么不能把 raw 一律改成 var

Chromium 对等写法的实际结果：

| 场景                                    | 直接声明 | 改成变量后的结果                                            |
| --------------------------------------- | -------- | ----------------------------------------------------------- |
| `color:red; color:nonsense`，父元素绿色 | 保留红色 | 后项使用 var 后在计算值阶段失效，变为继承的绿色             |
| `color:red!important`，元素内联蓝色     | 红色     | important 若落到自定义属性，目标 color 没有优先级，变为蓝色 |
| `color:initial`，父元素绿色             | 初始黑色 | 自定义属性 initial 产生无效变量，color 继承绿色             |

这些是 CSS 自身的规则，不能靠普通调用缓存修正。[CSS 变量的无效值与层叠](https://www.w3.org/TR/css-variables-1/#invalid-variables)

显式 bx 表示用户选择变量语义；raw 保持原始声明语义。自动转换若要覆盖这些情况，需要运行时分支、回退和更多约束，还必须处理 shorthand、重复声明、fallback、单位、嵌套选择器与覆写方法。当前倾向不付出这笔复杂性。

## 组件侧建议写法（尚未实现的接入方案）

候选入口为 `zerodep-js/css`，复用 zerodep-css 的作者类型；不复制一套 Css 类或生成器：

```tsx
import { component } from 'zerodep-js';
import { Css } from 'zerodep-css';
import { css } from 'zerodep-js/css'; // 候选适配入口

const s = new Css(); // 项目仍可使用 class AppCss extends Css

type IconProps = {
  size?: string;
  color?: string;
  verticalAlign?: string;
  strokeWidth?: number;
  class?: string;
};

export const Icon = component(
  ({
    size = '1em',
    color = 'currentColor',
    verticalAlign = 'middle',
    strokeWidth = 2,
    class: className,
  }: IconProps) => (
    <svg
      class={[
        css(
          s.display.inlineBlock,
          s.flexShrink.raw(0),
          s.verticalAlign.raw(verticalAlign),
          s.width.em(1),
          s.height.em(1),
          s.fill.none,
          s.stroke.currentColor,
          s.strokeLinecap.round,
          s.strokeLinejoin.round,
          s.fontSize.raw(size),
          s.color.raw(color),
          s.strokeWidth.raw(strokeWidth),
        ),
        className,
      ]}
    />
  ),
);
```

这里的 class 数组也是候选 API，目前 RC1 的原生 class 只接收标量，不能直接复制以上完整示例运行。数组建议只做类名组合，支持字符串、条件空值和只读数组，不扩展成样式对象 DSL。

连续变化时，可讨论把需要的参数改成 `s.fontSize.raw(bx(size))`；有单位的 size 使用如 `12px` 的字符串。`.raw(12)` 不会自动得到 `12px`；普通数字字号也可使用 `.px(size)`，对应 bx 如何表达单位应沿用 CSS 库既有约定。

不建议照搬末尾 `css(..., className)`：本地探针 `css('color:red;', 'external-button')` 实际得到 `.z-...{color:red;external-button}`，它没有把外部类名附到元素。当前 css 会解析同一宿主已登记的 z- 类，但任意字符串本身仍是声明片段。让框架 class 组合外部名字，比让 css 猜测字符串含义更清楚。

## 原生接入真正需要做的工作

- 组件入口在客户端和服务端选到对应 CSS 宿主，不能让 SSR 导入 browser 中的 document 路径。公开入口可统一，运行时实现按环境区分。
- SSR 每请求创建收集器，在响应中输出样式和安全清单；客户端先 hydrateCss，再接管组件，避免重复插入和首屏闪烁。CSS 的 SSR 清理不能早于输出收集：已有 Svelte 适配器明确不在服务端销毁绑定帧。
- 客户端绑定必须归属组件/分支/列表实例；销毁只释放自己的绑定。文档共享宿主不能随任意子组件销毁；多根应用、HMR 和重复挂载需要明确拥有者。
- 若接入 bx，原生元素优先使用元素变量；已有 style 合并顺序、重复 CSS 变量、CSP/nonce、跨元素选择器和类向子组件传递都要有明确约定。未知或覆写方法保留通用路径，不能误用系统作者方法的优化假设。
- 当前 TSX 已使用 Babel 8，不应为了接入再引入一套 TSX 解析。CSS 共享的运行时/绑定协议可以复用，旧模板编译器不能直接搬来。
- core 保持普通框架能力，CSS 作者 API 与规则登记继续归 zerodep-css。适配可选用 `zerodep-js/css` 子入口或一个独立适配包；优先清楚的包边界，最终入口名待讨论。

## TS7 的真实限制

CSS 0.1.3 的 core 包将 TypeScript 声明为可选 peer `>=5.4 <7`，其 compiler 入口实际调用 TypeScript JavaScript AST API。当前项目直接导入 TypeScript 7.0.2 后，`createSourceFile` 为 undefined。这不是只扩大版本范围就能解决的类型标注问题。

建议 TSX 适配使用现有 Babel AST，复用 CSS 的 framework-independent runtime；如需改 CSS 包，重点调整运行时与旧 compiler 的依赖归属。可能需要把旧编译器依赖放到独立构建包或相应适配器，保留 Vue/Svelte 的真实消费测试。不要靠忽略 peer 错误、增加旧 TS 兼容层或永久本地 link 来宣布 TS7 原生支持。

## 讨论后才执行的验证范围

- 静态样式、无关状态、同值更新与样式依赖变化的调用次数。
- 多实例/列表重排/行删除/分支切换，变量不串值且资源可释放。
- 不同动态值下的规则数量，以及 SSR/客户端最终样式和节点接管一致。
- class 外部组合、已有 style、主题继承、用户覆写方法与嵌套选择器。
- 并发 SSR、CSS 清单恢复、nonce/CSP、开发更新及预编译组件库消费。
- TS7 严格类型、普通 npm 安装和两个仓库各自的 CI。

需要先讨论的核心取舍：默认保持普通 raw 声明，仅对显式 bx 保证稳定变量；还是接受更复杂、支持范围有限的自动变量化。当前推荐前者。除此之外，还需要确认是否接受用 class 数组合并外部类名。
