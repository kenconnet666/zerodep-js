import { mkdtemp, writeFile, unlink, rmdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { Diagnostic } from 'vscode-languageserver-types';
import { expect, it } from 'vitest';
import { LanguageWorkspace } from '../src/language/workspace.js';

it('新启动语言服务对泛型绑定与 readonly 写回给出一致的原源码诊断，并能恢复', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'zerodep-binding-language-'));
  const filename = join(directory, 'App.tsx');
  const config = join(directory, 'tsconfig.json');
  const source = `import {_component,_state} from 'zerodep-js';
type Props<T>={value:T;onValueChange:(next:T)=>void;format:(value:T)=>string;parse:(text:string)=>T};
const Input=_component(<T,>({value,onValueChange,format,parse}:Props<T>)=><input value={format(value)} onInput={e=>onValueChange(parse(e.currentTarget.value))}/>);
const Field=_component(<T,>({value,onValueChange,...rest}:Props<T>)=><Input {...rest} value={value} onValueChange={next=>onValueChange(next)}/>);
let form=_state<{name:string}>({name:'A'});
const view=<Field<string> bind:value={form.name} format={text=>text} parse={text=>text}/>;`;
  let workspace: LanguageWorkspace | undefined;
  try {
    await writeFile(
      config,
      JSON.stringify({
        compilerOptions: {
          strict: true,
          jsx: 'preserve',
          target: 'es2025',
          module: 'preserve',
          moduleResolution: 'bundler',
          types: [],
          paths: { 'zerodep-js': [resolve('packages/core/src/index.ts')] },
        },
        include: ['*.tsx'],
      }),
    );
    await writeFile(filename, source);
    workspace = new LanguageWorkspace(directory);
    const uri = pathToFileURL(filename).href;
    for (const readonly of [false, true, false]) {
      const text = readonly ? source.replace('{name:string}', '{readonly name:string}') : source;
      const report = await workspace.request<{ items: Diagnostic[] }>({
        action: 'lsp',
        method: 'textDocument/diagnostic',
        params: { textDocument: { uri } },
        document: { uri, languageId: 'typescriptreact', text },
      });
      const errors = report.items.filter((item) => item.severity === 1);
      expect(errors.map((item) => item.code)).toEqual(readonly ? [2540] : []);
      if (readonly) expect(errors[0]!.range.start.line).toBe(5);
    }
  } finally {
    await workspace?.close();
    await unlink(filename);
    await unlink(config);
    await rmdir(directory);
  }
}, 30000);
