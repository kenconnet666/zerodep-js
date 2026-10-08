import { createHash } from 'node:crypto';
import traverse, { type Binding, type NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { coreImport } from './imports.js';

export function isCssCall(path: NodePath): path is NodePath<t.CallExpression> {
  if (!path.isCallExpression() || !t.isIdentifier(path.node.callee)) return false;
  const binding = path.scope.getBinding(path.node.callee.name)?.path;
  if (!binding?.isImportSpecifier() || binding.node.importKind === 'type') return false;
  const imported = binding.node.imported;
  return (
    (t.isIdentifier(imported) ? imported.name : imported.value) === 'css' &&
    binding.parentPath.isImportDeclaration() &&
    binding.parentPath.node.importKind !== 'type' &&
    binding.parentPath.node.source.value === 'zerodep-js/css'
  );
}

function directState(path: NodePath, node: t.Node): boolean {
  if (!t.isIdentifier(node)) return false;
  const init = path.scope.getBinding(node.name)?.path;
  if (!init?.isVariableDeclarator() || !t.isCallExpression(init.node.init)) return false;
  const callee = init.node.init.callee;
  const id = t.isIdentifier(callee)
    ? callee
    : t.isMemberExpression(callee) && t.isIdentifier(callee.object)
      ? callee.object
      : undefined;
  const role = id && coreImport(init.scope.getBinding(id.name));
  return role === 'state' || role === 'derived';
}

function nativeClass(path: NodePath): NodePath<t.JSXElement> | undefined {
  const container = path.parentPath;
  const attribute = container?.parentPath;
  const opening = attribute?.parentPath;
  if (
    !container?.isJSXExpressionContainer() ||
    !attribute?.isJSXAttribute() ||
    !t.isJSXIdentifier(attribute.node.name, { name: 'class' }) ||
    !opening?.isJSXOpeningElement()
  )
    return;
  if (!t.isJSXIdentifier(opening.node.name) || !/^[a-z]/.test(opening.node.name.name)) return;
  // class 之前的展开不会覆盖显式类名；之后的展开仍可能覆盖，保持原来的重算路径。
  if (
    opening.node.attributes
      .slice(opening.node.attributes.indexOf(attribute.node) + 1)
      .some((attr) => t.isJSXSpreadAttribute(attr)) ||
    opening.node.attributes.filter(
      (attr) => t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name, { name: 'class' }),
    ).length !== 1
  )
    return;
  return opening.parentPath as NodePath<t.JSXElement>;
}

/** 在 JSX 降低前确认最终元素；跨组件/别名逃逸继续使用普通字符串重算。 */
export function prepareCss(ast: t.File, program: NodePath<t.Program>, source: string) {
  const namespace = program.scope.generateUidIdentifier('css');
  const call = (name: string, args: t.Expression[]) =>
    t.callExpression(t.memberExpression(t.cloneNode(namespace), t.identifier(name)), args);
  const elements = new WeakMap<t.JSXElement, t.Expression>();
  const records = new WeakSet<t.VariableDeclarator>();
  const identifiers = new WeakSet<t.Node>();
  let count = 0;
  let used = false;
  // 客户端/SSR 即使在不同机器构建，也必须生成相同的元素变量名。
  const file = createHash('sha256')
    .update(source.replace(/\r\n?/g, '\n'))
    .digest('hex')
    .slice(0, 12);
  traverse(ast, {
    CallExpression(path) {
      if (!isCssCall(path)) return;
      const declaration = path.parentPath;
      const binding: Binding | undefined =
        declaration.isVariableDeclarator() && t.isIdentifier(declaration.node.id)
          ? declaration.scope.getBinding(declaration.node.id.name)
          : undefined;
      const inline = nativeClass(path);
      const references =
        binding?.referencePaths.filter(
          (reference) => !reference.findParent((parent) => parent.isTSType()),
        ) ?? [];
      const targets = inline ? [inline] : references.map(nativeClass);
      // 模块顶层 css 是普通共享声明；组件内命名声明由后续阶段统一建立派生。
      if (
        (!inline && (!binding || !path.getFunctionParent() || !binding.constant)) ||
        !targets.length ||
        targets.some((target) => !target)
      )
        return;
      let slot = 0;
      const site = count++;
      const parts = path.node.arguments.map((argument) => {
        if (
          !t.isCallExpression(argument) ||
          argument.arguments.length !== 1 ||
          !directState(path, argument.arguments[0]!)
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
      if (inline) {
        elements.set(inline.node, result);
        // 原 class 不再求值；cssProps 用同一个派生结果生成 class 和 style。
        path.replaceWith(t.stringLiteral(''));
      } else if (binding && declaration.isVariableDeclarator()) {
        records.add(declaration.node);
        path.replaceWith(result);
        for (let index = 0; index < references.length; index++) {
          const id = t.identifier(binding.identifier.name);
          identifiers.add(id);
          const read = t.callExpression(t.memberExpression(id, t.identifier('read')), []);
          elements.set(targets[index]!.node, read);
          references[index]!.replaceWith(t.stringLiteral(''));
        }
      }
      path.skip();
    },
  });
  if (used)
    program.unshiftContainer(
      'body',
      t.importDeclaration(
        [t.importNamespaceSpecifier(namespace)],
        t.stringLiteral('zerodep-js/css/internal'),
      ),
    );
  return { elements, records, identifiers, call };
}
