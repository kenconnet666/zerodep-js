import { createHash } from 'node:crypto';
import traverse, { type NodePath } from '@babel/traverse';
import * as t from '@babel/types';

export function isCssCall(path: NodePath): path is NodePath<t.CallExpression> {
  if (!path.isCallExpression() || !t.isIdentifier(path.node.callee)) return false;
  const binding = path.scope.getBinding(path.node.callee.name)?.path;
  if (!binding?.isImportSpecifier() || binding.node.importKind === 'type') return false;
  const imported = binding.node.imported;
  return (
    (t.isIdentifier(imported) ? imported.name : imported.value) === 'css' &&
    binding.parentPath.isImportDeclaration() &&
    binding.parentPath.node.importKind !== 'type' &&
    binding.parentPath.node.source.value === 'zerodep-js-css'
  );
}

/** undefined 表示不接管；false 为字面量，true 表示运行时输入（包括参数和快照）。
 * 同步计算仍在原位置整体求值一次；此判断只影响变量优化，不决定依赖跟踪。
 */
function variableValue(node: t.Node): boolean | undefined {
  if (t.isIdentifier(node)) return node.name !== 'undefined';
  if (
    t.isNumericLiteral(node) ||
    t.isStringLiteral(node) ||
    t.isBooleanLiteral(node) ||
    t.isNullLiteral(node) ||
    t.isBigIntLiteral(node)
  )
    return false;
  if (t.isTSAsExpression(node) || t.isTSSatisfiesExpression(node) || t.isTSNonNullExpression(node))
    return variableValue(node.expression);
  if (t.isUnaryExpression(node) && ['+', '-', '!', '~'].includes(node.operator))
    return variableValue(node.argument);
  if (
    t.isMemberExpression(node) ||
    t.isOptionalMemberExpression(node) ||
    t.isCallExpression(node) ||
    t.isOptionalCallExpression(node) ||
    t.isTemplateLiteral(node)
  ) {
    let unsupported = false;
    t.traverseFast(node, (child) => {
      if (
        t.isAwaitExpression(child) ||
        t.isYieldExpression(child) ||
        t.isAssignmentExpression(child) ||
        t.isUpdateExpression(child)
      )
        unsupported = true;
    });
    return unsupported ? undefined : true;
  }
  let parts: t.Node[];
  if (
    (t.isBinaryExpression(node) && !['in', 'instanceof'].includes(node.operator)) ||
    t.isLogicalExpression(node)
  )
    parts = [node.left, node.right];
  else if (t.isConditionalExpression(node)) parts = [node.test, node.consequent, node.alternate];
  else return undefined;
  const values = parts.map((part) => variableValue(part));
  return values.includes(undefined) ? undefined : values.some(Boolean);
}

/** 所有隐式绑定都携带样式结果，原生渲染统一展开；不追踪跨组件调用链。 */
export function prepareCss(ast: t.File, program: NodePath<t.Program>, source: string) {
  const namespace = program.scope.generateUidIdentifier('css');
  const call = (name: string, args: t.Expression[]) =>
    t.callExpression(t.memberExpression(t.cloneNode(namespace), t.identifier(name)), args);
  const records = new WeakSet<t.VariableDeclarator>();
  let count = 0;
  let used = false;
  let file: string | undefined;
  traverse(ast, {
    CallExpression(path) {
      if (!isCssCall(path)) return;
      const declaration = path.parentPath;
      // 模块顶层普通 css 不建立组件绑定；JSX 内的调用按元素求值。
      if (
        !path.getFunctionParent() &&
        !path.findParent((parent) => parent.isJSXExpressionContainer())
      )
        return;
      // 只有存在可接管的 CSS 调用才计算；客户端/SSR 仍按相同源码生成变量名。
      file ??= createHash('sha256')
        .update(source.replace(/\r\n?/g, '\n'))
        .digest('hex')
        .slice(0, 12);
      let slot = 0;
      const site = count++;
      const parts = path.node.arguments.map((argument) => {
        // 主题成员保留原读取及 class 重算，不建立元素变量。
        if (
          !t.isCallExpression(argument) ||
          argument.arguments.length !== 1 ||
          variableValue(argument.arguments[0]!) !== true
        )
          return argument;
        const method = argument.callee;
        if (
          !t.isMemberExpression(method) ||
          method.computed ||
          !t.isIdentifier(method.property) ||
          !t.isMemberExpression(method.object) ||
          method.object.computed ||
          !t.isIdentifier(method.object.property) ||
          !t.isIdentifier(method.object.object)
        )
          return argument;
        return t.inherits(
          call('cssBinding', [
            method.object.object,
            t.stringLiteral(method.object.property.name),
            t.stringLiteral(method.property.name),
            t.arrowFunctionExpression([], argument.arguments[0] as t.Expression),
            t.stringLiteral(`--zj-${file}-${site}-${slot++}`),
          ]),
          argument,
        );
      });
      if (!slot || parts.some((part) => !t.isExpression(part))) return;
      used = true;
      const result = t.inherits(
        call('cssResult', [
          path.node.callee as t.Expression,
          t.arrayExpression(parts as t.Expression[]),
        ]),
        path.node,
      );
      if (declaration.isVariableDeclarator()) records.add(declaration.node);
      path.replaceWith(result);
      path.skip();
    },
  });
  if (used)
    program.unshiftContainer(
      'body',
      t.importDeclaration(
        [t.importNamespaceSpecifier(namespace)],
        t.stringLiteral('zerodep-js-css'),
      ),
    );
  return { records };
}
