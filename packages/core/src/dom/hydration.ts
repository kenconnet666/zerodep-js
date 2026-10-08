import { Scope, dispatchError, getScope, _onCleanup, _untrack } from '../runtime/reactivity.js';
import {
  nativeAttributes,
  selectionValues,
  attributeNamespace,
  HTML,
} from '../native/attributes.js';
import type { Props } from '../runtime/props.js';
import { hasOpenBinding, OPEN_STATE_ATTRIBUTE } from '../native/bindings.js';
import { childContainer, type Container, type NodeRange } from './utils.js';

export class HydrationError extends Error {
  readonly code = 'ZJ_HYDRATION_MISMATCH';
  constructor(message: string) {
    super(`Hydration 不匹配：${message}`);
    this.name = 'HydrationError';
  }
}

export function containsHydrationError(error: unknown): boolean {
  return (
    error instanceof HydrationError ||
    (error instanceof AggregateError && error.errors.some(containsHydrationError))
  );
}

interface Task {
  owner: Scope;
  run: () => void;
}

/** 验证期间只认领节点；监听器与 ref 在整棵树验证后激活。 */
export class HydrationSession {
  committed = false;
  readonly optionDefaults = new WeakMap<Element, boolean>();
  private readonly tasks: Task[] = [];
  private readonly after: (() => void)[] = [];
  private readonly undo: (() => void)[] = [];

  defer(run: () => void): void {
    this.tasks.push({ owner: getScope()!, run });
  }
  replay(run: () => void): void {
    this.after.push(run);
  }
  reversible(undo: () => void): void {
    this.undo.push(undo);
  }
  own(node: Node): void {
    _onCleanup(() => {
      if (this.committed) node.parentNode?.removeChild(node);
    });
  }

  commit(): void {
    this.committed = true;
    this.undo.length = 0;
    try {
      for (const task of this.tasks) {
        if (task.owner.disposed) continue;
        try {
          _untrack(() => task.owner.run(task.run));
        } catch (error) {
          dispatchError(error, task.owner);
        }
      }
      for (const replay of this.after) replay();
    } finally {
      this.tasks.length = 0;
      this.after.length = 0;
    }
  }

  rollback(): void {
    for (const undo of this.undo.reverse()) undo();
    this.undo.length = 0;
    this.tasks.length = 0;
    this.after.length = 0;
  }
}

export class HydrationCursor {
  current: Node | null;
  readonly end: Node | null;
  readonly session: HydrationSession;

  constructor(current: Node | null, end: Node | null, session: HydrationSession) {
    this.current = current;
    this.end = end;
    this.session = session;
  }

  finish(): void {
    if (this.current !== this.end)
      throw new HydrationError('区域内存在多余节点，请检查服务端与客户端初始数据或 HTML 结构。');
  }

  id(): string {
    const node = this.current;
    const match = node?.nodeType === 8 && /^zj:id:(zj-[a-f0-9]{32})$/.exec(node.textContent ?? '');
    if (!node || node === this.end || !match) throw new HydrationError('组件 ID 标记缺失或无效。');
    this.current = node.nextSibling;
    this.session.own(node);
    return match[1]!;
  }

  text(expected: string): Text | undefined {
    if (!expected) return undefined;
    const node = this.current;
    if (
      !node ||
      node === this.end ||
      node.nodeType !== 3 ||
      !(node as Text).data.startsWith(expected)
    )
      throw new HydrationError('文本内容不同。');
    const text = node as Text;
    if (text.data.length > expected.length) {
      const remainder = text.splitText(expected.length);
      this.session.reversible(() => {
        text.appendData(remainder.data);
        remainder.remove();
      });
    }
    this.current = text.nextSibling;
    this.session.own(text);
    return text;
  }

  element(tag: string, namespace: string): Element {
    const node = this.current;
    if (!node || node === this.end || node.nodeType !== 1)
      throw new HydrationError(`需要 <${tag}> 元素。`);
    const element = node as Element;
    if (
      element.localName !== (namespace === HTML ? tag.toLowerCase() : tag) ||
      element.namespaceURI !== namespace
    )
      throw new HydrationError(
        `需要 <${tag}>，实际为 <${element.localName}>。请检查浏览器是否修正了 HTML 结构。`,
      );
    this.current = element.nextSibling;
    this.session.own(element);
    return element;
  }

