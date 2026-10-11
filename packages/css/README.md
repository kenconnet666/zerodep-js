# zerodep-js-css

zerodep-js 的 CSS 回调作者、类型化主题、显式 bx 绑定和浏览器/SSR 宿主。

```tsx
const s = useCss();
const style = css(() => {
  s.display('flex').color(bx(color)).width(bx(width));
  if (disabled) s.opacity(0.5);
  s.select('&:hover', () => s.color('_primary'));
});
return <div class={[base, style, className]} />;
```

属性是真实方法，支持 IDE 括号补全和链式调用。css 同步收集，每次重新计算得到独立结果；原生元素合并数组并登记一个最终类。bx 支持变量、常量和主题 token；系统关键字按原值输出，主题变量由作者/Provider 处理，其他安全值绑定到元素，不能确认时保留声明。

UI 的 useCss 来自 zerodep-js-ui；独立使用可 new Css() 或 createCssContext。组件 props 复用 CssValue，class 复用 core ClassValue。所有入口都在包根，不手工拼接样式结果或变量。

正式契约、SSR 接线、选择器和动画见 [CSS 文档](../../docs/css.md)。生成器为 scripts/generate-css-author.mjs，数据来自固定 CSSType；源码目录只有 generated/runtime/util。
