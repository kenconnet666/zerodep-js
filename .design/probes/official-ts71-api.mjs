import assert from 'node:assert/strict';
import { mkdtemp, readFile, unlink, rmdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// 用指定的官方 SDK 验证接口，不读取项目定制二进制，也不修改真实应用源码。
const sdk = resolve(process.argv[2] ?? 'node_modules/typescript');
const require = createRequire(join(sdk, 'package.json'));
const { API } = await import(pathToFileURL(require.resolve('typescript/unstable/async')));
const { serverFS } = await import(pathToFileURL(require.resolve('typescript/unstable/fs')));
const { SyntaxKind } = await import(pathToFileURL(require.resolve('typescript/unstable/ast')));
const metadata = JSON.parse(await readFile(join(sdk, 'package.json'), 'utf8'));
const directory = await mkdtemp(join(tmpdir(), 'zerodep-official-ts71-'));
const filename = join(directory, 'reference.tsx');
const header = `export {};
declare global {
  namespace JSX {
    interface Element {}
    interface IntrinsicElements {
      input: {
        'bind:this'?: HTMLInputElement;
        'bind:value'?: string;
        ref?: (element: HTMLInputElement) => void | (() => void);
        value?: string;
        onInput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
      };
    }
  }
}
declare function Editor<T>(props: { value: T; onValueChange: (value: T) => void }): JSX.Element;
`;
/** @type {Array<[string, string, number[]]>} */
const cases = [
  [
    '隐式引用的控制流边界',
    `let input: HTMLInputElement | undefined = undefined;
    const focusInput = () => input?.focus(); const view = <input bind:this={input} />;`,
    [2339],
  ],
  [
    '显式引用写回与清理',
    `let input: HTMLInputElement | undefined = undefined;
    const focusInput = () => input?.focus();
    const view = <input ref={element => { input = element; return () => { input = undefined; }; }} />;`,
    [],
  ],
  [
    '拒绝错误 DOM 目标',
    `let input: HTMLSelectElement | undefined = undefined;
    const view = <input ref={element => { input = element; }} />;`,
    [2740],
  ],
  [
    '拒绝不接受清理空值的目标',
    `let input: HTMLInputElement;
    const view = <input ref={element => { input = element; return () => { input = undefined; }; }} />;`,
    [2322],
  ],
  [
    '拒绝只读属性写回',
    `const model: { readonly value: string } = { value: '' };
    const view = <input value={model.value} onInput={event => { model.value = event.currentTarget.value; }} />;`,
    [2540],
  ],
  [
    '拒绝过窄字符串目标',
    `let value: 'a' | 'b' = 'a';
    const view = <input value={value} onInput={event => { value = event.currentTarget.value; }} />;`,
    [2322],
  ],
  [
    '泛型组件回调推断',
    `let value = { id: 1, title: '名称' };
    const view = <Editor value={value} onValueChange={next => { value = next; next.title.toUpperCase(); }} />;`,
    [],
  ],
];
const results = [];
async function withProgram(source, inspect) {
  const fs = Object.fromEntries(
    [
      'directoryExists',
      'fileExists',
      'getAccessibleEntries',
      'readFile',
      'realpath',
      'stat',
      'writeFile',
      'removeFile',
    ].map((name) => [name, serverFS.useOS]),
  );
  fs.readFile = (file) => (resolve(file) === filename ? source : serverFS.useOS);
  const api = new API({ cwd: directory, fs });
  try {
    const parsed = await api.parseJsonConfigFileContent(
      {
        compilerOptions: {
          strict: true,
          noEmit: true,
          jsx: 'preserve',
          target: 'es2023',
          module: 'esnext',
          types: [],
        },
        files: [filename],
      },
      { configDirectory: directory },
    );
    assert.equal(parsed.errors?.length ?? 0, 0, JSON.stringify(parsed.errors));
    // 配置由官方 API 解析为枚举；不能把 tsconfig 的字符串直接传给 createProgram。
    const snapshot = await api.createSnapshot({
      createPrograms: [{ rootFiles: [filename], compilerOptions: parsed.options }],
      prepareAutoImports: filename,
      userPreferences: {
        includeCompletionsForModuleExports: false,
        includeCompletionsForImportStatements: false,
      },
    });
    const program = snapshot.operation.createdPrograms[0];
    await inspect(program);
  } finally {
    await api.close();
  }
}
try {
  await writeFile(filename, header);
  for (const [name, body, expected] of cases) {
    await withProgram(header + body, async (program) => {
      const diagnostics = await program.getSemanticDiagnostics(filename);
      assert.deepEqual(
        diagnostics.map((item) => item.code),
        expected,
        `${name}: ${JSON.stringify(diagnostics)}`,
      );
      results.push({ name, codes: diagnostics.map((item) => item.code) });
    });
  }
  for (const prefix of ['bind', 'bind:', 'bind:v']) {
    const source = header + `let text = ''; const view = <input ${prefix}={text} />;`;
    const start = source.lastIndexOf(prefix);
    await withProgram(source, async (program) => {
      const service = program.getProject().languageService;
      const direct = await service.getCompletionsAtPosition(filename, start + prefix.length);
      const names = (list) =>
        list?.entries?.map((item) => item.name).filter((name) => name.startsWith('bind:')) ?? [];
      const file = await program.getSourceFile(filename);
      let attributes;
      const visit = (node) => {
        if (node.kind === SyntaxKind.JsxAttributes) attributes = node;
        node.forEachChild(visit);
      };
      visit(file);
      const checker = program.getProject().checker;
      const contextual = await checker.getContextualType(attributes);
      assert.ok(contextual, 'JSX 属性必须存在上下文类型');
      const properties = await checker.getPropertiesOfType(contextual);
      const contextualNames = properties.map((symbol) => symbol.name);
      const bindings = properties.filter((symbol) => symbol.name.startsWith('bind:'));
      assert.deepEqual(bindings.map((symbol) => symbol.name).sort(), ['bind:this', 'bind:value']);
      const definitions = [];
      for (const symbol of bindings) {
        const declaration = await symbol.declarations[0].resolve();
        assert.ok(declaration);
        assert.ok(source.slice(declaration.pos, declaration.end).includes(symbol.name));
        definitions.push({ name: symbol.name, start: declaration.pos, end: declaration.end });
      }
      results.push({ name: `补全 ${prefix}`, direct: names(direct), contextualNames, definitions });
    });
  }
  console.log(
    JSON.stringify({ version: metadata.version, commit: metadata.gitHead, results }, null, 2),
  );
} finally {
  await unlink(filename);
  await rmdir(directory);
}
