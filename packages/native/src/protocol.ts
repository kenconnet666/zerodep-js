import type { Diagnostic } from './types.js';

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
  complete: boolean;
  revision: string;
  changedFiles?: string[];
}
export type WorkspaceRequest =
  | { action: 'info' }
  | { action: 'lsp'; method: string; params: unknown; document?: SourceDocument }
  | { action: 'check'; projects: string[]; lint?: boolean }
  | { action: 'build'; project: string }
  | { action: 'declarations'; project: string };
