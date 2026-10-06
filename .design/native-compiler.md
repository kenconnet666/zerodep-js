# 原生 Go 编译器接入研究

日期：2026-10-06。状态：源码考察与隔离接入实验完成，生产实现尚未开始。本记录延续用户选择：保留传统编译器，同时研究直接嵌入 TypeScript 的 Go 后端；仅支持固定的 TS7.1，不增加旧版兼容层。

## 结论与边界

可行，建议在当前固定的 TypeScript Go 源码中加入 zerodep 的分析与 JS emit 转换，构建自己的原生二进制。现有 Babel 后端继续作为独立选择和语义对照，运行时及 `zerodep-js/internal` ABI 2 共用。

“一次编译”应定义为：同一版本的原始 TS/TSX 进入一个 TypeScript Program，复用解析树、绑定和检查结果；框架转换直接进入其 JS emit 分支，声明仍从原始树输出。不要求只有一次 AST 遍历，也不承诺 IDE、CLI、开发服务器三个独立宿主只启动一个进程。Vite/Rolldown 随后仍会解析生成的 JS 来打包；消除的是 Babel 对原始 TSX 的另一套解析和转换，而非打包器的必要工作。

本轮没有修改正在使用的原生 SDK、运行时或 Babel 编译行为，没有性能倍数结论，也没有安装 TTSC 或 Effect。

## 当前项目已经具备什么

- `packages/compiler` 已独立发布为 `zerodep-js-compiler`，不需要再从 core 拆一遍。11 个源码文件约 1,700 行非空代码，涵盖宏、组件、JSX、For、响应式收窄检查、开发元数据及 CLI。
- `packages/core/src/internal.ts` 已提供 state/source/derived、set/update、props/restProps、bindProps、element/dynamicElement、conditional/logical/liveRender 等输出协议。原生后端首先保持这些协议，不同时重写 DOM、SSR 或 hydration。
- `packages/vite` 当前顶层导入 Babel 编译器，生产转换、依赖扫描和 HMR 都直接调用它。要允许原生消费者只安装原生后端，需要调整这里的加载和依赖边界。
- 当前补全/导航 SDK 仅修复语言服务，没有任何框架 Go 转换。其固定源码和可复现构建流程可以作为原生后端的构建基础。

## 固定上游的实际扩展面

本轮以 `typescript@7.1.0-dev.20261005.1` 对应的 `50d70a3f5f453a79a4323b263165da51f656a4e3` 为基线；本地研究检出基于已含语言服务修复的 `9e15df3018ca4ff5d9abd118b187d80b684d693d`。Go 模块路径为 `github.com/microsoft/TypeScript/tsc`，要求 Go 1.27。

| 位置                                                          | 已核对的能力                                                          | 对方案的含义                                     |
| ------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------ |
| `tsc/internal/compiler/program.go` 的 `EmitOptions`           | 有目标文件、JS/DTS 输出选择及 WriteFile；没有自定义 transformer 参数  | 不能只给官方二进制传一个 Go 插件就接入           |
| 同文件的 `Program.Emit`                                       | 为源文件安排 emit，并持有同一个 Program                               | 保留其调度和错误门槛                             |
| `tsc/internal/compiler/emitter.go` 的 `getScriptTransformers` | 类型擦除、import elision、TS runtime syntax、JSX、ES、module 等顺序   | 在类型擦除前插入框架转换，不自行复制整套 emitter |
| `emitJSFile` / `emitDeclarationFile`                          | JS 与声明分别从源文件开始，各有 EmitContext                           | JS 改写不能污染声明和 IDE 使用的原始树           |
| `tsc/internal/binder/referenceresolver.go`                    | 可追溯标识符引用的值声明、导入声明                                    | 用声明身份识别绑定，避免重新实现完整词法绑定器   |
| `tsc/internal/printer/emitcontext.go`                         | factory、Original 链和 source-map range                               | 新节点复用官方打印、命名和映射机制               |
| `packages/typescript/src/api/options.ts` 与 async API         | 支持指定 `tsserverPath`、常驻 `--api`、快照、emit、选定文件的 JS emit | Node/Vite 宿主可优先复用官方实验性客户端         |

