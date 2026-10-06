import { JsxEmit, ModuleKind, type RawCompilerOptions } from 'typescript/unstable/async';
import { ScriptTarget } from 'typescript/unstable/ast';

import type { CompileOptions, CompileResult, SourceMap } from './types.js';

export function nativeOptions(options: CompileOptions): RawCompilerOptions {
  return {
    target: ScriptTarget.ES2023,
    module: ModuleKind.Preserve,
    jsx: JsxEmit.ReactJSX,
    jsxImportSource: 'zerodep-js',
    verbatimModuleSyntax: true,
    sourceMap: true,
    inlineSources: true,
    zerodepDevelopment: options.development ?? false,
    zerodepHmr: options.hmr ?? true,
    zerodepRuntimeModule: options.runtimeModule ?? 'zerodep-js/internal',
  } as RawCompilerOptions;
}

export function result(code: string, sourceMap: string | undefined): CompileResult {
  return {
    code: code.replace(/\n?\/\/# sourceMappingURL=[^\r\n]*\s*$/, ''),
    map: sourceMap ? (JSON.parse(sourceMap) as SourceMap) : null,
    hasDevelopment: code.includes('/* @zerodep-development */'),
  };
}
