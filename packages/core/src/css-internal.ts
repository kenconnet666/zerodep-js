import type { CssInput } from 'zerodep-css';
import { authorInputs, inlineDeclaration, inlineKeyword } from 'zerodep-css/bindings';
import { Derived } from './runtime/reactivity.js';
import { props, type Props } from './runtime/props.js';
import { styleText } from './native/style.js';

const BINDING = Symbol('CSS element variable');
interface CssValue {
  [BINDING]: true;
  declaration: string;
  variable: string;
  value: string | undefined;
}
interface CssResult {
  className: string;
  style: Record<string, string>;
}

/** 保持一次属性链读取；特殊关键字和已有 var() 由 CSS 库保留原声明。 */
export function cssKeyword(target: unknown, member: string, variable: string): CssValue {
  const result = inlineKeyword(target, member, variable);
  return { [BINDING]: true, ...result, variable, value: result.value };
}

/** 只由编译器生成；业务侧 css 的参数仍然是普通声明字符串。 */
export function cssBinding(
  author: unknown,
  property: string,
  member: string,
  read: () => unknown,
  variable: string,
): CssValue {
  // 系统作者也先取得接收者和方法；派生参数的计算可能替换作者属性。
  const target = (author as Record<string, unknown>)[property];
  const method = (target as Record<string, (...args: unknown[]) => string>)[member]!;
  const inputs = authorInputs(author, property, member);
  const value = read();
  const current = inputs && authorInputs(author, property, member);
  if (
    !inputs ||
    !current ||
    inputs.length !== current.length ||
    inputs.some((input, index) => input !== current[index])
  ) {
    return {
      [BINDING]: true,
      declaration: Reflect.apply(method, target, [value]) as string,
      variable,
      value: undefined,
    };
  }
  const result = inlineDeclaration(author, property, member, value, variable);
  return { [BINDING]: true, declaration: result.declaration, variable, value: result.value };
}

export function cssResult(
  register: (...parts: CssInput[]) => string,
  parts: (CssInput | CssValue)[],
): CssResult {
  const style: Record<string, string> = Object.create(null) as Record<string, string>;
  const declarations = parts.map((part) => {
    if (part && typeof part === 'object' && BINDING in part) {
      if (part.value !== undefined) style[part.variable] = part.value;
      return part.declaration;
    }
    return part;
  });
  return { className: register(...declarations), style };
}

/** 与 class 共享一次计算；变量属于元素，无订阅表或额外清理资源。 */
export function cssProps(original: Props, calculate: () => CssResult): Props {
  const result = new Derived(calculate);
  return props([
    () => original,
    {
      class: () => result.read().className,
      // 用户 style 先序列化，生成的私有变量追加；普通 style 声明不会被覆盖。
      style: () =>
        [styleText(original.style), styleText(result.read().style)].filter(Boolean).join(';'),
    },
  ]);
}
