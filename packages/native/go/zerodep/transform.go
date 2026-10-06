package zerodep

import (
	"strconv"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/transformers"
)

type transform struct {
	transformers.Transformer
	a         *Analysis
	options   *core.CompilerOptions
	runtime   *ast.Node
	props     map[*ast.Node]*ast.Node
	inputs    map[*ast.Node]*ast.Node
	templates map[*ast.Node]bool
	render    bool
	dev       *development
}

func NewTransformer(options *transformers.TransformOptions, file *ast.SourceFile) *transformers.Transformer {
	a := Analyze(file)
	tx := &transform{a: a, options: options.CompilerOptions, props: map[*ast.Node]*ast.Node{}, inputs: map[*ast.Node]*ast.Node{}, templates: map[*ast.Node]bool{}}
	result := tx.NewTransformer(tx.visit, options.Context)
	if !a.Enabled(options.CompilerOptions) {
		return result
	}
	tx.runtime = tx.unique("_zj")
	for _, c := range a.components {
		if len(c.props) == 0 {
			continue
		}
		tx.inputs[c.setup] = tx.unique("props")
		for _, b := range c.props {
			tx.props[b.decl] = tx.unique(b.decl.Name().Text())
		}
	}
	if options.CompilerOptions.ZerodepDevelopment.IsTrue() {
		tx.dev = tx.development()
	}
	return result
}

func (tx *transform) unique(name string) *ast.Node {
	return tx.Factory().NewUniqueNameEx(name, printer.AutoGenerateOptions{Flags: printer.GeneratedIdentifierFlagsOptimistic | printer.GeneratedIdentifierFlagsFileLevel})
}
func (tx *transform) list(nodes ...*ast.Node) *ast.NodeList { return tx.Factory().NewNodeList(nodes) }
func (tx *transform) str(value string) *ast.Node {
	return tx.Factory().NewStringLiteral(value, ast.TokenFlagsNone)
}
func (tx *transform) num(value int) *ast.Node {
	return tx.Factory().NewNumericLiteral(strconv.Itoa(value), ast.TokenFlagsNone)
}
func (tx *transform) boolean(value bool) *ast.Node {
	if value {
		return tx.Factory().NewToken(ast.KindTrueKeyword)
	}
	return tx.Factory().NewToken(ast.KindFalseKeyword)
}
func (tx *transform) null() *ast.Node  { return tx.Factory().NewToken(ast.KindNullKeyword) }
func (tx *transform) undef() *ast.Node { return tx.Factory().NewVoidExpression(tx.num(0)) }
func (tx *transform) call(callee *ast.Node, args ...*ast.Node) *ast.Node {
	return tx.Factory().NewCallExpression(callee, nil, nil, tx.list(args...), ast.NodeFlagsNone)
}
func (tx *transform) access(object *ast.Node, name string) *ast.Node {
	return tx.Factory().NewPropertyAccessExpression(object, nil, tx.Factory().NewIdentifier(name), ast.NodeFlagsNone)
}
func (tx *transform) helper(name string, args ...*ast.Node) *ast.Node {
	return tx.call(tx.access(tx.runtime, name), args...)
}
func (tx *transform) arrow(body *ast.Node, parameters ...*ast.Node) *ast.Node {
	params := make([]*ast.Node, len(parameters))
	for i, param := range parameters {
		params[i] = tx.Factory().NewParameterDeclaration(nil, nil, param, nil, nil, nil)
	}
	return tx.Factory().NewArrowFunction(nil, nil, tx.list(params...), nil, nil, tx.Factory().NewToken(ast.KindEqualsGreaterThanToken), body)
}
func (tx *transform) array(items ...*ast.Node) *ast.Node {
	return tx.Factory().NewArrayLiteralExpression(tx.list(items...), false)
}
func (tx *transform) property(name string, value *ast.Node) *ast.Node {
	key := tx.str(name)
	if name == "__proto__" {
		key = tx.Factory().NewComputedPropertyName(key)
	}
	return tx.Factory().NewPropertyAssignment(nil, key, nil, nil, value)
}
func (tx *transform) object(items ...*ast.Node) *ast.Node {
	return tx.Factory().NewObjectLiteralExpression(tx.list(items...), false)
}
func (tx *transform) expression(value *ast.Node) *ast.Node {
	return tx.Factory().NewExpressionStatement(value)
}
func (tx *transform) variable(name, value *ast.Node) *ast.Node {
	return tx.Factory().NewVariableDeclaration(name, nil, nil, value)
}
func (tx *transform) constants(declarations ...*ast.Node) *ast.Node {
	return tx.Factory().NewVariableStatement(nil, tx.Factory().NewVariableDeclarationList(tx.list(declarations...), ast.NodeFlagsConst))
}
func (tx *transform) namespace(name *ast.Node, path string) *ast.Node {
	return tx.Factory().NewImportDeclaration(nil, tx.Factory().NewImportClause(ast.KindUnknown, nil, tx.Factory().NewNamespaceImport(name)), tx.str(path), nil)
}
func (tx *transform) binary(left *ast.Node, operator ast.Kind, right *ast.Node) *ast.Node {
	return tx.Factory().NewBinaryExpression(nil, left, nil, tx.Factory().NewToken(operator), right)
}
func (tx *transform) origin(value, original *ast.Node) *ast.Node {
	if value != original {
		tx.EmitContext().SetOriginalEx(value, original, true)
		tx.EmitContext().SetSourceMapRange(value, original.Loc)
		tx.EmitContext().SetCommentRange(value, original.Loc)
	}
	return value
}

