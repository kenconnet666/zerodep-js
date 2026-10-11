import type { NodePath } from '@babel/traverse';
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
