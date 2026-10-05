import { createHash } from 'node:crypto';
import traverse, { type NodePath } from '@babel/traverse';
import { parse } from '@babel/parser';
import * as t from '@babel/types';
import { coreImport } from './imports.js';

interface ComponentInfo {
  name: string;
  setup: t.Function;
  line: number;
  parameters: t.Function['params'];
  states: Array<{ name: string; node: t.VariableDeclarator }>;
}

// 位置、注释和字面量的排版不构成状态形状变化。
function signature(value: unknown): string {
  const text = JSON.stringify(value, (key, item) =>
    [
      'start',
      'end',
      'loc',
      'extra',
      'leadingComments',
      'trailingComments',
      'innerComments',
    ].includes(key)
      ? undefined
      : item,
  );
  return createHash('sha256').update(text).digest('hex').slice(0, 24);
}

function literalData(node: t.Node | null | undefined): boolean {
  if (
    !node ||
    t.isNullLiteral(node) ||
    t.isStringLiteral(node) ||
    t.isNumericLiteral(node) ||
    t.isBooleanLiteral(node) ||
    t.isBigIntLiteral(node)
  )
    return true;
  if (t.isTSAsExpression(node) || t.isTSSatisfiesExpression(node) || t.isTSNonNullExpression(node))
    return literalData(node.expression);
  if (t.isUnaryExpression(node) && ['+', '-', 'void'].includes(node.operator))
    return literalData(node.argument);
  if (t.isArrayExpression(node)) return node.elements.every(literalData);
  return (
    t.isObjectExpression(node) &&
    node.properties.every(
      (property) =>
        t.isObjectProperty(property) && !property.computed && literalData(property.value),
    )
  );
}

/** 开发协议单独注入，生产转换完全不引用它。只登记模块顶层的具名组件。 */
export class Development {
  private readonly components = new WeakMap<t.CallExpression, ComponentInfo>();
  private readonly states = new WeakMap<
    t.CallExpression,
    { owner: string; name: string; portable: boolean }
  >();
  private readonly names = new Set<string>();
  private readonly runtime: t.Identifier;
  private readonly session: t.Identifier;
  private readonly program: NodePath<t.Program>;
  private readonly filename: string;
  private readonly hot: boolean;

  constructor(program: NodePath<t.Program>, filename: string, hot = true) {
    this.program = program;
    this.filename = filename;
    this.hot = hot;
    this.runtime = program.scope.generateUidIdentifier('zdev');
    this.session = program.scope.generateUidIdentifier('zmodule');
    const defaults = new Set<string>();
    // 匿名 default 也给稳定的模块内身份，不依赖组件的函数源码或行号。
    for (const statement of program.get('body')) {
      if (!statement.isExportDefaultDeclaration()) continue;
      const declaration = statement.get('declaration');
      if (
        !declaration.isCallExpression() ||
        !t.isIdentifier(declaration.node.callee) ||
        coreImport(declaration.scope.getBinding(declaration.node.callee.name)) !== 'component'
      )
        continue;
      const id = program.scope.generateUidIdentifier('Default');
      defaults.add(id.name);
      statement.replaceWithMultiple([
        t.variableDeclaration('const', [t.variableDeclarator(id, declaration.node)]),
        t.exportDefaultDeclaration(t.cloneNode(id)),
      ]);
    }
    program.scope.crawl();
    const setups = new WeakMap<t.Function, ComponentInfo>();
    program.traverse({
      CallExpression: (path) => {
        if (
          !t.isIdentifier(path.node.callee) ||
          coreImport(path.scope.getBinding(path.node.callee.name)) !== 'component'
        )
          return;
        const declaration = path.parentPath;
        const setup = path.node.arguments[0];
        if (
          !declaration.isVariableDeclarator() ||
          !t.isIdentifier(declaration.node.id) ||
          !t.isFunction(setup) ||
          declaration.scope !== program.scope
        )
          return;
        const info: ComponentInfo = {
          name: defaults.has(declaration.node.id.name) ? 'default' : declaration.node.id.name,
          setup,
          line: path.node.loc?.start.line ?? 1,
          parameters: setup.params.map((param) => t.cloneNode(param, true)),
          states: [],
        };
        this.components.set(path.node, info);
        setups.set(setup, info);
        this.names.add(declaration.node.id.name);
      },
    });
    program.traverse({
      CallExpression: (path) => {
        const callee = path.node.callee;
        const id = t.isIdentifier(callee)
          ? callee
          : t.isMemberExpression(callee) && t.isIdentifier(callee.object)
            ? callee.object
            : null;
        if (!id || coreImport(path.scope.getBinding(id.name)) !== 'state') return;
        const declaration = path.parentPath;
        const owner = path.getFunctionParent();
        const info = owner && setups.get(owner.node);
        if (
          !info ||
          !declaration.isVariableDeclarator() ||
          !t.isIdentifier(declaration.node.id) ||
          declaration.scope !== owner!.scope
        )
          return;
        info.states.push({
          name: declaration.node.id.name,
          node: t.cloneNode(declaration.node, true),
        });
        this.states.set(path.node, {
          owner: info.name,
          name: declaration.node.id.name,
          portable: literalData(path.node.arguments[0]),
        });
      },
    });
  }

