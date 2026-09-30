import { transformFromAstSync, type FileResult } from '@babel/core';
import { parse } from '@babel/parser';
import presetTypescript from '@babel/preset-typescript';
import traverse, { type Binding, type NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { CompileError, diagnostic, type Diagnostic } from './diagnostics.js';
import { transformComponents } from './components.js';
import { transformJsx } from './jsx.js';

export { CompileError } from './diagnostics.js';
export type { Diagnostic } from './diagnostics.js';

export interface CompileOptions {
  runtimeModule?: string;
}

export interface CompileResult {
  code: string;
  map: FileResult['map'];
}

interface ReactiveBinding {
  binding: Binding;
  derived: boolean;
}

/** 宏按导入和词法绑定识别，转换与构建器保持独立。 */
export function compile(
  source: string,
  filename: string,
  options: CompileOptions = {},
): CompileResult {
  let ast: t.File;
  try {
    ast = parse(source, {
      sourceType: 'module',
      sourceFilename: filename,
      plugins: ['typescript', 'jsx'],
    });
  } catch (error) {
    const failure = error as Error & { loc?: { line: number; column: number } };
    throw new CompileError([
      {
        code: 'ZJ1000',
        message: failure.message,
        filename,
        line: failure.loc?.line ?? 1,
        column: (failure.loc?.column ?? 0) + 1,
      },
    ]);
  }
  const errors: Diagnostic[] = [];
  const macros = new Map<Binding, '$state' | '$derived'>();
  const reactive = new Map<Binding, ReactiveBinding>();
  const generated = new WeakSet<t.Node>();
  let program!: NodePath<t.Program>;
  traverse(ast, {
    Program(path) {
      program = path;
      path.stop();
    },
  });
  const runtime = program.scope.generateUidIdentifier('zj');
  const helper = (name: string, args: t.Expression[]) =>
    t.callExpression(t.memberExpression(t.cloneNode(runtime), t.identifier(name)), args);
  const cell = (entry: ReactiveBinding) => {
    const node = t.identifier(entry.binding.identifier.name);
    generated.add(node);
    return node;
  };
  const read = (entry: ReactiveBinding) =>
    t.callExpression(t.memberExpression(cell(entry), t.identifier('read')), []);
  const lookup = (path: NodePath, node: t.Node): ReactiveBinding | undefined =>
    t.isIdentifier(node) ? reactive.get(path.scope.getBinding(node.name)!) : undefined;
  const report = (node: t.Node, code: string, message: string) => {
    errors.push(diagnostic(node, filename, code, message));
  };
  function replace(path: NodePath, expression: t.Expression): void {
    path.replaceWith(t.inherits(expression, path.node));
  }

  const hasJsx = transformJsx(ast, helper);
  program.scope.crawl();
  const hasComponents = transformComponents(ast, program, helper, report);
  for (const statement of program.get('body')) {
    if (!statement.isImportDeclaration() || statement.node.source.value !== '@zerodep-js/core')
      continue;
    for (const specifier of statement.get('specifiers')) {
      if (
        !specifier.isImportSpecifier() ||
        statement.node.importKind === 'type' ||
        specifier.node.importKind === 'type'
      )
        continue;
      const imported = specifier.node.imported;
      const name = t.isIdentifier(imported) ? imported.name : imported.value;
      if (name === '$state' || name === '$derived')
        macros.set(program.scope.getBinding(specifier.node.local.name)!, name);
    }
  }

  // 先登记所有声明，再转换闭包内读写，避免访问声明在后的绑定时漏掉转换。
  traverse(ast, {
    CallExpression(path) {
      const callee = path.node.callee;
      const identifier = t.isIdentifier(callee)
        ? callee
        : t.isMemberExpression(callee) && !callee.computed && t.isIdentifier(callee.object)
          ? callee.object
          : null;
      if (!identifier) return;
      const macro = macros.get(path.scope.getBinding(identifier.name)!);
      if (!macro) return;
      const member =
        t.isMemberExpression(callee) && t.isIdentifier(callee.property)
          ? callee.property.name
          : undefined;
      if (
        member !== undefined &&
        !(macro === '$state' && member === 'raw') &&
        !(macro === '$derived' && member === 'by')
      ) {
        report(callee, 'ZJ1001', '不支持的宏成员，只能使用 $state.raw 或 $derived.by。');
        return;
      }
      const declaration = path.parentPath;
      if (
        !declaration.isVariableDeclarator() ||
        declaration.node.init !== path.node ||
        !t.isIdentifier(declaration.node.id)
      ) {
        report(path.node, 'ZJ1002', '响应式宏只能作为单个命名变量的初始化表达式。');
        return;
      }
      const args = path.node.arguments;
      if (
        args.length > 1 ||
        (macro === '$derived' && args.length !== 1) ||
        (args[0] && !t.isExpression(args[0]))
      ) {
        report(
          path.node,
          'ZJ1003',
          '状态宏接受零或一个值；派生宏需要一个表达式或计算函数，不接受展开参数。',
        );
        return;
      }
      const binding = declaration.scope.getBinding(declaration.node.id.name)!;
      if (binding.kind === 'var')
        report(declaration.node, 'ZJ1004', '响应式声明使用 let 或 const，不使用 var。');
      reactive.set(binding, { binding, derived: macro === '$derived' });
      const argument =
        (args[0] as t.Expression | undefined) ?? t.unaryExpression('void', t.numericLiteral(0));
      if (macro === '$state')
        replace(path, helper(member === 'raw' ? 'source' : 'state', [argument]));
      else
        replace(
          path,
          helper('derived', [member === 'by' ? argument : t.arrowFunctionExpression([], argument)]),
        );
      path.skip();
    },
  });

  function writable(path: NodePath, entry: ReactiveBinding): boolean {
    if (entry.derived || entry.binding.kind === 'const') {
      report(path.node, 'ZJ1005', '不能重新赋值只读派生或 const 状态绑定。');
      return false;
    }
    return true;
  }

  function targets(node: t.Node): t.Identifier[] {
    if (t.isIdentifier(node)) return [node];
    if (t.isRestElement(node)) return targets(node.argument);
    if (t.isAssignmentPattern(node)) return targets(node.left);
    if (t.isArrayPattern(node)) return node.elements.flatMap((item) => (item ? targets(item) : []));
    if (t.isObjectPattern(node))
      return node.properties.flatMap((property) =>
        targets(t.isRestElement(property) ? property.argument : property.value),
      );
    return [];
  }

  traverse(ast, {
    ExportNamedDeclaration(path) {
      const declaration = path.node.declaration;
      const exported = t.isVariableDeclaration(declaration)
        ? declaration.declarations.flatMap((item) => targets(item.id))
        : path.node.specifiers.flatMap((item) => (t.isExportSpecifier(item) ? [item.local] : []));
      for (const id of exported)
        if (lookup(path, id))
          report(id, 'ZJ1006', '不能直接导出响应式绑定；请通过普通函数和 getter 暴露跨模块状态。');
    },
    ExportDefaultDeclaration(path) {
      if (lookup(path, path.node.declaration))
        report(
          path.node,
          'ZJ1006',
          '不能直接导出响应式绑定；请通过普通函数和 getter 暴露跨模块状态。',
        );
    },
    'ForOfStatement|ForInStatement'(path) {
      for (const id of targets(path.node.left))
        if (lookup(path, id))
          report(id, 'ZJ1007', '循环目标不能是响应式绑定，请在循环体内显式赋值。');
    },
    AssignmentExpression: {
      exit(path) {
        const { left, right, operator } = path.node;
        const entry = lookup(path, left);
        if (!entry) {
          for (const id of targets(left))
            if (lookup(path, id))
              report(id, 'ZJ1007', '暂不支持对响应式绑定进行解构赋值，请逐项显式赋值。');
          return;
        }
        if (!writable(path, entry)) return;
        const set = (value: t.Expression) => helper('set', [cell(entry), value]);
        if (operator === '=') replace(path, set(right));
        else if (operator === '&&=' || operator === '||=' || operator === '??=') {
          replace(
            path,
            t.logicalExpression(
              operator.slice(0, -1) as '&&' | '||' | '??',
              read(entry),
              set(right),
            ),
          );
        } else {
          replace(
            path,
            set(
              t.binaryExpression(
                operator.slice(0, -1) as t.BinaryExpression['operator'],
                read(entry),
                right,
              ),
            ),
          );
        }
        path.skip();
      },
    },
    UpdateExpression(path) {
      const entry = lookup(path, path.node.argument);
      if (!entry || !writable(path, entry)) return;
      replace(
        path,
        helper('update', [
          cell(entry),
          t.booleanLiteral(path.node.operator === '++'),
          t.booleanLiteral(path.node.prefix),
        ]),
      );
      path.skip();
    },
    ReferencedIdentifier(path) {
      if (
        errors.length ||
        generated.has(path.node) ||
        path.findParent((parent) => parent.isTSType())
      )
        return;
      const entry = lookup(path, path.node);
      if (!entry || path.parentPath.isExportSpecifier()) return;
      if (path.parentPath.isObjectProperty() && path.parentPath.node.shorthand)
        path.parentPath.node.shorthand = false;
      replace(path, read(entry));
      path.skip();
    },
    CallExpression(path) {
      if (
        reactive.size &&
        t.isIdentifier(path.node.callee, { name: 'eval' }) &&
        !path.scope.getBinding('eval')
      ) {
        report(path.node, 'ZJ1008', '响应式模块不支持直接 eval 访问被转换的词法绑定。');
      }
    },
  });

  // 重新收集引用以检测宏逃逸：把宏当普通回调或别名转交会失去编译边界。
  program.scope.crawl();
  for (const [binding] of macros) {
    const current = program.scope.getBinding(binding.identifier.name);
    for (const reference of current?.referencePaths ?? []) {
      if (!reference.findParent((parent) => parent.isTSType()))
        report(reference.node, 'ZJ1009', '宏不能作为普通值传递，只能直接初始化响应式变量。');
    }
    const specifier = current?.path;
    if (specifier?.isImportSpecifier()) {
      const declaration = specifier.parentPath;
      specifier.remove();
      if (declaration.isImportDeclaration() && !declaration.node.specifiers.length)
        declaration.remove();
    }
  }
  if (errors.length) throw new CompileError(errors);
  if (reactive.size || hasComponents || hasJsx)
    program.unshiftContainer(
      'body',
      t.importDeclaration(
        [t.importNamespaceSpecifier(runtime)],
        t.stringLiteral(options.runtimeModule ?? '@zerodep-js/core/internal'),
      ),
    );
  const result = transformFromAstSync(ast, source, {
    filename,
    sourceFileName: filename,
    sourceMaps: true,
    babelrc: false,
    configFile: false,
    presets: [[presetTypescript, { ignoreExtensions: true }]],
  });
  if (typeof result?.code !== 'string') throw new Error('编译器未生成代码。');
  return { code: result.code, map: result.map ?? null };
}
