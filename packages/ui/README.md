# zerodep-js-ui

组件库提供 Provider、Icon、Text、Ripple、Spinner、ButtonBase、Button/IconButton/ToggleButton/LinkButton、ButtonGroup、Flex/Grid，以及语言/地区工具。亮暗主题与通用 token 位于本包 provider/theme。包保持 private，不加入框架三包发布流程。

- `src/provider/`：Provider 组件、上下文与相关基础配置。
- `src/index.ts`：公开导出入口。
- `src/utils/`：slot 属性解析、测量和按压资源工具；不设置子目录 index.ts。
- `src/base/Icon.tsx`：静态 Lucide 图标，颜色/尺寸复用 CSS 主题类型。
- `src/base/`：原生按钮底座、四类成品按钮、ButtonGroup 一维相连及文字/加载/波纹。
- `src/layout/Flex.tsx`：普通一维布局；`src/internal/` 保存私有复用实现，不公开导出。
- `src/layout/Grid.tsx`：普通二维轨道、自动填充与跨格布局。
- 通用主题位于 `packages/ui/src/provider/theme/`，从 `zerodep-js-ui` 导入。
- `src/provider/lang/`：内置语言包和自定义语言包契约。
- `src/provider/locale.ts`：基于 Intl、date-fns、@date-fns/tz 的格式化与日期转换。
- `dist/`：构建后的 ESM、类型声明和 source map。

后续组件按职责放置，不增加 `components` 层；input/display/feedback/navigation 仍为预留目录。公开 API 统一从 `src/index.ts` 导出。

成品组件契约与示例见 [按钮与 Flex](../../docs/buttons.md)，当前工程状态见 [UI 交接](../../docs/handoff-ui-buttons-2026-10-09.md)。

二维布局见 [Grid](../../docs/grid.md)。Grid 不修改子项外观；ButtonGroup 不支持二维。

从仓库根目录执行 `pnpm build:ui`。构建先检查框架语义，再由 Vite + zerodep 插件转换 TSX，最后由固定的 TypeScript 7.1 生成声明；不能用普通 tsc 擦除结果执行组件宏。

组件开发运行 `pnpm dev:docs`：只先构建框架工具，文档的 Vite 开发模式直接转换 UI 源码并提供 HMR，无需每次手工重打 UI 包。正式文档构建仍读取 UI dist，继续验证真实包产物。

运行时和 zerodep-js-css 由应用提供，组件库不打包第二份实例。组件示例和使用说明放在 `apps/docs/src/pages/components/`。

```tsx
import { Provider, zhCN, useCss, useLang, useLocale } from 'zerodep-js-ui';
import { lightTheme } from 'zerodep-js-ui';

<Provider theme={lightTheme} lang={zhCN} locale="zh-CN" timeZone="Asia/Shanghai">
  <App />
</Provider>;
```

Provider 渲染 div；未传入的配置继承父级，根默认值即上例。主题整套替换，不自动深度合并；局部改色可以 `new UiTheme('light', { ...lightTheme.color, _primary: '#663399' })`，其余已有关键字可用类继承改写。Provider 不自动跟随系统、不持久化设置。

组件初始化时调用 useCss/useLang/useLocale，并保留返回对象；后续在 JSX、css(...)、派生表达式或事件中读取字段，避免把初值存成普通快照。不要在事件回调中重新调用 useCss 等入口。

```tsx
const s = useCss();
const lang = useLang();
const locale = useLocale();
const panel = css(s.color._text, s.backgroundColor._surface);
// JSX 中读取 lang.messages.confirm、locale.formatDate(timestamp) 会追踪配置变化。
```

`s.keywords` 是当前原始主题。`locale.date(dateOrTimestamp)` 返回携带当前时区的 TZDate，可交给 `date-fns` 的 `addDays`、`startOfMonth` 等函数。无时区字符串需要业务先明确含义；跨夏令时的下一天可能相隔 23 或 25 小时。日期对象不是深响应式状态，日期计算后应替换状态中的值。

```ts
import { addDays } from 'date-fns';
const tomorrow = addDays(locale.date(timestamp), 1);
locale.formatDate(tomorrow);
locale.formatNumber(1234.5);
```

语言包只负责组件文字和默认文字方向；`locale` 决定格式，`timeZone` 决定显示及计算时区，各自独立。自定义语言实现 UiLanguage 即可。Provider 支持普通 div 属性、class 和 dir；用户 class 放在默认声明之后组合。

Portal 保留组件上下文，但不会自动继承原 DOM 上的字体/lang/dir；在 Portal 内放 `<Provider>...</Provider>` 即可重新应用继承配置。SSR 要传入与客户端首屏相同的配置，并由应用收集 CSS 和拼接标签；Provider 不改变现有 SSR 输出流程。

