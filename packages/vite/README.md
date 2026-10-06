# zerodep-js-vite

zerodep-js 的 Vite 8 插件，直接使用项目定制 TypeScript 7.1 Go 编译器，处理应用转换、依赖扫描、开发诊断和 HMR。

```ts
import { defineConfig } from 'vite';
import { zerodep } from 'zerodep-js-vite';

export default defineConfig({ plugins: [zerodep()] });
```

插件直接依赖 `zerodep-js-native`，不提供后端选择。应用安装相同版本的 core，SSR 应用另装 ssr；构建侧安装本插件与 Vite。TS 配置使用 `jsxImportSource: "zerodep-js"` 和 `jsx: "preserve"`。

生产转换默认在同一个 Program 中检查请求文件并输出 JS；开发态由语言服务提供类型检查，避免阻塞 HMR。`typeCheck` 可显式覆盖，框架诊断始终执行。全项目检查使用 `zerodep-tsc --noEmit`。

依赖包发布预编译 ESM，插件跳过 node_modules。开发模式提供组件检查和兼容本地状态保留；状态声明、组件身份或导出结构变化时按规则重置或重建，生产构建不注入调试代码。详见 [开发检查](https://github.com/kenconnet666/zerodep-js/blob/main/docs/devtools.md)。

`zerodep({ include, exclude })` 指定应用文件范围，相对模式以应用 root 为基准；开发、依赖扫描、生产和 SSR 使用同一规则。开发服务器或构建 watcher 关闭时，插件释放其拥有的原生服务。

本文对应 1.0.0-rc.4 API；实际发布与验收状态见 [变更记录](https://github.com/kenconnet666/zerodep-js/blob/main/CHANGELOG.md)。
