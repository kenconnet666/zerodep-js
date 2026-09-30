import { Scope, getScope, untrack } from './reactivity.js';
import { dynamic } from './template.js';
import type { BoundaryTemplate } from './flow.js';
import { HydrationCursor, containsHydrationError } from './hydration.js';
import { createRange, rollback, type Container, type Render } from './dom-utils.js';

export function renderBoundary(
  template: BoundaryTemplate,
  parent: Container,
  before: Node | null,
  namespaceParent: Container,
  render: Render,
  hydration?: HydrationCursor,
): void {
  const owner = new Scope(getScope());
  const range = owner.run(() => createRange(parent, before, 'boundary', hydration));
  let pending = range.hydration;
  let branch: Scope | undefined;
  let recovering = false;

  const reset = () => {
    if (!owner.disposed) display();
  };
  function retryAfterCommit(failure?: { error: unknown }): void {
    const cursor = pending!;
    branch = new Scope(owner);
    const opaque = new HydrationCursor(range.start.nextSibling, range.end, cursor.session);
    branch.run(() => opaque.opaque());
    pending = undefined;
    cursor.session.defer(() => display(failure));
  }
  function display(failure?: { error: unknown }): void {
    recovering = failure !== undefined;
    const next = new Scope(owner);
    const cursor = pending;
    if (cursor) {
      try {
        untrack(() =>
          next.run(() =>
            render(
              dynamic(() => template.input.children),
              range.end.parentNode as Container,
              range.end,
              namespaceParent,
              cursor,
            ),
          ),
        );
        cursor.finish();
      } catch (error) {
        try {
          next.dispose();
        } catch (cleanupError) {
          throw new AggregateError([error, cleanupError], 'Hydration 子树清理失败。');
        }
        if (containsHydrationError(error)) throw error;
        retryAfterCommit({ error });
        return;
      }
      branch = next;
      pending = undefined;
      return;
    }
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
    try {
      branch?.dispose();
    } catch (error) {
      rollback(next, error);
    }
    branch = next;
    range.end.parentNode!.insertBefore(fragment, range.end);
    range.start.data = failure ? 'zj:boundary:error' : 'zj:boundary';
  }
  owner.onError = (error) => {
    if (recovering) throw error;
    display({ error });
  };
  try {
    if (range.failed && pending) retryAfterCommit();
    else display();
  } catch (error) {
    rollback(owner, error);
  }
}