相关检查：根目录 `pnpm test:ui`；浏览器场景位于 `tests/e2e/provider.spec.ts`，随现有三浏览器 CI 运行。

## Icon

Icon 在 Provider 内使用，直接渲染 SVG。图标数据来自静态导入的 `@lucide/icons`，按需打包；不会在运行时按名称下载。

```tsx
import { Search, Check } from '@lucide/icons';
import { Icon, Provider } from 'zerodep-js-ui';

<Provider>
  <Icon icon={Search} />
  <Icon icon={Search} color="_primary" size="_lg" />
  <Icon icon={Check} color="var(--brand-color)" size="20px" aria-label="已完成" />
  <button aria-label="搜索">
    <Icon icon={Search} />
  </button>
</Provider>;
```

color/size 直接复用 CSS 作者 color.raw/fontSize.raw 的参数类型，保留主题关键字和原始 CSS 值。省略时继承文字颜色/字号，默认宽高为 1em；size 对应 font-size，数字不自动补 px。`s.keywords.color._primary` 是可传入的原值，`s.color._primary` 是 css(...) 使用的完整声明。

CSS 作者支持 raw(undefined) 省略声明，Icon 直接调用 raw(color)/raw(size)。动态撤销这两个属性时会恢复周围文字样式，无需组件自行过滤可选值。

strokeWidth、width/height、viewBox、事件、class/style 等原生 SVG 属性可透传；用户 class 在默认样式之后组合，style 遵循原生规则。Icon 的内容由 icon 数据负责，不同时提供 children 入口。

默认图标作为装饰设置 aria-hidden；传入 aria-label 或 aria-labelledby 时默认作为 role=img 的有名称图形。显式 aria 属性可覆盖默认值。只有图标的按钮由按钮提供操作名称。

组件/SSR 用例在 `packages/ui/test/icon.test.ts`；真实 CSR/SSR 接管、主题和更新验证在 `tests/e2e/icon.spec.ts`。组件只消费本地可信图标数据，应用自己的动态图标选择可使用普通条件表达式。

## 基础组件与工具

Text 的 as 选择 span/p/strong/em/small/code/h1-h6；color、size、weight、lineHeight、align 复用 CSS 输入，未提供时继承，语义与字号独立。默认外边距为零。

Spinner 复用 Lucide 图形，继承 Icon 的颜色/尺寸与可访问属性；默认装饰，业务加载状态由调用方拥有。旋转周期为组件专用值，减少动态效果时关闭旋转。

Ripple 直接放在 position:relative 的 button 或 a 内，自己的 span 负责绝对定位和裁剪。color 接受主题关键字/CSS 值；centered 控制从中心扩散，键盘总从中心反馈。链接的 Space 不产生按钮式反馈。disabled、指针取消/移出、滚动、失焦和卸载均会结束按压。它不合成 click，也不承担焦点语义。

ButtonBase 是后续按钮的原生底座，默认 type=button；支持原生按钮属性、disabled 和 ripple 开关。关闭 Ripple 后保留 focus-visible 轮廓。slotRipple 可为对象或接收 {disabled} 的纯函数；disabled 由底座拥有，槽不能覆盖。

ButtonBase 的 size 与 Icon/Text/Spinner 一致，表示根字号（CssValue<'fontSize', UiTheme>），不是固定高度或密度档位；可写 `_md`、`20px`、`1.25rem`，省略/undefined 时继承，裸数字不自动补 px。底座本身仍不预设内边距。

```tsx
<ButtonBase
  aria-label="搜索"
  slotRipple={(state) => ({ color: state.disabled ? '_disabled' : '_primary' })}
>
  <Icon icon={Search} />
  <Text weight="_semibold">搜索</Text>
</ButtonBase>
```

工具从 UI 根入口导入：

- _resolveSlotProps(source, state)：解析对象或纯函数，在 JSX/派生计算中调用以跟踪状态。
- _press(element, options)：客户端 DOM 按压反馈，返回必须调用的清理函数；配合已有挂载/effect 生命周期，SSR 不调用。不模拟业务 click。

CssValue<K, Theme> 和 _mergeClasses 在 zerodep-js-css 中；DomRef<T> 与 _composeRefs 在 zerodep-js 中。外部类名遵循正常 CSS 层叠，不承诺按类名字符串顺序覆盖。

## 自动维护唯一入口

运行 pnpm ui:generate 更新 src/index.ts；pnpm ui:check 检查过期与重复导出，已进入 CI 的 pnpm check。生成器用 Babel AST 读取 base/utils/layout 下的具名声明，递归收集并区分 type 导出；拒绝链接、子目录 index.ts 和重复名称。internal 不扫描，Provider 通过明确入口清单限制。

