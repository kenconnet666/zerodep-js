// Package zerodep 在原始解析树上分析框架语义；输出转换不会修改检查器持有的树。
package zerodep

import (
	"fmt"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/binder"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
)

type bindingKind uint8

const (
	stateBinding bindingKind = iota + 1
	derivedBinding
	propBinding
	restBinding
	forBinding
	propsBinding
)

type binding struct {
	kind     bindingKind
	decl     *ast.Node
	call     *ast.Node
	member   string
	readonly bool
	key      string
	initial  *ast.Node
}

type component struct {
	call, setup, parameter *ast.Node
	props                  []*binding
	name                   string
}

type macro struct{ role, member string }

type Analysis struct {
	file        *ast.SourceFile
	resolver    binder.ReferenceResolver
	resolved    map[*ast.Node]*ast.Node
	finished    bool
	imports     map[*ast.Node]string
	bindings    map[*ast.Node]*binding
	components  map[*ast.Node]*component
	setups      map[*ast.Node]*component
	loops       map[*ast.Node]bool
	refs        map[*ast.Node][]*ast.Node
	consumed    map[*ast.Node]bool
	renderRoots map[*ast.Node]bool
	diagnostics []*ast.Diagnostic
	hasJSX      bool
}

var analysisKey = ast.NewSourceFileDataKey[*Analysis]()

// 结果由源文件拥有，随新快照释放；不跨项目存储 checker、Type 或 Symbol。
func Analyze(file *ast.SourceFile) *Analysis {
	return file.GetOrComputeData(analysisKey, func(file *ast.SourceFile) *Analysis {
		binder.BindSourceFile(file)
		a := &Analysis{file: file, resolver: binder.NewReferenceResolver(&core.CompilerOptions{}, binder.ReferenceResolverHooks{}),
			resolved: map[*ast.Node]*ast.Node{},
			imports:  map[*ast.Node]string{}, bindings: map[*ast.Node]*binding{}, components: map[*ast.Node]*component{},
			setups: map[*ast.Node]*component{}, loops: map[*ast.Node]bool{}, refs: map[*ast.Node][]*ast.Node{},
			consumed: map[*ast.Node]bool{}, renderRoots: map[*ast.Node]bool{}}
		if file.IsDeclarationFile || len(file.Diagnostics()) > 0 {
			return a
		}
		for _, statement := range file.Statements.Nodes {
			if !ast.IsImportDeclaration(statement) {
				continue
			}
			decl := statement.AsImportDeclaration()
			if decl.ModuleSpecifier.Text() != "zerodep-js" || decl.ImportClause == nil || ast.IsTypeOnlyImportDeclaration(decl.ImportClause) {
				continue
			}
			clause := decl.ImportClause.AsImportClause()
			if clause.NamedBindings == nil {
				continue
			}
			if ast.IsNamespaceImport(clause.NamedBindings) {
				a.imports[clause.NamedBindings] = "namespace"
				continue
			}
			for _, item := range clause.NamedBindings.AsNamedImports().Elements.Nodes {
				if ast.IsTypeOnlyImportDeclaration(item) {
					continue
				}
				spec := item.AsImportSpecifier()
				name := spec.Name().Text()
				if spec.PropertyName != nil {
					name = spec.PropertyName.Text()
				}
				switch name {
				case "_state", "_derived", "_component", "For":
					a.imports[item] = name
				}
			}
		}
		walk(file.AsNode(), func(node *ast.Node) bool {
			if isType(node) {
				return false
			}
			if ast.IsCallExpression(node) {
				a.collectCall(node)
			}
			return true
		})
		// 先登记整份源码的宏，再验证 JSX 生成的写入，包括捕获后声明绑定的闭包。
		walk(file.AsNode(), func(node *ast.Node) bool {
			if isType(node) {
				return false
			}
			if ast.IsJsxElement(node) || ast.IsJsxSelfClosingElement(node) || ast.IsJsxFragment(node) {
				a.hasJSX = true
				a.collectJSX(node)
			}
			return true
		})
		walk(file.AsNode(), func(node *ast.Node) bool {
			if isType(node) || ast.IsImportDeclaration(node) {
				return false
			}
			if reference(node) {
				decl := a.declaration(node)
				if decl != nil {
					a.refs[decl] = append(a.refs[decl], node)
				}
			}
			a.checkNode(node)
			return true
		})
		a.checkDefaults()
		a.checkGuards()
		// emit 可并行读取此结果，后续不再调用带有内部懒初始化的 resolver。
		a.finished = true
		a.resolver = nil
		return a
	})
}

func (a *Analysis) Enabled(options *core.CompilerOptions) bool {
	return len(a.imports) > 0 || (a.hasJSX && ast.GetJSXImplicitImportBase(options, a.file) == "zerodep-js")
}

