#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { NativeTools, applyTextEdits, fileEdits, writeEdits } from './tools.js';

const usage =
  'zerodep-tools <check|lint|build|format|imports|fix|boundary|api|status|stop> [文件] [-p tsconfig.json]\n编辑默认只检查或返回建议；--write 写入，fix 还需 --action 编号。\napi --baseline 文件 [--update] 检查或更新公开 API 基线；format 是 Go 排版试验入口。';

async function main(): Promise<void> {
  const [command, ...args] = process.argv.slice(2);
  if (!command || command === '--help' || command === '-h') {
    console.log(usage);
    return;
  }
  const { values, positionals } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      force: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h' },
      project: { type: 'string', short: 'p', multiple: true },
      lint: { type: 'boolean', default: false },
      write: { type: 'boolean', default: false },
      json: { type: 'boolean', default: false },
      browser: { type: 'boolean', default: false },
      'package-root': { type: 'string' },
      baseline: { type: 'string' },
      update: { type: 'boolean', default: false },
      action: { type: 'string' },
    },
  });
  if (values.help) {
    console.log(usage);
    return;
  }
  const tools = new NativeTools();
  const projects = values.project ?? ['tsconfig.json'];
  try {
    if (command !== 'check' && command !== 'lint' && projects.length !== 1)
      throw new Error('此命令每次只接受一个 --project；多个项目使用 check 或 lint。');
    if (values.update && (command !== 'api' || !values.baseline))
      throw new Error('--update 需要 api --baseline <文件>。');
    if (command === 'check' || command === 'lint') {
      const result = await tools.check(
        projects,
        values.lint || command === 'lint' ? { lint: true } : {},
      );
      if (values.json) console.log(JSON.stringify(result));
      else
        for (const item of result.diagnostics)
          console.error(
            `${item.filename}:${item.line}:${item.column} ${item.code}: ${item.message}`,
          );
      if (!result.complete)
        console.error(
          '项目在检查期间发生变化，请重试：\n' + (result.changedFiles ?? []).join('\n'),
        );
      if (result.diagnostics.length || !result.complete) process.exitCode = 1;
    } else if (command === 'build') {
      const result = await tools.build(projects[0]!);
      if (values.json) console.log(JSON.stringify(result));
      else
        for (const item of result.diagnostics)
          console.error(
            `${item.filename}:${item.line}:${item.column} ${item.code}: ${item.message}`,
          );
      if (result.status !== 0) process.exitCode = 1;
    } else if (command === 'format' || command === 'imports') {
      if (!positionals.length) throw new Error('请指定要处理的文件。');
      for (const file of positionals) {
        const result = command === 'format' ? await tools.format(file) : await tools.imports(file);
        if (values.write) await writeEdits(result);
        else if (values.json) console.log(JSON.stringify(result));
        else if (applyTextEdits(result.original, result.edits) !== result.original) {
          console.log(file);
          process.exitCode = 1;
        }
      }
    } else if (command === 'fix') {
      if (positionals.length !== 1) throw new Error('fix 每次处理一个文件。');
      const file = resolve(positionals[0]!);
      const result = await tools.actions(file);
      if (values.write) {
        const index = Number(values.action);
        const action = result.actions[index];
        if (!values.action || !Number.isInteger(index) || !action)
          throw new Error('先查看修复建议，再用 --action <从 0 开始的编号> --write 选择一项。');
        await writeEdits({
          file,
          original: result.document.text,
          edits: fileEdits(file, [action]),
        });
      } else console.log(JSON.stringify(result.actions, null, 2));
    } else if (command === 'boundary') {
      if (!positionals.length) throw new Error('请指定边界检查文件。');
      const result = await tools.boundaries(positionals, {
        browser: values.browser,
        ...(values['package-root'] ? { packageRoot: values['package-root'] } : {}),
      });
      console.log(JSON.stringify(result, null, 2));
      if (result.length) process.exitCode = 1;
    } else if (command === 'api') {
      if (!positionals.length) throw new Error('请指定公开入口源文件。');
      const text = JSON.stringify(await tools.apiReport(projects[0]!, positionals), null, 2) + '\n';
      if (values.baseline) {
        if (values.update) {
          await mkdir(dirname(resolve(values.baseline)), { recursive: true });
          await writeFile(values.baseline, text);
        } else if ((await readFile(values.baseline, 'utf8')) !== text) {
          console.error('公开 API 报告已变化，请审阅后使用 --update 更新基线。');
          process.exitCode = 1;
        }
      } else console.log(text.trimEnd());
    } else if (command === 'stop') {
      await tools.stop({ force: values.force });
      console.log('原生工作区服务已停止。');
    } else if (command === 'status') console.log(JSON.stringify(await tools.stats(), null, 2));
    else
      throw new Error(
        '用法：zerodep-tools <check|lint|build|format|imports|fix|boundary|api|status|stop> [文件] [-p tsconfig.json]',
      );
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  } finally {
    await tools.close();
  }
}
void main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
