import type { CssClassInput, CssClass } from '../util/author.js';
import type { ClassStyle } from 'zerodep-js';
import { Css } from '../generated/author.js';
import { hasKeywordSource, getKeywordBinding } from '../util/keywords.js';
import { unitSuffix } from '../generated/base.js';
import { systemKeywords } from '../generated/keywords.js';

const VALUE = Symbol('implicit CSS value');
interface Value {
  [VALUE]: true;
  declaration: string;
  variable: string;
  value: string | undefined;
}
export type CssProps = ClassStyle;

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
  if (
    member === 'raw' &&
    keyword?.method === fn &&
    isSystemKeyword(target, property, keyword.raw)
  ) {
    const resolved = keyword.apply(value);
    const text = /^--zj-[a-z0-9-]+$/.test(variable)
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
  const after = before && authorInputs(author, property, member);
  const same =
    before && after && before.length === after.length && before.every((v, i) => v === after[i]);
  // 保留原方法的一次调用；只复用已核对结果，不跳过自定义副作用或异常。
  const declaration = Reflect.apply(fn, target, [value]) as string;
  const text =
    same && /^--zj-[a-z0-9-]+$/.test(variable) ? inlineValue(property, member, value) : undefined;
  return {
    [VALUE]: true,
    declaration:
      text === undefined
        ? declaration
        : (Reflect.apply(Reflect.get(target, 'raw'), target, [`var(${variable})`]) as string),
    variable,
    value: text,
  };
}

export function cssKeyword(target: unknown, member: string, variable: string): Value {
  const result = inlineKeyword(target, member, variable);
  return { [VALUE]: true, ...result, variable, value: result.value };
}

export function cssResult(
  register: (...parts: CssClassInput[]) => CssClass,
  parts: (CssClassInput | Value)[],
): CssProps {
  const styles: string[] = [];
  const resolve = (part: CssClassInput | Value): CssClassInput => {
    if (part && typeof part === 'object' && VALUE in part) {
      if (part.value !== undefined) styles.push(`${part.variable}:${part.value};`);
      return part.declaration;
    }
    if (Array.isArray(part)) return part.map(resolve);
    if (part && typeof part === 'object') {
      const bundle = part as CssProps;
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
// 只复用冻结的系统关键字表；不记录用户输入过的值。
const keywordValues = new WeakMap<object, ReadonlySet<unknown>>();

function descriptor(value: object, name: string): PropertyDescriptor | undefined {
  for (let current: object | null = value; current; current = Object.getPrototypeOf(current)) {
    const found = Object.getOwnPropertyDescriptor(current, name);
    if (found) return found;
  }
}

/** 主题视图的 raw 已被包装；核对包装前的方法与底层声明，不能推断自定义作者。 */
function isSystemKeyword(target: object, property: string, raw: unknown): boolean {
  const reference = Reflect.get((system ??= new Css()), property);
  if (!reference) return false;
  const name = descriptor(target, 'name');
  return (
    !!name &&
    'value' in name &&
    name.value === descriptor(reference, 'name')?.value &&
    raw === reference.raw &&
    descriptor(target, 'declaration')?.value === reference.declaration
  );
}

/** 不执行自定义 getter；覆写方法不能使用系统作者方法的优化假设。 */
export function authorInputs(
  author: unknown,
  property: string,
  member: string,
): unknown[] | undefined {
  if (!(author instanceof Css)) return;
  // 注入值可随框架响应式状态改变，不能仅凭方法身份跳过本次读取。
  if (hasKeywordSource(author)) return;
  const entry = descriptor(author, property);
  if (!entry || (entry.get && entry.get !== descriptor(Css.prototype, property)?.get)) return;
  const target = Reflect.get(author, property) as object;
  if (!target || typeof target !== 'object') return;
  const reference = Reflect.get((system ??= new Css()), property);
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
    own.value !== reference?.[member] ||
    descriptor(target, 'raw')?.value !== reference.raw ||
    descriptor(target, 'declaration')?.value !== reference.declaration
  )
    return;
  return [author, target, own.value];
}

export interface InlineDeclaration {
  declaration: string;
  value?: string;
}

/** 关键字和显式参数共用保守分类；SSR 与浏览器不能依赖不同的 CSS.supports 结果。 */
function inlineValue(property: string, member: string, value: unknown): string | undefined {
  let text: string | undefined;
  if (
    Object.hasOwn(unitSuffix, member) &&
    typeof value === 'number' &&
    Number.isFinite(value) &&
    value >= 0
  ) {
    text = `${value}${unitSuffix[member]}`;
  } else if (
    member === 'raw' &&
    typeof value === 'string' &&
    !/^(initial|inherit|unset|revert|revert-layer)$/i.test(value)
  ) {
    const keywords = Reflect.get(systemKeywords, property);
    if (keywords && includesKeyword(keywords, value)) text = value;
    else if (
      /^(color|backgroundColor|border(?:Top|Right|Bottom|Left)?Color|outlineColor|fill|stroke)$/.test(
        property,
      ) &&
      /^#(?:[a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/i.test(value)
    )
      text = value;
  } else if (
    member === 'raw' &&
    property === 'opacity' &&
    typeof value === 'number' &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 1
  ) {
    text = String(value);
  }
  return text;
}

function includesKeyword(keywords: object, value: string): boolean {
  // 正常系统表只含冻结的原始值；可变替换对象仍按当前内容判断。
  if (!Object.isFrozen(keywords)) return Object.values(keywords).includes(value);
  let values = keywordValues.get(keywords);
  if (!values) {
    values = new Set(Object.values(keywords));
    keywordValues.set(keywords, values);
  }
  return values.has(value);
}

/** 只将可信主题视图的安全值转换为变量；成员及主题 getter 均只读取一次。 */
export function inlineKeyword(
  target: unknown,
  member: string,
  variable: string,
): InlineDeclaration {
  const binding =
    target !== null && typeof target === 'object' ? getKeywordBinding(target) : undefined;
  if (!binding?.members.has(member))
    return { declaration: (target as Record<string, string>)[member]! };
  const { value, declaration } = binding.read(member);
  if (
    !/^--zj-[a-z0-9-]+$/.test(variable) ||
    !isSystemKeyword(target as object, binding.property, binding.raw)
  )
    return { declaration };
  const text = inlineValue(binding.property, 'raw', value);
  if (text === undefined) return { declaration };
  return {
    declaration: binding.raw.call(target, `var(${variable})` as never),
    value: text,
  };
}
