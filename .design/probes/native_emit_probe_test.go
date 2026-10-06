package compiler

// 研究探针：仅验证 emit 接入、原始声明保留和绑定身份，不是可交付的框架编译器。
import (
	"context"
	"encoding/json"
	"strings"
	"sync"
	"sync/atomic"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/binder"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/transformers"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
)

type nativeProbeHost struct {
	CompilerHost
	parses atomic.Int32
}

func (h *nativeProbeHost) GetSourceFile(options ast.SourceFileParseOptions) *ast.SourceFile {
	if string(options.FileName) == "/src/probe.ts" {
		h.parses.Add(1)
	}
	return h.CompilerHost.GetSourceFile(options)
}

type nativeProbeTransform struct {
	transformers.Transformer
	resolver binder.ReferenceResolver
	bindings map[*ast.Node]bool
}

func (tx *nativeProbeTransform) collect(node *ast.Node) bool {
	if ast.IsVariableDeclaration(node) && node.Initializer() != nil && ast.IsCallExpression(node.Initializer()) {
		callee := node.Initializer().AsCallExpression().Expression
		if ast.IsIdentifier(callee) && callee.Text() == "_state" {
			tx.bindings[node] = true
		}
	}
	node.ForEachChild(tx.collect)
	return false
}

func (tx *nativeProbeTransform) visit(node *ast.Node) *ast.Node {
	if ast.IsSourceFile(node) {
		tx.collect(node)
	}
	if tx.bindings[node] {
		decl := node.AsVariableDeclaration()
		call := decl.Initializer.AsCallExpression()
		initial := tx.Factory().NewCallExpression(tx.Factory().NewIdentifier("__probeSource"), nil, nil, call.Arguments, ast.NodeFlagsNone)
		tx.EmitContext().SetOriginal(initial, call.AsNode())
		tx.EmitContext().SetSourceMapRange(initial, call.Loc)
		return tx.Factory().UpdateVariableDeclaration(decl, decl.Name(), decl.ExclamationToken, decl.Type, initial)
	}
	if ast.IsIdentifier(node) {
		decl := tx.resolver.GetReferencedValueDeclaration(node)
		if decl != nil && tx.bindings[decl] && node != decl.Name() {
			read := tx.Factory().NewCallExpression(
				tx.Factory().NewPropertyAccessExpression(node, nil, tx.Factory().NewIdentifier("read"), ast.NodeFlagsNone),
				nil, nil, nil, ast.NodeFlagsNone,
			)
			tx.EmitContext().SetOriginal(read, node)
			tx.EmitContext().SetSourceMapRange(read, node.Loc)
			return read
		}
	}
	return tx.Visitor().VisitEachChild(node)
}

func TestNativeEmitResearch(t *testing.T) {
	if !bundled.Embedded {
		t.Fatal("探针需要标准库，不允许跳过类型检查")
	}
	var transformed atomic.Int32
	researchTransform = func(options *transformers.TransformOptions) *transformers.Transformer {
		transformed.Add(1)
		tx := &nativeProbeTransform{resolver: options.Resolver, bindings: make(map[*ast.Node]bool)}
		return tx.NewTransformer(tx.visit, options.Context)
	}
	defer func() { researchTransform = nil }()

	for _, invalid := range []bool{false, true} {
		name := "valid"
		if invalid {
			name = "type_error_blocks_emit"
		}
		t.Run(name, func(t *testing.T) {
			transformed.Store(0)
			source := `declare function _state<T>(value: T): T;
let count = _state(1);
export function current() { return count; }
export function shadow(count: number) { return count + 1; }
`
			if invalid {
				source += "const invalid: string = count;\n"
			}
			fs := bundled.WrapFS(vfstest.FromMap(map[string]string{"/src/probe.ts": source}, tspath.CaseSensitive))
			host := &nativeProbeHost{CompilerHost: NewCompilerHost(fs, bundled.LibPath(), nil, nil, nil)}
			options := &core.CompilerOptions{
				Target: core.ScriptTargetES2023, Module: core.ModuleKindPreserve,
				ModuleResolution: core.ModuleResolutionKindBundler,
				Strict:           core.TSTrue, VerbatimModuleSyntax: core.TSTrue, IsolatedModules: core.TSTrue,
				Declaration: core.TSTrue, DeclarationMap: core.TSTrue, SourceMap: core.TSTrue,
				InlineSources: core.TSTrue, NoEmitOnError: core.TSTrue, OutDir: "/out",
			}
			program := NewProgram(ProgramOptions{
				Config: tsoptions.NewParsedCommandLine(options, []tspath.RootedFilePath{"/src/probe.ts"}, nil, "/src", fs.CaseSensitivity()),
				Host:   host,
			})
			original := program.GetSourceFile("/src/probe.ts")
			var mu sync.Mutex
			outputs := map[string]string{}
			result := program.Emit(context.Background(), EmitOptions{
				WriteFile: func(path tspath.RootedFilePath, text string, _ *WriteFileData) error {
					mu.Lock()
					defer mu.Unlock()
					outputs[string(path)] = text
					return nil
				},
			})
			if host.parses.Load() != 1 || program.GetSourceFile("/src/probe.ts") != original {
				t.Fatalf("原始源文件必须只解析一次，实际 %d", host.parses.Load())
			}
			if invalid {
				if !result.EmitSkipped || len(outputs) != 0 || transformed.Load() != 0 || len(result.Diagnostics) == 0 {
					t.Fatalf("错误源码未正确阻止输出: %+v", result)
				}
				t.Logf("parse=1, transform=0, outputs=0, diagnostics=%d", len(result.Diagnostics))
				return
			}
			if result.EmitSkipped || len(result.Diagnostics) != 0 || transformed.Load() != 1 {
				t.Fatalf("输出失败: %+v, transforms=%d", result, transformed.Load())
			}
			js := outputs["/out/probe.js"]
			for _, expected := range []string{"__probeSource(1)", "return count.read();", "return count + 1;"} {
				if !strings.Contains(js, expected) {
					t.Fatalf("未命中 %q: %s", expected, js)
				}
			}
			dts := outputs["/out/probe.d.ts"]
			if !strings.Contains(dts, "current(): number") || strings.Contains(dts, "read") || strings.Contains(dts, "__probe") {
				t.Fatalf("声明被运行时转换污染: %s", dts)
			}
			for _, path := range []string{"/out/probe.js.map", "/out/probe.d.ts.map"} {
				var sourceMap struct {
					Sources  []string `json:"sources"`
					Mappings string   `json:"mappings"`
				}
				if err := json.Unmarshal([]byte(outputs[path]), &sourceMap); err != nil || len(sourceMap.Sources) != 1 || !strings.HasSuffix(sourceMap.Sources[0], "probe.ts") || sourceMap.Mappings == "" {
					t.Fatalf("源码映射缺失: %s: %s", path, outputs[path])
				}
			}
			if diagnostics := program.GetSemanticDiagnostics(context.Background(), original); len(diagnostics) != 0 {
				t.Fatalf("emit 后原始源码语义发生变化: %v", diagnostics)
			}
			t.Logf("parse=1, transform=1, outputs=%d\nJS:\n%s\nDTS:\n%s", len(outputs), js, dts)
		})
	}
}
