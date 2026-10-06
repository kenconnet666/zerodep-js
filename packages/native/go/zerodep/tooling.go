package zerodep

import (
	"context"
	"fmt"
	"slices"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
)

// 这里只接收调用方已经持有的 checker，不创建 Program，也不把 Type 缓存在源文件上。
func Lint(ctx context.Context, file *ast.SourceFile, c *checker.Checker, options *core.CompilerOptions) []*ast.Diagnostic {
	if !options.ZerodepLint.IsTrue() || file.IsDeclarationFile || len(file.Diagnostics()) != 0 || ctx.Err() != nil || c.WasCanceled() {
		return nil
	}
	var result []*ast.Diagnostic
	report := func(node *ast.Node, code int, message string) {
		result = append(result, ast.NewDiagnosticFromText(file, core.NewTextRange(scanner.SkipTrivia(file.Text(), node.Pos()), node.End()), int32(900000+code), diagnostics.CategoryError, fmt.Sprintf("ZJ%d: %s", code, message), nil, nil, false, false))
	}
	var promise func(*checker.Type) bool
	promise = func(t *checker.Type) bool {
		if t == nil || t.Flags()&(checker.TypeFlagsAny|checker.TypeFlagsUnknown|checker.TypeFlagsNever) != 0 {
			return false
		}
		if t.Flags()&checker.TypeFlagsUnion != 0 {
			return slices.ContainsFunc(t.Types(), promise)
		}
		return c.GetPromisedTypeOfPromise(t) != nil
	}
	callable := func(node *ast.Node) bool {
		return node != nil && len(c.GetSignaturesOfType(c.GetTypeAtLocation(node), checker.SignatureKindCall)) > 0
	}
	unwrap := func(node *ast.Node) *ast.Node {
		for node.Kind == ast.KindParenthesizedExpression {
			node = node.AsParenthesizedExpression().Expression
		}
		return node
	}
	walk(file.AsNode(), func(node *ast.Node) bool {
		if ctx.Err() != nil {
			return false
		}
		if ast.IsExpressionStatement(node) {
			expression := unwrap(node.AsExpressionStatement().Expression)
			handled := expression.Kind == ast.KindVoidExpression || expression.Kind == ast.KindAwaitExpression || ast.IsAssignmentExpression(expression, false)
			if ast.IsCallExpression(expression) {
				call := expression.AsCallExpression()
				if ast.IsPropertyAccessExpression(call.Expression) {
					name := call.Expression.AsPropertyAccessExpression().Name().Text()
					handled = (name == "catch" && len(call.Arguments.Nodes) > 0 && callable(call.Arguments.Nodes[0])) || (name == "then" && len(call.Arguments.Nodes) > 1 && callable(call.Arguments.Nodes[1]))
				}
			}
			if !handled && promise(c.GetTypeAtLocation(expression)) {
				report(expression, 2001, "Promise 结果未处理；请 await、返回、处理拒绝，或用 void 明确忽略结果。")
			}
		}
		if ast.IsCallExpression(node) {
			call := node.AsCallExpression()
			for index, argument := range call.Arguments.Nodes {
				expected := c.GetContextualTypeForArgumentAtIndex(node, index)
				if expected == nil || expected.Flags()&(checker.TypeFlagsAny|checker.TypeFlagsUnknown) != 0 {
					continue
				}
				signatures := c.GetSignaturesOfType(expected, checker.SignatureKindCall)
				if len(signatures) == 0 || !allVoid(c, signatures) {
					continue
				}
				for _, signature := range c.GetSignaturesOfType(c.GetTypeAtLocation(argument), checker.SignatureKindCall) {
					if promise(c.GetReturnTypeOfSignature(signature)) {
						report(argument, 2002, "此回调只接收同步 void 返回值，不能处理返回的 Promise；请在同步回调内明确处理异步结果。")
						break
					}
				}
			}
		}
		if ast.IsSwitchStatement(node) {
			statement := node.AsSwitchStatement()
			t := c.GetTypeAtLocation(statement.Expression)
			members := []*checker.Type{t}
			if t.Flags()&checker.TypeFlagsUnion != 0 {
				members = t.Types()
			}
			if !slices.ContainsFunc(members, func(t *checker.Type) bool { return t.Flags()&checker.TypeFlagsUnit != 0 }) || slices.ContainsFunc(members, func(t *checker.Type) bool { return t.Flags()&checker.TypeFlagsUnit == 0 }) {
				return true
			}
			var cases []*checker.Type
			for _, clause := range statement.CaseBlock.AsCaseBlock().Clauses.Nodes {
				if clause.Kind == ast.KindDefaultClause {
					return true
				}
				candidate := c.GetTypeAtLocation(clause.AsCaseOrDefaultClause().Expression)
				if candidate.Flags()&checker.TypeFlagsUnit != 0 && candidate.Flags()&checker.TypeFlagsUnion == 0 {
					cases = append(cases, candidate)
				}
			}
			var missing []string
			for _, member := range members {
				if !slices.ContainsFunc(cases, func(candidate *checker.Type) bool { return c.IsTypeAssignableTo(member, candidate) }) {
					missing = append(missing, c.TypeToString(member))
				}
			}
			if len(missing) != 0 {
				slices.Sort(missing)
				report(statement.Expression, 2003, "switch 未覆盖联合类型分支："+strings.Join(missing, ", ")+"；补全分支或显式处理 default。")
			}
		}
		return true
	})
	return result
}

