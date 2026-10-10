import { SymbolFlags, type Program } from 'typescript/unstable/async';
import {
  isIdentifier,
  isJsxAttribute,
  isJsxNamespacedName,
  isJsxOpeningElement,
  isJsxSelfClosingElement,
  type Node,
} from 'typescript/unstable/ast';
import { projectForCheck, type CheckProjection } from './projection.js';

/** 只向官方类型系统询问属性是否可选，框架不复制 TS 的泛型和可赋值性算法。 */
export async function typedProjection(
  program: Program,
  filename: string,
  source: string,
): Promise<CheckProjection> {
  const file = await program.getSourceFile(filename);
  if (!file) return { code: source, map: null };
  const checker = program.getProject().checker;
  const openingNodes: Node[] = [];
  const visit = (node: Node) => {
    if (isJsxOpeningElement(node) || isJsxSelfClosingElement(node)) openingNodes.push(node);
    node.forEachChild(visit);
  };
  visit(file);
  const optionalBindings = new Set<number>();
  for (const opening of openingNodes) {
    if (!isJsxOpeningElement(opening) && !isJsxSelfClosingElement(opening)) continue;
    if (isIdentifier(opening.tagName) && /^[a-z]/.test(opening.tagName.text)) continue;
    const bindings = opening.attributes.properties.filter(
      (attribute) =>
        isJsxAttribute(attribute) &&
        isJsxNamespacedName(attribute.name) &&
        attribute.name.namespace.text === 'bind',
    );
    if (!bindings.length) continue;
    const signature = await checker.getResolvedSignature(opening);
    const props = await checker.getParameterType(signature, 0);
    for (const attribute of bindings) {
      if (!isJsxAttribute(attribute) || !isJsxNamespacedName(attribute.name)) continue;
      const property = await props.getProperty(attribute.name.name.text);
      if (property && property.flags & SymbolFlags.Optional)
        optionalBindings.add(attribute.getStart(file));
    }
  }
  return projectForCheck(source, filename, { optionalBindings });
}
