import { spawn } from 'node:child_process';
import { mkdtemp, rmdir, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  createMessageConnection,
  StreamMessageReader,
  StreamMessageWriter,
} from 'vscode-jsonrpc/node';
import type {
  CompletionItem,
  CompletionList,
  Diagnostic,
  WorkspaceEdit,
  TextEdit,
} from 'vscode-languageserver-types';
import type { PublishDiagnosticsParams } from 'vscode-languageserver/node';
import { expect, it } from 'vitest';
import { positionAt, offsetAt } from '../src/namespaced-attributes.js';

it('标准编辑器协议保留跨文件未保存内容、增量修改、绑定诊断与错误修复', async () => {
  const root = await mkdtemp(join(tmpdir(), 'zerodep-editor-'));
  const filenames = ['tsconfig.json', 'App.tsx', 'model.ts', 'extra.ts'];
  await writeFile(
    join(root, 'tsconfig.json'),
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
      include: ['*.ts', '*.tsx'],
    }),
  );
  await writeFile(join(root, 'App.tsx'), 'export {};');
  await writeFile(join(root, 'model.ts'), 'export const value = 1;');
  await writeFile(join(root, 'extra.ts'), 'export const autoImported = 42;');
  const child = spawn(
    process.execPath,
    [resolve('packages/compiler/bin/language-server.mjs'), '--stdio'],
    { cwd: root, stdio: 'pipe', windowsHide: true },
  );
  let stderr = '';
  child.stderr.on('data', (chunk) => {
    stderr += String(chunk);
  });
  const connection = createMessageConnection(
    new StreamMessageReader(child.stdout),
    new StreamMessageWriter(child.stdin),
  );
  const reports: PublishDiagnosticsParams[] = [];
  connection.onNotification(
    'textDocument/publishDiagnostics',
    (params: PublishDiagnosticsParams) => {
      reports.push(params);
    },
  );
  connection.onNotification('window/logMessage', (params: { message: string }) => {
    stderr += params.message;
  });
  connection.listen();
  const uri = pathToFileURL(join(root, 'App.tsx')).href;
  const modelUri = pathToFileURL(join(root, 'model.ts')).href;
  let version = 0;
  const text = `import { _state } from 'zerodep-js';
import { value } from './model.js';
export const upper = value.toUpperCase();
let model = _state('');
export const view = <>🚀<input bind:value={model}/></>;`;
  async function update(content: string) {
    reports.length = 0;
    await connection.sendNotification('textDocument/didChange', {
      textDocument: { uri, version: ++version },
      contentChanges: [{ text: content }],
    });
  }
  async function diagnostic(predicate: (items: Diagnostic[]) => boolean) {
    try {
      await expect
        .poll(
          () =>
            reports.some(
              (report) =>
                report.uri === uri && report.version === version && predicate(report.diagnostics),
            ),
          { timeout: 20000 },
        )
        .toBe(true);
    } catch (error) {
      throw new Error(JSON.stringify({ version, reports, stderr }), { cause: error });
    }
  }
  try {
    const initialized = await connection.sendRequest<{
      capabilities: { textDocumentSync: { change: number } };
    }>('initialize', {
      processId: process.pid,
      rootUri: pathToFileURL(root).href,
      capabilities: {},
    });
    expect(initialized.capabilities.textDocumentSync.change).toBe(2);
    await connection.sendNotification('initialized', {});
    await connection.sendNotification('textDocument/didOpen', {
      textDocument: {
        uri: modelUri,
        languageId: 'typescript',
        version: 1,
        text: 'export const value = "未保存";',
      },
    });
    await connection.sendNotification('textDocument/didOpen', {
      textDocument: { uri, languageId: 'typescriptreact', version: ++version, text },
    });
    await diagnostic((items) => items.length === 0);

    await update(text.replace("_state('')", "_state<'a' | 'b'>('a')"));
    await diagnostic((items) => items.some((item) => item.code === 2322));
    const writeError = reports
      .findLast((report) => report.uri === uri)!
      .diagnostics.find((item) => item.code === 2322)!;
    expect(writeError.range.start.line).toBe(4);
    expect(writeError.range.start.character).toBe(
      text.lastIndexOf('model}') - text.lastIndexOf('\n') - 1,
    );

    await update(text.replace('bind:value', 'bind:v'));
    const content = text.replace('bind:value', 'bind:v');
    const completion = await connection.sendRequest<CompletionList>('textDocument/completion', {
      textDocument: { uri },
      position: positionAt(content, content.indexOf('bind:v') + 6),
    });
    expect(completion.items.some((item) => item.label === 'bind:value')).toBe(true);

    await update(text);
    await diagnostic((items) => items.length === 0);
    const rename = await connection.sendRequest<WorkspaceEdit>('textDocument/rename', {
      textDocument: { uri },
      position: positionAt(text, text.indexOf('let model') + 5),
      newName: 'renamed',
    });
    const edits = rename.changes?.[uri] ?? [];
    expect(edits, JSON.stringify(rename)).toHaveLength(2);
    for (const edit of edits)
      expect(text.slice(offsetAt(text, edit.range.start), offsetAt(text, edit.range.end))).toBe(
        'model',
      );
    const references = await connection.sendRequest<{ uri: string; range: TextEdit['range'] }[]>(
      'textDocument/references',
      {
        textDocument: { uri },
        position: positionAt(text, text.indexOf('let model') + 5),
        context: { includeDeclaration: true },
      },
    );
    expect(references).toHaveLength(2);
    for (const reference of references) {
      expect(reference.uri).toBe(uri);
      expect(
        text.slice(offsetAt(text, reference.range.start), offsetAt(text, reference.range.end)),
      ).toBe('model');
    }

    const importing = text + '\nexport const extra = autoImp;';
    await update(importing);
    const imports = await connection.sendRequest<CompletionList>('textDocument/completion', {
      textDocument: { uri },
      position: positionAt(importing, importing.lastIndexOf('autoImp') + 7),
    });
    const candidate = imports.items.find((item) => item.label === 'autoImported');
    expect(candidate).toBeDefined();
    const resolved = await connection.sendRequest<CompletionItem>(
      'completionItem/resolve',
      candidate,
    );
    expect(resolved.additionalTextEdits?.length).toBeGreaterThan(0);
    const insertion = (resolved.textEdit as TextEdit | undefined) ?? {
      range: {
        start: positionAt(importing, importing.lastIndexOf('autoImp')),
        end: positionAt(importing, importing.lastIndexOf('autoImp') + 7),
      },
      newText: resolved.insertText ?? resolved.label,
    };
    const allEdits = [...resolved.additionalTextEdits!, insertion];
    let imported = importing;
    for (const edit of allEdits.sort(
      (a, b) => offsetAt(importing, b.range.start) - offsetAt(importing, a.range.start),
    ))
      imported =
        imported.slice(0, offsetAt(importing, edit.range.start)) +
        edit.newText +
        imported.slice(offsetAt(importing, edit.range.end));
    await update(imported);
    await diagnostic((items) => items.length === 0);
    await update(text);
    await diagnostic((items) => items.length === 0);
    reports.length = 0;
    await connection.sendNotification('textDocument/didChange', {
      textDocument: { uri: modelUri, version: 2 },
      contentChanges: [{ text: 'export const value = 2;' }],
    });
    await diagnostic((items) => items.some((item) => item.code === 2339));
    reports.length = 0;
    await connection.sendNotification('textDocument/didChange', {
      textDocument: { uri: modelUri, version: 3 },
      contentChanges: [{ text: 'export const value = "恢复";' }],
    });
    await diagnostic((items) => items.length === 0);

    // LSP 的增量范围使用 UTF-16；保留上面的 emoji，精确编辑属性而非整文替换。
    const start = text.indexOf('bind:value') + 5;
    await connection.sendNotification('textDocument/didChange', {
      textDocument: { uri, version: ++version },
      contentChanges: [
        {
          range: { start: positionAt(text, start), end: positionAt(text, start + 5) },
          text: 'invalid',
        },
      ],
    });
    await diagnostic((items) => items.some((item) => String(item.code).startsWith('ZJ')));
    await connection.sendNotification('textDocument/didClose', { textDocument: { uri } });
    await connection.sendRequest('shutdown', null);
    await connection.sendNotification('exit', null);
    await new Promise<void>((done) =>
      child.exitCode !== null ? done() : child.once('exit', () => done()),
    );
    expect(child.exitCode, stderr).toBe(0);
    expect(stderr).toBe('');
  } finally {
    if (child.exitCode === null) {
      await connection.sendRequest('shutdown', null);
      await connection.sendNotification('exit', null);
      await new Promise<void>((done) =>
        child.exitCode !== null ? done() : child.once('exit', () => done()),
      );
    }
    connection.dispose();
    for (const file of filenames) await unlink(join(root, file));
    await rmdir(root);
  }
}, 60000);

it('本机模板在其他项目不启用能力，客户端断开时退出', async () => {
  const child = spawn(process.execPath, [resolve('packages/compiler/bin/language-server.mjs')], {
    stdio: 'pipe',
    windowsHide: true,
  });
  const connection = createMessageConnection(
    new StreamMessageReader(child.stdout),
    new StreamMessageWriter(child.stdin),
  );
  connection.listen();
  try {
    const result = await connection.sendRequest<{ capabilities: object }>('initialize', {
      rootUri: pathToFileURL(tmpdir()).href,
      capabilities: {},
      initializationOptions: { projectRoot: resolve('.') },
    });
    expect(result.capabilities).toEqual({ textDocumentSync: 0 });
    child.stdin.end();
    await new Promise<void>((done) =>
      child.exitCode !== null ? done() : child.once('exit', () => done()),
    );
    expect(child.exitCode).toBe(0);
  } finally {
    connection.dispose();
    if (child.exitCode === null) child.kill();
  }
}, 10000);
