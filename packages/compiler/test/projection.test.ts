import { mkdtemp, rmdir, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { expect, it } from 'vitest';
import { API } from 'typescript/unstable/async';
import { createFileSystemLayer, serverFS, type FileSystemCallbacks } from 'typescript/unstable/fs';
import { TraceMap, originalPositionFor } from '@jridgewell/trace-mapping';
import { projectForCheck } from '../src/projection.js';
import { typedProjection } from '../src/typed-projection.js';

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
          jsxImportSource: 'zerodep-js',
          target: 'es2023',
          module: 'preserve',
          moduleResolution: 'bundler',
          types: [],
          paths: {
            'zerodep-js': [resolve(root, 'packages/core/src/index.ts')],
            'zerodep-js/*': [resolve(root, 'packages/core/src/*')],
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

it('真实 core 类型检查 DOM 引用写回和后续读取，无需定制 checker', async () => {
  for (const type of ['HTMLInputElement', 'Element']) {
    const { diagnostics } = await check(`let input: ${type} | undefined = undefined;
const read = () => input?.localName;
const view = <input bind:this={input} />;`);
    expect(diagnostics).toEqual([]);
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
