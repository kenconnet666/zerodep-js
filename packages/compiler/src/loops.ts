import traverse, { type NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { coreImport } from './imports.js';
import { transformReturns } from './render.js';

type Callback = t.ArrowFunctionExpression | t.FunctionExpression;
type Report = (node: t.Node, code: string, message: string) => void;

export function collectForCallbacks(ast: t.File, report: Report): Set<Callback> {
  const callbacks = new Set<Callback>();
  traverse(ast, {
    JSXElement(path) {
      const tag = path.node.openingElement.name;
      if (!t.isJSXIdentifier(tag) || coreImport(path.scope.getBinding(tag.name)) !== 'For') return;
      const children = path.node.children.filter(
        (child) =>
          !(t.isJSXText(child) && !child.value.trim()) &&
          !(t.isJSXExpressionContainer(child) && t.isJSXEmptyExpression(child.expression)),
      );
      const attribute = path.node.openingElement.attributes.find(
        (item) => t.isJSXAttribute(item) && t.isJSXIdentifier(item.name, { name: 'children' }),
      );
      const value =
        children.length === 1 && t.isJSXExpressionContainer(children[0])
          ? children[0].expression
          : !children.length &&
              t.isJSXAttribute(attribute) &&
              t.isJSXExpressionContainer(attribute.value)
            ? attribute.value.expression
            : undefined;
      if (
        (!t.isArrowFunctionExpression(value) && !t.isFunctionExpression(value)) ||
        value.async ||
        value.generator ||
        value.params.length > 2 ||
        value.params.some((parameter) => !t.isIdentifier(parameter))
      ) {
        report(
          path.node,
          'ZJ1400',
          'For 使用内联同步回调 (row, index) => ...，参数保持普通标识符；复用呈现请放入组件。',
        );
        return;
      }
      callbacks.add(value);
    },
  });
  return callbacks;
}

export function transformForCallbacks(
  ast: t.File,
  callbacks: Set<Callback>,
  helper: (name: string, args: t.Expression[]) => t.CallExpression,
  report: Report,
): void {
  function transform(path: NodePath<Callback>): void {
    if (!callbacks.has(path.node)) return;
    callbacks.delete(path.node);
    for (const parameter of path.node.params) {
      if (!t.isIdentifier(parameter)) continue;
      const binding = path.scope.getBinding(parameter.name)!;
      if (binding.constantViolations.length) {
        for (const violation of binding.constantViolations)
          report(violation.node, 'ZJ1401', 'For 的 row/index 是只读实时绑定，不能重新赋值。');
        continue;
      }
      for (const reference of binding.referencePaths) {
        if (reference.findParent((parent) => parent.isTSType())) continue;
        if (reference.parentPath.isObjectProperty() && reference.parentPath.node.shorthand)
          reference.parentPath.node.shorthand = false;
        reference.replaceWith(
          t.inherits(t.callExpression(t.identifier(parameter.name), []), reference.node),
        );
      }
    }
    transformReturns(path, helper);
    path.replaceWith(helper('liveRender', [path.node]));
  }
  traverse(ast, {
    ArrowFunctionExpression: { exit: transform },
    FunctionExpression: { exit: transform },
  });
}
