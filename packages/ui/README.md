# zerodep-js-ui

组件库已提供 Provider、亮暗主题、中文/英文语言包和地区/时区工具。包保持 private，不加入现有五包发布流程。

- `src/components/`：组件源码。
- `src/index.ts`：公开导出入口。
- `src/theme/`：继承 SystemKeywords 的主题，保留系统属性及关键字。
- `src/lang/`：内置语言包和自定义语言包契约。
- `src/locale.ts`：基于 Intl、date-fns、@date-fns/tz 的格式化与日期转换。
- `dist/`：构建后的 ESM、类型声明和 source map。

从仓库根目录执行 `pnpm build:ui`。构建先检查框架语义，再由 Vite + zerodep 插件转换 TSX，最后由固定的 TypeScript 7.1 生成声明；不能用普通 tsc 擦除结果执行组件宏。

运行时和 zerodep-css 由应用提供，组件库不打包第二份实例。组件示例和使用说明放在 `apps/docs/src/pages/components/`。

```tsx
import { Provider, lightTheme, zhCN, useCss, useLang, useLocale } from 'zerodep-js-ui';

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
