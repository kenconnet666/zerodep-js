import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { TraceMap, originalPositionFor } from '@jridgewell/trace-mapping';
import {
  isPropertyDeclaration,
  isPropertySignatureDeclaration,
  type Node,
} from 'typescript/unstable/ast';
import type { Location } from 'vscode-languageserver-types';

function position(text: string, offset: number) {
  const prefix = text.slice(0, offset);
  return { line: prefix.split('\n').length - 1, character: offset - prefix.lastIndexOf('\n') - 1 };
}

/** 跟随真实声明映射；包内源码导航不能靠把 dist 字符串替换成 src 猜测。 */
export async function declarationLocation(node: Node): Promise<Location> {
  const source = node.getSourceFile();
  const target =
    isPropertySignatureDeclaration(node) || isPropertyDeclaration(node) ? node.name : node;
  const location: Location = {
    uri: pathToFileURL(source.fileName).href,
    range: {
      start: position(source.text, target.getStart(source)),
      end: position(source.text, target.end),
    },
  };
  const reference = source.text.match(/\/\/# sourceMappingURL=([^\r\n]+)/)?.[1]?.trim();
  if (!/\.d\.[cm]?ts$/.test(source.fileName) || !reference || /^[a-z]+:/i.test(reference))
    return location;
  try {
    const filename = resolve(dirname(source.fileName), reference);
    const map = new TraceMap(
      JSON.parse(await readFile(filename, 'utf8')),
      pathToFileURL(filename).href,
    );
    const start = originalPositionFor(map, {
      line: location.range.start.line + 1,
      column: location.range.start.character,
    });
    const end = originalPositionFor(map, {
      line: location.range.end.line + 1,
      column: location.range.end.character,
    });
    if (start.source?.startsWith('file:') && start.line !== null) {
      const first = { line: start.line - 1, character: start.column ?? 0 };
      return {
        uri: start.source,
        range: {
          start: first,
          end:
            end.source === start.source && end.line !== null
              ? { line: end.line - 1, character: end.column ?? 0 }
              : first,
        },
      };
    }
  } catch {
    /* 缺少或损坏的第三方声明映射退回真实 d.ts，不伪造源码位置。 */
  }
  return location;
}
