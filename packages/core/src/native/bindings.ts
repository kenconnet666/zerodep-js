import { props, restProps, type Props } from '../runtime/props.js';
import { eventName } from './attributes.js';

const BINDINGS = Symbol('zerodep.bindings');
export type Binding = readonly [name: string, read: () => unknown, write: (value: unknown) => void];

/** 编译器保存可写关系；普通 spread 值不能伪装成有 setter 的绑定。 */
export function bindProps(input: Props, bindings: readonly Binding[]): Props {
  return props([() => input, { [BINDINGS]: () => bindings }]);
}

function readControl(event: Event, name: string): unknown {
  const element = event.currentTarget as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  if (name === 'checked') return (element as HTMLInputElement).checked;
  if (name === 'valueAsNumber') {
    const value = (element as HTMLInputElement).valueAsNumber;
    return Number.isNaN(value) ? undefined : value;
  }
  if (element.localName === 'select' && (element as HTMLSelectElement).multiple)
    return Array.from((element as HTMLSelectElement).selectedOptions, (option) => option.value);
  return element.value;
}

/** 先成为普通受控 props，SSR、接管、IME 和 reset 因而继续使用同一条输入流程。 */
export function resolveBindings(tag: string | Function, input: Props): Props {
  const bindings = input[BINDINGS] as readonly Binding[] | undefined;
  if (!bindings) return input;
  const original = restProps(input, [BINDINGS]);
  const native = typeof tag === 'string';
  const values: Record<string, () => unknown> = Object.create(null);
  const events = new Map<string, Binding[]>();
  for (const binding of bindings) {
    const [name, read] = binding;
    if (
      native &&
      !(
        (name === 'value' && ['input', 'textarea', 'select'].includes(tag)) ||
        (['checked', 'valueAsNumber'].includes(name) && tag === 'input')
      )
    )
      throw new Error(`<${tag}> 不支持 bind:${name}。`);
    const property = native && name === 'valueAsNumber' ? 'value' : name;
    if (Object.hasOwn(values, property)) throw new Error(`${property} 不能同时绑定两次。`);
    const validate = () => {
      for (const key of [
        property,
        ...(native ? [property === 'checked' ? 'defaultChecked' : 'defaultValue'] : []),
      ])
        if (Object.hasOwn(original, key)) throw new Error(`bind:${name} 不能同时声明 ${key}。`);
      if (
        native &&
        name === 'valueAsNumber' &&
        !['number', 'range'].includes(String(original.type))
      )
        throw new Error('bind:valueAsNumber 需要 type="number" 或 type="range"。');
      if (native && name === 'checked' && !['checkbox', 'radio'].includes(String(original.type)))
        throw new Error('bind:checked 需要 type="checkbox" 或 type="radio"。');
    };
    values[property] = () => {
      validate();
      const value = read();
      return native && property === 'value' ? (value ?? '') : value;
    };
    const event = native
      ? name === 'checked' || tag === 'select'
        ? 'change'
        : 'input'
      : `on${name[0]!.toUpperCase()}${name.slice(1)}Change`;
    const list = events.get(event) ?? [];
    list.push(binding);
    events.set(event, list);
  }

  const suppressed = (key: string) => {
    const event = native ? eventName(key) : null;
    return native ? Boolean(event && !event.capture && events.has(event.type)) : events.has(key);
  };
  for (const [event, bindings] of events) {
    const property = native ? `on:${event}` : event;
    values[property] = () =>
      function (this: unknown, value: unknown) {
        for (const [name, , write] of bindings)
          write(native ? readControl(value as Event, name) : value);
        // 各种原生事件别名按原 props 顺序执行，绑定先写回，用户回调读取最新状态。
        for (const key of Object.keys(original))
          if (native ? eventName(key)?.type === event && !eventName(key)?.capture : key === event) {
            const handler = original[key];
            if (handler == null) continue;
            if (typeof handler !== 'function') throw new TypeError(`${key} 必须是回调函数。`);
            Reflect.apply(handler, this, [value]);
          }
      };
  }
  return props([
    () => {
      const forwarded: Props = Object.create(null);
      for (const key of Reflect.ownKeys(original)) {
        if (typeof key === 'string' && suppressed(key)) continue;
        Object.defineProperty(forwarded, key, { enumerable: true, get: () => original[key] });
      }
      return forwarded;
    },
    values,
  ]);
}
