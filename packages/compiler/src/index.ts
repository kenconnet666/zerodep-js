export { compile, diagnose } from './transform/compile.js';
export type { CompileOptions, CompileResult, SourceMap } from './transform/compile.js';
export { CompileError } from './transform/diagnostics.js';
export type { Diagnostic } from './transform/diagnostics.js';
export { zerodep } from './tooling/vite.js';
export type { ZerodepOptions } from './tooling/vite.js';
