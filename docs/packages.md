# 包产物与独立消费

当前源码统一准备 **1.0.0-rc.4**，只维护原生 TS7 路线。发布清单位于 `scripts/package-list.mjs`，共十一包：core、use、ssr、vite、native 和六个平台包。工作区根与主示例保持 private；实际发布状态见 [CHANGELOG](../CHANGELOG.md)。

## 包边界

| 包或入口                                   | 用途                                                 | 依赖边界                                        |
| ------------------------------------------ | ---------------------------------------------------- | ----------------------------------------------- |
| `zerodep-js`                               | 响应式、组件、DOM、hydrate、生命周期、快照和公共类型 | CSS Tools tokenizer 与 csstype；不依赖编译器    |
| `zerodep-js/jsx-runtime`                   | JSX 类型约定                                         | `jsxImportSource: zerodep-js`                   |
| `zerodep-js/internal`                      | 编译输出与 SSR 的 ABI 2                              | 内部协议，不作为手写 signal API                 |
| `zerodep-use/router`、`storage`、`history` | 路由、持久化与编辑历史                               | 通过同版本 core peer 共享运行时，无聚合根入口   |
| `zerodep-js-ssr`、`zerodep-js-ssr/data`    | SSR 与独立 JSON 编码                                 | core 为 peer；data 子入口不依赖 DOM 类型        |
| `zerodep-js-native`                        | CLI、单文件转换、常驻 Program                        | 固定 TS7 API 客户端及可选平台 SDK               |
| `zerodep-js-native-<平台>`                 | Go 二进制、标准库与语言服务                          | Windows/Linux/macOS 的 x64/ARM64；用户不需要 Go |
| `zerodep-js-vite`                          | 应用转换、依赖扫描、开发检查和 HMR                   | 直接依赖 native，Vite 8 为 peer                 |

传统编译器和三个外部框架适配包已从源码及当前发布清单删除。已发布历史版本不回写或覆盖。

应用、SSR 和预编译组件库应共享同一个 core。ESM 执行入口通过 exports 指向 dist；源码、JS map 和声明 map 一起分发，消费端无需编译框架包的 src。产物排除 `.tsbuildinfo`、测试、工作区配置和本机文件。

框架包使用 MIT，平台包包含上游 Apache-2.0 LICENSE、MIT LICENSE.zerodep 和 NOTICE。core 的生成属性源码、声明及 THIRD_PARTY_NOTICES.md 一同打包。

## 消费验收

`pnpm test:packages` 构建包后，在工作区外创建临时消费项目并执行以下检查：

1. 打包当前清单，核对源码导航、声明映射、许可证与平台可执行文件。
2. 从真实 tgz 安装，无源码 alias，不继承 NODE_PATH；检查 exports 和已发布依赖协议。
3. 确认没有传统编译器、外部宿主或 Babel 依赖。
4. 用安装后的 `zerodep-tsc` 一次输出组件库 JS、声明与映射，然后打包安装该组件库。
5. 严格检查必填 props、泛型 children、原生事件、bind 和公共 API 的正反类型用例。
6. 验证客户端、Node SSR、请求隔离、CSR/SSR 节点接管、输入绑定、编辑历史、路由及卸载清理。
7. 检查浏览器有效模块没有 TypeScript、原生编译器、Vite、SSR 渲染器或开发检查代码，验证小入口按需打包。

测试结束清理自己创建的服务、浏览器、安装目录和 tgz；共享 pnpm store 不受影响。Linux 和 Windows CI 运行真实包消费，六个平台的 Go 构建与语义测试分别由对应 runner 执行。

## 编译器接口

Vite 消费使用 `zerodep()`。生产构建默认在同一个原生 Program 中检查请求文件并 emit；开发态默认交给语言服务做类型检查，框架诊断仍会阻止无效输出。全项目检查使用 `zerodep-tsc --noEmit`。

组件库使用 `zerodep-tsc -p tsconfig.json --jsx react-jsx`，开启 declaration、declarationMap、sourceMap，并关闭 emitDeclarationOnly。内置框架转换先于 TypeScript JSX 转换，原始树负责声明输出。

Node `compile` 是单文件转换与框架诊断接口；`createCompiler` 持有项目快照，适合检查及连续编辑，使用结束后必须关闭。`CompileResult.map` 使用本项目的 SourceMap 类型，运行时类型不暴露编译器 AST。

编译器和 SSR 在初始化时验证 ABI 2。不匹配时报告 `ZJ_RUNTIME_ABI`；应统一框架版本并重新编译应用和组件库。Vite 跳过已经发布的 node_modules JS，依赖扫描和常规转换使用同一原生服务。