组件转发使用独立 slotXxx 属性：slotRipple、slotIcon、slotStartIcon、slotEndIcon、slotText、slotSpinner。无统一 slotProps 对象。SlotProps<P, S> 与 _resolveSlotProps 是单槽通用工具。

## 字号、等比尺寸与测量

size 是 CSS 字号输入，允许主题关键字以及 px/rem/em/%/vw/cqw/clamp()/var() 等合法 CSS 写法。根 Provider 默认 _md（主题默认为 1rem）；嵌套 Provider 与普通组件未指定 size 时继承 DOM 父级字号。实际字体可能来自页面样式或用户环境，不假定为 16px。

Icon/Spinner 宽高为 1em，局部放大只通过 size 表达一次。ButtonBase 的焦点轮廓与偏移为 0.125em；底座不预设高度和内边距。组合示例的边框为 0.0625em、内边距为 0.625em 1em、gap 为 0.5em、最小区域为 2.5em，不再混入默认 rem 下限。应用可显式添加独立点击区域约束，但此时不承诺完全等比。

字体栅格化、边框量化及长文字换行仍由浏览器处理，不能把“尺寸参数等比”当成最终图像严格相似。布局与显示坐标也不同：transform 可改变 getBoundingClientRect，但不改变 ResizeObserver 的布局尺寸。

组件初始化中的样例：

```tsx
const s = useCss();
const buttonStyle = css(
  s.lineHeight.raw(1.25),
  s.paddingBlock.em(0.625),
  s.paddingInline.em(1),
  s.gap.em(0.5),
  s.borderRadius.em(0.5),
  s.border.raw('0.0625em solid currentColor'),
  s.minBlockSize.em(2.5),
  s.minInlineSize.em(2.5),
);
<ButtonBase size="clamp(0.875rem, 1vw + 0.5rem, 1.5rem)" class={buttonStyle}>
  <Icon icon={Search} size="1.125em" />
  <Text>搜索</Text>
</ButtonBase>;
```

### 按需测量工具

这些工具位于 src/utils/measure.ts，从 UI 根入口导入，仅在客户端有 DOM 后调用；普通组件不会自动创建观察器。

| 工具                                | 契约                                                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| _readFontSizePx(element)            | 读取连接元素的计算字号，返回 CSS px 数值；无法取得时返回 undefined，保留合法 0。                                    |
| _observeFontSize(container, change) | 异步报告初始字号及变化，重复值不通知；创建隐藏的固定定位 1em 子节点，返回幂等清理。固定宽高容器的字号变化也可观察。 |
| _observeSize(element, change)       | 异步报告布局 border-box 的 inlineSize/blockSize（CSS px）；不含 margin/transform，也不观察屏幕位置。返回幂等清理。  |

字号观察只用于允许可测量 HTML 子节点的容器；input/textarea/select 等使用包装容器。探针不参与排版但确实是一个子节点，应避免对该容器使用依赖精确子节点数量的 CSS 规则。停止观察会断开 ResizeObserver、移除探针并忽略排队回调。字号探针应放在实际渲染子节点的容器中，Shadow DOM 使用其内容容器；_observeSize 沿用 ResizeObserver 边界，非替换的普通 inline 元素应观察其块级或 inline-block 包装。

```tsx
let host = _state<HTMLDivElement | undefined>(undefined);
let fontPx = _state<number | undefined>(undefined);
_effect(() => {
  const node = host;
  if (!node) return;
  return _observeFontSize(node, (value) => {
    fontPx = value;
  });
});
// <div bind:this={host}>...</div>
```

浮层通过 Portal 改变 DOM 位置后，125%/em/cqw 等原始值的参考环境可能改变。默认跟随触发区时，将观察到的实际字号同步到浮层根节点，例如 style.fontSize = fontPx + 'px'，浮层内部仍用 em。连续变化的像素测量结果优先使用原生 style，避免逐值登记新的样式类；显式稳定字号也可用 Provider.size。用户显式设置浮层 size 时采用独立规则。

不手工解析用户 CSS 字符串，不乘 devicePixelRatio。字体加载造成的内容换行需观察实际内容尺寸；字号观察不能代替全部布局通知。隐藏/未挂载元素的测量不能冒充有效几何尺寸。SSR 不执行观察；虚拟化等未来适配须明确首屏估计及接管后的重新测量策略，定位适配须另行处理滚动和坐标系。

SizingDemo 和 MeasurementDemo 展示等比尺寸、vw/clamp/rem/%/CSS 变量/cqw、固定容器、停止/重启观察及 Portal 字号镜像；浏览器用例在 tests/e2e/sizing.spec.ts 和 measurement.spec.ts。
