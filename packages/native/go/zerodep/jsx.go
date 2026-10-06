package zerodep

import (
	"html"
	"regexp"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
)

func jsxParts(node *ast.Node) (tag *ast.Node, attributes, children []*ast.Node) {
	if ast.IsJsxFragment(node) {
		return nil, nil, node.AsJsxFragment().Children.Nodes
	}
	if ast.IsJsxSelfClosingElement(node) {
		e := node.AsJsxSelfClosingElement()
		return e.TagName, e.Attributes.AsJsxAttributes().Properties.Nodes, nil
	}
	e := node.AsJsxElement()
	opening := e.OpeningElement.AsJsxOpeningElement()
	return opening.TagName, opening.Attributes.AsJsxAttributes().Properties.Nodes, e.Children.Nodes
}
func jsxName(node *ast.Node) string {
	if ast.IsJsxNamespacedName(node) {
		n := node.AsJsxNamespacedName()
		return n.Namespace.Text() + ":" + n.Name().Text()
	}
	return node.Text()
}
func attributeValue(node *ast.Node) *ast.Node {
	value := node.Initializer()
	if value != nil && ast.IsJsxExpression(value) {
		return value.Expression()
	}
	return value
}

var bindingName = regexp.MustCompile(`^[A-Za-z_$][\w$]*$`)

func (a *Analysis) collectJSX(node *ast.Node) {
	tag, attributes, children := jsxParts(node)
	for _, child := range children {
		if ast.IsJsxExpression(child) && child.Expression() != nil {
			a.renderRoots[child.Expression()] = true
		}
	}
	if tag == nil {
		return
	}
	if a.macro(tag).role == "For" {
		var content []*ast.Node
		for _, child := range children {
			if ast.IsJsxText(child) && trimJSX(child.AsJsxText().Text) == "" {
				continue
			}
			if ast.IsJsxExpression(child) && child.Expression() == nil {
				continue
			}
			content = append(content, child)
		}
		var callback *ast.Node
		if len(content) == 1 && ast.IsJsxExpression(content[0]) {
			callback = content[0].Expression()
		}
		if len(content) == 0 {
			for _, attr := range attributes {
				if ast.IsJsxAttribute(attr) && jsxName(attr.Name()) == "children" {
					callback = attributeValue(attr)
				}
			}
		}
		valid := inlineFunction(callback)
		if valid {
			if len(callback.Parameters()) > 2 {
				valid = false
			}
			for _, param := range callback.Parameters() {
				if !ast.IsIdentifier(param.Name()) || param.Initializer() != nil || param.AsParameterDeclaration().DotDotDotToken != nil {
					valid = false
				}
			}
		}
		if !valid {
			a.report(node, 1400, "For 使用内联同步回调 (row, index) => ...，参数保持普通标识符；复用呈现请放入组件。")
		} else {
			a.loops[callback] = true
			for _, param := range callback.Parameters() {
				a.bindings[param] = &binding{kind: forBinding, decl: param, readonly: true}
			}
		}
	}
	bound := map[string]bool{}
	for _, attr := range attributes {
		if !ast.IsJsxAttribute(attr) {
			continue
		}
		name := jsxName(attr.Name())
		if !strings.HasPrefix(name, "bind:") {
			continue
		}
		property := strings.TrimPrefix(name, "bind:")
		value := attributeValue(attr)
		if !bindingName.MatchString(property) {
			a.report(attr, 1400, "bind 属性需要明确的属性名。")
			continue
		}
		if value == nil || (!ast.IsIdentifier(value) && !ast.IsPropertyAccessExpression(value) && !ast.IsElementAccessExpression(value)) {
			a.report(attr, 1401, "bind 需要可以赋值的变量或对象属性。")
			continue
		}
		if contains([]string{"key", "children", "ref"}, property) {
			a.report(attr, 1403, "bind 不能接管框架保留属性。")
		}
		if ast.IsIdentifier(value) {
			decl := a.declaration(value)
			if decl == nil || constDeclaration(decl) || ast.IsImportSpecifier(decl) || ast.IsNamespaceImport(decl) {
				a.report(value, 1401, "bind 的变量必须是当前可写绑定；对象的可写属性可单独绑定。")
			}
			a.checkWrite(value, value)
		}
		if bound[property] {
			a.report(attr, 1402, "bind:"+property+" 重复声明。")
		}
		bound[property] = true
		if ast.IsIdentifier(tag) && nativeTag(tag.Text()) {
			if !((property == "value" && contains([]string{"input", "textarea", "select"}, tag.Text())) || (contains([]string{"checked", "valueAsNumber"}, property) && tag.Text() == "input")) {
				a.report(attr, 1403, "<"+tag.Text()+"> 不支持 bind:"+property+"。")
			}
			owned := property
			if owned == "valueAsNumber" {
				owned = "value"
			}
			defaultName := "defaultValue"
			if owned == "checked" {
				defaultName = "defaultChecked"
			}
			for _, other := range attributes {
				if ast.IsJsxAttribute(other) && contains([]string{owned, defaultName}, jsxName(other.Name())) {
					a.report(attr, 1404, "bind:"+property+" 与普通模型属性冲突。")
				}
			}
		}
	}
}

