# 候选发布与恢复

发布清单唯一维护于 scripts/package-list.mjs：core、ssr、compiler、css。包使用同一个版本；当前 SDK 与平台二进制来自微软官方 npm 发行版，独立项目无需平台 overrides，见 [包边界](packages.md)。

## 发布门槛

1. 工作区包含全部需要的源码、类型、测试与文档，保留并完成本轮已有改动。
2. 相关本地检查通过，候选提交已推送，完整 CI 成功。
3. CI 覆盖工程检查、三浏览器、Linux/Windows 独立消费以及六平台选定 SDK 验证。
4. CI 保存同一提交的固定 tgz、版本与 SHA-512；发布过程不重新构造另一批包。

```sh
pnpm release:check
pnpm release:prepare --version <新候选版本>
pnpm release:pack
pnpm release:status
```

prepare 只准备版本和产物，不代表已发布。发布脚本拒绝脏工作区、越界产物、摘要不一致、私有包与未通过完整 CI 的提交。不得覆盖已存在版本。

## 发布与验证

```sh
pnpm release:publish --github-release
pnpm release:verify-registry --github-release
```

仅上传固定产物到 next，不自动提升 latest。用户已授权在验收通过后使用环境变量中的 npm 凭据；凭据只在发布步骤使用，不写入源码、提示或日志。GitHub Release 与 npm 状态分别核对，不能把其中一个成功视为全部完成。

release.yml 只接受本仓库 main 的成功 CI 或明确指定的成功运行，下载 release-candidate 产物后发布。已删除定制 SDK 的构建、下载、恢复与平台包发布前置。

## 恢复与回滚

npm 可能先受理上传、稍后才能查询。账本保留 attemptedAt/acceptedAt：未知或暂不可见状态先查询，不盲目再次上传。同一版本必须始终匹配原 tgz 摘要。

恢复使用 release:ci 和原成功 CI 的产物。发布成功后执行工作区外注册表消费，确认类型、组件库、CSR/SSR 与卸载。失败时保留日志和账本，修复源码使用新版本；不要强推历史或覆盖版本。

## 换机恢复固定产物

`.release/` 是忽略目录，Git 拉取不会恢复其中的 tgz。优先从对应 GitHub 预发布下载该版本账本列出的全部 tgz 与 release.json（历史 rc.8 为五包，后续源码清单已减为四包）；尚未建立预发布时，从同一源码提交的成功 CI 下载 `release-candidate`。每次恢复都核对账本 revision、包版本、文件集合与 SHA-512，再继续 `release:ci`，不能以当前构建替换已尝试上传的产物。

CSS 仓库的候选位于 `test-results/release/`，使用 manifest.json 记录 commit 和六包摘要。发布后将原 tgz 与 manifest 保存到对应 GitHub 预发布，供换机恢复。若尚未发布且原产物确实无法恢复，只能从指定源码重新构建、冻结并重新执行产物消费验证；新的摘要是新的验收记录，不能沿用此前本机产物的通过结论。

正式提升 latest 属于独立的稳定版本决定。当前状态见 [执行记录](execution.md)，历史发布证据见 CHANGELOG。
