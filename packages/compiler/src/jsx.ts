import traverse, { type NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { renderExpression } from './render.js';

type Helper = (name: string, args: t.Expression[]) => t.CallExpression;

/** JSX 先变为惰性描述，再处理变量绑定，避免在组件初始化时读取动态属性。 */
export function transformJsx(ast: t.File, helper: Helper): boolean {
  let transformed = false;
  const templates = new WeakSet<t.Node>();
  function tagName(
    node: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName,
  ): t.Expression {
    if (t.isJSXNamespacedName(node))
      return t.stringLiteral(`${node.namespace.name}:${node.name.name}`);
    if (t.isJSXMemberExpression(node))
      return t.memberExpression(tagName(node.object), t.identifier(node.property.name));
    return t.inherits(t.identifier(node.name), node);
  }

  function children(node: t.JSXElement | t.JSXFragment): t.Expression[] {
    return t.react.buildChildren(node).map((child) => {
      if (t.isJSXSpreadChild(child))
        return helper('dynamic', [t.arrowFunctionExpression([], child.expression)]);
      if (t.isStringLiteral(child)) return child;
      if (t.isArrowFunctionExpression(child) || t.isFunctionExpression(child)) return child;
      if (templates.has(child)) return child as t.Expression;
      return renderExpression(child as t.Expression, helper);
    });
  }

  function replace(path: NodePath<t.JSXElement | t.JSXFragment>, next: t.Expression): void {
    templates.add(next);
    path.replaceWith(t.inherits(next, path.node));
    transformed = true;
  }

  traverse(ast, {
    JSXElement: {
      exit(path) {
        const node = path.node;
        const sources: t.Expression[] = [];
        let chunk: t.ObjectProperty[] = [];
        const flush = () => {
          if (chunk.length) sources.push(t.objectExpression(chunk));
          chunk = [];
        };
        for (const attribute of node.openingElement.attributes) {
          if (t.isJSXSpreadAttribute(attribute)) {
            flush();
            sources.push(t.arrowFunctionExpression([], attribute.argument));
            continue;
          }
          const name = t.isJSXNamespacedName(attribute.name)
            ? `${attribute.name.namespace.name}:${attribute.name.name.name}`
            : attribute.name.name;
          const attributeValue = attribute.value;
          let value: t.Expression;
          if (attributeValue === null) value = t.booleanLiteral(true);
          else if (t.isJSXExpressionContainer(attributeValue)) {
            if (t.isJSXEmptyExpression(attributeValue.expression)) continue;
            value = attributeValue.expression;
          } else value = attributeValue as t.Expression;
          chunk.push(
            t.objectProperty(
              t.stringLiteral(name),
              t.arrowFunctionExpression([], value),
              name === '__proto__',
            ),
          );
        }
        const content = children(node);
        if (content.length)
          chunk.push(
            t.objectProperty(
              t.stringLiteral('children'),
              t.arrowFunctionExpression(
                [],
                content.length === 1 ? content[0]! : t.arrayExpression(content),
              ),
            ),
          );
        flush();
        const tag = node.openingElement.name;
        const native = t.isJSXIdentifier(tag) && /^[a-z]/.test(tag.name);
        const tagValue = native ? t.stringLiteral(tag.name) : tagName(tag);
        const attributes = helper('props', [t.arrayExpression(sources)]);
        const hasKey = node.openingElement.attributes.some(
          (attribute) =>
            t.isJSXSpreadAttribute(attribute) ||
            (t.isJSXAttribute(attribute) && t.isJSXIdentifier(attribute.name, { name: 'key' })),
        );
        replace(
          path,
          native && !hasKey
            ? helper('element', [tagValue, attributes])
            : helper('dynamicElement', [t.arrowFunctionExpression([], tagValue), attributes]),
        );
      },
    },
    JSXFragment: {
      exit(path) {
        replace(path, helper('fragment', [t.arrayExpression(children(path.node))]));
      },
    },
  });
  return transformed;
}