func Diagnostics(file *ast.SourceFile, options *core.CompilerOptions) []*ast.Diagnostic {
	if file.IsDeclarationFile {
		return nil
	}
	a := Analyze(file)
	if !a.Enabled(options) {
		return nil
	}
	return a.diagnostics
}

func (a *Analysis) report(node *ast.Node, code int, message string) {
	location := core.NewTextRange(scanner.SkipTrivia(a.file.Text(), node.Pos()), node.End())
	a.diagnostics = append(a.diagnostics, ast.NewDiagnosticFromText(a.file, location, int32(900000+code), diagnostics.CategoryError,
		fmt.Sprintf("ZJ%d: %s", code, message), nil, nil, false, false))
}

func walk(node *ast.Node, visit func(*ast.Node) bool) {
	if node == nil || !visit(node) {
		return
	}
	node.ForEachChild(func(child *ast.Node) bool { walk(child, visit); return false })
}

func isType(node *ast.Node) bool {
	return ast.IsTypeNode(node) || ast.IsInterfaceDeclaration(node) || ast.IsTypeAliasDeclaration(node)
}

func reference(node *ast.Node) bool {
	if !ast.IsIdentifier(node) || node.Parent == nil {
		return false
	}
	p := node.Parent
	if ast.IsBinaryExpression(p) && ast.IsAssignmentOperator(p.AsBinaryExpression().OperatorToken.Kind) && p.AsBinaryExpression().Left == node {
		return false
	}
	if ast.IsShorthandPropertyAssignment(p) {
		return true
	}
	if ast.IsDeclarationNameOrImportPropertyName(node) {
		return false
	}
	if ast.IsPropertyAccessExpression(p) && p.Name() == node {
		return false
	}
	if ast.IsBindingElement(p) && p.AsBindingElement().PropertyName == node {
		return false
	}
	if ast.IsExportSpecifier(p) || ast.IsJsxAttribute(p) || ast.IsJsxNamespacedName(p) {
		return false
	}
	return true
}

func (a *Analysis) declaration(node *ast.Node) *ast.Node {
	if node == nil || !ast.IsIdentifier(node) {
		return nil
	}
	if declaration, found := a.resolved[node]; found {
		return declaration
	}
	if a.finished {
		return nil
	}
	if imported := a.resolver.GetReferencedImportDeclaration(node); imported != nil {
		a.resolved[node] = imported
		return imported
	}
	declaration := a.resolver.GetReferencedValueDeclaration(node)
	a.resolved[node] = declaration
	return declaration
}

func member(node *ast.Node) (*ast.Node, string, bool) {
	if ast.IsPropertyAccessExpression(node) {
		return node.Expression(), node.Name().Text(), true
	}
	if ast.IsElementAccessExpression(node) {
		e := node.AsElementAccessExpression()
		if ast.IsStringLiteral(e.ArgumentExpression) {
			return e.Expression, e.ArgumentExpression.Text(), true
		}
	}
	return nil, "", false
}

func (a *Analysis) macro(node *ast.Node) macro {
	if node == nil {
		return macro{}
	}
	if ast.IsIdentifier(node) {
		return macro{role: a.imports[a.declaration(node)]}
	}
	object, name, ok := member(node)
	if !ok {
		return macro{}
	}
	base := a.macro(object)
	if base.role == "namespace" {
		switch name {
		case "_state", "_derived", "_component", "For":
			return macro{role: name}
		}
	}
	if base.role == "_state" || base.role == "_derived" {
		return macro{role: base.role, member: name}
	}
	return macro{}
}

func hasModifier(node *ast.Node, kind ast.Kind) bool {
	if node.Modifiers() != nil {
		for _, modifier := range node.Modifiers().Nodes {
			if modifier.Kind == kind {
				return true
			}
		}
	}
	return false
}

func constDeclaration(node *ast.Node) bool {
	return node != nil && ast.IsVariableDeclaration(node) && node.Parent != nil && node.Parent.Flags&ast.NodeFlagsConst != 0
}

func inlineFunction(node *ast.Node) bool {
	return node != nil && (ast.IsArrowFunction(node) || ast.IsFunctionExpression(node)) && !hasModifier(node, ast.KindAsyncKeyword) &&
		(!ast.IsFunctionExpression(node) || node.AsFunctionExpression().AsteriskToken == nil)
}