  state(original: t.CallExpression, transformed: t.Expression): t.Expression {
    const info = this.states.get(original);
    return info
      ? t.callExpression(t.memberExpression(t.cloneNode(this.session), t.identifier('state')), [
          t.stringLiteral(info.owner),
          t.stringLiteral(info.name),
          transformed,
          t.booleanLiteral(info.portable),
        ])
      : transformed;
  }

  get enabled(): boolean {
    return this.names.size > 0;
  }

  finish(ast: t.File): void {
    if (!this.names.size) return;
    const exports = new Map<string, string>();
    let boundary = true;
    for (const statement of this.program.node.body) {
      if (t.isExportAllDeclaration(statement) && statement.exportKind !== 'type') boundary = false;
      if (t.isExportDefaultDeclaration(statement)) {
        if (t.isIdentifier(statement.declaration))
          exports.set('default', statement.declaration.name);
        else boundary = false;
      }
      if (!t.isExportNamedDeclaration(statement) || statement.exportKind === 'type') continue;
      const declaration = statement.declaration;
      if (t.isVariableDeclaration(declaration)) {
        for (const item of declaration.declarations)
          if (t.isIdentifier(item.id)) exports.set(item.id.name, item.id.name);
          else boundary = false;
      } else if (
        declaration &&
        !t.isTSTypeAliasDeclaration(declaration) &&
        !t.isTSInterfaceDeclaration(declaration)
      )
        boundary = false;
      for (const specifier of statement.specifiers) {
        if (!t.isExportSpecifier(specifier)) {
          boundary = false;
          continue;
        }
        if (specifier.exportKind === 'type') continue;
        if (statement.source) {
          boundary = false;
          continue;
        }
        if (!t.isIdentifier(specifier.local)) {
          boundary = false;
          continue;
        }
        exports.set(
          t.isIdentifier(specifier.exported) ? specifier.exported.name : specifier.exported.value,
          specifier.local.name,
        );
      }
    }
    boundary &&= exports.size > 0 && [...exports.values()].every((name) => this.names.has(name));
    traverse(ast, {
      CallExpression: (path) => {
        const info = this.components.get(path.node);
        if (!info) return;
        path.node.callee = t.memberExpression(t.cloneNode(this.session), t.identifier('component'));
        path.node.arguments = [
          t.stringLiteral(info.name),
          ...path.node.arguments,
          t.numericLiteral(info.line),
          t.stringLiteral(signature([info.parameters, info.states])),
        ];
      },
    });
    this.program.node.body.unshift(
      t.importDeclaration(
        [t.importSpecifier(t.cloneNode(this.runtime), t.identifier('begin'))],
        t.stringLiteral('zerodep-js/devtools'),
      ),
      t.variableDeclaration('const', [
        t.variableDeclarator(
          t.cloneNode(this.session),
          t.callExpression(t.cloneNode(this.runtime), [t.stringLiteral(this.filename)]),
        ),
      ]),
    );
    this.program.node.body.push(
      t.expressionStatement(
        t.callExpression(t.memberExpression(t.cloneNode(this.session), t.identifier('finish')), [
          t.objectExpression(
            [...exports]
              .filter(([, local]) => this.names.has(local))
              .map(([name, local]) => t.objectProperty(t.stringLiteral(name), t.identifier(local))),
          ),
          t.booleanLiteral(boundary),
        ]),
      ),
    );
    // Vite 静态扫描要求源码中有字面形式 import.meta.hot.accept，不能藏进运行时函数。
    if (!this.hot) return;
    const id = this.session.name;
    const hot = parse(
      `if (import.meta.hot) {
      import.meta.hot.accept(next => {
        if (next && !${id}.accept(next)) import.meta.hot.invalidate('zerodep-js 组件导出结构改变，需要重新挂载');
      });
      import.meta.hot.prune(() => ${id}.prune());
    }`,
      { sourceType: 'module' },
    ).program.body;
    this.program.node.body.push(...hot);
  }
}
