import {
  SyntaxKind,
  isJsxOpeningElement,
  isJsxSelfClosingElement,
  type JsxAttribute,
  type JsxAttributes,
  type Node,
} from 'typescript/unstable/ast';
import type { Symbol as TypeScriptSymbol } from 'typescript/unstable/async';
import type {
  CompletionItem,
  CompletionList,
  Hover,
  Location,
  Position,
  Range,
} from 'vscode-languageserver-types';
import { TypeScriptService, type SourceDocument } from './service.js';
import { declarationLocation } from './declarations.js';

export function offsetAt(text: string, position: Position): number {
  let offset = 0;
  for (let line = 0; line < position.line; line++) {
    const next = text.indexOf('\n', offset);
    if (next < 0) return text.length;
    offset = next + 1;
  }
  return Math.min(text.length, offset + position.character);
}

export function positionAt(text: string, offset: number): Position {
  const prefix = text.slice(0, offset);
  return { line: prefix.split('\n').length - 1, character: offset - prefix.lastIndexOf('\n') - 1 };
}

export function wrapJsxExpression(item: CompletionItem, range: Range): CompletionItem {
  const text = item.textEdit?.newText ?? item.insertText ?? item.label;
  return {
    ...item,
    textEdit: { range, newText: text.startsWith('{') ? text : `{${text}}` },
    data: { ...item.data, zerodepBraces: range },
  };
}

/** 官方补全遗漏命名空间属性时，从同一个项目的真实上下文类型和声明生成结果。 */
export async function namespacedAttributes(
  service: TypeScriptService,
  document: SourceDocument,
  position: Position,
  action: 'completion' | 'definition' | 'hover',
): Promise<CompletionList | Location[] | Hover | undefined> {
  return service.withDocument(document, async () => {
    // API 和 LSP 是两条连接；等待 LSP 处理 didOpen 后再读取同一项目快照。
    await service.connection.sendRequest('textDocument/hover', {
      textDocument: { uri: document.uri },
      position,
    });
    const api = await service.openAPI();
    const snapshot = await api.getCurrentLanguageServerSnapshot();
    try {
      const identifier = { uri: document.uri };
      const project = await snapshot.getDefaultProjectForFile(identifier);
      const program = project && snapshot.getProgram(project.id);
      const file = await program?.getSourceFile(identifier);
      if (!project || !file) return undefined;
      const offset = offsetAt(document.text, position);
      let attributes: JsxAttributes | undefined;
      let attribute: JsxAttribute | undefined;
      const visit = (node: Node) => {
        if (offset < node.pos || offset > node.end) return;
        if (node.kind === SyntaxKind.JsxAttributes) attributes = node as JsxAttributes;
        if (node.kind === SyntaxKind.JsxAttribute) {
          const candidate = node as JsxAttribute;
          if (offset >= candidate.name.pos && offset <= candidate.name.end) attribute = candidate;
        }
        node.forEachChild(visit);
      };
      visit(file);
      if (!attributes || !attribute) return undefined;
      const start = attribute.name.getStart(file);
      const end = attribute.name.end;
      const prefix = document.text.slice(start, offset).replace(/\s/g, '');
      const fullName = document.text.slice(start, end).replace(/\s/g, '');
      const range = {
        start: positionAt(document.text, start),
        end: positionAt(document.text, end),
      };
      const previous = attributes.properties[attributes.properties.indexOf(attribute) - 1];
      if (
        action === 'completion' &&
        previous?.kind === SyntaxKind.JsxAttribute &&
        !(previous as JsxAttribute).initializer &&
        /^\s*=\s*$/.test(document.text.slice((previous as JsxAttribute).name.end, start))
      ) {
        const raw = await service.connection.sendRequest<CompletionList | CompletionItem[]>(
          'textDocument/completion',
          {
            textDocument: { uri: document.uri },
            position,
          },
        );
        const items = (Array.isArray(raw) ? raw : raw.items).map((item) =>
          wrapJsxExpression(item, range),
        );
        return { isIncomplete: Array.isArray(raw) ? false : raw.isIncomplete, items };
      }
      const contextual = await project.checker.getContextualType(attributes);
      if (!contextual) return undefined;
      const properties = await project.checker.getPropertiesOfType(contextual);
      const declarationSource = async (symbol: TypeScriptSymbol) => {
        if (symbol.declarations.length || !symbol.name.startsWith('bind:')) return symbol;
        const opening = attributes!.parent;
        if (!opening || (!isJsxOpeningElement(opening) && !isJsxSelfClosingElement(opening)))
          return symbol;
        // bind 的映射属性可能没有 declarations；从已解析组件签名追溯原 props，不猜声明位置。
        const signature = await project.checker.getResolvedSignature(opening);
        const props = await project.checker.getParameterType(signature, 0);
        return (await props.getProperty(symbol.name.slice(5))) ?? symbol;
      };
      if (action === 'completion') {
        const items = [];
        for (const symbol of properties) {
          if (!symbol.name.includes(':') || !symbol.name.startsWith(prefix)) continue;
          const type = await project.checker.getTypeOfSymbolAtLocation(symbol, attributes);
          const documentation = await (
            await declarationSource(symbol)
          ).getDocumentationComment(project.checker);
          items.push({
            label: symbol.name,
            kind: 10 as const,
            detail: await project.checker.typeToString(type),
            documentation: { kind: 'markdown' as const, value: documentation },
            filterText: symbol.name,
            insertText: symbol.name,
            textEdit: { range, newText: symbol.name },
            data: { zerodepNamespace: true },
          });
        }
        return items.length ? { isIncomplete: false, items } : undefined;
      }
      const symbol = properties.find((item) => item.name === fullName && item.name.includes(':'));
      if (!symbol) return undefined;
      if (action === 'hover') {
        const type = await project.checker.getTypeOfSymbolAtLocation(symbol, attributes);
        return {
          contents: {
            kind: 'markdown',
            value: `\`\`\`typescript\n${symbol.name}: ${await project.checker.typeToString(type)}\n\`\`\`\n${await (await declarationSource(symbol)).getDocumentationComment(project.checker)}`,
          },
          range,
        };
      }
      const locations: Location[] = [];
      for (const handle of (await declarationSource(symbol)).declarations) {
        const node = await handle.resolve();
        if (!node) continue;
        locations.push(await declarationLocation(node));
      }
      return locations;
    } finally {
      await snapshot.dispose();
    }
  });
}
