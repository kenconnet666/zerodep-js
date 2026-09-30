import { Scope, getScope, renderEffect, untrack, type Cleanup } from './reactivity.js';
import { setupComponent, type AnyComponent, type ComponentProps } from './component.js';
import { TEMPLATE, element, type DynamicTemplate, type Renderable } from './template.js';
import { attachAttributes, attachRef } from './dom-attributes.js';
import type { Props } from './props.js';
import { createRange, insert, rollback, type Container } from './dom-utils.js';
import { renderList } from './dom-list.js';
import { renderBoundary } from './dom-boundary.js';

export type MountOptions<C extends AnyComponent> = {
  target: Container;
} & ({} extends ComponentProps<C> ? { props?: ComponentProps<C> } : { props: ComponentProps<C> });
const roots = new WeakMap<Container, Cleanup>();
const svg = 'http://www.w3.org/2000/svg';
const html = 'http://www.w3.org/1999/xhtml';

function renderDynamic(
  template: DynamicTemplate,
  parent: Container,
  before: Node | null,
  namespaceParent: Container,
): void {
  const owner = getScope()!;
  const { end: anchor } = createRange(parent, before, 'dynamic');
  let branch: Scope | undefined;
  let previous: Renderable;
  let text: Text | undefined;
  renderEffect(() => {
    const value = template.value.read();
    if (Object.is(value, previous)) return;
    const primitive =
      typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint';
    if (primitive && text) {
      text.data = String(value);
      previous = value;
      return;
    }
    const next = new Scope(owner);
    const fragment = parent.ownerDocument!.createDocumentFragment();
    try {
      untrack(() => next.run(() => renderValue(value, fragment, null, namespaceParent)));
    } catch (error) {
      rollback(next, error);
    }
    branch?.dispose();
    branch = next;
    text = primitive ? (fragment.firstChild as Text) : undefined;
    anchor.parentNode!.insertBefore(fragment, anchor);
    previous = value;
  });
}

/** 只动态区域执行更新；组件 setup 与静态节点不会随着父级状态整体重跑。 */
export function renderValue(
  value: Renderable,
  parent: Container,
  before: Node | null,
  namespaceParent: Container = parent,
): void {
  if (value == null || typeof value === 'boolean') return;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint') {
    insert(parent.ownerDocument!.createTextNode(String(value)), parent, before);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) renderValue(item, parent, before, namespaceParent);
    return;
  }
  if (typeof value !== 'object' || !(TEMPLATE in value))
    throw new Error('无效 JSX 内容；函数请显式调用，对象请转换为可呈现值。');
  if (value.kind === 'fragment') {
    for (const child of value.children) renderValue(child, parent, before, namespaceParent);
    return;
  }
  if (value.kind === 'dynamic') {
    renderDynamic(value, parent, before, namespaceParent);
    return;
  }
  if (value.kind === 'list') {
    renderList(value, parent, before, namespaceParent, renderValue);
    return;
  }
  if (value.kind === 'boundary') {
    renderBoundary(value, parent, before, namespaceParent, renderValue);
    return;
  }
  if (typeof value.tag !== 'string') {
    const scope = new Scope();
    try {
      untrack(() =>
        scope.run(() =>
          renderValue(
            setupComponent(value.tag as AnyComponent, value.props),
            parent,
            before,
            namespaceParent,
          ),
        ),
      );
    } catch (error) {
      rollback(scope, error);
    }
    return;
  }
  const inherited = namespaceParent.nodeType === 1 ? (namespaceParent as Element) : null;
  const namespace =
    value.tag === 'svg' ||
    (inherited?.namespaceURI === svg && inherited.localName !== 'foreignObject')
      ? svg
      : html;
  const node = parent.ownerDocument!.createElementNS(namespace, value.tag);
  insert(node, parent, before);
  attachAttributes(node, value.props);
  renderValue(value.props.children as Renderable, node, null);
  attachRef(node, value.props, getScope()!);
}

export function mount<C extends AnyComponent>(component: C, options: MountOptions<C>): Cleanup {
  const { target } = options;
  if (roots.has(target)) throw new Error('目标容器已挂载，请先调用其 disposer。');
  const scope = new Scope(null);
  const fragment = target.ownerDocument!.createDocumentFragment();
  try {
    scope.run(() =>
      renderValue(element(component, (options.props ?? {}) as Props), fragment, null, target),
    );
    target.replaceChildren(fragment);
  } catch (error) {
    rollback(scope, error);
  }
  const dispose = () => {
    try {
      scope.dispose();
    } finally {
      roots.delete(target);
    }
  };
  roots.set(target, dispose);
  return dispose;
}
