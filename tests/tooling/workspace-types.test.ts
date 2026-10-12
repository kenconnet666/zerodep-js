import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { expect, it } from 'vitest';
import { TypeScriptService } from '../../packages/compiler/src/language/service.js';

it('工作区项目引用让回调 CSS 与 class 数组使用源码类型，仍保留参数错误', async () => {
  const service = new TypeScriptService(process.cwd(), false);
  try {
    for (const file of [
      'packages/ui/src/base/ButtonGroup.tsx',
      'packages/ui/src/base/ButtonContent.tsx',
      'apps/example/src/examples/CssExample.tsx',
    ]) {
      const text = await readFile(file, 'utf8');
      const document = {
        uri: pathToFileURL(resolve(file)).href,
        languageId: 'typescriptreact',
        text,
      };
      const params = { textDocument: { uri: document.uri } };
      const report = await service.request<{ items: { severity?: number }[] }>(
        'textDocument/diagnostic',
        params,
        document,
      );
      expect(
        report.items.filter((item) => item.severity === 1),
        file,
      ).toEqual([]);
      if (file.endsWith('/ButtonGroup.tsx')) {
        const invalid = text.replace('s.zIndex(1)', 's.zIndex({})');
        expect(invalid).not.toBe(text);
        const checked = await service.request<{ items: { severity?: number }[] }>(
          'textDocument/diagnostic',
          params,
          { ...document, text: invalid },
        );
        expect(checked.items.some((item) => item.severity === 1)).toBe(true);
      }
    }
  } finally {
    await service.close();
  }
});
