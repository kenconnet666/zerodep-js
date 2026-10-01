# 页面宿主与公开 API 命名：研究建议

2026-10-01。用户已选择页面宿主路线，并提出将 $state/$derived/effect 等改为 _state/_derived/_effect，同时研究在 Vue、React、Svelte 项目中开发独立新页面。本轮仅研究、验证现有边界并记录建议；尚未修改 API 导出、编译器或实现宿主适配。

## 建议的命名规则

赞成使用单下划线作为框架公开函数的统一前缀，而不只零散替换三个名字。下划线表示 API 来源，不能被解释为“所有这些函数都是编译宏”。

| 类别                 | 建议                                                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 编译宏/组件声明      | _state、_state.raw、_derived、_derived.by、_component                                                                                                         |
| 响应式与生命周期函数 | _effect、_onMount、_onCleanup、_getAbortSignal、_createScope、_createRoot、_batch、_untrack、_tick、_flushSync                                                |
| 快照与根挂载         | _snapshot、_mount、_hydrate                                                                                                                                   |
| context 函数         | _createContext、_provideContext、_useContext                                                                                                                  |
| 路由函数             | _defineRoute、_defineRoutes、_createRouter、_createBrowserHistory、_createHashHistory、_createMemoryHistory、_useRoute、_useRouter、_onBeforeLeave、_redirect |
| 持久化函数           | _persistLocal、_persistSession                                                                                                                                |
| JSX 组件、类型和类   | For、ErrorBoundary、Router、Outlet、Link、ScopeHandle、RouteError 等保持 PascalCase                                                                           |
| 已有对象成员         | raw、by、navigate、reload、update、dispose、flush 等不加前缀                                                                                                  |
| 构建工具和编译协议   | zerodep、compile 及 internal helper 保持工具层命名，不机械改成公开运行时前缀                                                                                  |

规则范围是 core 公开的可调用函数，包括可选 router/storage 子入口。这里的完整表仍是建议，未作为已批准导出表执行；内部实现函数不需要一起加前缀。

```tsx
// 建议形态：目前尚不能直接按这些新导出名安装使用。
import { _component, _state, _derived, _effect } from 'zerodep-js';

export const Counter = _component(({ step = 1 }: { step?: number }) => {
  let count = _state(0);
  const doubled = _derived(count * 2);
  _effect(() => console.debug('计数变化', count));
  return (
    <button
      onClick={() => {
        count += step;
      }}
    >
      {doubled}
    </button>
  );
});
```

只改宏与 effect 的迁移较小，但 mount、createRouter、onMount 等仍可能与宿主导入同名，命名也会混杂。另一种可行习惯是 import * as zj 后使用命名空间；当前编译器支持静态命名空间成员，但逐次输入命名空间比统一的短前缀更冗长，因此不作为主要示例风格。

