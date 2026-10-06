package zerodep

import (
	"crypto/sha256"
	"fmt"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
)

type developmentComponent struct {
	name, signature string
	line            int
}
type developmentState struct {
	owner, name string
	portable    bool
}
type development struct {
	namespace, session *ast.Node
	components         map[*component]*developmentComponent
	states             map[*binding]developmentState
	defaults           map[*ast.Node]*ast.Node
	exports            []*ast.Node
	boundary           bool
}

func portable(node *ast.Node) bool {
	if node == nil {
		return true
	}
	node = unwrap(node)
	switch node.Kind {
	case ast.KindNullKeyword, ast.KindStringLiteral, ast.KindNumericLiteral, ast.KindTrueKeyword, ast.KindFalseKeyword, ast.KindBigIntLiteral, ast.KindOmittedExpression:
		return true
	case ast.KindVoidExpression:
		return portable(node.Expression())
	case ast.KindPrefixUnaryExpression:
		u := node.AsPrefixUnaryExpression()
		return (u.Operator == ast.KindPlusToken || u.Operator == ast.KindMinusToken) && portable(u.Operand)
	case ast.KindArrayLiteralExpression:
		for _, item := range node.AsArrayLiteralExpression().Elements.Nodes {
			if !portable(item) {
				return false
			}
		}
		return true
	case ast.KindObjectLiteralExpression:
		for _, item := range node.AsObjectLiteralExpression().Properties.Nodes {
			if !ast.IsPropertyAssignment(item) || ast.IsComputedPropertyName(item.Name()) || !portable(item.Initializer()) {
				return false
			}
		}
		return true
	}
	return false
}

// 签名来自声明结构；排版、注释与渲染文案不进入状态迁移协议。
func fingerprint(nodes []*ast.Node) string {
	var result strings.Builder
	var visit func(*ast.Node)
	visit = func(node *ast.Node) {
		if node == nil {
			result.WriteString("nil;")
			return
		}
		fmt.Fprintf(&result, "%d:", node.Kind)
		switch node.Kind {
		case ast.KindIdentifier, ast.KindStringLiteral, ast.KindNumericLiteral, ast.KindBigIntLiteral, ast.KindNoSubstitutionTemplateLiteral:
			fmt.Fprintf(&result, "%q", node.Text())
		}
		node.ForEachChild(func(child *ast.Node) bool { visit(child); return false })
		result.WriteByte(';')
	}
	for _, node := range nodes {
		visit(node)
	}
	hash := sha256.Sum256([]byte(result.String()))
	return fmt.Sprintf("%x", hash)[:24]
}

func (tx *transform) development() *development {
	d := &development{namespace: tx.unique("zdev"), session: tx.unique("zmodule"), components: map[*component]*developmentComponent{}, states: map[*binding]developmentState{}, defaults: map[*ast.Node]*ast.Node{}, boundary: true}
	names := map[string]*ast.Node{}
	for _, statement := range tx.a.file.Statements.Nodes {
		if ast.IsVariableStatement(statement) {
			for _, decl := range statement.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
				if c := tx.a.components[decl.Initializer()]; c != nil && ast.IsIdentifier(decl.Name()) {
					names[decl.Name().Text()] = decl.Name()
					d.register(tx, c, decl.Name().Text())
				}
			}
		}
		if ast.IsExportAssignment(statement) && !statement.AsExportAssignment().IsExportEquals {
			if c := tx.a.components[statement.Expression()]; c != nil {
				id := tx.unique("Default")
				d.defaults[statement] = id
				names["default"] = id
				d.register(tx, c, "default")
			}
		}
	}
	if len(d.components) == 0 {
		return nil
	}
	add := func(exported string, name *ast.Node) {
		if name == nil {
			d.boundary = false
			return
		}
		local := names[name.Text()]
		if exported == "default" && names["default"] != nil {
			local = names["default"]
		}
		if local == nil {
			d.boundary = false
			return
		}
		d.exports = append(d.exports, tx.property(exported, local))
	}
	for _, statement := range tx.a.file.Statements.Nodes {
		if ast.IsExportAssignment(statement) {
			if id := d.defaults[statement]; id != nil {
				add("default", id)
			} else if ast.IsIdentifier(statement.Expression()) {
				add("default", statement.Expression())
			} else {
				d.boundary = false
			}
			continue
		}
		if hasModifier(statement, ast.KindExportKeyword) && !isType(statement) {
			if ast.IsVariableStatement(statement) {
				for _, decl := range statement.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes {
					if ast.IsIdentifier(decl.Name()) {
						add(decl.Name().Text(), decl.Name())
					} else {
						d.boundary = false
					}
				}
			} else {
				d.boundary = false
			}
		}
		if ast.IsExportDeclaration(statement) {
			decl := statement.AsExportDeclaration()
			if decl.IsTypeOnly {
				continue
			}
			if decl.ModuleSpecifier != nil || decl.ExportClause == nil || !ast.IsNamedExports(decl.ExportClause) {
				d.boundary = false
				continue
			}
			for _, item := range decl.ExportClause.AsNamedExports().Elements.Nodes {
				spec := item.AsExportSpecifier()
				if spec.IsTypeOnly {
					continue
				}
				local := spec.Name()
				if spec.PropertyName != nil {
					local = spec.PropertyName
				}
				resolved := tx.a.declaration(local)
				if resolved != nil && isType(resolved) {
					continue
				}
				if resolved == nil {
					d.boundary = false
					continue
				}
				add(spec.Name().Text(), local)
			}
		}
	}
	d.boundary = d.boundary && len(d.exports) > 0
	return d
}

