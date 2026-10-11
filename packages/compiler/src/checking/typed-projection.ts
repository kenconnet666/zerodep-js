import { SymbolFlags, TypeFlags, type Program, type Type } from 'typescript/async';
import {
  isIdentifier,
  isJsxAttribute,
  isJsxNamespacedName,
  isJsxOpeningElement,
  isJsxSelfClosingElement,
  isJsxSpreadAttribute,
  type Node,
} from 'typescript/ast';
import { projectForCheck, type CheckProjection, type SelectSpread } from './projection.js';

type SelectMode = SelectSpread['mode'];

async function selectMode(type: Type): Promise<SelectMode> {
  if (type.isUnionType()) {
    const modes = await Promise.all((await type.getTypes()).map(selectMode));
    return modes.every((mode) => mode === modes[0]) ? modes[0]! : 'dynamic';
  }
  if (type.isBooleanLiteralType()) return type.value ? 'multiple' : 'single';
  if (type.flags & (TypeFlags.Undefined | TypeFlags.Null | TypeFlags.Never)) return 'single';
  return 'dynamic';
}

/** 属性类型交给官方 checker；框架只选择对应的写回表达式，不复制可赋值性算法。 */
export async function typedProjection(
  program: Program,
  filename: string,
  source: string,
): Promise<CheckProjection> {
  const file = await program.getSourceFile(filename);
  if (!file) return { code: source, map: null };
  const checker = program.getProject().checker;
  async function spreadMultiple(type: Type): Promise<SelectSpread | null> {
    if (type.isUnionType()) {
      const entries = await Promise.all((await type.getTypes()).map(spreadMultiple));
      const present = entries.filter((entry) => entry !== null);
      if (!present.length) return null;
      return {
        mode: present.every((entry) => entry.mode === present[0]!.mode)
          ? present[0]!.mode
          : 'dynamic',
        optional: entries.some((entry) => entry === null || entry.optional),
      };
    }
    if (type.flags & (TypeFlags.Any | TypeFlags.Unknown | TypeFlags.TypeParameter))
      return { mode: 'dynamic', optional: true };
    const multiple = await type.getProperty('multiple');
    if (!multiple)
      return (await type.getStringIndexType()) ? { mode: 'dynamic', optional: true } : null;
    return {
      mode: await selectMode(await checker.getNonMissingTypeOfSymbol(multiple)),
      optional: Boolean(multiple.flags & SymbolFlags.Optional),
    };
  }
  const openingNodes: Node[] = [];
  const visit = (node: Node) => {
    if (isJsxOpeningElement(node) || isJsxSelfClosingElement(node)) openingNodes.push(node);
    node.forEachChild(visit);
  };
  visit(file);
  const optionalBindings = new Set<number>();
  const selectSpreads = new Map<number, SelectSpread | null>();
  for (const opening of openingNodes) {
    if (!isJsxOpeningElement(opening) && !isJsxSelfClosingElement(opening)) continue;
    const bindings = opening.attributes.properties.filter(
      (attribute) =>
        isJsxAttribute(attribute) &&
        isJsxNamespacedName(attribute.name) &&
        attribute.name.namespace.text === 'bind',
    );
    if (!bindings.length) continue;
    if (isIdentifier(opening.tagName) && /^[a-z]/.test(opening.tagName.text)) {
      if (opening.tagName.text === 'select') {
        for (const attribute of opening.attributes.properties) {
          if (!isJsxSpreadAttribute(attribute)) continue;
          selectSpreads.set(
            attribute.getStart(file),
            await spreadMultiple(await checker.getTypeAtLocation(attribute.expression)),
          );
        }
      }
      continue;
    }
    const signature = await checker.getResolvedSignature(opening);
    const props = await checker.getParameterType(signature, 0);
    for (const attribute of bindings) {
      if (!isJsxAttribute(attribute) || !isJsxNamespacedName(attribute.name)) continue;
      const property = await props.getProperty(attribute.name.name.text);
      if (property && property.flags & SymbolFlags.Optional)
        optionalBindings.add(attribute.getStart(file));
    }
  }
  return projectForCheck(source, filename, { optionalBindings, selectSpreads });
}
