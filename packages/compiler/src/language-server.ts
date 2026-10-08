import { fileURLToPath } from 'node:url';
import { realpathSync } from 'node:fs';
import {
  createConnection,
  TextDocuments,
  TextDocumentSyncKind,
  StreamMessageReader,
  StreamMessageWriter,
  ResponseError,
  LSPErrorCodes,
  ErrorCodes,
  type CancellationToken,
  type Diagnostic,
  type InitializeParams,
  type InitializeResult,
} from 'vscode-languageserver/node';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { LanguageWorkspace } from './language-workspace.js';

// 显式 reader/writer 避免库在 stdin 关闭时立即退出，先释放本连接拥有的SDK 子进程。
const connection = createConnection(
  new StreamMessageReader(process.stdin),
  new StreamMessageWriter(process.stdout),
);
const documents = new TextDocuments(TextDocument);
let workspace: LanguageWorkspace | undefined;
let changes: Promise<void> = Promise.resolve();
let diagnostics: Promise<void> = Promise.resolve();
let timer: ReturnType<typeof setTimeout> | undefined;
let stopped = false;
let revision = 0;

function service(): LanguageWorkspace {
  if (!workspace || stopped) throw new Error('语言服务尚未初始化或已关闭。');
  return workspace;
}

connection.onInitialize(async (params: InitializeParams): Promise<InitializeResult> => {
  const uri = params.rootUri ?? params.workspaceFolders?.[0]?.uri;
  if (!uri) throw new Error('请为语言服务配置项目根目录。');
  const expectedRoot = (params.initializationOptions as { projectRoot?: string } | undefined)
    ?.projectRoot;
  // LSP4IJ 的服务器定义是全局的；导入本机模板后只在指定项目启用，不干扰其他工作区。
  if (expectedRoot && realpathSync.native(fileURLToPath(uri)) !== realpathSync.native(expectedRoot))
    return { capabilities: { textDocumentSync: TextDocumentSyncKind.None } };
  workspace = new LanguageWorkspace(fileURLToPath(uri));
  const info = await workspace.request<InitializeResult>({ action: 'info' });
  workspace.language.onChanges = scheduleDiagnostics;
  return {
    serverInfo: { name: 'zerodep-js', version: info.serverInfo?.version ?? '7.1' },
    capabilities: {
      textDocumentSync: { openClose: true, change: TextDocumentSyncKind.Incremental, save: true },
      completionProvider: {
        ...info.capabilities.completionProvider,
        resolveProvider: true,
      },
      hoverProvider: true,
      definitionProvider: true,
      referencesProvider: true,
      renameProvider: true,
      ...(info.capabilities.signatureHelpProvider
        ? { signatureHelpProvider: info.capabilities.signatureHelpProvider }
        : {}),
    },
  };
});

async function request(
  method: string,
  params: Record<string, unknown>,
  token?: CancellationToken,
): Promise<unknown> {
  await changes;
  const expectedRevision = revision;
  if (token?.isCancellationRequested)
    throw new ResponseError(LSPErrorCodes.RequestCancelled, '请求已取消。');
  const uri = (params.textDocument as { uri?: string } | undefined)?.uri;
  const document = uri && documents.get(uri);
  const result = await service().request({
    action: 'lsp',
    method,
    params,
    ...(document
      ? {
          document: {
            uri: document.uri,
            languageId: document.languageId,
            text: document.getText(),
          },
        }
      : {}),
  });
  if (token?.isCancellationRequested)
    throw new ResponseError(LSPErrorCodes.RequestCancelled, '请求已取消。');
  if (revision !== expectedRevision)
    throw new ResponseError(LSPErrorCodes.ContentModified, '源码已变化，请重新请求。');
  return result;
}

// 只声明已验证且可正确映射到源码的能力，不转发生成代码的格式化或语义 token。
const methods = new Set([
  'textDocument/completion',
  'completionItem/resolve',
  'textDocument/hover',
  'textDocument/definition',
  'textDocument/references',
  'textDocument/rename',
  'textDocument/signatureHelp',
]);
connection.onRequest((method, params, token) => {
  if (!methods.has(method))
    throw new ResponseError(ErrorCodes.MethodNotFound, '不支持的编辑器操作。');
  if (!params || Array.isArray(params)) throw new Error('语言请求需要对象参数。');
  return request(method, Object.fromEntries(Object.entries(params)), token);
});

function scheduleDiagnostics(): void {
  if (stopped) return;
  revision++;
  clearTimeout(timer);
  timer = setTimeout(() => {
    diagnostics = diagnostics
      .catch(() => {})
      .then(async () => {
        await changes;
        for (const document of documents.all()) {
          if (stopped) return;
          const version = document.version;
          const result = (await request('textDocument/diagnostic', {
            textDocument: { uri: document.uri },
          })) as { items: Diagnostic[] };
          // 编辑过程中旧结果可能较晚返回；只有仍匹配当前版本的结果才可覆盖编辑器诊断。
          if (documents.get(document.uri)?.version === version) {
            await connection.sendDiagnostics({
              uri: document.uri,
              version,
              diagnostics: result.items,
            });
          }
        }
      });
    void diagnostics.catch((error: unknown) => {
      // 依赖文件的未保存修改也会使结果失效；新一轮已排队，不发布或记录过期诊断。
      if (error instanceof ResponseError && error.code === LSPErrorCodes.ContentModified) return;
      connection.console.error(String(error));
    });
  }, 80);
}

documents.onDidChangeContent(({ document }) => {
  if (!workspace) return;
  changes = changes.then(() =>
    service().setDocument({
      uri: document.uri,
      languageId: document.languageId,
      text: document.getText(),
    }),
  );
  scheduleDiagnostics();
});
documents.onDidClose(({ document }) => {
  if (!workspace) return;
  changes = changes.then(() => service().language.removeDocument(document.uri));
  void connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
  scheduleDiagnostics();
});
connection.onDidChangeWatchedFiles((params) => {
  if (!workspace) return;
  changes = changes.then(async () => {
    await service().language.connection.sendNotification('workspace/didChangeWatchedFiles', params);
  });
  scheduleDiagnostics();
});

async function close(): Promise<void> {
  stopped = true;
  clearTimeout(timer);
  await changes.catch(() => {});
  await diagnostics.catch(() => {});
  await workspace?.close();
}
connection.onShutdown(close);
// 库处理 exit 和父客户端消失时可能直接退出；同步兜底只终止自己创建的子进程。
process.once('exit', () => workspace?.language.child.kill());
process.stdin.once('end', () => {
  void close().finally(() => process.exit(0));
});
for (const signal of ['SIGINT', 'SIGTERM'] as const)
  process.once(signal, () => {
    void close().finally(() => process.exit(0));
  });
documents.listen(connection);
connection.listen();