需要修正一个容易过期的说法：当前 7.1 nightly 已有 `emit`、`emitToString`、`getJavaScriptEmit`，不能说它完全没有程序化输出 API。但 `EmitParams` 只有 snapshot/project/emitOnly，没有 transformer 回调或 Go 插件装载协议；创建或打印 AST 不等于把转换安装进官方 emit。

同一版本还有 content mapper，位置在 `tsc/internal/contentmapper/transform.go`。它先从外部 mapper 获得虚拟 TS 文本，再调用 parser；适合外部文件格式接入，不是 TSX 检查后的 AST 转换钩子。如果 mapper 自己先解析 TSX 再打印 TS，仍然会产生二次解析，不符合本目标。

主要源码来源：[emitter](https://github.com/microsoft/TypeScript/blob/50d70a3f5f453a79a4323b263165da51f656a4e3/tsc/internal/compiler/emitter.go)、[Program](https://github.com/microsoft/TypeScript/blob/50d70a3f5f453a79a4323b263165da51f656a4e3/tsc/internal/compiler/program.go)、[API 协议](https://github.com/microsoft/TypeScript/blob/50d70a3f5f453a79a4323b263165da51f656a4e3/tsc/internal/api/proto.go)、[API 进程选项](https://github.com/microsoft/TypeScript/blob/50d70a3f5f453a79a4323b263165da51f656a4e3/packages/typescript/src/api/options.ts)。Context7 返回的旧 typescript-go API 资料只用于检索入口，以上结论以本地固定版本为准。

## 已有项目的参考价值

### Effect-TS/tsgo

本轮检查提交 `d1e539c4956bf4b2d1643c58e1477f7597b20d5b`。它通过固定上游、补丁、shim 和原生包发布，把额外诊断接入 TS 检查与 LSP；`upstream.json` 明确记录受支持的源码版本。适合借鉴诊断接线、固定版本和发布布局。它面向 Effect 的检查/编辑体验，并未提供可直接使用的 zerodep JSX/响应式转换。

来源：[项目说明](https://github.com/Effect-TS/tsgo)、[上游版本记录](https://github.com/Effect-TS/tsgo/blob/d1e539c4956bf4b2d1643c58e1477f7597b20d5b/_packages/tsgo/upstream.json)、[CLI 与错误门槛补丁](https://github.com/Effect-TS/tsgo/blob/d1e539c4956bf4b2d1643c58e1477f7597b20d5b/_patches/typescript/009-execute-tsc-emit.patch)。不引入其 Effect 功能、多版本匹配或 Oxlint 集成。

### TTSC

本轮检查提交 `8412cd77f0be2f7fc4fc53451f481950a45db7e7`。它有真实的 `EmitTransformPlugin`：插件在内置转换之前返回 AST，并共享 EmitContext。这比“只有文本替换”更接近目标，不能忽略。

但当前 `driver/emit_plugin.go` 自行拼装 JS emit/打印，然后把 DTS 交回上游；其注释也明确说明增量信息中的 JS emit 仍记为 pending。`driver/program.go` 把 checker pool 固定为 1，以满足它的跨文件插件访问方式。所检查的 Go import 仍是 `github.com/microsoft/typescript-go/shim/...`，与本项目当前 `TypeScript/tsc` 内部接口不同。

因此建议参考其 Original 节点、合成导入和声明分支的处理经验，暂不把它作为本项目原生编译器的必需依赖。直接接入当前 emitter，可少维护一套输出调度，也不必继承通用插件宿主的全部约束。尚未实际安装或做 TTSC 性能/兼容性验收。

来源：[插件接口](https://github.com/samchon/ttsc/blob/8412cd77f0be2f7fc4fc53451f481950a45db7e7/packages/ttsc/driver/plugins.go)、[emit 实现](https://github.com/samchon/ttsc/blob/8412cd77f0be2f7fc4fc53451f481950a45db7e7/packages/ttsc/driver/emit_plugin.go)、[Program/checker 所有权](https://github.com/samchon/ttsc/blob/8412cd77f0be2f7fc4fc53451f481950a45db7e7/packages/ttsc/driver/program.go)、[Driver 文档](https://ttsc.dev/docs/development/reference/driver-api/)。

## 隔离原生实验

实验源码保留在 [native_emit_probe_test.go](probes/native_emit_probe_test.go)。它只验证接入机制，不能作为完整框架后端使用。实验在临时 TypeScript worktree 中执行，使用两处临时接线：

```go
// compiler/emitter.go 的文件级测试挂钩；生产设计不用全局可变注册。
var researchTransform transformers.TransformerFactory

// getScriptTransformers 构造 opts 后、内置类型擦除之前：
if researchTransform != nil {
    tx = append(tx, researchTransform(&opts))
}
```

输入中的 `_state` 是探针专用的 ambient 泛型函数声明；只支持简单变量初始化和读取。引用通过原始值声明身份匹配，参数遮蔽不会被改写。实验不实现真实宏导入规则、写入、JSX、bind 或运行时 helper 注入。

实际输出：

```js
let count = __probeSource(1);
export function current() {
  return count.read();
}
export function shadow(count) {
  return count + 1;
}
```

同时输出的原始声明：

```ts
export declare function current(): number;
export declare function shadow(count: number): number;
```

两项实验均通过：

| 条件                                 | 源文件解析次数 | 框架 transform 次数 | 输出                                     |
| ------------------------------------ | -------------- | ------------------- | ---------------------------------------- |
| 有效原始源码                         | 1              | 1                   | JS、DTS、JS map、DTS map 共 4 份         |
| 增加 `const invalid: string = count` | 1              | 0                   | 1 个类型诊断，noEmitOnError 阻止所有输出 |

还验证了原始 SourceFile 身份不变、emit 后原始语义诊断仍为零、源码映射非空且指向原文件。没有验证每一个调试映射位置、所有导入形式、完整增量构建或运行速度。

复现方式：在上述固定源码的临时检出中加入两处接线，将探针复制到 `tsc/internal/compiler/native_emit_probe_test.go`，使用 Go 1.27.1 在 `tsc` 目录运行 `go test ./internal/compiler -run '^TestNativeEmitResearch$' -count=1 -v`。使用默认带标准库的测试构建，不加 `noembed`。输出证据见 [native-emit-results.json](probes/native-emit-results.json)。

## 建议的生产结构

```text
原始 TS/TSX
    ↓
TypeScript parser / binder / checker
    + zerodep 原始语义分析与诊断
    ├── 原始树 → 官方 declaration emit → .d.ts / .d.ts.map
    └── 独立 emit 树
           → zerodep Go 转换
           → 官方类型擦除 / ES / module 转换 / printer
           → .js / .js.map
                    ↓
              Vite / Rolldown
```

1. **分析原始树，保留检查对象。** 宏按导入来源及声明身份识别。一次分析登记宏、响应式读写、props/For 活跃绑定和渲染边界；禁止通过文本名称代替绑定，也不向检查器提交已经变成内部 cell 的代码。
2. **JS emit 前进行转换。** 先分析后生成，复用原节点来源与官方 factory。生成的 bind setter/getter 直接使用同一套读写降低逻辑，不靠再次绑定合成树来补找宏。普通非框架模块不新增运行时依赖。
3. **框架诊断独立于 emit。** 必须进入 `--noEmit`、增量检查和 LSP 共用的语义诊断路径；只在 transformer 里报错会漏掉这些入口。现有 ZJ 编号保持可识别，原生数字诊断映射、抑制规则和 JSON 格式需明确并测试。
4. **遵守 checker 与并发所有权。** 每个文件在其 checker 租约内分析，缓存结果绑定源版本/项目。每次 emit 使用自己的 EmitContext，不跨 checker 共享 Type/Symbol 对象，也不让客户端和服务端并发输出共用可变转换状态。
5. **最小上游补丁。** 框架源码在 zerodep 仓库维护，构建时放入固定上游 `tsc/internal` 下；变更集中在 emit、诊断和选项接线。框架 transform/analysis 不反向依赖 compiler，以免 Go import 循环。无需通用动态插件系统、go:linkname 或覆盖共享 npm/pnpm 文件。
6. **默认保留原声明。** 不把 `_state` 生成的 cell 和 JSX 内部模板工具暴露到用户声明。当前组件品牌和泛型继续由原始类型产生；必要的声明修改应单独论证，不复用 JS 转换树。

## 两种后端与安装边界

建议保留 `zerodep-js-compiler` 为 Babel 包，新增原生包（暂名 `zerodep-js-native`，不是已发布名称），提供原生 CLI、Node API 适配和平台可执行文件。普通使用者安装预编译 npm 平台包，无需 Go；维护者和 CI 用固定 Go 工具链构建，携带 TypeScript LICENSE/NOTICE 和标准库。

原生包还需提供 IDE 可选择的 SDK 目录，保留已经验证的 TypeScript 平台包识别信息和目录布局。不能假定把新的 npm 外层包目录填入 WebStorm 就能识别；必须再次核对状态栏、实际二进制及补全/导航，避免重现根目录显示版本正确却回退内置服务的问题。

Vite 保留一个集成入口，启动时明确选择 Babel 或 native，动态加载被选后端；当前硬依赖的 Babel 编译器改为明确的可选 peer。原生模式不因为 Vite 入口的静态 import 又把 Babel 装回来。缺少所选后端直接报错，不自动降级或按文件混用。最终包名与调用写法在实施前确认。

原生 Vite 适配优先使用精确锁定的 `typescript/unstable/async` 客户端，通过 `tsserverPath` 指向原生包的二进制，复用快照/文件更新/输出接口，而非重新实现一套通用 RPC。开发态/HMR 参数与原生编译缓存之间需要窄扩展，不能假定官方 API 已理解框架选项。

每个 Vite 项目持有常驻服务，文件变化更新快照。客户端/SSR 输出分别缓存，扫描与正常转换使用同一后端。原始文件、tsconfig/extends、package.json/解析结果、编译器版本、框架 ABI、开发/SSR 模式变化都需要使相关缓存失效。多环境可共享不可变输入，不能共享错误的输出缓存。

`getJavaScriptEmit` 会绕过部分项目 noEmit/noEmitOnError 设置；若借它满足 Vite 的按文件输出，必须先按明确的开发策略取得诊断，不能把有输出当成检查通过。CLI 继续使用正式检查与 emit 门槛。正式后端应把同版本代码检查与输出放在同一 Program/快照，不采用“先跑一次 tsc，再启动 Go 解析一遍”的外壳。

## 实施顺序与验收

| 阶段                | 工作                                                     | 验收重点                                                                                           |
| ------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1：原生 CLI 基础    | 固定上游接线、宏导入、state/raw/derived/by、读写、源诊断 | 别名/遮蔽、求值次数、复合/短路赋值、自增、禁止导出与宏逃逸；声明不泄漏内部类型                     |
| 2：组件与 TSX       | props 解构/default/rest、For、JSX/动态分支、spread、bind | 复用 ABI 2；现有组件/列表/绑定/DOM/SSR/hydration 行为一致；不能用普通 jsx-runtime 降低替代惰性语义 |
| 3：完整诊断与开发态 | 跨闭包/await 收窄、HMR 元数据、开发检查                  | 保持已有 ZJ 规则；开发状态迁移决策与 Babel 一致；切换后端整页重载                                  |
| 4：工具与分发       | 常驻 Vite、扫描、watch/build、LSP 诊断、npm 平台包       | 增量失效、client/SSR 分离、标准库定位、干净安装、WebStorm 实际加载正确二进制                       |

阶段 1/2 是局部试点，不作为完整后端交付。正式接受原生后端前，承诺的当前语法、诊断和开发态能力都要覆盖；不支持的路径应明确报错，不能静默由 Babel 兜底。

现有 Babel 用例作为第一份语义基线，公共输入、预期运行值、诊断编号和浏览器断言应能在两种后端运行。比较实际行为而非只比较生成字符串。重点保留 source map 精确定位、声明消费、Windows 路径、UTF-16、取消/服务释放、增量错误修复、SSR 和宿主适配测试。

性能在正确性后测：冷启动全量检查/输出、单文件热更新、无关依赖变化、声明输出和峰值内存。当前 Babel 不做完整类型检查，不能拿它的单文件转换时间直接与原生“检查+输出”时间比较；基准必须分别列明解析、分析、转换、检查和打包所含工作。

最大工作量在完整迁移现有语义与开发集成，而非本轮验证的几行 emitter 接线。当前证据支持采用这条路线，但不支持承诺某个加速倍数或将原生后端标记为已完成。
