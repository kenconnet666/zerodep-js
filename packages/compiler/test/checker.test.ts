import { mkdtemp, rmdir, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { expect, it } from 'vitest';
import { checkProject } from '../src/checker.js';

it('项目入口检查未被页面引用的源码，并把绑定写回错误定位到原文', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'zerodep-project-check-'));
  const files = ['tsconfig.json', 'App.tsx', 'Unused.tsx'];
  try {
    await writeFile(
      join(directory, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          jsx: 'preserve',
          jsxImportSource: 'zerodep-js',
          target: 'es2023',
          module: 'preserve',
          moduleResolution: 'bundler',
          types: [],
          paths: {
            'zerodep-js': [resolve('packages/core/src/index.ts')],
            'zerodep-js/*': [resolve('packages/core/src/*')],
          },
        },
        include: ['*.tsx'],
      }),
    );
    await writeFile(
      join(directory, 'App.tsx'),
      `import {_state} from 'zerodep-js';
let name = _state('');
const view = <input bind:value={name}/>;`,
    );
    await writeFile(
      join(directory, 'Unused.tsx'),
      `export {};
let name: 'a' | 'b' = 'a';
const view = <input bind:value={name}/>;`,
    );
    const diagnostics = await checkProject(join(directory, 'tsconfig.json'));
    expect(diagnostics).toEqual([
      expect.objectContaining({
        code: 'TS2322',
        line: 3,
        column: 'const view = <input bind:value={'.length + 1,
      }),
    ]);
    expect(diagnostics[0]!.filename.replaceAll('\\', '/')).toBe(
      join(directory, 'Unused.tsx').replaceAll('\\', '/'),
    );
    await writeFile(
      join(directory, 'Unused.tsx'),
      `import {_derived} from 'zerodep-js';
let name = _derived(''); name = 'changed';`,
    );
    const framework = await checkProject(join(directory, 'tsconfig.json'));
    expect(framework.some((item) => item.code === 'ZJ1005')).toBe(true);
  } finally {
    for (const file of files) await unlink(join(directory, file));
    await rmdir(directory);
  }
}, 30000);
