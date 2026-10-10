import { derived, props, styleText, type Props } from 'zerodep-js/internal';
import type { CssInput } from './runtime/registry.js';
import { authorInputs } from './author/author-guards.js';
import { inlineDeclaration, inlineKeyword } from './author/inline.js';

const VALUE = Symbol('implicit CSS value');
interface Value {
  [VALUE]: true;
  declaration: string;
  variable: string;
  value: string | undefined;
}
export interface CssProps {
  class: string;
  style: string;
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
  const after = before && authorInputs(author, property, member);
  const same =
    before && after && before.length === after.length && before.every((v, i) => v === after[i]);
  const result = same
    ? inlineDeclaration(author, property, member, value, variable)
    : { declaration: Reflect.apply(fn, target, [value]) as string };
  return { [VALUE]: true, ...result, variable, value: result.value };
}

export function cssKeyword(target: unknown, member: string, variable: string): Value {
  const result = inlineKeyword(target, member, variable);
  return { [VALUE]: true, ...result, variable, value: result.value };
}

export function cssResult(
  register: (...parts: CssInput[]) => string,
  parts: (CssInput | Value)[],
): CssProps {
  let style = '';
  const declarations = parts.map((part) => {
    if (part && typeof part === 'object' && VALUE in part) {
      if (part.value !== undefined) style += `${part.variable}:${part.value};`;
      return part.declaration;
    }
    return part;
  });
  return { class: register(...declarations), style };
}

/** CSS 库算声明和值，框架负责派生、JSX 属性覆盖与 style 序列化。 */
export function cssProps(original: Props, calculate: () => CssProps): Props {
  const result = derived(calculate);
  return props([
    () => original,
    {
      class: () => result.read().class,
      style: () => [styleText(original.style), result.read().style].filter(Boolean).join(';'),
    },
  ]);
}
