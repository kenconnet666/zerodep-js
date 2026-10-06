import { API } from 'typescript/unstable/async';
import type {
  ParsedCommandLine,
  RawCompilerOptions,
  Snapshot,
  SyntheticProjectId,
} from 'typescript/unstable/async';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { throwDiagnostics } from './diagnostics.js';
import { nativeOptions, result } from './output.js';
import type { CompileOptions, CompileResult } from './types.js';

export interface CompilerSessionOptions {
  root?: string;
  project?: string;
  /** 默认在相同 Program 中检查请求文件，再输出 JS。 */
  check?: boolean;
}

/** 一个宿主持有一个服务；更新与输出串行，旧快照在请求结束后释放。 */
export class ProjectCompiler {
  readonly root: string;
  private readonly api: Pick<API, 'parseConfigFile' | 'createSnapshot'>;
  private readonly options: CompilerSessionOptions;
  private snapshot: Snapshot | undefined;
  private readonly programs = new Map<string, SyntheticProjectId>();
  private readonly files = new Map<string, Set<string>>();
  private readonly roots = new Map<string, Set<string>>();
  private readonly contents = new Map<string, string>();
  private readonly diskContents = new Map<string, string>();
  private readonly outputs = new Map<string, CompileResult>();
  private readonly changes = new Set<string>();
  private readonly deleted = new Set<string>();
  private readonly created = new Set<string>();
  private queue: Promise<unknown> = Promise.resolve();
  private closed = false;
  private closing: Promise<void> | undefined;
  private configChanged = false;
  private readonly checked = new Set<string>();
  readonly stats = { programsCreated: 0, semanticChecks: 0, outputCacheHits: 0 };
  private readonly configs = new Map<string, ParsedCommandLine>();

  constructor(
    api: Pick<API, 'parseConfigFile' | 'createSnapshot'>,
    options: CompilerSessionOptions = {},
  ) {
    this.options = options;
    this.root = resolve(options.root ?? '.');
    this.api = api;
  }

  invalidate(
    file: string,
    event: 'create' | 'update' | 'delete' = 'update',
    fromWatcher = false,
  ): void {
    const filename = resolve(file);
    this.queue = this.queue
      .catch(() => {})
      .then(async () => {
        const canonical = process.platform === 'win32' ? filename.toLowerCase() : filename;
        const fromRoot = relative(this.root, filename);
        const inside =
          !isAbsolute(fromRoot) && fromRoot !== '..' && !fromRoot.startsWith('..' + sep);
        const metadata = filename.endsWith('package.json') || filename.endsWith('pnpm-lock.yaml');
        const affectedMetadata =
          metadata &&
          [this.root, ...[...this.files.values()].flatMap((files) => [...files])].some((path) => {
            const child = relative(dirname(filename), path);
            return !isAbsolute(child) && child !== '..' && !child.startsWith('..' + sep);
          });
        if (
          !inside &&
          !affectedMetadata &&
          !this.configs.has(filename) &&
          ![...this.files.values()].some((files) => files.has(canonical))
        )
          return;
        // macOS 可能延迟送达创建/变更通知。只忽略已读磁盘内容相同的事件；显式失效仍强制执行。
        const previous = this.diskContents.get(filename);
        if (
          fromWatcher &&
          event !== 'delete' &&
          previous !== undefined &&
          (await readFile(filename, 'utf8').catch(() => undefined)) === previous
        )
          return;
        this.changes.add(filename);
        this.contents.delete(filename);
        if (event === 'delete') this.deleted.add(filename);
        else this.deleted.delete(filename);
        if (event === 'create') this.created.add(filename);
        this.outputs.clear();
        this.checked.clear();
        if (filename.endsWith('.json') || metadata || event === 'create' || event === 'delete')
          this.configChanged = true;
      });
  }

  private async readDisk(file: string): Promise<string> {
    const text = await readFile(file, 'utf8');
    this.diskContents.set(file, text);
    return text;
  }

  compile(
    source: string,
    file: string,
    options: CompileOptions = {},
    check = this.options.check !== false,
  ): Promise<CompileResult> {
    if (this.closed) return Promise.reject(new Error('原生编译服务已关闭。'));
    const operation = this.queue
      .catch(() => {})
      .then(() => this.emit(source, resolve(file), options, check));
    this.queue = operation;
    return operation;
  }

  private project(filename: string): string | undefined {
    if (this.options.project) return resolve(this.root, this.options.project);
    let directory = dirname(filename);
    for (;;) {
      const config = resolve(directory, 'tsconfig.json');
      if (existsSync(config)) return config;
      const parent = dirname(directory);
      if (parent === directory) return undefined;
      directory = parent;
    }
  }

