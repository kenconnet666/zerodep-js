import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';

const root = resolve(import.meta.dirname, '../..');
const directories = [
  '.',
  'packages/core',
  'packages/css',
  'packages/compiler',
  'packages/ui',
  'apps/docs',
  'apps/example',
];
const manifests = new Map(
  directories.map((directory) => [
    directory,
    JSON.parse(readFileSync(resolve(root, directory, 'package.json'), 'utf8')) as {
      scripts: Record<string, string>;
    },
  ]),
);

it('项目脚本不隐式串联检查、构建和测试', () => {
  for (const [directory, { scripts }] of manifests) {
    for (const [name, command] of Object.entries(scripts)) {
      expect(command, `${directory}: ${name}`).not.toMatch(/&&|\|\||;/);
      expect(name, `${directory}: 禁止生命周期钩子暗中补建`).not.toMatch(
        /^pre(?:build|test|check)|^post(?:build|test|check)/,
      );
      if (/^(?:build|dev)(?::|$)/.test(name) && command.startsWith('tsc ')) {
        expect(command, `${directory}: ${name} 不做完整类型检查`).toContain('--noCheck');
      }
    }
  }
});

it('CI 的项目操作都能解析到对应 package.json', () => {
  for (const workflow of ['ci.yml', 'release.yml']) {
    const source = readFileSync(resolve(root, '.github/workflows', workflow), 'utf8');
    for (const match of source.matchAll(
      /run: pnpm (?:--dir (\S+) |(-r) (?:--filter "[^"]+" )?)?([a-z][\w:-]*)/g,
    )) {
      const [, directory = '.', recursive, operation] = match;
      if (['install', 'exec'].includes(operation!)) continue;
      expect(
        recursive
          ? [...manifests].some(([path, manifest]) => path !== '.' && manifest.scripts[operation!])
          : manifests.get(directory)?.scripts[operation!],
        `${workflow}: ${match[0]}`,
      ).toBeTruthy();
    }
  }
});

it('应用客户端和服务端输出互不清空，预览读取客户端目录', () => {
  for (const directory of ['apps/docs', 'apps/example']) {
    const { scripts } = manifests.get(directory)!;
    expect(scripts['build:client']).toContain('--outDir dist/client');
    expect(scripts['build:server']).toContain('--outDir dist/server');
    expect(scripts.build).toBeUndefined();
  }
  expect(manifests.get('apps/docs')!.scripts.preview).toContain('--outDir dist/client');
});
