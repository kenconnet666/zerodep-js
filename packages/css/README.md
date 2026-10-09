# zerodep-js-css

zerodep-js 自带的 CSS 包。作者、系统关键字、单位、选择器、隐式变量和浏览器/SSR 样式管理均在本仓库维护，不包含 Vue/Svelte 适配或 bx；亮暗主题只在 packages/ui 维护。

```tsx
import { Css, css } from 'zerodep-js-css';
const s = new Css();
const card = css(s.padding.rem(1), s.display.flex);
```

应用使用 `zerodep-js-compiler/vite` 的 `zerodep()`，无需额外插件。组件内命名 css 声明自动追踪状态；安全动态值转换为元素 CSS 变量。UI 组件通过上层 Provider 的 useCss() 获取当前主题作者。业务作者可继承 Css/SystemKeywords，context 由 createCssContext() 提供，缺少上层提供者会报错。

根入口根据浏览器/Node 环境选择宿主；服务端显式使用 /server 创建按请求隔离的收集器。/internal 仅供编译产物调用。SSR 的 style 和清单标签由应用输出，hydrateCss() 在接管前恢复已有样式。

生成数据来自固定的 csstype，使用 pnpm css:generate 更新，pnpm css:check 验证。生成器复用 Babel，不需要 TS6；中文文档、类型用例和实际 TS7 补全在当前仓库验证。源码来源为原 zerodep-css 仓库 e5a0bfe，第三方许可见 THIRD_PARTY_NOTICES.md。

完整写法与边界见仓库 docs/css.md。