  private async emit(
    source: string,
    filename: string,
    options: CompileOptions,
    check: boolean,
  ): Promise<CompileResult> {
    // 显式覆盖旧快照的层；只删本地缓存会让依赖回落到旧的内存文本。
    for (const path of this.changes) {
      if (this.deleted.has(path)) {
        this.diskContents.delete(path);
        continue;
      }
      try {
        this.contents.set(path, await this.readDisk(path));
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
        this.deleted.add(path);
      }
    }
    const configPath = this.project(filename);
    const key = JSON.stringify([
      configPath ?? filename,
      options.development ?? false,
      options.hmr ?? true,
      options.runtimeModule ?? null,
    ]);
    const outputKey = key + '\0' + filename;
    if (
      !this.changes.size &&
      this.contents.get(filename) === source &&
      this.outputs.has(outputKey) &&
      (!check || this.checked.has(outputKey))
    ) {
      this.stats.outputCacheHits++;
      return this.outputs.get(outputKey)!;
    }
    if (this.configChanged) {
      await this.snapshot?.dispose();
      this.snapshot = undefined;
      this.programs.clear();
      this.files.clear();
      this.roots.clear();
      this.configs.clear();
      this.configChanged = false;
    }
    let config = configPath ? this.configs.get(configPath) : undefined;
    if (configPath && !config) {
      await this.readDisk(configPath);
      config = await this.api.parseConfigFile(configPath);
      throwDiagnostics(config.errors, configPath);
      this.configs.set(configPath, config);
    }
    const compilerOptions: RawCompilerOptions = {
      ...config?.options,
      ...nativeOptions(options),
      target: config?.options.target ?? nativeOptions(options).target,
      noEmit: false,
      declaration: false,
      declarationMap: false,
      emitDeclarationOnly: false,
      noEmitOnError: true,
      allowJs: true,
    };
    const rootSet = this.roots.get(key) ?? new Set<string>(config?.fileNames ?? []);
    const known = this.files.get(key);
    const canonical = (path: string) =>
      process.platform === 'win32' ? resolve(path).toLowerCase() : resolve(path);
    const addRoot = !known?.has(canonical(filename));
    if (addRoot) rootSet.add(filename);
    this.roots.set(key, rootSet);
    const rootFiles = [...rootSet].filter((path) => !this.deleted.has(resolve(path)));
    const input = {
      rootFiles,
      compilerOptions,
      options: { projectReferences: config?.projectReferences },
    };
    const previousSource =
      this.contents.get(filename) ??
      (await this.readDisk(filename).catch((error: NodeJS.ErrnoException) => {
        if (error.code === 'ENOENT') return undefined;
        throw error;
      }));
    const changed = previousSource !== source;
    if (changed) {
      this.contents.set(filename, source);
      this.changes.add(filename);
      this.outputs.clear();
      this.checked.clear();
    } else this.contents.set(filename, source);
    this.deleted.delete(filename);
    const previous = this.snapshot;
    const id = this.programs.get(key);
    const request = {
      ensurePrograms: true as const,
      fileSystem: {
        kind: 'layer' as const,
        files: Object.fromEntries(this.contents),
        removedPaths: [...this.deleted],
      },
      fileNotifications: {
        changed: [...this.changes].filter(
          (path) => !this.deleted.has(path) && !this.created.has(path),
        ),
        created: [...this.created],
        deleted: [...this.changes].filter((path) => this.deleted.has(path)),
      },
      ...(!id
        ? { createPrograms: [input] }
        : addRoot
          ? { reconfigurePrograms: [{ id, ...input }] }
          : {}),
    };
    const update = !previous || !id || addRoot || this.changes.size > 0;
    if (update) {
      this.snapshot = previous
        ? await previous.update(request)
        : await this.api.createSnapshot(request);
      await previous?.dispose();
    }
    this.changes.clear();
    this.created.clear();
    const program = id
      ? this.snapshot!.getProgram(id)!
      : this.snapshot!.operation.createdPrograms![0]!;
    if (!id) this.stats.programsCreated++;
    this.programs.set(key, program.id as SyntheticProjectId);
    if (update)
      this.files.set(
        key,
        new Set(
          [...(await program.getSourceFileNames()), ...(await program.getConfigFileNames())].map(
            canonical,
          ),
        ),
      );
    throwDiagnostics(await program.getSyntacticDiagnostics(filename), filename);
    if (check) {
      this.stats.semanticChecks++;
      throwDiagnostics(await program.getSemanticDiagnostics(filename), filename);
      this.checked.add(outputKey);
    }
    const cached = this.outputs.get(outputKey);
    if (cached) return cached;
    const output = await program.getJavaScriptEmit([filename]);
    throwDiagnostics(output.diagnostics, filename);
    const js = [...output.outputFiles].find(([name]) => /\.(?:[cm]?js|jsx)$/.test(name));
    if (!js) throw new Error('原生编译器没有输出 JavaScript：' + filename);
    const map = [...output.outputFiles].find(([name]) => name === js[0] + '.map');
    const compiled = result(js[1].text, map?.[1].text);
    if (compiled.map) {
      compiled.map = { ...compiled.map, sources: [filename], sourcesContent: [source] };
      delete compiled.map.sourceRoot;
    }
    this.outputs.set(outputKey, compiled);
    return compiled;
  }

  close(): Promise<void> {
    return (this.closing ??= this.finishClose());
  }

  private async finishClose(): Promise<void> {
    this.closed = true;
    await this.queue.catch(() => {});
    await this.snapshot?.dispose();
    this.snapshot = undefined;
    this.contents.clear();
    this.diskContents.clear();
    this.deleted.clear();
    this.created.clear();
    this.outputs.clear();
    this.checked.clear();
    this.programs.clear();
    this.files.clear();
    this.roots.clear();
    this.configs.clear();
  }
}
