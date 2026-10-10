import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { expect, it } from 'vitest';

it('浏览器 CI 镜像与安装的 Playwright 版本一致，镜像固定到摘要', () => {
  const workflow = readFileSync(new URL('../../.github/workflows/ci.yml', import.meta.url), 'utf8');
  const image = workflow.match(
    /image: mcr\.microsoft\.com\/playwright:v([^\s]+)-noble@sha256:([a-f0-9]{64})\b/,
  );
  expect(image, '浏览器镜像必须使用明确版本与 SHA256').not.toBeNull();
  const require = createRequire(import.meta.url);
  const { version } = require('@playwright/test/package.json') as { version: string };
  expect(image![1], '升级 Playwright 时需同步更新官方镜像及摘要').toBe(version);
});
