# Vue TSX 与独立 CSS 新方向研究

研究日期：2026-10-13，Asia/Singapore。

本文由用户明确要求保存在当前 `zerodep-js` 仓库并提交推送，供换机后继续。它记录研究与设计，不代表下述新项目、API、fork 或迁移已经实施。

## 1. 换机后先读这里

用户最新方向是：

- `zerodep-css` 保持独立仓库，包含框架无关的 core 和 Vue 适配器，未来可增加 React、Svelte 适配器。
- 新建 `zerodep-vue` 项目，包含 TSX 套件、UI 组件库、文档站三个子项目。
- TSX 套件使用 Vue 响应式及相关生态，输出能在 Vue 应用中使用的组件；不以兼容其他 UI 组件库的混合协议为目标。
- 新方向使用 **TypeScript 6**，不再把当前仓库的 TS7 限制作为新项目的前提。
- 优先直接引入 **`vue-jsx` 并增强**；用户也提出 **fork 一个版本借鉴/定制**，需要比较维护成本，不必坚持全部自研。
- 使用原生 `ref`，直接把 Ref 作为 props 传给子组件；子组件可以直接修改 `.value`，不要求通过 `emit` 更新共享状态。
- props 默认值保留集中的参数解构写法，例如 `checked = ref(false)`、`disabled = false`。
- CSS 采用 StyleX 风格对象 API，保留关键字注释、系统关键字和主题关键字；不再追求 `s` 链式对象。
- 保留显式 `bx` 变量绑定，绑定信息随 class 传递、组合，最终隐式合并到元素 style。
- 用户希望示例清楚直接，避免三元表达式和过度分散的配置。

**建议：以 `vue-jsx` 为上游，产品 API 放在 `zerodep-vue` 的 TSX 包；优先使用公开扩展点，必要时维护小范围 fork。Vue 本身继续作为依赖。**

目前没有创建 `zerodep-vue`，没有 fork 上游，没有安装新依赖，也没有修改当前仓库的实现、TypeScript 版本或 CSS API。此前本地已经存在 `zerodep-css`，不能把它当成空目录覆盖。

后续研究优先完成三个原型：Input、ToggleButton、泛型 Select。先验证共同的作者契约，再决定 VDOM/Vapor 和 fork 范围，不要直接迁移整个组件库。

## 2. 当前结论与尚未确定的选择

| 项目                               | 状态                       | 说明                                                            |
| ---------------------------------- | -------------------------- | --------------------------------------------------------------- |
| 新方向使用 TS6                     | 用户已明确                 | 精确固定一个 TS6 版本；研究环境已有 6.0.3，可作为起点           |
| 原生 Ref props，可直接修改         | 用户已明确，原生行为已探测 | 不复制 Ref，不隐式解包后再传递，不要求 emit                     |
| 采用 vue-jsx 作为基础              | 用户提出的优先方向         | 研究支持这个方向；还没有完成真实应用验证                        |
| 是否维护 fork                      | 待定                       | 用户允许研究该选项，尚未实际 fork                               |
| VDOM 还是 Vapor                    | 待定                       | 两者都值得验证；建议第一版只选择一种作者执行模型                |
| props 参数解构/default/rest        | 目标已明确                 | 上游已有实现，函数调用默认值等边界需要补测                      |
| children 的具体类型与接口          | 待定                       | 集中在 props 的作者体验是候选；底层仍需正确处理 Vue slot 上下文 |
| CSS 对象 API、bx 与 class 隐式绑定 | 用户已明确方向             | 具体类型、Vue 编译接入和合并实现尚未落地                        |
| bx 是否直接接受 Vue Ref            | 待定                       | 支持时应由 Vue 适配器读取，不让 core 依赖 Vue                   |
| 新项目包名、导出结构               | 建议稿                     | 下文名称用于解释职责，不代表已发布或已占用                      |

## 3. 上游版本与源码基线

外部版本会变化。下表是本轮读取 npm registry、项目文档和 GitHub 源码的结果，换机后应重新核对再安装；不要直接使用浮动 `latest`。