func (d *development) register(tx *transform, c *component, name string) {
	items := append([]*ast.Node{}, c.setup.Parameters()...)
	// 保留源码顺序，不能遍历 map 决定声明签名。
	walk(c.setup.Body(), func(node *ast.Node) bool {
		if ast.IsFunctionLike(node) {
			return false
		}
		if b := tx.a.bindings[node]; b != nil && b.kind == stateBinding && node.Parent != nil && node.Parent.Parent != nil && node.Parent.Parent.Parent == c.setup.Body() {
			items = append(items, node)
			d.states[b] = developmentState{name, node.Name().Text(), portable(b.initial)}
		}
		return true
	})
	d.components[c] = &developmentComponent{name, fingerprint(items), scanner.GetECMALineOfPosition(tx.a.file, c.call.Pos()) + 1}
}
func (d *development) state(tx *transform, b *binding, value *ast.Node) *ast.Node {
	if info, ok := d.states[b]; ok {
		return tx.call(tx.access(d.session, "state"), tx.str(info.owner), tx.str(info.name), value, tx.boolean(info.portable))
	}
	return value
}
func (d *development) component(tx *transform, c *component, setup, value *ast.Node) *ast.Node {
	if info := d.components[c]; info != nil {
		return tx.call(tx.access(d.session, "component"), tx.str(info.name), setup, tx.num(info.line), tx.str(info.signature))
	}
	return value
}
func (d *development) start(tx *transform) []*ast.Node {
	return []*ast.Node{tx.namespace(d.namespace, "zerodep-js/devtools"), tx.constants(tx.variable(d.session, tx.call(tx.access(d.namespace, "begin"), tx.str(string(tx.a.file.FileName())))))}
}
func (d *development) finish(tx *transform) []*ast.Node {
	result := []*ast.Node{tx.expression(tx.call(tx.access(d.session, "finish"), tx.object(d.exports...), tx.boolean(d.boundary)))}
	if tx.options.ZerodepHmr.IsFalse() {
		return result
	}
	hot := tx.access(tx.Factory().NewMetaProperty(ast.KindImportKeyword, tx.Factory().NewIdentifier("meta")), "hot")
	next := tx.unique("next")
	condition := tx.binary(next, ast.KindAmpersandAmpersandToken, tx.Factory().NewPrefixUnaryExpression(ast.KindExclamationToken, tx.call(tx.access(d.session, "accept"), next)))
	invalidate := tx.expression(tx.call(tx.access(hot, "invalidate"), tx.str("zerodep-js 组件导出结构改变，需要重新挂载")))
	callback := tx.arrow(tx.Factory().NewBlock(tx.list(tx.Factory().NewIfStatement(condition, invalidate, nil)), true), next)
	block := tx.Factory().NewBlock(tx.list(tx.expression(tx.call(tx.access(hot, "accept"), callback)), tx.expression(tx.call(tx.access(hot, "prune"), tx.arrow(tx.call(tx.access(d.session, "prune")))))), true)
	return append(result, tx.Factory().NewIfStatement(hot, block, nil))
}
