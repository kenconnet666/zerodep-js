import { Css } from '../generated/author.js';
import { hasKeywordSource } from '../theme/keyword-source.js';

let system: Css | undefined;

function descriptor(value: object, name: string): PropertyDescriptor | undefined {
  for (let current: object | null = value; current; current = Object.getPrototypeOf(current)) {
    const found = Object.getOwnPropertyDescriptor(current, name);
    if (found) return found;
  }
}

/** 主题视图的 raw 已被包装；核对包装前的方法与底层声明，不能推断自定义作者。 */
export function isSystemKeyword(target: object, property: string, raw: unknown): boolean {
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
  if (!property) {
    if (
      descriptor(author, member)?.value !== descriptor(Css.prototype, member)?.value ||
      descriptor(author, '_selector')?.value !== descriptor(Css.prototype, '_selector')?.value
    )
      return;
    return [author];
  }
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

/** 元素变量只接管系统声明；自定义选择器或覆写方法继续走样式表绑定。 */
export function canBindInline(guards: readonly (readonly unknown[])[]): boolean {
  return guards.every((guard) => {
    if (guard.length !== 3) return true;
    const inputs = authorInputs(guard[0], guard[1] as string, guard[2] as string);
    return !!inputs && !inputs.some((value) => typeof value === 'string' && /[{}]/.test(value));
  });
}
