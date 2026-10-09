# 换机环境配置

更新：2026-10-09。当前源码与 IDE 使用微软官方 TypeScript 7.1.0-dev.20261008.1；此前 JetBrains 分支与旧 npm 框架发行记录属于历史状态。

## 1. 固定版本与获取方式

| 项目            | 本轮验证版本                  | 依据                                    |
| --------------- | ----------------------------- | --------------------------------------- |
| Node.js         | 24.18.0                       | 根目录 `.node-version`                  |
| pnpm            | 10.34.5                       | 根目录 `package.json` 的 packageManager |
| TypeScript SDK  | 7.1.0-dev.20261008.1          | pnpm catalog 与 lockfile                |
| WebStorm        | 2026.3 EAP，build 263.6259.34 | 只对此构建验证了 IDE 代理补丁           |
| Babel / Vite 等 | 使用锁文件                    | 不单独安装或升级 latest                 |

本机 IDE 实测平台是 Windows x64。仓库配置了七个平台 SDK，但这不等于各平台的 IDE 补丁都已人工验证。其他 WebStorm 构建必须先检查兼容性；不能只因版本名称相近就应用补丁。

安装 Node 后，在普通 PowerShell 中准备仓库：

```powershell
npm install --global pnpm@10.34.5
git clone https://github.com/kenconnet666/zerodep-js.git
Set-Location zerodep-js
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm exec tsc --version
pnpm build:packages
```

最后一个版本检查应返回 `Version 7.1.0-dev.20261008.1`。不需要 Go、TypeScript 源码仓库或自行编译 SDK。

SDK 主包与七个平台包均来自微软官方 npm 发行版。pnpm-workspace.yaml 精确固定主包版本，pnpm-lock.yaml 记录平台版本及完整性，不需要 GitHub URL 或平台 overrides。独立项目可使用 pnpm add -D typescript@7.1.0-dev.20261008.1。

若 GitHub 下载失败，先恢复网络或使用已配置的包管理器代理，再重试同一条 frozen-lockfile 安装。不要改版本号、删除锁文件或从其他 SDK 目录拼装文件。

## 2. 基础工程验收（CI）

以下是完整 CI 的检查入口，换机后不要求在本地逐项运行。本地先核对上节 SDK 版本和产物是否可用，开发时只跑改动相关的焦点检查。

```powershell
pnpm check
pnpm build
pnpm test:compiler
pnpm lsp:verify
pnpm lsp:completions
```

CI 在各自任务中执行这些检查；语言探针会临时创建示例源码，不能与同工作区的 check/build 并行。补全探针的全部用例都应通过，总数以当前脚本输出为准，服务版本应为上述 微软官方 SDK。完整浏览器与独立包消费同样由 CI 执行。完整远端 CI 尚未结束时，不能把本机焦点检查当作六平台和三浏览器矩阵全部通过。

## 3. WebStorm SDK 缓存

