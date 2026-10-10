# Grid 二维布局

Grid 只负责普通 CSS Grid 布局，Flex 负责一维排列。两者在 Provider 内使用，不改变子项圆角、边框或交互，不提供 attached。按钮相连使用 ButtonGroup，ButtonGroup 仅支持一维。

- columns 默认 1；正整数生成 repeat(N, minmax(0, 1fr))，字符串直接采用 CSS 轨道定义。
- rows/areas/autoRows/autoColumns/autoFlow、gap/rowGap/columnGap、alignItems/justifyItems/alignContent/justifyContent 使用对应 CSS 输入类型。
- inline 切换 inline-grid；size 控制继承字号。默认 gap=0.5em、子项两轴 stretch。
- 跨行跨列、命名区域、auto-fit/auto-fill 和自动放置由原生 CSS 处理。子项通过 class/style 设置 gridColumn/gridRow，不需要 GridItem。
- 不包裹或克隆 children，不添加 ARIA grid 角色、键盘导航、DOM 测量或按钮子项检查。

```tsx
<Grid columns="repeat(auto-fit, minmax(min(100%, 12em), 1fr))" gap="1em">
  <div>自动排列</div>
  <div>保持原生 CSS Grid 能力</div>
</Grid>

<Grid columns={3} gap="0.5em">
  <div style={{ gridColumn: 'span 2' }}>跨两列</div>
  <div>一列</div>
</Grid>
```

源码为 packages/ui/src/layout/Grid.tsx，示例为 apps/docs/src/pages/components/GridDemo.tsx。检查覆盖数字列数、原生轨道、命名区域、动态增删/隐藏/重排、自动填充、跨列、SSR 接管与类型约束；二维相连功能及其专用用例已取消。补全验证使用 pnpm lsp:completions --case Grid属性。
