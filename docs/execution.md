# 目标执行记录

## 2026-10-01：开始完整生产化目标

- 用户已授权持续实现，并允许有依据地调整目标细节、实现手段和测试。目标不再表述为“第一版生产可用”。
- 执行契约见 [semantics.md](semantics.md)；早期评审文档保留方案比较，执行决定以该契约为准。
- 上一轮提交 `ced1649` 的 [CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36748414921) 已通过。
- 已实现 REACT-01/02/03 的基础语义：状态读写、动态依赖、惰性派生、相等结果跳过下游、微任务调度、render/effect 优先级、作用域及逆序清理、错误隔离和循环 effect 防护。
- 冷派生不持有反向订阅；销毁可撤销队列任务；执行中卸载仍处理返回的清理函数。内部 Source/Derived 未作为用户 signal API 导出。
- 本地验证：21 项核心行为测试通过，core 类型检查、工具/测试类型检查与受影响文件 lint 通过。完整矩阵随推送交给 CI，不等待本轮运行。
- 下一步：属性级对象/数组状态与变量宏编译；依据实际职责拆包，保持错误信息和中文注释可理解。
- 用户补充授权：规划阶段可以按实情调整、精简、删除或扩展，包括增加必要 API；不机械照原工作包实施。

## 属性级状态

- 增加普通对象和数组代理、稳定代理身份、属性值/存在性/键枚举的独立跟踪，以及深状态整体替换。
- 数组变更方法取消机械性读取的跟踪；处理 length 截短及部分删除失败，不将简单 push 变成自订阅循环。
- 保留类、内建对象、不可扩展对象；已有代理禁止原地冻结和改原型。原始别名写入不通知，后续普通读取仍看到真实值。
- 核心测试增至 34 项并通过；core 与工具类型检查通过，修正测试中用于触发读取的 lint 写法。
- 第一阶段提交 `fa7cd29` 首次推送遇到 GitHub 443 连接超时，本地提交已保留，重试交付。接下来增加独立 compiler 包及真实执行的宏转换用例。

## 变量宏编译

- 独立 `packages/compiler` 已建立，只依赖构建侧 Babel 工具，不进入浏览器运行时。`compile` 返回代码与 source map，统一诊断包含文件和 1 基位置。
- `$state`、`$state.raw`、`$derived`、`$derived.by` 按词法绑定转换；宏类型保持普通值，未编译时明确报错。
- 支持闭包、别名和遮蔽、快照、赋值求值顺序、逻辑短路、前后自增与 BigInt。非法宏逃逸、只读写入、直接导出等形式有明确错误。
- 29 项编译器用例通过，使用真实运行时执行生成代码；state 的跨 realm 普通对象识别缺陷已通过此消费路径发现并修复。
- source map 用实际位置查询验证自增操作映射回原始行；生成节点继承原始位置。pnpm check 与 pnpm build 已通过，完整浏览器/LSP 矩阵继续由 CI 执行。
- Babel 8 实际类型名称是 FileResult，使用显式公共结果类型避免生成依赖内部路径的声明；移除 Babel 8 不再支持的旧 preset 参数。
- 网络问题已定位：系统配置了本地代理，但 Git 直连失败。仅在 push 命令使用既有代理地址，未修改全局配置；`fa7cd29`、`47a91b2` 已成功推送。
- 上一轮 `47a91b2` 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36752361355) 已通过。
- 下一步：组件边界与 props 转换、基础 JSX DOM 输出。编译器当前明确拒绝尚未实现的 JSX 输出，示例仍是工程探针。

## 组件输入与默认值

- component 的内联同步函数已支持 props 对象入口、顶层解构、别名、缓存默认值和实时 rest。组件泛型签名通过函数代理保留，不退化为 any。
- 事件闭包读取最新 props/回调；局部状态只取创建时初值。显式属性缓存求值，spread 保留增删和从左到右覆盖顺序。
- 修复默认表达式搬移后的词法捕获风险：自身/后序引用、函数体变量以及同名遮蔽均有诊断；复杂嵌套解构不静默变成快照。
- 18 项新增组件/props 用例通过，相关类型检查和 lint 通过；上一轮 `f03a07d` 的 [CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36753238331) 已通过。
- 下一步接入 JSX 渲染值协议、DOM、原生事件与 Vite 插件；当前组件输入已可独立验证，尚不能以此宣称浏览器组件运行时完成。

## JSX、DOM 与真实消费入口

- JSX 编译为稳定的渲染描述，组件初始化一次，动态文本/属性/区域分别更新；静态子节点不建立无用的动态区域。
- mount、Fragment、条件区域、动态标签和 key、原生事件、style/CSS 变量、SVG 命名空间及可清理 ref 已接入。每个 JSX 插入点拥有独立实例和作用域。
- key 改变才重建该位置的实例；替换 spread 对象但 key 不变时保留实例并读取新输入。修复了缺失 spread 属性新增时未通知默认值读取的问题。
- 新增实际承担集成职责的 `packages/vite`。CSR 示例已经使用 App.tsx、包产物与 Vite 8 插件；SSR 探针保留到真正 hydration 接通时移除。
- JSX 类型来自本框架；新增 TS7 正反例覆盖泛型 children、原生 currentTarget、必填 props、只读 DOM 属性、组件标记和异步组件限制。真实 App 的原生 LSP 诊断完整返回 0 错误。
- 本地验收：全部受影响包和工具类型检查、lint、构建通过；5 项框架 Chromium 用例通过，覆盖状态保留、key 重建、分支/事件/ref 清理、属性增删、输入、CSS 变量和 SVG。编译/props 针对性单元用例均通过，完整矩阵留给 CI。
- 编译测试合并公共沙盒辅助函数，并按模块严格模式执行，减少重复接线。
- 上一阶段 `6bb2fe5` 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36755154158) 已通过。本轮本地选择 Chromium 交互用例，完整三浏览器矩阵在推送后运行，下次推送前再检查。
- 当前仍缺：稳定 key 列表、context/错误边界、完整输入行为、真正的 SSR/hydration、开发体验收尾与生产验收。已有 CSR 不代替这些门槛。

