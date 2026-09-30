import traverse, { type Binding, type NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { coreImport } from './imports.js';
import { transformReturns } from './render.js';

type Helper = (name: string, args: t.Expression[]) => t.CallExpression;
type Report = (node: t.Node, code: string, message: string) => void;

function readonlyObject(
  setup: NodePath<t.FunctionExpression | t.ArrowFunctionExpression>,
  binding: Binding,
  report: Report,
): void {
  setup.traverse({
    'AssignmentExpression|UpdateExpression|UnaryExpression'(write) {
      if (write.isUnaryExpression() && write.node.operator !== 'delete') return;
      const target = write.isAssignmentExpression() ? write.node.left : write.node.argument;
      if (
        t.isMemberExpression(target) &&
        t.isIdentifier(target.object) &&
        write.scope.getBinding(target.object.name) === binding
      )
        report(write.node, 'ZJ1203', '不能修改 props 或 rest 输入的顶层属性，请使用回调。');
    },
  });
}

function isComponentImport(binding: Binding | undefined): boolean {
  return coreImport(binding) === 'component';
}

/** 参数解构被改写为按需 getter；普通局部解构仍保持 JavaScript 快照语义。 */
export function transformComponents(
  ast: t.File,
  program: NodePath<t.Program>,
  helper: Helper,
  report: Report,
): boolean {
  let transformed = false;
  traverse(ast, {
    CallExpression(path) {
      if (
        !t.isIdentifier(path.node.callee) ||
        !isComponentImport(path.scope.getBinding(path.node.callee.name))
      )
        return;
      const setup = path.get('arguments')[0];
      if (
        path.node.arguments.length !== 1 ||
        !setup ||
        (!setup.isArrowFunctionExpression() && !setup.isFunctionExpression()) ||
        setup.node.async ||
        setup.node.generator
      ) {
        report(
          path.node,
          'ZJ1200',
          'component 接受一个内联的同步函数，组件初始化不能是异步或生成器。',
        );
        return;
      }
      if (setup.node.params.length > 1) {
        report(setup.node, 'ZJ1201', '组件只接收一个 props 参数。');
        return;
      }
      const parameter = setup.node.params[0];
      if (parameter && !t.isIdentifier(parameter) && !t.isObjectPattern(parameter)) {
        report(parameter, 'ZJ1202', '组件参数使用 props 对象或顶层对象解构，默认值写在各属性旁。');
        return;
      }

      if (t.isIdentifier(parameter)) {
        const binding = setup.scope.getBinding(parameter.name)!;
        readonlyObject(setup, binding, report);
        for (const violation of binding.constantViolations)
          report(violation.node, 'ZJ1203', 'props 参数不能重新赋值。');
        setup.traverse({
          'MemberExpression|OptionalMemberExpression'(read) {
            const { object, property, computed } = read.node;
            if (
              t.isIdentifier(object) &&
              read.scope.getBinding(object.name) === binding &&
              ((!computed && t.isIdentifier(property, { name: 'key' })) ||
                t.isStringLiteral(property, { value: 'key' }))
            ) {
              report(
                read.node,
                'ZJ1207',
                'key 是 JSX 实例身份，不是组件输入；业务数据请使用 id 等名称。',
              );
            }
          },
        });
      }

      if (t.isObjectPattern(parameter)) {
        const input = setup.scope.generateUidIdentifier('props');
        const declarations: t.VariableDeclarator[] = [];
        const excluded: t.Expression[] = [];
        const entries: {
          binding: Binding;
          replacement: t.Identifier;
          rest: boolean;
          property: t.ObjectProperty | t.RestElement;
        }[] = [];
        for (const property of parameter.properties) {
          if (
            t.isObjectProperty(property) &&
            !property.computed &&
            (t.isIdentifier(property.key, { name: 'key' }) ||
              t.isStringLiteral(property.key, { value: 'key' }))
          ) {
            report(
              property,
              'ZJ1207',
              'key 是 JSX 实例身份，不是组件输入；业务数据请使用 id 等名称。',
            );
          }
          const value = t.isRestElement(property) ? property.argument : property.value;
          const local = t.isAssignmentPattern(value) ? value.left : value;
          if (
            !t.isIdentifier(local) ||
            (!t.isRestElement(property) &&
              (property.computed ||
                (!t.isIdentifier(property.key) && !t.isStringLiteral(property.key))))
          ) {
            report(
              property,
              'ZJ1204',
              '仅支持顶层静态属性解构；嵌套数据请用 props.user.name 或显式派生。',
            );
            continue;
          }
          const binding = setup.scope.getBinding(local.name)!;
          if (t.isRestElement(property)) readonlyObject(setup, binding, report);
          const replacement = setup.scope.generateUidIdentifier(local.name);
          entries.push({ binding, replacement, rest: t.isRestElement(property), property });
          for (const violation of binding.constantViolations)
            report(violation.node, 'ZJ1203', '解构得到的 props 绑定是只读的。');
        }

        const positions = new Map(entries.map((entry, index) => [entry.binding, index]));
        for (let index = 0; index < entries.length; index++) {
          const entry = entries[index]!;
          if (!t.isObjectProperty(entry.property) || !t.isAssignmentPattern(entry.property.value))
            continue;
          const fallback = entry.property.value.right;
          setup.traverse({
            ReferencedIdentifier(reference) {
              if (
                reference.node.start == null ||
                fallback.start == null ||
                fallback.end == null ||
                reference.node.start < fallback.start ||
                reference.node.start >= fallback.end ||
                reference.findParent((parent) => parent.isTSType())
              )
                return;
              const binding = reference.scope.getBinding(reference.node.name);
              const bodyScope = setup.get('body').scope;
              const bodyBinding = bodyScope.getBinding(reference.node.name);
              const declaredInFallback =
                binding?.identifier.start != null &&
                binding.identifier.start >= fallback.start &&
                binding.identifier.start < fallback.end;
              if (
                !declaredInFallback &&
                bodyBinding &&
                bodyBinding.scope === bodyScope &&
                !positions.has(bodyBinding)
              ) {
                report(
                  reference.node,
                  'ZJ1205',
                  '默认值不能捕获或被函数体内的同名变量遮蔽，请使用外部别名。',
                );
              }
              if (!binding) return;
              const position = positions.get(binding);
              if (position !== undefined && position >= index)
                report(reference.node, 'ZJ1205', '默认值不能引用自身或后面的参数。');
              else if (binding.scope === setup.scope && position === undefined)
                report(reference.node, 'ZJ1205', '参数默认值不能引用组件函数体内的局部变量。');
            },
          });
        }

        // 先更新原始引用，再搬移默认表达式，保留前序参数之间的关系。
        for (const entry of entries) {
          if (entry.binding.constantViolations.length) continue;
          for (const reference of entry.binding.referencePaths) {
            if (reference.findParent((parent) => parent.isTSType())) continue;
            if (reference.parentPath.isObjectProperty() && reference.parentPath.node.shorthand)
              reference.parentPath.node.shorthand = false;
            reference.replaceWith(
              t.inherits(
                entry.rest
                  ? t.cloneNode(entry.replacement)
                  : t.callExpression(t.cloneNode(entry.replacement), []),
                reference.node,
              ),
            );
          }
        }
        for (const entry of entries) {
          if (t.isRestElement(entry.property)) {
            declarations.push(
              t.variableDeclarator(
                entry.replacement,
                helper('restProps', [t.cloneNode(input), t.arrayExpression([...excluded])]),
              ),
            );
            continue;
          }
          const key = t.isIdentifier(entry.property.key)
            ? entry.property.key.name
            : (entry.property.key as t.StringLiteral).value;
          excluded.push(t.stringLiteral(key));
          const args: t.Expression[] = [t.cloneNode(input), t.stringLiteral(key)];
          if (t.isAssignmentPattern(entry.property.value))
            args.push(t.arrowFunctionExpression([], entry.property.value.right));
          declarations.push(t.variableDeclarator(entry.replacement, helper('prop', args)));
        }
        if (!t.isBlockStatement(setup.node.body))
          setup.node.body = t.blockStatement([t.returnStatement(setup.node.body)]);
        setup.node.params = [input];
        if (declarations.length)
          setup.node.body.body.unshift(t.variableDeclaration('const', declarations));
      }
      transformReturns(setup, helper);
      // setup 语句执行一次，返回的渲染表达式保留独立的更新位置。
      path.node.callee = helper('defineComponent', []).callee;
      transformed = true;
    },
  });

  program.scope.crawl();
  for (const statement of program.get('body')) {
    if (!statement.isImportDeclaration()) continue;
    let removed = false;
    for (const specifier of statement.get('specifiers')) {
      const binding = program.scope.getBinding(specifier.node.local.name);
      if (!isComponentImport(binding)) continue;
      for (const reference of binding!.referencePaths) {
        if (!reference.findParent((parent) => parent.isTSType()))
          report(
            reference.node,
            'ZJ1206',
            'component 标记只能直接包装组件函数，不能作为普通值传递。',
          );
      }
      specifier.remove();
      removed = true;
    }
    if (removed && !statement.node.specifiers.length) statement.remove();
  }
  return transformed;
}
