import { unowned } from '../runtime/reactivity.js';
import { HTML } from '../native/attributes.js';
import { propertyName } from '../native/properties.js';
import type { Props } from '../runtime/props.js';

interface AttributeSnapshot {
  namespace: string | null;
  local: string;
  name: string;
  value: string;
}
interface MemberSnapshot {
  value: unknown;
  shadow: boolean;
  attributes: Map<string, AttributeSnapshot> | undefined;
  changed: Map<string, AttributeSnapshot>;
}

/** 一个元素持有自己的恢复值；解除绑定和卸载均释放外部组件收到的引用。 */
export class PropertyBindings {
  private readonly initial = new Map<string, MemberSnapshot>();
  private readonly element: Element;
  private disposed = false;
  constructor(element: Element) {
    this.element = element;
  }

  update(input: Props): void {
    if (this.disposed) return;
    const { element } = this;
    const next = new Map<string, unknown>();
    const keys = Object.keys(input);
    for (const key of keys) {
      if (this.disposed) return;
      const name = propertyName(key, element.localName, element.namespaceURI === HTML);
      if (!name) continue;
      const value = input[key];
      if (value !== undefined) {
        next.set(name, value);
      }
    }
    unowned(() => {
      if (this.disposed) return;
      if (
        next.size &&
        element.namespaceURI === HTML &&
        element.localName.includes('-') &&
        !element.matches(':defined')
      )
        throw new Error(
          `<${element.localName}> 的 prop 绑定要求自定义元素已注册；请先完成 customElements.whenDefined 再挂载。`,
        );
      for (const name of this.initial.keys()) if (!next.has(name)) this.restore(name);
      for (const [name, value] of next) {
        if (this.disposed) return;
        if (!(name in element))
          throw new Error(`<${element.localName}> 没有可绑定的 property ${name}。`);
        const previous = Reflect.get(element, name);
        if (this.disposed) return;
        if (!this.initial.has(name)) {
          let base: object | null = element;
          let descriptor: PropertyDescriptor | undefined;
          while (base && !(descriptor = Object.getOwnPropertyDescriptor(base, name)))
            base = Object.getPrototypeOf(base) as object | null;
          if (descriptor && !('value' in descriptor ? descriptor.writable : descriptor.set))
            throw new Error(`<${element.localName}> 的 property ${name} 不可写。`);
          this.initial.set(name, {
            value: previous,
            shadow: !Object.hasOwn(element, name) && Boolean(descriptor && 'value' in descriptor),
            // 自定义元素管理自己的反射协议；这里只恢复内建成员改动的内容属性。
            attributes:
              element.namespaceURI === HTML && element.localName.includes('-')
                ? undefined
                : this.attributes(),
            changed: new Map(),
          });
        }
        const initial = this.initial.get(name)!;
        if (!Object.is(previous, value)) {
          const errors: unknown[] = [];
          try {
            this.write(name, value, initial);
          } catch (error) {
            errors.push(error);
          }
          // setter 可能同步卸载根；它返回后写入的引用仍必须释放。
          if (this.disposed) {
            try {
              this.restoreValue(name, initial);
            } catch (error) {
              errors.push(error);
            }
          }
          if (errors.length === 1) throw errors[0];
          if (errors.length) throw new AggregateError(errors, 'property 赋值与卸载恢复失败。');
        }
      }
    });
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    unowned(() => {
      const errors: unknown[] = [];
      // 与赋值顺序一致，前面的策略成员先恢复，后面的数据 setter 再使用它。
      for (const name of [...this.initial.keys()]) {
        try {
          this.restore(name);
        } catch (error) {
          errors.push(error);
        }
      }
      this.initial.clear();
      if (errors.length === 1) throw errors[0];
      if (errors.length) throw new AggregateError(errors, 'DOM property 恢复失败。');
    });
  }

  private restore(name: string): void {
    const initial = this.initial.get(name)!;
    this.restoreValue(name, initial);
    this.initial.delete(name);
  }

  private restoreValue(name: string, initial: MemberSnapshot): void {
    // 先恢复属性缺失状态，避免 href='' 等赋值改变原本不存在的内容属性。
    for (const [key, changed] of initial.changed) {
      const original = initial.attributes?.get(key);
      if (original) this.element.setAttributeNS(original.namespace, original.name, original.value);
      else this.element.removeAttributeNS(changed.namespace, changed.local);
    }
    if (initial.shadow) {
      if (!Reflect.deleteProperty(this.element, name))
        throw new Error(`无法解除 property ${name} 对原型成员的覆盖。`);
    } else if (!Object.is(Reflect.get(this.element, name), initial.value))
      this.write(name, initial.value);
  }

  private write(name: string, value: unknown, initial?: MemberSnapshot): void {
    const before = initial?.attributes ? this.attributes() : undefined;
    try {
      if (!Reflect.set(this.element, name, value))
        throw new Error(`<${this.element.localName}> 的 property ${name} 不可写。`);
    } finally {
      if (before) {
        const after = this.attributes();
        for (const key of new Set([...before.keys(), ...after.keys()])) {
          const old = before.get(key);
          const next = after.get(key);
          if (old?.value !== next?.value || old?.name !== next?.name)
            initial!.changed.set(key, next ?? old!);
        }
      }
    }
  }

  private attributes(): Map<string, AttributeSnapshot> {
    return new Map(
      [...this.element.attributes].map((item) => [
        `${item.namespaceURI ?? ''}\0${item.localName}`,
        { namespace: item.namespaceURI, local: item.localName, name: item.name, value: item.value },
      ]),
    );
  }
}
