import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { API, type Diagnostic as TypeScriptDiagnostic } from 'typescript/unstable/async';
import { createFileSystemLayer, serverFS, type FileSystemCallbacks } from 'typescript/unstable/fs';
import { TraceMap, originalPositionFor } from '@jridgewell/trace-mapping';
import { diagnose } from '../transform/compile.js';
import type { CheckProjection } from './projection.js';
import type { Diagnostic } from '../transform/diagnostics.js';
import { typedProjection } from './typed-projection.js';

interface Source {
  filename: string;
  text: string;
  projection: CheckProjection;
}

function canonical(filename: string): string {
  const path = resolve(filename);
  return process.platform === 'win32' ? path.toLowerCase() : path;
}

function fromTypeScript(item: TypeScriptDiagnostic, source?: Source): Diagnostic {
  const line = (item.startPosition?.line ?? 0) + 1;
  const column = item.startPosition?.character ?? 0;
  const mapped = source?.projection.map
    ? originalPositionFor(new TraceMap(source.projection.map), { line, column })
    : undefined;
  return {
    code: `TS${item.code}`,
    message: item.text,
    filename: source?.filename ?? item.fileName ?? '',
    line: mapped?.line ?? line,
    column: (mapped?.column ?? column) + 1,
  };
}

/** 一次项目检查拥有一个官方 TS 进程；用完释放，不维护跨命令后台或磁盘缓存。 */
export async function checkProject(configFile: string): Promise<Diagnostic[]> {
  const configPath = resolve(configFile);
  const sources = new Map<string, Source>();
  const fs: FileSystemCallbacks = {
    directoryExists: serverFS.useOS,
    fileExists: serverFS.useOS,
    getAccessibleEntries: serverFS.useOS,
    realpath: serverFS.useOS,
    stat: serverFS.useOS,
    writeFile: serverFS.noop,
    removeFile: serverFS.noop,
    readFile(filename) {
      if (
        !/\.[cm]?[jt]sx?$/.test(filename) ||
        /\.d\.[cm]?ts$/.test(filename) ||
        /[/\\]node_modules[/\\]/.test(filename)
      )
        return serverFS.useOS;
      const key = canonical(filename);
      const cached = sources.get(key);
      if (cached) return cached.projection.code;
      let text: string;
      try {
        text = readFileSync(filename, 'utf8');
      } catch {
        return serverFS.useOS;
      }
      const projection: CheckProjection = { code: text, map: null };
      sources.set(key, { filename, text, projection });
      return projection.code;
    },
  };
  const api = new API({ cwd: dirname(configPath), fs });
  try {
    const config = await api.parseConfigFile(configPath);
    if (config.errors.length) return config.errors.map((item) => fromTypeScript(item));
    const originalProgram = await api.createProgram(
      config.fileNames,
      { ...config.options, noEmit: true },
      {
        projectReferences: config.projectReferences,
      },
    );
    const projectedFiles: [string, string][] = [];
    for (const filename of await originalProgram.getSourceFileNames()) {
      const source = sources.get(canonical(filename));
      if (!source || !/\.[jt]sx$/.test(filename) || !source.text.includes('bind:')) continue;
      try {
        source.projection = await typedProjection(originalProgram, filename, source.text);
      } catch (error) {
        if (!(error instanceof SyntaxError)) throw error;
        // 不完整语法仍由官方及框架诊断报告；不能用空文件替代它。
      }
      if (source.projection.map) projectedFiles.push([filename, source.projection.code]);
    }
    const checkedSnapshot = projectedFiles.length
      ? await api.createSnapshot({
          fileSystem: createFileSystemLayer(projectedFiles),
          createPrograms: [
            {
              rootFiles: config.fileNames,
              compilerOptions: { ...config.options, noEmit: true },
              options: { projectReferences: config.projectReferences },
            },
          ],
        })
      : undefined;
    const program = checkedSnapshot?.operation.createdPrograms[0] ?? originalProgram;
    const types = [
      ...(await program.getProgramDiagnostics()),
      ...(await program.getSyntacticDiagnostics()),
      ...(await program.getGlobalDiagnostics()),
      ...(await program.getSemanticDiagnostics()),
    ];
    const diagnostics: Diagnostic[] = types
      .filter((item) => item.category === 1)
      .map((item) =>
        fromTypeScript(item, item.fileName ? sources.get(canonical(item.fileName)) : undefined),
      );
    // 覆盖项目真正加载的源码，包括当前页面没有运行到的组件和依赖模块。
    for (const filename of await program.getSourceFileNames()) {
      const source = sources.get(canonical(filename));
      if (source && (/\.[jt]sx$/.test(filename) || source.text.includes('zerodep-js')))
        diagnostics.push(...diagnose(source.text, source.filename));
    }
    return diagnostics.sort(
      (a, b) =>
        a.filename.localeCompare(b.filename) ||
        a.line - b.line ||
        a.column - b.column ||
        a.code.localeCompare(b.code),
    );
  } finally {
    await api.close();
  }
}