func (a *Analysis) collectCall(node *ast.Node) {
	call := node.AsCallExpression()
	m := a.macro(call.Expression)
	if m.role != "_state" && m.role != "_derived" && m.role != "_component" {
		return
	}
	walk(call.Expression, func(part *ast.Node) bool { a.consumed[part] = true; return true })
	args := call.Arguments.Nodes
	if m.role == "_component" {
		if len(args) != 1 || !inlineFunction(args[0]) {
			a.report(node, 1200, "_component 接受一个内联的同步函数，组件初始化不能是异步或生成器。")
			return
		}
		a.collectComponent(node, args[0])
		return
	}
	if m.member != "" && !(m.role == "_state" && m.member == "raw") && !(m.role == "_derived" && m.member == "by") {
		a.report(node, 1001, "不支持的宏成员，只能使用 _state.raw 或 _derived.by。")
		return
	}
	decl := node.Parent
	if decl == nil || !ast.IsVariableDeclaration(decl) || decl.Initializer() != node || !ast.IsIdentifier(decl.Name()) {
		a.report(node, 1002, "响应式宏只能作为单个命名变量的初始化表达式。")
		return
	}
	if len(args) > 1 || (m.role == "_derived" && len(args) != 1) || (len(args) > 0 && ast.IsSpreadElement(args[0])) {
		a.report(node, 1003, "状态宏接受零或一个值；派生宏需要一个表达式或计算函数，不接受展开参数。")
		return
	}
	if decl.Parent.Flags&(ast.NodeFlagsLet|ast.NodeFlagsConst) == 0 {
		a.report(decl, 1004, "响应式声明使用 let 或 const，不使用 var。")
	}
	b := &binding{kind: stateBinding, decl: decl, call: node, member: m.member, readonly: constDeclaration(decl)}
	if m.role == "_derived" {
		b.kind = derivedBinding
		b.readonly = true
	}
	if len(args) > 0 {
		b.initial = args[0]
	}
	a.bindings[decl] = b
}

func (a *Analysis) collectComponent(call, setup *ast.Node) {
	if len(setup.Parameters()) > 1 {
		a.report(setup, 1201, "组件只接收一个 props 参数。")
		return
	}
	c := &component{call: call, setup: setup}
	a.components[call] = c
	a.setups[setup] = c
	if len(setup.Parameters()) == 0 {
		return
	}
	param := setup.Parameters()[0].AsParameterDeclaration()
	c.parameter = param.AsNode()
	if param.Initializer != nil || param.DotDotDotToken != nil || (!ast.IsIdentifier(param.Name()) && !ast.IsObjectBindingPattern(param.Name())) {
		a.report(param.AsNode(), 1202, "组件参数使用 props 对象或顶层对象解构，默认值写在各属性旁。")
		return
	}
	if ast.IsIdentifier(param.Name()) {
		a.bindings[param.AsNode()] = &binding{kind: propsBinding, decl: param.AsNode(), readonly: true}
		return
	}
	for _, item := range param.Name().AsBindingPattern().Elements.Nodes {
		entry := item.AsBindingElement()
		key := entry.Name()
		if entry.PropertyName != nil {
			key = entry.PropertyName
		}
		if !ast.IsIdentifier(entry.Name()) || (!ast.IsIdentifier(key) && !ast.IsStringLiteral(key)) {
			a.report(item, 1204, "仅支持顶层静态属性解构；嵌套数据请用 props.user.name 或显式派生。")
			continue
		}
		b := &binding{kind: propBinding, decl: item, key: key.Text(), initial: entry.Initializer, readonly: true}
		if entry.DotDotDotToken != nil {
			b.kind = restBinding
		}
		if b.key == "key" && b.kind != restBinding {
			a.report(item, 1207, "key 是 JSX 实例身份，不是组件输入；业务数据请使用 id 等名称。")
		}
		c.props = append(c.props, b)
		a.bindings[item] = b
	}
}

