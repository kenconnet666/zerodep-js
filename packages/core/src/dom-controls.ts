import { Source, getScope, onCleanup, untrack, dispatchError, type Scope } from './reactivity.js';
import type { Props } from './props.js';
import type { HydrationSession } from './hydration.js';
import { HTML, textValue, selectionValues } from './native.js';
import {
  defaultOptions,
  normalizedValue,
  selectedOptions,
  setSelection,
  writeValue,
  type InputControl,
} from './dom-input.js';

const controls = new WeakMap<Element, Control>();
export const controlProperties = new Set([
  'value',
  'defaultValue',
  'checked',
  'defaultChecked',
  'indeterminate',
]);

class Control {
  readonly element: InputControl;
  private readonly input: Props;
  private readonly owner: Scope;
  private readonly pulse = new Source(0);
  private readonly cleanups: (() => void)[] = [];
  private initialized = false;
  private composing = false;
  private ending = false;
  private disposed = false;
  private edited = false;
  private adoptingValue = false;
  private adoptingChecked = false;
  private initialSelection: Set<string> | undefined;
  private pendingChange = false;
  private changeStart: unknown;
  private commitDraft = false;
  private queued = false;
  private invalidated = false;
  private blur = false;
  private timer: ReturnType<typeof setTimeout> | undefined;
  private compositionTimer: ReturnType<typeof setTimeout> | undefined;
  private resetTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(
    element: InputControl,
    input: Props,
    hydration: HydrationSession | undefined,
    hasEvent: (type: string) => boolean,
  ) {
    this.element = element;
    this.input = input;
    this.owner = getScope()!;
    controls.set(element, this);
    onCleanup(() => {
      this.disposed = true;
      controls.delete(element);
      clearTimeout(this.timer);
      clearTimeout(this.compositionTimer);
      clearTimeout(this.resetTimer);
      for (const cleanup of this.cleanups) cleanup();
    });
    if (hydration) {
      if (element.localName === 'select') {
        const current = selectedOptions(element as HTMLSelectElement);
        const expected = defaultOptions(element as HTMLSelectElement);
        this.edited =
          current.length !== expected.length ||
          current.some((option, index) => option !== expected[index]);
        this.adoptingValue = input.value !== undefined && this.edited;
      } else {
        const node = element as HTMLInputElement | HTMLTextAreaElement;
        this.adoptingValue =
          input.value !== undefined &&
          !this.checkable &&
          node.value !== normalizedValue(node, node.defaultValue);
        this.adoptingChecked =
          input.checked !== undefined &&
          this.checkable &&
          (node as HTMLInputElement).checked !== (node as HTMLInputElement).defaultChecked;
      }
      if (this.adoptingValue || this.adoptingChecked)
        hydration.replay(() => {
          if (this.disposed) return;
          const isUncheckedRadio =
            element.localName === 'input' &&
            (element as HTMLInputElement).type === 'radio' &&
            !(element as HTMLInputElement).checked;
          const type =
            this.adoptingChecked && hasEvent('change')
              ? 'change'
              : hasEvent('input')
                ? 'input'
                : hasEvent('change')
                  ? 'change'
                  : undefined;
          this.adoptingValue = false;
          this.adoptingChecked = false;
          if (type && !isUncheckedRadio)
            element.dispatchEvent(
              new element.ownerDocument.defaultView!.Event(type, { bubbles: true, composed: true }),
            );
          this.invalidate();
        });
    }
    this.listen(
      element,
      'compositionstart',
      () => {
        clearTimeout(this.compositionTimer);
        this.composing = true;
        this.ending = false;
      },
      true,
    );
    this.listen(
      element,
      'compositionend',
      () => {
        this.ending = true;
        // 给原生最终 input 留出机会，不能在 compositionend 中途覆盖候选文字。
        this.compositionTimer = setTimeout(() => {
          this.composing = false;
          this.ending = false;
          this.invalidate();
        }, 0);
      },
      true,
    );
    this.listen(
      element,
      'input',
      (event) => {
        if ((event as InputEvent).isComposing) this.composing = true;
        else if (this.ending) {
          clearTimeout(this.compositionTimer);
          this.composing = false;
          this.ending = false;
        }
        this.edited = true;
        if (
          !this.checkable &&
          element.localName !== 'select' &&
          !hasEvent('input') &&
          hasEvent('change') &&
          !this.pendingChange
        ) {
          this.pendingChange = true;
          this.changeStart = input.value;
        }
        this.afterEvent(event, this.checkable || element.localName === 'select');
      },
      true,
    );
    this.listen(element, 'change', (event) => {
      this.edited = true;
      this.commitDraft = true;
      this.afterEvent(event);
    });
    this.listen(element, 'click', (event) => {
      if (this.checkable) this.afterEvent(event, true);
    });
    this.listen(element, 'blur', (event) => {
      this.blur = true;
      this.commitDraft = true;
      this.afterEvent(event, true);
    });
    const reset = (event: Event) => {
      if (event.target !== element.form) return;
      clearTimeout(this.resetTimer);
      this.resetTimer = setTimeout(() => {
        if (!event.defaultPrevented) {
          this.edited = false;
          this.pendingChange = false;
          this.invalidate();
        }
      }, 0);
    };
    this.listen(element.ownerDocument, 'reset', reset, true);
    Promise.resolve().then(() => {
      if (this.disposed) return;
      const root = element.getRootNode();
      if (root !== element.ownerDocument && root.nodeType === 11)
        this.listen(root, 'reset', reset, true);
    });
  }

