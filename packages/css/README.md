# zerodep-js-css

zerodep-js 自带的 CSS 包。作者、系统关键字、单位、选择器、隐式变量和浏览器/SSR 样式管理均在本仓库维护，不包含 Vue/Svelte 适配或 bx；本包不提供具体 UI 主题。UiTheme、亮暗主题及 Provider 在 zerodep-js-ui 中维护。

```tsx
import { Css, css } from 'zerodep-js-css';
const s = new Css();
const card = css(s.padding.rem(1), s.display.flex);
```

应用使用 `zerodep-js-compiler` 的 `zerodep()`，无需额外插件。组件内命名 css 声明自动追踪状态；安全动态值转换为元素 CSS 变量。UI 组件通过上层 Provider 的 useCss() 获取当前主题作者。业务作者可继承 Css/SystemKeywords，context 由 createCssContext() 提供，缺少上层提供者会报错。

所有 API 从包根导入，公开清单只在 src/index.ts 维护，没有 /server 或 /internal 子入口。源码使用普通相对导入，Vite 按标准 browser 字段替换浏览器宿主；withCssHost 使用 Node 的 AsyncLocalStorage 隔离并发 SSR，不用于浏览器。SSR 的 style 和清单标签由应用输出，hydrateCss() 在接管前恢复已有样式。

生成数据来自固定的 csstype，使用 pnpm css:generate 更新，pnpm css:check 验证。生成器复用 Babel，不需要 TS6；中文文档、类型用例和实际 TS7 补全在当前仓库验证。源码来源为原 zerodep-css 仓库 e5a0bfe，第三方许可见 THIRD_PARTY_NOTICES.md。

完整写法与边界见仓库 docs/css.md。

组件属性可复用 `CssValue<'color'>`、`CssValue<'fontSize'>` 等输入类型，默认只有系统关键字；第二个类型参数指定自定义主题，例如 UI 使用 `CssValue<'color', UiTheme>`。`_mergeClasses(...values)` 合并本宿主生成类的声明并保留外部类名，适合组件 class 与 slotXxx 转发；普通外部类名仍按 CSS 层叠规则生效。

源码只分三个目录，src 根目录只有 index.ts：

- `generated/`：系统属性、关键字和作者，由生成器维护。
- `util/author.ts`：声明片段、选择器和 CSS 输入类型；不访问 DOM 或组件状态。
- `util/keywords.ts`：通用关键字继承、原始值读取与成员声明。
- `runtime/bindings.ts`：作者核对、动态值安全分类、元素变量与响应式属性绑定。
- `runtime/context.ts`：CSS 作者的组件上下文。
- `runtime/rules.ts`：命名、规则登记、请求收集器与序列化。
- `runtime/browser.ts` / `runtime/server.ts`：浏览器样式表与 Node 异步请求隔离。
- `index.ts`：唯一公开导出清单；类型使用 dist/index.d.ts 与声明映射。

系统作者不预建每个属性的主题缓存；真正访问主题属性时才创建相应 WeakMap，多个作者的视图仍独立。安全分类仅缓存固定系统关键字的查询集合，不保存用户的历史输入。动态参数前后各核对一次作者，后续绑定复用捕获的方法与核对结果，保留参数求值次数、自定义方法和错误行为。

属性作者直接继承共享的普通、数学、长度、颜色及长度颜色基类，raw/数学/颜色实现集中维护；每个属性的泛型实参仍来自对应 Property.*，不会将宽度和颜色输入放宽为任意数字。中文方法说明随基类继承，IDE 可直接跳到共享实现。生成器不再重复输出接口方法签名，以保留 WebStorm 的原生方法补全展示。
