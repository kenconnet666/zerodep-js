import { API, type Diagnostic as NativeDiagnostic, type Snapshot } from 'typescript/unstable/async';
import { readFile, stat } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { NativeLanguageService } from './language-service.js';
import { ProjectCompiler } from './project.js';
import { canonicalPath } from './paths.js';
import type {
  CheckResult,
  CompilerSessionOptions,
  WorkspaceRequest,
  WorkspaceStats,
} from './protocol.js';
import type { Diagnostic } from './types.js';

interface CompileLease {
  engine: ProjectCompiler;
  shared: boolean;
  settings: CompilerSessionOptions;
}
interface CheckedProject {
  snapshot: Snapshot;
  files: string[];
  configFile: string;
  signature: string;
  stamps: Map<string, string>;
  pendingChanges: Set<string>;
  checked?: Diagnostic[];
}

export function diagnostic(
  item: Pick<NativeDiagnostic, 'text' | 'code' | 'fileName' | 'startPosition' | 'endPosition'>,
): Diagnostic {
  return {
    code: item.text.match(/^ZJ\d+/)?.[0] ?? `TS${item.code}`,
    message: item.text.replace(/^ZJ\d+:\s*/, ''),
    filename: item.fileName ?? '',
    line: (item.startPosition?.line ?? 0) + 1,
    column: (item.startPosition?.character ?? 0) + 1,
    endLine: (item.endPosition?.line ?? 0) + 1,
    endColumn: (item.endPosition?.character ?? 0) + 1,
  };
}

export class NativeWorkspace {
  readonly root: string;
  readonly language: NativeLanguageService;
  readonly api: Promise<API<true>>;
  private readonly leases = new Map<string, CompileLease>();
  private readonly shared = new Map<string, ProjectCompiler>();
  private readonly projects = new Map<string, CheckedProject>();
  private projectQueue: Promise<unknown> = Promise.resolve();
  private projectChecks = 0;
  private projectCheckCacheHits = 0;

  constructor(root: string) {
    this.root = root;
    this.language = new NativeLanguageService(root);
    this.api = this.language
      .request<{ pipe: string }>('custom/initializeAPISession', {})
      .then(({ pipe }) => API.fromLSPConnection({ pipe }));
    void this.api.catch(() => {});
    this.language.onChanges = (changes) => {
      for (const [file, event] of changes) {
        for (const project of this.projects.values()) {
          const path = relative(dirname(project.configFile), file);
          if (
            (!isAbsolute(path) && path !== '..' && !path.startsWith('..' + sep)) ||
            file.endsWith('package.json') ||
            file.endsWith('pnpm-lock.yaml')
          )
            project.pendingChanges.add(canonical(file));
        }
        for (const engine of new Set([
          ...this.shared.values(),
          ...[...this.leases.values()].map((item) => item.engine),
        ]))
          engine.invalidate(file, event);
      }
    };
  }

  path(name: string): string {
    const file = canonicalPath(resolve(this.root, name));
    const inside = relative(this.root, file);
    if (isAbsolute(inside) || inside === '..' || inside.startsWith('..' + sep))
      throw new Error('工具输入必须位于项目目录内。');
    return file;
  }

