# zerodep-js-vite

zerodep-js 的 Vite 8 插件，复用 compiler 转换应用源码和展示诊断，不内置另一套编译规则。

```ts
import { defineConfig } from 'vite';
import { zerodep } from 'zerodep-js-vite';

export default defineConfig({ plugins: [zerodep()] });
```

TS 配置使用 `jsx: "preserve"`、`jsxImportSource: "zerodep-js"`。应用安装 core，SSR 应用另装 ssr；插件及 TypeScript 是开发依赖。Vite 插件不替代 TS7 的类型检查。

依赖包应发布预编译 ESM；插件跳过 node_modules。开发 HMR 在应用入口明确接收根组件更新并调用旧 disposer，局部状态重置；完整示例与诊断规则见 [开发指南](https://github.com/kenconnet666/zerodep-js/blob/main/docs/development.md)。

当前为 `1.0.0-rc.1` 发布候选。四个框架包使用同一版本，实际发布与验收状态见 [变更记录](https://github.com/kenconnet666/zerodep-js/blob/main/CHANGELOG.md)。
