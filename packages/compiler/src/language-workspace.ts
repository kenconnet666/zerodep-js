import { readFile } from 'node:fs/promises';
import { realpathSync, statSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TraceMap, generatedPositionFor, originalPositionFor } from '@jridgewell/trace-mapping';
import type { CompletionItem, Position, Range } from 'vscode-languageserver-types';
import { diagnose } from './index.js';
import { TypeScriptService, type SourceDocument } from './language-service.js';
import { namespacedAttributes, wrapJsxExpression } from './namespaced-attributes.js';
import { projectForCheck } from './projection.js';
import { typedProjection } from './typed-projection.js';

interface LanguageRequest {
  action: 'info' | 'lsp';
  method?: string;
  params?: Record<string, unknown>;
  document?: SourceDocument;
}

/** 宿主只拥有一个官方语言服务；转换和映射按请求完成，不保留另一套类型系统。 */
export class LanguageWorkspace {
  readonly root: string;
  readonly language: TypeScriptService;
  private queue: Promise<unknown> = Promise.resolve();
  private closed = false;
  private completionId = 0;
  private readonly completions = new Map<number, SourceDocument>();

  constructor(root: string) {
    const directory = resolve(root);
    if (!statSync(directory).isDirectory()) throw new Error('工作区必须是现有目录。');
    this.root = realpathSync.native(directory);
    this.language = new TypeScriptService(this.root);
  }

  private filename(uri: string): string {
    const file = fileURLToPath(uri);
    // Windows 短路径和目录链接需先归一化；新建未保存文件则归一化最近的现有父目录。
    let ancestor = file;
    let canonical: string;
    for (;;) {
      try {
        canonical = resolve(realpathSync.native(ancestor), relative(ancestor, file));
        break;
      } catch (error) {
        if (
          !['ENOENT', 'ENOTDIR'].includes((error as NodeJS.ErrnoException).code ?? '') ||
          dirname(ancestor) === ancestor
        )
          throw error;
        ancestor = dirname(ancestor);
      }
    }
    const path = relative(this.root, canonical);
    if (isAbsolute(path) || path === '..' || path.startsWith('..' + sep))
      throw new Error('工具输入必须位于项目目录内。');
    return file;
  }

  request<T>(request: LanguageRequest): Promise<T> {
    if (this.closed) return Promise.reject(new Error('语言服务会话已关闭。'));
    const operation = this.queue.catch(() => {}).then(() => this.execute(request));
    this.queue = operation;
    return operation as Promise<T>;
  }

  setDocument(document: SourceDocument): Promise<void> {
    this.filename(document.uri);
    return this.language.setDocument(document);
  }

