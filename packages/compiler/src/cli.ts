#!/usr/bin/env node
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { diagnose, type Diagnostic } from './index.js';

const ignored = new Set([
  'node_modules',
  'dist',
  '.git',
  '.codex',
  '.idea',
  'coverage',
  'test-results',
  'playwright-report',
]);
const extensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.mts', '.cts', '.mjs', '.cjs']);

async function collect(path: string, files: Set<string>): Promise<void> {
  const entry = await stat(path);
  if (entry.isDirectory()) {
    for (const child of await readdir(path, { withFileTypes: true })) {
      if (!child.isSymbolicLink() && !ignored.has(child.name))
        await collect(resolve(path, child.name), files);
    }
  } else if (entry.isFile() && extensions.has(extname(path)) && !/\.d\.[cm]?ts$/.test(path))
    files.add(path);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.includes('--help')) {
    process.stdout.write(
      'zerodep-check [文件或目录...] [--json]\nzerodep-check --stdin 文件名 [--json]\n检查框架语义；TypeScript 类型检查仍由 tsc 承担。\n',
    );
    return;
  }
  const json = args.includes('--json');
  const stdinIndex = args.indexOf('--stdin');
  if (stdinIndex >= 0) {
    const filename = args[stdinIndex + 1];
    if (!filename || filename.startsWith('-')) throw new Error('--stdin 需要诊断文件名。');
    if (
      args.some(
        (arg, index) => index !== stdinIndex && index !== stdinIndex + 1 && arg !== '--json',
      )
    )
      throw new Error('--stdin 仅接受一个文件名及可选的 --json。');
    process.stdin.setEncoding('utf8');
    let source = '';
    for await (const chunk of process.stdin) source += chunk;
    print(diagnose(source, filename), json, 1);
    return;
  }
  const paths = args.filter((arg) => arg !== '--json');
  if (paths.some((arg) => arg.startsWith('-')))
    throw new Error('未知参数，请使用 --help 查看用法。');
  const files = new Set<string>();
  for (const path of paths.length ? paths : ['.']) await collect(resolve(path), files);
  const diagnostics: Diagnostic[] = [];
  for (const file of [...files].sort())
    diagnostics.push(...diagnose(await readFile(file, 'utf8'), file));
  print(diagnostics, json, files.size);
}

function print(diagnostics: Diagnostic[], json: boolean, count: number): void {
  if (json) process.stdout.write(JSON.stringify(diagnostics) + '\n');
  else {
    for (const item of diagnostics)
      process.stdout.write(
        `${item.filename}:${item.line}:${item.column} ${item.code} ${item.message}\n`,
      );
    process.stdout.write(`框架检查：${count} 个文件，${diagnostics.length} 个错误。\n`);
  }
  if (diagnostics.length) process.exitCode = 1;
}

try {
  await main();
} catch (error) {
  process.stderr.write(`框架检查失败：${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 2;
}
