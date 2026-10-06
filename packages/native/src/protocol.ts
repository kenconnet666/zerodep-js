import type { CompileOptions, CompileResult, Diagnostic } from './types.js';

export interface CompilerSessionOptions {
  root?: string;
  project?: string;
  check?: boolean;
}
export interface SourceDocument {
  uri: string;
  languageId: string;
  text: string;
}
export interface Position {
  line: number;
  character: number;
}
export interface TextEdit {
  range: { start: Position; end: Position };
  newText: string;
}
export interface FileInfo {
  imports: Array<{
    module: string;
    resolved?: string;
    typeOnly: boolean;
    startByte: number;
    endByte: number;
  }>;
  exports: Array<{ name: string; type: string }>;
}
export interface CheckResult {
  diagnostics: Diagnostic[];
  projects: number;
  cached: boolean;
  complete: boolean;
  changedFiles?: string[];
}
export interface WorkspaceStats {
  serverPid: number;
  compilerPid: number;
  clients: number;
  compileSessions: number;
  sharedProjects: number;
  programsCreated: number;
  semanticChecks: number;
  outputCacheHits: number;
  projectChecks: number;
  projectCheckCacheHits: number;
  idleTimeoutMs: number;
  cacheTimeoutMs: number;
  maxIdleProjects: number;
  idleProjects: number;
}
export type WorkspaceRequest =
  | { action: 'info' | 'stats' }
  | { action: 'stop'; force?: boolean }
  | {
      action: 'compile';
      id: string;
      settings: CompilerSessionOptions;
      source: string;
      filename: string;
      options: CompileOptions;
    }
  | { action: 'invalidate'; id: string; filename: string; event: 'create' | 'update' | 'delete' }
  | { action: 'closeCompile'; id: string }
  | { action: 'lsp'; method: string; params: unknown; document?: SourceDocument }
  | { action: 'check'; projects: string[]; lint?: boolean }
  | { action: 'build'; project: string }
  | { action: 'declarations'; project: string };
export interface WorkspaceResponse {
  result?: unknown;
  error?: { message: string; diagnostics?: Diagnostic[] };
}
export type CompileResponse = CompileResult;
