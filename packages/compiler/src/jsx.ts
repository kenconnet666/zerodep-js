import traverse, { type NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { renderExpression } from './render.js';

type Helper = (name: string, args: t.Expression[]) => t.CallExpression;
type Report = (node: t.Node, code: string, message: string) => void;

/** JSX 先变为惰性描述，再处理变量绑定，避免在组件初始化时读取动态属性。 */
export function transformJsx(
  ast: t.File,
  helper: Helper,
  report: Report,
  decorate?: (node: t.JSXElement, attributes: t.Expression) => t.Expression,
): boolean {
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
        const bindings: t.Expression[] = [];
        const boundNames = new Set<string>();
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
          if (name.startsWith('bind:')) {
            const property = name.slice(5);
            if (!property || !/^[A-Za-z_$][\w$]*$/.test(property)) {
              report(attribute, 'ZJ1400', 'bind 属性需要明确的属性名。');
              continue;
            }
            if (!t.isIdentifier(value) && !t.isMemberExpression(value)) {
              report(attribute, 'ZJ1401', 'bind 需要可以赋值的变量或对象属性。');
              continue;
            }
            if (['key', 'children', 'ref'].includes(property))
              report(attribute, 'ZJ1403', `bind:${property} 不能接管框架保留属性。`);
            if (t.isIdentifier(value)) {
              const binding = path.scope.getBinding(value.name);
              if (!binding || ['const', 'module'].includes(binding.kind))
                report(
                  value,
                  'ZJ1401',
                  'bind 的变量必须是当前可写绑定；对象的可写属性可单独绑定。',
                );
            }
            if (boundNames.has(property))
              report(attribute, 'ZJ1402', `bind:${property} 重复声明。`);
            boundNames.add(property);
            const tag = node.openingElement.name;
            const native = t.isJSXIdentifier(tag) && /^[a-z]/.test(tag.name);
            if (property === 'this') {
              if (!native)
                report(attribute, 'ZJ1403', 'bind:this 只支持 DOM 元素，不提供组件实例。');
              const binding = t.isIdentifier(value) ? path.scope.getBinding(value.name) : undefined;
              if (!binding?.path.isVariableDeclarator())
                report(attribute, 'ZJ1401', 'bind:this 需要可写的变量声明，不支持对象路径或参数。');
              if (
                node.openingElement.attributes.some(
                  (other) =>
                    t.isJSXAttribute(other) && t.isJSXIdentifier(other.name, { name: 'ref' }),
                )
              )
                report(attribute, 'ZJ1404', 'bind:this 与 ref 不能同时声明。');
            } else if (native) {
              if (!(
                (property === 'value' && ['input', 'textarea', 'select'].includes(tag.name)) ||
                (['checked', 'valueAsNumber'].includes(property) && tag.name === 'input')
              ))
                report(attribute, 'ZJ1403', `<${tag.name}> 不支持 bind:${property}。`);
              const owned = property === 'valueAsNumber' ? 'value' : property;
              if (
                node.openingElement.attributes.some(
                  (other) =>
                    t.isJSXAttribute(other) &&
                    t.isJSXIdentifier(other.name) &&
                    [owned, owned === 'checked' ? 'defaultChecked' : 'defaultValue'].includes(
                      other.name.name,
                    ),
                )
              )
                report(attribute, 'ZJ1404', `bind:${property} 与普通模型属性冲突。`);
            }
            const next = path.scope.generateUidIdentifier('value');
            bindings.push(
              t.arrayExpression([
                t.stringLiteral(property),
                t.arrowFunctionExpression([], t.cloneNode(value, true)),
                t.arrowFunctionExpression(
                  [next],
                  t.inherits(
                    t.assignmentExpression('=', t.cloneNode(value, true), t.cloneNode(next)),
                    value,
                  ),
                ),
              ]),
            );
            continue;
          }
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
        const original = helper('props', [t.arrayExpression(sources)]);
        let attributes: t.Expression = bindings.length
          ? helper('bindProps', [original, t.arrayExpression(bindings)])
          : original;
        if (decorate) attributes = decorate(node, attributes);
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