  attributes(element: Element, input: Props): void {
    const expected = nativeAttributes(input, element.localName, element.namespaceURI ?? HTML);
    const disclosure =
      element.namespaceURI === HTML && element.localName === 'details' && hasOpenBinding(input);
    if (
      disclosure &&
      element.getAttribute(OPEN_STATE_ATTRIBUTE) !== (expected.has('open') ? '1' : '0')
    )
      throw new HydrationError('details 的展开初值标记缺失或与客户端不同。');
    const option = element.localName === 'option' && element.closest('select') !== null;
    if (option) this.session.optionDefaults.set(element, expected.has('selected'));
    for (const [name, value] of expected) {
      if (disclosure && name === 'open') continue;
      if (option && name === 'selected') continue;
      const namespace = attributeNamespace(name, element.namespaceURI ?? HTML);
      const actual =
        name === 'nonce' && 'nonce' in element
          ? String(Reflect.get(element, 'nonce'))
          : namespace
            ? element.getAttributeNS(namespace, name.slice(name.indexOf(':') + 1))
            : element.getAttribute(name);
      if (actual !== value)
        throw new HydrationError(`<${element.localName}> 的 ${name} 属性不同。`);
    }
    for (const attribute of element.attributes) {
      if (disclosure && [OPEN_STATE_ATTRIBUTE, 'open'].includes(attribute.name)) continue;
      // option.selected 可能来自父 select 的 value，稍后由 select 属性绑定接管。
      if (option && attribute.name === 'selected') continue;
      if (!expected.has(attribute.name))
        throw new HydrationError(`<${element.localName}> 多出 ${attribute.name} 属性。`);
    }
  }

  child(element: Element): HydrationCursor {
    return new HydrationCursor(childContainer(element).firstChild, null, this.session);
  }

  select(element: HTMLSelectElement, input: Props): void {
    const model = input.value !== undefined ? input.value : input.defaultValue;
    const values = model === undefined ? undefined : selectionValues(model);
    let matched = false;
    for (const option of element.options) {
      const expected = values
        ? values.has(option.value) && (element.multiple || !matched)
        : this.session.optionDefaults.get(option);
      if (expected !== undefined && option.defaultSelected !== expected)
        throw new HydrationError('select 的初始选项与服务端不同。');
      if (expected) matched = true;
    }
  }

  range(label: string): NodeRange {
    const start = this.current;
    const open = `zj:${label}`;
    const close = `zj:/${label}`;
    const isOpen = (node: Node) =>
      node.nodeType === 8 &&
      ((node as Comment).data === open ||
        (label === 'boundary' && (node as Comment).data === `${open}:error`));
    if (!start || start === this.end || !isOpen(start))
      throw new HydrationError(`缺少 ${label} 开始标记。`);
    let depth = 1;
    let end = start.nextSibling;
    while (end && end !== this.end) {
      if (isOpen(end)) depth++;
      else if (end.nodeType === 8 && (end as Comment).data === close && --depth === 0) break;
      end = end.nextSibling;
    }
    if (!end || end === this.end) throw new HydrationError(`缺少 ${label} 结束标记。`);
    this.current = end.nextSibling;
    this.session.own(start);
    this.session.own(end);
    return {
      start: start as Comment,
      end: end as Comment,
      hydration: new HydrationCursor(start.nextSibling, end, this.session),
      failed: (start as Comment).data === `${open}:error`,
    };
  }

  opaque(): void {
    while (this.current !== this.end) {
      const node = this.current;
      if (!node) throw new HydrationError('区域结束位置已丢失。');
      this.current = node.nextSibling;
      this.session.own(node);
    }
  }
}

export function hydrationRoot(target: Container): HydrationCursor {
  return new HydrationCursor(target.firstChild, null, new HydrationSession());
}