## 结构更新、context 与错误恢复

- For 已建立每 key 独立行作用域，row/index 经编译保持实时读取；同 key 替换对象保留行状态，排序移动原节点，删除及空态清理资源。重复 key 在改变现有行之前校验。
- 对新建的离线 DOM 使用普通插入；已连接节点优先使用 moveBefore，并提供焦点/输入选区恢复路径。浏览器实测发现了临时 DocumentFragment 不满足状态保留移动约束的问题，已据此修正；[接口约束参考](https://developer.mozilla.org/en-US/docs/Web/API/Element/moveBefore)。
- context 沿实例作用域继承，覆盖与独立根隔离；清理过程中仍能读到父级提供者。DOM 事件不继承触发者临时的依赖跟踪和作用域。
- ErrorBoundary 支持初始化、渲染、effect 的局部恢复；错误 fallback 再失败时交给外层。已在真实浏览器验证恢复后其他组件继续正常工作。
- 修复普通 render callback children 被误当成动态内容的问题；JSX 内联回调保持普通函数，只有 For 指定的位置获得实时参数语义。
- 组件与 For 回调可直接返回条件、逻辑表达式、数组或响应式值；分支只订阅选择结果，同一分支中的数据刷新不会重建实例，普通局部快照仍保持 JavaScript 语义。
- 示例按用途整理到 examples/ListExample、ContextExample、BoundaryExample，避免继续膨胀 App。编译器共享导入识别，DOM 范围操作独立为小模块。
- 前一提交 `a4fb124` 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36759988086) 已通过。本轮针对性单元、类型和浏览器验证记录随交付更新，完整矩阵交给下一轮 CI。
- 本地验证：作用域/context 与响应式用例、7 项 For 编译用例、类型正反例和构建通过；5 项结构浏览器用例通过，包含原生及兼容移动路径。已完成的框架浏览器回归也通过。
- 返回表达式改进后，58 项编译器用例通过；列表示例直接返回条件，并再次验证同 key 数据刷新保留草稿及分支实例。类型检查与 lint 已完成。
- 下一步：真实 SSR 与 hydration，复用当前模板和作用域契约；随后补齐输入归一化、IME、用户在 hydration 前编辑的状态、开发诊断和发布消费验证。
- 后续原生属性审计必须对齐类型和实际写入行为，尤其是 ariaLabel 等反射属性、表单 property/attribute 差异以及 SVG；不能以类型允许代替运行时支持。

## 真实 SSR 与 hydration

- 服务端使用独立请求作用域渲染组件、列表与错误边界。effect/ref/事件不在服务端执行，清理正常完成，SSR flush 不会冲刷其他根的任务。
- 客户端通过相同区域标记认领既有节点，整树验证后激活绑定与 ref；保留元素、文本、输入和列表节点，接管前输入可保留焦点/选区并通过回调同步。
- 严格不匹配报告 HydrationError，并撤销验证阶段的文本拆分；显式 replace 才重新挂载。错误边界不能吞掉结构不匹配，服务端降级区域在客户端局部重试。
- HTML 文本/属性、布尔/ARIA、CSS、文本专用元素共用规则；新增 JSON 数据独立入口 @zerodep-js/ssr/data，避免浏览器为编码数据加载服务端渲染器。
- 删除旧 view.ts 探针；同一 App 现在驱动 CSR、SSR 和 hydrate。浏览器用例已扩展到两种模式，正式三浏览器矩阵交给 CI。
- 本地证据：17 项 SSR 用例通过，24 项模式/结构/hydration Chromium 用例通过；追加原生文本、选择器和 JSON 用例后，6 项 hydration 专项全部通过。类型、构建和 lint 已验证，开发服务器 SSR + hydrate 冒烟也通过，临时服务与浏览器已关闭。
- 上一提交 `9e81825` 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36765806297) 已通过。本轮推送后继续执行，下次推送前读取新结果。
- 下一步继续补齐受控输入的同值归一化、IME、动态选项、平台输入差异，以及框架诊断、开发更新、性能与真实包消费等生产门槛。SSR/CSR 接通不代表目标已经完成。

## 原生表单契约

- 控件同步从普通属性写入中拆出，使用原生元素和事件，不增加用户侧 model/controller API。内部任务、监听器和组合输入定时器随作用域清理。
- 同值归一化会回写 DOM 并映射选区；冒泡处理器先得到用户输入；原生 change 提交支持编辑暂存。组合输入期间不覆盖候选文字，验证了两种结束事件顺序。
- checkbox/radio 接受和拒绝、单选组恢复、动态 select 选项、首次默认值、表单重置/取消、文件输入、接管前勾选与选择等已验证。
- 原生 reset 的默认动作晚于微任务校准，首轮浏览器用例暴露此问题后改为默认动作完成后恢复模型；未通过放宽断言或忽略错误解决。
- select 的空值转换、服务端选中状态、客户端匹配与接管校验使用同一规则；错误边界丢弃部分输出时恢复选择器上下文，避免影响 fallback。
- 原生回调每次读取最新 props；InputEvent 专有字段按可选类型表达，避免把 checkbox 的普通 Event 冒充 InputEvent。
- 清理旧的通用 value 写入分支，修复空字符串 option 在追加文本后退化为文本值的问题；空占位选项与 null 选择在 CSR/SSR 两条路径均有回归验证。
- 本地证据：21 项表单/接管 Chromium 用例、24 项选区与 SSR 用例通过；类型检查、构建和 lint 通过。前一提交 `b620b74` 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36772838089) 已通过。
- 下一步推进编译语义诊断、开发更新与独立包消费，再完成性能、资源稳定性和真实试点验证。真实平台输入法验证仍保留为生产门槛。

