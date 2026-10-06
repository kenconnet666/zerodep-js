# zerodep-js-vite

zerodep-js 的 Vite 8 插件，按配置加载 Babel 或原生 TypeScript 7.1 后端，转换应用源码并展示诊断。

```ts
import { defineConfig } from 'vite';
import { zerodep } from 'zerodep-js-vite';

export default defineConfig({ plugins: [zerodep()] });
```

应用显式安装一种编译后端：默认 `zerodep()` 使用 `zerodep-js-compiler`（Babel）；`zerodep({ compiler: 'native' })` 使用 `zerodep-js-native`。两个包均为可选 peer，原生消费不会加载 Babel。TS 配置使用 `jsxImportSource: "zerodep-js"`；原生 CLI 输出推荐 `jsx: "react-jsx"`。应用安装 core，SSR 应用另装 ssr；插件及编译器是开发依赖。

原生生产构建默认检查请求文件类型，开发态默认由语言服务检查类型，防止检查阻塞 HMR。`typeCheck` 可显式覆盖；框架诊断始终执行。项目完整类型检查使用 `zerodep-tsc --noEmit`。Babel 后端继续配合独立 TS7 检查。

依赖包应发布预编译 ESM；插件跳过 node_modules。开发模式自动接入组件检查和兼容的本地状态保留；修改状态声明、组件身份或导出结构时按规则重置或重建。检查面板只读查看本地状态和有限事件，生产构建不注入。支持范围与 SSR 边界见 [开发检查](https://github.com/kenconnet666/zerodep-js/blob/main/docs/devtools.md)。

`zerodep({ include, exclude })` 可为多框架工程指定文件范围，相对模式以应用 root 为基准；开发、依赖扫描、生产与 SSR 共用规则。完整示例见[页面宿主](https://github.com/kenconnet666/zerodep-js/blob/main/docs/page-hosts.md)。

本文对应 `1.0.0-rc.3` API，框架与适配包统一版本，实际发布与验收状态见 [变更记录](https://github.com/kenconnet666/zerodep-js/blob/main/CHANGELOG.md)。