  private get checkable(): boolean {
    return (
      this.element.localName === 'input' &&
      ['checkbox', 'radio'].includes((this.element as HTMLInputElement).type)
    );
  }

  private listen(
    target: EventTarget,
    name: string,
    callback: EventListener,
    capture = false,
  ): void {
    target.addEventListener(name, callback, capture);
    this.cleanups.push(() => target.removeEventListener(name, callback, capture));
  }

  private afterEvent(event: Event, delayed = false): void {
    if (this.queued || this.disposed) return;
    this.queued = true;
    Promise.resolve().then(() => {
      if (this.disposed) {
        this.queued = false;
        return;
      }
      const restore = () => {
        this.queued = false;
        if (this.commitDraft) {
          this.pendingChange = false;
          this.commitDraft = false;
        }
        this.invalidate();
      };
      // 原生事件的微任务检查点可能位于冒泡链中，需等剩余处理器和默认动作完成。
      if (delayed || event.eventPhase !== 0) this.timer = setTimeout(restore, 0);
      else restore();
    });
  }

  invalidate(): void {
    if (!this.disposed && !this.invalidated) {
      this.invalidated = true;
      this.pulse.write(untrack(() => this.pulse.read()) + 1);
    }
  }

  track(): void {
    this.pulse.read();
  }

  update(): void {
    this.invalidated = false;
    const { element, input } = this;
    if (!this.initialized) {
      const initial = input.defaultValue !== undefined ? input.defaultValue : input.value;
      if (element.localName === 'select') {
        if (initial !== undefined) this.initialSelection = selectionValues(initial);
      } else if (initial !== undefined) {
        const value = textValue(initial ?? '');
        normalizedValue(element as HTMLInputElement | HTMLTextAreaElement, value);
        if (element.localName === 'input' && (element as HTMLInputElement).defaultValue !== value)
          (element as HTMLInputElement).defaultValue = value;
      }
      if (element.localName === 'input') {
        const checked = input.defaultChecked !== undefined ? input.defaultChecked : input.checked;
        if (
          checked !== undefined &&
          (element as HTMLInputElement).defaultChecked !== Boolean(checked)
        )
          (element as HTMLInputElement).defaultChecked = Boolean(checked);
      }
      this.initialized = true;
    }
    if (element.localName === 'select' && this.initialSelection) {
      const select = element as HTMLSelectElement;
      const current = selectedOptions(select);
      setSelection(select, this.initialSelection, true);
      if (this.adoptingValue || (this.edited && input.value === undefined)) {
        const remaining = current.filter(
          (option) => option.parentNode && [...select.options].includes(option),
        );
        if (remaining.length)
          for (const option of select.options) option.selected = remaining.includes(option);
      }
    }
    this.sync();
    if (
      this.checkable &&
      (element as HTMLInputElement).type === 'radio' &&
      (element as HTMLInputElement).name
    ) {
      const radio = element as HTMLInputElement;
      const root = radio.getRootNode() as Document | ShadowRoot | DocumentFragment;
      for (const peer of root.querySelectorAll<HTMLInputElement>('input[type="radio"]')) {
        if (peer !== radio && peer.name === radio.name && peer.form === radio.form)
          controls.get(peer)?.restore();
      }
    }
    this.blur = false;
  }

  private restore(): void {
    if (this.disposed || this.owner.disposed) return;
    try {
      untrack(() => this.owner.run(() => this.sync()));
    } catch (error) {
      dispatchError(error, this.owner);
    }
  }

  private sync(): void {
    const { element, input } = this;
    if (this.pendingChange && !Object.is(input.value, this.changeStart)) this.pendingChange = false;
    if (
      input.value !== undefined &&
      !this.adoptingValue &&
      !this.pendingChange &&
      (!this.composing || this.checkable)
    ) {
      if (element.localName === 'select')
        setSelection(element as HTMLSelectElement, selectionValues(input.value));
      else {
        const node = element as HTMLInputElement | HTMLTextAreaElement;
        const value = normalizedValue(node, textValue(input.value ?? ''));
        writeValue(node, value, this.blur && !value && node.validity.badInput);
      }
    }
    if (element.localName === 'input') {
      const node = element as HTMLInputElement;
      if (
        input.checked !== undefined &&
        !this.adoptingChecked &&
        node.checked !== Boolean(input.checked)
      )
        node.checked = Boolean(input.checked);
      if (input.indeterminate !== undefined) node.indeterminate = Boolean(input.indeterminate);
    }
  }
}

export function bindControl(
  element: Element,
  input: Props,
  hydration: HydrationSession | undefined,
  hasEvent: (type: string) => boolean,
): Control | undefined {
  if (element.namespaceURI !== HTML || !['input', 'textarea', 'select'].includes(element.localName))
    return undefined;
  return new Control(element as InputControl, input, hydration, hasEvent);
}

/** 结构变化显式通知所属 select，选项增删与文本/value 变化不依赖 MutationObserver 的额外一轮。 */
export function notifySelect(node: Node | null): void {
  for (let parent = node; parent; parent = parent.parentNode) {
    if (parent.nodeType === 1 && (parent as Element).localName === 'select') {
      controls.get(parent as Element)?.invalidate();
      return;
    }
  }
}