  async execute(owner: string, request: WorkspaceRequest): Promise<unknown> {
    await this.language.ready;
    await this.language.flush();
    if (request.action === 'info') return this.language.ready;
    if (request.action === 'stats') return this.stats();
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
    if (request.action === 'compile') {
      const id = owner + ':' + request.id;
      // Vite 可以从应用目录外加载共享源码；编译输入是调用方明确提供的文件与文本。
      const filename = canonicalPath(resolve(this.root, request.filename));
      const root = this.path(request.settings.root ?? this.root);
      const project = request.settings.project
        ? this.path(resolve(root, request.settings.project))
        : undefined;
      const settings: CompilerSessionOptions = { root, ...(project ? { project } : {}) };
      const disk = await readFile(filename, 'utf8').catch((error: NodeJS.ErrnoException) => {
        if (error.code !== 'ENOENT') throw error;
        return undefined;
      });
      let lease = this.leases.get(id);
      if (!lease || (lease.shared && disk !== request.source)) {
        const previous = lease;
        const shared = disk === request.source && !lease;
        const key = JSON.stringify(settings);
        let engine = shared ? this.shared.get(key) : undefined;
        if (!engine) {
          engine = new ProjectCompiler(await this.api, settings);
          if (shared) this.shared.set(key, engine);
        }
        lease = { engine, shared, settings };
        this.leases.set(id, lease);
        if (previous?.shared) await this.dropShared(previous.engine);
      }
      return lease.engine.compile(
        request.source,
        filename,
        request.options,
        request.settings.check !== false,
      );
    }
    if (request.action === 'invalidate') {
      const file = canonicalPath(resolve(this.root, request.filename));
      this.leases.get(owner + ':' + request.id)?.engine.invalidate(file, request.event);
      this.language.changes.set(file, request.event);
      await this.language.flush();
      return null;
    }
    if (request.action === 'closeCompile') {
      await this.releaseCompile(owner + ':' + request.id);
      return null;
    }
    const run = this.projectQueue
      .catch(() => {})
      .then(async () => {
        if (request.action === 'build') {
          const project = this.path(request.project);
          // 保留 Go 进程和磁盘增量信息；每轮重新读取构建图与输出时间，避免跨轮缓存误判已就绪。
          const builder = await (
            await this.api
          ).createBuildOrchestrator([project], {
            cwd: this.root,
            stopBuildOnErrors: true,
          });
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
          const selected: CheckedProject[] = [];
          let cached = true;
          const diagnostics: Diagnostic[] = [];
          for (const path of request.projects) {
            const project = await this.project(path, request.lint);
            selected.push(project);
            if (project.checked) this.projectCheckCacheHits++;
            else {
              cached = false;
              this.projectChecks++;
              const program = project.snapshot.operation.createdPrograms![0]!;
              const items = [
                ...(await program.getProgramDiagnostics()),
                ...(await program.getSyntacticDiagnostics()),
                ...(await program.getSemanticDiagnostics()),
              ];
              project.checked = items.filter((item) => item.category === 1).map(diagnostic);
            }
            diagnostics.push(...project.checked);
          }
          await this.language.flush();
          const changes = [
            ...new Set(
              (await Promise.all(selected.map((project) => this.projectChanges(project)))).flat(),
            ),
          ];
          return {
            diagnostics,
            projects: request.projects.length,
            cached,
            complete: changes.length === 0,
            ...(changes.length ? { changedFiles: changes } : {}),
          } satisfies CheckResult;
        }
        if (request.action === 'declarations') {
          const project = await this.project(request.project);
          const program = project.snapshot.operation.createdPrograms![0]!;
          const output = await program.getDeclarationEmit(project.files);
          return {
            diagnostics: output.diagnostics.map(diagnostic),
            files: [...output.outputFiles]
              .filter(([file]) => file.endsWith('.d.ts'))
              .map(([file, data]) => ({ file, text: data.text })),
          };
        }
        throw new Error('未知工具操作。');
      });
    this.projectQueue = run;
    return run;
  }

  private async projectChanges(project: CheckedProject): Promise<string[]> {
    const changes = [...(await changedFiles(project.stamps)), ...this.unknownChanges(project)];
    const config = await (await this.api).parseConfigFile(project.configFile);
    if (JSON.stringify(config) !== project.signature) changes.push(project.configFile);
    return changes;
  }

  private unknownChanges(project: CheckedProject): string[] {
    // 已捕获文件的重复/迟到事件由指纹判定；新文件和包元数据仍需重建模块图。
    return [...project.pendingChanges].filter((file) => !project.stamps.has(file));
  }

