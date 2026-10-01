import { Scope, getScope, renderEffect, untrack, type Cleanup } from './reactivity.js';
import { setupComponent, type AnyComponent, type ComponentProps } from './component.js';
import { TEMPLATE, element, type DynamicTemplate, type Renderable } from './template.js';
import { attachAttributes, attachRef } from './dom-attributes.js';
import { notifySelect } from './dom-controls.js';
import type { Props } from './props.js';
import { childContainer, createRange, insert, rollback, type Container } from './dom-utils.js';
import { renderList } from './dom-list.js';
import { renderBoundary } from './dom-boundary.js';
import { HydrationError, HydrationCursor, hydrationRoot } from './hydration.js';
import {
  HTML,
  namespaceFor,
  textTags,
  textValue,
  elementText,
  voidTags,
  assertName,
} from './native.js';

export type MountOptions<C extends AnyComponent> = {
  target: Container;
} & ({} extends ComponentProps<C> ? { props?: ComponentProps<C> } : { props: ComponentProps<C> });
const roots = new WeakMap<Container, Cleanup>();
export type HydrateOptions<C extends AnyComponent> = MountOptions<C> & {
  mismatch?: 'throw' | 'replace';
  onMismatch?: (error: HydrationError) => void;
};

function renderDynamic(
  template: DynamicTemplate,
  parent: Container,
  before: Node | null,
  namespaceParent: Container,
  hydration?: HydrationCursor,
): void {
  const owner = getScope()!;
  const range = createRange(parent, before, 'dynamic', hydration);
  const anchor = range.end;
  let pending = range.hydration;
  let initialized = false;
  let branch: Scope | undefined;
  let previous: Renderable;
  let text: Text | undefined;
  renderEffect(() => {
    const value = template.value.read();
    if (initialized && Object.is(value, previous)) return;
    const primitive =
      typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint';
    if (primitive && text) {
      text.data = textValue(value);
      previous = value;
      return;
    }
    const next = new Scope(owner);
    if (pending) {
      const cursor = pending;
      const first = cursor.current;
      try {
        untrack(() =>
          next.run(() =>
            renderValue(value, anchor.parentNode as Container, anchor, namespaceParent, cursor),
          ),
        );
        cursor.finish();
      } catch (error) {
        rollback(next, error);
      }
      branch = next;
      text = primitive && textValue(value) && first?.nodeType === 3 ? (first as Text) : undefined;
      previous = value;
      pending = undefined;
      initialized = true;
      return;
    }
    const fragment = parent.ownerDocument!.createDocumentFragment();
    try {
      untrack(() => next.run(() => renderValue(value, fragment, null, namespaceParent)));
    } catch (error) {
      rollback(next, error);
    }
    try {
      branch?.dispose();
    } catch (error) {
      rollback(next, error);
    }
    branch = next;
    text = primitive ? (fragment.firstChild as Text) : undefined;
    anchor.parentNode!.insertBefore(fragment, anchor);
    notifySelect(anchor.parentNode);
    previous = value;
    initialized = true;
  });
}

