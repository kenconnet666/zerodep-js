# 原生多平台构建与 npm 发布

2026-10-06 用户授权使用现有 npm 环境变量发布，并要求其他架构使用 CI/CD。平台和发布清单分别维护在 `scripts/native/platforms.mjs`、`scripts/package-list.mjs`，当前原生路线版本为 1.0.0-rc.4。

## 平台

| npm 平台     | 实际 CI runner   | Go 目标       |
| ------------ | ---------------- | ------------- |
| win32-x64    | windows-2025     | windows/amd64 |
| win32-arm64  | windows-11-arm   | windows/arm64 |
| linux-x64    | ubuntu-24.04     | linux/amd64   |
| linux-arm64  | ubuntu-24.04-arm | linux/arm64   |
| darwin-x64   | macos-15-intel   | darwin/amd64  |
| darwin-arm64 | macos-15         | darwin/arm64  |

范围对齐官方固定 TS7 npm 的 64 位平台。ARM 在本流程指 ARM64；32 位 ARM、其他 CPU/OS 尚未列入支持矩阵。runner 选择依据 [GitHub 官方列表](https://docs.github.com/en/actions/reference/runners/github-hosted-runners)。不把交叉构建成功当作目标平台运行验收。

## 流程

1. `ci.yml` 根据同一份平台表创建六个任务，校验实际 Node 架构，使用固定 TypeScript 提交、Go 1.27.1 和项目补丁构建。各任务运行 Go 测试和原生 Node/CLI 语义测试。
2. SDK 使用 tar 保存权限后上传 `native-sdk-<平台>` artifact。汇总任务只恢复同一次 CI 的产物，并逐一核对上游提交、源码摘要、原生版本和二进制 SHA-256。
3. Linux 完整框架/三浏览器验证与 Windows 包消费验证通过后，`release-artifacts` 打包十一个 npm tgz，记录 SHA-512 和源码提交，上传 `release-candidate`。这一步没有 npm 凭据。
4. `release.yml` 只接受本仓库 main 的成功 CI，核对 run ID、工作流路径、事件、提交和状态。PR 的 workflow_run 不获得发布资格。手动恢复也必须提供已成功的原 CI run ID。
5. 发布任务建立 GitHub 草稿预发布，保存原始 tgz 和 release.json。现有 `NPM_TOKEN` 通过仓库加密 Actions secret 仅注入发布步骤，源码、配置、artifact 和日志不含明文凭据；配置方式依据 [GitHub Secrets 文档](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)。
6. 按固定清单发布 npm `next`，每次远端动作前将尝试记录同步到草稿。原生 Node 入口等待六个平台包公开、SHA-512 和 next 标签都确认后发布。网络响应不确定时不盲目重传，有限次数恢复查询后仍不确定则保留草稿并失败。
7. 从 npm 精确安装本次版本，完成原生框架、组件库与主应用真实消费，记录 registryVerifiedAt 后再公开 GitHub 预发布。不自动提升稳定 latest。

已发布并完成验收的同一 RC 后续不会因普通 main 提交重复发布。准备下一候选应统一提升十五个包的版本；不重新上传已使用的版本，也不修改其原始 tgz。

## 日常命令

```sh
pnpm release:prepare --version 1.0.0-rc.N
# 检查并提交 main，CI/CD 完成构建、验收和发布。
```

恢复中断的发布：

```sh
gh workflow run release.yml --ref main -f run_id=<原成功CI运行ID>
```

恢复会使用草稿保存的同一份产物与回执。已绑定不同源码提交的同版本草稿会明确失败，不能用一个新构建悄悄替换。原始 `pnpm release:publish`、`release:verify-registry` 仍可用于本地维护，但需要同一候选的原始产物、完整 CI 证据与环境变量凭据；不绕过门槛。

本机维护只构建当前平台即可；完整消费/发布验证需要六个平台 SDK。可下载已通过 CI 的 `native-sdk-*` 到 `.codex/native-artifacts` 后运行 `node scripts/native/artifacts.mjs restore`，无需在 Windows 上伪装运行 ARM/macOS 二进制。

## 本轮修复的退出问题

前一提交的 Linux CI 已完成原生三宿主 HMR 断言，但开发服务器没有退出。Vite 中间件模式没有独立 httpServer，开发关闭时 closeBundle 的 watchMode 仍为 true，旧逻辑因此跳过原生服务关闭。现在开发态 closeBundle 始终释放服务，生产构建 watch 仍保留服务到 watcher 关闭；新增生命周期测试区分这两个行为。

实际发布版本、成功运行链接及 registry 验收以 CHANGELOG 和对应 GitHub Release 中的 release.json 为准。配置了流程不等于某次发布已经成功。

2026-10-06，提交 `c140e8e` 的[完整 CI](https://github.com/kenconnet666/zerodep-js/actions/runs/37439243840) 已通过；随后的[发布运行](https://github.com/kenconnet666/zerodep-js/actions/runs/37443207385) 在门禁校验 run ID 时失败，尚未进入 npm 发布。原因是数字正则漏写反斜线，实际成为 `/^d+$/`。修复改用 `/^[0-9]+$/`，并执行工作流原始 JavaScript 验证十种接受和拒绝场景，包括数字 ID、错误分支、外部仓库、PR 事件和失败 CI。恢复时可手动指定上述已通过的运行 ID，继续使用原提交的固定产物，不重新打包候选。

[恢复运行](https://github.com/kenconnet666/zerodep-js/actions/runs/37448439386) 通过门禁后，首次在创建 GitHub 草稿 Release 时遇到 403，仍未进入 npm 上传。任务的 `contents: write` 已生效，但发布目标已不是分支头，且没有现存 tag；GitHub 对特定历史工作流提交的 Release 创建另有 [workflow 权限要求](https://github.blog/changelog/2023-11-02-github-actions-enforcing-workflow-scope-when-creating-a-release/)。已用现有本机授权创建 `v1.0.0-rc.3`，严格指向通过 CI 的 `c140e8eb07067f410b9ceaafe6e91c8864a09fe9`，随后恢复失败任务。没有给 Actions 增加个人凭据或改动候选产物。tag 存在不代表 npm 发布和注册表验收已经完成，仍以运行结果和发布记录为准。

RC3 恢复任务的第二次尝试仍在创建 GitHub Release 时返回 403，未进入 npm 上传；现存 tag 不能作为已发布证据。用户随后撤销旧编译器与宿主路线，当前清单使用新的 RC4，不继续发布旧清单，也不覆盖旧 tag 或产物。