  private async project(name: string, lint?: boolean): Promise<CheckedProject> {
    const file = this.path(name);
    const key = file + ':' + lint;
    const api = await this.api;
    const config = await api.parseConfigFile(file);
    if (config.errors.length) throw new Error(config.errors.map((item) => item.text).join('\n'));
    const signature = JSON.stringify(config);
    let project = this.projects.get(key);
    if (project) {
      // 监听事件用于低延迟失效，磁盘指纹与 include 列表用于校验；不能把漏报事件当成干净结果。
      const changed = [...(await changedFiles(project.stamps)), ...this.unknownChanges(project)];
      if (changed.length || signature !== project.signature || project.checked?.length) {
        for (const path of changed) this.language.changes.set(path, 'update');
        await this.language.flush();
        this.projects.delete(key);
        await project.snapshot.dispose();
        project = undefined;
      } else project.pendingChanges.clear();
    }
    if (!project) {
      const compilerOptions = {
        ...config.options,
        ...(lint === undefined ? {} : { zerodepLint: lint }),
      };
      const snapshot = await api.createSnapshot({
        ensurePrograms: true,
        createPrograms: [
          {
            rootFiles: config.fileNames,
            compilerOptions,
            options: { projectReferences: config.projectReferences },
          },
        ],
      });
      const program = snapshot.operation.createdPrograms![0]!;
      const dependencies = new Set(
        [
          file,
          ...(await program.getSourceFileNames()),
          ...(await program.getConfigFileNames()),
        ].map(canonical),
      );
      // node_modules 的包声明可以影响 exports/imports 解析；不依赖被排除目录的监听事件。
      const directories = new Set<string>();
      for (const path of dependencies) {
        for (let directory = dirname(path); ; directory = dirname(directory)) {
          if (directories.has(directory)) break;
          directories.add(directory);
          if (dirname(directory) === directory) break;
        }
      }
      for (const directory of directories) dependencies.add(resolve(directory, 'package.json'));
      dependencies.add(canonical(resolve(this.root, 'pnpm-lock.yaml')));
      project = {
        snapshot,
        files: config.fileNames.filter((file) => !file.endsWith('.d.ts')),
        configFile: file,
        pendingChanges: new Set(),
        signature,
        stamps: new Map(
          await Promise.all(
            [...dependencies].map(async (path) => [path, await stamp(path)] as const),
          ),
        ),
      };
      this.projects.set(key, project);
      if (this.projects.size > 16) {
        const first = this.projects.keys().next().value!;
        const expired = this.projects.get(first)!;
        this.projects.delete(first);
        await expired.snapshot.dispose();
      }
    }
    return project;
  }

  stats(): Omit<WorkspaceStats, 'clients'> {
    const engines = new Set([
      ...this.shared.values(),
      ...[...this.leases.values()].map((item) => item.engine),
    ]);
    return {
      serverPid: process.pid,
      compilerPid: this.language.child.pid ?? 0,
      compileSessions: this.leases.size,
      sharedProjects: this.shared.size,
      programsCreated:
        [...engines].reduce((sum, engine) => sum + engine.stats.programsCreated, 0) +
        this.projects.size,
      semanticChecks: [...engines].reduce((sum, engine) => sum + engine.stats.semanticChecks, 0),
      outputCacheHits: [...engines].reduce((sum, engine) => sum + engine.stats.outputCacheHits, 0),
      projectChecks: this.projectChecks,
      projectCheckCacheHits: this.projectCheckCacheHits,
    };
  }

  private async releaseCompile(id: string): Promise<void> {
    const lease = this.leases.get(id);
    this.leases.delete(id);
    if (lease && !lease.shared) await lease.engine.close();
    else if (lease) await this.dropShared(lease.engine);
  }
  private async dropShared(engine: ProjectCompiler): Promise<void> {
    if ([...this.leases.values()].some((lease) => lease.engine === engine)) return;
    for (const [key, current] of this.shared) if (current === engine) this.shared.delete(key);
    await engine.close();
  }
  async release(owner: string): Promise<void> {
    for (const id of [...this.leases.keys()])
      if (id.startsWith(owner + ':')) await this.releaseCompile(id);
  }
  async close(): Promise<void> {
    await this.projectQueue.catch(() => {});
    for (const engine of new Set([
      ...this.shared.values(),
      ...[...this.leases.values()].map((item) => item.engine),
    ]))
      await engine.close();
    for (const project of this.projects.values()) await project.snapshot.dispose();
    try {
      await (await this.api).close();
    } finally {
      await this.language.close();
    }
  }
}

function canonical(file: string): string {
  return process.platform === 'win32' ? resolve(file).toLowerCase() : resolve(file);
}

async function stamp(file: string): Promise<string> {
  try {
    const info = await stat(file, { bigint: true });
    return `${info.mtimeNs}:${info.ctimeNs}:${info.size}:${info.ino}`;
  } catch (error) {
    if (['ENOENT', 'ENOTDIR'].includes((error as NodeJS.ErrnoException).code ?? ''))
      return 'missing';
    throw error;
  }
}
async function changedFiles(stamps: Map<string, string>): Promise<string[]> {
  const current = await Promise.all(
    [...stamps].map(async ([file, previous]) =>
      (await stamp(file)) === previous ? undefined : file,
    ),
  );
  return current.filter((file): file is string => file !== undefined);
}
