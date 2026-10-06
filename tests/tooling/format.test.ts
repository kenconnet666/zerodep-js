import { expect, it } from 'vitest';
import { formatWithCursor, resolveConfig } from 'prettier';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

const root = resolve(import.meta.dirname, '../..');
const execute = promisify(execFile);

it('原生解析保留 bind、Unicode 光标与选区格式化结果', async () => {
  const filepath = resolve(root, 'apps/example/src/format-probe.tsx');
  const options = await resolveConfig(filepath);
  expect(options?.parser).toBe('oxc-ts');
  const source = `const 文本="🚀";\nconst view=<input bind:value={文本} title="表单"/>;\n`;
  const base = { ...options, filepath, cursorOffset: source.indexOf('bind:value') + 5 };
  const native = await formatWithCursor(source, base);
  const reference = await formatWithCursor(source, { ...base, parser: 'typescript' });
  expect(native).toEqual(reference);
  expect(native.formatted.slice(native.cursorOffset, native.cursorOffset + 5)).toBe('value');
  const range = { ...base, rangeStart: source.indexOf('const view'), rangeEnd: source.length };
  expect(await formatWithCursor(source, range)).toEqual(
    await formatWithCursor(source, { ...range, parser: 'typescript' }),
  );
});

it('命令行缓存命中后仍发现源码变化，write 与 check 使用同一规则', async () => {
  const folder = await mkdtemp(resolve(root, '.codex/format-check-'));
  const file = resolve(folder, 'probe.tsx');
  const run = (mode: string) =>
    execute(process.execPath, [resolve(root, 'scripts/format.mjs'), mode, file], {
      cwd: root,
      windowsHide: true,
    });
  try {
    await writeFile(file, 'export const view=<input bind:value={text} />;');
    await expect(run('--check')).rejects.toMatchObject({ code: 1 });
    await run('--write');
    await run('--check');
    const formatted = await readFile(file, 'utf8');
    expect(formatted).toContain('bind:value={text}');
    await writeFile(file, formatted + 'export const value={changed:true};');
    await expect(run('--check')).rejects.toMatchObject({ code: 1 });
    await run('--write');
    await run('--check');
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
}, 30000);
