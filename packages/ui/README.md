# zerodep-js-ui

组件库工程基础，目前没有公开组件，包保持 private，不加入现有五包发布流程。

- `src/components/`：组件源码。
- `src/index.ts`：公开导出入口。
- `dist/`：构建后的 ESM、类型声明和 source map。

从仓库根目录执行 `pnpm build:ui`。构建先检查框架语义，再由 Vite + zerodep 插件转换 TSX，最后由固定的 TypeScript 7.1 生成声明；不能用普通 tsc 擦除结果执行组件宏。

运行时和 zerodep-css 由应用提供，组件库不打包第二份实例。依赖沿用工作区版本，不另建主题、工具或状态管理层。组件示例和使用说明放在 `apps/docs/src/pages/components/`。