func allVoid(c *checker.Checker, signatures []*checker.Signature) bool {
	for _, signature := range signatures {
		if c.GetReturnTypeOfSignature(signature).Flags()&checker.TypeFlagsVoid == 0 {
			return false
		}
	}
	return true
}

type ImportInfo struct {
	Module   string `json:"module"`
	Resolved string `json:"resolved,omitempty"`
	TypeOnly bool   `json:"typeOnly"`
	Start    int    `json:"startByte"`
	End      int    `json:"endByte"`
}
type ExportInfo struct {
	Name string `json:"name"`
	Type string `json:"type"`
}
type FileInfo struct {
	Imports []ImportInfo `json:"imports"`
	Exports []ExportInfo `json:"exports"`
}

// 元数据在 Go 内从已绑定的树与 checker 获取，前端只接收紧凑结果。
func Inspect(file *ast.SourceFile, c *checker.Checker) FileInfo {
	result := FileInfo{Imports: []ImportInfo{}, Exports: []ExportInfo{}}
	walk(file.AsNode(), func(node *ast.Node) bool {
		var specifier *ast.Node
		typeOnly := false
		if ast.IsImportDeclaration(node) {
			declaration := node.AsImportDeclaration()
			specifier = declaration.ModuleSpecifier
			if declaration.ImportClause != nil {
				clause := declaration.ImportClause.AsImportClause()
				typeOnly = ast.IsTypeOnlyImportDeclaration(declaration.ImportClause)
				if !typeOnly && clause.Name() == nil && clause.NamedBindings != nil && ast.IsNamedImports(clause.NamedBindings) {
					elements := clause.NamedBindings.AsNamedImports().Elements.Nodes
					typeOnly = len(elements) > 0 && !slices.ContainsFunc(elements, func(n *ast.Node) bool { return !ast.IsTypeOnlyImportDeclaration(n) })
				}
			}
		} else if ast.IsExportDeclaration(node) {
			declaration := node.AsExportDeclaration()
			specifier = declaration.ModuleSpecifier
			typeOnly = declaration.IsTypeOnly
			if !typeOnly && declaration.ExportClause != nil && ast.IsNamedExports(declaration.ExportClause) {
				elements := declaration.ExportClause.AsNamedExports().Elements.Nodes
				typeOnly = len(elements) > 0 && !slices.ContainsFunc(elements, func(n *ast.Node) bool { return !ast.IsTypeOnlyImportOrExportDeclaration(n) })
			}
		} else if ast.IsCallExpression(node) && node.AsCallExpression().Expression.Kind == ast.KindImportKeyword && len(node.AsCallExpression().Arguments.Nodes) >= 1 {
			specifier = node.AsCallExpression().Arguments.Nodes[0]
		}
		if specifier != nil && ast.IsStringLiteralLike(specifier) {
			item := ImportInfo{Module: specifier.Text(), TypeOnly: typeOnly, Start: scanner.SkipTrivia(file.Text(), specifier.Pos()), End: specifier.End()}
			if symbol := c.GetSymbolAtLocation(specifier); symbol != nil {
				if target := ast.GetSourceFileOfSymbol(symbol); target != nil {
					item.Resolved = target.FileName().AsString()
				}
			}
			result.Imports = append(result.Imports, item)
		}
		return true
	})
	if symbol := c.GetSymbolAtLocation(file.AsNode()); symbol != nil {
		for _, exported := range c.GetExportsOfModule(symbol) {
			target := exported
			if target.Flags&ast.SymbolFlagsAlias != 0 {
				target = c.GetAliasedSymbol(target)
			}
			if target.Flags&(ast.SymbolFlagsNamespaceModule|ast.SymbolFlagsValueModule) != 0 {
				result.Exports = append(result.Exports, ExportInfo{Name: exported.Name, Type: "namespace " + exported.Name})
				continue
			}
			t := c.GetTypeOfSymbol(target)
			if target.Flags&ast.SymbolFlagsType != 0 && target.Flags&ast.SymbolFlagsValue == 0 {
				t = c.GetDeclaredTypeOfSymbol(target)
			}
			result.Exports = append(result.Exports, ExportInfo{Name: exported.Name, Type: c.TypeToStringEx(t, file.AsNode(), checker.TypeFormatFlagsNoTruncation|checker.TypeFormatFlagsInTypeAlias, nil)})
		}
	}
	slices.SortFunc(result.Exports, func(a, b ExportInfo) int { return strings.Compare(a.Name, b.Name) })
	return result
}

type Fix struct {
	Title      string
	Start, End int
	Text       string
}

func Fixes(file *ast.SourceFile, code int32, start, end int) []Fix {
	if code != 901005 {
		return nil
	}
	a := Analyze(file)
	for _, binding := range a.bindings {
		if binding.kind != stateBinding || binding.decl == nil {
			continue
		}
		list := binding.decl.Parent
		if list == nil || list.Kind != ast.KindVariableDeclarationList || list.Flags&ast.NodeFlagsConst == 0 {
			continue
		}
		matched := false
		for _, reference := range a.refs[binding.decl] {
			if reference.Pos() <= end && reference.End() >= start {
				matched = true
				break
			}
		}
		if !matched {
			continue
		}
		// 一条 const 可能声明多个变量，不能顺带改变其他声明的可写性。
		if len(list.AsVariableDeclarationList().Declarations.Nodes) != 1 {
			continue
		}
		position := scanner.SkipTrivia(file.Text(), list.Pos())
		if strings.HasPrefix(file.Text()[position:], "const") {
			return []Fix{{Title: "将可重新赋值的状态声明改为 let", Start: position, End: position + 5, Text: "let"}}
		}
	}
	return nil
}
