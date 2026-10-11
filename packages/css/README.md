# zerodep-js-css

zerodep-js 的 CSS 回调作者和浏览器/SSR 样式宿主，只公开包根。

```ts
const s = new Css();
const panel = css(() => {
  s.display('flex').gap('0.5em');
});
```

属性为真实链式方法；bx 标记绑定意图，安全值使用元素变量，系统关键字及主题 token 保持各自语义。class 数组合并结构化声明后生成一个哈希类。UI 中通过 useCss() 获取 Provider 主题作者。

[工作区](https://github.com/kenconnet666/zerodep-js#readme)

生成数据来源与许可见 THIRD_PARTY_NOTICES。
