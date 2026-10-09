# 原生 CSS

CSS 由本仓库 packages/css（包名 zerodep-js-css）提供，TSX 中的 CSS 调用由 compiler 内置转换。core 不依赖 CSS 包，不使用它的应用可以继续用普通 CSS。

```ts
import { zerodep } from 'zerodep-js-compiler/vite';
export default { plugins: [zerodep()] };
```

工作区 SSR 联调需要让框架及 CSS 包同属一个模块加载环境，例如 `ssr.noExternal: ['zerodep-js', 'zerodep-js-ssr', 'zerodep-js-css']`。预编译组件库将框架与 CSS 包都设为 external，保留 Node/浏览器条件导出。普通 npm 独立消费则可全部 external；不要混合两份框架运行时。

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

className 的公开类型仍是 string，依赖变化时自动重算，不必套 `_derived`。也可直接写 `class={css(...)}`。普通快照规则不变：`const saved = className` 保存当时结果。

所有系统属性的 `raw` 接受 `undefined`，返回空字符串以省略该声明，不输出 `color:undefined;`。因此可选值可以直接传入，无需每次在 css(...) 外加条件：

```tsx
const className = css(s.color.raw(color), s.fontSize.raw(size));
```

从有值变为 `undefined` 时，响应式样式移除对应声明及其私有 CSS 变量，恢复原有继承/层叠；之后重新赋值仍正常生效。`0` 保留为合法属性值，例如 `s.opacity.raw(0)` 输出 `opacity:0;`。返回类型仍为 string，主题关键字解析和其他格式化方法的参数契约不变。

## 自动追踪

识别从 `zerodep-js-css` 命名导入的 css，包括导入别名。函数内直接初始化命名 const 的调用使用派生缓存；输入应是纯样式计算。修改它读取的状态或 props 即可；命名样式不能用 let 再赋值。

模块顶层仍是普通 JS，不建立组件派生。SSR 登记需要请求宿主，因此顶层优先保存 `new Css()` 和声明片段，在组件中调用 css。其他库或局部同名函数不转换。普通 helper、字符串处理或别名不会自动成为新的派生声明。

## 元素变量与重算

原生元素 class 中直接读取注入主题的关键字（如 `s.color._primary`）也尝试元素变量绑定。编译器只标记读取位置，CSS 库根据每次读取的实际值和可信作者元数据决定是否绑定；普通系统常量仍直接输出。嵌套选择器、跨组件 class 和声明级条件沿用原范围，不改变 SSR CSS 标签拼接。

| 写法                                                      | 行为                                                 |
| --------------------------------------------------------- | ---------------------------------------------------- |
| `s.width.px(width)`，width 直接来自 `_state` / `_derived` | 系统方法和支持值使用元素变量                         |
| `s.color.raw(color)`，color 直接来自上述标记              | 可确认的颜色值使用元素变量                           |
| `s.color._primary`，s 是注入主题的作者                    | 每次读取后按安全值绑定，原值仍可通过 s.keywords 读取 |
| `s.width.px(width * 2)`                                   | 含明确响应式来源的简单运算，安全结果使用元素变量     |
| `s.color.raw(active ? 'red' : 'blue')`                    | 保留条件短路，安全结果使用元素变量                   |
| `s._hover(s.width.px(width))`                             | 嵌套调用保留普通重算                                 |
| 普通别名、自定义或覆写方法                                | 保留原调用，不猜测作者实现                           |

参数允许标识符、原始字面量、一元数值/逻辑运算、算术/比较、三元条件以及 && / || / ??，可以组合；至少包含一个直接来自 _state/_derived 的词法绑定。普通变量继续按原值读取，不追溯快照别名。TS 的 as、satisfies 和非空断言不妨碍识别。函数调用、成员访问、赋值/自增、await/yield 等不接管；Math.max(width, 0) 可自行先写为 _derived，而不是在编译期猜测函数行为。

整个参数仍按 JavaScript 顺序求值一次，未进入的分支不执行。识别到表达式并不代表一定使用 CSS 变量：每次结果仍由原有安全分类判断，特殊值回退不改变层叠语义。响应式依旧只缓存最近一次结果，不增加历史值缓存。

`.px(width)` 的绑定效果是 `width:var(--zj-...)`，配合元素 style 中完整的 `${width}px`。`.raw()` 不自动补单位，变量由编译器生成。

