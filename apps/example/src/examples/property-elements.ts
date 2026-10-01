export interface ProbeData {
  label: string;
}
export interface PropertyProbeElement extends HTMLElement {
  data: ProbeData;
  format: (value: string) => string;
}
declare global {
  interface HTMLElementTagNameMap {
    'zj-property-probe': PropertyProbeElement;
    'zj-late-probe': PropertyProbeElement;
  }
}

/** 注册属于浏览器入口；服务端可以导入类型和函数，但不会访问 HTMLElement。 */
export function registerPropertyElement(name = 'zj-property-probe'): void {
  if (customElements.get(name)) return;
  class PropertyProbe extends HTMLElement implements PropertyProbeElement {
    private current: ProbeData = { label: '默认对象' };
    private readonly label: HTMLElement;
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      this.label = document.createElement('span');
      this.label.textContent = this.current.label;
      const button = document.createElement('button');
      button.textContent = '发送对象事件';
      button.addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent<ProbeData>('ValueChanged', {
            detail: this.current,
            bubbles: true,
            composed: true,
          }),
        );
      });
      shadow.append(this.label, button);
    }
    get data(): ProbeData {
      return this.current;
    }
    set data(value: ProbeData) {
      this.current = value;
      this.label.textContent = this.format(value.label);
    }
    format(value: string): string {
      return value;
    }
  }
  customElements.define(name, PropertyProbe);
}
