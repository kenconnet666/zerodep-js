import type { CssClassInput, CssClass } from '../util/author.js';
import type { ClassStyle } from 'zerodep-js';
import { Css } from '../generated/author.js';
import { getKeywordBinding } from '../util/keywords.js';
import { inlineValue } from '../util/values.js';

const VALUE = Symbol('implicit CSS value');
interface Value {
  [VALUE]: true;
  declaration: string;
  variable: string;
  value: string | undefined;
}
/** 编译器内部协议：和 TSX 一样保留接收者/方法先于参数求值的顺序。 */
export function cssBinding(
  author: unknown,
  property: string,
  member: string,
  read: () => unknown,
  variable: string,
): Value {
  const target = (author as Record<string, Record<string, (...args: unknown[]) => string>>)[
    property
  ]!;
  const fn = target[member]!;
  const before = authorInputs(author, property, member);
  const value = read();
  const keyword = getKeywordBinding(target);
  const after = before && authorInputs(author, property, member);
  const same =
    before && after && before.length === after.length && before.every((v, i) => v === after[i]);
  if (member === 'raw' && keyword?.method === fn && before) {
    const resolved = keyword.apply(value);
    const text =
      same && !resolved.token && /^--zj-[a-z0-9-]+$/.test(variable)
        ? inlineValue(property, member, resolved.value)
        : undefined;
    return {
      [VALUE]: true,
      declaration:
        text === undefined
          ? resolved.declaration
          : keyword.raw.call(target, `var(${variable})` as never),
      variable,
      value: text,
    };
  }
  // 保留原方法的一次调用；只复用已核对结果，不跳过自定义副作用或异常。
  const declaration = Reflect.apply(fn, target, [value]) as string;
  const text =
    same && /^--zj-[a-z0-9-]+$/.test(variable) ? inlineValue(property, member, value) : undefined;
  return {
    [VALUE]: true,
    declaration:
      text === undefined
        ? declaration
        : (Reflect.apply(keyword?.raw ?? Reflect.get(target, 'raw'), target, [
            `var(${variable})`,
          ]) as string),
    variable,
    value: text,
  };
}

export function cssResult(
  register: (...parts: CssClassInput[]) => CssClass,
  parts: (CssClassInput | Value)[],
): ClassStyle {
  const styles: string[] = [];
  const resolve = (part: CssClassInput | Value): CssClassInput => {
    if (part && typeof part === 'object' && VALUE in part) {
      if (part.value !== undefined) styles.push(`${part.variable}:${part.value};`);
      return part.declaration;
    }
    if (Array.isArray(part)) return part.map(resolve);
    if (part && typeof part === 'object') {
      const bundle = part as ClassStyle;
      styles.push(bundle.style);
      return { class: bundle.class, style: '' };
    }
    return part;
  };
  const result = register(...parts.map(resolve));
  return {
    class: typeof result === 'string' ? result : result.class,
    style: [...styles, typeof result === 'string' ? '' : result.style].filter(Boolean).join(';'),
  };
}

let system: Css | undefined;

function descriptor(value: object, name: string): PropertyDescriptor | undefined {
  for (let current: object | null = value; current; current = Object.getPrototypeOf(current)) {
    const found = Object.getOwnPropertyDescriptor(current, name);
    if (found) return found;
  }
}

/** 不执行自定义 getter；覆写方法不能使用系统作者方法的优化假设。 */
export function authorInputs(
  author: unknown,
  property: string,
  member: string,
): unknown[] | undefined {
  if (!(author instanceof Css)) return;
  const entry = descriptor(author, property);
  if (!entry || (entry.get && entry.get !== descriptor(Css.prototype, property)?.get)) return;
  const target = Reflect.get(author, property) as object;
  if (!target || typeof target !== 'object') return;
  const reference = Reflect.get((system ??= new Css()), property);
  if (!reference) return;
  const keyword = getKeywordBinding(target);
  if (target === reference && Object.isFrozen(target)) {
    const value = Reflect.get(target, member);
    if (typeof value !== 'string' && typeof value !== 'function') return;
    return typeof value === 'function'
      ? [author, target, value, reference.raw, reference.declaration]
      : [author, target, value];
  }
  const own = descriptor(target, member);
  if (!own || !('value' in own)) return;
  if (typeof own.value === 'string') return [author, target, own.value];
  // 继承相同方法不代表生成同一 CSS 属性；不读取自定义 name getter。
  const name = descriptor(target, 'name');
  if (!name || !('value' in name) || name.value !== descriptor(reference, 'name')?.value) return;
  if (
    typeof own.value !== 'function' ||
    own.value !== (member === 'raw' && keyword ? keyword.method : reference[member]) ||
    (keyword?.raw ?? descriptor(target, 'raw')?.value) !== reference.raw ||
    descriptor(target, 'declaration')?.value !== reference.declaration
  )
    return;
  return [author, target, own.value];
}