  private async execute(request: LanguageRequest): Promise<unknown> {
    if (request.action === 'info') {
      const info = await this.language.ready;
      const completion = info.capabilities.completionProvider as { triggerCharacters?: string[] };
      return {
        ...info,
        capabilities: {
          ...info.capabilities,
          completionProvider: {
            ...completion,
            triggerCharacters: [...new Set([...(completion?.triggerCharacters ?? []), ':'])],
          },
        },
      };
    }
    const method = request.method;
    if (
      !method ||
      !/^(?:textDocument\/|codeAction\/resolve$|completionItem\/resolve$|workspace\/symbol$)/.test(
        method,
      )
    )
      throw new Error('不支持的语言服务操作。');
    let params = request.params ?? {};
    const context = params.data as { zerodepProjection?: number; upstream?: unknown } | undefined;
    if (method === 'completionItem/resolve' && context?.zerodepProjection !== undefined) {
      const document = this.completions.get(context.zerodepProjection);
      if (!document) throw new Error('补全上下文已过期，请重新触发补全。');
      const current = this.language.getDocument(document.uri);
      if (current && current.text !== document.text)
        throw new Error('文档已变化，请重新触发补全。');
      request = { ...request, document };
      params = { ...params, data: context.upstream };
    }
    if (
      method === 'completionItem/resolve' &&
      (params.data as { zerodepNamespace?: boolean } | undefined)?.zerodepNamespace
    )
      return params; // 类型与文档已在同一快照内解析，不能再交给官方的 opaque data 解析器。
    if (
      method === 'completionItem/resolve' &&
      (params.data as { zerodepBraces?: Range } | undefined)?.zerodepBraces
    ) {
      const item = await this.language.request<CompletionItem>(method, params, request.document);
      return wrapJsxExpression(item, (params.data as { zerodepBraces: Range }).zerodepBraces);
    }
    const target = params.textDocument as { uri?: string } | undefined;
    const uri = request.document?.uri ?? target?.uri;
    if (!uri) return this.language.request(method, params);
    const filename = this.filename(uri);
    const document = request.document ?? {
      uri,
      languageId: 'typescriptreact',
      text: await readFile(filename, 'utf8'),
    };
    const position = params.position as Position | undefined;
    if (
      position &&
      ['textDocument/completion', 'textDocument/definition', 'textDocument/hover'].includes(method)
    ) {
      const kind = method.slice('textDocument/'.length) as 'completion' | 'definition' | 'hover';
      const result = await namespacedAttributes(this.language, document, position, kind);
      if (result) return result;
    }
    let projection = { code: document.text, map: null } as ReturnType<typeof projectForCheck>;
    if (/\.[jt]sx$/.test(filename) && document.text.includes('bind:')) {
      projection = await this.language.withDocument(document, async () => {
        await this.language.connection.sendRequest('textDocument/hover', {
          textDocument: { uri },
          position: { line: 0, character: 0 },
        });
        const api = await this.language.openAPI();
        const snapshot = await api.getCurrentLanguageServerSnapshot();
        try {
          const project = await snapshot.getDefaultProjectForFile({ uri });
          const program = project && snapshot.getProgram(project.id);
          if (program) return await typedProjection(program, filename, document.text);
          return projectForCheck(document.text, filename);
        } catch (error) {
          if (!(error instanceof SyntaxError)) throw error;
          return { code: document.text, map: null };
        } finally {
          await snapshot.dispose();
        }
      });
    }
    const map = projection.map && new TraceMap(projection.map);
    const toGenerated = (point: Position): Position => {
      if (!map) return point;
      const generated = generatedPositionFor(map, {
        source: map.resolvedSources[0]!,
        line: point.line + 1,
        column: point.character,
      });
      return generated.line === null
        ? point
        : { line: generated.line - 1, character: generated.column ?? 0 };
    };
    const toOriginal = (point: Position): Position => {
      if (!map) return point;
      const original = originalPositionFor(map, { line: point.line + 1, column: point.character });
      return original.line === null
        ? point
        : { line: original.line - 1, character: original.column ?? 0 };
    };
    const generatedParams = { ...params };
    if (position) generatedParams.position = toGenerated(position);
    if (params.range) {
      const range = params.range as Range;
      generatedParams.range = { start: toGenerated(range.start), end: toGenerated(range.end) };
    }
    if (method === 'completionItem/resolve' && map) {
      const edit = params.textEdit as
        { range?: Range; insert?: Range; replace?: Range } | undefined;
      const range = (value: Range): Range => ({
        start: toGenerated(value.start),
        end: toGenerated(value.end),
      });
      if (edit)
        generatedParams.textEdit = {
          ...edit,
          ...(edit.range ? { range: range(edit.range) } : {}),
          ...(edit.insert ? { insert: range(edit.insert) } : {}),
          ...(edit.replace ? { replace: range(edit.replace) } : {}),
        };
      if (Array.isArray(params.additionalTextEdits))
        generatedParams.additionalTextEdits = params.additionalTextEdits.map(
          (item: { range: Range }) => ({ ...item, range: range(item.range) }),
        );
    }
    const raw = await this.language.request(method, generatedParams, {
      ...document,
      text: projection.code,
    });
    const sameDocument = (candidate: string): boolean => {
      if (!candidate.startsWith('file:')) return false;
      const path = resolve(fileURLToPath(candidate));
      return process.platform === 'win32'
        ? path.toLowerCase() === resolve(filename).toLowerCase()
        : path === resolve(filename);
    };
    const remap = (value: unknown, contextUri = uri): unknown => {
      if (Array.isArray(value)) {
        const edits = new Set<string>();
        return value
          .map((item) => remap(item, contextUri))
          .filter((item) => {
            if (
              !item ||
              typeof item !== 'object' ||
              !('range' in item) ||
              (!('newText' in item) && !('uri' in item))
            )
              return true;
            // 一次 bind 读写投影会产生多个引用；原文同一编辑只能应用一次。
            const key = JSON.stringify(item);
            if (edits.has(key)) return false;
            edits.add(key);
            return true;
          });
      }
      if (!value || typeof value !== 'object') return value;
      const record = value as Record<string, unknown>;
      const owner =
        typeof record.uri === 'string'
          ? record.uri
          : typeof record.targetUri === 'string'
            ? record.targetUri
            : contextUri;
      return Object.fromEntries(
        Object.entries(record).map(([key, item]) => {
          if (key === 'data') return [key, item]; // 官方解析补全等请求所需的不透明数据保持原样。
          if (['uri', 'targetUri'].includes(key) && typeof item === 'string' && sameDocument(item))
            return [key, uri];
          if (
            (sameDocument(owner) || key === 'originSelectionRange') &&
            [
              'range',
              'insert',
              'replace',
              'targetRange',
              'targetSelectionRange',
              'originSelectionRange',
            ].includes(key) &&
            item &&
            typeof item === 'object' &&
            'start' in item &&
            'end' in item
          ) {
            const range = item as Range;
            return [key, { start: toOriginal(range.start), end: toOriginal(range.end) }];
          }
          return [
            sameDocument(key) ? uri : key,
            remap(item, key.startsWith('file:') ? key : owner),
          ];
        }),
      );
    };
    const result = remap(raw);
    if (method === 'textDocument/completion' && map && result && typeof result === 'object') {
      const items = (
        Array.isArray(result) ? result : 'items' in result ? result.items : []
      ) as CompletionItem[];
      if (items.some((item) => item.data !== undefined)) {
        const id = ++this.completionId;
        // resolve 需要重开同一投影才能正确映射自动导入；只保留有限次菜单的原文，关闭时释放。
        this.completions.set(id, document);
        if (this.completions.size > 16)
          this.completions.delete(this.completions.keys().next().value!);
        for (const item of items)
          if (item.data !== undefined) item.data = { zerodepProjection: id, upstream: item.data };
      }
    }
    if (
      method === 'textDocument/diagnostic' &&
      result &&
      typeof result === 'object' &&
      'items' in result
    ) {
      const report = result as { items: unknown[] };
      report.items.push(
        ...diagnose(document.text, filename).map((item) => ({
          code: item.code,
          message: item.message,
          severity: 1,
          source: 'zerodep-js',
          range: {
            start: { line: item.line - 1, character: item.column - 1 },
            end: {
              line: (item.endLine ?? item.line) - 1,
              character: (item.endColumn ?? item.column + 1) - 1,
            },
          },
        })),
      );
    }
    return result;
  }

  async close(): Promise<void> {
    this.closed = true;
    await this.queue.catch(() => {});
    this.completions.clear();
    await this.language.close();
  }
}
