import type { Binding } from '@babel/traverse';
import * as t from '@babel/types';

/** 公开拼写与编译语义分开，别名/命名空间/诊断共用这张表。 */
export const compilerImports = {
  _state: 'state',
  _derived: 'derived',
  _component: 'component',
  For: 'For',
} as const;
export type CoreRole = (typeof compilerImports)[keyof typeof compilerImports];

export function coreImport(binding: Binding | undefined): CoreRole | undefined {
  const path = binding?.path;
  if (!path?.isImportSpecifier() || path.node.importKind === 'type') return undefined;
  const declaration = path.parentPath;
  if (
    !declaration.isImportDeclaration() ||
    declaration.node.importKind === 'type' ||
    declaration.node.source.value !== 'zerodep-js'
  )
    return undefined;
  const name = path.node.imported;
  const imported = t.isIdentifier(name) ? name.name : name.value;
  return Object.hasOwn(compilerImports, imported)
    ? compilerImports[imported as keyof typeof compilerImports]
    : undefined;
}
