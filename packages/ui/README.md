# zerodep-js-ui

组件库提供 Provider、Icon、中文/英文语言包和地区/时区工具。亮暗主题与通用 token 由 zerodep-js-css 提供。包保持 private，不加入框架四包发布流程。

- `src/provider/`：Provider 组件、上下文与相关基础配置。
- `src/index.ts`：公开导出入口。
- `src/base/Icon.tsx`：静态 Lucide 图标，颜色/尺寸复用 CSS 主题类型。
- 通用主题位于 `packages/css/src/theme/`，从 `zerodep-js-css` 导入。
- `src/provider/lang/`：内置语言包和自定义语言包契约。
- `src/provider/locale.ts`：基于 Intl、date-fns、@date-fns/tz 的格式化与日期转换。
- `dist/`：构建后的 ESM、类型声明和 source map。

后续组件按职责直接放在 `src/input/`、`src/display/`、`src/feedback/`、`src/layout/`、`src/navigation/` 下，不再增加 `components` 层。这五个目录目前仅放置 `.gitkeep`，用于在 Git 中保留目录，不代表已有组件实现；公开 API 统一从 `src/index.ts` 导出。

本阶段交接见 [2026-10-09 交接文档](../../docs/handoff-2026-10-09.md)。

从仓库根目录执行 `pnpm build:ui`。构建先检查框架语义，再由 Vite + zerodep 插件转换 TSX，最后由固定的 TypeScript 7.1 生成声明；不能用普通 tsc 擦除结果执行组件宏。

运行时和 zerodep-js-css 由应用提供，组件库不打包第二份实例。组件示例和使用说明放在 `apps/docs/src/pages/components/`。

```tsx
import { Provider, zhCN, useCss, useLang, useLocale } from 'zerodep-js-ui';
import { lightTheme } from 'zerodep-js-css';

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

strokeWidth、width/height、viewBox、事件、class/style 等原生 SVG 属性可透传；用户 class 在默认样式之后组合，style 遵循原生规则。Icon 的内容由 icon 数据负责，不同时提供 children 入口。

默认图标作为装饰设置 aria-hidden；传入 aria-label 或 aria-labelledby 时默认作为 role=img 的有名称图形。显式 aria 属性可覆盖默认值。只有图标的按钮由按钮提供操作名称。

组件/SSR 用例在 `packages/ui/test/icon.test.ts`；真实 CSR/SSR 接管、主题和更新验证在 `tests/e2e/icon.spec.ts`。组件只消费本地可信图标数据，应用自己的动态图标选择可使用普通条件表达式。
