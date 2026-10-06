import {
  API,
  type Diagnostic as NativeDiagnostic,
  type Snapshot,
  type ParsedCommandLine,
  type RawCompilerOptions,
} from 'typescript/unstable/async';
import { readFile } from 'node:fs/promises';
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
import {
  canonical,
  changedFiles,
  dependencyStamps,
  projectOptions,
  stamp,
} from './project-files.js';
import { servicePolicy } from './service-policy.js';
import { createBuilder } from './build.js';
import { CheckCache } from './check-cache.js';

interface CompileLease {
  engine: ProjectCompiler;
  shared: boolean;
  settings: CompilerSessionOptions;
}
interface CheckedProject {
  config: ParsedCommandLine;
  compilerOptions: RawCompilerOptions;
  snapshot: Snapshot;
  files: string[];
  configFile: string;
  signature: string;
  stamps: Map<string, string>;
  pendingChanges: Set<string>;
  checked?: Diagnostic[];
  checkedAt: number;
  incremental: boolean;
  force: boolean;
  used: number;
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
  private readonly policy = servicePolicy();
  private readonly idleEngines = new Map<ProjectCompiler, number>();
  private readonly checks = new CheckCache();
  private readonly sweep: ReturnType<typeof setInterval>;
  private sweeping = false;
  private projectChecks = 0;
  private projectCheckCacheHits = 0;