## 框架诊断与开发更新

- 编译器识别静态命名空间宏和 For 标签，复用命名导入的绑定转换。增加 `diagnose`、`zerodep-check` 命令、JSON 输出和标准输入源码快照，不另外实现一套检查语义。
- ZJ1501 检查实时 props/派生/可重写状态/列表参数在延后读取时继承旧收窄的问题，包括回调、await/yield、初始化分支与 JSX 的边界。安全写法和保守诊断范围写入 development.md，不承诺证明任意用户程序或外部断言。
- 同步 IIFE 不误当作延后回调；可辨识联合要重新检查相应判别字段。初始化 if 的文本更新缺口也已纳入诊断，不能只检查用户显式写出的闭包。
- 修复渲染调度的实际顺序缺陷：父区域重新收集依赖后仍先于子绑定更新。按作用域深度排序的小堆保持同深度入队次序，父分支失效时撤销子任务；已有错误隔离和 effect 顺序保持不变。
- props/rest 顶层 delete 与写入有一致诊断。项目 MCP 桥把框架错误与 TS7 原生错误合并，诊断接收同一文本快照，新进程加载最新构建，基础类型提示仍使用标准 TS7。
- 示例开发入口支持根模块 HMR，明确清理旧根、重置局部状态并重新 mount；首次 SSR 启动才 hydrate。编译失败保留旧应用，修复后继续更新。Vite 回调的模块边界补上确切 App 类型，避免 any 破坏 props 约束。
- 服务端开发加载改用 Vite SSR Environment Module Runner；新增独立临时消费项目验证实际更新与覆盖层恢复，并接入 CI。临时浏览器、服务、夹具和 LSP 探针均已清理。
- 规划取舍：不将自动状态迁移列为生产必需条件；下一阶段优先真实打包消费和原生属性审计，再推进资源/性能及业务试点。保留完整生产门槛，没有将工程演示当成生产验收。
- 本地证据：109 项编译器/调度用例、20 项 CSR/SSR 的 Chromium 组件/结构用例通过；pnpm check、pnpm build、开发更新验证、独立 LSP 错误/修复验证通过。相关文件格式检查通过。
- 当前会话直接查询 App.tsx 的 TS7 诊断完整且为 0，但返回仍无 framework 字段，说明旧 MCP 进程尚未加载桥接变更。下次重启 Codex 后再确认当前会话框架诊断；该差异不阻塞构建和独立检查。
- 前一提交 `e843c55` 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36778171148) 已通过；本轮提交后不等待新矩阵，下次推送前读取结果。

## 真实包产物与独立消费

- 包清单检查发现 dist/.tsbuildinfo 被打包、映射指向的源码缺失、core/ssr README 过时。现明确选择 ESM、声明、映射与源码，排除缓存及测试，并为四个包补齐准确说明、Node 范围和副作用声明。
- SSR 将 core 改为同版本 peer dependency，组件库采用同样约定，通过普通包管理共享运行时。安装验证不使用工作区 alias 或源码链接；源码只随包用于编辑器和调试。
- 增加 `pnpm test:packages`：在工作区外真实安装四个 tgz，用安装后的 compiler 与 TS7 构建泛型组件库，再打包/安装这个库，由客户端和 Node SSR 消费。夹具放在 tests/consumer，单独检查，无需建立额外 workspace 子项目。
- 该路径实际复现并修复了 TS7 声明问题：自然推断的 Template 无法通过公开包出口命名。core 现在导出 Template 类型，组件库可继续使用自然的 component 写法生成可移植声明。
- 该路径还复现了 compiler 公共类型泄漏 Babel 声明、要求消费者补装 @types/convert-source-map 的问题。公共 SourceMap 与诊断位置改用本项目的格式类型，消费者无需为编译结果读取补装 Babel 内部类型。
- 编译结果和 SSR 增加内部协议检查，协议不匹配以 ZJ_RUNTIME_ABI 在自身初始化前报告；单元用例验证错误先于应用状态初始化。普通模块不增加框架运行时依赖。
- 独立消费保持 skipLibCheck=false，验证必填 props、泛型 children、原生事件类型、CLI bin、exports、映射目标、SSR 请求隔离/转义、浏览器 CSR/SSR 节点接管、表单与卸载。小入口当前为未压缩 2656 字节，以 5000 字节作为该入口的回归上限；没有用此数值宣称整体框架性能。
- 前一提交 `d439ed5` 的 [CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36784130699) 在 Linux 开发更新验证中失败：依赖扫描按默认 JSX 错误发现 react/jsx-dev-runtime，随后更新超时。现让 Vite 常规转换与 optimizeDeps 的 Rolldown 扫描使用同一个编译 hook，并覆盖 .mts/.mjs 宏模块。
- 开发验证现在等待真实扫描与请求空闲状态，拒绝初始扫描错误/警告，保留原有无整页刷新、清理次数、状态重置、覆盖层修复与 SSR 更新断言；另检查无页面异常。修复后的本地验证通过，Linux 结果仍由本轮 CI 确认。
- 本地证据：独立打包消费、实际开发更新、106 项相关编译器/SSR 单元用例、pnpm check、pnpm build、格式与工作流静态检查通过。临时安装目录、tgz、开发项目、服务、浏览器和已修复的失败报告已清理，共享 store 未清理。
- CI 的 Linux 完整任务加入真实包消费，另增加 Windows 包消费任务；本轮不等待新 CI，下次推送前检查两者。未发布 npm，也没有将包消费通过视为生产验收。
- 依据实际问题将发布产物验证提前，它已直接改善公共类型与开发接入；下一步原生属性及类型/SSR 一致性审计，再推进资源/性能、异步业务试点和完整生产门槛。

