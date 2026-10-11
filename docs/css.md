# 原生 CSS

CSS 由本仓库 packages/css（包名 zerodep-js-css）提供，TSX 中的 CSS 调用由 compiler 内置转换。core 不依赖 CSS 包，不使用它的应用可以继续用普通 CSS。

```ts
import { zerodep } from 'zerodep-js-compiler';
export default { plugins: [zerodep()] };
```

工作区 SSR 联调需要让框架及 CSS 包同属一个模块加载环境，例如 `ssr.noExternal: ['zerodep-js', 'zerodep-js-css']`。预编译组件库将框架与 CSS 包都设为 external，保留包内 Node/浏览器宿主选择。普通 npm 独立消费则可全部 external；不要混合两份框架运行时。

```tsx
import { _component, _state } from 'zerodep-js';
import { Css } from 'zerodep-js-css';
import { css } from 'zerodep-js-css';

const s = new Css();
export const Card = _component(() => {
  let width = _state(120);
  let active = _state(false);
  const className = css(s.width.px(width), s.color.raw(active ? 'red' : 'blue'));
  return <div class={className} style={{ padding: '8px' }} />;
});
```

className 的类型是 CssClass，可能是普通 class 字符串，也可能携带当前元素变量值。直接传给 class，由原生渲染统一展开；不要字符串拼接、模板插值或 classList.add() 消费样式结果。组件属性复用 ClassValue 或原生 JSX 属性类型，组合用 css/_mergeClasses。

## 响应式求值边界

函数内从 zerodep-js-css 命名导入的 css（包括导入别名）直接初始化命名 const 时，复用普通派生缓存。JSX 中调用按动态属性求值。普通参数、局部解构、返回结果和别名仍是当次取值；不会跨包装函数自动传播宏语义。

| 写法                                     | 行为                                       |
| ---------------------------------------- | ------------------------------------------ |
| const name = css(...)                    | 函数内直接声明自动派生，模块顶层仍普通执行 |
| JSX class={appearance(width)}            | 在 JSX 动态位置重新调用共享函数            |
| const name = _derived(appearance(width)) | 共享函数显式派生                           |
| const saved = appearance(width)          | 保存本次结果，之后不自动更新               |
| const saved = name                       | 保存当前样式结果的快照                     |

样式计算应为同步纯计算。函数调用、成员/getter、模板字符串及运算在求值时读取的依赖正常跟踪；普通快照不会重新关联到原变量。订阅与异步请求不能放入样式计算。不使用 let 重新赋值命名 css 派生。

模块顶层优先保存作者和声明片段；SSR 的 css 登记需要请求宿主。未优化的值仍可响应式重算；能否转为变量和能否跟踪依赖是两件事。

## 元素变量与 class 回退

只接管 css 的直接属性方法参数，保留接收者、方法先于参数的求值顺序；完整参数在原位置求值一次，不展开用户函数、不提前进入条件分支。同步调用、成员访问、模板字符串和简单表达式可参与优化；赋值、自增、await/yield 不搬入绑定回调。普通参数和快照也可使用绑定表示，但不会因此变成实时引用。

主题成员（如 s.color._primary）及 raw 的下划线主题 token 保留实际声明，通过 class 更新。raw 先按原语义解析 token，不重复读取 getter。直接传入的普通值，以及主题作者未覆写的单位方法，与系统作者使用同一安全分类。

| 输入                                                                   | 输出策略                                            |
| ---------------------------------------------------------------------- | --------------------------------------------------- |
| 常用长度属性的 px/em/rem 等基础单位、raw 单个长度字符串或零            | 支持范围内使用元素变量；属性允许百分比/负值时才接管 |
| 十六进制颜色、常用基础颜色名、transparent/currentColor                 | 对支持的颜色属性变量化                              |
| 合法 opacity、lineHeight、flexGrow/flexShrink、fontWeight、整数 zIndex | 支持范围内变量化                                    |
| 主题 token、布局关键词（包括 flex、run-in）                            | 原声明重算 class                                    |
| CSS-wide、important、已有 var()/calc()、未知/复合值                    | 原声明重算 class                                    |
| 覆写作者方法、嵌套选择器、声明级条件                                   | 保持原调用与重算，不猜测实现                        |

安全表与作者关键字全集分开。浏览器可能不支持作者类型表里的某些关键词；放进 var 后才无效会改变层叠，因此不能用“命中系统关键字”代替安全判断。SSR 与客户端使用同一分类，不读取 CSS.supports。负 margin/偏移可以优化，负 width/padding 仍保留原声明，不裁剪输入。

所有系统 raw 接受 undefined 并省略声明。安全值切到 undefined、inherit、revert 等时，会撤销该项自动变量并切换 class；恢复安全值后复用规则。0 是合法值，不被当成缺失。raw 不自动补单位；px(width) 的完整 width px 值放在变量里，声明使用 width:var(--zj-...)。

