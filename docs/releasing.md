# 发布、升级与回滚

维护者已授权发布相关 npm 包；七个公共包已发布 1.0.0-rc.2，工作区根与两个示例保持 private。完整 CI、产物完整性和 registry 精确安装验收已完成，记录见 CHANGELOG。许可为 MIT，根目录与每个发布包均包含许可证；生成数据的第三方许可随 core 分发。

## 包名与版本

| 目录              | 发布名称            |
| ----------------- | ------------------- |
| packages/core     | zerodep-js          |
| packages/compiler | zerodep-js-compiler |
| packages/vite     | zerodep-js-vite     |
| packages/ssr      | zerodep-js-ssr      |
| packages/vue      | zerodep-js-vue      |
| packages/react    | zerodep-js-react    |
| packages/svelte   | zerodep-js-svelte   |
| packages/use      | zerodep-use         |

当前 main 的八个包使用同一候选版本 1.0.0-rc.3，清单来自 scripts/package-list.mjs；内部 workspace 依赖打包后必须成为确定版本。新增 use 的版本尚未发布，RC1 四包与 RC2 七包的历史记录保留不变。第一次稳定版本拟为 1.0.0，只有门槛通过后才更新发布状态。内部 helper ABI 与包版本分开管理：修改不兼容输出协议须同步调整 ABI，普通修复或兼容的新增 helper 不通过伪造 ABI 号制造兼容性。

## 发布前

工具入口均通过固定 pnpm 执行：

```sh
pnpm release:check
pnpm release:prepare --version 1.0.0-rc.3
# 检查、提交并推送候选，核对对应 CI 后继续。
pnpm release:pack
pnpm release:status
pnpm release:publish
pnpm release:verify-registry
```

prepare 需要干净工作区和明确版本，修改全部发布包与锁文件；pack 固定当前提交的真实 tgz，记录在被 Git 忽略的 `.release/<version>/release.json`。相同提交再次 pack 会复核并复用原产物，不重新打包覆盖。status 可只读检查旧版包数较少的历史记录，发布和产物复用仍严格要求当前全量清单。

publish 拒绝 private / 0.0.0，只处理经过完整 CI 的原提交和完整性一致的 tgz，发布到 next 并回读真实标签。首次发布不能只凭命令参数假定 latest 不存在；如 latest 同时指向预发布版本，工具报告提示并保留记录，标签管理要核对 npm 实际权限。verify-registry 对全部包核对完整性后，分别执行基础框架和三宿主的注册表精确版本消费。稳定版本准备为 1.0.0 并重新完成这些步骤后，`pnpm release:promote` 才能执行稳定提升；预发布版本和没有 registry 消费记录的版本不能通过该命令提升。

发布辅助工具本身用独立临时 Git/包工作区验证，涵盖产物复用、篡改/路径越界/私有包拒绝及版本准备；另有延迟公开、标签同步、响应丢失、记录失败和部分发布恢复用例。用例不带 npm token，CI 模式不会从 Windows 用户环境读取凭据；测试不执行实际发布。

1. 确认生产计划的验收项均有证据，许可证、支持范围、API 文档、示例、变更记录与包名一致。
2. 为候选版本更新全部发布 manifest 与锁文件，检查 exports、peer dependency、源码映射、LICENSE 和第三方许可；工作区根与示例继续 private。
3. 运行针对性本地验证，提交并推送。最终候选的完整 CI、浏览器矩阵和 Windows 独立消费必须通过。
4. 用实际 tgz 建立独立消费工程，不能用工作区源码别名代替。记录 Git 提交、包版本、产物完整性与对应 CI。
5. 核对 npm 账户与命名权限。认证成功不等于拥有组织或包的写权限；不以 metadata 读取结果证明可发布。

## 发布与验收

凭据从环境变量提供。Windows 用户级变量可能未继承到已运行进程，发布子进程可以显式读取它；不得把 token 值写入仓库、命令行参数或日志，也不修改用户全局 npm 配置。

工具只在临时 npm 配置中写 `${NODE_AUTH_TOKEN}` 引用，值由子进程环境提供，结束后移除自己创建的目录。需要代理时在环境中设置 HTTPS_PROXY；工具不把本机代理地址写死，也不会把凭据发到自定义 registry。

清单按 core、compiler、ssr、use、vite、三个宿主适配包的顺序发布。先使用候选 tag 发布明确版本，验证全部包均存在，再用注册表上的版本重新安装和运行两种消费工程。只有声明、CSR/SSR、交互、接管及版本/完整性都核对后，才提升稳定 tag，并创建对应 Git 标签和发布记录。

发布命令失败或结果不确定时，先查询该版本是否存在及其完整性。已经发布的版本不可被当作可覆盖文件；保留原始产物，查清部分发布状态后再继续，不能盲目重新打包覆盖。

### 上传已受理但版本暂不可见

npm 可能先受理上传，再异步公开版本与标签。publish 在发送请求前保存 attemptedAt，命令成功确认包名后再保存 acceptedAt；记录先完整写入临时文件再替换，避免中断留下半个 JSON。读不到版本不等于上传失败，也不删除回执重新上传。

| 状态         | 证据与下一步                                                                       |
| ------------ | ---------------------------------------------------------------------------------- |
| ready        | 版本的 SHA-512 和独立 dist-tags 接口的 next 均一致，可以继续 registry 验收         |
| pending      | 有 acceptedAt，版本暂不可见；保留产物，稍后再次运行 status/publish 仅核对          |
| tags-pending | 版本完整性一致，但 next 尚未就绪；只核对标签，不重复上传                           |
| unknown      | 已记录 attemptedAt，但响应丢失或失败；先核对 npm 回执/日志与注册表，工具不自动重发 |

存在非 ready 项时退出码为 2，阻止后续脚本误当作验收完成。待公开的包不阻挡清单中其他包上传。unknown 只有在明确证明请求未受理后才可人工修正该包的尝试记录；若已受理则补回执证据继续查询。注册表发现同名同版本但完整性不同会直接拒绝继续，不能用修改记录来绕过。

## 升级与回滚

应用与预编译组件库共享同一个 core。升级时统一框架版本并重新构建应用/组件库；部署产物包含与该版本一致的服务端 JS、客户端 JS、HTML 标记和初始数据协议。

已存在稳定版本时，可将稳定 tag 指回上一个已验证版本，并恢复对应应用产物；应用的锁文件和精确版本是可重复回退依据。需要数据迁移的消费应用由其自身迁移流程负责，框架包回退不会自动回滚业务数据库。

首次发布没有历史稳定版本可回退。若候选验证失败，停止稳定 tag 提升，记录问题并发布新修复版本；不要把未发布的 0.0.0 当作回滚目标，也不自动执行破坏性的 unpublish。已经影响稳定使用者的问题需要明确的变更/弃用说明和修复版本。

1.0.0-rc.1 的 npm 链接、Git 标签、完整 CI 和安装证据已记录于 CHANGELOG。其首次发布后 next/latest 均指向 RC1，清理 latest 的请求返回 npm HTTP 403；未把该状态解释为稳定发布，也未 unpublish。后续维护需要用具备相应权限的 npm 操作处理标签，当前安装使用明确版本。