## 原生属性与合法命名空间结构

- 修复 hidden=until-found、translate 的 yes/no、ARIA 与 MathML/SVG 布尔文本等序列化差异；普通可选原生属性允许显式 undefined。对象等非标量属性继续明确报错。
- 原生属性先按真实名称合并，再比较最终值，修复较早的 class/aria/SVG 别名更新覆盖较晚稳定值的问题。null 会清除最终属性，删除别名键后较早值重新生效；undefined 表单模型不会遮蔽仍有效的首次默认值。
- SVG presentation 别名与 JSX 类型共享名称映射；按 HTML 解析器规则修正 SVG 属性大小写，仅折叠 ASCII 大写字母。XML、XLink、XMLNS 的写入、删除和接管检查使用相应命名空间。
- 补齐 SVG foreignObject/desc/title、MathML 文本集成点和 annotation-xml 编码的命名空间选择。普通外部节点不因遇到 math/svg 字面名称就错误切换，动态分支保留真实父容器上下文。
- JSX 加入 TS7 的 MathMLElementTagNameMap、MathML 属性及正确 ref 类型。未知带连字符标签不再被强行当成 HTMLElement；有明确自定义元素类型时使用标准 HTMLElementTagNameMap 扩展。
- 新增独立 AttributeExample 与六个 CSR/SSR 浏览器场景，验证别名更新/清除、布尔与枚举、XML 属性移除、外部命名空间以及动态子树。现有两处全局 circle 选择器因新增 SVG 不再唯一，已限定到实际验证的图形，原断言保留。
- 本地证据：28 项相关原生/输入/SSR 单元用例通过；37 项 Chromium 属性、表单、组件与接管用例均完成验证，两个选择器用例修正后定向复跑通过，新增六项最终复跑通过。类型检查、lint 和构建已通过；Unicode 名称追加修改有专项单元验证。
- 上一提交 `6b520ae` 的 [CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36786892898) 中 Windows 包消费任务通过；Linux 完整任务在快速修复源码后的开发更新等待中失败，初始依赖扫描已无 React 错误。
- 对照实际监听器源码，确认 change 事件存在 50 毫秒合并窗口，Linux 的修复写入落在其中且没有第三次通知。示例与开发夹具统一使用 awaitWriteFinish 的完整写入检测，稳定窗口 100 毫秒、检查间隔 20 毫秒；没有给测试增加固定 sleep、重试或跳过。完整开发更新验证在本地通过，Linux 再验证交给本轮 CI。
- 原生审计尚未结束：非反射 DOM property、自定义元素对象输入/事件，以及 style 对象的名称、priority 和值边界仍需修复。具体支持与缺口见 native-elements.md，不把可写 DOM 类型等同于已实现属性行为，也不把本轮标为生产验收。

## DOM property 与自定义元素

- 新增标准 TSX `prop:*` 客户端绑定及 `oncapture:*` 精确事件捕获。property 排在结构更新后、用户 effect 前，SSR 省略并跳过直接表达式；普通 spread 构造继续遵守 JavaScript 规则。
- 解除绑定、卸载和同步 setter 触发卸载均释放传入引用、恢复初值；原型成员不留下实例覆盖，内建反射成员恢复原本缺失的内容属性。只读检查先于接管，避免清理再次尝试写入只读布局结果。
- 已注册自定义元素支持对象与函数输入；未注册元素明确报错，可在注册后通过 ErrorBoundary 重试。精确事件名、捕获顺序和外部表单 form/list/for 关联已有 CSR/SSR 验证。
- 类型排除 DOM 的宽泛索引签名，保留真实可写成员约束；HTML/SVG 同名标签按成员分支推导。框架拥有的子树、样式和表单模型不能通过 property 绕过原有契约。
- 本地证据：25 项相关单元用例、9 项 Chromium property 用例、pnpm check 与 pnpm build 通过；form/list 用例按真实 combobox 角色修正后通过，原断言未减弱。完整三浏览器矩阵留给 CI。
- 上一提交 `210193b` 的 [CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36790758559) 已全部通过，含 Linux 开发更新及 Windows 独立包消费；之前的快速保存问题已有远端复验。
- 同步更新主计划和工作包状态。用户允许类型生成与合适依赖，不设置包大小/速度硬指标；包消费脚本改为记录体积，保留真实模块隔离断言。用户已授权完成验收后使用环境变量 token 发布 npm 包，无须再次确认，凭据不进入仓库或日志。
- 下一步处理 style 的 CSS 语法边界、名称与声明顺序，以及原生类型覆盖。现有进度仍不代表完整生产验收。

## CSS 声明一致性与生成类型