func (tx *transform) read(node *ast.Node, b *binding) *ast.Node {
	switch b.kind {
	case stateBinding, derivedBinding:
		return tx.origin(tx.call(tx.access(node, "read")), node)
	case propBinding:
		return tx.origin(tx.call(tx.props[b.decl]), node)
	case restBinding:
		return tx.origin(tx.props[b.decl].Clone(tx.Factory()), node)
	case forBinding:
		return tx.origin(tx.call(node), node)
	default:
		return node
	}
}

func (tx *transform) write(target, value *ast.Node) *ast.Node {
	b := tx.a.bindings[tx.a.declaration(target)]
	if b != nil && (b.kind == stateBinding || b.kind == derivedBinding) {
		return tx.helper("set", target, value)
	}
	return tx.binary(tx.visit(target), ast.KindEqualsToken, value)
}

func (tx *transform) visit(node *ast.Node) *ast.Node {
	if node == nil || tx.runtime == nil || isType(node) {
		return node
	}
	switch node.Kind {
	case ast.KindSourceFile:
		return tx.source(node.AsSourceFile())
	case ast.KindImportDeclaration:
		return tx.importDeclaration(node)
	case ast.KindCallExpression:
		if c := tx.a.components[node]; c != nil {
			return tx.component(c)
		}
		if b := tx.a.bindings[node.Parent]; b != nil && b.call == node {
			value := tx.undef()
			if b.initial != nil {
				value = tx.visit(b.initial)
			}
			var result *ast.Node
			if b.kind == derivedBinding {
				if b.member != "by" {
					value = tx.arrow(value)
				}
				result = tx.helper("derived", value)
			} else {
				name := "state"
				if b.member == "raw" {
					name = "source"
				}
				result = tx.helper(name, value)
				if tx.dev != nil {
					result = tx.dev.state(tx, b, result)
				}
			}
			return tx.origin(result, node)
		}
	case ast.KindBinaryExpression:
		binary := node.AsBinaryExpression()
		b := tx.a.bindings[tx.a.declaration(binary.Left)]
		if b != nil && (b.kind == stateBinding || b.kind == derivedBinding) && ast.IsAssignmentOperator(binary.OperatorToken.Kind) {
			right := tx.visit(binary.Right)
			op := binary.OperatorToken.Kind
			if op == ast.KindEqualsToken {
				return tx.origin(tx.helper("set", binary.Left, right), node)
			}
			operator := assignmentOperator(op)
			read := tx.read(binary.Left, b)
			if op == ast.KindAmpersandAmpersandEqualsToken || op == ast.KindBarBarEqualsToken || op == ast.KindQuestionQuestionEqualsToken {
				return tx.origin(tx.binary(read, operator, tx.helper("set", binary.Left, right)), node)
			}
			return tx.origin(tx.helper("set", binary.Left, tx.binary(read, operator, right)), node)
		}
	case ast.KindPrefixUnaryExpression, ast.KindPostfixUnaryExpression:
		var operand *ast.Node
		var operator ast.Kind
		if ast.IsPrefixUnaryExpression(node) {
			u := node.AsPrefixUnaryExpression()
			operand = u.Operand
			operator = u.Operator
		} else {
			u := node.AsPostfixUnaryExpression()
			operand = u.Operand
			operator = u.Operator
		}
		if (operator == ast.KindPlusPlusToken || operator == ast.KindMinusMinusToken) && tx.a.bindings[tx.a.declaration(operand)] != nil {
			return tx.origin(tx.helper("update", operand, tx.boolean(operator == ast.KindPlusPlusToken), tx.boolean(ast.IsPrefixUnaryExpression(node))), node)
		}
	case ast.KindShorthandPropertyAssignment:
		name := node.Name()
		if b := tx.a.bindings[tx.a.declaration(name)]; b != nil {
			return tx.origin(tx.Factory().NewPropertyAssignment(nil, name, nil, nil, tx.read(name, b)), node)
		}
	case ast.KindIdentifier:
		if reference(node) {
			if b := tx.a.bindings[tx.a.declaration(node)]; b != nil {
				return tx.read(node, b)
			}
		}
	case ast.KindJsxElement, ast.KindJsxSelfClosingElement, ast.KindJsxFragment:
		return tx.jsx(node)
	case ast.KindArrowFunction, ast.KindFunctionExpression:
		if tx.a.loops[node] {
			return tx.origin(tx.helper("liveRender", tx.function(node, true, nil)), node)
		}
		return tx.function(node, false, nil)
	case ast.KindFunctionDeclaration, ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor:
		previous := tx.render
		tx.render = false
		result := tx.Visitor().VisitEachChild(node)
		tx.render = previous
		return result
	case ast.KindReturnStatement:
		if tx.render && node.Expression() != nil {
			return tx.Factory().UpdateReturnStatement(node.AsReturnStatement(), tx.renderExpression(node.Expression()))
		}
	}
	return tx.Visitor().VisitEachChild(node)
}

