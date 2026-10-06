package zerodep

import (
	"fmt"
	"sort"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
)

type guard struct{ test, owner *ast.Node }

func functionParent(node *ast.Node) *ast.Node {
	for p := node.Parent; p != nil; p = p.Parent {
		if ast.IsFunctionLike(p) {
			return p
		}
	}
	return nil
}
func owner(node *ast.Node) *ast.Node {
	fn := functionParent(node)
	for fn != nil && inlineFunction(fn) {
		p := fn.Parent
		child := fn
		for p != nil && ast.IsParenthesizedExpression(p) {
			child = p
			p = p.Parent
		}
		if p == nil || !ast.IsCallExpression(p) || p.Expression() != child {
			break
		}
		fn = functionParent(fn)
	}
	return fn
}
func within(node, root *ast.Node) bool {
	for n := node; n != nil; n = n.Parent {
		if n == root {
			return true
		}
	}
	return false
}
func terminates(node *ast.Node) bool {
	if node == nil {
		return false
	}
	if ast.IsReturnStatement(node) || ast.IsThrowStatement(node) {
		return true
	}
	if ast.IsBlock(node) {
		s := node.AsBlock().Statements.Nodes
		return len(s) > 0 && terminates(s[len(s)-1])
	}
	return false
}
func unwrap(node *ast.Node) *ast.Node {
	for node != nil && (ast.IsParenthesizedExpression(node) || ast.IsAsExpression(node) || ast.IsNonNullExpression(node) || ast.IsSatisfiesExpression(node) || ast.IsTypeAssertion(node)) {
		node = node.Expression()
	}
	return node
}

func (a *Analysis) related(node, decl *ast.Node, seen map[*ast.Node]bool) bool {
	found := false
	walk(node, func(part *ast.Node) bool {
		if ast.IsCallExpression(part) {
			m := a.macro(part.Expression())
			if m.role == "_state" || m.role == "_derived" {
				return false
			}
		}
		if ast.IsFunctionLike(part) || isType(part) {
			return false
		}
		if reference(part) {
			current := a.declaration(part)
			if current == decl {
				found = true
				return false
			}
			if current != nil && !seen[current] && constDeclaration(current) && current.Initializer() != nil {
				seen[current] = true
				if a.related(current.Initializer(), decl, seen) {
					found = true
				}
			}
		}
		return !found
	})
	return found
}
func (a *Analysis) guards(reference, decl *ast.Node) []guard {
	var result []guard
	add := func(test *ast.Node) {
		if test != nil && a.related(test, decl, map[*ast.Node]bool{}) {
			result = append(result, guard{test, owner(test)})
		}
	}
	for child, parent := reference, reference.Parent; parent != nil; child, parent = parent, parent.Parent {
		switch parent.Kind {
		case ast.KindIfStatement:
			if child != parent.AsIfStatement().Expression {
				add(parent.AsIfStatement().Expression)
			}
		case ast.KindConditionalExpression:
			if child != parent.AsConditionalExpression().Condition {
				add(parent.AsConditionalExpression().Condition)
			}
		case ast.KindBinaryExpression:
			if ast.IsLogicalOrCoalescingBinaryExpression(parent) && child == parent.AsBinaryExpression().Right {
				add(parent.AsBinaryExpression().Left)
			}
		case ast.KindCaseClause, ast.KindDefaultClause:
			if parent.Parent != nil && parent.Parent.Parent != nil && ast.IsSwitchStatement(parent.Parent.Parent) {
				add(parent.Parent.Parent.AsSwitchStatement().Expression)
			}
		}
		var statements []*ast.Node
		if ast.IsBlock(parent) {
			statements = parent.AsBlock().Statements.Nodes
		}
		if ast.IsSourceFile(parent) {
			statements = parent.AsSourceFile().Statements.Nodes
		}
		for _, statement := range statements {
			if statement == child {
				break
			}
			if ast.IsIfStatement(statement) {
				s := statement.AsIfStatement()
				if terminates(s.ThenStatement) || terminates(s.ElseStatement) {
					add(s.Expression)
				}
			}
		}
	}
	return result
}
func (a *Analysis) predicate(node, decl *ast.Node, seen map[*ast.Node]bool) string {
	node = unwrap(node)
	if node == nil {
		return "nil"
	}
	if ast.IsIdentifier(node) {
		if !reference(node) {
			return "property:" + node.Text()
		}
		current := a.declaration(node)
		if current == decl {
			return "$live"
		}
		if current != nil && constDeclaration(current) && !seen[current] && current.Initializer() != nil && !ast.IsFunctionLike(current.Initializer()) {
			next := map[*ast.Node]bool{}
			for key := range seen {
				next[key] = true
			}
			next[current] = true
			return a.predicate(current.Initializer(), decl, next)
		}
		pos := -1
		if current != nil {
			pos = current.Pos()
		}
		return fmt.Sprintf("name:%s:%d", node.Text(), pos)
	}
	if ast.IsPrefixUnaryExpression(node) && node.AsPrefixUnaryExpression().Operator == ast.KindExclamationToken {
		return a.predicate(node.AsPrefixUnaryExpression().Operand, decl, seen)
	}
	if ast.IsBinaryExpression(node) {
		b := node.AsBinaryExpression()
		switch b.OperatorToken.Kind {
		case ast.KindEqualsEqualsToken, ast.KindEqualsEqualsEqualsToken, ast.KindExclamationEqualsToken, ast.KindExclamationEqualsEqualsToken:
			parts := []string{a.predicate(b.Left, decl, seen), a.predicate(b.Right, decl, seen)}
			sort.Strings(parts)
			return "equals(" + strings.Join(parts, ",") + ")"
		}
	}
	var parts []string
	node.ForEachChild(func(child *ast.Node) bool {
		if !isType(child) {
			parts = append(parts, a.predicate(child, decl, seen))
		}
		return false
	})
	text := ""
	if ast.IsStringLiteral(node) || ast.IsNumericLiteral(node) || ast.IsBigIntLiteral(node) {
		text = node.Text()
	}
	if ast.IsPrefixUnaryExpression(node) {
		text = node.AsPrefixUnaryExpression().Operator.String()
	}
	return fmt.Sprintf("%d:%s(%s)", node.Kind, text, strings.Join(parts, ","))
}

