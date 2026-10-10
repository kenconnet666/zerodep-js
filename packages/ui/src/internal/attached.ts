/** 首次挂载后检查直接子项；停止后不再提示，不安装长期 DOM 观察器。 */
export function warnAttachedChildren(node: HTMLDivElement, message: string): () => void {
  let active = true;
  node.ownerDocument.defaultView!.queueMicrotask(() => {
    if (!active) return;
    if (
      Array.from(node.children).some(
        (child) => !child.hasAttribute('data-ui-action') && !child.hasAttribute('hidden'),
      ) ||
      Array.from(node.childNodes).some((child) => child.nodeType === 3 && child.textContent?.trim())
    )
      console.warn(message);
  });
  return () => {
    active = false;
  };
}
