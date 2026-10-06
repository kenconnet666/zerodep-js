import { builtinModules } from 'node:module';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { WorkspaceClient } from './client.js';
import { canonicalPath } from './paths.js';
import type {
  CheckResult,
  FileInfo,
  Position,
  SourceDocument,
  TextEdit,
  WorkspaceStats,
} from './protocol.js';
import type { Diagnostic } from './types.js';

export interface CodeAction {
  title: string;
  kind?: string;
  edit?: { changes?: Record<string, TextEdit[]> };
}
export interface EditResult {
  file: string;
  original: string;
  edits: TextEdit[];
}
export interface BoundaryOptions {
  browser?: boolean;
  packageRoot?: string;
}
export interface ApiReport {
  exports: Record<string, FileInfo['exports']>;
  declarations: Record<string, string>;
}

export class NativeTools {
  readonly root: string;
  private readonly directory: string;
  private readonly client: WorkspaceClient;
  constructor(root = process.cwd()) {
    this.directory = canonicalPath(root);
    this.client = new WorkspaceClient(root);
    this.root = this.client.root;
  }
  close(): Promise<void> {
    return this.client.close();
  }
  stats(): Promise<WorkspaceStats> {
    return this.client.request({ action: 'stats' });
  }
  async stop(options: { force?: boolean } = {}): Promise<void> {
    const { serverPid } = await this.client.request<{ serverPid: number }>({
      action: 'stop',
      ...options,
    });
    await this.client.close();
    // Windows 中 broker 自己的 cwd 也会锁住目录；收到回复不等于进程已经退出。
    for (let attempt = 0; attempt < 120; attempt++) {
      try {
        process.kill(serverPid, 0);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ESRCH') return;
        throw error;
      }
      await delay(50);
    }
    throw new Error('原生服务已请求停止，但进程未在期限内退出。');
  }
  check(projects: string[], options: { lint?: boolean } = {}): Promise<CheckResult> {
    return this.client.request({
      action: 'check',
      projects: projects.map((path) => resolve(this.directory, path)),
      ...(options.lint === undefined ? {} : { lint: options.lint }),
    });
  }
  build(
    project: string,
  ): Promise<{ status: number; diagnostics: Diagnostic[]; statistics: unknown }> {
    return this.client.request({ action: 'build', project: resolve(this.directory, project) });
  }