| 对象                | 本轮读到的结果                           | 实际含义                                                      |
| ------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| `vue-jsx`           | `3.3.0-rc.3`                             | 新主包，仍是 RC                                               |
| `@vue-jsx/runtime`  | `3.3.0-rc.3`，Vue peer 为 `^3.6.0-rc.10` | 不能仅凭主包 `vue: ^3` 推断可直接使用稳定 Vue 3.5             |
| `@vue-jsx/macros`   | `3.3.0-rc.3`，Vue peer 为 `^3.6.0-rc.10` | 宏工具链也有这一版本约束                                      |
| `@vue-jsx/compiler` | `3.3.0-rc.3`                             | Rust/Oxc 编译器，提供各平台原生包                             |
| Vue npm `latest`    | 最后一次核对为 `3.5.44`                  | 本轮较早读取 GitHub 发布页时为 3.5.43；以固定版本安装结果为准 |
| Vue 3.6             | 本轮官方发布页显示 `3.6.0-rc.11`         | 仍为预发布，不能记作稳定版                                    |
| TypeScript          | 已核实 `6.0.3` 包存在                    | 新项目明确选择 TS6，不使用 npm 最新 TS7 代替                  |
| `@ts-macro/tsc`     | `0.3.7`                                  | 上游推荐用于需要宏类型转换的 TSX 检查，尚未在新项目验证       |

源码阅读基线为 `vuejs/vue-jsx-vapor` 的 `minor` 分支提交：

```text
f8a8f98eeb8d0da2fc2b19a80c5593f4a87ea8ed
```

`vue-jsx`、runtime、macros 的 npm 元数据没有提供 `gitHead`；compiler 元数据给出 `bd84fba93151ec9a0ede29ca51fe5000b8263ea5`。因此不能把上述分支源码与每个已发布包视为完全相同，源码疑点需要对固定包版本做编译复现。

文档正在配合 3.3 改名及默认输出模式调整。本轮阅读的文档建议 `vapor: false` 默认 VDOM，而读取的部分 `minor` 插件源码仍保留 `interop` / `compiler` 配置形态。**实际集成必须以固定包的类型声明、导出和编译结果为准，不直接照抄新旧混合配置。**

