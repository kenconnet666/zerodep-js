# 组件库与框架文档

使用 zerodep-js 自身的 TSX 和 Vite。已提供 Provider 的主题、语言、地区、时区及 Portal 交互演示，以及 Icon 的静态图标、主题关键字、原生 CSS 值和可访问名称示例。

基础组件与字号比例示例展示 Text/Ripple/Spinner/ButtonBase，以及 14/16/20px 根字号下的五种按钮组合。em 控制组件内部比例（含边框和焦点），不默认叠加独立点击区域下限。测量示例覆盖 vw/clamp/rem/%/CSS 变量/cqw、固定容器的字号观察和 Portal 字号镜像。

从仓库根目录执行：

```sh
pnpm dev:docs
pnpm build:docs
pnpm preview:docs
```

开发地址 `http://localhost:5174`，构建预览地址 `http://localhost:4174`，与原有示例端口分开。构建产物在 `apps/docs/dist`，可交给静态站点服务器。

默认静态页面采用 CSR。`dist/server/entry-server.js` 另提供 SSR 的 `render()`，返回 html/styles，由服务器插入页面；浏览器入口有 SSR 内容时使用接管，无内容时挂载。三浏览器测试同时验证两条路径。

- `src/pages/components/`：组件说明和交互示例。
- `src/pages/system/`：框架使用文档。
- `src/App.tsx`：站点入口和导航。
- `src/style.css`：文档站布局样式。

组件从 `zerodep-js-ui` 导入，使用组件库构建产物。修改组件库后执行 `pnpm build:ui` 更新产物；文档应用自身使用 Vite 热更新。`dev:docs` 会先准备框架与组件库产物。

现有根目录 `docs/` 保留为技术文档来源，当前入口通过链接访问。后续再确定文档渲染、搜索、主题等需求，不预先引入额外文档框架或重复复制内容。
