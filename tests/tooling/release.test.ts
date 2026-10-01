import { expect, it } from 'vitest';
import { execFile, execFileSync } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import { promisify } from 'node:util';

const exec = promisify(execFile);
const project = resolve(import.meta.dirname, '../..');
const folders = ['core', 'compiler', 'ssr', 'vite'];
const names = ['zerodep-js', 'zerodep-js-compiler', 'zerodep-js-ssr', 'zerodep-js-vite'];

it('发布工具固定产物、拒绝篡改/越界/私有包，并仅准备明确候选版本', async () => {
  expect(process.env.npm_execpath, '请通过 pnpm test 运行发布工具集成用例').toBeTruthy();
  const temporary = await realpath(tmpdir());
  const fixture = await mkdtemp(resolve(temporary, 'zerodep-release-'));
  const inside = relative(temporary, fixture);
  expect(
    inside.startsWith('zerodep-release-') && !inside.includes(sep) && !isAbsolute(inside),
  ).toBe(true);
  const env = { ...process.env, CI: 'true', NPM_TOKEN: '', NODE_AUTH_TOKEN: '' };
  const git = (...args: string[]) =>
    execFileSync('git', args, { cwd: fixture, encoding: 'utf8', windowsHide: true });
  const run = (command: string, ...args: string[]) =>
    exec(process.execPath, ['scripts/release.mjs', command, ...args], {
      cwd: fixture,
      env,
      windowsHide: true,
    });
  const save = (name: string, value: unknown) =>
    writeFile(resolve(fixture, name), JSON.stringify(value, null, 2) + '\n');
  try {
    await mkdir(resolve(fixture, 'scripts'));
    await copyFile(
      resolve(project, 'scripts/release.mjs'),
      resolve(fixture, 'scripts/release.mjs'),
    );
    await copyFile(resolve(project, 'LICENSE'), resolve(fixture, 'LICENSE'));
    const workspace = JSON.parse(await readFile(resolve(project, 'package.json'), 'utf8'));
    await save('package.json', {
      name: 'release-fixture',
      private: true,
      type: 'module',
      packageManager: workspace.packageManager,
      scripts: { 'build:packages': 'node -e "0"' },
    });
    await writeFile(resolve(fixture, 'pnpm-workspace.yaml'), 'packages:\n  - packages/*\n');
    await writeFile(resolve(fixture, '.gitignore'), '.release/\nnode_modules/\n');
    for (const [index, folder] of folders.entries()) {
      const directory = resolve(fixture, 'packages', folder);
      await mkdir(directory, { recursive: true });
      await copyFile(resolve(project, 'LICENSE'), resolve(directory, 'LICENSE'));
      await writeFile(resolve(directory, 'index.js'), 'export const fixture = true;\n');
      await save(`packages/${folder}/package.json`, {
        name: names[index],
        version: '0.0.0',
        private: true,
        type: 'module',
        license: 'MIT',
        files: ['index.js', 'LICENSE'],
        publishConfig: { access: 'public', registry: 'https://registry.npmjs.org/' },
      });
    }
    git('init', '-b', 'main');
    git('config', 'core.autocrlf', 'false');
    git('add', '.');
    git(
      '-c',
      'user.name=发布工具测试',
      '-c',
      'user.email=fixture@example.invalid',
      'commit',
      '-m',
      '建立独立发布夹具',
    );
    await run('check');
    await run('pack');
    const ledgerPath = resolve(fixture, '.release/0.0.0/release.json');
    const ledgerText = await readFile(ledgerPath, 'utf8');
    const ledger = JSON.parse(ledgerText);
    expect(ledger.packages.map((entry: { name: string }) => entry.name)).toEqual(names);
    await run('pack');
    expect(await readFile(ledgerPath, 'utf8')).toBe(ledgerText);
    await expect(run('publish')).rejects.toMatchObject({
      stderr: expect.stringContaining('开发私有包不能发布'),
    });

    const archive = resolve(fixture, '.release/0.0.0', ledger.packages[0].file);
    const original = await readFile(archive);
    await writeFile(archive, Buffer.concat([original, Buffer.from('changed')]));
    await expect(run('pack')).rejects.toMatchObject({ code: 1 });
    await writeFile(archive, original);
    ledger.packages[0].file = '../../outside.tgz';
    await writeFile(ledgerPath, JSON.stringify(ledger));
    await expect(run('pack')).rejects.toMatchObject({
      stderr: expect.stringContaining('产物文件名必须留在本版本目录'),
    });
    await writeFile(ledgerPath, ledgerText);
    await expect(run('prepare', '--version', '../bad')).rejects.toMatchObject({ code: 1 });
    await run('prepare', '--version', '1.0.0-rc.1');
    for (const folder of folders) {
      const manifest = JSON.parse(
        await readFile(resolve(fixture, `packages/${folder}/package.json`), 'utf8'),
      );
      expect(manifest.version).toBe('1.0.0-rc.1');
      expect(manifest.private).toBeUndefined();
    }
    await expect(run('pack')).rejects.toMatchObject({
      stderr: expect.stringContaining('需要干净工作区'),
    });
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
}, 60_000);
