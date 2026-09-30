import traverse, { type Binding, type NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { coreImport } from './imports.js';

type Report = (node: t.Node, code: string, message: string) => void;
type Guard = { test: NodePath; owner: NodePath | null };

function ownerOf(path: NodePath): NodePath | null {
  let owner = path.getFunctionParent();
  while (
    owner &&
    !owner.node.async &&
    !owner.node.generator &&
    owner.parentPath.isCallExpression() &&
    owner.parentPath.node.callee === owner.node
  )
    owner = owner.getFunctionParent();
  return owner;
}

function macro(path: NodePath<t.CallExpression>): string | undefined {
  const callee = path.node.callee;
  const id = t.isIdentifier(callee)
    ? callee
    : t.isMemberExpression(callee) && t.isIdentifier(callee.object)
      ? callee.object
      : undefined;
  return id && coreImport(path.scope.getBinding(id.name));
}

function identifiers(node: t.Node): t.Identifier[] {
  if (t.isIdentifier(node)) return [node];
  if (t.isAssignmentPattern(node)) return identifiers(node.left);
  if (t.isRestElement(node)) return identifiers(node.argument);
  if (t.isObjectPattern(node))
    return node.properties.flatMap((property) =>
      identifiers(t.isRestElement(property) ? property.argument : property.value),
    );
  return [];
}

function terminates(path: NodePath): boolean {
  if (path.isReturnStatement() || path.isThrowStatement()) return true;
  return (
    path.isBlockStatement() &&
    path.node.body.length > 0 &&
    terminates(path.get('body')[path.node.body.length - 1]!)
  );
}

/** 分析源码调用边界；JSX 生成的 getter 由作用域调度保证父子更新顺序。 */
export function checkGuards(
  ast: t.File,
  callbacks: Set<t.ArrowFunctionExpression | t.FunctionExpression>,
  report: Report,
): void {
  const live = new Set<Binding>();
  const awaits = new Map<t.Node, number[]>();
  const renderers = new Set<t.Node>(callbacks);
  traverse(ast, {
    CallExpression(path) {
      const name = macro(path);
      if (name === '$state' || name === '$derived') {
        if (path.parentPath.isVariableDeclarator() && t.isIdentifier(path.parentPath.node.id)) {
          const binding = path.scope.getBinding(path.parentPath.node.id.name)!;
          if (name === '$derived' || binding.kind !== 'const') live.add(binding);
        }
      } else if (name === 'component') {
        const setup = path.get('arguments')[0];
        if (setup?.isFunction()) {
          renderers.add(setup.node);
          for (const parameter of setup.node.params) {
            if (!t.isObjectPattern(parameter)) continue;
            for (const property of parameter.properties)
              if (!t.isRestElement(property)) {
                for (const id of identifiers(property.value))
                  live.add(setup.scope.getBinding(id.name)!);
              }
          }
        }
      }
    },
    Function(path) {
      if (!callbacks.has(path.node as t.ArrowFunctionExpression)) return;
      for (const parameter of path.node.params)
        for (const id of identifiers(parameter)) live.add(path.scope.getBinding(id.name)!);
    },
    'AwaitExpression|YieldExpression'(path) {
      const owner = path.getFunctionParent();
      if (owner) {
        const points = awaits.get(owner.node) ?? [];
        points.push(path.node.start ?? 0);
        awaits.set(owner.node, points);
      }
    },
  });

  // 仅这些源码区域会被编译为持续求值；初始化 if 或普通局部条件不会重跑。
  const renderRoots = new Set<t.Node>();
  traverse(ast, {
    JSXExpressionContainer(path) {
      renderRoots.add(path.node.expression);
    },
    'JSXSpreadAttribute|JSXSpreadChild'(path) {
      renderRoots.add(path.isJSXSpreadAttribute() ? path.node.argument : path.node.expression);
    },
    ReturnStatement(path) {
      if (path.node.argument && renderers.has(path.getFunctionParent()?.node as t.Node))
        renderRoots.add(path.node.argument);
    },
    ArrowFunctionExpression(path) {
      if (renderers.has(path.node) && !t.isBlockStatement(path.node.body))
        renderRoots.add(path.node.body);
    },
  });

  function renderRegion(reference: NodePath): t.Node | undefined {
    const owner = ownerOf(reference);
    let region: t.Node | undefined;
    for (let path: NodePath | null = reference; path && path !== owner; path = path.parentPath)
      if (renderRoots.has(path.node)) region = path.node;
    return region;
  }

  function outsideRender(guard: Guard, region: t.Node | undefined): boolean {
    return Boolean(
      region &&
      guard.test.node !== region &&
      !guard.test.findParent((path) => path.node === region),
    );
  }

  function related(path: NodePath, binding: Binding, seen = new Set<Binding>()): boolean {
    let found = false;
    const inspect = (reference: NodePath<t.Identifier>) => {
      const current = reference.scope.getBinding(reference.node.name);
      if (current === binding) {
        found = true;
        return;
      }
      if (
        !current ||
        seen.has(current) ||
        current.kind !== 'const' ||
        !current.path.isVariableDeclarator()
      )
        return;
      seen.add(current);
      const init = current.path.get('init');
      if (init.node && related(init, binding, seen)) found = true;
    };
    if (path.isIdentifier()) inspect(path);
    path.traverse({
      Function(child) {
        child.skip();
      },
      ReferencedIdentifier(reference) {
        if (reference.isIdentifier()) inspect(reference);
      },
    });
    return found;
  }

  function guards(reference: NodePath, binding: Binding): Guard[] {
    const result: Guard[] = [];
    let child = reference;
    for (let parent = child.parentPath; parent; child = parent, parent = parent.parentPath) {
      let test: NodePath | undefined;
      if ((parent.isIfStatement() || parent.isConditionalExpression()) && child.key !== 'test')
        test = parent.get('test');
      else if (parent.isLogicalExpression() && child.key === 'right') test = parent.get('left');
      else if (parent.isSwitchCase() && parent.parentPath.isSwitchStatement())
        test = parent.parentPath.get('discriminant');
      if (test && related(test, binding)) result.push({ test, owner: ownerOf(test) });
      if (parent.isBlockStatement() || parent.isProgram()) {
        for (const statement of parent.get('body')) {
          if (statement.node === child.node) break;
          if (statement.isIfStatement()) {
            const alternate = statement.get('alternate');
            if (
              !terminates(statement.get('consequent')) &&
              !(alternate.isStatement() && terminates(alternate))
            )
              continue;
            const condition = statement.get('test');
            if (related(condition, binding))
              result.push({ test: condition, owner: ownerOf(condition) });
          }
        }
      }
    }
    return result;
  }

  function key(path: NodePath, binding: Binding, seen = new Set<Binding>()): string {
    if (path.isIdentifier()) {
      const name = path.node.name;
      if (!path.isReferencedIdentifier()) return `property:${name}`;
      const current = path.scope.getBinding(path.node.name);
      if (current === binding) return '$live';
      if (current?.kind === 'const' && !seen.has(current) && current.path.isVariableDeclarator()) {
        const init = current.path.get('init');
        if (init.node && !init.isFunction()) {
          const next = new Set(seen);
          next.add(current);
          return key(init, binding, next);
        }
      }
      return `name:${path.node.name}:${current?.identifier.start ?? 'global'}`;
    }
    if (path.isUnaryExpression({ operator: '!' })) return key(path.get('argument'), binding, seen);
    if (
      path.isTSAsExpression() ||
      path.isTSNonNullExpression() ||
      path.isTSSatisfiesExpression() ||
      path.isTSTypeAssertion()
    )
      return key(path.get('expression'), binding, seen);
    if (path.isBinaryExpression() && ['==', '===', '!=', '!=='].includes(path.node.operator))
      return JSON.stringify([
        'equals',
        [key(path.get('left'), binding, seen), key(path.get('right'), binding, seen)].sort(),
      ]);
    const scalar = path.node as t.Node & {
      operator?: string;
      value?: unknown;
      computed?: boolean;
      optional?: boolean;
    };
    const children = (t.VISITOR_KEYS[path.node.type] ?? [])
      .filter((name) => !name.startsWith('type'))
      .map((name) => {
        const child = path.get(name);
        return [
          name,
          Array.isArray(child)
            ? child.filter((item) => item.node).map((item) => key(item as NodePath, binding, seen))
            : child.node
              ? key(child as NodePath, binding, seen)
              : null,
        ];
      });
    return JSON.stringify([
      path.node.type,
      scalar.operator,
      scalar.value,
      scalar.computed,
      scalar.optional,
      children,
    ]);
  }

  function inCheck(
    reference: NodePath,
    binding: Binding,
    required: string[],
    snapshotOwner?: t.Node,
  ): boolean {
    const owner = ownerOf(reference);
    const region = renderRegion(reference);
    const candidates = guards(reference, binding);
    let safeOperand = true;
    for (let path: NodePath | null = reference; path && path !== owner; path = path.parentPath) {
      const parent = path.parentPath;
      if (
        parent?.isMemberExpression() ||
        parent?.isCallExpression() ||
        parent?.isOptionalMemberExpression() ||
        parent?.isOptionalCallExpression()
      )
        safeOperand = false;
      if ((parent?.isIfStatement() || parent?.isConditionalExpression()) && path.key === 'test') {
        if (safeOperand) return true;
        candidates.push({ test: path, owner });
      }
      if (parent?.isLogicalExpression() && path.key === 'left') {
        if (safeOperand) return true;
        candidates.push({ test: path, owner });
      }
    }
    const available = new Set(
      candidates
        .filter(
          (guard) =>
            (guard.owner?.node === owner?.node ||
              (snapshotOwner && guard.owner?.node === snapshotOwner)) &&
            (snapshotOwner ||
              (!outsideRender(guard, region) &&
                !(awaits.get(owner?.node as t.Node) ?? []).some(
                  (point) =>
                    point > (guard.test.node.start ?? 0) && point < (reference.node.start ?? 0),
                ))),
        )
        .map((guard) => key(guard.test, binding)),
    );
    return required.every((predicate) => available.has(predicate));
  }

  function localSnapshot(reference: NodePath, binding: Binding, required: string[]): boolean {
    const declaration = reference.parentPath;
    if (
      !declaration?.isVariableDeclarator() ||
      declaration.node.init !== reference.node ||
      !t.isIdentifier(declaration.node.id)
    )
      return false;
    const alias = declaration.scope.getBinding(declaration.node.id.name);
    if (!alias || alias.kind !== 'const') return false;
    return (
      alias.referencePaths.length > 0 &&
      alias.referencePaths.every((use) => inCheck(use, binding, required, ownerOf(reference)?.node))
    );
  }

  const reported = new Set<t.Node>();
  for (const binding of live)
    for (const reference of binding.referencePaths) {
      if (reference.findParent((parent) => parent.isTSType())) continue;
      const owner = ownerOf(reference);
      const region = renderRegion(reference);
      const inherited = guards(reference, binding).filter(
        (guard) =>
          guard.owner?.node !== owner?.node ||
          outsideRender(guard, region) ||
          (awaits.get(owner?.node as t.Node) ?? []).some(
            (point) => point > (guard.test.node.start ?? 0) && point < (reference.node.start ?? 0),
          ),
      );
      const required = [...new Set(inherited.map((guard) => key(guard.test, binding)))];
      if (
        inherited.length &&
        !inCheck(reference, binding, required) &&
        !localSnapshot(reference, binding, required) &&
        !reported.has(reference.node)
      ) {
        reported.add(reference.node);
        report(
          reference.node,
          'ZJ1501',
          '实时绑定不能在延后渲染、回调或 await 后沿用外层收窄；请在当前表达式或回调重新读取并检查，或显式捕获稳定快照。',
        );
      }
    }
}
