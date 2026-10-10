import { expect } from 'vitest';

/** SSR 样式可以是原声明或隐式变量，必须同时验证规则与元素携带的实际值。 */
export function expectCssValue(
  result: { html: string; css: string },
  property: string,
  value: string,
) {
  const declarations = [
    ...result.css.matchAll(new RegExp(`(?:[;{])${RegExp.escape(property)}:([^;}]+)`, 'g')),
  ];
  const found = declarations.some(([, declaration]) => {
    if (declaration === value) return true;
    const variable = declaration!.match(/^var\((--zj-[a-z0-9-]+)\)$/)?.[1];
    return variable !== undefined && result.html.includes(`${variable}:${value};`);
  });
  expect(found, `SSR CSS 应包含 ${property}:${value}，或指向元素实际值的变量`).toBe(true);
}
