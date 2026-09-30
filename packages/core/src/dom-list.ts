import { Scope, Source, batch, getScope, renderEffect, untrack } from './reactivity.js';
import { dynamic } from './template.js';
import type { Key, ListTemplate } from './flow.js';
import type { HydrationCursor } from './hydration.js';
import {
  createRange,
  moveRange,
  preserveFocus,
  rollback,
  type Container,
  type NodeRange,
  type Render,
} from './dom-utils.js';

interface Row {
  scope: Scope;
  nodes: NodeRange;
  item: Source<unknown>;
  index: Source<number>;
}

export function renderList(
  template: ListTemplate,
  parent: Container,
  before: Node | null,
  namespaceParent: Container,
  render: Render,
  hydration?: HydrationCursor,
): void {
  const owner = getScope()!;
  const range = createRange(parent, before, 'list', hydration);
  let pending = range.hydration;
  let rows = new Map<Key, Row>();
  let fallback: Scope | undefined;

  renderEffect(() => {
    // 纯快照先验证 key；错误数据不能先破坏现有行。
    const entries = template.entries.read();
    untrack(() =>
      batch(() => {
        const next = new Map<Key, Row>();
        const created: Row[] = [];
        try {
          for (const [index, entry] of entries.entries()) {
            let row = rows.get(entry.key);
            if (!row) {
              const scope = new Scope(owner);
              const item = new Source(entry.item);
              const position = new Source(index);
              const fragment = pending
                ? (range.end.parentNode as Container)
                : parent.ownerDocument!.createDocumentFragment();
              try {
                const nodes = scope.run(() => {
                  const nodes = createRange(fragment, null, 'row', pending);
                  render(
                    template.render(
                      () => item.read(),
                      () => position.read(),
                    ),
                    fragment,
                    nodes.end,
                    namespaceParent,
                    nodes.hydration,
                  );
                  nodes.hydration?.finish();
                  return nodes;
                });
                row = { scope, item, index: position, nodes };
                created.push(row);
              } catch (error) {
                rollback(scope, error);
              }
            }
            next.set(entry.key, row);
          }
        } catch (error) {
          const errors = [error];
          for (const row of created) {
            try {
              row.scope.dispose();
            } catch (cleanupError) {
              errors.push(cleanupError);
            }
          }
          if (errors.length > 1) throw new AggregateError(errors, '列表初始化与回收失败。');
          throw error;
        }

        const errors: unknown[] = [];
        for (const [key, row] of rows)
          if (!next.has(key)) {
            try {
              row.scope.dispose();
            } catch (error) {
              errors.push(error);
            }
          }
        rows = next;
        if (entries.length) {
          try {
            fallback?.dispose();
          } catch (error) {
            errors.push(error);
          }
          fallback = undefined;
        }
        const restoreFocus = pending ? () => {} : preserveFocus(range.end.ownerDocument!);
        try {
          let anchor: Node = range.end;
          for (let index = entries.length - 1; index >= 0; index--) {
            const entry = entries[index]!;
            const row = rows.get(entry.key)!;
            row.item.write(entry.item);
            row.index.write(index);
            if (!pending) moveRange(row.nodes, range.end.parentNode as Container, anchor);
            anchor = row.nodes.start;
          }
        } finally {
          restoreFocus();
        }
        if (!entries.length && !fallback) {
          fallback = new Scope(owner);
          try {
            fallback.run(() =>
              render(
                dynamic(template.fallback),
                range.end.parentNode as Container,
                range.end,
                namespaceParent,
                pending,
              ),
            );
          } catch (error) {
            const failed = fallback;
            fallback = undefined;
            rollback(failed, error);
          }
        }
        pending?.finish();
        pending = undefined;
        if (errors.length === 1) throw errors[0];
        if (errors.length) throw new AggregateError(errors, '列表清理失败。');
      }),
    );
  });
}
