# TSX 响应式审查

日期：2026-10-11。继续维护当前 zerodep-js；不实施全引用、响应式父类或组件重渲染模型。参考 Svelte 的边界，使用标准 TSX 表达。

## 确认的作者契约

```tsx
const Field = _component(({ model: form, label = '姓名', ...attrs }: Props) => (
  <input {...attrs} aria-label={label} bind:value={form.name} />
));
```

组件顶层参数解构、别名、默认值和 rest 直接读取最新输入，不需要 `_derived` 或额外的 props 宏。对象输入整体替换后，属性读取及 `form.name` 写回使用新对象；回调输入在事件发生时读取最新函数。初始化只执行一次，局部状态保留。

参数顶层仍只读；标量通过现有 `bind:value` 对应 value/onValueChange 协议写回，共享可写对象可以修改字段。自动响应性与写回是不同能力，不增加 `_bindable`、绑定字段名单或隐式参数引用。

普通函数参数、普通局部解构和返回值保持 JavaScript 取值。需持续计算时使用 `_derived`，包括派生解构；JSX 动态表达式中的同步调用也会重新求值。普通快照合法，不为所有取值强加错误提示。

## 本轮复现和处理

| 问题                                | 影响                                                                    | 处理与证据                                                                                        |
| ----------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 宏转换跳过整个参数子树              | `_state` 初始化函数或 `_derived.by` 内的命名宏未转换，误报宏逃逸 ZJ1009 | 保留对子表达式的遍历；macros.test.ts 执行嵌套状态及派生更新                                       |
| 派生解构预处理跳过整个工厂          | 嵌套派生解构未完全展开                                                  | 中间命名声明不重复展开，继续访问工厂；derived-patterns.test.ts 验证 20 → 30                       |
| props/rest 的只读诊断只检查直接赋值 | 解构赋值及 for-in/of 写入漏报，延迟到运行时抛错                         | 只遍历真正的赋值目标，保留默认表达式读取与共享对象深层写入；components.test.ts 正反例             |
| 上轮主题策略调整后验收未同步        | a049fe3 的 verify 与 Linux/Windows 独立消费失败                         | SSR 断言原声明、class 差异、请求隔离；独立消费断言实际颜色、特殊值回退和恢复原主题后的 class 复用 |
| props 的组合示例不足                | 单项测试通过，仍不易判断对象替换后绑定、CSS 和事件是否保持最新          | AuthoringExample/ProfileField 与 CSR/SSR 浏览器测试共同覆盖；不加 `_derived`                      |
| 文档仍混有历史契约                  | 快照与整体替换混淆；旧 head 子入口、任务/路由和 string CSS 描述误导使用 | 修正 semantics、authoring 与 production-plan；历史 Svelte 研究保留并链接本审查                    |

## 按领域复核

| 范围                | 当前能力及证据入口                                                                               | 保留的边界或不足                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| props               | compiler components、runtime props；别名/default/rest、惰性默认值、最新回调、spread 覆盖均有测试 | 参数内复杂嵌套/计算键解构暂不支持，明确诊断；可先解构对象再访问字段                                         |
| 状态与派生          | state/reactivity、macros/derived-patterns 测试                                                   | 普通取值不变为活引用；类、Date、Map/Set 不深代理；派生只读且不自动跨 await 跟踪                             |
| 组件/原生绑定       | transform JSX、typed-projection、forms/authoring 浏览器用例                                      | 组件写回仍使用回调对；TSX 不会自行检查赋值关系，需框架投影；select 类型还不按 multiple 区分 string/string[] |
| 类型和诊断          | 官方 TS7 + 框架诊断；projection 新用例验证解构模型字段及 readonly 拒绝                           | IDE 原生类型引擎与框架诊断不同；普通代码中的别名/外部函数不能靠语法分析证明所有只读写入                     |
| 条件/列表           | render.ts、loops.ts；loops 与 flow 测试                                                          | 组件初始化 if 不重跑；For 行参数只支持标识符，复杂解构用显式派生或子组件；普通 map 不提供 keyed 身份        |
| 生命周期/异步       | lifecycle/reactivity；取消、重入、失败清理、SSR 不执行 effect 的既有测试                         | 不跨 await 保留跟踪和作用域；普通请求检查取消/过期结果；没有自动异步呈现                                    |
| context/Portal/lazy | context、flow、lazy；上下文隔离与 CSS 主题/lazy 浏览器用例                                       | Portal 继承逻辑上下文，不自动迁移真实 DOM 上继承的 CSS 变量                                                 |
| CSS                 | transform/css、runtime、安全分类及 css-expressions/css 浏览器用例                                | 普通共享函数需在 JSX 或 `_derived` 内重算；主题 token 走 class；不安全连续值走 class 时仍可能积累规则       |
| SSR/接管            | 同步 renderToString、SSR CSS 请求宿主、CSR/SSR 组合测试                                          | 不直接渲染 Promise；服务端数据由应用准备；未扩展流式 SSR 或 Svelte 的异步边界                               |
| 开发状态            | development 测试继续覆盖编译改动                                                                 | HMR 不保证迁移资源、外部类实例或任意闭包；不把临时状态保留等同于持久化                                      |

