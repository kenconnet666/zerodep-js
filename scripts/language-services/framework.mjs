import { execFile } from 'node:child_process';
import { resolve } from 'node:path';
import { access } from 'node:fs/promises';
import { root } from './environment.mjs';

export async function frameworkDiagnostics(doc) {
  if (/\.d\.[cm]?ts$/.test(doc.path)) return [];
  if (!/\.[jt]sx$/.test(doc.path) && !doc.text.includes('zerodep-js')) return [];
  const cli = resolve(root, 'packages/compiler/dist/cli.js');
  try {
    await access(cli);
  } catch {
    throw new Error('框架编译器尚未构建，请先运行 pnpm build:packages。');
  }
  // 每次加载最新构建，并传同一份源码快照，避免 ESM 缓存或并发编辑造成诊断错位。
  const diagnostics = await new Promise((resolve, reject) => {
    const child = execFile(
      globalThis.process.execPath,
      [cli, '--stdin', doc.path, '--json'],
      {
        cwd: root,
        windowsHide: true,
        timeout: 15000,
        maxBuffer: 2 * 1024 * 1024,
      },
      (error, stdout, stderr) => {
        if (error && error.code !== 1) {
          reject(new Error('框架诊断失败：' + (stderr || error.message)));
          return;
        }
        try {
          const items = JSON.parse(stdout);
          if (!Array.isArray(items)) throw new Error('诊断结果不是数组');
          resolve(items);
        } catch (error) {
          reject(error);
        }
      },
    );
    child.stdin.on('error', reject);
    child.stdin.end(doc.text);
  });
  return diagnostics.map((item) => ({
    code: item.code,
    severity: 1,
    message: item.message,
    source: 'zerodep-js',
    range: {
      start: { line: item.line, column: item.column },
      end: { line: item.endLine ?? item.line, column: item.endColumn ?? item.column + 1 },
    },
  }));
}
