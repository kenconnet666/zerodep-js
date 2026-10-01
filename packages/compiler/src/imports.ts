import type { Binding } from '@babel/traverse';
import * as t from '@babel/types';

export function coreImport(binding: Binding | undefined): string | undefined {
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
  return t.isIdentifier(name) ? name.name : name.value;
}