$ 是合法的 JavaScript/TypeScript 标识符，不能把它说成 TS 的导入限制；自动导入体验是否改善还需在实际编辑器验收。Svelte 组件语境确实保留 $ 前缀，并拥有同名 runes，采用 _ 有助于避免这类名称和概念混淆。[Svelte 编译诊断](https://svelte.dev/docs/svelte/compiler-errors#dollar_prefix_invalid)

名称改变不会让宏脱离编译器，也不会让 React/Svelte 的响应式系统理解这些状态。宿主源码继续使用自己的语法；新页面的 TS/TSX 由 zerodep 编译。

## 已核对的改名成本

当前 compiler 按导入来源和词法绑定识别宏，名字分散在 imports、namespaces、index、components、guards 等模块。编译探针确认：

- `$state as _state` / `$derived as _derived` 可以正确转换成状态、派生和实时读取，effect 的普通导入别名也可以保留。
- 直接写尚不存在的 `_state` 命名导入，目前不会被宏识别。因此单改 core 导出不够，也不能用全局字符串替换实现迁移。

建议将公开名字先归一为 state/derived/component 等内部语义角色，使直接导入、别名、命名空间和诊断共享同一张表。识别仍依赖 zerodep-js 的真实 import binding；用户自己的 _state 函数不应被改写。

迁移可选立即切换或短暂兼容。推荐下一候选版本先让新名成为主文档和源码写法，旧名仅保留一个候选过渡期并标记 deprecated，稳定 1.0.0 前完成统一；不永久维护两套推荐 API。过渡期共用同一实现与角色表，不增加第二套响应式语义。

用 AST 迁移 import/export 和绑定引用，覆盖 raw/by、别名与命名空间；同步声明、LSP 探针、示例、文档、框架诊断与实际包消费。不要修改普通对象属性、字符串和宿主自身的 useEffect/$state 等调用。运行时内部协议未改变时无需只为拼写升级 ABI，但四个发布包必须统一升级，原 RC1 包不可覆盖。

## 三种宿主共用一个页面边界

新的页面模块使用相同 TSX，可以独立运行，也可以被宿主挂载。它不接收 Vue VNode、ReactNode 或 Svelte snippet。宿主只提供容器、普通输入和明确的回调；新页面独立管理容器内的节点、响应式与资源。

跨三种宿主后，普通参数更新已经是明确需要，而不是推测性扩展。建议将边界收敛为下面的结构；它仍是候选协议，不是已经导出的新 API：

```ts
type PageHandle<Input> = {
  update(next: Input): void;
  dispose(): void;
};

type PageEntry<Input> = (target: HTMLElement, initial: Input) => PageHandle<Input>;
```

update 是完整输入替换，包括移除旧输入字段；它保持页面实例，不因宿主产生了新的 props 对象而重建表单。dispose 幂等，已失效句柄不再更新 DOM。记录身份需要重建时用宿主自己的 key/keyed block 明确表达。

当前 mount 的返回值仍是 cleanup 函数，不应为了宿主需求直接破坏这个契约。第一轮可用一个页面入口实现 update/dispose，验证三种宿主后再判断是否需要提供简短的工厂函数，避免提前堆叠 definePage/createAdapter/HostServices 等抽象。

| 宿主   | 挂载/更新/清理方式                                                                           | 需要验证的特有行为                                                             |
| ------ | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Vue    | onMounted 挂载，watch 明确输入后 update，onBeforeUnmount 清理                                | 路由参数复用；KeepAlive 的停用不等于卸载                                       |
| React  | 在 effect 中挂载，单独同步输入，effect cleanup 清理                                          | StrictMode 的额外 setup/cleanup；对象或 callback identity 变化不应触发整页重建 |
| Svelte | Svelte 5 attachment 返回 cleanup，在内部单独的 effect 中同步输入；也可使用 onMount/onDestroy | attachment 自身读取响应式输入会重跑，需将实例创建与更新分开                    |

React 官方把 effect 用于连接外部系统，并在开发 StrictMode 下额外验证清理；不应在 React render 函数体中直接挂载新页面。[React useEffect](https://react.dev/reference/react/useEffect)、[React StrictMode](https://react.dev/reference/react/StrictMode)

Svelte attachment 会因读取的状态变化而清理后重建。官方提供嵌套 effect 的方式将更新与一次性初始化分开，这正适合稳定的外部页面实例；异步 import 必须另外处理失效和错误，不能让 async 返回值充当 cleanup。[Svelte attachments](https://svelte.dev/docs/svelte/@attach)、[Svelte 生命周期](https://svelte.dev/docs/svelte/lifecycle-hooks)

这三种薄宿主不必成为核心依赖。先建立真实消费示例；出现重复代码后再独立封装可选适配入口，并只声明对应宿主 peer，不让独立用户安装三个框架。

## 编译、类型、导航与 SSR

当前 zerodep Vite 插件缺少 include/exclude，尚不能将“放在同一工程”作为已验收能力。应以明确目录/包范围同时过滤 dev transform、optimizeDeps、production 和 SSR。Vue JSX、React JSX/Fast Refresh/可选 React Compiler 以及 Svelte 的 .svelte/.svelte.ts 编译各自保留自己的范围，不能靠插件执行顺序补救重叠转换。React 官方插件也提供排除非 React TSX 的选项。[React Vite 插件](https://raw.githubusercontent.com/vitejs/vite-plugin-react/main/packages/plugin-react/README.md)

优先将新页面放在独立 workspace 子项目，由 TS7 检查，jsxImportSource 为 zerodep-js。宿主只消费明确的页面入口与声明，React 的 JSX 类型不能接管新页面。直接消费源码的开发路径必须验证联合类型解析；预编译 ESM + d.ts 则可用于不同构建器，代价是额外构建/监听步骤。

已有应用的 URL 继续由宿主路由器管理。新页面使用普通导航回调或 memory history，不同时启动两个 browser/hash history。页面自己的离开守卫不会自动取消 Vue Router、React 路由器或 SvelteKit 的导航；实际编辑页通过宿主支持的接口接上明确的离开确认。URL、滚动和页面标题分别约定所有者。

SSR 的初始支持范围建议为宿主输出稳定空容器，再客户端挂载新页面；框架独立 SSR 不受影响。Nuxt、Next.js、SvelteKit 的服务器/路由边界需分别验证，不能把三种 Vite CSR 示例通过写成这些全栈框架的一键兼容。两套 renderer 不共同接管同一子树。

CSS 仍在同一个文档中，应使用页面范围/CSS Modules 和共享设计变量；存储键按应用约定命名。宿主已经提供的登录、请求与导航通过普通函数传入即可，不自动共享其响应式 context 或 store。zerodep-css 仍等待新版本。

## 研究中发现的现有清理边界

基于 1e82b2c 的 Chromium 小探针确认：正常 mount → dispose → mount 可用；旧 disposer 在同一容器的新实例挂载后再次调用，会无条件删除新实例的 roots 登记，导致第三次 mount 未被正确拒绝。

问题位于 dom/mount.ts 的 roots.delete(target) 清理逻辑；hydrate 具有同样的代码结构，但本次实际探针只验证了 mount。应使 disposer 只释放属于自己的登记，并增加重复清理、失效异步加载、失败重试和重新接管用例。本轮未修改运行时代码；不能把这项未修复问题说成已通过宿主兼容验证，也不应把它误称为正常 React StrictMode 序列必然失败。

## 建议实施顺序

1. 确认统一函数前缀与候选版本迁移策略；先改角色表、导出与 AST 迁移，保持语义不变。
2. 修复已经复现的旧 disposer 问题，落实页面实例的更新、取消和清理契约。
3. 加入构建文件范围与类型隔离，先做用户选定的 Vue 页面宿主试点。
4. 使用同一个页面入口验证 React StrictMode 与 Svelte attachment，证明三者可以保持相同的页面状态和资源行为。
5. 再决定是否封装小型适配包，以及哪些全栈框架/SSR 组合进入支持范围。未通过的组合保持明确的候选状态。
