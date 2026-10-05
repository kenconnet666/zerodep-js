# TypeScript 原生补丁

本目录保存针对 Microsoft TypeScript 固定提交的最小补丁及其原许可证。来源为 [microsoft/TypeScript](https://github.com/microsoft/TypeScript)，上游提交和 npm 版本由 `scripts/language-services/typescript-target.json` 固定。

TypeScript 代码遵循 Apache-2.0，许可证见 [LICENSE.typescript](LICENSE.typescript)。补丁是本项目的修改，不是 Microsoft 发布的官方修复；构建出的 SDK 继续携带上游 LICENSE/NOTICE，版本后缀为 `+zerodep.1`，只写入项目 `.codex/typescript-sdk`。

当前补丁修复 JSX 命名空间补全的上下文、候选、编辑范围和冒号触发，以及未写大括号的 JSX 属性表达式补全。它包含原生回归用例并恢复一项曾跳过的上游测试；项目端另有 `pnpm lsp:completions` 的实际编辑矩阵。实现依据、复现和维护边界见 [修复记录](../.design/typescript71-jsx-completions.md)。

升级上游时重新定位并测试补丁，不增加多版本分支或修改共享 pnpm store。