func (tx *transform) source(file *ast.SourceFile) *ast.Node {
	var imports, statements []*ast.Node
	for _, node := range file.Statements.Nodes {
		if tx.dev != nil && tx.dev.defaults[node] != nil {
			id := tx.dev.defaults[node]
			statements = append(statements, tx.constants(tx.variable(id, tx.visit(node.Expression()))), tx.Factory().NewExportAssignment(nil, false, nil, id))
			continue
		}
		next := tx.visit(node)
		if next == nil {
			continue
		}
		if ast.IsImportDeclaration(next) {
			imports = append(imports, next)
		} else {
			statements = append(statements, next)
		}
	}
	if len(tx.a.bindings) == 0 && len(tx.a.components) == 0 && !tx.a.hasJSX {
		return tx.Factory().UpdateSourceFile(file, tx.list(append(imports, statements...)...), file.EndOfFileToken)
	}
	path := tx.options.ZerodepRuntimeModule
	if path == "" {
		path = "zerodep-js/internal"
	}
	result := []*ast.Node{tx.namespace(tx.runtime, path)}
	result = append(result, imports...)
	result = append(result, tx.expression(tx.helper("assertRuntime", tx.num(2))))
	if tx.dev != nil {
		tx.EmitContext().AddSyntheticLeadingComment(result[0], ast.KindMultiLineCommentTrivia, " @zerodep-development ", true)
		result = append(result, tx.dev.start(tx)...)
	}
	result = append(result, statements...)
	if tx.dev != nil {
		result = append(result, tx.dev.finish(tx)...)
	}
	return tx.Factory().UpdateSourceFile(file, tx.list(result...), file.EndOfFileToken)
}

func (tx *transform) importDeclaration(node *ast.Node) *ast.Node {
	decl := node.AsImportDeclaration()
	if decl.ImportClause == nil || decl.ModuleSpecifier.Text() != "zerodep-js" {
		return node
	}
	clause := decl.ImportClause.AsImportClause()
	if clause.NamedBindings == nil || !ast.IsNamedImports(clause.NamedBindings) {
		return node
	}
	var items []*ast.Node
	for _, item := range clause.NamedBindings.AsNamedImports().Elements.Nodes {
		role := tx.a.imports[item]
		if role != "_state" && role != "_derived" && role != "_component" {
			items = append(items, item)
		}
	}
	if len(items) == len(clause.NamedBindings.AsNamedImports().Elements.Nodes) {
		return node
	}
	if len(items) == 0 && clause.Name() == nil {
		return nil
	}
	bindings := tx.Factory().NewNamedImports(tx.list(items...))
	return tx.Factory().UpdateImportDeclaration(decl, decl.Modifiers(), tx.Factory().UpdateImportClause(clause, clause.PhaseModifier, clause.Name(), bindings), decl.ModuleSpecifier, decl.Attributes)
}

