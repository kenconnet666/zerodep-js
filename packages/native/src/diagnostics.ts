import type { Diagnostic as NativeDiagnostic } from 'typescript/unstable/async';

import { CompileError, type Diagnostic } from './types.js';

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

export function throwDiagnostics(
  items: readonly NativeDiagnostic[],
  filename: string,
  syntax = false,
): void {
  const errors = items
    .filter((item) => item.category === 1)
    .map((item): Diagnostic => ({
      code: item.text.match(/^ZJ\d+/)?.[0] ?? (syntax ? 'ZJ1000' : `TS${item.code}`),
      message: item.text.replace(/^ZJ\d+:\s*/, ''),
      filename,
      line: (item.startPosition?.line ?? 0) + 1,
      column: (item.startPosition?.character ?? 0) + 1,
      endLine: (item.endPosition?.line ?? 0) + 1,
      endColumn: (item.endPosition?.character ?? 0) + 1,
    }))
    .sort((a, b) => a.line - b.line || a.column - b.column || a.code.localeCompare(b.code));
  if (errors.length) throw new CompileError(errors);
}
