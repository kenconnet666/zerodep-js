# TS7 与 TSX 框架技术研究

研究日期：2026-09-30，Asia/Shanghai。

后续更新：Babel 框架编译器现已实现并分包；2026-10-06 用户要求考察第二种 Go 后端，固定 TS7.1 的接入点、现有项目比较和单次解析/双路输出实验见[原生编译器研究](https://github.com/kenconnet666/zerodep-js/blob/090396b/.design/native-compiler.md)。本文保留早期研究结论，不代表当前实现状态。

本记录服务于 zerodep-js 的设计讨论。它不是已批准的实现规范。已确认的方向是标准 TSX、Svelte 风格的显式响应式变量、不暴露 `.value`、只支持 TypeScript 7。组件标记、props 解构、默认值、编译器后端和运行时细节仍为候选。

本轮实际运行 TypeScript 7.0.2 的 CLI 类型检查与声明生成实验。没有实现响应式编译器、DOM 运行时或编辑器插件，也没有做编译性能基准。实验使用最小自定义 JSX 类型，不依赖 React 类型。结果见 [ts7-tsx-probe-results.json](./ts7-tsx-probe-results.json)。

## TypeScript 7 基线

npm 查询结果：`typescript` stable 为 `7.0.2`，next 为 `7.1.0-dev.20260930.4`。版本信息只代表本次查询时刻。

TypeScript 7.0 已于 2026-07-08 发布。正式 CLI 为 `tsc`，不能继续把旧预览时期的 `tsgo` 命令作为稳定版安装说明。后续验证以锁定的 7.0.2 开始，不引入 TypeScript 5/6 兼容层。[官方发布说明](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)

必须区分三件事：

- 原生 CLI 和语言服务可以用于类型检查及编辑体验。
- 旧的 `import * as ts from 'typescript'` Compiler API 不是原样保留的扩展入口。
- 本次实际安装的 7.0.2 包含可导入的 `typescript/unstable/ast`、`typescript/unstable/sync`。这些接口存在，但不能把它们当成承诺稳定的旧式 transformer API。

实际导入 `typescript` 的根入口仅观察到版本相关导出；上述两个 `unstable` 子路径导入成功。官方发布说明对稳定 API 的限制与实验性子路径的存在并不矛盾。参考 [v7.0.2 源码中的包导出定义](https://github.com/microsoft/TypeScript/blob/v7.0.2/tsc/_packages/native-preview/package.json)。

建议：TS7 负责源代码类型检查和 `.d.ts`；独立的框架编译器负责响应式语义与 JSX DOM 转换。不能依赖修改 TS7 类型检查器才能使用基本功能。

WebStorm 2026.2 已有官方 TS7 支持；本轮没有验证用户当前 IDE 的版本、配置或自定义框架的实际补全行为。普通 TSX 类型提示可使用原生服务，框架特有诊断仍需单独接入。[JetBrains 官方说明](https://blog.jetbrains.com/webstorm/2026/09/typescript-7-in-webstorm-faster-coding-assistance-for-angular-and-react-no-migration-required/)

## TSX 类型能力与真实边界

这些能力并非都由 TS7 首次引入。TS7-only 允许直接采用，但不应宣传成新的语言特性。

| 类型入口                       | 作用                                   | 对框架的含义                                                     |
| ------------------------------ | -------------------------------------- | ---------------------------------------------------------------- |
| `JSX.IntrinsicElements`        | HTML、SVG、自定义标签的属性类型        | 自己定义契约，避免 `[tag: string]: any`                          |
| `JSX.Element`                  | JSX 表达式的结果类型                   | 可定义为不透明的渲染结果，不能从中可靠恢复具体标签和 props       |
| `JSX.ElementType`              | 哪些值可以作为 JSX 标签                | 可以要求组件具有框架品牌，也可按运行时能力允许返回字符串、数组等 |
| `JSX.ElementChildrenAttribute` | 指定 children 对应的属性名             | children 需要在组件 props 中显式声明                             |
| `JSX.IntrinsicAttributes`      | key 等框架保留属性                     | 保留属性是否传入组件必须由运行时契约规定                         |
| `JSX.LibraryManagedAttributes` | 库对调用方 props 的类型调整            | 不应为了模仿 React defaultProps 而默认增加复杂度                 |
| `jsxImportSource`              | 定位框架的 JSX 类型或自动 runtime 入口 | 类型入口与 JSX 编译机制必须分开理解                              |

`jsxImportSource` 并不实现响应式。`jsx: preserve` 适合把 JSX 留给框架编译器处理。直接把 JSX 降成普通 `_jsx` 调用会丢失表达式的延迟求值信息。[TypeScript JSX 手册](https://www.typescriptlang.org/docs/handbook/jsx.html)

不要直接使用 React 的 `FC`、`ReactNode`、`SyntheticEvent` 作为本框架的公共类型。可借鉴覆盖范围，但生命周期、事件、children 和渲染结果必须符合自己的运行时。

## TS7 实验结果

实验共 20 个类型用例和 2 个声明生成用例。错误用例被拒绝、边界用例被放行均是观测结果，并不表示框架能力已经实现。

| 用例                                        | 7.0.2 结果                                     | 设计含义                                      |
| ------------------------------------------- | ---------------------------------------------- | --------------------------------------------- |
| 带品牌的 component 包装泛型组件             | 通过                                           | 保留完整函数签名 F 的包装可以保留泛型         |
| 泛型 children 访问不存在字段                | TS2339                                         | 回调参数可由 items 推断                       |
| 事件 currentTarget 与 target                | currentTarget 可用，target 报 TS18047 / TS2339 | 原生事件的 target 不能假装为绑定元素          |
| 必填 prop 在解构中有默认值                  | 缺失调用仍报 TS2322                            | 默认值不自动改变公开 Props 的必填性           |
| 可选 prop 在解构中有默认值                  | 通过                                           | 可选性在 Props 中明确表达                     |
| Readonly<Props> 解构参数重新赋值            | 通过                                           | 解构局部变量的只读语义需框架诊断              |
| Readonly<Props> 对象属性赋值                | TS2540                                         | 属性只读由 TS 处理                            |
| const 派生变量跨回调收窄                    | 通过                                           | TS 不知道编译后读取可能变化，存在框架语义缺口 |
| 已声明 aria 属性类型错误                    | TS2322                                         | 已声明的连字符属性仍可检查                    |
| 未声明的 banana-mode 属性                   | 通过                                           | 未知连字符属性不能完全依靠 TS 拒绝            |
| JSX 直接写多余 prop                         | TS2322                                         | 直接调用能发现部分拼写错误                    |
| JSX spread 传多余字段                       | 通过                                           | 结构类型不等于精确对象形状                    |
| exactOptionalPropertyTypes 下显式 undefined | TS2375                                         | 是否允许透传 undefined 需要类型契约           |
| 未声明 children 的组件接收 children         | TS2322                                         | 无需默认给所有组件添加 children               |
| Promise 返回值，Renderable 不含 Promise     | TS2345                                         | 不应在类型中提前承诺异步组件                  |
| JSX.ElementType 要求品牌时使用普通函数      | TS2786                                         | 组件边界可得到原生类型辅助                    |
| 更窄参数的回调传给更宽回调 prop             | TS2322                                         | 函数属性签名可保留严格参数检查                |
| 单选/多选可辨识联合 props 不匹配            | TS2322                                         | 模式关联可以由联合类型表达                    |
| noUncheckedIndexedAccess 下直接数组索引     | TS2532                                         | 数组越界不能被模型掩盖                        |
| NoInfer 限制 value 反向影响 items 推断      | TS2322                                         | 可用于选择器 API 的推断来源控制               |
| 泛型组件 `.d.ts` 生成                       | 通过，保留 `<T>`                               | TS7 可以作为声明生成器                        |
| 同一示例启用 isolatedDeclarations           | TS9010 / TS9007                                | 需要额外导出变量与返回值注解，不能无代价启用  |

实验使用 `strict`、`exactOptionalPropertyTypes`、`noUncheckedIndexedAccess`、`verbatimModuleSyntax`、`isolatedModules`、`erasableSyntaxOnly`，以及 `module: preserve`、`moduleResolution: bundler`、`jsx: preserve`。这些是研究设置，不代表全部已经确定为项目默认。

泛型组件的候选形态：

```tsx
const List = component(
  <T,>({ items, children }: { items: readonly T[]; children: (item: T) => Renderable }) => (
    <div>{items.map(children)}</div>
  ),
);
```

这段只用来验证类型推断，不能据此认定普通 `map` 已具有列表身份保留、细粒度更新或自动销毁语义。

可辨识联合在原始 TS 参数上的收窄，不保证转换成多个独立实时 getter 后仍语义安全。尤其是模式和对应 value 必须属于同一次读取，跨回调需要重新读取并验证，或显式捕获快照。

`const user = $derived(props.user)` 里的 const 会被 TS 视为稳定绑定，框架却可能把读取转换成动态 getter。跨回调沿用外层非空收窄不能仅依赖 `.d.ts`，需要专项诊断与实验。

事件类型建议使用原生事件，精确 currentTarget，并保留真实 target 类型。异步 handler 若需要使用 currentTarget，先在同步调用期间捕获元素，因为原生事件的 currentTarget 生命周期不等于 Promise 生命周期。

## 更自然的 props 候选

目前倾向明确组件边界后直接解构函数参数：

```tsx
type CounterProps = {
  initial?: number;
  step?: number;
  onChange?: (count: number) => void;
};

export const Counter = component(({ initial = 0, step = 1, onChange }: CounterProps) => {
  let count = $state(initial);
  const doubled = $derived(count * 2);

  return (
    <button
      onClick={() => {
        count += step;
        onChange?.(count);
      }}
    >
      {count} / {doubled}
    </button>
  );
});
```

这只是候选语法。`component` 提供明确编译边界、类型品牌和生命周期入口。与它比较的备选是普通函数体中的 `"use component"` 指令；不建议仅凭函数首字母大写猜测组件，也不建议让纯类型注解悄悄改变运行语义。

仍需确定的参数规则：

- 顶层简单解构、别名、默认值优先；嵌套解构和 rest 不能静默退化成快照。
- 只读参数绑定由编译器拒绝写入；Readonly<Props> 本身不能完成这一点。
- 若采用默认值首次需要时求值一次并按实例缓存，必须说明这与动态 fallback 不同。该建议尚未批准。
- `...rest` 应为排除指定键的响应式视图，并正确处理属性增加、删除、spread 覆盖顺序。
- `initial` 只在 `$state(initial)` 创建时取值；后续输入变化不自动重置用户状态。
- 深层对象 prop 的共享与写权限需要另定，不能把浅只读说成深隔离。

## 编译工具取舍

npm 本次版本观察：`@babel/core` 8.0.6、`oxc-parser` 0.152.0、`@swc/core` 1.16.13、`vite` 8.3.1。未对这些后端进行本地转换性能比较。

**Babel 8：当前原型首选候选。** parser、traverse、types、generator 的组合适合进行作用域绑定、引用和写入位置的转换。使用 Babel 不要求使用 React runtime，也不要求兼容旧 TypeScript。Babel 8 为 ESM，并自带类型定义；工具链需要匹配其 Node 要求。[Babel 8 发布说明](https://babeljs.io/blog/2026/06/16/8.0.0/)、[Parser](https://babeljs.io/docs/babel-parser)、[Traverse](https://babeljs.io/docs/babel-traverse)、[Generator](https://babeljs.io/docs/babel-generator)

**Oxc：性能方向的强备选，需区分 Node 与 Rust 接口。** Node parser 能解析 TSX，返回 AST、模块信息和错误，也提供 Visitor。本次检查的 Node 类型接口没有暴露可直接替代 Babel binding API 的作用域图；`showSemanticErrors` 是额外语义诊断开关，不能因此推断可操作符号图已经导出。Rust crates 有独立语义分析路线。Node parser 加自有作用域分析和打印器可行，但需要承担这部分维护成本。[Oxc Parser](https://oxc.rs/docs/guide/usage/parser)、[检查的 Node 接口源码](https://github.com/oxc-project/oxc/blob/7d28a666f133148fb8b95e1901940723bdfa3e20/napi/parser/src-js/index.d.ts)

Oxc 官方给出的 Node AST 打印示例使用 esrap。不要把 oxc-transform 的内置插件配置理解为任意 Babel 式自定义转换接口，也不要把支持 JSX 编译理解为自带细粒度 DOM 编译。[Oxc Transformer](https://oxc.rs/docs/guide/usage/transformer)

**SWC：具备完整编译基础设施的 Rust/Wasm 路线。** 需要考虑 Rust 工具链与 Wasm 插件开发成本。官方文档说明常规 Wasm 插件运行前已经处理 TypeScript 类型和 decorators；如果转换需要这些原始信息，必须验证阶段顺序或设计自有 pipeline。Wasm 插件兼容性从 1.15.0 起已有改善，不能继续声称所有版本升级必然破坏插件。[插件入口](https://swc.rs/docs/plugin/ecmascript/getting-started)、[阶段限制](https://swc.rs/docs/plugin/ecmascript/cheatsheet)、[兼容性](https://swc.rs/docs/plugin/ecmascript/compatibility)

**esbuild：可承担外围构建工作，不适合作为本框架唯一的 AST 转换接口。** 其插件不允许直接修改内部 AST；onLoad 可以调用外部编译器，但那仍然需要我们选择一个编译器。[官方插件限制](https://esbuild.github.io/plugins/#plugin-api-limitations)

**MagicString：局部编辑与 source map 的辅助工具。** 它不负责解析、词法作用域和类型分析。大规模结构重排、嵌套 JSX 和复杂赋值转换不能仅靠字符串替换。[官方仓库](https://github.com/Rich-Harris/magic-string)

**Vite 8 / Rolldown：开发与构建集成候选。** Vite 8 已使用 Rolldown/Oxc，旧版 esbuild 配置建议需要更新。框架插件应在 JSX 和类型信息被消耗前处理源文件，`enforce: pre` 是顺序工具之一，仍需验证具体 pipeline、依赖预构建和 SSR 路径。[迁移文档](https://vite.dev/guide/migration.html)、[插件顺序](https://vite.dev/guide/api-plugin#plugin-ordering)

## 建议的职责分工

```text
原始 TSX ── TS7 ── 类型诊断与声明输出
    │
    └── 框架编译器
          解析与词法绑定
          component / state / derived 语义检查
          响应式读写转换
          JSX 动态区域与 DOM 或 SSR 代码生成
          source map
            │
            └── Vite / Rolldown 构建
```

建议先使用独立核心编译函数，例如 `compile(source, filename, options)`，再接 Vite。不要把语义分析和转换逻辑散在构建钩子中，也不需要提前实现多个等价后端。

TS7 和框架诊断并行服务源代码；原生类型检查通过不代表框架语义通过。source map 能映射运行时栈和转换错误，但不会自动改变 TS7 对原始 const 和参数的控制流理解。

## 需要继续设计和验证的问题

1. **变量转换正确性**：导入别名、局部遮蔽、类型位置、对象简写、前后自增、短路赋值、解构赋值、求值次数和顺序。禁止用变量名字字符串匹配替代绑定分析。
2. **依赖图**：动态依赖清理、派生缓存、相等性、批处理、立即读取的一致性、循环检测。
3. **组件身份**：初始化次数、动态组件类型变化、props getter、不可见组件、错误边界与 context 所有权。
4. **children**：值、惰性内容和 render callback 的含义；重复插入会创建新实例还是移动已有 DOM；不能用 JSX.Element 的黑盒类型承诺只接受某一种子组件。
5. **列表**：key 相同但对象替换时如何读取新值，排序保留状态，删除销毁作用域，重复 key 的诊断，索引与普通 callback 参数是否持续更新。
6. **异步**：effect 同步跟踪边界、取消、过期结果、作用域跨 await、SSR 请求隔离。类型允许 Promise 不代表运行时已经有异步组件协议。
7. **输入与表单**：value/defaultValue、受控与非受控、IME composition、选区、数字空值、checked、多选和文件输入；双向绑定应建立在清楚的单向协议上。
8. **DOM 契约**：class、style、布尔属性、属性与 property 的区别、SVG namespace、自定义元素、原生事件、ref 与清理。
9. **SSR 与 hydration**：稳定标记、转义、浏览器自动修正 HTML、事件挂接和恢复失败策略。即便不进入首版，也不能让客户端公共类型彻底排斥它们。
10. **HMR 与诊断**：状态保留条件、旧作用域清理、编辑器原始 TSX 类型体验、框架额外诊断、source map 链和 Windows 路径。
11. **发布**：JS runtime 与编译器分包、JSX 类型 exports、声明生成、runtime helper ABI、依赖包预编译。源码格式不应要求消费者偷偷使用 TypeScript 6。

当前推荐仅用于后续评审：TS7-only 类型基线，标准 TSX，明确 component 边界内的参数解构，变量式响应式，独立 Babel 8 编译原型，Vite 8 接入。Oxc 与 TS7 unstable API 保留为进一步实验方向。
