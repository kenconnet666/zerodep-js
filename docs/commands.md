# 开发命令与 CI 分工

每个项目的操作维护在自己的 package.json。在项目目录执行 `pnpm <操作>`，或从仓库根执行 `pnpm --dir <目录> <操作>`。根目录只保留仓库工具检查、格式化、lint、跨包验收和发布，不为各项目再维护一套别名。

## 操作边界

| 目录                         | 操作                         | 职责                                         |
| ---------------------------- | ---------------------------- | -------------------------------------------- |
| packages/core、css、compiler | build / dev                  | 编译 / 监听编译，使用官方 TS7 的 `--noCheck` |
| packages/ui                  | build                        | Vite 转换组件宏并生成 JS                     |
| packages/ui                  | build:types                  | 只生成类型声明，不做完整类型检查             |
| apps/docs、example           | build:client / build:server  | 分别构建客户端、服务端                       |
| 各项目                       | check                        | 只检查类型；UI 和应用同时检查框架语义        |
| 有测试的项目                 | test                         | 只运行本项目测试，不自动构建                 |
| packages/core、css、ui       | generate / generate:check    | 生成数据 / 校验生成数据是否过期              |
| packages/compiler            | lsp:setup / lsp:inspect      | 配置项目语言服务 / 检查指定文件              |
| packages/compiler            | lsp:verify / lsp:completions | 完整语言服务协议 / 补全验证，交给 CI         |
| packages/core                | test:stability               | Node 稳定性测试，交给 CI                     |
| apps/example                 | test:dev                     | 浏览器 HMR 集成测试，交给 CI                 |
| 仓库根                       | check / test                 | 仓库工具的类型及框架检查 / 工具测试          |
| 仓库根                       | test:e2e / test:packages     | 三浏览器 / 独立安装消费验收，交给 CI         |
| 仓库根                       | release:pack                 | 打包已有产物，不构建，不发布                 |

编译仍可能报告语法错误和无法输出的错误；`--noCheck` 不代表接受无法解析的源码。声明生成也可能需要必要的类型推导，但不执行完整类型检查。构建成功不能代替 check 通过。

## 开发与构建顺序

首次准备框架产物时，分别执行：

```sh
pnpm --dir packages/core build
pnpm --dir packages/css build
pnpm --dir packages/compiler build
```

随后按需要启动一个应用：

```sh
pnpm --dir apps/docs dev
# 或启动功能示例
pnpm --dir apps/example dev
```

示例的 `dev:csr` / `dev:ssr` 分别固定渲染模式。框架开发可在对应包运行 dev 监听编译；文档开发直接消费 UI 源码，提供组件 HMR。

生产构建由 CI 显式安排：框架三包 → UI build → UI build:types → 两个应用各自的 build:client、build:server。两个应用均输出到各自 dist/client 和 dist/server，单独重新构建客户端不会删除服务端产物。preview 只启动已有产物的预览服务。

需要对多个包执行同一种操作时，直接使用 pnpm 的工作区命令，例如 `pnpm -r check`，不另建同时混合构建和检查的总命令。根目录不参与递归脚本执行，仓库工具需另外执行 `pnpm check` / `pnpm test`。

测试配置沿用仓库根路径，包内 test 通过 `pnpm -w exec` 选择本包用例，避免改变夹具和产物解析位置。独立消费夹具的编译、声明生成与检查也分别执行；消费验收脚本负责按顺序组织这些步骤。

## 本地与 CI

先看命令的实际执行范围与耗时；会启动完整类型检查、构建、浏览器或长循环的验证交给 CI。本地只做修改文件的 LSP 错误检查和必要的局部短测试。例如修改一个工具测试后，执行 `pnpm exec vitest run tests/tooling/ci-browser-image.test.ts`。完整类型检查、构建、长测试和完整语言服务验证均交给 CI；不因改了配置或公共类型而在本地补跑全量检查。

CI 保留六平台编译器验证、三浏览器、Linux/Windows 独立消费、稳定性、语言服务和工程检查。各 job 显式准备自己的构建依赖，类型检查与测试不再承担隐含构建责任。发布仍要求同一提交全部必需任务成功，复用 CI 保存的固定 tgz 和摘要。
