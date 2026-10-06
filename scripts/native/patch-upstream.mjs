import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// 固定上游升级时重新生成可审阅补丁；正常构建仅应用已检入的 patch。
const checkout = resolve(process.argv[2]);
async function edit(file, changes) {
  const path = resolve(checkout, 'tsc/internal', file);
  let text = (await readFile(path, 'utf8')).replaceAll('\r\n', '\n');
  for (const [before, after] of changes) {
    assert(text.includes(before), `上游接线位置变化：${file}: ${before}`);
    text = text.replace(before, after);
  }
  await writeFile(path, text);
}
const fields = [
  ['ZerodepLint', 'zerodepLint', 'Tristate', 'ParseTristate', 'CommandLineOptionTypeBoolean'],
  [
    'ZerodepDevelopment',
    'zerodepDevelopment',
    'Tristate',
    'ParseTristate',
    'CommandLineOptionTypeBoolean',
  ],
  ['ZerodepHmr', 'zerodepHmr', 'Tristate', 'ParseTristate', 'CommandLineOptionTypeBoolean'],
  [
    'ZerodepRuntimeModule',
    'zerodepRuntimeModule',
    'string',
    'ParseString',
    'CommandLineOptionTypeString',
  ],
];
await edit('core/options_generated.go', [
  [
    'type CompilerOptions struct {',
    'type CompilerOptions struct {\n' +
      fields.map(([name, key, type]) => `\t${name} ${type} \`json:"${key},omitzero"\``).join('\n'),
  ],
  [
    'return &CompilerOptions{',
    'return &CompilerOptions{\n' +
      fields.map(([name]) => `\t\t${name}: options.${name},`).join('\n'),
  ],
  [
    'if options.AllowJs != other.AllowJs {',
    'if ' +
      fields.map(([name]) => `options.${name} != other.${name}`).join(' || ') +
      ' { return false }\n\tif options.AllowJs != other.AllowJs {',
  ],
]);
await edit('tsoptions/declarations_generated.go', [
  [
    'var optionsForCompiler = []*CommandLineOption{',
    'var optionsForCompiler = []*CommandLineOption{\n' +
      fields.map(([, key, , , kind]) => `\t{Name: "${key}", Kind: ${kind}},`).join('\n'),
  ],
]);
await edit('tsoptions/options_generated.go', [
  [
    'func CompilerOptionsAffectSemanticDiagnostics(oldOptions *core.CompilerOptions, newOptions *core.CompilerOptions) bool {',
    'func CompilerOptionsAffectSemanticDiagnostics(oldOptions *core.CompilerOptions, newOptions *core.CompilerOptions) bool {\n\tif oldOptions != nil && newOptions != nil && oldOptions.ZerodepLint != newOptions.ZerodepLint { return true }',
  ],
  [
    'switch key {',
    'switch key {\n' +
      fields
        .map(([name, key, , parse]) => `\tcase "${key}": allOptions.${name} = ${parse}(value)`)
        .join('\n'),
  ],
  [
    'func CompilerOptionsAffectEmit(oldOptions *core.CompilerOptions, newOptions *core.CompilerOptions) bool {',
    'func CompilerOptionsAffectEmit(oldOptions *core.CompilerOptions, newOptions *core.CompilerOptions) bool {\n\tif oldOptions != nil && newOptions != nil && (' +
      fields.map(([name]) => `oldOptions.${name} != newOptions.${name}`).join(' || ') +
      ') { return true }',
  ],
  [
    'func ForEachCompilerOptionAffectingBuildInfo(options *core.CompilerOptions, fn func(option *CommandLineOption, value any)) {',
    'func ForEachCompilerOptionAffectingBuildInfo(options *core.CompilerOptions, fn func(option *CommandLineOption, value any)) {\n' +
      fields
        .map(
          ([name, key, type]) =>
            `\tif options.${name} != ${type === 'string' ? '""' : 'core.TSUnknown'} { fn(CommandLineCompilerOptionsMap.Get("${key}"), options.${name}) }`,
        )
        .join('\n'),
  ],
  [
    'func mergeCompilerOptionFields(targetOptions, sourceOptions *core.CompilerOptions, explicitNullFields collections.Set[string]) {',
    'func mergeCompilerOptionFields(targetOptions, sourceOptions *core.CompilerOptions, explicitNullFields collections.Set[string]) {\n' +
      fields
        .map(
          ([name, key, type]) =>
            `\tif sourceOptions.${name} != ${type === 'string' ? '""' : 'core.TSUnknown'} || explicitNullFields.Has("${key}") { targetOptions.${name} = sourceOptions.${name} }`,
        )
        .join('\n'),
  ],
  [
    'result := collections.NewOrderedMapWithSizeHint[string, any](32)',
    'result := collections.NewOrderedMapWithSizeHint[string, any](32)\n' +
      fields
        .map(
          ([name, key, type]) =>
            `\tif options.${name} != ${type === 'string' ? '""' : 'core.TSUnknown'} { result.Set("${key}", options.${name}${type === 'string' ? '' : ' == core.TSTrue'}) }`,
        )
        .join('\n'),
  ],
]);
await edit('compiler/emitter.go', [
  [
    '"github.com/microsoft/TypeScript/tsc/internal/tsoptions"',
    '"github.com/microsoft/TypeScript/tsc/internal/tsoptions"\n\t"github.com/microsoft/TypeScript/tsc/internal/zerodep"',
  ],
  [
    '// transform TypeScript syntax',
    '// 框架转换共享原始解析树和官方 EmitContext，声明输出仍使用原始树。\n\ttx = append(tx, zerodep.NewTransformer(&opts, sourceFile))\n\n\t// transform TypeScript syntax',
  ],
  [
    'emitContext, putEmitContext := printer.GetEmitContext()',
    'if frameworkDiagnostics := zerodep.Diagnostics(sourceFile, options); len(frameworkDiagnostics) > 0 {\n\t\tfor _, diagnostic := range frameworkDiagnostics { e.emitterDiagnostics.Add(diagnostic) }\n\t\te.emitResult.EmitSkipped = true\n\t\treturn\n\t}\n\n\temitContext, putEmitContext := printer.GetEmitContext()',
  ],
]);
await edit('transpile/transpile.go', [
  [
    'debug.Assert(hasOutputText, "Output generation failed")',
    'if !hasOutputText && result.EmitSkipped { return &Output{Diagnostics: allDiagnostics} }\n\tdebug.Assert(hasOutputText, "Output generation failed")',
  ],
]);
await edit('compiler/program.go', [
  [
    '\t\treturn diags\n\t})\n}\n\n// getAdditionalJSSyntacticDiagnostics',
    '\t\t// 未启用类型检查的 JS 仍遵守框架绑定约束。\n\t\tif p.SkipTypeChecking(file, false) { diags = append(diags, zerodep.Diagnostics(file, p.Options())...) }\n\t\treturn diags\n\t})\n}\n\n// getAdditionalJSSyntacticDiagnostics',
  ],
  [
    'type Program struct {',
    'type Program struct {\n\tzerodepLintDiagnostics sync.Map // 每个不可变 Program 缓存纯诊断，不持有 checker。',
  ],
  [
    '"github.com/microsoft/TypeScript/tsc/internal/tsoptions"',
    '"github.com/microsoft/TypeScript/tsc/internal/tsoptions"\n\t"github.com/microsoft/TypeScript/tsc/internal/zerodep"',
  ],
  [
    'filtered = applyContentMapperDiagnosticDirectives(sourceFile, filtered)\n\treturn filtered',
    'filtered = applyContentMapperDiagnosticDirectives(sourceFile, filtered)\n\t// 框架约束不由 @ts-ignore 绕过，noEmit、增量检查和 LSP 共用这里。\n\tfiltered = append(filtered, zerodep.Diagnostics(sourceFile, compilerOptions)...)\n\tif compilerOptions.ZerodepLint.IsTrue() && ctx.Err() == nil && !fileChecker.WasCanceled() {\n\t\tcached, ok := p.zerodepLintDiagnostics.Load(sourceFile)\n\t\tif !ok {\n\t\t\titems := zerodep.Lint(ctx, sourceFile, fileChecker, compilerOptions)\n\t\t\tif ctx.Err() != nil || fileChecker.WasCanceled() { return filtered }\n\t\t\tcached, _ = p.zerodepLintDiagnostics.LoadOrStore(sourceFile, items)\n\t\t}\n\t\tfiltered = append(filtered, cached.([]*ast.Diagnostic)...)\n\t}\n\treturn filtered',
  ],
]);
await edit('ls/codeactions.go', [
  [
    'var codeFixProviders = []*CodeFixProvider{',
    'var codeFixProviders = []*CodeFixProvider{\n\tZerodepFixProvider,',
  ],
]);
await edit('lsp/server.go', [
  [
    'handlers.registerLanguageServiceDocumentRequestHandler(lsproto.TextDocumentDiagnosticInfo,',
    'handlers.registerLanguageServiceDocumentRequestHandler(zerodepInspectInfo, (*Server).handleZerodepInspect)\n\thandlers.registerLanguageServiceDocumentRequestHandler(lsproto.TextDocumentDiagnosticInfo,',
  ],
]);
