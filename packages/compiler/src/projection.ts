import { transformFromAstSync } from '@babel/core';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import type { SourceMap } from './index.js';

export interface CheckProjection {
  code: string;
  map: SourceMap | null;
}

export interface ProjectionOptions {
  /** 官方 checker 确认的可选组件属性；避免把显式 undefined 误当普通属性传入。 */
  optionalBindings?: ReadonlySet<number>;
}

function attributeName(attribute: t.JSXAttribute): string {
  return t.isJSXNamespacedName(attribute.name)
    ? `${attribute.name.namespace.name}:${attribute.name.name.name}`
    : attribute.name.name;
}

/** 检查用源码把隐式写回显式表达给选定 TS；运行代码仍由框架编译器生成。 */
export function projectForCheck(
  source: string,
  filename: string,
  options: ProjectionOptions = {},
): CheckProjection {
  const ast = parse(source, {
    sourceType: 'module',
    sourceFilename: filename,
    plugins: ['typescript', 'jsx'],
  });
  let changed = false;
  traverse(ast, {
    JSXOpeningElement(path) {
      const opening = path.node;
      const native = t.isJSXIdentifier(opening.name) && /^[a-z]/.test(opening.name.name);
      const tag = t.isJSXIdentifier(opening.name) ? opening.name.name : '';
      const original = [...opening.attributes];
      const handlers = new Map<string, t.Statement[]>();
      const events = new Map<string, t.Identifier>();
      const output: (t.JSXAttribute | t.JSXSpreadAttribute)[] = [];
      for (const attribute of original) {
        if (!t.isJSXAttribute(attribute) || !attributeName(attribute).startsWith('bind:')) {
          output.push(attribute);
          continue;
        }
        if (!t.isJSXExpressionContainer(attribute.value)) continue;
        const target = attribute.value.expression;
        if (!t.isIdentifier(target) && !t.isMemberExpression(target)) continue;
        changed = true;
        const property = attributeName(attribute).slice(5);
        const event =
          property === 'this'
            ? 'ref'
            : native
              ? property === 'open'
                ? 'onToggle'
                : property === 'checked' || tag === 'select'
                  ? 'onChange'
                  : 'onInput'
              : `on${property[0]!.toUpperCase()}${property.slice(1)}Change`;
        let parameter = events.get(event);
        if (!parameter) {
          parameter = path.scope.generateUidIdentifier(property === 'this' ? 'element' : 'event');
          events.set(event, parameter);
        }
        let value: t.Expression = t.cloneNode(parameter);
        if (native && property !== 'this') {
          const currentTarget = t.memberExpression(
            t.cloneNode(parameter),
            t.identifier('currentTarget'),
          );
          value = t.memberExpression(currentTarget, t.identifier(property));
          if (property === 'valueAsNumber') {
            value = t.conditionalExpression(
              t.callExpression(t.memberExpression(t.identifier('Number'), t.identifier('isNaN')), [
                t.cloneNode(value),
              ]),
              t.identifier('undefined'),
              value,
            );
          } else if (tag === 'select' && property === 'value') {
            const multiple = original.find(
              (item) => t.isJSXAttribute(item) && attributeName(item) === 'multiple',
            );
            if (t.isJSXAttribute(multiple)) {
              const option = path.scope.generateUidIdentifier('option');
              const values = t.callExpression(
                t.memberExpression(t.identifier('Array'), t.identifier('from')),
                [
                  t.memberExpression(t.cloneNode(currentTarget), t.identifier('selectedOptions')),
                  t.arrowFunctionExpression(
                    [option],
                    t.memberExpression(t.cloneNode(option), t.identifier('value')),
                  ),
                ],
              );
              value =
                multiple.value === null
                  ? values
                  : t.conditionalExpression(
                      t.memberExpression(t.cloneNode(currentTarget), t.identifier('multiple')),
                      values,
                      value,
                    );
            }
          }
        }
        const assignment = t.inherits(
          t.assignmentExpression('=', t.cloneNode(target, true), value),
          target,
        );
        const statements = handlers.get(event) ?? [];
        statements.push(t.expressionStatement(assignment));
        handlers.set(event, statements);
        if (property !== 'this') {
          // 原生绑定保留其专用读取类型；可选组件属性也保留 bind 的 undefined 语义。
          // 必填组件属性使用普通 prop，使选定 TS 可以直接从值推断组件泛型。
          output.push(
            native || options.optionalBindings?.has(attribute.start!)
              ? t.cloneNode(attribute, true)
              : t.inherits(
                  t.jsxAttribute(
                    t.inherits(t.jsxIdentifier(property), attribute.name),
                    t.cloneNode(attribute.value, true),
                  ),
                  attribute,
                ),
          );
        } else {
          // 清理同样是一次赋值，目标不接受 undefined 时必须由 TS 拒绝。
          const cleanup = t.inherits(
            t.assignmentExpression('=', t.cloneNode(target, true), t.identifier('undefined')),
            target,
          );
          output.push(
            t.inherits(
              t.jsxAttribute(
                t.jsxIdentifier('ref'),
                t.jsxExpressionContainer(
                  t.arrowFunctionExpression(
                    [t.cloneNode(parameter)],
                    t.blockStatement([
                      t.expressionStatement(assignment),
                      t.returnStatement(t.arrowFunctionExpression([], cleanup)),
                    ]),
                  ),
                ),
              ),
              attribute,
            ),
          );
          handlers.delete(event);
        }
      }
      for (const [event, statements] of handlers) {
        const parameter = events.get(event)!;
        const existing = output.find(
          (item) => t.isJSXAttribute(item) && attributeName(item) === event,
        );
        if (
          t.isJSXAttribute(existing) &&
          t.isJSXExpressionContainer(existing.value) &&
          t.isExpression(existing.value.expression)
        ) {
          const callback = path.scope.generateUidIdentifier('callback');
          const argument = path.scope.generateUidIdentifier('argument');
          const resultType = path.scope.generateUidIdentifier('Result');
          argument.typeAnnotation = t.tsTypeAnnotation(t.tsTypeQuery(t.cloneNode(parameter)));
          callback.typeAnnotation = t.tsTypeAnnotation(
            t.tsUnionType([
              t.tsFunctionType(null, [argument], t.tsTypeAnnotation(t.tsTypeReference(resultType))),
              t.tsUndefinedKeyword(),
              t.tsNullKeyword(),
            ]),
          );
          // 用带上下文类型的调用保留零参数/可选回调；不能直接调用用户箭头并强行传参。
          const invoke = t.arrowFunctionExpression(
            [callback],
            t.optionalCallExpression(t.cloneNode(callback), [t.cloneNode(parameter)], true),
          );
          invoke.typeParameters = t.tsTypeParameterDeclaration([
            t.tsTypeParameter(null, null, resultType),
          ]);
          statements.push(t.returnStatement(t.callExpression(invoke, [existing.value.expression])));
          output.splice(output.indexOf(existing), 1);
        }
        output.push(
          t.jsxAttribute(
            t.jsxIdentifier(event),
            t.jsxExpressionContainer(
              t.arrowFunctionExpression([t.cloneNode(parameter)], t.blockStatement(statements)),
            ),
          ),
        );
      }
      opening.attributes = output;
    },
  });
  if (!changed) return { code: source, map: null };
  const generated = transformFromAstSync(ast, source, {
    filename,
    sourceFileName: filename,
    sourceMaps: true,
    babelrc: false,
    configFile: false,
    cloneInputAst: false,
    // 保持源行，避免转换后的换行改变 @ts-expect-error 等指令的作用目标。
    retainLines: true,
  });
  if (typeof generated?.code !== 'string') throw new Error('无法生成框架检查源码。');
  return { code: generated.code, map: generated.map ?? null };
}
