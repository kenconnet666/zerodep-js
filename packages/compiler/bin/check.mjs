#!/usr/bin/env node
// 工作区首次安装时 dist 尚未生成；固定入口让 pnpm 能先建立命令链接。
import '../dist/cli.js';
