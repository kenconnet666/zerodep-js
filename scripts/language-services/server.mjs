import { requireProject, root } from './environment.mjs';
import { service, restart, stopAll } from './language-client.mjs';
import { readFile, realpath } from 'node:fs/promises';
import { extname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { frameworkDiagnostics } from './framework.mjs';

const { McpServer } = requireProject('@modelcontextprotocol/sdk/server/mcp.js');
const { StdioServerTransport } = requireProject('@modelcontextprotocol/sdk/server/stdio.js');
const { z } = requireProject('zod');

const supported = new Set(['.ts', '.tsx', '.mts', '.cts', '.js', '.jsx', '.mjs', '.cjs']);

async function document(filePath) {
  const absolute = await realpath(resolve(root, filePath));
  const fromRoot = relative(root, absolute);
  if (isAbsolute(fromRoot) || fromRoot === '..' || fromRoot.startsWith('..' + sep))
    throw new Error('File is outside the configured workspace.');
  const extension = extname(absolute);
  if (!supported.has(extension)) throw new Error('Unsupported source file extension: ' + extension);
  return {
    path: absolute,
    relativePath: fromRoot,
    uri: pathToFileURL(absolute).href,
    text: await readFile(absolute, 'utf8'),
    kind: 'typescript',
    languageId:
      extension === '.tsx'
        ? 'typescriptreact'
        : extension === '.jsx'
          ? 'javascriptreact'
          : ['.js', '.mjs', '.cjs'].includes(extension)
            ? 'javascript'
            : 'typescript',
  };
}

function range(value) {
  return (
    value && {
      start: { line: value.start.line + 1, column: value.start.character + 1 },
      end: { line: value.end.line + 1, column: value.end.character + 1 },
    }
  );
}
function position(doc, line, column) {
  const lines = doc.text.split('\n');
  if (line > lines.length || column > lines[line - 1].length + 1)
    throw new Error('Position is outside the document.');
  return { line: line - 1, character: column - 1 };
}
const server = new McpServer({ name: 'zerodep-js-language-services', version: '0.0.0' });
const file = { filePath: z.string().describe('Project-relative path inside ' + root) };
const location = { ...file, line: z.number().int().min(1), column: z.number().int().min(1) };
function tool(name, description, inputSchema, read) {
  server.registerTool(
    name,
    {
      description,
      inputSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
    },
    async (args) => {
      try {
        const doc = await document(args.filePath);
        for (let attempt = 0; ; attempt++) {
          try {
            const language = await service(doc.kind);
            const result = await language.run(doc, (version) => read(args, doc, language, version));
            return { content: [{ type: 'text', text: JSON.stringify(result) }] };
          } catch (error) {
            // 子语言进程的流中断允许重建一次；语义错误、超时和第二次失败仍完整上报。
            if (
              attempt ||
              !/ERR_STREAM_DESTROYED|write after|connection.*(?:disposed|closed)/iu.test(
                String(error),
              )
            )
              throw error;
            process.stderr.write(
              'Restarting ' + doc.kind + ' after transport failure: ' + error + '\n',
            );
            restart(doc.kind);
          }
        }
      } catch (error) {
        return { isError: true, content: [{ type: 'text', text: String(error) }] };
      }
    },
  );
}

tool(
  'hover',
  'Get native TypeScript 7 type information. Input and output positions are 1-based.',
  location,
  async (args, doc, language) => {
    const result = await language.request('textDocument/hover', {
      textDocument: { uri: doc.uri },
      position: position(doc, args.line, args.column),
    });
    return {
      filePath: doc.relativePath,
      contents: result?.contents ?? null,
      range: range(result?.range),
    };
  },
);

for (const [name, method] of [
  ['definitions', 'textDocument/definition'],
  ['references', 'textDocument/references'],
]) {
  tool(
    name,
    'Find ' + name + ' using the project language service. Positions are 1-based.',
    { ...location, limit: z.number().int().min(1).max(500).default(100) },
    async (args, doc, language) => {
      const result = await language.request(method, {
        textDocument: { uri: doc.uri },
        position: position(doc, args.line, args.column),
        context: { includeDeclaration: true },
      });
      const items = result == null ? [] : Array.isArray(result) ? result : [result];
      return {
        total: items.length,
        items: items.slice(0, args.limit).map((item) => {
          const uri = item.targetUri ?? item.uri;
          return {
            filePath: uri.startsWith('file:') ? fileURLToPath(uri) : uri,
            range: range(item.targetSelectionRange ?? item.range),
          };
        }),
      };
    },
  );
}

tool(
  'completions',
  'Get native TypeScript 7 completions; optionally filter by prefix. Positions are 1-based.',
  {
    ...location,
    prefix: z.string().default(''),
    limit: z.number().int().min(1).max(200).default(40),
    resolveLimit: z
      .number()
      .int()
      .min(0)
      .max(20)
      .default(0)
      .describe('Resolve documentation/details for at most this many returned items.'),
  },
  async (args, doc, language) => {
    const result = await language.request('textDocument/completion', {
      textDocument: { uri: doc.uri },
      position: position(doc, args.line, args.column),
    });
    const items = (Array.isArray(result) ? result : (result?.items ?? [])).filter((item) =>
      item.label.startsWith(args.prefix),
    );
    const selected = items.slice(0, args.limit);
    if (language.capabilities.completionProvider?.resolveProvider) {
      for (let i = 0; i < Math.min(args.resolveLimit, selected.length); i++) {
        selected[i] = {
          ...selected[i],
          ...(await language.request('completionItem/resolve', selected[i])),
        };
      }
    }
    return {
      total: items.length,
      editPositions: 'LSP zero-based UTF-16',
      isIncomplete: !Array.isArray(result) && Boolean(result?.isIncomplete),
      itemDefaults: !Array.isArray(result) ? result?.itemDefaults : undefined,
      items: selected.map(
        ({
          label,
          labelDetails,
          kind,
          detail,
          documentation,
          sortText,
          filterText,
          insertText,
          insertTextFormat,
          textEdit,
          additionalTextEdits,
          tags,
          deprecated,
        }) => ({
          label,
          labelDetails,
          kind,
          detail,
          documentation,
          sortText,
          filterText,
          insertText,
          insertTextFormat,
          textEdit,
          additionalTextEdits,
          tags,
          deprecated,
        }),
      ),
    };
  },
);

tool(
  'diagnostics',
  'Get complete TypeScript 7 and zerodep-js framework diagnostics for one file. Timeouts and incomplete reports are errors. Full-project checks remain separate.',
  file,
  async (_args, doc, language, version) => {
    if (!language.capabilities.diagnosticProvider)
      throw new Error('TypeScript 7 server does not support pull diagnostics.');
    const result = await language.request('textDocument/diagnostic', {
      textDocument: { uri: doc.uri },
    });
    if (result?.kind !== 'full' || !Array.isArray(result.items))
      throw new Error('TypeScript 7 did not return a complete diagnostic report.');
    const diagnostics = result.items.map((item) => ({
      code: item.code,
      severity: item.severity,
      message: item.message,
      range: range(item.range),
      source: item.source,
    }));
    const framework = await frameworkDiagnostics(doc);
    diagnostics.push(...framework);
    return {
      filePath: doc.relativePath,
      language: doc.kind,
      server: language.serverInfo,
      documentVersion: version,
      complete: true,
      framework: { complete: true, errors: framework.length },
      errors: diagnostics.filter((item) => item.severity === 1).length,
      diagnostics,
    };
  },
);

let closing = false;
function close() {
  if (closing) return;
  closing = true;
  stopAll();
  void server.close().finally(() => process.exit(0));
}
process.stdin.on('end', close);
process.on('SIGINT', close);
process.on('SIGTERM', close);
process.on('exit', () => {
  stopAll();
});
await server.connect(new StdioServerTransport());
