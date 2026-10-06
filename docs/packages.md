# 包产物与独立消费

七个公共包已发布 1.0.0-rc.2，实际 npm 安装验收通过。工作区根与两个示例保持 private。本文记录已经验证的安装包契约，候选与稳定版本状态见 [发布记录](../CHANGELOG.md)。

当前源码增加 `zerodep-use`、`zerodep-js-native` 及 Windows/Linux x64 两个平台包，共十一包统一准备为 1.0.0-rc.3，尚未发布。下表与消费门槛按拆包后的结构维护；RC2 的历史验收继续保留。use 只提供 router/storage/history 子入口，没有聚合根入口；core 不依赖 use。

公共名称统一为下表中的无 scope 包名；开发阶段的 `@zerodep-js/core` 对应 `zerodep-js`，其余旧公共名称对应 `zerodep-js-compiler/vite/ssr`。旧名称未曾发布，不提供重复兼容入口。框架代码许可证为 MIT，每个框架 tgz 包含与根目录一致的 LICENSE。原生平台包含 Apache-2.0 上游 LICENSE、MIT 框架 LICENSE.zerodep 与 NOTICE。

RC2 新增三个宿主包，发布清单统一维护在 scripts/package-list.mjs 的 releasePackages，包含三个原生包，平台包先于 Node 包发布；基础框架与宿主有分别的独立消费门槛。独立安装基础框架不会强制安装 React、Vue 或 Svelte。

## 包边界

| 包或入口                                                      | 用途                                           | 依赖边界                                                |
| ------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| `zerodep-js`                                                  | 响应式、组件、DOM、hydrate、生命周期及公共类型 | CSS Tools tokenizer 校验样式边界，csstype 提供生成类型  |
| `zerodep-js/jsx-runtime`                                      | JSX 类型约定                                   | `jsxImportSource: zerodep-js`；框架完成 JSX 转换        |
| `zerodep-use/router`                                          | 命名路由、历史、布局与数据准备                 | 可选子入口，根入口不加载路由                            |
| `zerodep-use/storage`                                         | localStorage/sessionStorage 持久化             | 可选子入口，SSR 不访问存储                              |
| `zerodep-js/internal`                                         | 编译输出与 SSR 的内部协议                      | 不能作为另一套手写 signal API                           |
| `zerodep-js-compiler`                                         | TSX 编译、映射、诊断及检查命令                 | Babel 仅在构建侧使用，公共结果类型不要求导入 Babel 类型 |
| `zerodep-js-vite`                                             | Vite 8 的普通转换和依赖扫描接入                | 两种后端为可选 peer，按配置加载                         |
| `zerodep-js-native`                                           | 原生 TS7 CLI、单文件转换、常驻项目服务         | 官方 TS7 API 与可选平台包，不依赖 Babel                 |
| `zerodep-js-native-win32-x64` / `zerodep-js-native-linux-x64` | Go 二进制、标准库、SDK 与构建摘要              | Apache-2.0 上游加 MIT 框架代码；用户不需要 Go           |
| `zerodep-js-ssr`                                              | 同步组件 SSR 与文档组合                        | core 作为同版本 peer dependency                         |
| `zerodep-js-ssr/data`                                         | 独立 JSON 数据编码                             | 不引入渲染器，也不要求 DOM 类型库                       |
| `zerodep-js-vue`                                              | Vue 页面宿主                                   | core 与 Vue 为 peer                                     |
| `zerodep-js-react`                                            | React 页面宿主                                 | core 与 React 为 peer                                   |
| `zerodep-js-svelte`                                           | Svelte attachment 页面宿主                     | core 与 Svelte 为 peer                                  |

应用、SSR 与组件库应共享同一 core 实例。组件身份和作用域不能跨独立副本混用；ssr 因而使用 peer dependency，开发时另在 devDependencies 安装工作区 core。

执行入口是 ESM，通过 exports 指向 dist。源码随运行时映射和声明映射一起提供，供调试与编辑器导航；消费者不需要编译框架包的 src。安装包排除 `.tsbuildinfo`、测试、工作区配置和本机文件。各包 README 描述实际职责，构建工具与浏览器运行时分别声明副作用边界。

core 的原生属性类型和 SVG 别名由维护脚本生成，数据源不成为用户运行时依赖；生成的源码、声明及 THIRD_PARTY_NOTICES.md 随包提供。独立消费用例会实际检查生成属性的正反类型，不能只在工作区内证明其可用。

## 实际消费门槛

```sh
pnpm test:packages
pnpm test:hosts:packages
pnpm test:native:packages
```

第一个命令先构建框架包，然后执行如下完整过程，包含可选 use；第二个命令在另一个独立目录只安装四个基础包与三个宿主适配包，验证不安装 use 时同一页面仍能完成类型检查、构建、CSR/SSR、更新及清理：