共享函数返回 CssClass，组件原样转发，直到原生元素展开。class/className/spread 按覆盖顺序决定最终结果，被覆盖的结果不留下旧变量。显式用户 style 始终最后覆盖；--zj- 为内部前缀，不手写。多个元素只持有各自当前值，不添加 CSS 专用 effect 或历史值注册表。

规则登记表按声明内容去重，但不会在子组件卸载时逐条回收。连续输入若走 class 回退，仍会登记不同规则；cssStats/warnAfter 用于观察增长，不是 LRU 或自动回收。有限主题切换复用已出现的 class，不承诺所有 CSS 输入都保持一个 class。

## SSR 与接管

每请求新建 CSS 库自身宿主，完成组件渲染后收集并安全序列化：

```ts
import { createServerCssHost, withCssHost, serializeCssRules } from 'zerodep-js-css';

const host = createServerCssHost();
const html = withCssHost(host, () => renderToString(App));
const { cssText, manifest, nonceAttribute } = serializeCssRules(host.rules(), { nonce });
const styles =
  `<style data-zerodep-css${nonceAttribute}>${cssText}</style>` +
  `<script type="application/json" data-zerodep-css${nonceAttribute}>${manifest}</script>`;
// 将 styles 插入 head；不要直接拼接未经处理的 CSS 或 JSON。
```

客户端在 `_hydrate` / `_mount` 前调用 `hydrateCss()`，从 `zerodep-js-css` 导入。没有 SSR 清单时直接返回；有清单则核对并恢复登记表。实例共享文档宿主，不能在子组件卸载时调用全局 disposeCss。元素变量需要 CSP 允许相应内联 style；标签 nonce 不会自动授权 style 属性。

实际接线见示例应用 entry-server.ts、entry-client.ts 与 examples/CssExample.tsx。

## 类型和维护

源码布局固定为 runtime/generated/util 三个目录，src 根目录仅 index.ts。小型声明工具和关键字机制在 util，宿主、规则表、组件上下文及动态绑定在 runtime。系统作者按需建立主题属性缓存；优化器使用固定的安全值范围，不枚举主题关键字表、不记录用户历史值。

所有 API（包括 SSR 收集器和编译器调用的 cssBinding/cssResult）统一从 zerodep-js-css 根入口导入，不再提供子入口。类型统一指向 dist/index.d.ts，并发布声明映射与源码；Vite 按标准 browser 字段将 Node 宿主替换为浏览器实现，源码不使用包内导入别名。

2026-10-11 删除主题变量化所用的 cssKeyword 内部协议，core/compiler ABI 升为 4。应用与预编译组件库需要一起重建，不能混用旧产物。

CSS 提供 SystemKeywords 和继承机制，不提供 UiTheme 或亮暗配色。UI 的主题从 zerodep-js-ui 导入；自定义作者也可直接继承 SystemKeywords。CssValue 的第二个参数指定主题类型，默认不包含 UI 自定义关键字。

当前工作区 CSS 已沿用关键字压缩实现。沿用原有写法：原始值只保存一份，按值和语义说明一致分组，公开作者/关键字构造器仍可继承。公开类型保持 ColorCss、ColorKeywords、FontSizeCss 等语义名称，公共集合使用 globalKeywords、colorKeywords、fontSizeKeywords；中文说明在 hover 和补全详情中均保留，不要求重复输出每个属性的完整声明示例。默认系统声明仍是自有字符串字段，主题读取保留声明，普通值的元素变量采用保守回退。

CSS 与框架使用同仓库 workspace 依赖及同一套 微软官方 TS7.1。生成器通过 Babel 解析 csstype 声明；pnpm css:generate 更新，pnpm css:check 检查生成结果。没有外部 CSS 仓库或 TS6 依赖。

运行 `pnpm test:packages` 可验证工作区外的 tgz 独立安装、类型检查、CSR 与 SSR。不要求相邻 CSS 仓库存在，也不提交临时绝对路径依赖。

当前新包布局尚未发布到 npm；本地依赖由 pnpm workspace 连接，不使用临时 tgz 或本机绝对路径覆盖。

## CSS 作者上下文

从 zerodep-js-css 导入 createCssContext，在项目模块中创建一次工厂，组件初始化时提供作者，后代通过同一工厂读取。

```tsx
const { provideCss, useCss } = createCssContext<AppCss>();

// 提供者的初始化代码；AppCss 为项目自己的作者类。
let theme = _state.raw(initialTheme); // initialTheme 由项目自己的主题定义提供。
provideCss(new AppCss(() => theme));

// 后代组件初始化时读取，类型保持 AppCss，不必非空断言。
const s = useCss();
```

useCss 在缺少提供者时明确报错；同一作用域不可重复提供，子作用域可覆盖。作者对象本身不克隆、不深代理；整体切换主题使用 Css(() => theme) 的读取函数。Portal 继承逻辑 context，但不会自动复制 DOM 上继承的 CSS 变量；这两种主题来源须分开理解。SSR 请求仅共享工厂的 context 键，不共享作者数据。外部事件应捕获初始化时取到的作者，不在没有组件作用域的回调中调用 useCss。