- style 在 CSR、SSR 与 hydration 共用完整声明文本，客户端按文本变化替换整个属性，删除原先逐属性写入分支。修复 shorthand/longhand 的顺序与旧值残留、important priority、无效值和对象/字符串切换。
- 样式词法采用固定版本 `@csstools/css-tokenizer` 4.0.2；本项目只检查单声明边界与括号闭合，不自写 URL、转义和注释解析器。属性名与别名按规范化身份合并并保留最终声明次序；完整字符串仍交给浏览器处理声明列表。
- CSS 类型采用 `csstype` 3.2.3 生成数据，补齐 camelCase/连字符/厂商/SVG 属性和 CSS 变量，导出 StyleObject。长度不隐式增加 px，cssText 与任意对象值不再被错误允许。依赖纳入 catalog、锁文件及实际包清单。
- 文本、属性和样式统一替换 NUL 与孤立代理项，保留完整 Unicode。新增 StyleExample，覆盖属性级更新、声明覆盖、错误恢复、SVG/MathML 和无脚本 SSR 首屏。
- 本地证据：51 项相关单元用例、7 项 Chromium 样式用例、所有受影响类型检查、框架诊断、lint 和构建通过。示例删除字段的首次类型错误通过显式可选字段修复，并复跑通过。真实 tgz 消费确认新依赖可安装、声明可解析，SSR/CSR/卸载通过；数据小入口仍为 2656 字节，未引入样式解析器。
- 上一提交 `abb693d` 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36797266902) 已通过。本轮提交后不等待 CI，下次推送前检查。独立安装项目和相关服务/浏览器由验证脚本清理，未清理共享 store。
- 下一步审计原生 HTML/SVG 类型覆盖与反射差异，随后推进资源/性能基线与异步业务试点。

## 原生属性生成与内容容器

- 增加可重复 `native:generate` / `native:check`，生成 HTML 内容属性类型、SVG 别名/类型和常用事件名称映射；check 与 CI 检查产物同步。固定 property-information 7.2.0、html-element-attributes 3.5.0 作为维护侧数据，生成结果及第三方许可随 core 分发。
- HTML 补充属性按标签限制，保留已有 DOM/表单精确类型；SVG 补齐滤镜、图案和动画，事件仍从 TS7 原生事件表推导 currentTarget。生成源码包含 386 个 HTML 名称、547 个 SVG 名称与 97 条事件映射，包含别名，不将数字解释为独立平台能力数量。
- 实际类型检查发现同名标签联合推导过度复杂，已将 HTML 补缺限定在相应 HTML 分支。既有 label.form 负例发现数据源中的历史属性不符合现代关联语义，已在脚本中排除，保留原有负例。生成数据没有替代人工语义判断。
- 修正 form.encoding 和表格 ch/chOff 的内容属性映射，并限定标签与命名空间；链接 username/password 进入显式 property。普通 template 的 CSR 与接管统一使用 content，已验证节点保留、更新和卸载。is 与声明式 shadow root 需要不同的实例化/接管协议，当前明确拒绝，不提供无效类型承诺。
- 本地证据：16 项相关原生/SSR 单元用例、8 项 Chromium 属性场景、pnpm check、pnpm build 和真实包消费通过；生成后的属性类型正反例均通过。类型用例的一处错误注释位置已按实际诊断行修正，没有移除断言。临时消费目录及服务/浏览器由脚本清理。
- 上一提交 `2214a2f` 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36798444904) 已通过。本轮提交后不等待 CI；下一阶段推进资源/压力与异步业务试点，继续按下一次推送前检查远端结果的方式执行。
- 当前会话原生 TS7 LSP 对新增属性示例完整返回 0 错误，生成声明在原生服务中可解析；框架诊断桥的新进程确认仍按原记录保留，不把原生诊断代替编辑器扩展验收。

## 资源回收与稳定性基线

- 压力检查复现临时属性依赖的强引用残留：同样查询 500 个不存在的字段并销毁观察者，对上一提交源码与修复后的实现执行相同五轮 GC，原实现仍保留 500 个键，修复后为 0。两者的对象实际字段均为 0，问题来自内部缓存。
- 字段缓存改为弱引用，仍存活的观察者和冷派生保持依赖；回收回调检查缓存身份，避免删除同名的新订阅。修改后状态、派生、props 默认值和调度的 42 项相关用例通过。
- 异常路径另复现 getter 在登记字段依赖前抛错，替换 getter 后旧异常仍被缓存。现对失败读取也登记依赖，新增负例先复现再修复，状态专项 14 项通过；合计 43 项相关单元用例完成验证。
- 增加 test:stability，验证依赖/作用域周转、临时字段与冷缓存、清理失败恢复及 SSR 请求隔离。本地每组 1,000 轮通过，作用域与查询键抽样残留均为 0；CI 每组 5,000 轮，耗时和堆增量仅记录。
- example 增加根外的重挂载入口，并让 HMR 共用同一卸载/重挂载函数。真实浏览器分别从 CSR 和 SSR 启动，反复替换整根并留下输入/表单延后工作，验证旧事件不会影响新根，property 引用和旧节点可以回收，之后仍能重新挂载交互。
- Chromium 两种模式各 40 轮通过，各 120 个抽样引用均已回收。CI 三浏览器每种模式 200 轮；相应增加测试与工作流运行时间窗口，不用短超时当成性能预算。报告写入 JSON 并上传独立 artifact；发现内存附件未落盘后改为显式报告文件，CSR 专项复跑确认文件和断言均通过。
- pnpm check、pnpm build、工作流静态检查通过。Node 报告保存在独立 reports/stability 目录，避免 Playwright 初始化清空；这些观察报告不进入 Git。
- 上一提交 `bb1ca65` 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36800149544) 已通过。本阶段提交后不等待新矩阵，下一阶段优先真实异步业务试点；资源基线不替代最终生产验收。方法和边界见 stability.md。

## 持久化业务试点与实际 API 反馈