参考：[迁移说明](https://vuejsx.dev/introduction/migration)、[渲染模式](https://vuejsx.dev/introduction/interop)、[Vue 发布记录](https://github.com/vuejs/core/releases)、[固定源码基线](https://github.com/vuejs/vue-jsx-vapor/tree/f8a8f98eeb8d0da2fc2b19a80c5593f4a87ea8ed)。

## 4. 直接依赖、扩展与 fork 怎么选

| 路线                      | 工作方式                                                | 收益                           | 代价                                              |
| ------------------------- | ------------------------------------------------------- | ------------------------------ | ------------------------------------------------- |
| 直接依赖并增强            | 上游 npm 包 + 自己的 TSX API、类型、前置转换和 CSS 适配 | 上游升级容易，不承担编译器发布 | 深层语义若无扩展点，外围转换可能复杂              |
| 保留上游结构的小范围 fork | 固定上游基线，只维护明确差异；可继续依赖未改动的上游包  | 能直接修正宏、类型、运行时协议 | 需要同步上游修复、测试和发布差异包                |
| 大范围复制后独立演进      | 借用初始实现，之后自行组织整个项目                      | 自由度最大                     | Rust 编译器、运行时、类型、SSR/HMR 都成为长期责任 |

建议采用前两种的组合：`zerodep-vue-tsx` 是稳定的产品入口；内部优先依赖上游，遇到真实阻碍再切换为对应的 fork 包。不要为改一个名字就 fork，也不要为了避免 fork 而堆多层输出补丁。

fork 的合理触发条件：

1. 所需语义发生在上游内部，公开入口无法保持正确性，例如样式对象在我们接管前已经被 class 归一化。
2. 外围实现必须多次解析/反改生成代码，导致 source map、HMR 或优化信息难以维护。
3. 有最小复现证明上游宏不能满足集中默认值、Ref 身份或类型推导契约。

如果 fork：保留 Git 历史、明确 upstream remote 和固定基线，差异按职责小提交；保留相关上游测试。发布自己的包名，业务包仅依赖选定的实现，不在同一应用加载两套状态运行时。

上游采用 MIT License；复制、修改和分发时保留原版权及许可声明。[上游许可](https://github.com/vuejs/vue-jsx-vapor/blob/f8a8f98eeb8d0da2fc2b19a80c5593f4a87ea8ed/LICENSE)

### 4.1 哪些已经有，哪些值得增强

| 需求                               | 上游基础/原生能力                    | 我们应承担的部分                                          |
| ---------------------------------- | ------------------------------------ | --------------------------------------------------------- |
| Ref 直接作为 props 传递            | Vue 原生可支持                       | 明确类型与约定，避免解包或复制                            |
| 子组件修改 `.value`                | 可写 Ref 原生能力                    | 无需发明状态更新协议                                      |
| 参数解构/default/rest              | vue-jsx 宏已有转换                   | 检查实例级默认 Ref、替换 Ref、字符串属性名、rest 动态变化 |
| JSX 优化、SSR/HMR 生成             | 上游已有实现                         | 保留并测试集成，不重新实现整套编译器                      |
| 自定义组件函数名                   | 宏 alias、HMR 定义函数名配置已有入口 | 命名统一后同时对齐编译、类型与 HMR                        |
| children/渲染回调类型              | 上游已有 slots 与泛型类型方案        | 决定是否提供 props 中的集中接口，保留惰性与上下文         |
| 对象 class + bx                    | 原生 Vue 会归一化 class              | 保留结构化信息，延迟到元素边界解析                        |
| 直接 `return <div />` 的 VDOM 组件 | 普通 setup 需要返回 render function  | 如选这种作者 API，需要明确的转换，不能只包运行时函数      |
| DOM 双向绑定                       | Vue 已有 v-model 行为                | 可提供符合 TSX 的表层写法，复用正确的 DOM 行为            |

上游公开了宏 API、宏别名配置和 compiler API，文档列出 `runtimeModuleName`。这些是候选接入点，**还没有证据证明仅替换 runtimeModuleName 就能覆盖所有 class、spread、SSR 和组件边界**。[宏配置源码](https://github.com/vuejs/vue-jsx-vapor/blob/f8a8f98eeb8d0da2fc2b19a80c5593f4a87ea8ed/packages/macros/src/options.ts)、[编译选项](https://vuejsx.dev/introduction/options)

### 4.2 已发现的默认值疑点

期望作者写法：

```tsx
({ checked = ref(false), disabled = false }: ToggleProps) => {
  // ...
};
```

读到的 `transformDefineComponent` 将顶层默认值交给 `getTypeAndValue`，同时让解构转换跳过顶层默认值的另一条处理路径。`getTypeAndValue` 覆盖字面量、对象、数组、函数、标识符和 null，但没有处理一般 `CallExpression`；`ref(false)` 正属于函数调用。

这说明需要针对固定发布包检查 `ref(false)` 默认值是否在转换中丢失。当前结论是**源码级疑点，未做该发布包的执行复现**，不要记作已修复或已通过。

修复契约不能只加一个表达式分支，还要保证：默认 Ref 每个实例独立、只在需要时创建、实例内保持身份；父级后来传入/替换/撤去 Ref 时行为明确；默认值不能被提升成模块共享对象。对依赖前面参数的默认表达式、函数本身作为默认 prop 的情况另做验证。

源码：[define-component](https://github.com/vuejs/vue-jsx-vapor/blob/f8a8f98eeb8d0da2fc2b19a80c5593f4a87ea8ed/packages/macros/src/core/define-component/index.ts)、[restructure](https://github.com/vuejs/vue-jsx-vapor/blob/f8a8f98eeb8d0da2fc2b19a80c5593f4a87ea8ed/packages/macros/src/core/restructure.ts)。

### 4.3 fork 的实际成本

宏和大部分运行时是 TypeScript，适合从局部差异开始。底层 JSX 编译核心是 Rust/Oxc，通过 N-API 和平台包交付。只修改 TS 包时可以评估继续依赖上游固定 compiler 包；修改 Rust 核心时，需要承担 Rust 构建、Windows/Linux/macOS 产物及相关测试。

先不要删除上游的 emits、slots、Options API 或另一渲染后端实现。作者层不用 emit，并不要求从上游内部删除事件机制；大量删减会增加后续合并成本，也可能破坏正常 Vue 组件行为。

源码：[compiler package](https://github.com/vuejs/vue-jsx-vapor/blob/f8a8f98eeb8d0da2fc2b19a80c5593f4a87ea8ed/packages/compiler/package.json)。

## 5. 渲染模式取舍

| 方向                          | 执行模型                          | 建议                                               |
| ----------------------------- | --------------------------------- | -------------------------------------------------- |
| Vue VDOM + vue-jsx            | setup 一次，render 随依赖更新     | 第一阶段的稳妥基线；使用当前上游 RC 组合时仍需验收 |
| Vue Vapor + vue-jsx           | 初始化一次，编译器生成细粒度更新  | 更接近当前 zerodep-js 的方向，值得并列验证         |
| 只用 @vue/reactivity 自建 DOM | 自行维护组件、DOM、清理和生态桥接 | 不建议作为主线，会重新承担大量已有框架责任         |

采用 vue-jsx 与采用 Vapor 是两个决定，不必绑定。为了开发体验一致，第一版应选定一种作者执行模型；不能让同样的组件函数写法在不同文件里有不同的状态初始化含义。

VDOM 中直接把返回 JSX 的普通函数当组件，会使函数体处于渲染过程；在里面创建 Ref 不能自动获得 setup 的持久状态语义。若希望作者只写一次函数和 `return JSX`，应通过显式 `component(...)` 边界转换。

Vue Router、Pinia、VueUse 等兼容性的基础是使用真实 Vue 组件实例与作用域。不要仅因为采用 Vue ref 就声称全部生态兼容。Vapor/VDOM 互操作、Teleport、KeepAlive、Transition、SSR、接管和 DevTools 仍需实际验证。

VueUse 本地源码中的 `tryOnMounted` 依赖组件生命周期目标，`tryOnScopeDispose` 依赖活动 effect scope，支持保留 Vue 实例与作用域的判断。[VueUse 指导](https://vueuse.org/guidelines.html)、[Vue 渲染函数](https://vuejs.org/guide/extras/render-function.html)

## 6. Ref props 的约定

### 6.1 推荐的作者契约

- 共享可写状态传 `Ref<T>`，子组件直接修改 `.value`，多层转发保持对象身份。
- 静态/单向配置可以继续传普通值；不强迫 `size={'small'}` 变成 `size={ref('small')}`。
- 不默认让同一个可写 prop 同时接受 `T | Ref<T>`，否则传普通值后修改的含义不明确。
- `onSubmit`、`onRemove` 等动作通知仍可用普通函数 props，直接调用，无需 emit 作者概念。
- 只读 computed 不应作为可写模型；有 setter 的 computed 可以作为外部校验或转换入口。
- Vue 的 `ComputedRef` 继承 Ref 相关类型；不能宣称单用 `Ref<T>` 类型就能严格排除所有只读来源。
- 不把业务状态 prop 命名为保留用途的 JSX `ref`；`ref` 属性继续用于元素/组件引用。

### 6.2 默认值和解构

`checked = ref(false)` 代表组件未获得外部共享状态时，使用自己的实例级状态。外部一旦提供 Ref，就使用外部对象，不复制其当前值形成另一份状态。

普通 JS 解构会固定对象引用：

```ts
const { checked } = props;
```

`checked.value` 的变化仍然响应，但父组件更换 `props.checked` 后，这个局部变量不会自动跟随。需要上游宏或我们的编译增强保持参数解构的实时读取。

普通函数和局部变量继续遵循 JavaScript：

```ts
const initial = checked.value;
const current = computed(() => checked.value);
```

第一行是快照，第二行是派生状态。不要重新实现隐藏 `.value` 的状态系统。

### 6.3 普通 Vue SFC 的调用边界

TSX 中 `count={count}` 传 Ref 本身。SFC 模板顶层 Ref 可能被自动解包，`:count="count"` 实际传值。本轮 SFC 编译探针确认了这一差异。

一种保持 Ref 的方式是普通对象容器：

```ts
const models = { count: ref(0) };
```

```vue
<Counter :count="models.count" />
```

该用例的编译结果保留 `models.count`。不要随意把容器换成深层 `reactive`，后者有自己的 Ref 解包行为。必要时提供明确的 Vue 边界组件，但不为每个 UI 组件强制维护两套模型 API。[Ref 解包规则](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#additional-ref-unwrapping-details)

## 7. 候选作者示例

以下是增强后的目标 API，**不是未修改的 vue-jsx 当前就能直接执行的示例**。包名、`component` 和 children 类型仍可调整。若选择保留上游 VDOM 写法，也可先显式返回渲染函数。

```tsx
import { ref, type Ref } from 'vue';
import { component, type Renderable } from 'zerodep-vue-tsx';
import { css, type ClassValue } from 'zerodep-css-vue';

const styles = css.create({
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    paddingBlock: '0.5em',
    paddingInline: '1em',

    color: {
      default: 'navy',
      ':hover': 'white',
    },
    backgroundColor: {
      default: 'transparent',
      ':hover': 'navy',
    },
    borderColor: {
      default: 'navy',
      ':hover': 'navy',
    },
  },
});

interface ToggleButtonProps {
  checked?: Ref<boolean>;
  disabled?: boolean;
  class?: ClassValue;
  children?: Renderable;
}

export const ToggleButton = component(
  ({ checked = ref(false), disabled = false, class: className, children }: ToggleButtonProps) => {
    return (
      <button
        type={'button'}
        disabled={disabled}
        aria-pressed={checked.value}
        class={[styles.button, className]}
        onClick={() => {
          if (disabled) return;
          checked.value = !checked.value;
        }}
      >
        {children}
      </button>
    );
  },
);

export const Page = component(() => {
  const selected = ref(false);

  return <ToggleButton checked={selected}>选中</ToggleButton>;
});
```

该示例只说明共享状态、默认值和样式组合，不代表完整 UI 交互/无障碍验收。children 的 `{children}` 写法需要我们定义如何映射为惰性 slot，不能直接把现成 VNode 永久缓存后反复复用。

## 8. CSS 独立仓库与 Vue 集成

### 8.1 职责划分

```text
zerodep-css
  core       对象声明、属性/关键字类型与注释、主题引用、合并、规则生成
  vue        Vue 上下文、求值、变量绑定、宿主生命周期、SSR 接入

zerodep-vue
  tsx        组件作者 API、类型、vue-jsx 配置/增强、JSX 与 CSS 桥接
  ui         组件、主题约定、交互与无障碍
  docs       文档站、示例、真实消费场景
```

依赖单向流动：CSS Vue 适配器依赖 CSS core 和 Vue；TSX 套件通过适配器或明确协议接入 CSS；UI 依赖 TSX 套件和 CSS Vue 适配器；docs 消费 UI。CSS core 不反向依赖 UI 或 TSX。

Vue 应作为共享 peer dependency，构建时避免打入另一份 Vue。未来 React/Svelte 适配器使用相同 CSS 核心，各自管理响应式和生命周期。

### 8.2 沿用的 CSS 方向

- `css.create` 创建可复用样式描述，允许模块级静态声明；不要在声明时就依赖活动组件或插入 DOM 样式。
- 主题/宿主在使用位置解析，支持嵌套 Provider 与每个 SSR 请求独立的宿主。
- 系统 CSS 关键字保持原始 CSS 含义，主题关键字通过主题变量引用表示。
- 属性、条件与关键字需要准确类型和语义注释；主题 token 应在适用属性中补全，不靠放宽为任意字符串假装类型验证。
- `bx` 是显式变量绑定意图，不自动把所有动态表达式变量化。
- CSS core 不维护第二套 reactive/effect；Vue 适配器利用 Vue 的渲染或计算作用域。

直接使用 StyleX 包与借用其 API 是两回事：这里研究的是运行时 CSS 和我们的 class/bx 协议，不承诺与 StyleX 编译结果或全部合并规则一致。

### 8.3 class 与 style 的合并

目标作者写法：

```tsx
<Button class={styles.external} />
```

组件内部：

```tsx
<button class={[styles.base, className]} />
```

内部默认样式在前，外部样式在后；描述在组件间转发时保持结构，最终到原生元素才生成 class 和绑定 style。

Vue 在创建组件 VNode 和元素 VNode 时都会归一化 class，`mergeProps` 也会归一化。普通对象会被解释成“键名是 class，值是真假条件”，因此不能把样式对象直接送入原生 Vue 然后期待它保留绑定信息。

候选实现边界：

1. JSX 编译/属性合并阶段识别结构化 class，保留其数据；不能等它变成字符串后再恢复。
2. 向我们的组件传递时使用内部承载字段或等价协议，作者看到的仍是 `class`；普通字符串 class 继续按其实际能力处理。
3. 子组件组合全部样式来源，原生元素边界统一调用 CSS resolver。
4. resolver 产生 Vue 可消费的 class 与元素级变量；显式 style 按既定顺序在生成的绑定之后合并。
5. SSR 走相同数据协议，不能仅靠 mounted 指令补写 style。

不要求作者写 `...css.props()`。未知外部 class 字符串可以保留，但无法解析其样式表并参与结构化属性覆盖。

覆盖语义需要显式测试：同一属性的默认/hover 声明是整体替换还是逐条件合并、null/undefined 的含义、简写/长写的书写顺序、被覆盖绑定的移除。此前倾向按属性声明组处理，避免父级覆盖默认颜色后残留子级旧 hover；这是待落地规则，不是现有 Vue class 行为。

### 8.4 bx 的取值时机

```ts
bx(size.value);
```

如果只在 setup 中执行一次，取得的是当时的值；`bx` 标记本身不会神奇地让表达式再次执行。可选方向：

- 在渲染或 computed 内求值样式/动态样式函数，依赖自然由 Vue 收集。
- Vue 适配器支持 `bx(size)` 或明确 getter 来源，在正确的作用域读取。

第一种更直接；第二种对 Ref 使用者可能更方便，但需要确定来源类型、绑定拥有者、清理、组件转发和 SSR 一致性。两者都不能把 Vue Ref 的识别实现放入框架无关 CSS core。

CSS-wide、无效值、特殊语法或变量化会改变 CSS 含义的值应保持原语义或回退直接规则，不能为优化改写层叠结果。

## 9. TS6、编辑器与 DOM 绑定

TS6 降低了当前 Vue/宏工具与原生 TS7 的对接压力，但不能直接当作 WebStorm 已完成支持的证据。

上游把基础 JSX 类型与宏/指令的语言转换分开：普通 JSX 可依赖类型声明，宏/指令可能需要 `vue-jsx/volar`、TS Macro 和 `tsmc`；SFC 则走 Vue Language Tools / `vue-tsc`。实际要验证 WebStorm 采用的服务能否加载所需转换，并检查错误定位、补全、重命名和声明产物。[上游类型工具说明](https://vuejsx.dev/typescript/volar)

自有宏只在 Vite 生效而类型侧不知道的情况不能交付。优先让公开类型能被普通 TS6 理解，确实需要宏类型转换时同步接入同一语义。

DOM 绑定可研究 `bind:value={name}`、`bind:checked={checked}`，也可直接保留上游 JSX `v-model`。作者层不使用组件 emit，不妨碍底层复用 Vue 的 DOM 模型处理。不要只用简单 `onInput` 替代完整行为：输入法组合输入、checkbox、radio、select、多选与数字转换均需覆盖。

普通事件继续使用真实 DOM Event 类型；不能把 React synthetic event 能力带进声明。上游研究基线的最新提交恰好修正了这一类型差异。

## 10. 本轮证据与限制

### 10.1 已实际执行

使用现有 `zerodep-css` 工作区安装的 Vue **3.5.43**，通过内存宿主 `createRenderer` 执行了短探针：

| 探针                               | 结果                                       |
| ---------------------------------- | ------------------------------------------ |
| 已声明 prop 接收 Ref               | `isRef` 为 true，与父级对象严格相等        |
| 子组件事件修改 `.value`            | 父级 Ref 改变，`nextTick` 后渲染文本更新   |
| 父级换成另一 Ref                   | `props.model` 跟随；普通局部解构保留旧 Ref |
| 状态更新期间 setup 次数            | setup 1 次，相关 render 4 次               |
| 两个实例的 `default: () => ref(0)` | Ref 不相等，修改一个不改变另一个           |
| `normalizeClass` 接收结构化对象    | 输出对象键名，证实需要适配                 |

使用同一安装树的 `@vue/compiler-sfc` 做了编译探针：

```text
输入：<Child :model="count" />
输出属性：model: count.value

输入：<Child :model="models.count" />
输出属性：model: models.count
```

这里的 `models` 是包含 Ref 的普通对象。内存渲染探针不能代替真实浏览器、输入法、SSR 接管或新 TSX 编译器的验证。

### 10.2 源码和文档核对

- 当前仓库 [class/style 协议](packages/core/src/native/style.ts)：已有结构化来源到原生元素边界的处理，可参考职责，不能直接当 Vue 集成实现。
- 当前仓库 [Button](packages/ui/src/base/Button.tsx)：提供真实复杂度样本，迁移时应保留交互、显式配色、禁用与内容契约。
- 本地相邻 `vue-core`：核对 shallow props、VNode class 归一化、DOM v-model 行为。
- 本地相邻 `zerodep-css`：已有 Vue context、computed/watchEffect 与清理接入；其现有链式 API 和隐式变量转换不能自动成为新项目设计。
- VueUse 的实例/作用域依赖通过源码读取确认；IDEA 未打开该参考仓库，没有把此次读取记作 IDE 类型验证。
- `vue-jsx` 宏、运行时、配置和 Rust 编译器源码，以及 npm 包约束已核对。

### 10.3 未完成的验证

- 未安装并运行固定版 `vue-jsx` 全链路，未复现其函数调用默认值疑点。
- 未验证新包在 TS6 + WebStorm 的实际补全/诊断。
- 未验证结构化 class/bx 在上游优化、spread、组件、SSR 中的完整接入。
- 未进行 Vapor 真实应用、互操作、SSR/接管和 HMR 验证。
- 未创建或发布 fork，也未把任一候选 API 记作正式接口。

## 11. 换机后的执行顺序

1. **确认项目与版本。** 拉取当前仓库并读本文；检查相邻 `zerodep-css` 是否存在及其 Git 状态。重新核对上游版本，精确固定 TS6、Vue、vue-jsx 及关联包，不用本机绝对路径作为发布依赖。
2. **建立最小上游基线。** 在用户决定开始实现后创建新项目，先让不带自有宏的 vue-jsx 编译、运行和类型检查通过。记录实际配置形态以及所用 VDOM/Vapor 模式。
3. **验证 Input。** Ref 直传/写回、默认实例隔离、父级替换/撤去 Ref、只读/可写 computed 边界、输入法、SFC 调用边界。
4. **验证 ToggleButton。** 参数解构/default/rest、children、回调只执行一次、class 转发、覆盖顺序、bx 与显式 style、主题切换。
5. **验证泛型 Select。** 项类型与 Ref 值类型、渲染回调推导、列表身份、动态数据、声明产物和 WebStorm 实际提示。
6. **决定 fork 范围。** 对上述阻碍给出最小复现；公开扩展可解决的留在增强层，需要内部修正的列为小范围 fork 差异。保留 Rust 编译器作为上游依赖是否可行，由 class/JSX 实际输出决定。
7. **确定第一版契约。** 固定执行模型、组件声明、children、默认值、DOM 绑定和 CSS 协议；再开始迁移 UI。运行、类型、SSR、HMR 都使用相同契约。

验证矩阵应覆盖浏览器 DOM、SSR HTML/样式收集、接管、热更新、样式移除与实例清理。完整构建和长测试交给 CI；本地先做相关短探针。不要把“能编译”当成“生命周期和响应式语义正确”。

## 12. 其他参考方向

| 参考                      | 值得借鉴                               | 为什么不作为当前首选作者语法                              |
| ------------------------- | -------------------------------------- | --------------------------------------------------------- |
| 原生 Vue TSX              | setup/render 分离、原生 props 与 slots | props 声明和转发样板仍较多                                |
| Vue Vine                  | 函数组件组织、参数解构/default/rest    | 返回 Vue 模板字符串，使用 `.vine.ts`，与标准 TSX 目标不同 |
| Vue Macros setupComponent | 把 setup 作者体验放进 TSX 的转换方式   | 文档仍标实验性，列出类型/source map 问题                  |
| 仅 @vue/reactivity        | 可复用响应式原语                       | 无法自动获得完整 Vue 组件和生态行为                       |

参考：[Vue Vine props](https://vue-vine.dev/specification/props)、[Vue Macros setupComponent](https://vue-macros.dev/macros/setup-component.html)、[Vue defineComponent](https://vuejs.org/api/general.html#definecomponent)。

## 13. 后续接续提示

可在新机器的新对话中使用以下说明：

> 先读当前 zerodep-js 仓库根目录 VUE_TSX_RESEARCH.md。我们研究的新方向是独立 zerodep-css core/Vue 适配器，加一个 zerodep-vue 项目，含 TSX、UI、docs。新项目用 TS6，优先采用 vue-jsx 并增强，也允许研究小范围 fork。状态使用 Vue 原生 Ref，直接作为 props 传递，子组件可直接改 .value；默认值保持参数解构集中写法。CSS 改为 StyleX 风格对象，保留 bx，class 隐式携带并合并变量 style。先核对固定包版本、上游宏的 ref(false) 默认值、CSS class 接入和 WebStorm 类型能力，再决定 VDOM/Vapor 与 fork 范围。文档里的候选 API 尚未实现，不要把现有 zerodep-css 当空目录覆盖，也不要直接将当前 zerodep-js 升降级或整体迁移。
