import { mkdtemp, rmdir, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { expect, it } from 'vitest';
import type { CompletionList, Location } from 'vscode-languageserver-types';
import { TypeScriptService } from '../src/language-service.js';
import { namespacedAttributes, positionAt, offsetAt } from '../src/namespaced-attributes.js';

it('官方 LSP 与 API 共用未保存文档的类型，命名空间补全可应用并指向真实声明', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'zerodep-language-'));
  const filename = join(directory, 'App.tsx');
  const configFile = join(directory, 'tsconfig.json');
  let service: TypeScriptService | undefined;
  try {
    await writeFile(
      configFile,
      JSON.stringify({
        compilerOptions: {
          strict: true,
          jsx: 'preserve',

          module: 'preserve',
          moduleResolution: 'bundler',
          types: [],
          target: 'es2025',
          paths: {
            'zerodep-js': [resolve('packages/core/src/index.ts')],
          },
        },
        include: ['*.tsx'],
      }),
    );
    await writeFile(filename, 'export {};');
    service = new TypeScriptService(directory, false);
    const info = await service.ready;
    expect(info.serverInfo.version).toContain('7.1');
    for (const prefix of ['bind', 'bind:', 'bind:v', 'bind : v']) {
      const text = `import {_state} from 'zerodep-js'; let text = _state('');
const view = <>🚀<input ${prefix}={text}/></>;`;
      const document = { uri: pathToFileURL(filename).href, languageId: 'typescriptreact', text };
      const position = positionAt(text, text.lastIndexOf(prefix) + prefix.length);
      const result = (await namespacedAttributes(
        service,
        document,
        position,
        'completion',
      )) as CompletionList;
      const item = result?.items.find((item) => item.label === 'bind:value');
      expect(item, prefix).toBeDefined();
      const edit = item!.textEdit!;
      expect('range' in edit).toBe(true);
      if (!('range' in edit)) throw new Error('补全缺少替换范围');
      const updated =
        text.slice(0, offsetAt(text, edit.range.start)) +
        edit.newText +
        text.slice(offsetAt(text, edit.range.end));
      expect(updated).toContain('<input bind:value={text}');
      const diagnostic = await service.request<{ items: { severity?: number }[] }>(
        'textDocument/diagnostic',
        { textDocument: { uri: document.uri } },
        { ...document, text: updated },
      );
      expect(
        diagnostic.items.filter((item) => item.severity === 1),
        prefix,
      ).toEqual([]);
      const locations = (await namespacedAttributes(
        service,
        { ...document, text: updated },
        positionAt(updated, updated.indexOf('bind:value') + 7),
        'definition',
      )) as Location[];
      expect(locations.length).toBeGreaterThan(0);
      expect(locations[0]!.uri).toContain('packages/core/src/native/elements.ts');
    }
    const component = `import {_component} from 'zerodep-js';
const Editor = _component(<T,>(props: { value: T; onValueChange: (next: T) => void }) => <span/>);
let value = '';
const view = <Editor<string> bind:v={value}/>;`;
    const componentDocument = {
      uri: pathToFileURL(filename).href,
      languageId: 'typescriptreact',
      text: component,
    };
    const candidates = (await namespacedAttributes(
      service,
      componentDocument,
      positionAt(component, component.lastIndexOf('bind:v') + 6),
      'completion',
    )) as CompletionList;
    const valueItem = candidates.items.find((item) => item.label === 'bind:value');
    // 普通 props / bind 的联合包含该属性缺席的分支，提示保留官方类型中的 undefined。
    expect(valueItem?.detail).toBe('string | undefined');
    const completed = component.replace('bind:v=', 'bind:value=');
    const declaration = (await namespacedAttributes(
      service,
      { ...componentDocument, text: completed },
      positionAt(completed, completed.lastIndexOf('bind:value') + 7),
      'definition',
    )) as Location[];
    expect(declaration).toHaveLength(1);
    expect(declaration[0]!.uri).toBe(componentDocument.uri);
    expect(declaration[0]!.range.start.line).toBe(1);
  } finally {
    await service?.close();
    await unlink(filename);
    await unlink(configFile);
    await rmdir(directory);
  }
});