优化范围是有限非负单位值、系统关键字、颜色十六进制值与 0–1 的 opacity。CSS-wide、important、未知值、负单位值、主题作者的方法调用或覆写方法均可继续使用，但保留原声明重算，避免改变层叠语义。条件分支不会提前计算。主题成员使用相同的安全值分类，不因类型标注为 string 就假设任意 CSS 字符串都可以等价转换。

`inherit` / `initial` / `unset` / `revert` / `revert-layer` 始终作为目标属性的原始声明，不放入生成变量。值从普通颜色切换到这些关键字时，会更新类名并清除该项私有变量；恢复安全颜色后重新绑定。回退依然响应式，不表示冻结初值。

已有 `var(--brand, inherit)`、calc()/复杂表达式原样使用，不再套一层自动变量。JS 中引用字符串变化时重新计算声明；CSS 中被引用变量变化由浏览器处理。用户定义的变量仍可直接绑定状态：

```tsx
let width = _state(120);
let accent = _state('#245fc5');
<div
  class={css(s.width.raw('var(--card-width)'), s.color.raw('var(--card-accent)'))}
  style={{ '--card-width': `${width}px`, '--card-accent': accent }}
/>;
```

这里若主动把 `--card-accent` 设置为 inherit，就表示继承该自定义属性，框架不会擅自解释为 color:inherit。需要在颜色与全局关键字之间切换时，直接使用 `s.color.raw(accent)` 或主题成员。用户 style 与 s.keywords 原始值始终保留。

作者接收者和方法先于参数求值；如果参数计算替换了作者属性，本次仍调用已经取得的方法，并保守回退为普通声明。不会为了元素变量绑定重新选择另一个方法，也不会重复计算参数。

原生元素中，只要所有 spread 都位于显式 class 之前，就可附加变量；class 后仍有 spread 时保留普通重算。命名声明的全部读取都需直接用于这种 class；跨组件传递、字符串拼接或其他读取让该声明回退为普通 CSS 重算。现有 `class?: string` 不需改成样式对象协议。一般表达式重算可能增加规则，内容相同则复用。

生成变量合并进已有 style，保留用户声明。`--zj-` 是私有前缀，请勿手动覆盖。多实例独立持有元素变量，卸载自然清理，不创建 CSS 专用 effect 或订阅表。

## SSR 与接管

每请求新建 CSS 库自身宿主，完成组件渲染后收集并安全序列化：

```ts
import { createServerCssHost, withCssHost, serializeCssRules } from 'zerodep-js-css/server';

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

CSS 0.3.3 已实现关键字压缩，当前项目从 npm 精确安装此版本。沿用原有写法：原始值只保存一份，按值和语义说明一致分组，公开作者/关键字构造器仍可继承。公开类型保持 ColorCss、ColorKeywords、FontSizeCss 等语义名称，公共集合使用 globalKeywords、colorKeywords、fontSizeKeywords；中文说明在 hover 和补全详情中均保留，不要求重复输出每个属性的完整声明示例。默认系统声明仍是自有字符串字段，主题读取和元素变量的安全回退不变。

CSS 与框架使用同仓库 workspace 依赖及同一套 微软官方 TS7.1。生成器通过 Babel 解析 csstype 声明；pnpm css:generate 更新，pnpm css:check 检查生成结果。没有外部 CSS 仓库或 TS6 依赖。

跨仓库联调可先执行 `pnpm test:packages --css-tarball <候选.tgz>`。正常安装按精确版本和锁文件恢复，不要求相邻 CSS 仓库存在，也不提交临时绝对路径依赖。

当前新包布局尚未发布到 npm；本地依赖由 pnpm workspace 连接，不使用临时 tgz 或本机绝对路径覆盖。

## CSS 作者上下文

从 zerodep-js-css 导入 createCssContext，在项目模块中创建一次工厂，组件初始化时提供作者，后代通过同一工厂读取。

```tsx
const { provideCss, useCss } = createCssContext<AppCss>();

// 提供者的初始化代码；AppCss 为项目自己的作者类。
let theme = _state.raw(lightTheme);
provideCss(new AppCss(() => theme));

// 后代组件初始化时读取，类型保持 AppCss，不必非空断言。
const s = useCss();
```

useCss 在缺少提供者时明确报错；同一作用域不可重复提供，子作用域可覆盖。作者对象本身不克隆、不深代理；整体切换主题使用 Css(() => theme) 的读取函数。Portal 继承逻辑 context，但不会自动复制 DOM 上继承的 CSS 变量；这两种主题来源须分开理解。SSR 请求仅共享工厂的 context 键，不共享作者数据。外部事件应捕获初始化时取到的作者，不在没有组件作用域的回调中调用 useCss。