  private async document(file: string, text?: string): Promise<SourceDocument> {
    const path = canonicalPath(resolve(this.directory, file));
    return {
      uri: pathToFileURL(path).href,
      languageId: /\.tsx$/.test(path)
        ? 'typescriptreact'
        : /\.jsx$/.test(path)
          ? 'javascriptreact'
          : /\.[cm]?js$/.test(path)
            ? 'javascript'
            : 'typescript',
      text: text ?? (await readFile(path, 'utf8')),
    };
  }
  async inspect(file: string, text?: string): Promise<FileInfo> {
    const document = await this.document(file, text);
    return this.client.request({
      action: 'lsp',
      method: 'zerodep/inspect',
      params: { textDocument: { uri: document.uri } },
      document,
    });
  }
  async format(file: string, range?: { start: Position; end: Position }): Promise<EditResult> {
    const document = await this.document(file);
    const edits = await this.client.request<TextEdit[] | null>({
      action: 'lsp',
      method: range ? 'textDocument/rangeFormatting' : 'textDocument/formatting',
      params: {
        textDocument: { uri: document.uri },
        options: { tabSize: 2, insertSpaces: true },
        ...(range ? { range } : {}),
      },
      document,
    });
    return { file: fileURLToPath(document.uri), original: document.text, edits: edits ?? [] };
  }
  async actions(file: string): Promise<{ document: SourceDocument; actions: CodeAction[] }> {
    const document = await this.document(file);
    const report = await this.client.request<{ items?: unknown[] }>({
      action: 'lsp',
      method: 'textDocument/diagnostic',
      params: { textDocument: { uri: document.uri } },
      document,
    });
    const lines = document.text.split('\n');
    const actions = await this.client.request<CodeAction[] | null>({
      action: 'lsp',
      method: 'textDocument/codeAction',
      params: {
        textDocument: { uri: document.uri },
        range: {
          start: { line: 0, character: 0 },
          end: { line: lines.length - 1, character: lines.at(-1)!.length },
        },
        context: { diagnostics: report.items ?? [], only: ['quickfix'] },
      },
      document,
    });
    return { document, actions: actions ?? [] };
  }
  async imports(file: string): Promise<EditResult> {
    const document = await this.document(file);
    const actions = await this.client.request<CodeAction[] | null>({
      action: 'lsp',
      method: 'textDocument/codeAction',
      params: {
        textDocument: { uri: document.uri },
        range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
        context: { diagnostics: [], only: ['source.organizeImports'] },
      },
      document,
    });
    return {
      file: fileURLToPath(document.uri),
      original: document.text,
      edits: fileEdits(fileURLToPath(document.uri), actions ?? []),
    };
  }
  async boundaries(files: string[], options: BoundaryOptions): Promise<Diagnostic[]> {
    const diagnostics: Diagnostic[] = [];
    const builtins = new Set(builtinModules.map((name) => name.replace(/^node:/, '')));
    for (const file of files) {
      const document = await this.document(file);
      const info = await this.client.request<FileInfo>({
        action: 'lsp',
        method: 'zerodep/inspect',
        params: { textDocument: { uri: document.uri } },
        document,
      });
      for (const item of info.imports) {
        const server =
          item.module.startsWith('node:') ||
          builtins.has(item.module) ||
          /^zerodep-js-(?:native|vite)(?:\/|$)/.test(item.module);
        const privatePath =
          item.resolved &&
          options.packageRoot &&
          (item.module.startsWith('.') ||
            isAbsolute(item.module) ||
            item.module.includes('/src/')) &&
          !within(resolve(this.directory, options.packageRoot), item.resolved) &&
          /\/packages\/[^/]+\/src\//.test(item.resolved.replaceAll('\\', '/'));
        const prefix = Buffer.from(document.text, 'utf8')
          .subarray(0, item.startByte)
          .toString('utf8')
          .split('\n');
        if ((!item.typeOnly && options.browser && server) || privatePath)
          diagnostics.push({
            code: privatePath ? 'ZJ2102' : 'ZJ2101',
            filename: resolve(this.directory, file),
            line: prefix.length,
            column: prefix.at(-1)!.length + 1,
            message: privatePath
              ? `跨包引用私有源码：${item.module}。请使用公开入口。`
              : `浏览器包不能导入运行时模块 ${item.module}。`,
          });
      }
    }
    return diagnostics;
  }
  async apiReport(project: string, entries: string[]): Promise<ApiReport> {
    const checked = await this.check([project]);
    if (!checked.complete || checked.diagnostics.length)
      throw new Error('项目检查未通过，不能生成公开 API 基线。');
    const base = dirname(resolve(this.directory, project));
    const exports: ApiReport['exports'] = {};
    for (const entry of [...entries].sort())
      exports[relative(base, resolve(this.directory, entry)).replaceAll('\\', '/')] = (
        await this.inspect(entry)
      ).exports;
    const output = await this.client.request<{
      diagnostics: Diagnostic[];
      files: Array<{ file: string; text: string }>;
    }>({ action: 'declarations', project: resolve(this.directory, project) });
    if (output.diagnostics.length)
      throw new Error(output.diagnostics.map((item) => item.message).join('\n'));
    const declarations: Record<string, string> = {};
    for (const file of output.files.sort((a, b) => a.file.localeCompare(b.file)))
      declarations[relative(base, file.file).replaceAll('\\', '/')] = createHash('sha256')
        .update(
          file.text.replaceAll('\r\n', '\n').replace(/\n?\/\/# sourceMappingURL=[^\n]*\n?$/, '\n'),
        )
        .digest('hex');
    const verified = await this.check([project]);
    if (!verified.cached || !verified.complete || verified.diagnostics.length)
      throw new Error('项目在生成 API 报告期间发生变化，请重试。');
    return { exports, declarations };
  }
}

function within(root: string, file: string): boolean {
  const path = relative(root, file);
  return path === '' || (!path.startsWith('..') && !/^[A-Za-z]:/.test(path));
}
export function fileEdits(file: string, actions: CodeAction[]): TextEdit[] {
  const canonical = (path: string) =>
    process.platform === 'win32' ? resolve(path).toLowerCase() : resolve(path);
  return actions.flatMap((action) => {
    if (!action.edit?.changes || 'documentChanges' in action.edit || 'command' in action)
      throw new Error('此操作需要完整的工作区编辑支持，不能作为单文件修复应用。');
    return Object.entries(action.edit.changes).flatMap(([uri, edits]) => {
      if (canonical(fileURLToPath(uri)) !== canonical(file))
        throw new Error('此修复涉及其他文件，拒绝只应用其中一部分。');
      return edits;
    });
  });
}
export function applyTextEdits(text: string, edits: TextEdit[]): string {
  const lines = text.split('\n');
  const offsets = [0];
  for (let i = 0; i < lines.length - 1; i++) offsets.push(offsets[i]! + lines[i]!.length + 1);
  const position = (value: Position) => {
    if (
      !Number.isInteger(value.line) ||
      !Number.isInteger(value.character) ||
      value.line < 0 ||
      value.line >= lines.length ||
      value.character < 0 ||
      value.character > lines[value.line]!.replace(/\r$/, '').length
    )
      throw new Error('编辑范围超出原始文本。');
    const offset = offsets[value.line]! + value.character;
    const left = text.charCodeAt(offset - 1),
      right = text.charCodeAt(offset);
    if (left >= 0xd800 && left <= 0xdbff && right >= 0xdc00 && right <= 0xdfff)
      throw new Error('编辑范围不能拆开 Unicode 字符。');
    return offset;
  };
  const ordered = edits
    .map((edit) => ({
      start: position(edit.range.start),
      end: position(edit.range.end),
      text: edit.newText,
    }))
    .sort((a, b) => b.start - a.start || b.end - a.end);
  let previous = text.length;
  for (const edit of ordered) {
    if (edit.end < edit.start || edit.end > previous) throw new Error('编辑范围重叠。');
    text = text.slice(0, edit.start) + edit.text + text.slice(edit.end);
    previous = edit.start;
  }
  return text;
}
export async function writeEdits(result: EditResult): Promise<boolean> {
  if ((await readFile(result.file, 'utf8')) !== result.original)
    throw new Error('文件已变化，拒绝应用旧版本编辑。');
  const next = applyTextEdits(result.original, result.edits);
  if (next === result.original) return false;
  await writeFile(result.file, next);
  return true;
}
