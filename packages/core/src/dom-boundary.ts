import { Scope, getScope, untrack } from './reactivity.js';
import { dynamic } from './template.js';
import type { BoundaryTemplate } from './flow.js';
import { createRange, rollback, type Container, type Render } from './dom-utils.js';

export function renderBoundary(
  template: BoundaryTemplate,
  parent: Container,
  before: Node | null,
  namespaceParent: Container,
  render: Render,
): void {
  const owner = new Scope(getScope());
  const range = owner.run(() => createRange(parent, before, 'boundary'));
  let branch: Scope | undefined;
  let recovering = false;

  const reset = () => {
    if (!owner.disposed) display();
  };
  function display(failure?: { error: unknown }): void {
    recovering = failure !== undefined;
    const next = new Scope(owner);
    const fragment = parent.ownerDocument!.createDocumentFragment();
    try {
      untrack(() =>
        next.run(() =>
          render(
            dynamic(() =>
              failure ? template.input.fallback(failure.error, reset) : template.input.children,
            ),
            fragment,
            null,
            namespaceParent,
          ),
        ),
      );
    } catch (error) {
      let reason = error;
      try {
        next.dispose();
      } catch (cleanupError) {
        reason = new AggregateError([error, cleanupError], '错误边界初始化与回收失败。');
      }
      if (failure) throw reason;
      display({ error: reason });
      return;
    }
    branch?.dispose();
    branch = next;
    range.end.parentNode!.insertBefore(fragment, range.end);
  }
  owner.onError = (error) => {
    if (recovering) throw error;
    display({ error });
  };
  try {
    display();
  } catch (error) {
    rollback(owner, error);
  }
}