- 在现有消费项目增加 `/tasks`，使用独立 HTML/客户端入口和共享 SSR 入口，支持保留查询条件的 CSR/SSR 切换。任务组件也可在验证页打开/关闭，检验真正的异步组件销毁。
- Node 24 SQLite 保存任务，预编译 SQL 绑定参数，更新/删除用 revision 拒绝过期写入；已有其他用途的数据库不被接管。共享 Zod 数据契约校验输入、输出和初始化 JSON。普通运行保留 `.data/tasks.sqlite`，Playwright 明确使用独立内存数据库，文件持久化测试只删除自己创建的临时目录。
- 业务用普通状态、props 默认值、For、effect 与 AbortController 表达，没有增加通用 resource/controller API。验证同 key 刷新和重排保留草稿/焦点/选区，提交后继续输入不会被早期响应清除，旧查询结果与取消请求不影响新状态。
- 冲突处理保留编辑行与草稿，避免服务器改名后不再匹配搜索而在自动重查时丢失输入。网络失败、服务错误和重试有明确界面状态；本机 Host、写请求来源、JSON 格式与大小均有实际 HTTP 用例。
- 试点复现并修正 ZJ1501 误判：派生布尔值的数据依赖不是 TS 条件别名。新增两个编译正例及配对 TS7 负例，原有跨回调/await 收窄拒绝用例保留；27 项诊断用例通过。
- 试点还复现 noscript 导致严格 hydration 失败。现将其作为服务端备用内容，客户端不初始化该子树，并检查可提前结束 noscript 的序列化输入。13 项相关 SSR 用例通过，原失败业务用例定向复跑通过，没有改为宽松接管或删除备用提示。
- 本地证据：4 项数据库/输入用例、27 项编译诊断、13 项 SSR 用例通过；10 项 Chromium 业务用例全部完成验证，后续冲突过滤和网络错误修改有定向复跑；原验证页的 5 项 Chromium 冒烟通过。pnpm check 与构建通过，相关文件格式检查随提交完成。
- 桌面和 390 像素手机布局已查看，无页面异常或横向溢出；辅助文字提高了对比度。实际开发入口验证了 TaskBoard HMR、局部状态重置、SSR 模块更新和源文件恢复，文档身份未改变。探针改以文档请求及 document 身份区分整页刷新和 history.replaceState；Vite 8.3 的 WebSocket 配置改为 server.ws，消除旧配置警告。
- 验证浏览器、内存数据和两个临时服务均已关闭，端口停止已核对，未创建或清理日常用户数据库。上一提交 `71e83ec` 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36803121717) 已通过，包含每组 5,000 轮 Node 稳定性及三浏览器每模式 200 轮整根替换。
- 下一步收尾编辑器/实际输入体验、支持与发布文档、许可证、版本及回滚流程，并核对本阶段完整 CI。试点基线通过仍不代替最终生产验收和注册表安装验证。

## 发布名称、许可与编辑器协议验证

- 公开包名统一为 zerodep-js、zerodep-js-compiler、zerodep-js-vite、zerodep-js-ssr，核心导入更直接，并避免引入额外 npm 组织要求。名称的只读注册表查询当时均为 404；这不是发布权限或将来仍可用的保证。历史执行记录中的旧名称保留为当时证据。
- 原始源码、编译器识别、Vite、JSX 配置、工作区依赖、消费夹具、LSP 检查与当前使用文档同步调整，没有为尚未发布的旧名称留下兼容层。私有示例项目仍保留原名称。
- 项目与四个发布包补齐 MIT LICENSE、作者、仓库目录、问题入口和公开 registry 配置，许可证沿用维护者现有项目约定；包仍为 private / 0.0.0，未执行 npm 发布。
- 新增入门、API 参考、支持范围、贡献约定、变更记录和发布回滚文档，明确首次发布没有历史稳定版本可退、先验证候选再提升稳定 tag，以及不盲目重发或 unpublish 的流程。
- 85 项相关编译/组件/宏/SSR 用例、pnpm check、构建、新名称下的真实 tgz 消费和开发更新通过。独立消费仍检查声明、预编译库、CSR/SSR、接管、卸载及模块隔离，小入口观察值为 2621 字节，不设硬上限。
- 独立 LSP 验证通过错误/修复、补全、跳转、引用、依赖刷新、框架诊断和项目隔离；新增标准重命名验证，覆盖响应式变量、组件导出及跨文件 JSX 引用。所有临时探针已清理，只停止本次启动的服务。
- 当前会话原生 TS7 对任务组件诊断完整且为 0，对事件能返回 MouseEvent 与 HTMLButtonElement。WebStorm 能识别项目并解析普通状态变量类型，但对故意类型错误未给出可靠结果，文档查询和重命名出现超时。日志同期开启编辑器时存在 AI 插件类加载异常，尚不能证明因果关系；IDE 验收保持未完成，未改全局 IDE/插件设置，也没有把空结果算通过。
- 上一提交 `d6171da` 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36810421900) 已通过。本轮继续按提交前检查上轮、提交后不等待的节奏交付，后续完成实际输入/IDE 复验和候选发布流程。

## 发布执行工具、浏览器编辑管线与 IDE 复验

