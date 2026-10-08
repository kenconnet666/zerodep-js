import { Scope, getScope, _effect, _onCleanup, _untrack } from '../runtime/reactivity.js';
import { dynamic, TEMPLATE, type Renderable } from '../runtime/template.js';
import { defineComponent } from '../runtime/component.js';
import type { PortalTemplate } from '../runtime/flow.js';
import { HTML, textTags, voidTags } from '../native/attributes.js';
import { notifySelect } from './controls.js';
import {
  childContainer,
  createRange,
  moveRange,
  preserveFocus,
  rollback,
  type Container,
  type NodeRange,
  type Render,
} from './utils.js';
import type { HydrationCursor } from './hydration.js';

export interface PortalProps {
  /** 默认放入当前文档 body；null 暂不显示。目标改变时保留子组件和节点。 */
  target?: HTMLElement | null | undefined;
  children?: Renderable;
}

/** 只改变 DOM 放置位置，组件上下文、错误边界和清理仍属于原父组件。 */
export const Portal = defineComponent((input: PortalProps): PortalTemplate => ({
  [TEMPLATE]: true,
  kind: 'portal',
  input,
}));

export function renderPortal(
  template: PortalTemplate,
  parent: Container,
  before: Node | null,
  render: Render,
  hydration?: HydrationCursor,
): void {
  const owner = getScope()!;
  const document = parent.ownerDocument!;
  const placeholder = createRange(parent, before, 'portal', hydration);
  placeholder.hydration?.finish();
  let scope: Scope | undefined;
  let range: NodeRange | undefined;
  let previous: HTMLElement | undefined;
  _onCleanup(() => {
    if (previous) notifySelect(previous);
  });

  const start = () =>
    _effect(() => {
      // 公共入口使用 HTMLElement 类型；内部协议跨 SSR 边界，下面仍验证真实目标。
      const target = template.input.target as HTMLElement | null | undefined;
      const destination = target === undefined ? document.body : target;
      _untrack(() => {
        if (destination == null) {
          scope?.dispose();
          scope = undefined;
          range = undefined;
          if (previous) notifySelect(previous);
          previous = undefined;
          return;
        }
        if (
          destination.nodeType !== 1 ||
          destination.ownerDocument !== document ||
          destination.namespaceURI !== HTML ||
          voidTags.has(destination.localName) ||
          textTags.has(destination.localName)
        )
          throw new Error('Portal target 必须是同一文档内可以容纳子节点的 HTML 元素。');
        const container = childContainer(destination);
        if (range) {
          // 不允许把自己的祖先节点移进自身，避免范围移动一半才发生 DOM 异常。
          for (let node: Node | null = range.start; node; node = node.nextSibling) {
            if (node === destination || node.contains(destination))
              throw new Error('Portal 不能挂载到自己的子树中。');
            if (node === range.end) break;
          }
          if (destination === previous) return;
          const restore = preserveFocus(document);
          moveRange(range, container, null);
          restore();
        } else {
          // 子内容属于原组件，不属于这个负责移动目标的 effect；换目标不会重建子组件。
          const next = new Scope(owner);
          const fragment = document.createDocumentFragment();
          let created!: NodeRange;
          try {
            next.run(() => {
              created = createRange(fragment, null, 'portal-content');
              render(
                dynamic(() => template.input.children),
                fragment,
                created.end,
                destination,
              );
            });
            container.appendChild(fragment);
          } catch (error) {
            rollback(next, error);
          }
          scope = next;
          range = created;
        }
        if (previous) notifySelect(previous);
        notifySelect(destination);
        previous = destination;
      });
    });
  // SSR 只留下原位置的空标记；整棵树接管成功后，才允许写外部目标。
  if (hydration) hydration.session.defer(start);
  else start();
}