1. 将四个基础包和 use 分别 `pnpm pack` 成真实 tgz，检查文件清单。core 不得残留旧 router/storage 源码、构建文件或导出；use 必须通过 peer 共享 core。
2. 在系统临时目录创建独立项目，以本地 tgz 安装框架及固定版本的 TS7/Vite。目录位于工作区外，无源码 alias，不继承 NODE_PATH，不把工作区 node_modules 当作消费依赖；允许使用普通 pnpm 内容缓存。
3. 检查安装后的 exports 可解析、生产依赖中无 workspace/catalog/link/file 协议残留，源码与声明映射中的目标文件实际存在。
4. 用已安装的 compiler 编译一个泛型组件库，TS7 生成声明，再打包并安装这个组件库。客户端和 SSR 从 node_modules 消费它，插件不会再编译依赖中的 JSX。
5. 开启 strict、exactOptionalPropertyTypes、noUncheckedIndexedAccess，且保持 skipLibCheck=false，检查必填 props、泛型 children、原生事件目标和公共编译结果类型。负例必须产生错误，不能因 any 退化而消失。
6. 构建客户端、保留包 external 的 SSR、以及只引用 untrack 和数据编码的小入口。实际 Node ESM 执行验证请求隔离与转义，浏览器验证 CSR、SSR 保留节点接管、组件交互、受控输入及卸载清理。
7. 检查客户端有效模块没有 Babel、compiler、Vite 和 SSR 渲染器；小入口没有 DOM、hydrate 或服务端渲染模块。体积作为观察数据输出，没有固定字节上限；依赖隔离仍由实际模块检查保证，不用小入口的字节数代表完整运行时或通用性能。

测试创建的服务、浏览器、安装目录与 tgz 在结束时清理；失败摘要保存在 `test-results/packages-failure.log`，后续成功会清除旧失败摘要。共享 pnpm store 不会被删除。固定源码夹具位于 `tests/consumer`，只在独立项目中检查，不加入工作区项目列表。

Linux CI 在完整验证任务中执行此门槛，另有 Windows 的包消费任务。CI 状态以对应提交的实际结果为准，不因为配置了任务就记为通过。

## 编译器与运行时配合

编译器生成的框架模块会在自身初始化语句前调用内部协议检查，SSR 渲染模块也验证协议。当前协议号为 2；不兼容的 helper 行为变更才需要递增，普通补丁修复不需要改变协议号。

协议不匹配时抛出带 `ZJ_RUNTIME_ABI` 的明确错误。处理方式是统一框架版本并重建应用及预编译组件库；不能只更换页面上的某一个运行时文件。框架各包暂采用统一发布版本，compiler 与 Vite 之间的包依赖也保持确定版本。内部检查不是跨任意版本的兼容层。

`CompileResult.map` 使用本项目声明的 `SourceMap` 格式类型，避免消费者为了读取代码或映射而加载整套 Babel 声明。core 公开 `Template` 类型，使自然的 component 返回值能够在组件库 `.d.ts` 中通过公开包名表达；这不会增加用户手写模板的运行时入口。

## 组件库怎样交付

组件继续写成普通 TSX 和 `_component(...)`，不必给每个返回值补一份冗余声明。库构建需要同时产生两类产物：

- 用 compiler 将宏和 JSX 转为 ESM；保存 code 与 map，并给 JS 添加对应的 sourceMappingURL。
- 用 TS7 对原始 TSX 执行 declaration/emitDeclarationOnly，保留参数、默认值可选性、泛型 children 和 JSX 类型；声明映射的源码需要随包提供。

原生后端直接运行 `zerodep-tsc -p tsconfig.json`，在同一进程、同一原始语法树完成检查和 JS/声明/映射输出，不再额外执行 Babel。开启 `declaration`、`declarationMap`、`sourceMap`，并关闭 `emitDeclarationOnly`。`test:native:packages` 在工作区外只装原生后端，验证真实组件库、声明、SSR/CSR、绑定和清理，并断言依赖图不含 Babel。

库的 exports 使用 types 与 import 条件分别指向声明和 ESM；core 声明为 peer dependency。对外只暴露自己的组件与类型，不复制框架内部 helper，也不把 core 打入库包形成第二套状态图。可运行的最小例子见 `tests/consumer/library` 和 `tests/consumer/build-library.mjs`。

Vite 的依赖扫描和普通源码转换必须使用同一个 compiler。扫描阶段如果直接按默认 React JSX 处理，会错误发现 react/jsx-dev-runtime，并可能引起冷启动或热更新重载。插件已把转换接入 optimizeDeps 的 Rolldown 插件链，支持应用 `.ts/.tsx/.js/.jsx/.mts/.mjs`；预编译 node_modules 继续跳过。

## 注册表验收

1.0.0-rc.2 已通过候选完整矩阵，2026-10-02 由 release:verify-registry 从官方 registry 精确安装七包，分别完成基础框架与三宿主消费流程；原始 tgz 完整性、CI 和 registryVerifiedAt 见 [GitHub 预发布的 release.json](https://github.com/kenconnet666/zerodep-js/releases/tag/v1.0.0-rc.2)。资源、业务、编辑器、本机输入、文档与许可已有证据。npm latest 标签例外在 CHANGELOG 中单独说明，不能把标签名当作稳定性承诺。应用生产部署与 CSS 接入不包含在此次交付范围。
