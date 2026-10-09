# Grid 二维布局

Grid 使用原生 CSS Grid；Flex 负责一维主轴排列，Grid 负责同时对齐行和列。组件在 Provider 内使用，只维护 UI 根入口，不创建 GridItem 或另一套断点系统。

## 实施契约

- columns 默认 1；正整数生成 repeat(N, minmax(0, 1fr))，普通模式也接受 CssValue<'gridTemplateColumns'>，例如 repeat(auto-fit, minmax(min(100%, 12em), 1fr))。
- rows/areas/autoRows/autoColumns/autoFlow、gap/rowGap/columnGap、alignItems/justifyItems/alignContent/justifyContent 均使用对应 CSS 输入类型；inline 切换 inline-grid，size 控制继承字号。默认 gap=0.5em、两轴子项 stretch。
- 普通模式允许 CSS 跨行跨列、命名区域与自动填充，使用子项 class/style 直接设置 gridColumn/gridRow；不包裹或克隆 children，不自动添加 ARIA grid 角色或方向键导航。
- attached 必须传正整数 columns；采用 row 自动排列、零间距、子项与轨道两轴 stretch。areas、其他自动流向以及 space-between 等额外轨道间距不适用，冲突输入由类型与运行时检查拒绝。
- attached 复用 data-ui-action 与 --zj-action-border，支持四类按钮及明确实现该协议的直接子控件。子项不能使用跨格、显式位置、order、独立 margin/尺寸/对齐；覆盖这些 CSS 后不保证连接几何。
- 相邻列/行重叠一条边框；只有未与上/下/左/右邻格接触的凸角保留自身圆角。不满末行按阶梯轮廓处理，不补占位、不强行将末项拉满，凹角保持方角。
- 选择器按非 hidden 的兼容子项计数，支持增删、重排、列数变化、单项/空内容、RTL 和 writing-mode；不测量 DOM，不安装尺寸或子节点观察器。
- 数字列数的响应式变化应通过 columns prop 同步，不能只用外部 CSS 改附着网格的实际列数。普通模式的 auto-fit 自动响应容器宽度；attached 不猜测 CSS 字符串的实际列数，不支持 auto-fit、dense、跨格或空洞。
- 同 Flex，强制 inline/important 圆角、任意 display:none、不同字号/边框厚度和不兼容 wrapper 不在默认连接保证内。使用 hidden 或条件渲染。

## 使用

```tsx
<Grid columns="repeat(auto-fit, minmax(min(100%, 12em), 1fr))" gap="1em">
  <div>随容器宽度自动排列</div>
  <div>保留原生 CSS Grid 能力</div>
</Grid>;

<Grid attached columns={3} size="1rem" role="group" aria-label="操作面板">
  <Button variant="outline">一</Button>
  <Button variant="outline">二</Button>
  <Button variant="outline">三</Button>
  <Button variant="outline">四</Button>
  <Button variant="outline">五</Button>
</Grid>;
```

上述五项形成 3+2 的阶梯外轮廓；第三项右下角和第五项右下角均在外缘，二者保留圆角。第二项下方有第五项，接触角为零。

验证覆盖 CSR/SSR、动态列数与隐藏/重排、完整及不完整行、单列/单项/空列表、二维边框重叠、RTL/纵向书写、IconButton 拉伸、焦点层级、自动填充与原生跨格、类型反例和 CSS 补全。完整矩阵交 CI。

源码为 packages/ui/src/layout/Grid.tsx，示例为 apps/docs/src/pages/components/GridDemo.tsx。相关检查在 packages/ui/test/grid.test.ts、grid-types.tsx 和 tests/e2e/grid.spec.ts；补全命令为 pnpm lsp:completions --case Grid属性。UI 根入口由 ui:generate/ui:check 维护。

设计参考：[Radix Grid](https://www.radix-ui.com/themes/docs/components/grid) 的轨道/对齐属性、[Mantine SimpleGrid](https://mantine.dev/core/simple-grid/) 的等宽列和自动填充、[CSS Grid 标准](https://www.w3.org/TR/css-grid-2/)。本库复用已有 CSS 作者，不安装这些组件库；attached 二维连接是本库明确列数下的附加契约。