/** 只动态区域执行更新；组件 setup 与静态节点不会随着父级状态整体重跑。 */
export function renderValue(
  value: Renderable,
  parent: Container,
  before: Node | null,
  namespaceParent: Container = parent,
  hydration?: HydrationCursor,
): void {
  if (value == null || typeof value === 'boolean') return;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint') {
    const content = textValue(value);
    if (hydration) hydration.text(content);
    else if (content) insert(parent.ownerDocument!.createTextNode(content), parent, before);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) renderValue(item, parent, before, namespaceParent, hydration);
    return;
  }
  if (typeof value !== 'object' || !(TEMPLATE in value))
    throw new Error('无效 JSX 内容；函数请显式调用，对象请转换为可呈现值。');
  if (value.kind === 'fragment') {
    for (const child of value.children)
      renderValue(child, parent, before, namespaceParent, hydration);
    return;
  }
  if (value.kind === 'dynamic') {
    renderDynamic(value, parent, before, namespaceParent, hydration);
    return;
  }
  if (value.kind === 'list') {
    renderList(value, parent, before, namespaceParent, renderValue, hydration);
    return;
  }
  if (value.kind === 'boundary') {
    renderBoundary(value, parent, before, namespaceParent, renderValue, hydration);
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
            hydration,
          ),
        ),
      );
    } catch (error) {
      rollback(scope, error);
    }
    return;
  }
  const inherited = namespaceParent.nodeType === 1 ? (namespaceParent as Element) : null;
  const namespace = namespaceFor(
    value.tag,
    inherited?.namespaceURI ?? HTML,
    inherited?.localName ?? '',
    inherited?.getAttribute('encoding') ?? '',
  );
  assertName(value.tag);
  const node = hydration
    ? hydration.element(value.tag, namespace)
    : parent.ownerDocument!.createElementNS(namespace, value.tag);
  if (hydration) hydration.attributes(node, value.props);
  else insert(node, parent, before);
  const owner = getScope()!;
  const attributes = () => attachAttributes(node, value.props, hydration?.session);
  if (node.localName !== 'select') {
    if (hydration) hydration.session.defer(attributes);
    else attributes();
  }
  const child = hydration?.child(node);
  if (namespace === HTML && node.localName === 'noscript') {
    // 脚本启用时，HTML 解析器把备用内容当作文本；客户端不初始化其中的组件。
  } else if (namespace === HTML && textTags.has(node.localName)) {
    const fixed =
      node.localName === 'textarea' &&
      (value.props.value !== undefined || value.props.defaultValue !== undefined);
    const initial = elementText(node.localName, value.props);
    let text: Text | undefined;
    if (child) {
      text = child.text(initial);
      child.finish();
    }
    const bindText = () =>
      renderEffect(() => {
        const content = fixed ? initial : elementText(node.localName, value.props);
        if (text) text.data = content;
        else if (content) {
          text = node.ownerDocument.createTextNode(content);
          node.appendChild(text);
        }
        if (node.localName === 'option') notifySelect(node.parentNode);
      });
    if (hydration) hydration.session.defer(bindText);
    else bindText();
  } else {
    if (namespace === HTML && voidTags.has(node.localName) && value.props.children != null)
      throw new Error(`${node.localName} 是 void 元素，不能包含 children。`);
    renderValue(value.props.children as Renderable, childContainer(node), null, node, child);
    child?.finish();
  }
  if (node.localName === 'select') {
    hydration?.select(node as HTMLSelectElement, value.props);
    if (hydration) hydration.session.defer(attributes);
    else attributes();
  }
  if (hydration) hydration.session.defer(() => attachRef(node, value.props, owner));
  else attachRef(node, value.props, owner);
}

export function mount<C extends AnyComponent>(component: C, options: MountOptions<C>): Cleanup {
  const { target } = options;
  if (roots.has(target)) throw new Error('目标容器已挂载，请先调用其 disposer。');
  const scope = new Scope(null);
  const dispose = () => {
    try {
      scope.dispose();
    } finally {
      roots.delete(target);
    }
  };
  roots.set(target, dispose);
  const fragment = target.ownerDocument!.createDocumentFragment();
  try {
    scope.run(() =>
      renderValue(element(component, (options.props ?? {}) as Props), fragment, null, target),
    );
    target.replaceChildren(fragment);
  } catch (error) {
    roots.delete(target);
    rollback(scope, error);
  }
  return dispose;
}

export function hydrate<C extends AnyComponent>(component: C, options: HydrateOptions<C>): Cleanup {
  const { target } = options;
  if (roots.has(target)) throw new Error('目标容器已挂载，请先调用其 disposer。');
  const scope = new Scope(null);
  const cursor = hydrationRoot(target);
  const dispose = () => {
    try {
      scope.dispose();
    } finally {
      roots.delete(target);
    }
  };
  roots.set(target, dispose);
  try {
    scope.run(() =>
      renderValue(element(component, (options.props ?? {}) as Props), target, null, target, cursor),
    );
    cursor.finish();
    cursor.session.commit();
    return dispose;
  } catch (error) {
    const errors = [error];
    try {
      dispose();
    } catch (cleanupError) {
      errors.push(cleanupError);
    }
    cursor.session.rollback();
    if (errors.length > 1) throw new AggregateError(errors, 'Hydration 与清理失败。');
    if (error instanceof HydrationError) {
      options.onMismatch?.(error);
      if (options.mismatch === 'replace') return mount(component, options);
    }
    throw error;
  }
}
