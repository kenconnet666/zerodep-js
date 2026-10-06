# zerodep-js-native

固定 TypeScript 7.1 的 zerodep-js 原生 Go 编译器。框架分析与输出编入 TypeScript，保留原始源码类型检查、声明、源码映射和语言服务。运行时与 Babel 后端共用 ABI 2。

当前为 RC3 发布候选，实际注册表状态与发布记录见仓库 CHANGELOG；以下安装方式适用于已发布的对应版本。源码工作区先运行 `pnpm compiler:native:build --source <TypeScript仓库> --go <Go路径>`；验收使用实际 tgz 独立安装。

当前分发平台：Windows、Linux、macOS 的 x64/ARM64 六种组合，由对应架构 CI runner 构建和执行验证。安装者无需 Go；维护者使用 Go 1.27.1 构建平台包。依赖官方精确版本的 TypeScript JavaScript API，不依赖 Babel、Zod 或 MCP SDK。

```sh
pnpm add zerodep-js@next
pnpm add -D zerodep-js-native@next zerodep-js-vite@next vite typescript@7.1.0-dev.20261005.1
pnpm exec zerodep-tsc -p tsconfig.json
```

项目使用标准 TSX 配置：

```json
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "Preserve",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "jsxImportSource": "zerodep-js",
    "strict": true,
    "verbatimModuleSyntax": true,
    "noEmitOnError": true,
    "outDir": "dist"
  }
}
```

`react-jsx` 是 TypeScript 的自动 JSX 模式名称；框架在其内置 JSX 转换前完成转换，生成 `.js`，运行时入口是 zerodep-js。类型声明继续从原始树输出。

Vite 明确选择后端：

```ts
import { zerodep } from 'zerodep-js-vite';
export default { plugins: [zerodep({ compiler: 'native' })] };
```

原生模式在生产构建中默认使用同一 Program 检查请求文件并生成 JS。开发态默认只执行转换和框架诊断，由原生语言服务提供类型诊断，避免复杂类型检查阻塞热更新。`typeCheck: true/false` 可显式覆盖；项目完整检查使用 `zerodep-tsc --noEmit`。框架语义错误始终阻止输出。不要同时启用两个后端处理同一模块。

Node 单文件接口与 Babel `compile` 具有相同结果形态，它只进行转换和框架诊断：

```ts
import { compile, closeCompiler } from 'zerodep-js-native';
try {
  const { code, map } = compile(source, 'App.tsx');
} finally {
  closeCompiler();
}
```

需要项目类型检查或连续编辑时使用 `createCompiler({ root, project?, check? })`，依次调用 `compile(source, filename, { development?, hmr? })`，磁盘依赖变化调用 `invalidate(filename, event?)`，结束时 `await close()`。宿主负责资源生命周期；请求串行更新快照，客户端与 SSR 输出隔离。

`compilerPath()` 返回原生二进制位置。WebStorm 的 TypeScript 包选择该路径的上两级目录（`typescript` 平台 SDK 目录），并在状态栏核对 `TypeScript-Go ...+zerodep.native...`。`zerodep-tsc --lsp --stdio` 提供标准语言服务，框架错误在消息中保留 ZJ 编号。

源代码、构建方式及性能报告见 [项目仓库](https://github.com/kenconnet666/zerodep-js)。原生平台包携带上游 Apache-2.0 许可、NOTICE、标准库和构建摘要。