- 增加 release:check/prepare/pack/status/publish/verify-registry/promote。四包同版本，固定干净提交的 tgz 与 SHA-512，复用原产物；检查 CI 后发布 next，精确 registry 安装通过才允许稳定版本提升 latest。历史状态只读，部分发布可核对后恢复，禁止覆盖异质产物或自动 unpublish。
- npm 凭据仅经子进程环境传入；临时配置只保存变量引用，发布命令显式固定官方 registry，测试不加载用户级 token。独立临时仓库用真实 pnpm pack 验证重复打包、篡改/路径越界/私有包拒绝、版本准备和脏工作区拒绝，已通过；当前四包仍是 private / 0.0.0，未实际发布。
- 新增 Chromium CDP 编辑管线用例，CSR/SSR 共四项通过。覆盖拼音候选、外部模型更新不打断组合、提交、UTF-16/Unicode 选区替换及取消；Firefox/WebKit 不运行 CDP 专属用例，原有跨浏览器组合事件覆盖继续保留。
- 初始用例将所有 CDP 事件都断言为 isTrusted，结果发现 compositionend 与其他编辑事件不同。以未接入框架的原生 input 对照确认相同行为后修正该断言；仍验证其余编辑事件受信任和提交事件存在，没有修改运行时或删除行为断言。这些证据不等于操作系统输入法试点，已请用户实际检查。
- 用户重启 WebStorm 后，IDE MCP 的事件文档、状态变量重命名及跨文件组件/JSX 重命名均恢复并通过；用户确认故意错误显示 TS2322。修复后独立 TS7 对两文件均报告 complete/0 错误，临时文件已删除。
- IDE MCP get_file_problems / lint_files 仍对已知 TS2322 返回空。当前 MCP Server 262.10968.92 的调用路径等待文件/索引后运行 runMainPasses；未发现项目级修正开关，也未证明是缓存。自动化诊断采用项目原生 LSP/CLI，记录工具限制，不把空结果算通过；未修改全局 IDE 配置。
- 本地类型/配置检查和构建通过，发布集成用例及四项原生输入用例通过。上一提交 `d7e8c42` 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36813778034) 已确认成功；本轮新增用例的完整矩阵在下一次推送前核对。
- 用户要求直接使用 Computer Use 验证真实输入法。Windows 工具初始化并启动 Chrome 成功，但读取窗口时因不能可靠确定浏览器 URL 而终止该轮；未发送系统输入，也没有把这次尝试算通过。临时预览使用内存数据，真实平台检查继续保留为发布门槛。
- 随后用户实际试用并反馈“基本没问题”，附图可见本机 Windows、SSR 验证页和系统输入法候选窗口。记录为当前环境的真实输入基本验收，与两种渲染模式的浏览器编辑管线和三浏览器事件测试互相补充；没有推断未提供的输入法版本或全部平台支持。截图含用户其他应用信息，不复制进公开仓库。

## 最终 HTML 解析边界审查

- 在真实 Chromium 解析中复现 iframe 字符引用没有解码、动态注释变成文本、script 双重转义吞掉后续节点、plaintext 无法闭合和非 ASCII 首字母标签没有成为元素；均来自实际输出与 DOM 对照，不是仅依据扫描推测。
- raw-text 集合补齐 iframe/xmp/noembed/noframes，与 script/style 共用纯文本渲染、换行及结束标签检查。script 额外检查 HTML 注释/双重转义状态，不修改 JavaScript 字符串；JSON 仍使用 serializeData。CSR/SSR 共用检查，危险内容更新不会偷偷在两端形成不同语义。
- 统一 HTML ASCII 名称与 SVG 标准大小写，命名空间边界按同一名称解释；拒绝不可正常往返的名称和 plaintext，保留已有合法元素能力。新增示例验证 iframe 动态文本与自定义标签大小写，并保留节点身份、更新与卸载用例。
- 22 项相关单元测试、18 项 Chromium 原生属性/序列化/hydration 用例、pnpm check 与构建通过；完整三浏览器回归交给本阶段 CI。新增安全文档明确文本转义、JSON、可信模板、URL/srcdoc/CSS/property、请求状态与应用责任，不承诺任意代码净化。
- 官方 npm registry 的生产依赖审计完成，报告 No known vulnerabilities found；网络曾重试后成功，未将中间连接失败当结果。gitleaks 对截至 f79af98 的提交历史扫描成功，无检测项。后续候选继续核对产物与版本证据。

## 1.0.0-rc.1 候选准备

- 原始文本与名称修复已推送为 a62468f。使用 release:prepare 将四个公共包统一为 1.0.0-rc.1，并移除其 private；根与示例仍为 private。pnpm 锁文件重新计算后无内容变化，因为工作区依赖仍为本地链接，实际 tgz 中的依赖版本单独核对。
- 包级 README、变更记录、主计划和发布说明同步进入候选状态，尚未声称已发布 npm。内部 helper ABI 保持 1，本次是此前协议范围内的语义修复。
- 新版本的独立 tgz 安装、TS7 严格声明/泛型/事件类型、预编译组件库、CSR/SSR、节点接管、表单、卸载与模块隔离全部通过；数据入口观察值 2631 字节，无体积硬门槛。临时消费工程、服务和浏览器已由验证器清理。
- 下一步在候选提交上核对完整 CI、固定 SHA-512 产物，发布 next 并运行真实 registry 安装；这些步骤完成前不提升 latest，不把打包成功记作发布完成。

## RC1 发布完成及本轮范围调整