安装指定 EAP 构建；Windows x64 发行文件为 [WebStorm 263.6259.34](https://download.jetbrains.com/webstorm/WebStorm-263.6259.34.exe)。在 Help / About 核对 build；安装目录因机器而异，不照抄本机的 `WebStorm 2` 路径。

IDE 的“TypeScript 7（原生）”使用自己的预览缓存，项目的 SDK 使用 pnpm 安装目录。二者应来自同一发行版，但各自管理进程。IDE 自动下载地址可能没有这个新 SDK；可以把已经由 pnpm 校验的项目发行包放入 IDE 预览缓存。

先关闭 WebStorm，再从**项目根目录**运行以下 PowerShell 代码。它从真实 pnpm 包目录复制，不把链接路径或用户目录写进仓库；目标目录存在时拒绝覆盖。

```powershell
@'
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdirSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { createHash } from 'node:crypto';
import { compilerPath } from './packages/compiler/dist/typescript.js';

assert.equal(process.platform, 'win32', '这段安装步骤只用于 Windows');
const version = '7.1.0-dev.20261008.1';
const sdk = realpathSync('node_modules/typescript');
assert.equal(JSON.parse(readFileSync(join(sdk, 'package.json'), 'utf8')).version, version);
const binary = compilerPath();
const platform = `native-preview-win32-${process.arch}`;
const target = join(process.env.LOCALAPPDATA, 'JetBrains', 'WebStorm2026.3',
  'ts-go-native-preview', `v${version}`, 'node_modules', '@typescript');
const copies = [[sdk, 'native-preview'], [dirname(dirname(binary)), platform]];
for (const [, name] of copies) {
  assert(!existsSync(join(target, name)), `目标已存在，请先核对：${join(target, name)}`);
}
mkdirSync(target, { recursive: true });
for (const [source, name] of copies) cpSync(source, join(target, name), { recursive: true });
const hash = file => createHash('sha256').update(readFileSync(file)).digest('hex');
assert.equal(hash(binary), hash(join(target, platform, 'lib', 'tsc.exe')));
console.log('项目与 IDE 的 LSP 二进制一致：', target);
'@ | node --input-type=module
```

目标中主包目录名是 `native-preview`，但里面 package.json 的真实包名仍是 `typescript`；这是 IDE 的预览缓存布局，不需要修改包名、版本或 SDK 源码。已有缓存可以保留并核对，不必重复复制；不要删除其他版本或共享 pnpm store。

## 4. 应用 IDE 代理补丁

继续保持 IDE 关闭，设置实际安装目录后执行：

```powershell
$webstormInstall = 'C:\实际安装目录\WebStorm'
node scripts/language-services/webstorm-patch.mjs $webstormInstall check
node scripts/language-services/webstorm-patch.mjs $webstormInstall apply
node scripts/language-services/webstorm-patch.mjs $webstormInstall check
```

官方 7.1.0-dev.20261008.1 可复用现有代理补丁，已验证原生 API 查询，不需要新增 SDK 补丁。最终应显示 `patched: true`。脚本只接受已验证的 build 263.6259.34 原代理或补丁文件，先备份再改动；原文件在 `plugins/javascript-plugin/ts-go-proxy/index.js.original-263.6259.34`。不能跳过 SHA256 断言来给其他 IDE 版本强行打补丁。

启动 WebStorm，在 Find Action（Ctrl+Shift+A）打开 Registry：

1. 找到 `typescript.native-preview.ts-go.version`。
2. 完整替换为 **`v7.1.0-dev.20261008.1`**，注意保留开头的 `v`。
3. 设置 → 语言和框架 → TypeScript，选择 **TypeScript 7（原生）**。
4. 确认显示的版本为 `7.1.0-dev.20261008.1`，勾选 TypeScript 语言服务和服务驱动的类型引擎。
5. 执行 Find Action → Restart TypeScript Service。

这条路线通过 IDE 原生预览项启用类型引擎；选择项目 `node_modules/typescript` 可能仍受到 IDE 版本准入限制，不能把两种选择混为一谈。

验证必须包含实际行为：悬浮变量、泛型组件参数、修改类型后的刷新、制造一个类型错误再修复。已知 IDE MCP 的 `get_file_problems` 可能漏报 TypeScript 错误，空列表不是通过证据；同时看编辑器红线。仅看版本显示或按钮可勾选也不够。

## 5. 编辑器补全与格式化

以下配置已在 WebStorm 263.6259.34 与官方 TS7.1 上验证。Registry 属于 IDE 设置，升级 WebStorm 后应重新验证；`.idea` 中的格式化配置属于当前项目，不提交个人 IDE 文件。

### 自动导入使用公开包入口

此构建默认的 IDE 补全会把 `useCss` 导入为 `zerodep-js-ui/src`，尽管该子路径没有公开。TS7 标准 LSP 返回的路径是正确的 `zerodep-js-ui`。在 Find Action → Registry 中将以下两项取消勾选：

| Registry 键                                                     | 值      | 作用                                      |
| --------------------------------------------------------------- | ------- | ----------------------------------------- |
| `typescript.service.completion.customServiceContributorEnabled` | `false` | 改用标准 LSP 补全                         |
| `typescript.service.completion.ownContributorsEnabled`          | `false` | 服务补全可用时，不再混入 IDE 自有补全候选 |

保留 TypeScript 语言服务和服务驱动的类型引擎。已在真实编辑器验证：输入 `useC` 并接受补全后，`useCss` 会合并到现有 `zerodep-js-ui` 导入，悬浮类型仍可用。不需要为错误提示开放 `/src` 导出。

可用焦点探针检查服务端新增导入和合并导入两种情况：

```powershell
pnpm lsp:completions --case UI自动导入
```

该命令验证项目 LSP；WebStorm 的候选选择仍需在编辑器中实际测试。如果 `Ctrl+Space` 被中文输入法占用，用菜单“代码 → 代码补全 → 基本”验证，再在 Keymap 给 Basic Completion 选择不冲突的快捷键。

### 使用项目 Prettier

设置 → 语言和框架 → JavaScript → Prettier：

- 选择手动配置，包路径指向当前仓库的 `node_modules/prettier`。
- 勾选“执行重新设置代码格式操作时运行”和“保存时运行”。
- 将 Prettier 应用于依赖作用域之外的文件，让同仓库的各子包也使用根配置。
- 文件范围使用 `**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts,json,css,html,md,yml,yaml}`。
- 优先使用 Prettier 配置，`.prettierignore` 自动查找；粘贴时运行按个人习惯保留。

根 `.prettierrc.json` 和 `.editorconfig` 负责统一缩进、引号和换行，不要另设一套 IDE 格式规则。只对正在编辑的文件自动格式化，不在保存时运行全仓库构建或测试。上述保存与重新格式化入口见 [WebStorm Prettier 文档](https://www.jetbrains.com/help/webstorm/prettier.html)。

JavaScript 语言版本保持 ECMAScript 6+；项目实际语言与构建目标由 tsconfig/Vite 中的 ES2025 配置决定。日常开发使用 Vite，不启用 TypeScript“在更改时重新编译”。

### 设置窗口的焦点异常

本机曾出现 `SettingsNonModalDialog.onWindowActivated/onWindowDeactivated` 路径上的 `LockAccessDisallowed`。在“高级设置”搜索“对话框”，取消“在非模式对话框中显示设置”（英文为 Show settings in a non-modal dialog），使设置恢复为关闭后才能继续操作编辑器的普通对话框。这是针对该触发路径的规避配置，不代表 IDE 底层线程问题已经修复；语言服务和类型引擎保持开启。选项行为见 [JetBrains 高级设置说明](https://www.jetbrains.com/help/idea/advanced-settings.html#user-interface)。

## 6. 框架 LSP 与 Codex MCP

项目 LSP 和 WebStorm 原生 LSP 使用同版本、同一发行二进制。项目保留 bind 写回、源码映射等增强，不连接 IDE 私有管道。

```powershell
pnpm lsp:setup
pnpm lsp:verify
pnpm lsp:completions
```

`lsp:setup` 自动写入本机 Node/项目绝对路径，生成 `.codex/config.toml` 和 `.codex/lsp4ij/`。它们已被忽略，换机或移动仓库后应重新生成，不能复制旧机器生成的文件。

- **Codex 项目工具**：生成配置中的 `zerodep_js_lsp` 是 MCP 服务，供 Codex 查询框架语言能力。独立验证通过后重新加载 Codex；生成配置不等于当前会话已换进程。
- **WebStorm 框架增强**：安装 LSP4IJ，在语言服务器设置中 Import from custom template，选择 `.codex/lsp4ij` 文件夹。模板限定当前项目，之后测试 bind 提示、错误修复和跳转。
- **WebStorm IDE MCP**：在 EAP 的 MCP Server 设置里启用服务，复制它实际显示的 streamable-http 地址；在 Codex 的用户配置中更新现有 `[mcp_servers.webstorm]` 的 `url`。本机曾使用 `http://127.0.0.1:64543/stream`，**新机器端口不保证相同**。项目语言 MCP 与 IDE MCP 是两项配置。

Zerodep LSP 与 IDE 原生补全可能合并出同名候选。类型引擎与框架增强的覆盖范围也不同；不要全局关闭其他项目的 TS 服务来消除重复。具体边界见 [工具链](tooling.md)。

## 7. 回退与故障定位

| 现象                               | 先检查                                                          |
| ---------------------------------- | --------------------------------------------------------------- |
| IDE 下载版本 404                   | 核对 Registry 版本，并按第 3 节从项目官方 npm SDK 准备 IDE 缓存 |
| Cannot update an inactive snapshot | 新 SDK 配上了旧代理；检查补丁状态和实际服务进程版本             |
| 类型引擎置灰                       | 是否选了原生预览项，版本是否正确，IDE build 是否受支持          |
| 版本正确但提示陈旧                 | 重启 TypeScript 服务；项目 MCP 则重新加载 Codex                 |
| 标准 TS 正常，但 bind 写回错误漏检 | 框架 LSP 是否已导入并启用，不能只依赖原生 SDK                   |
| 补丁脚本拒绝哈希                   | IDE 已变更，先核对新构建，不改脚本断言强行覆盖                  |

关闭 IDE 后可恢复原代理：

```powershell
node scripts/language-services/webstorm-patch.mjs $webstormInstall restore
```

恢复后同时把 IDE Registry 的预览版本恢复为该 EAP 原配 `v7.1.0-dev.jetbrains.20260721.2`，再启动 IDE。此操作只恢复 IDE；项目仍保持新 SDK。若要求项目也回退，必须另行更改 catalog、锁文件和对应 API 适配，不能只换一个 package.json 版本。

升级 IDE 前保存补丁状态和原文件。旧补丁是否仍需要、原生 SDK 是否已支持，应重新验证。本文记录的是一次可复现的已验证组合，不承诺后续 EAP 自动兼容。

## 原生 CSS 依赖

CSS 已迁入 packages/css，与框架共用工作区依赖、TS7、构建和 LSP。换机只需当前仓库，无需相邻 CSS 仓库或 TS6。见 [原生 CSS](css.md)。
