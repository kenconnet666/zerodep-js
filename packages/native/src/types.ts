export interface CompileOptions {
  runtimeModule?: string;
  development?: boolean;
  hmr?: boolean;
}
export interface SourceMap {
  version: 3;
  names: readonly string[];
  sources: readonly (string | null)[];
  sourcesContent?: readonly (string | null)[];
  mappings: string;
  file?: string | null;
  sourceRoot?: string;
}
export interface CompileResult {
  code: string;
  map: SourceMap | null;
  hasDevelopment: boolean;
}

export interface Diagnostic {
  code: string;
  message: string;
  filename: string;
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
}

export class CompileError extends Error {
  readonly diagnostics: Diagnostic[];
  constructor(diagnostics: Diagnostic[]) {
    super(
      diagnostics
        .map((d) => `${d.filename}:${d.line}:${d.column} ${d.code} ${d.message}`)
        .join('\n'),
    );
    this.name = 'CompileError';
    this.diagnostics = diagnostics;
  }
}
export interface CompilerSessionOptions {
  root?: string;
  project?: string;
  /** 默认在相同 Program 中检查请求文件，再输出 JS。 */
  check?: boolean;
}