func (tx *transform) function(node *ast.Node, render bool, c *component) *ast.Node {
	previous := tx.render
	tx.render = render
	body := node.Body()
	if ast.IsBlock(body) {
		body = tx.visit(body)
	} else if render {
		body = tx.renderExpression(body)
	} else {
		body = tx.visit(body)
	}
	tx.render = previous
	params := node.ParameterList()
	if c != nil && len(c.props) > 0 {
		input := tx.inputs[node]
		params = tx.list(tx.Factory().NewParameterDeclaration(nil, nil, input, nil, nil, nil))
		var declarations, excluded []*ast.Node
		for _, b := range c.props {
			args := []*ast.Node{input, tx.str(b.key)}
			var value *ast.Node
			if b.kind == restBinding {
				value = tx.helper("restProps", input, tx.array(excluded...))
			} else {
				excluded = append(excluded, tx.str(b.key))
				if b.initial != nil {
					args = append(args, tx.arrow(tx.visit(b.initial)))
				}
				value = tx.helper("prop", args...)
			}
			declarations = append(declarations, tx.variable(tx.props[b.decl], value))
		}
		statements := []*ast.Node{tx.constants(declarations...)}
		if ast.IsBlock(body) {
			statements = append(statements, body.AsBlock().Statements.Nodes...)
		} else {
			statements = append(statements, tx.Factory().NewReturnStatement(body))
		}
		body = tx.Factory().NewBlock(tx.list(statements...), true)
	}
	if ast.IsArrowFunction(node) {
		f := node.AsArrowFunction()
		return tx.Factory().UpdateArrowFunction(f, f.Modifiers(), f.TypeParameters, params, f.Type, f.FullSignature, f.EqualsGreaterThanToken, body)
	}
	f := node.AsFunctionExpression()
	return tx.Factory().UpdateFunctionExpression(f, f.Modifiers(), f.AsteriskToken, f.Name(), f.TypeParameters, params, f.Type, f.FullSignature, body)
}

func (tx *transform) component(c *component) *ast.Node {
	setup := tx.function(c.setup, true, c)
	result := tx.helper("defineComponent", setup)
	if tx.dev != nil {
		result = tx.dev.component(tx, c, setup, result)
	}
	return tx.origin(result, c.call)
}

func assignmentOperator(kind ast.Kind) ast.Kind {
	switch kind {
	case ast.KindPlusEqualsToken:
		return ast.KindPlusToken
	case ast.KindMinusEqualsToken:
		return ast.KindMinusToken
	case ast.KindAsteriskEqualsToken:
		return ast.KindAsteriskToken
	case ast.KindAsteriskAsteriskEqualsToken:
		return ast.KindAsteriskAsteriskToken
	case ast.KindSlashEqualsToken:
		return ast.KindSlashToken
	case ast.KindPercentEqualsToken:
		return ast.KindPercentToken
	case ast.KindLessThanLessThanEqualsToken:
		return ast.KindLessThanLessThanToken
	case ast.KindGreaterThanGreaterThanEqualsToken:
		return ast.KindGreaterThanGreaterThanToken
	case ast.KindGreaterThanGreaterThanGreaterThanEqualsToken:
		return ast.KindGreaterThanGreaterThanGreaterThanToken
	case ast.KindAmpersandEqualsToken:
		return ast.KindAmpersandToken
	case ast.KindBarEqualsToken:
		return ast.KindBarToken
	case ast.KindCaretEqualsToken:
		return ast.KindCaretToken
	case ast.KindAmpersandAmpersandEqualsToken:
		return ast.KindAmpersandAmpersandToken
	case ast.KindBarBarEqualsToken:
		return ast.KindBarBarToken
	case ast.KindQuestionQuestionEqualsToken:
		return ast.KindQuestionQuestionToken
	}
	panic("无效的赋值运算符")
}
