import { API as SyncAPI } from 'typescript/unstable/sync';
import { compilerPath } from './binary.js';
import { throwDiagnostics } from './diagnostics.js';
import { CompileError, type Diagnostic } from './types.js';

export { compilerPath, CompileError };
export type { Diagnostic };
export type { CompileOptions, CompileResult, SourceMap } from './types.js';
import { nativeOptions, result } from './output.js';
import type { CompileOptions, CompileResult } from './types.js';
export { CompilerSession, createCompiler, type CompilerSessionOptions } from './session.js';
export { NativeTools, applyTextEdits, writeEdits, fileEdits } from './tools.js';
export type { ApiReport, BoundaryOptions, CodeAction, EditResult } from './tools.js';
export type { CheckResult, FileInfo, Position, TextEdit } from './protocol.js';

let standalone: SyncAPI | undefined;

/** 单文件转换与框架诊断；需要项目类型检查时使用 createCompiler。 */
export function compile(
  source: string,
  filename: string,
  options: CompileOptions = {},
): CompileResult {
  standalone ??= new SyncAPI({ tsserverPath: compilerPath() });
  const output = standalone.transpileModule(source, {
    fileName: filename,
    reportDiagnostics: true,
    compilerOptions: nativeOptions(options),
  });
  throwDiagnostics(output.diagnostics ?? [], filename, true);
  return result(output.outputText, output.sourceMapText);
}

export function diagnose(source: string, filename: string): Diagnostic[] {
  try {
    compile(source, filename);
    return [];
  } catch (error) {
    if (error instanceof CompileError) return error.diagnostics;
    throw error;
  }
}

export function closeCompiler(): void {
  standalone?.close();
  standalone = undefined;
}
