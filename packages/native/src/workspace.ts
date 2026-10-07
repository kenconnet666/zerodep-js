import type { API } from 'typescript/unstable/async';
import { createHash } from 'node:crypto';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { NativeLanguageService } from './language-service.js';
import { canonicalPath, workspaceRoot } from './paths.js';
import { diagnostic } from './diagnostics.js';
import { changedFiles, dependencyStamps, projectOptions } from './project-files.js';
import { createBuilder } from './build.js';
import type { CheckResult, WorkspaceRequest } from './protocol.js';

/** 当前工具宿主独占一个 Go 服务；每次项目操作创建并释放快照。 */
export class NativeWorkspace {
  readonly root: string;
  readonly language: NativeLanguageService;
  private readonly api: Promise<API<true>>;
  private queue: Promise<unknown> = Promise.resolve();
  private closed = false;
  private closing: Promise<void> | undefined;

  constructor(directory: string) {
    this.root = workspaceRoot(directory);
    this.language = new NativeLanguageService(this.root);
    this.api = this.language.openAPI();
    void this.api.catch(() => {});
  }

  private path(name: string): string {
    const file = canonicalPath(resolve(this.root, name));
    const inside = relative(this.root, file);
    if (isAbsolute(inside) || inside === '..' || inside.startsWith('..' + sep))
      throw new Error('工具输入必须位于项目目录内。');
    return file;
  }

  request<T>(request: WorkspaceRequest): Promise<T> {
    if (this.closed) return Promise.reject(new Error('原生工具会话已关闭。'));
    const operation = this.queue.catch(() => {}).then(() => this.execute(request));
    this.queue = operation;
    return operation as Promise<T>;
  }

  private async execute(request: WorkspaceRequest): Promise<unknown> {
    await this.language.ready;
    this.language.assertAlive();
    await this.language.flush();
    if (request.action === 'info') return this.language.ready;
    if (request.action === 'lsp') {
      if (request.document) this.path(fileURLToPath(request.document.uri));
      const target = (request.params as { textDocument?: { uri?: unknown } } | undefined)
        ?.textDocument?.uri;
      if (typeof target === 'string') this.path(fileURLToPath(target));
      if (
        !/^(?:textDocument\/|codeAction\/resolve$|completionItem\/resolve$|workspace\/symbol$|zerodep\/inspect$)/.test(
          request.method,
        )
      )
        throw new Error('不支持的语言服务操作。');
      return this.language.request(request.method, request.params, request.document);
    }
    const api = await this.api;
    if (request.action === 'build') {
      const builder = await createBuilder(api, this.root, this.path(request.project));
      try {
        const result = await builder.build();
        return {
          status: result.status,
          diagnostics: (result.diagnostics ?? []).map(diagnostic),
          statistics: result.statistics,
        };
      } finally {
        await builder.dispose();
      }
    }
    if (request.action === 'check') {
      const diagnostics = [];
      const changes: string[] = [];
      const revision = createHash('sha256');
      const selected = [];
      for (const name of request.projects) {
        const project = await this.project(name, request.lint);
        try {
          const program = project.snapshot.operation.createdPrograms![0]!;
          const items = [
            ...(await program.getProgramDiagnostics()),
            ...(await program.getSyntacticDiagnostics()),
            ...(await program.getSemanticDiagnostics()),
          ];
          diagnostics.push(...items.filter((item) => item.category === 1).map(diagnostic));
          selected.push(project);
          revision.update(project.signature);
          for (const [file, stamp] of [...project.stamps].sort(([a], [b]) => a.localeCompare(b)))
            revision.update(file).update(stamp.split(':')[4] ?? stamp);
        } finally {
          await project.snapshot.dispose();
        }
      }
      for (const project of selected) {
        changes.push(...(await changedFiles(project.stamps)));
        if (JSON.stringify(await api.parseConfigFile(project.file)) !== project.signature)
          changes.push(project.file);
      }
      return {
        diagnostics,
        projects: request.projects.length,
        complete: changes.length === 0,
        revision: revision.digest('hex'),
        ...(changes.length ? { changedFiles: [...new Set(changes)] } : {}),
      } satisfies CheckResult;
    }
    const project = await this.project(request.project);
    try {
      const output = await project.snapshot.operation.createdPrograms![0]!.getDeclarationEmit(
        project.files,
      );
      return {
        diagnostics: output.diagnostics.map(diagnostic),
        files: [...output.outputFiles]
          .filter(([file]) => file.endsWith('.d.ts'))
          .map(([file, data]) => ({ file, text: data.text })),
      };
    } finally {
      await project.snapshot.dispose();
    }
  }

  private async project(name: string, lint?: boolean) {
    const file = this.path(name);
    const api = await this.api;
    const config = await api.parseConfigFile(file);
    if (config.errors.length) throw new Error(config.errors.map((item) => item.text).join('\n'));
    const snapshot = await api.createSnapshot({
      ensurePrograms: true,
      createPrograms: [
        {
          rootFiles: config.fileNames,
          compilerOptions: {
            ...projectOptions(config.options),
            ...(lint === undefined ? {} : { zerodepLint: lint }),
          },
          options: { projectReferences: config.projectReferences },
        },
      ],
    });
    try {
      const program = snapshot.operation.createdPrograms![0]!;
      return {
        file,
        signature: JSON.stringify(config),
        snapshot,
        files: config.fileNames.filter((file) => !file.endsWith('.d.ts')),
        stamps: await dependencyStamps([
          file,
          ...(await program.getSourceFileNames()),
          ...(await program.getConfigFileNames()),
        ]),
      };
    } catch (error) {
      await snapshot.dispose();
      throw error;
    }
  }

  close(): Promise<void> {
    return (this.closing ??= this.finishClose());
  }
  private async finishClose(): Promise<void> {
    this.closed = true;
    const timer = setTimeout(() => this.language.child.kill(), 5000);
    try {
      await this.queue.catch(() => {});
    } finally {
      try {
        await this.language.close();
      } finally {
        clearTimeout(timer);
      }
    }
  }
}
