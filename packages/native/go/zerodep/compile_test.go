package zerodep_test

import (
	"context"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/transpile"
)

func TestMacroEmit(t *testing.T) {
	result := transpile.TranspileModule(context.Background(), `import {_state as state,_derived} from 'zerodep-js';
let n=state(1);const twice=_derived(n*2);n+=2;
function shadow(n:number){return n+1}
export function read(){return [n,twice,shadow(3)]}`, transpile.Options{FileName: "/src/example.ts", ReportDiagnostics: true, CompilerOptions: &core.CompilerOptions{Module: core.ModuleKindESNext, Target: core.ScriptTargetES2023, VerbatimModuleSyntax: core.TSTrue}})
	if len(result.Diagnostics) > 0 {
		t.Fatalf("%v", result.Diagnostics)
	}
	for _, part := range []string{".state(1)", ".derived(", ".set(n,", "n.read()", "twice.read()", "return n + 1"} {
		if !strings.Contains(result.OutputText, part) {
			t.Fatalf("missing %q:\n%s", part, result.OutputText)
		}
	}
	if strings.Contains(result.OutputText, "from 'zerodep-js'") {
		t.Fatal(result.OutputText)
	}
	t.Log(result.OutputText)
}

func TestFrameworkDiagnosticsBlockTranspile(t *testing.T) {
	for _, input := range []string{
		`import {_state} from 'zerodep-js';const n=_state(1);n++;`,
		`import {_state} from 'zerodep-js';const alias=_state;`,
		`import {_component} from 'zerodep-js';const App=_component(({user})=>user?<button onClick={()=>user.name}/>:null);`,
	} {
		result := transpile.TranspileModule(context.Background(), input, transpile.Options{FileName: "/src/example.tsx", ReportDiagnostics: true, CompilerOptions: &core.CompilerOptions{Jsx: core.JsxEmitPreserve, JsxImportSource: "zerodep-js", Module: core.ModuleKindESNext}})
		if result == nil || len(result.Diagnostics) == 0 || result.OutputText != "" {
			t.Fatalf("invalid source emitted: %+v", result)
		}
	}
}

func TestComponentBindAndDevelopment(t *testing.T) {
	result := transpile.TranspileModule(context.Background(), `import {_component,_state} from 'zerodep-js';
export const App=_component(({title='hi',...rest})=>{let text=_state('');return <input {...rest} title={title} bind:value={text}/>});`, transpile.Options{FileName: "/src/App.tsx", ReportDiagnostics: true, CompilerOptions: &core.CompilerOptions{Jsx: core.JsxEmitPreserve, JsxImportSource: "zerodep-js", Module: core.ModuleKindESNext, Target: core.ScriptTargetES2023, ZerodepDevelopment: core.TSTrue, SourceMap: core.TSTrue}})
	if len(result.Diagnostics) > 0 {
		t.Fatalf("%v", result.Diagnostics)
	}
	for _, part := range []string{".prop(", ".restProps(", ".bindProps(", ".set(text,", "import.meta.hot.accept(", "zerodep-js/devtools", "@zerodep-development"} {
		if !strings.Contains(result.OutputText, part) {
			t.Fatalf("missing %q:\n%s", part, result.OutputText)
		}
	}
	if result.SourceMapText == "" {
		t.Fatal("missing map")
	}
	t.Log(result.OutputText)
}
