import traverse, { type NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { coreImport } from './imports.js';

/** 原生解构只执行一次，再把字段交回普通派生转换；不改变普通解构或函数传值。 */
export function prepareDerivedPatterns(ast: t.File, program: NodePath<t.Program>): void {
  traverse(ast, {
    VariableDeclaration(path) {
      const declarations: t.VariableDeclarator[] = [];
      let changed = false;
      for (const declaration of path.node.declarations) {
        const pattern = declaration.id;
        const init = declaration.init;
        const callee = t.isCallExpression(init) ? init.callee : undefined;
        const name = t.isIdentifier(callee)
          ? callee
          : t.isMemberExpression(callee) && t.isIdentifier(callee.object)
            ? callee.object
            : undefined;
        const by =
          t.isMemberExpression(callee) &&
          (callee.computed
            ? t.isStringLiteral(callee.property, { value: 'by' })
            : t.isIdentifier(callee.property, { name: 'by' }));
        if (
          (!t.isObjectPattern(pattern) && !t.isArrayPattern(pattern)) ||
          !t.isCallExpression(init) ||
          !name ||
          coreImport(path.scope.getBinding(name.name)) !== 'derived' ||
          (t.isMemberExpression(callee) && !by) ||
          init.arguments.length !== 1 ||
          !t.isExpression(init.arguments[0])
        ) {
          declarations.push(declaration);
          continue;
        }
        const bindings = t.getBindingIdentifiers(pattern);
        const names = Object.keys(bindings);
        // 没有字段就没有读取入口；保留原诊断，避免悄悄丢弃本来会执行的解构。
        if (!names.length) {
          declarations.push(declaration);
          continue;
        }
        const source = path.scope.generateUidIdentifier('derivedSource');
        const result = path.scope.generateUidIdentifier('destructured');
        // 保留原始宏调用：尤其 .by 的函数/getter 应在声明时取得一次，不能移入重算回调。
        declarations.push(t.inherits(t.variableDeclarator(source, init), declaration));
        const calculate = t.arrowFunctionExpression(
          [],
          t.blockStatement([
            t.variableDeclaration('const', [
              t.variableDeclarator(t.cloneNode(pattern, true), t.cloneNode(source)),
            ]),
            t.returnStatement(
              t.objectExpression(
                names.map((key) =>
                  t.objectProperty(t.identifier(key), t.identifier(key), false, true),
                ),
              ),
            ),
          ]),
        );
        declarations.push(
          t.inherits(
            t.variableDeclarator(
              result,
              t.callExpression(t.memberExpression(t.cloneNode(name), t.identifier('by')), [
                calculate,
              ]),
            ),
            declaration,
          ),
        );
        for (const key of names)
          declarations.push(
            t.inherits(
              t.variableDeclarator(
                t.inherits(t.identifier(key), bindings[key]!),
                t.callExpression(t.cloneNode(name), [
                  t.memberExpression(t.cloneNode(result), t.identifier(key)),
                ]),
              ),
              declaration,
            ),
          );
        changed = true;
      }
      if (changed) {
        path.node.declarations = declarations;
        // 继续进入工厂及默认表达式，里面也可能声明派生解构。
        // 生成的中间声明均为命名绑定，不会被本转换重复展开。
      }
    },
  });
  // 新的字段声明仍由现有宏、只读和收窄检查按词法绑定处理。
  program.scope.crawl();
}
