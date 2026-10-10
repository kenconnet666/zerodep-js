# 包边界与独立消费

框架发布清单保留 core、compiler、css 三包；UI 为私有组件库。2026-10-09 已删除 use 包，不再提供其路由、store、持久化与历史入口。当前源码使用微软官方 npm TypeScript 7.1.0-dev.20261008.1；主包由 catalog 固定，平台包由官方 optionalDependencies 选择，锁文件保存完整性校验。无需 JetBrains 分支下载或平台 overrides。

独立项目安装相同固定版本的 typescript 即可；不再需要复制平台 URL 或覆盖配置。完整步骤见 [环境配置](environment-setup.md)。

| 发布包              | 职责                                                                                    |
| ------------------- | --------------------------------------------------------------------------------------- |
| zerodep-js          | 响应式、DOM、SSR、JSX 类型和开发工具，共用唯一包根入口                                  |
| zerodep-js-compiler | Babel/CSS 转换、Vite 插件（包根导入）、选定 微软官方 TS7.1 检查与语言适配，属于开发工具 |
| zerodep-js-css      | CSS 作者、关键字、样式生成和浏览器/SSR 宿主，peer 依赖 core                             |

## 应用与组件库

应用和预编译库通过 peer dependency 共享 core，避免复制第二个响应式实例。运行时依赖图不得包含 Babel、TypeScript、lint 或 Vite。

应用构建前使用 zerodep-check -p 检查项目，再由 Vite 构建 client/server。组件库采用同一个 Vite 插件和 library mode 输出 JS，官方 tsc --emitDeclarationOnly 输出声明。不要把仅经 tsc 转译的 _state/_component 当作可执行组件库。

公开类型保留泛型、可选属性、事件 currentTarget、组件 children 和绑定类型；声明映射必须指向随包提供的真实源码，不用本机绝对路径或工作区源码别名掩盖打包问题。

## 实际消费验收

pnpm test:packages 使用本次固定 tgz 在工作区外安装，检查：

- 包名、版本、许可证、导出、源码和映射完整。
- 安装结果不链接回工作区，不残留 workspace/catalog/link/file 协议。
- 选定 SDK 与 Babel 能独立编译预编译组件库，声明保留泛型和类型反例。
- CSR/SSR、节点接管、表单绑定、上下文和卸载使用实际发布包。
- 生产浏览器不包含开发工具、其他框架或重复运行时。

注册表验收使用 release:verify-registry，比对同一提交、tgz 摘要、版本和 next 标签。上传成功不能替代实际安装，旧版本的消费通过也不覆盖当前候选。

core 的 `src` 根目录只有 `index.ts`。实现分别位于 runtime、dom、native、ssr、dev；所有应用导入均使用 `zerodep-js`，没有 internal/head/devtools/jsx-runtime 子入口。SSR 不依赖 Node 专用模块；浏览器打包通过 sideEffects: false 与具名导出移除未使用的服务端和开发代码。

SSR 合并后，headData/renderedHead、HTML/SVG/MathML 常量、原生属性序列化及开放绑定检查等仅供 core 内部使用，不再从包根导出。应用的 _head/_render、编译器协议、CSS 所需的 styleText 等保留。
