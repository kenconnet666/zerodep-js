# 包产物与独立消费

所有包仍为 private、版本 0.0.0，尚未发布 npm。本文记录已经实际验证的本地安装包契约，不把打包成功视为生产验收完成。

公共名称已经统一为下表中的四个无 scope 包名；开发阶段的 `@zerodep-js/core` 对应 `zerodep-js`，其余旧公共名称对应 `zerodep-js-compiler/vite/ssr`。尚未有已发布使用者需要兼容旧名。许可证为 MIT，每个实际 tgz 都应包含与根目录一致的 LICENSE。

## 包边界

| 包或入口                 | 用途                                           | 依赖边界                                                |
| ------------------------ | ---------------------------------------------- | ------------------------------------------------------- |
| `zerodep-js`             | 响应式、组件、DOM、hydrate、生命周期及公共类型 | CSS Tools tokenizer 校验样式边界，csstype 提供生成类型  |
| `zerodep-js/jsx-runtime` | JSX 类型约定                                   | 配合 `jsx: preserve`，不走 React automatic JSX 输出     |
| `zerodep-js/internal`    | 编译输出与 SSR 的内部协议                      | 不能作为另一套手写 signal API                           |
| `zerodep-js-compiler`    | TSX 编译、映射、诊断及检查命令                 | Babel 仅在构建侧使用，公共结果类型不要求导入 Babel 类型 |
| `zerodep-js-vite`        | Vite 8 的普通转换和依赖扫描接入                | 依赖 compiler，Vite 作为 peer dependency                |
| `zerodep-js-ssr`         | 同步组件 SSR 与文档组合                        | core 作为同版本 peer dependency                         |
| `zerodep-js-ssr/data`    | 独立 JSON 数据编码                             | 不引入渲染器，也不要求 DOM 类型库                       |

应用、SSR 与组件库应共享同一 core 实例。组件身份和作用域不能跨独立副本混用；ssr 因而使用 peer dependency，开发时另在 devDependencies 安装工作区 core。

执行入口是 ESM，通过 exports 指向 dist。源码随运行时映射和声明映射一起提供，供调试与编辑器导航；消费者不需要编译框架包的 src。安装包排除 `.tsbuildinfo`、测试、工作区配置和本机文件。各包 README 描述实际职责，构建工具与浏览器运行时分别声明副作用边界。

core 的原生属性类型和 SVG 别名由维护脚本生成，数据源不成为用户运行时依赖；生成的源码、声明及 THIRD_PARTY_NOTICES.md 随包提供。独立消费用例会实际检查生成属性的正反类型，不能只在工作区内证明其可用。

## 实际消费门槛

```sh
pnpm test:packages
```

这个命令先构建框架包，然后执行如下完整过程：

1. 将四个包分别 `pnpm pack` 成真实 tgz，检查文件清单。
2. 在系统临时目录创建独立项目，以本地 tgz 安装框架及固定版本的 TS7/Vite。目录位于工作区外，无源码 alias，不继承 NODE_PATH，不把工作区 node_modules 当作消费依赖；允许使用普通 pnpm 内容缓存。
3. 检查安装后的 exports 可解析、生产依赖中无 workspace/catalog/link/file 协议残留，源码与声明映射中的目标文件实际存在。
4. 用已安装的 compiler 编译一个泛型组件库，TS7 生成声明，再打包并安装这个组件库。客户端和 SSR 从 node_modules 消费它，插件不会再编译依赖中的 JSX。
5. 开启 strict、exactOptionalPropertyTypes、noUncheckedIndexedAccess，且保持 skipLibCheck=false，检查必填 props、泛型 children、原生事件目标和公共编译结果类型。负例必须产生错误，不能因 any 退化而消失。
6. 构建客户端、保留包 external 的 SSR、以及只引用 untrack 和数据编码的小入口。实际 Node ESM 执行验证请求隔离与转义，浏览器验证 CSR、SSR 保留节点接管、组件交互、受控输入及卸载清理。
7. 检查客户端有效模块没有 Babel、compiler、Vite 和 SSR 渲染器；小入口没有 DOM、hydrate 或服务端渲染模块。体积作为观察数据输出，没有固定字节上限；依赖隔离仍由实际模块检查保证，不用小入口的字节数代表完整运行时或通用性能。

测试创建的服务、浏览器、安装目录与 tgz 在结束时清理；失败摘要保存在 `test-results/packages-failure.log`，后续成功会清除旧失败摘要。共享 pnpm store 不会被删除。固定源码夹具位于 `tests/consumer`，只在独立项目中检查，不加入工作区项目列表。

Linux CI 在完整验证任务中执行此门槛，另有 Windows 的包消费任务。CI 状态以对应提交的实际结果为准，不因为配置了任务就记为通过。

## 编译器与运行时配合

编译器生成的框架模块会在自身初始化语句前调用内部协议检查，SSR 渲染模块也验证协议。当前协议号为 1；不兼容的 helper 行为变更才需要递增，普通补丁修复不需要改变协议号。

协议不匹配时抛出带 `ZJ_RUNTIME_ABI` 的明确错误。处理方式是统一框架版本并重建应用及预编译组件库；不能只更换页面上的某一个运行时文件。框架各包暂采用统一发布版本，compiler 与 Vite 之间的包依赖也保持确定版本。内部检查不是跨任意版本的兼容层。

`CompileResult.map` 使用本项目声明的 `SourceMap` 格式类型，避免消费者为了读取代码或映射而加载整套 Babel 声明。core 公开 `Template` 类型，使自然的 component 返回值能够在组件库 `.d.ts` 中通过公开包名表达；这不会增加用户手写模板的运行时入口。

## 组件库怎样交付

组件继续写成普通 TSX 和 `component(...)`，不必给每个返回值补一份冗余声明。库构建需要同时产生两类产物：

- 用 compiler 将宏和 JSX 转为 ESM；保存 code 与 map，并给 JS 添加对应的 sourceMappingURL。
- 用 TS7 对原始 TSX 执行 declaration/emitDeclarationOnly，保留参数、默认值可选性、泛型 children 和 JSX 类型；声明映射的源码需要随包提供。

库的 exports 使用 types 与 import 条件分别指向声明和 ESM；core 声明为 peer dependency。对外只暴露自己的组件与类型，不复制框架内部 helper，也不把 core 打入库包形成第二套状态图。可运行的最小例子见 `tests/consumer/library` 和 `tests/consumer/build-library.mjs`。

Vite 的依赖扫描和普通源码转换必须使用同一个 compiler。扫描阶段如果直接按默认 React JSX 处理，会错误发现 react/jsx-dev-runtime，并可能引起冷启动或热更新重载。插件已把转换接入 optimizeDeps 的 Rolldown 插件链，支持应用 `.ts/.tsx/.js/.jsx/.mts/.mjs`；预编译 node_modules 继续跳过。

## 剩余发布门槛

独立包消费解决的是安装与产物正确性。资源、业务、编辑器与本机输入基线已有验证，入门/API/支持文档、MIT 许可证与贡献规则、发布及回滚工具已准备；当前仍需完成最终候选矩阵与注册表安装。用户已授权完成后使用环境变量中的 npm token 发布相关包；发布须核对注册表与实际安装结果，凭据不进入仓库或日志，验证脚本本身不发布。生产部署不包含在此授权中。具体步骤见 [发布与回滚](releasing.md)。