func (a *Analysis) renderRegion(node *ast.Node) *ast.Node {
	fn := owner(node)
	var region *ast.Node
	for part := node; part != nil && part != fn; part = part.Parent {
		if a.renderRoots[part] {
			region = part
		}
	}
	return region
}
func (a *Analysis) checkGuards() {
	awaits := map[*ast.Node][]int{}
	walk(a.file.AsNode(), func(node *ast.Node) bool {
		if isType(node) {
			return false
		}
		if ast.IsAwaitExpression(node) || ast.IsYieldExpression(node) {
			fn := functionParent(node)
			awaits[fn] = append(awaits[fn], node.Pos())
		}
		if ast.IsJsxExpression(node) && node.Expression() != nil {
			a.renderRoots[node.Expression()] = true
		}
		if ast.IsJsxSpreadAttribute(node) {
			a.renderRoots[node.Expression()] = true
		}
		if ast.IsReturnStatement(node) && node.Expression() != nil {
			fn := functionParent(node)
			if a.setups[fn] != nil || a.loops[fn] {
				a.renderRoots[node.Expression()] = true
			}
		}
		if ast.IsArrowFunction(node) && !ast.IsBlock(node.Body()) && (a.setups[node] != nil || a.loops[node]) {
			a.renderRoots[node.Body()] = true
		}
		return true
	})
	stale := func(g guard, reference *ast.Node) bool {
		for _, point := range awaits[owner(reference)] {
			if point > g.test.Pos() && point < reference.Pos() {
				return true
			}
		}
		return false
	}
	outside := func(g guard, region *ast.Node) bool { return region != nil && !within(g.test, region) }
	var inCheck func(*ast.Node, *ast.Node, []string, *ast.Node) bool
	inCheck = func(ref, decl *ast.Node, required []string, snapshotOwner *ast.Node) bool {
		fn := owner(ref)
		region := a.renderRegion(ref)
		candidates := a.guards(ref, decl)
		safe := true
		for path := ref; path != nil && path != fn; path = path.Parent {
			parent := path.Parent
			if parent == nil {
				break
			}
			if ast.IsPropertyAccessExpression(parent) || ast.IsElementAccessExpression(parent) || ast.IsCallExpression(parent) {
				safe = false
			}
			isTest := (ast.IsIfStatement(parent) && parent.AsIfStatement().Expression == path) || (ast.IsConditionalExpression(parent) && parent.AsConditionalExpression().Condition == path) || (ast.IsLogicalOrCoalescingBinaryExpression(parent) && parent.AsBinaryExpression().Left == path)
			if isTest {
				if safe {
					return true
				}
				candidates = append(candidates, guard{path, fn})
			}
		}
		available := map[string]bool{}
		for _, g := range candidates {
			if (g.owner == fn || (snapshotOwner != nil && g.owner == snapshotOwner)) && (snapshotOwner != nil || (!outside(g, region) && !stale(g, ref))) {
				available[a.predicate(g.test, decl, map[*ast.Node]bool{})] = true
			}
		}
		for _, key := range required {
			if !available[key] {
				return false
			}
		}
		return true
	}
	for decl, b := range a.bindings {
		if b.kind == propsBinding || b.kind == restBinding || (b.kind == stateBinding && b.readonly) {
			continue
		}
		for _, ref := range a.refs[decl] {
			if within(ref, b.decl.Name()) || a.consumed[ref] {
				continue
			}
			fn := owner(ref)
			region := a.renderRegion(ref)
			required := []string{}
			for _, g := range a.guards(ref, decl) {
				if g.owner != fn || outside(g, region) || stale(g, ref) {
					required = append(required, a.predicate(g.test, decl, map[*ast.Node]bool{}))
				}
			}
			if len(required) == 0 || inCheck(ref, decl, required, nil) {
				continue
			}
			localSafe := false
			p := ref.Parent
			if p != nil && constDeclaration(p) && p.Initializer() == ref && ast.IsIdentifier(p.Name()) && len(a.refs[p]) > 0 {
				localSafe = true
				for _, use := range a.refs[p] {
					if !inCheck(use, decl, required, fn) {
						localSafe = false
						break
					}
				}
			}
			if !localSafe {
				a.report(ref, 1501, "实时绑定不能在延后渲染、回调或 await 后沿用外层收窄；请在当前表达式或回调重新读取并检查，或显式捕获稳定快照。")
			}
		}
	}
}
