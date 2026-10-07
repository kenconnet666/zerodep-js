import type { CssInput } from 'zerodep-css';
import { authorInputs, inlineDeclaration } from 'zerodep-css/bindings';
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

/** 只由编译器生成；业务侧 css 的参数仍然是普通声明字符串。 */
export function cssBinding(
  author: unknown,
  property: string,
  member: string,
  read: () => unknown,
  variable: string,
): CssValue {
  // 未知 getter/方法先取接收者和方法，再求参数，保留原 JS 调用顺序。
  if (!authorInputs(author, property, member)) {
    const target = (author as Record<string, unknown>)[property];
    const method = (target as Record<string, (...args: unknown[]) => string>)[member]!;
    return {
      [BINDING]: true,
      declaration: Reflect.apply(method, target, [read()]) as string,
      variable,
      value: undefined,
    };
  }
  const result = inlineDeclaration(author, property, member, read(), variable);
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