// 与 JSX 文本规则一致：去掉换行缩进，不裁掉首尾同行文本的有效空格。
func cleanJSXText(text string) string {
	lines := strings.Split(strings.ReplaceAll(strings.ReplaceAll(text, "\r\n", "\n"), "\r", "\n"), "\n")
	last := 0
	for i, line := range lines {
		if strings.Trim(line, " \t") != "" {
			last = i
		}
	}
	var result strings.Builder
	for i, line := range lines {
		line = strings.ReplaceAll(line, "\t", " ")
		if i != 0 {
			line = strings.TrimLeft(line, " ")
		}
		if i != len(lines)-1 {
			line = strings.TrimRight(line, " ")
		}
		if line != "" {
			result.WriteString(line)
			if i != last {
				result.WriteByte(' ')
			}
		}
	}
	return html.UnescapeString(result.String())
}

func (tx *transform) jsxChildren(children []*ast.Node) []*ast.Node {
	var result []*ast.Node
	for _, child := range children {
		if ast.IsJsxText(child) {
			text := cleanJSXText(child.AsJsxText().Text)
			if text != "" {
				result = append(result, tx.origin(tx.str(text), child))
			}
			continue
		}
		if ast.IsJsxExpression(child) {
			expression := child.Expression()
			if expression == nil {
				continue
			}
			if child.AsJsxExpression().DotDotDotToken != nil {
				result = append(result, tx.helper("dynamic", tx.arrow(tx.visit(expression))))
				continue
			}
			if ast.IsArrowFunction(expression) || ast.IsFunctionExpression(expression) {
				result = append(result, tx.visit(expression))
			} else {
				result = append(result, tx.renderExpression(expression))
			}
			continue
		}
		result = append(result, tx.visit(child))
	}
	return result
}

