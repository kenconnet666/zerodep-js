import type { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { compilerImports } from './imports.js';

const special = new Set(Object.keys(compilerImports));

/** 静态命名空间成员归一到导入绑定，后续继续使用同一套词法规则。 */
export function normalizeNamespaces(program: NodePath<t.Program>): void {
  const aliases = new Map<string, t.Identifier>();
  const alias = (name: string) => {
    let identifier = aliases.get(name);
    if (!identifier) {
      identifier = program.scope.generateUidIdentifier(name);
      aliases.set(name, identifier);
    }
    return identifier;
  };
  for (const statement of program.get('body')) {
    if (
      !statement.isImportDeclaration() ||
      statement.node.source.value !== 'zerodep-js' ||
      statement.node.importKind === 'type'
    )
      continue;
    for (const specifier of statement.get('specifiers')) {
      if (!specifier.isImportNamespaceSpecifier()) continue;
      const binding = program.scope.getBinding(specifier.node.local.name)!;
      for (const reference of binding.referencePaths) {
        if (reference.findParent((parent) => parent.isTSType())) continue;
        const member = reference.parentPath;
        if (member.isMemberExpression() && member.node.object === reference.node) {
          const property = member.node.property;
          const name =
            !member.node.computed && t.isIdentifier(property)
              ? property.name
              : t.isStringLiteral(property)
                ? property.value
                : undefined;
          if (name && special.has(name))
            member.replaceWith(t.inherits(t.cloneNode(alias(name)), member.node));
        } else if (member.isJSXMemberExpression() && member.node.object === reference.node) {
          const name = member.node.property.name;
          if (special.has(name))
            member.replaceWith(t.inherits(t.jsxIdentifier(alias(name).name), member.node));
        }
      }
    }
  }
  if (aliases.size)
    program.unshiftContainer(
      'body',
      t.importDeclaration(
        [...aliases].map(([name, identifier]) => t.importSpecifier(identifier, t.identifier(name))),
        t.stringLiteral('zerodep-js'),
      ),
    );
  program.scope.crawl();
}