- 候选源码 a29419625773bfb4c6bdedf136496fbf6e7e2624 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36818853600) 成功。四个原始 tgz 固定于 .release/1.0.0-rc.1，SHA-512 与 npm 注册表完全一致；发布账户只读核对为 kenconnet666。
- 四包 1.0.0-rc.1 已实际发布。release:verify-registry 从官方 npm 精确版本安装后完成 TS7 声明、泛型/事件类型、预编译库、CSR/SSR、节点接管、表单、卸载和按需模块检查。2026-10-01T05:30:04.207Z 写入 registryVerifiedAt；临时消费工程、浏览器与服务已清理。
- [GitHub 预发布 v1.0.0-rc.1](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.1) 指向上述源码；四个原始 tgz 与 release.json 附件均已上传，标签 SHA 与 prerelease 状态已通过 GitHub MCP 回读。
- 发布使用 next，但实际 registry 为首次发布同时生成了 latest。最初合并凭据、标签和临时目录清理的长命令被自动审批以 blocked by policy 拒绝，未执行；经用户要求，将同一 pnpm 操作拆为单包且不含递归清理后，工具审批通过，npm 对删除 latest 返回 HTTP 403。相同配置下 pnpm whoami 正确，未继续尝试绕过服务端权限。当前四包 next/latest 均为 RC1，未宣称已清理；文档明确候选身份和精确版本用法。
- 发布工具新增真实标签回读、next 一致性检查与预发布 latest 提示；只报告和记录，不自动删除标签。临时认证配置只含环境引用，已删除；token 未写入文件或日志。
- 用户明确本轮收尾为 RC1 后的 zerodep-css 接入研究与讨论，不直接执行接入；稳定 1.0.0 与接入实现均留待后续。研究已基于两个仓库当前源码完成，CSS 仓库保持干净，未新增 CSS 依赖或实现。
- 探针证明逐属性 Derived 已阻止无关更新重复调用 css：首次 1 次，100 次 title 更新仍 1 次，color 变化增为 2 次，同值不增加；100 个不同颜色累计 101 条规则。另验证普通外部 className 不会被 css 自动合并，以及 raw 转 var 会改变无效值、important 和 initial 的层叠结果。
- TS7 直接导入实验确认 7.0.2 没有 createSourceFile；现有 CSS compiler 依赖该旧 JS AST API，且其可选 peer 限制 <7。讨论稿建议保留当前 Babel 8 路径并调整实际包边界，不用扩大版本声明冒充兼容。完整写法与取舍见 [.design/zerodep-css-integration.md](../.design/zerodep-css-integration.md)。

## 应用扩展：快照与生命周期

- 用户新增授权直接完善快照、生命周期、路由和 localStorage，CSS 暂不接入。方案写入 application-extensions.md，按现有核心加可选子入口组织，不新增无用途的包。
- snapshot 复制可枚举数据中的代理，再交平台 structuredClone；支持普通环/别名、Map/Set、错误 cause 与二进制视图，不能克隆的值仍报错，不用 JSON 代替结构化克隆。
- onMount 只在客户端提交后执行一次；createScope 提供有限句柄，getAbortSignal 在作用域重跑/销毁时取消，且先于用户 cleanup。SSR 不执行 mount，异步 await 不隐式继承 scope。
- 37 项相关单元、pnpm check、pnpm build、两项 Chromium CSR/SSR 生命周期与快照页面验证通过；纯派生资源创建、提前销毁、失败清理和类型负例均有覆盖。
- 暴露标准 AbortSignal 后，SSR 构建补齐 Node 类型声明依赖；没有给服务器混入 DOM lib，数据独立入口契约继续保留。上一提交 dfe566a 的完整 CI 已通过；本阶段完整矩阵提交后核对。

## 应用扩展：浏览器持久化

- 新增可选 zerodep-js/storage，不从核心根入口引入宿主逻辑。persistLocal/persistSession 支持稳定对象或 read/write，动态键、显式版本与迁移/校验，控制状态、写入合并和 flush/reset/remove/retry/pause/resume/stop。
- 挂载后恢复；默认值不抢先写回，损坏/更高版本数据保持原样并报错。首次恢复前的新编辑优先，同页和原生 storage 事件同步，外部提交取消旧排队写入；暂停不丢订阅，销毁和 pagehide 尝试提交后释放资源。
- 新增真实双实例/跨标签、SSR 接管前编辑、迁移与错误恢复用例；任务页已经持久化未提交的新任务草稿，切换 CSR/SSR 和重载可恢复。
- 21 项单元、6 项 Chromium、pnpm check、pnpm build 与后续类型检查通过。同步回调检查、不可替换字段预检、暂停中 reset、旧键待写快照和错误回调隔离都有回归。
- 上一提交 30d79f7 的 [完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36849104434) 成功。本阶段提交后继续路由，不等待完整矩阵；下一次推送前核对。

## 应用扩展：路由与实际任务空间

- 新增可选 router 子入口：defineRoute/defineRoutes、browser/hash/memory history、Router/Outlet/Link、route 上下文、守卫与重定向、取消/预加载、错误恢复和 SSR 数据快照。默认复用页面与布局，可用 key 明确重建编辑页。
- 控制器与 history 明确所有权；连续 pop 被拒绝时回到已提交索引，前台导航接管预加载后不受缓存淘汰影响，重复停止不误停后续挂载。SSR 客户端恢复首屏数据而不重复 loader，HTTP 状态/重定向由宿主发送。
- /workspace/tasks 使用既有任务 API，实现查询、编辑、草稿、离开确认和独立加载偏好页；保存响应不覆盖请求期间的新输入。SSR 连接断开会取消路由准备，整个应用卸载释放监听与资源。
- 23 项相关 Node、8 项 Chromium 路由用例、pnpm check/build 通过。TS7 原生 LSP 对实际页面返回完整零错误诊断；独立 tgz 的声明、子入口、快照/存储/路由、CSR/SSR、卸载与按需导入通过，补充默认复用/显式 key 的消费回归。
- 核对 [a8535b6 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/36852404610)：277 项浏览器通过，6 项因新增输入让旧“名字”模糊定位歧义而失败。定位已改为 exact，两项本地 CSR/SSR 回归通过；保留全部原有断言，完整矩阵交当前提交复验。
- 用户新增要求：完成这四项后整理 core 的 dom/runtime/storage 目录，再讨论 Vue 项目的独立新页面共存；不要求组件互用，不直接实现 Vue 适配或 CSS 接入。
