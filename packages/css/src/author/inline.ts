import { authorInputs, isSystemKeyword } from './author-guards.js';
import { getKeywordBinding } from '../theme/keyword-source.js';
import { unitSuffix } from '../generated/base.js';
import { systemKeywords } from '../generated/keywords.js';

export interface InlineDeclaration {
  declaration: string;
  value?: string;
}

/**
 * 将已知系统方法的直接值绑定到元素变量；未知值保留原始声明。
 * CSS-wide 关键字和无效值经过 var() 后会改变层叠，不能只检查字符串边界。
 */
export function inlineDeclaration(
  author: unknown,
  property: string,
  member: string,
  value: unknown,
  variable: string,
): InlineDeclaration {
  const inputs = authorInputs(author, property, member);
  const target = Reflect.get(Object(author), property);
  const method = Reflect.get(Object(target), member);
  const declaration = Reflect.apply(method, target, [value]) as string;
  if (!inputs || !/^--zj-[a-z0-9-]+$/.test(variable)) return { declaration };
  const text = inlineValue(property, member, value);
  if (text === undefined) return { declaration };
  return {
    declaration: Reflect.apply(Reflect.get(target, 'raw'), target, [`var(${variable})`]) as string,
    value: text,
  };
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
    if (keywords && Object.values(keywords).includes(value)) text = value;
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
