import { props, restProps, type Props } from '../runtime/props.js';
import { eventName } from './attributes.js';
import { _composeRefs, type DomRef } from '../runtime/refs.js';

const BINDINGS = Symbol('zerodep.bindings');
const OPEN_BINDING = Symbol('zerodep.details-open');
export const OPEN_STATE_ATTRIBUTE = 'data-zj-open';
export function hasOpenBinding(input: Props): boolean {
  return input[OPEN_BINDING] === true;
}
export type Binding = readonly [name: string, read: () => unknown, write: (value: unknown) => void];

/** 编译器保存可写关系；普通 spread 值不能伪装成有 setter 的绑定。 */
export function bindProps(input: Props, bindings: readonly Binding[]): Props {
  return props([() => input, { [BINDINGS]: () => bindings }]);
}

function readControl(event: Event, name: string): unknown {
  if (name === 'open') return (event.currentTarget as HTMLDetailsElement).open;
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

function groupModel(input: Props, read: () => unknown) {
  const type = String(input.type).toLowerCase();
  const value = input.value;
  const model = read();
  if (typeof value !== 'string') throw new TypeError('bind:group 的 value 必须是明确的字符串。');
  if (type === 'radio' && typeof model === 'string') return { value, model };
  if (type === 'checkbox' && Array.isArray(model)) {
    // 先读取一次，既检查稀疏项，也避免 getter 在校验和写回之间返回不同值。
    const items: unknown[] = Array.from(model);
    if (items.every((item): item is string => typeof item === 'string'))
      return { value, model: items };
  }
  throw new TypeError('bind:group 的 radio 需要字符串模型，checkbox 需要字符串数组。');
}

/** 只依据模型与声明值更新；不建立全局 DOM 分组表，也不从被篡改的 DOM value 写入值。 */
function writeGroup(input: Props, binding: Binding, event: Event): void {
  const [, read, write] = binding;
  const { value, model } = groupModel(input, read);
  const checked = (event.currentTarget as HTMLInputElement).checked;
  if (typeof model === 'string') {
    if (checked) write(value);
  } else if (checked) {
    if (!model.includes(value)) write([...model, value]);
  } else if (model.includes(value)) write(model.filter((item) => item !== value));
}

/** 先成为普通受控 props，SSR、接管、IME 和 reset 因而继续使用同一条输入流程。 */
export function resolveBindings(tag: string | Function, input: Props): Props {
  const bindings = input[BINDINGS] as readonly Binding[] | undefined;
  if (!bindings) return input;
  const original = restProps(input, [BINDINGS]);
  const native = typeof tag === 'string';
  const values: Record<PropertyKey, () => unknown> = Object.create(null);
  const events = new Map<string, Binding[]>();
  for (const binding of bindings) {
    const [name, read, write] = binding;
    if (name === 'this') {
      if (!native) throw new Error('bind:this 只支持 DOM 元素。');
      if (Object.hasOwn(values, 'ref')) throw new Error('bind:this 不能重复声明。');
      // ref 在正常挂载或成功接管后执行，SSR 只创建闭包、不写入 DOM 引用。
      const reference = (element: Element) => {
        write(element);
        return () => {
          // 条件切换时旧节点的清理不能抹掉新节点已经写入的引用。
          if (read() === element) write(undefined);
        };
      };
      values.ref = () => _composeRefs(reference, original.ref as DomRef<Element> | undefined);
      continue;
    }
    if (
      native &&
      !(
        (name === 'value' && ['input', 'textarea', 'select'].includes(tag)) ||
        (['checked', 'valueAsNumber', 'group'].includes(name) && tag === 'input') ||
        (name === 'open' && tag === 'details')
      )
    )
      throw new Error(`<${tag}> 不支持 bind:${name}。`);
    const property = native
      ? name === 'group'
        ? 'checked'
        : name === 'valueAsNumber'
          ? 'value'
          : name
      : name;
    if (Object.hasOwn(values, property)) throw new Error(`${property} 不能同时绑定两次。`);
    const validate = () => {
      for (const key of [
        property,
        ...(native && name !== 'open'
          ? [property === 'checked' ? 'defaultChecked' : 'defaultValue']
          : []),
        ...(native && name === 'open' ? [OPEN_STATE_ATTRIBUTE] : []),
      ])
        if (Object.hasOwn(original, key)) throw new Error(`bind:${name} 不能同时声明 ${key}。`);
      if (
        native &&
        name === 'valueAsNumber' &&
        !['number', 'range'].includes(String(original.type).toLowerCase())
      )
        throw new Error('bind:valueAsNumber 需要 type="number" 或 type="range"。');
      if (
        native &&
        name === 'checked' &&
        !['checkbox', 'radio'].includes(String(original.type).toLowerCase())
      )
        throw new Error('bind:checked 需要 type="checkbox" 或 type="radio"。');
    };
    values[property] = () => {
      validate();
      if (native && name === 'group') {
        const { value, model } = groupModel(original, read);
        return typeof model === 'string' ? model === value : model.includes(value);
      }
      const value = read();
      return native && property === 'value' ? (value ?? '') : value;
    };
    if (native && name === 'open') values[OPEN_BINDING] = () => true;
    const event = native
      ? name === 'open'
        ? 'toggle'
        : name === 'checked' || name === 'group' || tag === 'select'
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
        for (const binding of bindings) {
          const [name, , write] = binding;
          if (native && name === 'group') writeGroup(original, binding, value as Event);
          else write(native ? readControl(value as Event, name) : value);
        }
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