func (tx *transform) jsx(node *ast.Node) *ast.Node {
	tag, attributes, children := jsxParts(node)
	if tag == nil {
		return tx.template(tx.helper("fragment", tx.array(tx.jsxChildren(children)...)), node)
	}
	var sources, chunk, bindings []*ast.Node
	flush := func() {
		if len(chunk) > 0 {
			sources = append(sources, tx.object(chunk...))
			chunk = nil
		}
	}
	hasKey := false
	for _, attr := range attributes {
		if ast.IsJsxSpreadAttribute(attr) {
			flush()
			hasKey = true
			sources = append(sources, tx.arrow(tx.visit(attr.Expression())))
			continue
		}
		name := jsxName(attr.Name())
		original := attributeValue(attr)
		var value *ast.Node
		if original == nil {
			if attr.Initializer() != nil {
				continue
			}
			value = tx.boolean(true)
		} else if ast.IsStringLiteral(original) {
			value = tx.str(html.UnescapeString(original.Text()))
		} else {
			value = tx.visit(original)
		}
		if name == "key" {
			hasKey = true
		}
		if strings.HasPrefix(name, "bind:") {
			next := tx.unique("value")
			bindings = append(bindings, tx.array(tx.str(strings.TrimPrefix(name, "bind:")), tx.arrow(value), tx.arrow(tx.origin(tx.write(original, next), original), next)))
			continue
		}
		chunk = append(chunk, tx.property(name, tx.arrow(value)))
	}
	content := tx.jsxChildren(children)
	if len(content) > 0 {
		value := content[0]
		if len(content) > 1 {
			value = tx.array(content...)
		}
		chunk = append(chunk, tx.property("children", tx.arrow(value)))
	}
	flush()
	props := tx.helper("props", tx.array(sources...))
	if len(bindings) > 0 {
		props = tx.helper("bindProps", props, tx.array(bindings...))
	}
	native := ast.IsIdentifier(tag) && nativeTag(tag.Text())
	var name *ast.Node
	if native || ast.IsJsxNamespacedName(tag) {
		name = tx.str(jsxName(tag))
	} else {
		name = tx.visit(tag)
	}
	if native && !hasKey {
		return tx.template(tx.helper("element", name, props), node)
	}
	return tx.template(tx.helper("dynamicElement", tx.arrow(name), props), node)
}

func (tx *transform) template(value, original *ast.Node) *ast.Node {
	tx.templates[value] = true
	return tx.origin(value, original)
}

func (tx *transform) renderExpression(node *ast.Node) *ast.Node {
	if ast.IsParenthesizedExpression(node) || ast.IsAsExpression(node) || ast.IsSatisfiesExpression(node) || ast.IsNonNullExpression(node) || ast.IsTypeAssertion(node) {
		return tx.renderExpression(node.Expression())
	}
	if ast.IsJsxElement(node) || ast.IsJsxSelfClosingElement(node) || ast.IsJsxFragment(node) {
		return tx.visit(node)
	}
	if ast.IsConditionalExpression(node) {
		c := node.AsConditionalExpression()
		return tx.template(tx.helper("conditional", tx.arrow(tx.visit(c.Condition)), tx.arrow(tx.renderExpression(c.WhenTrue)), tx.arrow(tx.renderExpression(c.WhenFalse))), node)
	}
	if ast.IsBinaryExpression(node) {
		b := node.AsBinaryExpression()
		op := ""
		switch b.OperatorToken.Kind {
		case ast.KindAmpersandAmpersandToken:
			op = "&&"
		case ast.KindBarBarToken:
			op = "||"
		case ast.KindQuestionQuestionToken:
			op = "??"
		}
		if op != "" {
			return tx.template(tx.helper("logical", tx.str(op), tx.arrow(tx.visit(b.Left)), tx.arrow(tx.renderExpression(b.Right))), node)
		}
	}
	if ast.IsArrayLiteralExpression(node) {
		var children []*ast.Node
		for _, item := range node.AsArrayLiteralExpression().Elements.Nodes {
			if ast.IsOmittedExpression(item) {
				children = append(children, tx.null())
			} else {
				if ast.IsSpreadElement(item) {
					item = item.Expression()
				}
				children = append(children, tx.renderExpression(item))
			}
		}
		return tx.template(tx.helper("fragment", tx.array(children...)), node)
	}
	value := tx.visit(node)
	switch node.Kind {
	case ast.KindStringLiteral, ast.KindNumericLiteral, ast.KindBigIntLiteral, ast.KindTrueKeyword, ast.KindFalseKeyword, ast.KindNullKeyword:
		return value
	}
	if tx.templates[value] {
		return value
	}
	return tx.template(tx.helper("dynamic", tx.arrow(value)), node)
}