  constructor(root: string) {
    this.root = root;
    this.sweep = setInterval(
      () => {
        if (this.sweeping) return;
        this.sweeping = true;
        void this.trimIdle()
          .catch(() => {})
          .finally(() => {
            this.sweeping = false;
          });
      },
      Math.min(this.policy.cacheTimeoutMs, 30_000),
    );
    this.sweep.unref();
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
            project.stamps.has(canonical(file))
          )
            project.pendingChanges.add(canonical(file));
        }
        for (const engine of new Set([
          ...this.shared.values(),
          ...[...this.leases.values()].map((item) => item.engine),
        ]))
          engine.invalidate(file, event, true);
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
        const api = await this.api;
        let engine = shared ? this.shared.get(key) : undefined;
        if (!engine) {
          engine = new ProjectCompiler(api, settings);
          if (shared) this.shared.set(key, engine);
        }
        this.idleEngines.delete(engine);
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
          const builder = await createBuilder(await this.api, this.root, project);
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
              let items: NativeDiagnostic[];
              if (project.incremental) {
                const result = await this.checks.check(
                  await this.api,
                  this.root,
                  project.configFile,
                  request.lint,
                  project.force,
                );
                items = result.diagnostics ?? [];
                if (result.status !== 0 && !items.some((item) => item.category === 1))
                  throw new Error('原生增量检查未完成，状态 ' + result.status);
              } else {
                // 引用项目需要各自的输出契约；全局 noEmit/buildInfo 覆盖会破坏 -b 的语义。
                items = [
                  ...(await program.getProgramDiagnostics()),
                  ...(await program.getSyntacticDiagnostics()),
                  ...(await program.getSemanticDiagnostics()),
                ];
              }
              project.checked = items.filter((item) => item.category === 1).map(diagnostic);
              project.checkedAt = Date.now();
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
    const changes = [
      ...(await changedFiles(project.stamps)),
      ...(await this.unknownChanges(project)),
    ];
    const config = await (await this.api).parseConfigFile(project.configFile);
    if (JSON.stringify(config) !== project.signature) changes.push(project.configFile);
    return changes;
  }

  private async unknownChanges(project: CheckedProject): Promise<string[]> {
    const unknown = [...project.pendingChanges].filter((file) => !project.stamps.has(file));
    if (!unknown.length) return [];
    // 同目录中的其他项目/被排除文件也会发出通知。重新解析图确认是否加入依赖，
    // 不把它们当作本次检查期间必然发生了源码变更；根列表另由配置签名校验。
    const snapshot = await (
      await this.api
    ).createSnapshot({
      ensurePrograms: true,
      createPrograms: [
        {
          rootFiles: project.config.fileNames,
          compilerOptions: project.compilerOptions,
          options: { projectReferences: project.config.projectReferences },
        },
      ],
    });
    try {
      const program = snapshot.operation.createdPrograms![0]!;
      const dependencies = [
        ...(await program.getSourceFileNames()),
        ...(await program.getConfigFileNames()),
      ];
      return dependencies.some((file) => !project.stamps.has(canonical(file))) ? unknown : [];
    } finally {
      await snapshot.dispose();
    }
  }

  private async project(name: string, lint?: boolean): Promise<CheckedProject> {
    const file = this.path(name);
    const key = file + ':' + lint;
    const api = await this.api;
    const config = await api.parseConfigFile(file);
    if (config.errors.length) throw new Error(config.errors.map((item) => item.text).join('\n'));
    const signature = JSON.stringify(config);
    let project = this.projects.get(key);
    let force = !project;
    if (project) {
      // 监听事件用于低延迟失效，磁盘指纹与 include 列表用于校验；不能把漏报事件当成干净结果。
      const changed = [
        ...(await changedFiles(project.stamps)),
        ...(await this.unknownChanges(project)),
      ];
      if (changed.length || signature !== project.signature || project.checked?.length) {
        for (const path of changed) this.language.changes.set(path, 'update');
        await this.language.flush();
        force =
          signature !== project.signature || changed.some((path) => !/\.[cm]?[jt]sx?$/.test(path));
        // 恢复旧时间戳或同刻写入时，不能让原生构建器仅按 mtime 判为未改变。
        if (!force) {
          for (const path of changed) {
            const before = project.stamps.get(path)?.split(':')[0];
            const after = (await stamp(path)).split(':')[0];
            if (
              !before ||
              before === 'missing' ||
              after === 'missing' ||
              BigInt(after!) <= BigInt(before) + 1_000_000n ||
              BigInt(after!) <= BigInt(project.checkedAt + 1) * 1_000_000n
            ) {
              force = true;
              break;
            }
          }
        }
        this.projects.delete(key);
        await project.snapshot.dispose();
        project = undefined;
      } else project.pendingChanges.clear();
    }
    if (!project) {
      const compilerOptions = {
        ...projectOptions(config.options),
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
      project = {
        config,
        compilerOptions,
        snapshot,
        files: config.fileNames.filter((file) => !file.endsWith('.d.ts')),
        configFile: file,
        pendingChanges: new Set(),
        signature,
        stamps: await dependencyStamps(dependencies),
        incremental: !config.projectReferences?.length,
        force,
        used: Date.now(),
        checkedAt: 0,
      };
      this.projects.set(key, project);
      if (this.projects.size > 16) {
        const first = this.projects.keys().next().value!;
        const expired = this.projects.get(first)!;
        this.projects.delete(first);
        await expired.snapshot.dispose();
      }
    }
    project.used = Date.now();
    this.projects.delete(key);
    this.projects.set(key, project);
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
      ...this.policy,
      idleProjects: this.idleEngines.size,
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
    this.idleEngines.delete(engine);
    this.idleEngines.set(engine, Date.now());
    await this.trimEngines();
  }
  private async trimEngines(): Promise<void> {
    for (const [engine, used] of this.idleEngines) {
      if (
        this.idleEngines.size <= this.policy.maxIdleProjects &&
        Date.now() - used < this.policy.cacheTimeoutMs
      )
        break;
      this.idleEngines.delete(engine);
      for (const [key, current] of this.shared) if (current === engine) this.shared.delete(key);
      await engine.close();
    }
  }
  private async trimIdle(): Promise<void> {
    await this.trimEngines();
    const run = this.projectQueue
      .catch(() => {})
      .then(async () => {
        for (const [key, project] of this.projects) {
          if (Date.now() - project.used < this.policy.cacheTimeoutMs) continue;
          this.projects.delete(key);
          await project.snapshot.dispose();
        }
      });
    this.projectQueue = run;
    await run;
  }
  async release(owner: string): Promise<void> {
    for (const id of [...this.leases.keys()])
      if (id.startsWith(owner + ':')) await this.releaseCompile(id);
  }
  async close(): Promise<void> {
    clearInterval(this.sweep);
    await this.projectQueue.catch(() => {});
    const engines = new Set([
      ...this.shared.values(),
      ...[...this.leases.values()].map((item) => item.engine),
    ]);
    try {
      await Promise.allSettled([
        ...[...engines].map((engine) => engine.close()),
        ...[...this.projects.values()].map((project) => project.snapshot.dispose()),
      ]);
    } finally {
      try {
        await this.checks.close();
        await (await this.api).close();
      } finally {
        await this.language.close();
      }
    }
  }
}
