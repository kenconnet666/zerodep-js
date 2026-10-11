import { mkdtemp, rmdir, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { expect, it } from 'vitest';
import { API } from 'typescript/unstable/async';
import { createFileSystemLayer, serverFS, type FileSystemCallbacks } from 'typescript/unstable/fs';
import { TraceMap, originalPositionFor } from '@jridgewell/trace-mapping';
import { projectForCheck } from '../src/checking/projection.js';
import { typedProjection } from '../src/checking/typed-projection.js';

const root = resolve(import.meta.dirname, '../../..');
const header = `import { _component, _state } from 'zerodep-js';\n`;

async function check(source: string) {
  const directory = await mkdtemp(join(tmpdir(), 'zerodep-check-projection-'));
  const filename = join(directory, 'fixture.tsx');
  const fs: FileSystemCallbacks = {
    directoryExists: serverFS.useOS,
    fileExists: serverFS.useOS,
    getAccessibleEntries: serverFS.useOS,
    realpath: serverFS.useOS,
    stat: serverFS.useOS,
    writeFile: serverFS.useOS,
    removeFile: serverFS.useOS,
    readFile: (file) => (resolve(file) === filename ? header + source : serverFS.useOS),
  };
  const api = new API({ cwd: directory, fs });
  try {
    await writeFile(filename, header + source);
    const config = await api.parseJsonConfigFileContent(
      {
        compilerOptions: {
          strict: true,
          exactOptionalPropertyTypes: true,
          jsx: 'preserve',

          target: 'es2025',
          module: 'preserve',
          moduleResolution: 'bundler',
          types: [],
          paths: {
            'zerodep-js': [resolve(root, 'packages/core/src/index.ts')],
          },
        },
        files: [filename],
      },
      { configDirectory: directory },
    );
    const original = await api.createProgram([filename], config.options);
    const projection = await typedProjection(original, filename, header + source);
    const snapshot = await api.createSnapshot({
      fileSystem: createFileSystemLayer([[filename, projection.code]]),
      createPrograms: [{ rootFiles: [filename], compilerOptions: config.options }],
    });
    const program = snapshot.operation.createdPrograms[0];
    const diagnostics = await program.getSemanticDiagnostics(filename);
    return { projection, diagnostics };
  } finally {
    await api.close();
    await unlink(filename);
    await rmdir(directory);
  }
}

it('props 参数解构无需派生包装，别名、默认值、rest 和对象字段绑定保持原类型', async () => {
  const source = `
const Field = _component(({model: form, label = '姓名', ...attrs}: {
  model: {name: string}; label?: string; title?: string;
}) => <input {...attrs} aria-label={label} bind:value={form.name}/>);
let model = _state({name: '甲'});
const view = <Field model={model} title="输入"/>;
`;
  expect((await check(source)).diagnostics).toEqual([]);
  const invalid = await check(
    source.replace('model: {name: string}', 'model: {readonly name: string}'),
  );
  expect(invalid.diagnostics.some((item) => item.code === 2540)).toBe(true);
});

it('两层泛型组件的参数解构和 rest 转发保留可选值及只读写回检查', async () => {
  const source = `
type Props<T> = {value: T; onValueChange: (next:T)=>void; format:(value:T)=>string; parse:(text:string)=>T; title?:string;};
const Input = _component(<T,>({value,onValueChange,format,parse,...rest}:Props<T>) =>
  <input {...rest} value={format(value)} onInput={event=>onValueChange(parse(event.currentTarget.value))}/>);
const Field = _component(<T,>({value:model,onValueChange,...rest}:Props<T>) =>
  <Input {...rest} value={model} onValueChange={next=>onValueChange(next)}/>);
let form = _state<{name:string|undefined}>({name:'甲'});
const view = <Field<string|undefined> bind:value={form.name} format={value=>value??''} parse={text=>text||undefined}/>;
`;
  expect((await check(source)).diagnostics).toEqual([]);
  expect(
    (
      await check(source.replace('name:string|undefined', 'readonly name:string|undefined'))
    ).diagnostics.some((item) => item.code === 2540),
  ).toBe(true);
  expect(
    (
      await check(source.replace('parse={text=>text||undefined}', 'parse={text=>Number(text)}'))
    ).diagnostics.some((item) => item.code === 2322),
  ).toBe(true);
});

it('组件回调写回类型由真实赋值检查，不因存在同名回调就放过错误模型', async () => {
  const source = `
const Field = _component((props:{value:string;onValueChange:(next:number)=>void}) => null);
let text = _state('');
const view = <Field bind:value={text}/>;`;
  expect((await check(source)).diagnostics.some((item) => item.code === 2322)).toBe(true);
});

it('details 展开绑定保留 DOM 事件类型，并检查 boolean 写回', async () => {
  expect(
    (
      await check(
        `let open = _state(false); const view = <details bind:open={open} onToggle={event => { const element: HTMLDetailsElement = event.currentTarget; void element; }} />;`,
      )
    ).diagnostics,
  ).toEqual([]);
  for (const source of [
    `let open: false = false; const view = <details bind:open={open} />;`,
    `let open = 'no'; const view = <details bind:open={open} />;`,
    `const model: {readonly open: boolean} = {open:false}; const view = <details bind:open={model.open} />;`,
  ])
    expect((await check(source)).diagnostics.length).toBeGreaterThan(0);
});

it('group 写回按选项值检查字符串联合与只读数组，拒绝错误控件形状', async () => {
  for (const source of [
    `let selected = _state<'a'|'b'>('a');const view=<input type="radio" value="b" bind:group={selected}/>;`,
    `let selected = _state<readonly ('a'|'b')[]>([]);const view=<input type="checkbox" value="a" bind:group={selected}/>;`,
  ])
    expect((await check(source)).diagnostics).toEqual([]);
  for (const source of [
    `let selected = _state<'a'|'b'>('a');const view=<input type="radio" value="c" bind:group={selected}/>;`,
    `let selected = _state<('a'|'b')[]>([]);const view=<input type="checkbox" value="c" bind:group={selected}/>;`,
    `let selected = _state<string[]>([]);const view=<input type="radio" value="a" bind:group={selected}/>;`,
    `let selected = _state('a');const view=<input type="checkbox" value="a" bind:group={selected}/>;`,
    `const model:{readonly value:string}={value:'a'};const view=<input type="radio" value="b" bind:group={model.value}/>;`,
  ])
    expect((await check(source)).diagnostics.length).toBeGreaterThan(0);
});

it('真实 core 类型检查 DOM 引用写回和后续读取，无需定制 checker', async () => {
  for (const type of ['HTMLInputElement', 'Element']) {
    const { diagnostics } = await check(`let input: ${type} | undefined = undefined;
const read = () => input?.localName;
const view = <input bind:this={input} />;`);
    expect(diagnostics).toEqual([]);
  }
});

it('bind:this 与显式或展开 ref 共存，双方类型分别检查', async () => {
  for (const attrs of [
    'bind:this={input} ref={el => {el.select();}}',
    'ref={el => {el.select();}} bind:this={input}',
    'bind:this={input} {...{ref: (el:HTMLInputElement) => {el.select();}}}',
  ]) {
    expect(
      (await check(`let input:HTMLInputElement|undefined;const view=<input ${attrs}/>;`))
        .diagnostics,
    ).toEqual([]);
  }
  for (const attrs of [
    'bind:this={input} ref={(el:HTMLSelectElement) => {}}',
    'bind:this={input} {...{ref: (el:HTMLSelectElement) => {}}}',
  ]) {
    expect(
      (await check(`let input:HTMLInputElement|undefined;const view=<input ${attrs}/>;`))
        .diagnostics.length,
    ).toBeGreaterThan(0);
  }
});

it('真实 core 类型拒绝错误元素、只读属性、过窄目标与遗漏判空', async () => {
  const cases: [string, number][] = [
    [`let input: HTMLSelectElement | undefined; const view = <input bind:this={input} />;`, 2740],
    [`let input: HTMLInputElement; const view = <input bind:this={input} />;`, 2322],
    [
      `const model: { readonly value: string } = { value: '' }; const view = <input bind:value={model.value} />;`,
      2540,
    ],
    [`let value: 'a' | 'b' = 'a'; const view = <input bind:value={value} />;`, 2322],
    [
      `let input: HTMLInputElement | undefined = undefined; const read = () => input.focus(); const view = <input bind:this={input} />;`,
      18048,
    ],
  ];
  for (const [source, code] of cases) {
    const { diagnostics } = await check(source);
    expect(
      diagnostics.map((item) => item.code),
      source,
    ).toContain(code);
  }
});

it('保留泛型组件和调用方现有回调的类型推断', async () => {
  const { diagnostics } = await check(`
const Editor = _component(<T,>(props: { value: T; onValueChange: (value: T) => void }) => <span />);
let value = _state({ id: 1, title: '名称' });
const view = <Editor bind:value={value} onValueChange={next => { next.title.toUpperCase(); }} />;
`);
  expect(diagnostics).toEqual([]);
});

it('可选组件属性的 bind 接受 undefined，仍检查回调写回和泛型实参', async () => {
  const { diagnostics } = await check(`
const OptionalField = _component((props: { readonly value?: string; onValueChange: (value: string | undefined) => void }) => <span/>);
let optional = _state<string>();
const view = <OptionalField bind:value={optional}/>;
`);
  expect(diagnostics).toEqual([]);
});

it('表单绑定保留数值空态、多选和用户输入回调类型', async () => {
  const { diagnostics } = await check(`
let text = _state(''); let number = _state<number>(); let selected = _state<string[]>([]);
const view = <>
  <input bind:value={text} onInput={event => { event.currentTarget.value.toUpperCase(); }} />
  <input bind:value={text} onInput={() => { text.toUpperCase(); }} />
  <input bind:value={text} onInput={undefined} />
  <input type="number" bind:valueAsNumber={number} />
  <select multiple bind:value={selected} />
</>;
`);
  expect(diagnostics).toEqual([]);
});

it('select 按 multiple 的真假、spread 和覆盖顺序检查实际写回类型', async () => {
  for (const [attributes, type] of [
    ['', 'string'],
    ['multiple', 'string[]'],
    ['multiple={true}', 'string[]'],
    ['multiple={false}', 'string'],
    ['{...{multiple: true as const}}', 'string[]'],
    ['{...{multiple: false as const}}', 'string'],
    ['{...{title: "提示"}}', 'string'],
    ['{...{multiple: true as const}} {...{multiple: false as const}}', 'string'],
    ['{...{multiple: false as const}} {...{multiple: true as const}}', 'string[]'],
    ['multiple {...optionalTrue}', 'string[]'],
    ['{...optionalFalse}', 'string'],
    ['{...{multiple: flag}} multiple', 'string[]'],
    ['{...{multiple: flag}} multiple={false}', 'string'],
  ]) {
    const source = `let flag = _state(false); let value = _state<${type}>();
let optionalTrue = _state<{multiple?: true}>({});
let optionalFalse = _state<{multiple?: false}>({});
const view = <select ${attributes} bind:value={value}/>;`;
    expect((await check(source)).diagnostics, attributes).toEqual([]);
    const wrong = source.replace(
      `_state<${type}>`,
      `_state<${type === 'string' ? 'string[]' : 'string'}>`,
    );
    expect(
      (await check(wrong)).diagnostics.some((item) => item.code === 2322),
      attributes,
    ).toBe(true);
  }
}, 30000);

it('动态 select multiple 要求模型接受单选和多选，不从初始化值假定模式', async () => {
  for (const attributes of [
    'multiple={flag}',
    '{...options}',
    'multiple {...options}',
    '{...maybe}',
    '{...indexed}',
    'multiple {...explicitUndefined}',
  ]) {
    const source = `let flag = _state(false);
let options = _state<{multiple?: boolean}>({});
let maybe = _state<{multiple: true} | undefined>();
let indexed = _state<Record<string, boolean>>({});
let explicitUndefined = _state<{multiple?: true | undefined}>({});
let value = _state<string | string[]>();
const view = <select ${attributes} bind:value={value}/>;`;
    expect((await check(source)).diagnostics, attributes).toEqual([]);
    for (const type of ['string', 'string[]']) {
      const wrong = source.replace('_state<string | string[]>', `_state<${type}>`);
      expect(
        (await check(wrong)).diagnostics.some((item) => item.code === 2322),
        attributes,
      ).toBe(true);
    }
  }
}, 30000);

it('select 写回检查保留 TS 的覆盖警告，错误定位回原绑定字段', async () => {
  const duplicate = await check(`let values = _state<string[]>([]);
const view = <select multiple={false} {...{multiple:true as const}} bind:value={values}/>;`);
  expect(duplicate.diagnostics.map((item) => item.code)).toEqual([2783]);

  const source = `let value = _state('');
const view = <select {...{multiple: true as const}} bind:value={value}/>;`;
  const { projection, diagnostics } = await check(source);
  expect(diagnostics.map((item) => item.code)).toEqual([2322]);
  const error = diagnostics[0]!;
  const position = originalPositionFor(new TraceMap(projection.map!), {
    line: error.startPosition!.line + 1,
    column: error.startPosition!.character,
  });
  expect(position.line).toBe(3);
  expect(position.column).toBe(
    'const view = <select {...{multiple: true as const}} bind:value={'.length,
  );
});

it('写回错误通过 Babel source map 定位到原绑定目标', async () => {
  const source = `let value: 'a' | 'b' = 'a';\nconst view = <input bind:value={value} />;`;
  const { diagnostics, projection } = await check(source);
  const diagnostic = diagnostics.find((item) => item.code === 2322)!;
  expect(diagnostic).toBeDefined();
  expect(projection.map).not.toBeNull();
  const original = originalPositionFor(new TraceMap(projection.map!), {
    line: diagnostic.startPosition!.line + 1,
    column: diagnostic.startPosition!.character,
  });
  expect(original.line).toBe(3);
  expect(original.column).toBe('const view = <input bind:value={'.length);
});

it('不含绑定的标准 TSX 保持原文，避免无用映射与格式变化', () => {
  const source = `const Card = _component(({ title = '标题', ...rest }: Props) => <section {...rest}>{title}</section>);`;
  expect(projectForCheck(source, 'Card.tsx')).toEqual({ code: source, map: null });
});

it('投影保留 @ts-expect-error 的行约束，并继续拒绝无效的忽略指令', async () => {
  const source = `let text = ''; let number = 1;
<input bind:value={text}/>;
// @ts-expect-error 输入模型类型错误
<input bind:value={number}/>;`;
  expect((await check(source)).diagnostics).toEqual([]);
  const invalid = await check(source.replace('bind:value={number}', 'bind:value={text}'));
  expect(invalid.diagnostics.map((item) => item.code)).toContain(2578);
});
