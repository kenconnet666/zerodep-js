import { Scope, onCleanup } from '../runtime/reactivity.js';
import type { Renderable } from '../runtime/template.js';
import type { HydrationCursor } from './hydration.js';
import { HTML } from '../native/attributes.js';

export type Container = Element | DocumentFragment;
/** template 的子节点属于惰性文档片段，CSR 和接管必须走同一容器。 */
export function childContainer(element: Element): Container {
  return element.namespaceURI === HTML && element.localName === 'template'
    ? (element as HTMLTemplateElement).content
    : element;
}
export type Render = (
  value: Renderable,
  parent: Container,
  before: Node | null,
  namespaceParent?: Container,
  hydration?: HydrationCursor,
) => void;
export interface NodeRange {
  start: Comment;
  end: Comment;
  hydration?: HydrationCursor;
  failed?: boolean;
}

export function rollback(scope: Scope, error: unknown): never {
  try {
    scope.dispose();
  } catch (cleanupError) {
    throw new AggregateError([error, cleanupError], '渲染与回收均失败。');
  }
  throw error;
}

export function insert(node: Node, parent: Container, before: Node | null): void {
  parent.insertBefore(node, before);
  onCleanup(() => {
    node.parentNode?.removeChild(node);
  });
}

export function createRange(
  parent: Container,
  before: Node | null,
  label: string,
  hydration?: HydrationCursor,
): NodeRange {
  if (hydration) return hydration.range(label);
  const document = parent.ownerDocument!;
  const start = document.createComment(`zj:${label}`);
  const end = document.createComment(`zj:/${label}`);
  insert(start, parent, before);
  insert(end, parent, before);
  return { start, end };
}

export function moveRange(range: NodeRange, parent: Container, before: Node): void {
  if (range.end.nextSibling === before) return;
  let node: Node | null = range.start;
  while (node) {
    const next: Node | null = node.nextSibling;
    if (
      typeof parent.moveBefore === 'function' &&
      node.parentNode &&
      node.isConnected &&
      parent.isConnected
    ) {
      parent.moveBefore(node, before);
    } else parent.insertBefore(node, before);
    if (node === range.end) return;
    node = next;
  }
  throw new Error('列表节点范围已被外部 DOM 操作破坏。');
}

/** insertBefore 的兼容路径可能丢失焦点；只恢复仍在文档中的原输入。 */
export function preserveFocus(document: Document): () => void {
  let active = document.activeElement;
  while (active?.shadowRoot?.activeElement) active = active.shadowRoot.activeElement;
  const element = active as HTMLElement | null;
  const input = element?.matches('input,textarea')
    ? (element as HTMLInputElement | HTMLTextAreaElement)
    : null;
  const start = input?.selectionStart;
  const end = input?.selectionEnd;
  const direction = input?.selectionDirection;
  return () => {
    if (!element?.isConnected || typeof element.focus !== 'function') return;
    const root = element.getRootNode() as Document | ShadowRoot;
    if (root.activeElement !== element) element.focus({ preventScroll: true });
    if (input && start != null && end != null)
      input.setSelectionRange(start, end, direction ?? undefined);
  };
}
