import type { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

type Helper = (name: string, args: t.Expression[]) => t.CallExpression;
const templates = new Set([
  'element',
  'dynamicElement',
  'fragment',
  'dynamic',
  'conditional',
  'logical',
]);

/** 分支只订阅选择结果，避免无关字段刷新时重新创建同一分支的组件。 */
export function renderExpression(expression: t.Expression, helper: Helper): t.Expression {
  const namespace = helper('dynamic', []).callee;
  if (
    t.isCallExpression(expression) &&
    t.isMemberExpression(expression.callee) &&
    t.isMemberExpression(namespace) &&
    t.isIdentifier(expression.callee.object) &&
    t.isIdentifier(namespace.object, { name: expression.callee.object.name }) &&
    t.isIdentifier(expression.callee.property) &&
    templates.has(expression.callee.property.name)
  )
    return expression;
  const wrap = (value: t.Expression) => t.arrowFunctionExpression([], value);
  let result: t.Expression;
  if (t.isConditionalExpression(expression)) {
    result = helper('conditional', [
      wrap(expression.test),
      wrap(renderExpression(expression.consequent, helper)),
      wrap(renderExpression(expression.alternate, helper)),
    ]);
  } else if (t.isLogicalExpression(expression)) {
    result = helper('logical', [
      t.stringLiteral(expression.operator),
      wrap(expression.left),
      wrap(renderExpression(expression.right, helper)),
    ]);
  } else if (t.isArrayExpression(expression)) {
    result = helper('fragment', [
      t.arrayExpression(
        expression.elements.map((item) =>
          item === null
            ? t.nullLiteral()
            : renderExpression(t.isSpreadElement(item) ? item.argument : item, helper),
        ),
      ),
    ]);
  } else if (
    t.isStringLiteral(expression) ||
    t.isNumericLiteral(expression) ||
    t.isBooleanLiteral(expression) ||
    t.isNullLiteral(expression) ||
    t.isBigIntLiteral(expression)
  )
    return expression;
  else result = helper('dynamic', [wrap(expression)]);
  return t.inherits(result, expression);
}

export function transformReturns(
  path: NodePath<t.ArrowFunctionExpression | t.FunctionExpression>,
  helper: Helper,
): void {
  if (!t.isBlockStatement(path.node.body)) {
    path.node.body = renderExpression(path.node.body, helper);
    return;
  }
  path.traverse({
    Function(child) {
      child.skip();
    },
    ReturnStatement(statement) {
      if (statement.node.argument)
        statement.node.argument = renderExpression(statement.node.argument, helper);
    },
  });
}
