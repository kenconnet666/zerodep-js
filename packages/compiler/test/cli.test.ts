import { execFile, spawnSync } from 'node:child_process';
import { mkdtemp, writeFile, unlink, rmdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { expect, it } from 'vitest';

it('独立检查入口返回源码位置与退出码，修正后清零', async () => {
  const folder = await mkdtemp(resolve(tmpdir(), 'zerodep-check-'));
  const file = resolve(folder, 'component.ts');
  const cli = fileURLToPath(new URL('../dist/cli.js', import.meta.url));
  const run = promisify(execFile);
  try {
    await writeFile(
      file,
      `import { component } from 'zerodep-js';\nconst App = component(({ value }) => { value++; return null; });`,
    );
    try {
      await run(process.execPath, [cli, file, '--json']);
      expect.unreachable();
    } catch (error) {
      const failure = error as { code: number; stdout: string };
      expect(failure.code).toBe(1);
      expect(JSON.parse(failure.stdout)[0]).toMatchObject({
        code: 'ZJ1203',
        filename: file,
        line: 2,
      });
    }
    await writeFile(
      file,
      `import { component } from 'zerodep-js';\nconst App = component(({ value }) => value);`,
    );
    expect(JSON.parse((await run(process.execPath, [cli, file, '--json'])).stdout)).toEqual([]);
    const stdin = spawnSync(process.execPath, [cli, '--stdin', 'buffer.tsx', '--json'], {
      encoding: 'utf8',
      input: `import { $derived } from 'zerodep-js'; const value = $derived(1); value++;`,
    });
    expect(stdin.status).toBe(1);
    expect(JSON.parse(stdin.stdout)[0]).toMatchObject({ filename: 'buffer.tsx', code: 'ZJ1005' });
  } finally {
    await unlink(file);
    await rmdir(folder);
  }
});