“有既有测试”只表示已核对覆盖入口，不表示本轮重新执行全部用例或证明没有其他缺陷。本地只执行变更相关检查，完整平台和三浏览器以本轮提交 CI 为准。

## 与 Svelte 的取舍

- 参考 [$props](https://svelte.dev/docs/svelte/$props)：解构读取随父输入更新。TSX 用 `_component` 参数表达，不新增 `$props()` 式宏。
- 参考 [$derived](https://svelte.dev/docs/svelte/$derived)：计算依赖在同步求值中收集。保留本项目只读派生及原生解构共享结果的契约，不引入临时覆盖。
- 参考 [$effect](https://svelte.dev/docs/svelte/$effect)：明确依赖和清理边界。本项目继续同步生命周期与显式普通请求，不照搬异步编译机制。
- Svelte 的 prop 临时覆盖、`$bindable` 和对象所有权警告不等同于本项目现有契约，本轮不照搬。不会把自动读取最新 props 误写成“普通参数也能隐式写回”。

## 后续优先级

1. 先通过本轮缺陷修复与组合用例的完整 CI，恢复可信基线。
2. 如有真实业务需要，单独评估 select multiple 的写回类型收窄、For 解构便利和更明确的快照提示。提示应区分有意保存初值，不能见到取值就报错。
3. 退场动画需要卸载协调；响应式集合需要各自数据语义。两者是待讨论的新能力，不用小别名假装补齐。
4. 不新增 task/query/store/router、全引用函数、bx、自动异步上下文或通用扩展体系。

## 验证记录

- 初始三个回归用例先失败：嵌套派生解构未转换、props 解构赋值漏报、rest 循环写入漏报。修复后通过。
- 编译器相关六文件 100 用例通过，包含宏、组件、派生解构、绑定、诊断和开发转换。
- SSR 主题与 props 运行时两文件 10 用例通过。
- 官方 TS7 投影焦点用例通过：props 解构无派生包装，可写字段通过，readonly 字段仍报 TS2540。
- 当前会话 zerodep_js_lsp 已返回新示例的完整 TS7 与框架诊断，均为 0。并非仅依赖 IDE 空诊断。
- Chromium 的 authoring 焦点文件 9 用例通过，包含 CSR/SSR 的 props 解构、根对象替换、绑定、CSS、最新回调、实例保留及既有表单/快照/接管用例。
- 工作区外 tgz 独立安装通过：声明、泛型/事件类型、预编译库、按需打包、CSR/SSR、接管和卸载。覆盖本轮修正的主题 class 回退与复用断言；Linux 消费仍由 CI 验证。
- 变更文件 lint、格式及差异空白检查通过；示例客户端/服务端构建通过。完整平台、三浏览器及单元矩阵等待本轮提交 CI，不使用上轮部分成功结果代替。
