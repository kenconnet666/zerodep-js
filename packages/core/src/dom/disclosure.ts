import { Source, _onCleanup, _untrack } from '../runtime/reactivity.js';
import type { Props } from '../runtime/props.js';
import type { HydrationSession } from './hydration.js';
import { OPEN_STATE_ATTRIBUTE } from '../native/bindings.js';

/** details.open 会反映到属性；独立 SSR 初值标记用于区分接管前操作和初始数据不匹配。 */
export class DisclosureControl {
  private readonly pulse = new Source(0);
  private disposed = false;
  private adopting: boolean;
  private readonly element: HTMLDetailsElement;
  private readonly input: Props;

  constructor(element: HTMLDetailsElement, input: Props, hydration?: HydrationSession) {
    this.element = element;
    this.input = input;
    this.adopting = !!hydration && element.open !== Boolean(input.open);
    const toggle = () => {
      // 原生 toggle 和用户回调完成后再校准，同值拒绝也能恢复模型。
      queueMicrotask(() => {
        if (!this.disposed) this.pulse.write(_untrack(() => this.pulse.read()) + 1);
      });
    };
    element.addEventListener('toggle', toggle);
    _onCleanup(() => {
      this.disposed = true;
      element.removeEventListener('toggle', toggle);
    });
    if (hydration)
      hydration.replay(() => {
        if (this.disposed) return;
        element.removeAttribute(OPEN_STATE_ATTRIBUTE);
        if (this.adopting) {
          this.adopting = false;
          element.dispatchEvent(new element.ownerDocument.defaultView!.Event('toggle'));
        }
        this.update();
      });
  }

  owns(name: string): boolean {
    return name === 'open';
  }
  track(): void {
    this.pulse.read();
  }
  update(): void {
    if (!this.adopting && this.element.open !== Boolean(this.input.open))
      this.element.open = Boolean(this.input.open);
  }
}
