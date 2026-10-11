# 组件库与框架文档

使用 zerodep-js 自身的 TSX 和 Vite。已提供 Provider 的主题、语言、地区、时区及 Portal 交互演示，以及 Icon 的静态图标、主题关键字、原生 CSS 值和可访问名称示例。

基础组件与字号比例示例展示 Text/Ripple/Spinner/Button，以及 14/16/20px 根字号下的五种按钮组合。em 控制组件内部比例（含边框和焦点），不默认叠加独立点击区域下限。测量示例覆盖 vw/clamp/rem/%/CSS 变量/cqw、固定容器的字号观察和 Portal 字号镜像。

ButtonDemo 展示 Button（文字/图标）/ToggleButton/LinkButton 与 Flex，包含原生表单、受控切换、加载、独立槽转发和相连布局的隐藏/重排/RTL/纵向书写。稳定 API 说明集中在 [按钮与 Flex](../../docs/buttons.md)。

GridDemo 展示原生自动填充/跨列，以及二维相连的动态列数、项数、隐藏、重排、RTL 和纵向书写，契约见 [Grid](../../docs/grid.md)。

从仓库根目录执行：

```sh
pnpm --dir apps/docs dev
pnpm --dir apps/docs build:client
pnpm --dir apps/docs build:server
pnpm --dir apps/docs preview
```

开发地址 `http://localhost:5174`，构建预览地址 `http://localhost:4174`，与原有示例端口分开。客户端产物在 `apps/docs/dist/client`，服务端产物在 `apps/docs/dist/server`，可交给静态站点服务器。

默认静态页面采用 CSR。`dist/server/entry-server.js` 另提供 SSR 的 `render()`，返回 html/styles，由服务器插入页面；浏览器入口有 SSR 内容时使用接管，无内容时挂载。三浏览器测试同时验证两条路径。

- `src/pages/components/`：组件说明和交互示例。
- `src/pages/system/`：框架使用文档。
- `src/App.tsx`：站点入口和导航。
- `src/style.css`：文档站布局样式。

开发时文档直接读取 UI 源码并提供 HMR；生产构建读取 UI 产物。首次启动需显式构建 core、css、compiler；生产构建还需先执行 UI 的 build。所有命令只做各自操作，不自动补建依赖或执行类型检查，见 [开发命令](../../docs/commands.md)。

现有根目录 `docs/` 保留为技术文档来源，当前入口通过链接访问。后续再确定文档渲染、搜索、主题等需求，不预先引入额外文档框架或重复复制内容。
