# 组件库与框架文档

使用 zerodep-js 自身的 TSX 和 Vite。当前是可运行的文档入口，不包含完整文档站功能。

从仓库根目录执行：

```sh
pnpm dev:docs
pnpm build:docs
pnpm preview:docs
```

开发地址 `http://localhost:5174`，构建预览地址 `http://localhost:4174`，与原有示例端口分开。构建产物在 `apps/docs/dist`，可交给静态站点服务器。

- `src/pages/components/`：组件说明和交互示例。
- `src/pages/system/`：框架使用文档。
- `src/App.tsx`：站点入口和导航。
- `src/style.css`：文档站布局样式。

组件从 `zerodep-js-ui` 导入，使用组件库构建产物。修改组件库后执行 `pnpm build:ui` 更新产物；文档应用自身使用 Vite 热更新。`dev:docs` 会先准备框架与组件库产物。

现有根目录 `docs/` 保留为技术文档来源，当前入口通过链接访问。后续再确定文档渲染、搜索、主题等需求，不预先引入额外文档框架或重复复制内容。
