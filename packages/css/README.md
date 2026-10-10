# zerodep-js-css

zerodep-js 自带的 CSS 包。作者、系统关键字、单位、选择器、隐式变量和浏览器/SSR 样式管理均在本仓库维护，不包含 Vue/Svelte 适配或 bx；本包不提供具体 UI 主题。UiTheme、亮暗主题及 Provider 在 zerodep-js-ui 中维护。

```tsx
import { Css, css } from 'zerodep-js-css';
const s = new Css();
const card = css(s.padding.rem(1), s.display.flex);
```

应用使用 `zerodep-js-compiler/vite` 的 `zerodep()`，无需额外插件。组件内命名 css 声明自动追踪状态；安全动态值转换为元素 CSS 变量。UI 组件通过上层 Provider 的 useCss() 获取当前主题作者。业务作者可继承 Css/SystemKeywords，context 由 createCssContext() 提供，缺少上层提供者会报错。

所有 API 从包根导入，公开清单只在 src/index.ts 维护，没有 /server 或 /internal 子入口。源码使用普通相对导入，Vite 按标准 browser 字段替换浏览器宿主；withCssHost 使用 Node 的 AsyncLocalStorage 隔离并发 SSR，不用于浏览器。SSR 的 style 和清单标签由应用输出，hydrateCss() 在接管前恢复已有样式。

生成数据来自固定的 csstype，使用 pnpm css:generate 更新，pnpm css:check 验证。生成器复用 Babel，不需要 TS6；中文文档、类型用例和实际 TS7 补全在当前仓库验证。源码来源为原 zerodep-css 仓库 e5a0bfe，第三方许可见 THIRD_PARTY_NOTICES.md。

完整写法与边界见仓库 docs/css.md。

组件属性可复用 `CssValue<'color'>`、`CssValue<'fontSize'>` 等输入类型，默认只有系统关键字；第二个类型参数指定自定义主题，例如 UI 使用 `CssValue<'color', UiTheme>`。`_mergeClasses(...values)` 合并本宿主生成类的声明并保留外部类名，适合组件 class 与 slotXxx 转发；普通外部类名仍按 CSS 层叠规则生效。

源码按职责分组：

- `generated/`：由生成器维护的系统属性、关键字和作者。
- `author/`：声明片段、选择器和隐式变量的安全判断。
- `theme/`：通用关键字继承、绑定和作者上下文，不包含亮暗配色。
- `runtime/`：规则登记、序列化、浏览器宿主与 Node 请求隔离。
- `bindings.ts`：编译器调用的响应式样式绑定。
- `index.ts`：唯一公开导出清单，类型使用生成的 `dist/index.d.ts` 与声明映射。