func (a *Analysis) checkNode(node *ast.Node) {
	if reference(node) && !a.consumed[node] {
		m := a.macro(node)
		if m.role == "_state" || m.role == "_derived" {
			a.report(node, 1009, "宏不能作为普通值传递，只能直接初始化响应式变量。")
		}
		if m.role == "_component" {
			a.report(node, 1206, "_component 标记只能直接包装组件函数，不能作为普通值传递。")
		}
	}
	if object, name, ok := member(node); ok {
		b := a.bindings[a.declaration(object)]
		if b != nil && b.kind == propsBinding && name == "key" {
			a.report(node, 1207, "key 是 JSX 实例身份，不是组件输入；业务数据请使用 id 等名称。")
		}
		m := a.macro(node)
		if !a.consumed[node] && (m.role == "_state" || m.role == "_derived" || m.role == "_component") {
			if node.Parent == nil || node.Parent.Expression() != node {
				a.report(node, 1009, "宏不能作为普通值传递，只能直接初始化响应式变量。")
			}
		}
	}
	var target *ast.Node
	if ast.IsBinaryExpression(node) && ast.IsAssignmentOperator(node.AsBinaryExpression().OperatorToken.Kind) {
		target = node.AsBinaryExpression().Left
	}
	if ast.IsPrefixUnaryExpression(node) {
		u := node.AsPrefixUnaryExpression()
		if u.Operator == ast.KindPlusPlusToken || u.Operator == ast.KindMinusMinusToken {
			target = u.Operand
		}
	}
	if ast.IsPostfixUnaryExpression(node) {
		target = node.AsPostfixUnaryExpression().Operand
	}
	if ast.IsDeleteExpression(node) {
		target = node.Expression()
	}
	if target != nil {
		a.checkWrite(node, target)
	}
	if ast.IsForInStatement(node) || ast.IsForOfStatement(node) {
		walk(node.Initializer(), func(part *ast.Node) bool {
			if reference(part) {
				if b := a.bindings[a.declaration(part)]; b != nil && (b.kind == stateBinding || b.kind == derivedBinding) {
					a.report(part, 1007, "循环目标不能是响应式绑定，请在循环体内显式赋值。")
				}
			}
			return true
		})
	}
	if ast.IsVariableStatement(node) && hasModifier(node, ast.KindExportKeyword) {
		for _, decl := range node.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
			if b := a.bindings[decl]; b != nil {
				a.report(decl, 1006, "不能直接导出响应式绑定；请通过普通函数和 getter 暴露跨模块状态。")
			}
		}
	}
	if ast.IsExportAssignment(node) {
		if b := a.bindings[a.declaration(node.Expression())]; b != nil {
			a.report(node, 1006, "不能直接导出响应式绑定；请通过普通函数和 getter 暴露跨模块状态。")
		}
	}
	if ast.IsExportSpecifier(node) {
		spec := node.AsExportSpecifier()
		name := spec.Name()
		if spec.PropertyName != nil {
			name = spec.PropertyName
		}
		if b := a.bindings[a.declaration(name)]; b != nil {
			a.report(node, 1006, "不能直接导出响应式绑定；请通过普通函数和 getter 暴露跨模块状态。")
		}
	}
	if ast.IsCallExpression(node) && ast.IsIdentifier(node.Expression()) && node.Expression().Text() == "eval" && a.declaration(node.Expression()) == nil && (len(a.bindings) > 0 || len(a.components) > 0 || a.hasJSX) {
		a.report(node, 1008, "响应式模块不支持直接 eval 访问被转换的词法绑定。")
	}
}

func (a *Analysis) checkWrite(node, target *ast.Node) {
	if b := a.bindings[a.declaration(target)]; b != nil && b.readonly {
		code := 1005
		message := "不能重新赋值只读派生或 const 状态绑定。"
		if b.kind == propBinding || b.kind == restBinding || b.kind == propsBinding {
			code = 1203
			message = "props 参数及解构输入不能重新赋值。"
		}
		if b.kind == forBinding {
			code = 1401
			message = "For 的 row/index 是只读实时绑定，不能重新赋值。"
		}
		a.report(node, code, message)
	}
	if object, _, ok := member(target); ok {
		if b := a.bindings[a.declaration(object)]; b != nil && (b.kind == propsBinding || b.kind == restBinding) {
			a.report(node, 1203, "不能修改 props 或 rest 输入的顶层属性，请使用回调。")
		}
	}
	if ast.IsObjectLiteralExpression(target) || ast.IsArrayLiteralExpression(target) {
		walk(target, func(part *ast.Node) bool {
			if ast.IsIdentifier(part) {
				if b := a.bindings[a.declaration(part)]; b != nil {
					a.report(node, 1007, "暂不支持对响应式绑定进行解构赋值，请逐项显式赋值。")
				}
			}
			return true
		})
	}
}

func (a *Analysis) checkDefaults() {
	for _, c := range a.components {
		for index, b := range c.props {
			if b.initial == nil {
				continue
			}
			walk(b.initial, func(node *ast.Node) bool {
				if isType(node) {
					return false
				}
				if !reference(node) {
					return true
				}
				decl := a.declaration(node)
				for next := index; next < len(c.props); next++ {
					if decl == c.props[next].decl {
						a.report(node, 1205, "默认值不能引用自身或后面的参数。")
						return true
					}
				}
				if locals := c.setup.Locals(); locals != nil {
					if symbol := locals[node.Text()]; symbol != nil {
						for _, local := range symbol.Declarations {
							if local.Loc.Pos() >= c.setup.Body().Loc.Pos() && !(local.Loc.Pos() >= b.initial.Loc.Pos() && local.End() <= b.initial.End()) {
								a.report(node, 1205, "默认值不能捕获或被函数体内的同名变量遮蔽，请使用外部别名。")
							}
						}
					}
				}
				return true
			})
		}
	}
}

func contains(items []string, name string) bool {
	for _, item := range items {
		if item == name {
			return true
		}
	}
	return false
}
func nativeTag(name string) bool { return len(name) > 0 && name[0] >= 'a' && name[0] <= 'z' }
func trimJSX(text string) string { return strings.TrimSpace(text) }
