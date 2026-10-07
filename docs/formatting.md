# 原生解析与 WebStorm 格式化

项目保留 Prettier 3.9.9 的排版器，JS/TS/JSX/TSX 使用官方 `@prettier/plugin-oxc@0.2.3` 的 Rust 原生解析器。Svelte 格式插件与对应配置已删除。`.prettierrc.json` 显式选择 `oxc` / `oxc-ts`，编辑器、命令行及原生属性生成脚本读取同一份配置。

官方 TS7.1 负责类型，Babel 负责框架转换；格式化独立使用 Prettier。官方语言服务的排版规则不等同于项目 Prettier 配置，因此不再维护另一条框架排版入口。

## 使用

```sh
pnpm format
pnpm format:check
pnpm format:check --no-cache
```

命令通过 `scripts/format.mjs` 调用稳定 Prettier CLI，使用内容缓存。缓存目录按 pnpm 锁文件摘要区分，更新解析插件或其传递依赖后不会复用旧缓存。文件内容变化仍必须重新检查，已有回归用例验证缓存命中后的错误修改。

WebStorm 保留“自动 Prettier 配置”、保存时运行、粘贴时运行以及优先 Prettier 的设置即可。项目安装依赖后，现有 Prettier 服务会加载原生解析插件；不需要安装新的 IDE 插件，也不需要把格式化入口改为 Go。状态栏继续显示 Prettier 版本，不能仅靠这个标签判断内部解析器；可用配置、实际格式化结果和进程加载的原生模块共同核对。

2026-10-06 已在 WebStorm 2026.2.3 主项目实际执行菜单“重新设置代码格式”、粘贴未排版语句、插入多余空格后保存。三条入口的结果均与 CLI 一致；`bind:value`、中文和 emoji 保留正确。IDE 的 Prettier 进程实际加载 `parser.win32-x64-msvc.node`（oxc-parser 0.139.0），不只依据状态栏名称判断。临时探针已关闭并清理。

## 已测效果

同一批 198 个 TS/TSX 文件，三轮本机检查的中位数：

| 路径                                   |      耗时 |
| -------------------------------------- | --------: |
| 原 Prettier CLI，不缓存                |   5.688 s |
| 仅换原生解析器，不缓存                 |   4.975 s |
| 当前命令入口，不缓存，含启动包装       |   5.153 s |
| 当前命令入口，已有内容缓存，无文件变化 | 约 2.67 s |

原生解析本身约减少 12.5% 的批量耗时；当前完整命令的冷运行改善约 9%，重复无变更检查约减少 53%。缓存首轮仍需完整检查，不能把缓存命中当作重新格式化的吞吐量。WebStorm 使用常驻 Prettier API，其端到端交互延迟没有用这组 CLI 数据代替测量。

198 个文件的格式与原配置一致；另验证了 `bind:value`、中文/emoji 光标位置、选区格式化及生成类型文件的一致性。原始样本见 [format-performance.json](../reports/format-performance.json)。

曾测试官方实验并行 CLI，冷检查较快，但 Windows 出现原生模块退出异常 `0xC0000005`，因此当前不启用。Oxfmt 独立格式化器约 0.46 s，但在五个文件有换行差异，且 WebStorm 需要另一套插件接入；该数字属于候选方案，不是当前交付配置的速度。采用当前方案是为了保留已有 IDE 操作与相同排版规则。

参考：[Prettier 官方原生解析插件](https://raw.githubusercontent.com/prettier/prettier/main/packages/plugin-oxc/README.md)、[Prettier 缓存规则](https://prettier.io/docs/cli#cache)、[Oxfmt 编辑器接入](https://oxc.rs/docs/guide/usage/formatter/editors)。
