# 包边界与独立消费

项目维护 core、use、ssr、compiler、vite 五包。当前源码选用 JetBrains TS7.1 的原始 GitHub 发行包；主包及平台包由根项目的 catalog/overrides 固定，框架不构建或发布自己的平台 SDK。此安装前提与已发布 rc.7 的微软 npm SDK 不同。

采用当前源码工具链的独立项目，必须将同版本 [工作区配置](../pnpm-workspace.yaml) 中的 TypeScript 主包 URL 和 `@typescript/typescript-*` 平台 overrides 合并到项目根配置，再安装并保存锁文件。只指定主包 URL 不能保证取得尚未发布到 npm 的平台包。独立消费验收会复制这部分配置，不能把测试通过理解为任意未配置的 npm 项目都能直接安装；完整步骤见 [环境配置](environment-setup.md)。

| 发布包              | 职责                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| zerodep-js          | 浏览器与响应式运行时、类型声明、internal 编译协议、devtools 开发入口 |
| zerodep-use         | history/router/storage/task，peer 依赖同版本 core                    |
| zerodep-js-ssr      | 服务端渲染和序列化，peer 依赖 core                                   |
| zerodep-js-compiler | Babel 转换、选定 JetBrains TS7.1 检查与语言适配，属于开发工具        |
| zerodep-js-vite     | 构建侧依赖 compiler，集成 Vite                                       |

## 应用与组件库

应用和预编译库通过 peer dependency 共享 core，避免复制第二个响应式实例。运行时依赖图不得包含 Babel、TypeScript、lint 或 Vite。

应用构建前使用 zerodep-check -p 检查项目，再由 Vite 构建 client/server。组件库采用同一个 Vite 插件和 library mode 输出 JS，官方 tsc --emitDeclarationOnly 输出声明。不要把仅经 tsc 转译的 _state/_component 当作可执行组件库。

公开类型保留泛型、可选属性、事件 currentTarget、组件 children 和绑定类型；声明映射必须指向随包提供的真实源码，不用本机绝对路径或工作区源码别名掩盖打包问题。

## 实际消费验收

pnpm test:packages 使用本次固定 tgz 在工作区外安装，检查：

- 包名、版本、许可证、导出、源码和映射完整。
- 安装结果不链接回工作区，不残留 workspace/catalog/link/file 协议。
- 选定 SDK 与 Babel 能独立编译预编译组件库，声明保留泛型和类型反例。
- CSR/SSR、节点接管、绑定、路由、存储和卸载使用实际发布包。
- 生产浏览器不包含开发工具、其他框架或重复运行时。

注册表验收使用 release:verify-registry，比对同一提交、tgz 摘要、版本和 next 标签。上传成功不能替代实际安装，旧版本的消费通过也不覆盖当前候选。
