type Position = { line: number; column: number };

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
        .map((item) => `${item.filename}:${item.line}:${item.column} ${item.code} ${item.message}`)
        .join('\n'),
    );
    this.name = 'CompileError';
    this.diagnostics = diagnostics;
  }
}

export function diagnostic(
  node: { loc?: { start: Position; end: Position } | null | undefined },
  filename: string,
  code: string,
  message: string,
): Diagnostic {
  return {
    code,
    message,
    filename,
    line: node.loc?.start.line ?? 1,
    column: (node.loc?.start.column ?? 0) + 1,
    endLine: node.loc?.end.line ?? node.loc?.start.line ?? 1,
    endColumn: (node.loc?.end.column ?? node.loc?.start.column ?? 0) + 1,
  };
}
