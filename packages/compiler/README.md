# zerodep-js-compiler

zerodep-js 的 Babel 8 编译器。处理显式变量宏、component 参数解构及默认值、JSX 和 For 实时参数；输出标准 ESM、源码映射和带源码位置的语义诊断。

```ts
import { compile, diagnose } from 'zerodep-js-compiler';

const result = compile(source, 'Counter.tsx');
// result.code 是 ESM，result.map 是源码映射。
const diagnostics = diagnose(source, 'Counter.tsx');
```

`zerodep-check src` 提供独立语义检查，`--json` 输出结构化结果，`--stdin 文件名` 接受编辑器文本快照。TypeScript 7 仍负责原始 TSX 类型检查与声明生成；源码编译错误通过 CompileError 报告，内部异常不会伪装成成功。

构建应用推荐使用 `zerodep-js-vite`。发布框架组件库时先编译 TSX，再使用 TS7 生成声明，并把 core 声明为 peer dependency；消费者不需要重新编译依赖目录中的 TSX。

[开发指南与错误码](https://github.com/kenconnet666/zerodep-js/blob/main/docs/development.md)。仅用于构建侧，不应打入浏览器。本文对应 `1.0.0-rc.2` API，框架与适配包统一版本，实际发布与验收状态见 [变更记录](https://github.com/kenconnet666/zerodep-js/blob/main/CHANGELOG.md)。
