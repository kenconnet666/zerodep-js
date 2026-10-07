# zerodep-js-vite

zerodep-js 的 Vite 8 插件，使用 Babel 框架编译器处理应用转换、依赖扫描、框架诊断与 HMR。

```ts
import { defineConfig } from 'vite';
import { zerodep } from 'zerodep-js-vite';

export default defineConfig({ plugins: [zerodep()] });
```

插件直接依赖 zerodep-js-compiler。应用安装同版本 core，SSR 应用另装 ssr；构建侧安装本插件与 Vite。TS 配置使用 jsxImportSource: "zerodep-js" 和 jsx: "preserve"。

项目类型检查使用 `zerodep-check -p tsconfig.json`，生产脚本先检查再打包 client/server。插件不提供 typeCheck 选项，不创建类型检查进程。框架结构与写入约束始终检查，依赖类型关系的绑定写回检查由项目检查入口执行。

依赖包发布预编译 ESM，插件跳过 node_modules。开发模式支持组件检查与兼容状态保留；声明、身份或导出结构变化时按规则重置或重建，生产不注入调试代码。

`zerodep({ include, exclude })` 指定应用文件范围，相对模式以应用 root 为基准；开发、依赖扫描、生产和 SSR 使用同一规则。

当前工具与发布边界见 [工具链](https://github.com/kenconnet666/zerodep-js/blob/main/docs/tooling.md) 和 [变更记录](https://github.com/kenconnet666/zerodep-js/blob/main/CHANGELOG.md)。
