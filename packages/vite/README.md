# zerodep-js-vite

zerodep-js 的 Vite 8 插件，复用 compiler 转换应用源码和展示诊断，不内置另一套编译规则。

```ts
import { defineConfig } from 'vite';
import { zerodep } from 'zerodep-js-vite';

export default defineConfig({ plugins: [zerodep()] });
```

TS 配置使用 `jsx: "preserve"`、`jsxImportSource: "zerodep-js"`。应用安装 core，SSR 应用另装 ssr；插件及 TypeScript 是开发依赖。Vite 插件不替代 TS7 的类型检查。

依赖包应发布预编译 ESM；插件跳过 node_modules。开发模式自动接入组件检查和兼容的本地状态保留；修改状态声明、组件身份或导出结构时按规则重置或重建。检查面板只读查看本地状态和有限事件，生产构建不注入。支持范围与 SSR 边界见 [开发检查](https://github.com/kenconnet666/zerodep-js/blob/main/docs/devtools.md)。

`zerodep({ include, exclude })` 可为多框架工程指定文件范围，相对模式以应用 root 为基准；开发、依赖扫描、生产与 SSR 共用规则。完整示例见[页面宿主](https://github.com/kenconnet666/zerodep-js/blob/main/docs/page-hosts.md)。

本文对应 `1.0.0-rc.3` API，框架与适配包统一版本，实际发布与验收状态见 [变更记录](https://github.com/kenconnet666/zerodep-js/blob/main/CHANGELOG.md)。
