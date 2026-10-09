import {
  mkdtemp,
  readFile,
  readdir,
  rmdir,
  stat,
  unlink,
  utimes,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { expect, it } from 'vitest';
import { LanguageWorkspace } from '../src/language-workspace.js';
import { checkProject } from '../src/checker.js';

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'zerodep-owned-test-'));
  await writeFile(
    join(root, 'tsconfig.json'),
    JSON.stringify({
      compilerOptions: {
        strict: true,
        types: [],
        target: 'es2025',
        module: 'preserve',
        declaration: true,
        outDir: './out',
        tsBuildInfoFile: './user.tsbuildinfo',
      },
      include: ['*.ts'],
    }),
  );
  await writeFile(join(root, 'entry.ts'), 'export const value: number = 1;');
  return root;
}

async function cleanup(root: string) {
  for (const name of await readdir(root)) await unlink(join(root, name));
  await rmdir(root);
}

it('语言工具宿主独占官方进程，关闭、外部退出和重建不会影响其他宿主', async () => {
  const root = await fixture();
  const first = new LanguageWorkspace(root);
  const other = new LanguageWorkspace(root);
  const alive = (pid: number) => {
    try {
      process.kill(pid, 0);
      return true;
    } catch {
      return false;
    }
  };
  try {
    await Promise.all([first.request({ action: 'info' }), other.request({ action: 'info' })]);
    const one = first.language.child.pid!;
    const two = other.language.child.pid!;
    expect(one).not.toBe(two);
    await first.close();
    await first.close();
    expect(alive(one)).toBe(false);
    expect(alive(two)).toBe(true);
    await expect(first.request({ action: 'info' })).rejects.toThrow('已关闭');
    await other.request({ action: 'lsp', method: 'workspace/symbol', params: { query: 'value' } });
    process.kill(two);
    await expect.poll(() => alive(two)).toBe(false);
    await expect(
      other.request({ action: 'lsp', method: 'workspace/symbol', params: { query: 'value' } }),
    ).rejects.toThrow();
    const replacement = new LanguageWorkspace(root);
    try {
      await replacement.request({ action: 'info' });
    } finally {
      await replacement.close();
    }
  } finally {
    await first.close();
    await other.close();
    await cleanup(root);
  }
});

it('完整检查覆盖依赖变化、回退时间戳和新增文件，保留用户增量缓存与输出', async () => {
  const root = await fixture();
  const config = join(root, 'tsconfig.json');
  try {
    const input = join(root, 'input.ts');
    await writeFile(input, 'export const input = 1;');
    await writeFile(
      join(root, 'entry.ts'),
      'import {input} from "./input"; export const value: number = input;',
    );
    await writeFile(join(root, 'user.tsbuildinfo'), '用户原有缓存');
    expect(await checkProject(config)).toEqual([]);
    const before = await stat(input);
    await writeFile(input, 'export const input = "错误";');
    await utimes(input, before.atime, before.mtime);
    expect((await checkProject(config)).map((item) => item.code)).toContain('TS2322');
    await writeFile(input, 'export const input = 2;');
    expect(await checkProject(config)).toEqual([]);
    await writeFile(join(root, 'extra.ts'), 'export const extra: number = "错误";');
    expect((await checkProject(config)).map((item) => item.code)).toContain('TS2322');
    await unlink(join(root, 'extra.ts'));
    expect(await checkProject(config)).toEqual([]);
    expect(await readFile(join(root, 'user.tsbuildinfo'), 'utf8')).toBe('用户原有缓存');
    expect(await readdir(root)).not.toContain('out');
  } finally {
    await cleanup(root);
  }
});

it('错误的工作目录不能静默扩大为父目录或整个磁盘', () => {
  expect(() => new LanguageWorkspace('package.json')).toThrow('现有目录');
  expect(() => new LanguageWorkspace('.missing-workspace-for-test')).toThrow();
});
